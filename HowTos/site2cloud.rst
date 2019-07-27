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
   |                               |                                          |
   |                               | .. note::                                |
   |                               |    `TCP` tunnel type requires an Aviatrix|
   |                               |    gateway on both sides.                |
   |                               |                                          |
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

Dead Peer Detection
--------------------

This field is not applicable to Site2Cloud connection established by `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. 

Dead Peer Detection (DPD) is a standard mechanism (RFC 3706) between IPSEC tunnels to 
send periodic messages to ensure the remote site is up. 

By default DPD detection is enabled. 


Manual BGP Advertised Network List
-----------------------------------

This field is only applicable to Site2Cloud connection established by `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_.

By default, Aviatrix Transit GW advertises individual Spoke VPC CIDRs to VGW. You can 
override that by manually entering the intended CIDR list to advertise to VGW. 

This feature is critical to limit the total number of routes carried by VGW (maximum is 100). 

To enable it, click Site2Cloud on the left navigation bar, select the connection established by `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ and click to edit. 
Scroll down to "Manual BGP Advertised Network List" and simply enter the field with a list of CIDR blocks separated by commas, 
then click "Change BGP Manual Spoke Advertisement". 

To disable the option, leave the field blank and click "Change BGP Manual Spoke Advertisement".

Advertise Transit VPC Network CIDR(s)
--------------------------------------

This field is only applicable to Site2Cloud connection established by `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_.

By default, Aviatrix Transit GW does not advertise Transit VPC `CIDR <https://www.aviatrix.com/learning/glossary/cidr.php>`_.

When this feature is enabled, Aviatrix Transit GW advertises the Transit VPC CIDR to VGW. The Controller programs the 3 RFC1918 routes in the AWS route table to point to the Transit GW. It also programs the learned routes from VGW into the AWS route table. 

If you deploy instances in the Transit VPC, enabling "Advertise Transit VPC CIDR(s) mode allows the instance to communicate both to Spoke VPCs and on-prem network, assuming the Spoke VPCs are in the RFC1918 range. 

To enable this option, click Site2Cloud on the left navigation bar, select the connection established by `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_, click to edit.
Scroll down to "Advertise Transit VPC Network CIDR(s)" to enable. 


Connected Transit
--------------------

By default, Aviatrix Spoke VPCs do not have routing established to communicate 
with each other via Transit. They are completely segmented. 

If you would like to build a full mesh network where Spoke VPCs communicate with each other via Transit GW, you can achieve that by enabling "Connected Transit" mode. All connections are encrypted. 

To enable this option in software version prior to 4.1, click Site2Cloud on the left navigation bar, select the connection established by `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_, click to edit.
Scroll down to "Connected Transit" to enable.

For software version 4.1 and later, you will click Transit Network on the left navigation bar, click the Advanced Config option and browse to the Edit Gateway tab. Select the Transit Gateway you want to enable the Connected Transit.

Note all Spokes should be either in HA mode or non HA mode. A mixed deployment where some Spokes have 
HA enabled while others don't work in a normal environment, but does not work
when a failover happens on a HA enabled Spoke. 


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

.. disqus::
