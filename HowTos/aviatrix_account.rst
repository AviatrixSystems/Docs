.. meta::
  :description: Explain what Aviatrix account is
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Access Account
=================================

Aviatrix Controller is a multi cloud platform. The Controller uses your cloud provider API credentials to 
make APIs calls, for example, to launch an Aviatrix gateway instance, on behalf of your cloud accounts. 

One cloud credential is represented as an Aviatrix access account on the Controller. The Controller supports 
multiple Aviatrix accounts. One Aviatrix account may represent multiple cloud credentials, one from
each cloud. For example, an Aviatrix account name DevOps can have an IAM role for AWS, Azure ARM credential and GCP credential.

In addition to cloud provider API credentials, an access account also contains email and login information to allow the access account to login to the Controller. 

For AWS, the account information consists of `IAM roles and policies. <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_

For Azure, the account information consists of `Azure ARM credentials. <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_

For GCP (Google Cloud), the account information consists of `GCP credentials. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

You create an Aviatrix primary account during onboarding process. 

You create additional secondary Aviatrix access accounts by clicking Accounts at the navigation bar on the left side of the Controller web console. 

Setup A Secondary Access Account for AWS
-----------------------------------------

1. Go to Aviatrix -> Accounts -> Cloud Accounts -> New Account, to create this new secondary account.
#. Enter a unique account name. For example, marketingOps
#. Check `AWS`.
#. Enter the secondary account's `AWS account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_.
#. Check `IAM role-based`.
#. Aviatrix-role-app ARN field should be auto filled.
#. Aviatrix-role-ec2 ARN field should be auto filled.
#. Click `OK`.
#. The new secondary account should be created.
#. Now you can create connectivity between two VPCs in different AWS accounts.

.. |image0| image:: uservpn_media/AviatrixCloudVPN.png
   :width: 5.55625in
   :height: 3.26548in


.. disqus::
