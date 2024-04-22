.. raw:: html

    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex">

=====================================================================
Aviatrix Gateway to Aviatrix Gateway
=====================================================================

Overview
--------------------

This document describes how to configure an IPsec tunnel between an Aviatrix Gateway and another Aviatrix Gateway using Aviatrix Site2Cloud.

.. note::
   There are only a couple of reasons to use Site2Cloud when connecting two Aviatrix Gateways:

   #. You have overlapping CIDR blocks but need to peer two VPC/VNets.
   #. The two Aviatrix Gateways are not part of the same Controller (i.e., one is at your customer and the other one is in your environment).

   If these reasons don't apply to you, you can use Aviatrix Encrypted Peering.

Certificate-Based Authentication
--------------------------------

If you want to use certificate-based authentication when establishing this connection:

#. In the Aviatrix Controller for 'Gateway B', navigate to SITE2CLOUD > Certificate > CA Certificate and download the certificate.
#. When following the procedure below, select this downloaded Aviatrix CA certificate when configuring the tunnel from Gateway A to Gateway B.

 .. note::
	If both Aviatrix gateways are in the same Controller these steps are not required. 

Deployment Guide
-----------------------------

There are two Aviatrix Gateways for this scenario. Since you are using the Site2Cloud feature, you must configure each side of the tunnel individually.

We will refer to the gateways below as **Gateway A** and **Gateway B**.  You can pick either gateway to be **Gateway A** or **Gateway B**.

If you want to use certificate-based authentication, you must first download the Aviatrix CA certificate from Gateway B, to use when setting up the tunnel from Gateway A to Gateway B.

Configure Tunnel from Gateway A to Gateway B
++++++++++++++++++++++++++++++++++++++++++++

#. Follow the steps in `this </HowTos/site2cloud.html>`__ guide.  Use this table for specific field values.

   +-------------------------------+------------------------------------------+
   | Field                         | Description                              |
   +===============================+==========================================+
   | VPC ID/VNet Name              | Select **Gateway A** VPC or VNet from the|
   |                               | drop down.                               |
   +-------------------------------+------------------------------------------+
   | Remote Gateway Type           | Aviatrix                                 |
   +-------------------------------+------------------------------------------+
   | Registered                    | Leave unchecked                          |
   +-------------------------------+------------------------------------------+
   | Primary Cloud Gateway         | Select **Gateway A** from the list       |
   +-------------------------------+------------------------------------------+
   | Remote Gateway IP Address     | Enter the public IP address of           |
   |                               | **Gateway B**.                           |
   +-------------------------------+------------------------------------------+
   | Pre-shared Key or CA          | If you leave the PSK Key blank one is    |
   | Certificate                   | generated for you, or you select the     |
   |                               | remote CA certificate and enter the      |
   |                               | Remote Identifier                        |
   +-------------------------------+------------------------------------------+

#. Once complete, select the newly created tunnel in the list.
#. Select **Aviatrix** for Vendor, **UCC** for Platform and **1.0** for Software.
#. Click **Download Configuration**.  You will use this file to create the other side of the tunnel.

Configure Tunnel from Gateway B to Gateway A
++++++++++++++++++++++++++++++++++++++++++++

#. In the Site2Cloud section, click **+ Add New**.
#. Click **Import**.
#. Select the file downloaded in the previous section.
#. Check the values that are pre-populated.
#. Click **OK**.

Test
--------

Once complete, test the communication using the tunnel.

Troubleshooting
----------------------

Wait 2-3 minutes for the tunnel to come up.  If it does not come up within that time, check the IP addresses to confirm they are accurate.  Additional troubleshooting is available in the **Diagnostics** tab.
