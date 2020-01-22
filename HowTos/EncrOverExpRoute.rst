﻿.. meta::
   :description: Encryption over Express Route
   :keywords: Encryption, Azure, encryption over azure, ExpressRoute, Aviatrix

######################################################
Encryption over DirectConnect/ExpressRoute
######################################################



The Problem
------------

AWS Direct Connect and Azure ExpressRoute provide a private routed circuit to an AWS 
VPC and an Azure VNet. 

The Aviatrix Site2Cloud feature provides encryption over Direct Connect or ExpressRoute. 
This document describes how to implement the feature over Express Route. The same
method applies to AWS. 

The
VNet VPN gateway that terminates the ExpressRoute connects VNet virtual
machines with the on-prem servers in a traditional routing domain. While
Azure ExpressRoute provides a private link between a customer’s on-prem
network and an Azure VNet without going through the Internet, packets between
on-prem edge and VNet travel through exchange points and third party
provider networks and are not encrypted. If encryption is a requirement
for security and compliance reasons, this is a problem.


Aviatrix Solution for Encryption over ExpressRoute
---------------------------------------------------

The Aviatrix Site2Cloud solution can be applied to encrypt traffic over
ExpressRoute, as shown below.

      |image0|

In the diagram above, an encrypted IPSec tunnel is established between
an Aviatrix gateway and the customer’s edge router.

An Aviatrix gateway is deployed in a separate subnet from the subnets where
user virtual machines are launched. (The controller is not drawn.) This
is necessary as the Aviatrix gateway is the router for user subnets to
reach Enterprise datacenter.

An Aviatrix gateway can be deployed in a 1:1 redundancy fashion where a
backup gateway is ready to take over should the primary IPSec tunnel
go down due to gateway VM hardware/software failure.


Configuration Workflow
-----------------------

Before you start, make sure you have the latest software by checking the
Dashboard. If an alert message displays, click !New to download the
latest software.

For the network design, you need to decide if you want to enable HA for
the gateway.

The configuration workflow is as follows, with major steps highlighted.


| 1. Create a gateway in a VNet where you like to connect to the enterprise datacenter.
|     Go to Gateway -> Create, make sure:

      -  The gateway is launched in a different subnet from the user subnets. In this example, the gateway is deployed on Subnet1.

      -  The gateway may have VPN access disabled.

| 2. (Optional) If HA is enabled, create a backup gateway in the same VNet.
|     Go to Gateway -> Create, make sure:

    -  The gateway is launched in a different subnet from the user subnets. In
       this example, the gateway is deployed on Subnet1.

    -  The gateway may have VPN access disabled.

| 3. Create a connection to the Enterprise datacenter.
|    Go to site2Cloud -> Add New, make sure,
|
|   a. Select the VPC/VNet Name where the Aviatrix gateway for encryption is launched.
|   b. If HA is not enabled:
|      i. At the Gateway field, select a gateway launched earlier for encryption.
|   c. If HA is enabled:
|      i.  At the Primary Gateway field, select a gateway launched earlier as primary gateway.
|      ii.  At the Backup Gateway field, select a gateway launched earlier as backup gateway.
|   d. Input the connection with a unique name, for example, FirstExpressRoute
|   e. At Remote Gateway IP Address, enter the private IP address of the edge router for Enterprise datacenter.
|   f. At Remote Network, enter network CIDR of the Enterprise datacenter. If there are multiple subnets, enter each one separated with a comma.
|   g. Check Encryption over ExpressRoute/DirectConnect.
|   h. At the Route Table To Modify field, select the route table(s) associated with subnet2 and subnet3 .
|


| 4. Download the configuration template
|    Go to site2Cloud,
|
|   a. Select the connection.
|   b. Click Download Configuration.
|   c. If your remote edge device is not listed in the dropdown menu, simply select an available one in the menu.
|   d. Click “Download Configuration” to download a template file that contains
      the gateway public IP address, VPC CIDR, pre-shared secret and
      encryption algorithm. Incorporate the information to your remote
      router/firewall configuration.
|
| 5. At the Enterprise datacenter or remote site, configure encryption on the edge device.
|   Make sure your peer network is Subnet2 and Subnet3, as shown in this example.
|

.. |image0| image:: EncOverExpRoute_media/image1.png
   :width: 5.55625in
   :height: 3.26548in


.. add in the disqus tag

.. disqus::
