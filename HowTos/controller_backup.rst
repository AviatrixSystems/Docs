.. meta::
   :description: controller HA
   :keywords: controller high avalability, controller HA, AWS VPC peering

###################################
Controller Backup and Restore
###################################

When deployed in a cloud environment, the Aviatrix controller, is not in the data path as packet processing and encryption is done by the Aviatrix gateways.

When the controller is down or out of service, your network will continue to be operational and encrypted tunnels and OpenVPN® users stay connected and are not affected. Since most of the data logs are forwarded from the gateways directly, the loss of log information from the controller is minimal. The only impact is that you cannot build new tunnels or add new OpenVPN® users.

This loosely coupled relationship between the controller and gateways reduces the impact of the availability of the controller and simplifies your infrastructure. Since the controller stores configuration data, it should be periodically backed up to the appropriate AWS/Azure/Google account. If a replacement controller is launched, you can restore the configuration data from your backup.


How to backup configuration 
---------------------------

  1. Settings -> Maintenance -> Backup & Restore -> Under BACKUP section
  #. Select **Cloud Type**
  #. Select **Account Name**

(example: If AWS were selected as the cloud type, specify an **S3 bucket name**)

The first time you enable this feature, the configuration will backed up to your specified location. After this, the configuration data is automatically backed up daily at 12am.

If you want to force an immediate backup (e.g. for a configuration change) you can accomplish this by disabling the backup and then re-enabling it again. Note: Only the latest configuration data is stored (no versioning at this time). Each time the configuration is backed up, it overwrites the previous one.

How to restore configuration
--------------------------------

  1. Settings -> Maintenance -> Backup & Restore -> Under RESTORE section
  #. Select the **Cloud Type** and other credentials to retrieve the backup configuration data. For example, for AWS, you need to specify the **Access Key**, **Secret Key**, **Bucket Name** and **File Name**.
  #. Click Restore

The new controller will then inherit the configuration data.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
