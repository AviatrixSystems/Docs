.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


=================================
 Egress FQDN FAQ 
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

Starting from release 3.4, Aviatrix FQDN Whitelisting filters on any TCP and UDP traffic 
including HTTP, HTTPS and SFTP traffic and allows 
only the destination host
names (whitelist) specified in the list to pass and drop all other
destinations. Each host name is specified as fully qualified domain
name. For example, if you only allow Internet bound traffic to
`www.salesforce.com <http://www.salesforce.com>`__, you can list the
domain name in the whitelist. 

For HTTP/HTTPS (TCP port 80/443), FQDN feature also supports wild card, such as \*. In
this example, you can specify \*.salesforce.com to allow traffic to any
domain names that ends salesforce.com.

Note the gateway must have NAT enabled if you want to turn on FQDN
whitelists.

How does it work?
=================

This features works for HTTP and HTTPS traffic to public Internet. The function is carried out inline
without requiring any certificate or keys to decrypt the traffic.

Starting from release 3.4, non HTTP/HTTPS traffic can also be filtered based on domain names. Use cases are secure file transfer (SFTP) to external sites, secure login in (SSH) to external sites. 

A tag is defined as a list of FQDNs and it is created and managed on the Controller 
console. One or more gateways is attached to
a tag. Each gateway can be attached to one tag. Any updates to a tag on the Controller automatically triggers updates to all
gateways attached to the tag. 

Multiple tags can be defined for the
controller. The domains in the tag are the destinations that are allowed
for traffic to pass.


How to Troubleshoot FQDN Problems
===================================

If you have problems with FQDN on a specific gateway, follow the instructions below to troubleshoot:

 1. Make sure the gateway has NAT function enabled. 
 #. Make sure the corresponding AWS or Azure route table has the route entry 0.0.0.0/0 points to the gateway instance.
 #. To verify the above two steps are setup properly, disable FQDN function of the problem gateway by detaching it from the associated tag, and run a ping test to www.yahoo.com, to make sure Internet egress works. 
 #. Attach the problem gateway to the tag. Make sure the tag has Enabled button on. Make sure the Whitelist or Blacklist is selected as intended. 
 #. Check the tag to make sure it has the intended URL configured. 
 #. Run a "wget" test from a private instance in the VPC to an URL configured in the tag. 
 #. Use "Step 4" at Egress FQDN View Log, select the problem gateway and download the log. Review the log file and analyze if the intended URL is in the log entry, why it is being accepted or denied. 
 #. Note if a tag has "White list" option selected, all URL in the tag will be accepted. On the other hand, if a tag has a "Black list" option selected, all URL in the tag will be dropped. 
 #. If none of the above works, try Disable and Enable the tag again. This will restart the FQDN function on all attached gateways. 
 #. If all above steps failed, get help from aviatrix support team and upload `tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_. 

How to Enable HA for FQDN gateways?
===================================

Go to Gateway page, highlight the gateway, click Edit. 

At "Gateway for High Availability Peering", select a public subnet in the drop down menu, click create. A backup gateway with the name extension -hagw will be created. Note this takes a few minutes of time. 

For FQDN function, the primary gateway and backup gateway load balance the 
Internet bound traffic from different subnets based on route table. 

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

.. |fqdn-attach-spoke1| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke1.png
   :scale: 50%

.. |fqdn-attach-spoke2| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke2.png
   :scale: 50%

.. |export| image::  FQDN_Whitelists_Ref_Design_media/export.png
   :scale: 50%

.. add in the disqus tag

.. disqus::
