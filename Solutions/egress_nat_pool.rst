.. meta::
  :description: How to setup egress NAT to a pool of IP addresses
  :keywords: Egress Control, AWS NAT Gateway,  AWS Global Transit Network, Encrypted Peering, Transitive Peering, AWS VPC Peering, VPN


=================================================================
How to Setup Egress NAT to a Pool of IP Addresses
=================================================================

Aviatrix supports NAT function where the gateway replaces a packet's source IP address with 
the gateway's source IP address. When forwarded packets leave the gateway, the source IP address is always the address of the gateway. 

This document describes how to translate the source IP address of forwarded packets to a 
pool of IP addresses of the Aviatrix gateway by using secondary IP address properties of the 
gateway instance.  

Follow the steps below to setup.

Step 1. Setup Secondary IP addresses
-------------------------------------

Go to Gateway page, click on the gateway you wish to configure. Click Edit. 

Scroll down to "Edit Secondary IP", enter one or more secondary IP addresses to the gateway. You must enter them in a segment format. 

Example 1: 172.32.0.201-172.32.0.201 

Example 2: 192.168.8.10-192.168.8.16

|edit-secondary-ip|

Note the number of secondary IP addresses are `limited <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html#AvailableIpPerENI>`_ to the gateway instance size. 

For example, if the gateway instance size is t2.micro, it can support only one secondary IP address. 

Step 2. Enable SNAT
--------------------

Continue on the Edit page, scroll to SNAT. Select `Secondary IP`.

This will enable the gateway with NAT function that can translate to the secondary IP addresses specified in the previous step. 

Step 3. Associate EIPs
-----------------------

Go to AWS Console, Services -> EC2 -> Elastic IPs -> Allocate new address. 

Select the new EIP, Actions -> Associate address -> Instance (for Resource type) -> select the gateway instance that has been allocated secondary IPs -> select one private IP. 

Repeat the above steps for all secondary IP addresses. 

Done.

(Optional) Step 4. Map Destination Port
-----------------------------------------

If you also like to map the destination port pre routing, you can use DNAT at the Edit Gateway page to config. 

 1. Enter the fields 
 #. Click Save
 #. Click Update

as shown below.

|edit-dnat|



.. |edit-secondary-ip| image:: egress_nat_pool_media/edit-secondary-ip.png
   :scale: 30%

.. |edit-dnat| image:: egress_nat_pool_media/edit-dnat.png
   :scale: 30%


.. disqus::
