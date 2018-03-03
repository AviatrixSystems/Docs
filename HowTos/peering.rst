.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering


Peering
===========

Encrypted Peering
""""""""""""""""""
Aviatrix provides a point and click solution to create an encrypted tunnel between two VPCs. The two VPCs could be in the same region, in different regions (inter region) and in different clouds (inter cloud)

This guide helps you configure an encrypted peering. For cluster peering, refer to `this doc. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

1. At Gateway menu, create a gateway in an
   existing VPC/VNet.

#. Repeat the step 1 for a different VPC/VNet.

#. Select "Enable HA" if you wish to build a backup encrypted tunnel for HA. Note that you must first create two respective backup gateways prior to this step. To launch backup gateways, go to Gateway page, select the gateway, click Edit, At "Gateway for High Availability Peering" field, select one public subnet and click Create. 

#. At Peering -> Encrypted Peering, click New Peering to peer the two
   gateways.


#. For a complete end to end solution, check out this `reference
   design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

AWS Peering
""""""""""""""""""

Aviatrix Controller integrates native `AWS VPC Peering <https://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html>`_ for both intra region peering and inter 
region peering, where it is available. Cross accounts peering is also supported. 

To configure, go to Peering at the main navigation menu, click AWS Peering. Select the account, region and VPC. 
You can choose the build the peering for the entire VPC or select individual route tables. 

.. disqus::
