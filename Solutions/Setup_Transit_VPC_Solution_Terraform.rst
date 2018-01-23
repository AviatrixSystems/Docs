.. meta::
   :description: Setup Transit VPC Solution using terraform
   :keywords: terraform, terraform provider, api

============================================================
Setup Transit VPC Solution using Aviatrix Terraform Provider
============================================================
Aviatrix terraform provider is used to interact with Aviatrix resources. Click `here <http://http://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_. to read more.

Setup terraform provider
========================

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

aviatrix_transit_vpc
--------------------
Manages an Aviatrix Transit VPC.

**Example Usage**

::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# Create a transit VPC.
	# Omit ha_subnet to launch transit VPC without HA.
	# HA subnet can later be added or deleted to enable/disable HA in transit VPC
	resource "aviatrix_transit_vpc" "test_transit_gw" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  vpc_net = "10.1.0.0/24"
	  ha_subnet = "10.1.0.0/24"
	}

aviatrix_vgw_conn
----------------
Manages VGW connection

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
	  bgp_local_as_num = "100"
	  enable_ha = "true"
	}

aviatrix_spoke_vpc
------------------
Manages an Aviatrix Spoke VPC

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	resource "aviatrix_spoke_vpc" "test_spoke" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg3456"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  vpc_net = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	  transit_gw = "transit"
	}

Sample configuration to create complete transit VPC solution
============================================================

::

	# Sample Aviatrix terraform configuration to create complete transit VPC solution
	# This configuration creates a cloud account on Aviatrix controller, launches transit VPC, creates VGW connection
	# with transit VPC
	# Launches a spoke GW, and attach with transit VPC.


	# Edit to enter your controller's IP, username and password to login with.
	provider "aviatrix" {
	  controller_ip = "w.x.y.z"
	  username = "admin"
	  password = "Aviatrix123"
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

	# Create transit VPC
	# Omit ha_subnet to launch transit VPC without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in transit VPC

	resource "aviatrix_transit_vpc" "test_transit_gw" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "transit"
	  vpc_id = "vpc-6fdf1e17"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  vpc_net = "10.1.0.0/24"
	  ha_subnet = "10.1.0.0/24"
	  depends_on = ["aviatrix_account.test_acc"]
	}

	# Create VGW connection with transit VPC.
	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
	  bgp_local_as_num = "100"
	  enable_ha = "true"
	  depends_on = ["aviatrix_transit_vpc.test_transit_gw"]
	}

	# Launch a spoke VPC, and join with transit VPC.
	# Omit ha_subnet to launch spoke VPC without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in spoke VPC

	resource "aviatrix_spoke_vpc" "test_spoke" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg3456"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  vpc_net = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	  transit_gw = "transit"
	  depends_on = ["aviatrix_vgw_conn.test_vgw_conn"]
	}
