.. raw:: html

    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex">

==========================================================================================
Azure Multi-Cloud Transit BGP over LAN Workflow
==========================================================================================

Introduction
============

Transit BGP to LAN allows Aviatrix Transit Gateways to communicate with a pair of instances in different VNets in Azure without running 
any tunneling protocol such as IPsec or GRE. One use case is to interoperate with third-party virtual appliances such as 
SD-WAN cloud instances that do not have the capability to support BGP over any tunneling protocols.

For example, integrating with SD-WAN gateways can be deployed as below, 

|sd_wan_inte_azure|

where an Aviatrix Multi-Cloud Transit Gateway connects to a third-party cloud instance in different VNets in Azure.

This document describes a step-by-step instruction on how to build Aviatrix Transit Gateway to External Device using BGP over LAN in Azure.  
In this Tech Note, you learn the following:

#. Workflow on `deploying Aviatrix Transit Solution <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html#deploy-aviatrix-multi-cloud-transit-solution>`_

#. Workflow on `launching third-party cloud instances <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html#launch-third-party-cloud-instances>`_

#. Workflow on `building BGP over LAN <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html#build-bgp-over-lan>`_

For other BGP over LAN workflows, please check out the below documents:

- `AWS Multi-cloud Transit BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_workflow.html>`_
- `Aviatrix BGP over LAN with Cisco Meraki in AWS <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_with_aws_meraki_workflow.html>`_

For more information about Multi-Cloud Transit Network and External Device, please check out the below documents:

- `Multi Cloud Global Transit FAQ <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#multi-cloud-global-transit-faq>`_
- `Global Transit Network Workflow Instructions (AWS/Azure/GCP/OCI) <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
- `Aviatrix Transit Gateway to External Devices <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_
- `Transit Network Design Patterns <https://docs.aviatrix.com/HowTos/transitvpc_designs.html>`_

.. important::
	
  - This solution supports only `ActiveMesh 2.0 <https://docs.aviatrix.com/HowTos/activemesh_faq.html#what-is-activemesh-2-0>`_, please check this doc `How to migrate to ActiveMesh 2.0 <https://docs.aviatrix.com/HowTos/activemesh_faq.html#how-to-migrate-to-activemesh-2-0>`_ for migration detail.
  
  - This solution is available to AWS and Azure. To configure this solution for AWS, see `AWS Multi-Cloud Transit BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_workflow.html>`_. Please adjust the topology depending on your requirements.

  - LAN interfaces for Aviatrix Transit Primary and third-party cloud instance must be in the different VNets.
  
  - One BGP over LAN connection per gateway is supported.
 
The key ideas for this solution are:
----------------------------------------
  
- A BGP session establishes between a third-party cloud instance and Aviatrix Transit Gateway via each LAN interface in different VNets.

- Data plane traffic also runs between a third-party cloud instance and Aviatrix Transit Gateway via each LAN interface without a tunnel protocol such as IPsec and GRE. 

Prerequisites
====================

- This feature is available for 6.3 and later. `Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.3.
  
- In this example, we are going to deploy the below VNets in Azure:

  - Transit VNets (i.e. 10.1.0.0/16 and 10.2.0.0/16) by utilizing Aviatrix feature `Create a VNet <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VNet option enabled

  - Spoke VNets (i.e. 192.168.11.0/24 and 192.168.21.0/24) by utilizing Aviatrix feature `Create a VNet <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in each cloud portal. Moreover, feel free to use your existing cloud network.
  
- Third-party cloud instance has high throughput supported.
	
Deploying Aviatrix Multi-Cloud Transit Solution
=================================================

Refer to `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ for the below steps. Please adjust the topology depending on your requirements.

1. Deploy `Aviatrix Multi-Cloud Transit Gateway and HA <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ with Insane Mode enabled in Transit VNet.

.. Important::

Mark the **BGP Over LAN** checkbox to enable that function.

See `this document <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html#performance-benchmark>`_ for more information about Gateway size and benchmark performance.

2. Deploy `Spoke Gateway and HA <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA with insane mode enabled in Spoke VNet.
3. Attach `Spoke Gateways to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_.
4. (Optional) Attach `Azure ARM Spoke VNet via native peering <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering>`_ if users prefer not to encrypt the traffic between the Transit VNet and the Spoke VNet. In this example, this approach is selected to benchmark `performance <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html#performance-benchmark>`_.

2. Launch Third-Party Cloud Instances
================================================================================

Deploy third-party cloud instances in a separate Transit VNet. 

#. Create a third-party cloud instance and put MGMT interface in public gateway subnet.
#. Create a new public WAN subnet and a dedicated routing table for WAN interface if needed.
#. Create a new private LAN subnet and a dedicated routing table for LAN interface.
#. Make sure the function IP forwarding function on third-party cloud instance's interfaces is enabled.

.. important::

  An Aviatrix Transit Gateway and third-party cloud instance CANNOT be deployed in the same Transit VNet.

Building BGP over LAN
================================================

Creating Azure VNet Peering Between Aviatrix Transit VNet and Third-Party Cloud Instance Transit VNet
----------------------------------------------------------------------------------------------------------------------------------

See `Azure VNET Peering doc <https://docs.aviatrix.com/HowTos/peering.html#azure-vnet-peering>`_ for more info.

#. Log in to the Aviatrix Controller and go to Peering > Azure.
#. Click **+ NEW PEERING**.
#. Select VNet where Aviatrix Transit gateway locates as Peer1.
#. Select VNet where third-party cloud instance locates as Peer2.
#. Click **OK**.

Configuring BGP over LAN on Aviatrix Transit Gateway
---------------------------------------------------------------------

1. Log in to the Aviatrix Controller.
2. Go to Multi-Cloud Transit > Setup > External Connection.
3. Select option External Device > BGP > LAN.
4. Enter the following information in the fields provided.


