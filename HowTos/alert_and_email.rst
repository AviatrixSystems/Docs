.. meta::
   :description: alert message handling
   :keywords: Emails, email source, alert message handling, Aviatrix alert

###################################
Emails and Alert Configuration 
###################################

The Aviatrix Controller sends alert emails for events such as:

 - Tunnel status change
 - Gateway status change

By default, the alert email is sent to the admin of the Controller. The email can be an individual email address or an email alias of a team. 

By default, the source email address is info@aviatrix.com. 

How to change alert email configuration
----------------------------------------

If you would like the alert messages to be sent to a different email, 

::

  go to Settings -> Controller -> STATUS CHANGE EVENT EMAIL, 
  fill in a new email address and click Save. 

|change_alert_email|

How to change source of email notification 
-------------------------------------------

If you like to change the email source from info@aviatrix.com to something else, for example, 
your own organization email, 

::

  go to Settings -> Controller -> CHANGE EMAIL NOTIFICATION SOURCE. 
  Enter a Test Email address if you like to test the configuration. 
  Click Save when done.  
  
::


  Optional: Steps to setup email inside AWS and use Amazon SMTP server.
  Verify all email(s) to send and receive

|AwsEmailVerification|

::

  Enter all parameters and specify your AWS SES login & password.

|ChangeEmailNotification|

.. |change_alert_email| image:: alert_and_email_media/change_alert_email.png
   :scale: 30%
   
.. |AwsEmailVerification| image:: alert_and_email_media/AwsEmailVerification.PNG
   :scale: 30%
   
.. |ChangeEmailNotification| image:: alert_and_email_media/ChangeEmailNotification.PNG
   :scale: 30%

.. disqus::
