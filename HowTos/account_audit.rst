.. meta::
  :description: Explain what Aviatrix account is
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Account Audit Info & Remedy
=================================

The Aviatrix Controller periodically checks the accounts it manages to make sure they are intact:

 1. If the Controller instance's IAM role aviatrix-role-ec2 has been deleted. 
 #. If the Controller instance's IAM role aviatrix-role-app has been deleted.

.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
