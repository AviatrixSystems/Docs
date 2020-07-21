.. meta::
  :description: Aviatrix Gateway Performance benchmark
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGWa, Site2Cloud


============================
Aviatrix Gateway Performance
============================

This document describes Aviatrix non HPE gateway encryption performance test benchmarks for different use cases. 

For Insane Mode performance results, please refer to `this link. <https://docs.aviatrix.com/HowTos/insane_mode_perf.html>`_

Testing Environment
-------------------
1. VPCs/VNETs were in the same region.
#. All test results are based on non-HA scenario.
#. Multiple Linux iperf3 clients/servers were used to maximize all vCPU cores in the transit gateway.
#. Multiple Spoke gateways were used to generate enough traffic to stress the transit gateway.
#. Buffer size in all iperf3 clients/servers were modified to avoid being a bottleneck. Refer to `instructions here <https://wwwx.cs.unc.edu/~sparkst/howto/network_tuning.php>`_ to tune TCP  window size.
#. iperf3 traffic was sent with MSS 1400 bytes unless specified. It was found that MSS 4000 bytes or 9000 bytes does not yield significant performance as the testing of IPsec tunnel is over Internet.


Spoke-Transit-Spoke Maximum Throughput
--------------------------------------
+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      |  1.3             |
|             +---------------+------------------+
|             | c5.xlarge     |  3.0             |
|             +---------------+------------------+
|             | c5n.4xlarge   |  10.0            |
+-------------+---------------+------------------+
| Azure       | B1ms/B2ms     |  0.8             |
|             +---------------+------------------+
|             | F2s_v2        |  0.8             |
|             +---------------+------------------+
|             | F4s_v2        |  1.6             |
|             +---------------+------------------+
|             | F8s_v2        |  3.1             |
|             +---------------+------------------+
|             | F16s_v2       |  6.6             |
+-------------+---------------+------------------+
| GCP         | n1-standard-1 |  1.1             |
|             +---------------+------------------+
|             | n1-standard-2 |  1.2             |
|             +---------------+------------------+
|             | n1-standard-4 |  2.5             |
|             +---------------+------------------+
|             | n1-highcpu-2  |  1.2             |
|             +---------------+------------------+
|             | n1-highcpu-4  |  2.5             |
+-------------+---------------+------------------+

Spoke-Transit-Spoke (Single Stream) Throughput
----------------------------------------------
+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      |  1.2             | 
|             +---------------+------------------+
|             | c5.xlarge     |  1.4             |
|             +---------------+------------------+
|             | c5n.4xlarge   |  1.5             |
+-------------+---------------+------------------+
| Azure       | B1ms/B2ms     |  0.6             | 
|             +---------------+------------------+
|             | F4s_v2        |  0.8             |
|             +---------------+------------------+
|             | F16s_v2       |  1.1             |
+-------------+---------------+------------------+
| GCP         | n1-standard-1 |  1.1             | 
|             +---------------+------------------+
|             | n1-standard-2 |  1.1             |
|             +---------------+------------------+
|             | n1-standard-4 |  1.1             |
|             +---------------+------------------+
|             | n1-highcpu-2  |  1.0             |
|             +---------------+------------------+
|             | n1-highcpu-4  |  1.0             |
+-------------+---------------+------------------+

Spoke-Transit (Single Stream) Throughput
----------------------------------------
+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      |  1.6             | 
|             +---------------+------------------+
|             | c5.xlarge     |  2.1             |
|             +---------------+------------------+
|             | c5n.4xlarge   |  2.6             |
+-------------+---------------+------------------+
| Azure       | B1ms/B2ms     |  0.6             | 
|             +---------------+------------------+
|             | F4s_v2        |  0.7             |
|             +---------------+------------------+
|             | F16s_v2       |  1.1             |
+-------------+---------------+------------------+
| GCP         | n1-standard-1 |  1.5             | 
|             +---------------+------------------+
|             | n1-standard-2 |  1.5             |
|             +---------------+------------------+
|             | n1-standard-4 |  1.6             |
|             +---------------+------------------+
|             | n1-highcpu-2  |  1.5             |
|             +---------------+------------------+
|             | n1-highcpu-4  |  1.5             |
+-------------+---------------+------------------+

