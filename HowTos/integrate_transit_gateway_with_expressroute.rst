.. meta::
  :description: Transit Gateway integration with ExpressRoute Workflow
  :keywords: Azure ExpressRoute, Aviatrix Transit Gateway integration with ExpressRoute

==================================================================
Multi-Cloud Transit Integration with Azure ExpressRoute
==================================================================

Introduction
============

Currently, Aviatrix Transit requires encryption over Azure ExpressRoute or External Device to on-prem directly but there are times where customers would like to keep their ExpressRoute or cannot deploy CloudN. In such scenarios, Aviatrix transit solution including Transit FirNet can only forward traffic between Spoke VNets or inspect east-west traffic only, as shown `here <https://docs.aviatrix.com/HowTos/azure_transit_designs.html#aviatrix-transit-gateway-for-azure-spoke-to-spoke-connectivity>`_

This feature allows Aviatrix Transit native integration with Azure VNG (Virtual Network Gateway) and allows Aviatrix Transit Gateway to inspect traffic from on-prem to cloud on top of east-west traffic inspection.


The key ideas for this solution are:
-------------------------------------

    - Traffic initiated from On-prem over Express Route first routed to Aviatrix Transit Gateway where traffic can be inspected, and then route to the Spoke VNet. Similarly, traffic initiated from the Spoke VNet first routed to the Aviatrix Transit Gateway and then from VNG to on-prem over Express Route.

    - Aviatrix Controller periodically pulls the Transit VNet VNG route table for learned routes from on-prem. These routes are then distributed to Spoke VNet and Aviatrix Transit Gateway.

    - Azure native VNet Peering capabilities will be leveraged between Spokes and Transit to automatically advertise routes from Cloud to On-prem.

    - The edge (WAN) router runs a BGP session to Azure VNG via Azure ExpressRoute where the edge router advertises the Azure VNG advertises the Azure Transit VNET CIDR.

    - The edge (WAN) router redistributes the Azure Transit VNET CIDR.


Prerequisite
====================

First of all, `upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.3.

Topology
====================

|topology_expressroute|

In this example, we are going to deploy the below VNETs in Azure

    - Azure Aviatrix Transit VNET (i.e. 172.40.0.0/16)

    - Azure Aviatrix Spoke VNETs (i.e. 172.50.0.0/16 & 172.60.0.0/16)


Workflow to connect Virtual Network Gateway (VNG) with On-Prem DC over Azure ExpressRoute (Optional)
====================================================================================================

Customers using existing Express Route can skip this workflow and move to next section. Building Azure ExpressRoute is customer's responsibility. For more information about Azure ExpressRoute, please check out the below documents:

  - Refer to `Azure ExpressRoute <https://azure.microsoft.com/en-us/services/expressroute/>`_

  - Refer to `ExpressRoute documentation <https://docs.microsoft.com/en-us/azure/expressroute/>`_ for more info

  - Refer to `Equinix ECX Fabric Microsoft Azure ExpressRoute <https://docs.equinix.com/en-us/Content/Interconnection/ECXF/connections/ECXF-ms-azure.htm>`_ if users select Equinix solution. This is just an example here.

Please adjust the topology depending on your requirements.

Step 1.1. Create an ExpressRoute circuit
----------------------------------------

	- Refer to `Tutorial: Create and modify an ExpressRoute circuit <https://docs.microsoft.com/en-us/azure/expressroute/expressroute-howto-circuit-portal-resource-manager>`_

Step 1.2. Create Azure private network for an ExpressRoute circuit
-------------------------------------------------------------------

	- Refer to `private peering section in Create and modify peering for an ExpressRoute circuit <https://docs.microsoft.com/en-us/azure/expressroute/expressroute-howto-routing-portal-resource-manager>`_

Step 1.3. Create a virtual network gateway for an ExpressRoute circuit
----------------------------------------------------------------------

	- Refer to `Configure a virtual network gateway for ExpressRoute using the Azure portal <https://docs.microsoft.com/en-us/azure/expressroute/expressroute-howto-add-gateway-portal-resource-manager>`_

Step 1.4. Connect a virtual network to an ExpressRoute circuit
--------------------------------------------------------------

	- Refer to `Connect a virtual network to an ExpressRoute circuit using the portal <https://docs.microsoft.com/en-us/azure/expressroute/expressroute-howto-linkvnet-portal-resource-manager>`_

Step 1.5. Check Express Route Circuits - List Routes Table on Azure portal
---------------------------------------------------------------------------

	- Login Azure Portal

	- Search for "ExpressRoute circuits" on the search bar

	- Select the "ExpressRoute circuits" that you created

	- Select the Azure private peering row

	- Click on the hyperlink "Get route table" to verify routes learned from on-prem


