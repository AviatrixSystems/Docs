.. meta::
  :description: Transfer data from on-prem to S3 using private VIF	
  :keywords: AWS Storage gateway, Secure File Copy, Secure File Transfer, AWS Transit Gateway, AWS TGW, S3, Public VIF


=========================================================
PrivateS3 Workflow
=========================================================

Below is the workflow for PrivateS3. To learn more about PrivateS3, check out `PrivateS3 FAQ. <https://docs.aviatrix.com/HowTos/sfc_faq.html>`_. 

Step 1. Launch an Aviatrix Gateway
-------------------------------------

Go to Gateway -> New Gateway to launch an Aviatrix gateway. Specify the Gateway Name, Access Account Name, Region, VPC ID, 
Public Subnet and Gateway Size. Leave all other fields as default. 

Select the region where you want the S3 buckets to be explicitly allowed or denied access through PrivateS3. 

Step 2. Create Access Accounts
--------------------------------

PrivateS3  automatically scans the S3 buckets owned by the `Access Accounts. <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_. 
Create one Access Account if you have not done so. 


Step 3. Enable/Update PrivateS3
----------------------------------

.. tip::

  If you don't see the gateway just launched, refresh the browser. 

Each AWS S3 bucket has a unique FQDN name. For example, if a full URL to access a file in S3 is https://avx-backup.s3-us-west-2.amazonaws.com/init.txt, then the bucket's FQDN name is either avx-backup.s3-us-west-2.amazonaws.com or avx-backup.s3.us-west-2.amazonaws.com. 

===================================        ==================
**Setting**                                **Value**
===================================        ==================
Gateway Name                               Select a gateway launched in the previous step for PrivateS3 service.
Source CIDR Range                          This field represents a scope of on-prem network address range, it is used to check if PrivateS3 filtering function should be applied for a given packet source IP address. This address range does not need to be precise. Enter a summary list of the on-prem network address range separated by comma. For example, 10.0.0.0/8. 
Access Accounts                            You can select multiple accounts and move them to the right panel. The Controller scans S3 of the selected accounts every 30 minutes to discover any new S3 buckets.
===================================        ==================

Click Enable. If PrivateS3 has been enabled, use this Step to update changes in Source CIDR Range or Access Accounts.

Once PrivateS3 is enabled, Controller creates an AWS NLB and attach the PrivateS3 gateway to it. The NLB serves as load balancer to forward 
S3 HTTPS request to the gateways. 

Once PrivateS3 is enabled, you can go to Step 1 to create more Aviatrix gateways in the same VPC and attach it to the NLB. 

Once PrivateS3 is enabled on the selected accounts, the Controller scans every 30 minutes S3 buckets of the selected accounts in the region where Aviatrix PrivateS3 gateway is deployed.

When new S3 buckets are discovered, an email will be sent to the Controller admin. Admin should login to the Controller, go to Security -> PrivateS3 -> Step 4 to take actions on the new buckets. The actions are either Allow or Deny.

Step 4. Update S3 Bucket Policy 
---------------------------------------

Filter on S3 buckets with policy New. Change it to either Allow or Deny.  

You can change all buckets to Allow All or Deny All. 



Step 5 View/Delete PrivateS3
--------------------------------

When PrivateS3 is enabled, Aviatrix Controller creates an AWS Network Load Balancer (NLB) and attaches Aviatrix gateway to it. More Aviatrix 
gateways can be launched and attached to this NLB. The NLB front ends the pool of Aviatrix gateways and distributes S3 related HTTPS
requests to the attached gateways.  

The View displays relevant data for troubleshooting and visibility. 

===================================        ==================
**Setting**                                **Value**
===================================        ==================
PrivateS3 NLB Name                         AWS NLB created by Aviatrix Controller when PrivateS3 is enabled. 
NLB Status                                 The status of the NLB created Aviatrix Controller.
PrivateS3                                  true/false to indicate if PrivateS3 is enabled or not. 
Region                                     AWS region where PrivateS3 gateways are launched. 
PrivateS3 DNS Name Resolution IP           This filed displays the AWS internal NLB private IP address created by the Controller AFTER you complete this step of attaching the bucket URL to the FIRST gateway. It will take sometime while the NLB is created. If you are repeating this step for additional gateways, the NLB IP should be autopopulated when you choose the first gateway that the URL was attached to. Use the displayed IP address for your on-prem DNS configuration in the next step.
PrivateS3 DNS Name                         This field displays the DNS name of the NLB created by Aviatrix Controller for PrivateS3 function.
===================================        ==================


Additional Configuration 1:  Create on-prem DNS Private Zone
--------------------------------------------------------------

Create a private zone on your on-prem DNS server so that all S3 bucket names  
resolve to the PrivateS3 private IP address displayed from Step 2 in the field "S3 Bucket FQDN Name Resolution IP". 
Note this IP address must be reachable from on-prem either by Direct Connect or VPN over Internet.


Note depending on how application invokes S3 function, for example, by using "wget", "curl", "aws s3", 
or "aws2 s3", the generated FQDN name for the S3 object access may be different. There are 3 formats. 

 1. bucket-name.s3.region.amazonaws.com. Example, business-owner-bucket.s3.us-west-2.amazonaws.com
 #. bucket-name.s3-region.amazonaws.com. Example, business-owner-bucket.s3-us-west-2.amazonaws.com
 #. bucket-name.s3.amazonaws.com. Example, business-owner-bucket.s3.amazonaws.com (apply to us-east-1 region)

You may need to create a private zone for each region and domain name format. For example, 
create a zone with domain name s3.us-west-2.amazonaws.com, another zone with domain name s3-us-west-2.amazonaws.com.

.. tip::

  Use DNS wildcard for record. For example, use *.s3.us-west-2.amazonaws.com that resolves to an A record that is the private IP address of the PrivateS3 internal NLB.

Additional Configuration 2: S3 endpoint
-------------------------------------------------

PrivateS3 does not require a S3 endpoint, however, S3 endpoint in the VPC where PrivateS3 gateways are deployed 
helps forwarding traffic to S3 services without
routing through the Internet. Configuring S3 endpoint is outside the scope of the PrivateS3 workflow. Login to AWS Console to create S3 endpoint. 

Adding More PrivateS3  Gateways
---------------------------------------------------------------

When you want to scale-out and add more Gateways to the pool, follow these steps

 1. Deploy a new Gateway in a subnet in the same VPC by navigating to Gateway -> New Gateway. Specify the Gateway Name, Access Account Name, Region, VPC ID, Public Subnet and Gateway Size. Leave all other fields as default.
 #. Navigate to Security -> Private S3
 #. Choose the initially deployed Gateway from the drop down menu under 'Gateway name'
 #. Following fields will be automatically populate based on the earlier deployed Gateway in the same VPC: Source CIDR Range, S3 Bucket FQDN Name Resolution IP, NLB DNS, S3 Bucket Name
 #. Click on Attach, which will add this new Gateway as a Target in the correct Target Group for the NLB created.

This completes the configuration needed to add a new Gateway to the pool.

Additional Read
---------------

Additional read can be found in this short blog, `Secure, Cost Effective and Private S3 access via PrivateLink for Partners with Visibility and Troubleshooting Tools <https://community.aviatrix.com/t/60hz6nx/secure-cost-effective-and-private-s3-access-via-privatelink-for-partners-with-visibility-and-troubleshooting-tools>`_. 

.. |sfc| image:: sfc_media/sfc .png
   :scale: 30%

.. |s3_endpoint| image:: sfc_media/s3_endpoint .png
   :scale: 30%

.. |sft_deployment| image:: sfc_media/sft_deployment .png
   :scale: 30%

.. |sft_aviatrix| image:: sfc_media/sft_aviatrix .png
   :scale: 30%

.. |s3_public_vif| image:: sfc_media/s3_public_vif .png
   :scale: 30%

.. disqus::
