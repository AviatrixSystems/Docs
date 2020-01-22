﻿.. meta::
   :description: Anonymous Internet surfing, VPN
   :keywords: Site2cloud, site to cloud, OpenVPN, ipsec vpn, tunnel, peering, PBR, Policy Based Routing


========================================================
Anonymous Internet Surfing
========================================================



1. Solution Overview
======================

Normally when you surf an Internet website, the website administrator can easily identify where the user is located. This is done by identifying the source IP address (public IP address assigned to your location) contained in the packets.  Sometimes, business needs arise when your employee's internet browsing and online research needs to be anonymous or needs to appear to originate from some other place. For example, when analysis of competitors is required or when avoiding countries' firewalls for better performance and access.
This document describes how to set up anonymous browsing from a client machine by routing internet traffic through an AWS-based gateway in a different region.

2. Configuration Workflow
==========================

2.1 Pre Configuration checklist
-------------------------------

Before configuring VPC Site to Cloud peering, make sure the following prerequisites are completed.

**Pre Configuration Check List**

1.  Deploy the Aviatrix Controller

2.  Create AWS VPCs and Check Settings

These prerequisites are explained in detail below.

2.1.1  Deploy the Aviatrix Controller
-------------------------------------

The Aviatrix Controller must be deployed and setup prior to configuring
VPC and site peering. Please refer to "Aviatrix Controller Getting
Started Guide for AWS" on how to deploy the Aviatrix Controller.

`Aviatrix Controller Getting Started
Guide <https://s3-us-west-2.amazonaws.com/aviatrix-download/docs/aviatrix_aws_controller_gsg.pdf>`_

Check and make sure you can access the Aviatrix Controller dashboard and
login with an administrator account. The default URL for the Aviatrix
Controller is:

https://<public ip of Aviatrix Controller>

2.1.2  Create AWS VPCs and Check Settings
-----------------------------------------

-   Create 2 VPCs - VPC #1 (in Region 1) with CIDR 10.1.0.0/16 and VPC #2 (in Region 2) with CIDR 10.2.0.0/16

-   In VPC #1, create 2 public subnets in the same Availability Zone - 10.1.0.0/24 and 10.1.1.0/24.
    This means that both subnets must be associated with a route table whose default route points to IGW.

-   In VPC #2, create 1 public subnet - 10.2.0.0/24.
    This means that one subnet must be associated with a route table whose default route points to IGW.

2.2 Configuration Steps
-----------------------

Make sure the pre-configuration steps in the previous section are completed before proceeding.

The instructions in this section will use the following architecture.
The CIDR and subnets may vary depending on your VPC setup; however, the
general principles will be the same.

|image0|


2.2.1 Step a – Deploy Gateways
------------------------------

The first step is to deploy Aviatrix gateways in each VPC.

**Instructions:**

a.1.  Log in to the Aviatrix Controller Console

a.2.   Create Aviatrix Peering Gateway #1 in Subnet1 of VPC #1 (in Region 1)

a.3.  Click on Gateway -> "New Gateway"

===============================    ================================================================================
**Setting**                        **Value**
===============================    ================================================================================
Cloud Type                         Choose AWS
Gateway Name                       This name is arbitrary (e.g. vpc-01-avx-gw)
Account Name                       Choose the account name
Region                             Choose the region of VPC #1
VPC ID                             Choose the VPC ID of VPC #1
Public Subnet                      Select a public subnet where the gateway will be deployed (e.g. 10.1.0.0/24)
Gateway Size                       t2.micro is fine for testing
Enable NAT                         Uncheck this box (IMPORTANT)
VPN Access                         Uncheck this box
Designated Gateway                 Uncheck this box
Allocate New EIP                   Uncheck this box
Save Template                      Uncheck this box
===============================    ================================================================================

a.4.  Click “OK”. It will take a few minutes for the gateway to deploy. Do not proceed until the gateway is deployed.

a.5.  Create an Aviatrix VPN Gateway in Subnet2 of VPC #1 (note that VPN Gateway is in a different subnet of Peering Gateway)

a.6.  Click on Gateway -> "New Gateway"

===============================     ===================================================
  **Setting**                       **Value**
===============================     ===================================================
  Cloud Type                        Choose AWS
  Gateway Name                      This name is arbitrary (e.g. vpc-01-avx-vpn)
  Account Name                      Choose the account name
  Region                            Choose the region of VPC #1
  VPC ID                            Choose the VPC ID of VPC #1
  Public Subnet                     Select the public subnet where the VPN gateway will be deployed (e.g. 10.1.1.0/24)
  Gateway Size                      t2.micro is fine for testing.
  Enable NAT                        Uncheck this box
  VPN Access                        Check this box
  Designated Gateway                Uncheck this box
  Allocate New EIP                  Uncheck this box
  Enable SAML                       Uncheck this box
  VPN CIDR Block	                  (e.g. 192.168.43.0/24)
  MFA Authentication                Optional (Disable is fine for testing)
  Max Connections                   100 is fine for testing
  Split Tunnel Mode                 No
  Enable ELB	                     Yes
  ELB Name	                        Leave blank is fine for testing
  Enable Client Cert. Sharing       No
  Enable PBR                        Check this box
  PBR Subnet	                     Select the subnet where Aviatrix Peering Gateway is located (e.g. 10.1.0.0/24)
  PBR Default Gateway               Select the private IP of Aviatrix Peering Gateway (e.g. 10.1.0.138)
  NAT Translation Logging           Uncheck this box
  Enable LDAP	                     Optional (Uncheck this box is fine for testing)
  Save Template                     Uncheck this box
===============================     ===================================================

