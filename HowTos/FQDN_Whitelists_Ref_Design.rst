.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix


=================================
 FQDN Whitelists Reference Design
=================================



What is the FQDN Whitelists Feature?
====================================

Aviatrix Security Policy feature is enabled at a gateway for a stateful
firewall filter at layer 4 level. You specify an action for each rule,
allow or deny, for each packet as it passes through the gateway. The
rules are based on network, IP addresses, protocol and ports. This
feature is useful to firewalling different private networks.

For Internet bound traffic, specifying at IP address level is not
sufficient as often the domain names of a site can be translated to many
different IP address. Aviatrix Fully Qualified Domain Name (FQDN)
Whitelisting is a security feature for Internet bound (Public IP
addresses) egress traffic initiated from private instances in a VPC. It
filters on HTTP and HTTPS traffic and allows only the destination host
names (whitelist) specified in the list to pass and drop all other
destinations. Each host name is specified as fully qualified domain
name. For example, if you only allow Internet bound traffic to
`www.salesforce.com <http://www.salesforce.com>`__, you can list the
domain name in the whitelist. It also supports wild card, such as \*. In
this example, you can specify \*.salesforce.com to allow traffic to any
domain names that ends salesforce.com.

This feature is useful to prevent application outbound traffic leakage
to unwanted sites. Applications often need to make outbound API calls to
other services. Since these services have known domain names, with FQDN
whitelists feature, you can make sure only Internet bound traffic to
these services are allowed.

Note the gateway must have NAT enabled if you want to turn on FQDN
whitelists.

How does it work?
=================

This features works for HTTP and HTTPS traffic on public IP addresses.

A tag is defined as a list of FQDNs. One or more gateways is attached to
a tag. Any updates to a tag automatically triggers updates to all
gateways attached to the tag. Multiple tags can be defined o the
controller. The domains in the tag are the destinations that are allowed
for traffic to pass.

Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message (New!) appears, click New! To upgrade to
the latest software.

We assume you are familiar with Aviatrix solution. If you need help,
check out this `reference
design <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Networking+Reference+Design.pdf>`__.

1. To configure, go to "Advanced Config" -> "FQDN Filter".

2. Create a tag with a name. Click Enable.

3. Edit the tag by adding FQDN hostname part of URLs (e.g.
   www.aviatrix.com, or \*.google.com).

4. Attach Gateway. One or more gateways can be attached to a tag.

5. Note: Step 2, 3 and 4 can be done first without enabling the tag.
   Once the tag is enabled, HTTP and HTTPS traffic to these FQDN will be
   allowed, and any destination outside the FQDN will be denied.

6. For support, send email to support@aviatrix.com

7. Enjoy!

.. |image0| image::  FQDN_media/image1.png
   :width: 3.5in
   :height: 0.5in
