.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

=================================
 Public Subnet Protection  FAQ
=================================


What does Public Susbnets Protection do?
============================================

Public Subnet Protection, PSP, provides both Ingress and Egress security for AWS public subnets where
instances have public IP addresses. It includes two parts: Ingress protection via GuardDuty enforcement and Egress FQDN. 

Ingress protection via GuardDuty enforcement is a feature where Aviatrix Controller periodically polls 
the AWS GuardDuty findings and blocks the malicious source IP addresses from attacking the public subnet instances
by programming stateful firewall rules in the filtering gateway.  

Egress FQDN is the existing `FQDN feature <https://docs.aviatrix.com/HowTos/fqdn_faq.html>`_ applied to the public 
subnets. Previously this feature is only available to filter Egress traffic initiated from instances in the private subnets. 

How to deploy Public Subnet Protection?
------------------------------------------

Following the workflow below. 

1. Launch a filtering gateway 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Security -> Public Subnet -> Add New

===================       =================
Setting                   Value
===================       =================
Cloud Type                AWS
Gateway Name              Input a unique gateway name
Account Name              Select one Access Account
Region                    Select one AWS region
VPC ID                    Select one VPC in the region
Unused Subnet             Aviatrix Controller creates a public subnet and creates a route table associated with it to launch the filtering gateway
Gateway Size              Select an instance type
Route Table               Select a route table whose associated public subnets are protected.  
===================       =================

After the PSP gateway is launched, Ingress traffic from IGW is routed to the gateway in a pass through manner. 
Egress traffic from instances in the protected public subnets is routed to the gateway in a pass through manner. 

2. Enable GuardDuty Enforcement
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Security -> AWS GuardDuty, select an Access Account and AWS Region. Click Enable.

Once GuardDuty is enabled, malicious source IP addresses attacking instances in the public subnets in the region 
will be polled by the Controller. The Controller then programs rules into the filtering gateway to drop these packets.

Note if you enable AWS GuarDuty without launching the PSP gateway, GuardDuty does not have enforcement function.  

3. Enable Egress FQDN 
^^^^^^^^^^^^^^^^^^^^^^^^

Once the PSP gateway is launched, you enable configure FQDN function. 

Go to Security -> Egress Control, follow the instructions in `FQDN workflow <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

How do I Enable 2 AZ HA for FQDN gateways?
============================================

Go to Gateway page, highlight the gateway, and click Edit.

At "Gateway for High Availability Peering", select a public subnet in the drop down menu, click create. A backup gateway with the name extension -hagw will be created. Note that this takes a few minutes of time.

For FQDN function, the primary gateway and backup gateway load balance the
Internet bound traffic from different subnets based on a route table.


.. |egress_overview| image::  FQDN_Whitelists_Ref_Design_media/egress_overview.png
   :scale: 30%

.. |fqdn| image::  FQDN_Whitelists_Ref_Design_media/fqdn.png
   :scale: 50%

.. |fqdn-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-new-tag.png
   :scale: 50%

.. |fqdn-add-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-new-tag.png
   :scale: 50%

.. |fqdn-enable-edit| image::  FQDN_Whitelists_Ref_Design_media/fqdn-enable-edit.png
   :scale: 50%

.. |fqdn-add-domain-names| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-domain-names.png

.. |fqdn-attach-spoke1| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke1.png
   :scale: 50%

.. |fqdn-attach-spoke2| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke2.png
   :scale: 50%

.. |export| image::  FQDN_Whitelists_Ref_Design_media/export.png
   :scale: 50%

.. |fqdn_in_firenet| image:: firewall_network_workflow_media/fqdn_in_firenet.png
   :scale: 30%

.. add in the disqus tag

.. disqus::
