.. meta::
  :description: Transfer data from on-prem to S3 using private VIF	
  :keywords: AWS Storage gateway, Secure File Copy, Secure File Transfer, AWS Transit Gateway, AWS TGW, S3, Public VIF


=========================================================
PrivateS3 FAQ
=========================================================

What is the security exposure when uploading files to AWS S3 over Direct Connect?
--------------------------------------------------------------------------------------

If you like to leverage the high speed AWS Direct Connect to transfer files and objects to/form S3, the current solution is to use public VIF where AWS advertise the entire S3 public address ranges to 
on-prem. This implies all on-prem users can upload to any S3 bucket, including to their personal S3 buckets on their own personal accounts, leading to confidential data leakage. The current solution is described as below. 

|s3_public_vif|

In the diagram above, there is no VPC involved when Using public VIF. Data is directly transferred
to and from S3 riding on the Direct Connect link.  

In another scenario where an instance in a VPC trying to access S3 buckets, you can specify an S3 private Endpoint. The advantage is such that packets do not get routed over Internet and instead packets
are routed to S3 via AWS network. However, 
the endpoint is still represented by the public CIDR blocks representing AWS S3 in the region as shown below, in another words, someone with the valid credential to access the S3 Endpoint can transfer 
objects to his/her own S3 buckets. 

|s3_endpoint|

Note there is Endpoint policy but it controls who can use the Endpoint service, it does not control which destination S3 bucket the request can be granted. 

Same issue of data leakage occurs if you upload files to S3 over public Internet.  

What is Aviatrix PrivateS3?
-----------------------------------------------

Aviatrix PrivateS3 is a feature that allows you to leverage AWS Direct Connect to copy files between on-prem and S3 
while enabling you to control from which S3 buckets by whitelisting the S3 buckets. 

|sft_aviatrix|

What are the benefits of PrivateS3?
----------------------------------------------------------------------------


The key benefits are:

 1. Transferring objects/data between on-prem and S3 by leveraging Direct Connect without using public VIF. 
 #. The ability to control which S3 buckets can be accessed. 
 #. The ability to deploy multiple Aviatrix gateways to load balancing the data traffic.


How does PrivateS3 work?
--------------------------

PrivateS3 combines a few elements to make it work. 

 1. Customer on-prem resolves all S3 bucket names under management to the private IP address of the gateway (or AWS internal NLB)
 #. Configure S3 bucket names on the Aviatrix Controller Console. 
 #. When Aviatrix PrivateS3 gateway receives the packets, it uses its FQDN feature to filter out the un-configured S3 bucket access. 

How to deploy PrivateS3?
--------------------------

Follow the `PrivateS3 Workflow <https://docs.aviatrix.com/HowTos/privateS3_workflow.html>`_ for deployment. 

Can PrivateS3 work for traffic initiated from a VPC?
-------------------------------------------------------

PrivateS3 is optimized for managing S3 access from on-prem. For traffic initiated from VPC, use `Aviatrix FQDN feature <https://docs.aviatrix.com/HowTos/fqdn_faq.html>`_ for not only S3 access control but also all Internet bound egress control. 


Is there an additional AWS data charge by going through the Aviatrix gateway?
--------------------------------------------------------------------------------

No, there is no data charge by AWS for using PrivateS3. Normally AWS charges data transfer for data traffic leaving a VPC, however in this case, data transfer is through an AWS VPC endpoint to S3 which is free of charge. 

Can PrivateS3 be deployed in TGW environment?
------------------------------------------------

Yes. You can deploy PrivateS3 in a Spoke VPC in the TGW environment as shown in the diagram below. 

|sft_deployment|

Can PrivateS3 gateway filter S3 buckets in a different region?
---------------------------------------------------------------

No. Each PrivateS3 gateway can only filter S3 buckets in the region the gateway is deployed. 

Can PrivateS3 solution scale out?
----------------------------------

The scale out PrivateS3 is not available in 5.3. It will be available in the future release. 




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
