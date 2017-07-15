.. meta::
   :description: Error messages and how to fix them
   :keywords: error messages, troubleshoot, debug

###################################
Error Messages
###################################

1. 

::

**Error message:** 'Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal ..... and configure programmatic deployment for the Marketplace item or create it there for the first time'

If you see this error message when you launch an Azure ARM gateway,
chances are you have not subscribed to Aviatrix gateway during Azure onboarding process. Either go back to onboarding page and follow the instructions there, or click `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/How+to+subscribe+to+Aviatrix+companion+gateway.pdf>`__ for guidance.  


2. 

::

**Error message:** `Error: Exception CloudxErrExt Context:message:EC2ResponseError: 401 Unauthorized AuthFailureAWS was not able to validate the provided access credentialsf67841bc-cb94-4cfd-a990-05d27d11f540`

If you see this error message when launching an AWS gateway, chances are your access key or secret ID is not correct. Re-enter these two fields. If it still does not work, change the credential on AWS console and try again.

::

.. disqus::
