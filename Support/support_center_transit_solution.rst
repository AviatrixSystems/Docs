.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Transit Solution
===========================================================================


How can I get all my Spoke VPC's to be interconnected or behave like a full mesh network?
--------------------------------------------------------------------------------------------

Explore "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_" if you want all spoke VPC's to talk to each other. Preqrequisites: all spokes need to be similar (either have/not have HA) and all of them must be on HA or non-HA connections when connected mode is being turned on. You can enable it by going to "Controller UI > Transit Network > Advanced Config > Edit Transit > Pick the transit Gateway > Connected Transit = Enable"

How much IP address space do I need in my VPC to launch a transit solution?
--------------------------------------------------------------------------------------------

To ensure you have enough subnets for various Aviatrix solutions (TGW, Transit DMZ), we highly recommend you to use Create a new transit VPC at `Useful Tools -> Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_. Select the option "Aviatrix Transit VPC". 
  If you would like to continue to use your existing transit VPC and it is too small (not enough of /28 unused segments), use AWS Edit VPC CIDR feature to create a new /24 subnet for the Aviatrix Transit Gateway in TGW use case. 

If you do not want to use our Create a VPC feature at our controller, please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution

For TGW based transit solution to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_. Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.

How do I troubleshoot Spoke to On-prem connection issues?
--------------------------------------------------------------------------------------------

Here are some `Troubleshooting guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 

It is recommended that all spokes have HA pairs. When a switchover occurs to transit HA, only spokes with HA will remain connected, the non-HA spokes will lose connectivity and be black-holed.


How can I switch between primary link and backup link?
--------------------------------------------------------------------------------------------

For peering links, you can find the active links by going to "Controller > Peering > Encrypted Peering" and search for "active" by typing in the textbox next to the looking glass. For any non-transit connections (like spoke to shared-services) you can switchover right here by clicking on the "Switch Over". For some Transit connections (such as transit gateway to spoke gateway), you can also switchover right here if your Transit network did not enable Connected Transit or Manual BGP Advertised Network List.
 
If your Transit network is enabled with Connected Transit or Manual BGP Advertised Network List, you would have to go to " Troubleshoot > Diagnostics > BGP" and click on the "Switch Over" on the gateway which is currently active that you want to switch over from. For example, if you want to have all active links on primary gateway, you will click on the "Switch Over" on the hagw connection.
