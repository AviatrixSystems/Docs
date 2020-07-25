.. meta::
  :description: Firewall Network Workflow
  :keywords: Azure Transit Gateway, Azure, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
Transit FireNet Workflow for Azure
=========================================================

Aviatrix Transit FireNet allows you to deploy firewalls functions for the Aviatrix Multi-Cloud Transit architecture. With Transit FireNet feature, the Firewall Network (FireNet) function is integrated into the Aviatrix Transit gateway.

To learn about Transit FireNet, check out `Transit FireNet FAQ. <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_

If you are looking to deploy Aviatrix FireNet Workflow in AWS, your starting point is `here. <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html>`_ and If you would like to deploy firewall networks in AWS Transit Gateway (TGW) environment, your starting point is `Firenet Workflow. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_

This workflow provides you the step by step instructions to build a Aviatrix Transit Firewall Network also called Transit FireNet.

While the instructions below reference Azure, these functionalities apply to any public cloud in which Aviatrix Transit FireNet is supported.

In this example, Transit VNet with Aviatrix Gateways will be deployed, and two Spoke Gateways (DEV and PROD) will be attached to it.

The transit VPC will have a firewall of supported vendors (Checkpoint, Palo Alto Networks and Fortinet etc.) deployed in it. Please see the diagram below for more details.

Once the infra is in-place then the policy will be created to inspect the east-west and north-south traffic.

|avx_tr_firenet_topology_az|

Step 1 : Create Transit VNet
*******************************

VNets can be created manually on Azure or directly from Aviatrix Controller.

Aviatrix controller has set of useful tools available for users and in this example, VNets are created following the Useful Tools `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ guidelines.

1.	Login to the Aviatrix Controller with username and password
#.	Navigate to **Useful Tools -> Create A VPC**
#.	Add one VPC for Transit FireNet Gateway and select **Aviatrix FireNet VPC** option as shown below.
#.  Create two more VPCs with **no option/checkbox** selected for Spoke Gateways.

|create_vpc|

Step 2: Deploy the Transit Aviatrix Gateway
***************************************************

Transit Aviatrix Gateway can be deployed using the `Transit Gateway Workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_

Prerequisite for Azure
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Transit FireNet builds on the Aviatrix Transit Network solution where Aviatrix gateways are deployed in Transit VNet and/or in Spoke VNet in Azure.

Make sure the deployment meets the following specifications:

1.	ActiveMesh must be enabled when launching the Aviatrix Transit Gateway.
2.	The minimum size of the Aviatrix Transit Gateway instance size is Standard_B2ms.
3.	Select the option “Enable Transit FireNet” when launching the Aviatrix Transit Gateway.
4.	Aviatrix Transit Network must be in Connected mode. Go to Transit Network -> Advanced Config -> Connected Transit. Click Enable.

Procedure
~~~~~~~~~~~~~~~~~~~~~

1.	Navigate to **MULTI-CLOUD TRANSIT -> Setup -> #1 Launch an Aviatrix Transit Gateway**
#.	Choose instance size **Standard_B2ms**
#.	Enable **ActiveMesh Mode (Mandatory)**
#.	Enable InsaneMode for higher throughputs (optional)
#.	Enable Transit VPC GW HA by navigating to **MULTI-CLOUD TRANSIT -> Setup -> #2 (Optional) Enable HA to an Aviatrix Transit Gateway**

Please see an example below for Transit FireNet GW:

|tr_firenet_gw|

.. note::
    Insane Mode Encryption for higher throughput requires an instance size as shown below.

|insane_mode_tp|

Step 3: Deploy Spoke Gateways
*************************************

