.. meta::
  :description: Transit DMZ FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ


=========================================================
Transit DMZ FAQ
=========================================================

What is Transit DMZ?
-----------------------

Transit DMZ is a cloud networking feature for the Next Gen Transit network. With Transit DMZ, you can centrally deploy instance based
firewall virtual appliances to protect traffic between on-prem and VPCs, VPC to VPC (East-West) and VPC Egress and Ingress. Transit DMZ is 
implemented at the edge VPC as shown below, where a pair of firewalls are deployed between two pairs of Aviatrix Transit GWs at the Transit VPC edge. 

|transit_dmz| 

How is Transit DMZ different from the traditional deployment of firewalls in the cloud?
----------------------------------------------------------------------------------------

Traditionally, centrally deployed instance based firewall appliances require IPSEC tunnels and BGP to send traffic from VPCs to these appliances. This increases the complexity of managing the firewalls and reduces performances for the security
features that you want them to perform. 

Transit DMZ decouples networking functions and security functions. There is no IPSEC tunnels between the Aviatrix 
Transit GW and the firewall appliances, thus simplifying firewall deployment, maximizing firewall appliance performance and allowing them to scale independently.  

Can Transit DMZ work with Transit VPC?
---------------------------------------

Since Transit DMZ is independent from how a Spoke VPC is connected, it works with both the 
Transit VPC where a Spoke VPC deploys Aviatrix gateways and the Native TGW Spoke VPCs 
where no Aviatrix gateway is deployed in the Spoke VPC. 

The starting point for the Next Gen Transit Network for AWS is `here. <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_

Can Transit DMZ inspect all traffic?
---------------------------------------------------

Transit DMZ intercepts traffic between north and south (on-prem and VPCs), east-west (VPC to VPC) and  
Egress and Ingress traffic.  

Can Transit DMZ work with Aviatrix InsaneMode Encryption?
----------------------------------------------------------

Yes.

How does Transit DMZ actually work?
------------------------------------

Transit DMZ relies completely on the AWS VPC network infrastructure to work. There is no IPSEC tunnel between the Aviatrix gateways and the firewall appliances. 

Transit DMZ deploys two sets of Aviatrix Transit GWs in the Transit VPC. They are called main gateways and companion gateways. Main gateways are used to interface with the Spoke VPC (with or without TGW) while companion gateways are 
used to interface with on-prem side (via VGW, CloudN or third party appliance), as shown in the diagram below. 

|main_companion_gw|

Here is how Transit DMZ works:

 1. The companion gateways establishes BGP with downstream device, such as VGW, CloudN or a third party router.
 #. The learned routes from the companion gateway via BGP is forwarded to the Controller. 
 #. The Controller then distributes the routes to all Spoke VPCs and the main gateways. 
 #. From a Spoke VPC point of view, its transit gateway is the main gateway even though the main gateway runs no BGP. 

The Aviatrix Controller monitors the health of the instance based firewall appliances by AWS APIs. When it detects one
firewall instance become not in running state, it triggers an HA failover to direct both the main gateway and the 
companion gateway to point the routes to the backup firewall instance. 

How should the firewall be deployed?
-------------------------------------

A firewall typically has multiple interfaces.  

|main_companion_subnets| 

Aviatrix Controller will create VPC route tables to associate the firewall subnets and create necessary route entries 
for packet forwarding. 

How to setup Transit DMZ?
-----------------------------

Follow the `Transit DMZ workflow <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html>`_ 
for a step by step guide to setup. 

How to enable East-West Inspection for encrypted transit?
----------------------------------------------------------

If you deploy the transit solution with Spoke VPC deployed with Aviatrix gateways, 
follow the two steps below to enable East-West (VPC to VPC) traffic inspection by Transit DMZ. 

 - Enable Connected Transit Mode. Go to Transit Network -> Advanced Config -> Edit Transit to enable Connected Transit.
 - Enable East-West Traffic Inspection. Go to Transit DMZ -> Advanced, click the Skewer of the Transit DMZ display, scroll down to East-West Traffic Inspection. Click Enable. 

.. |transit_dmz| image:: transit_dmz_media/transit_dmz.png
   :scale: 30%

.. |main_companion_gw| image:: transit_dmz_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
