.. meta::
  :description: Firewall Network Workflow
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
Firewall Network (FireNet)  Workflow
=========================================================

FireNet is a solution for integrating firewalls in the AWS TGW deployment. 

If you are looking for firewall integration solution on Azure or in Aviatrix Multi-Cloud transit architecture, 
your starting point is `here <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html>`_. 

For questions about FireNet, check out `FireNet FAQ. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_

1. Create a Security VPC
------------------------------------------------

We recommend that you use the Aviatrix "Useful Tools" to create a VPC for a FireNet deployment. 

Select "Aviatrix FireNet VPC" option when creating a security VPC. 

==========================================      =================
**Aviatrix FireNet VPC Public Subnet**          **Description**
==========================================      =================
-Public-gateway-and-firewall-mgmt-AZ-a          A /28 public subnet in AZ a for  FireNet gateway and firewall instance management interface.
-Public-gateway-and-firewall-mgmt-AZ-b          A /28 public subnet in AZ b for FireNet HA gateway and firewall instance management interface. 
-Public-FW-ingress-egress-AZ-a                  A /28 public subnet in AZ a for firewall instance's egress interface.
-Public-FW-ingress-egress-AZ-b                  A /28 public subnet in AZ b for  firewall instance's egress interface. 
==========================================      =================


2. Subscribe to AWS Marketplace
--------------------------------------

If you have not already done so, follow the `AWS Marketplace <https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=VM-Series+Next-Generation+Firewall>`_ link to subscribe to the VM-Series.

If you have not already done so, click the following link to subscribe the firewall instance from a specific vendor on AWS
Marketplace. 
Do not launch the firewall instance from AWS Console as you can launch it on the Controller in the later steps.  

 - `Palo Alto VM-Series <https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=VM-Series+Next-Generation+Firewall>`_
 - `Check Point CloudGuard <https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=Check+Point+>`_
 - `Fortinet FortiGate <https://aws.amazon.com/marketplace/search/results?x=0&y=0&searchTerms=Fortinet>`_


3. Create a Firewall Domain
-----------------------------

This step creates a Security Domain with a Firewall Domain option. 

Go to TGW Orchestrator -> Plan -> Create an AWS Transit Gateway and then a Security Domain by selecting "Aviatrix Firewall Domain". 

For more information, refer to `Create a New Security Domain <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain>`_. 


4. Launch Aviatrix FireNet Gateway
------------------------------------------

This step leverages the Transit Network workflow to launch one Aviatrix gateway for FireNet deployment. 

C5x.large is the minimum Aviatrix gateway instance size for FireNet deployment as it requires `4 interfaces. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#what-is-the-minimum-gateway-instance-size-for-firenet-deployment>`_

If your deployment requires 2-AZ HA, go through Transit Network -> Setup to launch one Aviatrix gateway and enable HA which effectively launches a HA gateway (the second gateway) in a different AZ. If you select public subnet "-Public-gateway-and-firewall-mgmt-AZ-a" for the primary FireNet gateway, 
you should select public subnet "-Public-gateway-and-firewall-mgmt-AZ-b" for the second AZ FireNet gateway.

Do not check Insane Mode Encryption.


5. Enable Aviatrix FireNet Gateway
---------------------------------------------

This step configures the gateway launched in Step 4 for FireNet function. If you have HA enabled, it
automatically sets up the HA gateway for FireNet deployment.

.. tip ::

  If you do not see any gateways in the drop down menu, refresh the browser to load.

In this step, the Aviatrix Controller creates 3 more Ethernet interfaces with associated subnets on the FireNet gateways. 

|private_interfaces|

==========================================         ==============================================   =================
**FireNet gateway instance interfaces**            **Inbound Security Group Rule**                  **Description**
==========================================         ==============================================   =================
eth0                                               Allow SSH and HTTPS from Aviatrix Controller     Public interface for communication with Controller
eth1                                               Allow ALL (Do not change)                        Private interface for traffic to/from TGW
eth2                                               Allow ALL (Do not change)                        Private interface for traffic to firewall instances
eth3                                               Allow ALL (Do not change)                        Private interface for traffic to FireNet HA gateway
==========================================         ==============================================   =================


.. important::

  Please do not change the security group inbound and outbound rules on eth1, eth2 and eth3 of a FireNet gateway.

If FireNet gateway HA is enabled, the HA gateway shares the same route table as the primary for its eth1 interface. 

The new subnets created by the Controller at these steps are listed below.

