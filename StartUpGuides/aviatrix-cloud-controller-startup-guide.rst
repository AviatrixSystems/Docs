=============================================
AWS
=============================================

The Aviatrix cloud network solution consists of two components, controller and
gateway, both are AWS instances. Gateways are launched from the controller browser console. This
guide helps you to launch the controller instance in AWS. The controller
image is also available in Azure and GCloud.

Create an AWS EC2 Account
=========================

You need to have an AWS EC2 account to use the solution. Note that the
controller supports multiple accounts with each one associated with a
different AWS account, but there needs to be at least one to start with.

This AWS account can be a root account, IAM role, IAM administrator
account or IAM user account with access privileges required by the Aviatrix
solution.

We strongly recommend you to use an IAM role for security reasons,
follow instructions during onboarding time of the controller instance to
setup custom security policy.

Subscribe to Aviatrix on AWS Marketplace
=========================================

You must subscribe to one of the Aviatrix AMIs on AWS marketplace prior to launch the controller.

Search "aviatrix" on AWS marketplace and accept the terms and conditions to use the software.
After subscription, follow the instructions in the next sections to launch the controller.

DNS Server Connectivity Check
==============================

If the VPC where the controller is deployed in has a custom DNS server (via DHCP option), 
make sure the controller instance can reach this DNS server. 

.. Warning:: Any resources created by the controller, such as Aviatrix gateways, AWS routing tables, subnets, ELB, etc, must be deleted from the controller console. If you delete them directly on AWS console, controllers view of resources will be incorrect which will lead to features not working properly.  

..


Launch Aviatrix Controller via CloudFormation
=============================================

Aviatrix Controller can be launched from a CloudFormation script. Follow the instruction `here <https://github.com/AviatrixSystems/AWSQuickStart>`__ to launch a controller instance in a selected region.

To launch the controller manually, read the next section. 

Launch Aviatrix Controller from AWS Marketplace
===============================================

Before you launch the controller with IAM role, you must first create 2
IAM roles and its associated policies. Follow `this
link <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`__
to have them setup.
Then go to https://aws.amazon.com/marketplace, search for “Aviatrix” and
select the image type you wish to launch.

::

  Note if you select the BYOL image, you need a customer ID from Aviatrix
  for launching gateways. Send email to support@aviatrix.com or
  info@aviatrix.com to request a customer ID.


Customer ID is not needed if you select utility images such as “5
Connections” and “10 Connections”.

At the AWS marketplace console, select “\ **Manual Launch**\ ” that takes you
to EC2 console to launch with IAM role. Once you select Manual Launch,
click at a region where you wish to launch the controller.

|image1|

Once you are at AWS EC2 console, follow the steps below:

1.  Select the instance size “t2.large” of 4GB of memory, which is the minimum instance
    required.

2.  Select the VPC where the controller will be launched.

3.  Subnet. Make sure the subnet you select is a public subnet with IGW
    as its default gateway, otherwise the controller will not be accessible
    as it won't have a public IP address.

4.  Enable IAM role by selecting “aviatrix-role-ec2” you created
    earlier, as shown below

    |image2|

5.  Edit security groups to allow inbound TCP port 443 open to anywhere,
    as shown below:

    |image3|

6.  We recommend you to use an Elastic IP address for the controller.

7.  After launching the instance, note down the instance’s Private IP
    address and Public IP.

8.  Use a browser to log in to the console.

    Use a web browser, go to https://controller_Public_IP to access the
    controller console, as shown below.

    |image4|

    At the Sign In page, log in with username 'admin'. The default
    password is the instance’s Private IP address. You can retrieve the
    Private IP address from the AWS console instance panel, as shown
    below.

    |image5|

    |image6|

9.  Once you are logged in, change your password for future accesses via the console.

10. Go through the initial installation of software.

11. After the installation is complete, log in again to the controller by
    typing at the browser:

    https://controller_public_IP

12. Troubleshooting tips:

    a. If you experience 'Login timeout error', check your instance
       outbound security policy to make sure it opens on port 443.

    b. If you cannot find your instance’s public IP address, you may
       have launched the instance from a private subnet. The controller
       instance must be launched from a public IP address.

    c. The controller needs to have its inbound port 443 open to AWS
       address ranges as Aviatrix gateways need to communicate to the
       controller on this port.

Onboarding
==========

After logging in to the browser console again, go through a few steps of
onboarding to setup Aviatrix Cloud account which corresponds to AWS,
Azure or GCloud account.

Under Help menu check out Frequently Asked Questions (FAQs), Reference
Designs and Release Notes. All features have descriptions embedded and
should be self-explanatory.

An alert message will be displayed on the Dashboard menu when a new
release becomes available.

Controller Monitoring
======================

The controller can be monitored by AWS CloudWatch. We recommend you to configure alarms and actions to 
reboot the controller when it fails Status Check. 

Feature Highlights
===================

 - `Inter region peering <http://docs.aviatrix.com/HowTos/peering.html>`_

 - `Global Transit Network <http://docs.aviatrix.com/Solutions/aviatrix_aws_transitvpc.html>`_

 - `Client VPN or OpenVPN <http://docs.aviatrix.com/HowTos/uservpn.html>`_

For support, send email to support@aviatrix.com. Enjoy!

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
