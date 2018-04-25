.. meta::
   :description: Site2Cloud connection between Aviatrix Gateway and Cisco ASA
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, Cisco ASA


============================================
Site2Cloud (Aviatrix Gateway -- Cisco ASA)
============================================

This document describes how to build an IPSec tunnel based site2cloud connection between Aviatrix Gateway and Cisco ASA Firewall.

Network setup is as following:

**VPC-AVX (with Aviatrix Gateway)**

    *VPC CIDR: 10.0.0.0/16*
    
    *VPC Public Subnet CIDR: 10.0.1.0/24*
    
    *VPC Private Subnet CIDR: 10.0.2.0/24*

**On-Prem (with Cisco ASA Firewall)**

    *On-Prem Network CIDR: 10.10.0.0/16*
    
1. Create Site2Cloud Connection at Aviatrix Controller
======================================================

 1.1 Go to **Gateway->New Gateway** to launch an Aviatrix Gateway at the public subnet of VPC-AVX. Collect Gateway's public IP addresses (52.8.12.122 in this example).

 1.2 Go to **site2cloud** and click **Add New** to create a site2cloud connection.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC-AVX
  Connection Type                   Unmapped
  Connection Name                   Arbitrary (e.g. avx-asa-s2c)
  Remote Gateway Type               Generic
  Tunnel Type                       UDP
  Algorithms                        Uncheck this box
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Select Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of ASA WAN port (66.7.242.225 in this example)
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.10.0.0/16 (On-Prem Network CIDR)
  Local Subnet                      10.0.2.0/24 (VPC-AVX private subnet)
===============================     =================================================================

 1.3 Go to **site2cloud** page. From site2cloud connection table, select the connection created above (e.g. avx-asa-s2c). 
     - Select **Cisco** from **Vendor** drop down list 
     - Select **ASA 5500 Series** from **Platform** drop down list
     - Select the proper ASA Software versin from **Software** drop down list depending on your ASA running OS
     - Click **Download Configuration** button to download the ASA site2cloud configuration 
     - Save the configuration file as a reference for configuring your ASA
     
     The following is a ASA sample configuration

     .. note::

! Aviatrix Site2Cloud configuration template
! 
! You may need to populate these values throughout the config based on your setup:
! <outside_interface> - External interface of the ASA
! <outside_access_in> - Inbound ACL on the external interface
! <avx_vpn_map> - Outside crypto map
! 10.0.2.0/24  - Cloud network subnet(s).
! 10.10.0.0/16 - Local subnet(s).

! <sla_monitor_address> - Target address that is part of acl-avx to run SLA monitoring

! --------------------------------------------------------------------------------
! IPSec Tunnels
! --------------------------------------------------------------------------------
! #1: Internet Key Exchange (IKE) Configuration
!
! A policy is established for the supported ISAKMP encryption, 
! authentication, Diffie-Hellman, lifetime, and key parameters.
!
! Note that there are a global list of ISAKMP policies, each identified by 
! sequence number. This policy is defined as #201, which may conflict with
! an existing policy using the same or lower number depending on 
! the encryption type. If so, we recommend changing the sequence number to 
! avoid conflicts and overlap.
!
crypto isakmp identity address 
crypto ikev1 enable <outside_interface>
crypto ikev1 policy 201
  encryption aes-256 
  authentication pre-share
  group 2
  lifetime 28800
  hash sha
exit
!
! The tunnel group sets the Pre Shared Key used to authenticate the 
! tunnel endpoints.
!
tunnel-group 52.8.12.122 type ipsec-l2l
tunnel-group 52.8.12.122 ipsec-attributes
   ikev1 pre-shared-key aYanlwh8Ee9fmsIapTArwXWAfZwH4aTa0V9tGAdd
!
! This option enables IPSec Dead Peer Detection, which causes periodic
! messages to be sent to ensure a Security Association remains operational.
!
   isakmp keepalive threshold 10 retry 3
exit

! --------------------------------------------------------------------------------
! #2: Access List Configuration
!
! Access lists are configured to permit creation of tunnels and to send applicable traffic over them.
! This policy may need to be applied to an inbound ACL on the outside interface that is used to manage control-plane traffic. 
! This is to allow VPN traffic into the device from the Cloud network.
!
access-list <outside_access_in> extended permit ip host 52.8.12.122 host 66.7.242.225
access-group <outside_access_in> in interface <outside_interface>
! The following access list named acl-avx specifies all traffic that needs to be routed to the Cloud network. Traffic will
! be encrypted and transmitted through the tunnel to the Cloud network. Association with the IPSec security association
! is done through the "crypto map" command.
!
! This access list should contain static route(s) corresponding to your cloud subnet(s) and local subnet(s).
! See section #4 regarding how to restrict the traffic going over the tunnel
!
!
access-list acl-avx extended permit ip 10.10.0.0 255.255.0.0 10.0.2.0 255.255.255.0

