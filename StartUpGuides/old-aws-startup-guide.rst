=============================================
AWS
=============================================

The Aviatrix cloud network solution consists of two components, controller and
gateway, both are AWS instances. Gateways are launched from the controller 
browser console by using your account IAM roles and AWS APIs. This
guide helps you to launch the Controller instance in AWS. The Controller
image is also available in Azure Marketplace and GCloud.

Create an AWS EC2 Account
=========================

You need to have an AWS EC2 account to use the solution. Note that the
Controller supports multiple accounts with each one associated with a
different AWS IAM role or account, but there needs to be at least one to start with.

This AWS account can be a root account, IAM role, IAM administrator
account or IAM user account with access privileges required by the Aviatrix
solution.

We strongly recommend you to use IAM role for security reasons.

Subscribe to Aviatrix on AWS Marketplace
=========================================

You must subscribe to one of the Aviatrix AMIs on AWS marketplace prior to launch the Controller.
Once you subscribe, return to this page and continue to the next section. 

Search "aviatrix" on AWS marketplace and accept the terms and conditions to use the software.
After subscription, follow the instructions in the next sections to launch the Controller.

If you choose the BYOL image, you need a customer ID (license ID) to use Aviatrix solution. Please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ to obtain one.

DNS Server Connectivity Check
==============================

If the VPC where the Controller is deployed in has a custom DNS server (via DHCP option), 
make sure the Controller instance can reach this DNS server. 

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.  

..


Launch Aviatrix Controller 
=============================================

Controller must be launched on a public subnet of a VPC. 

Launch from CloudFormation script
----------------------------------

If you select the Aviatrix BYOL AMI, the recommended way to launch the Controller is by our CloudFormation script. 
Follow the instruction `for Aviatrix QuickStart Cloudformation Script  <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#step-2-launch-the-controller-with-cloudformation>`__ to launch a controller instance in a selected region.

Launch Utility AMIs manually
----------------------------

For utility AMIs, you need to `launch the utility AMIs controller manually described in this document. <http://docs.aviatrix.com/StartUpGuides/aws_manual_startup_guide.html>`_ 

Access the Controller
=======================

After the Controller instance is in running state in AWS, you can access the Controller
via a browser by `https://Controller_public_EIP`, where Controller_public_EIP is the Elastic IP address of the Controller. 

The initial password is the private IP address of the instance. 

Follow the steps to go through an initial setup phase to download the latest software.
After the latest software is downloaded, re-login again to go through the onboarding process. 

Onboarding
===========

The purpose of onboarding is to help you setup an account on Aviatrix Controller that
corresponds to an IAM role with policies so that the Controller can launch gateways and build networks using AWS APIs. 

If you launched the Controller via CloudFormation script, the required IAM roles and policies are already setup, follow `this instruction <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#aviatrix-controller-launched-from-cloudformation>`_ to complete account
creation.    

Note you can create a single Aviatrix account that corresponds to AWS, Azure and GCloud account credentials. This is a multi cloud platform.

To create a Global Transit Network, click Transit VPC on the main navigation bar to start.

Setup for Operations
=====================

If this Controller is for your production, we strongly recommend you to enable Controller `Backup/Restore feature. <http://docs.aviatrix.com/HowTos/controller_backup.html>`_ 
This allows you to backup configurations on the Controller to an S3 bucket so that you can recover the configurations in a disaster situation. 

Controller HA
==============

To enable Controller HA in AWS, follow `the instructions here. <http://docs.aviatrix.com/HowTos/controller_ha.html>`_

Controller Monitoring
======================

If Controller HA is not enabled, we recommend you to use AWS CloudWatch to configure alarms and actions to 
reboot the controller when it fails Status Check. 

Key Use cases
===================

 - `Inter region and inter cloud peering <http://docs.aviatrix.com/HowTos/peering.html>`_

 - `Global Transit Network <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

 - `Client VPN or OpenVPN® <http://docs.aviatrix.com/HowTos/uservpn.html>`_

For support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_. Enjoy!


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image0| image:: AviatrixCloudControllerStartupGuide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |image1| image:: AviatrixCloudControllerStartupGuide_media/image002.png
   :width: 4.80625in
   :height: 3.21803in
.. |image2| image:: AviatrixCloudControllerStartupGuide_media/image003.png
   :width: 5.33067in
   :height: 2.04513in
.. |image3| image:: AviatrixCloudControllerStartupGuide_media/image004.png
   :width: 4.92712in
   :height: 2.20352in
.. |image4| image:: AviatrixCloudControllerStartupGuide_media/image005.png
   :width: 5.53494in
   :height: 3.11814in
.. |image5| image:: AviatrixCloudControllerStartupGuide_media/image006.png
   :width: 5.21042in
   :height: 2.60298in
.. |image6| image:: AviatrixCloudControllerStartupGuide_media/image007.png
   :width: 4.61664in
   :height: 4.22847in


.. add in the disqus tag

.. disqus::
