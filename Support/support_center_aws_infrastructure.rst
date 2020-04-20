.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
AWS Infrastructure
===========================================================================


How do I increase the size of the disk on my Gateway?
-------------------------------------------------------
Follow these instructions to increase the size of your instance's disk.

* Login to the AWS console and locate the Aviatrix gateway instance
* Click on Root device: /dev/sda1 and then click on EBS ID vol-xxxxxxxxxx link
* With the volume selected, click Action > "Modify Volume" to change the Disk Size
* Increase the value in the Size field. Click OK to start the resize process. Please make sure you wait until the state of the volume is "in-use - completed (100%)"
* Select the Aviatrix gateway instance in the EC2 page. Click Reboot for the disk space to take effect. This will cause downtime (< 5 minutes) due to the reboot process
* Confirm that the gateway is in a running state in AWS console
* Login to your controller to run gateway diagnostics and submit to us. Please also upload the gateway `tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_
  
How do I save an EIP used for a Gateway?
-------------------------------------------------------

* When creating a new Gateway, the default option for “Allocate New EIP” is "on" – this would mean that the Aviatrix Controller would check out a new EIP from AWS Infrastructure. If this gateway is deleted, the Controller will release this EIP to the AWS Infrastructure. If you expect to keep the EIP in future, it is recommended that the "Allocate New EIP" option is unchecked and an available EIP is picked during the Gateway creating process.
* If you are having issues with the Gateway and would like a new Gateway to replace the existing one and with the same EIP, the best way to do this is via “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Gateway Replace” 
* If you want to transfer the EIP from one Aviatrix Gateway to another one, please follow the following steps (Example: GatewayA-EIPA, GatewayB-EIPB. Move EIPA to GatewayB) **Note: Only supported in releases 4.0 and up. Using this for release 3.5 and lower will result in the loss of the EIP:** 
 
  * From the AWS Console, create a new EIP (Continuing the example: call this EIP-new)
  * From the Aviatrix Controller, go to “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Migration,” pick the Gateway that you want to pick the EIP from, enter this new-EIP and click on OK. (Pick GatewayA and enter EIP-new. This will release EIPA)
  * On the Aviatrix Controller, on the same page, pick the Gateway that you want to receive the old EIP and enter the old-EIP. (Example: Pick Gateway B and enter EIPA. This will release EIPB)
      
How can I encrypt an EBS Volume on Controller/Gateway?
----------------------------------------------------------

AWS does not allow EBS encryption during instance launch time. Follow instructions for `Controller <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-controller-ebs-volume>`_ and `Gateway <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-gateway-ebs-volume>`_


Why are IAM Roles/Policies important?
----------------------------------------------------------

* The Aviatrix Controller and its Gateways need access to AWS's resources and to function as designed. Any loss in these access privileges could cause unpredictable behavior and performance of your network. This access is granted and managed through IAM roles and policies. For more information please refer the following documents

  * `IAM Policy Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_
  * `IAM Policies  <https://docs.aviatrix.com/HowTos/iam_policies.html>`_
  * `How to use IAM Roles and Policies <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_
  * `Guidelines to customize IAM Policies <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_
* AWS has an IAM corner case - if an EC2 instance had an IAM role attached and then the role was deleted and added again, that EC2 instance's roles and policies will not function in a predictable way. If you have deleted and added Aviatrix IAM roles, it might be good to detach the roles from your Controllers and Gateways and attach them again.
* Aviatrix IAM policies might be updated - please make it a point to update them when you `update the software on Aviatrix system <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_


What do I do if my gateway instance is identified for retirement by AWS?
---------------------------------------------------------------------------
 
AWS will inform you when one of your instances is scheduled for retirement if the underlying hardware has issues or is being upgraded. Usually a start/stop from the AWS console will migrate the instance to newer hardware. Please check `here for more information <https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-retirement/>`_. Also, please open a support ticket with AWS for more information
 

How can I monitor the destination ports and ip addresses for instances in my VPC?
---------------------------------------------------------------------------------------

Aviatrix provides a `Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_ function to do this. But you could also consider `AWS's flowlogs <https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html>`_ functionality on a vpc which will capture all incoming and outgoing traffic out of the vpc and will log either into S3 or into CloudWatch. Please follow the directions `here <https://aws.amazon.com/blogs/aws/vpc-flow-logs-log-and-view-network-traffic-flows/>`_ and capture these logs. Capturing the outgoing port and IP address information will help you craft better Egress Control Policies.
 


 
How can I debug IAM related issues? (IAM Debug Playbook)
-----------------------------------------------------------
 
