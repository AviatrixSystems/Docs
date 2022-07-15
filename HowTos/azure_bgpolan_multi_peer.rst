.. meta::
   :description: azure multi-peer BGP over LAN connections
   :keywords: azure, BGP, LAN, multi-peer, BGPoLAN

===============================================
Configuring Azure Multi-Peer BGP Over LAN Workflow 
===============================================

Introduction
^^^^^^^^^^^^^^^^

This document provides step-by-step instructions for building BGP over LAN connections between an Aviatrix Transit Gateway and one or more External Devices in Azure. 

Transit BGP to LAN allows Aviatrix Transit Gateways to communicate with multiple instances in different VNets in Azure without running any tunneling protocol such as IPsec or GRE. One use case is to interoperate with third-party virtual appliances such as SD-WAN cloud instances that do not have the capability to support BGP over any tunneling protocols. For example, integrating with SD-WAN gateways can be deployed as below, where Aviatrix Multi-Cloud Transit Gateways connect to third-party cloud instances in another VNet in Azure.

|NVA_scale_out_concept|

Related Topics 
^^^^^^^^^^^^^^^^ 

`Azure Multi-Cloud Transit BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html?highlight=bGP%20over%20LAN#azure-multi-cloud-transit-bgp-over-lan-workflow>`_
Azure Multi-Peer BGP over LAN with Azure Route Server Integration 
`AWS Multi-Cloud Transit BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_workflow.html?highlight=bGP%20over%20LAN#aws-multi-cloud-transit-bgp-over-lan-workflow>`_
`GCP Multi-Peer BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_gcp_workflow.html?highlight=bGP%20over%20LAN#gcp-multi-peer-bgp-over-lan-workflow>`_

Prerequisites 
^^^^^^^^^^^^^^^^ 

* Aviatrix Controller is updated to software version 6.8 and above.   
* Transit Gateways are deployed with BGPoLAN enabled with the required number of interfaces, which is based on the number of BGP over LAN connections you need. 
* In the single-attach use case, each BGP peer requires one BGPoLAN NIC on a single Aviatrix Transit Gateway. 
* In the dual-attach use case—that is, a scenario where the BGP peer needs to establish a BGP session to both Transit Gateways for high-availability reasons—a single BGP peer requires one BGPoLAN NIC on **both** Aviatrix Transit Gateways. 

