.. meta::
  :description: Cloud WAN Workflow
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


============================================================
Aviatrix Cloud WAN Workflow
============================================================

Register a Branch Router
---------------------------------------

Register a branch router to the Controller so the Controller can access its configuration, make changes to it and 
monitor its health and statistics. 

Connect to the Controller
--------------------------------------------------

After a branch router is registered, the controller connects to its publicly accessible interface to retrieve its configuration. 


Attach Branch to Cloud
-----------------------------------------

This step creates an IPSEC tunnel between the on-prem router and the Aviatrix Transit Gateway. 


.. |cloud_wan_1| image:: cloud_wan_faq_media/cloud_wan_1.png
   :scale: 30%

.. |cloud_wan_2| image:: cloud_wan_faq_media/cloud_wan_2.png
   :scale: 30%

.. disqus::