==========================================      =================
**Aviatrix FireNet VPC Private Subnet**         **Description**
==========================================      =================
-tgw-egress                                     for FireNet gateway eth1 to TGW
-hagw-tgw-egress                                for FireNet HA gateway eth1 to TGW
-tgw-ingress                                    for TGW to the ENI of eth1 of FireNet gateway 
-hagw-tgw-ingress                               for TGW to the ENI of eth1 of the FireNet HA gateway 
-dmz-firewall                                   for FireNet gateway eth2
-hagw-dmz-firewall                              for FireNet HA gateway eth2 
-dmz-exchange                                   for FireNet gateway eth3
-hagw-dmz-exchange                              for FireNet HA gateway eth3
==========================================      =================


6. Attach Aviatrix FireNet gateway to TGW Firewall Domain
-------------------------------------------------------------

This step requires you have already created a Security Domain with Firewall attribute enabled.

When this step is completed, you have built the network infrastructure for FireNet deployment. This step may take a few minutes.


|gw_launch|

This step programs the relative route tables, described as below.

==========================================   =====================       =================                 
**Aviatrix FireNet VPC route table**         **key route entry**         **Description**
==========================================   =====================       =================
-tgw-egress                                  0.0.0.0/0 -> tgw            for FireNet gateway eth1 to TGW 
-hagw-tgw-egress                             0.0.0.0/0 -> tgw            for FireNet HA gateway eth1 to TGW
-tgw-ingress                                 0.0.0.0/0 -> eth1           for TGW to eth1 of FireNet gateway
-hagw-tgw-ingress                            0.0.0.0/0 -> eth1.          for TGW to eth1 of FireNet HA gateway
-dmz-firewall                                0.0.0.0/0 -> tgw            for firewall instance LAN interface to TGW
-hagw-dmz-firewall                           0.0.0.0/0 -> tgw            for firewall instance LAN interface to TGW 
-dmz-exchange                                0.0.0.0/0 -> eth3           for eth3 of FireNet gateway to eth3 of HA gateway 
-hagw-dmz-exchange                           0.0.0.0/0 -> eth3           for eth3 of FireNet HA gateway to eth3 of primary gateway 
==========================================   =====================       =================


7a. Launch and Associate Firewall Instance
--------------------------------------------

This approach is recommended if this is the first Firewall instance to be attached to the gateway. 

This step launches a Firewall instance and associates it with one of the FireNet gateways. 


.. important::

The Firewall instance and the associated Aviatrix FireNet gateway above must be in the same AZ, and, we recommend that the Management Interface Subnet and Egress (untrust dataplane) Interface Subnet should not be in the same subnet.

7a.1 Launch and Attach
##########################

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
VPC ID                                          The Security VPC created in Step 1.
Gateway Name                                    The primary FireNet gateway.
Firewall Instance Name                          The name that will be displayed on AWS Console.
Firewall Image                                  The AWS AMI that you have subscribed in Step 2.
Firewall Image Version                          Firewall instance current supported software versions. 
Firewall Instance Size                          Firewall instance type.  
Management Interface Subnet.                    Select the subnet whose name contains "gateway and firewall management"
Egress Interface Subnet                         Select the subnet whose name contains "FW-ingress-egress".
Username                                        Applicable to Azure deployment only. "admin" as a username is not accepted.
Password                                        Applicable to Azure deployment only.
Key Pair Name (Optional)                        The .pem file name for SSH access to the firewall instance.
Attach (Optional)                               By selecting this option, the firewall instance is inserted in the data path to receive packet. If this is the second firewall instance for the same gateway and you have an operational FireNet deployment, you should not select this option as the firewall is not configured yet. You can attach the firewall instance later at Firewall Network -> Advanced page. 
Advanced (Optional)                             Click this selection to allow Palo Alto firewall bootstrap files to be specified. 
IAM Role                                        In advanced mode, create an IAM Role on the AWS account that launched the FireNet gateway. Create a policy to attach to the role. The policy is to allow access to "Bootstrap Bucket". This option is not supported on Check Point. 
Bootstrap Bucket Name                           In advanced mode, specify a bootstrap bucket name where the initial configuration and policy file is stored. This option is not supported on Check Point. 
User Data                                       In advanced mode and applicable to Check Point and FortiGate. For FortiGate in Azure, refer to `FortiGate User Data in Azure <https://docs.aviatrix.com/HowTos/fortigate_bootstrap_example_azure.html#method-1-configure-fortigate-firewall-via-user-data>`_. For Check Point in Azure, refer to `Check Point User Data in Azure <https://docs.aviatrix.com/HowTos/checkpoint_bootstrap_azure.html#configure-check-point-security-gateway-using-custom-data>`_.
==========================================      ==========

