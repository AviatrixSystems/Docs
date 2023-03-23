
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

.. Note::

  This document assumes you have already `launched an Aviatrix Controller <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

..

The migrating process starts with launching an Aviatrix Transit GW in the Transit hub VPC, 
connecting it to VGW, then moving Spoke VPC one at a time to Aviatrix Transit GW. During the process of moving Spoke VPC, traffic should continue to flow to on-prem for both moved and not-yet-moved VPCs. 

Aviatrix supports multiple Transit GW groups from one Controller. The below steps describe migration from one CSR Transit group. The migration process assumes there is a Transit Network tag on Spoke VPC and VGW that connects to CSR. This tag is used to identify a Transit Network.

1. **Launch Aviatrix Transit GW** `Follow Step 1 and Step 2 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to launch an Aviatrix Transit GW and enable HA in the Transit hub VPC. You can consider using a new Transit hub VPC in case the existing Transit hub VPC does not have enough IP addresses to launch new instances. (The Aviatrix Transit GW pair)

2. **Connect Aviatrix Transit GW to VGW** `Follow Step 3. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ At this point, VGW starts to advertise to Aviatrix Transit GW. Make sure you specifiy a different "AS" number for the BGP session of Aviatrix Transit GW connection to VGW. Also note that if Transit GW and VGW are in the same account and same VPC, VGW must be detached from the VPC. 

3. **Remove a Spoke VPC** Select one Spoke VPC that has VGW deployed. Remove the VPC Transit Network tag. This will effectively detach the Spoke VPC from the CSR Transit Network. Make sure the above Spoke VPC CIDR route entry has been removed from the Transit Network.  

4. **Attach Spoke VPC to Aviatrix Transit GW** `Follow Step 4, Step 5 and Step 6 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_ to launch an Aviatrix GW in this Spoke VPC (with HA as an option) and attach to the Aviatrix Transit GW. Test connectivity to make sure this Spoke VPC can communicate with on-prem. Note this step is reversable if Spoke VPC fail to connect to on-prem after a period of time (depending on how many routes are being propagated, this could take minutes.) To reverse the step, detach the Spoke VPC from the Aviatrix Transit GW; add the Transit Network tag back to the Spoke VPC will move the Spoke VPC back to CSR solution. Once a Spoke is moved to Aviatrix Transit GW group, the Spoke VPC CIDR will be advertised to from Aviatrix Transit GW to VGW and to on-prem. 

5. **Repeat the abovev step 3 and 4** Repeat the above 2 steps for the remaining Spoke VPCs. 

6. **Remove Transit hub VGW CSR tag** After all Spoke VPCs have been migrated to Aviatrix Transit GW, remove the VGW Transit Network tag. This effectively detach VGW from CSR. 

The effective operation downtime for each Spoke VPC is the time between Transit Network tag  being removed for the Spoke VPC and the Spoke VPC being attached to Aviatrix Transit GW. It should be a few minutes. 

Note in Aviatrix solution, Spoke VPCs have no connectivities to each other by default. If a Spoke VPC needs connectivity to another Spoke VPC, for example, the shared service VPC, configure `AWS Peering <http://docs.aviatrix.com/HowTos/peering.html#aws-peering>`_ or `Aviatrix Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ from the Controller console. 

Another note is Aviatrix GW runs on instances EIP, make sure you have sufficient quota for EIP. You can contact AWS support to request for more EIPs. 

.. |image1| image:: FAQ_media/image1.png

.. disqus::
