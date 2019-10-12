.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Ingress Firewall Setup Solution 
=========================================================

This document illustrates a simple architecture for Ingress traffic inspection firewall that leverages `AWS Network Load Balancer <https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html>`_, `Aviatrix TGW Orchestrator <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_ and `Aviatrix Firewall Network <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_.

The deployment diagram is shown as below, 

|ingress_firewall|

The key idea is to place an Internet facing AWS NLB in a spoke VPC in a separate domain (in the diagram, this domain is called Ingress domain.) from the domains where applications reside (Application domain). There is a connection 
policy to connect the Ingress domain with the Application domain. Application domain 
traffic requires inspection by connecting its domain with Aviatrix Firewall Domain.

In this unified architecture, firewalls can be used for Ingress, Egress, North-South and VPC to VPC filtering. The solution does not have AWS NLB to directly attach to firewall instances which then requires firewall instances to source NAT the incoming traffic from the Internet. Firewall instances can scale out as applications scale for all traffic types. 


1. Prerequisite Setup
--------------------------------

 - Follow `Aviatrix Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to launch FireNet gateways and firewall instances. Enable `Egress <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#how-do-i-enable-egress-inspection-on-firenet>`_ if desired.

 - Follow `Aviatrix TGW Orchestrator workflow <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_ to:
	-  Create an Ingress domain (this domain can be named something else and can be an existing domain, just make sure it is in a different domain than Application domain.). 
	- Build Connection policy between the Ingress domain and the Application domain. 
	- Build Connection policy between Application domain and Firewall domain so that traffic in and out of the domain is inspected. 
 	- Attach the Application domain VPC (Spoke-2 in the diagram) to the TGW. 
	- Attach the Ingress domain VPC (Spoke-1 in the diagram) to the TGW.  

2. Create AWS NLB
-------------------------------------

In Ingress domain VPC (Spoke-1), create an AWS NLB, make sure you select the following. 

 - Select internet-facing
 - Routing Target group should be IP


3. Ready to go!
---------------

 - From the AWS Console, make sure NLB target group is in healthy state.
 - Run a https request on the NLB DNS name
 - The application can also reach Internet through firewall instances if you enable Egress on the FireNet.

4. Preserving Source IP
-------------------------

When NLB has IP address as target group, the source IP address when the packet reaches to the application is one of the NLB node private IP address. If you like to get the original source IP address, you need to enable `Proxy Protocol Support <https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/enable-proxy-protocol.html>`_ on the NLB. Then the application can retrieve the client IP address by using X-Forwarded-For in the HTTP header. . 

.. |ingress_firewall| image:: ingress_firewall_example_media/ingress_firewall.png
   :scale: 30%


.. disqus::
