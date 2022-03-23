.. meta::
  :description: Transit Network Segmentation Workflow
  :keywords: Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Aviatrix Transit Network Segmentation Workflow
=========================================================

For questions, refer to `Aviatrix Transit Segmentation FAQ. <https://docs.aviatrix.com/HowTos/transit_segmentation_faq.html>`_

1. Enable the Aviatrix Transit Gateway for segmentation.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   An `Aviatrix Transit Gateway deployed in the Multi-Cloud Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_
==========================================      ==========

2. Create a Multi-Cloud Security domain. You can make changes to your network segmentation at any time, simply come back to this page. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Security Domain Name                            Specify a unique domain name. For example, Dev_Domain
==========================================      ==========

3. Add/modify connection policies. 

This step specifies the connection relationship of one domain to others. Two connected domains imply that Spokes in 
each domain can communicate with each other despite the fact that they are in different domains. 

Highlight a domain on the left panel and click Add, the domain will appear to the right. 


-----------------------------------------------------------------------------------------------------------------------

This section is to build the network segmentation by associating a Spoke.  

1. Associate Aviatrix Spoke/Edge to the domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   The name of the Aviatrix Transit Gateway
Security Domain Name                            The name of the Security Domain
Attachment Name                                 The name of a Spoke or edge connection to associate to the domain
==========================================      ==========


2. Disassociate Aviatrix Spoke/Edge to domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   The name of the Aviatrix Transit Gateway
Security Domain Name                            The name of the Security Domain
Attachment Name                                 The name of a Spoke or edge connection to disassociate from the domain
==========================================      ==========


------------------------------------------

This section consists of the delete functions. 


1. Delete Multi-Cloud Security domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Security Domain Name                            The name of the Security Domain
==========================================      ==========

2. Disable Aviatrix Transit Gateway for segmentation.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   An `Aviatrix Transit Gateway deployed in the Multi-Cloud Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_
==========================================      ==========


.. |tgw_peer| image:: tgw_plan_media/tgw_peer.png
   :scale: 30%

.. disqus::