a.7.  Click “OK”. It will take a few minutes for the gateway to deploy. Do not proceed until the gateway is deployed.

a.8.  Create Aviatrix Peering Gateway #2 in VPC #2

a.9.  Click on Gateway -> "New Gateway"

===============================     ===================================================
  **Setting**                       **Value**
===============================     ===================================================
   Cloud Type                       Choose AWS
   Gateway Name                     This name is arbitrary (e.g. vpc-02-avx-gw)
   Account Name                     Choose the account name
   Region                           Choose the region of VPC #2
   VPC ID                           Choose the VPC ID of VPC #2
   Public Subnet                    Select a public subnet where the gateway will be deployed (e.g. 10.2.0.0/24)
   Gateway Size                     t2.micro is fine for testing
   Enable NAT                       Check this box (IMPORTANT)
   VPN Access                       Uncheck this box
   Designated Gateway               Uncheck this box
   Allocate New EIP                 Uncheck this box
   Save Template                    Uncheck this box
===============================     ===================================================

a.10.  Click “OK”. It will take a few minutes for the gateway to deploy. Do not proceed until the gateway is deployed.

a.11.  Done

2.2.2  Step b – Establish Site to Cloud peering connection
-----------------------------------------------------------

This step explains how to establish a Site to Cloud (S2C) connection between two Aviatrix Gateways in VPC #1 and VPC #2.

**Instructions:**

b.1.  From the Aviatrix Controller Console

b.2.  Click Site2Cloud -> Site2Cloud

b.3.  Click "+Add New" to establish a S2C connection from Aviatrix Peering Gateway #1 (in VPC #1) to Aviatrix Peering
Gateway #2 (in VPC #2).


===============================     =================================================================
  **Setting**                       **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC #1
  Connection Type                   Unmapped
  Connection Name                   This name is arbitrary (e.g. vpc01-s2c-vpc02)
  Remote Gateway Type               Aviatrix (in this example)
  Tunnel Type                       UDP
  Algorithms                        Uncheck this box
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Select Aviatrix Peering Gateway #1 in VPC #1 (e.g. vpc-01-avx-gw)
  Remote Gateway IP Address         Public IP of Aviatrix Peering Gateway #2 in VPC #2
  Pre-shared Key                    Optional
  Remote Subnet                     0.0.0.0/0
  Local Subnet                      IP of eth1 of Aviatrix VPN Gateway #1 (e.g. 10.1.0.190/32)
===============================     =================================================================

b.4.  Click button "OK"

b.5.  From the S2C connection table, select the Site2Cloud connection created above (e.g. vpc01-s2c-vpc02)

b.6.  Select "Aviatrix" from "Vendor" drop down list

b.7.  Click button "Download Configuration" then save it

b.8.  Click "+Add New" to establish a Site2Cloud connection from Aviatrix Peering Gateway #2

b.9.  Choose VPC ID of VPC #2 from "VPC ID/VNet Name" drop down list. Click button "Import" to upload
the downloaded configuration saved in Step b.7.

b.10. This template file contains the necessary information to configure the new S2C connection.

===============================     ===================================================
  **Setting**                       **Value**
===============================     ===================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC #2
  Connection Type                   Unmapped
  Connection Name                   This name is arbitrary (e.g. vpc02-s2c-vpc01)
  Remote Gateway Type               Aviatrix
  Tunnel Type                       UDP
  Algorithms                        Check this box
  Phase 1 Authentication 	         SHA-1
  Phase 2 Authentication 	         HMAC-SHA-1
  Phase 1 DH Groups  		         2
  Phase 2 DH Groups  		         2 
  Phase 1 Encryption 		         AES-256
  Phase 2 Encryption 		         AES-256
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Aviatrix Peering Gateway #2 (e.g. vpc-02-avx-gw)
  Remote Gateway IP Address         Public IP of Aviatrix Peering Gateway #1
  Pre-shared Key                    (automatically created)
  Remote Subnet                     IP of eth1 of Aviatrix VPN Gateway #1 (e.g. 10.1.0.190/32)
  Local Subnet                      0.0.0.0/0
===============================     ===================================================

Notes: The IP of eth1 of the Aviatrix VPN Gateway can be acquired from AWS console

b.11.  Click button "OK"

b.12.  Done


2.2.3  Step c – Create an OpenVPN® user
------------------------------------------------------------

This step explains how to create a OpenVPN® user.

**Instructions:**

c.1.  From the Aviatrix Controller Console

c.2.  Click OpenVPN® -> VPN Users

c.3.  Click button "+Add New"

===============================     ===================================================
  **Setting**                       **Value**
===============================     ===================================================
  VPC ID	                           Choose the VPC ID of VPC #1
  LB/Gateway Name                   Choose the ELB in VPC #1
  User Name 		 	               This name is arbitrary (ex. vpn-user)
  User Email			               Email address
  Profile			                  Uncheck this box is fine for the testing
===============================     ===================================================

c.4.  Click button "OK"

c.5.  Check your email to receive a .ovpn file

c.6.  Done

2.2.4  Step d – Start anonymous browsing
--------------------------------------------

This step explains how to establish an OpenVPN® connection and surf the network anonymously.

**Instructions:**

d.1.  Enable an OpenVPN® client tool

d.2.  Establish an OpenVPN® connection with the ovpn file which has received in email

d.3.  Confirm the connectivity to public network

d.3.1. Ping to www.google.com

d.3.1. Check public IP address (ie. https://www.whatismyip.com/what-is-my-public-ip-address/)

d.3.2. Check IP location (ie. https://www.iplocation.net/)

Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed at "status" column.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image0| image:: Anonymous_Browsing_media/Anonymous_Browsing.PNG
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
