.. meta::
   :description: Aviatrix Terraform Provider
   :keywords: terraform, terraform provider, api

===========================
Aviatrix Terraform Provider
===========================

Aviatrix terraform provider is used to interact with Aviatrix resources. 

Read the `Aviatrix Terraform Provider Tutorial <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_ to setup the environment.

The provider allows you to manage Aviatrix resources like account, gateway, peering, etc. It needs to be configured with valid Aviatrix UCC/CloudN's IP, and account credentials. Click this `link <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_ to read how to setup transit VPC using terraform.

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

	# Create Aviatrix AWS access account with IAM roles
	# account_name - Aviatrix cloud account name
	# cloud_type - Enter 1 for AWS. Only AWS is currently supported.
	# aws_account_number - AWS account number
	# aws_iam - Enter true if you want to use IAM role to configure account

	resource "aviatrix_account" "tempacc" {
	  account_name = "username"
	  cloud_type = 1
	  aws_account_number = "123456789012"
	  aws_iam = "true"
	}

	# Or you can create Aviatrix AWS access account with access_key/secret key
	resource "aviatrix_account" "tempacc" {
	  account_name = "username"
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
	  domain_list = [
          {
           fqdn = "facebook.com"
           proto = "tcp"
           port = "443"
          },
          {
           fqdn = "reddit.com"
           proto = "tcp"
           port = "443"
          }	
        ]



aviatrix_firewall_tag
---------------------
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
------------------
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
	              src_ip = "test_tag"
	              log_enable = "off"
	              dst_ip = "10.12.1.172/32"
	              allow_deny = "deny"
	              port = "0-65535"
	            }
	          ]
	}

aviatrix_site2cloud
-------------------
Manages Aviatrix Site2Cloud connection

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# vpc_id - VPC Id where cloud gateway lies.
	# conn_name - Site2Cloud connection name
	# pre_shared_key - (Optional) Valid pre-shared key
	# remote_gw_type - Remote GW type - generic, aws, azure, avx, sonicwall
	# tunnel_type - (Optional) tcp or udp
	# remote_gw_ip - Public IP of remote onprem GW
	# remote_subnet - Subnet CIDR of remote GW
	# local_subnet - Subnet CIDR of cloud gateway

	resource "aviatrix_site2cloud" "test_s2c" {
	  vpc_id = "vpc-abcd1234"
	  conn_name = "myconn"
	  remote_gw_type = "generic"
	  tunnel_type = "udp"
	  gw_name = "gw1"
	  remote_gw_ip = "5.5.5.5"
	  remote_subnet = "10.23.0.0/24"
	  local_subnet = "10.20.1.0/24"
	}

aviatrix_vpn_user
-----------------
Manages Aviatrix VPN user

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# vpc_id - VPC Id of Aviatrix VPN gateway
	# gw_name - Aviatrix VPN gateway name
	# user_name - VPN user name
	# user_email - VPN User's email

	resource "aviatrix_vpn_user" "test_vpn_user" {
	  vpc_id = "vpc-abcd1234"
	  gw_name = "gw1"
	  user_name = "user"
	  user_email = "abc@xyz.com"
	}


aviatrix_profile
----------------
Manages VPN user Profiles

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# name - Enter any name for the profile 
	# base_rule - Enter allow_all or deny_all, based on whether you want a white list or black list
	# users - List of VPN users to attach to this profile
	# policy - List of policies for the profile.
           Each policy has the following attribute
              action - ("allow"/"deny") (should be the opposite of the base rule for correct behaviour)
              proto - ("all"/"tcp"/"udp"/"icmp"/"sctp"/"rdp"/"dccp") -protocol to allow or deny
              port - Port to be allowed or denied
              target - CIDR to be allowed or denied

	resource "aviatrix_profile" "test_profile1" {
	  name = "my_profile"
	  base_rule = "allow_all"
	  users = ["user1", "user2"]
	  policy = [
          {
           action = "deny"
           proto = "tcp"
           port = "443"
           target = "10.0.0.0/32"
          },
          {
           action = "deny"
           proto = "tcp"
           port = "443"
           target = "10.0.0.1/32"
          }	
        ]

	resource "aviatrix_profile" "test_profile2" {
	  name = "my_profile"
	  base_rule = "deny_all"
	  users = ["user1", "user2"]
	  policy = [
          {
           action = "allow"
           proto = "tcp"
           port = "443"
           target = "10.0.0.0/32"
          },
          {
           action = "allow"
           proto = "tcp"
           port = "443"
           target = "10.0.0.1/32"
          }	
        ]


aviatrix_aws_peer
-----------------
Manages an AWS peering

**Example Usage**
::

	provider "aviatrix" {
	  controller_ip = "1.2.3.4"
	  username = "admin"
	  password = "password"
	}

	# account_name1 - Aviatrix account name to associate 1st VPC with.
	# account_name2 - Aviatrix account name to associate 2nd VPC with.
	# vpc_id1 - AWS VPC ID for 1st VPC.
	# vpc_id2 - AWS VPC ID for 2nd VPC.
	# vpc_reg1 - AWS VPC region for 1st VPC.
	# vpc_reg2 - AWS VPC region for 2nd VPC.
	# rtb_list1 - (Optional, by default it peers for all VPC CIDRs)
	              # Enter list of AWS route table IDs associated with 1st VPC that you want to peer. Enter ["all"] for all VPC CIDRs
	# rtb_list2 - (Optional, by default it peers for all VPC CIDRs)
	               # Enter list of AWS route table IDs associated with 2nd VPC that you want to peer. Enter ["all"] for all VPC CIDRs

	resource "aviatrix_aws_peer" "test_aws_peer" {
	  account_name1 = "devops"
	  account_name2 = "devops"
	  vpc_id1 = "vpc-abcd1234"
	  vpc_id2 = "vpc-defg1234"
	  vpc_reg1 = "us-east-1"
	  vpc_reg2 = "us-east-1"
	  rtb_list1 = ["all"]
	  rtb_list2 = ["rtb-defg1234", "rtb-defg2345"]
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


.. disqus::
