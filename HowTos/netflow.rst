.. meta::
   :description: Netflow integration
   :keywords: Logging, Netflow, Egress Control, AWS VPC


=================================
 Netflow Integration 
=================================

Aviatrix Controller and gateways can forward `Netflow <https://en.wikipedia.org/wiki/NetFlow>`_ data to your designated service point.

Netflow v5 and v9 both are supported on gateways and cloudN.

To enable Netflow, go to Aviatrix Controller's console -> click "Settings" on the main navigation bar -> click "Logging" -> scroll down to "Netflow Agent".

Input the IP address and the port number of the destination Netflow service and click "Enable".


.. note:: Only application traffic flow (between guest vms and internet IPs) will be reported.


.. disqus::
