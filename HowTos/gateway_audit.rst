.. meta::
  :description: Auditing gateway IAM roles and policies correctness
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


=================================
Gateway Audit 
=================================

The Aviatrix Controller periodically checks the Aviatrix gateways in AWS it launched to make sure:

 1. The Aviatrix gateway instance in AWS has its IAM role aviatrix-role-ec2 attached. 
 #. The aviatrix-role-app role exists and has policies attached to it.
 #. The Aviatrix gateway instance's security group has an inbound rule that opens to the Controller EIP on port 443

When any of the above condition fails, the Controller sends an alert email to the Controller admin and logs the event. 

When any of the above condition fails, the gateway will not be able to receive messages from the Controller. 
Therefore the event requires immediate action as it will lead to operation outage. 

==========================================      =================
**Audit Status**                                **Description**
==========================================      =================
Pass                                            The gateway has passed the most recent audit.
Error(SG)                                       The gateway instance's security group does not have an inbound rule that is open to the Controller's EIP
Error(IAM)                                      The gateway instance's aviatrix-role-ec2 is detached from the instance profile or aviatrix-role-app does not have associated policy. 
==========================================      =================

Cloud Message Queue Failure
-----------------------------

If the alert message has a title "Cloud Message Queue Failure", it implies the following:

 1. The gateway runs periodic APIs calls to retrieve SQS messages if any sent by the Controller. For 15 minutes, the specific gateway has been experiencing  API calls failures. This does not necessarily mean the gateway has missed any messages. There may be a temporary interruption for gateway to make API calls. 
 #. If the failure continues, a new message will be sent once a day. 

Please checkout this `document <https://docs.aviatrix.com/Support/support_center_aws_infrastructure.html#why-do-i-get-an-email-alert-about-my-gateway-with-cloud-message-queue-failure-message>`_ to look for ways to debug and address this issue. If you need help, email to support@aviatrix.com

.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
