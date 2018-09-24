.. meta::
  :description: Aviatrix AWS aviatrix-role-app policies
  :keywords: account, aviatrix, AWS IAM role, IAM policies


=================================
AWS IAM Policies
=================================

Aviatrix Controller in AWS is launched by `a CloudFormation script  <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. 
During the launch time, two IAM roles are created, aviatrix-role-ec2 and aviatrix-role-app. Two associated IAM policies are also created, `aviatrix-assume-role-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`_ and `aviatrix-app-policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_.

Update IAM Policies
--------------------

These two roles and its associated policies allow the Controller to use AWS APIs to launch gateway instances, 
create new route entries and build networks. 

As more features are added by Aviatrix Controller for each release, the IAM Access Policy may need to be updated to allow the Controller to launch new services. 

To update by replacing the current one with the latest default policy, follow these steps:

1. Update Primary Account IAM Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you enable AWS GuardDuty <https://docs.aviatrix.com/HowTos/guardduty.html>`_, the Controller's IAM policy needs to be updated. 

 a. login to your `Primary Account <https://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`_ on AWS Console (typically this is the account you launch your Controller), 
 #. At Services, go to IAM 
 #. Click Policies
 #. Search for "aviatrix-app-policy"
 #. Click into the "aviatrix-app-policy"
 #. Click "Edit policy"
 #. Click JSON
 #. Replace the entire text by the latest policy in `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_
 #. Click "Review policy" to make sure there is no syntax error. 
 #. Click "Save changes" to apply the new aviatrix-app-policy.

2. Update Secondary Account IAM Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Currently there is no need to update `Secondary Access Account <https://docs.aviatrix.com/HowTos/aviatrix_account.html#setup-additional-access-account-for-aws-cloud>`_ IAM policies. 






.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%


.. disqus::
