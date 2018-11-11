.. meta::
  :description: TGW Orchestrator Overview
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator FAQ
=========================================================

What is the Aviatrix TGW Orchestrator?
---------------------------------------

TGW Orchestrator serves three purposes:

 1. Orchestrates VPC to VPC connectivities via AWS TGW. 
 #. Creates security boundaries between groups of VPCs via Route Domains or Security Domains to achieve network segmentation.. 
 #. Out-of-the-box integration that allows customers with Direct Connect to utilize TGW for connecting on-prem to VPCs. 

The TGW Orchestrator is illustrated in the diagram below.

|tgw_overview|

In the above diagram, AWS VPCs are grouped into four domains: Dev domain, Prod domain, Shared Service domain and 
Aviatrix Edge domain. Each VPC in the same domain can communicate with each other via TGW. VPCs in Prod domain cannot communicate 
with VPCs in Dev Domain, while all VPCs in Dev domain and Prod domain can communicate with Shared service domain and Aviatrix 
Edge domain. 

Through the Aviatrix Transit GW in the Aviatrix Edge domain, Spoke VPCs can communicate with on-prem over Direct Connect. 

In the deployment, the VPC in the Aviatrix Edge domain is a Spoke VPC from TGW point of view, however it serves as Transit VPC 
from Aviatrix Transit Network point of view. No Aviatrix gateways are deployed in Spoke VPCs except in the Transit VPC. 

Aviatrix Transit GW serves as hub connecting to Azure and GCP network. 

Why should I use Aviatrix TGW Orchestrator?
--------------------------------------------

Aviatrix TGW Orchestrator simplifies, abstracts and extends the latest AWS TGW service. 

- **Simplification** The Orchestrator programs and updates both VPC route tables and TGW route tables so the routes are dynamically propagated to the Spoke VPCs. . 
- **Segmentation** The Orchestrator abstracts the route domain and route propagation concepts in TGW that allows you to create network segmentation by policy and intent. 
- **Hybrid** The Orchestrator extends the TGW capability to include Direct Connect support for connecting to on-prem datacenter. 
- **Multi Cloud Architecture** Aviatrix Controller creates and manages a multi cloud global transit architecture with a single pane of glass. 

How does Aviatrix TGW Orchestrator compliment AWS TGW service?
---------------------------------------------------------------

- **Dynamic Route Propagation** AWS TGW propagates VPC routes and IPSEC VPN routes to the TGW route table. But the routes are not propagated to the VPC route table. It is account owner's responsibility to program VPC route tables. Aviatrix TGW Orchestrator dynamically update route entries in the VPC route tables. 

- **Policy Abstraction** AWS TGW provides capability to allow two TGW route tables to propagate routes to each other, but the actual route entry programming is left to the owner. Aviatrix TGW Orchestrator builds on that and allows customers to define policies that form a security boundary. 

- **Direct Connect Support** AWS TGW provides on-prem connectivity via IPSEC VPN. It does not support Direct Connect. With Aviatrix TGW Orchestrator, Direct Connect customers can immediately benefit TGW service.  

How does TGW Orchestrator work with Transit Network?
-----------------------------------------------------

TGW Orchestrator leverages the Aviatrix Transit Network workflow for the hybrid connectivity function to on-prem datacenter and branches. It enables TGW Orchestrator to connect with on-prem over Direct Connect or Internet. 

TGW Orchestrator can also be used as a stand alone function for orchestrating VPC to VPC connections.  

When using TGW Orchestrator for hybrid connectivity, no gateways are deployed in the Spoke VPCs for hybrid function. 


What is a Security Domain?
---------------------------

Security Domain is an abstraction that builds upon AWS Route Domain concept. One or more Spoke VPCs are attached 
to a security domain.

VPCs attached to a security domain can communicate with each other via TGW. Each security domain has a corresponding route table on TGW. 

Aviatrix Controller dynamically programs and updates both VPC route tables and TGW route tables so that instances in different 
Spoke VPCs in the same domain can communicate with each other.  

Two security domains are by default not connected, i.e., a Spoke VPC attached to one domain has no connectivity to another 
Spoke VPC attached to a different domain. You can specify a connection policy to connect the two domains so that VPCs in each domain can communicate with each other. 

Aviatrix Controller dynamically programs and updates the TGW route tables, route propagation and Spoke VPC route tables so that
instances in different Spoke VPCs of different connected security domains can communicate with each other.  

What is a Connection Policy?
-----------------------------

A connection policy specifies the connection relationship of one Security Domain to others. If two Security Domains connected by policy, instances in Spoke VPCs attached to each domain can communicate with each other via TGW. 

What is the Default_Domain?
---------------------------

When a TGW is created by the Aviatrix Controller, the Default_Domain is created and a route table corresponding to the Default_Domain is created on TGW. If you do not plan on building any network segmentation, you can use Default_Domain for inter Spoke VPC and hybrid communications. 

What is the Shared_Service_Domain?
-----------------------------------

When a TGW is created by the Aviatrix Controller, the Shared_Service_Domain is created and a route table corresponding to the Shared_Service_Domain is created on TGW. 

You can attach a Spoke VPC to this domain and host your shared service instances such as your DevOps tools. 

Shared_Service_Domain is always connected to Default_Domain and Aviatrix_Edge_Domain.

What is the Aviatrix_Edge_Domain?
----------------------------------

When a TGW is created by the Aviatrix Controller, the Aviatrix_Edge_Domain is created and a route table corresponding to the Aviatrix_Edge_Domain is created on TGW. 

Aviatrix_Edge_Domain is designated for connecting VPCs managed by TGW Orchestrator to on-prem network. There must be one VPC 
attached to this domain. In the VPC, an Aviatrix Transit GW is deployed and used for data traffic forwarding between Spoke VPCs and on-prem network. 

Aviatrix_Edge_Domain is always connected to the Shared_Service Domain and the Default_Domain.


How to deploy TGW Orchestrator?
--------------------------------

TGW Orchestrator is deployed in a few stages. 

 - `Plan <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_
 - `Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_
 - List
 - View
 - Test

What are the TGW Orchestrator deployment scenarios?
------------------------------------------------------

Check out some `design patterns <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html>`_ that address your requirements. 





.. |tgw_overview| image:: tgw_overview_media/tgw_overview.png
   :scale: 30%

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :scale: 50%

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :scale: 50%

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :scale: 50%

.. disqus::
