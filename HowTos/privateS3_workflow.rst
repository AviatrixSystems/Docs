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

AWS S3 bucket name is a unique FQDN name. For example, if a full URL to access a file in S3 is https://avx-backup.s3-us-west-2.amazonaws.com/init.txt, then the bucket avx-backup is its FQDN name. 

=================================        ==================
**Setting**                              **Value**
=================================        ==================
Gateway Name                             Select a gateway launched in the previous step
Source CIDR Range                        Enter a list of the on-prem network address range separated by comma. For example, 10.10.0.0/16,10.12.0.0/16
+Add New Bucket                          Click and then enter the S3 bucket name. Click Save to save entry. Click +Add New Bucket again to enter another entry. 
Enable                                   If this is the first time, click Enable to enable the feature.   
Update                                   If PrivatS3 has been enabled, use this button to update changes including editing Source CIDR Range, Add New Bucket or Delete existing bucket. 
=================================        ==================


Step 3. Configure on-prem DNS 
---------------------------------

Configure on your DNS server so that all S3 bucket names resolve to the PrivateS3 gateway's private IP address. Note this IP address must be reachable from on-prem either by Direct Connect or VPN over Internet.


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
