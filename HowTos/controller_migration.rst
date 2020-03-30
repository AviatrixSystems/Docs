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


|
|


Migrate
=====================

Intro
--------

+ This feature mainly is to perform one click "Migrate" operation under "Settings->Maintenance->Migration" tab to migrate the current Aviatrix controller to a new one.
+ The EIP will be migrated from old controller to the new one.
+ The whole migration process will take around 10 to 15 minutes.




Prerequisites
-----------------

+ The feature only supports AWS and AWS-Gov at the moment. (Only AWS products/AMIs, "BYOL" and "Metered" are supported)
+ User needs to enable controller backup using an AWS based access-account.
+ User must disable controller HA. (User can enable HA again on the new controller once migration is fully completed)
+ User should not make any config change during the migration as these config will be lost once new controller takes over.





Controller Migration feature does the following in sequence
---------------------------------------------------------------

1. User executes the "Migrate" feature on old controller
2. Old controller enables controller "BackUp Now" feature to make sure the backup config file is up-to-date
3. Old controller creates a new cloud virtual machine which has the latest Aviatrix controller image
4. New controller extends disk partition to the max of the disk space available
5. New controller initialize itself to match the version of old controller
6. New controller restores configuration file from backup of step 2
7. New controller invokes cloud API to transfer its old controller's EIP to itself
8. New controller invokes cloud API to stop old controller




Status
---------
+ The migration status will be displayed in a tag named "MigrationStatus" of the new controller instance. Sample status messages are "Initializing", "Migrating", "Successful".




|
|


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
2. New controller perform "Settings->Maintenance->Backup&Restore->Restore->Restore(with latest backed up file)
3. If you want to keep the old controller public ip, detach it from the old controller and reattch to new controller. Otherwise perform "Troubleshoot->Diagnostics->Network->Controller IP Migration->Migrate"

.. disqus::
