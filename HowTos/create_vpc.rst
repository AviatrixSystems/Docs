.. meta::
   :description: VPC Network CIDR Management Tool
   :keywords: Aviatrix VPC Tracker, AWS VPC

###################################
Create a VPC
###################################

Use this tool to create a VPC that consists of public subnet and private subnet in two AZs 
and IGW in the region and account of your choice. 

The VPC CIDR range is from /16 to /24.

Go to Useful Tools at the main navigation on the left panel, select Create a VPC -> +Create.

.. tip::

  Select the option Aviatrix Transit VPC if you deploy the Next Gen Transit Network. All necessary subnets and route tables will be fully populated. 
 
Aviatrix Transit VPC
----------------------

When "Aviatrix Transit VPC" option is selected, Create a VPC creates the following AWS VPC subnets.

==========================================      ===================
**Subnet name**                                 **Suggested usage**
==========================================      ===================
Public-gateway-and-firewall-mgmt-az1            Use this subnet to launch Aviatrix primary transit gateway.Use this subnet to launch firewall instance in DMZ deployment. 
Public-gateway-and-firewall-mgmt-az2            Use this subnet to launch backup Aviatrix transit gateway. Use this subnet to launch backup firewall instance in a second availability zone in DMZ deployment.
Private-FW-north-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-north-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Main gateway in DMZ deployment.
Private-FW-sorth-az1                            Use this subnet to create an interface on primary firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Private-FW-sorth-az2                            Use this subnet to create an interface on backup firewall instance that interacts with Aviatrix Companion gateway in DMZ deployment.
Private-FW-ingress-egress-az1                   Use this subnet to create an interface on primary firewall instance handles ingress and egress traffic in DMZ deployment.
Private-FW-ingress-egress-az2                   Use this subnet to create an interface on backup firewall instance handles ingress and egress traffic in DMZ deployment.
==========================================      ===================


.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
