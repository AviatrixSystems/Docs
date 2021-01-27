.. meta::
  :description: Multi-cloud Transit Gateway to External Device with BGP over LAN simulation workflow
  :keywords: Aviatrix Transit network, Private Network, AWS Direct Connect, BGP over LAN, External Device, High Performance

==========================================================================================
Multi-cloud Transit Gateway BGP over LAN simulation Workflow
==========================================================================================

Introduction
============

[NEED TO WORK ON INTRODUCTION]

Transit BGP to LAN allows Aviatrix Transit Gateway to deploy BGP and data plane with an instance in the same VPC or VNet without running a tunnel protocol such as IPSec and GRE. 

Use Cases:
-----------

- Interoperate with third party virtual appliances such as a SD-WAN cloud instance that do not have the capability to support BGP over any tunneling protocols.

The solution is shown in the diagram below, 

|transit_gateway_external_device_bgp_over_lan_diagram|

where Aviatrix Multi-cloud Transit Gateways connect to a Simulation Peer Routers in the same VPC/VNet.

This document describes a step-by-step instruction on how to build Aviatrix Transit Gateway to External Device using BGP over LAN. 
In this Tech Note, you learn the following:

#. Workflow on `deploying Aviatrix Transit Solution <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html#deploy-aviatrix-multi-cloud-transit-solution>`_

#. Workflow on `deploying Simulation Peer Router by Aviatrix Transit Solution <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html#deploy-aviatrix-multi-cloud-transit-solution>`_

#. Workflow on `building connectivity between Aviatrix Transit Gateway and Peer Router in the same VPC or VNet <>`_

#. Workflow on `building BGP over LAN <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html#build-gre-tunnel-and-bgp-over-gre>`_

For more information about Multi-Cloud Transit Network and External Device, please check out the below documents:

- `Multi Cloud Global Transit FAQ <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#multi-cloud-global-transit-faq>`_
- `Global Transit Network Workflow Instructions (AWS/Azure/GCP/OCI) <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
- `Aviatrix Transit Gateway to External Devices <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_
- `Transit Network Design Patterns <https://docs.aviatrix.com/HowTos/transitvpc_designs.html>`_

.. important::
	
  - This solution supports only `ActiveMesh 2.0 <https://docs.aviatrix.com/HowTos/activemesh_faq.html#what-is-activemesh-2-0>`_, please check this doc `How to migrate to ActiveMesh 2.0 <https://docs.aviatrix.com/HowTos/activemesh_faq.html#how-to-migrate-to-activemesh-2-0>`_ for migration detail.
  - This solution is available to AWS and Azure. Workflow with AWS here is just an example. Please adjust the topology depending on your requirements.

The key ideas for this solution are:
----------------------------------------
  
- A BGP session establishes between a Peer Router and Aviatrix Transit Gateway via each LAN interface in the same VPC or VNet

- Data plane traffic also runs between a Peer Router and Aviatrix Transit Gateway via each LAN interface without a tunnel protocol such as IPSec and GRE. 

Prerequisite
====================

- This feature is available for 6.3 and later. `Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.3
  
- In this example, we are going to deploy the below VPCs in AWS:

  - Transit VPC (i.e. 10.1.0.0/16) by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

  - Spoke VPCs (i.e. 192.168.1.0/24 and 192.168.2.0/24) by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in each cloud portal. Moreover, feel free to use your existing cloud network.
  
- Peer Router has high throughput supported
	
1. Deploy Aviatrix Multi-Cloud Transit Solution
=================================================

Refer to `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ for the below steps. Please adjust the topology depending on your requirements.

Step 1.1. Deploy Aviatrix Multi-Cloud Transit Gateway and HA in AWS
-------------------------------------------------------------------

- Follow this step `Deploy the Transit Aviatrix Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA with insane mode enabled in AWS Transit VPC

- In this example, size c5n.4xlarge are selected to benchmark `performance <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html#performance-benchmark>`_.
	
Step 1.2. Deploy Spoke Gateway and HA
--------------------------------------

- Follow this step `Deploy Spoke Gateways <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA with insane mode enabled in AWS Spoke VPC

- In this example, size c5n.4xlarge are selected to benchmark `performance <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html#performance-benchmark>`_.

Step 1.3. Attach Spoke Gateways to Transit Network
--------------------------------------------------

