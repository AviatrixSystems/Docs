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

Aviatrix software release prior to 3.2, in addition to cloud provider API credentials, an access account also contains email and login information to allow the access account to login to the Controller. 

Starting from release 3.2, access account for AWS only consists of the 12 digit account ID. 

For Azure, the account information consists of `Azure ARM credentials. <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_

For GCP (Google Cloud), the account information consists of `GCP credentials. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

Setup primary access account for AWS cloud
----------------------------------------------------

For AWS, a `primary access account <http://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`_ is created during onboarding process. Using this account credential, 
the Controller can launch gateways and build connectivity on VPCs that belong to this AWS account. 

Setup additional access account for AWS cloud
------------------------------------------------------

After you go through the onboarding process and create the primary access account, 
you can create additional or secondary Aviatrix access accounts on the Controller. This will allow you 
to launch gateways and build connectivity across different AWS accounts.  

To configure, click Accounts at the navigation bar on the left side of the Controller web console. 

Before you setup new account on the Controller, follow the `instructions here <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_ to create IAM roles, policies and establish trust relationship first. 

1. Go to Aviatrix -> Accounts -> Cloud Accounts -> New Account, to create this new secondary account.
#. Enter a unique account name. For example, marketingOps
#. Check `AWS`.
#. Enter the secondary account's `AWS account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_.
#. Check `IAM role-based`.
#. Follow `the instructions <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_ to setup IAM roles, policies and establish a trust relationship with the primary account. 
#. Aviatrix-role-app ARN field should be auto filled.
#. Aviatrix-role-ec2 ARN field should be auto filled.
#. Click `OK`.
#. The new secondary account should be created.
#. Now you can create connectivity between two VPCs in different AWS accounts.

.. |image0| image:: uservpn_media/AviatrixCloudVPN.png
   :width: 5.55625in
   :height: 3.26548in


.. disqus::
