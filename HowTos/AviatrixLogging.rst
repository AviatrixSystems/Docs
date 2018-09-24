.. meta::
   :description: Data Analytics with Aviatrix Logs -Splunk and Sumo
   :keywords: Splunk, Sumo, aviatrix logs, data analytics



=========================================================
    Logging 
=========================================================



1. Introduction
================

Aviatrix Controller and all its managed gateways can be configured to
forward logs to well known log management systems. Out of box integration is supported
for the following logging service or systems. 

 - Splunk 
 - Sumo Logic
 - Elastic Search
 - DataDog
 - Remote syslog


In addition to standard information on syslog, Aviatrix also provides
capability for user VPN connections, VPN user TCP sessions, security
rule violation statistics, Gateway stats and FQDN filter violations.

Log Management System can be used to sift through the Aviatrix logs and
get the meaningful trend charts that helps monitor the network
connectivity and user VPN sessions. The following sections provides a
list of useful Aviatrix logs which can be parsed on Splunk, Sumo Logic
and other log management systems to display relevant analytics of data
collected from Aviatrix Controller and gateways.

2. Aviatrix Log Format for Log Management Systems
==================================================

Following types of Aviatrix log keywords can be identified by the Log
Management System for further analysis:

- `AviatrixVPNSession <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id1>`_
- `AviatrixUser <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id2>`_
- `AviatrixLicenseVPNUsers <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id4>`_ 
- `AviatrixRule <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id6>`_
- `AviatrixGwNetStats <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id8>`_
- `AviatrixGwSysStats <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id10>`_
- `AviatrixFQDNRule <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id12>`_
- `AviatrixTunnelStatusChange <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id14>`_
- `AviatrixCMD <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id15>`_

Below are the details of each log keyword. 

AviatrixVPNSession:
--------------------

This log is for gateways that have `VPN enabled <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_. To enable VPN, check "VPN Access" 
when launching a gateway. 

Logs sent by the Controller contains the information such as VPN user
name, the VPN gateway IP address and name where the user connects to,
client virtual IP address, connection duration, total received bytes,
total transmitted bytes, and login and logout time. Two logs will be
generated for each VPN connection. One is when the connection is
established, the other when it’s disconnected.

Example logs:

**Connect Log:**

::

  Aug 17 22:07:39 ip-172-31-46-24 cloudx\_cli: AviatrixVPNSession: 
  User=Splumo, Status=active, Gateway=splunksumo, GatewayIP=52.52.76.149,
  VPNVirtualIP=192.168.0.6, PublicIP=N/A, Login=2016-08-17 22:07:38, Logout=N/A,
  Duration=N/A, RXbytes=N/A, TXbytes=N/A

**Disconnect log:**

::

  Aug 17 22:26:37 ip-172-31-46-24 cloudx\_cli: AviatrixVPNSession: 
  User=Splumo, Status=disconnected, Gateway=splunksumo,
  GatewayIP=52.52.76.149, VPNVirtualIP=192.168.0.6, PublicIP=N/A,
  Login=2016-08-17 22:07:38, Logout=2016-08-17 22:26:37, Duration=0:0:18:59,
  RXbytes=2.1 MB, TXbytes=9.03 MB

AviatrixUser:
--------------

This log is for gateways that have `VPN enabled <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_. To enable VPN, check "VPN Access"
when launching a gateway.

Logs with this prefix come from each VPN gateway managed by the
controller. The log contains the information for the TCP session, such
as Inbound and outbound interface, source IP address, destination IP
address, TTL value, protocol name, and packet length. The log record is
for each packet that passes through the VPN connection from the client
to the destination.

Two example logs:

::

  Aug 17 22:15:47 ip-10-100-0-60 kernel: \[14167.983249\]
  ***AviatrixUser***:IN= OUT=eth0 SRC=192.168.0.6 DST=68.67.154.85 LEN=64
  TOS=0x00 PREC=0x00 TTL=63 ID=28916 DF PROTO=TCP SPT=50428 DPT=443
  WINDOW=65535 RES=0x00 SYN URGP=0

  Aug 17 22:15:47 ip-10-100-0-60 kernel: \[14167.968275\]
  ***AviatrixUser***:IN= OUT=eth0 SRC=192.168.0.6 DST=10.100.0.2 LEN=66
  TOS=0x00 PREC=0x00 TTL=254 ID=13309 PROTO=UDP SPT=64775 DPT=53 LEN=46

