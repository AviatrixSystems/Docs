.. meta::
   :description: VPC Network CIDR Management Tool
   :keywords: Aviatrix VPC Tracker, AWS VPC, AZURE VNet

###################################
Create a VPC
###################################

Use this tool to create a `VPC <https://www.aviatrix.com/learning/glossary/vpc.php>`_ in AWS or a `VNet <https://a.aviatrix.com/learning/glossary/vnet.php>`_ in AZURE in the region and account of your choice. In addition, starting from 6.1, this tool creates multiple route tables associated with public and private subnets. One use case is to allow traffic load balancing when Aviatrix Spoke gateways are deployed. 

To configure, go to Useful Tools at the main navigation on the left panel, select Create a VPC -> +Create.

The VPC/VNet CIDR range is from /16 to /24.

Advanced
---------

When the "Advanced" option is selected, users are able to customize subnet size and number of pair of subnets (public subnet and private subnet). For example, entering 1 for Number of Availability Zones/Number of Subnets means that this tool will create 1 public subnet and 1 private subnet in the VPC/VNet.

The VPC/VNet CIDR range is from /16 to /24.

Aviatrix Transit VPC
----------------------

When the "Aviatrix Transit VPC" option is selected, all necessary subnets and route tables will be fully populated as below:

The VPC CIDR range for a Transit VPC is from /16 to /23.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-az1            Use this subnet to launch Aviatrix primary transit gateway. Use this subnet to launch firewall instance in DMZ deployment. 
Public-gateway-and-firewall-mgmt-az2            Use this subnet to launch Aviatrix backup transit gateway. Use this subnet to launch backup firewall instance in a second availability zone in DMZ deployment.
Private-FW-north-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-north-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-south-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Private-FW-south-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Public-FW-ingress-egress-az1                    Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Public-FW-ingress-egress-az2                    Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================

Aviatrix FireNet VPC/VNet
-------------------------

When the "Aviatrix FireNet VPC" or "Aviatrix FireNet VNet" option is selected, all necessary subnets and route tables will be fully populated as below:

The VPC/VNet CIDR range for a FireNet VPC/VNet is from /16 to /24.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-1              Use this subnet to launch Aviatrix primary firenet gateway. Use this subnet to launch firewall instance in a DMZ deployment. 
Public-gateway-and-firewall-mgmt-2              Use this subnet to launch Aviatrix backup firenet gateway. Use this subnet to launch backup firewall instance in a DMZ deployment.
Public-FW-ingress-egress-1                      Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Public-FW-ingress-egress-2                      Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================


.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
