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

What are the benefits of Cloud WAN?
-----------------------------------------

 - **Minimum Friction** Leverage what you have already invested in the on-prem edge router for connecting to the cloud. 
 - **Automation** Avoid human errors when building VPN connections to the cloud. 
 - **Visibility** Use the single pane of glass to monitor router health and stats. 


Can I use Cloud WAN just to manage the Cisco routers?
------------------------------------------------------

Yes. You can use Cloud WAN for making changes to the routers from a central place. -

What are the use cases for Cloud WAN?
--------------------------------------

Cloud WAN can be used to connect branch routers to the cloud directly. It can also be used to manage routers you deploy in the partner network where you have full access. 

Can Cloud WAN manage other vendor devices?
---------------------------------------------

No. Currently Cloud WAN only manages Cisco IOS routers. 

How many routers can Cloud WAN manage?
---------------------------------------

If the on-prem router terminates with Aviatrix Transit Gateway, there is limitation on how many routers can be connected. 

If the on-prem router terminates with AWS TGW, the maximum number of connections is 10. In addition the VPN has a 100 route limits.  


.. |tgw_overview| image:: tgw_overview_media/tgw_overview.png
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

.. disqus::
