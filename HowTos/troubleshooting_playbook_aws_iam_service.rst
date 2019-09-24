.. meta::
   :description: 
   :keywords: 

=========================================================================================
AWS IAM Service Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot AWS IAM Service.

Workflow:
---------

1. `Check whether IAM role/policy for AWS Accounts (1) Primary and (2) Secondary are configured properly`_

2. `Check whether InstanceProfileArn has the exact string “instance-profile/aviatrix-role-ec2”`_

3. `Check whether IAM role is attached to Aviatrix Gateway and IAM policy is associated to IAM role properly`_

4. `Check whether trust relationship is not established properly between primary and secondary account`_

5. `Check whether company centrally manages & governs permission/policies across accounts through AWS Organization`_

6. `Refer to other troubleshooting documents`_

7. TODO list download link:

Detail:
-------

Check whether IAM role/policy for AWS Accounts (1) Primary and (2) Secondary are configured properly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  Check Point 1:
  
    Option 1: Check Account Audit Status from Aviatrix Controller 
  
      * https://docs.aviatrix.com/HowTos/account_audit.html

      * Expect to view “Pass” status

      * If the status displays "Pass*” or “Fail”, this AWS account might hit at least one of the Probable Causes as below. 

    Option 2: Check whether AWS IAM role and policy are updated to the latest version from AWS portal
  
      * https://docs.aviatrix.com/HowTos/iam_policies.html

  Probable Causes:

    * Company manages permission through AWS Organization
  
    * AWS IAM is out of sync
  
    * Customized instance profile name
  
    * Outdated IAM policy
  
    * Customized IAM policy
  
    * IAM role does not attach to Controller/Gateway properly
    
    * Trust relationship is not established properly between primary and secondary account

  Suggestions:
  
    * Attempt to address this by following Aviatrix Account Audit's suggestion:
    
      1. Click the button “Check” on the page Accounts -> Account Audit -> Select the Account name which has "Pass*” or “Fail” status
    
      2. Follow the suggestion in the prompted panel
    
      3. Repeat the above steps until all accounts are in “Pass” state
    
    * Refer the below documents
    
      * https://docs.aviatrix.com/HowTos/iam_policies.html

      * https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html

Check whether InstanceProfileArn has the exact string “instance-profile/aviatrix-role-ec2”
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Run Aviatrix Diagnostic report for Controller from Aviatrix Controller
  
    * https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html
  
    * Expect the string “aviatrix-role-ec2” is exactly be named in the report of InstanceProfileArn as below example:
      
      ::
      
        InstanceProfileArn "  \"InstanceProfileArn\" : \"arn:aws:iam::XXXXX:instance-profile/aviatrix-role-ec2\",\n"
  
    * If the string in InstanceProfileArn field is not “aviatrix-role-ec2”, Aviatrix Software might not function the AWS IAM role/policy properly. 

  Check Point 2: Run Aviatrix Diagnostic report for Gateways from Aviatrix Controller
  
    * https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html
  
    * Option 1: 
      
      * Repeat Check Point 1 for all gateways
  
    * Option 2:  
      
      * Expect to view “Passed” status in the field of “GatewayIamRole” as below example:
          
        * "GatewayIamRole": "Passed"
      
      * If the string is not “Passed”, Aviatrix Software might not function the AWS IAM role/policy properly. 

  Probable Causes:
  
    * There is a customized instance profile name which is not "aviatrix-role-ec2"

  Suggestions:
  
    * Users need to clean up the customized instance profile name first.
  
    * Users need to rename the InstanceProfile to “aviatrix-role-ec2”. The customized name might need to be updated in Terraform or CloudFormation script.

Check whether IAM role is attached to Aviatrix Gateway and IAM policy is associated to IAM role properly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Check Aviatrix Gateway Audit Status from Aviatrix Controller
  
    * https://docs.aviatrix.com/HowTos/gateway_audit.html
    
    * Expect to view “Pass” status
    
    * If the status displays “Error(IAM)”, Aviatrix Software might not function the AWS IAM role/policy properly. 
    
  Probable Causes:

    * gateway's aviatrix-role-ec2 is detached from the instance profile

    * aviatrix-role-app does not have associated policy
    
  Suggestions:

    * Toggle IAM role on Aviatrix Gateway
      
      1. Attach “No Role” to Aviatrix Gateway and click the button “Apply" in AWS portal
      
      2. Wait for a few seconds
      
      3. Attach “aviatrix-role-ec2” to Aviatrix Gateway and click the button “Apply" in AWS portal
    
    * Update the Aviatrix IAM role/policy
      
      * https://docs.aviatrix.com/HowTos/iam_policies.html

Check whether trust relationship is not established properly between primary and secondary account
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#establish-trust-relationship-with-primary-account

  Check Point 1: Check the primary account in AWS portal
  
    1. Check the aviatrix-role-app
    
    2. Expect to grant 
        
      1. the primary (Controller) AWS account itself access to the aviatrix-role-app in this primary account

  Check Point 2: Check the secondary account in AWS portal
  
    1. Check your aviatrix-role-app in all the secondary account
    
    2. Expect to grant 
      
      1. the primary (Controller) AWS account access to the aviatrix-role-app in this secondary account
      
      2. the secondary (Gateway) AWS account itself access to the aviatrix-role-app in this secondary account

Check whether company centrally manages & governs permission/policies across accounts through AWS Organization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * https://aws.amazon.com/organizations/

  Check Point 1: Check “Service Control Policies” for “Root” has the right permissions by following the steps below:
  
    1. Go to “AWS Console > AWS Organizations > Organize Account”
    
    2. Click on “Root” on the left panel, followed by a click on “Service Control Policies” on the right panel.
    
    3. Check all attached “Service Control Policies”.

  Check Point 2: Check “Service Controller Policies” for “Organization Unit”  has the right permissions by following the steps below:

    1. Go to “AWS Console > AWS Organizations > Organize Account > Find” 
    
    2. Click on the “Oranization Unit” (which the account belongs to) on the left panel > Click on “Service control policies” on the right panel. 
    
    3. Check all attached “Service Control Policies”.

  Check Point 3: Check “Service Controller Policies” for the account:
  
    1. Go to “AWS Console > AWS Organizations > Account > Find” 
    
    2. Click on the account from the list. Click on “Service Control Policies” on the right panel. 
    
    3. Check all attached “Service Control Policies”.
    
  Expectation:

    * allowing us-west-1 region in your AWS organization policy
    
    * at least the same permission as Aviatrix IAM policy to all attached “Service Control Policies"

  Suggestions:

    * Please update the “Service Control Policies” to the expectation and run the below steps again
    
      * `Check whether IAM role/policy for AWS Accounts (1) Primary and (2) Secondary are configured properly`_

      * `Check whether InstanceProfileArn has the exact string “instance-profile/aviatrix-role-ec2”`_

      * `Check whether IAM role is attached to Aviatrix Gateway and IAM policy is associated to IAM role properly`_

Other troubleshooting documents
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  * https://docs.aviatrix.com/Support/support_center_aws_infrastructure.html#how-can-i-debug-iam-related-issues-iam-debug-playbook




