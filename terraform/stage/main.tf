terraform {
  required_version = ">= 1.0.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "us-east-2"
}

resource "aws_instance" "example" {
  ami                    = "ami-0fb653ca2d3203ac1"
  instance_type          = "t2.micro"
  key_name               = aws_key_pair.staging_api_key_pair.key_name
  vpc_security_group_ids = [aws_security_group.inbound_requests.id]

  tags = {
    Name = "api-staging-server"
  }
}

resource "aws_key_pair" "staging_api_key_pair" {
  key_name   = "staging_api_key_pair"
  public_key = file("~/.ssh/staging_api_key_pair.pub")
}

resource "aws_security_group" "inbound_requests" {
  name = "Allow inbound requests to api ec2 instance"

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]

    }
  }
}

resource "aws_security_group" "allow_outbound" {

  name = "Allow all outbound traffic"

  # Allow all outbound requests so we can hit the internet
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