AviatrixLicenseVPNUsers:
-------------------------

This log is for gateways that have `VPN enabled <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_. To enable VPN, check "VPN Access"
when launching a gateway.

Logs with this prefix come from Controller and can be used to monitor 
the license usage of active vpn users connected to all vpn gateways.

One example log:

::

  Sep 25 23:40:19 ip-10-40-0-133 cloudxd: AviatrixLicsenseVPNUsers: users=2

.. note:: There is a typo in some versions (as noted in above example) that incorrectly shows this entry as `AviatrixLicsenseVPNUsers` instead of `AviatrixLicenseVPNUsers`.

AviatrixRule:
--------------

You need to configure `security policies <http://docs.aviatrix.com/HowTos/gateway.html#security-policy>`_ to see AviatrixRule log.

Logs with this prefix come from each gateway managed by the controller.
Any packet that triggers the security policy rule will generate a log
record of this type with the first 100 bytes of the packet. It contains
the information such as gateway IP address, inbound and outbound
interface, MAC address, TTL value, protocol name, source IP address,
destination IP address and packet length.

Two example logs:

::

  syslog:Aug  4 21:46:28 ip-10-31-0-47 kernel: \[ 1111.107393\]
  ***AviatrixRule*** 10.31.0.47 A:IN=eth0 OUT=tun0
  MAC=0a:06:c3:e3:d0:4f:0a:d2:ef:22:68:61:08:00 SRC=52.40.185.222
  DST=192.168.43.6 LEN=40 TOS=0x00 PREC=0x00 TTL=62 ID=798 DF PROTO=TCP
  SPT=443 DPT=56505 WINDOW=231 RES=0x00 ACK FIN URGP=0

  syslog:Aug  4 21:46:32 ip-10-31-0-47 kernel: \[ 1115.091011\]
  ***AviatrixRule*** 10.31.0.47 A:IN=eth0 OUT=tun0
  MAC=0a:06:c3:e3:d0:4f:0a:d2:ef:22:68:61:08:00 SRC=98.136.189.19
  DST=192.168.43.6 LEN=334 TOS=0x00 PREC=0x00 TTL=40 ID=5452 DF PROTO=TCP
  SPT=443 DPT=56203 WINDOW=368 RES=0x00 ACK PSH URGP=0

AviatrixGwNetStats:
--------------------

Logs with this prefix come from each gateway managed by the controller.
These logs are sampled every 1 minutes, and give details about gateway
network interface.

Two example logs:

::
 
  2018-02-19T06:51:03.496447+00:00 ip-172-31-58-147 perfmon.py: AviatrixGwNetStats: 
  timestamp=2018-02-19 06:51:03.496156 name=gg public_ip=35.172.17.198.fifo 
  private_ip=172.31.58.147 interface=eth0 total_rx_rate=4.48Kb total_tx_rate=3.14Kb
  total_rx_tx_rate=7.62Kb total_rx_cum=292.43MB total_tx_cum=169.99MB
  total_rx_tx_cum=462.42MB
  
  2018-02-19T05:44:07.491705+00:00 ip-172-31-58-147 perfmon.py: AviatrixGwNetStats:
  timestamp=2018-02-19 05:44:07.491411 name=gg public_ip=35.172.17.198.fifo 
  private_ip=172.31.58.147 interface=eth0 total_rx_rate=3.99Kb total_tx_rate=2.84Kb
  total_rx_tx_rate=6.83Kb total_rx_cum=290.44MB total_tx_cum=168.48MB
  total_rx_tx_cum=458.92MB

AviatrixGwSysStats:
-------------------

Logs with this prefix come from each gateway managed by the controller.
These logs are sampled every 1 minutes, and give details about gateway
memory, cpu and disk load.

