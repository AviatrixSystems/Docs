.. meta::
  :description: Transfer data from on-prem to S3 using private VIF	
  :keywords: AWS Storage gateway, Secure File Copy, Secure File Transfer, AWS Transit Gateway, AWS TGW, S3, Public VIF


=========================================================
PrivateS3 Workflow
=========================================================

Step 1. Launch an Aviatrix Gateway
-------------------------------------

Go to Gateway -> New Gateway to launch a gateway. Specify the Gateway Name, Access Account Name, Region, VPC ID, 
Public Subnet and Gateway Size. Leave all other fields as default. 


Step 2. Enable/Edit PrivateS3
----------------------------------

.. tip::

  If you don't see the gateway just launched, refresh the browser. 

Each AWS S3 bucket has a unique FQDN name. For example, if a full URL to access a file in S3 is https://avx-backup.s3-us-west-2.amazonaws.com/init.txt, then the bucket's FQDN name is either avx-backup.s3-us-west-2.amazonaws.com or avx-backup.s3.us-west-2.amazonaws.com. 

===================================        ==================
**Setting**                                **Value**
===================================        ==================
Gateway Name                               Select a gateway launched in the previous step
Source CIDR Range                          Enter a summary list of the on-prem network address range separated by comma. For example, 10.10.0.0/16,10.12.0.0/16. Note this list should be a simple super set of your on-prem network CIDR range. It does not need to be precise. 
S3 Bucket FQDN Name Resolution IP          This is a display field. It displays the AWS internal NLB private IP address created by the Controller AFTER you complete this step oof attaching the bucket URL to the FIRST gateway. It will take sometime while the NLB is created. If you are repeating this step for additional gateways, the NLB IP should be autopopulated when you choose the first gateway that the URL was attached to. Use the displayed IP address for your on-prem DNS configuration in the next step. 
+Add New Bucket                            Click and then enter a FQDN name of the file in S3 bucket. Click Save to save entry. Click +Add New Bucket again to enter another entry. 
Enable                                     If this is the first time, click Enable to enable the feature.   
Update                                     If PrivateS3 has been enabled, use this button to update changes including editing Source CIDR Range, Add New Bucket or Delete existing bucket. 
===================================        ==================


Step 3. Create on-prem DNS Private Zone
---------------------------------------------

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

Step 4. Adding additional Gateways
----------------------------------------

When you want to scale-out and add more Gateways to the pool, follow these steps

 1. Deploy a new Gateway in a subnet in the same VPC by navigating to Gateway -> New Gateway. Specify the Gateway Name, Access Account Name, Region, VPC ID, Public Subnet and Gateway Size. Leave all other fields as default.
 #. Navigate to Security -> Private S3
 #. Choose the initially deployed Gateway from the drop down menu under 'Gateway name'
 #. Following fields will be automatically populate based on the earlier deployed Gateway in the same VPC: Source CIDR Range, S3 Bucket FQDN Name Resolution IP, NLB DNS, S3 Bucket Name
 #. Click on Attach, which will add this new Gateway as a Target in the correct Target Group for the NLB created.

This completes the configuration needed to add a new Gateway to the pool.

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