Spoke-Transit-Spoke (MSS 350 bytes) Throughput
----------------------------------------------
+-------------+---------------+---------------------+---------------+
| Cloud Type  | Gateway Size  | Single Stream, Mb/s | Maximum, Mb/s |
+=============+===============+=====================+===============+
| AWS         | t3.small      |     300             |      400      |
|             +---------------+---------------------+---------------+
|             | c5.large      |     320             |      450      |
|             +---------------+---------------------+---------------+
|             | c5n.large     |     370             |      500      |
+-------------+---------------+---------------------+---------------+

Spoke-Transit (MSS 350 bytes) Throughput
----------------------------------------
+-------------+---------------+---------------------+---------------+
| Cloud Type  | Gateway Size  | Single Stream, Mb/s | Maximum, Mb/s |
+=============+===============+=====================+===============+
| AWS         | t3.small      |     550             |      750      |
|             +---------------+---------------------+---------------+
|             | c5.large      |     580             |      850      |
|             +---------------+---------------------+---------------+
|             | c5n.large     |     630             |      850      |
+-------------+---------------+---------------------+---------------+

Site2Cloud IPSec VPN Performance
--------------------------------

Testing Environment:

1. VPCs/VNETs were in the same region.
#. All test results are based on non-HA scenario.
#. Multiple remote sites were connected to the Aviatrix gateway to simulate traffic from various remote sites.
#. Buffer size in all iperf3 clients/servers were modified to avoid being a bottleneck. Refer to `instructions here <https://wwwx.cs.unc.edu/~sparkst/howto/network_tuning.php>`_ to tune TCP  window size.
#. iperf3 traffic was sent with MSS 1400 bytes unless specified. It was found that MSS 4000 bytes or 9000 bytes does not yield significant performance as the testing of IPsec tunnel is over Internet.

Algorithm 1:

- Phase 1: SHA-1, AES-256-CBC, DH-2
- Phase 2: HMAC-SHA-1, AES-256-CBC, DH-2

+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      |  1.3             | 
|             +---------------+------------------+
|             | c5.xlarge     |  3.1             |
|             +---------------+------------------+
|             | c5n.4xlarge   |  12.0            |
+-------------+---------------+------------------+

Algorithm 2:

- Phase 1: SHA-256, AES-256-CBC, DH-14
- Phase 2: HMAC-SHA-256, AES-256-CBC, DH-14

+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      |  0.9             | 
|             +---------------+------------------+
|             | c5.xlarge     |  2.0             |
|             +---------------+------------------+
|             | c5n.4xlarge   |  8.0             |
+-------------+---------------+------------------+

Algorithm 3:

- Phase 1: SHA-256, AES-256-CBC, DH-14
- Phase 2: NO-AUTH, AES-128-GCM-96, DH-14

+-------------+---------------+------------------+
| Cloud Type  | Gateway Size  | Throughput, Gbps |
+=============+===============+==================+
| AWS         | t3.small      | 2.6              | 
|             +---------------+------------------+
|             | c5.xlarge     | 6.0              |
|             +---------------+------------------+
|             | c5n.4xlarge   | 24.0             |
+-------------+---------------+------------------+
| Azure       | B1ms/B2ms     | 0.8              |
|             +---------------+------------------+
|             | F4s_v2        | 3.2              |
|             +---------------+------------------+
|             | F16s_v2       | 6.6              |
+-------------+---------------+------------------+

Maximum IPSec tunnel per gateway = 1000


UserVPN Gateway Performance
---------------------------
Refer to `this link. <https://docs.aviatrix.com/HowTos/openvpn_design_considerations.html?highlight=performance>`_



