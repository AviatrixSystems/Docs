.. meta::
   :description: Aviatrix Terraform Provider
   :keywords: terraform, terraform provider, api

===========================
Aviatrix Terraform Provider
===========================
Aviatrix terraform provider is used to interact with Aviatrix resources.

The provider allows you to manage Aviatrix resources like account, gateway, peering, etc. It needs to be configured with the proper credentials before it can be used.

Use the navigation to the left to read about the available resources.

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

aviatrix_account
================
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
	  cloud_type = "1"
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
	  cloud_type = "1"
	  aws_account_number = "123456789012"
	  aws_access_key = "ABCDEFGHIJKL"
	  aws_secret_key = "ABCDEFGHIJKLabcdefghijkl"
	}


aviatrix_gateway
================
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
===============
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
==================
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

