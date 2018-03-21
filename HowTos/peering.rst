.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering


Peering
===========

Encrypted Peering
""""""""""""""""""
Aviatrix provides a point and click solution to create an encrypted tunnel between two VPCs. The two VPCs could be in the same region, in different regions (inter region) and in different clouds (inter cloud)

This guide helps you configure an encrypted peering. For cluster peering, refer to `this doc. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

::

 1. At Gateway menu, create a gateway in an
   existing VPC/VNet.

 2. Repeat the step 1 for a different VPC/VNet.

 3. To enable Peering HA, go to Peering -> Encrypted Peering -> New peering, 
    select the two gateways launched in the previous two steps. 

    select "Enable HA" if you wish to build a backup encrypted tunnel for HA. 
    Note that you must first create two respective backup gateways prior to this step. 

    To launch backup gateways, go to Gateway page, select the gateway, click Edit, 
    At "Gateway for High Availability Peering" field, select one public subnet 
    and click Create. 

 4. Go to Peering -> Encrypted Peering, click New Peering to peer the two
   gateways.

For a complete end to end solution, check out this `reference design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_.

AWS VPC Peering
""""""""""""""""""

Aviatrix Controller integrates native AWS `VPC Peering <https://docs.aws.amazon.com/AmazonVPC/latest/PeeringGuide/Welcome.html>`_ for both intra region peering and inter 
region peering, where it is available. Cross accounts peering is also supported. 
We made it simple for AWS VPC Peering by integrating route table programming and integrating requester and acceptor to one step. You can also decide which route table to participate the AWS VPC Peering. 

::

 To configure, go to Peering -> AWS Peering -> New Peering.
 Select the account, region and VPC. 
 You can choose to build the peering for the entire VPC or select individual route tables. 


MultiCloud Peering
"""""""""""""""""""

MultiCloud Peering configuration is the same way as Encrypted Peering. You 
launch two gateways in a VPC or VNet, 
follow the `Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ to complete. 


.. disqus::
