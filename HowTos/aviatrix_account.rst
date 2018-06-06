.. meta::
  :description: Explain what Aviatrix account is
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Access Account
=================================

Aviatrix Controller is a multi cloud and multi accounts platform. The Controller uses your cloud provider API credentials to 
make APIs calls, for example, to launch an Aviatrix gateway instance, on behalf of your cloud accounts. 

One cloud credential is represented as an Aviatrix access account on the Controller. The Controller supports 
multiple Aviatrix accounts. One Aviatrix account may represent multiple cloud credentials, one from
each cloud. For example, an Aviatrix account name DevOps can have an IAM role for AWS, Azure ARM credential and GCP credential.


Starting from release 3.2, access account for AWS only consists of the 12 digit account ID. 

For Azure, the account information consists of `Azure ARM credentials. <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_

For GCP (Google Cloud), the account information consists of `GCP credentials. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

For AWS China, please refer `Account with Access Key <http://docs.aviatrix.com/HowTos/accesskey.html>`_

The Aviatrix account structure is shown in the diagram below, where admin is the
default user for the primary access account. 

|account_structure|

To add more admin users, refer to `this doc. <http://docs.aviatrix.com/HowTos/AdminUsers_DuoAuth.html>`_

Setup primary access account for AWS cloud
----------------------------------------------------

For AWS, a `primary access account <http://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`_ is created during onboarding process. Using this account credential, 
the Controller can launch gateways and build connectivity on VPCs that belong to this AWS account. 

Setup additional access account for AWS cloud
------------------------------------------------------

After you go through the onboarding process and create the primary access account, 
you can create additional or secondary Aviatrix access accounts on the Controller. This will allow you 
to launch gateways and build connectivity across different AWS accounts.  

To configure, 


 1. Go to Aviatrix -> Accounts -> Access Accounts -> +New Account, to create this new secondary account.
 #. Enter a unique account name. For example, marketingOps
 #. Check `AWS`.
 #. Check `IAM role-based`.
 #. Follow `Readme first <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_ to run a CloudFormation script that setups IAM roles, policies and establish a trust relationship with the primary account. When finished, return to this page and proceed to the next step. 
 #. Enter the secondary account's `AWS 12 digit account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_.
 #. Click `OK`.
 #. The new secondary account should be created.
 #. Now you can create connectivity between two VPCs in different AWS accounts.


.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%


.. disqus::
