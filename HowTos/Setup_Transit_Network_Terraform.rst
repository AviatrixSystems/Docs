.. meta::
   :description: Setup Transit VPC Solution using terraform
   :keywords: terraform, terraform provider, api

============================================================
Setup Transit Network using Aviatrix Terraform Provider
============================================================
Aviatrix terraform provider is used to interact with Aviatrix resources. Click `here <http://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_ to read more.

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
These are the available resources for creating a transit VPC solution.

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
	  subnet = "10.1.0.0/24"
	  ha_subnet = "10.1.0.0/24"
  	  tag_list = ["name:value", "name1:value1", "name2:value2"]
	}

+--------------+-------------------------------------------------------------------+
| cloud_type   | Enter 1 for AWS cloud type. Transit VPC is supported only in AWS. |
+--------------+-------------------------------------------------------------------+
| account_name | Enter aviatrix cloud account name.                                |
+--------------+-------------------------------------------------------------------+
| gw_name      | Enter Gateway name for transit VPC.                               |
+--------------+-------------------------------------------------------------------+
| vpc_id       | VPC ID of transit VPC.                                            |
+--------------+-------------------------------------------------------------------+
| vpc_size     | Gateway size.                                                     |
+--------------+-------------------------------------------------------------------+
| subnet       | VPC subnet where you want to deploy transit VPC GW.               |
+--------------+-------------------------------------------------------------------+
| ha_subnet    | (Optional) VPC subnet for HA.                                     |
+--------------+-------------------------------------------------------------------+
| dns_server   | (Optional) IP address for reachable DNS server.                   |
+--------------+-------------------------------------------------------------------+
| tag_list     | (Optional) List of tags with key/value pairs in string format.    |
+--------------+-------------------------------------------------------------------+

aviatrix_vgw_conn
-----------------
Manages VGW connection

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# Once this resource is created, VGW can be disconnected
	# from transit GW by destroying this resource using command:
	# terraform destroy --target aviatrix_vgw_conn.test_vgw_conn.

	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
	  bgp_local_as_num = "100"
	}

+------------------+-----------------------------------------+
| conn_name        | Name for transit VPC to VGW connection. |
+------------------+-----------------------------------------+
| gw_name          | Transit VPC GW name.                    |
+------------------+-----------------------------------------+
| vpc_id           | Enter VPC Id of transit VPC.            |
+------------------+-----------------------------------------+
| bgp_vgw_id       | Enter AWS VGW Id used for connection.   |
+------------------+-----------------------------------------+
| bgp_local_as_num | Enter BGP Local ASN.                    |
+------------------+-----------------------------------------+

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

	# Launch a spoke VPC, and join with transit VPC.
	# Omit ha_subnet to launch spoke VPC without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in spoke VPC
	# Omit transit_gw to launch spoke VPC without attaching with transit GW.
	# transit_gw can be later added or deleted to attach/detach from spoke VPC
	resource "aviatrix_spoke_vpc" "test_spoke" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg3456"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  subnet = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	  transit_gw = "transit"
	  tag_list = ["name:value", "name1:value1", "name2:value2"]
	}

+--------------+-------------------------------------------------------------------+
| cloud_type   | Enter 1 for AWS cloud type. Transit VPC is supported only in AWS. |
+--------------+-------------------------------------------------------------------+
| account_name | Enter aviatrix cloud account name.                                |
+--------------+-------------------------------------------------------------------+
| gw_name      | Enter Gateway name for spoke gateway.                             |
+--------------+-------------------------------------------------------------------+
| vpc_id       | VPC ID for Spoke gateway.                                         |
+--------------+-------------------------------------------------------------------+
| vpc_reg      | Gateway region.                                                   |
+--------------+-------------------------------------------------------------------+
| vpc_size     | Gateway size.                                                     |
+--------------+-------------------------------------------------------------------+
| subnet       | VPC subnet where you want to deploy transit VPC GW.               |
+--------------+-------------------------------------------------------------------+
| enable_nat   | (Optional) Enter "true" to enable NAT.                            |
+--------------+-------------------------------------------------------------------+
| ha_subnet    | (Optional) VPC subnet for HA.                                     |
+--------------+-------------------------------------------------------------------+
| dns_server   | (Optional) IP address for reachable DNS server.                   |
+--------------+-------------------------------------------------------------------+
| transit_gw   | (Optional) Transit Gateway name to join spoke Gateway with.       |
+--------------+-------------------------------------------------------------------+
| tag_list     | (Optional) List of tags with key/value pairs in string format.    |
+--------------+-------------------------------------------------------------------+

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
	  password = "Aviatrix123%23"
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

	# Create transit VPC
	# Omit ha_subnet to launch transit VPC without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in transit VPC

	resource "aviatrix_transit_vpc" "test_transit_gw" {
	  cloud_type = 1
	  account_name = "${aviatrix_account.test_acc.id}"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  subnet = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	}

	# Create VGW connection with transit VPC.
	# Once this resource is created, VGW can be disconnected
	# from transit GW by destroying this resource using command:
	# terraform destroy --target aviatrix_vgw_conn.test_vgw_conn.

	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = "${aviatrix_transit_vpc.test_transit_gw.id}"
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
	  bgp_local_as_num = "100"
	}

	# Launch a spoke VPC, and join with transit VPC.
	# Omit ha_subnet to launch spoke VPC without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in spoke VPC
	# Omit transit_gw to launch spoke VPC without attaching with transit GW.
	# transit_gw can be later added or deleted to attach/detach from spoke VPC

	resource "aviatrix_spoke_vpc" "test_spoke" {
	  cloud_type = 1
	  account_name = "${aviatrix_account.test_acc.id}"
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg1234"
	  vpc_reg = "us-east-1"
	  vpc_size = "t2.micro"
	  subnet = "10.21.0.0/24"
	  ha_subnet = "10.21.1.0/24"
	  transit_gw = "${aviatrix_transit_vpc.test_transit_gw.id}"
	  depends_on = ["aviatrix_vgw_conn.test_vgw_conn"]
	}

.. disqus::	