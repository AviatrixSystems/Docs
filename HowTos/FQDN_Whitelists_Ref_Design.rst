.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


=================================
 Egress Control Filter 
=================================



Why is egress control filter needed?
========================================

|fqdn|

For Internet bound egress traffic, specifying outbound policy at IP address level is not
sufficient as the domain names of a site can be translated to many
different IP addresses. 

AWS NAT gateway does not offer security group function, 
it relies on security groups by each instance.  AWS NAT instance's security group does not have enough entries to support the large set of IP address list. The egress filtering needs to happen at Layer 7. 

On the other hand, workloads in AWS are mostly applications where it is deterministic which 
outbound APIs the application program calls. For example, the application runs API queries to
www.salesforce.com for data retrieving; the application also runs API queries to www.google.com for app authentication. In these cases, making sure only these sites are allowed for egress 
traffic is sufficient from security point of view. Note this is very different from on-prem situation where end user traffic and application traffic are mingled together, you may need a full fledged firewall for Internet bound traffic.

What does Aviatrix FQDN feature do?
========================================

Aviatrix Fully Qualified Domain Name (FQDN)
Whitelisting is a security feature specially designed for workloads in public cloud. It filters Internet bound egress traffic initiated from workloads in a VPC.

Aviatrix FQDN Whitelisting filters on HTTP and HTTPS traffic and allows 
only the destination host
names (whitelist) specified in the list to pass and drop all other
destinations. Each host name is specified as fully qualified domain
name. For example, if you only allow Internet bound traffic to
`www.salesforce.com <http://www.salesforce.com>`__, you can list the
domain name in the whitelist. It also supports wild card, such as \*. In
this example, you can specify \*.salesforce.com to allow traffic to any
domain names that ends salesforce.com.

Note the gateway must have NAT enabled if you want to turn on FQDN
whitelists.

How does it work?
=================

This features works for HTTP and HTTPS traffic to public Internet. The function is carried out inline
without requiring any certificate or keys to decrypt the traffic.

A tag is defined as a list of FQDNs and it is created and managed on the Controller 
console. One or more gateways is attached to
a tag. Each gateway can be attached to one tag. Any updates to a tag on the Controller automatically triggers updates to all
gateways attached to the tag. 

Multiple tags can be defined for the
controller. The domains in the tag are the destinations that are allowed
for traffic to pass.

Configuration Workflow
======================

.. important::

 The VPC you want to apply FQDN filter must have an `Aviatrix gateway launched <http://docs.aviatrix.com/HowTos/gateway.html>`_ with `NAT enabled <http://docs.aviatrix.com/HowTos/gateway.html#enable-nat>`_ before starting the following steps. 

Step 1. Add a new tag
---------------------

Go Security -> FQDN, click New Tag, as shown below:

|fqdn-new-tag|

Click "+New Tag", and enter a name for the tag, for example, prod-whitelist, as shown below:

|fqdn-add-new-tag| 

Step 2. Add URL list to the new tag
-----------------------------------

Enable the new tag and click Edit, as shown below:

|fqdn-enable-edit|

Click "+Add New" to add each URL, wild card is allowed, as shown below:

|fqdn-add-domain-names|

Step 3. Attach to gateways
---------------------------

Click "Attach Gateway" to attach a gateway to the tag. 

When a gateway is attached to a tag, in the tag will be pushed for 
enforcement (whitelist or blacklist), as shown below. 

|fqdn-attach-spoke1|

Repeat Step 3 if you have more gateways that should be attached to this tag. 

|fqdn-attach-spoke2|

Add more tags
-------------

Repeat from Step 1 to create more tags and attach different gateways. 
Note each gateway can only be attached to one tag. 

Exception Rule
===============

Exception rule is a system wide mode. 

When Exception Rule is enabled, packets passing through the gateway without SNI field are 
allowed to pass. This usually happens when an application uses hard coded destination 
IP address for HTTPS connection instead of domain names. This could be a security loop hole.

When Exception Rule is disabled, packets passing through the gateway without SNI field 
are dropped unless the specific destination IP address of the 
packet is listed in the Whitelist. The use case could be certain old application uses 
hard coded destination IP address to access outside services.  


For support, send email to support@aviatrix.com

Enjoy!

.. |fqdn| image::  FQDN_Whitelists_Ref_Design_media/fqdn.png
   :scale: 50%

.. |fqdn-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-new-tag.png
   :scale: 50%

.. |fqdn-add-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-new-tag.png
   :scale: 50%

.. |fqdn-enable-edit| image::  FQDN_Whitelists_Ref_Design_media/fqdn-enable-edit.png
   :scale: 50%

.. |fqdn-add-domain-names| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-domain-names.png
   :scale: 50%

.. |fqdn-attach-spoke1| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke1.png
   :scale: 50%

.. |fqdn-attach-spoke2| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke2.png
   :scale: 50%


.. add in the disqus tag

.. disqus::
