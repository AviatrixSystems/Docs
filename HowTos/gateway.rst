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

When this option is selected, Aviatrix gateway is used for SSL VPN termination. It supports OpenVPN® client and Aviatrix SAML client. For more details, check out `this link. <http://docs.aviatrix.com/HowTos/openvpn_features.html>`_ 

Enable SAML
===================

When SAML is enabled, a VPN client/user authenticates to an identify provider 
(IDP) directly, instead of gateway doing it on behalf of the user. 

In this case, you must use Aviatrix VPN Clients. 

Check out the `details <http://docs.aviatrix.com/HowTos/VPN_SAML.html>`_  on how to configure and use Aviatrix VPN Clients for SAML.

VPN CIDR Block
===============

When a VPN user connects to the VPN gateway, the user will be assigned a virtual 
IP address from a pool of IP addresses. 
This pool of IP address is defined as VPN CIDR Block. 
The default IP address pool is 192.168.43.0/24. 


The only reason you would want to change this address pool is if 192.168.43.0/24 
overlaps with your desktop or laptop network address range. For example, if you are on a LAN with a network CIDR 10.0.0.0/24, your desktop IP address will never conflict 
with your VPN virtual IP address. On the other hand, if your desktop is on a LAN with a network CIDR 192.168.20.0/16, your VPN virtual IP address might conflict with your LAN address. In this case, change the VPN CIDR Block to a different address range, 
for example, 10.10.0.0/24.

MFA Authentication
=====================

You can select either Duo or Okta for the VPN gateway to authenticate to these 
two services on behalf of a VPN user. 

In this case, you can use OpenVPN® clients such as Tunnelblick for iOS and OpenVPN for windows. 

For how to configure Duo, check out `How to configure Duo. <http://docs.aviatrix.com/HowTos/duo_auth.html>`_

For how to configure Okta, check out `How to configure Okta. <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`_ 


Max Connections
=================

Maximum number of active VPN users allowed to be connected to this gateway. The defalt is 100. 

When you change this address, make sure the number is smaller than the VPN CIDR Block. 
OpenVPN® VPN CIDR Block allocates 2 IP addresses for each connected VPN user. 
So when the VPN CIDR Block is a /24 network, it supports about 120 users. 

Split Tunnel Mode
==================

Split Tunnel Mode is enabled by default. When Split Tunnel mode is enabled, only 
traffic that is destined to the VPC/VNet CIDR where the VPN gateway is 
deployed is going into the VPN tunnel when a user is 
connected to the VPN gateway. 

When Split Tunnel Mode is disabled (Full Tunnel Mode), all laptop traffic, 
including Internet traffic (such as a visit to www.google.com), 
is going through the VPN tunnel when a user is connected to the VPN gateway. 

Disabling Split Tunnel Mode should be a deliberate decision as you will be 
charged all Internet traffic as they are considered egress trafifc by 
the cloud provider (AWS/Azure/GCP).


Additional CIDRs
==================

This is an optional parameter. Leave it blank if you do not need it.

When Split Tunnel Mode is enabled, the Additional CIDRs specifies a list of 
destination CIDR ranges that will also go through the VPN tunnel. 
This is a useful field when you have `multiple VPCs <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_ that the VPN user needs to access.

Nameservers
=============

This is an optional parameter. Leave it blank if you do not need it. 

When Split Tunnel Mode is enabled, you can instruct the VPN gateway to push down
a list of DNS servers to your desktop, so that a VPN user is connected, it will
use these DNS servers to resolve domain names. 

Search Domains
=================

This is an optional parameter. Leave it blank if you do not need it. 

When Split Tunnel Mode is enabled, Seach Domains let you specify a list of 
domain names that will use the Nameserver when a specific name is 
in the destination.
domain names

Enable ELB
============

Enable ELB is turned on by default. 

When ELB is enabled, the domain name of the cloud provider's 
load balancer such as AWS ELB will be the connection IP address when a 
VPN user connects to the VPN gateway. This connection IP address is part of
the .ovpn cert file the Controller send to the VPN client. Even when you 
delete all VPN gateways, you can re-launch them without having to reissue 
new .ovpn cert file. This helps reduce friction to VPN users.  

When ELB is enabled, you can launch multiple VPN gateways behind ELB, thus
achiving a scale out VPN solution. Note since AWS ELB only supports TCP for 
load balancing, VPN gateways with ELB enabled run on TCP. 

ELB Name
==========

This is an optional parameter. Leave it blank if you do no need it. 

The ELB Name is used for GCP only. 

Enable Client Certificate Sharing
==================================

This is disabled by default. 

By enabling the client certificate sharing, all VPN users share one .ovpn file. You must have MFA (such as DUO + LDAP) configured to make VPN access secure. 


Enable Policy Based Routing (PBR)
=====================================

PBR enables you to route VPN traffic to a different subnet with its default
gateway. 

By default, all VPN traffic is NATed and send to VPN gateway's eth0 interface. 
If you want to force the VPN traffic to go out on a different subnet other than 
VPN gateway eth0 subnet, you can specify a PBR Subnet in the VPC and the 
PBR Default gateway. 

One use case for this feature is `Anonymous Internet Surfing <http://docs.aviatrix.com/HowTos/Anonymous_Browsing.html>`_.

Enable LDAP
============

When LDAP authentication is enabled, the VPN gateway will act as a LDAP client 
on behalf of the VPN user to authenticate the VPN user to the LDAP server. 

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

This feature allows you to enforce that no unauthorized EC2 instances being launched on the 
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

Gateway status
--------------
Gateway status is dictated by the following factors.

1. State of the gateway as reported by the cloud provider.
2. Connectivity between Controller and gateway over HTTPS (TCP port 443).
3. Status of critial services running on the gateway.

An Aviatrix Gateway could be in any of the following states over its lifetime.

**WAITING**: This is the initial state of a gateway immediately after the launch. Gateway will transition to **UP** state when controller starts receiving keepalive messages from the newly launched gateway. If a gateway is stuck in this state, examine security policy of the Aviatrix Controller instance and make sure TCP port 443 is opened to traffic originating from gateway public IP address.

**UP**: Gateway is fully functional. All critical services running on the gateway are up and gateway and controller are able to exchange messages with each other.

**DOWN**: A gateway can be down under the following circumstances.

1. Gateway and controller could not communicate with each other over HTTPS(443).


Gateway keepalives 
------------------
As mentioned in the previous section, gateway sends periodic keepalive messages to the Controller. The following templates can be used to control how frequenly
gateways send keepalives and how often controller processes these message, which in turn will determine how quickly controller can detect gateway state changes.

===========================      =======================   =============================
**Template name**                Gateway sends keepalive   Controller runs health checks
===========================      =======================   =============================
Fast                             every 3 seconds           every 15 seconds
Medium                           every 12 seconds          every 1 minute
Slow                             every 1 minute            every 5 minute
===========================      =======================   =============================


Medium is the default configuration. 

A gateway is considered to be in UP state if controller receives atleast 2 (out of a possible 5) messages from that gateway between two consecutive health checks.

For example, with medium setting, gateway down detection time, on average, is 1 minute.

The keep alive template is a global configuration on the Controller for all gateways. To change the keep alive template, go to

::

  Settings -> Advanced -> Keepalive.

In the drop down menu, select the desired template. 

OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
