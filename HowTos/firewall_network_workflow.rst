.. meta::
  :description: Firewall Network Workflow
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
Firewall Network (FireNet)  Workflow
=========================================================


1. Create a Security VPC
------------------------------------------------

We recommend you to use the Aviatrix Useful Tool to create a VPC for FireNet deployment. 

Select "Aviatrix Transit VPC" option when creating a security VPC. 

2. Launch FireNet Gateway
------------------------------------------

This step leverage the Transit Network workflow to launch one or two Aviatrix gateway for FireNet. 

If your deployment requires 2-AZ HA, go through Transit Network -> Setup to launch one Aviatrix gateway and enable HA which effectively launches HA gateway (the second gateway) in a different AZ.

3. Subscribe to AWS Marketplace
--------------------------------------

If you have not already done so, follow the Go link to subscribe the VM-Series in AWS Marketplace. 


4. Enable the FireNet Gateway
---------------------------------------------

This step configures the gateway launched in Step 2 for FireNet function. If you have HA enabled, it
automatically sets up the second gateway for FireNet.


5a. Launch and Associate Firewall Instance
--------------------------------------------

This step launches a VM-Series and associate it with one of the FireNet gateway. Note the VM-Series and the FireNet gateway must be in the same AZ.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Transit VPC ID                                  The Transit VPC ID for the Transit DMZ deployment. .
Firewall instance ID                            The firewall EC2 instance ID. Aviatrix Controller monitors the health of this instance and determines fail over when it becomes unreachable.
Firewall main interface ENI                     The firewall EC2 instance ENI interface to the main gateway.y
Firewall companion interface ENI                The firewall EC2 instance ENI interface to the companion gateway.
Firewall Name                                   A name that is referenced by the Aviatrix Controller.
==========================================      ==========

Repeat this step to launch a second firewall instance to associate with the second FireNet gateway. 
Or repeat this step to launch more firewall instances to associate with either FireNet gateway.


5b. Associate an Existing Firewall Instance
--------------------------------------------

This step is alternative step to 5a. If you already launched VM-Series from AWS Console, you can still
associate it with the FireNet gateway. 


6. Attach FireNet gateway to TGW Firewall Domain
-------------------------------------------------

This step requires you have already created a Security Domain with Firewall attribute enabled. 


.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
