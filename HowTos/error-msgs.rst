.. meta::
   :description: Error messages and how to fix them
   :keywords: error messages, troubleshoot, debug

###################################
Error Messages
###################################

This document records Aviatrix error messages, possible root causes and solutions.

------------------------------------------------------------------------------------

::

  [Aviatrix Error] Failed to enable route propagation for route table rtb-00e04eeae563a1713, vgw vgw-058b6dbb20155c6b2 - EC2ResponseError: 403 Forbidden UnauthorizedOperationYou are not authorized to perform this operation.16b84b8a-f5cd-4a25-9c61-bdf8f52a08f1 One likely cause is that your Aviatrix IAM policy (aviatrix-app-policy) does not contain the privilege for this operation. Follow the instruction in this link to update the aviatrix-app-policy. https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies (If this is not clear, go to docs.aviatrix.com and search the matching error string for resolution.) One likely cause is that your Aviatrix IAM policy (aviatrix-app-policy) does not contain the privilege for this operation. Follow the instruction in this link to update the aviatrix-app-policy. https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies

Follow the instructions `here <https://docs.aviatrix.com/HowTos/iam_policies.html>`_ to update the IAM policy on this account.

----------------------------------------------------------------------------------

::

  [Aviatrix Error] oregon-transit with size t2.micro only support 2 interfaces. Cannot create DMZ interface. Please increase gateway size (suggest t3.medium) 

Transit DMZ deployment requires 3 Ethernet interfaces. t2.micro has only 2. 
At the Aviatrix Controller console, go to Gateway. highlight  the transit gateway with the size error, click Edit. Scroll down to Gateway Resize. In the drop down menu, select t2.small or a more powerful instance size. For instance size charts, refer to `this AWS guide <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html>`_.

------------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Peerings detected. Please delete them before terminating the gateway.

Go to Peering page to delete the peer first.

-----------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Detach virginia-spoke-1 from virginia-transit in Transit Network page...

The peering relationship was most likely established by Transit Network workflow attaching a Spoke VPC to the Transit Gateway, therefore you should detach the Spoke VPC from the Transit VPC to delete the peering.


------------------------------------------------------------------------------------

:: 

 Error: Failed to create TGW Infra-TGW in us-east-1 - An error occurred (UnauthorizedOperation) when calling the CreateTransitGateway operation: You are not authorized to perform this operation.

Most likely you need to update IAM policies. Follow the instructions `here. <https://docs.aviatrix.com/HowTos/iam_policies.html>`_


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

 Error: [Aviatrix Error] Failed to deliver msg to gw virginia-client: HTTPSConnectionPool(host='54.164.197.97', port=443): Max retries exceeded with url: /cloudxaws/launch.py?action=gateway_diag (Caused by ConnectTimeoutError(, 'Connection to 54.164.197.97 timed out. (connect timeout=10)'))

The gateway instance is either stopped or a security group rule of the gateway instance was added that prevents the Controller to reach to the gateway. 

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

--------------------------------------------------------------------

::

  Error: [Aviatrix Error] Login failed

Your password is probably not correct. 

.. disqus::
