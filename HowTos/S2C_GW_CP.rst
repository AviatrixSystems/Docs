.. meta::
   :description: Site2Cloud connection between Aviatrix Gateway and Check Point
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, Check Point


============================================
Aviatrix Gateway to Check Point(R77.30)
============================================

This document describes how to build an IPSec tunnel based site2cloud connection between Aviatrix Gateway and Check Point Firewall. To simulate an on-prem Check Point Firewall, we use a Check Point CloudGuard IaaS firewall VM at AWS VPC.

Network setup is as following:

**VPC1 (with Aviatrix Gateway)**

    *VPC1 CIDR: 10.0.0.0/16*
    
    *VPC1 Public Subnet CIDR: 10.0.1.0/24*
    
    *VPC1 Private Subnet CIDR: 10.0.2.0/24*

**VPC2 (with Check Point Security Gateway)**

    *VPC2 CIDR: 10.10.0.0/16*
    
    *VPC2 Public Subnet CIDR: 10.10.0.0/24*
    
    *VPC2 Private Subnet CIDR: 10.10.1.0/24*

1. Launch Check Point Security Gateway VM
=========================================

Refer to the `vSEC Gateway for Amazon Web Services Getting Started Guide <http://supportcontent.checkpoint.com/documentation_download?ID=45816>`_ to launch a  CheckPoint VM with at least two network interfaces. One interface serves as a WAN port and is in VPC2's public subnet. The other interface serves as a LAN port and is in VPC2's private subnet. Collect the public IP address of the WAN port.

2. Create Site2Cloud Connection at Aviatrix Controller
======================================================

 2.1 Go to **Gateway->New Gateway** to launch an Aviatrix Gateway at VPC1's public subnet. Collect both public and private IP addresses of the Gateway.

 2.2 Go to **site2cloud** and click **Add New** to create a site2cloud connection:

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC1
  Connection Type                   Unmapped
  Connection Name                   Arbitrary (e.g. avx-cp-s2c)
  Remote Gateway Type               Generic
  Tunnel Type                       UDP
  Algorithms                        Uncheck this box
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Select Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of CheckPoint-VM WAN port
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.10.1.0/24 (VPC2 private subnet)
  Local Subnet                      10.0.2.0/24 (VPC1 private subnet)
===============================     =================================================================

 2.3 Go to the **site2cloud** page. From the site2cloud connection table, select the connection created above (e.g. avx-cp-s2c). Select **Generic** from **Vendor** drop down list and click the **Download Configuration** button to download the site2cloud configuration. Save the configuration file for configuring CheckPoint-VM.

3. Download and Install SmartConsole
====================================

 3.1 Using a browser, connect to the Gaia Portal of the CheckPoint-VM at https://CheckPoint-VM_Public-IP:
  
 3.2 Click **Overview** at the left navigation bar, click **Download Now!** to download SmartConsole.

|image0|

 3.3 Install SmartConsole at your local machine and launch SmartDashboard.

4. Create Network Objects at SmartConsole
=========================================

 4.1 At Check Point SmartDashboard window, select the **Desktop** tab. Right click the **Networks** folder at the left navigation bar and select **Network**. 
 
 4.2 Create one network for private subnet of VPC2 (Check Point VPC)
 
|image1|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  Name                              Arbitrary (e.g. CP-Private-Subnet)
  IPv4 Network Address              VPC2 private subnet CIDR
  IPv4 Net mask                     VPC2 private subnet mask
===============================     =================================================================

 4.3 Create one network for private subnet of VPC1 (Aviatrix Gateway VPC)

|image2|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  Name                              Arbitrary (e.g. AVX-Private-Subnet)
  IPv4 Network Address              VPC1 private subnet CIDR
  IPv4 Net mask                     VPC1 private subnet mask
===============================     =================================================================

5. Configure Check Point Security Gateway with VPN
==================================================

 5.1 At the SmartDashboard window, select the **Desktop** tab and expand the **Check Point** folder at the left navigation bar. Note that your gateway VM with the name format 'gw-xxxxxx' is automatically created.
 
|image3|

 5.2 Right click the gateway name and select **Edit** from the menu.

 5.3 At **Check Point Gateway - General Properties** window:

|image4|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  IPv4 Address                      Private IP of CheckPoint VM WAN port
  Test SIC Status                   Make sure the status is 'communicating'
  Network Security                  Select 'IPSec VPN'
===============================     =================================================================

 5.4 At **Check Point Gateway - Topology** window, select **Manually defined** for **VPN Domain**. Select the network created at Step 4.2.
 
|image5|
 
 5.5 At **Check Point Gateway - Topology** window, double click "eth0" (Check Point WAN port). Select **External (leads out to the Internet)**.

|image6|

 5.6 At **Check Point Gateway - Topology** window, double click "eth1" (Check Point LAN port). Select **Internal (leads to the local network)**.

|image7| 

 5.7 At **Check Point Gateway - IPSec VPN - Link Selection** window, configure the parameters as follows:

|image8|

=========================================     =======================================================
  **Field**                                   **Value**
=========================================     =======================================================
  Statically NATed IP                         Public IP of Check Point WAN port
  Selected address from topology table        Private IP of Check Point WAN port 
