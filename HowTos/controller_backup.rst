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

  1. Settings -> Maintenance -> Backup & Restore -> Under BACKUP section
  #. Select **Cloud Type**
  #. Select **Account Name**
  #. Select storage location information
  #. Select **Multiple Backup**

(example: If AWS were selected as the cloud type, specify an **S3 bucket name**)

The first time you enable this feature, the configuration will backed up to your specified location. After this, the configuration data is automatically backed up daily at 12am.

Selecting "Multiple Backup" checkbox, will enable the controller to backup up to a maximum 3 rotating backups. Each backup filename will be contain date and time of when the backup is made. Additionally, the backup without any date and time in the filename contains a copy of the latest backup.

If you want to force an immediate backup (e.g. for a configuration change) you can accomplish this by clicking on the "Backup Now" button. If multiple backups are not enabled, each time the configuration is backed up, the backup up file will be overwritten. Otherwise, the oldest backed up will be overwritten.

How to restore configuration
----------------------------

  1. Settings -> Maintenance -> Backup & Restore -> Under RESTORE section
  #. Select the **Cloud Type** and other credentials to retrieve the backup configuration data. For example, for AWS, you need to specify the **Access Key**, **Secret Key**, **Bucket Name** and **File Name**.
  #. Click Restore

The new controller will then inherit the configuration data.

How to backup configuration with AWS encrypted storage
------------------------------------------------------

AWS S3 allows uploaded backup files to be encrypted in the server side for more secure storage.
The encryption are all done in the AWS S3 server side.

1. Create AWS S3 bucket
^^^^^^^^^^^^^^^^^^^^^^^

|S3Create|


2. Configure bucket server side encryption in S3 bucket properties.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|S3Properties|

3. Select either None, AES-256, AWS-KMS AWS/S3, or AWS-KMS Custom KMS ARN.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    |S3SelectDefaultEncryption|

        |S3SelectEncryption|

4. If AWS-KMS with Custom KMS ARN is selected, additional configuration will be needed:
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    a. Create Custom Encryption Key by going to IAM->Encryption Keys->Create Key

    |KMSKeyCreate|

    b. copy the custom Key KMS ARN to the S3 encryption property configuration

    c. Make sure that the custom encryption key and the S3 bucket are in the same region

    d. If IAM user is used for onboarding authentication, add user "aviatrix-role-app" into the key

    |KMSKeyAddUser|


OpenVPN is a registered trademark of OpenVPN Inc.

.. |S3Create| image:: controller_backup_media/S3Create.png
    :scale: 30%
.. |S3Properties| image:: controller_backup_media/S3Properties.png
    :scale: 30%
.. |S3SelectDefaultEncryption| image:: controller_backup_media/S3SelectDefaultEncryption.png
      :scale: 25%
.. |S3SelectEncryption| image:: controller_backup_media/S3SelectEncryption.png
      :scale: 25%
.. |KMSKeyCreate| image:: controller_backup_media/KMSKeyCreate.png
      :scale: 30%
      :align: middle
.. |KMSKeyAddUser| image:: controller_backup_media/KMSKeyAddUser.png
      :scale: 30%
      :align: middle

.. disqus::