Two example logs:

::

  May 17 00:23:20 ip-10-0-0-129 gwmon.py: AviatrixGwSysStats: 
  timestamp=2017-05-17 00:23:06.065548 name=wing-aws-aws-use-2-gw0000
  cpu\_idle=100 memory\_free=237048 disk\_total=8115168 disk\_free=4665560

  May 17 00:28:20 ip-10-0-0-129 gwmon.py: AviatrixGwSysStats: 
  timestamp=2017-05-17 00:28:06.064229 name=wing-aws-aws-use-2-gw0000
  cpu\_idle=100 memory\_free=237072 disk\_total=8115168 disk\_free=4665560

AviatrixFQDNRule
----------------

You need to configure `FQDN Whitelists <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ in order to see these logs. 

Logs with this prefix come from each gateway managed by the controller.
Domain name filtering can be configured per gateway via controller. And
every time a gateway tries to access a domain name, it will check if the
domain name passes the configured filters. If it does, access will be
allowed with state as MATCHED, otherwise it will be discarded with state
as NO\_MATCH.

Two example logs:

::

  May 24 10:54:40 ubuntu64-dev avx-nfq:
  AviatrixFQDNRule\[CRIT\]nfq\_ssl\_handle\_client\_hello() L\#137 P:7025
  Gateway=bogusGw hostname=www.google.com state=MATCHED

  May 24 10:17:08 ubuntu64-dev avx-nfq:
  AviatrixFQDNRule\[CRIT\]nfq\_ssl\_handle\_client\_hello() L\#162 P:6138
  Gateway=bogusGw hostname=clients2.google.com state=NO\_MATCH
  drop\_reason=NO\_HOSTNAME\_MATCH

AviatrixTunnelStatusChange
--------------------------

Logs with this prefix come from controller whenever a tunnel status changes.
old_state means old state of the tunnel, and new_state is the new changed state of tunnel.

Example log:

::

  Jul 21 04:28:19 Controller-52.41.237.237 cloudx_cli: 
  AviatrixTunnelStatusChange: src_gw=Oregon-DevOps-VPC(AWS us-west-2) 
  dst_gw=gcloud-prod-vpc(Gcloud us-central1) old_state=Down new_state=Up latency=2.79688203335

AviatrixCMD
--------------------------

Logs with this prefix come from controller whenever a CLI command is issued.  It contains
information on the CLI command that was issued, the results of the execution, and reason
message if there is a failure.

Example log:

.. highlight:: none

::

  Nov 10 01:05:41 ip-172-31-6-24 cloudxd:
  AviatrixCMD: action=ADD_TIME_SERVER, argv=['--rtn_file', '/run/shm/rtn1809376682',
  'add_time_server', 'time2.google.com'], result=Success, reason=

AviatrixBGPOverlapCIDR
------------------------

Log message with this prefix comes from the Controller whenever it detects overlapping CIDRs between on-prem learned and Spoke VPC CIDRs. 

Example log:

::
  
  2018-09-24T20:28:58.330708+00:00 ip-172-31-23-128 cloudxd: AviatrixBGPOverlapCIDR: Time Detected: 2018-09-24 20:28:58.329881
 
  Spoke/Manual CIDRs ['10.0.0.0/8'] have a conflict with BGP Learned CIDRs [u'10.2.0.0/16', u'30.2.0.0/16'] in VPC vpc-782bb21f on connection vgw-bgp-ha.

AviatrixBGPRouteLimitThreshold
--------------------------------

Log message with this prefix comes from the Controller whenever it detects total BGP routes
exceed the 80 routes. (AWS VGW has a total 100 route limit.)

Example log:

::
  
  2018-09-24T20:24:50.600144+00:00 ip-172-31-23-128 cloudxd: AviatrixBGPRouteLimitThreshold: This message is alerting you that the VGW listed below currently has 89 routes, which is approaching the VGW route limits (100). You can reduce the number of routes on VGW both from on-prem side and on Aviatrix Transit gateway by enabling Route Summarization feature.
 
  Time Detected: 2018-09-24 20:24:50.599822
 
  Connection Name: vgw-bgp-ha
  VGW Id: vgw-0942b724a5150bc6a


3. Logging Configuration at Aviatrix Controller
================================================

To enable logging at Aviatrix Controller, go to Settings->Logging page. Once logging is enabled, both Controller and all gateways will forward logs directly to the logging server.

Two examples for Remote Syslog and Logstash Forwarder below.

3.1 Remote Syslog
------------------
On the Aviatrix Controller:
  a. Server:	FQDN or IP address of remote syslog server
  #. Port:	Listening port of remote syslog server (6514 by default)
  #. Cert:	A compressed file in tgz format with both certificates (.crt format) of remote syslog server and CA. For example, a compressed file which is named certs.tgz includes (1) ca.pem, (2) rsyslog-crt.pem, and (3) rsyslog-key.pem
  #. Protocol:	TCP or UDP (TCP by default)
  
On the Remote syslog server:
  1. SSH into the remote syslog server
  #. Go to /var/log/aviatrix directory
  #. Find the directory of desired controller or gateway
        a. Controller's directory name is in a format of Controller-public_IP_of_controller
        #. Gateway's directory name is in a format of GW-gateway_name-public_IP_of_gateway
  #. Each controller/gateway directory should have
        a. auth.log
        #. commmandlog.log
        #. syslog
 
3.2 Logstash Forwarder
-----------------------
On the Aviatrix Controller:
  a. Server Type:	Remote or Local
  #. Server:	FQDN or IP address of logstash server
  #. Port:	Listening port of logstash server (5000 by default)
  #. Trusted CA:	CA certificate (.crt format)

Note:
If "Local" is selected for "Server Type", Aviatrix Controller itself will be enabled as a logstash server. Before you do this, make sure your controller has at least 30GB of hard disk space. 

On the Logstash console:
  Log into the web page of your logstash server to access the logs. 

  The Kibana interface is divided into four main sections:
  
  a. Discover
	By default, this page will display all of your most recently received logs. You can filter through and find specific log messages based on Search Queries, then narrow the search results to a specific time range with the Time Filter. 
  b. Visualize
	The Visualize page is where you can create, modify, and view your own custom visualizations.
  c. Dashboard
	The Dashboard page is where you can create, modify, and view your own custom dashboards. With a dashboard, you can combine multiple visualizations onto a single page, then filter them by providing a search query or by selecting filters by clicking elements in the visualization.
  d. Settings
	The Settings page lets you change a variety of things like default values or index patterns.

4. Log management system Apps
====================================

Aviatrix controller can be configured to forward logs to various log
management systems. Aviatrix also provides apps with prebuilt dashboards
for popular log management systems like Splunk and Sumo Logic.

Splunk App for Aviatrix
-----------------------

Splunk app for Aviatrix can be downloaded from
`Splunkbase <https://splunkbase.splunk.com/app/3585/>`_.

Click `here <https://github.com/AviatrixSystems/SplunkforAviatrix>`_ to check
instructions on GitHub.

**Sample**

|splunk_sample|


Sumo Logic App for Aviatrix
---------------------------

Sumo Logic app installation guide is also available on
`GitHub <https://github.com/AviatrixSystems/SumoLogicforAviatrix>`_.

**Sample**

|sumo_sample|

.. |splunk_sample| image:: DataAnalSplunkSumo_media/splunk_overview.png
   :width: 6.50000in
   :height: 6.55000in
.. |sumo_sample| image:: DataAnalSplunkSumo_media/sumo_overview.png
   :width: 6.50500in
   :height: 6.20500in


5. Loggly integration via Syslog
====================================

To configure Loggly integration through an intermediary syslog server relay:

1. Build an rsyslog server relay using a Linux distribution of your choice 

2. Configure Aviatrix to send rsyslog traffic to the relay (section 3.1 above)

3. Follow `this document <https://www.loggly.com/docs/network-devices-and-routers/>`_ to configure the relay to send to Loggly

6. Netflow and Span port support
=================================

Starting from Release 4.0, Aviatrix Controller and gateways support netflow and span port. 



.. disqus::