!---------------------------------------------------------------------------------
! #3: IPSec Configuration
!
! The IPSec transform set defines the encryption, authentication, and IPSec
! mode parameters.
!
crypto ipsec ikev1 transform-set transform-avx esp-aes-256 esp-sha-hmac
! The crypto map references the IPSec transform set and further defines
! the Diffie-Hellman group and security association lifetime. The mapping is created
! as #1, which may conflict with an existing crypto map using the same
! number. If so, we recommend changing the mapping number to avoid conflicts.
!
crypto map <avx_vpn_map> 1 match address acl-avx
crypto map <avx_vpn_map> 1 set pfs group2
crypto map <avx_vpn_map> 1 set peer  52.8.12.122
crypto map <avx_vpn_map> 1 set ikev1 transform-set transform-avx
crypto map <avx_vpn_map> 1 set security-association lifetime seconds 3600

!
! Only set this if you do not already have an outside crypto map, and it is not applied:
!
crypto map <avx_vpn_map> interface <outside_interface>
!
! Additional parameters of the IPSec configuration are set here. Note that
! these parameters are global and therefore impact other IPSec
! associations.
!
! This option instructs the firewall to clear the "Don't Fragment"
! bit from packets that carry this bit and yet must be fragmented, enabling
! them to be fragmented.
!
crypto ipsec df-bit clear-df <outside_interface>
!
! This configures the gateway's window for accepting out of order
! IPSec packets. A larger window can be helpful if too many packets
! are dropped due to reordering while in transit between gateways.
!
crypto ipsec security-association replay window-size 128
!
! This option instructs the firewall to fragment the unencrypted packets
! (prior to encryption).
!
crypto ipsec fragmentation before-encryption <outside_interface>
!
! In order to keep the tunnel in an active or always up state, the ASA needs to send traffic to the subnet
! defined in acl-avx. SLA monitoring can be configured to send pings to a destination in the subnet and
! will keep the tunnel active. This traffic needs to be sent to a target that will return a response.
! This can be manually tested by sending a ping to the target from the ASA sourced from the outside interface.
! A possible destination for the ping is an instance within the Cloud network. For redundancy multiple SLA monitors 
! can be configured to several instances to protect against a single point of failure.
! 
! The monitor is created as #1, which may conflict with an existing monitor using the same
! number. If so, we recommend changing the sequence number to avoid conflicts.
!
sla monitor 1
   type echo protocol ipIcmpEcho <sla_monitor_address> interface <outside_interface>
   frequency 5
exit
sla monitor schedule 1 life forever start-time now
!
! The firewall must allow icmp packets to use "sla monitor" 
icmp permit any <outside_interface>

!---------------------------------------------------------------------------------------
! #4: VPN Filter
! The VPN Filter will restrict traffic that is permitted through the tunnels. By default all traffic is denied.
! The first entry provides an example to include traffic between your Cloud network Address space and your office.
! You may need to run 'clear crypto isakmp sa', in order for the filter to take effect.
!
access-list avx-filter extended permit ip 10.0.2.0 255.255.255.0 10.10.0.0 255.255.0.0
access-list avx-filter extended deny ip any any
group-policy filter internal
group-policy filter attributes
vpn-filter value avx-filter
tunnel-group 52.8.12.122 general-attributes
default-group-policy filter
exit

!---------------------------------------------------------------------------------------
! #5: NAT Exemption
! If you are performing NAT on the ASA you will have to add a nat exemption rule.
! This varies depending on how NAT is set up.  It should be configured along the lines of:
! object-group network objgrp-SrcNet
!  network-object 10.10.0.0 255.255.0.0
! object-group network objgrp-avx
!  network-object 10.0.2.0 255.255.255.0
! nat (inside,outside) 1 source static objgrp-SrcNet objgrp-SrcNet destination static objgrp-avx objgrp-avx
! If using version 8.2 or older, the entry would need to look something like this:
! nat (inside) 0 access-list acl-avx
! Or, the same rule in acl-avx should be included in an existing no nat ACL.
!
!---------------------------------------------------------------------------------------


2. Troubleshooting and Verifying at Aviatrix Controller
========================================================

 2.1 At Aviatrix Controller, go to **Site2Cloud** page. Verify the status of the site2cloud connection is up.

 2.2 At **Site2Cloud - Diagnostics** page, run various diagnostics commands.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  VPC-AVX (Aviatrix Gateway VPC) ID
  Connection                        Name of site2cloud connection created at Step 2
  Gateway                           Name of Aviatrix Gateway
  Action                            One of the supported diagnostics commands
===============================     =================================================================


For support, send email to support@aviatrix.com.

.. disqus::
