.. meta::
   :description: instructions on migrating from CSR to Aviatrix TGW
   :keywords: AWS Transit Gateway, TGW, CSR Migration

==============================================================
Migrating a CSR Transit to Aviatrix TGW Orchestrator
==============================================================

This document assumes that you have deployed a `CSR Transit solution <https://aws.amazon.com/answers/networking/aws-global-transit-network/>`_ with Transit hub CSR instances and VGWs 
in Spoke VPCs. The steps
below provide instructions to migrate a live CSR deployment to Aviatrix with TGW orchestrator.  

The objectives here are:

 - No change to any on-prem network.   
 - No change to the connectivity between AWS VGW and on-prem. (either over DX or over Internet or both)
 - Re-use AWS VGW deployed in Transit hub VPC.
 - No change to existing VPC infrastructure.
 - Minimum operation downtime.

.. Note::

  This document assumes you have already `launched an Aviatrix Controller <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

..

Before the migration process starts,  plan on what security domains you need to create and which security domains should connect other domains. If you are not sure and is in need to transition, no worries and 
proceed. The security domains can be added and modified at any time. 


1. **Launch a TGW** Follow `Step 1 <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_.

2. **Create Security Domains** If you have plans for custom security domains, follow `Step 2 <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-create-a-new-security-domain>`_ to create them. Follow `Step 3 <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-build-your-domain-connection-policies>`_ to build connection policies. If you do not intend to build custom security domains, skip this section. 

3. **Launch Aviatrix Transit GW** `Follow Step 1 and Step 2 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ to launch an Aviatrix Transit GW and enable HA in the Transit hub VPC. You can consider using a new Transit hub VPC in case the existing Transit hub VPC does not have enough IP addresses to launch new instances. (The Aviatrix Transit GW pair)

4. **Connect Aviatrix Transit GW to VGW** `Follow Step 3. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ At this point, VGW starts to advertise to Aviatrix Transit GW. Make sure you specify a different "AS" number for the BGP session of Aviatrix Transit GW connection to VGW. Also note that if Transit GW and VGW are in the same account and same VPC, VGW must be detached from the VPC. 

5. **Remove a Spoke VPC** Select one Spoke VPC that has VGW deployed. Remove the VPC Transit Network tag. This will effectively detach the Spoke VPC from the CSR Transit Network. Make sure the above Spoke VPC CIDR route entry has been removed from the Transit Network.  

6. **Attach Spoke VPC to TGW** Follow `Step 1 <https://docs.aviatrix.com/HowTos/tgw_build.html#attach-vpc-to-tgw>`_ to attach a VPC to the corresponding security domain. 


7. Repeat the above step 5 and step 6 for the remaining Spoke VPCs. 

8. **Remove Transit hub VGW CSR tag** After all Spoke VPCs have been migrated to Aviatrix Transit GW, remove the VGW Transit Network tag. This effectively detach VGW from CSR. 

The effective operation downtime for each Spoke VPC is the time between Transit Network tag  being removed for the Spoke VPC and the Spoke VPC being attached to Aviatrix Transit GW. It should be a few minutes. 


.. |image1| image:: FAQ_media/image1.png

.. disqus::
