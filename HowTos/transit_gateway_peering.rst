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

Filtered CIDRs
^^^^^^^^^^^^^^^^

Filtered CIDRs is an optional field. When the field is empty, a Transit Gateway propagates all learned routes from both Spoke VPCs and on-prem. If there are overlapping CIDRs to the other Transit Gateway, the peering action will be 
rejected. Using the filter option prevents the overlapped CIDRs from being propagated to the other Transit Gateway. 


.. |multi-region| image:: tgw_design_patterns_media/multi-region.png
   :scale: 30%

.. disqus::
