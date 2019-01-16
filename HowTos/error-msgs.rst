.. meta::
   :description: Error messages and how to fix them
   :keywords: error messages, troubleshoot, debug

###################################
Error Messages
###################################

This document records Aviatrix error messages, possible root causes and solutions.


-----------------------------------------------------------------------------------

::

[Aviatrix Error] Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal ..... and configure programmatic deployment for the Marketplace item or create it there for the first time

If you see this error message when you launch an Azure ARM gateway,
chances are you have not subscribed to Aviatrix gateway during Azure onboarding process. Either go back to onboarding page and follow the instructions there, or click `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/How+to+subscribe+to+Aviatrix+companion+gateway.pdf>`__ for guidance.  


---------------------------------------------------------------------------------

::

[Aviatrix Error]  Exception CloudxErrExt Context:message:EC2ResponseError: 401 Unauthorized AuthFailureAWS was not able to validate the provided access credentialsf67841bc-cb94-4cfd-a990-05d27d11f540

If you see this error message when launching an AWS gateway, the potential root causes are:

 - If you used AWS IAM roles for the Aviatrix account, it is likely that your IAM role policies are not up to date. Follow `this link <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_ to update both IAM policies on both your primary account and secondary account.
 - If you used AWS access key and secret ID for the Aviatrix account, it is possible that this pair of credential is incorrect. Re-enter these two fields. 


------------------------------------------------------------------------------------

::

  [Aviatrix Error]  Detach before you delete AWS TGW. To detach Aviatrix Transit GW vpc-873db7e2 using "TGW Orchestrator > Plan > Step 7".

This error message says you must first detach the Aviatrix Transit GW from the TGW before you can delete the gateway. 

--------------------------------------------------------------------------------------

::

  [Aviatrix Error] VPC creation failed with error EC2ResponseError: 400 Bad Request VpcLimitExceededThe maximum number of VPCs has been reached


You may have exceeded AWS VPC limits on this account. You can file a support ticket to increase the limit. 

------------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Failed to launch vpc virginia-client due to Failed to create instance. Error code: Unsupported, message: Your requested instance type (c5.2xlarge) is not supported in your requested Availability Zone (us-east-1e). Please retry your request by not specifying an Availability Zone or choosing us-east-1b, us-east-1d, us-east-1a, us-east-1f, us-east-1c.. Could be the Gateway size c5.2xlarge is not supported in the region us-east-1

This instance size is not supported in the AZ you selected. Select a different one. 

------------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Failed to allocate EIP, The maximum number of addresses has been reached.

You have reached your AWS EIP limit. Release some of your unallocated EIPs from the AWS EC2 Console or submit a support ticket to AWS to increase the limit. 

-----------------------------------------------------------------

:: 

 Error: [Aviatrix Error] Peerings detected. Please delete them before terminating the gateway. 

You should go to Peering page to delete all peerings on the gateway before you 
can delete the gateway. 

--------------------------------------------------------------

::

 Error: [Aviatrix Error] Only C5 instances are allowed when Insane Mode is enabled.

Insane Mode only supports AWS C5 series. For performance, check `this link <https://docs.aviatrix.com/HowTos/insane_mode.html#instance-sizes-and-ipsec-performance>`_.


.. disqus::
