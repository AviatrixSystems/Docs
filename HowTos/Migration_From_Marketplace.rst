Migration Guide Update:

.. meta::
   :description: Migration from AWS Marketplace Licensing Model to BYOL Licensing Model
   :keywords: Marketplace, migration, licensing, Aviatrix, AWS

==============================================================================
Migrating Aviatrix Controller AMI 
==============================================================================

Introduction
==============

This document outlines the steps to migrate from one type of Aviatrix Controller AMI to another. The use case may be 
migrating from Metered AMI to BYOL AMI or vice versa. You can also use this procedure to migrate to a newer Controller AMI.


.. note::
      For migration to a BYOL license model, please contact your Aviatrix Sales Account Manager or email sales@aviatrix.com to acquire the appropriate BYOL license.  Make sure you already have subscribed to the BYOL AMI. 
      
Prerequisites
=============

* Existing Aviatrix Controller instance deployed
* Aviatrix Controller running latest version of software

  #. Login to your existing Aviatrix Controller
  #. If you are using a BYOL image, please get your CustomerID either through **Controller** > **Settings** > **Controller** > **License** or from your Aviatrix Account Manager
  #. Navigate to **Settings** > **Maintenance** > **Upgrade tab**
  #. Make sure you are running the **latest** version. If it is not the latest version, please `upgrade <inline_upgrade.html>`__ before proceeding. Note that Aviatrix software version upgrade is a version-to-version upgrade. Therefore you may need to perform multiple upgrades until you reach the latest version on your existing controller. 

     |image1|

* An S3 bucket in the AWS account linked to your Aviatrix Controller (will be used for backups).
* Your IAM policy must be updated in all your AWS accounts. Please refer the instructions `here <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`__ to update your IAM policies.
* Make sure you delete the controller HA cloud formation stack. This is important to avoid the backup configuration being corrupted which may result in controller migration failure.

Step 1 - Enable Backup
======================

.. tip::
   If you already have backup enabled, click **Backup Now** to make sure you have the latest backup.
   Once complete, confirm in your S3 bucket that the backup file has been updated with the latest timestamp.

#. Login to your existing Aviatrix Controller
#. Navigate to **Settings** > **Maintenance** > **Backup & Restore tab**
#. Click **Enable**

|image2|

Step 2 - Stop the Current Aviatrix Controller Instance
======================================================

.. important::
   If the Controller has `HA enabled <controller_ha.html#enable-controller-ha>`__, you must first `disable the Controller HA <controller_ha.html#disable-controller-ha>`__.

.. note::
   To make best use of time, it is encouraged to launch the new Controller (as per **Step 4**) before stopping the old Controller.

On the AWS console proceed to **Stop** the existing Aviatrix Controller instance.

Step 3 - Disassociate EIP
=========================

On the AWS console, go to **EC2** > **Network & Security** > **Elastic IPs**.  Disassociate the EIP from the existing Aviatrix AWS Marketplace Controller instance.

.. note::
   Make sure your browser cache is cleared before the next step to avoid connecting to an old stale session.

Step 4 - Launch new Aviatrix Controller
=======================================

Launch new Aviatrix Controller.  Please refer to the `AWS Startup Guide </StartUpGuides/aviatrix-cloud-controller-startup-guide.html#step-1-subscribe-to-an-aviatrix-ami>`__ for steps.

  
   .. note::
   	  To make best use of time, it is encouraged to launch the new Controller before stopping the old Controller in Step 2.    
      
   .. attention::
      Make sure you already have subscribed to the AMI that you want to migrate to. Please refer to the `Subscribe to an Aviatrix AMI </StartUpGuides/aviatrix-cloud-controller-startup-guide.html#step-1-subscribe-to-an-aviatrix-ami>`__  for details.

Step 5 - Associate EIP
======================

On the AWS console, go to **EC2** > **Network & Security** > **Elastic IPs**, and associate the same EIP from step 3 to the new Aviatrix Controller.

If you have your old `controller behind an ELB <https://docs.aviatrix.com/HowTos/controller_ssl_using_elb.html>`_, please note that you would have to remove the old controller instance from the listening group and add the new controller instance in its place.

Step 6 - Upgrade Controller
===========================

Login to the new Controller and perform the initialization. Make sure your new Aviatrix Controller is upgraded to same version (latest) by validating it at **Settings** > **Maintenance** > **Upgrade tab**. Please note that Aviatrix only supports Controller backup and restore within the same software version. In this example, the previous controller is upgraded to the latest 5.2.2153 at the time of this writing. The following screenshot shows that the new controller is running the latest 5.2.2153 as well.

|image3|

Step 7 - Setup Aviatrix Customer ID (Not required if you are migrating to a Metered AMI Controller)
================
On the new Aviatrix Controller, go to **Settings** > **Controller** and select the **License**.
Fill your Aviatrix License ID into the field of Customer ID in the panel "SETUP AVIATRIX CUSTOMER ID".

|image6|

Step 8 - Restore
================
On the new Aviatrix Controller, go to **Settings** > **Maintenance** and select the **Backup & Restore tab**.
Insert the details about your S3 bucket name and execute a restore.

|image4|


Step 9 - Setup Aviatrix Customer ID Again (Not required if you are migrating to a Metered AMI controller) and AWS Account Number
================
On the new Aviatrix Controller, go to **Settings** > **Controller** and select the **License**.
Fill your Aviatrix License ID into the field of Customer ID in the panel "SETUP AVIATRIX CUSTOMER ID".

|image6|

Step 10 - Make sure the Security Groups of the new controller match the old controller's.  After modification, backup the configuration again.
================
.. tip::
   Optional: After confirming everything is running correctly, delete the previous Aviatrix AWS Marketplace Controller instance.

.. |image1| image:: Migration_From_Marketplace/image1-3.3.png
.. |image2| image:: Migration_From_Marketplace/image2-3.3.png
.. |image3| image:: Migration_From_Marketplace/latestrelease-3.3.png
.. |image4| image:: Migration_From_Marketplace/image4-3.3.png
.. |image5| image:: Migration_From_Marketplace/image5-3.3.png
.. |image6| image:: Migration_From_Marketplace/image6.png

.. disqus::