1. Palo Alto VM-Series Specifications
**************************************

Palo instance has 3 interfaces as described below.

========================================================         ===============================          ================================
**Palo Alto VM instance interfaces**                             **Description**                          **Inbound Security Group Rule**
========================================================         ===============================          ================================
eth0 (on subnet -Public-FW-ingress-egress-AZ-a)                  Egress or Untrusted interface            Allow ALL 
eth1 (on subnet -Public-gateway-and-firewall-mgmt-AZ-a)          Management interface                     Allow SSH, HTTPS, ICMP, TCP 3978
eth2 (on subnet -dmz-firewall)                                   LAN or Trusted interface                 Allow ALL (Do not change)
========================================================         ===============================          ================================

Note that firewall instance eth2 is on the same subnet as FireNet gateway eth2 interface.

.. important::

  For Panorama managed firewalls, you need to prepare Panorama first and then launch a firewall. Check out `Setup Panorama <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html#managing-vm-series-by-panorama>`_.  When a VM-Series instance is launched and connected with Panorama, you need to apply a one time "commit and push" from the Panorama console to sync the firewall instance and Panorama.

.. Tip::

    If VM-Series are individually managed and integrated with the Controller, you can still use Bootstrap to save initial configuration time. Export the first firewall's configuration to bootstrap.xml, create an IAM role and Bootstrap bucket structure as indicated above,
    then launch additional firewalls with IAM role and the S3 bucket name to save the time of the firewall manual initial configuration.

2. Fortigate Specifications
*******************************
    
Fortigate Next Generation Firewall instance has 2 interfaces as described below.

========================================================         ===============================          ================================
**Fortigate VM instance interfaces**                             **Description**                          **Inbound Security Group Rule**
========================================================         ===============================          ================================
eth0 (on subnet -Public-FW-ingress-egress-AZ-a)                  Egress or Untrusted interface            Allow ALL 
eth1 (on subnet -dmz-firewall)                                   LAN or Trusted interface                 Allow ALL (Do not change)
========================================================         ===============================          ================================

Note that firewall instance eth1 is on the same subnet as FireNet gateway eth2 interface.

.. Tip::

  Starting from Release 5.4, Fortigate bootstrap configuration is supported. 


3. CheckPoint Specification
******************************

CheckPoint Firewall instance has 2 interfaces as described below. 

========================================================         ===============================          ================================
**CheckPoint VM instance interfaces**                             **Description**                          **Inbound Security Group Rule**
========================================================         ===============================          ================================
eth0 (on subnet -Public-FW-ingress-egress-AZ-a)                  Egress or Untrusted interface            Allow ALL 
eth1 (on subnet -dmz-firewall)                                   LAN or Trusted interface                 Allow ALL (Do not change)
========================================================         ===============================          ================================

Note that firewall instance eth1 is on the same subnet as FireNet gateway eth2 interface.

.. important::

  Starting from Release 5.4, launching CheckPoint firewall instances from the Aviatrix Controller automatically initiates its onboarding process. After completing this step, user should be able to login to the CheckPoint console with username **admin** and password **Aviatrix123#**.


7a.2 Launch and Associate More
#################################

Repeat Step 7a.1 to launch the second firewall instance to associate with the HA FireNet gateway. 
Or repeat this step to launch more firewall instances to associate with the same FireNet gateway.

7a.3 Example Setup for "Allow All" Policy
###########################################

After a firewall instance is launched, wait for 15 minutes for it to come up. 
In addition, please follow example configuration guides as below to build a simple policy on the firewall instance for a test validation that traffic is indeed being routed to firewall instance. 

Palo Alto
**********
For basic configuration, please refer to `this example configuration guide <https://docs.aviatrix.com/HowTos/config_paloaltoVM.html>`_.

For implementation details on using Bootstrap to launch and initiate VM-Series, refer to `Bootstrap Configuration Example <https://docs.aviatrix.com/HowTos/bootstrap_example.html>`_. 

FortiGate
**********
For basic configuration, please refer to `this example configuration guide <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html>`_.

CheckPoint
**********
For basic configuration, please refer to `this example configuration guide <https://docs.aviatrix.com/HowTos/config_CheckPointVM.html>`_


7b. Associate an Existing Firewall Instance
--------------------------------------------

This step is the alternative step to Step 7a. If you already launched VM-Series from AWS Console, you can still
associate it with the FireNet gateway. 

