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
 