Workflow to connect Aviatrix Transit Gateway with Virtual Network Gateway
============================================================================

Refer to `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ for the below steps. Please adjust the topology depending on your requirements.

Step 2.1. Deploy VNet for Transit FireNet
------------------------------------------

	- Create Azure Transit VNET by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VNet option enabled

	- Create Azure Spoke VNET by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in each cloud portal. Moreover, feel free to use your existing cloud network.


Step 2.2. Deploy Aviatrix Multi-Cloud Transit Gateway and HA in Azure
-----------------------------------------------------------------------

    - Follow this step `Deploy the Transit Aviatrix Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA with insane mode enabled in Azure Transit VNET. Insane mode is not required but an optional feature to increase throughput.

    - Instance size of at least Standard_D5_v2 will be required for `Insane Mode Encryptions <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ for higher throughput. Please refer to this `doc <https://docs.aviatrix.com/HowTos/insane_mode_perf.html>`_ for performance detail.

    - Enable ` Transit FireNet Function <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#enable-transit-firenet-function>`_

    - (Optional) `Transit FireNet Traffic Inspection Policy <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#manage-transit-firenet-policy>`_


Step 2.3. Attach Transit FireNet Gateway with Virtual Network Gateway (VNG)
------------------------------------------------------------------------------

    - Go to Multi-Cloud Transit -> Step 3 Connect to VGW / External Device / Aviatrix CloudN / Azure VNG

    - Select **Azure VNG** radio button

    - Select **Primary Aviatrix Transit Gateway**

    - VNG Name will populated automatically

    - Click **Connect**

|vng_step|


Step 2.4. Check Effective routes info on Azure portal
-------------------------------------------------------

	- Login Azure Portal

	- Search for "Network interfaces" on the search bar

	- Select Aviatrix Transit Gateway's interface

	- Navigate to the page "Effective routes" by clicking the link "Effective routes" under the section "Support + troubleshooting"

	- Check route entry for On-prem pointing Next Hop Type **Virtual network gateway**

		|azure_effective_routes_routing_entry|


Workflow to connect Aviatrix Transit Gateway with Spokes VNET
============================================================================

Step 3.1. Deploy VNet for Aviatrix Spoke Gateway
--------------------------------------------------

	- Create Azure VNET for Aviatrix Spoke Gateway by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ or manually deploy it in cloud portal or feel free to use existing virtual network.

Step 3.2. Deploy Spoke Gateway and HA
--------------------------------------

	- Follow this step `Deploy Spoke Gateways <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_azure.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA with insane mode enabled in Azure Spoke VNET. Insane mode is optional.

	- Instance size of at least Standard_D5_v2 will be required for `Insane Mode Encryptions <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ for higher throughput. Please refer to this `doc <https://docs.aviatrix.com/HowTos/insane_mode_perf.html>`_ for performance detail.

Step 3.3. Deploy Azure Native VNET Spoke
--------------------------------------------

	- Create Azure Spoke VNET for Native Spoke using Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploy it in cloud portal or use your existing virtual network.


Step 3.3. Attach Spoke Gateways to Transit Network
--------------------------------------------------

	- Follow this step `Attach Spoke Gateways to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_azure.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Aviatrix Spoke Gateways to Aviatrix Transit Gateways in Azure

    - Follow step `Attach Native Azure VNET to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_azure_native_spokes_workflow.html?highlight=Transit%20Firenet%20Native%20Azure%20Spoke%20workflow#step-3-attach-native-spoke-vnets-to-transit-network>`_ to attach Azure Native VNET Spoke to Aviatrix Transit Gateway.

    .. important::
        VNET Native Peering is required for Azure Native Spoke as well as for VNET Spoke where Aviatrix Spoke Gateway is deployed in order to advertise Spoke CIDRs to On-Prem

Ready to go!
============

Now you should be able to send traffic from cloud to on-prem as well as on-prem to cloud over Azure Express Route.



.. |topology_expressroute| image:: transit_gateway_integration_with_expressroute_media/topology_expressroute.png
   :scale: 60%

.. |traffic_onprem_to_cloud_disable_inspection| image:: transit_gateway_integration_with_expressroute_media/traffic_onprem_to_cloud_disable_inspection.png
   :scale: 60%

.. |azure_effective_routes_routing_entry| image:: transit_gateway_integration_with_expressroute_media/azure_effective_routes_routing_entry.png
   :scale: 40%

.. |vng_step| image:: transit_gateway_integration_with_expressroute_media/vng_step.png
   :scale: 40%


.. disqus::

