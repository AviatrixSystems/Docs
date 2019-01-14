.. meta::
   :description: Error messages and how to fix them
   :keywords: error messages, troubleshoot, debug

###################################
Error Messages
###################################

This document records Aviatrix error messages, possible root causes and solutions.


-----------------------------------------------------------------------------------

::

**Error message** 'Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal ..... and configure programmatic deployment for the Marketplace item or create it there for the first time'

If you see this error message when you launch an Azure ARM gateway,
chances are you have not subscribed to Aviatrix gateway during Azure onboarding process. Either go back to onboarding page and follow the instructions there, or click `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/How+to+subscribe+to+Aviatrix+companion+gateway.pdf>`__ for guidance.  


---------------------------------------------------------------------------------

::

**Error message** `Error: Exception CloudxErrExt Context:message:EC2ResponseError: 401 Unauthorized AuthFailureAWS was not able to validate the provided access credentialsf67841bc-cb94-4cfd-a990-05d27d11f540`

If you see this error message when launching an AWS gateway, the potential root causes are:

 - If you used AWS IAM roles for the Aviatrix account, it is likely that your IAM role policies are not up to date. Follow `this link <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_ to update both IAM policies on both your primary account and secondary account.
 - If you used AWS access key and secret ID for the Aviatrix account, it is possible that this pair of credential is incorrect. Re-enter these two fields. 


------------------------------------------------------------------------------------

::

  Detach [u'vpc-02833dbc4c0d5d4d4', u'vpc-873db7e2', u'vpc-044a0089cdec537a9'] on cheng008 before you delete AWS TGW. To detach Aviatrix Transit GW vpc-873db7e2 using "TGW Orchestrator > Plan > Step 7".

This error message says you must first detach the Aviatrix Transit GW from the TGW before you can delete the gateway. 


.. disqus::
