.. meta::
   :description: Site 2 Cloud
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, cisco, fortigate, pfsense, palo alto

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

==============================
Site to Cloud VPN Instructions
==============================

Overview
========

Aviatrix supports connectivity between its Gateways in the cloud and on-premise routers using a feature called `Site2Cloud`, as shown below.  This document outlines how to get connectivity established between an Aviatrix Gateway in AWS, Azure, or GCP and your on-premise router or firewall.

|site2cloud|


Configuration Workflow
======================

Create Site2Cloud Connection
----------------------------

#. Login to your Aviatrix Controller.
#. Select the Site2Cloud navigation item on the left navigation bar.
#. Click on `+ Add New` near the top of the `Site2Cloud` tab.
#. Under `Add a New Connection`, enter the following:
   
   +-------------------------------+------------------------------------------+
   | Field                         | Description                              |
   +===============================+==========================================+
   | VPC ID / VNet Name            | Select the VPC or VNet where this tunnel |
   |                               | will terminate in the cloud.             |
   +-------------------------------+------------------------------------------+
   | Connection Type               | `Unmapped` unless there is an            |
   |                               | overlapping CIDR block.                  |
   +-------------------------------+------------------------------------------+
   | Connection Name               | Name this connection.  This connection   |
   |                               | represents the connectivity to the       |
   |                               | edge device.                             |
   +-------------------------------+------------------------------------------+
   | Remote Gateway Type           | `Generic`, `AWS VGW`, `Azure VPN`,       |
   |                               | `Aviatrix`, or `SonicWall`.              |
   |                               | See below for additional details.        |
   +-------------------------------+------------------------------------------+
   | Tunnel Type                   | `UDP` or `TCP`                           |
   |                               | .. note::                                |
   |                               | `TCP` tunnel type requires an            |
   |                               | Aviatrix Gateway on the other side.      |
   +-------------------------------+------------------------------------------+
   | Algorithms                    | Defaults will be used if unchecked.      |
   |                               | See below for more details.              |
   +-------------------------------+------------------------------------------+
   | Encryption over ExpressRoute/ | An additional field will be displayed    |
   | DirectConnect                 | if checked.                              |
   +-------------------------------+------------------------------------------+
   | Route Tables to Modify        | Only displayed if Encrypting over        |
   |                               | DirectConnect/ExpressRoute.              |
   |                               | Select the specific routes to encrypt    |
   +-------------------------------+------------------------------------------+
   | Enable HA                     | Additional fields are displayed when     |
   |                               | checked                                  |
   +-------------------------------+------------------------------------------+
   | Primary Cloud Gateway         | Select the Gateway where the tunnel will |
   |                               | terminate in this VPC.                   |
   +-------------------------------+------------------------------------------+
   | Remote Gateway IP Address     | IP address of the device.                |
   +-------------------------------+------------------------------------------+
   | Pre-shared Key                | Optional.  Enter the pre-shared key for  |
   |                               | this connection.  If nothing is entered  |
   |                               | one will be generated for you.           |
   +-------------------------------+------------------------------------------+

Connection Type: Unmapped
+++++++++++++++++++++++++

For unmapped connections, the following two fields will be displayed:

   +-------------------------------+------------------------------------------+
   | Field                         | Description                              |
   +===============================+==========================================+
   | Remote Subnet                 | Enter the CIDR representing the remote   |
   |                               | network.                                 |
   +-------------------------------+------------------------------------------+
   | Local Subnet                  | The CIDR block of the local VPC/VNet     |
   |                               | subnet.  If left blank, Aviatrix will    |
   |                               | use the full VPC/VNet CIDR.              |
   +-------------------------------+------------------------------------------+

   .. tip::
      The remote and local subnet fields can contain multiple values.  Use a comma (,) to separate the values.

   
Connection Type: Mapped
+++++++++++++++++++++++++

