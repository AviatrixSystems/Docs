.. meta::
   :description: Encrypted Transitive Peering Ref Design
   :keywords: peering, encrypted peering, transitive peering, encrypted transitive, aviatrix

====================================
Encrypted Transitive Peering
====================================

As DevOps and applications are now run in AWS, it makes sense to have
your employees access cloud directly with the following highlighted
benefits:

-  Lower latency. Rather than having your employees connect via VPN to
   your corporate office first and then access the cloud, you can provide a
   cloud VPN where they can access AWS directly.

-  Better Security. Traditional VPN servers do not support modern multi
   factor authentication methods such as a combination of DUO Security,
   LDAP and OKTA.

-  Few hardware gears to manage.

However, your business may require hosting some critical applications in
wide spread co-locations. As a cloud infrastructure engineer, you need
to access these sites to check on the health of your servers and
applications. The challenge is to set up a system to enable secure
accessing abilities to both the cloud and co-locations.

Solution
========

Our solution is to leverage Aviatrix’s encrypted peering and encrypted
transitive peering capabilities to set up an end to end secure network.

In this example, a datacenter or co-location hosts some critical
customer facing applications. It connects to an AWS VPC for additional
processing, such as data analytics. The data center connects to an AWS
VGW with an IPSEC tunnel. Employees and developers access VPC-1 and VPC-2
directly via Aviatrix CloudVPN and encrypted peering configuration. The
cloud infrastructure engineers need to access the servers in the
datacenter or co-location for maintenance and monitoring purposes. They
do so via an Aviatrix encrypted tunnel and Aviatrix encrypted transitive
tunnel configuration. The solution diagram is shown below.

|image0|

Configuration Workflow
======================

Before you start, make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

We assume here that you have created a management VPC-main
172.31.0.0/16, its corresponding VPN gateways with ELB enabled. For more
information for this part of configuration, check out this `reference
design <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Networking+Reference+Design.pdf>`__.
If you configure split tunnel mode for VPN gateways, make sure to
include the co-location CIDRs in the additional CIDR field.

The encrypted transitive peering configuration workflow is as follows,
with major steps highlighted.

1. Create a gateway in VPC-2

   Go to Gateway -> New Gateway, make sure

   a. The gateway has NAT enabled, VPN disabled (as you don’t need to
      enable VPN capability)

2. Create an encrypted peering between VPC-main and VPC-2

   Go to Peering -> Encrypted Peering -> New Peering, make sure:

	a. At VPC Name 1's drop down menu, select the peering gateway launched in
	   VPC-main (note, this peering gateway is different from the VPN
	   gateway).

	b. At VPC Name 2's drop down menu, select the gateway launched in VPC-2.

	c. Click Add.

2. Create an encrypted transitive peering

   Go to Peering -> Transitive Peering -> New Peering, make sure:

	a. At the Source VPC drop down menu, select the peering gateway launched in
	   VPC-main (the same VPC gateway selected in the previous step)

	b. At Next Hop VPC drop down menu, select the gateway launched in VPC-2
	   (the same gateway for VPC-2 selected in the previous step)

	c. At Destination CIDR, fill in the destination CIDR of the co-location.
	   For example, 10.12.0.0/24. Note this address should be unique across
	   your network.

3. Repeat step 3 above for more co-locations.

4. For support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_.

5. For feature requests and feedback, click Make a wish at the bottom of
   each page.

6. Enjoy!

.. |image0| image:: TransitivePeering_media/EncryptedTransitivePeering_reference.png

.. disqus::
