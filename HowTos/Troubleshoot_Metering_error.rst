.. meta::
   :description: Troubleshoot Metering error 
   :keywords: AWS billing issue, EC2

=====================
Resolve the AWS billing issue
=====================

If you have received an email from  "no-reply" (info@aviatrix.com) with the subject "Aviatrix Metering Send Error"

1.  Unable to send Metering record: An error occurred (AccessDeniedException) when calling the MeterUsage operation: User: arn:aws:sts::094123412341:assumed-role/aws-elasticbeanstalk-ec2-role/i-07abb25asdfasdf8 is not authorized to perform: aws-marketplace:MeterUsage
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
If you see an error like this, this is because your IAM policies attached to your controller are incorrect
Editing the IAM role to the Aviatrix controller (EC2 instance) which has a metered policy using with the following permissions:
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt


2. (UnrecognizedClientException) when calling the MeterUsage operation: The security token included in the request is invalid
---------------------------------------------------------------------------------------------------------------------------------------------------------------
This is because  you deleted or detached an IAM role . Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt

You will also need to Troubleshoot->Diagnostics->Services->Restart cloudxd from controller


3. Unable to locate credentials 
---------------------------------------
This is because  you deleted or detached the controller's an IAM role . Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt

You will also need to Troubleshoot->Diagnostics->Services->Restart cloudxd from controller


4.Credentials were refreshed, but the refreshed credentials are still expired    
-----------------------------------------------------------------------------------------------
This is likelt a boto issue https://github.com/boto/botocore/issues/869
Ensure the IAM role is correct
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You will also need to Troubleshoot->Diagnostics->Services->Restart cloudxd from controller
If that does not work, you may need to reboot your controller 


5. acess_key
----------------
This could because  you deleted or detached or edited the controller's IAM role . Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt

You will also need to Troubleshoot->Diagnostics->Services->Restart cloudxd from controller

6. Timeout or Unreachable host errors
------------------------------------------------
Check the firewall and ACL rules of yor controller's VPC. You will need to ensure that the controller has valid internet access. 
This could also be a temporary network failure issue and might resolve itself



