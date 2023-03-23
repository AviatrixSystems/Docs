

============================================
Aviatrix Gateway to Check Point(R80.10)
============================================

This document describes how to build an IPsec tunnel based Site2Cloud connection between Aviatrix Gateway and Check Point Firewall. To simulate an on-prem Check Point Firewall, we use a Check Point CloudGuard IaaS firewall VM at AWS VPC.

.. note::

  If you do not have access to AWS, you can simulate an on-prem Firewall by deploying the Palo Alto Firewall in any other cloud (such as Microsoft Azure, Google Cloud Platform, or Oracle Cloud Infrastructure).


The network setup is as follows:

**VPC1 (with Aviatrix Gateway)**

    *VPC1 CIDR: 10.12.0.0/16*

    *VPC1 Public Subnet CIDR: 10.12.0.0/23*

    *VPC1 Private Subnet CIDR: 10.12.2.0/23*

**VPC2 (with Check Point Security Gateway)**

    *VPC2 CIDR: 10.24.0.0/16*

    *VPC2 Public Subnet CIDR: 10.24.0.0/23*

    *VPC2 Private Subnet CIDR: 10.24.2.0/23*

Launching Check Point Security Gateway VM
=========================================

Launch a  CheckPoint VM with at least two network interfaces. One interface serves as a WAN port and is in VPC2's public subnet. The other interface serves as a LAN port and is in VPC2's private subnet. Collect the public IP address of the WAN port.

Creating Site2Cloud Connection at Aviatrix Controller
======================================================

1. Go to Gateway > New Gateway to launch an Aviatrix Gateway at VPC1's public subnet. Collect both public and private IP addresses of the Gateway.

2. Go to the Site2Cloud and click **Add New** to create a Site2Cloud connection:

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  Choose VPC ID of VPC1
  Connection Type                   Unmapped
  Connection Name                   Arbitrary (e.g. avx-cp-s2c)
  Remote Gateway Type               Generic
  Tunnel Type                       UDP
  Algorithms                        Unmark this checkbox
  Encryption over Direct Connect    Unmark this checkbox
  Enable HA                         Unmark this checkbox
  Primary Cloud Gateway             Select Aviatrix Gateway created above
  Remote Gateway IP Address         Public IP of CheckPoint-VM WAN port
  Pre-shared Key                    Optional (auto-generated if not entered)
  Remote Subnet                     10.24.2.0/23 (VPC2 private subnet)
  Local Subnet                      10.12.2.0/23 (VPC1 private subnet)
===============================     =================================================================

3. Go to the Site2Cloud page. From the Site2Cloud connection table, select the connection created above (e.g. avx-cp-s2c). Select **Generic** from **Vendor** drop down list and click **Download Configuration** to download the Site2Cloud configuration. Save the configuration file for configuring CheckPoint-VM.

Downloading and Install SmartConsole
====================================

1. Using a browser, connect to the Gaia Portal of the CheckPoint-VM at https://CheckPoint-VM_Public-IP:
2. Click **Download Now!** as shown below to download SmartConsole.

|image1|

3. Install SmartConsole at your local machine and launch SmartDashboard.

Creating Network Objects at SmartConsole
=========================================

1. At the Check Point SmartDashboard window, go to New > Network and create two objects.

|image2|

2. Create one network for private subnet of VPC2 (Check Point VPC).

|image3|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  Name                              Arbitrary (e.g. CP-Private-Subnet)
  IPv4 Network Address              VPC2 private subnet CIDR
  IPv4 Net mask                     VPC2 private subnet mask
===============================     =================================================================

3. Create one network for private subnet of VPC1 (Aviatrix Gateway VPC).

|image4|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  Name                              Arbitrary (e.g. AVX-Private-Subnet)
  IPv4 Network Address              VPC1 private subnet CIDR
  IPv4 Net mask                     VPC1 private subnet mask
===============================     =================================================================

Configuring Check Point Security Gateway with VPN
==================================================

