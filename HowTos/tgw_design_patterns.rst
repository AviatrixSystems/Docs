.. meta::
  :description: TGW Orchestrator Overview
  :keywords: Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Transit Gateway Orchestrator Design Patterns
=========================================================

Many design patterns exist to deploy your network with Aviatrix TGW Orchestrator. Here are some 
examples. 

Dev & Prod isolated design
---------------------------

If you like to build network segmentation between Dev/QA VPCs and Production VPCs, but requiring shared service VPC and
on-prem to reach each VPC, consider the diagram below.
diagram below.

|dev_prod_design|

In this network design, you need to create a two custom Security Domains, Dev_Domain and Prod_Domain.

At the Plan page Step 2, select "Create Custom Security Domain" and fill in the information. Make sure you multi select Shared_Service_Domain and Aviatrix_Edge_Domain for "Connect to Security Domains". Apply this step for both Dev_Domain and Prod_Domain.

All-in-cloud with Multi Security Domains
-----------------------------------------

If you are only concerned about VPC to VPC segmentation, you can deploy Aviatrix Controller for 
an all-in-cloud segmented network, as shown below. 

|all-in-cloud| 

Connecting TGWs in Multi Regions
---------------------------------

You can use Aviatrix Transit GW to connect TGW in multi regions, as shown below. 

|multi-region|

Full mesh network design
--------------------------

If you like to build a full mesh network that allows all VPCs and on-prem to communicate with each other, you do not need to create any custom Security Domains. Simply use the built-in Default_Domain and Aviatrix_Edge_Domain for the deployment, as shown below. 

|default_domain_design|

At Plan page Step 2, select "Full mesh network". 


Fully Isolated network design
------------------------------

If you like to build a fully isolated network where no VPC can communicate with each other except to the shared service VPC and on-prem, you need to create a Security Domain for each VPC and connect each domain to the Shared_Service_Domain. 

|fully_isolated_network_design|

In this network design, you need to create a custom Security Domain for each VPC. 

At the Plan page Step 2, select "Create Custom Security Domain" and fill in the information. Make sure you multi select Shared_Service_Domain and Aviatrix_Edge_Domain for "Connect to Security Domains". Repeat this step for each VPC. 

If this design does not scale for you, consider `Aviatrix Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ where all VPCs are by default isolated to each other. 

Integrating with Distributed Egress Control Design
----------------------------------------------------------

For any of the TGW design patterns, you may deploy Aviatrix distributed Egress FQDN in each VPC. In this example, a full mesh
deployment is expanded to include Egress FQDN support, as shown below.

|default_egress|

Follow the instructions for `FQDN <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ to deploy egress control funct
ion.

High Performance Transit - Insane Mode
---------------------------------------

Deploy an Aviatrix hardware appliance on-prem to achieve 10Gbps Transit Network throughput. 
Added benefit is that traffic over Direct Connect is encrypted. 

|insane-mode|

Secure Transit with DMZ Firewalls
-----------------------------------

Firewalls can be deployed in the Transit VPC for a centralized Ingress and Egress security solution, 
as shown below. . 

|transit-DMZ|

.. |default_domain_design| image:: tgw_design_patterns_media/default_domain_design.png
   :scale: 30%

.. |default_egress| image:: tgw_design_patterns_media/default_egress.png
   :scale: 30%

.. |fully_isolated_network_design| image:: tgw_design_patterns_media/fully_isolated_network_design.png
   :scale: 30%

.. |dev_prod_design| image:: tgw_design_patterns_media/dev_prod_design.png
   :scale: 30%

.. |all-in-cloud| image:: tgw_design_patterns_media/all-in-cloud.png
   :scale: 30%

.. |multi-region| image:: tgw_design_patterns_media/multi-region.png
   :scale: 30%

.. |insane-mode| image:: tgw_design_patterns_media/insane-mode.png
   :scale: 30%

.. |transit-DMZ| image:: tgw_design_patterns_media/transit-DMZ.png
   :scale: 30%

.. disqus::
