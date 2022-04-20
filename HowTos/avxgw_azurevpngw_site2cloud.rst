=========================================================
Aviatrix Gateway to Azure VPN Gateway
=========================================================

This guide helps you to configure Site2Cloud IPsec tunnels between an Aviatrix Gateway and an Azure Virtual Network Gateway (VNG).

Configuration Workflow
======================

Before you start, make sure you have the latest software by checking the
Dashboard. If an alert message displays, click **Upgrade** to download the
latest software.

The Site2Cloud on CloudN configuration workflow is very simple.  

1. In Aviatrix Controller, go to Gateway page to create one non-VPN gateway.


#. At the Azure portal, go to the Virtual network gateways page. Fill in the following information to create a new Virtual Network Gateway:

+--------+-----------------------------------------------------+
| Name   | Enter an Azure VPN gateway name (e.g. Azure-VPN-GW) |
+--------+-----------------------------------------------------+
|Gateway | type: VPN                                           |
+--------+-----------------------------------------------------+
|VPN type| Policy-based                                        |
+--------+-----------------------------------------------------+
|SKU     | Basic                                               |
+--------+-----------------------------------------------------+
|Location| Select a desired location                           |
+--------+-----------------------------------------------------+
|Virtual | Select a desired VNet                               |
|network |                                                     |
+--------+-----------------------------------------------------+

#. Once the virtual network gateway is provisioned, record its public IP address.


#. In Aviatrix Controller, go to the Site2Cloud page. Fill in the following information to create a Site2Cloud connection:

+-------------------+----------------------------------------------------------------------------+
| VPC ID/VNet Name  | Select the VPC/VNet where your Aviatrix gateway is created at Step 1       |
+-------------------+----------------------------------------------------------------------------+
| Connection Type   | Unmapped                                                                   |
+-------------------+----------------------------------------------------------------------------+
| Connection Name   | Enter a Site2Cloud connection name                                         |
+-------------------+----------------------------------------------------------------------------+
| Remote Gateway    | Select **Azure VPN**                                                       |
| Type              |                                                                            |
+-------------------+----------------------------------------------------------------------------+
| Algorithms        | Unmark this checkbox                                                       |
+-------------------+----------------------------------------------------------------------------+
| Encryption over   | Unmark this checkbox                                                       |
| ExpressRoute/     |                                                                            |
| Direct Connect    |                                                                            |
+-------------------+----------------------------------------------------------------------------+
| Enabled HA        | Unmark this checkbox                                                       |
+-------------------+----------------------------------------------------------------------------+
| Primary Cloud     | Select the gateway created at Step 1                                       |
| Gateway           |                                                                            |
+-------------------+----------------------------------------------------------------------------+
| Remote Gateway    | Enter the public IP of your virtual network gateway (collected at          |
| IP Address        | Step 3)                                                                    |
+-------------------+----------------------------------------------------------------------------+
| Pre-shared Key    | Enter your own pre-shared key or leave it blank so that Controller will    |
|                   | generate one                                                               |
+-------------------+----------------------------------------------------------------------------+
| Remote Subnet     | Enter the CIDR of the VNet in which your Virtual Network Gateway is        |
|                   | created at Step 2                                                          |
+-------------------+----------------------------------------------------------------------------+
| Local Subnet      | Enter the CIDR of the VPC/VNet in which your Aviatrix Gateway is           |
|                   | created at Step 1                                                          |
+-------------------+----------------------------------------------------------------------------+

#. Once the Site2Cloud connection is created, select the same connection at the Site2Cloud page. Select the following values for each specific field and click **Download Configuration**.

+----------+---------------------+
| Vendor   | Generic             |
+----------+---------------------+ 
| Platform | Generic             |
+----------+---------------------+
| Software | Vendor Independent  |
+----------+---------------------+

#. Collect the following information from the downloaded configuration template:

+------------------------+-------------------------------------+
| Pre-Shared Key from #1 | Internet Key Exchange Configuration |
+------------------------+-------------------------------------+
| Aviatrix Gateway Public| Tunnel Interface Configuration      |
| IP from #3             |                                     |
+------------------------+-------------------------------------+ 
| Cloud Network(s) from  | Tunnel Interface Configuration      |
| the Subnets section    |                                     |
| of #3                  |                                     |
+------------------------+-------------------------------------+

#. At the Azure portal, go to the Local network gateways page. Enter the following information to create a local network gateway:

+---------------+--------------------------------------------------------------+
| Name          | Enter a local gateway name (e.g. AVX-GW)                     |
+---------------+--------------------------------------------------------------+
| IP address    | Enter the Aviatrix Gateway's public IP collected at Step 6   |
+---------------+--------------------------------------------------------------+
| Address space | Enter the "Cloud Network" CIDR collected at Step 6           |
+---------------+--------------------------------------------------------------+
| Configure     | Unmark this checkbox                                         |
+---------------+--------------------------------------------------------------+
| BGP settings  |                                                              |
+---------------+--------------------------------------------------------------+

#. At Azure portal, go to Virtual network gateways page and select the gateway created at Step 2.


#. Select "Connections" from "Settings". Enter the following information to create a connection:

+------------------------------+-------------------------------------------------------+
| Name                         | Enter a VPN connection name (e.g. Azure-AVX-S2C)      |
+------------------------------+-------------------------------------------------------+
| Connection type              | Select **Site-to-site (IPsec)**                       |
+------------------------------+-------------------------------------------------------+
| Virtual network gateway      | Select the VPN gateway created at Step 2              |
+------------------------------+-------------------------------------------------------+
| Local network gateway        | Select the local gateway created at Step 7            |
+------------------------------+-------------------------------------------------------+
| Shared key (PSK)             | Enter the pre-shared key collected at Step 6          |
+------------------------------+-------------------------------------------------------+

Troubleshooting
===============

To check a tunnel state, go to Site2Cloud. The tunnel status will be
displayed in a popup window.

To troubleshoot a tunnel state, go to Site2Cloud > Diagnostics.


.. disqus::
