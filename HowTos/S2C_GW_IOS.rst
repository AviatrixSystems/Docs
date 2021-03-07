.. meta::
   :description: Site2Cloud connection between Aviatrix Gateway and Cisco IOS devices
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, Cisco ASR, Cisco ISR, IOS


=================================================
Aviatrix Gateway to Cisco IOS Router
=================================================

This document describes how to build an IPSec tunnel based Site2Cloud connection between an Aviatrix Gateway and a Cisco IOS router.

The network setup is as follows:

**VPC-AVX (with Aviatrix Gateway)**

    *VPC CIDR: 10.100.0.0/24*
    
**On-Prem (with Cisco IOS Router)**

    *On-Prem Network CIDR: 10.10.2.0/24*
    
1. Create a Site2Cloud Connection at the Aviatrix Controller
======================================================

 1.1 Go to **Gateway->New Gateway** to launch an Aviatrix Gateway at the public subnet of VPC-AVX. Collect the Gateway's public IP addresses (52.4.65.172 in this example).

 1.2 Go to the **Site2Cloud** page and click **Add New** to create a Site2Cloud connection.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC-AVX
  Connection Type                   Unmapped
  Connection Name                   Arbitrary (e.g. avx-ios-s2c)
  Remote Gateway Type               Generic
  Tunnel Type                       UDP
  Algorithms                        Uncheck this box
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Select the Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of IOS Router WAN port (52.9.196.2 in this example)
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.10.2.0/24 (On-Prem Network CIDR)
  Local Subnet                      10.100.0.0/24 (VPC-AVX CIDR)
===============================     =================================================================
 
 1.3 Go to the **Site2Cloud** page. From the Site2Cloud connection table, select the connection created above (e.g. avx-ios-s2c). 
     - Select **Generic** from **Vendor** drop down list 
     - Click the **Download Configuration** button to download the **Generic** Site2Cloud configuration 
     - Save the configuration file as a reference for configuring your Cisco IOS router
     
     The following is a sample configuration based on the Site2Cloud configuration above.

     |image0|

2. Configure Cisco IOS Router
===============================



 2.1 Either ssh into the Cisco router or connect to it directly through its console port.

 2.2 Apply the following IOS configuration to your router:
     Please note that from version 5.0, we use the gateway's public ip address as the identier, so the "match identity address" should use the public ip as well

====================================================================
#be sure to use YOUR Aviatrix gateway PUBLIC IP here
#use your preshared key here
crypto keyring aviatrixkey  
  pre-shared-key address 54.189.176.52 key mypresharedkey

crypto isakmp policy 10
 encryption aes 256
 authentication pre-share
 group 2
 lifetime 28800

#This is dead peer detection 
crypto isakmp keepalive 10 3 periodic

#be sure to use the Aviatrix gateway PUBLIC IP here in identity address
crypto isakmp profile aviatrixprofile
   keyring aviatrixkey
   self-identity address
   match identity address 54.189.176.52 255.255.255.255 

crypto ipsec transform-set myset esp-aes 256 esp-sha-hmac 
 mode tunnel
crypto ipsec df-bit clear

#be sure to use the Aviatrix gateway PUBLIC IP here peer address
crypto map aviatrixmap 10 ipsec-isakmp 
 set peer 54.189.176.52
 set transform-set myset 
 set isakmp-profile aviatrixprofile
 match address myacl


#Apply the crypto map policy to the Interface

 interface GigabitEthernet1
 ip address dhcp
 ip nat outside
 negotiation auto
 crypto map aviatrixmap

    
 #be sure to include ALL your INTERESTING traffic here: 

 ip access-list extended myacl
 10 permit ip 192.168.0.0 0.0.0.255 10.200.0.0 0.0.255.255
 20 permit ip 192.168.0.0 0.0.0.255 10.100.0.0 0.0.255.255
 =============================================================
 
 
3. Troubleshooting and Verifying at the Aviatrix Controller
========================================================

 3.1 At the Aviatrix Controller, go to the **Site2Cloud** page. Verify that the status of the Site2Cloud connection is up.

     |image2|

 3.2 At the **Site2Cloud - Diagnostics** page, run various diagnostics commands.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  VPC-AVX (Aviatrix Gateway VPC) ID
  Connection                        Name of the Site2Cloud connection created at Step 2
  Gateway                           Name of the Aviatrix Gateway
  Action                            One of the supported diagnostics commands
===============================     =================================================================


For support, send an email to support@aviatrix.com.

.. |image0| image:: s2c_gw_ios_media/s2c_sample_config.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: s2c_gw_ios_media/s2c_ios.png
   :width: 5.55625in
   :height: 3.26548in

.. |image2| image:: s2c_gw_ios_media/s2c_page.PNG
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
