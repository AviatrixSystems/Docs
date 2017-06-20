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

When selecting Gateway Size, following is the guideline of IPSEC performance based on tests on between two gateways in the same region:

t2 series throughput is not guaranteed, it can burst up to 130mbps.
m3 seriese are about 300 - 500mbps.
c3.2xlarge is about 1Gbps.
c3.4xlarge is about 1.2Gbps. 

if you need IPSEC performance beyond 1.2Gbps, refer to `Cluster Peering. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

Security Policy
--------------------

You can configure L4 stateful security policies on each gateway. 
To configure, click Gateway tab, click to select the gateway of interest. Click Edit.

On the controller console left side menu, click Troubleshoot, click Logs, select a gateway at Upload Tracelog. The controller and gateway tracelog will be uploaded to Aviatrix. The Aviatrix support team will be alerted. If no gateway is selected, only controller log is uploaded.

High Availability
-------------------

There are two types of high availabiity on Aviatrix. One is "Gateway for High Avalability" and the other is "Gateway for High Availability Peering". 

The "Gateway for High Avalability Peering" is used for "Enable HA" field at Encrypted Peering configuration. 

The "Gateway for High Avalability" is used when you need HA for a transitive peering. 

Gateway Size
-------------

You can change Gateway Size to a different instance if need to change gateway throughput. 

.. disqus::
