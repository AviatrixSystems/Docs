.. meta::
   :description: Geo VPN Reference Design
   :keywords: Geo VPN, VPN, aviatrix, remote user vpn, openvpn, user vpn



===========================
OpenVPN for Geo Locations
===========================

If you have a global work force that needs to access the cloud with the
best user experience, building a cloud network with Geo VPN access
capability is the right solution for you. Geo VPN combines our scale out
VPN solution with latency based routing to dynamically route VPN users
to the nearest VPN access gateway based on the latency between the user
and the gateways.

In this reference design we also enable split tunnel mode, that is, only
traffic destined to the cloud go through the SSL VPN tunnel. If a user
does general browsing to Internet or watch movies from Hulu, traffic
should be routed via WI-FI to ISP to Internet. You do not wish to pay
AWS for this type of compute and network costs.

You may combine this reference design with other capabilities and
reference designs to build out a network that meets your requirements.

Network Diagram
===============

The network diagram is shown below, where there are two sets of VPN
access gateways, one in us-west-2 and another in eu-central-1. When a
VPN user access the cloud, the network returns a VPN server IP address
(the ELB DNS name) based on which region is closer to the user.

|image0|

Configuration Workflow
======================

Tips: Upgrade to the latest software if there is an alert message on the
controller dashboard. Mouse over the labels to get help. The description
in each step does not include all fields. Make sure you have the correct
VPC ID and its region for the VPC ID field and region in each step.

1. Create a VPN gateway cluster in VPC 172.31.0.0/16.

   Go to Gateway menu and click create. Make sure:

   a. At Gateway Name field, give it a distinct and convenient name. For
      example, vpn-west2-1.

   b. Enter VPC ID for 172.31.0.0/16

   c. Enable NAT is selected

   d. VPN Access is selected.

   e. The VPN CIDR Block must be a subnet that is outside of all your
      current and future VPC CIDR range. In the example above, you may
      enter 192.168.2.0/24 (say you’ll never plan to configure a VPC in
      the 192.168.0.0/16 range).

   f. Split Tunnel Mode is selected.

	|      	i.  For the Additional CIDRs field under Split Tunnel, enter other
				   VPCs CIDR or other network CIDRs you wish to reach beyond the
				   VPC you are connecting to. In the example shown, you should
				   enter 10.10.0.0/16,10.5.0.0/16,10.80.0.0/16. It is a good idea
				   to do some planning to include future VPCs or network address
				   ranges. (In a case where you never have to worry about
				   connecting to your corporate VPN, you may consider enter the
				   entire private network address range in the Additional CIDRs
				   range field, separating by comma:
				   172.16.0.0/12,10.0.0.0/8,192.168.0.0/16. Doing so afford you
				   not to have to reconfigure the gateway if you need to add more
				   VPCs for networking with different CIDR range in the future.)
	|
	|       ii. (Optional) For the Nameservers and Search Domain fields under
			    Split Tunnel, enter your private DNS server IP addresses and
			    search domain if you have setup to use DNS names to access
			    instances inside VPCs. Leave it blank if you do not know what
			    they are. If you use AWS Route 53 private hosted zone and
			    records for your host names, make sure the Nameserver is the
			    DNS server of the VPC. In this case, you should enter
                72.31.0.2

   g. Enable AWS ELB is selected.

   h. Save Template is selected. This Template saves you from entering
      repeated fields if you wish to create more gateways with the same
      configuration.

   i. Repeat Steps a-g to create more gateways with VPN enabled. You may
      select different AZs for the Public Subnet field so that your
      gateways are load balanced between AZs.

2. Create a VPN gateway cluster in VPC 10.80.0.0/16

   Repeat the procedures in step 1 to create a second VPN gateway
   cluster in eu-central-1

3. Enable Geo VPN

   a. Go to OpenVPN -> Configuration -> Geo VPN, select Enable

   b. For Domain Name, enter a public domain name that is registered on
      AWS Route 53 as a public hosted zone. For example, aviatrixvpn.com

   c. Enter any name you like for VPN Service Name, for example, OpsVPN.
      The VPN Service Name combines with Domain Name forms the Geo VPN
      server name.

   d. Select one ELB from the drop down menu for ELB DNS Name. Click OK.

   e. Click Add to add the second ELB from the drop down menu.

   f. If you have more ELB VPN gateway clusters in the future, you can
      add more later.

4. Build encrypted routing networks to reach other VPCs.

   a. Launch a gateway without VPN capability in VPC 172.31.0.0/16. This
      is the routing gateway, make sure:

	|      i.   At Gateway Field, give it a distinct and convenient name. For
				example, dev-east-1, or teamKardashian-east-1 for the
				Kardashian game project.
	|
	|      ii.  VPN Access is not selected.
	|
	|      iii. Enable NAT is NOT selected (since step 1 has enabled NAT
				function for this VPC)
	|
	|      iv.  Save Template is not selected. (so that you don’t overwrite
				the hard work of entering the fields of gateways with VPN
				enabled)

   b. Repeat the above procedure for VPC 10.80.0.0/16.

   c. Repeat the above procedure for VPC 10.10.0.0/16, 10.5.0.0/16.
      Select Enable NAT if you want instances in these 3 VPCs to be able
      to reach Internet directly.

   d. Configure encrypted peering. Go to VPCs menu and Encrypted Peering
      -> Add. Note each VPC is represented by one or more gateways. Make
      sure you want to peer between two gateways without VPN capability.

5. (Optional) Setup Stateful Firewall rules at VPC

   Go to Gateway, select a Gateway, click Edit. Click Security Policies to add any policies for each VPC.

6. The above steps complete the network infrastructure setup.

7. Add Users and Profiles

   a. Go to OpenVPN ->  Profiles to create as many profiles as
      you please. The target field can be FQDN (DNS names or fully
      qualified domain name).

   b. Go to OpenVPN -> VPN Users to add as many user as you
      please.

	 |     	i.  When Geo VPN is enabled, VPC ID association is no longer
			    relevant. You can select any VPC ID.

	 |     	ii. Associate each user with a profile. Note if no profile is
			    associated, user has full access to all resources. When a user
			    is added to the database, an email with .ovpn file or .onc
			    (for Chromebooks) will be sent to the user with detailed
			    instructions.

Troubleshooting
===============

If Enabling Geo VPN fails, make sure the Domain Name you enter is a
registered name under AWS Route 53 in a public hosted zone. In addition,
this Domain name must be hosted in the account that you have access
privilege. If the domain name is hosted by another account, you will not
be able to add DNS record. To register a public domain name under your
account in AWS, go to AWS management console portal. Under Services,
select Route 53 Management Console. Under Domains, select Registered
domains, then click Register Domain.

.. |image0| image:: GeoVPN_media/image1.png

   
.. disqus::
