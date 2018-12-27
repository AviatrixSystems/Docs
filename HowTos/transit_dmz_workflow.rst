.. meta::
  :description: Transit DMZn
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Transit DMZ Workflow
=========================================================


1. Launch two sets of Aviatrix Transit Gateways
------------------------------------------------

This step launches two Aviatrix gateways in the transit VPC, main gateway and companion gateway. If you require 
multi AZ HA, you should deploy two main gateways and two companion gateways. 

The main gateway(s) interfaces with Spoke VPC gateways or TGW, while the companion gateway(s) interface with VGW or 
on-prem devices. The diagram below describes the naming convention of the two gateways.  

|main_companion_gw|

.. important::
  
  Transit DMZ requires both main gateways and companion gateways to have three Ethernet interfaces, thus the minimum gateway instance types are t2.medium or t3.medium. In addition, the Transit VPC should have unused subnet space for additional /28 subnets that Transit DMZ creates. 

For main gateway, go to Transit Network -> Setup, go through Step 1 and Step 2 (for HA).  

For companion gateway, go to Transit Network -> Setup, go through Step 1, 2 (for HA) and 3. Step 3 is necessary since companion gateway interfaces with VGW, on-prem CloudN or a third party device. 

2. Enable Transit GW for DMZ Connection
------------------------------------------

In this step, the Aviatrix Controller creates the following resources for each main gateway and companion gateway:

 - Ethernet interface eth2 on the gateway instance. 
 - a subnet with "dmz-egress" as suffix in its name in the transit VPC. 
 - a route table with "dmz-egress" as suffix in its name in the transit VPC. 

.. important::

  You need to execute this step two times: one for the main gateway and one for the companion gateway. (The HA is automatically taken care of.) 

3. Enable Transit VPC as DMZ
------------------------------

In this step, the Aviatrix Controller associates the main gateway with the companion gateways. Once this step is 
completed, traffic should be able to flow through from the on-prem to the companion gateway and then is routed 
through  main gateway without a firewall appliance. 

.. tip::

  Test end to end traffic between Spoke VPC to on-prem before you execute the next step where you insert the Firewall device.


4. Insert Firewalls to Transit DMZ
--------------------------------------

Before you execute this step, you should launch instance based firewall appliances in the subnet created at 
Step 2 by the Aviatrix Controller. (The subnet should have "dmz-egress" as suffix in its name.)




.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%


.. disqus::
