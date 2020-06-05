.. meta::
   :description: Error messages and how to fix them
   :keywords: error messages, troubleshoot, debug

###################################
Error Messages
###################################

This document records Aviatrix error messages, possible root causes and solutions.

---------------------------------------------------------------------------------------

::

  [Aviatrix Error] Egress-FireNet-oregon enables East-west inspection. It conflicts with tgw-0af3e281d06d363d4 existing firewall policy. If there are multiple Firewall domains or Transit DMZ that enable traffic inspection, please make sure egress_domain is completely isolated from the other firewall domain.

This is probably caused by two firewall domains both wanting to inspect the same VPC traffic. Only one firewall domain
can inspect east-west traffic the other inspects egress. 

You can fix this by going to Firewall Network -> Advanced. Select the firewall domain, disable "Traffic Inspection, 
and enable "Egress through Firewall". Then go back and execute Step 6 in Firewall Network workflow. 


-------------------------------------------------------------------------------------

::

  [Aviatrix Error] Only VPN BGP is supported. Go to AWS Console -> VPC -> Site-to-Site VPN Connections to download the configuration file.

TGW VPN configuration downloading is not supported from the Aviatrix Controller console. You can download the configuration by going to the AWS Console -> VPC -> Site-to-Site VPN Connections to download the configuration file. Once the file is downloaded, use the information in the file to configure the remote end of the IPSec VPN. 

------------------------------------------------------------------------------------

::
 
 Error: [Aviatrix Error] Peerings detected. Please delete them before terminating the gateway.

You must go to the Peering page to delete the peering first before you can delete the gateway. 

--------------------------------------------------------------------------------

::

 [Aviatrix Error] Failed to deliver msg to gw oregon-spoke1-server: HTTPSConnectionPool(host='54.203.52.208', port=443): Max retries exceeded with url: /cloudxaws/launch.py?action=gateway_diag (Caused by ConnectTimeoutError(, 'Connection to 54.203.52.208 timed out. (connect timeout=10)')) 

It's possible the named gateway is stopped or a security group rule blocked access from the Controller. 

---------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] For rule:[{u'port': u'22-220', u'fqdn': u'www.amazon.com', u'proto': u'tcp'}] port[22-220] range must be within the caped limit of:100. 
Syntax:[port | fromport-toport]. Range "fromport" to "toport" inclusive.

The maximum port range is 100. 

---------------------------------------------------

::

  Error: Exception CloudxErrExt Context:message:Failed to assume role to your aviatrix-role-app. The policy associated with the role must include AssumeRole.  class:CloudxErrExt cloud_type:[1] account_name:[GreatCall_DevOps_Account]

It is likely that the Controller was launched not by the CloudFormation script provided by Aviatrix. Follow the `Aviatrix Controller Startup guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

----------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] BGP connection can only be deleted from Transit Network page.

A Site2Cloud connection established from `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ can only be deleted by the `delete section <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#remove-transit-gw-to-vgw-connection>`_ in the workflow. 

-----------------------------------------------------------------------------------

::

 [Aviatrix Error] Primary gateway virginia-transit is not up. Bring up the Primary gateway and try again.

It is likely your gateway is in a stopped state. Go to AWS Console to start the gateway instance. 

------------------------------------------------------------------------------------

::

  [Aviatrix Error] Failed to enable route propagation for route table rtb-00e04eeae563a1713, vgw vgw-058b6dbb20155c6b2 - EC2ResponseError: 403 Forbidden UnauthorizedOperationYou are not authorized to perform this operation.16b84b8a-f5cd-4a25-9c61-bdf8f52a08f1 One likely cause is that your Aviatrix IAM policy (aviatrix-app-policy) does not contain the privilege for this operation. Follow the instruction in this link to update the aviatrix-app-policy. https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies (If this is not clear, go to docs.aviatrix.com and search the matching error string for resolution.) One likely cause is that your Aviatrix IAM policy (aviatrix-app-policy) does not contain the privilege for this operation. Follow the instruction in this link to update the aviatrix-app-policy. https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies

Follow the instructions `here <https://docs.aviatrix.com/HowTos/iam_policies.html>`_ to update the IAM policy on this account.

----------------------------------------------------------------------------------

::

  [Aviatrix Error] oregon-transit with size t2.micro only support 2 interfaces. Cannot create DMZ interface. Please increase gateway size (suggest t3.medium) 

Transit DMZ deployment requires 3 Ethernet interfaces. t2.micro has only 2. 
At the Aviatrix Controller console, go to Gateway. Highlight the transit gateway with the size error, click Edit. Scroll down to Gateway Resize. In the drop down menu, select t2.small or a more powerful instance size. For instance size charts, refer to `this AWS guide <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-eni.html>`_.

------------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Peerings detected. Please delete them before terminating the gateway.

Go to Peering page to delete the peer first.

-----------------------------------------------------------------------------------

::

  Error: [Aviatrix Error] Detach virginia-spoke-1 from virginia-transit in Transit Network page...

The peering relationship was most likely established by the Transit Network workflow attaching a Spoke VPC to the Transit Gateway, therefore you should detach the Spoke VPC from the Transit VPC to delete the peering.


