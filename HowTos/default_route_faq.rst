.. meta::
  :description: Default Route FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
Default route FAQ
=========================================================

This document explains how Aviatrix manupilates default route 0.0.0.0/0 starting from R6.2 with Active Mesh 2.0.

What is default route 0.0.0.0/0?
================================

In the context of routing tables, a network destination of 0.0.0.0 is used with a network mask of 0 to depict the default route as a destination subnet. This destination is expressed as "0.0.0.0/0" in CIDR notation from `Wikipedia <https://en.wikipedia.org/wiki/0.0.0.0>`_ 

When users configure default route 0.0.0.0/0 into routing table?
================================================================

Usually, when users want to route traffic to all non-local addresses as use cases below

- to the Internet traffic (i.e. Internet gateway or NAT gateway)
  
- for central traffic control (i.e. VPN gateway, firewall, other cloud network component, or NVA)

What is public subnet?
======================

In `AWS <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html>`_, a public subnet is a subnet that's associated with a route table that has a route to an Internet gateway. Most of the time, the route entry is 0.0.0.0/0 -> IGW. In addition, AWS IGW performs network address translation (NAT) for instances that have been assigned public IPv4 addresses. Check this `AWS User Guide <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html>`_ for detail. Same concept applies to other cloud providers.

Therefore, Aviatrix assumes that a subnet which is associated with a route table that has a route 0.0.0.0/0 to an Internet gateway is a public subnet and this subnet/route table is set for internet facing purpose by customer. Check the question `How Aviatrix defines public or private subnet/route table in each cloud? <#aviatrixdefinition>`_ for detail. 

Why Aviatrix needs to differentiate public subnet/route table and private subnet/route table?
==============================================================================================

Aviatrix controller programs default route 0.0.0.0/0 pointing to Aviatrix in cloud route table for different Aviatrix solutions/use cases. Thus, determining what type of subnet/route table to program is critical. Additionally, the implementation logic is slightly different depending on use cases. Check the question `How Aviatrix defines public or private subnet/route table in each cloud? <#aviatrixdefinition>`_ for detail. 

Use cases: Single SNAT and FQDN 
--------------------------------

Since these are the features routing private traffic from cloud network to the Internet and replacing native cloud NAT gateways, Aviatrix discovers 'private' subnet/route table first and then program the default route 0.0.0.0/0 pointing to Aviatrix gateway into it. Furthermore, to reduce friction and to shorten downtime when users remove default route by themselves, Aviatrix performs overwrite default route logic by default. Check Rule 1 and Rule 2 for detail.

Use cases: Aviatrix Centralized Egress and on-prem advertising default route 0.0.0.0/0
--------------------------------------------------------------------------------------

Since these are the features routing private traffic for central traffic control, Aviatrix discovers 'private' subnet/route table first and then program the default route 0.0.0.0/0 into it if there is no default route existed. Aviatrix, however, does not perform overwrite logic in these use cases by default. Check Rule 3 for detail.

.. _aviatrixdefinition:

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
|                                      | overall: 0.0.0.0/0 to non-IGW        |                                             |
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

Features:
^^^^^^^^^

- Single SNAT

- FQDN discovery

- FQDN

High-level logic:
^^^^^^^^^^^^^^^^^

- Utilize `Aviatrix subnet/route table definition <#aviatrixdefinition>`_ to discover private subnet/route table 

- Save customer's original route entry 0.0.0.0 configuration

- Overwrite route entry 0.0.0.0 to Aviatrix

- Restore back customer's original route entry 0.0.0.0 configuration if users disable the above features

Rule 2: Load balance the route entry 0.0.0.0/0 between Aviatrix gateways when users attempt to enable the same type of feature such as Single SNAT/FQDN which is already deployed in the same network.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Refer to `NAT GW Load-balance with AZ affinity <https://docs.aviatrix.com/HowTos/nat_gw_LoadBalance_AZ.html>`_ for Aviatrix load balance detail

Rule 3: How to handle default route 0.0.0.0/0 from Aviatrix Transit Gateway?
----------------------------------------------------------------------------

Scenarios:
^^^^^^^^^^

- Learning default route 0.0.0.0/0 from on-prem

- Learning default route 0.0.0.0/0 from Aviatrix Transit peering

- Enabling Central Egress feature

High-level logic:
^^^^^^^^^^^^^^^^^

- Utilize `Aviatrix subnet/route table definition <#aviatrixdefinition>`_ to discover private subnet/route table 

- Program '0.0.0.0/0 to Aviatrix Spoke Gateway' into private subnet/route table of Spoke network, but it has a slightly different implementation for each cloud as below table.

- Program '0.0.0.0/0 to Aviatrix Transit Gateway' into private subnet/route table of Spoke network by following Azure implementation as below table if Azure ARM Spoke through Native Peering feature is deployed

+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Aviatrix definition**              | **AWS**                                                | **Azure**                                                                                                                     |
+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
| **Private** cloud subnet/route table | Silently ignore if there is a route 0.0.0.0/0 existed. | Silently ignore most of the route 0.0.0.0/0 if it is existed, but Aviatrix overwrites the default route 0.0.0.0/0 as follows: |
|                                      +--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
|                                      | Aviatrix does NOT overwrite 0.0.0.0/0 in this case.    | - UDR: 0.0.0.0/0 to None                                                                                                      |
|                                      +--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+
|                                      |                                                        | - UDR: 0.0.0.0/0 to Virtual Network                                                                                           |
+--------------------------------------+--------------------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------+

Rule 4: Error out a warning message when users attempt to enable single SNAT/FQDN in a Spoke network where default route 0.0.0.0/0 is already programmed by Rule 3.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Example:
^^^^^^^^

If there is a default route 0.0.0.0/0 learned from on-prem already existed in Aviatrix Transit solution, then Aviatrix will pop out a warning message when users attempt to enable single SNAT/FQDN features in Spoke network.

.. disqus::
