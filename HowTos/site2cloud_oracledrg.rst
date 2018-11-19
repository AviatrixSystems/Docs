.. meta::
   :description: Site2Cloud (Aviatrix Gateway - Oracle DRG)
   :keywords: aviatrix, site2cloud, oracle, drg

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

=====================================================================
Aviatrix Gateway to Oracle DRG
=====================================================================

Overview
--------
This document describes how to configure an IPSec tunnel between an Aviatrix Gateway and an Oracle Dynamic Routing Gateway (DRG).

|gw2drg|

Deployment Guide
----------------

For this use case, we will create an IPSec connection from DRG first and then configure site2cloud connection at Aviatrix Controller.

Create an IPSec Connection from DRG
++++++++++++++++++++++++++++++++++++

.. note::

   **Prerequisites**

   #. You have a DRG created and attached to a VCN
   #. You have an Aviatrix Gateway provisioned in a VPC.  You will need this gateway's public IP address and its VPC CIDR for the steps below.

#. Login to your Oracle Cloud Console and create a route rule for the DRG

    We need to modify the desired route table and create a route rule to take any traffic destined for Aviatrix Gateway's VPC CIDR and route it to the DRG.

      #. Under **Core Infrastructure**, go to **Networking** and click **Virtual Cloud Networks**
      #. Click your VCN
      #. Select the desired route table(s) for your VCN
      #. Click **Edit Route Rules**
      #. Create a new route rule as following and save it

         +--------------------------------+--------------------------------------------------------+
         | Field                          | Description                                            |
         +================================+========================================================+
         | Target Type                    | Dynamic Route Gateway                                  |
         +--------------------------------+--------------------------------------------------------+
         | Destination CIDR Block         | Aviatrix GW's VPC CIDR (172.19.0.0/16 in this example) |
         +--------------------------------+--------------------------------------------------------+
         | Target Dynamic Routing Gateway | Select the desired existing DRG                        |
         +--------------------------------+--------------------------------------------------------+

   |vcn_route_table|

#. Login to your Oracle Cloud Console and create security rules

    We will edit the security list associated with your VCN subnets and add new rules for traffic coming from Aviatrix Gateway's VPC.

      #. Under **Core Infrastructure**, go to **Networking** and click **Virtual Cloud Networks**
      #. Click your VCN
      #. Select the desired security list(s) associated with your subnets
      #. Click **Edit All Rules**
      #. In **Allowed Rule for Ingress** section, enter the following values to create a rule to allow incoming traffic from Aviatrix Gateway's VPC

         +--------------------------------+--------------------------------------------------------+
         | Field                          | Description                                            |
         +================================+========================================================+
         | Source Type                    | CIDR                                                   |
         +--------------------------------+--------------------------------------------------------+
         | Source CIDR                    | Aviatrix GW's VPC CIDR (172.19.0.0/16 in this example) |
         +--------------------------------+--------------------------------------------------------+
         | IP Protocols                   | All Protocols                                          |
         +--------------------------------+--------------------------------------------------------+

         |vcn_security_rule_ingress|

      #. In **Allowed Rule for Egress** section, enter the following values to create a rule to allow outgoing traffic to Aviatrix Gateway's VPC

         +--------------------------------+--------------------------------------------------------+
         | Field                          | Description                                            |
         +================================+========================================================+
         | Destination Type               | CIDR                                                   |
         +--------------------------------+--------------------------------------------------------+
         | Destination CIDR               | Aviatrix GW's VPC CIDR (172.19.0.0/16 in this example) |
         +--------------------------------+--------------------------------------------------------+
         | IP Protocols                   | All Protocols                                          |
         +--------------------------------+--------------------------------------------------------+

         |vcn_security_rule_egress|

