.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering, AWS route limit


Peering Over Route Limit
========================

This document explains how to set up Aviatrix `encrypted peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ that overcomes CSP route limits. 

Click `here <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>`_ to learn about Designated Gateway feature. 

 1. At the Gateway menu, create a gateway in an existing VPC/VNet and make sure the option Designated Gateway is selected.

 2. (Optional) If your VPC/VNet CIDR is outside RFC 1918 range (10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16), you should expand the Designated Gateway coverage by editing the Designated Gateway. Highlight the gateway you just created and click **Edit**. Scroll down to find Edit Designated Gateway section, follow the instructions to add additional CIDR ranges.

 3. Repeat the step 1 and step 2 for a different VPC/VNet.

 4. (Optional) To enable Peering HA, go to Peering > Encrypted Peering > New peering, 
    select the two gateways launched in the previous two steps. 

    Select **Enable HA** if you wish to build a backup encrypted tunnel for HA. 
    Note that you must first create two respective backup gateways prior to this step. 

    To launch backup gateways, go to the Gateway page, select the gateway, click **Edit**, 
    At the Gateway for High Availability Peering field, select one subnet (public subnet for AWS, GCP, or OCI)
    and click **Create**. 

 4. Go to Peering > Encrypted Peering, and click **New Peering** to peer the two
   gateways.

..


.. disqus::
