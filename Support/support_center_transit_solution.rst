.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Transit Solution
===========================================================================


How can I get all my Spoke VPCs to be interconnected or behave like a full mesh network?
--------------------------------------------------------------------------------------------

Explore "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_" if you want all spoke VPCs to talk to each other. Prerequisites: all spokes need to be similar (either have/not have HA) and all of them must be on HA or non-HA connections when connected mode is being turned on. You can enable it by going to "Controller UI > Transit Network > Advanced Config > Edit Transit > Pick the transit Gateway > Connected Transit = Enable"

How much IP address space do I need in my VPC to launch a transit solution?
--------------------------------------------------------------------------------------------

To ensure you have enough subnets for various Aviatrix solutions (TGW, Transit DMZ), we highly recommend you to use Create a new transit VPC at `Useful Tools -> Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_. Select the option "Aviatrix Transit VPC". 
  If you would like to continue to use your existing transit VPC and it is too small (not enough /28 unused segments), use the AWS Edit VPC CIDR feature to create a new /24 subnet for the Aviatrix Transit Gateway in TGW use case. 

If you do not want to use our Create a VPC feature at our controller, please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution

For a TGW based transit solution to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_. Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.

How do I troubleshoot Spoke to On-prem connection issues?
--------------------------------------------------------------------------------------------

Here are some `Troubleshooting guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 

It is recommended that all spokes have HA pairs. When a switchover occurs to the transit HA, only spokes with HA will remain connected, the non-HA spokes will lose connectivity and be black-holed.


How can I switch between primary link and backup link?
--------------------------------------------------------------------------------------------

For peering links, you can find the active links by going to "Controller > Peering > Encrypted Peering" and searching for "active" by typing in the textbox next to the magnifying glass. For any non-transit connections (like spoke to shared-services) you can switchover right here by clicking on the "Switch Over". For some Transit connections (such as transit gateway to spoke gateway), you can also switchover right here if your Transit network did not enable Connected Transit or `Manual BGP Advertised Network List <https://docs.aviatrix.com/HowTos/site2cloud.html#manual-bgp-advertised-network-list>`_.
 
If your Transit network is enabled with Connected Transit or `Manual BGP Advertised Network List <https://docs.aviatrix.com/HowTos/site2cloud.html#manual-bgp-advertised-network-list>`_, you would have to go to " Troubleshoot > Diagnostics > BGP" and click on the "Switch Over" on the gateway which is currently active that you want to switch over from. For example, if you want to have all active links on primary gateway, you will click on the "Switch Over" on the hagw connection.

Why can't the traffic from a new subnet added to the attached VPC to AWS Transit Gateway reach the on-premise network?
--------------------------------------------------------------------------------------------

In a NextGen Transit for AWS solution (i.e. AWS Transit Gateway), you may find that an EC2 instance in a new subnet created in a new AZ will not be able to reach on-premise network or another Spoke VPC, or vice versa. This could be due to the lack of proper route programming in the AWS VPC. The following scenarios will require the VPC to be detached and re-attached to TGW so that the Aviatrix controller will perform the necessary programming in AWS infrastructure.

* when you add a new subnet in a new AZ, or
* when you add a new route table in the VPC

If you are creating a new subnet in the existing AZ in which the VPC is already attached to the TGW **AND** the newly created subnet is associated with the existing route table, it will not require VPC detachment and reattachment to the TGW.

The above limitations exist in software version 4.3 and prior releases. In our future releases, we will be able to support the above scenarios without detaching and re-attaching the VPC to TGW.

How can I migrate from Aviatrix Transit Network solution to AWS Transit Gateway deployment?
--------------------------------------------------------------------------------------------

If you have an existing Aviatrix Global Transit Network in production, you may refer to `Migrating an Aviatrix Global Transit Network to Next Gen Transit for AWS <https://docs.aviatrix.com/HowTos/avx_tgw_migration.html>`_.


If I add an additional CIDR to my spoke VPC, do I need to do anything with my Aviatrix Transit Network?
---------------------------------------------------------------------------------------------------------
 
The Aviatrix Spoke Gateway needs to learn and advertise this additional CIDR to the Aviatrix Transit Gateway. Please go to "Aviatrix Console > Transit Network > Setup" to detach this Spoke Gateway from the Transit Gateway and then attach it back again.