If the firewall instance is by a vendor other than Palo Alto Network, for example, Checkpoint or Fortinet, you should launch the firewall 
instances from the AWS Console and associate them to the Aviatrix FireNet gateway. The `Management Interface Subnet` may be the same as the `Egress Interface Subnet`

7c. Launch & Associate Aviatrix FQDN gateway
------------------------------------------------

If you perform 7a or 7b, then you must be using a third party firewall instance. Skip this step.

This option is to deploy `Aviatrix FQDN gateway <https://docs.aviatrix.com/HowTos/fqdn_faq.html>`_ in a FireNet environment for a centralized scale out egress whitelist solution, as shown below. 

.. important::

  If a deployed Aviatrix FQDN gateway has no FQDN whitelist attached to it, the FQDN gateway acts as a NAT gateway and it will pass all traffic to all destination sites. To add whitelist policies, follow `how to configure FQDN instructions <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

This option is available in AWS and Azure. It applies to multi-cloud transit, Azure native Spoke transit and TGW based transit. 

|fqdn_egress|

|fqdn_in_firenet| 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
VPC ID                                          The Security VPC created in Step 1.
Gateway Name                                    The primary FireNet gateway.
FQDN Gateway Subnet                             The public subnet on which Aviatrix FQDN gateway will be launched.
FQDN Gateway Size                               The Aviatrix FQDN gateway instance size, starting from t2.micro.
FQDN Gateway Name                               The Aviatrix FQDN gateway name. Note you cannot change the name once the gateway instance is launched. 
Attach                                          Attach this FQDN gateway to the primary FireNet gateway.
==========================================      ==========





8. Specify Security Domain for Firewall Inspection
-----------------------------------------------------

There are two inspection modes, one is Domain based inspection which is the default and the other is Connection Policy based inspection. 
The Connection Policy based inspection mode (connection based inspection) is available in Release 6.3 and later. 

8a. Domain-based inspection
###############################

In domain-based inspection, to specify a Spoke VPC that needs inspection is to define a connection policy of the Security Domain, where the  Spoke VPC is a member, 
to the Firewall Domain.

For example, if you wish to inspect traffic between on-prem to VPC, connect Aviatrix Edge Domain to the 
Firewall Domain. This means on-prem traffic to any Spoke VPC is routed to the firewall first and then it is forwarded
to the destination Spoke VPC. Conversely, any Spoke VPC traffic destined to on-prem is routed to the firewall first and then forwarded to on-prem. 

8b. Connection-based inspection
#################################

connection-based inspection is available from Release 6.3 and later. Connection-based inspection allows you to inspect traffic going
across a specific pair of Security Domains. For example, Domain A has connection policy to Domain B and Domain C, you can specify to
inspect traffic between Domain A and Domain B, but not Domain A and Domain C. This inspection mode reduces the amount of traffic being 
inspected and reduces the instances size requirements on both FireNet gateways and firewalls. 

.. note::

  Connection-based inspection is not applicable to `intra-domain inspection <https://docs.aviatrix.com/HowTos/tgw_list.html#edit-intra-domain-inspection>`_ where all VPC to VPC traffic in the same domain is inspected. 

Here are the steps to enable and configure connection based inspection. 

Step 1. Enable Connection-Based Inspection
*********************************************

Go to Controller -> TGW Orchestrator -> List. Click TGW, select one TGW, click Action -> Edit Inspection Mode. Select Connection-based, click Update. 

Step 2. Configure East-West Inspection
******************************************

Go to Controller -> TGW Orchestrator -> List. Click Connection which displays all Connection Policies in rows. Select on Connection Policy, 
click Action -> Enable Inspection. In the pop up drop down menu, select a FireNet gateway to associate the Connection Policy with. 

Repeat this step for other Connection Policies. 

Step 3. Configure Egress Inspection
*************************************

Go to Controller -> TGW Orchestrator -> List. Click Security Domains which displays all Security Domains configured on the TGW. 
Select on domain, click Action -> Enable Egress Inspection.

Done. 





.. |firewall_domain| image:: firewall_network_workflow_media/firewall_domain.png
   :scale: 30%

.. |gw_launch| image:: firewall_network_workflow_media/gw_launch.png
   :scale: 30%

.. |private_interfaces| image:: firewall_network_workflow_media/private_interfaces.png
   :scale: 30%

.. |panvm_bucket| image:: firewall_network_workflow_media/panvm_bucket.png
   :scale: 30%

.. |fqdn_in_firenet| image:: firewall_network_workflow_media/fqdn_in_firenet.png
   :scale: 30%

.. |fqdn_egress| image:: transit_firenet_design_patterns_media/fqdn_egress.png
   :scale: 30%

.. disqus::
