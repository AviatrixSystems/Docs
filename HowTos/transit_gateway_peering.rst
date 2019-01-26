.. meta::
  :description: Transit Gateway Peering
  :keywords: Transit Gateway Peering, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Transit Gateway Peering
=========================================================

Transit Gateway Peering connects two or more Aviatrix Transit Gateways in a partial or full mesh manner, as shown in the diagram below. The Aviatrix Transit Gateways may be deployed in AWS or Azure, each Transit GW connects
a group of Spoke VPC/VNets. As a result of Transit Gateway Peering, two groups of Spoke VPCs can communicate
with each other via the Transit Gateways. 

|multi-region|

The instructions are as follows. 

1. Launch two Aviatrix Transit Gateways
------------------------------------------

If you have not done so, follow the instructions in `here <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to launch an Aviatrix Transit GW. 

Repeat to launch more Transit GWs. 

.. tip::

  The Aviatrix Transit GWs typically are launched during the workflow of TGW Orchestrator, Transit Network or Transit DMZ.

2. Establish Transit GW Peering
--------------------------------

Go to Transit Network -> Transit Peering -> Add New. 

Select the one of each Transit Gateways and click OK. 

Done.

.. |multi-region| image:: tgw_design_patterns_media/multi-region.png
   :scale: 30%

.. disqus::
