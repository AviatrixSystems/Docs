.. meta::
  :description: How to audit and update the Aviatrix AWS IAM policies
  :keywords: account, aviatrix, AWS IAM role, IAM policies, update


=================================
AWS IAM Policies
=================================

The Aviatrix Controller in AWS is launched by `a CloudFormation script  <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. 
During the launch time, two IAM roles are created, aviatrix-role-ec2 and aviatrix-role-app. Two associated IAM policies are also created, `aviatrix-assume-role-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`_ and `aviatrix-app-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_.

Occasionally, you may need to update your AWS IAM policies to make sure you are using the most current version. This document shows you, an Aviatrix user with at least one AWS account, how to:
* Audit and update your AWS IAM policies in the Aviatrix Controller.
* Update your AWS IAM policies in your AWS Account.

Auditing and Updating AWS IAM Policies in the Aviatrix Controller
--------------------------------------

To audit and, if needed, update your AWS IAM policies in your Aviatrix Controller, log in to the Aviatrix Controller.
#. On the left, click **Accounts** > **Access Accounts**.
#. Select an AWS account and click **Audit** near to the top of the page. If this account needs an update, text under Account Audit at the top of the page reads "[Account Name] is not using the latest IAM policy."
#. If the account is not using the latest IAM policy, click **Update Policy**. The latest IAM policy will be updated for this account.
#. Repeat this step for all other AWS accounts.

Updating AWS IAM Policies in your AWS Account
---------------------

.. note::
   Please note that both the Aviatrix Controllers and the Aviatrix Gateways need access to the IAM policies.

.. note::
   Please ensure that IAM policies are consistent across all AWS accounts that the Controllers and Gateways are located in.

Updating the IAM policies with the latest one is done by replacing them. Follow these steps to update IAM policies **for each AWS account** that you set up in the Controller.  Start with your `primary account <onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`__ (the account you set up during onboarding) and then on to each `secondary account <aviatrix_account.html#setup-additional-access-account-for-aws-cloud>`_ if there is any.

Steps
^^^^^

#. Log in to your account on the AWS Console.
#. At Services, go to **IAM**.
#. Click **Policies**.
#. Search for **aviatrix-app-policy**.
#. Click **aviatrix-app-policy**.
#. Click **Edit policy**.
#. Click **JSON**.
#. Replace the entire text by the latest policy in `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__
#. Click **Review policy** to make sure there is no syntax error. 
#. Click **Save changes** to apply the new aviatrix-app-policy. It may take a few minutes for the policy to take effect.

.. disqus::
