Setup AWS Permissions
=============================================

Before launching the Aviatirx Unified Cloud Controller (UCC) in AWS, permissions must be created in AWS.  The Aviatrx UCC supports two types of AWS permissions: 

* AWS Access Key and Secret Key
* AWS IAM Roles

.. note::
    If you are using the Aviatirx Virtual Appliance (AVA), you must configure AWS access/secret key permissions.

The following sections explains how to configure both types of permissions.  

.. _Aviatrix app policy: https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt
.. _Aviatrix role policy: https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
.. _Create an AWS custom policy: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-using.html#create-managed-policy-console
.. _Create an AWS IAM user: http://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html#id_users_create_cliwpsapi

AWS Access/Secret Key
-----------------------
This section assumes that you are familiar with AWS IAM.  

 1. Copy the `Aviatrix app policy`_
 2. `Create an AWS custom policy`_ with the `Aviatrix app policy`_
 3. `Create an AWS IAM user`_ and attach the custom policy to the user
 4. Retrieve the Access and Secret key for the IAM user.

.. note::
   Save the access and secret key. This information will be needed after the Aviatrix UCC is deployed.


AWS IAM Role
-----------------------

In order to use AWS IAM role with the Aviatirx UCC, we must create two IAM polices and two roles.

Create two IAM custom policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 1. Create ``aviatrix-assume-role-policy``
  * From the AWS Console
  * Go to Services -> IAM -> Policies -> Create Policy -> Create Your Own Policy
  * Enter the policy name, ``aviatrix-assume-role-policy`` , copy and paste the policy text from `Aviatrix role policy`_
  * Click Valid Policy to validate the policy
  * Click Create Policy button

 2. Create ``aviatrix-app-policy``
  * From the AWS Console
  * Go to Services -> IAM -> Policies -> Create Policy -> Create Your Own Policy
  * Enter the policy name, ``aviatrix-app-policy``, copy and paste the policy text from `Aviatrix app policy`_
  * Click Valid Policy to validate the policy. 
  * Click Create Policy button.

Create two IAM Roles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 1. Create ``aviatrix-role-ec2``
  * Go to AWS console -> IAM service -> Roles -> Create New Role -> Set Role Name
  * Enter a Role Name ``aviatrix-role-ec2``. Click "Next Step".
  * Select "Amazon EC2"
  * Select the policy you created in the previous step, in this example, ``aviatrix-assume-role-policy``. Click "Next Step".
  * Review the Role, and click on "Create Role". You should see something like this for Role ARN: ``arn:aws:iam::575xxxxxx729:role/aviatrix-role-ec2``
  * Make a note of the above Role ARN string, it will be used for setup Aviatrix Cloud Account later.

 2. Create ``aviatrix-role-app``
  * Go to AWS console -> IAM service -> Roles -> Create New Role -> Set Role Name
  * Enter a Role Name, in this case aviatrix-role-app . Click "Next Step"
  * Select "Role for Cross-Account Access"
  * Select "Provide access between AWS accounts you own"
  * Enter "Account ID" (your own account ID) and then "Next Step".
  * Select the policy you created in the previous step, in this example, ``aviatrix-app-policy``. Click "Next Step"
  * Click on "Create Role".
  * You should see something like this for Role ARN: ``arn:aws:iam::575xxxxxx729:role/aviatrix-roleapp``
  * Make a note of the above Role ARN string, it will be used to setup Aviatrix Cloud Account later. 

.. note::
   The role names MUST be exactly as listed.


Setup Multi Accounts Permissions
----------------------------------

Aviatrix supports multiple AWS account. To launch a gateway for a different AWS account, you must create
the same IAM policies and roles listed above for the second account (or third, fourth, etc.). The only
difference is that the IAM role in the non-primary account must trust the primary account.