------------------------------------------------------------------------------------

:: 

 Error: Failed to create TGW Infra-TGW in us-east-1 - An error occurred (UnauthorizedOperation) when calling the CreateTransitGateway operation: You are not authorized to perform this operation.

It is likely you need to update IAM policies. Follow the instructions `here. <https://docs.aviatrix.com/HowTos/iam_policies.html>`_


-----------------------------------------------------------------------------------

::

[Aviatrix Error] Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal ..... and configure programmatic deployment for the Marketplace item or create it there for the first time

If you see this error message when you launch an Azure ARM gateway,
chances are you have not subscribed to the Aviatrix gateway during the Azure onboarding process. Either go back to the onboarding page and follow the instructions there, or click `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/How+to+subscribe+to+Aviatrix+companion+gateway.pdf>`__ for guidance.  


---------------------------------------------------------------------------------

::

[Aviatrix Error]  Exception CloudxErrExt Context:message:EC2ResponseError: 401 Unauthorized AuthFailureAWS was not able to validate the provided access credentialsf67841bc-cb94-4cfd-a990-05d27d11f540

If you see this error message when launching an AWS gateway, the potential root causes are:

 - If you used AWS IAM roles for the Aviatrix account, it is likely that your IAM role policies are not up to date. Follow `this link <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_ to update both IAM policies on both your primary account and secondary account.
 - If you used an AWS access key and secret ID for the Aviatrix account, it is possible that this pair of credentials is incorrect. Re-enter these two fields. 


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

The gateway instance is either stopped or a security group rule of the gateway instance was added that prevents the Controller from reaching the gateway. 

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

    Error: [Aviatrix Error] Primary transit gateway insane2-main is not active gateway. Please force switchover gateway back to primary before enabling Connected Transit Mode.

Your primary Aviatrix Transit Gateway is not the active one. Please follow the steps below to switchover from backup Transit Gateway to primary Transit Gateway:

- For DMZ Main Transit Gateway, go to "Transit DMZ" -> "Advanced". At "Main gateway" section, click "Switchover" button and make sure "HA Status" of primary Main Gateway is in "Active" state.

- For a Transit Gateway with BGP connections, go to "Troubleshoot" -> "Diagnostics" -> "BGP", click "Switch Over" button along with backup Transit Gateway (gateway name with "hagw" postfix).

--------------------------------------------------------------------

::

    Error: [Aviatrix Error] Gateway instance create failed Reason:Quota 'IN_USE_ADDRESSES' exceeded. Limit: 8.0 in region us-central1.

You may have exceeded GCP IN_USE_ADDRESSES limits on this account. By default in GCP, the in-use IP address of a region is 8 (Different GCP project has different quotas limit setting), you can ask for a new quota limit by following `this GCP instruction <https://cloud.google.com/compute/quotas#request_quotas>`_.


--------------------------------------------------------------------

::

    Error: [Aviatrix Error] LAN interface is not in demo1-oregon-firenet-gw firewall subnet subnet-09f70b0922e5878ce.

When you try to associate firewall instance to FireNet gateway, the firewall's LAN instance must stay in the same subnet with FireNet gateway's firewall subnet. It is recommended to use Aviatrix controller to launch and associate firewall, which guarentee all the subnets and interfaces are correct. If you launch your own firewall, you need to make sure the firewall interfaces are correct.
The firewall subnets/interfaces are created when enable FireNet function on the gateway. If you create firewall instance before enable FireNet function, those instances can not associate with gateway due to mismatched interface. One way to solve this is to use API to enable FireNet function, and provide existing subnets as option. Please refer to API doc. 


--------------------------------------------------------------------

::

   Error: TCP: connect to [AF_INET] failed, will try again in 5 seconds: The system tried to join a drive to a directory on a joined drive. 
   
This error may be found in Aviatrix VPN Client logs. It will be returned in the event a TCP OpenVPN Gateway is deployed behind an AWS NLB, but port 943 is not open to the preserved source IP's. We recommend opening port 943 to 0.0.0.0/0 to prevent connectivity issues like this. Please refer to the following documentation for OpenVPN required ports:

https://docs.aviatrix.com/Support/support_center_openvpn_gateway.html#which-ports-should-i-have-open-in-my-firewall-to-allow-openvpn-users-to-come-in
--------------------------------------------------------------------

::

   Error: [Aviatrix Error] An error occurred (InsufficientFreeAddressesInSubnet) when calling the CreateTransitGatewayVpcAttachment operation: Insufficient Free IP Addresses in subnet.
   
This error will be returned when there are 0 available IP addresses in a subnet that is being attached to the TGW. You must have at least one available IP address in each subnet that will be attached. 
   
--------------------------------------------------------------------

::

    Error: [Aviatrix Error] Gateway instance create failed Reason:Quota 'IN_USE_ADDRESSES' exceeded. Limit: 8.0 in region us-central1.

You may have exceeded GCP IN_USE_ADDRESSES limits on this account. By default in GCP, the In-use IP address of a region is 8 (Different GCP project has different quotas limit setting), you can ask for a new quota limit by following `this GCP instruction <https://cloud.google.com/compute/quotas#request_quotas>`_.


.. disqus::
