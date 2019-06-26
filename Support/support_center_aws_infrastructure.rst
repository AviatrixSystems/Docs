.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
AWS Infrastructure
===========================================================================


How do I increase the size of the disk on my Gateway?
-------------------------------------------------------
Follow these instructions to increase the size of your instance's disk

* Login to AWS console and locate the Aviatrix gateway instance
* Click on Root device: /dev/sda1 and then click on EBS ID vol-xxxxxxxxxx link
* With the volume selected, click Action > "Modify Volume" to change the Disk Size
* Increase the value in the Size field. Click OK to start the resize process. Please make sure you wait until the State of the volume is "in-use - completed (100%)"
* Select the Aviatrix gateway instance in EC2 page. Click Reboot for the disk space to take effect. This will cause down time (< 5 minutes) due to the reboot process
* Confirm that the gateway is in running state in AWS console
* Login to your controller to run gateway diagnostics and submit to us. Please also upload the gateway `tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_
  
How do I save an EIP used for a Gateway?
-------------------------------------------------------

* When creating a new Gateway the default option for “Allocate New EIP” is "on" – this would mean that the Aviatrix Controller would check out a new EIP from AWS Infrastructure. If this gateway is deleted, the Controller will release this EIP to the AWS Infrastructure. If you expect to keep the EIP in future, it is recommended that "Allocate New EIP" option is unchecked and an available EIP is picked during the Gateway creating process.
* If you are having issues with the Gateway and would like a new Gateway to replace the existing one and with the same EIP, the best way to do this is to via “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Gateway Replace” 
* If you want to transfer the EIP from one Aviatrix Gateway to another one, please follow the following steps (Example: GatewayA-EIPA, GatewayB-EIPB. Move EIPA to GatewayB) **Note: Only supported in releases 4.0 and up. Using this for release 3.5 and lower will result in the loss of the EIP:** 
 
  * From AWS Console, create a new EIP (Continuing the example: call this EIP-new)
  * From Aviatrix Controller, go to “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Migration” and pick the Gateway that you want to pick the EIP from and enter this new-EIP and click on OK. (Pick GatewayA and enter EIP-new. This will release EIPA)
  * On the Aviatrix Controller, on the same page, pick the Gateway that you want to receive the old EIP and enter the old-EIP. (Example: Pick Gateway B and enter EIPA. This will release EIPB)
      
How can I encrypt an EBS Volume on Controller/Gateway
----------------------------------------------------------

AWS does not allow EBS encryption during instance launch time. Follow instructions for `Controller <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-controller-ebs-volume>`_ and `Gateway <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-gateway-ebs-volume>`_


Why are IAM Roles/Policies important?
----------------------------------------------------------

* The Aviatrix Controller and its Gateways need access to AWS's resources and to function as designed. Any loss in this access privileges could cause unpredictable behavior and performance of your network. This access is granted and managed through IAM roles and policies. For more information please refer the following documents

  * `IAM Policy Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_
  * `IAM Policies  <https://docs.aviatrix.com/HowTos/iam_policies.html>`_
  * `How to use IAM Roles and Policies <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_
  * `Guidelines to customize IAM Policies <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_
* AWS has an IAM corner case - if an EC2 instance had an IAM role attached and then the role was deleted and added again, that EC2 instance's roles and policies will not function in a predictable way. If you have deleted and added Aviatrix IAM roles, it might be good to detach the roles from your Controllers and Gateways and attach them again.
* Aviatrix IAM policies might be updated - please make it a point to update them when you `update the software on Aviatrix system <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_


What do I do if my gateway instance is identified for retirement by AWS?
---------------------------------------------------------------------------
 
AWS will inform you when one of your instances is scheduled for retirement if the underlying hardware has issues or is being upgraded. Usually a start/stop from AWS console will migrate the instance to newer hardware. Please check `here for more information <https://aws.amazon.com/premiumsupport/knowledge-center/ec2-instance-retirement/>`_. Also, please open a support ticket with AWS for more information
 

