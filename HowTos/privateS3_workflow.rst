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

=================================        ==================
**Setting**                              **Value**
=================================        ==================
Gateway Name                             Select a gateway launched in the previous step
Source CIDR Range                        Enter a list of the on-prem network address range separated by comma. For example, 10.10.0.0/16,10.12.0.0/16
+Add New Bucket                          Click and then enter a FQDN name of the file in S3 bucket. Click Save to save entry. Click +Add New Bucket again to enter another entry. 
Enable                                   If this is the first time, click Enable to enable the feature.   
Update                                   If PrivateS3 has been enabled, use this button to update changes including editing Source CIDR Range, Add New Bucket or Delete existing bucket. 
=================================        ==================

.. important::

  Make sure S3 buckets be in the same region as that of the gateway. For S3 buckets in a different region, launch a gateway in that region and repeat the above step.  

Step 3. Configure on-prem DNS 
---------------------------------

Configure on your DNS server so that all S3 bucket names resolve to the PrivateS3 gateway's private IP address. Note this IP address must be reachable from on-prem either by Direct Connect or VPN over Internet.

Note depending on how application invokes S3 function, for example, by using "wget", "curl", "aws s3", 
or "aws2 s3", the generated FQDN name for the S3 object access may be different. There are 3 formats. 

 1. bucket-name.s3.region.amazonaws.com. Example, business-owner-bucket.s3.us-west-2.amazonaws.com
 #. bucket-name.s3-region.amazonaws.com. Example, business-owner-bucket.s3-us-west-2.amazonaws.com
 #. bucket-name.s3.amazonaws.com. Example, business-owner-bucket.s3.amazonaws.com (apply to us-east-1 region)

.. important::

  Since you may not know which FQDN name format application software invokes, you should enter the first two formats for any region that is not us-east-1. For us-east-1 region, you should enter 3 DNS entries for each bucket to ensure the S3 access is redirected to Aviatrix PrivateS3 gateway. You should follow the same rule when entering the FQDN name in the gateway at `Step 2. <https://docs.aviatrix.com/HowTos/privateS3_workflow.html#step-2-enable-edit-privates3>`_



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
