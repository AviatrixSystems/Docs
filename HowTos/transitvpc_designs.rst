.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering


===================================
Transit Network Design Patterns
===================================

`Aviatrix Transit VPC  <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ provides a workflow
to create a Transit VPC GW with a set of Spoke VPC GWs. 

From one Aviatrix Controller, you can setup 
Transit Groups in a single region or across multiple AWS regions. 

Single Region Transit VPC Design
----------------------------------

The use case for this design is if you have one Direct Connect or 
Internet to VPC. 

Aviatrix Transit VPC solution provides default network segmentation, a Spoke VPC has no connectivity to another 
Spoke VPC via the Transit GW. For example, you do not need to spin up a Dev Transit Group and a Production Transit 
Transit Group as none of the Spoke VPCs in either group can communicate with each other. 
As such, you do not need to spin up multiple Transit Groups for network isolation
purpose. A diagram is shown below.

For connectivity between Shared Service VPC and Spoke VPCs, and between Spoke VPCs, choose `AWS Peering <http://docs.aviatrix.com/HowTos/peering.html#aws-peering>`_ or `Aviatrix Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ from the Controller console to setup. 

Notice Transit GW is only used for traffic between on-prem and cloud (Spoke VPCs). Cloud to cloud traffic, such as
Shared Service VPC to Spoke VPCs does not go through the Transit GW. Decouple the different traffic streams 
reduces the performance bottleneck and removes the single failure point. 

.. note::

  A Spoke VPC can be deployed in a different region and different cloud.

|image0|

Multi Regions Transit VPC Design
---------------------------------

If you have datacenters in multiple regions and its corresponding AWS regions, you build network redundancy to 
reach cloud by leveraging AWS VGW termination. 

In the diagram below, there are two Transit Groups, one in each region. The VGW has Direct Connect or Internet to
one datacenter, the same VGW is also used as a backup connectivity over Internet from the second datacenter. In case a datacenter loses connectivity to VGW, the backup link can take over and route through the alternate route. 

Note one Aviatrix Controller manages both Transit Groups. If you need connectivity between any two Spoke VPCs in 
each region, you can build an AWS Peering or `Aviatrix Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ from the Controller console. 


|image1|

10Gbps Transit VPC Design 
---------------------------

If you have applications that need 10Gbps bandwidth, you can place these applications in a VPC
that terminates on the VGW with the 10Gbps VIF DX. Place the Aviatrix Transit GW in a separate VPC and 
connected it to the VGW through the normal `Transit VPC workflow <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

|image2|

Alternatively, you can place the high bandwidth application in a separate VPC that terminates directly on a VIF, as shown below.

|image3|

Using Aviatrix for Egress Control
----------------------------------

If you are using AWS NAT Gateway as your egress control for Internet access, consider using Aviatrix FQDN to improve egress control. 

Aviatrix provides `L7 FQDN <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ to whitelists and blacklists public sites that applications in a Spoke VPC need to make API calls. 
The function is embedded in the Aviatrix gateway. It is transparent to user instances and requires no agents nor certs. 

|image5|

Integrating with Egress Firewall -1
------------------------------------

If you are running AWS Workspace services for your employees and need a full fledged firewall device, you can connect the firewall device to VGW directly, shown in the diagram below. This approach requires only 1 connection to/from the firewall device. The drawback of the approach is that Transit GW also carry the Internet bound traffic from Spoke VPC.

|image6|


Integrating with Egress Firewall -2 
------------------------------------

The second approach to connect to a full fledge firewall device is to place the 
firewall appliance in a shared service VPC or its own VPC. Treat this VPC as one type of shared service VPC that
offers egress control for instances in a private subnet of all Spoke VPCs. 

In this case, use Aviatrix `site2cloud feature <http://docs.aviatrix.com/HowTos/site2cloud.html>`_ to connect to 
the firewall appliance, as shown in the diagram below.

|image4|

The advantage of this architecture is that traffic to Internet and on-prem is decoupled. Transit GW only carries traffic between on-prem and cloud. 

The drawback in this architecture is that each Spoke VPC needs to establish a site2cloud
IPSEC connection to the firewall which is not optimized to handle potentially large scale of VPN tunnels. Unless there is automation, the process
of building many IPSEC connections could be time consuming and difficult to manage. The performance load on the firewall device to handle VPN tunnels can significantly impact its ability to perform IDS/IPS functions. 


.. |image0| image:: transitvpc_designs_media/singleRegion.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: transitvpc_designs_media/multiRegions.png
   :width: 5.55625in
   :height: 3.265480in

.. |image2| image:: transitvpc_designs_media/10Gbps-1.png
   :width: 5.55625in
   :height: 3.2654in

.. |image3| image:: transitvpc_designs_media/10Gbps-2.png
   :width: 5.55625in
   :height: 3.2654in

.. |image4| image:: transitvpc_designs_media/egress-firewall.png
   :width: 5.55625in
   :height: 3.2654in

.. |image5| image:: transitvpc_designs_media/aviatrix-egress.png
   :width: 5.55625in
   :height: 3.26548in

.. |image6| image:: transitvpc_designs_media/egress-firewall2.png
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
