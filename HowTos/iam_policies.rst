.. meta::
  :description: How to update the Aviatrix AWS IAM policies
  :keywords: account, aviatrix, AWS IAM role, IAM policies


=================================
AWS IAM Policies
=================================

Aviatrix Controller in AWS is launched by `a CloudFormation script  <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. 
During the launch time, two IAM roles are created, aviatrix-role-ec2 and aviatrix-role-app. Two associated IAM policies are also created, `aviatrix-assume-role-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`_ and `aviatrix-app-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_.

Updating IAM Policies
---------------------

These two roles and its associated policies allow the Controller to use AWS APIs to launch gateway instances, 
create new route entries and build networks. 

As more features are added by Aviatrix with each release, the IAM Access Policy may need to be updated to allow the Controller to launch new services. 

.. note::
   Please note that both the Aviatrix Controllers and the Aviatrix Gateways need access to the IAM policies. Please ensure that IAM policies are consistent across all AWS accounts that the Controllers and Gateways are located in.

To update by replacing the current one with the latest default policy, follow these steps for each AWS account that is linked in your Controller.  Start with your `primary account <onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`__ and then on to each `secondary account <aviatrix_account.html#setup-additional-access-account-for-aws-cloud>`__.

Steps
^^^^^

#. Login to the account on the AWS Console
#. At Services, go to **IAM**
#. Click **Policies**
#. Search for **aviatrix-app-policy**
#. Click into the **aviatrix-app-policy**
#. Click **Edit policy**
#. Click **JSON**
#. Replace the entire text by the latest policy in `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__
#. Click **Review policy** to make sure there is no syntax error. 
#. Click **Save changes** to apply the new aviatrix-app-policy.


.. disqus::
