.. meta::
  :description: Ingress Protection via Aviatrix Transit FireNet with Fortigate
  :keywords: AVX Transit Architecture, Aviatrix Transit network, Transit DMZ, Ingress, Firewall, Fortigate
  
==============================================================
Ingress Protection via Aviatrix Transit FireNet with Fortigate
==============================================================

This document illustrates a simple architecture for Ingress traffic inspection firewall that leverages AWS Load Balancers, 
`Transit FireNet for AWS <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html>`_ and 
`Fortigate Example <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#example-config-for-fortigate-vm-in-aws>`_.

Ingress traffic from Internet forwards to firewall instances first in Aviatrix Transit FireNet VPC and then reaches to application servers as shown 
in the diagram below. In this design pattern, each firewall instance must performs

  #. Source NAT (SNAT) on its LAN interface that connects to the Aviatrix FireNet gateway 

  #. Destination NAT (DNAT) to the IP of application server or application load balancer
  
|transit_firenet_ingress|

This document describes a step-by-step Ingress Protection via Aviatrix Transit FireNet with Fortigate deployment workflow for R6.1 and later. 
In this note you learn how to:

	#. Workflow on Transit FireNet for AWS
  
	#. Workflow on AWS Application Load Balancer
	
	#. Workflow on Fortigate

For more information about Transit FireNet, please check out the below documents:

  `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_
  
  `Firewall Network Design Patterns <https://docs.aviatrix.com/HowTos/firewall_network_design_patterns.html>`_

Prerequisite
====================

First of all, `upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.1
  
In this example, we are going to deploy the below VPCs in AWS

	- Aviatrix Transit FireNet VPC (i.e. 10.70.0.0/16)

	- Aviatrix Spoke VPC for Application (i.e. 10.3.0.0/16)

Workflow on Transit FireNet for AWS
=====================================

Step 1. Deploy VPCs
---------------------

	- Create an Aviatrix Transit VPC by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

	- Create an Aviatrix Spoke VPC for Application by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in AWS portal. Moreover, feel free to use your existing VPC.
	
	- Refer to `Create VPCs <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-1-create-vpcs>`_ in Transit FireNet Workflow for AWS doc

Step 2. Deploy Aviatrix Multi-Cloud Transit Gateways
------------------------------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA in Transit FireNet VPC

Step 3. Deploy Spoke Gateways
------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA in Spoke VPC for Application 

Step 4. Attach Spoke Gateways to Transit Network
------------------------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Spoke Gateways to Transit Gateways 

Step 5. Configure Transit Firewall Network
------------------------------------------------

	- Follow the step 1

.. |transit_firenet_ingress| image:: ingress_firewall_example_media/Ingress_Aviatrix_Transit_FireNet_topology.png
   :scale: 30%
   
.. disqus::
