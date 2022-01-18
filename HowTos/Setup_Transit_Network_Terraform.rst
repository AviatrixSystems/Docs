.. meta::
   :description: Setup Transit VPC Solution using terraform
   :keywords: terraform, terraform provider, api, Transit network

============================================================
Setup Transit Network using Aviatrix Terraform Provider
============================================================
The Aviatrix Terraform Provider is used to interact with Aviatrix resources.

You can read the `Aviatrix Terraform Tutorial <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_  to learn the steps on setting up the environment.

Click `here <http://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_ to find more supported resources.

Setup Terraform Provider
========================

::

	# Configure Aviatrix provider
	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "username"
	  password = "password"
	  version = "2.2"
	}

	# Create a record
	resource "aviatrix_account" "myacc" {
	  # ...
	}

Resources
=========
These are the available resources for creating a transit VPC solution.

aviatrix_transit_gateway
------------------------
Manages an Aviatrix Transit Gateway.

**Example Usage**

::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "username"
	  password = "password"
	  version = "2.2"
	}

	# Create a transit gateway.
	# Omit ha_subnet to launch transit gateway without HA.
	# HA subnet can later be added or deleted to enable/disable HA in transit gateway
	resource "aviatrix_transit_gateway" "test_transit_gw" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  vpc_reg = "us-east-1"
	  gw_size = "t2.micro"
	  subnet = "10.1.0.0/24"
	  ha_subnet = "10.1.0.0/24"
    tag_list = ["key:value", "key1:value1", "key2:value2"]
	}

+--------------+-------------------------------------------------------------------+
| cloud_type   | Enter 1 for AWS cloud type.                                       |
+--------------+-------------------------------------------------------------------+
| account_name | Enter Aviatrix's cloud account name.                              |
+--------------+-------------------------------------------------------------------+
| gw_name      | Enter Gateway name for transit VPC.                               |
+--------------+-------------------------------------------------------------------+
| vpc_id       | VPC ID of transit VPC.                                            |
+--------------+-------------------------------------------------------------------+
| gw_size      | Gateway size.                                                     |
+--------------+-------------------------------------------------------------------+
| subnet       | VPC subnet where you want to deploy transit VPC GW.               |
+--------------+-------------------------------------------------------------------+
| ha_subnet    | (Optional) VPC subnet for HA.                                     |
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
	  username = "username"
	  password = "password"
	  version = "2.2"
	}

	# Once this resource is created, VGW can be disconnected
	# from transit GW by destroying this resource using command:
	# terraform destroy --target aviatrix_vgw_conn.test_vgw_conn.

	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
	  bgp_vgw_account = "devops"
	  bgp_vgw_region = "us-east-1"
	  bgp_local_as_num = "65001"
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
| bgp_vgw_account  | AWS Account Number of the VGW used.     |
+------------------+-----------------------------------------+
| bgp_vgw_region   | Region of the AWS's VGW used.           |
+------------------+-----------------------------------------+
| bgp_local_as_num | Enter BGP Local ASN.                    |
+------------------+-----------------------------------------+

aviatrix_spoke_gateway
----------------------
Manages an Aviatrix Spoke Gateway

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "username"
	  password = "password"
	  version = "2.2"
	}

	# Launch a spoke gateway, and join with transit gateway.
	# Omit ha_subnet to launch spoke gateway without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in spoke gateway
	# Omit transit_gw to launch spoke gateway without attaching with transit GW.
	# transit_gw can be later added or deleted to attach/detach from spoke gateway
	resource "aviatrix_spoke_gateway" "test_spoke" {
	  cloud_type = 1
	  account_name = "devops"
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg3456"
	  vpc_reg = "us-east-1"
	  gw_size = "t2.micro"
	  subnet = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	  transit_gw = "transit"
	  tag_list = ["key:value", "key:value1", "key:value2"]
	}

