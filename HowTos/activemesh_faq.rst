.. raw:: html

    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex">


=========================================================
ActiveMesh FAQ
=========================================================

What is Aviatrix ActiveMesh?
----------------------------------------------

ActiveMesh is the new Aviatrix Encrypted Transit Network architecture where both primary gateways and backup gateways forward packets 
in a load balancing fashion. 

The diagram below shows an ActiveMesh deployment between Spoke and Transit where each Spoke Gateway in a VPC/VNet builds two IPsec tunnels to the primary and backup transit gateways and forwards packets to both of them inside the tunnel. The load balance mechanism leverages ECMP protocol.  

|activemesh_spoke_transit|


Can ActiveMesh be applied to Transit Gateway peering?
----------------------------------------------------------------------

Yes. ActiveMesh can be applied to connecting two Transit GWs. There are 4 tunnels established between the Transit GWs, as shown in the diagram below. 

|activemesh_transit_transit|

Can ActiveMesh be applied to connection to VGW?
--------------------------------------------------------------

Yes. Each Transit GW connecting to the VGW in ActiveMesh mode has two VPN tunnels to the VGW.

What is the link for between the two ActiveMesh gateways?
----------------------------------------------------------

The link is used to forward packets when both tunnels are down out of one ActiveMesh gateway. 

For example, in a spoke VPC/VNet, virtual machine (EC2/GCE) traffic is forwarded to the ActiveMesh primary gateway which then forwards traffic to the AVX Transit GW. 
If both tunnels between the 
ActiveMesh spoke gateway and the Transit GW are down, the packet is forwarded by the ActiveMesh primary gateway to the backup ActiveMesh gateway. 

|activemesh_tunnel_failures|

How do Spoke gateways load balance traffic from EC2 instance?
----------------------------------------------------------------

In the current Release 5.0, VPC route table points to only one Spoke Gateway, so there is no load balancing for traffic initiated from virtual machine instances. 
But once the traffic arrives at the gateway for transmission to the Spoke VPC/VNet, the traffic is load balanced across the ActiveMesh peering to the Spoke VPC/VNet Gateways. 


What are the advantages of ActiveMesh?
--------------------------------------------------------------------------------------

The key benefits of ActiveMesh are improved network resiliency, failover convergence time and performance.

How to enable ActiveMesh?
--------------------------------

ActiveMesh is enabled by default. For Aviatrix Transit or Spoke Gateway launched before ActiveMesh
mode becomes available, follow the `Aviatrix Encrypted Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to enable ActiveMesh mode. 

How to troubleshoot ActiveMesh Transit Gateway?
-------------------------------------------------

 1. **Check IPsec Tunnel**. For BGP learned routes, check if the IPsec tunnel is up. Go to Site2Cloud > Setup. Find the connection and make sure it is in Up state. If it is not, go to Site2Cloud > Diagnostics and run **Show log**. Since all BGP sessions run inside IPsec tunnel, this is the first thing you should check. 
 #. **Check BGP Session**. For BGP learned routes, check if BGP session is established. Go to Multi-Cloud Transit > BGP. Look for the BGP session and make sure it is in Established State. If it is not, go to the Diagnostics tab. Select the transit gateway, run commands, such as "show ip bgp".
 #. **Check BGP Learned Routes** For BGP learned routes, check if routes are learned. Go to Multi-Cloud Transit > BGP > Diagnostics tab. Select the transit gateway, run "show ip bgp" to make sure the transit gateway under inspection has learned the routes you are looking for. 
 #. **Check Route Database** For all routes, check if the Controller see all the learned routes from TGW, BGP, Transit Peering, and Static. Go to Multi-Cloud Transit > List. Select the Transit Gateway and click **Show Details**. Scroll down and refresh **Route Info DB Details**. This table contains learned routes from all sources. 
 #. **Check Aviatrix Transit Gateway Programmed Routes** Go Multi-Cloud Transit Network > List. Select the Transit Gateway, click **Actions ** > Show Details. Scroll down to the Gateway Routing Table and click to open. Make sure the route you are looking for is in the table and has a next hop with metric 100 or lower.  
 #. **Sync Routes** If for any reason the Route Database on the Controller become inconsistent with the Aviatrix Transit Gateway route table, sync the routes to force program the routes on the gateway again. Go to Multi-Cloud Transit > Advanced Config. Select the Aviatrix Transit Gateway in question, scroll down to the Sync Controller Best Routes to Transit Gateway, click **Sync Routes**. 

If any of the above steps show failure, there is an error, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ for more debugging assistance.

If all above steps succeed, the connectivity issue lies somewhere else. Check Spoke VPC/VNet route table and TGW route table if applicable. 

If this is TGW based deployment, run an Audit by going to TGW Orchestrator > Audit. Any missing routes in either VPC/VNet route table or TGW route table should be discovered. 


How to migrate from the encrypted transit network to ActiveMesh mode?
---------------------------------------------------------------------------------------------

Here are the steps:

 1. Launch a new Transit GW and enable ActiveMesh on it. 
 #. Detach a current spoke and attach it to the new Transit GW.

Can ActiveMesh be applied to Azure, GCP and OCI?
---------------------------------------------------------------

Yes. 

What is route based VPN and policy-based VPN?
----------------------------------------------------------------

Most firewalls appliances support both policy based and route based VPNs. Which one we are supposed to use in most cases doesn't really matter, but there are a couple of things to consider.

Route based VPNs are more flexible, more powerful and recommended over policy based VPNs. However, a policy based VPN is usually simpler to create.

A route based VPN creates a virtual IPsec interface, and whatever traffic hits that interface is encrypted and decrypted according to the phase 1 and phase 2 IPsec settings.

In a policy based VPN, the tunnel is specified within the policy itself with an action of IPsec. Also, for a policy based VPN, only one policy is required. A route based VPN is created with two policies, one for inbound and another for outbound with a normal Accept action.

A static route is also required for a route based VPN, so anything destined to the remote network must go through the virtual IPsec interface which was created when specifying this within the Phase 1 settings.

If the VPN connection requires redundancy, a route based VPN is normally required. 

Does ActiveMesh support route based VPN or policy based VPN?
-------------------------------------------------------------

ActiveMesh enables the Aviatrix Transit GW to connect to multiple remote sites over IPsec VPN tunnels.

When you configure VPN to remote sites from Transit Network > Setup > Step 3 (Connect to VGW/External Device/Aviatrix CloudN) in the `Transit Network workflow Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_, the VPN tunnel is built with route based VPN on the Aviatrix Transit Gateway. 

