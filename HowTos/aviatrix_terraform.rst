.. meta::
   :description: Aviatrix Terraform Provider
   :keywords: terraform, terraform provider, api

===========================
Aviatrix Terraform Provider
===========================

Aviatrix `Terraform <https://www.aviatrix.com/learning/cloud-routing-networking/terraform-and-infrastructure-as-code/>`_ Provider is used to interact with Aviatrix resources.

Read the `Aviatrix Terraform Provider Tutorial <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_ to setup the environment.

The provider allows you to manage Aviatrix resources such as account, gateway, peering, etc. It needs to be configured with valid Aviatrix UCC/CloudN's IP, and account credentials. For Aviatrix Transit Network deployment, please click `here <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_ to read how to setup transit VPC using Terraform.

.. note::
  Aviatrix is now an official Terraform provider! The Terraform setup procedure has been significantly simplified and the documentation below has been updated accordingly. Customers who have previously set up our provider following our previous instructions may transition to our official provider by following Step 5 in the setup tutorial `here <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_

Example Usage
=============

::

	# Configure Aviatrix provider
	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	  version = "2.2"
	}

	# Create a record
	resource "aviatrix_account" "myacc" {
	  # ...
	}

Documentation
=============
The complete documentation for all available Aviatrix resources and data sources may be viewed on the Hashicorp Terraform doc site `here <https://www.terraform.io/docs/providers/aviatrix/>`_.


Sample configuration to launch a full-mesh network on AWS
=========================================================

::

	# Sample Aviatrix terraform configuration to create a full mesh network on AWS
	# This configuration creates a cloud account on the Aviatrix controller,
	# launches 3 gateways with the created account and establishes tunnels
	# between each gateway.


	# Edit to enter your controller's IP, username and password to login with.
	provider "aviatrix" {
	  controller_ip = "w.x.y.z"
	  username = "admin"
	  password = "!password!12@"
	  version = "2.2"
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
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	  aws_role_app = "arn:aws:iam::123456789012:role/aviatrix-role-app"
	  aws_role_ec2 = "arn:aws:iam::123456789012:role/aviatrix-role-ec2"
	}

	# Create count number of gateways
	resource "aviatrix_gateway" "test_gw" {
	  count = var.count
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "avtxgw-${count.index}"
	  vpc_id = "${element(var.vpcs, count.index)}"
	  vpc_reg = "ap-south-1"
	  gw_size = "t2.micro"
	  subnet = "${element(var.vpc_nets, count.index)}"
	  depends_on = ["aviatrix_account.test_acc"]
	}

	# Create tunnels between above created gateways.
	resource "aviatrix_tunnel" "test_tunnel" {
	  count = "${var.count * (var.count - 1)/2}"
	  gw_name1 = "avtxgw-${count.index}"
	  gw_name2 = "avtxgw-${(count.index+1)%3}"
	  depends_on = ["aviatrix_gateway.test_gw"]
	}


.. disqus::
