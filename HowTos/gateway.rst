.. meta::
   :description: launch a gateway and edit it
   :keywords: security policies, Aviatrix, AWS VPC, stateful firewall, UCX, controller, gateway

###################################
Gateway
###################################


Launch a gateway
-----------------

Click Gateway at navigation panel. Click New to launch a gateway. To launch a gateway with OpenVPN® capability, refer to `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`__


Select Gateway Size
-------------------

When selecting the Gateway Size, note the following guidelines of IPSEC performance 
based on iperf tests conducted between two gateways of the same size:

-  t2 series throughput is not guaranteed; it can burst up to 130mbps.
-  m3 series are in the range 300 - 500mbps
-  m4.xlarge or c4.xlarge: approximately 500mbps
-  c3.2xlarge or m4.2xlarge: approximately 1Gbps
-  c3.4xlarge: approximately 1.2Gbps
-  c4.2xlarge or c5.2xlarge: 1.2Gbps - 1.5Gbps

if you need IPSEC performance beyond 1.2Gbps, refer to `Cluster Peering. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

Specify a Reachable DNS Server IP Address
------------------------------------------

Aviatrix gateway is launched with a default public DNS server IP address 8.8.8.8 to 
make sure the 
gateway has access to AWS public resources such as SQS for Controller and gateway communication. If you want to change to a different DNS server, select the box for "Specify a Reachable DNS Server IP Address" to enter an alternative DNS IP address. 

Enable NAT
-------------

Aviatrix gateway performs NAT function when this option is selected. 

Allocate NEW EIP
-----------------

When this option is selected, Aviatrix gateway allocates a new EIP for the gateway from AWS. When this option is unchecked, the gateway select one allocated but unassociated EIP from the AWS account from which the gateway is launched. 

VPN Access
-------------

When this option is selected, Aviatrix gateway is used for SSL VPN termination. It supports OpenVPN® client and Aviatrix client. For more details, check out `this link. <http://docs.aviatrix.com/HowTos/openvpn_features.html>`_ 

Add/Edit Tags
---------------

Aviatrix gateway is launched with a default tag name avx-gateway@private-ip-address-of-the-gateway. This option allows you to add additional AWS tags at gateway launch time that you 
can use for automation scripts.  

Designated Gateway
--------------------

If a gateway is launched with Designated Gateway enabled, the Aviatrix Controller programs 
the RFC1918 address ranges in the route table to point to the gateway instance. 
These routing entries are 
10.0.0.0/8, 192.168.0.0/16 and 172.16.0.0/12. The Controller will not add additional 
route entries that is within this RFC1918 range when configuring Transit VPC, site2cloud or encrypted peering. However, if the address range is outside the RFC1918
the Controller will add these routes to point to the gateway.  

Security Policy
--------------------

Starting Release 3.0, gateway security policy page has been moved Security -> Stateful Firewall. Check out `this guide. <http://docs.aviatrix.com/HowTos/tag_firewall.html>`_


High Availability
-------------------

There are two types of high availability on Aviatrix: "Gateway for High Availability" and "Gateway for High Availability Peering". 


"Gateway for High Availability Peering" is used for "Enable HA" field at Encrypted Peering configuration. 

"Gateway for High Availability" is used when you need HA for a Transitive Peering. 

Gateway Resize 
---------------

You can change Gateway Size if need to change gateway throughput. The gateway will restart with a different instance size.

NAT
----

You can enable and disable NAT function after a gateway is launched. 
NAT function enables instances on private subnet to access Internet. 
When NAT is enabled, all route tables for private subnets in the VPC 
are programmed with an route entry that points the gateway as the 
target for route entry 0.0.0.0/0. 


Monitor Gateway Subnet
-----------------------

This feature allows you to enforce that no unauthorized EC2 instances being luanched on the 
gateway subnet. Since an Aviatrix gateway must be launched on a public subnet, if you have policies that no
EC2 instances can be launched on public subnets, this feature addresses that concern. 

When it is enabled, the Controller monitors periodically on the selected subnet where 
gateway is launched from. If it detects EC2 instances being launched, the Controller sends an alert email
to admin and immediately stops the instance(s).

You can exclude certain instances by entering instance IDs separated by comma. 

To configure, go to Gateway page, highlight a gateway, click Edit. 
Scroll down to `Monitor Gateway Subnet`. 
Click `Enable` and then optionally enter excluding instance ID(s). Click OK when finished. 

Click `Disable` to remove all excluding instance ID(s).


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
