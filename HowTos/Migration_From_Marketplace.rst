.. meta::
   :description: Migration from AWS Marketplace Licensing Model to BYOL Licensing Model
   :keywords: Marketplace, migration, licensing, Aviatrix, AWS

==============================================================================
  Migration from AWS Marketplace Licensing Model to Metered/BYOL Licensing Model
==============================================================================

Introduction
============

Many customers start by trying our AWS Marketplace image that allows you to deploy 10 VPN Users or 5 Peering Tunnels.
Those images are not flexible and cannot be extended beyond it's initial license.
In order to exceed this limitations, the customer needs to move to a Metered AMI or BYOL License model.
This document outlines all the steps necessary to execute the migration.


Pre-requisites
==============
1. Existing Aviatrix AWS Marketplace instance deployed.
#. We highly recommend migrating to Metered AMI as it is more flexible and scalable as your business needs change over time.
#. For migration to a BYOL license model, please contact your Aviatrix Sales Account Manager to acquire the appropriate BYOL License.
#. All Aviatrix controller should be running 3.2 (or later).

Step 1 - Enable Backup
======================
On the existing Aviatrix Marketplace Controller, go to Settings-->Maintenance-->Upgrade tab and make sure you are running the latest version. If it is not the latest version, please perform Dry Run and upgrade the controller by following our `Inline Software Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_.

|image1|

Next, go to Settings--> Maintenance and select the Backup & Restore tab.
Create an S3 bucket in your AWS account and copy the name on the corresponding field. Click Enable.

|image2|

::

  Note: If you already have Backup enabled, please disable and re-enable to make sure the backup is executed.
  Double check on your S3 bucket that the file has been updated based on the timestamp.

Step 2 - Stop the Marketplace instance
======================================
On the AWS console proceed to STOP the existing Aviatrix AWS Marketplace controller instance.

Step 3 - Disassociate EIP
=========================
On the AWS console, go to EC2-->Network & Security --> Elastic IPs, and disassociate the EIP from the existing Aviatrix AWS Marketplace controller instance.

::

  Note: Make sure browser cache is cleared before the next Step,
  to avoid connecting to an old stale session.

Step 4 - Launch Metered/BYOL Controller
======================================
Launch new Aviatrix Controller using the Metered AMI or BYOL License. Please refer to our `AWS Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#step-1-subscribe-to-an-aviatrix-ami>`_ to subscribe to the Aviatrix AMI.

Step 5 - Attach EIP
===================
On the AWS console, go to EC2-->Network & Security --> Elastic IPs, associate the same EIP from step 3 to the new Aviatrix  Metered/BYOL Controller.

Step 6 - Upgrade Controller
===========================
Make sure your new Aviatrix Controller is upgraded to same version (latest) by validating it at Settings-->Maintenance-->Upgrade tab. Please note that Aviatrix only supports controller backup and restore within the same software version. In this example, the previous controller is upgraded to the latest 3.3.402 at the time of this writing. The following screenshot shows that the new controller is running the latest 3.3.402 as well.

|image3|

Step 7 - Restore
================
On the new Aviatrix Controller, go to Settings--> Maintenance and select the Backup & Restore tab.
Insert the right S3 bucket name and execute a restore.

|image4|

Step 8 - Install License
=========================
On the on-boarding page, enter the customer id provided by your Aviatrix Sales Account Manager.

|image5|

  Note: You may need to re-enter your BYOL Customer ID after controller restore operation. We also suggest that you backup
  the latest configuration by clicking the Backup Now button at Settings-->Maintenance-->Backup & Restore tab.

Step 9 - Enjoy your new controller
======================================


::

  Optional: After confirming everything is running correctly,
  delete the previous Aviatrix AWS Marketplace controller instance.

For support, send email to support@aviatrix.com.


.. |image1| image:: Migration_From_Marketplace/image1-3.3.png
.. |image2| image:: Migration_From_Marketplace/image2-3.3.png
.. |image3| image:: Migration_From_Marketplace/image3-3.3.png
.. |image4| image:: Migration_From_Marketplace/image4-3.3.png
.. |image5| image:: Migration_From_Marketplace/image5-3.3.png

.. disqus::
