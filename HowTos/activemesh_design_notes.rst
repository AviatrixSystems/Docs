.. meta::
  :description: ActiveMesh Design Notes
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Ingress, Egress, Firewall


=========================================================
ActiveMesh Design Notes 
=========================================================

ActiveMesh is the default mode when launching an Aviatrix Transit gateway. This tech note documents the supported common design scenarios while deploying way ActiveMesh gateways. 

1. ActiveMesh with TGW for On-prem Connection
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
advertise 10.0.0.0/8 to their respective TGWs), you must enable `Transit Gateway Peering Filter <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#filtered-cidrs>`_ feature to 
filter out identical or overlapping CIDRs in order to connect the two regions. 


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

3. NAT Functions
^^^^^^^^^^^^^^^^^^^

SNAT function is supported on the individual connection between the Aviatrix Transit Gateway and the remote sites. 

SNAT function is not supported on the Spoke gateway tunnel interface to the Aviatrix Transit Gateway. 




.. |activemesh_tgw_onprem| image:: activemesh_design_notes_media/activemesh_tgw_onprem.png
   :scale: 30%

.. |activemesh_avx_onprem| image:: activemesh_design_notes_media/activemesh_avx_onprem.png
   :scale: 30%

.. disqus::
