.. meta::
  :description: Transit Network Segmentation Workflow
  :keywords: Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Aviatrix Transit Network Segmentation Workflow
=========================================================

For questions, refer to `Aviatrix Transit Segmentation FAQ. <https://docs.aviatrix.com/HowTos/transit_segmentation_faq.html>`_

1. On the **MULTI-CLOUD TRANSIT > Segmentation > Plan** page, enable the Aviatrix Transit Gateway for segmentation.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   An `Aviatrix Transit Gateway deployed in the Multi-Cloud Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_
==========================================      ==========

<<<<<<< Updated upstream
2. Create a Multi-Cloud network domain. You can make changes to your network segmentation at any time by coming back to this page. 
=======
2. Create a Multi-Cloud network domain. You can make changes to your network segmentation at any time, simply come back to this page. 
>>>>>>> Stashed changes

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
<<<<<<< Updated upstream
Network Domain Name                             Specify a unique domain name. For example, Dev_Domain
=======
Network Domain Name                            Specify a unique domain name. For example, Dev_Domain
>>>>>>> Stashed changes
==========================================      ==========

3. Add/modify connection policies. 

This step specifies the connection relationship of one domain to others. Two connected domains imply that Spokes in 
each domain can communicate with each other despite the fact that they are in different domains. 

Highlight a domain on the left panel and click Add, the domain will appear to the right. 


-----------------------------------------------------------------------------------------------------------------------

This section is used to build the network segmentation by associating a Spoke.  

1. On the **MULTI-CLOUD TRANSIT > Segmentation> Build** page, associate an Aviatrix Spoke/Edge gateway to the domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   The name of the Aviatrix Transit Gateway
Network Domain Name                             The name of the network domain
Attachment Name                                 The name of a Spoke or edge connection to associate to the domain
==========================================      ==========


2. Disassociate Aviatrix Spoke/Edge to domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Aviatrix Transit Gateway Name                   The name of the Aviatrix Transit Gateway
Network Domain Name                             The name of the network domain
Attachment Name                                 The name of a Spoke or edge connection to disassociate from the domain
==========================================      ==========


------------------------------------------

This section consists of the delete functions. 


<<<<<<< Updated upstream
1. On the **MULTI-CLOUD TRANSIT > Segmentation > Delete** page, you can delete the multi-cloud network domain.
=======
1. Delete Multi-Cloud network domain.
>>>>>>> Stashed changes

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Network Domain Name                             The name of the network domain
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
