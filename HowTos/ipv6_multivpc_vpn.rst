


=========================================================================================
Use IPv6 for User VPN Access
=========================================================================================

The Problem
---------------------

If you need to give user VPN access to VPC/VNets but the VPC/VNets have overlapping CIDRs, currently there are two common solutions. 
One is to run a User VPN gateway in each VPC/VNet and have users to connect individually to a VPC/VNet. This approach makes managing user
VPN certificates difficult for both users and administrators if the number of VPC/VNets are large. Another approach is to use
NAT functions to translate the addresses between the overlapping CIDRs.

This document describes how to use IPv6 to support user VPN access to multi-VPC/VNets where the VPC/VNet CIDRs may overlap, as 
shown in the diagram below.

|ipv6_uservpn|


Prerequisite
--------------

Follow the instructions `here <https://docs.aviatrix.com/HowTos/ipv6_peering.html>`_ to created encrypted peering that tunnels 
IPv6 addresses. 

Launching an Aviatrix Gateway  
----------------------------------------------

#. Log in to the Controller. 
#. Go to Gateways > Add New to launch a gateway in one central VPC/VNet. 
#. Make sure you mark the **VPN Access** checkbox to enable user VPN function. 

Adding VPN Networks for Split Tunnel
------------------------------------------------

This step adds the VPC/VNet CIDRs of the peered VPC/VNet so that the VPN gateway can push routes to the VPN endpoint. 

#. Log in to the Controller. 
#. Go to OpenVPN > Edit Config> Modify Split Tunnel. 
#. Add a list of VPC/VNet IPv6 CIDRs in a comma-separated format, as shown below. 

|ipv6_vpncidr|  


Adding a VPN User
-----------------------------------

#, Log in to the Controller. 
#. Go to OpenVPN > VPN Users > Add New. 
#. Select the VPN gateway you launched above. Create a new user with email address. 

An email will be sent to the VPN user with instructions on how to download the VPN client and connect to VPN. 

Run the VPN client and you should be able to access virtual machine (EC2/GCE) instances using its IPv6 address.

Scaling out VPN Gateways
----------------------------------

You can repeat the steps under "Launching an Aviatrix Gateway" section above to launch more VPN gateways to scale out the performance. To learn more about user VPN, see 
`User VPN FAQ <https://docs.aviatrix.com/HowTos/openvpn_faq.html>`_.

Adding More VPC/VNets
--------------------------------

If you need to connect more VPC/VNets, make sure you build encrypted tunnel and repeat Step2 to add the new IPv6 network CIDRs to the 
VPN Network list. 

Troubleshooting Tips
---------------------------

If you experience VPN client connectivity issue, check the following:

  - Encrypted tunnel is up. 
  - Instance Security Group is configured with the correct inbound port open. 
  - If you have User Profile enabled, the profile has the correct policies.

For support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_.

.. |ipv6_uservpn| image:: ipv6_multivpc_vpn_media/ipv6_uservpn.png
   :scale: 30%


.. |ipv6_vpncidr| image:: ipv6_multivpc_vpn_media/ipv6_vpncidr.png
   :scale: 30%


.. disqus::
