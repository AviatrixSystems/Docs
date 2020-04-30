.. meta::
   :description: Peering
   :keywords: Encrypted peering, inter region peering, inter cloud peering


Peering
===========

Encrypted Peering
""""""""""""""""""
Aviatrix provides a point and click solution to create an encrypted tunnel between two VPCs. The two VPCs could be in the same region, in different regions (inter region) and in different clouds (inter cloud)

This guide helps you configure an encrypted peering. For cluster peering, refer to `this doc. <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

 1. At Gateway menu, create a gateway in an existing VPC/VNet.

 #. Repeat the step 1 for a different VPC/VNet.

 #. To enable Peering HA, go to Peering -> Encrypted Peering -> New peering, select the two gateways launched in the previous two steps. 

    select "Enable HA" if you wish to build a backup encrypted tunnel for HA. 
    Note that you must first create two respective backup gateways prior to this step. 

    To launch backup gateways, go to Gateway page, select the gateway, click Edit, At "Gateway for High Availability Peering" field, select one public subnet and click Create. 

 #. Go to Peering -> Encrypted Peering, click New Peering to peer the two gateways.


.. Note::

 If the two gateways have `Insane Mode Encryption <https://docs.aviatrix.com/HowTos/gateway.html#insane-mode-encryption>`_ enabled, the Controller automatically creates an AWS VPC Peering (PCX) and establishes high performance encrypted peering between the two gateways. 
  

AWS VPC Peering
""""""""""""""""""

The Aviatrix Controller integrates native AWS `VPC Peering <https://www.aviatrix.com/learning/cloud-routing-networking/aws-vpc-peering/>`_ for both intra region peering and inter region peering, where it is available. Cross account peering is also supported. We have made it simple for AWS VPC Peering by integrating route table programming and integrating requester and acceptor into one step. You can also decide which route table to participate in the AWS VPC Peering. 

To Configure:

::

 1. Go to Peering -> AWS Peering -> New Peering.
 2. Select the account, region and VPC. 
 3. You can choose to build the peering for the entire VPC or select individual route tables. 
 4. Click OK.

 Azure VNET Peering
""""""""""""""""""

The Aviatrix Controller integrates native Azure `VNET Peering <https://docs.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview/>`_ for both intra region peering and inter region peering. Cross subscription peering is also supported as long as both subscriptions are onboarded to the controller.

To Configure:

::

 1. Go to Peering -> Azure Peering -> New Peering.
 2. Select the subscription, region and VNET. 
 3. Click OK.


MultiCloud Peering
"""""""""""""""""""

MultiCloud Peering configuration is the same way as Encrypted Peering. You 
launch two gateways in a VPC or VNet, 
follow the `Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html#encrypted-peering>`_ to complete. 


.. disqus::
