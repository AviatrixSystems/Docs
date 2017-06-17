.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering


Peering
===========

Aviatrix provides a point and click solution to create an encrypted tunnel between two VPCs. The two VPCs could be in the same region, in different regions (inter region) and in different clouds (inter cloud)

This guide helps you configure an encrypted peering. For cluster peering, refer to `this doc. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__


Encrypted Peering
""""""""""""""""""

1. At Gateway menu, create a gateway in an
   existing VPC/VNet.

#. Repeat the step 1 for a different VPC/VNet.

#. Select "Enable HA" if you wish to build a backup encrypted tunnel for HA. Note that you must first create two respective backup gateways prior to this step. To launch backup gateways, go to Gateway page, select the gateway, click Edit, At "Gateway for High Availability Peering" field, select one public subnet and click Create. 

#. At Peering -> Encrypted Peering, click New Peering to peer the two
   gateways.

#. Note "Over AWS Peering" field currently only works when used in conjunction to transitive peering. When this field is selected, the controller does not program the AWS routing table to points peer VPC CIDR routes to the gateway. 


#. For a complete end to end solution, check out this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

.. disqus::
