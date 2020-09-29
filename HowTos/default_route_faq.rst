.. meta::
  :description: Default Route FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
Default route FAQ
=========================================================

This document explains how Aviatrix manupilates default route 0.0.0.0/0 starting from R6.2 with Active Mesh 2.0.

How Aviatrix defines public or private subnet/route table in each cloud?
========================================================================

+--------------------------------------+--------------------------------------+---------------------------------------------+
| **Aviatrix definition**              | **AWS**                              | **Azure**                                   |
+--------------------------------------+--------------------------------------+---------------------------------------------+
| **Public** cloud subnet/route table  | 0.0.0.0/0 to IGW                     | UDR does not exist                          |
|                                      |                                      +---------------------------------------------+
|                                      |                                      | UDR is associated with a subnet:            |
|                                      |                                      +---------------------------------------------+
|                                      |                                      | - UDR: 0.0.0.0/0 entry doesn't exist        |
|                                      |                                      +---------------------------------------------+
|                                      |                                      | - UDR: 0.0.0.0/0 to Cloud Internet          |
+--------------------------------------+--------------------------------------+---------------------------------------------+
| **Private** cloud subnet/route table | 0.0.0.0/0 route entry does not exist | UDR is associated with a subnet:            |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | 0.0.0.0/0 to non-Aviatrix NVA        | - UDR: 0.0.0.0/0 to None                    |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | 0.0.0.0/0 to VGW                     | - UDR: 0.0.0.0/0 to non-Aviatrix NVA        |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | 0.0.0.0/0 to TGW                     | - UDR: 0.0.0.0/0 to Virtual Network         |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | 0.0.0.0/0 to AWS NAT gateway         | - UDR: 0.0.0.0/0 to Virtual Network Gateway |
|                                      +--------------------------------------+---------------------------------------------+
|                                      |                                      | Azure NAT gateway                           |
+--------------------------------------+--------------------------------------+---------------------------------------------+
| Notes:                               | IGW: Internet gateways               | UDR: User Defined Routing                   |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | NVA: Network Virtual Appliance       | NVA: Network Virtual Appliance              |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | VGW: Virtual private gateway         |                                             |
|                                      +--------------------------------------+---------------------------------------------+
|                                      | TGW: AWS Transit Gateway             |                                             |
+--------------------------------------+--------------------------------------+---------------------------------------------+

What are the rules and scenarios that Aviatrix programs default route?
======================================================================

Rule 1: Overwrite default route entry 0.0.0.0/0 in subnet/route table where Aviatrix defines it as “Private” when the below features are enabled:
-------------------------------------------------------------------------------------------------------------------------------------------------

- Single SNAT

- FQDN discovery

- FQDN

Rule 2: Load balance the route entry 0.0.0.0/0 between Aviatrix gateways when users attempt to enable the same type of feature such as Single SNAT/FQDN which is already deployed in the same network.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Refer to `NAT GW Load-balance with AZ affinity <https://docs.aviatrix.com/HowTos/nat_gw_LoadBalance_AZ.html>`_

Rule 3: How to handle default route 0.0.0.0/0 from Aviatrix Transit Gateway?
----------------------------------------------------------------------------

- Utilize Aviatrix subnet/route table definition to discover private subnet/route table 

- Program '0.0.0.0/0 to Aviatrix Spoke Gateway' into private subnet/route table of Spoke network, but it has a slightly different implementation for each cloud as below table.

- Program '0.0.0.0/0 to Aviatrix Transit Gateway' into private subnet/route table of Spoke network by folloing Azure implementation as below table if Azure ARM Spoke through Native Peering feature is deployed

+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Aviatrix definition**              | **AWS**                                                | **Azure**                                                                                                                     |
+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Private** cloud subnet/route table | Silently ignore if there is a route 0.0.0.0/0 existed. | Silently ignore most of the route 0.0.0.0/0 if it is existed, but Aviatrix overwrites the default route 0.0.0.0/0 as follows: |
|                                      +--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
|                                      | Aviatrix does NOT overwrite 0.0.0.0/0 in this case.    | - UDR: 0.0.0.0/0 to None                                                                                                      |
|                                      +--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
|                                      |                                                        | - UDR: 0.0.0.0/0 to Virtual Network                                                                                           |
+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

Rule 4: How Aviatrix handles 0.0.0.0/0 when Central Egress is enabled?
----------------------------------------------------------------------

- Treat it as Rule 3: How to handle default route 0.0.0.0/0 from Aviatrix Transit Gateway

Rule 5: Error out a warning message when users attempt to enable single SNAT/FQDN in a Spoke network where default route 0.0.0.0 is already programmed by Rule 3 or Rule 4.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

.. disqus::
