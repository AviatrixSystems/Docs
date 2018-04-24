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

 1.1 At Aviatrix Controller, go to **Gateway->New Gateway** to launch an Aviatrix Gateway at the public subnet of VPC-AVX. Collect both public and private IP addresses of the Gateway.

 1.2 At Aviatrix Controller, go to **site2cloud** and click **Add New** to create a site2cloud connection:

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
  Remote Gateway IP Address         Public IP of CheckPoint-VM WAN port
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.10.0.0/16 (On-Prem Network CIDR)
  Local Subnet                      10.0.2.0/24 (VPC-AVX private subnet)
===============================     =================================================================

 1.3 At Aviatrix Controller, go to **site2cloud** page. From site2cloud connection table, select the connection created above (e.g. avx-asa-s2c). 
     - Select **Cisco** from **Vendor** drop down list 
     - Select **ASA 5500 Series** from **Platform** drop down list
     - Select the proper ASA Software versin from **Software** drop down list depending on your ASA running OS
     - Click **Download Configuration** button to download the ASA site2cloud configuration 
     - Save the configuration file for configuring your ASA

2. Troubleshooting and Verifying at Aviatrix Controller
========================================================

 2.1 At Aviatrix Controller, go to **Site2Cloud** page. Verify the status of the site2cloud connection is up.

 10.2 At **Site2Cloud - Diagnostics** page, run various diagnostics commands.

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
