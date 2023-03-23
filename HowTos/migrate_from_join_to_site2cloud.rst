

Migrating a Join deployment to Site2Cloud deployment 
======================================================

If you have deployed virtual appliance CloudN and used Join feature to connect your existing VPCs and would like to migrate to use Site2Cloud feature instead to connect to the same set of VPCs, the following steps can be a reference guide. 
You can choose to re-use the same CloudN for the on-prem gateway in Site2Cloud implementation or a different CloudN. 
For ease of reference, we call the VPC where the Join and Site2Cloud VPC gateway terminates migrating VPC. 

.. Note:: This migration process will have tunnel down time. It is best practice to plan the migration during a maintenance window. 
.. 

1. Launch an Aviatrix Controller in AWS or Azure.
#. From the Controller, launch an Aviatrix gateway in a migrating VPC. 
#. From the original CloudN where Join function was implemented, delete all participating subnets. After all subnets are deleted, delete the corresponding gateway.
#. On the default routing gateway where the original CloudN is deployed, remove the routes that points to the original CloudN as the next hop to the migrating VPC. (This step is not needed if the new and the original CloudN are the same one.)
#. On the Aviatrix Cloud Controller, create a Site2Cloud connection on the migrating VPC. Download the configuration template. 
#. On the new (this new could be the same original) CloudN, import the previously downloaded configuration template. 
#. Make sure the tunnel comes up. 
#. On the default routing gateway where the new CloudN is deployed, add a static route that points the new CloudN as the next hop to reach the migrating VPC. (This step is not needed is the new and the original CloudN are the same one.) 
#. The VPC migration from Join function to Site2Cloud is done. 
#. Repeat the above steps for more migrating VPCs.

.. disqus::
