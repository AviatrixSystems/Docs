.. meta::
  :description: ActiveMesh FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
ActiveMesh FAQ
=========================================================

What is Aviatrix ActiveMesh?
----------------------------------------------

ActiveMesh is the new Aviatrix Encrypted Transit Network architecture where both primary gateways and backup gateways forward packets 
in a load balancing fashion. 

The diagram below shows an ActiveMesh deployment between Spoke and Transit where each spoke gateway in a VPC builds two IPSEC tunnels to the primary and backup transit gateways and forwards packets to both of them inside the tunnel. The load balance mechanism leverages ECMP protocol.  

|activemesh_spoke_transit|


Can ActiveMesh be applied to Transit gateway peering?
--------------------------------------------------------

Yes. ActiveMesh can be applied to connecting two Transit GWs. There are 4 tunnels established between the Transit GWs, as shown in the diagram below. 

|activemesh_transit_transit|

Can ActiveMesh be applied to connection to VGW?
------------------------------------------------

Yes. Each Transit GW connecting to VGW in ActiveMesh mode has two tunnels to VPN connection in the VGW.

What is the link for between the two ActiveMesh gateways?
----------------------------------------------------------

The link is used to forward packets when both tunnels are down out of one ActiveMesh gateway. 

For example, in a spoke VPC, EC2 traffic is forwarded an ActiveMesh primary gateway which then forwards traffic to Transit GW. 
If both tunnels between the 
ActiveMesh the spoke gateway and the Transit GW are down, packet is forwarded by the primary ActiveMesh gateway to the backup ActiveMesh gateway. 

|activemesh_tunnel_failures|

How do Spoke gateways load balance traffic from EC2 instance?
----------------------------------------------------------------

In the current Release 5.0, VPC route table points to only one Spoke gateway, so there is no load balancing for traffic initiated from EC2 instances. 
But traffic from Transit GW to Spoke VPC is load balanced to the two Spoke gateways. 



What are the advantages of ActiveMesh?
--------------------------------------------------------------------------------------

The key benefits of ActiveMesh are improved network resiliency, failover convergence time and performance.

How to enable ActiveMesh?
--------------------------

ActiveMesh is not enabled by default. Follow the `Aviatrix Encrypted Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to enable ActiveMesh mode. 

How to troubleshoot ActiveMesh deployment?
--------------------------------------------

Go to Transit Network -> List. Select either the Transit GW or a spoke gateway, click Show Details. 

How to migrate from the encrypted transit network to ActiveMesh mode?
----------------------------------------------------------------------

Here are the steps:


 1. Launch a new Transit GW and enable ActiveMesh on it. 
 #. Detach a current spoke and attach it to the new Transit GW.

Can ActiveMesh be applied to Azure?
-------------------------------------

Yes. 

What is route based VPN and policy based VPN?
-----------------------------------------------

Most firewalls appliances support both policy based and route based VPN’s. Which one we are supposed to use in most cases doesn't really matter, but there are a couple of things to consider.

Route based VPN is more flexible, more powerful and recommended over policy based. However a policy based VPN is usually simpler to create.

A route based VPN creates a virtual IPSec interface, and whatever traffic hits that interface is encrypted and decrypted according to the phase 1 and phase 2 IPSec settings.

In policy based VPN the tunnel is specified within the policy itself with an action of "IPSec". Also for policy based VPN only one policy is required. A route based VPN is created with two policies, one for inbound and another for outbound with a normal "Accept" action.

A static route is also required for a route based VPN, so anything destined to the remote network must go through the virtual IPSec interface which was created when specifying this within the Phase 1 settings.

If the VPN connection requires redundancy, a route based VPN is normally required. 

Does ActiveMesh support route based VPN or policy based VPN?
-------------------------------------------------------------

ActiveMesh enables the Aviatrix Transit GW to connect to multiple remote sites over IPSec VPN tunnels.

When you configure VPN to remote sites from Transit Network -> Setup -> Step 3 (Connect to VGW/External Device/Aviatrix CloudN) in the `Transit Network workflow Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_, the VPN tunnel is built with route based VPN. 

On the other hand, when you configure VPN to remote sites from Site2Cloud page and select a Transit GW, the VPN tunnel is built with policy based VPN.  


.. |activemesh_spoke_transit| image:: activemesh_faq_media/activemesh_spoke_transit.png
   :scale: 30%

.. |activemesh_transit_transit| image:: activemesh_faq_media/activemesh_transit_transit.png
   :scale: 30%

.. |activemesh_tunnel_failures| image:: activemesh_faq_media/activemesh_tunnel_failures.png
   :scale: 30%

.. disqus::
