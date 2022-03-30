.. meta::
  :description: CloudN FAQ
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


============================================================
Aviatrix CloudN FAQ
============================================================

What is the Aviatrix CloudN?
---------------------------------------

Aviatrix CloudN manages and automates secure connectivity of on-prem Cisco IOS Routers to the cloud. The IPsec connection terminates with 
AWS Transit Gateway (TGW), Aviatrix Transit Gateway, or Azure Virtual WAN.

Starting in Release 6.2, CloudN also manages Aviatrix CloudN appliance for high performance encryption connection (up to 25Gbps) from on-prem to the cloud. 

This document focuses on CloudN for Cisco IOS devices. For configuration information on CloudN 
appliance, refer to `Managed CloudN Workflow <https://docs.aviatrix.com/HowTos/CloudN_workflow.html>`_. 

CloudN can be used to fulfill the following tasks. 

 1. Manage multiple Cisco IOS Routers from the Aviatrix Controller. This includes uploading and viewing the IOS configuration, making configuration changes and monitoring the health and stats of these routers. 
 #. Automate secure connection of Cisco IOS routers to the Aviatrix Transit Gateway or AWS TGW with IPsec VPN over the Internet, thus allowing them to be part of the Transit Network where they gain connectivity to Spoke VPCs. 

What are the CloudN deployment architectures?
-------------------------------------------------------------------

There are three ways to deploy CloudN. 

CloudN Deployment 1
^^^^^^^^^^^^^^^^^^^^^^^^^

CloudN can be deployed to connect with Aviatrix Transit Network as shown below.

|cloud_wan_1|

CloudN Deployment 2
^^^^^^^^^^^^^^^^^^^^^^^^^

Alternatively, you can deploy CloudN as an attachment to TGW where the Aviatrix Transit Gateway functions as edge to the TGW. 

|cloud_wan_2|

CloudN Deployment 3
^^^^^^^^^^^^^^^^^^^^^^^^^

In this deployment IPsec tunnels are built directly to TGW VPN.

|cloud_wan_3|

CloudN Deployment on Azure
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

CloudN can terminate branch router IPsec connection with Aviatrix Transit Gateway deployed in Azure, as shown in 
the diagram below. 

|cloud_wan_azure|

CloudN Deployment on Azure Virtual WAN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

CloudN is integrated with Azure Virtual WAN, as shown in the diagram below. For configuration example, refer to `CloudN on Azure vWAN Configuration Example <https://docs.aviatrix.com/HowTos/cloud_wan_workflow_azure_vwan.html>`_.

|cloudwan_azure_vwan|

What are the benefits of CloudN?
-----------------------------------------

 - **No Friction** Leverage what you have already invested in the on-prem edge router for connecting to the cloud. 
 - **Shortest Latency** Leverage AWS Global Accelerator or Azure backbone to connect your on-prem routers to the nearest cloud provider edge and route through the their backbone with the optimal path. 
 - **Automation** Avoid human errors and the complexity of VPN configuration when building VPN connections to the cloud. 
 - **Centrally Managed** Use the single pane of glass to both provision and monitor router health and stats. 

How does CloudN work in AWS?
---------------------------------

CloudN leverages AWS Global Accelerator and the AWS backbone for the shortest latency path to the cloud. 

|global_accelerator|

For example, if the application is in us-west-2 and you have a branch office in Singapore country. If you built an IPsec tunnel to the 
gateway in us-west-2 without deploying CloudN, the traffic initiated from Singapore typically traverse through many ISP carriers and eventually
to AWS us-west-2. On the other hand, with CloudN, traffic from Singapore gets to the first ISP, hops onto the AWS edge in the area and 
moves through the uncongested AWS backbone to us-west-2. Both latency and jitter should be minimal. 


Can I use CloudN just to manage the Cisco routers?
------------------------------------------------------

Yes. You can use CloudN for making changes to the routers from a central place, even if you are not ready to connect 
the on-prem routers to the cloud. 

What are the use cases for CloudN?
-----------------------------------------------------

CloudN can be used to connect branch routers to the cloud directly. It can also be used to manage routers you deploy in the branch or partner network where you have full access. 

Can CloudN manage other vendor devices?
------------------------------------------------------------

No. Currently CloudN only manages Cisco IOS routers. 

How many routers can CloudN manage?
--------------------------------------------------------

If the on-prem router terminates with Aviatrix Transit Gateway, there is no limitation on how many routers can be connected. 


What are the requirements to deploy CloudN?
------------------------------------------------------------------

General requirement is to have each managed Cisco router needs Internet access and a public IP address.

Please make sure the following items are properly configured in Cisco IOS router.

1. Please make sure Cisco router’s login username  is set to privilege 15.

  Cisco IOS CLI examples:
  
  ::
  
    username admin privilege 15 password 0 password
    username administrator privilege 15 secret 5 $1$WbTk$uk7Au2PkCardkaM3BCcIS.
    username superuser privilege 15

2. Please make sure line vty is set to "privilege level 15" and ssh is included for “transport input."

  Cisco IOS CLI example:
  
  ::
  
    line vty 1 4
      privilege level 15
      login local
      transport input ssh
 
3. Please enable ip ssh in Cisco IOS, either password authentication, private key authentication, or both. See `this article <https://www.cisco.com/c/en/us/support/docs/security-vpn/secure-shell-ssh/4145-ssh.html>`_.


4. Please enable scp server in Cisco IOS.

  Cisco IOS CLI example:
  
  ::
  
    ip scp server enable

What routing protocols are supported on CloudN?
------------------------------------------------------------------

CloudN supports BGP and static routing. 

Can CloudN support branch to branch communications?
-------------------------------------------------------------------------

When BGP is enabled on the branch router, CloudN can route traffic between branches. 

How do I configure CloudN?
---------------------------------------

Follow the `CloudN workflow to get started. <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html>`_. 

How should I secure my IOS router?
--------------------------------------------------

When a router is attached, an ACL rule to permit TCP port 22 access from the Aviatrix Controller. 
 
What Cisco routers are supported?
------------------------------------------------

Cisco routers that run IOS Classic and IOS XE are supported. For example, ISR G2, ASR and ISR G3. 


.. |cloud_wan_1| image:: cloud_wan_faq_media/cloud_wan_1.png
   :scale: 30%

.. |cloud_wan_2| image:: cloud_wan_faq_media/cloud_wan_2.png
   :scale: 30%

.. |cloud_wan_3| image:: cloud_wan_faq_media/cloud_wan_3.png
   :scale: 30%

.. |cloud_wan_azure| image:: cloud_wan_faq_media/cloud_wan_azure.png
   :scale: 30%

.. |cloudwan_azure_vwan| image:: cloud_wan_faq_media/cloudwan_azure_vwan.png
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
