.. meta::
   :description: Aviatrix FlightPath Deployment Guide
   :keywords: Aviatrix, Flightpath, Deployment, Guide, start, how to
   

###########################################################################
Aviatrix FlightPath – Deployment Guide
###########################################################################

The Aviatrix cloud network solution consists of two components, Controller and Gateway, both are AWS instances. Aviatrix Flight PathTool only requires the Aviatrix Controller to function. This guide helps you to launch the Aviatrix Controller instance in AWS.


|


Create an AWS EC2 Account
---------------------------------------------------------------------------

You need to have an AWS EC2 account to use the solution. Note that the Controller supports multiple accounts with each one associated with a different AWS IAM role or account, but there needs to be at least one to start with.

This AWS account can be a root account, IAM role, IAM administrator account or IAM user account with access privileges required by the Aviatrix solution.

We strongly recommend you to use IAM role for security reasons.


|


Subscribe to Aviatrix FlightPath Tool on AWS Marketplace
---------------------------------------------------------------------------

You must subscribe to the “Aviatrix Flightpath” AMI Free Tool - one of the Aviatrix AMIs on AWS marketplace prior to launch the Controller.

Search “Aviatrix Flight Path” on AWS marketplace, click on “Continue to Subscribe”, Choose “Manual Launch” Tab, and accept the terms and conditions to use the software. After subscription, follow the instructions in the next sections to launch the Controller.


|


DNS Server Connectivity Check
---------------------------------------------------------------------------

If the VPC where the Controller is deployed in has a custom DNS server (via DHCP option), make sure the Controller instance can reach this DNS server.


.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on AWS console, the Controller’s view of resources will be incorrect which will lead to features not working properly.

..


|


Launch Aviatrix Controller
---------------------------------------------------------------------------

Controller must be launched on a public subnet of a VPC.


The recommended way to launch the Controller is by our CloudFormation script. Follow the instruction `here <https://github.com/AviatrixSystems/AWSQuickStart>`__ to launch a controller instance in a selected region.

To launch the controller manually, follow `this document <http://docs.aviatrix.com/StartUpGuides/aws_manual_startup_guide.html>`__.


|


Access the Controller
---------------------------------------------------------------------------

After the Controller instance is in running state in AWS, you can access the Controller via a browser by *https://Controller_public_EIP*, where **Controller_public_EIP** is the Elastic IP address of the Controller.

The initial password is the private IP address of the instance.

Follow the steps to go through an initial setup phase to download the latest software. After the latest software is downloaded, re-login again to go through the onboarding process.


|


Onboarding
---------------------------------------------------------------------------

The purpose of onboarding is to help you setup an account on Aviatrix Controller that corresponds to an IAM role with policies so that the Controller can launch gateways and build networks using AWS APIs.

If you launched the Controller via CloudFormation script, the required IAM roles and policies are already setup, follow `this instruction <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#aviatrix-controller-launched-from-cloudformation>`__ to complete account creation.

Note you can create a single Aviatrix account that corresponds to AWS, account credentials. 


|


Setup for Operations
---------------------------------------------------------------------------

If this Controller is for your production, we strongly recommend you to enable Controller `Backup/Restore feature. <http://docs.aviatrix.com/HowTos/controller_backup.html>`__ This allows you to backup configurations on the Controller to an S3 bucket so that you can recover the configurations in a disaster situation.


|


Controller Monitoring
---------------------------------------------------------------------------

If Controller HA is not enabled, we recommend you to use AWS CloudWatch to configure alarms and actions to reboot the controller when it fails Status Check.


|


How to Use FlightPath for Connectivity Troubleshooting
---------------------------------------------------------------------------

**FlightPath** is a troubleshooting tool. It retrieves and displays, in a side by side fashion, AWS EC2 related information such as Security Groups, Route table and route table entries and network ACL. This helps you to identify connectivity problems.


|


What you need
---------------------------------------------------------------------------

You do not need to launch Aviatrix gateways to use this tool, but you need to create Aviatrix accounts so that the Controller can use the account credential to execute AWS APIs to retrieve relevant information.

`How to use it <http://docs.aviatrix.com/HowTos/flightpath.html>`__

For support, send email to support@aviatrix.com. Enjoy!





