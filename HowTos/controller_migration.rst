.. meta::
   :description: controller Migration
   :keywords: controller high availability, controller HA, AWS VPC peering, auto scaling

Controller Migration in AWS
##################################


Introduction
===============

This feature is released in 5.3. It consists of 2 sub-features:
    - Migrate
    - Restore


Migrate
=====================

Introduction
--------------

+ This feature mainly is to perform one click "Migrate" operation under "Settings->Maintenance->Migration" tab to migrate the current Aviatrix controller to a new one.
+ The EIP will be migrated from old controller to the new controller.
+ The whole migration process will take around 10 to 15 minutes.


Prerequisites
-----------------

+ The feature is supported in AWS and AWS-Gov for the "BYOL" and "Metered" AMI's.
+ An `account audit <https://docs.aviatrix.com/HowTos/account_audit.html>`_ on the controller account and all secondary accounts also should be done to make sure that the `IAM roles and policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_ are setup as suggested.
+ User needs to `enable controller backup <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ using an AWS based access-account.
+ User must ensure the controller instance type is at least t2.large.
+ User should not make any config change during the migration as these config will be lost once new controller takes over.
+ This activity should be scheduled during a maintenance window and a walk through `pre-op checklist <https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures>`_ is highly recommended.
+ PLEASE NOTE: User must `disable controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-disable-controller-ha>`_. (User can `enable HA again <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ on the new controller once migration is fully completed)
+ PLEASE NOTE: If you have any backend scripts/bots/security-processes monitoring your instances for any particular Tags to let the instance be recognized as approved to keep it running, please do plan to make these changes when the new controller comes up, before it is shutdown by your security process. Else the migration process will fail and you would have to delete the new controller and start the migration process again.


Controller Migration feature does the following in sequence
---------------------------------------------------------------

1. User executes the "Migrate" feature on old controller
2. Old controller executes "Controller/Settings/Maintenance/Backup&Restore/BackUpNow" to take a new backup to ensure that the backup is up-to-date
3. Old controller creates a new Aviatrix Controller using the latest Aviatrix controller AMI
4. New controller extends disk partition to the max of the disk space available
5. New controller initializes itself to match the software version of old controller
6. New controller restores configuration file from backup of step 2
7. New controller invokes cloud API to transfer its old controller's EIP to itself
8. New controller invokes cloud API to stop old controller

Note: A temparory EIP is created for business continuity during migration.  A new private IP will be created on the new controller.

Status
---------
+ The migration status will be displayed in a tag named "MigrationStatus" of the new controller instance on AWS console.  Sample status messages are "Initializing", "Migrating", "Successful".  After "Successful" appears around 15 minutes of migration, you may prepare to access the same EIP.


Post Migration Tasks
---------------------------

* Once all the tests are done to ensure that the controller migration is complete and successful, you can delete the old controller. It can be left in "stopped" status for a while, but it should never be started - else, it will reach out to the gateways and the network could have issues with two controllers trying to monitor/modify the gateways. 


Restore
========================================

Intro
--------------------------------------------------------------------------------

+ This feature is being performed in the new controller.
+ This feature mainly is to perform one click "Restore" operation under "Settings->Maintenance->Migration" tab to restore EIP from new controller back to the old controller if user decides to revert the "Migration" process.





Logic Workflow
--------------------------------------------------------------------------------

1. New controller invokes cloud API to "Start" the old controller from "STOP" state
2. New controller waits until old controller virtual machine is ready
3. New controller invokes cloud API to transfer EIP back to old controller
4. New controller invokes cloud API to stop itself



Controller Migration in Azure
##################################

Workflow

1. Old controller perform "Settings->Maintenance->Backup&Restore->Backup->Backup Now"
2. Launch the new controller(for 5.3 to 5.4 controller migration, , when prompted to upgrade to "latest", replace latest with 5.3)
   New controller perform "Settings->Maintenance->Backup&Restore->Restore->Restore(with latest backed up file)
3. Skip this step if you are NOT migrating from 5.3 to 5.4, but for 5.3 to 5.4 controller migration, upgrade new controller to 5.4
4. If you want to keep the old controller public ip, detach it from the old controller and reattch to new controller. Otherwise perform "Troubleshoot->Diagnostics->Network->Controller IP Migration->Migrate"

Controller Migration in GCP
##################################
GCP controller image in 5.3 and previous releases are based of 14.04 ubuntu distribution. 5.4 versions and higher versions of controller image will be based of 18.04 ubuntu distribution. Controller upgrade from 5.3 to 5.4 is not supported, instead the following workflow needs to be used.

Controller Migration from 5.3 to 5.4

1. On old controller (with version 5.3) perform "Settings->Maintenance->Backup&Restore->Backup->Backup Now"
2. Create a new controller based of latest GCP controller image  following instructions at 
   https://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html   
3.   When prompted to upgrade to "latest", replace latest with 5.3
4. On the new controller perform "Settings->Maintenance->Backup&Restore->Restore->Restore(with latest backed up file)
5. If you want to keep the old controller public ip, detach it from the old controller and reattach to new controller. 
   Otherwise perform "Troubleshoot->Diagnostics->Network->Controller IP Migration->Migrate"
6. Upgrade new controller to 5.4.

.. disqus::
