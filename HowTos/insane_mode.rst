.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGW


===============================================
Insane Mode Encryption FAQ
===============================================

This document discusses Aviatrix High Performance Transit Network and answers related questions.

Why is Transit VPC performance capped at 1.25Gbps?
---------------------------------------------------

In the current Transit VPC solution, the throughput is capped at 1.25Gbps regardless if you have a 10Gbps 
Direct Connect (DX) link. The reason is that in the Transit VPC deployment there is
an IPSEC session between VGW and Transit gateway and VGW has a performance limitation.

AWS VGW IPSEC has a published performance of `1.25Gbps <https://aws.amazon.com/vpc/faqs/>`_. The truth is AWS 
is not alone, all cloud providers have that performance cap, in fact, all software based IPSEC VPN solutions
have that performance cap. 

Why is that?

Most virtual routers or software based routers are built with general purpose CPUs. Despite the vast CPU technology advancement, why doesn't IPSEC performance scale further?

It turns out the problem lies in the nature of tunneling, a common technique in networking to connect two endpoints. 

When two general purpose server or virtual machine based routes are connected by an IPSEC tunnel, 
there is one UDP or ESP session going between the two machines, as shown below. 

|tunnel_diagram|

In the above diagram, the virtual router has multiple CPU cores, but since there is only one tunnel established, the
Ethernet Interface can only direct incoming packets to a single core, thus the performance is limited to one
CPU core, regardless how many CPU cores and memory you provide.

This is true not only for IPSEC, but also for all tunneling protocols, such as GRE and IPIP.


What is Aviatrix high performance Insane Mode Encryption?
-----------------------------------------------------------

Aviatrix Insane Mode tunneling techniques establishes multiple tunnels between the two virtual routers, thus allowing
all CPU cores to be used for performance scaling with the CPU resources, as shown below. 

|insane_tunnel_diagram|

With Aviatrix Insane Mode tunneling, IPSEC encryption can achieve 10Gbps, 25Gbps 
and beyond, leveraging the multiple CPU cores in a single instance, VM or host. 

What are the use cases for Insane Mode?
----------------------------------------

 - High performance `Encrypted Transit <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
 - High performance `Encrypted Peering <https://docs.aviatrix.com/HowTos/peering_faq.html>`_ performance
 - High performance encryption over Direct Connect
 - Overcome VGW performance limit and 100 route limit

How can I deploy Aviatrix Insane Mode?
----------------------------------------

Aviatrix Insane mode is integrated into the Transit Network solution to provide 10Gbps performance between on-prem and Transit VPC with encryption. For VPC to VPC, Insane mode can achieve 25 - 30Gbps. 

Insane mode can also be deployed in a flat (as opposed to Transit VPC) architecture for 10Gbps encryption. 

The diagram below illustrates the high performance encryption between Transit VPC and on-prem, between Transit VPC and Spoke VPC. 

|insane_transit|

What are the performance benchmarks? 
---------------------------------------------

Insane mode is available on AWS and Azure. For more performance test results and information about how to
tune your environment to get the best performance, check out `this document. <https://docs.aviatrix.com/HowTos/insane_mode_perf.html>`_

How does Insane Mode work?
-----------------------------

When a gateway is launched with `Insane Mode enabled <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_, 
a new /26 public subnet is created where the Insane Mode gateway is launched on.

Insane Mode builds high performance encryption tunnel over private network links. The private network links are 
Direct Connect (DX) and AWS Peering (PCX). 

For Insane Mode between two gateways, between an Transit GW and a Spoke gateway, or between a Transit GW and a Transit GW (Transit Peering), the Aviatrix Controller automatically creates the underlying AWS Peering connection and builds the tunnels over it. 

Since Insane Mode tunnels are over private network links, the VPC route architecture is described as below, 
where EC2 instances associated route entry to the remote site point to Aviatrix gateway, and the Aviatrix gateway instance associated route entry to remote site points to PCX or VGW. 

|insane_routing|

What is the Aviatrix hardware appliance CloudN?
--------------------------------------------------

Aviatrix offers a 1U rack mountable hardware appliance deployed in the datacenter. It works with the Aviatrix gateway.

The Aviatrix appliance CloudN specification:

========================    =======================================              =================
Aviatrix CloudN             Specification                                        Notes
========================    =======================================              =================
Dimension                   1U rack mount
Server                      HPE ProLiant DL360 Gen10 Xeon Gold 6130
CPU                         16 cores
Memory                      64GB
PCIe                        3.0
10/25Gbps Ethernet port     2 x SFP+                                             1 LAN port and 1 WAN port 
1Gbps Ethernet port         RJ45                                                 1 Management port
========================    =======================================              =================

More information on HPE ProLiant DL360 Gen10 Server can be found `here. <https://www.hpe.com/us/en/product-catalog/servers/proliant-servers/pip.hpe-proliant-dl360-gen10-server.1010007891.html>`_

