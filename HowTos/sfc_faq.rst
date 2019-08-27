.. meta::
  :description: Secure File Copy to S3 FAQ	
  :keywords: AWS Storage gateway, AWS Transit Gateway, AWS TGW, scp, winscp, secure file copy


=========================================================
Secure File Copy to AWS S3 FAQ
=========================================================

What is the security exposure when uploading files to AWS S3?
---------------------------------------------------------------

AWS Storage Gateway supports the NFS/SMB file interface, volume interface and tape interface to S3, which is useful 
when you want to use S3 as if it is an NFS or SMB file system. But there are times when the use case is different. 

For example: Developers like to leverage the Direct Connect to copy files to S3 but you are not sure how to enable them in a secure manner. Since S3 is a public service, you must use public VIF to terminate the Direct Connect. This implies all on-prem users can upload to any S3 bucket. 

Even when you use S3 private Endpoint service, the endpoint is still represented by the public CIDR blocks representing AWS S3 in the region as shown below:

|s3_endpoint|

Another example: Your customers need to send data to AWS S3 buckets but you need to apply control to the activities as to which user and which buckets are available to upload objects.

What is Aviatrix Secure File Copy to AWS S3?
-----------------------------------------------

Aviatrix Secure File Copy (SFC) is a tool that allows your developers to copy files between on-prem and S3 
while enabling you to control from which S3 buckets and from where the file can be copied. 

What are the benefits of Secure File Copy?
----------------------------------------------------------------------------


The key benefit of Secure File Copy (SFC) to AWS S3 is its ability for you to have control over 
the data transfer in and out of AWS S3 bucket. 

If you upload files to S3 over Direct Connect, you have to use Direct Connect Public VIF which 
means you must open your firewall to all AWS public services. An end user can upload to his own
S3 account and bucket, leading to data leakage. 

Same issue of data leakage occurs if you upload files to S3 over public Internet.  

How does SFC work?
--------------------

SFC works by launching an Aviatrix gateway in a VPC that has a private connection to on-prem, for example, over a Direct Connect, as shown below.

|sfc| 

Through SFC, an S3 bucket is mounted as a local directory to the Aviatrix gateway with the same
name as the bucket. A VPC endpoint is created to serve S3 so that data object transferring is private within the AWS network and free of charge. File copying from on-prem to the gateway directory is transferred to the S3 bucket. 

With this approach, you can specify policies such as only allowing the VPC endpoint to access S3 buckets. Since only the mounted S3 buckets on an Aviatrix gateway can be used for file transferring, SFC 
effectively locks down which S3 buckets and from where data can be transferred.  

SFC also works in a VPC that connects over the Internet with IPSEC. 


Is there an additional data charge by going through the Aviatrix gateway?
---------------------------------------------------------------------------

No, there is no data charge by AWS for using SFC. Normally AWS charges data transfer for data traffic leaving a VPC, however in this case, data transfer is through an AWS VPC endpoint to S3 which is free of charge. 


.. |sfc| image:: sfc_media/sfc .png
   :scale: 30%

.. |s3_endpoint| image:: sfc_media/s3_endpoint .png
   :scale: 30%


.. disqus::
