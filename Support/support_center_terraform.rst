.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Terraform
===========================================================================

What are the requirements to use Terraform with Aviatrix Systems?
----------------------------------------------------------------------

.. note::
  Aviatrix is now an official Terraform provider! The Terraform setup procedure has been significantly simplified and the documentation below has been updated accordingly. Customers who have previously set up our provider following our previous instructions may transition to our official provider by following Step 5 in the setup tutorial `here <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_

We are constantly improving and enhancing our Terraform support, so we request that you to stay with the latest Aviatrix software and use the corresponding Terraform Aviatrix Provider from our Github repository. Please update the provider resource as we are frequently updating it.

Please note the below requirements for the Aviatrix Terraform Provider:

* **Terraform 0.11.x / 0.12.x**
* **Go 1.11+** (no longer required if using our official provider)


Which branch of Terraform Aviatrix Provider Resource should I use?
----------------------------------------------------------------------

Our `Github repository <https://github.com/terraform-providers/terraform-provider-aviatrix>`_ for the Terraform Aviatrix Provider has multiple branches. Please make sure that you pick the branch that matches with the version of the software release on your Aviatrix Controller. The latest release is supported with the master branch. Here is the supported list:

  * Aviatrix Controller Release 3.5: Use the `Github UserConnect-3.5 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-3.5>`_
  * Aviatrix Controller Release 4.0: Use the `Github UserConnect-4.0 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.0>`_
  * Aviatrix Controller Release 4.1: Use the `Github UserConnect-4.1 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.1>`_
  * Aviatrix Controller Release 4.2: Use the `Github UserConnect-4.2 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.2>`_
  * Aviatrix Controller Release 4.3: Use the `Github UserConnect-4.3 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.3>`_
  * Aviatrix Controller Release 4.6: Use the `Github UserConnect-4.6 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.6>`_


Please note that for Aviatrix Controller 4.7 and onward, we support Terraform v0.12, which is not backwards-compatible with v0.11 and below.
Please see Hashicorp's blog `here <https://www.hashicorp.com/blog/announcing-terraform-0-12>`_ for more information.

However, we continue to offer support for Terraform v0.11 with our Controller 4.7.

  * For Aviatrix Controller Release 4.7, Terraform v0.11: Use the `Github UserConnect-4.7-TF.11 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.7-TF.11>`_
  * For Aviatrix Controller Release 4.7, Terraform v0.12: Use the `Github UserConnect-4.7-TF.12-v1 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.7-TF.12-v1>`_

In addition to the Terraform v0.12 support, we have also had major restructuring to our code, such as attribute renaming, resource renaming and values etc, and have made a release (**R2.0**) for this version of our provider in the branch listed below:

  * `Github UserConnect-4.7-TF.12-v2 branch <https://github.com/terraform-providers/terraform-provider-aviatrix/tree/UserConnect-4.7-TF.12-v2>`_


* For information from Hashicorp on how to upgrade to Terraform v0.12, please see `here <https://www.terraform.io/upgrade-guides/0-12.html>`_
* For full instructions on how to upgrade to Controller 4.7, Terraform v0.12, Aviatrix Terraform Provider R2.0 (v2), please see the `R2.0 upgrade guide <https://www.terraform.io/docs/providers/aviatrix/guides/v2-upgrade-guide.html>`_
* Any updates for R1.x that might impact customers are documented in the `Feature Changelist <https://www.terraform.io/docs/providers/aviatrix/guides/feature-changelist.html>`_
* Any updates/ future releases for R2.0+ that might impact customers will be documented in the `Feature Changelist v2 <https://www.terraform.io/docs/providers/aviatrix/guides/feature-changelist-v2.html>`_


If you were using the master branch in the past, please move to the right release based branch as listed above to avoid incompatibility issues.

.. note::
  As of Aviatrix Controller Release 5.0, our Aviatrix Terraform provider is now officially recognized by Hashicorp. Customers may now simply source our provider within the "providers" block, wherever specified in the customer's Terraform environment, by identifying the Release version. For full instructions on transitioning to our official provider, please see Step 5 in the setup tutorial `here <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_

::

  provider "aviatrix" {
      controller_ip = "1.2.3.4"
      username = "admin"
      password = "password"
      version = "2.2" # specify a Release version as shown on this line
  }

  ...

What if my Terraform scripts are timing out?
----------------------------------------------------------------------

If you run into timeout issues, please use the IP address of the controller instead of the hostname of the controller and let us know if that helps. Please open a ticket by sending an email to support@aviatrix.com

Terraform sends all the operations to the controller at the same time, so if you see any issues during large operations, try serializing the operations by setting the value for parallelism to 1. More information at https://www.terraform.io/docs/commands/apply.html#parallelism-n. Please do let us know if you run into this issue, by sending an email to support@aviatrix.com


How do I debug Terraform issues?
----------------------------------------------------------------------

If you run into issues with Terraform, please turn on debug logs by doing ``export TF_LOG=TRACE`` on your Terminal and then running your Terraform scripts again. Please share the output with our support team at support@aviatrix.com. Please also take a look at the `official terraform debug instructions <https://www.terraform.io/docs/internals/debugging.html>`_.


How can I launch a new Aviatrix Controller with Terraform?
----------------------------------------------------------------------

Launching a new controller typically involves multiple steps as described `here <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. We do support setting up, launching and initializing an `Aviatrix Controller from Terraform <https://github.com/AviatrixSystems/terraform-modules>`_. Here are the steps involved:

 * `Setup IAM roles and policies <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-iam-roles>`_
 * `Launch a Controller from AMI <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-build>`_
 * `Initialize the Aviatrix Controller <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-initialize>`_


How can I create my IAM roles and policies in AWS using Terraform?
---------------------------------------------------------------------

You can use our Terraform `IAM roles module <https://github.com/AviatrixSystems/terraform-modules/tree/master/aviatrix-controller-iam-roles>`_ to create the Aviatrix IAM roles required to connect your Aviatrix Controller to an existing AWS account. This should be run in the account where you are installing the Controller and any additional accounts that will be connected to the Controller.

This performs a similar role as the CloudFormation script does in "Controller UI > Accounts > Access Accounts > New Account > Select AWS > Select IAM-role-based > Launch CloudFormation Script" - it does not create the account, but rather creates the IAM roles/profiles like this CloudFormation script. This is similar to what is mentioned `here <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_.


Which version of Terraform Aviatrix Provider should I use?
-------------------------------------------------------------

The terraform aviatrix provider resource version has to match with the controller version that you have deployed. Please look at `this link <https://www.terraform.io/docs/providers/aviatrix/guides/release-compatibility.html>`_ to find out which version to use. Then you can add "version = x.x.x" to specify the right vesion in the aviatrix provider resource as mentioned in the instructions `here <https://www.terraform.io/docs/providers/aviatrix/index.html>`_.


How can I avoid IAM role issues if I deploy using Terraform
-------------------------------------------------------------

AWS has a known issue about IAM instance profile as `documented here <https://docs.aviatrix.com/Support/support_center_aws_infrastructure.html#how-do-i-recover-if-my-instance-profile-arn-goes-missing-on-aviatrix-role-ec2>`_. If you are deploying your gateways through terraform, we strongly recommend that you create the aviatrix required roles and policies first, before deploying the gateways - you can do that by using the `"depends_on" argument in terraform <https://www.terraform.io/docs/language/meta-arguments/depends_on.html>`_.
