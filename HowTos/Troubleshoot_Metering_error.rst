
=====================
Resolve the AWS billing issue
=====================

If you have received an email from  "no-reply" (info@aviatrix.com) with the subject "AWS Billing issue", then you need to take immediate action to resolve the same. The following are some of the errors and the resolution steps

1.  Unable to send Metering record: An error occurred (AccessDeniedException) when calling the MeterUsage operation: User: arn:aws:sts::094123412341:assumed-role/aws-elasticbeanstalk-ec2-role/i-07abb25asdfasdf8 is not authorized to perform: aws-marketplace:MeterUsage
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
If you see an error like this, it is because your IAM policies attached to your controller are incorrect.
Editing the IAM role to the Aviatrix controller (EC2 instance) which has a metered policy using with the following permissions:
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You may also need to click on Troubleshoot->Diagnostics->Services->Restart cloudxd from the controller


2. (UnrecognizedClientException) when calling the MeterUsage operation: The security token included in the request is invalid
---------------------------------------------------------------------------------------------------------------------------------------------------------------
This is because  you deleted or detached an IAM role or detached and attached a new IAM policy with the same name. Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You may also need to click on Troubleshoot->Diagnostics->Services->Restart cloudxd from the controller


3. Unable to locate credentials 
---------------------------------------
This is because  you deleted or detached the controller's an IAM role . Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You may also need to click on Troubleshoot->Diagnostics->Services->Restart cloudxd from the controller


4.Credentials were refreshed, but the refreshed credentials are still expired    
-----------------------------------------------------------------------------------------------
This is a boto issue https://github.com/boto/boto3/issues/1751 
Ensure the IAM role is correct
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You will need to detach the aviatrix-role-ec2 IAM role and re-attach it back to the Aviatrix controller instance to fix the issue

5. access_key
----------------
This could  be because  you deleted or detached or edited the controller's IAM role . Attach an IAM  role to the controller with the following policy
https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt
You may also need to click on Troubleshoot->Diagnostics->Services->Restart cloudxd from the controller

6. Timeout or Unreachable host errors
------------------------------------------------
Check the firewall and ACL rules of yor controller's VPC. You will need to ensure that the controller has valid internet access. 
This could also be a temporary network failure issue and might resolve by itself



