.. meta::
   :description: launch a gateway and edit it
   :keywords: security policies, Aviatrix, AWS VPC, stateful firewall, UCX, controller, gateway

###################################
Gateway
###################################


Launch a gateway
-----------------

Click Gateway at navigation panel. Click New to launch a gateway. To launch a gateway with OpenVPN capability, refer to `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`__


Select Gateway Size
-------------------

When selecting the Gateway Size, note the following the guidelines of IPSEC performance based on tests conducted between two gateways of the same size:

-  t2 series throughput is not guaranteed; it can burst up to 130mbps.
-  m3 series are in the range 300 - 500mbps
-  m4.xlarge or c4.xlarge: approximately 500mbps
-  c3.2xlarge or m4.2xlarge: approximately 1Gbps
-  c3.4xlarge: approximately 1.2Gbps

if you need IPSEC performance beyond 1.2Gbps, refer to `Cluster Peering. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

Security Policy
--------------------

Starting Release 3.0, gateway security policy page has been moved Security -> Stateful Firewall. Check out `this guide. <http://docs.aviatrix.com/HowTos/tag_firewall.html>`_


High Availability
-------------------

There are two types of high availabiity on Aviatrix: "Gateway for High Availability" and "Gateway for High Availability Peering". 


"Gateway for High Availability Peering" is used for "Enable HA" field at Encrypted Peering configuration. 

"Gateway for High Availability" is used when you need HA for a Transitive Peering. 

Gateway Size
-------------

You can change Gateway Size if need to change gateway throughput. The gateway will restart with a different instance size.

.. disqus::
