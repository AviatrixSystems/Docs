=========================================================
Site2Cloud between Azure VPN Gateway and Aviatrix Gateway
=========================================================

This guide helps you to configure Site2Cloud IPSEC tunnels between an Aviatrix gateway and an Azure "Virtual network gateway"

Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

The Site2Cloud on CloudN configuration workflow is very simple.  

1. At Aviatrix Controller, go to "Gateway" page to create one non-vpn gateway.

#. At Azure portal, go to "Virtual network gateways" page. Fill in the following information to create a new virtual network gateway:

     - Name: Enter an Azure VPN gateway name (e.g. Azure-VPN-GW)

     - Gateway type: VPN

     - VPN type: Policy-based

     - SKU: Basic

     - Location: Select a desired location

     - Virtual network: Select a desired VNet

#. Once the virtual network gateway is provisioned, record its public IP address

#. At Aviatrix Controller, go to "Site2Cloud" page. Fill in the following information to create a site2cloud connection:

     - VPC ID/VNet Name: Select the VPC/VNet where your Aviatrix gateway is created in Step 1

     - Connection Type: Unmapped

     - Connection Name: Enter a site2cloud connection name

     - Remote Gateway Type: Select "Azure VPN"

     - Algorithms: Uncheck this box

     - Encryption over ExpressRoute/DirectConnect: Uncheck this box

     - Enabled HA: Uncheck this box

     - Primary Cloud Gateway: Select the gateway created in Step 1

     - Remote Gateway IP Address: Enter the public IP of your virutal network gateway (collected at Step 3)

     - Pre-shared Key: Enter your own pre-share key or leave it blank so that Controller will generate one

     - Remote Subnet: Enter the CIDR of the VNet, in which your virtual network gateway is created in Step 2

     - Local Subnet: Enter the CIDR of the VPC/VNet, in which your Aviatrix gateway is created in Step 1

#. Once the site2cloud connection is created, select the same connection at "Site2Cloud" page. Select the following values for each specific field and click "Download Configuration" button.

     - Vendor: Generic

     - Platform: Generic

     - Software: Vendor Independent

#. Collect the following information from the downloaded configuration template:

     - Pre-Shared Key from "#1: Internet Key Exchange Configuration"

     - Aviatrix Gateway Public IP from "#3: Tunnel Interface Configuration"

     - Cloud Network(s) from "Subnets" section of "#3: Tunnel Interface Configuration"

#. At Azure portal, go to "Local network gateways" page. Enter the following information to create a local network gateway:

     - Name: Enter a local gateway name (e.g. AVX-GW)

     - IP address: Enter the Aviatrix gateway's public IP collected at Step 6

     - Address space: Enter "Cloud Network" CIDR collected at Step 6

     - Configure BGP settings: uncheck

#. At Azure portal, go to "Virtual network gateways" page and select the gateway created at Step 2

#. Select "Connections" from "Settings". Enter the following information to create a connection:

     - Name: Enter a VPN connection name (e.g. Azure-AVX-S2C)

     - Connection type: Select "Site-to-site (IPsec)"

     - Virtual network gateway: Select the VPN gateway created at Step 2

     - Local network gateway: Select the local gateway created at Step 7

     - Shared key (PSK): Enter the pre-shared key collected at Step 6

#. Send some interesting traffic between Aviatrix gateway's VPC/VNet and Azure VPN gateway's VNet to bring up the site2cloud connection



Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.
