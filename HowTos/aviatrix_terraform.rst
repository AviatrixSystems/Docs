.. meta::
   :description: Aviatrix Terraform Provider
   :keywords: terraform, terraform provider, api

===========================
Aviatrix Terraform Provider
===========================
Aviatrix terraform provider is used to interact with Aviatrix resources. Click this `our GitHub link <https://github.com/AviatrixSystems/terraform-provider-aviatrix>`_  and `read me instructions <https://github.com/AviatrixSystems/terraform-provider-aviatrix#terraform-provider>`_ for details on setting up Aviatrix terraform provider on your system. 

The provider allows you to manage Aviatrix resources like account, gateway, peering, etc. It needs to be configured with valid Aviatrix UCC/CloudN's IP, and account credentials. 

Aviatrix release 3.1 and later provide a guided workflow for `Transit Network <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ configuration. Click this `link <http://docs.aviatrix.com/Solutions/Setup_Transit_VPC_Solution_Terraform.html>`_ to read how to setup Transit Network using terraform.

Example Usage
=============

::

	# Configure Aviatrix provider
	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# Create a record
	resource "aviatrix_account" "myacc" {
	  # ...
	}

Resources
=========
Use the navigation to the left to read about the available resources, along with their examples. More resources will be added in future.

aviatrix_account
----------------
Manages an Aviatrix cloud account.

**Example Usage**

::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# Create Aviatrix AWS account with IAM roles
	# account_name - Aviatrix cloud account name
	# account_password - Password for default user of account.
	# account_email - Valid email-id to receive notifications.
	# cloud_type - Enter 1 for AWS. Only AWS is currently supported.
	# aws_account_number - AWS account number
	# aws_iam - Enter true if you want to use IAM role to configure account
	# aws_role_app - aviatrix-role-app ARN
	# aws_role_ec2 - aviatrix-role-ec2 ARN

	resource "aviatrix_account" "tempacc" {
	  account_name = "username"
	  account_password = "password"
	  account_email = "abc@xyz.com"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	  aws_role_app = "arn:aws:iam::123456789012:role/aviatrix-role-app"
	  aws_role_ec2 = "arn:aws:iam::123456789012:role/aviatrix-role-ec2"
	}

	# Or you can create Aviatrix AWS account with access_key/secret key
	resource "aviatrix_account" "tempacc" {
	  account_name = "username"
	  account_password = "password"
	  account_email = "abc@xyz.com"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_access_key = "ABCDEFGHIJKL"
	  aws_secret_key = "ABCDEFGHIJKLabcdefghijkl"
	}


aviatrix_gateway
----------------
Manages an Aviatrix gateway

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# cloud_type - Enter 1 for AWS. Only AWS is currently supported.
	# account_name - Aviatrix account name to launch GW with.
	# gw_name - Name of gateway.
	# vpc_id - AWS VPC ID.
	# vpc_reg - AWS VPC region.
	# vpc_size - Gateway instance size
	# vpc_net - VPC subnet CIDR where you want to launch GW instance

	resource "aviatrix_gateway" "test_gateway1" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "avtxgw1"
	  vpc_id = "vpc-abcdef"
	  vpc_reg = "us-west-1"
	  vpc_size = "t2.micro"
	  vpc_net = "10.0.0.0/24"
	}

aviatrix_tunnel
----------------
Manages an Aviatrix tunnel

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# vpc_name1 - Name of source gateway
	# vpc_name2 - Name of destination gateway
	resource "aviatrix_tunnel" "test_tunnel1" {
	  vpc_name1 = "avtxgw1"
	  vpc_name2 = "avtxgw2"
	}

aviatrix_transpeer
------------------
Manages an Aviatrix transitive peering

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# source - Name of source GW.
	# nexthop - Name of next hop GW.
	# reachable_cidr - Destination CIDR.

	resource "aviatrix_transpeer" "test_transpeer" {
	  source = "avtxuseastgw1"
	  nexthop = "avtxuseastgw2"
	  reachable_cidr = "10.152.0.0/16"
	}

aviatrix_fqdn
----------------
Manages FQDN filtering for Aviatrix gateway

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# fqdn_tag - Enter any tag name for FQDN
	# fqdn_status - (Optional: disabled by default) Enter enabled or disabled, based on whether you want to enable or disable FQDN filtering.
	# fqdn_mode - (Optional: white by default) Enter white or black,, based on whether you whitelist or blacklist
	# gw_list - List of gateways, on which you want to filter
	# domain_list - List of domains for which you want to filter
	
	resource "aviatrix_fqdn" "test_fqdn" {
	  fqdn_tag = "my_tag"
	  fqdn_status = "enabled"
	  fqdn_mode = "white"
	  gw_list = ["gw1", "gw2"]
	  domain_list = ["*.facebook.com", "*.reddit.com"]
	}

