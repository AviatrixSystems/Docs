.. meta::
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

Aviatrix Controller HA in AWS leverages auto scaling group and Lambda function to perform monitoring, launching a new controller and restoring configuration when the active controller instance become unreachable.

When a new controller is launched, the existing controller is terminated by auto scaling group and its EIP is associated to the controller. Existing configuration files are restored which gives you a seamless experience when failover happens.

Prerequisites
-------------

* Existing AVX Controller.  If you have not yet launched an AVX Controller, please follow `this guide </StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__.

  * Copy the **Name** tag of AVX Controller EC2 Instance
  * Version must be >= 3.4.  If older than 3.4, please `upgrade <inline_upgrade.html#how-to-upgrade-software>`__.
  * Enable Controller `Backup <controller_backup.html>`__.
  * Existing controller must have at least AMI ID aviatrix_cloud_services_gateway_043018_BYOL-xxxxxx. If you are on an older AMI ID, please refer here to migrate to the latest controller AMI ID first.

* Controller's VPC should have one or more public subnets, preferrably in different AZs for HA across multiple AZ.

* S3 bucket for backups


Steps to Enable Controller HA
-----------------------------

Create IAM User
###############

This procedure relies on an existing IAM user that has access to the S3 bucket where your backups reside.

.. tip::
   Aviatrix recommends a new user that is granted access to the backup S3 bucket only.

Be sure to select **Programmatic access** for **Access type** when creating the user.  Save the **Access key ID** and **Secret access key** for later use.

Launch CloudFormation Stack
###########################

#. Login to the AWS console and switch to the region where your existing AVX Controller is installed.
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
   | Enter AWS Access Key with     | Access key ID for the IAM user above     |
   | permission to access S3       |                                          |
   | bucket.                       |                                          |
   +-------------------------------+------------------------------------------+
   | Enter AWS Secret Key with     | Secret access key for the IAM user       |
   | permission to access S3       |                                          |
   | bucket.                       |                                          |
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
   * An SNS topic with same name as of existing controller instance
   * An email subscription to the SNS topic (optional)
   * A Lambda function for setting up HA and restoring configuration automatically
   * An AWS Role for Lambda and corresponding role policy with required permissions

.. tip::
   Additional instructions and code are available `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/>`__.
     
Steps to Disable Controller HA
------------------------------

You can disable Controller HA by deleting the Controller HA CloudFormation stack. 

Login to AWS Console, go to CloudFormation Service, identify the CloudFormation stack you used to enable Controller HA and delete the stack. 

.. disqus::
