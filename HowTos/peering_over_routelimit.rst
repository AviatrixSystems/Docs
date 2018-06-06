.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering, AWS route limit


Peering Over Route Limit
========================

This document explains how to setup Aviatrix `encrypted peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ that overcomes AWS route limits. 


::

 1. At Gateway menu, create a gateway in an existing VPC, make sure the option `Designated Gateway <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>`_ is selected.

 2. (Optional) If your VPC CIDR is outside RFC 1918 range (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16), you should expand the Designated Gateway coverage by editing the Designated Gateway. Highlight the gateway you just created and click Edit. Follow the `instructions <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>`_ to add additional CIDR ranges.

 3. Repeat the step 1 and step 2 for a different VPC/VNet.

 4. (Optional) To enable Peering HA, go to Peering -> Encrypted Peering -> New peering, 
    select the two gateways launched in the previous two steps. 

    select "Enable HA" if you wish to build a backup encrypted tunnel for HA. 
    Note that you must first create two respective backup gateways prior to this step. 

    To launch backup gateways, go to Gateway page, select the gateway, click Edit, 
    At "Gateway for High Availability Peering" field, select one public subnet 
    and click Create. 

 4. Go to Peering -> Encrypted Peering, click New Peering to peer the two
   gateways.

..


.. disqus::
