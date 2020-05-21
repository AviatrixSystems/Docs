.. meta::
  :description: ActiveMesh Design Notes
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Ingress, Egress, Firewall


=========================================================
ActiveMesh Design Notes 
=========================================================

ActiveMesh is the default mode when launching an Aviatrix Transit gateway. This tech note documents the supported common design patterns while deploying ActiveMesh gateways. 

1. ActiveMesh with TGW for On-prem Connections
-------------------------------------------------------

While AWS Transit Gateway (TGW) does not propagate routes to Spoke VPCs, TGW Direct Connect via DXGW and TGW
VPN have full functions of failover, multi-path and ECMP in supporting connection to on-prem. This includes:

 - TGW DXGW prefers to TGW VPN when both advertising the same network. When DXGW goes down, one of the VPN routes take over. 
 - When there are multiple VPN routes, TGW routing policy selects the shortest AS_PATH length. 
 - When there are multiple VPN routes with identical AS_PATH length, TGW VPN distributes traffic with ECMP when it is enabled. 

In this case, Aviatrix Controller performs the orchestration function in managing route propagation and Aviatrix Transit gateways are used to connect two TGWs. 

The deployment is shown in the diagram below. 

|activemesh_tgw_onprem|

1.1 Advertising different routes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If on-prem sites advertise non overlapping network CIDRs to TGWs, Transit gateway peering can proceed without issues. 

1.2 Advertising overlapping routes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If on-prem sites advertise identical network CIDRs or overlapping CIDRs to TGWs (for example, they all 
advertise 10.0.0.0/8 to their respective TGWs), you must  enable `<https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#excluded-network-cidrs>`_ feature on both sides of the Aviatrix Transit Gateways to 
filter out identical or overlapping CIDRs in order to connect the two regions. 

.. important::

  If you use TGW DXGW/VPN for hybrid connection to on-prem, you cannot use Aviatrix Transit Gateway as the backup router for connecting to the same on-prem network. This is because TGW propagated routes do not present themselves in the TGW route table with any BGP information and as such, it is not possible for the Controller to coordinate the dynamic route updates between TGW and Aviatrix Transit Gateway.

1.3 Overlapping Spoke VPC CIDRs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If there are overlapping Spoke VPCs CIDRs attached to the TGWs in two regions and you wish to connect them via Aviatrix Transit Gateway Peering, use `Exclude Network CIDRs <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#excluded-network-cidrs>`_ on both
Aviatrix Transit Gateways to exclude these overlapping Spoke VPC CIDRs. 


2. ActiveMesh with Aviatrix Transit GW for on-prem Connection
---------------------------------------------------------------

|activemesh_avx_onprem|

2.1 Redundant Routers on-prem 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If there are two on-prem routers advertising the same network CIDR and connect to Aviatrix Transit Gateway directly, Aviatrix Transit Gateway automatically enables ECMP for traffic from cloud to on-prem. If this is 
not desired outcome, you should connect on-prem to the Aviatrix Transit Gateway through VGW. 

2.2 Multi sites
^^^^^^^^^^^^^^^^^^

If Aviatrix Transit Gateways connects to multi sites on-prem directly via BGP, these sites should advertise
non overlapping CIDRs to the Aviatrix Transit Gateway. .  

2.3 Route Propagation
^^^^^^^^^^^^^^^^^^^^^^^

The local Aviatrix Transit Gateway learned routes via BGP are propagated to the peered Aviatrix Transit Gateway. 
The propagated information includes network CIDRS, AS_PATH and metrics. 

If the local Aviatrix Transit Gateway learned duplicate network CIDRs (i.e., there are multiple paths to reach the same network CIDRs) via BGP, it uses the following rules to decide which route is
propagated to the remote Aviatrix Transit Gateway. 

 - The route with the shortest AS_PATH length wins.
 - If there are identical AS_PATH lengths, the lowest metric route wins. 
 - If the metrics are all the same, the smallest next hop IP address wins. 

In another words, there will always be one route advertised to the remote Aviatrix Transit Gateway when identical network CIDRs are 
learned by the local Aviatrix Transit Gateway. 

2.4 Overlapping Spoke VPC CIDRs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If there are overlapping Spoke VPCs CIDRs attached to the TGWs in two regions and you wish to connect them via Aviatrix Transit Gateway Pee
ring, use `Exclude Network CIDRs <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#excluded-network-cidrs>`_ on both
Aviatrix Transit Gateways to exclude these overlapping Spoke VPC CIDRs.

3. NAT Functions
--------------------

SNAT function is supported on the individual connection between the Aviatrix Transit Gateway and the remote sites. 

Starting Release 5.4, SNAT and DNAT functions are supported on the Spoke gateway tunnel interface to the Aviatrix Transit Gateway. 

4. Egress Routes Propagation Behavior
----------------------------------------

If Firewalls are deployed for Internet bound Egress traffic in either FireNet and Transit FireNet deployment, the default routes are propagated 
to the remote peer by Transit Gateway peering. This allows Firewalls to be shared across regions. 

If you have regional Firewalls for Egress traffic, make sure you apply filter to filter out the default routes. 

4. Configuration Notes
-----------------------

4.1 One on-prem device
^^^^^^^^^^^^^^^^^^^^^^^^

In this scenario, the on-prem has one device as the diagram below.

|activemesh_one_device|

If the backup Aviatrix Transit Gateway is launched and the Transit Gateway is launched with ActiveMesh, the configuration should like the screen shot below. 

|activemesh_config|


4.2 Two on-prem devices
^^^^^^^^^^^^^^^^^^^^^^^^^

In this scenario, the on-prem has two devices as the diagram below.

|activemesh_two_devices|

You should check HA in the configuration and configure the second pair of inside tunnel addresses, as shown below. 

|activemesh_ha_config|



.. |activemesh_tgw_onprem| image:: activemesh_design_notes_media/activemesh_tgw_onprem.png
   :scale: 30%

.. |activemesh_avx_onprem| image:: activemesh_design_notes_media/activemesh_avx_onprem.png
   :scale: 30%

.. |activemesh_config| image:: activemesh_design_notes_media/activemesh_config.png
   :scale: 30%

.. |activemesh_ha_config| image:: activemesh_design_notes_media/activemesh_ha_config.png
   :scale: 30%

.. |activemesh_one_device| image:: activemesh_design_notes_media/activemesh_one_device.png
   :scale: 30%

.. |activemesh_two_devices| image:: activemesh_design_notes_media/activemesh_two_devices.png
   :scale: 30%
.. disqus::
