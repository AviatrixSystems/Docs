.. meta::
  :description: Insane Mode performance benchmark
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGW


===============================================
Insane Mode Encryption Performance 
===============================================

This document discusses Aviatrix Insane Mode (or InsaneMode) performance test benchmarks, parameters that affect performance and how you can tune your environment for best performance. 

For more information on Aviatrix Insane Mode, check out `this link. <https://docs.aviatrix.com/HowTos/insane_mode.html>`_

Insane Mode Performance Test Setup
---------------------------------------------------

The iperf3 test is performed between a Spoke VPC instance and on-prem VM. The test
setup is shown in the diagram below. The encryption is end to end: between on-prem CloudN and Transit GW and between Spoke gateway and Transit GW. 


|insane_perf_setup|


Key variables that affect performance are: 

 - MTU size of all devices in the data path. 
 - Latency between on-prem and the Transit VPC. 
 - Client TCP window size. 
 - The number of TCP streams. 

Performance Test Results
---------------------------

The performance test is conducted between a c5n.4xlarge instance in the Spoke VPC and on-prem host machine over a 10Gbps Direct Connect between the Transit VPC and an on-prem datacenter (Equinix co-lo). The physical latency is 5ms. Additional latency is injected into the data path to simulate the latency impact to the end to end throughput. 


1. MTU = 9000 Bytes, C5n.4xlarge
=================================

|c5n_throughput_9000B|

2. MTU = 1500 Bytes, C5n.4xlarge
=================================

|c5n_throughput_1500B|


How to Tune Performance
-----------------------

1. Check MTU size
=================

Use Trace Path. Go to Troubleshoot -> Diagnostics -> Network. Select a gateway and destination IP address, click Trace Path. It should display MTU of the devices along the path. 

2. Tune TCP window size
========================

For Linux machine, follow the `instructions here <https://wwwx.cs.unc.edu/~sparkst/howto/network_tuning.php>`_ to tune TCP  window size.

.. |insane_perf_setup| image:: insane_mode_perf_media/insane_perf_setup.png
   :scale: 30%

.. |insane_perf_jumbo| image:: insane_mode_perf_media/insane_perf_jumbo.png
   :scale: 30%


.. |throughput_1500_25ms| image:: insane_mode_perf_media/throughput_1500_25ms.png
   :scale: 30%

.. |c5n_throughput_1500B| image:: insane_mode_perf_media/c5n_throughput_1500B.png
   :scale: 30%

.. |c5n_throughput_9000B| image:: insane_mode_perf_media/c5n_throughput_9000B.png
   :scale: 30%

.. disqus::
