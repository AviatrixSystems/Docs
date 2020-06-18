.. meta::
   :description: Netflow integration
   :keywords: Logging, Netflow, Egress Control, AWS VPC


=================================
 Netflow Integration 
=================================

Aviatrix Controller and gateways can forward `Netflow <https://en.wikipedia.org/wiki/NetFlow>`_ logs to your designated service point.

Netflow v5 and v9 both are supported on gateways.

To enable Netflow, go to Aviatrix Controller's console -> click "Settings" on the main navigation bar -> click "Logging" -> scroll down to "Netflow Agent".

Input the IP address and the port number of the destination Netflow service and click "Enable".

.. note::
    All gateways will have Netflow enabled by default. You can select a subset of gateways to have Netflow
enabled in the Advanced option. 

All flows are captured, there is no option to sample a fraction of the packets. 

Netflow configuration example is shown below:


.. add in the disqus tag

.. disqus::
