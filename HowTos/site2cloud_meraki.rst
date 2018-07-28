.. meta::
   :description: Site2Cloud (Aviatrix Gateway - Meraki MX64)
   :keywords: meraki, aviatrix, site2cloud

=====================================================================
Site2Cloud (Aviatrix Gateway - Meraki MX64)
=====================================================================

Overview
--------
This document describes how to create an IPsec tunnel between an Aviatrix Gateway and a Meraki MX64 using Aviatrix Site2Cloud.

Network setup is as following:

**VPC1 (with Aviatrix Gateway)**

    *VPC1 CIDR: 10.10.0.0/16*
    
    *VPC1 Public Subnet CIDR: 10.10.0.0/24*
    
**On-prem (with Meraki MX64)**

    *On-prem CIDR: 10.28.144.0/24*
    

Add a Site2Cloud tunnel in Aviatrix Controller
-----------------------------------------------
1. Login to your Aviatrix Controller.
2. Select the Site2Cloud navigation item on the left navigation bar.
3. Click on `+ Add New` near the top of the `Site2Cloud` tab.
4. Under `Add a New Connection`, enter the following:

  +-------------------------------+------------------------------------------+
  | Field                         | Expected Value                           |
  +===============================+==========================================+
  | VPC ID / VNet Name            | Select the VPC where this tunnel will    |
  |                               | terminate in the cloud.                  |
  +-------------------------------+------------------------------------------+
  | Connection Type               | `Unmapped` unless there is an            |
  |                               | overlapping CIDR block.                  |
  +-------------------------------+------------------------------------------+
  | Connection Name               | Name this connection.  This connection   |
  |                               | represents the connectivity to the       |
  |                               | edge device.                             |
  +-------------------------------+------------------------------------------+
  | Remote Gateway Type           | `Generic`                                |
  +-------------------------------+------------------------------------------+
  | Tunnel Type                   | `UDP`                                    |
  +-------------------------------+------------------------------------------+
  | Algorithms                    | Unchecked                                |
  +-------------------------------+------------------------------------------+
  | Encryption over ExpressRoute/ | Unchecked                                |
  | DirectConnect                 |                                          |
  +-------------------------------+------------------------------------------+
  | Enable HA                     | Unchecked                                |
  +-------------------------------+------------------------------------------+
  | Primary Cloud Gateway         | Select the Gateway where the tunnel will |
  |                               | terminate in this VPC.                   |
  +-------------------------------+------------------------------------------+
  | Remote Gateway IP Address     | IP address of the Meraki M64 device.     |
  +-------------------------------+------------------------------------------+
  | Pre-shared Key                | Optional.  Enter the pre-shared key for  |
  |                               | this connection.  If nothing is entered  |
  |                               | one will be generated for you.           |
  +-------------------------------+------------------------------------------+
  | Remote Subnet                 | Enter the CIDR representing the network  |
  |                               | behind the Meraki MX64 that this tunnel  |
  |                               | supports.                                |
  +-------------------------------+------------------------------------------+
  | Local Subnet                  | The CIDR block that should be advertised |
  |                               | on Meraki M64 for the cloud network      |
  |                               | (will default to the VPC CIDR block)     |
  +-------------------------------+------------------------------------------+

5. Click `OK`

6. Click on this newly created Site2Cloud connection and select Vendor Aviatrix to `Download Configuration` so that you can copy and paste the preshared-key into Meraki configuration later.

Configuring Site-to-site VPN in Meraki MX64
-------------------------------------------

1. Login to your Meraki dashboard.
2. In the `Security appliance` menu, select `Site-to-site VPN` under `Configure` section.

   |meraki01|

3. Configure your Meraki MX64 and add a peer according to the screenshot below.

   |meraki02|

4. Click on Custom in the IPsec Policies to create a custom policy that matches Aviatrix Site2Cloud configuration that was previously downloaded.

   |meraki03|

5. Click `Update` to save the Custom policy.

6. Remember to click on Save Changes.

7. In the `Security appliance` menu, click on `VPN Status` under `Monitor` section.

   |meraki04|

8. Send traffic from on-prem Meraki MX64 internal network to Aviatrix Gateway VPC. Verify that VPN Status is green under Non-Meraki peer tab. 

   |meraki05|

.. |meraki01| image:: site2cloud_meraki_media/meraki01.png
.. |meraki02| image:: site2cloud_meraki_media/meraki02.png
.. |meraki03| image:: site2cloud_meraki_media/meraki03.png
.. |meraki04| image:: site2cloud_meraki_media/meraki04.png
.. |meraki05| image:: site2cloud_meraki_media/meraki05.png