- Follow this step `Attach Spoke Gateways to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Aviatrix Spoke Gateways to Aviatrix Transit Gateways in AWS

2. Deploy another Aviatrix Multi-Cloud Transit Solution to simulate Peer Router
================================================================================

To demonstrate this BGP over LAN feature in a simple fashion, we simulate Peer Router by deploying another Aviatrix Multi-Cloud Transit Solution. 
Please adjust the topology depending on your requirements.

Step 2.1. Follow the previous step to deploy another Aviatrix Multi-Cloud Transit Solution
------------------------------------------------------------------------------------------

3. Build connectivity between Aviatrix Transit Gateway and Peer Router in the same VPC or VNet
===============================================================================================

Aviatrix Transit Solution is used as a Peer Router in this AWS example.

Step 3.1. Create or find a subnet within the same AZ where Aviatrix Transit Primary and Peer Router Primary locate
-------------------------------------------------------------------------------------------------------------------

Step 3.2. Create or find another subnet within the same AZ where Aviatrix Transit HA and Peer Router HA locate
--------------------------------------------------------------------------------------------------------------

4. Build BGP over LAN
================================================

Step 4.1. Configure BGP over LAN on Aviatrix Transit Gateway
--------------------------------------------------------------------

- Login Aviatrix Controller

- Go to MULTI-CLOUD TRANSIT -> Setup -> 3) Connect to VGW / External Device / Aviatrix CloudN / Azure VNG

- Select option "External Device" -> "BGP" -> "LAN"

- Fill the parameters to set up BGP over LAN to Peer Router
  
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Transit VPC Name                 | Select the Transit VPC ID where Transit GW was launched.                                        |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Connection Name                  | Provide a unique name to identify the connection to external device.                            |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Aviatrix Transit Gateway BGP ASN | Configure a BGP AS number that the Transit GW will use to exchange routes with external device. |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Primary Aviatrix Transit Gateway | Select the Transit GW.                                                                          |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Enable Remote Gateway HA         | Don't check this option in this example.                                                        |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Remote BGP AS Number             | Configure a BGP AS number that Peer Router will use to exchange routes with Transit GW          |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Remote LAN IP                    | Find a valid IP within the subnet where Aviatrix Transit Primary and Peer Router Primary locate |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Local LAN IP                     |                                                                                                 |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Remote BGP AS Number (Backup)    | Configure a BGP AS number that Peer Router HA will use to exchange routes with Transit GW       |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Remote LAN IP                    |                                                                                                 |
  +----------------------------------+-------------------------------------------------------------------------------------------------+
  | Local LAN IP                     |                                                                                                 |
  +----------------------------------+-------------------------------------------------------------------------------------------------+

- Click the button "CONNECT" to generate BGP session over LAN

  |aviatrix_transit_externel_device_lan|
  
Step 4.2. (Optional) Download the BGP over LAN configuration sample from Aviatrix Controller
--------------------------------------------------------------------------------------------

- Navigate to SITE2CLOUD -> Setup

- Select the connection that you created with “Connection Name” in the previous step

- Click the button "EDIT"

- Select Vendor type, Platform, and Software.

- Click the button "Download Configuration".

Step 4.3. Configure BGP over LAN on Peer Router
-----------------------------------------------

- Open the downloaded BGP over LAN configuration file

Step 4.4. Verify LAN status on Aviatrix Controller
----------------------------------------------------------

- Navigate back to Aviatrix Controller

- Go to SITE2CLOUD -> Setup

- Find the connection that you created with “Connection Name” in the previous step

- Check the Tunnel Status

  |aviatrix_bgp_lan_status_1|

- Go to MULTI-CLOUD TRANSIT -> List

- Select the Transit Primary Gateway that was created in the previous step

- Click the button "DETAILS/DIAG"

- Scroll down to the panel "Connections" -> "On-prem Connections"

- Find the connection that you created with “Connection Name” in the previous step

- Check the Tunnel Status

  |aviatrix_bgp_lan_status_2|

Step 4.5. Verify BGP session status on Aviatrix Controller
----------------------------------------------------------

- Go to MULTI-CLOUD TRANSIT -> Advanced Config -> BGP Tab

- Find the connection that you created with “Connection Name” in the previous step

- Check the BGP Status

  |aviatrix_bgp_status|

5. Ready to go!
=================

At this point, run connectivity and performance test to ensure everything is working correctly. 

6. Performance Benchmark
===========================

End-to-End traffic via Aviatrix <-> Aviatrix
---------------------------------------------

Multiple flows result by using iperf3 tool with TCP 128 connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+-----------------------+---------------------------------------------+
| Aviatrix Gateway size | Throughput (Gbps)                           | 
+-----------------------+---------------------------------------------+
| C5n.4xlarge           | 23 - 24                                     | 
+-----------------------+---------------------------------------------+

7. Additional Information
===========================

- `Need of conventional BGP support in the cloud <https://community.aviatrix.com/t/h7htvvc/need-of-conventional-bgp-support-in-the-cloud>`_

.. |transit_gateway_external_device_bgp_over_lan_diagram| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/transit_gateway_external_device_bgp_over_lan_diagram.png
   :scale: 50%
	 
.. |aws_vgw_attach| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aws_vgw_attach.png
   :scale: 50%

.. |aws_route_propagation_status_yes| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aws_route_propagation_status_yes.png
   :scale: 50%
	 
.. |aws_route_propagation_routing_entry| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aws_route_propagation_routing_entry.png
   :scale: 50%
	 
.. |aviatrix_transit_externel_device_lan| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_transit_externel_device_lan.png
   :scale: 50% 

.. |aviatrix_bgp_lan_status_1| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_bgp_lan_status_1.png
   :scale: 50% 
   
.. |aviatrix_bgp_lan_status_2| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_bgp_lan_status_2.png
   :scale: 50% 
 
.. |aviatrix_bgp_status| image:: transit_gateway_external_device_bgp_over_lan_simulation_workflow_media/aviatrix_bgp_status.png
   :scale: 50% 
   
.. disqus::

