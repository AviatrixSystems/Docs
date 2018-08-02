.. meta::
   :description: Site2Cloud connection between Aviatrix Gateway and Cisco IOS devices
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, Cisco ASR, Cisco ISR, IOS


=================================================
Site2Cloud (Aviatrix Gateway -- Cisco IOS Router)
=================================================

This document describes how to build an IPSec tunnel based site2cloud connection between Aviatrix Gateway and Cisco IOS router.

Network setup is as following:

**VPC-AVX (with Aviatrix Gateway)**

    *VPC CIDR: 10.100.0.0/24*
    
**On-Prem (with Cisco IOS Router)**

    *On-Prem Network CIDR: 10.10.2.0/24*
    
1. Create Site2Cloud Connection at Aviatrix Controller
======================================================

 1.1 Go to **Gateway->New Gateway** to launch an Aviatrix Gateway at the public subnet of VPC-AVX. Collect Gateway's public IP addresses (52.4.65.172 in this example).

 1.2 Go to **site2cloud** page and click **Add New** to create a site2cloud connection.

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
  Primary Cloud Gateway             Select Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of IOS Router WAN port (52.9.196.2 in this example)
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.10.2.0/24 (On-Prem Network CIDR)
  Local Subnet                      10.100.0.0/24 (VPC-AVX CIDR)
===============================     =================================================================
 
 1.3 Go to **site2cloud** page. From site2cloud connection table, select the connection created above (e.g. avx-ios-s2c). 
     - Select **Generic** from **Vendor** drop down list 
     - Click **Download Configuration** button to download the **Generic** site2cloud configuration 
     - Save the configuration file as a reference for configuring your Cisco IOS router
     
     The following is a sample configuration based on the site2cloud configuration above.

     |image0|

2. Configure Cisco IOS Router
===============================

 2.1 Either ssh into the Cisco router or connect to it directly through its console port.

 2.2 Apply the following IOS configuration to your router:

     |image1| 

3. Troubleshooting and Verifying at Aviatrix Controller
========================================================

 3.1 At Aviatrix Controller, go to **Site2Cloud** page. Verify the status of the site2cloud connection is up.

     |image2|

 3.2 At **Site2Cloud - Diagnostics** page, run various diagnostics commands.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  VPC-AVX (Aviatrix Gateway VPC) ID
  Connection                        Name of site2cloud connection created at Step 2
  Gateway                           Name of Aviatrix Gateway
  Action                            One of the supported diagnostics commands
===============================     =================================================================


For support, send email to support@aviatrix.com.

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
