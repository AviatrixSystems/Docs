.. meta::
  :description: Secure File Transfer to S3 FAQ	
  :keywords: AWS Storage gateway, AWS Transit Gateway, AWS TGW, scp, winscp, secure file copy


=========================================================
Secure File Transfer to AWS S3 FAQ
=========================================================

What is the security exposure when uploading files to AWS S3 over Direct Connect?
--------------------------------------------------------------------------------------

AWS Storage Gateway supports the NFS/SMB file interface, volume interface and tape interface to S3, which is useful 
when you want to use S3 as if it is an NFS or SMB file system. But there are times when the use case is different. 

For example, you like to leverage the high speed AWS Direct Connect to copy files to S3. Since S3 is a public service, the current standard solution is to use public VIF to advertise the entire S3 public address ranges to on-prem. This implies all on-prem users can upload to any S3 bucket, including to their personal S3 buckets on their own personal account. The current solution is described as 
below. 

|s3_public_vif|

Even when you use S3 private Endpoint service, the endpoint is still represented by the public CIDR blocks representing AWS S3 in the region as shown below:

|s3_endpoint|

Another example: Your customers need to send data to AWS S3 buckets but you need to apply control to the activities as to which user and which buckets are available to upload objects. The current solution does not grant access control when using public VIF to advertise the S3 address range. 

Same issue of data leakage occurs if you upload files to S3 over public Internet.  

What is Aviatrix Secure File Transfer to AWS S3?
-----------------------------------------------

Aviatrix Secure File Transfer (SFT) is a tool that allows you to leverage AWS Direct Connect to copy files between on-prem and S3 
while enabling you to control from which S3 buckets and from where the file can be copied. 

|sft_aviatrix|

What are the benefits of Secure File Transfer?
----------------------------------------------------------------------------


The key benefits are:

 1. Transferring files between on-prem and S3 by leveraging Direct Connect without using VGW public VIF. 
 #. The ability for you to have control over the data transfer in and out of any AWS S3 bucket. 


How does SFT work?
--------------------

SFT works by launching an Aviatrix gateway in a VPC that has a private connection to on-prem, for example, over a Direct Connect.


Through SFT, an S3 bucket appears to be a mounted local directory on the Aviatrix gateway with the same
name as the bucket. A VPC endpoint is created to serve S3 so that data object transferring is private within the AWS network and free of charge. File copying from on-prem to the gateway directory is transferred to the S3 bucket. 

With this approach, you can specify policies such as only allowing the VPC endpoint to access S3 buckets. Since only the mounted S3 buckets on an Aviatrix gateway can be used for file transferring, SFT 
effectively locks down which S3 buckets and from where data can be transferred.  

SFT also works in a VPC that connects over the Internet with IPSEC. 


Is there an additional AWS data charge by going through the Aviatrix gateway?
--------------------------------------------------------------------------------

No, there is no data charge by AWS for using SFT. Normally AWS charges data transfer for data traffic leaving a VPC, however in this case, data transfer is through an AWS VPC endpoint to S3 which is free of charge. 

Can SFT be deployed in TGW environment?
-----------------------------------------

Yes. You can deploy SFT in a Spoke VPC in the TGW environment as shown in the diagram below. 

|sft_deployment|


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
