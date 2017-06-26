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

When selecting Gateway Size, following the guideline of IPSEC performance based on tests done between two gateways:

-  t2 series throughput is not guaranteed, it can burst up to 130mbps.
-  m3 seriese are about 300 - 500mbps.
-  m4.xlarge or c4.xlarge is around 500mbps.
-  c3.2xlarge or m4.2xlarge is about 1Gbps.
-  c3.4xlarge is about 1.2Gbps. 

if you need IPSEC performance beyond 1.2Gbps, refer to `Cluster Peering. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

Security Policy
--------------------

You can configure L4 stateful security policies on each gateway. 
To configure, click Gateway tab, click to select the gateway of interest. Click Edit.


Note at the Destination field, you can enter network, IP address or host name. When using host name, the IP address of the host name will be resolved when programming the security policy. Host name is not suitable if it is a public web site, such as www.google.com. To filter on public host names, refer to `FQDN Whitelists. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`__



High Availability
-------------------

There are two types of high availabiity on Aviatrix: "Gateway for High Avalability" and "Gateway for High Availability Peering". 


"Gateway for High Avalability Peering" is used for "Enable HA" field at Encrypted Peering configuration. 

"Gateway for High Avalability" is used when you need HA for a Transitive Peering. 

Gateway Size
-------------

You can change Gateway Size if need to change gateway throughput. The gateway will restart with a different instance size.

.. disqus::