=========================================     =======================================================

 5.8 At **Check Point Gateway - IPSec VPN - VPN Advanced** window, configure the parameters as follows:

|image9|

6. Configure an Interoperable Device to Represent Aviatrix Gateway
==================================================================

 6.1 At Check Point SmartDashboard window, select the **Desktop** tab. Right click the **Networks** folder at the left navigation bar to create a new interoperable device.

 6.2 At **Interoperable Device - General Properties** window:

|image10|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  Name                              Arbitrary (e.g. AVX-GW)
  IPv4 Address                      Public IP of Aviatrix Gateway
===============================     =================================================================

 6.3 At the **Interopable Device - Topology** window, select **Manually defined** for **VPN Domain**. Select the network created at Step 4.3.

|image11|

 6.4 At the **Interopable Device - IPSec VPN - Link Selection** window, select **Always use this IP address->Main Address**

|image12|

 6.5 At the **Interopable Device - IPSec VPN - VPN Advanced** window, select **Use the community settings**

|image13|

7. Create a VPN Community
==========================

 7.1 At SmartDashboard **IPSec VPN** tab, select **Overview** from left navigation bar. Click the **New** button to create a Meshed Community.

|image14|

 7.2 At **Meshed Community Properties - General** window, create one community with a name (e.g. site2cloud-avx)

|image15|

 7.3 At **Meshed Community Properties - Participating Gateways** window, add both Check Point Security Gateway (e.g. gw-fe024c) and the interopable device created at Step 6 (e.g. AVX-GW) to this community.

|image16|

 7.4 At **Meshed Community Properties - Encryption** window, select the options according to the site2cloud configuration downloaded at Step 2.3.

|image17|

 7.5 At **Meshed Community Properties - Tunnel Management** window, select **One VPN tunnel per Gateway pair** for **VPN Tunnel Sharing**.

|image18|

 7.6 At the **Meshed Community Properties - Advanced Settings - Shared Secret** window, enter **Shared Secret** by copying the **Pre-Shared Key** from the site2cloud configuration downloaded at Step 2.3.

|image19|

 7.7 At the **Meshed Community Properties - Advanced Settings - Advanced VPN Properties** window, enter the Phase1 and Phase2 parameters according to the site2cloud configuration downloaded at Step 2.3.

|image20|

8. Create Firewall Rule for VPN Traffic
=======================================

 8.1 At SmartDashboard window, select the **Firewall** tab.

 8.2 Select **Policy** to add a new rule.

|image21|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPN                               Select the Meshed VPN Community created at Step 7
  Install On		            Select Check Point Security Gateway
===============================     =================================================================
 
 8.3 Click **Install Policy** button to push the firewall policy to the Check Point Security Gateway

|image22|

9. Troubleshooting and Verifying at Check Point Security Gateway
================================================================

 9.1 At SmartDashboard window, from **SmartConsole** drop down list, select **SmartView Monitor**

|image23|

 9.2 At the SmartView Monitor window, select **VPNs** from *Gateway Status** and verify **Encrypted Traffic**

|image24|

10. Troubleshooting and Verifying at Aviatrix Controller
========================================================

 10.1 At the Aviatrix Controller, go to the **Site2Cloud** page. Verify that the status of the site2cloud connection is up.

|image25|

 10.2 At the **Site2Cloud - Diagnostics** page, run various diagnostics commands.

|image26|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  VPC1 (Aviatrix Gateway VPC) ID
  Connection                        Name of site2cloud connection created at Step 2
  Gateway                           Name of Aviatrix Gateway
  Action                            One of the supported diagnostics commands
===============================     =================================================================


For support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_

.. |image0| image:: s2c_gw_cp_media/DownloadSmartConsole.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: s2c_gw_cp_media/Network1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image2| image:: s2c_gw_cp_media/Network2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image3| image:: s2c_gw_cp_media/Desktop-GW-Config.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image4| image:: s2c_gw_cp_media/EditGW1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image5| image:: s2c_gw_cp_media/EditGW2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image6| image:: s2c_gw_cp_media/EditGW3.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image7| image:: s2c_gw_cp_media/EditGW4.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image8| image:: s2c_gw_cp_media/EditGW5.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image9| image:: s2c_gw_cp_media/EditGW6.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image10| image:: s2c_gw_cp_media/Interop1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image11| image:: s2c_gw_cp_media/Interop2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image12| image:: s2c_gw_cp_media/Interop3.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image13| image:: s2c_gw_cp_media/Interop4.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image14| image:: s2c_gw_cp_media/Community1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image15| image:: s2c_gw_cp_media/Community2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image16| image:: s2c_gw_cp_media/Community7.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image17| image:: s2c_gw_cp_media/Community3.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image18| image:: s2c_gw_cp_media/Community4.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image19| image:: s2c_gw_cp_media/Community5.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image20| image:: s2c_gw_cp_media/Community6.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image21| image:: s2c_gw_cp_media/FW1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image22| image:: s2c_gw_cp_media/FW2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image23| image:: s2c_gw_cp_media/CPMonitor1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image24| image:: s2c_gw_cp_media/CPMonitor2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image25| image:: s2c_gw_cp_media/AVXMonitor1.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image26| image:: s2c_gw_cp_media/AVXMonitor2.PNG
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
