.. meta::
  :description: Firewall Network FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
Firewall Network FAQ
=========================================================

What is Aviatrix Firewall Network (FireNet)?
----------------------------------------------

Aviatrix Firewall Network (FireNet) is a turn key network solution to deploy firewall instances in the 
cloud, as shown in the diagram below. 

|firewall_network|

FireNet significantly simplifies firewall instances deployment, allows the firewall instances to inspect 
VPC to VPC (East West) traffic, VPC to Internet (Egress) traffic, VPC to on-prem (North South) traffic. 

In addition, FireNet allows you to scale firewall deployment to multi AZ and multi instances in active/active state.


What are the Benefits of FireNet Deployment Model?
----------------------------------------------------------------------------------------

For enterprises that wish to deploy firewall in AWS, Aviatrix’s FireNet deployment model provides the best performance and automation.

 - **Simplicity** Aviatrix Firewall Network significantly simplifies firewall deployment in the cloud while providing the maximum performance and scale. 
 - **Full Traffic Inspection** With FireNet, North South (on-prem and cloud), East West (VPC to VPC) and Internet bound egress traffic can be inspected by firewall instances.
 - **No IPSEC Tunnels** No IPSEC tunnels connecting to firewall instances as opposed to ECMP VPN deployment model, maximizing each firewall instance throughput.
 - **No SNAT** No SNAT function required to be performed by firewall instances for east west traffic inspection as opposed to the ECMP VPN deployment model, resulting in instances in Spoke VPCs having complete visibility of source traffic.
 - **Scale Out** Multiple firewall instances can be deployed as a group to meet the demand of increasing workload. 

 - **Policy Driven** Policy driven workflow allows you to customize which VPCs traffic should be inspected. 
 - **Vendor Integration** Launch Palo Alto Networks VM-Series from the Aviatrix Controller console to simplify deployment. 
 - **Automation** The Aviatrix Controller automatically updates Palo Alto VM-Series route tables when on-prem route changes or VPC attachment changes. 

How is Firewall Network different from Transit DMZ?
------------------------------------------------------

Firewall Network is the new iteration from Transit DMZ. FireNet decouples the firewall deployment from the
path between on-prem and Aviatrix Transit VPC, yet provides the same traffic inspection functions and more 
scale out capabilities. 

What are the limitation of FireNet?
-------------------------------------

In Release 4.3, FireNet only supports the AWS Transit Gateway (TGW) deployment scenario. It does not support the encrypted transit deployment scenario. 

How does FireNet compare with ECMP/VPN based firewall deployment?
-------------------------------------------------------------------

AWS Transit Gateway (TGW) supports VPN with ECMP load balancing. With is capability, you can launch multiple firewall instances in a load balanced fashion
for Egress Inspection and VPC to VPC traffic inspection. 

One problem with this deployment is performance. The IPSEC tunnel limits each firewall instance
to be capped at 1Gbps. When this architecture is deployed for VPC to VPC inspection, traffic goes through VGW (the other end of the IPSEC tunnel) twice,
further reducing its throughput to 400Mbps. What this implies is that each firewall instance can only operate at 400Mpbs throughput. This is
much lower than what firewall instances can do without IPSEC tunnel.

Another problem is for east west traffic inspection, firewall instance must NAT the source address, otherwise the return traffic is not guaranteed to go through the same firewall instance. This is because ECMP 
makes independent decision of distributing the traffic the firewall instances for each direction of
the traffic.  

What is the minimum gateway instance size for FireNet deployment?
--------------------------------------------------------------------

The minimum gateway instance size is C5.xlarge. This is because FireNet gateway requires 4 network 
interfaces: 

 - eth0 as management interface
 - eth1 as TGW interface
 - eth2 as firewall instance interface
 - eth3 as the second FireNet gateway interface

How does FireNet work?
-----------------------

Take an example for a VPC1 to VPC2 traffic inspection, where VPC1 and VPC2 are attached to the same TGW. 

As a packet from VPC1 arrives at FireNet gateway via TGW, it does a 4-tuple 
(source IP, destination IP, source port and destination port) hash calculation to decide if it should
forward the packet to one of the associated firewall instances or forward to the HA FireNet gateway.  

If hash calculation determines the firewall instance is associated with the HA FireNet gateway, it forwards the packet to the HA FireNet gateway through eth3 interface. 

When HA FireNet gateway receives the packet, it performs the exactly same hash calculation and decide which 
associated firewall instance it should forward the traffic to. 


How to enable Egress inspection on FireNet?
---------------------------------------------

Go to Firewall Network -> Advanced. Click the skewer. Scroll down to "Egress through Firewall" and click Enable.

Is there an example guide to setup Palo Alto VM-Series policies?
------------------------------------------------------------------

Yes. Follow `Example Config for Palo Alto VM-Series <https://docs.aviatrix.com/HowTos/config_paloaltoVM.html>`_ to 
setup an "ALLOW ALL" policy for test validation.




FireNet Deployment Model 1 - Hybrid with TGW
---------------------------------------------------

FireNet supports AWS Transit Gateway (TGW), as shown below. 

|firenet_transit|

FireNet Deployment Model 2 - Hybrid with Insane Mode
--------------------------------------------------------

FireNet supports AWS Transit (TGW) with Insane Mode,  

|firenet_insane|

FireNet Deployment Model 3 (Future release)
----------------------------------------------

In the future release, the hybrid deployment can be using native AWS Direct Connect Gateway. 


|firenet|


.. |firewall_network| image:: firewall_network_faq_media/firewall_network.png
   :scale: 30%

.. |firenet| image:: firewall_network_media/firenet.png
   :scale: 30%

.. |firenet_transit| image:: firewall_network_media/firenet_transit.png
   :scale: 30%

.. |firenet_insane| image:: firewall_network_media/firenet_insane.png
   :scale: 30%

.. |main_companion_gw| image:: transit_dmz_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
