.. meta::
  :description: Transit Segmentation FAQ
  :keywords: Aviatrix Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


============================================================
Transit Network Segmentation FAQ
============================================================

What is Multi-Cloud Transit Segmentation?
-------------------------------------------

Aviatrix Multi-Cloud Transit Segmentation provides network isolation through security domains and connection policies to Aviatrix Transit network
where both Spoke and Transit networks deploy Aviatrix gateways across multi-region and multi-cloud. The concept can be 
described in the diagram below, 

|transit_segmentation|

Where Spokes associated with the blue domain can communicate with each other while Spokes associated with the green domain can communicate with each other. 
But there is no cross communication between blue domain and green domain unless there is connection policy. The concept is the same as `Security Domains <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-security-domain>`_
and `Connection Policies <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-connection-policy>`_ defined in 
TGW Orchestrator, except this is implemented with Aviatrix Transit where both Spokes and Transit VPC/VNet deploy Aviatrix gateways. (Note the segmentation works with Azure native Spoke VNets.)

What is a Security Domain in Multi-Cloud Transit?
-------------------------------------------------------

A Security Domain is an Aviatrix enforced network of VPC/VNet members, where VPC/VNets in the Security Domain can communicate with each other, and VPC/VNets not in the security domain cannot communicate with VPC/VNets in the Security Domain.

One or more Spoke VPC/VNetss are members in  a security domain.

Spokes in a security domain can communicate with each other via an Aviatrix Transit Gateway.  

The Aviatrix Controller dynamically programs and updates both VPC/VNet route tables so that instances in different 
Spoke VPC/VNets in the same domain can communicate with each other.  

Two security domains are not connected, i.e., a Spoke in one domain has no connectivity to another 
Spoke in a different domain. Connection policy must be specified to connect the two domains so that Spokes in each domain can communicate with each other. 

The Security Domain also applies to the hybrid connection from Aviatrix Transit Gateway to on-prem or remote sites. Each BGP peer or connection can 
be associated with one Security Domain. 


What is a Connection Policy?
-----------------------------

A connection policy is a rule enforced by Aviatrix for cross Security Domain connectivity. 


What are the benefits of using Security Domains and Connection Policies?
--------------------------------------------------------------------------

The key use case for building Security Domains is to segment traffic for enhanced security posture.  

Using Security Domains and Connection Policies allow you to identify groups of Spokes and Edges with the same requirements from 
a networking point of view and then apply connection policies at the group level. This avoids having to individually 
specify connections at the Spoke level. The Aviatrix Controller takes care of route programming of all route tables. 

Can an Aviatrix Transit Security Domain work with TGW Orchestrator Security Domain?
-------------------------------------------------------------------------------------

They do not work together at this time, however we have plan to integrate them in the future. 

How do I setup Multi-Cloud Transit Segmentation?
--------------------------------------------------

Follow the `Transit Segmentation Workflow. <https://docs.aviatrix.com/HowTos/transit_segmentation_workflow.html>`_.  

How many Security Domains are supported in Multi-Cloud Transit Segmentation?
-------------------------------------------------------------------------------

The maximum number of Security Domains is 252. 



.. |transit_segmentation| image:: transit_segmentation_faq_media/transit_segmentation.png
   :scale: 30%

.. |security_domain| image:: tgw_overview_media/security_domain.png
   :scale: 30%

.. |domain_policy_diagram| image:: tgw_overview_media/domain_policy_diagram.png
   :scale: 30%

.. |tgw_view| image:: tgw_overview_media/tgw_view.png
   :scale: 30%

.. |tgw_transit_vpc_compare| image:: tgw_overview_media/tgw_transit_vpc_compare.png
   :scale: 30%

.. |tgw_transit_orchestrator_compare| image:: tgw_overview_media/tgw_transit_orchestrator_compare.png
   :scale: 30%

.. |edge_segmentation| image:: tgw_overview_media/edge_segmentation.png
   :scale: 30%

.. |tgw_approval| image:: tgw_overview_media/tgw_approval.png
   :scale: 30%

.. disqus::
