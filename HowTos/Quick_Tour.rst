.. meta::
   :description: Quick Tour
   :keywords: Aviatrix Quick Tour, Aviatrix, remote user VPN, AWS user VPN, OpenVPN, SSL VPN


Quick Tour
===========

Scale out remote user VPN Solution
""""""""""""""""""""""""""""""""""

No more bastion stations and jump hosts. Provide your employees with the
ability to seamlessly access instances with private IP addresses by
using our user VPN capability. To configure Cloud VPN:

1. At Gateway menu, create a gateway with VPN access enabled.

2. Repeat the above step for multiple gateways if ELB is
   enabled to create a scale out VPN solution.

3. (Optional) At OpenVPN -> Profiles, define VPN user profiles and
   access policies for each profile that will be dynamically enforced as
   user connects to the cloud at the network perimeter.

4. At OpenVPN -> VPN Users, add VPN users.

5. For single VPC user vpn solution, check out `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`__

6. For a multi VPC user vpn solution, check out this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__

Encrypted Peering
""""""""""""""""""

1. At Gateway menu, create a gateway in an
   existing VPC/VNet.

2. Repeat the step 1 for a different VPC/VNet.

3. At Peering -> Encrypted Peering, click New Peering to peer the two
   gateways.

4. For a complete end to end solution, check out this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

Geo VPN
""""""""

If you have a global work force and would like to give your employees
the best user experience accessing the services in the cloud, Geo VPN is
the right solution for you. Go to Open VPN -> Geo VPN to enable Geo VPN.
Check out this `reference
design <http://docs.aviatrix.com/HowTos/GeoVPN.html>`__.

Developer’s Sandbox
"""""""""""""""""""

If keeping your production environment secure while giving your
developers’ isolated environment to learn and experiment new
technologies is a challenge for you, `Developer’s
Sandbox <http://docs.aviatrix.com/HowTos/DevSandbox.html>`__
maybe a feature you want to explore.

Transitive Peering
""""""""""""""""""""

Use `transitive peering reference
design <http://docs.aviatrix.com/HowTos/TransPeering.html>`__
to see how to connect to your on-prem or co-location.

Site2Cloud Solution
""""""""""""""""""""

If you need to connect to your partner or customer sites to a VPC/VNet
but do not want to replace the edge routers or firewalls that is already
deployed at these sites, check out our `Site2Cloud reference
design <http://docs.aviatrix.com/HowTos/site2cloud.html>`__.

Docker Container Access
"""""""""""""""""""""""""""""""""

To learn how you can use Aviatrix to access containers remotely in the
cloud, check out this `reference
design <http://docs.aviatrix.com/HowTos/ContainerAccess.html>`__.

Environment Stamping
""""""""""""""""""""""

If you wish to provide a differentiated and more secure SaaS services to
your enterprise customers, Environment Stamping solution is the right
one for you. Environment Stamping enables you to deploy identical and
repeatable VPCs environment while providing unique access to all
instances in VPC. Never have to manage VPC CIDRs, security policies and
instances addresses any more.

At VPC/VNet -> Environment Stamping, go to Read Me First to learn about
this capability. Check out this `reference
design <http://docs.aviatrix.com/HowTos/EnvironmentStamping.html>`__.

Help
"""""

Under Help menu, check out FAQs and additional implementation guides. Send
email to support@aviatrix.com to get immediate support.

.. disqus::
