.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering


===================================
Transit Network Design Patterns
===================================

`Aviatrix Transit VPC  <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ provides a workflow
to create a Transit VPC GW with a set of Spoke VPC GWs.

From one Aviatrix Controller, you can setup
Transit network in a single region or across multiple AWS regions.

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

.. Tip::

  A Spoke network can be deployed in a different region and different cloud (AWS and Azure).

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

Connected Transit Design
-------------------------

If you like to build a Transit network where all Spoke VPCs are connected via Transit GW, you can accomplish that by enabling "Connected Transit" property for the Transit GW. When Connected Transit is enabled, you do not need to build additional tunnels between shared service VPC to other VPCs. The diagram is shown below:

|image2|

10Gbps Transit VPC Design
---------------------------

If you have applications that need 10Gbps bandwidth, you can place these applications in a VPC
that terminates on the VGW with the 10Gbps VIF DX. Place the Aviatrix Transit GW in a separate VPC and
connect it to the VGW through the normal `Transit VPC workflow <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

|image3|

Alternatively, you can place the high bandwidth application in a separate VPC that terminates directly on a VIF, as shown below.


|image4|

Distributed Egress Control with Aviatrix 
-------------------------------------------------

If you are using AWS NAT Gateway as your egress control for Internet access, consider using Aviatrix FQDN to improve egress control.

Aviatrix provides `L7 FQDN <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ to whitelists and blacklists public sites that applications in a Spoke VPC need to make API calls.
The function is embedded in the Aviatrix gateway. It is transparent to user instances and requires no agents nor certs.

|image5|

Centralized Third Party Firewall Integration
-----------------------------------------------------

If you are running AWS Workspace services for your employees and need a full fledged firewall device, centralized third party firewall appliances 
can be deployed via `Aviatrix Transit FireNet <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_

|transit_firenet|

Centralized Egress Control with Aviatrix 
-------------------------------------------

|transit_firenet_aviatrix_egress|

SD-WAN Integration
--------------------

If you have multiple sites to connect to the cloud, you can use an Aviatrix gateway to terminate the many site2cloud to branch offices, and connect this gateway to the VGW in the Transit VPC.

Alternatively, you can use a SD-WAN termination point in the VPC to connect to the branches.

Both options can be described in the diagram below.

|image8|


.. |image0| image:: transitvpc_designs_media/singleRegion.png
   :width: 10.0in
   :height: 4.0in

.. |image1| image:: transitvpc_designs_media/multi_region2.png
   :width: 10.0in
   :height: 4.0in

.. |image2| image:: transitvpc_designs_media/connected_transit.png
   :width: 10.0in
   :height: 4.0in

.. |image3| image:: transitvpc_designs_media/10Gbpspattern.png
   :width: 10.0in
   :height: 4.0in

.. |image4| image:: transitvpc_designs_media/10Gbpspattern2.png
   :width: 10.0in
   :height: 4.0in

.. |image5| image:: transitvpc_designs_media/egress-control2.png
   :width: 10.0in
   :height: 4.0in

.. |image6| image:: transitvpc_designs_media/Firewallintegration.png
   :width: 10.0in
   :height: 4.0in

.. |image7| image:: transitvpc_designs_media/Egresstofirewall.png
   :width: 10.0in
   :height: 4.0in

.. |image8| image:: transitvpc_designs_media/SDWANtransit.png
   :width: 10.0in
   :height: 4.0in

.. |transit_azure_native_spoke| image:: transitvpc_designs_media/transit_azure_native_spoke.png
   :scale: 30%

.. |multi_cloud_transit_native| image:: transitvpc_designs_media/multi_cloud_transit_native.png
   :scale: 30%

.. |transit_firenet| image:: transit_firenet_media/transit_firenet.png
   :scale: 30%

.. |transit_firenet_aviatrix_egress| image:: transit_firenet_media/transit_firenet_aviatrix_egress.png
   :scale: 30%



.. disqus::
