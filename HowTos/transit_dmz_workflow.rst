.. meta::
  :description: Transit DMZn
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Transit DMZ Workflow
=========================================================

Transit DMZ is available for Release 4.1 and later. 

For more background information, read `Transit DMZ FAQ <https://docs.aviatrix.com/HowTos/transit_dmz_faq.html>`_.

1. Launch two sets of Aviatrix Transit Gateways
------------------------------------------------

This step launches two Aviatrix gateways in the transit VPC, main gateway and companion gateway. If you require 
multi AZ HA, you should deploy one main gateway and one backup main gateway,  one companion gateway and one backup companion gateway. 

.. tip::

  Use Aviatrix Create a VPC feature to Launch a new VPC to be used as Transit VPC. Go to Useful Tools -> Create a VPC, create a VPC with /24 VPC CIDR size. Select the option "Aviatrix Transit VPC". 

.. Note::

  Transit gateway for the Transit DMZ deployment requires gateway instance size to be at least t2.small as it requires 3 Ethernet interfaces. 

The main gateway(s) interfaces with Spoke VPC gateways or TGW, while the companion gateway(s) interface with VGW or 
on-prem devices. The diagram below describes the naming convention of the two gateways.  

|main_companion_gw|

.. important::
  
  Transit DMZ requires both main gateways and companion gateways to have three Ethernet interfaces, thus the minimum gateway instance types are t2.small. In addition, if you **did not** use Aviatrix Useful Tool to create a transit VPC with /24 VPC CIDR range as the tip shown above, make sure the Transit VPC have unused subnet space for additional /28 subnets that Transit DMZ creates. 

1.1 Main gateway
~~~~~~~~~~~~~~~~~

 a. For main gateway, go to Transit Network -> Setup, go through Step 1 and Step 2 (for HA) to launch the main gateway(s).  

 b.  If TGW Orchestrator is deployed, go to TGW Orchestrator -> Plan, complete `Step 5 <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-enable-aviatrix-transit-gw-for-hybrid-connection>`_ and `Step 6 <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-attach-aviatrix-transit-gw-to-tgw>`_ to enable main gateway to be part of TGW orchestrator and attach the main gateway to TGW. If TGW Orchestrator is not used, skip step b.    

1.2 Companion gateway
~~~~~~~~~~~~~~~~~~~~~~

 a. For companion gateway, go to Transit Network -> Setup, go through Step 1, 2 (for HA) to launch the gateway(s).

 b. Connect the companion gateway to on-prem by executing `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_. This step is necessary since companion gateway interfaces with one of the three options: AWS VGW, Aviatrix hardware appliance  CloudN or an external device.  

2. Prepare Transit GW for DMZ Function
------------------------------------------

In this step, the Aviatrix Controller creates the following resources for each main gateway and companion gateway:

 - Ethernet interface eth2 on the gateway instance. 
 - a subnet with "dmz-egress" as suffix in its name in the transit VPC. 
 - a route table with "dmz-egress" as suffix in its name in the transit VPC. 

.. important::

  You need to execute this step two times: one for the main gateway and one for the companion gateway. (The HA is automatically taken care of.) 

3. Enable Transit DMZ
------------------------------

In this step, the Aviatrix Controller associates the main gateway with the companion gateways. Once this step is 
completed, traffic should be able to flow through from the on-prem to the companion gateway and then is routed 
through  main gateway without a firewall appliance. 

.. tip::

  Test end to end traffic between Spoke VPC to on-prem before you execute the next step where you insert the Firewall device.


4. Insert Firewall Function in Transit DMZ
---------------------------------------------

The firewall instance typically requires multiple Ethernet interfaces. In this solution, firewall instances requires one interface to the main gateway and another to the companion gateway, 
as shown below.

|main_companion_subnets|

.. tip::

  Use the two private subnets in the transit VPC created by the Useful tool in the early step to be the Firewall main interface subnet and Firewall companion interface subnet. 

Launch the firewall instance from AWS Console. 

If firewall HA is required, repeat for the backup firewall instance. 

Then execute Step 4 by filling the following information. 
 
==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Transit VPC ID                                  The Transit VPC ID for the Transit DMZ deployment. .
Firewall instance ID                            The firewall EC2 instance ID. Aviatrix Controller monitors the health of this instance and determines fail over when it becomes unreachable. 
Firewall main interface ENI                     The firewall EC2 instance ENI interface to the main gateway.y
Firewall companion interface ENI                The firewall EC2 instance ENI interface to the companion gateway.
Firewall Name                                   A name that is referenced by the Aviatrix Controller.
==========================================      ==========

If firewall HA is required, repeat Step 4 for the backup firewall instance. 

5. Remove Firewall Function
----------------------------

This step is the opposite of Step 4.

This step removes the operation of firewall instance. After this step is executed, packets are passed through
between the two Aviatrix gateways. 

6. Disable Transit DMZ
---------------------------------

This step is the opposite of Step 3. 

This step disables the main gateway and companion gateway relationship. Packets can no longer be 
passed through. You lose end to end packet forwarding. 

7. Remove Transit GW DMZ Function
-------------------------------------

This step is the opposite of Step 2. Make sure you execute this step for both main gateway and the companion gateway.

.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
