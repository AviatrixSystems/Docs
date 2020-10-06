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

When do users configure default route 0.0.0.0/0 into routing table?
================================================================

Usually, when users want to route traffic to all non-local addresses as use cases below

- to the Internet traffic (i.e. Internet gateway or NAT gateway)
  
- for central traffic control (i.e. VPN gateway, firewall, other cloud network component, or NVA)

What are public subnet and private subnet?
==========================================

In general, public subnet means the interfaces in that subnet have direct access to the Internet. 
For example, in `AWS <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Scenario2.html>`_, a public subnet is a subnet that's associated with a route table that has a route to an Internet gateway. Most of the time, the route entry is 0.0.0.0/0 -> IGW. In addition, AWS IGW performs network address translation (NAT) for instances that have been assigned public IPv4 addresses. Check this `AWS User Guide <https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html>`_ for detail. Same concept applies to other cloud providers.

A private subnet means the interfaces in that subnet have no direct access to the Internet. So the interfaces are better protected. 
However, in many cases, instances/VMs in private subnet also need to access internet. There are multiple ways to deal with it. By manipulating 0.0.0.0/0 route in the subnet associated route table, internet traffic can be redirect to different entities to handle.

Why Aviatrix needs to differentiate public subnet/route table and private subnet/route table?
==============================================================================================

Aviatrix controller programs default route 0.0.0.0/0 pointing to Aviatrix gateways in cloud private route tables for different Aviatrix solutions/use cases. So that the private instances/VMs can access internet through Aviatrix solution. Thus, determining which subnet/route table is private and to program is critical. Additionally, the criteria are slightly different depending on use cases.

Use cases 1: Single SNAT or FQDN in individual Network
========================================================

Users can launch Aviatrix gateways within the network, and enable Single SNAT or FQDN feature on the gateway. Aviatrix gateway will discover 'private' subnets/route tables, then program default route 0.0.0.0/0 pointing to Aviatrix gateway into it. Furthermore, to reduce friction and to shorten downtime when users remove default route in their cloud environment by themselves, Aviatrix performs overwriting default route logic by default. By doing this, private instances/VMs internet traffic will go through Aviatrix gateway, and inspected by FQDN (if enabled).

How Aviatrix defines public or private subnet/route table in each cloud and what are the rules/scenarios for use case 1?
------------------------------------------------------------------------------------------------------------------------

Here we only discuss AWS and Azure.

.. _aviatrixdefinitiontable1:

+--------------------------------------+--------------------------------------+---------------------------------------------+
| **Aviatrix definition table 1**      | **AWS**                              | **Azure**                                   |
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

Rule 1.1: Overwrite default route entry 0.0.0.0/0 in subnet/route table where Aviatrix defines it as “Private” when the below features are enabled:
---------------------------------------------------------------------------------------------------------------------------------------------------

Features:
^^^^^^^^^

- Single SNAT

- FQDN discovery

- FQDN

High-level logic:
^^^^^^^^^^^^^^^^^

- Utilize the `Aviatrix definition table 1 <#_aviatrixdefinitiontable1>`_ above to discover private subnet/route table 

- Save customer's original route entry 0.0.0.0 configuration

- Overwrite route entry 0.0.0.0 to Aviatrix

- Restore back customer's original route entry 0.0.0.0 configuration if users disable the above features

Rule 1.2: Load balance the route entry 0.0.0.0/0 between Aviatrix gateways when users attempt to enable the same type of feature such as Single SNAT/FQDN which is already deployed in the same network.
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

- Refer to `NAT GW Load-balance with AZ affinity <https://docs.aviatrix.com/HowTos/nat_gw_LoadBalance_AZ.html>`_ for Aviatrix load balance detail

Use cases 2: Aviatrix Centralized Egress or on-prem advertising default route 0.0.0.0/0
========================================================================================

In Aviatrix Transit Network solution, for private instances/VMS in spoke networks, users can choose centralized Egress by using Aviatrix FireNet, or using onprem Egress. In either case, Aviatrix transit gateway propagates 0.0.0.0/0 route to Aviatrix spoke gateways, and program 0.0.0.0/0 route in spoke private subnets/route tables. Thus, all private instances/VMs internet traffic are forwarded to transit gateway, and then forwarded to FireNet or onprem networks.

How Aviatrix defines public or private subnet/route table in each cloud and what are the rules/scenarios for use case 2?
------------------------------------------------------------------------------------------------------------------------

Here we only discuss AWS and Azure.

.. _aviatrixdefinitiontable2:

+--------------------------------------+--------------------------------------+---------------------------------------------+
| **Aviatrix definition table 2**      | **AWS**                              | **Azure**                                   |
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
|                                      |                                      +---------------------------------------------+
|                                      |                                      | - UDR: 0.0.0.0/0 to None                    |
|                                      |                                      +---------------------------------------------+
|                                      |                                      | - UDR: 0.0.0.0/0 to Virtual Network         |
+--------------------------------------+--------------------------------------+---------------------------------------------+

Rule 2.1: How to handle default route 0.0.0.0/0 from Aviatrix Transit Gateway?
------------------------------------------------------------------------------

Scenarios:
^^^^^^^^^^

- Learning default route 0.0.0.0/0 from on-prem

- Learning default route 0.0.0.0/0 from Aviatrix Transit peering

- Enabling Central Egress feature

High-level logic:
^^^^^^^^^^^^^^^^^

- Utilize the `Aviatrix definition table 2 <#_aviatrixdefinitiontable2>`_ above to discover private subnet/route table 

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

Rule 2.2: Error out a warning message when users attempt to enable single SNAT/FQDN in a Spoke network where default route 0.0.0.0/0 is already programmed by Rule 2.1.
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Example:
^^^^^^^^

If there is a default route 0.0.0.0/0 learned from on-prem already existed in Aviatrix Transit solution, then Aviatrix will pop out a warning message when users attempt to enable single SNAT/FQDN features in Spoke network.

What is the main difference for **Azure** between R6.2 and prior to R6.2?
=========================================================================

First of all, starting from R6.2, when users utilize Aviatrix feature 'create a VPC tool' to deploy Azure VNet, Aviatrix programs a default route 0.0.0.0 pointing to next hop type "None" in the UDR which is associated with the private subnet; Aviatrix does NOT program this default route in UDR for private subnet prior to R6.2. Please check this `doc <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ for more info. 

Secondly, in R6.2, Aviatrix controller programs default route 0.0.0.0/0 in UDR by following the rules in this document for different Aviatrix solutions/use cases.

Therefore, for those customers who have created Azure VNet via Aviatrix feature 'create a VPC tool' in prior R6.2 or who have created Azure VNet by themselves need to inject a default route 0.0.0.0 pointing to next hop type "None" in the UDR for Aviatrix to differentiate private subnet.

.. disqus::
