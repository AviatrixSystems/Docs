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

=================================
Site2Cloud IPSec VPN Instructions
=================================

Overview
========

Aviatrix supports connectivity between its Gateways in the cloud and on-premise routers using a feature called `Site2Cloud`, as shown below.  This document outlines how to get connectivity established between an Aviatrix Gateway in AWS, Azure, or GCP and your on-premise router or firewall.

|site2cloud_new|


Configuration Workflow
=========================

Create Site2Cloud Connection
----------------------------

#. Login to your Aviatrix Controller.
#. Select the Site2Cloud navigation item on the left navigation bar.
#. Click on `+ Add New` near the top of the `Site2Cloud` tab.
#. Under `Add a New Connection`, enter the following:
   
   +-------------------------------+----------------------------------------------+
   | Field                         | Description                                  |
   +===============================+==============================================+
   | VPC ID / VNet Name            | Select the VPC or VNet where this tunnel     |
   |                               | will terminate in the cloud.                 |
   +-------------------------------+----------------------------------------------+
   | Connection Type               | `Unmapped` unless Local Subnet and Remote    |
   |                               |  Subnet are overlapped.                      |
   +-------------------------------+----------------------------------------------+
   | Connection Name               | Name this connection.  This connection       |
   |                               | represents the connectivity to the edge      |
   |                               | device.                                      |
   +-------------------------------+----------------------------------------------+
   | Remote Gateway Type           | `Generic`, `AWS VGW`, `Azure VPN`,           |
   |                               | `Aviatrix`, or `SonicWall`.                  |
   |                               | See below for additional details.            |
   +-------------------------------+----------------------------------------------+
   | Tunnel Type                   | `Route-based` or `Policy-based`              |
   |                               |                                              |
   |                               | .. note::                                    |
   |                               |    If Connection Type `Mapped` is selected   |
   |                               |    only `Route-based' is supported.          |
   |                               |                                              |
   +-------------------------------+----------------------------------------------+
   | Algorithms                    | Defaults will be used if unchecked. See      |
   |                               | below for more details.                      |
   +-------------------------------+----------------------------------------------+
   | IKEv2                         | Select the option to connect to the remote   |
   |                               | site using IKEv2 protocol.                   |
   +-------------------------------+----------------------------------------------+
   | Encryption over ExpressRoute/ | An additional field will be displayed if     |
   | DirectConnect                 | checked.                                     |
   +-------------------------------+----------------------------------------------+
   | Route Tables to Modify        | Only displayed if Encrypting over            |
   |                               | DirectConnect/ExpressRoute is selected.      |
   |                               | Select the specific routes tables to be      |
   |                               | programmed with remote CIDR routes.          |
   +-------------------------------+----------------------------------------------+
   | Enable HA                     | Enable High Availability. Additional fields  |
   |                               | are displayed when checked.                  |
   +-------------------------------+----------------------------------------------+
   | Primary Cloud Gateway         | Select the Gateway where the tunnel will     |
   |                               | terminate in this VPC.                       |
   +-------------------------------+----------------------------------------------+
   | Remote Gateway IP Address     | IP address of the device.                    |
   +-------------------------------+----------------------------------------------+
   | Pre-shared Key                | Optional.  Enter the pre-shared key for this |
   |                               | connection.  If nothing is entered, one will |
   |                               | be generated for you.                        |
   +-------------------------------+----------------------------------------------+
   | Remote Subnet (Real)          | Specify a list of the destination network    |
   |                               | CIDRs, separated by comma, that will         |
   |                               | be encrypted. For example, 10.10.1.0/24, 10. |
   |                               | 10.2.0./24                                   |
   +-------------------------------+----------------------------------------------+
   | Remote Subnet (Virtual)       | Only applicable when Connection Type is      |
   |                               | `Mapped`. Specify a list of virtual remote   |
   |                               | network                                      |
   |                               | CIDRs that is 1-1 mapped to the Remote       |
   |                               | Subnet Real. For example, if the real        |
   |                               | subnets are 10.10.1.0/24, 10.10.2.0/24       |
   |                               | 24, you can specify the virtual remote       |
   |                               | subnets as                                   |
   |                               | 192.168.1.0/24, 192.168.2.0/24               |
   +-------------------------------+----------------------------------------------+
   | Local Subnet (Real)           | Specify a list of the source network CIDRs   |
   |                               | , separated by comma, that will be encrypted.|
   |                               | For example, 172.16.1.0/24, 172.16.2.0/24    |
   +-------------------------------+----------------------------------------------+
   | Local Subnet (Virtual)        | Only applicable when Connection Type is      |
   |                               | `Mapped`. Specify a list of virtual local    |
   |                               | network                                      |
   |                               | CIDRs that are 1-1 mapped to the Local       |
   |                               | Subnet Real. For example, if the real        |
   |                               | subnets are 172.16.1.0/24, 172.16.2.0/24,    |
   |                               | you can specify the virtual local            |
   |                               | subnets as                                   |
   |                               | 192.168.7.0/24, 192.168.8.0/24               |
   +-------------------------------+----------------------------------------------+
   | Backup Gateway                | Only available when 'Enable HA' is selected. |
   |                               | Backup Gateway should be the .hagw created   |
   |                               | at 'Gateway'->'Edit'->'Gateway for High      |
   |                               | Availability Peering'                        |
   +-------------------------------+----------------------------------------------+
   | Remote Gateway IP Address     | Only available when 'Enable HA' is selected. |
   | (Backup)                      | IP address of the backup gateway (.hagw)     |
   +-------------------------------+----------------------------------------------+
   | Same Pre-Shared Key as Primary| Check the option if the backup tunnel uses   |
   |                               | the same pre-shared key as the primary       |
   +-------------------------------+----------------------------------------------+
   | Pre-shared Key (Backup)       | Only available when 'Enable HA' is selected. |
   |                               | Optional. Enter the pre-shared key for this  |
   |                               | backup connection. If nothing is entered,    |
   |                               | one will be generated for you.               |
   +-------------------------------+----------------------------------------------+

.. important::

  If the Local Subnet field is outside of gateway VPC/VNet, you need to open the gateway inbound security groups to allow the Local Subnet network CIDR ranges. 


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
   | Local Subnet(Virtual)         | Enter a virtual CIDR that will represent |
   |                               | the real subnet.                         |
   +-------------------------------+------------------------------------------+

   .. tip::
      The remote and local subnet fields can contain multiple values.  Use a comma (,) to separate the values.

   .. tip::
      If you use multiple values for the real subnets, you must use an equal number of subnets in the virtual field.

   .. note::
      1:1 mapping is supported as long as both sides are configured properly.  For example, you can configure:

      | Remote Subnet(Real): 10.1.7.10/32      
      | Remote Subnet(Virtual): 172.16.7.10/32
      |
      | Local Subnet(Real): 10.1.7.15/32
      | Local Subnet(Virtual): 192.168.7.45/32

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
   | AWS VGW                       | For terminating on an AWS Virtual Private |
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
   | Phase 1 Authentication       |
   +-------------------------------+
   | Phase 1 DH Groups             |
   +-------------------------------+
   | Phase 1 Encryption            |
   +-------------------------------+
   | Phase 2 Authentication       |
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

Edit Connection
=================

Once a connection is created, you can download the configuration or edit parameters. 
To do this, select **Site2Cloud** from the navigation menu and select the connection you just created.

Download Configuration
----------------------

You can generate remote site configuration template. 

Select the remote site device from the dropdowns provided.  If your remote site device is not listed in the dropdown menu, simply select an available one in the menu or use the **Generic**/**Vendor Independent** template.

This template file contains the gateway public IP address, VPC CIDR, pre-shared secret and encryption algorithm. Incorporate the information to your remote router/firewall configuration. If the remote gateway is a Aviatrix CloudN, go to site2cloud and simply import the downloaded configuration file and click OK. 

Local Identifier
----------------

By default, Aviatrix configures gateway's public IP as Local Identifier. User can adjust this settings to gateway's private IP.

Dead Peer Detection
--------------------

This field is not applicable to Site2Cloud connection established by `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. 

