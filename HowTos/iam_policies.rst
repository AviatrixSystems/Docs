

=================================
AWS IAM Policies
=================================

The Aviatrix Controller in AWS is launched by `a CloudFormation script  <https://docs.aviatrix.com/documentation/latest/getting-started/getting-started-guide-aws.html>`_. 
During the launch time, two IAM roles are created, aviatrix-role-ec2 and aviatrix-role-app. Two associated IAM policies are also created, `aviatrix-assume-role-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`_ and `aviatrix-app-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_.

These two roles and their associated policies allow the Controller to use AWS APIs to launch gateway instances, 
create new route entries and build networks. As more features are added by Aviatrix with each release, the IAM Access Policy may need to be updated to allow the Controller to launch new services. 

This document shows you, an Aviatrix user, how to update your AWS IAM policies in the Aviatrix Controller and in AWS.

.. note::
   Please note that both the Aviatrix Controllers and the Aviatrix Gateways need access to the IAM policies.

.. note::
   Please ensure that IAM policies are consistent across all AWS accounts that the Controllers and Gateways are located in.

Auditing and Updating AWS IAM Policies in the Aviatrix Controller
-----------------------------------------------------------------------------------

To update your AWS IAM policies from your Aviatrix Controller, log in to the Controller. 

#. Select Accounts > Access Accounts from the lefthand menu. 
#. Select an AWS account and click **Audit** near to the top of the page. If this account needs an update, text under Account Audit at the top of the page reads "[Account Name] is not using the latest IAM policy."
#. If the account is not using the latest IAM policy, click **Update Policy**. The latest IAM policy will be updated for this account.

Updating IAM Policies in AWS
-----------------------------------------

This section describes how to update IAM policies from your AWS Console. 

In AWS, you can update IAM policies by replacing them. Follow these steps to update IAM policies **for each AWS account** that you set up in the Controller.  Start with your `primary account <onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`__ (the account you set up during onboarding) and then on to each `secondary account <aviatrix_account.html#setup-additional-access-account-for-aws-cloud>`_ if there is any.

#. Log in to your account on the AWS Console.
#. Click on the Services dropdown menu in the top left and select **IAM**.
#. Click **Policies** on the left.
#. On the Policies page, enter "aviatrix-app-policy" in the Search field. Click **aviatrix-app-policy** in the table.
#. On the Summary page for **aviatrix-app-policy**, click **Edit policy** at the top of the table.
#. On the Edit aviatrix-app-policy page, select the **JSON** tab.
#. Replace the entire text by the latest policy in `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__
#. Click **Review policy** to make sure there is no syntax error. 
#. Click **Save changes** to apply the new "aviatrix-app-policy."
#. It may take a few minutes for the policy to take effect. 



.. disqus::