Deploying Aviatrix Multi-Cloud Transit Solution 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Refer to `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ for the steps below. Adjust the topology depending on your requirements. 

1. Deploy `Aviatrix Multi-Cloud Transit Gateway and HA <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_  with Insane Mode encryption enabled in the Transit VNet. 
2. Deploy `Spoke Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_. If desired, you can deploy this gateway with HA and enable Insane Mode encryption in the Spoke VNet(s). Note that HA and Insane Mode are not required. 

Building BGP over LAN 
^^^^^^^^^^^^^^^^^^^^^^

Deploy the Aviatrix Transit Gateway with all the required BGP interfaces. 

1. Log into the Aviatrix Controller. 
2. Navigate to Multi-Cloud Transit > Setup > Transit.  
3. Use the settings below to deploy the Aviatrix Transit Gateway. 

+--------------------------------+------------------------------------------------------------+
| **Setting**                    | **Value**                                                  |
+--------------------------------+------------------------------------------------------------+
| Cloud Type                     | Azure ARM                                                  |
+--------------------------------+------------------------------------------------------------+
| Gateway Name                   | Provide a unique name to identify the Transit Gateway.     |
+--------------------------------+------------------------------------------------------------+
| Access Account Name            | Select the appropriate Azure account.                      |
+--------------------------------+------------------------------------------------------------+
| VNet Name: Resource Group      | Select the VNet where the Transit Gateway will be deployed.|
+--------------------------------+------------------------------------------------------------+
| Public Subnet                  | Select the subnet the Transit Gateway interface will use.  |
+--------------------------------+------------------------------------------------------------+
| Gateway Size                   | Select an instance size that allows interfaces to be       |          
|                                |created for all BGP peers.                                  |
+--------------------------------+------------------------------------------------------------+
| Allocate New EIP               | Mark this checkbox if you want a new EIP allocated.        |
+--------------------------------+------------------------------------------------------------+
| EIP                            | If you choose to use an existing EIP, enter it here.       |
+--------------------------------+------------------------------------------------------------+
| Insane Mode Encryption         | Mark this checkbox to enable high throughput encryption.   |
|                                |.. important::                                              |
|                                |  Insane Mode is mandatory when configuring                 |
|                                |  BGP over LAN for a Transit Gateway deployed in Azure.     |
+--------------------------------+------------------------------------------------------------+
|Enable Transit FireNet Function | Mark this checkbox to enable Transit FireNet.              |
+--------------------------------+------------------------------------------------------------+
| BGP over LAN                   | Mark this checkbox to enable BGP over LAN functionality.   |
+--------------------------------+------------------------------------------------------------+
| Add/Edit Tags                  |   Select this box to add additional tags.                  | 
+--------------------------------+------------------------------------------------------------+


|Create_Transit-GW|

4. Click **Create**. 
 

5. (Optional) If you want to enable HA to an Aviatrix Transit Gateway, complete Step 2 of the UI workflow - Enable/Disable HA to an Aviatrix Transit Gateway. 

Configuring BGP over LAN on Aviatrix Transit Gateway 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Log into the Aviatrix Controller. 
2. Navigate to Multi-Cloud Transit > Setup > External Connection tab. 
3. Select the following radio buttons: External Device > BGP > LAN. 
4. Enter the following information in the fields below. 

+--------------------------------+-------------------------------------------------------------------------------+
| **Setting**                    | **Value**                                                                     |
+--------------------------------+-------------------------------------------------------------------------------+
| VPC Name / Site ID             | Select the Transit VNet ID where the Transit Gateway was deployed.            |
+--------------------------------+-------------------------------------------------------------------------------+
| Connection Name                | Provide a unique name to identify the connection to the external device.      |
+--------------------------------+-------------------------------------------------------------------------------+
| Aviatrix Gateway BGP ASN       | Provide the BGP AS number that is configured on the Transit Gateway and that  |
|                                | will be used to exchange routes with the external device.                     |
+--------------------------------+-------------------------------------------------------------------------------+
| Primary Aviatrix Gateway       | Select the Transit Gateway.                                                   |
+--------------------------------+-------------------------------------------------------------------------------+
| Enable Remote Gateway HA       | Mark this checkbox to connect two external devices configured as an HA pair.  |
+--------------------------------+-------------------------------------------------------------------------------+
| BGP Activemesh                 |Mark this checkbox to enable full mesh BGP connections to the external devices |
|                                |from the primary and HA Transit gateways. Only to be used for Azure Route      |
|                                |Server Integration.                                                            |
+--------------------------------+-------------------------------------------------------------------------------+
| Remote BGP AS Number           |Configure the BGP AS number that the third-party cloud instance will use to    |
|                                |exchange routes with the Aviatrix Transit Gateway.                             |
+--------------------------------+-------------------------------------------------------------------------------+
| Remote LAN IP                  |Enter the private IP of the LAN interface of the third-party cloud primary     |
|                                |instance.                                                                      |
+--------------------------------+-------------------------------------------------------------------------------+
| Local LAN IP                   |The Controller will automatically show the IP assigned to the BGPoLAN          |
|                                |interface that will be used for this specific peering.                         |
+--------------------------------+-------------------------------------------------------------------------------+
|Remote BGP AS Number (Backup)   |Enter the BGP AS number that the third-party HA cloud instance will use to     |
|                                |exchange routes with the Aviatrix HA Transit Gateway.                          |
+--------------------------------+-------------------------------------------------------------------------------+
| Remote LAN IP (Backup)         |Enter the private IP of the LAN interface of the third-party HA cloud          |
|                                |instance.                                                                      |
+--------------------------------+-------------------------------------------------------------------------------+
| Local LAN IP (Backup)          |The Controller will automatically show the IP assigned to the BGPoLAN          | 
|                                |interface that will be used for this specific peering.                         |
+--------------------------------+-------------------------------------------------------------------------------+

|Create_BGPoLAN_connection|

Click **Connect** to generate the BGP sessions. 


Ready to Go
^^^^^^^^^^^^^

At this point, run a connectivity and performance test to ensure everything is working correctly. 

 .. |NVA_scale_out_concept| image:: azure_bgpolan_multi_peer_media/NVA_scale_out_concept.png
   :scale: 60%

 .. |Create_Transit-GW| image:: azure_bgpolan_multi_peer_media/Create_Transit-GW.png
   :scale: 60%

 .. |Create_BGPoLAN_connection| image:: azure_bgpolan_multi_peer_media/Create_BGPoLAN_connection.png
   :scale: 60%

.. disqus::