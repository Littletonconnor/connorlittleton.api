variable "ingress_rules" {
  description = "List of ingress rules"
  type        = list(number)

  default = [80, 3000, 22, 4000, 443]
}
