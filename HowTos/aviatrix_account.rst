.. meta::
  :description: Explain what Aviatrix account is
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Account
=================================

Aviatrix Controller is a multi cloud platform. The Controller uses your cloud API credentials to 
make APIs calls, for example, to launch an Aviatrix gateway instance, on behalf of your cloud credentials. 

One cloud credential is represented as an Aviatrix account on the Controller. The Controller supports 
multiple Aviatrix accounts. One Aviatrix account may represent multiple cloud credentials, one from
each cloud. For example, an Aviatrix account name DevOps can have an IAM role for AWS, Azure ARM credential and GCP credential.

For AWS, the account information consists of `IAM roles and policies. <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_

For Azure, the account information consists of `Azure ARM credentials. <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_

For GCP (Google Cloud), the account information consists of `GCP credentials. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

You can create an Aviatrix account during onboarding process. 

You can also create an Aviatrix account by clicking Accounts at the navigation bar on the left side of the Controller web console. 

.. |image0| image:: uservpn_media/AviatrixCloudVPN.png
   :width: 5.55625in
   :height: 3.26548in


.. disqus::
