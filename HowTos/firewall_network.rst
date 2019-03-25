.. meta::
  :description: Transit DMZ FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ


=========================================================
Firewall Network
=========================================================

For enterprises that wish to deploy firewall in AWS, Aviatrix's FireNet deployment model provides the best performance and automation. 

Benefits of FireNet Deployment Model
----------------------------------------------------------------------------------------

 - **Full Traffic Inspection** With FireNet, North South (on-prem and cloud), East West (VPC to VPC) and Internet bound egress traffic can be inspected.
 - **No IPSEC Tunnels** No IPSEC tunnels connecting to firewall instances, maximizing each firewall instance throughput.
 - **Scale Out** Multiple firewall instances can be deployed as a group to meet the demand of increasing workload. 
 - **Policy Driven** Policy driven workflow allows you to customize which VPCs traffic should be inspected. 
 - **Vendor Integration** Launch Palo Alto Networks VM-Series from the Aviatrix Controller console to simplify deployment. 
 - **Automation** The Aviatrix Controller automatically updates Palo Alto VM-Series route tables when on-prem route changes or VPC attachment changes. 

FireNet Deployment Model
---------------------------

FireNet is currently supported for AWS Transit Gateway (TGW), as shown below. 

|firenet|



What is the problem with deploying firewall instances with ECMP?
------------------------------------------------------------------

AWS Transit Gateway (TGW) supports VPN with ECMP load balancing. With is capability, you can launch multiple firewall instances in a load balanced fashion 
for Egress Inspection and VPC to VPC traffic inspection. The problem with this deployment is performance. The IPSEC tunnel limits each firewall instance
to be capped at 1Gbps. When this architecture is deployed for VPC to VPC inspection, traffic goes through VGW (the other end of the IPSEC tunnel) twice, 
further reducing its throughput to 400Mbps. What this implies is that each firewall instance can only operate at 400Mpbs throughput. This is 
much lower than what firewall instances can do without IPSEC tunnel. 


.. |firenet| image:: firewall_network_media/firenet.png
   :scale: 30%

.. |main_companion_gw| image:: transit_dmz_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