Starting from Release 6.0, ActiveMesh Transit Gateway supports both remote route based VPN and remote policy based VPN tunnels. In both cases, 
the Aviatrix Transit Gateway operates in route based mode. Note if the remote site is policy based static VPN, 
traffic must be initiated from the remote site. 

On the other hand, when you configure VPN to remote sites from Site2Cloud page and select a Transit GW, the VPN tunnel is built with policy based VPN.  

What happens when an ActiveMesh enabled gateway is stopped?
----------------------------------------------------------------------------------------

With ActiveMesh gateway, `Gateway Single AZ HA <https://docs.aviatrix.com/HowTos/gateway.html#gateway-single-az-ha>`_ is automatically
enabled. That is, when an ActiveMesh gateway is stopped, the Controller automatically starts it again. Once the gateways comes up, 
it participates in packet forwarding again. 

To stop an ActiveMesh gateway, you should disable the Gateway Single AZ HA feature. Highlight the gateway at the Gateway page and 
click **Edit**. Scroll down to Gateway Single AZ HA and click **Disable**. 

What is ActiveMesh?
---------------------------------------

ActiveMesh has a deterministic nature of Next Hop selection.

Here is how Aviatrix Transit Gateway routing engine treats the following types of routes. 

========================================================     ===============               ==========
**Networks**                                                 **Route Type**                **Aviatrix Transit Gateway Route Propagation**
========================================================     ===============               ==========
Local TGW attached VPC/VNet CIDR                                  tgwvpc                        Local
Aviatrix Spoke gateway associated VPC/VNet CIDR              vpc                           Local
Azure Native Spoke associated VNet CIDR                      vpc                           Local
Local TGW VPN dynamically learned network CIDR               tgwedge                       Advertises TGW VPN ASN and its remote peer ASN to a remote BGP peer if it's the best route.
Local TGW DXGW learned network CIDR                          tgwedge                       Advertises  TGW DXGW ASN and its remote peer ASN to a remote BGP peer if it's the best route.
Remote Aviatrix Transit Gateway Peering learned routes       peer                          Advertises remote Aviatrix peer's network CIDRs to a remote BGP peer if it's the best route.
Aviatrix Transit Gateway BGP learned from on-prem            bgp                           Advertises to its remote peers by Aviatrix Transit Gateway peering if it's the best route. 
Aviatrix Transit Gateway statically learned from on-prem     static                        Local
Aviatrix Transit Gateway associated VPC/VNet CIDR            linklocal                     Local
Local Firewall Egress route (0.0.0.0/0)                      transit                       Local
Aviatrix Transit Gateway SNAT IP address                     linklocal                     Local
========================================================     ===============               ==========

With this approach, there is more visibility on learned routes regarding what paths the routes are learned from. 

The next hop best path selection follows the priorities listed below. 

 1. Local 
 #. Shortest number of ASN list 
 #. For two identical length ASN routes, select the next hop with the lowest Metric Value 
 #. For two identical ASN length and Metric Value routes, if ECMP is disabled (this is the default configuration), select the current best route. If there is no current best route, the next hop IP addresses are compared, the lower integer IP address is selected. 
 #. For two identical ASN length and Metric Value routes, if ECMP is enabled, traffic is distributed to both routes using ECMP. 

How to migrate to ActiveMesh?
--------------------------------------

There are 3 scenarios:

=================================    ===============================================================================================  ==========
**Deployment**                       **Notes**                                                                                        **ActiveMesh 2.0 Migration**
=================================    ===============================================================================================  ==========
Non ActiveMesh deployment            the Aviatrix Transit Gateway in the deployment has been launched before Release 5.1 (10/1/2019)  follow `this instructions <https://docs.aviatrix.com/HowTos/activemesh_migration.html>`_
ActiveMesh 1.0 deployment            the Aviatrix Transit Gateway was launched with ActiveMesh option enabled prior to Release 6.0    migrate to ActiveMesh 2.0 by going to Settings -> Maintenance -> Migration -> ActiveMesh 2.0 Migration, click Migrate.
New deployment                       the Aviatrix Transit Gateway was launched with ActiveMesh option enabled after Release 6.0       ActiveMesh is automatically enabled for brand new deployment on a Controller.
=================================    ===============================================================================================  ==========


.. |activemesh_spoke_transit| image:: activemesh_faq_media/activemesh_spoke_transit.png
   :scale: 30%

.. |activemesh_transit_transit| image:: activemesh_faq_media/activemesh_transit_transit.png
   :scale: 30%

.. |activemesh_tunnel_failures| image:: activemesh_faq_media/activemesh_tunnel_failures.png
   :scale: 30%
.. |activemesh_tunnel_failures| image:: activemesh_faq_media/activemesh_tunnel_failures.png
   :scale: 30%

.. disqus::
