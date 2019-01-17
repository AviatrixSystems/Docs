.. meta::
  :description: Secure File Copy FAQ	
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ


=========================================================
Secure File Copy FAQ
=========================================================

What is Secure File Copy?
---------------------------

AWS Storage Gateway supports the NFS/SMB file interface with S3, it is useful when you want to use S3 as if
it is a NFS or SMB file systems. But there are times the use case is different. 

For example. Developers like to leverage the Direct Connect to copy files to S3 but you are not sure how to enable them in a secure manner. Since S3 is a public service, you must use public VIF to terminate the Direct Connect, this implies all on-prem users can upload to any S3 buckets. 

Another example. Your customers need to send data to AWS S3 buckets but you need to apply control to the activities as to which user and which buckets are available to upload objects.

Aviatrix Secure File Copy is a tool that allows your developers to copy files between on-prem  
while enabling you to control which S3 buckets and from where the file can be copied. 

What are the benefits of Secure File Copy?
----------------------------------------------------------------------------


The key benefit of Secure File Copy (SFC) is its ability for you to have control over 
the data transfer in and out of AWS S3 bucket. 

If you upload files to S3 over Direct Connect, you have to use Direct Connect Public VIF which 
means you must open your firewall to all AWS public services. An end user can upload to his own
S3 account and bucket, leading to data leakage. 

Same issue of data leakage occurs if you upload files to S3 over public Internet.  

How does SFC work?
--------------------

SFC works by launch an Aviatrix gateway in a VPC that has private connection to on-prem, for example, over a Direct Connect, as shown below.

|sfc| 

Through SFC, an S3 bucket is mounted as a local directory to the Aviatrix gateway with the same
name as the bucket. An VPC endpoint is created to serve S3 so that data objects transferring is private within the AWS network and free of charge. File copying from on-prem to the gateway directory is transferred to the S3 bucket. 

With this approach, you can specify policies such as only allowing the VPC endpoint to access S3 buckets. Since only the mounted S3 buckets on Aviatrix gateway can be used for file transferring, SFC 
effectively locks down which S3 buckets and from where data can be transferred.  

SFC also works in a VPC that connects over Internet with IPSEC. 


Is there additional data charge by going through the Aviatrix gateway?
------------------------------------------------------------------------

No, there is no data charge by AWS using SFC. Normally AWS charges data transfer for data traffic leaving a VPC, however in this case, data transfer is through AWS VPC endpoint to S3 which is free of charge. 


How to setup SFC with preview release?
----------------------------------------

Here are the steps for setting up SFC in a preview release.

 1. Custom upgrade to 4.1-sfc-preview.
 #. At the Aviatrix Controller console, create an AWS account with access key and secret key (NOT with IAM roles.)
 #. Launch an Aviatrix gateway in this account in a VPC.
 #. Go to AWS console VPC page to create a VPC endpoint for S3 with the VPC where the gateway was launched.  
 #. At the Aviatrix Controller Console, go to Useful Tools -> Secure File Copy. Select the gateway name and enter the name of the S3 bucket where you need to transfer file to. Leave all other options alone and click OK. 
 #. Open the security group inbound rules of the gateway instance from AWS Console to allow TCP port 22 from the on-prem network address range. 
 #. Upload a file by using the scp commands with the following syntax. (Ask Aviatrix team for the private key.)

::
  
  scp -i guest_private_key.pem file_to_be_uploaded guest@gateway_private_ip_address:/home/guest/bucket_name/.

What are the known limitations of the preview release?
------------------------------------------------------

 1. Only one bucket, one private key and one user "guest" is supported. 
 #. If you stop and start the gateway, the mount point cannot be preserved. You need to delete the bucket and create again. 
 #. IAM roles are not supported.

What to expect in the future official release?
------------------------------------------------

We expect all limitations stated above to be removed when this feature is officially released. 

.. |sfc| image:: sfc_media/sfc .png
   :scale: 30%


.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
