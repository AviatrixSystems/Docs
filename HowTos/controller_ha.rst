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

Aviatrix Controller HA in AWS leverages an auto scaling group and a Lambda function to perform monitoring the health of the current Controller, 
launching a new controller and restoring the configuration when the active controller instance become unreachable.

When a new controller is launched, the existing controller is terminated, its EIP is associated to the newly launched controller, and the private IP is created in the new controller subnet.  Existing configuration is restored, resulting in a seamless experience when failover happens.

Prerequisites
-------------

* Existing AVX Controller.  If you have not yet launched an AVX Controller, please follow `this guide </StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__.

  * The Aviatrix version must be **>= 3.4**.  If older than 3.4, please `upgrade <inline_upgrade.html#how-to-upgrade-software>`__.
  * Enable Controller `Backup <controller_backup.html>`__.
  * AMI **aviatrix_cloud_services_gateway_043018_YYYY-xxxxxx** or later. If you are on an older AMI, please refer `here <Migration_From_Marketplace.html>`__ to migrate to the latest controller AMI first.

* The Controller's VPC should have one or more public subnets, preferably in different AZs for HA across multiple AZ.

* To use Controller HA with an ELB, refer to `here <https://docs.aviatrix.com/HowTos/controller_ssl_using_elb.html>`_

* Controller has enabled backup function. 

Controller HA Details
---------------------

Aviatrix Controller HA operates by relying on an AWS Auto Scaling Group.  This ASG has a desired capacity of 1 (and minimum capacity = 0 and maximum capacity = 1).  If the Controller EC2 instance is stopped or terminated, it will be automatically re-deployed by the ASG.

An AWS Lambda script is notified via SNS when new instances are launched by the Auto Scaling Group.  This script handles configuration using a recent Controller backup file.  The Aviatrix Controller manages these backups once `enabled <controller_backup.html>`__.

Restoring the Aviatrix Controller from a newly built instance requires access to the S3 bucket to retrieve the latest backup file.  In order to do this, the newly built EC2 Controller instance must be granted permission to read files in the bucket.  The simplest method of doing this is via an `IAM user with programmatic access to the S3 bucket <#create-iam-user>`__.

The lambda script also requires access to the S3 bucket. It is recommended that the backup bucket is used in the same account that was used to launch the controller.

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
   | Enter one or more subnets in  | Select a PUBLIC subnet of the controller |
   | different Availability zones  | VPC. Optionally one additional subnet for|
   | within that VPC.              | redundancy.                              |
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
   
   * An Autoscaling group of size 1 (minimum capacity=0, maximum capacity=1, desired capacity=1) and associated security group
   * A SNS topic with same name as of existing controller instance
   * An email subscription to the SNS topic (optional)
   * A Lambda function for setting up HA and restoring configuration automatically
   * An AWS Role for Lambda and corresponding role policy with required permissions

.. note::
   Please note that if you change the Controller name or change the backup destination bucket on S3, your Controller HA will not work as expected. You would have to delete the Controller HA CloudFormation Stack and redeploy it.


.. tip::
   Additional instructions and code are available `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/>`__.
   
 .. note::
   During spinning up the HA after the current active controller stops or being terminated by accident, you won't see a new controller for a few minutes on AWS console, it is expected.
     
Steps to Disable Controller HA
------------------------------

You can disable Controller HA by deleting the Controller HA CloudFormation stack. 

  * Please take a backup from the Controller first - Controller/Settings/Maintenance/Backup&Restore/BackupNow. Please check in your S3 bucket to make sure that there is new backup files were generated and saved
  * Check the ASG capacity first, it should be minimum capacity=0, maximum capacity=1, desired capacity=1. If these are changed, deleting the Controller HA Cloudformation stack could have an impact on your current Controller
  * Log in to AWS Console, go to CloudFormation Service, identify the CloudFormation stack you used to enable Controller HA and delete the stack
  * **Please be careful,** and delete the cloudformation stack associated with the controller HA - and do not delete your controller launch cloudformation stack


FAQ
---
* How can I know which version of HA script I am running?
   
	versions.py file found in the AWS Lambda function with the name <controller_name>-ha would show the information. You can also see the version in the cloudwatch logs. Only versions from 1.5 and above are visible.
   
* How can I get notification for H/A events?
   
	Enter an email address to receive notifications for autoscaling group events while launching the CFT. You would receive an email to subscribe to SNS. Click on the link from the email to accept SNS event notifications   

* My H/A event failed. What can I do?
   
	You can manually restore the saved backup to a newly launched controller. Please ensure controller H/A is disabled and re-enabled by deleting and re-creating the CFT stack to ensure that lambda is pointing to the right backup
 
* How do I ensure that lambda is pointing to the right backup?
   
	In the AWS Lambda, verify if the INST_ID environment variable is updated correctly to the current controller instance ID and the PRIV_IP environment variable is updated to the current controller private IP.
   
* Where do I find logs related to controller H/A ?
   
	All logs related to H/A can be found in AWS Cloudwatch under the log group <controller_name>-ha
   
* How do I make lambda talk to the controller privately within the VPC?
    
	Launch CFT with Private access set to True. Attach lambda to the VPC from the AWS console. Ensure that the VPC that you have attached the lambda to has internet access via NAT gateway or VPC endpoints. You can also ensure that lambda has internet access by attaching an EIP(Elastic IP) to the lambda ENI(Network Interface). Please ensure that everything is reverted before you destroy the stack. Otherwise the lambda will not have internet access to respond to the CFT(CFT may get stuck on destroy). Please note that it takes around 15 minutes for lambda to get attached to the VPC and to be able to talk to the controller. Please wait for this duration of 15 minutes, after the VPC attachment, before attempting to test the HA script.

* Can two controllers in two different regions be linked such that they can detect if one or the other is down? Is this possible?
	Our Controller HA script leverages EC2 auto scaling. EC2 auto scaling doesn’t support cross regions but it does support cross AZs. The script will automatically bring up a new Controller in case the existing Controller enters an unhealthy state.

* Could a controller in a different region be used to restore a saved configuration in case of disaster recovery? Will the change in controller’s IP cause any issues?
	A controller can be manually launched from a different region and the backed up configuration can be restored on it. The controller’s new EIP shouldn’t cause any issue unless SAML VPN authentication is being used. (All peering tunnels will still work). In that case, SAML VPN client will need reach the controller IP address. If FQDN hostname is used for the controller for SAML, then it should work after changing the Route 53 to resolve to the correct EIP in the different region.

* How do I manage the controller HA stack if the controller instance's disk is encrypted?
	If EBS Encryption using Customer managed key is enabled, the Autoscaling Group created may not have permissions to launch the instance. You will need to allow the service-linked role created for the Autoscaling group to have permissions to use this key for the cryptographic operation. To do so, go to AWS KMS->Customer managed keys->select the key and add the "AWSServiceRoleForAutoScaling" role to the list of Key Users.

* What do I need to do after I change the controller name?
	Please delete the CFT stack and then create a new CFT stack using the new controller name.

Changelog
---------
The changes from various releases can be viewed from `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/releases>`_



.. disqus::
