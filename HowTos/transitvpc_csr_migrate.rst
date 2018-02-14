.. meta::
   :description: instructions on migrating from CSR to Aviatrix
   :keywords: AWS Global Transit Network

=============================================================
Migrating a CSR Transit Solution to Aviatrix Transit Solution
=============================================================

This document assumes that you have deployed a `CSR Transit solution <https://aws.amazon.com/answers/networking/aws-global-transit-network/>`_ with Transit hub CSR instances and VGWs 
in Spoke VPCs. The steps
below provide instructions to migrate a live CSR deployment to Aviatrix deployment. 

The objectives here are:

 - No change to any on-prem network.   
 - No change to the connectivity between AWS VGW and on-prem. (either over DX or over Internet or both)
 - Re-use AWS VGW deployed in Transit hub VPC.
 - No change to existing VPC infrastructure.
 - Minimum operation downtime.

The migrating process starts with launching an Aviatrix Transit GW in the Transit hub VPC, 
connecting it to VGW, then moving Spoke VPC one at a time to Aviatrix Transit GW. During the process of moving Spoke VPC, traffic should continue to flow to on-prem for both moved and not-yet-moved VPCs. 

Aviatrix supports multiple Transit GW groups from one Controller. The below steps describe migration from one CSR Transit group. The migration process assumes there is a Transit Network tag on Spoke VPC and VGW that connects to CSR. This tag is used to identify a Transit Network.

1. **Launch Aviatrix Transit GW** `Follow Step 1 and Step 2 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to launch an Aviatrix Transit GW and enable HA in the Transit hub VPC. 

2. **Connect Aviatrix Transit GW to VGW** `Follow Step 3. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ At this point, VGW starts to advertise to Aviatrix Transit GW. Make sure you specifiy a different "AS" number for the BGP session of Aviatrix Transit GW connection to VGW. 

3. **Remove a Spoke VPC** Select one Spoke VPC that has VGW deployed. Remove the VPC Transit Network tag. This will effectively detach the Spoke VPC from the CSR Transit Network, delete the VGW. Make sure the above Spoke VPC CIDR route entry has been removed from the Transit Network.  

4. **Attach Spoke VPC to Aviatrix Transit GW** `Follow Step 4, Step 5 and Step 6 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_ to launch an Aviatrix GW in this Spoke VPC (with HA as an option) and attach to the Aviatrix Transit GW. 

5. **Repeat the abovev step 3 and 4** Repeat the above 2 steps for the remaining Spoke VPCs. 

6. **Remove Transit hub VGW CSR tag** After all Spoke VPCs have been migrated to Aviatrix Transit GW, remove the VGW Transit Network tag. This effectively detach VGW from CSR. 


.. |image1| image:: FAQ_media/image1.png

.. disqus::
