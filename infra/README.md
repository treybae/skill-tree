# Deploying Skill Tree to AWS

This app is a static build (Vite/React, no backend) served from **S3 + CloudFront**.
Terraform in this directory creates the AWS side; a GitHub Actions workflow
(`.github/workflows/deploy.yml`) builds and deploys it on every push to `master`.

Cost note: with `PriceClass_100` and low personal traffic, this typically runs
well under $1-2/month (S3 storage of a few hundred KB + CloudFront's free tier
covers most hobby-level traffic).

## One-time setup

You need [Terraform](https://developer.hashicorp.com/terraform/install) and the
[AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
installed locally, with credentials for the AWS account you want to deploy into
(`aws configure`, or an SSO profile - anything `terraform` can pick up).

1. **Create the infrastructure:**

   ```bash
   cd infra
   terraform init
   terraform apply \
     -var="github_repo=treybae/skill-tree" \
     -var="github_branch=master"
   ```

   If this AWS account **already has a GitHub Actions OIDC provider** from
   another project (you'll know from the error `EntityAlreadyExists` on
   `token.actions.githubusercontent.com`), re-run with
   `-var="create_github_oidc_provider=false"` instead.

2. **Copy the outputs** - `terraform apply` prints them, or run
   `terraform output` any time after:

   - `s3_bucket_name`
   - `cloudfront_distribution_id`
   - `github_actions_role_arn`
   - `cloudfront_domain_name` (this is the app's live URL)

3. **Set them as GitHub Actions repository variables** (Settings → Secrets and
   variables → Actions → Variables in the GitHub UI, or via the `gh` CLI):

   ```bash
   gh variable set AWS_DEPLOY_ROLE_ARN --body "<github_actions_role_arn output>"
   gh variable set S3_BUCKET_NAME --body "<s3_bucket_name output>"
   gh variable set CLOUDFRONT_DISTRIBUTION_ID --body "<cloudfront_distribution_id output>"
   gh variable set AWS_REGION --body "us-east-1"   # or whatever you used
   ```

4. **Push to `master`.** The `Deploy to AWS` workflow builds the app and
   syncs it to S3, then invalidates the CloudFront cache. Check progress
   under the repo's Actions tab; the app is live at the `cloudfront_domain_name`
   output once it finishes (first invalidation can take a minute or two to
   propagate).

## Making changes later

Terraform state lives only on whoever's machine ran `apply` (this repo uses
local state, not a remote backend, to keep the initial setup simple). If more
than one person will run `terraform apply`, consider migrating to an S3+DynamoDB
remote backend so state isn't stranded on one laptop.

## Tearing it down

```bash
cd infra
terraform destroy
```

This deletes the S3 bucket, CloudFront distribution, and the IAM role/policy.
It does **not** delete the OIDC provider if you passed
`create_github_oidc_provider=false` (since Terraform doesn't own it), and does
delete it otherwise - only do that if no other project in the account depends
on it.