Now that we have Aviatrix Transit Gateway, we can deploy Aviatrix Spoke Gateways in the spoke VPCs using `Aviatrix Spoke Gateway Workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_.

1.	Navigate to **MULTI-CLOUD TRANSIT -> Setup -> #4 Launch an Aviatrix Spoke Gateway**
#.	Deploy a Spoke Gateway (GW) in each of the spoke VPCs using defaults while choose correct Account and VPC info
#.	Choose the Public Subnet
#.	Enable Spoke Gateway HA by navigating to Transit network -> Setup -> #5 (Optional) Enable/Disable HA at Spoke GW

|launch_spk_gw|

Step 4: Attach Spoke Gateways to Transit Network
*******************************************************

Transit and spoke gateways are deployed, next step is to connect them.

1.	Navigate to **MULTI-CLOUD TRANSIT -> Setup -> #6a Attach Spoke Gateway to Transit Network**
#.	Select one spoke at a time and attach to the Transit Gateway.

|attach_spk_trgw|

.. note::
 Transit Gateway is attached to Spoke Gateways, but by default, Transit Gateway will not route traffic between Spoke Gateways.

Step 5: Enable Connected Transit
**************************************

By default, spoke VPCs are in isolated mode where the Transit will not route traffic between them. To allow the Spoke VPCs to communicate with each other, we need to enable Connected Transit

1.	Navigate to **MULTI-CLOUD TRANSIT -> Advanced Config**, select the right Transit Gateway and enable **“Connected Transit”**

|connected_transit|

Step 6: Configure Transit Firewall Network
**************************************************

Transit and Spoke Gateways have now been deployed, next step is to deploy and enable the Firewall for traffic inspection.

Let’s start with enabling the firewall function and configure the FireNet policy.

1.	Navigate to **MULTI-CLOUD TRANSIT -> Transit FireNet -> #1 Enable Transit FireNet on Aviatrix Transit Gateway**
#.	Choose the Aviatrix Transit Gateway and Click **“Enable”**

|en_tr_firenet|

3.	Navigate to **MULTI-CLOUD TRANSIT -> Transit FireNet -> #2 Manage FireNet Policy**
#.	Add spokes to the Inspected box for traffic inspection

.. note::
    By default, FireNet inspects ingress (INET to VPC) and east-west traffic (VPC to VPC) only.

|tr_firenet_policy|


Step 7a: Launch and Associate Firewall Instance
*****************************************************************

This approach is recommended if this is the first Firewall instance to be attached to the gateway.

This step launches a Firewall instance and associates it with one of the FireNet gateways.


.. important::

    The Firewall instance and the associated Aviatrix FireNet gateway above must be in the same AZ, and, we recommend that the Management Interface Subnet and Egress (untrust dataplane) Interface Subnet should not be in the same subnet.

7a.1 Launch and Attach
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Go to Aviatrix Controller's console and navigate to **Firewall Network -> Setup -> Step 7a** and provide all the required input as shown in a table and click **"Launch"** button.

.. important::
    Vendor's firewall may take some time after launch to be available.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
VPC ID                                          The Security VPC created in Step 1.
Gateway Name                                    The primary FireNet gateway.
Firewall Instance Name                          The name that will be displayed on Azure Console.
Firewall Image                                  The Azure AMI that you have subscribed in Step 2.
Firewall Image Version                          Firewall instance current supported software versions.
Firewall Instance Size                          Firewall instance type.
Management Interface Subnet.                    Select the subnet whose name contains "gateway and firewall management"
Egress Interface Subnet                         Select the subnet whose name contains "FW-ingress-egress".
Username                                        Applicable to Azure deployment only. "admin" as a username is not accepted.
Password                                        Applicable to Azure deployment only.
Key Pair Name (Optional)                        The .pem file name for SSH access to the firewall instance.
Attach (Optional)                               By selecting this option, the firewall instance is inserted in the data path to receive packet. If this is the second firewall instance for the same gateway and you have an operational FireNet deployment, you should not select this option as the firewall is not configured yet. You can attach the firewall instance later at Firewall Network -> Advanced page.
Advanced (Optional)                             Click this selection to allow Palo Alto firewall bootstrap files to be specified.
==========================================      ==========

1. CheckPoint Specification
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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


.. note::
    Repeat Step 7a to launch the second firewall instance to associate with the HA FireNet gateway. Or repeat this step to launch more firewall instances to associate with the same FireNet gateway.


Follow `Check Point Example <https://docs.aviatrix.com/HowTos/config_CheckPointAzure.html#launch-check-point-firewall-from-aviatrix-controller>`_ to launch Check Point security gateway in Azure and for more details.


2. Palo Alto VM-Series Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

    If VM-Series are individually managed and integrated with the Controller, you can still use Bootstrap to save initial configuration time. Export the first firewall's configuration to bootstrap.xml, create an IAM role and Bootstrap bucket structure as indicated above, then launch additional firewalls with IAM role and the S3 bucket name to save the time of the firewall manual initial configuration.


3. Fortigate Specifications
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Fortigate Next Generation Firewall instance has 2 interfaces as described below.

