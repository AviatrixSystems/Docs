.. meta::
  :description: TGW Orchestrator Overview
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator FAQ
=========================================================

What is TGW Orchestrator?
--------------------------

TGW Orchestrator serves three purposes:

 1. Orchestrates VPC to VPC connectivities via AWS TGW. 
 #. Creates security boundaries between groups of VPCs via Route Domains or Security Domains. 
 #. Out-of-the-box integration that allows customers with Direct Connect to utilize TGW for connecting on-prem to VPCs. 

The TGW Orchestrator is illustrated in the diagram below.

|tgw_overview|

In the above diagram, AWS VPCs are grouped into three domains: Dev domain, Prod domain, Shared Service domain and 
Aviatrix Edge domain. Each VPC in the same domain can communicate with each other via TGW. VPCs in Prod domain cannot communicate 
with VPCs in Dev Domain, while all VPCs in Dev domain and Prod domain can communicate with Shared service domain and Aviatrix 
Edge domain. 

Through the Aviatrix Transit GW in the Aviatrix Edge domain, Spoke VPCs can communicate with on-prem over Direct Connect. 

In the deployment, the VPC in the Aviatrix Edge domain is a Spoke VPC from TGW point of view, however it serves as Transit VPC 
from Aviatrix Transit Network point of view. No Aviatrix gateways are deployed in Spoke VPCs except in the Transit VPC. 

Aviatrix Transit GW serves as hub connecting to Azure and GCP network. 

What is a Security Domain?
---------------------------

Security Domain is a concept that builds upon AWS Route Domain concept. A security domain consists of a group of VPCs that communicate with each other via TGW. Each security domain has a corresponding route table on TGW. 

Aviatrix Controller programs and updates both VPC route tables and TGW route tables to keep the configuration in sync..

Two security domains are by default not connected, i.e., a VPC in one domain does not have connectivity to another VPC in a different domain. You can specify a policy to connect the two domains so that VPCs in each domain can communicate with each other. 

Aviatrix Controller programs and updates the TGW route table, route propagation and VPC route table to keep the configuration in sync. 

What is the Default_Domain?
---------------------------

When a TGW is created by the Aviatrix Controller, the Default_Domain is created and a route table corresponding to the Default_Domain is created on TGW. If you do not plan on building any network segmentation, you can use Default_Domain for inter VPC and hybrid communications. 

What is a Shared_Service_Domain?
-----------------------------------

When a TGW is created by the Aviatrix Controller, the Shared_Service_Domain is created and a route table corresponding to the Shared_Service_Domain is created on TGW. 

You can attach VPC to this domain and host your shared service instances such as your DevOps tools. 

Shared_Service_Domain is always connected to Default_Domain.

What is the Aviatrix_Edge_Domain?
----------------------------------

When a TGW is created by the Aviatrix Controller, the Aviatrix_Edge_Domain is created and a route table corresponding to the Aviatrix_Edge_Domain is created on TGW. 

Aviatrix_Edge_Domain is always connected to the Shared_Service Domain and the Default_Domain.


How to deploy TGW Orchestrator?
--------------------------------

TGW Orchestrator is deployed in a few stages. 

 - `Plan <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_
 - `Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_
 - List
 - View
 - Test




.. |tgw_overview| image:: tgw_overview_media/tgw_overview.png
   :scale: 30%

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :scale: 50%

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :scale: 50%

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :scale: 50%

.. disqus::
