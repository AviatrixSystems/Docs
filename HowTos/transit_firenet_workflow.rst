.. meta::
  :description: Firewall Network Workflow
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
Transit FireNet  Workflow
=========================================================

For questions about Transit FireNet, check out `Transit FireNet FAQ. <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_ 

Prerequisite
---------------

Transit FireNet builds on the Aviatrix Encrypted Transit Network. Follow the `Aviatrix Encrypted Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to deploy Aviatrix Transit Gateways and Spoke gateways. ActiveMesh mode option must be selected when launching the gateways. 


1. Enable Transit FireNet Function
------------------------------------------------

.. important::

  for AWS deployment, Transit FireNet works when the Aviatrix Transit Gateway is launched with ActiveMesh enabled. 

  Transit FireNet works when the Aviatrix Encrypted Transit Network is in Connected mode. Go to Transit Network -> Advanced Config -> Connected Transit. Click Enable. 

In the drop down menu, select one Aviatrix Transit Gateway and click Enable. 

.. important::

  For Azure deployment, the Aviatrix Transit Gateway must be `"launched" <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ with the option Enable Transit FireNet Function enabled. The minimum Azure FireNet gateway size is Standard_B2ms.

2. Manage Transit FireNet Policy
--------------------------------------

Select an Aviatrix Transit Gateway that you enabled for FireNet function in the previous step. 

On the left side of the panel, highlight one Spoke VPC/VNet for inspection and click Add. The selected Spoke VPC/VNet should appear on the right side panel. 

For example, if traffic going in and out of VPC Spoke2 where Spoke2-gw is deployed should be inspected, move the Spoke2-gw to the right, as shown below. 

|transit_firenet_policy|

For specify more VPC/VNets for inspection, repeat this step. 

3. Deploy Firewall Network
-----------------------------

Go to Firewall Network -> Setup -> Deploy Firewall Network, follow the `deployment instructions <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_ to launch one or more firewall instances. 


4. Delete Function
------------------------------------------

In the drop menu, select one Aviatrix Transit Gateway with FireNet function to disable it.  

.. |transit_firenet_policy| image:: transit_firenet_workflow_media/transit_firenet_policy.png
   :scale: 30%

.. disqus::
