.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGW


===============================================
High Performance Transit Network - Insane Mode
===============================================

This document discusses Aviatrix High Performance Transit Network and answers related questions.

Why is Transit VPC performance capped at 1.25Gbsp?
---------------------------------------------------

In the current Transit VPC solution, the throughput is capped at 1.25Gbps regardless if you have a 10Gbps 
Direct Connect (DX) link. The reason is that in the Transit VPC deployment there is
an IPSEC session between VGW and Transit gateway and VGW has a performance limitation.

AWS VGW IPSEC has a published performance of `1.25Gbps <https://aws.amazon.com/vpc/faqs/>`_. The truth is AWS 
is not alone, all cloud providers have that performance cap, in fact, all software based IPSEC VPN solutions
have that performance cap. 

Why is that?

Most virtual routers or software based routers are built with general purpose CPUs. Despite the vast CPU technology advancement, why does not IPSEC performance scale further?

It turns out the problem lies in the nature of tunneling, a common technique in networking to connect two end points. 

When two general purpose server or virtual machine based routes  are connected by an IPSEC tunnel, 
there is one UDP or ESP session going between the two machines, as shown below. 

|tunnel_diagram|

In the above diagram, the virtual router has multiple CPU cores, but since there is only one tunnel established, the
Ethernet Interface can only direct incoming packets to a single core, thus the performance is limited to one
CPU core, regardless how many CPU cores and memory you provide.

This is true not only for IPSEC, but also for all tunneling protocols, such as GRE and IPIP.


Aviatrix high performance Insane Mode Encryption
--------------------------------------------------

Aviatrix Insane Mode tunneling techniques establishes multiple tunnels between the two virtual routers, thus allowing
all CPU cores to be used for performance scaling with the CPU resources, as shown below. 

|insane_tunnel_diagram|

With Aviatrix Insane Mode tunneling, IPSEC encryption can achieve 10Gbps, 25Gbps 
and beyond, leveraging the multiple CPU cores in a single instance, VM or host. 

What are the use cases for Insane Mode?
----------------------------------------

 - 10Gbps Transit performance
 - Encryption over Direct Connect
 - Overcome VGW performance limit and 100 route limit

How can I deploy Aviatrix Insane Mode?
----------------------------------------

Aviatrix Insane mode is integrated into the Transit Network solution to provide 10Gbps performance between on-prem and Transit VPC with encryption. For VPC to VPC, Insane mode can achieve 20Gbps. 

Insane mode can also be deployed in a flat (as opposed to Transit VPC) architecture for 10Gbps encryption. 

The diagram below illustrates the high performance encryption between Transit VPC and on-prem, between Transit VPC and Spoke VPC. 

|insane_transit|

Instance sizes and IPSEC Performance 
---------------------------------------------

Insane mode is available on AWS for C5 series. For more performance test results and how to
tune your environment to get the best performance, check out `this document. <https://docs.aviatrix.com/HowTos/insane_mode_perf.html>`_

==================  ===============  ==============  ==============
 MTU size           C5.2xlarge       C5.9xlarge      C5.18xlarge
==================  ===============  ==============  ==============
1500                5Gbps            8.21Gbps        9Gbps
9000                10Gbps           12Gbps          22Gbps
==================  ===============  ==============  ==============

What is the Aviatrix hardware appliance?
------------------------------------------

Aviatrix offers a 1U rack mountable hardware appliance deployed in the datacenter. It works with the Aviatrix gateway.

The Aviatrix appliance CloudN specification:

=====================    ================================              =================
Aviatrix CloudN          Specification                                 Notes
=====================    ================================              =================
Dimension                1U rack mount
Server                   HPE ProLiant DL360 Gen10 Server
CPU                      8 cores
Memory                   16GB
PCIe                     3.0
10Gbps Ethernet ports    2 x SFP+                                          1 LAN port and 1 WAN port 
1Gbps Ethernet port      RJ45                                              1 Management port
=====================    ================================              =================

More information on HPE ProLiant DL360 Gen10 Server can be found `here. <https://www.hpe.com/us/en/product-catalog/servers/proliant-servers/pip.hpe-proliant-dl360-gen10-server.1010007891.html>`_

How to deploy Aviatrix hardware appliance?
-------------------------------------------

Datacenter deployment is shown in the diagram below with redundancy, where R1 and R2 are two edge routers that connect to VGW over 
DX. R3 and R4 are two routers connect to inside the datacenter. Aviatrix CloudN also runs a BGP session with R3 and
R4 to collect datacenter routes. VGW is only used to terminate DX. Aviatrix gateway and on-prem appliance CloudN 
run a BGP session to propagate on-prem routes to the Transit VPC. IPSEC tunnels are also built between the two. 

|insane_datacenter|


A logical deployment layout is described as below. 

|datacenter_layout|

Reference Deployment Diagrams
----------------------------------

Single Aviatrix CloudN Appliance 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment|

And the sample configuration on an ISR is as follows.

|ISR-sample-config|

Aviatrix CloudN Appliance with HA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment_ha|

Redundant DX Deployment 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment_dual_dx|


How to configure Insane Mode for Transit VPC?
----------------------------------------------

At `Step 1 Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ select "Insane Mode Encryption". 

Pre-deployment Check List
----------------------------

Deployment topology for Aviatrix CloudN is as following:

|InsaneBeta|

Please collect information requested below and provide to Aviatrix. Click the link `here <https://s3.amazonaws.com/abetterchance/InsaneBeta.docx>`_ to download the application form.

=====================  ==================  ===========  ===============  ==================  =====================  =============================================================
CloudN Interface       Private IP Address  Subnet Mask  Default Gateway  Primary DNS Server  Secondary DNS Server   Note
=====================  ==================  ===========  ===============  ==================  =====================  =============================================================
1- WAN                                                  Not Required     Not Required        Not Required
2- LAN                                                  Not Required     Not Required        Not Required
3- MGMT                                                                                                             Management port for CloudN configuration and software upgrade
4- HPE iLO (optional)                                                    Not Required        Not Required           HP Integrated Lights-Out
=====================  ==================  ===========  ===============  ==================  =====================  =============================================================

Aviatrix will pre-configure the IP addresses, subnet masks, default gateway and DNS servers on CloudN before shipping the unit.

Internet Access
---------
CloudN appliance does not require public IP address, but the management port requires outbound internet access on the management port for software upgrade. 

BGP Requirement
---------
BGP is required between LAN port of the appliance and the on-prem router for route propagation.

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

.. |deployment| image:: insane_mode_media/deployment.png
   :scale: 30%

.. |deployment_ha| image:: insane_mode_media/deployment_ha.png
   :scale: 30%

.. |deployment_dual_dx| image:: insane_mode_media/deployment_dual_dx.png
   :scale: 30%

.. |ISR-sample-config| image:: insane_mode_media/ISR-sample-config.png
   :scale: 30%

.. |image1| image:: transitvpc_designs_media/multiRegions.png
   :width: 5.55625in
   :height: 3.265480in

.. |InsaneBeta| image:: insane_mode_media/InsaneBeta.png
   :width: 5.55625in
   :height: 3.265480in

.. disqus::
