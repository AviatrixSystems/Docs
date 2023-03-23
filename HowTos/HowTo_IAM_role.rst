.. meta::

#######################################
IAM Roles for Secondary Access Accounts
#######################################

When the Aviatrix Controller goes through the initial Onboarding process, the `primary access account <http://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`_ is created. 
Using the primary access account, the Controller can launch gateways and build connectivity in the VPCs that belong to this account. 

If the Controller needs to build connectivity in AWS accounts that are different from the Controller instance's AWS account, secondary access accounts need to be created. 

To create a secondary AWS access account on the Controller, you need to first create IAM roles, policies and establish a trust relationship to the primary AWS account. 

Follow the steps below to create IAM roles and policies for the AWS secondary access account. 

(If you like to customize the conditions of the policies published by Aviatrix, consult `this link. <http://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_)

Setting up by CloudFormation Template 
===========================================================================

This is the recommended approach. 

Follow `the instructions <https://docs.aviatrix.com/HowTos/aviatrix_account.html#setup-additional-access-account-for-aws-cloud>`_ to use this setup option. 

Setting up a Secondary Account IAM Manually
=========================================================================

**This is not a recommended approach as it takes a longer time and is error-prone.** 

Creating Two IAM Custom Policies
-----------------------------------------------

1. Create “aviatrix-assume-role-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Log in to the AWS management console with a secondary AWS account.
#. Go to Services > IAM > Policies > Create Policy > **Create Your Own Policy**.
#. Enter the policy name, **aviatrix-assume-role-policy** , and then copy and
   paste the policy text from `this
   link <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`__.
#. Click **Valid Policy** to validate the policy.
#. Click **Create Policy**.

2. Create “aviatrix-app-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Log in to the AWS console with your own account.
#. Go to Services > IAM > Policies > Create Policy > Create Your Own Policy.
#. Enter the policy name, **aviatrix-app-policy** , and then copy and paste the
   policy provided by `this
   link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__.
   into “Policy Document” section. In this example, the policy name is
   “aviatrix-app-policy”, as shown below.
#. Click **Create Policy**.

2. Creating Two IAM Roles
------------------------------------

Creating the “aviatrix-role-ec2” Role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The role name MUST be exactly “\ **aviatrix-role-ec2**\ ”.

1. Navigate to AWS console > IAM service > Roles > Create role.

|image3|

2. Select AWS Service > EC2 > EC2 > Next: Permissions.

|image4|

3. Search for the policy **aviatrix-assume-role-policy**, and then select this policy. Click **Next Review**.

|image5|

4. Enter the Role name **aviatrix-role-ec2** (the character match must be exact) then click **Create**.
5. Search/Check the role. You should see something
   like this for Role ARN:
   arn:aws:iam::575xxxxxx729:role/aviatrix-role-ec2

|image0|

7.  Make a note of the above Role ARN string, it will be used to set up the
   Aviatrix Cloud Account later.

Creating the "aviatrix-role-app" role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This role is to be assumed by a granted AWS account. The Aviatrix
Controller acquires the “assume role” capability authorized by its
“aviatrix-role-ec2” role. It then assumes to this service role that is
granted by its own AWS account or other AWS accounts to perform AWS
APIs.

1. Go to the AWS console > IAM service > Roles > Create Role.
2. Select **Another AWS account** and enter your AWS account ID, then Click **Next:Permissions**.

|image6|

3. Select the **aviatrix-app-policy** IAM policy, then click **Next: Review**.
4. Enter a Role Name, in this case **aviatrix-role-app**. Click **Create role**.

You should see something like this for Role ARN:
   **arn:aws:iam::575xxxxxx729:role/aviatrix-role-app**

5. Make a note of the Role ARN string above. It will be used to set up the Aviatrix access account later.

    |image1|

Establishing a Trust Relationship with Primary Account
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

   If you are using this manual process to setup primary access account (Controller's account), you do not need to establish a trust relationship. Skip this step. 

Grant the primary (Controller) AWS account access to the aviatrix-role-app in this secondary account:

1. Navigate to the AWS console > IAM service > Roles > aviatrix-role-app.
2. Click Trust Relationships > Edit Trust Relationship.
3. Edit the trust relationship as follows. Remember to enter both the primary account number and secondary account number.

      |image2|

4. Click **Update Trust Policy**.

Notes for the Custom IAM Role Name Feature:
=======================================

If the primary access account is using a custom EC2 IAM role name for the Controller, then any secondary IAM based access accounts must use an identical name for the EC2 IAM role.

The primary and secondary access accounts must use identical names under the following conditions:

* You are using custom IAM roles for the primary access account.
* You are NOT using custom gateway IAM roles on the secondary account.

Example:

The Controller is using 'custom-role-app' and 'custom-role-ec2' on a secondary access account. Custom role 'custom-role-ec2' also exists on the primary account because that is where the Controller is hosted.

When you launch a gateway under the secondary access account, the Controller takes the primary access account EC2 role name, in this case 'custom-role-ec2' and passes it to the API call to create the instance. The API call refers to a role on the secondary CSP account, not the role of the primary account. 

.. |image0| image:: IAM_media/image1.png
   :width: 6.50000in
   :height: 2.99931in
.. |image1| image:: IAM_media/image2.png
   :width: 6.50000in
   :height: 3.31806in
.. |image2| image:: IAM_media/image3.png
   :width: 4.67200in
   :height: 3.33379in
.. |image3| image:: IAM_media/img_create_assume_role_step_01.png
   :width: 4.67200in
   :height: 3.33379in
.. |image4| image:: IAM_media/img_create_assume_role_step_02_select_ec2_type_role.png
   :width: 4.67200in
   :height: 3.33379in
.. |image5| image:: IAM_media/img_create_assume_role_step_03_attach_assume_role_policy.png
   :width: 4.67200in
   :height: 3.33379in
.. |image6| image:: IAM_media/img_create_cross_account_role_step_01.png
   :width: 4.67200in
   :height: 3.33379in

.. |imageCFCreate| image:: IAM_media/cf_create.png

.. |imageCFSelectTemplate-S3| image:: IAM_media/imageCFSelectTemplate-S3.png

.. |imageCFEnableTermProtection| image:: IAM_media/cf_termination_protection.png

.. |imageCFCreateFinal| image:: IAM_media/cf_create_final.png

.. add in the disqus tag

.. disqus::
