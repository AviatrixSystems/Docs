.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


=================================
 FQDN Whitelists
=================================



Why is FQDN Whitelists feature needed?
========================================

Aviatrix Security Policy feature is enabled at a gateway for a stateful
firewall filter at layer 4 level. You specify an action for each rule,
allow or deny, for each packet as it passes through the gateway. The
rules are based on network, IP addresses, protocol and ports. This
feature is useful to firewalling different private networks.

For Internet bound egress traffic, specifying at IP address level is not
sufficient as the domain names of a site can be translated to many
different IP addresses. The egress filtering needs to happen at Layer 7. 

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

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message (New!) appears, click New! To upgrade to
the latest software.

.. important::

  The VPC you want to apply FQDN filter must have an `Aviatrix gateway launched <http://docs.aviatrix.com/HowTos/gateway.html>`_ with `NAT enabled <http://docs.aviatrix.com/HowTos/gateway.html#enable-nat>`_. 

::

 1. To configure, go to Security -> FQDN Filter

 2. Create a tag with a name. Click Enable.

 3. Edit the tag by adding FQDN hostname part of URLs (e.g.
   www.aviatrix.com, or \*.google.com).

 4. Attach Gateway. One or more gateways can be attached to a tag.

 5. Note: Step 2, 3 and 4 can be done first without enabling the tag.
   Once the tag is enabled, HTTP and HTTPS traffic to these FQDN will be
   allowed, and any destination outside the FQDN will be denied.


For support, send email to support@aviatrix.com

Enjoy!

.. |image0| image::  FQDN_media/image1.png
   :width: 3.5in
   :height: 0.5in


.. add in the disqus tag

.. disqus::
