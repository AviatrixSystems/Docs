.. meta::
   :description: controller HA
   :keywords: controller high availability, controller HA, AWS VPC peering

###################################
Controller Backup and Restore
###################################

When deployed in a cloud environment, the Aviatrix controller, is not in the data path as packet processing and encryption is done by the Aviatrix gateways.

When the controller is down or out of service, your network will continue to be operational and encrypted tunnels and OpenVPN® users stay connected and are not affected. Since most of the data logs are forwarded from the gateways directly, the loss of log information from the controller is minimal. The only impact is that you cannot build new tunnels or add new OpenVPN® users.

This loosely coupled relationship between the controller and gateways reduces the impact of the availability of the controller and simplifies your infrastructure. Since the controller stores configuration data, it should be periodically backed up to the appropriate AWS/Azure/Google account. If a replacement controller is launched, you can restore the configuration data from your backup.


How to backup configuration 
---------------------------

Aviatrix stores the Controller backup in an AWS S3 bucket or an Azure Container.  Before you begin, determine where you would like to store the backup and create either the S3 bucket or Azure Container.

  #. Login to the Controller
  #. Click on the `Settings` navigation item
  #. Click on the `Maintenance` sub item
  #. Click on the `Backup & Restore` tab
  #. Under the `BACKUP` section:

     - Select the appropriate `Cloud Type` and `Account Name`
     - Populate the `S3 Bucket Name` for AWS or `Region`, `Storage Name`, and `Container Name` for Azure

     .. note::

        By default, only the latest configuration data is stored. Each time the configuration is backed up, it overwrites the previous one.
        If you would like to keep every copy, check the box `Multiple Backup`

  #. Click `Enable`

     |imageBackupAWS|
  
The first time you enable this feature, the configuration will backed up to your specified location. After this, the configuration data is automatically backed up daily at 12am.


How to restore configuration
--------------------------------

If you are starting from a new Controller, follow these steps to get started:

#. Login to the Controller with the `admin` username and the default password
#. Follow the initial steps to get the Controller up and running.

   #. Enter an email address
   #. Change your admin password
   #. Enter or skip the proxy configuration
   #. Allow the upgrade to run

Once you are past the initial configuration steps:

#. Login to the Controller
  #. Click on the `Settings` navigation item
  #. Click on the `Maintenance` sub item
  #. Click on the `Backup & Restore` tab
  #. Under the `RESTORE` section:
  
     - Select the `Cloud Type`
     - For AWS

       - If you would like to use an existing account, check the box `Use Cloud Account Name` and select the account.  Otherwise, enter an `Access Key` and `Secret Key`
       - Enter the `Bucket Name` and `File Name` of the file to restore.

     - For Azure

       - Enter the `Subscription ID` and `Certificate Path`
       - Enter the `Storage Name`, `Container Name`, and `File Name` of the file to restore.

  #. Click Restore

|imageRestoreAWS|

OpenVPN is a registered trademark of OpenVPN Inc.


.. |imageBackupAWS| image::  controller_backup_media/backup_restore_backup_aws.png

.. |imageRestoreAWS| image::  controller_backup_media/backup_restore_restore_aws.png