What is the deployment logical diagram?
-------------------------------------------

Datacenter deployment is shown in the diagram below with redundancy, where R1 and R2 are two edge routers that connected to VGW over 
DX. R3 and R4 are two routers connect to the inside of the datacenter. Aviatrix CloudN also runs a BGP session with R3 and
R4 to collect datacenter routes. VGW is only used to terminate DX. Aviatrix gateway and on-prem appliance CloudN 
run a BGP session to propagate on-prem routes to the Transit VPC. IPSEC tunnels are also built between the two. 

|insane_datacenter|


A logical deployment layout is described as below. 

|datacenter_layout|


How to deploy Insane Mode for hybrid connectivity?
----------------------------------------------------

Follow the `Insane Mode CloudN Deployment Checklist <https://docs.aviatrix.com/HowTos/CloudN_insane_mode.html>`_ to deploy CloudN in your datacenter. 

Do I need Direct Connect to use Insane Mode for On-prem?
----------------------------------------------------

Our InsaneMode high speed encryption feature works on top of your existing WAN link and it is agnostic to the type of connection used. As long as you have a pipe 
that's large enough to allow for high throughput data transfer, using InsaneMode will offer superior performance to regular IPSec.

How to configure Insane Mode for Transit VPC?
----------------------------------------------

At `Step 1 Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_ select "Insane Mode Encryption". 

Can one CloudN appliance connect to multiple connections of Direct Connect or Express Route?
-----------------------------------------------------------------------------------------------

Yes. A CloudN appliance can build multiple InsaneMode tunnels to different Aviatrix Transit Gateways over multiple DX or Express Route, as shown in the diagram below. 

|cloudn_multi_conn|


What are the supported gateway sizes for GCP High-performance encryption (Insane mode)?
---------------------------------------------------------------------------------------

There are total 4 sizes: n1-highcpu-4, n1-highcpu-8, n1-highcpu-16, and n1-highcpu-32

What is the subnet prefix length for GCP High-performance encryption (Insane mode)?
-----------------------------------------------------------------------------------

Gateway subnet prefix length cannot be greater than /24. Moreover, Aviatrix highly suggests that customers utilize a subnet exclusively for deploying insane mode gateway without any other instances in the subnet.

What ActiveMesh version does GCP High-performance encryption (Insane mode) support?
-----------------------------------------------------------------------------------

GCP Insane mode supports only Transit Solution ActiveMesh 2.0


What is the MTU and MSS size for GCP High-performance encryption (Insane mode)?
--------------------------------------------------------------------------------

MTU is 1460 and MSS is 1330 bytes

What are the features supported with GCP insane mode?
-----------------------------------------------------

Because GCP network infrastructure/concept is different than AWS/Azure, Aviatrix GCP Insane mode behavior differs from AWS/Azure support in the following ways:

- Only Spoke and Transit gateway types are supported

- Only "Multi Cloud Transit functionality is supported with Insane mode gateways"; `Encrypted peering <https://docs.aviatrix.com/HowTos/Quick_Tour.html#encrypted-peering>`_ is not supported

- Feature "Advertise Transit VPC Network CIDR(s)" is not supported with Insane mode gateway

- Will support Managed CloudN connecting to Aviatrix Transit Gateway in GCP soon; Standalone/unmanaged CloudN connecting to Aviatrix Transit Gateway is not supported in GCP

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

.. |insane_routing| image:: insane_mode_media/insane_routing.png
   :scale: 30%

.. |cloudn_multi_conn| image:: insane_mode_media/cloudn_multi_conn.png
   :scale: 30%

.. |image1| image:: transitvpc_designs_media/multiRegions.png
   :width: 5.55625in
   :height: 3.265480in

.. |InsaneBeta| image:: insane_mode_media/InsaneBeta.png
   :width: 5.55625in
   :height: 3.265480in

.. disqus::
