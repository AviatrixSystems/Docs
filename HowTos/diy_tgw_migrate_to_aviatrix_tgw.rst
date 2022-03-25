.. meta::
   :description: instructions on migrating from DIY TGW to Aviatrix managed TGW	deployment
   :keywords: Transit Gateway, AWS Transit Gateway, TGW, TGW Migration

==================================================================
Migrating a DIY TGW to Aviatrix Managed TGW Deployment 
==================================================================

If you built an AWS Transit Gateway (TGW) deployment by yourself (the DIY way) and would like to migrate to an Aviatrix managed TGW deployment, 
this document is for you. 

The objectives here are:

 - Minimum downtime during migration.
 - No change to existing VPC infrastructure.
 - Minimum change to on-prem network.   

.. Note::

  This document assumes you have already `launched an Aviatrix Controller <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

..

Before the migration process starts,  plan out what security domains you need to create and which security domains should connect other domains. If you are not sure and need to transition, proceed with no worries. The security domains can be added and modified at any time. 

The Solution
^^^^^^^^^^^^^^^^

There are multiple ways to migrate. For example, you can simply detach a spoke VPC from the DIY TGW and attach it to Aviatrix-managed TGW and then build hybrid connection if necessary. 

In this implementation, the migrated spoke VPCs can communicate with the not yet migrated VPCs during migration process, and in addition the 
migrated spoke VPCs can communicate with on-prem network, thus reducing the 
downtime, as shown in the migration architecture below. 

|migration_architecture|

The key idea is to build an IPsec tunnel between TGW VPN and Aviatrix Transit Gateway, so that migrated VPC can
communicate with not yet migrated VPCs and also to on-prem. 


1. `Launch a new AWS Transit Gateway <https://docs.aviatrix.com/HowTos/tgw_plan.html#creating-an-aws-tgw>`_.
2. If you have plans for custom security domains, `create new security domains <https://docs.aviatrix.com/HowTos/tgw_plan.html#creating-a-new-security-domain>`_. Then, `build your domain connection policies <https://docs.aviatrix.com/HowTos/tgw_plan.html#building-your-domain-connection-policies>`_. If you do not intend to build custom security domains, skip this section. 
3. `Launch an Aviatrix Transit GW and enable HA in the Transit Hub VPC <https://docs.aviatrix.com/HowTos/tgw_plan.html#setting-up-an-aviatrix-transit-gw>`_. As a best practice, create a new Transit Hub VPC to deploy the Aviatrix Transit GW. 

.. Note::

  Make sure you enable `ActiveMesh Mode <https://docs.aviatrix.com/HowTos/gateway.html?#activemesh-mode>`_. This document 
is written for Aviatrix Transit GW with ActiveMesh mode enabled.  

..

Then, create a TGW VPN Attachment using the steps below.

Creating TGW VPN Attachment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Log in to the AWS console and select **VPC Service**. 
2. Click Transit Gateway Attachments > Create Transit Gateway Attachment. 
3. Select Attachment type VPN, as shown below. 

|tgw_vpn_config|

4. After the attachment is created, go to Site-to-Site VPN Connections and click **Download Configuration**. Make sure you select 
Vendor **Generic** and download the configuration text file.  


Creating VPN on Aviatrix Transit Gateway
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This step is to create the other end of the VPN tunnel that terminates on the Aviatrix Transit GW. 

1. Log in to the Aviatrix Controller. 
2. Navigate to Multi-Cloud Transit > Setup > External Connection tab.
3. Select **External Device** and fill in the parameters from the downloaded configuration text file as shown below, where 
the right side shows the screen capture of the AWS VPN configuration text file. 

|migrate_tgw_config_vpn|

Starting to Migrate VPCs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this step, you detach VPCs from DIY TGW and attach them to an Aviatrix-managed TGW. 

 ::
 
 - Before or after you detach a VPC, you may need to clean up the VPC route tables entries so that they do not have conflict routes entries when later attaching it to Aviatrix managed TGW. 


Repeat this step to migrate all VPCs. 


Building the Hybrid Connectivity
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once all VPCs have migrated to Aviatrix-managed TGW deployment, the migrated VPCs communicate with on-prem via Aviatrix Transit GW to DIY TGW and then to on-prem.

At this point, you can move DIY TGW Direct Connect to Aviatrix Transit GW or to Aviatrix managed TGW directly. 

Deleting DIY TGW
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After all VPCs and hybrid connectivity if any are all removed, you can safely delete DIY TGW. 


.. |tgw_vpn_config| image:: diy_tgw_migrate_to_aviatrix_tgw_media/tgw_vpn_config.png
   :scale: 30%

.. |migration_architecture| image:: diy_tgw_migrate_to_aviatrix_tgw_media/migration_architecture.png
   :scale: 30%

.. |migrate_tgw_config_vpn| image:: diy_tgw_migrate_to_aviatrix_tgw_media/migrate_tgw_config_vpn.png
   :scale: 30%

.. disqus::
