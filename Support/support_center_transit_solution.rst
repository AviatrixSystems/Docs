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

Please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution

For TGW based transit solution to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_. Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.

How do I troubleshoot Spoke to On-prem connection issues?
--------------------------------------------------------------------------------------------

Here are some `Troubleshooting guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 

It is recommended that all spokes have HA pairs. When a switchover occurs to transit HA, only spokes with HA will remain connected, the non-HA spokes will lose connectivity and be black-holed.
