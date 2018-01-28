.. meta::
   :description: Aviatrix Terraform Provider
   :keywords: terraform, terraform provider, api

===========================
Aviatrix Terraform Provider
===========================
Aviatrix terraform provider is used to interact with Aviatrix resources. Click this `link <https://github.com/AviatrixSystems/terraform-provider-aviatrix>`_ for details on setting up Aviatrix terraform provider on your system.

The provider allows you to manage Aviatrix resources like account, gateway, peering, etc. It needs to be configured with valid Aviatrix UCC/CloudN's IP, and account credentials. Click this `link <http://docs.aviatrix.com/Solutions/Setup_Transit_VPC_Solution_Terraform.html>`_ to read how to setup transit VPC using terraform.

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
	resource "aviatrix_account" "tempacc" {
	  account_name = "username"
	  account_password = "password"
	  account_email = "abc@xyz.com"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	  aws_role_arn = "arn:aws:iam::123456789012:role/aviatrix-role-app"
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

	resource "aviatrix_transpeer" "test_transpeer" {
	  source = "avtxuseastgw1"
	  nexthop = "avtxuseastgw2"
	  reachable_cidr = "10.152.0.0/16"
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
	  aws_role_arn = "arn:aws:iam::123456789012:role/aviatrix-role-app"
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