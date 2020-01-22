.. meta::
  :description: Transit Gateway Peering
  :keywords: Transit Gateway Peering, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Transit Gateway Peering
=========================================================

Transit Gateway Peering connects two or more Aviatrix Transit Gateways in a partial or full mesh manner, as shown in the diagram below. The Aviatrix Transit Gateways may be deployed in AWS or Azure, where each Transit GW connects
a group of Spoke VPC/VNets. As a result of Transit Gateway Peering, two groups of Spoke VPCs can communicate
with each other via the Transit Gateways. 

|multi-region|

The instructions are as follows. 

1. Launch two Aviatrix Transit Gateways
------------------------------------------

If you have not done so, follow the instructions `here <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to launch an Aviatrix Transit GW. 

Repeat to launch more Transit GWs. 

Starting from Release 4.3, InsaneMode is supported on Transit Gateway Peering. Enable Transit Gateway Peering InsaneMode by launching the gateway with InsaneMode. 

.. tip::

  The Aviatrix Transit GWs are typically launched during the workflow of the TGW Orchestrator and Transit Network. If the transit cluster does not need to connect to on-prem, skip `the step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ that connects to VGW/CloudN/External Device. 

2. Establish Transit GW Peering
--------------------------------

Go to Transit Network -> Transit Peering -> Add New. 

Select one of each Transit Gateway and click OK. 

Excluded Network CIDRs
^^^^^^^^^^^^^^^^^^^^^^^^^^

Excluded Network CIDRs is an optional field. When the field is empty, a Transit Gateway propagates all learned routes from 
both Spoke VPCs and on-prem. 

The use case for this field is if there are conflicting or identical CIDRs on both sides of the Transit Gateways, 
the peering action will be 
rejected. Using the filter option prevents the overlapped CIDRs from being propagated to the other Transit Gateway. 

Input a list of CIDRS separated by comma. 

You can edit this field after the Transit Peering took place. Go to Transit Network -> Transit Peering, highlight the peering connection.
Click the 3 dots skewer and click Edit to modify the Excluded Network CIDR list.

The diagram below illustrates how Excluded Network CIDRs can be used in a two region deployment. In this case, 10.20.0.0/16 appears on 
both sides as VPC CIDR. To allow Transit Peering to proceed, configure on both Transit Gateways Excluded Network CIDRs with 10.20.0.0/16. 

|excluded_network_cidrs|


Excluded TGW Connections
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This feature applies to TGW hybrid connections. This is because TGW does not preserve BGP information in its learned routes. 

When you use AWS Transit Gateway (TGW) to connect to on-prem via DXGW or VPN, there are situations where on-prem advertise the same network 
CIDRs to TGW in two different regions. When you connect the two regions by the Aviatrix Transit Gateway Peering, the network CIDR overlapping
problem will occur. 

This feature allows you to not to advertise certain TGW hybrid attachment (DXGW and VPN) to the remote Aviatrix Transit Gateway and therefore
the remote TGW. 

In the drop down menu, highlight the TGW hybrid connections (The input box is empty if there is no such connection.), multi-select the connections. The selected connections are excluded to advertise to the remote site. 

You can edit this field after the Transit Peering took place. Go to Transit Network -> Transit Peering, highlight the peering connection. 
Click the 3 dots skewer and click Edit to modify the Excluded Connection list. 

The diagram below illustrate the use case for this feature. In the diagram, both on-prem connects to TGW and advertise 10.0.0.0/8.
Transit Gateway Peering will fail because there are conflict routes. You solve the problem by configuring on both Transit Gateways to 
exclude 10.0.0.0/8. With this configuration, Site-1 still accesses Prod-1/Prod-2 and Dev-1/Dev-2 via the local regional TGW 
and Site-2 accesses Prod-3/Prod-4 and Dev-3/Dev-4 via its local regional TGW. 

|excluded_tgw_connections|


.. |multi-region| image:: tgw_design_patterns_media/multi-region.png
   :scale: 30%

.. |excluded_tgw_connections| image:: transit_gateway_peering_media/excluded_tgw_connections.png
   :scale: 30%

.. |excluded_network_cidrs| image:: transit_gateway_peering_media/excluded_network_cidrs.png
   :scale: 30%

.. disqus::
