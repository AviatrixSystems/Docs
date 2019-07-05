.. meta::
  :description: Firewall Network FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
Firewall Network Design Patterns
=========================================================


FireNet Deployment Model 1 - Hybrid with TGW
---------------------------------------------------

FireNet supports AWS Transit Gateway (TGW), as shown below. 

|firenet_transit|

FireNet Deployment Model 2 - Hybrid with Insane Mode
--------------------------------------------------------

FireNet supports AWS Transit (TGW) with Insane Mode,  

|firenet_insane|

FireNet Deployment Model 3 - Native TGW integration
------------------------------------------------------------------

In the Release 4.6, the hybrid deployment can be using native AWS Direct Connect Gateway. 

|firenet|

FireNet Deployment Model 4 - Multi Region Transit with Native TGW integration 
---------------------------------------------------------------------------------

Connect to on-prem with AWS DXGW and use Aviatrix Edge gateway to connect to multiple regions.

|multi_region_firewall|

FireNet Deployment Model 5 - Multi Region Transit with Aviatrix Edge
------------------------------------------------------------------------

Connect to on-prem with Aviatrix Edge gateway for both hybrid and multi regions.

|multi_region_aviatrix_edge|

FireNet Deployment Model 6 - Two Firewall Networks 
--------------------------------------------------------

You can deploy two Firewall Networks, one dedicated for VPC to VPC traffic inspection and another for Ingress/Egress
inspection.

When Ingress inspection is deployed, make sure you enable SNAT on the firewall instance to source NAT the private 
IP address of NLB or a third party load balancer the IP address of LAN (or Trusted) interface of the FireNet. 

|multi_firewall|

FireNet Deployment Model 7 - Ingress/Egress Traffic Inspection
-----------------------------------------------------------------

|firenet_ingress_egress|

.. |firewall_network| image:: firewall_network_faq_media/firewall_network.png
   :scale: 30%

.. |firewall_deploy| image:: firewall_network_faq_media/firewall_deploy.png
   :scale: 30%

.. |multi_region_firewall| image:: firewall_network_faq_media/multi_region_firewall.png
   :scale: 30%

.. |multi_region_aviatrix_edge| image:: firewall_network_faq_media/multi_region_aviatrix_edge.png
   :scale: 30%

.. |firewall_network_perf| image:: firewall_network_faq_media/firewall_network_perf.png
   :scale: 30%

.. |multi_firewall| image:: firewall_network_faq_media/multi_firewall.png
   :scale: 30%

.. |firenet_ingress_egress| image:: firewall_network_faq_media/firenet_ingress_egress.png
   :scale: 30%

.. |firenet| image:: firewall_network_media/firenet.png
   :scale: 30%

.. |firenet_transit| image:: firewall_network_media/firenet_transit.png
   :scale: 30%

.. |firenet_insane| image:: firewall_network_media/firenet_insane.png
   :scale: 30%

.. |private_interfaces| image:: firewall_network_workflow_media/private_interfaces.png
   :scale: 30%


.. disqus::
