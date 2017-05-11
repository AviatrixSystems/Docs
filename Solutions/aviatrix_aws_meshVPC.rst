|image0|

##########################################################
**Building a Mesh Cloud Network**
##########################################################
##########################################################
**AWS VPCs and Datacenter**
##########################################################

AWS Reference Deployment Guide
==============================

Last updated: May 10, 2017

1  Overview
===========

Aviatrix Systems provides the next generation cloud networking solution
built from the ground up for the public cloud. Aviatrix simplifies the
way you enable site to cloud, user to cloud and cloud to cloud secure
connectivity and access. The solution requires no new hardware and
deploys in minutes.

Aviatrix CloudN is a virtual appliance deployed in datacenter.
Datacenter Extension is a unique technology on CloudN. It allows rapid
scaling of AWS Virtual Private Cloud (VPC) by removing the pain point of
building secure connections to the VPCs.

|image1|

2  Aviatrix Datacenter Extension Key Benefits
=============================================

    **Easy to Deploy** Deployed without touching existing network
    infrastructure.

    **Fast to Provision** Provision a VPC with secure tunnel to
    datacenter in minutes.

    **Simple to Use** 1-click operation to create and delete VPC with
    secure tunnels.

    **Rapid Scaling** Creates multiple VPCs in any region with secure
    connectivity.

    **Full Mesh Connectivity** inter region VPC can be securely peered
    in minutes.

    **IT Supported Self Service** Work flow allow multiple users to
    create VPCs.

    **Billing Visibility** Support multiple AWS accounts for different
    departments, DevOps and projects

    **Remote Access Capability**. Built in VPN server allows remote
    workers to access VPC directly. Ideal for partners and remote
    workers.

3  How it Works
===============

3.1  Mix Layer 2 and Layer 3 Technologies
-----------------------------------------

CloudN uses a mixed Layer 2 and Layer 3 technologies whereas the CloudN
virtual appliance behaves as a Layer 2 bridge and Gateway (launched by
CloudN at VPC creation time) behaves as a Layer 3 router. The design of
CloudN as a Layer 2 bridge makes it possible to build an overlay IPSec
tunnel to AWS VPC without involving edge routers in the network. The
design of Gateways as a Layer 3 router makes it possible for the VPC to
fully utilize all AWS VPC underlying infrastructures and services
without requiring any software agent reside in any of the instances.

Instances within the VPC communicate with each other directly and
transparently without involvement of Gateway. From the user’s
perspective, what CloudN creates is a standard VPC.

CloudN views each VPC as the smallest autonomous environment, it allows
you to create security policies to deny any subnet or hosts on premise
to access any VPC. For example, you may want to block developers from
accessing production VPC. By default, inter-VPC communication is
blocked. By using VPC/VNet peering capability, you can establish direct
secure tunnels among VPC in the same region or across different regions.

Enterprise users can access instances seamlessly in all private and
public subnets over the secure tunnel using instance private addresses.
All instances on private subnets can reach back to enterprise.
Optionally packets from instances on private subnets can reach Internet
directly without being first sent back to the enterprise.

3.2  Dividing Subnets
---------------------

CloudN works by dividing the subnet where cloudN is deployed into sub
segments (or smaller subnets). The VPC CIDRs created by cloudN are one
of the sub segments. The mechanism is illustrated below. VPC in the
below diagram could be replaced with a VNet.

|image2|

Where a local subnet 10.16.0.0/16 has a default gateway 10.16.0.1. The
subnet is divided into 4 sub segments. The default gateway and CloudN IP
address fall into one segment. The rest of each segment is mapped to a
VPC CIDR, in this case, the VPC CIDRs are 10.16.32.0/19, 10.16.64.0/19
and 10.16.96.0/19. If this subnet 10.16.0.0/16 is reachable from other
network in the enterprise, then the instances inside each VPC takes
private IP address as if they are on the local subnet 10.16.0.0/16. For
users in the enterprise, it is as if they are communicating with hosts
on the local network.

4 Pre Configuration Checklist
=============================

4.1  AWS EC2 Account
--------------------

You need to have an AWS account to use most of the commands on CloudN.
Note that CloudN support multiple CloudN cloud accounts with each one
associated with a different AWS IAM account, but there needs to be at
least one to start with.

4.2  Deploy the Aviatrix CloudN Virtual Appliance
-------------------------------------------------

Reference `the startup
guide <https://s3-us-west-2.amazonaws.com/aviatrix-download/CloudN+Startup+Guide.pdf>`__
to deploy the virtual appliance.

Check and make sure you can access the Aviatrix Controller dashboard and
login with an administrator account. The default URL for the Aviatrix
Controller is:

https://<public ip address of Aviatrix Controller>

5 Configuration Steps
=====================

5.1    ADD YOUR NEW SECTIONS
--------------------------------
JUST START TYPING HERE


5.2    ADD YOUR NEW SECTIONS
--------------------------------
JUST START TYPING HERE



Aviatrix Support
----------------

Standard: 8x5 Enterprise Phone Support, email support, product-specific
knowledge-base and user forum is included. For Additional levels of
support and support offers please visit:

http://www.aviatrix.com/support

AWS Support
-----------

AWS Support is a one-on-one, fast-response support channel that is
staffed 24x7x365 with experienced and technical support engineers. The
service helps customers of all sizes and technical abilities to
successfully utilize the products and features provided by Amazon Web
Services. `Learn more <https://aws.amazon.com/premiumsupport/>`__

.. |image0| image:: media/image1.png
   :width: 3.5in
   :height: 0.5in
.. |image1| image:: media/image2.png
   :width: 7.00000in
   :height: 4in
.. |image2| image:: media/image3.png
   :width: 6.5in
   :height: 2.5in
.. |image3| image:: media/image4.png
   :width: 7in
   :height: 4in
   :scale: 150%
