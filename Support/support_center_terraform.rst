.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Terraform
===========================================================================

What are the requirements to use Terraform with Aviatrix System?
----------------------------------------------------------------------

We are constantly improving and enhancing our Terraform support, so we request that you to stay with the latest Aviatrix software and use the corresponding Terraform Aviatrix Provider Resource from our Github repository. Please update the provider resource as we are frequently updating it. 

Please note the below requirements for the Aviatrix Terraform Provider:

* **Terraform 0.10.x / 0.11.x** (*0.12.x is incompatible*)
* **Go 1.11+**


Which branch of Terraform Aviatrix Provider Resource should I use?
----------------------------------------------------------------------

Our `Github repository <https://github.com/AviatrixSystems/terraform-provider-aviatrix>`_ for the Terraform Aviatrix Provider Resource has multiple branches. Please make sure that you pick the branch that matches with the version of the software release on your Aviatrix Controller. The latest release is supported with the master branch. Here is the supported list

  * Aviatrix Controller Release 3.5: Use the `Github UserConnect-3.5 branch <https://github.com/AviatrixSystems/terraform-provider-aviatrix/tree/UserConnect-3.5>`_
  * Aviatrix Controller Release 4.0: Use the `Github UserConnect-4.0 branch <https://github.com/AviatrixSystems/terraform-provider-aviatrix/tree/UserConnect-4.0>`_ 
  * Aviatrix Controller Release 4.1: Use the `Github UserConnect-4.1 branch <https://github.com/AviatrixSystems/terraform-provider-aviatrix/tree/UserConnect-4.1>`_ 
  * Aviatrix Controller Release 4.2: Use the `Github UserConnect-4.2 branch <https://github.com/AviatrixSystems/terraform-provider-aviatrix/tree/UserConnect-4.2>`_ 

If you were using the master branch in the past, please move to the right release based branch as listed above to avoid incompatibility issues. 

What if my Terraform scripts are timing out?
----------------------------------------------------------------------

If you run into timeout issues, please use the IP address of the controller instead of the hostname of the controller and let us know if that helps. Please open a ticket by sending an email to support@aviatrix.com

Terraform sends all the operations to the controller at the same time, so if you see any issues during large operations, try serializing the operations by setting the value for parallelism to 1. More information at  https://www.terraform.io/docs/commands/apply.html#parallelism-n. Please do let us know if you run into this issue, by sending an email to support@aviatrix.com


How do I debug Terraform issues?
----------------------------------------------------------------------

If you run into issues with Terraform, please turn on debug logs by doing ``export TF_LOG=TRACE`` on your terminal and then running your terraform scripts again. Please share the output with our support team at support@aviatrix.com


How can I launch a new Aviatrix Controller with Terraform?
----------------------------------------------------------------------
 
Launching a new controller typically involves multiple steps as described `here <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. We do support setting up, launching and initializing an `Aviatrix Controller from Terraform <https://github.com/AviatrixSystems/terraform-modules>`_. Here are the steps involved:

 * `Setup IAM roles and policies <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-iam-roles>`_
 * `Launch a Controller from AMI <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-build>`_
 * `Initialize the Aviatrix Controller <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-initialize>`_
 
 
How can I create my IAM roles and policies in AWS using Terraform?
---------------------------------------------------------------------

You can use our `terraform iam_roles module <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-iam-roles>`_ to create the Aviatrix IAM roles required to connect your Aviatrix Controller to an existing AWS account. This should be run in the account where you are installing the Controller and any additional accounts that will be connected to the Controller. This performs a similar role as the CloudFormation script does in "Controller UI > Accounts > Access Accounts > New Account > Select AWS > Select IAM-role-based > Launch CloudFormation Script" - it does not create the account, but rather creates the IAM roles/profiles like this CloudFormation script. Similar to what is mentioned `here <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_.