========================================================         ===============================          ================================
**Fortigate VM instance interfaces**                             **Description**                          **Inbound Security Group Rule**
========================================================         ===============================          ================================
eth0 (on subnet -Public-FW-ingress-egress-AZ-a)                  Egress or Untrusted interface            Allow ALL
eth1 (on subnet -dmz-firewall)                                   LAN or Trusted interface                 Allow ALL (Do not change)
========================================================         ===============================          ================================

.. note::
    Firewall instance eth1 is on the same subnet as FireNet gateway eth2 interface.

.. tip::
    Starting from Release 5.4, Fortigate bootstrap configuration is supported.


Step 7b: Associate an Existing Firewall Instance
*******************************************************

This step is the alternative step to Step 7a. If you already launched the firewall (Check Point, Palo Alto Network or Fortinet) instance from Azure Console, you can still associate it with the FireNet gateway.

Go to Aviatrix Controller's console and navigate to **Firewall Network -> Setup -> Step 7b** and associate a firewall with right FireNet Gateway.


Step 8: Vendor Firewall Integration
*****************************************************

Vendor integration dynamically updates firewall route tables. The use case is for networks with RFC 1918 and non-RFC 1918 routes that require specific route table programming on the firewall appliance

1.	Go to Firewall Network -> Vendor Integration -> Select Firewall, fill in the details of your Firewall instance.
2.	Click Save, Show and Sync.


Step 9: Example Setup for "Allow All" Policy
***************************************************

After a firewall instance is launched, wait for 5 to 15 minutes for it to come up. Time varies for each firewall vendor.
In addition, please follow example configuration guides as below to build a simple policy on the firewall instance for a test validation that traffic is indeed being routed to firewall instance.

Palo Alto Network (PAN)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For basic configuration, please refer to `example Palo Alto Network configuration guide <https://docs.aviatrix.com/HowTos/config_paloaltoVM.html>`_.

For implementation details on using Bootstrap to launch and initiate VM-Series, refer to `Bootstrap Configuration Example <https://docs.aviatrix.com/HowTos/bootstrap_example.html>`_.

FortiGate (Fortinet)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For basic configuration, please refer to `example Fortinet configuration guide <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html>`_.

Check Point
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For basic configuration, please refer to `example Check Point configuration guide <https://docs.aviatrix.com/HowTos/config_CheckPointAzure.html>`_.


Step 10: Verification
***************************

There are multiple ways to verify if Transit FireNet is configured properly:

    1.	Aviatrix Flightpath - Control-plane Test
    #.	Ping/Traceroute Test between Spoke VPCs (East-West) - Data-plane Test

Flight Path Test for FireNet Control-Plane Verification:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Flight Path is a very powerful troubleshooting Aviatrix tool which allows users to validate the control-plane and gives visibility of end to end packet flow.

    1.	Navigate to **Troubleshoot-> Flight Path**
    #.	Provide the Source and Destination Region and VPC information
    #.	Select ICMP and Private subnet, and Run the test

.. note::
    VM instance will be required in Azure, and ICMP should be allowed in security group.

Ping/Traceroute Test for FireNet Data-Plane Verification:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Once control-plane is established and no problem found in security and routing polices. Data-plane validation needs to be verified to make sure traffic is flowing and not blocking anywhere.

There are multiple ways to check data-plane:
    1. One way to SSH to Spoke EC2 instance  (e.g. DEV1-VM) and ping other Spoke EC2 to instance (e.g PROD1-VM) to make sure no traffic loss in the path.
    2. Ping/traceroute capture can also be performed from Aviatrix Controller. Go to **TROUBLESHOOT -> Diagnostics** and perform the test.


.. |avx_tr_firenet_topology_az| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/avx_tr_firenet_topology_az.png
   :scale: 20%

.. |insane_mode_tp| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/insane_mode_tp.png
   :scale: 30%

.. |create_vpc| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/create_vpc.png
   :scale: 30%

.. |tr_firenet_gw| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/tr_firenet_gw.png
   :scale: 25%

.. |launch_spk_gw| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/launch_spk_gw.png
   :scale: 25%

.. |attach_spk_trgw| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/attach_spk_trgw.png
   :scale: 25%

.. |en_tr_firenet| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/en_tr_firenet.png
   :scale: 25%

.. |tr_firenet_policy| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/tr_firenet_policy.png
   :scale: 25%

.. |avx_tr_firenet_topology| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/avx_tr_firenet_topology.png
   :scale: 25%

.. |connected_transit| image:: transit_firenet_workflow_media/transit_firenet_Azure_workflow_media/connected_transit.png
   :scale: 30%

.. disqus::
