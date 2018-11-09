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

.. note::

  Route Domain and Security Domain are terms used interchangeably. It is concept that describes a group of VPCs with the same trust relationship and can communicate with each other.

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
