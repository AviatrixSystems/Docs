﻿.. meta::
   :description: controller HA
   :keywords: controller high availability, controller HA, AWS VPC peering, auto scaling

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

###################################
Controller HA in AWS
###################################

Overview
--------

Aviatrix Controller HA in AWS leverages an auto scaling group and a Lambda function to perform monitoring the health of the current Controller, 
launching a new controller and restoring the configuration when the active controller instance become unreachable.

When a new controller is launched, the existing controller is terminated and its EIP is associated to the newly launched controller.  Existing configuration is restored, resulting in a seamless experience when failover happens.

Prerequisites
-------------

* Existing AVX Controller.  If you have not yet launched an AVX Controller, please follow `this guide </StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__.

  * The Aviatrix version must be **>= 3.4**.  If older than 3.4, please `upgrade <inline_upgrade.html#how-to-upgrade-software>`__.
  * Enable Controller `Backup <controller_backup.html>`__.
  * AMI **aviatrix_cloud_services_gateway_043018_YYYY-xxxxxx** or later. If you are on an older AMI, please refer `here <Migration_From_Marketplace.html>`__. To migrate to the latest controller AMI first.

* The Controller's VPC should have one or more public subnets, preferably in different AZs for HA across multiple AZ.

* To use Controller HA with an ELB, refer to `here <https://docs.aviatrix.com/HowTos/controller_ssl_using_elb.html>`_

* Controller has enabled backup function. 

Controller HA Details
---------------------

Aviatrix Controller HA operates by relying on an AWS Auto Scaling Group.  This ASG has a desired capacity of 1.  If the Controller EC2 instance is stopped or terminated, it will be automatically re-deployed by the ASG.

An AWS Lambda script is notified via SNS when new instances are launched by the Auto Scaling Group.  This script handles configuration using a recent Controller backup file.  The Aviatrix Controller manages these backups once `enabled <controller_backup.html>`__.

Restoring the Aviatrix Controller from a newly built instance requires access to the S3 bucket to retrieve the latest backup file.  In order to do this, the newly built EC2 Controller instance must be granted permission to read files in the bucket.  The simplest method of doing this is via an `IAM user with programmatic access to the S3 bucket <#create-iam-user>`__.

Steps to Enable Controller HA
-----------------------------

Launch CloudFormation Stack
###########################

#. Log in to the AWS console and switch to the region where your existing AVX Controller is installed.
#. Launch `this CloudFormation stack <https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=AviatrixControllerHA&templateURL=https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aviatrix-aws-existing-controller-ha.json>`__
#. Click **Next**
#. Populate the fields as follows:

   +-------------------------------+------------------------------------------+
   | Field                         | Expected Value                           |
   +===============================+==========================================+
   | Stack name                    | Any valid stack name.                    |
   +-------------------------------+------------------------------------------+
   | Enter VPC of existing         | Select the VPC in this region where the  |
   | controller instance.          | AVX Controller is installed.             |
   +-------------------------------+------------------------------------------+
   | Enter one or more subnets in  | Select the subnet where the Controller   |
   | different Availability zones  | is installed and optionally one          |
   | within that VPC.              | additional subnet for redundancy.        |
   +-------------------------------+------------------------------------------+
   | Enter Name tag of the existing| Enter the **Name** tag for the existing  |
   | Aviatrix Controller instance. | Controller EC2 instance.                 |
   +-------------------------------+------------------------------------------+
   | Enter S3 Bucket which will be | Name of S3 bucket that stores the        |
   | used to store backup files.   | backup files from the AVX Controller.    |
   +-------------------------------+------------------------------------------+
   | Enter an email to receive     | Enter an email address that will be      |
   | notifications for autoscaling | notified whenever a new Controller is    |
   | group events                  | provisioned.                             |
   +-------------------------------+------------------------------------------+

#. Click **Next**
#. Populate any additional CloudFormation Options.
#. Click **Next**
#. Check "I acknowledge that AWS CloudFormation might create IAM resources with custom names."
#. Click **Create**
#. Refresh the Stacks page and wait for the status of this stack to change to **CREATE_COMPLETE**

   .. note::

      If the stack fails (and ends with status of **ROLLBACK_COMPLETE**) check the log messages in the **Events** section.  If you see an error that says "Failed to create resource. AMI is not latest. Cannot enable Controller HA. Please backup/restore to the latest AMI before enabling controller HA. ", then follow the steps outlined `here <Migration_From_Marketplace.html>`__.
   
.. note::
   This stack creates the following:
   
   * An Autoscaling group of size 1 and associated security group
   * A SNS topic with same name as of existing controller instance
   * An email subscription to the SNS topic (optional)
   * A Lambda function for setting up HA and restoring configuration automatically
   * An AWS Role for Lambda and corresponding role policy with required permissions

.. tip::
   Additional instructions and code are available `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/>`__.
     
Steps to Disable Controller HA
------------------------------

You can disable Controller HA by deleting the Controller HA CloudFormation stack. 

Log in to AWS Console, go to CloudFormation Service, identify the CloudFormation stack you used to enable Controller HA and delete the stack. 


FAQ
---
* Can two controllers in two different regions be linked such that they can detect if one or the other is down? Is this possible?
	Our Controller HA script leverages EC2 auto scaling. EC2 auto scaling doesn’t support cross regions but it does support cross AZs. The script will automatically bring up a new Controller in case the existing Controller enters an unhealthy state.

* Could a controller in a different region be used to restore a saved configuration in case of disaster recovery? Will the change in controller’s IP cause any issues?
	A controller can be manually launched from a different region and the backed up configuration can be restored on it. The controller’s new EIP shouldn’t cause any issue unless SAML VPN authentication is being used. (All peering tunnels will still work). In that case, SAML VPN client will need reach the controller IP address. If FQDN hostname is used for the controller for SAML, then it should work after changing the Route 53 to resolve to the correct EIP in the different region.

.. disqus::