+--------------+-------------------------------------------------------------------+
| cloud_type   | Enter 1 for AWS cloud type.                                       |
+--------------+-------------------------------------------------------------------+
| account_name | Enter aviatrix cloud account name.                                |
+--------------+-------------------------------------------------------------------+
| gw_name      | Enter Gateway name for spoke gateway.                             |
+--------------+-------------------------------------------------------------------+
| vpc_id       | VPC ID for Spoke gateway.                                         |
+--------------+-------------------------------------------------------------------+
| vpc_reg      | Gateway region.                                                   |
+--------------+-------------------------------------------------------------------+
| gw_size      | Gateway size.                                                     |
+--------------+-------------------------------------------------------------------+
| subnet       | VPC subnet where you want to deploy transit GW.                   |
+--------------+-------------------------------------------------------------------+
| enable_nat   | (Optional) Enter "yes" to enable NAT.                             |
+--------------+-------------------------------------------------------------------+
| ha_subnet    | (Optional) VPC subnet for HA.                                     |
+--------------+-------------------------------------------------------------------+
| transit_gw   | (Optional) Transit Gateway name to join spoke Gateway with.       |
+--------------+-------------------------------------------------------------------+
| tag_list     | (Optional) List of tags with key/value pairs in string format.    |
+--------------+-------------------------------------------------------------------+

Sample configuration to create complete transit VPC solution
============================================================

.. Note::
	In this example, you must specify the username and password, controller_ip, account_email and other parameters.


::

	# Sample Aviatrix terraform configuration to create complete transit VPC solution
	# This configuration creates a cloud account on Aviatrix controller, launches transit gateway, creates VGW connection
	# with transit gateway
	# Launches a spoke GW, and attach with transit gateway.


	# Edit to enter your controller's IP, username and password to login with.
	provider "aviatrix" {
	  controller_ip = "w.x.y.z"
	  username = "username"
	  password = "password"
	  version = "2.2"
	}

	resource "aviatrix_account" "test_acc" {
	  account_name = "devops"
	  account_password = "account_password"
	  account_email = "abc@xyz.com"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	  aws_role_app = "arn:aws:iam::123456789012:role/aviatrix-role-app"
	  aws_role_ec2 = "arn:aws:iam::123456789012:role/aviatrix-role-ec2"
	}

	# Create transit gateway
	# Omit ha_subnet to launch transit gateway without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in transit gateway

	resource "aviatrix_transit_gateway" "test_transit_gw" {
	  cloud_type = 1
	  account_name = aviatrix_account.test_acc.account_name
	  gw_name = "transit"
	  vpc_id = "vpc-abcd1234"
	  vpc_reg = "us-east-1"
	  gw_size = "t2.micro"
	  subnet = "10.20.0.0/24"
	  ha_subnet = "10.20.1.0/24"
	}

	# Create VGW connection with transit gateway.
	# Once this resource is created, VGW can be disconnected
	# from transit GW by destroying this resource using command:
	# terraform destroy --target aviatrix_vgw_conn.test_vgw_conn.

	resource "aviatrix_vgw_conn" "test_vgw_conn" {
	  conn_name = "my_conn"
	  gw_name = aviatrix_transit_gateway.test_transit_gw.gw_name
	  vpc_id = "vpc-abcd1234"
	  bgp_vgw_id = "vgw-abcd1234"
    bgp_vgw_account = aviatrix_account.test_acc.account_name
	  bgp_vgw_region = "us-east-1"
	  bgp_local_as_num = "65001"
    depends_on = ["aviatrix_transit_gateway.test_transit_gw"]
	}

	# Launch a spoke gateway, and join with transit gateway.
	# Omit ha_subnet to launch spoke gateway without HA.
	# ha_subnet can be later added or deleted to enable/disable HA in spoke gateway
	# Omit transit_gw to launch spoke gateway without attaching with transit gateway.
	# transit_gw can be later added or deleted to attach/detach from spoke gateway

	resource "aviatrix_spoke_gateway" "test_spoke" {
	  cloud_type = 1
	  account_name = aviatrix_account.test_acc.account_name
	  gw_name = "myspoke"
	  vpc_id = "vpc-defg1234"
	  vpc_reg = "us-east-1"
	  gw_size = "t2.micro"
	  subnet = "10.21.0.0/24"
	  ha_subnet = "10.21.1.0/24"
	  transit_gw = aviatrix_transit_gateway.test_transit_gw.gw_name
	  depends_on = ["aviatrix_vgw_conn.test_vgw_conn"]
	}

.. disqus::
