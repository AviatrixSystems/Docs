.. meta::
  :description: Explain what Aviatrix account is
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Account Audit 
=================================

The Aviatrix Controller periodically checks the accounts it manages to make sure they are intact:

 1. The Controller instance's IAM role aviatrix-role-ec2 is attached to the instance. 
 #. The Controller instance's IAM role aviatrix-role-app exists.
 #. An access account IAM role aviatrix-role-ec2 exists.
 #. An access account IAM role aviatrix-role-app exists.
 #. An access account IAM role aviatrix-role-ec2 has associated policies.
 #. An access account IAM role aviatrix-role-app has associated policies.
 #. An access account has trust relationship to the primary account (the Controller's AWS account).
 #. An access account has expired, deleted or invalid credential.

If any of the above condition fails, the Controller sends out alert email and logs the event.  In addition, the controller will also send alert email on behalf of any of the above condition failures reported by a gateway upon the first detection and subsequently every 24 hours until the problem is rectified.

Note the event requires immediate attention; otherwise, it can lead to catastrophic operation outage. Go through the above
conditions to repair the configuration.

If you need help, email to support@aviatrix.com.

.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