#. Create a CPE object

    In this task, we create the CPE object, which is a logical representation of the Aviatrix Gateway.

      #. Under **Core Infrastructure**, go to **Networking** and click **Customer-Premises Equipment**
      #. Click **Create Customer-Premises Equipment**
      #. Enter the following values and click **Create** button

         +------------------------------+---------------------------------------------+
         | Field                        | Description                                 |
         +==============================+=============================================+
         | Create in Compartment        | Leave as is (the VCN's compartment)         |
         +------------------------------+---------------------------------------------+
         | Name                         | A descriptive name for the CPE object       |
         +------------------------------+---------------------------------------------+
         | IP Address                   | Public IP address of Aviatrix Gateway       |
         +------------------------------+---------------------------------------------+
         | Tags                         | Optional                                    |
         +------------------------------+---------------------------------------------+

         |cpe|

#. From the DRG, create an IPSec connection to the CPE object

   #. Under **Core Infrastructure**, go to **Networking** and click **Dynamic Routing Gateways**
   #. Click the DRG created earlier
   #. Click **Create IPSec Connection**
   #. Enter the following values and click **Create IPSec Connection** button

      +-----------------------------------------+--------------------------------------------------------+
      | Field                                   | Description                                            |
      +=========================================+========================================================+
      | Create in Compartment                   | Leave as is (the VCN's compartment)                    |
      +-----------------------------------------+--------------------------------------------------------+
      | Name                                    | A descriptive name for the IPSec connection            |
      +-----------------------------------------+--------------------------------------------------------+
      | Customer-Premises Equipment Compartment | Leave as is (the VCN's compartment)                    |
      +-----------------------------------------+--------------------------------------------------------+
      | Customer-Premises Equipment             | Select the CPE object created earlier                  |
      +-----------------------------------------+--------------------------------------------------------+
      | Static Route CIDR                       | Aviatrix GW's VPC CIDR (172.19.0.0/16 in this example) |
      +-----------------------------------------+--------------------------------------------------------+
      | Tags                                    | Optional                                               |
      +-----------------------------------------+--------------------------------------------------------+

      |ipsec_connection|

   #. Once the IPSec connection enters **Available** state, click the **Action** icon (three dots), and then click **Tunnel Information**.
      Please copy the **IP Address** of the VPN headend and the **Shared Secret**.

      |ipsec_info|

#. Login to Aviatrix Controller

#. Follow the steps in `this </HowTos/site2cloud.html>`__ guide.  Use this table for specific field values

   +-------------------------------+-------------------------------------------------------------+
   | Field                         | Description                                                 |
   +===============================+=============================================================+
   | VPC ID/VNet Name              | Select the Aviatrix Gateway's VPC                           |
   +-------------------------------+-------------------------------------------------------------+
   | Connection Type               | Unmapped                                                    |
   +-------------------------------+-------------------------------------------------------------+
   | Connection Name               | A descriptive name for the site2cloud connection            |
   +-------------------------------+-------------------------------------------------------------+
   | Remote Gateway Type           | Oracle                                                      |
   +-------------------------------+-------------------------------------------------------------+
   | Tunnel Type                   | UDP                                                         |
   +-------------------------------+-------------------------------------------------------------+
   | Encryption over ExpressRoute/ | Unchecked                                                   |
   | DirectConnect                 |                                                             |
   +-------------------------------+-------------------------------------------------------------+
   | Primary Cloud Gateway         | Select the desired Aviatrix Gateway                         |
   +-------------------------------+-------------------------------------------------------------+
   | Remote Gateway IP Address     | Enter the IP Address copied from Oracle IPSec connection    |
   +-------------------------------+-------------------------------------------------------------+
   | Pre-shared Key                | Enter the shared secret copied from Oracle IPSec connection |
   +-------------------------------+-------------------------------------------------------------+
   | Remote Subnet                 | Enter Oracle VCN's CIDR                                     |
   +-------------------------------+-------------------------------------------------------------+
   | Local Subnet                  | Enter Aviatrix Gateway's VPC CIDR (Or leave it blank)       |
   +-------------------------------+-------------------------------------------------------------+

   |s2c_config|
   
Test
----

Once complete, test the communication using the tunnel by sending traffic between instances in Aviatrix Gateway' VPC and Oracle VCN.

Login Aviatrix Controller and go to **Site2Cloud** page. Verify the site2cloud connection created above is in "Up" in **Status**


|s2c_status|


Troubleshooting
---------------

Wait 2-3 minutes for the tunnel to come up.  If it does not come up within that time, check the IP addresses to confirm they are accurate.  Additional troubleshooting is available in the **Diagnositics** tab.

Appendix: Enable HA
-------------------

You can enable HA for Aviatrix site2cloud connection to Oracle DRG. Please add following extra steps to the configuration.

|gw2drg-ha|


Create Aviatrix HA Gateway
++++++++++++++++++++++++++

Before creating site2cloud connection, following `this <https://docs.aviatrix.com/Solutions/gateway_ha.html>`__ guide's
**Backup Gateway and Tunnel HA** section to create Aviatrix HA gateway in the same VPC.

From Oracle Cloud console, create a second IPSec connection between the same DRG and Aviatrix HA Gateway
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

#. Create a new Customer Gateway for Aviatrix HA Gateway:

     +------------------------------+----------------------------------------------------+
     | Field                        | Description                                        |
     +==============================+====================================================+
     | Create in Compartment        | Leave as is (the VCN's compartment)                |
     +------------------------------+----------------------------------------------------+
     | Name                         | A descriptive name for the second CPE object       |
     +------------------------------+----------------------------------------------------+
     | IP Address                   | Public IP address of Aviatrix HA Gateway           |
     +------------------------------+----------------------------------------------------+
     | Tags                         | Optional                                           |
     +------------------------------+----------------------------------------------------+

#. Create a new IPSec connection for Aviatrix HA Gateway:

     +-----------------------------------------+--------------------------------------------------------+
     | Field                                   | Description                                            |
     +=========================================+========================================================+
     | Create in Compartment                   | Leave as is (the VCN's compartment)                    |
     +-----------------------------------------+--------------------------------------------------------+
     | Name                                    | A descriptive name for the second IPSec connection     |
     +-----------------------------------------+--------------------------------------------------------+
     | Customer-Premises Equipment Compartment | Leave as is (the VCN's compartment)                    |
     +-----------------------------------------+--------------------------------------------------------+
     | Customer-Premises Equipment             | Select the second CPE object created earlier           |
     +-----------------------------------------+--------------------------------------------------------+
     | Static Route CIDR                       | Aviatrix GW's VPC CIDR (172.19.0.0/16 in this example) |
     +-----------------------------------------+--------------------------------------------------------+
     | Tags                                    | Optional                                               |
     +-----------------------------------------+--------------------------------------------------------+

#. Once the second IPSec connection enters **Available** state, click the **Action** icon (three dots), and then
   click **Tunnel Information**. Please copy the **IP Address** of the VPN headend and the **Shared Secret**.

Create Aviatrix Site2Cloud Connection with HA
+++++++++++++++++++++++++++++++++++++++++++++

From Aviatrix Controller UI -> Site2Cloud page, click **+ Add New**, under **Add a New Connection**, make sure **Enable HA** is checked.

Additional fields are displayed when checked. All other fields should have the same values as corresponding ones WITHOUT HA.

+-----------------------------------+-----------------------------------------------------------------+
| Field                             | Description                                                     |
+===================================+=================================================================+
| Backup Gateway                    | Select the Aviatrix HA Gateway just created                     |
+-----------------------------------+-----------------------------------------------------------------+
| Remote Gateway IP Address(Backup) | Enter the IP Address copied from the second IPSec connection    |
+-----------------------------------+-----------------------------------------------------------------+
| Pre-shared Key(Backup)            | Enter the Shared Secret copied from the second IPSec connection |
+-----------------------------------+-----------------------------------------------------------------+


.. |gw2drg| image:: s2c_drg_media/gw2drg.png
.. |vcn_route_table| image:: s2c_drg_media/vcn_route_table.PNG
.. |vcn_security_rule_ingress| image:: s2c_drg_media/vcn_security_rule_ingress.PNG
.. |vcn_security_rule_egress| image:: s2c_drg_media/vcn_security_rule_egress.PNG
.. |cpe| image:: s2c_drg_media/cpe.PNG
.. |ipsec_connection| image:: s2c_drg_media/ipsec_connection.PNG
.. |ipsec_info| image:: s2c_drg_media/ipsec_info.PNG
.. |s2c_config| image:: s2c_drg_media/s2c_config.PNG
.. |s2c_status| image:: s2c_drg_media/s2c_status.PNG
.. |gw2drg-ha| image:: s2c_drg_media/gw2drg-ha.png

.. disqus::