1. At the SmartDashboard window, go to **Gateways and services** > double-click on the gateway.

  |image5|

  |image6|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  IPv4 Address                      Private IP of CheckPoint VM WAN port
  Network Security                  Select **IPsec VPN**
===============================     =================================================================

2. Go to Network management > **VPN domain** > click **Manually defined** and select the network created previously (see the "Creating Network Objects at SmartConsole" section above).

 |image7|

3. Go to Network management > double-click "eth0" (Check Point WAN port). Select **External (leads out to the Internet)**.

 |image8|

4. Go to Network management > double-click "eth1" (Check Point LAN port). Click on modify. Select **Override > this network (internal) > specific > select network created previously (see the "Create Network Objects at SmartConsole" above).

 |image9|

5. Double-click on gateway as shown in step 1 above > **IPsec VPN** > **link selection** >  statically NATted IP > public IP of CheckPoint WAN port.
      Click on source IP settings > select manual  > in selected address from topology table > select the private IP of CheckPoint wan port.

 |image10|

6. Double-click on the gateway as shown in step 1 above >  VPN advanced and leave it as it is to use the community settings and leave NAT traversal turned on.

 |image11|

Configuring an Interoperable Device to Represent Aviatrix Gateway
==================================================================

1. Go to Gateways and services > New network objects > Interoperable devices > click **Add new** and then use the image below to create a new interoperable device to represent Aviatrix Gateway.

|image12|

|image13|

2. Double-click on Interoperable device > avx-gwv (created in step 1 of this section) > General properties. The IPv4 address will be the public IP of the Aviatrix Gateway.

|image14|

3. Double-click on Interoperable device > avx-gwv (created in step 1 in this section)  > Topology > Manually defined > select the network for private subnet of VPC1 (Aviatrix Gateway VPC) network created above.

|image15|

4. Double-click on Interoperable device > avx-gwv (created in step 1 of this section) > IPsec VPN - Link Selection > select Always use this IP address > Main Address.

|image16|

5. Double-click on Interoperable device > avx-gwv (created in step 1 of this section) > IPsec VPN – VPN advanced window. Select **Use the community settings**.

|image17|

Creating a VPN Community
==========================

1. Click on VPN communities on the smart console. Then, create a Star Community as shown below.

|image18|

|image19|

2. After creating the VPN community, double-click on the created VPN community > Gateway tab. Then, select the gateway created above (see the "Configuring Check Point Security Gateway with VPN" section). 

|image20|

3. Double-click on created VPN community > Encryption >  Encryption window and select the options according to the Site2Cloud configuration downloaded previously (see the "Create Site2Cloud Connection at Aviatrix Controller" section above).

|image21|

4. Double-click on created VPN community > Tunnel management and then select one VPN tunnel per gateway pair.

|image22|

 5. Double-click on created VPN community > VPN routing > select as shown in the image below.

|image23|

6. Double-click on created VPN community > Shared secret > Advanced Settings - Shared Secret window. Enter the Shared Secret by copying the Pre-Shared Key from the Site2Cloud configuration downloaded previously (see the "Create Site2Cloud Connection at Aviatrix Controller" section above).

|image24|

 7. Double-click on the created VPN community > Advanced > enter the Phase1 and Phase2 parameters according to the Site2Cloud configuration downloaded previously (see the "Create Site2Cloud Connection at Aviatrix Controller" section above).

|image25|


Creating Firewall Rule for VPN Traffic
=======================================
Go to security and policies. Add a policy and click **Install Policy**.

|image26|


Troubleshooting and Verifying at Check Point Security Gateway
================================================================

1. Go to **Logs and monitor** > Add a new tab. Then, click on **Open Tunnel & User Monitoring**.

|image27|


2. Click **IPsec VPN** to see the tunnel status.

|image28|

|image29|


Troubleshooting and Verifying at Aviatrix Controller
========================================================

