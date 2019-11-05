.. meta::
  :description: Cloud WAN FAQ
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


============================================================
Aviatrix Cloud WAN FAQ
============================================================

What is the Aviatrix Cloud WAN?
---------------------------------------

Aviatrix Cloud WAN is a feature where the Aviatrix Controller manages and help connects on-prem Cisco IOS Routers to the cloud directly. 

Cloud WAN can be used to fulfill the following tasks. 

 1. Manage multiple Cisco IOS Routers from the Aviatrix Controller. This includes uploading and viewing the IOS configuration, making configuration changes to it and monitoring health and stats of the routers. 
 #. Auto connect Cisco IOS routers to the Aviatrix Transit Gateway or AWS TGW with IPSEC VPN over the Internet, thus allowing them to be part of the Transit Network with connectivities with the Spoke VPCs. 

What are the Cloud WAN deployment architectures?
--------------------------------------------------

There are three ways to deploy Cloud WAN. 

Cloud WAN Deployment 1
^^^^^^^^^^^^^^^^^^^^^^^^^

Cloud WAN can be deployed to connect with Aviatrix Transit Network as shown below

|cloud_wan_1|

Cloud WAN Deployment 2
^^^^^^^^^^^^^^^^^^^^^^^^^

Alternatively you can deploy Cloud WAN as an attachment to TGW where the Aviatrix Transit Gateway functions as edge to the TGW. 

|cloud_wan_2|

Cloud WAN Deployment 3
^^^^^^^^^^^^^^^^^^^^^^^^^

In this deployment VPN connections are built directly with TGW/VPN.

|cloud_wan_3|

What are the benefits of Cloud WAN?
-----------------------------------------

 - **No Friction** Leverage what you have already invested in the on-prem edge router for connecting to the cloud. 
 - **Shortest Latency** Leverage AWS Global Accelerator to connect your on-prem routers to the nearest AWS edge and route through the AWS backbone with the optimal path. 
 - **Automation** Avoid human errors and the complexity of VPN configuration when building VPN connections to the cloud. 
 - **Centrally Managed** Use the single pane of glass to both provision and monitor router health and stats. 

How does Cloud WAN work?
--------------------------

Cloud WAN leverages AWS Global Accelerator and the AWS backbone for the shortest latency path to the cloud. 

|global_accelerator|


Can I use Cloud WAN just to manage the Cisco routers?
------------------------------------------------------

Yes. You can use Cloud WAN for making changes to the routers from a central place, even if you are not ready to connect 
the on-prem routers to the cloud. 

What are the use cases for Cloud WAN?
--------------------------------------

Cloud WAN can be used to connect branch routers to the cloud directly. It can also be used to manage routers you deploy in the branch or partner network where you have full access. 

Can Cloud WAN manage other vendor devices?
---------------------------------------------

No. Currently Cloud WAN only manages Cisco IOS routers. 

How many routers can Cloud WAN manage?
---------------------------------------

If the on-prem router terminates with Aviatrix Transit Gateway, there is no limitation on how many routers can be connected. 

If the on-prem router terminates with AWS TGW, the maximum number of connections is 10. In addition the VPN has a 100 route limits.  

What are the requirements to deploy Cloud WAN?
-------------------------------------------------

Each managed Cisco router needs Internet access and a public IP address. 

What routing protocols are supported on Cloud WAN?
----------------------------------------------------

Cloud WAN supports BGP and static routing. 

Can Cloud WAN support branch to branch communications?
---------------------------------------------------------

When BGP is enabled on the branch router, Cloud WAN can route traffic between branches. 


.. |cloud_wan_1| image:: cloud_wan_faq_media/cloud_wan_1.png
   :scale: 30%

.. |cloud_wan_2| image:: cloud_wan_faq_media/cloud_wan_2.png
   :scale: 30%

.. |cloud_wan_3| image:: cloud_wan_faq_media/cloud_wan_3.png
   :scale: 30%

.. |global_accelerator| image:: cloud_wan_faq_media/global_accelerator.png
   :scale: 30%

.. |domain_policy_diagram| image:: tgw_overview_media/domain_policy_diagram.png
   :scale: 30%

.. |tgw_view| image:: tgw_overview_media/tgw_view.png
   :scale: 30%

.. |tgw_transit_vpc_compare| image:: tgw_overview_media/tgw_transit_vpc_compare.png
   :scale: 30%

.. |tgw_transit_orchestrator_compare| image:: tgw_overview_media/tgw_transit_orchestrator_compare.png
   :scale: 30%

.. disqus::