`IAM roles and policies <https://docs.aviatrix.com/Support/support_center_controller.html#why-are-iam-policies-important>`_ are essential for the Aviatrix System to function as designed. Please follow the following steps to identify and address any IAM issues
 
* If you are using `"AWS Organizations" <https://aws.amazon.com/organizations/>`_ to centrally manage & govern your policies across accounts, please follow the following to check on the policies to make sure you have the right permissions.

  * Check "Service Controller Policies" for "Root": Go to "AWS Console > AWS Organizations > Organize Account" and click on "Root" on the left panel, followed by a click on "Service Control Policies" on the right panel. Check all attached "Service Control Policies".
  * Check "Service Controller Policies" for "Organization Unit": Go to "AWS Console > AWS Organizations > Organize Account > Find" and click on the "Organization Unit" (which the account belongs to) on the left panel > Click on "Service control policies" on the right panel. Check all attached "Service Control Policies"
  * Check "Service Controller Policies" for the account: Go to "AWS Console > AWS Organizations > Account > Find" and click on the account from the list. Click on "Service Control Policies" on the right panel. Check all attached "Service Control Policies".
* Go to "Aviatrix Console > Settings > Advanced > AWS IAM Policy Update > Update Account IAM Policy" and make sure to pick one account at a time and click on "Check" - if the "Status=Up-to-date" then you do not need any updates, else you would have to `update the polices <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_. Repeat this check for all accounts that were added to Aviatrix Controller
* Go to "Aviatrix Console > Troubleshoot > Diagnostics > Cloud > Account Diagnostics" and click on "OK" - this will identify any IAM issues you might have
* Go to ""AWS Console > IAM > Roles" and search for "aviatrix".

  * Click on "aviatrix-role-app" and make sure that "aviatrix-app-policy" is attached to this role. For each Gateway that is on a different account than the Controller, please make sure that both its own account and the Controller's account are attached in the "Trust Relationships" tab. Update the "aviatrix-app-policy" if needed by following these `instructions <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_.
  * Click on "aviatrix-role-ec2" and make sure that "aviatrix-assume-role-policy" is attached to it. Please update it following the `instructions <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_.
  * Repeat the above for all accounts that are registered inside the Aviatrix Controller at "Aviatrix Console > Accounts > Access Accounts"
* Please go to "AWS Console > EC2" and confirm that all of your Aviatrix Controllers and Gateways have "aviatrix-role-ec2" associated. If any of them do not have this attached, please attach them
* If the above does not address your IAM related issues, please go to the AWS Console and detach " aviatrix-role-ec2" role from the Controller instance - by attaching the "none" role and then reattaching the "aviatrix-role-ec2" role again.
* If you have edited the Aviatrix roles(aviatrix-role-app, aviatrix-role-ec2) and policies(aviatrix-app-policy, aviatrix-assume-role-policy) - please make sure that you have followed the `instructions for requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_ and for `customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_.
* If you use `AWS Organizations <https://aws.amazon.com/organizations/>`_ for Central governance and management across AWS accounts, please work with your network security team or AWS for further support on how to provide the right access for Aviatrix Network System of Controllers and Gateways.
* Repeat the "Aviatrix Console > Settings > Advanced > AWS IAM Policy Update > Update Account IAM Policy > Check" and "Aviatrix Console > Troubleshoot > Diagnostics > Cloud > Account Diagnostics" for all accounts for a final check.


Why do I get an email alert about my gateway with "Cloud Message Queue Failure" message?
-----------------------------------------------------------------------------------------------