aviatrix_firewall_tag
----------------
Manages L4 stateful firewall tags

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# firewall_tag - Tag name
	# cidr_list - List of cidr_tag_name and cidr.
	# cidr_list - Can be added, updated and removed to update firewall rules.

	resource "aviatrix_firewall_tag" "test_firewall_tag" {
	  firewall_tag = "test_tag"
	  cidr_list = [
	                {
	                  cidr_tag_name = "a1"
	                  cidr = "10.1.0.0/24"
	                },
	                {
	                  cidr_tag_name = "b1"
	                  cidr = "10.2.0.0/24"
	                }
	              ]
	}

aviatrix_firewall
----------------
Manages L4 stateful firewall policies for Aviatrix gateway

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# gw_name - Gateway name to which you want to apply policy.
	# base_allow_deny - (Optional: allow by default) Base policy to allow or deny all packets. Valid values: "allow" and "deny".
	# base_log_enable - (Optional: off by default) Base rule to enable logging or not. Valid values "on" and "off".
	# policy - Enter policy as list of rules.
	# 6 fields are required for each rule item: protocol, src_ip, log_enable, dst_ip, allow_deny and port.
	# Valid values for protocol: "all", "tcp", "udp", "icmp", "sctp", "rdp", "dccp"
	# Valid values for src_ip and dst_ip: CIDRs separated by comma e.g.: "10.30.0.0/16,10.45.0.0/20", or tag names such "HR" or "marketing" etc.
	# Valid values for port: a single port or a range of port numbers. e.g.: "25", "25:1024"
	# Valid values for deny_allow: "allow" and "deny"
	# Valid values for log_enable: "on" and "off"

	resource "aviatrix_firewall" "test_firewall" {
	  gw_name = "gw1"
	  base_allow_deny = "allow"
	  base_log_enable = "on"
	  policy = [
	            {
	              protocol = "tcp"
	              src_ip = "10.15.0.224/32"
	              log_enable = "on"
	              dst_ip = "10.12.0.172/32"
	              allow_deny = "deny"
	              port = "0-65535"
	            },
	            {
	              protocol = "tcp"
	              src_ip = "a1"
	              log_enable = "off"
	              dst_ip = "b1"
	              allow_deny = "deny"
	              port = "0-65535"
	            }
	          ]
	}

aviatrix_upgrade
----------------
Upgrades Aviatrix controller to specific release

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# version - (Optional) The release version to which
	# the controller will be upgraded to. If not specified, it
	# automatically will be upgraded to the latest release.

	resource "aviatrix_upgrade" "test_upgrade" {
	  version = "latest"
	}

Sample configuration to launch a full mesh network on AWS
=========================================================

::

	# Sample Aviatrix terraform configuration to create a full mesh network on AWS
	# This configuration creates a cloud account on Aviatrix controller, 
	# launches 3 gateways with the created account and establishes tunnels
	# between each gateway.


	# Edit to enter your controller's IP, username and password to login with.
	provider "aviatrix" {
	  controller_ip = "w.x.y.z"
	  username = "admin"
	  password = "Aviatrix123"
	}

	# Increase count default value to add more VPCs and subnets to launch more gateways together.

	variable "count" {
	  default = 3
	}

	# Enter VPCs where you want to launch gateways.
	variable "vpcs" {
	  description = "Launch gateways in different VPCs."
	  type = "list"
	  default = ["vpc-7a6b2513", "vpc-2ee4a147", "vpc-0d7b3664"]
	}

	# Enter Subnets within VPCs added above.
	variable "vpc_nets" {
	  description = "Launch gateways in different VPC Subnets."
	  type = "list"
	  default = ["10.1.0.0/24", "10.2.0.0/24", "10.3.0.0/24"]
	}

	resource "aviatrix_account" "test_acc" {
	  account_name = "devops"
	  account_password = "Aviatrix123"
	  account_email = "abc@xyz.com"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	  aws_role_app = "arn:aws:iam::123456789012:role/aviatrix-role-app"
	  aws_role_ec2 = "arn:aws:iam::123456789012:role/aviatrix-role-ec2"
	}

	# Create count number of gateways
	resource "aviatrix_gateway" "test_gw" {
	  count = "${var.count}"
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "avtxgw-${count.index}"
	  vpc_id = "${element(var.vpcs, count.index)}"
	  vpc_reg = "ap-south-1"
	  vpc_size = "t2.micro"
	  vpc_net = "${element(var.vpc_nets, count.index)}"
	  depends_on = ["aviatrix_account.test_acc"]
	}

	# Create tunnels between above created gateways.
	resource "aviatrix_tunnel" "test_tunnel" {
	  count = "${var.count * (var.count - 1)/2}"
	  vpc_name1 = "avtxgw-${count.index}"
	  vpc_name2 = "avtxgw-${(count.index+1)%3}"
	  depends_on = ["aviatrix_gateway.test_gw"]
	}
