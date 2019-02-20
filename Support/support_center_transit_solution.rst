.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Transit Solution
===========================================================================

Overview
--------

The Aviatrix Support Center goal is to be a central repository for known issues, solutions, workarounds and common design principles for our customers. Please look at our `Official Support Page <http://www.aviatrix.com/support>`_ for more information.


Tips & Tricks
-------------

* Got questions for Support Team? Send an email to support@aviatrix.com
* Want 24x7x365 support? Reach out to sales@aviatrix.com and ask for Platinum Support!!

**Transit Solution:**
---------------------

  * Explore "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_" if you want all spoke VPC's to talk to each other. Preqrequisites: all spokes need to be similar (either have/not have HA), all of them must be on HA or non-HA connections when connected mode is being turned on.
  * Please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution
  * For TGW based transit solution to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_ Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.
  * Unable to reach from Spoke to On-Prem? `Troubleshoot guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 
