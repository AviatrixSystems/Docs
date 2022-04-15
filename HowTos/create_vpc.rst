.. meta::
   :description: VPC Network CIDR Management Tool
   :keywords: Aviatrix VPC Tracker, AWS VPC, Azure VNet

###################################
Creating a VPC/VNet
###################################

Use this tool to create a `VPC <https://www.aviatrix.com/learning/glossary/vpc.php>`_ in AWS or a `VNet <https://a.aviatrix.com/learning/glossary/vnet.php>`_ in Azure in the region and account of your choice. In addition, starting from 6.1, this tool creates multiple route tables associated with public and private subnets. One use case is to allow traffic load balancing when Aviatrix Spoke gateways are deployed. 

To create an AWS VPC or Azure VNet:

1. Log into your Aviatrix Controller.
2. Select Useful Tools > Create a VPC from the left sidebar.
3. Click **+Add New**.

The VPC/VNet CIDR range is from /16 to /24.

Advanced
------------------

Mark the **Advanced** checkbox to customize subnet size and number of pair of subnets (public subnet and private subnet). For example, enter 1 for Number of Availability Zones/Number of Subnets to create 1 public subnet and 1 private subnet in the VPC/VNet.

The VPC/VNet CIDR range is from /16 to /24.

Aviatrix Transit VPC
----------------------------------------

Mark the **Aviatrix Transit VPC** checkbox to fully populate all necessary subnets and route tables as shown below:

The VPC CIDR range for a Transit VPC is from /16 to /23.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-az1            Use this subnet to launch Aviatrix primary Transit Gateway. Use this subnet to launch firewall instance in DMZ deployment. 
Public-gateway-and-firewall-mgmt-az2            Use this subnet to launch Aviatrix backup Transit Gateway. Use this subnet to launch backup firewall instance in a second availability zone in DMZ deployment.
Private-FW-north-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Main Gateway in DMZ deployment.
Private-FW-north-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Main Gateway in DMZ deployment.
Private-FW-south-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Companion Gateway in DMZ deployment.
Private-FW-south-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Companion Gateway in DMZ deployment.
Public-FW-ingress-egress-az1                    Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Public-FW-ingress-egress-az2                    Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================

Aviatrix FireNet VPC/VNet
--------------------------------------

Mark the **Aviatrix FireNet VPC** or **Aviatrix FireNet VNet** checkboxes to fully populate all necessary subnets and route tables as shown below:

The VPC/VNet CIDR range for a FireNet VPC/VNet is from /16 to /24.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-1              Use this subnet to launch Aviatrix primary FireNet Gateway. Use this subnet to launch firewall instance in a DMZ deployment. 
Public-gateway-and-firewall-mgmt-2              Use this subnet to launch Aviatrix backup FireNet Gateway. Use this subnet to launch backup firewall instance in a DMZ deployment.
Public-FW-ingress-egress-1                      Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Public-FW-ingress-egress-2                      Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================

Cloud Type: Azure
-----------------------------

Starting from R6.2, the Create a VPC tool programs a default route 0.0.0.0 pointing to the next hop type "None" in User Defined Route Table (UDR) for all private subnets it creates. 
Any public subnet it creates does not have such UDR default route entry. 

+----------+--------------------+-------------------+
| **Name** | **Address prefix** | **Next hop type** |
+----------+--------------------+-------------------+
| default  | 0.0.0.0/0          | None              |
+----------+--------------------+-------------------+

.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
