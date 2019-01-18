.. meta::
  :description: Deployment limitation for TGWs--VPN+BGP+ECMP--PANs
  :keywords: Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, PAN Firewall, Transit Gateway Attachment, BGP, ECMP


=======================================================================
TGW ECMP for DMZ Deployment  Limitation Test Validation 
=======================================================================

Introduction
--------------

This document demonstrates that using TGW ECMP functions to deploy multiple (or multi-AZ) 
firewalls for traffic inspection between on-prem and cloud does not work. 

TGW VPN supports ECMP protocol that can load balance traffic across multiple VPN tunnels. 
The question is can TGW ECMP be used to deploy a transit DMZ as shown in the diagram below?

|dmz_with_ecmp|

If the above deployment were feasible, customers could inspect traffic between on-prem and cloud and effectively build a scale out DMZ architecture. 

Test Validation
----------------

The test setup uses PAN as the example firewall and is described in the following.

VPC1 is a Spoke VPC attached to TGW1. An EC2 instance in VPC1 serves as the HTTP client.

VPC3 is another Spoke VPC attached TGW2. VPC3 simulates on-prem data center with an EC2 instance serving as the
HTTP server. TGW-2 simulates an on-prem router, which also runs ECMP with the two PANs in VPC2.

VPC2 is a Transit VPC and has two Available Zones (AZs). Each AZ has one PAN firewall to ensure HA. PAN1 is in
AZ-a and PAN2 is in AZ-b.

Both PANs have three interfaces and all three interfaces have EIPs associated:

    - eth0: Management interface dedicated for remote access to PAN's portal
    - eth1: Public IP used for creating Customer Gateway with TGW1
    - eth2: Public IP used for creating Customer Gateway with TGW2

|tgw-pan-ecmp|

Our configuration steps are as following:

1. Go to AWS Console and create two TGWs (TGW1 and TGW2). Both have "VPN ECMP Support" enabled.

2. Attach VPC1 to TGW1 and attach VPC3 to TGW2 at AWS console.

3. Update the route tables of VPC1 and VPC3:

    - VPC1: Traffic destinating to VPC3 CIDR -> TGW1-ID
    - VPC3: Traffic destinating to VPC1 CIDR -> TGW2-ID

4. Create two VPN Transit Gateway Attachments at TGW1. One attachment uses PAN1-eth1 as Customer Gateway and the
other attachment uses PAN2-eth1 as Customer Gateway. Both attachments require BGP running between PANs and TGW1.
BGP ASN numbers for both Customer Gateways are the same (64999 in this test).

5. Create two VPN Transit Gateway Attachments at TGW2. One attachment uses PAN1-eth2 as Customer Gateway and the
other attachment uses PAN2-eth2 as Customer Gateway. Both attachments require BGP running between PANs and TGW2.
BGP ASN numbers for both Customer Gateways are the same (64999 in this test).

6. Configure PAN1 and PAN2 to bring up IPSec tunnels with TGW1 and TGW2. There are two IPSec tunnels for each
attachment between the PAN and its attached TGW. Both PANs advertise a default route (0.0.0.0/0) and VPC2 CIDR
(10.201.0.0/16) through BGP to TGW1 and TGW2.

7. Verify ECMP is running between TGWs and PANs.

    - At AWS Console, check Transit Gateway Route Tables for TGW1 and TGW2. For each route advertised by PANs (0.0.0.0/0 and 10.201.0.0/16), there are four attachments. These four attachments are the four IPSec tunnels from both PAN1 and PAN2. TGW will use ECMP to distribute traffic among these four IPSec tunnels. One sample TGW route table is as below:

|tgw-pan-ecmp1|

    - At PAN portal, check both PANs' route tables. Taking PAN1 as an example, traffic destinating to VPC1 CIDR (10.200.0.0/16) has two next hops. These two next hops are TGW1 IP addresses for terminating the two IPSec tunnesl between PAN1 and TGW1. Same thing for traffic destinating to VPC3 CIDR (10.202.0.0.16). The image below is route table from PAN1. Please note that "E" flag highlighted indicates ECMP is running among the two tunnels.

|tgw-pan-ecmp2|

    - Run traffic monitor at PAN. Send pings between VPC1 and VPC3 and verify ICMP packets flowing through PAN1/PAN2.



After bringing up the setup, we run wget at VPC1 EC2 to browse the HTTP server running at VPC3 EC2 and observe the
following behaviors:

1. Stop PAN2 at AWS Console and only keep PAN1 running. wget from VPC1 to VPC3 always succeed.

2. Stop PAN1 at AWS Console and keep PAN2 running. wget from VPC1 to VPC3 always succeed.

3. Keep both PAN1 and PAN2 running. wget from VPC1 to VPC3 sometimes succeed. Sometimes, wget times out. When
timeout happens, TCP packets from VPC1 to VPC3 go through PAN1 or PAN2, but the returning packets from VPC3 to VPC1
are distributed to a different PAN by TGW2's ECMP. The other PAN will drop the returning packets due to missing
initiating TCP connection.

Summary
---------

Running ECMP between TGW and multiple firewall instances cannot guarantee the returning traffic will go through the same firewall instance as the
initiating traffic. As such, the ECMP based solution cannot be used to load balance traffic between multiple firewall instances between on-prem and cloud.

The technical reason behind it is that the two sets of ECMP running between firewall and TGW and between firewall and on-prem have no coordination among them. The ECMP decision to determine 
the next hop are made independently, resulting in the situation when the return traffic does not always goes through the same firewall instance as the initiating traffic. 

.. |dmz_with_ecmp| image:: tgw_pan_ecmp_media/dmz_with_ecmp.png
   :scale: 30%

.. |tgw-pan-ecmp| image:: tgw_pan_ecmp_media/tgw-pan-ecmp.png
   :scale: 30%

.. |tgw-pan-ecmp1| image:: tgw_pan_ecmp_media/tgw-pan-ecmp1.PNG
   :scale: 30%

.. |tgw-pan-ecmp2| image:: tgw_pan_ecmp_media/tgw-pan-ecmp2.PNG
   :scale: 30%

.. add in the disqus tag

.. disqus::