Dead Peer Detection (DPD) is a standard mechanism (RFC 3706) between IPSEC tunnels to 
send periodic messages to ensure the remote site is up. 

By default DPD detection is enabled. 

Active Active HA
----------------

Allow site2cloud gateways to support Active-Active mode where both tunnels are up and packets are routed to both gateways via respective VPC route tables. 

To enable this, go to SITE2CLOUD, edit the connection on the Setup page, scroll down to Active Active HA and click the button ENABLE.

Periodic Ping
--------------------

In very rare cases Site2cloud tunnels may fail to pass traffic if the tunnel is dormant for a long period of time. This is not an issue with the Aviatrix Gateways and can usually be traced to misconfigurations on the remote device. To compensate for this Periodic Ping was developed to maintain a steady flow of traffic across the tunnel. 

For configuration steps read the full article here:  `Periodic Ping <https://docs.aviatrix.com/HowTos/periodic_ping.html>`_

Network Device Support
======================

Aviatrix site2cloud supports all types of on-prem firewall and router devices that 
terminate VPN connection. Below are configuration examples to specific devices. 

    - `Azure VPN Gateway <./avxgw_azurevpngw_site2cloud.html>`_
    - `AWS VGW <./site2cloud_awsvgw.html>`_
    - `pfSense IPsec VPN <./CloudToPfSense.html>`__
    - `Palo Alto Next-Gen Firewall (PAN) <./S2C_GW_PAN.html>`__
    - `Check Point Firewall <./S2C_GW_CP.html>`__
    - `Cisco ASA <./S2C_GW_ASA.html>`__
    - `FortiGate <./site2cloud_fortigate.html>`__
    - `Cisco Meraki MX64 <./site2cloud_meraki.html>`__
    - `Cisco ISR <./S2C_GW_IOS.html>`__
    - `Cisco Meraki vMX100 <./site2cloud_meraki_vmx100.html>`_
    - `Aviatrix Gateway <./site2cloud_aviatrix.html>`_

