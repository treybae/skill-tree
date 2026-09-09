output "s3_bucket_name" {
  description = "S3 bucket holding the built site - set as the S3_BUCKET_NAME GitHub Actions variable"
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID - set as the CLOUDFRONT_DISTRIBUTION_ID GitHub Actions variable"
  value       = aws_cloudfront_distribution.site.id
}

output "cloudfront_domain_name" {
  description = "Public URL the app is served from"
  value       = "https://${aws_cloudfront_distribution.site.domain_name}"
}

output "github_actions_role_arn" {
  description = "IAM role ARN GitHub Actions assumes via OIDC - set as the AWS_DEPLOY_ROLE_ARN GitHub Actions variable"
  value       = aws_iam_role.github_actions_deploy.arn
}
