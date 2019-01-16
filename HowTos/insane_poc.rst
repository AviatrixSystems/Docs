.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGW


===============================================
Insane Mode POC Instructions
===============================================

This document describes steps for testing functionality and performance with Insane Mode. For more information on Insane Mode, check out `this document. <https://docs.aviatrix.com/HowTos/insane_mode.html>`_

Preparation
---------------------------------------------------

 a. Custom upgrade to preview release. Settings -> Maintenance -> Upgrade -> UPGRADE TO CUSTOM RELEASE, enter preview for the "Release Version" field. 

 #. Update IAM policies. It's likely the Aviatrix required IAM policies are out of date. Follow the instructions `here <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_ to update IAM policies for Controller account and all gateways accounts. 

1. Test Spoke to Spoke Performance
------------------------------------

This phase test performance between two instances in two different Spoke VPCs. The two Spoke VPCs are connected by two Aviatrix gateway launched in Insane Mode.

 a. Launch a Spoke gateway. Go to Transit Network -> Setup, scroll down to `Step 4 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_ to launch a Spoke gateway. Select "Insane Mode Encryption". Select a C5 instance size. (See `this table <https://docs.aviatrix.com/HowTos/insane_mode.html#instance-sizes-and-ipsec-performance>`_ for performance guidance.) The "Public Subnet" field should be auto populated as the Aviatrix Controller looks for a unused /28 CIDR segment in the VPC to create a subnet and launch the Insane mode gateway. 

 #. Launch another Spoke gateway. Repeat the above step for the second Spoke gateway. 

 #. Build an encrypted tunnel between the two gateways. Go to Peering -> Encrypted Peering -> Add New. Select the two gateways and click OK. 

 #. Test performance. Launch two Linux instances (the instance size should be comparable to the gateway size. For example, they should all be C5.2xlarge) in each Spoke VPC. Open security groups of the instances to allow for inbound traffic from the other Spoke VPC. Note you can launch the instances in public subnet in the Spoke VPC, or use `Aviatrix User VPN feature <https://docs.aviatrix.com/HowTos/uservpn.html>`_ to access the instance on the private subnet. When you run iperf test, you should run them with private IP addresses. 

  For example, the server Linux instance has IP address 10.10.10.109 and the client Linux instance has IP address 10.12.11.100. The client instance should run "iperf3 -c 10.10.10.109 -P 8" where P represents the number of TCP streams and where 10.10.10.109 represents the private IP address of the server Linux instance. .  

.. tip::

  You can discover MTU sizes of your network by go to Troubleshoot -> Network -> GATEWAY UTILITY, select a gateway and enter a destination IP address, click Trace Path. 

2. Test Transit VPC to on-prem Performance
--------------------------------------------

This phase tests performance between an instance in the Transit VPC and on-prem VM. It requires you deploy Aviatrix CloudN hardware appliance in your on-prem.

3. Test Spoke to on-prem Performance
-------------------------------------

This phase tests performance between an instanced in the Spoke VPC and on-prem. 

.. |tunnel_diagram| image:: insane_mode_media/tunnel_diagram.png
   :scale: 30%


.. |insane_tunnel_diagram| image:: insane_mode_media/insane_tunnel_diagram.png
   :scale: 30%

.. |insane_transit| image:: insane_mode_media/insane_transit.png
   :scale: 30%

.. |insane_datacenter| image:: insane_mode_media/insane_datacenter.png
   :scale: 30%

.. |datacenter_layout| image:: insane_mode_media/datacenter_layout.png
   :scale: 30%

.. |image1| image:: transitvpc_designs_media/multiRegions.png
   :width: 5.55625in
   :height: 3.265480in

.. |InsaneBeta| image:: insane_mode_media/InsaneBeta.png
   :width: 5.55625in
   :height: 3.265480in

.. disqus::
