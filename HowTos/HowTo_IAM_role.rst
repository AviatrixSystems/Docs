.. meta::
   :description: How to Set Up IAM Role for Aviatrix
   :keywords: IAM, IAM role, IAM role Aviatrix

###################################
IAM Role
###################################

With the support of AWS IAM role, there is no need to enter AWS access
key and secret key when creating a cloud account on Aviatrix controller.
Instead, two IAM roles will be created. Aviatrix controller will use the
dynamically obtained security credentials to request access to AWS
resources. Role-based IAM cloud account helps to reduce the risk of AWS
credentials being compromised.

This document provides instructions to create the IAM roles and policies. If you like to customize the conditions of the policies published by Aviatrix, consult `this link. <http://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_

.. important::
   Make sure you read the `cross account section <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#setup-iam-policies-and-roles-for-a-cross-account>`_ if the AWS account on which the Aviatrix Controller is deployed is different from the AWS account on which Aviatrix gateway instance is launched. 

To use IAM role, the Aviatrix Controller you launch must have IAM role
enabled.

Aviatrix Controller Launched from CloudFormation 
==========================================================

If the Aviatrix Controller is launched from `our CloudFormation template  <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#launch-the-controller-with-cloudformation-template>`_, both IAM roles "aviatrix-role-app" and "aviatrix-role-ec2" and their associated policies are created 
for the AWS account that launches the Controller instance after the CloudFormation stack creation completes.

If you create an Aviatrix cloud account with these credentials, you can start to launch Aviatrix gateways
 and create connectivity with this account. 

The following section provides instructions on how to setup an IAM roles and policies for a different 
AWS account and establish trust relationship with the initial Controller account 
such that the Controller can launch Aviatrix gateways on behalf on this different account. 


Setup IAM policies and roles manually on the Controller AWS account
====================================================================

If you plan to launch the Aviatrix Controller manually
with IAM roles from AWS marketplace portal, proceed to complete the following steps.

Before you launch an Aviatrix Controller from AWS marketplace, create
the two necessary IAM roles and its corresponding policies.

Step 1. Create two IAM custom policies
--------------------------------------

1.1 Create “aviatrix-assume-role-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Log in in to AWS console with your own account.

-  Go to Services -> IAM -> Policies -> Create Policy -> Create Your Own
   Policy

-  Enter the policy name, **aviatrix-assume-role-policy** , copy and
   paste the policy text from `this
   link <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`__.

-  Click Valid Policy to validate the policy.

-  Click Create Policy button.

1.2 Create “aviatrix-app-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  Log in to AWS console with your own account.

-  Go to Services -> IAM -> Policies -> Create Policy -> Create Your Own
   Policy

-  Enter the policy name, **aviatrix-app-policy** , copy and paste the
   policy provided by `this
   link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__
   into “Policy Document” section. In this example, the policy name is
   “aviatrix-app-policy”, as shown below.

-  Click Create Policy button.

Step 2. Create Two IAM Roles
----------------------------

2.1 Create “aviatrix-role-ec2” role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This role will be associated with the Aviatrix Controller. The role name
MUST be exactly “\ **aviatrix-role-ec2**\ ”.

-  Go to AWS console -> IAM service -> Roles -> Create role

|image3|

- Select AWS Service -> EC2 -> EC2 -> Next: Permissions

|image4|

- Search Policy **aviatrix-assume-role-policy**, then select this policy. Click "Next Review"

|image5|

-  Enter Role name **aviatrix-role-ec2** (must be exact) then click [Create]

-  Search/Check the role. You should see something
   like this for Role ARN:
   arn:aws:iam::575xxxxxx729:role/aviatrix-role-ec2

|image0|

-  Make a note of the above Role ARN string, it will be used for setup
   Aviatrix Cloud Account later



2.2 Create "aviatrix-role-app" role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This role is to be assumed by a granted AWS account. The Aviatrix
controller acquires the “assume role” capability authorized by its
“aviatrix-role-ec2” role. It then assumes to this service role that is
granted by its own AWS account or other AWS accounts to perform AWS
APIs.

-  Go to AWS console -> IAM service -> Roles -> Create Role

- Select "Another AWS account", and enter your AWS account ID, then Click [Next:Permissions]

|image6|

-  Select **aviatrix-app-policy** IAM policy, then click [Next: Review]

-  Enter a Role Name, in this case **aviatrix-role-app** . Click “Create role”

-  You should see something like this for Role ARN:
   arn:aws:iam::575xxxxxx729:role/aviatrix-role-app

-  Make a note of the above Role ARN string, it will be used to setup
   Aviatrix Cloud Account later.

    |image1|

Setup IAM policies and roles for a cross account
========================================================

Aviatrix supports multiple AWS accounts. To launch a gateway on an
AWS account that is different from the AWS account where the Controller is launched, 
you must create the same IAM policies and roles
listed above for this gateway account. In addition, follow the steps below to establish 
trust relationship between the two AWS accounts. 

.. Note::

 The primary AWS account is where the Controller is launched. 

..

**Instructions:**

From the non-primary AWS account

1. Create the IAM policies and roles listed above (`Setup IAM policies and roles for your own account <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#setup-iam-policies-and-roles-for-your-own-account>`_).

   a. Remember to note the ARN identifiers for both roles.

2. Grant the primary (Controller) AWS account access to the aviatrix-role-app in the
   non-primary account

   a. AWS console -> IAM service -> Roles > aviatrix-role-app

   b. Click Trust Relationships > Edit Trust Relationship

   c. Edit the trust relationship as follow

      |image2|

   d. Click Update Trust Policy

3. Done

Repeat this procedure for each non-primary AWS account that will be
managed by Aviatrix.

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

.. add in the disqus tag

.. disqus::