Additional Use Cases
=====================

Real world use cases sometimes require a combination of site2cloud and other features, such as `SNAT <https://docs.aviatrix.com/HowTos/gateway.html#source-nat>`_ and `DNAT <https://docs.aviatrix.com/HowTos/gateway.html#destination-nat>`_. 

Here are a few documents in the Tech Notes session that demonstrate how you can solve some of them. 

  - `Site2Cloud with customized SNAT <https://docs.aviatrix.com/HowTos/s2c_vgw_snat.html>`_.
  - `Site2Cloud for overlapping IP addresses <https://docs.aviatrix.com/HowTos/s2c_overlapping_subnets.html>`_.
  - `Site2Cloud to public IP addresses <https://docs.aviatrix.com/HowTos/s2c_for_publicIP.html>`_.
  - `How to build site to site connection <https://docs.aviatrix.com/HowTos/site_to_site_vpn.html>`_
  - `Connecting offices to multiple VPCs using AWS Peering <https://docs.aviatrix.com/HowTos/simpletransit.html>`_
  - `Connect Networks with Overlap CIDRs <https://docs.aviatrix.com/HowTos/connect_overlap_cidrs.html>`_
  - `Connect Overlapping VPC to On-prem <https://docs.aviatrix.com/HowTos/connect_overlap_vpc_via_VGW.html>`_


Troubleshooting
===============

To check a tunnel state, go to Site2Cloud. The tunnel status appears next to the connection.

Diagnostics and troubleshooting options are available in the **Diagnostics** tab.  You must first select the connection, and then select an **Action**, followed by **OK**.

.. |site2cloud| image:: site2cloud_media/site2cloud.png
   :scale: 50%

.. |site2cloud_new| image:: site2cloud_media/site2cloud_new.png
   :scale: 50%

.. disqus::
