.. meta::
   :description: Quick Tour
   :keywords: Aviatrix Quick Tour, Aviatrix, remote user VPN, AWS user VPN, OpenVPN, SSL VPN


Quick Tour
===========

Scaling Out a Remote User VPN Solution
----------------------------------------------------


No more bastion stations and jump hosts. Provide your employees with the
ability to seamlessly access instances with private IP addresses by
using our user VPN capability. To configure a Cloud VPN:

1. At the Gateway menu, create a gateway with VPN access enabled.
2. Repeat the step above for multiple gateways if ELB is
   enabled to create a scale out VPN solution.
3. (Optional) At OpenVPN® > Profiles, define VPN user profiles and
   access policies for each profile that will be dynamically enforced as
   user connects to the cloud at the network perimeter.
4. Navigate to OpenVPN® > VPN Users and add VPN users.
5. For a single VPC/VNet user VPN solution, open `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`__
6. For a multi-VPC/VNet user VPN solution, open this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__

Encrypted Peering
----------------------------

1. At the Gateway menu, create a gateway in an
   existing VPC/VNet.
2. Repeat step 1 for a different VPC/VNet.
3. At Peering > Encrypted Peering, click **New Peering** to peer the two
   gateways.
4. For a complete end-to-end solution, see this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

Geo VPN
--------------------

If you have a global workforce and would like to give your employees
the best user experience in accessing the services in the cloud, Geo VPN is
the right solution for you. Go to Open VPN > Geo VPN to enable Geo VPN.
See this `reference
design <http://docs.aviatrix.com/HowTos/GeoVPN.html>`__.

Developer’s Sandbox
-------------------------------

If keeping your production environment secure while giving your
developers an isolated environment to learn and experiment with new
technologies is a challenge for you, see the `Developer’s
Sandbox <http://docs.aviatrix.com/HowTos/DevSandbox.html>`__
feature.

AWS Global Transit Network
------------------------------------


Follow `these instructions <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to build an AWS Global Transit Network. 

Site2Cloud Solution
----------------------------

If you need to connect to your partner or customer sites to a VPC/VNet
but do not want to replace the edge routers or firewalls that is already
deployed at these sites, check out our `Site2Cloud reference
design <http://docs.aviatrix.com/HowTos/site2cloud.html>`__.

Help
-----------------

Under the Help menu, check out FAQs and additional implementation guides. Please open a support ticket at the `Aviatrix Support Portal <https://support.aviatrix.com>`_ to get immediate support.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
