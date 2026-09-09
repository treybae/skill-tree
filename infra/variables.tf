variable "aws_region" {
  description = "AWS region to create the S3 bucket and IAM resources in (CloudFront itself is global)"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Name prefix for all created resources"
  type        = string
  default     = "skill-tree"
}

variable "github_repo" {
  description = "GitHub repository allowed to assume the deploy role, as \"owner/repo\""
  type        = string
  default     = "treybae/skill-tree"
}

variable "github_branch" {
  description = "Branch allowed to deploy via the GitHub Actions OIDC trust condition"
  type        = string
  default     = "master"
}

variable "create_github_oidc_provider" {
  description = <<-EOT
    Whether to create the GitHub Actions OIDC provider in this AWS account.
    AWS allows only ONE OIDC provider per issuer URL per account - if this
    account already has one from another project (any repo), set this to
    false and Terraform will reuse the existing provider instead of failing
    on "EntityAlreadyExists".
  EOT
  type        = bool
  default     = true
}
