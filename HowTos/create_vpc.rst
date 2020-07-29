.. meta::
   :description: VPC Network CIDR Management Tool
   :keywords: Aviatrix VPC Tracker, AWS VPC

###################################
Create a VPC
###################################

Use this tool to create a `VPC <https://www.aviatrix.com/learning/glossary/vpc.php>`_ that consists of a public subnet and a private subnet in two AZs and an IGW in the region and account of your choice. 

The VPC CIDR range is from /16 to /24. The VPC name cannot contain underscore character ("_"). 

Go to Useful Tools at the main navigation on the left panel, select Create a VPC -> +Create.

.. tip::

  Select the option Aviatrix Transit VPC if you deploy the AVX Transit Network. All necessary subnets and route tables will be fully populated. 
 
Aviatrix Transit VPC
----------------------

When the "Aviatrix Transit VPC" option is selected, Create a VPC creates the following AWS VPC subnets.

The VPC CIDR range for a Transit VPC is from /16 to /23.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-az1            Use this subnet to launch Aviatrix primary transit gateway.Use this subnet to launch firewall instance in DMZ deployment. 
Public-gateway-and-firewall-mgmt-az2            Use this subnet to launch backup Aviatrix transit gateway. Use this subnet to launch backup firewall instance in a second availability zone in DMZ deployment.
Private-FW-north-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-north-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-south-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Private-FW-south-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Private-FW-ingress-egress-az1                   Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Private-FW-ingress-egress-az2                   Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================


.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
