.. meta::
  :description: Auditing gateway IAM roles and policies correctness
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Gateway IAM roles Audit 
=================================

The Aviatrix Controller periodically checks the AWS gateway it launched to make sure:

 1. The Aviatrix gateway instance in AWS has its IAM role aviatrix-role-ec2 attached. 
 #. The aviatrix-role-app role exists and has policies attached to it.

When any of the above condition fails, the Controller sends an alert email to the Controller admin and logs the event. 

When any of the above condition fails, the gateway will not be able to receive messages from the Controller. 
Therefore the event requires immediate action as it will lead to operation outage. 

If you need help, email to support@aviatrix.com

.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
