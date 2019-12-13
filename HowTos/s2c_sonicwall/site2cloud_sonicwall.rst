============================================
Aviatrix Gateway to Sonicwall
============================================

This document describes how to build an IPSec tunnel based Site2Cloud connection between Aviatrix Gateway and Sonicwall.

Network setup is as following:

**VPC-AVX (with Aviatrix Gateway)**

    *VPC CIDR: 10.0.0.0/16*

**On-Prem (with Sonicwall)**

    *On-Prem Network CIDR: 10.16.100.0/24*
   
1. Create a Site2Cloud Connection at the Aviatrix Controller
======================================================

 1.1 Go to **Gateway->New Gateway** to launch an Aviatrix Gateway at the public subnet of VPC-AVX. Collect Gateway's public IP addresses (35.161.77.0 in this example).

 1.2 Go to the **site2cloud** page and click **Add New** to create a site2cloud connection.

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC-AVX
  Connection Type                   Unmapped
  Connection Name                   Arbitrary (e.g. avx-sonicwall-s2c)
  Remote Gateway Type               Sonicwall
  Tunnel Type                       UDP
  Algorithms                        Uncheck this box
  IKEv2                             Uncheck this box
  Encryption over DirectConnect     Uncheck this box
  Enable HA                         Uncheck this box
  Primary Cloud Gateway             Select Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of Sonicwall (66.7.242.225 in this example)
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.16.100.0/24 (On-Prem Network CIDR)
  Local Subnet                      10.0.0.0/16
===============================     =================================================================

2. Create Address Objects for the VPN subnets
======================================================

Navigate to “Network” -> “Address Objects” -> click “Add” button

2.1 Create an Address Object for the Local Network

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
Name Arbitrary e.g. site2cloud-local
Zone LAN
Type Network
Network The LAN network range
Network Mask/Prefix e.g. 255.255.255.0

2.2 Create an Address Object for the Cloud Network

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================

Name Arbitrary e.g. site2cloud-cloud
Zone WAN
Type Network
Network The Cloud network range
Network Mask/Prefix e.g. 255.255.0.0

3. Configure the VPN Tunnel
======================================================

Navigate to “VPN” -> ”Settings” -> click “Add” button

3.1 On the “General” tab fill in the following fields:

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
Policy Type Site to site
Authentication Method IKE using Preshared Secret
Name Arbitrary (e.g. Aviatrix-GW)
IPsec Primary Gateway Address The public IP of the Aviatrix Gateway
IPsec Secondary Gateway Address The public IP of the Aviatrix HA Gateway if configured
Shared Secret Arbitrary
Confirm Shared Secret Re-enter Shared Secret
Local IKE ID Leave blank
Peer IKE ID Leave blank

3.2 Assign the Local and Remote Address Objects to the Tunnel

Click Network tab and select the Address objects created in step 1.

Choose local network from list: e.g. site2cloud-local

3.3 Click the Proposals tab and set the IKE and Ipsec values

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
Exchange                            Main Mode
DH Group                            Group2
Encryption                          AES-256
Authentication                      SHA1
Life Time (seconds) 28800

Ipsec (Phase 2) Proposals

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
Protocol ESP
Encryption AES-256
Authentication SHA1
Enable Perfect Forward Secrecy Check Box
DH Group Group 2
Life Time (seconds) 3600

* Note - If Secondary Peer IP is configured then Peer IKE ID must be left blank or else failover will not work properly.

3.4 Advanced Settings

Click on the Advance tab

Enable Keep Alive: check Box

"OK" to save the new Settings
