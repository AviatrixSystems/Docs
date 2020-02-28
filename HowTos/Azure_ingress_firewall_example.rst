.. meta::
  :description: Azure ingress firewall network
  :keywords: Next Gen Transit Architecture for Azure, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Azure virtual network peering


=========================================================
Azure Ingress Firewall Setup Solution 
=========================================================

This document illustrates a simple architecture for Ingress traffic inspection firewall that leverages Azure Load Balancers, `Transit FireNet for Azure <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_, and `Azure Transit with Native Spoke VNets <https://github.com/AviatrixSystems/Docs/blob/master/HowTos/transitvpc_workflow.rst#6b-attach-azure-arm-spoke-vnet-via-native-peering>`_. The solution also allows 
you to view the client IP address.

The deployment is shown as the diagram below. 

|transit_firenet_vnet|

The key idea is from FireNet point of view, the ingress inspection is simply a VNET to VNET traffic inspection. This is accomplished by 

 #. Place an Internet facing Azure Application Gateway in a spoke VNET (in the diagram, this spoke VNET is called Ingress Spoke VNET) to load balance traffic to the VNET where applications reside (Application Spoke VNET). 
 
 #. Manage Spoke Inspection Policies for the Application Spoke VNET traffic that requires inspection with the Aviatrix Transit VNET.

In this unified architecture, firewalls can be used for Ingress, Egress, North-South and VNET to VNET filtering. The solution does not need Azure Load Balancers to directly attach to firewall instances which then requires firewall instances to source NAT the incoming traffic from the Internet. Firewall instances can scale out as applications scale for all traffic types. 

.. Note::

  This architecture works for `Azure Application Gateway <https://docs.microsoft.com/en-us/azure/application-gateway/overview>`_.

  You can create multiple load balancers in the Ingress Spoke VNET. 


1. Prerequisite Setup
--------------------------------

In this instruction, we are going to deploy the below topology in Azure

- Azure VNETs

	- Aviatrix Transit VNET * 1 (i.e. 192.168.23.0/24)

	- Ingress Spoke VNET * 1 (i.e. 10.20.0.0/16)

	- Application Spoke VNET * 1 (i.e. 10.21.0.0/16)
	
- Apache2 Web server in Application Spoke VNET 

- Azure Transit with Native Spoke VNets topology

.. Note::

	Aviatrix Transit FireNet for Azure Encrypted Transit topology also supports this Azure Ingress Firewall Solution.

1.1 Deploy Aviatrix Transit VNET
^^^^^^^^^^^^^^^^^^^^^

Create an Aviatrix Transit VNET by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

- Go to the Aviatrix Controller Console.

- Click on the link "Useful Tools -> Create a VPC"

- Click on the button "+ Add new" to create a new VPC with Cloud Type Azure ARM

- Enable the checkbox "Aviatrix FireNet VPC"

1.2 Deploy Ingress Spoke VNET
^^^^^^^^^^^^^^^^^^^^^

Create an Ingress Spoke VNET by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step 1.1 or manually deploying it in Azure portal. Moreover, feel free to use your existing VNET.

1.3 Deploy Application Spoke VNET
^^^^^^^^^^^^^^^^^^^^^

Create an Application Spoke VNET by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step 1.1 or manually deploying it in Azure portal. Moreover, feel free to use your existing Application VNET.

1.4 Deploy Azure Transit with Native Spoke VNets topology
^^^^^^^^^^^^^^^^^^^^^

Follow `Global Transit Network Workflow Instructions (AWS/Azure/GCP/OCI) <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to deploy Azure Transit with Native Spoke VNets topology.

- Create an Aviatrix Transit Gateway in Aviatrix Transit VNET by following the step `Launch a Transit Gateway <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ as the following screenshot.

	.. important::

		For Azure deployment, the Aviatrix Transit Gateway must be `"launched" <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ with the option Enable Transit FireNet Function enabled. The minimum Azure FireNet gateway size is Standard_B2ms.
		


- Attach both Ingress Spoke VNET and Application Spoke VNET via Azure native peering by following the step `Attach Azure ARM Spoke VNet via native peering <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering>`_

1.5 Manage Transit FireNet
^^^^^^^^^^^^^^^^^^^^^

Follow `Aviatrix Transit FireNet Workflow <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#>`_ to deploy manage FireNet policy, and firewall instances.

- Manage a spoke inspection policy for the Application spoke VNET by referring to step `Manage Transit FireNet Policy <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#manage-transit-firenet-policy>`_ as the following screenshot.

- Deploy firewall instance in Aviatrix Transit VNET by following the step `Deploy Firewall Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#deploy-firewall-network>`_ as the following screenshot.
	




2. Create Azure Application Gateway
-------------------------------------

In Ingress Spoke VNET (Spoke-1), create an Azure Application Gateway, make sure you select the following: 

 - Select "Public" for Frontend IP address type in section Frontends
 - Select "IP address or hostname" for Target type and configure the private IP of Application Server for Target in section Backends
 
.. note::

	`Quickstart: Direct web traffic with Azure Application Gateway - Azure portal <https://docs.microsoft.com/en-us/azure/application-gateway/quick-create-portal>`_
	

3. Ready to go!
---------------

- From the Azure portal, make sure Server (backend pool) status is in Healthy state.
- Run a http/https request targeting on the Azure Application Gateway Public IP or DNS name.

4. View Traffic Log on Firewall
---------------

You can view if traffic is forwarded to the firewall instance by logging in to the Palo Alto VM-Series console. Go to the page "Monitor -> Logs -> Traffic". Perform http/https traffic from your laptop/PC to the public IP or domain name of Azure Application Gateway.

5. Capturing Client IP
-------------------------

Azure Application Gateway automatically preserves client IP address, you can find the client IP address in the HTTP header 
field "X-Forwarded-For". 

To view the client IP address in the access log, follow the instructions in `How to save client IP in access logs <https://aws.amazon.com/premiumsupport/knowledge-center/elb-capture-client-ip-addresses/>`_. 

.. note::

	`Does Application Gateway support x-forwarded-for headers? <https://docs.microsoft.com/en-us/azure/application-gateway/application-gateway-faq#does-application-gateway-support-x-forwarded-for-headers>`_


.. |transit_firenet_vnet| image:: ingress_firewall_example_media/transit_firenet_vnet.png
   :scale: 30%

.. disqus::