Typically, this message is sent when a gateway is not able to access the messages from the controller via AWS' SQS, either because it cannot resolve/reach AWS SQS or does not have the permissions to retrieve the messages from AWS SQS(i.e. DNS, network connectivity, system issues, IAM permissions). Please check the following:

  * Please run `gateway diagnostics <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_ by going to "Controller/Troubleshoot/Diagnostics/Gateway" and pick the gateway and run diagnostics test and "submit" them to us. You can also review the results by referring to the `service descriptions in diagnostics <http://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_.
  * Please make sure that the DNS can resolve public FQDN's and not just private FQDN's
  * Go to "Controller/Troubleshoot/Diagnostics/Network/GatewayUtility", pick the gateway and ping www.google.com - to see if it can resolve names and if it has network connectivity.
  * Check that this gateway has the `right IAM policies <https://docs.aviatrix.com/Support/support_center_controller.html#why-are-iam-policies-important>`_
  
    * Check that your controller and the gateway instances have "aviatrix-role-ec2" role attached to it on the AWS console
    * Check that the policies attached to this role are correct by going to "Controller/Accounts/AccountAudit" and run `account audit <https://docs.aviatrix.com/HowTos/account_audit.html>`_ on the account that this gateway belongs to. If needed, please update the policies - To update IAM policy to latest please got to "Controller/Accounts/Access Accounts/SelectAccount Name/click 3 dots/UpdatePolicy" and click OK.
    * Go to AWS Console > IAM > Roles > click on aviatrix-role-ec2 > check that aviatrix-assume-role-policy policy is attached > click on the policy name > {} JSON > it should be like https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
    * Go to AWS Console > IAM > Roles > click on aviatrix-role-app > check that  aviatrix-app-policy policy is attached > click on the policy name > {} JSON > it should be like https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt
    * If the gateway is not on the same account as the Controller, please make sure that this access account has trust relationship to the primary account (the Controller’s AWS account). The role "aviatrix-role-app" should be trusting it's own account and the controller's account. In the case of the primary account(which hosts the controller), it should trust it's own account.
  * Please make sure that both your controller and gateway have an EIP associated and not just a PublicIP/PrivateIP
  * Please note that this check is done once a day - after you address the issues, please wait for 24 hours from the previous alert to see if you will receive another alert
  * Sometimes, this could be a transient issue which will resolve due to temporary DNS/network failures
  * If you are not able to find and address the issue, please `upload the tracelogs <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_ for this gateway and send an email to support@aviatrix.com to open a new ticket.



How do you launch a controller in GovCloud?
-------------------------------------------------------------------------

Pre-deployment checklist:
  * Prepare a VPC with a public subnet (i.e., with 0.0.0.0/0 route points to IGW)  to launch the controller.
  * Go to EC2/Network & Security/Key Pairs to create a key pair.
  * Note that AWS US-EAST region does not support t2.large. Pick t3.large instead to avoid deployment failure.
  
Launch from CloudFormation template:
  * Copy the Aviatrix CloudFormation template URL from your AWS commercial cloud account as follows:
  
    * The CloudFormation links (Metered or BYOL) listed in https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#other-aviatrix-products should prompt you to login to your AWS commercial account and bring you into the CloudFormation-Create-stack UI.
    * Look under the Amazon-S3-URL field for the actual Metered/BYOL template URL
    * Copy the URL
  * Launch the CloudFormation template by following these steps:

    * Login to your GovCloud account
    * Go to Service/CloudFormation/Create Stack, enter the Aviatrix CloudFormation template URL copied in the previous step
    * Click Next and follow the typical CloudFormation Deployment process.  
 
Launch from EC2/Instances/Launch Instance/AWS Marketplace manually:
  * You would need to create the Aviatrix-role-ec2, Aviatrix-role-app, Aviatrix-assume-role-policy and Aviatrix-app-policy `manually <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#setup-secondary-account-iam-manually>`_. In addition, you would need to change the Resource of AssumeRole Action in Aviatrix-assume-role-policy from "arn:aws:iam::*:role/aviatrix-*" to "arn:aws-us-gov:iam::*:role/aviatrix-*", making sure the arn is pointing to using aws-us-gov.
  * Launch the controller by picking an Aviatrix image under EC2/Instances/Launch Instance/AWS Marketplace.
  
Other notes:
  * Flightpath with AWS Govcloud does not work unless a Commercial AWS account is also registered on the controller. Register a commercial AWS cloud account with the controller:
  
    * Goto Accounts/Access Accounts/Add Account
    * Pick AWS and uncheck IAM role-based checkbox
    * Populate your AWS Access Key ID/Account Number/Secret key. 
  * Controller `VPC tracker <https://docs.aviatrix.com/HowTos/vpc_tracker.html>`_ is not yet supported for GovCloud
  

Can I change my AWS Access Account auth between IAM role based and Accesskey?
-------------------------------------------------------------------------------

You can change between IAM rolebased and accesskey based authentication on  AWS accounts from "Controller/Accounts/AccessAccounts/SelectAccount/Edit" when there are no resources on this account. If any resources, such as Gateway's are created, you will not be able to switch over


How do I recover if my Instance Profile ARN goes missing on "aviatrix-role-ec2"?
----------------------------------------------------------------------------------

If the roles are deleted by accident, AWS might get into a weird state where the "Instance Profile ARN" might be missing. You would have to use the aws cli as mentioned at https://docs.aws.amazon.com/cli/latest/reference/iam/add-role-to-instance-profile.html to recover from this situation. The actual command would be "aws iam add-role-to-instance-profile --role-name aviatrix-role-ec2 --instance-profile-name aviatrix-role-ec2". You might have to remove the role aviatrix-role-ec2 on the controller and/or gateways and add it back. Wait for a couple minutes for this to take effect.
