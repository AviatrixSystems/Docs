.. meta::

===========================================
User VPN Performance Guide for Deployment
===========================================

Aviatrix Gateway OpenVPN® throughput
--------------------------------------------------------

Aviatrix VPN Gateways are deployed behind cloud provider's native load balancer, the deployment
scales to unlimited number of VPN Gateways capable of supporting unlimited number of simultaneous VPN client connections.

OpenVPN® is a single process application running on a gateway. The best measured throughput is 1.1Gbps. t3.medium, c5.large, and
c5.xlarge have similar performance.

VPN Client throughput benchmark
----------------------------------------------------------------

Aviatrix VPN solution supports both UDP and TCP mode VPN deployments. They have similar performance
characteristics. The chart below benchmarks a VPN client's single session download and upload speed 
on one VPN gateway in TCP mode. 
The benchmark provides a reference information on selecting VPN gateway instance size. 
Note actual VPN client performance also depends on client's Internet ISP speed, packet loss ratio
and other factors.

The chart below is measured on a Windows client. 

|windows_client|

The chart below is measured on a Linux client. 

|linux_client|

Simultaneous Clients on a Given VPN Gateway
------------------------------------------------------------------------------

There are several factors to consider when determining the number of clients to support on a given VPN Gateway. 

 1. `VPN virtual address space <https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block>`_. The default is 192.168.43.0/24 which can support 64 simultaneous VPN connection. For large deployment, you should configure this to a /20 network so that address spacing is not an issue. 
 #. `Maximum VPN Connections <https://docs.aviatrix.com/HowTos/gateway.html#max-connections>`_. The default is 100. When the connection number exceeds the configuration, the VPN gateway rejects new connections. The VPN client should auto reconnect and the cloud provider's network load balancer forwards the connection to a different VPN Gateway. 
 #. VPN Client performance. If each VPN client sustained average performance is designed to be capped at 1Mbps, then a VPN Gateway can support 1000 VPN clients (i.e. connections). Accordingly, if each VPN client sustained average throughput is designed to be capped at 10Mbps, then a VPN gateway can support 100 clients. 

In most cases, using VPN gateway of t3.medium instance size is a good option. Launching a few of them behind an ELB provides redundancy and scaling. 
   
OpenVPN® is a registered trademark of OpenVPN Inc.

.. |image1| image:: FAQ_media/image1.png
.. |imageIdleTimeout| image:: FAQ_media/idle_timeout.png
.. |imageClientLog| image:: FAQ_media/aviatrix_client_get_log.png
.. |imageRenegotiationInterval| image:: FAQ_media/renegotiation_interval.png

.. |full_tunnel| image:: FAQ_media/full_tunnel.png
   :scale: 30%

.. |profile_config| image:: FAQ_media/profile_config.png
   :scale: 30%

.. |assign_user_to_profile| image:: FAQ_media/assign_user_to_profile.png
   :scale: 30%

.. |windows_client| image:: openvpn_faq_media/windows_client.png
   :scale: 30%

.. |linux_client| image:: openvpn_faq_media/linux_client.png
   :scale: 30%
.. disqus::