How can I monitor the destination ports and ip addresses for instances in my VPC?
---------------------------------------------------------------------------------------

Aviatrix provides a `Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_ function to do this. But you could also consider `AWS's flowlogs <https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html>`_ functionality on a vpc which will capture all incoming and outgoing traffic out of the vpc and will log either into S3 or into CloudWatch. Please follow the directions `here <https://aws.amazon.com/blogs/aws/vpc-flow-logs-log-and-view-network-traffic-flows/>`_ and capture these logs. Capturing the outgoing port and IP address information will help you craft better Egress Control Policies.
 


 
How can I debug IAM related issues? (IAM Debug Playbook)
-----------------------------------------------------------
 
`IAM roles and policies <https://docs.aviatrix.com/Support/support_center_controller.html#why-are-iam-policies-important>`_ are essential for the Aviatrix System to function as designed. Please follow the following steps to identify and address any IAM issues
 
* If you are using `"AWS Organizations" <https://aws.amazon.com/organizations/>`_ to centrally manage & govern your policies across accounts, please follow the following to check on the policies to make sure you have the right permissions.

  * Check "Service Controller Policies" for "Root": Go to "AWS Console > AWS Organizations > Organize Account" and click on "Root" on the left panel, followed by a click on "Service Control Policies" on the right panel. Check all attached "Service Control Policies".
  * Check "Service Controller Policies" for "Organization Unit": Go to "AWS Console > AWS Organizations > Organize Account > Find" and click on the "Oranization Unit" (which the account belongs to) on the left panel > Click on "Service control policies" on the right panel. Check all attached "Service Control Policies"
  * Check "Service Controller Policies" for the account: Go to "AWS Console > AWS Organizations > Account > Find" and click on the account from the list. Click on "Service Control Policies" on the right panel. Check all attached "Service Control Policies".
* Go to "Aviatrix Console > Settings > Advanced > AWS IAM Policy Update > Update Account IAM Policy" and make sure to pick one account at a time and click on "Check" - if the "Status=Up-to-date" then you do not need any updates, else you would have to `update the polices <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_. Repeat this check for all accounts that were added to Aviatrix Controller
* Go to "Aviatrix Console > Troubleshoot > Diagnostics > Cloud > Account Diagnostics" and click on "OK" - this will identify any IAM issues you might have
* Go to ""AWS Console > IAM > Roles" and search for "aviatrix".

  * Click on "aviatrix-role-app" and make sure that "aviatrix-app-policy" is attached to this role. For all Gateways that are on a different account than the Controller, please make sure that both its own account and the Controller's account are attached in the "Trust Relationships" tab. Update the "aviatrix-app-policy" if needed by following these `instructions <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_.
  * Click on "aviatrix-role-ec2" and make sure that "aviatrix-assume-role-policy" is attached to it. Please update it following the `instructions <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_.
  * Repeat the above for all accounts that are registered inside the Aviatrix Controller at "Aviatrix Console > Accounts > Access Accounts"
* Please go to "AWS Console > EC2" and confirm that all of your Aviatrix Controllers and Gateways have "aviatrix-role-ec2" associated. If any of them do not have this attached, please attach them
* If the above do not address your IAM related issues, please go to AWS Console and detach " aviatrix-role-ec2" role from the Controller instance - by attaching the "none" role and then reattaching the "aviatrix-role-ec2" role again.
* If you have edited the Aviatrix roles(aviatrix-role-app, aviatrix-role-ec2) and policies(aviatrix-app-policy, aviatrix-assume-role-policy) - please make sure that you have followed the `instructions for requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_ and for `customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_.
* If you use `AWS Organizations <https://aws.amazon.com/organizations/>`_ for Central governance and management across AWS accounts, please work with your network security team or AWS for further support on how to provide the right access for Aviatrix Network System of Controllers and Gateways.
* Repeat the "Aviatrix Console > Settings > Advanced > AWS IAM Policy Update > Update Account IAM Policy > Check" and "Aviatrix Console > Troubleshoot > Diagnostics > Cloud > Account Diagnostics" for all accounts for a final check.