For mapped connections, the following four fields will be displayed:

   +-------------------------------+------------------------------------------+
   | Field                         | Description                              |
   +===============================+==========================================+
   | Remote Subnet(Real)           | Enter the real CIDR of the               |
   |                               | remote network.                          |
   +-------------------------------+------------------------------------------+
   | Remote Subnet(Virtual)        | Enter a virtual CIDR that will represent |
   |                               | the real subnet.                         |
   +-------------------------------+------------------------------------------+
   | Local Subnet(Real)            | The real CIDR block of the local VPC/VNet|
   |                               | subnet.  If left blank, Aviatrix will    |
   |                               | the full VPC/VNet CIDR.                  |
   +-------------------------------+------------------------------------------+
   | Local Subnet(Virtual)         | Enter a vritual CIDR that will represent |
   |                               | the real subnet.                         |
   +-------------------------------+------------------------------------------+

   .. tip::
      The remote and local subnet fields can contain multiple values.  Use a comma (,) to separate the values.

   .. tip::
      If you use multiple values for the real subnets, you must use an equal number of subnets in the virtual field.

#. Click `OK`


Configuration Details
---------------------

.. _remote_gateway_type:

Remote Gateway Type
+++++++++++++++++++

   +-------------------------------+------------------------------------------+
   | Type                          | Description                              |
   +===============================+==========================================+
   | Generic                       | Use this option for most third-party     |
   |                               | routers and firewalls.                   |
   +-------------------------------+------------------------------------------+
   | AWS VGW                       | For terminating on a AWS Virtual Private |
   |                               | Gateway, select this option.             |
   +-------------------------------+------------------------------------------+
   | Azure VPN                     | For terminating on Azure VPN Services    |
   +-------------------------------+------------------------------------------+
   | Aviatrix                      | When terminating on an Aviatrix CloudN   |
   |                               | on-premise gateway.                      |
   +-------------------------------+------------------------------------------+
   | SonicWall                     |                                          |
   +-------------------------------+------------------------------------------+

Algorithms
++++++++++

If the `Algorithms` checkbox is unchecked, the default values will be used.  If it is checked, you can set any of the fields defined below.

   +-------------------------------+
   | Field                         |
   +===============================+
   | Phase 1 Autheentication       |
   +-------------------------------+
   | Phase 1 DH Groups             |
   +-------------------------------+
   | Phase 1 Encryption            |
   +-------------------------------+
   | Phase 2 Autheentication       |
   +-------------------------------+
   | Phase 2 DH Groups             |
   +-------------------------------+
   | Phase 2 Encryption            |
   +-------------------------------+

Remote and Local Subnet(s)
++++++++++++++++++++++++++

Enter the subnet(s) using a comma to delimit more than one CIDR.

If you leave the local subnet field blank, the default value is the VPC/VNet CIDR.  If you enter a value, make sure you include the VPC/VNet as well.

These Local Subnets are advertised to Remote Subnets that the site2cloud connection can reach.

You can change these settings later.

Download Configuration
----------------------

You can generate remote site configuration template.  To do this, select **Site2Cloud** from the navigation menu and select the connection you just created.

Select the remote site device from the dropdowns provided.  If your remote site device is not listed in the dropdown menu, simply select an available one in the menu or use the **Generic**/**Vendor Independent** template.

This template file that contains the gateway public IP address, VPC CIDR, pre-shared secret and encryption algorithm. Incorporate the information to your remote router/firewall configuration. If the remote gateway is a Aviatrix CloudN, go to site2cloud and simply import the downloaded configuration file and click OK. 

Network Device Support
======================

Aviatrix site2cloud supports all types of on-prem firewall and router devices that 
terminate VPN connection. Below are configuration examples to specific devices. 

    - `pfSense IPsec VPN <./CloudToPfSense.html>`__
    - `Palo Alto Next-Gen Firewall (PAN) <./S2C_GW_PAN.html>`__
    - `Check Point Firewall <./S2C_GW_CP.html>`__
    - `Cisco ASA <./S2C_GW_ASA.html>`__
    - `FortiGate <./site2cloud_fortigate.html>`__

Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status appear next to the connection.

Diagnostics and troubleshooting options are available in the **Diagnostics** tab.  You must first select the connection, and then select an **Action**, followed by **OK**.

.. |site2cloud| image:: site2cloud_media/site2cloud.png
   :scale: 50%

.. disqus::