1. At the Aviatrix Controller, go to the **Site2Cloud** page. Verify that the status of the Site2Cloud connection is up.

|image30|

2. At the **Site2Cloud - Diagnostics** page, run various diagnostics commands.

|image31|

===============================     =================================================================
  **Field**                         **Value**
===============================     =================================================================
  VPC ID/VNet Name                  VPC1 (Aviatrix Gateway VPC) ID
  Connection                        Name of the Site2Cloud connection created previously (see the "Create Site2Cloud Connection at Aviatrix Controller" section above)
  Gateway                           Name of the Aviatrix Gateway
  Action                            One of the supported diagnostics commands
===============================     =================================================================

3. Below is the sample output for ping from an instance in Aviatrix private subnet to an instance in CheckPoint private subnet.

|image32|

.. |image1| image:: ./s2c_checkpoint_r88_media/image1.png
    :width: 100%
.. |image2| image:: ./s2c_checkpoint_r88_media/image2.png
    :width: 100%
.. |image3| image:: ./s2c_checkpoint_r88_media/image3.png
    :width: 50%
.. |image4| image:: ./s2c_checkpoint_r88_media/image4.png
    :width: 50%
.. |image5| image:: ./s2c_checkpoint_r88_media/image5.png
    :width: 100%
.. |image6| image:: ./s2c_checkpoint_r88_media/image6.png
    :width: 100%
.. |image7| image:: ./s2c_checkpoint_r88_media/image7.png
    :width: 100%
.. |image8| image:: ./s2c_checkpoint_r88_media/image8.png
    :width: 50%
.. |image9| image:: ./s2c_checkpoint_r88_media/image9.png
    :width: 75%
.. |image10| image:: ./s2c_checkpoint_r88_media/image10.png
    :width: 75%
.. |image11| image:: ./s2c_checkpoint_r88_media/image11.png
    :width: 75%
.. |image12| image:: ./s2c_checkpoint_r88_media/image12.png
    :width: 75%
.. |image13| image:: ./s2c_checkpoint_r88_media/image13.png
    :width: 75%
.. |image14| image:: ./s2c_checkpoint_r88_media/image14.png
    :width: 75%
.. |image15| image:: ./s2c_checkpoint_r88_media/image15.png
    :width: 75%
.. |image16| image:: ./s2c_checkpoint_r88_media/image16.png
    :width: 75%
.. |image17| image:: ./s2c_checkpoint_r88_media/image17.png
    :width: 75%
.. |image18| image:: ./s2c_checkpoint_r88_media/image18.png
    :width: 100%
.. |image19| image:: ./s2c_checkpoint_r88_media/image19.png
    :width: 100%
.. |image20| image:: ./s2c_checkpoint_r88_media/image20.png
    :width: 50%
.. |image21| image:: ./s2c_checkpoint_r88_media/image21.png
    :width: 75%
.. |image22| image:: ./s2c_checkpoint_r88_media/image22.png
    :width: 75%
.. |image23| image:: ./s2c_checkpoint_r88_media/image23.png
    :width: 75%
.. |image24| image:: ./s2c_checkpoint_r88_media/image24.png
    :width: 75%
.. |image25| image:: ./s2c_checkpoint_r88_media/image25.png
    :width: 75%
.. |image26| image:: ./s2c_checkpoint_r88_media/image26.png
    :width: 100%
.. |image27| image:: ./s2c_checkpoint_r88_media/image27.png
    :width: 100%
.. |image28| image:: ./s2c_checkpoint_r88_media/image28.png
    :width: 100%
.. |image29| image:: ./s2c_checkpoint_r88_media/image29.png
    :width: 100%
.. |image30| image:: ./s2c_checkpoint_r88_media/image30.png
    :width: 100%
.. |image31| image:: ./s2c_checkpoint_r88_media/image31.png
    :width: 100%
.. |image32| image:: ./s2c_checkpoint_r88_media/image32.png
    :width: 90%