+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Transit VPC Name                 | Select the Transit VPC ID where Transit GW was launched                                                                     |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Connection Name                  | Provide a unique name to identify the connection to external device                                                         |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Aviatrix Transit Gateway BGP ASN | Configure a BGP AS number that the Transit GW will use to exchange routes with external device                              |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Primary Aviatrix Transit Gateway | Select the Transit GW                                                                                                       |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Enable Remote Gateway HA         | Check this option in this example to connect two external devices                                                           |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Remote BGP AS Number             | Configure a BGP AS number that third-party cloud primary instance will use to exchange routes with Aviatrix Transit Primary |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Remote VNet Name                 | Select the Transit VNet where third-party cloud instance locates                                                            |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Remote LAN IP                    | Use the private IP of the LAN interface of the third-party cloud primary instance                                           |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Local LAN IP                     | Aviatrix detects the Local LAN IP automatically                                                                             |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Remote BGP AS Number (Backup)    | Configure a BGP AS number that third-party cloud HA instance will use to exchange routes with Aviatrix Transit HA           |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Remote LAN IP (Backup)           | Use the private IP of the LAN interface of the third-party cloud HA instance                                                |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Local LAN IP (Backup)            | Aviatrix detects the Local LAN IP automatically                                                                             |
+----------------------------------+-----------------------------------------------------------------------------------------------------------------------------+

4. To generate BGP session over LAN, click **Connect**.

S(Optional) Downloading the BGP over LAN configuration sample from Aviatrix Controller
--------------------------------------------------------------------------------------------

#. Navigate to Site2Cloud > Setup.
#. Select the connection that you created with Connection Name in the previous step.
#. Click **Edit**.
#. Select Vendor type, Platform, and Software.
#. Click Download Configuration.

Configuring BGP over LAN on Third-Party Cloud Instance
---------------------------------------------------------------

#. Log in to the Azure portal.
#. Create a user-defined routing table with default route (0.0.0.0/0) pointing nexthop to Aviatrix Primary Transit's LAN IP for the subnet where third-party cloud primary instance's LAN interface locates.
#. Create a user-defined routing table with default route (0.0.0.0/0) pointing nexthop to Aviatrix HA Transit's LAN IP for the subnet where third-party cloud HA instance's LAN interface locates for HA deployment.
#. (Optional) Open the downloaded BGP over LAN configuration file.
#. Log in third-party cloud instance.
#. Program route to send traffic to Aviatrix Transit's LAN IP through third-party cloud instance's LAN interface.
#. Configure those related BGP and LAN info on third-party cloud instance.
#. Check whether the function 'eBGP multi-hop' is enabled if BGP session is not established.
#. Repeat those steps for HA deployment.

.. important::

  Customer must create a default route 0.0.0.0/0 in the third-party cloud instance's LAN route table to point to Aviatrix Transit's LAN IP over VNET peering in Azure.

Verifying LAN status on Aviatrix Controller
----------------------------------------------------------

#. Navigate back to Aviatrix Controller.
#. Go to Site2Cloud > Setup.
#. Under Create a New Site2Cloud Connection, find the connection that you created with Connection Name in the previous step.
#. Check the Tunnel Status.

Then:

#. Go to Multi-Cloud Transit > List.
#. Select the Transit Primary Gateway that was created in the previous step.
#. Click **Details/Diag**.
#. Scroll down to Connections > On-prem Connections.
#. Under On-prem Connections, find the connection that you created with Connection Name in the previous step.
#. Check the Tunnel Status in the Status column.

Verifying BGP session status on Aviatrix Controller
----------------------------------------------------------

#. Go to Multi-Cloud Transit > BGP.
#. In the Connections tab on this page, find the connection that you created with Connection Name in the previous step.
#. Check the BGP Status.

Ready to Go
=================

At this point, run connectivity and performance test to ensure everything is working correctly. 

Performance Benchmarks
===========================

End-to-End traffic via Native Spoke VNet <-> Aviatrix <-> Aviatrix <-> Native Spoke VNet
----------------------------------------------------------------------------------------

The performance test is done with a pair of Aviatrix Transit Gateways as the third-party cloud instances, as shown below.

Multiple flows result by using iperf3 tool with TCP 128 connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+-----------------------+------------------+
| Aviatrix Gateway size | Throughput (Gbps)|
+-----------------------+------------------+
| Standard_D5_v2        | 22 - 23          |
+-----------------------+------------------+

6. Additional Read
===========================

Additional read can be found in this short blog, `Need of conventional BGP support in the cloud <https://community.aviatrix.com/t/h7htvvc/need-of-conventional-bgp-support-in-the-cloud>`_

.. |transit_azure_gateway_external_device_bgp_over_lan_diagram| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/transit_azure_gateway_external_device_bgp_over_lan_diagram.png
   :scale: 50%
	 
.. |aviatrix_azure_transit_externel_device_lan| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_azure_transit_externel_device_lan.png
   :scale: 50% 

.. |aviatrix_azure_bgp_lan_status_1| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_azure_bgp_lan_status_1.png
   :scale: 50% 
   
.. |aviatrix_azure_bgp_lan_status_2| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_azure_bgp_lan_status_2.png
   :scale: 50% 
 
.. |aviatrix_azure_bgp_status| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_azure_bgp_status.png
   :scale: 50% 

.. |aviatrix_azure_gateway_creation| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_azure_gateway_creation.png
   :scale: 50% 

.. |sd_wan_integ| image:: transitvpc_designs_media/sd_wan_integ.png
   :scale: 30%

.. |sd_wan_inte_azure| image:: transitvpc_designs_media/sd_wan_inte_azure.png
   :scale: 30%
   
.. disqus::
