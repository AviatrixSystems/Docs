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

2. Subscribe to AWS Marketplace
--------------------------------------

If you have not already done so, follow the Go link to subscribe the VM-Series in AWS Marketplace.

Do not launch the firewall instance from AWS Console as you launch it in the following steps. . 

3. Create a Firewall Domain
-----------------------------

This step creates a Firewall Domain

4. Launch Aviatrix FireNet Gateway
------------------------------------------

This step leverage the Transit Network workflow to launch one or two Aviatrix gateway for FireNet. 

If your deployment requires 2-AZ HA, go through Transit Network -> Setup to launch one Aviatrix gateway and enable HA which effectively launches HA gateway (the second gateway) in a different AZ.


5. Enable Aviatrix FireNet Gateway
---------------------------------------------

This step configures the gateway launched in Step 2 for FireNet function. If you have HA enabled, it
automatically sets up the second gateway for FireNet.

6. Attach Aviatrix FireNet gateway to TGW Firewall Domain
-------------------------------------------------------------

This step requires you have already created a Security Domain with Firewall attribute enabled.


7a. Launch and Associate Firewall Instance
--------------------------------------------

This step launches a VM-Series and associate it with one of the FireNet gateway. Note the VM-Series and the 
associated FireNet gateway must be in the same AZ.

Repeat this step to launch a second firewall instance to associate with the second FireNet gateway. 
Or repeat this step to launch more firewall instances to associate with either FireNet gateway.

It takes about 15 minutes to get the VM-Series up and running. After the VM-Series instance is up and running, follow the instructions here to configure an "Allow All" policy for a quick Proof of Concept setup. 


7b. Associate an Existing Firewall Instance
--------------------------------------------

This step is alternative step to 5a. If you already launched VM-Series from AWS Console, you can still
associate it with the FireNet gateway. 


8. Specify Security Domain for Firewall Inspection
-----------------------------------------------------

This step requires you have already created a Security Domain with Firewall attribute enabled. 


.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
