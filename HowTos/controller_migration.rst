.. meta::
   :description: controller Migration
   :keywords: controller high availability, controller HA, AWS VPC peering, auto scaling

# Controller Migration in AWS


Introduction
========================================

+ This feature is released in 5.3
+ This feature has 2 sub-features:
    - Migrate
    - Restore





Feature: Migrate
========================================

Intro
--------------------------------------------------------------------------------

+ This feature mainly is to perform "One Click" operation to migrate the current Aviatrix controller to a new one.
+ The EIP will be migrated from old controller to the new one





Prerequisites
--------------------------------------------------------------------------------

+ The feature only supports AWS at the moment
+ User needs to enable controller backup using an AWS based access-account.
+ User must disable controller HA. (User can enable HA again on the new controller once migration is fully completed)
+ User should not make any config change during the migration as these config will be lost once new controller takes over.





Controller Migration feature does the following in sequence
--------------------------------------------------------------------------------

01) User executes the "Migrate" feature on old controller
02) Old controller enables controller "BackUp Now" feature to make sure the backup config file is up-to-date
03) Old controller creates a new cloud virtual machine which has the latest Aviatrix controller image
04) New controller extends disk partition to the max of the disk space available
05) New controller initialize itself to match the version of old controller
06) New controller restores configuration file from backup of step 2
07) New controller invokes cloud API to transfer its old controller's EIP to itself
08) New controller invokes cloud API to stop old controller





Feature: Restore
========================================

Intro
--------------------------------------------------------------------------------

+ This feature is being performed in the new controller.
+ This feature mainly is to perform "One Click" then give/return EIP from new controller back to the old controller if user decides to revert the "Migration" process.





Feature Logic Workflow
--------------------------------------------------------------------------------

01) New controller invokes cloud API to "Start" the old controller from "STOP" state
02) New controller waits until old controller virtual machine is ready
03) New controller invokes cloud API to transfer EIP back to old controller
04) New controller invokes cloud API to stop itself


.. disqus::
