.. meta::
  :description: TGW Orchestrator Overview
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator Design Patterns
=========================================================

Default_Domain Design
--------------------------

If you just want a full mesh connectivity between VPCs and on-prem, you do not need to create any more domains. Simply use the built-in Default_Domain and Aviatrix_Edge_Domain for the full deployment, as shown below. 

|default_domain_design|

Default_Domain Design with Distributed Egress Control
-------------------------------------------------------

You can build the Default_Domain to support Aviatrix distributed Egress FQDN in each VPC, as shown below. 

|default_egress|




.. |default_domain_design| image:: tgw_design_patterns_media/default_domain_design.png
   :scale: 30%

.. |default_egress| image:: tgw_design_patterns_media/default_egress.png
   :scale: 30%

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :scale: 50%

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :scale: 50%

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :scale: 50%

.. disqus::
