.. meta::
  :description: Transit Gateway Peering with Private Network Workflow
  :keywords: Transit Gateway Peering, Aviatrix Transit network, Private Network, Transit Gateway Peering with Private Network, Azure ExpressRoute, AWS Direct Connect


==============================================================
Aviatrix Transit Gateway Peering with Private Network Workflow
==============================================================

This document describes a step-by-step instruction how to build Aviatrix Transit Gateway Peering with Private Network in two different public clouds for R6.2 and later. In this note, you learn how to:

	#. Workflow on building underlay connectivity for private network with AWS Direct Connect
  
	#. Workflow on building underlay connectivity for private network with Azure ExpressRoute
	
	#. Workflow on Aviatrix Transit Gateway Peering with private network 

For more information about Multi-Cloud Transit Network, please check out the below documents:

  `Multi Cloud Global Transit FAQ <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#multi-cloud-global-transit-faq>`_
  
  `Global Transit Network Workflow Instructions (AWS/Azure/GCP/OCI) <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
  
  `Aviatrix Transit Gateway Encrypted Peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_
  
  `Transit Network Design Patterns <https://docs.aviatrix.com/HowTos/transitvpc_designs.html>`_
  
Topology
====================
  

The key ideas for this solution are:
-------------------------------------

  - The edge (WAN) router runs a BGP session to AWS VGW via AWS Direct Connect where the edge router advertises the Azure Transit VNET CIDR and the AWS VGW advertises the AWS Transit VPC CIDR.
  
  - The edge (WAN) router runs a BGP session to Azure VNG via Azure ExpressRoute where the edge router advertises the AWS Transit VPC CIDR and the Azure VNG advertises the AZURE Transit VNET CIDR.
  
  - Once the reachability between two cloud transits over private network is there, user is able to deploy Aviatrix Multi Cloud Global Transit Gateway Encrypted Peering over Private Network
  
.. note::

  - Reachability between two transit networks' private CIDR is the responsibility of customer
  
  - This feature also supports high performance encryption(H.P.E) peering

Prerequisite
====================

First of all, `upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.2
  
In this example, we are going to deploy the below VPCs in AWS and Azure

	- AWS Aviatrix Transit VPC (i.e. 10.1.0.0/16)

	- AWS Aviatrix Spoke VPC (i.e. 192.168.1.0/24)
  
  - Azure Aviatrix Transit VNET (i.e. 10.0.0.0/16)

	- Azure Aviatrix Spoke VNET (i.e. 192.168.0.0/24)

Workflow on building underlay connectivity for private network with AWS Direct Connect
======================================================================================

Building AWS Direct Connect is customer's responsibility. Please adjust the topology depending on your requirements. 

Step 1.1. Build AWS Direct Connect
-----------------------------------

  - Refer to `Connect Your Data Center to AWS <https://aws.amazon.com/getting-started/projects/connect-data-center-to-aws/>`_
  
  - Refer to `Equinix ECX Fabric AWS Direct Connect <https://docs.equinix.com/en-us/Content/Interconnection/ECXF/connections/ECXF-aws-direct-connect.htm>`_ if users select Equinix solution. This is just an example here.

Step 1.2. Associate AWS VGW to AWS Transit VPC
-----------------------------------------------


Workflow on building underlay connectivity for private network with Azure ExpressRoute 
=======================================================================================

Building Azure ExpressRoute is customer's responsibility. Please adjust the topology depending on your requirements. 

Step 2.1. Build Azure ExpressRoute
-----------------------------------

  - Refer to `Azure ExpressRoute <https://azure.microsoft.com/en-us/services/expressroute/>`_
  
  - Refer to `ExpressRoute documentation <https://docs.microsoft.com/en-us/azure/expressroute/>`_ for more info
  
  - Refer to `Equinix ECX Fabric Microsoft Azure ExpressRoute <https://docs.equinix.com/en-us/Content/Interconnection/ECXF/connections/ECXF-ms-azure.htm>`_ if users select Equinix solution. This is just an example here.

Workflow on Aviatrix Transit Gateway Peering with private network 
===================================================================

Refer to `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ and `Aviatrix Transit Gateway Encrypted Peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_ for the below steps. Please adjust the topology depending on your requirements.

Step 3.1. Deploy VPCs for Transit FireNet
------------------------------------------

	- Create AWS Transit VPC and Azure Transit VNET by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

	- Create AWS Spoke VPC and Azure Spoke VNET by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in each cloud portal. Moreover, feel free to use your existing cloud network.

Step 3.2. Deploy Aviatrix Multi-Cloud Transit Gateway and HA in AWS
-------------------------------------------------------------------

	- Follow this step `Deploy the Transit Aviatrix Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA in AWS Transit VPC
	
	- Instance size of at least c5.xlarge will be required for `Insane Mode Encryptions <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ for higher throughput.
	
Step 3.3. Enable Route Propagation on the subnet route table where Aviatrix Transit Gateway locates on AWS portal
------------------------------------------------------------------------------------------------------------------

	- Navigate to AWS VPC portal
	
	- Locate the subnet route table where Aviatrix Transit Gateway locates
	
	- Select the tab "Route Propagation"
	
	- Click the button "Edit route propagation"

	- Locate the AWS VGW that is associated with this Transit VPC and check the checkbox "Propagate"
	
	- Click the button "Save"
	
Step 3.4. Check route propagation info on AWS portal
----------------------------------------------------
	
	- Navigate to AWS VPC portal
	
	- Locate the subnet route table where Aviatrix Transit Gateway locates
	
	- Select the tab "Routes"
	
	- Check whether Azure Transit VNet's CIDR points to AWS VGW
	
Step 3.5. Deploy Aviatrix Multi-Cloud Transit Gateway and HA in Azure
---------------------------------------------------------------------

	- Follow this step `Deploy the Transit Aviatrix Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA in Azure Transit VNet

	- Instance size of at least Standard_D5_v2 will be required for `Insane Mode Encryptions <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ for higher throughput

	- Enable Transit FireNet Function (optional)

Step 3.6. Check route propagation info on Azure portal
------------------------------------------------------
	
	- Navigate to Azure VPC portal
	
	- Locate the subnet route table where Aviatrix Transit Gateway locates
	
	- Select the tab "Routes"
	
	- Check whether Azure Transit VNet's CIDR points to AWS VGW


Step 3.5. Deploy Spoke Gateway and HA in AWS
--------------------------------------------

	- Follow this step `Deploy Spoke Gateways <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA in Spoke VPC for Application 
	
	- Instance size of at least c5.xlarge will be required for `Insane Mode Encryptions <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ for higher throughput.

Step 3.6. Attach Spoke Gateways to Transit Network
--------------------------------------------------

	- Follow this step `Attach Spoke Gateways to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Spoke Gateways to Transit Gateways 




