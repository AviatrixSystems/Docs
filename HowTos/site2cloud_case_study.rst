


==============================
Site2Cloud Case Study
==============================



The Problem
=================

Traditionally enterprises host their IT applications in their own
data center or at a co-location. Remote sites typically connect to the
data center via an Internet-based IPsec VPN tunnel or MPLS based private
network. Such a hub and spoke architecture has been prevalent in the
last 15 years.

A problem with this deployment architecture is long latency or unstable
Internet connectivity suffered by remote sites, especially between those
in different continents. Such problems cause application time out,
resulting in lost productivity and an unhappy user experience. The solution
to this pain point has been to deploy some form of WAN optimization in both the remote sites and data center to reduce application
latency and reduce data bandwidth. These gears are complex, expensive
and not every enterprise can afford them, and in some cases, they don’t
always work well.

Solution: Bring Application to User
====================================

With the many regions in the world available brought by public cloud
providers, such as AWS and Azure, the application latency issue can now
be solved in a brand-new way. By placing applications in a region of
public cloud that your remote sites are closer to than to the
data center, the long latency issue is eliminated altogether. In
addition, by moving servers to the cloud, you can reduce remote sites'
footprint and the amount of hardware to manage, thus reducing cost for
ongoing maintenance.

The comparison between the two deployment architectures is described
below:

|image0|

In the diagram above, remote sites or branch offices connect to
the headquarters' data center via IPsec tunnels. International sites across
continents can experience hundreds or more milliseconds in latency and
in some countries, connectivity to headquarters is unstable at times.

The first step in deploying an application close to the user is to build a new
network architecture as shown in the right side of the diagram above. A
remote site now connects via an IPsec tunnel to the closest Aviatrix Gateway
in a VPC or VNet in a region closest to the site. Different remote sites
may connect to different Aviatrix Gateways. For example, sites in China
connect to Aviatrix Gateways in the Azure China region and sites in Europe
connect to an Aviatrix Gateway in a VPC in the AWS eu-west-1 region.

After the new network is deployed, you can now replicate Active
Directory to VPC/VNet and deploy applications such as ERP in the cloud
too. The AD authentication latency and application latency can be
reduced to tens of milliseconds. In addition, the remotes are simpler
with fewer hardware equipment to manage.

For how to set up Site2Cloud, follow `Site2Cloud configuration guide. <http://docs.aviatrix.com/HowTos/site2cloud.html>`_


.. |image0| image:: site2cloud_media/image1.png
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
