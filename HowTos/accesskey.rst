.. meta::
  :description: How to setup access key and secret key
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=====================================
Account with Access Key
=====================================

This document describes how to setup Aviatrix access account by using IAM user access key and secret id, instead of IAM roles. 

This approach is applicable to AWS China as Aviatrix does not support IAM role yet. 

Step 1. Create IAM Policy
----------------------------

Login to AWS console, click IAM, click Policies, click Create Policy, click JSON. Delete the example JSON text. 

Copy and paste `the Aviatrix AWS policy <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_ to create a new IAM policy, as shown below. Give policy a name, aviatrix-role-app. 

|create-policy|

Step 2. Create an IAM User
----------------------------

Login to AWS Console, click IAM, click Users, click Add user to create a new IAM user and allow programmable access, as shown below. 

|add-iam-user|

Step 3. Attach Policy to User
--------------------------------

Next you need to attach the created policy to this IAM user, as shown below. 

|attach-policy|

Step 4. Setup Access Key and Secret Access Key
-------------------------------------------------

Finally create a access key and secret key to be used by Aviatrix access account for this IAM user.  

|accesskey|


.. |add-iam-user| image:: accesskey_media/add-iam-user.jpg
   :scale: 50%

.. |create-policy| image:: accesskey_media/create-policy.png
   :scale: 50%

.. |attach-policy| image:: accesskey_media/attach-policy.png
   :scale: 50%

.. |accesskey| image:: accesskey_media/accesskey.png
   :scale: 50%

.. disqus::
