.. meta::
   :description: Site 2 Cloud
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn


==============================
Site2coud 
==============================



The Problem
===========

Traditionally enterprises host their IT applications in their own
datacenter or at a co-location. Remote sites typically connect to the
datacenter via an Internet based IPSec VPN tunnel or MPLS based private
network. Such a hub and spoke architecture has been prevalent in the
last 15 years.

A problem with this deployment architecture is long latency or unstable
Internet connectivity suffered by remote sites, especially between those
in different continents. Such problems cause application time out,
resulting in lost productivity and unhappy user experience. The solution
to this pain point has been to deploy some form of WAN optimization
gears in both the remote sites and datacenter to reduce application
latency and reduce data bandwidth. These gears are complex, expensive
and not every enterprise can afford them, and in some cases, they don’t
always work well.

Bring Application to User
=========================

With the many regions in the world available brought by public cloud
providers, such as AWS and Azure, the application latency issue can now
be solved in a brand new way. By placing applications in a region of
public cloud that your remote sites are closer to than to the
datacenter, the long latency issue is eliminated all together. In
addition, by moving servers to the cloud, you can reduce remote sites
footprint and the amount of hardware to manage, thus reducing cost for
ongoing maintenance.

The comparison between the two deployment architecture is described
below:

|image0|

In the diagram above, remote sites or branch offices connect to
headquarter datacenter via IPSec tunnels. International sites across
continents can experience hundreds or more milliseconds in latency and
in some countries, connectivity to headquarter is unstable at times.

The first step in deploying application close to user is to build a new
network architecture as shown in the right side of the diagram above. A
remote site now connects via IPSec tunnel to a closest Aviatrix gateway
in a VPC or VNet in a region closest to the site. Different remote sites
many connect to different Aviatrix gateways. For example, sites in China
connect to Aviatrix gateways in Azure China region and sites in Europe
connect to Aviatrix gateway in a VPC in AWS eu-west-1 region.

After the new network is deployed, you can now replicate Active
Directory to VPC/VNet, and deploy applications such as ERP in the cloud
too. The AD authentication latency and application latency can be
reduced to tens of milliseconds. In addition, the remotes are simpler
with fewer hardware equipment to manage.

The Aviatrix Benefits
=====================

Aviatrix gateways are deployed and managed by an Aviatrix Cloud Connect
Controller (not shown in the diagram) which itself is a cloud instance
or VM. Some of the benefits are highlighted below:

-  The gateway interoperates with third party routing and firewall
   devices so you can continue to use your existing remote site
   hardware.

-  The gateway is launched from the controller web console with a few
   clicks.

-  Aviatrix gateways support 1:1 redundancy for high availability
   without any additional helper instance or VM. The controller monitors
   all IPSec tunnel status and automatically re-program the cloud
   infrastructure routing table and switch to a standby gateway instance
   when the tunnel goes down.

-  The controller provides diagnostic capabilities for troubleshooting
   the gateway and IPSec tunnel status.

-  Cloud VPN capability is integrated with the gateway, which enables
   individual users at remote sites to connect to VPC/VNet securely and
   directly without having to hair pining back to headquarter
   datacenter.

-  Extensive logging allows administrators to have complete visibility
   of network event and user browsing history.

-  You can choose to route only those traffic destined to VPC/VNet
   through the encrypted tunnel or route all traffic to VPC/VNet (full
   tunnel mode). When full tunnel mode is selected, Internet bound
   traffic is also backhauled to the cloud.

Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

Before you begin, you need to decide if you like to enable HA for the
gateway that connects all the sites. The HA capability applies to all
gateways that perform site to cloud functions.

The site to cloud configuration workflow is as follows, with major steps
highlighted.

1. (Optional) Enable HA

   Go to site2Cloud -> Options, select Enable HA, then Save.

2. Create a gateway in a VPC where you like to connect all sites.

   Go to Gateway -> New Gateway. The gateway may have VPN Access
   disabled.

3. (Optional) Create a secondary gateway in the same VPC.

   Go to Gateway -> New Gateway. The gateway may have VPN access
   disabled.

4. Create a connection to a remote site

   Go to site2Cloud -> Add New, make sure,

   a. Select the VPC/VNet Name where Aviatrix gateway for encryption is
      launched.

   b. If HA is not enabled:

      i. At Gateway field, select a gateway launched in the earlier
         step.

   c. Else if HA is enabled:

      i.  At Primary Gateway field, select a gateway launched earlier as
          primary gateway.

      ii. At Backup Gateway field, select a gateway launched earlier as
          backup gateway.

   d. Input the connection with a unique name, for example,
      NewYork-site.

   e. At Remote Gateway IP Address, enter the public IP address of the
      edge router for the remote site.

   f. At Remote Subnet, enter network CIDR of the remote/customer site. If
      there are multiple subnets, enter each one separated with comma.
      For example, you may enter “192.168.1.0/24,192.168.2.0/24” without
      the quote.

   g. Pre-shared Key is an optional field. If you leave it blank, Aviatrix will auto generate a pre-shared key. You can paste your own pre-shared key if you prefer. 

   h. Do not select Private Route Encryption. (This feature is for
      overlay encryption on a AWS Direct Connect or Azure Express Route)

   i. If you leave Local Subnet blank, Local Subnet will be the VPC/VNet CIDR. You can add more Local Subnet CIDR blocks, separate by comma. Make sure you include the VPC/VNet as well. These Local Subnets are advertised to Remote Subnets that the site2cloud connection can reach. You can change this settings later. 

   j. Algorithms field is prepopulated with default values. Click the field if you need to customize the algorithms. 

   j. Click OK to create a connection. 

5. Generate remote site configuration template

   Go to site2Cloud

   a. Select the connection you just created, a EDIT panel will appear.

   b. Click Download Configuration.

   c. If your remote site device is not listed in the dropdown menu,
      simply select an available one in the menu.

   d. Click “Yes, Download” to download a template file that contains
      the gateway public IP address, VPC CIDR, pre-shared secret and
      encryption algorithm. Incorporate the information to your remote
      router/firewall configuration.

6. Repeat the above step 4 and step 5 for each additional remote site.

Troubleshooting
===============

To check a tunnel state, go to site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to site2Cloud -> Diagnostics.

.. |image0| image:: site2cloud_media/image1.png
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
