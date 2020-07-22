.. meta::
  :description: Transfer data from on-prem to S3 using private VIF	
  :keywords: AWS Storage gateway, Secure File Copy, Secure File Transfer, AWS Transit Gateway, AWS TGW, S3, Public VIF


=========================================================
PrivateS3 FAQ
=========================================================

What is the security exposure when uploading files to AWS S3 over Direct Connect?
--------------------------------------------------------------------------------------

If you leverage the high speed AWS Direct Connect to transfer files and objects to/form S3, the current solution is to use public VIF where AWS advertise the entire S3 public address ranges to 
on-prem. This implies that all on-prem users can upload to any S3 bucket, including to their personal S3 buckets on their own personal accounts, leading to confidential data leakage. The current solution is described as below. 

|s3_public_vif|

In the diagram above, there is no VPC involved when using public VIF. Data is directly transferred
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

Aviatrix PrivateS3 is a feature that allows you to leverage AWS Direct Connect to transfer objects and files between on-prem and S3 
while giving you the control of which S3 buckets by the ability to whitelist the S3 buckets. 


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

 1. Customer on-prem resolves all S3 bucket names under management to the private IP address of the Aviatrix created and managed AWS internal NLB.
 #. Configure on the Aviatrix Controller the S3 bucket names that you allow access.
 #. When Aviatrix PrivateS3 gateway receives the packets, it uses its FQDN feature to filter out the un-configured S3 bucket names, thus preventing data leakage.

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

Can Direct Connect termination VPC be in a different region of managed S3 buckets?
---------------------------------------------------------------------------------------

Yes. For example, the Direct Connect private VIF terminates in a VPC in us-west-2 and your S3 buckets are in us-east-1. You should
launch the PrivateS3 gateway in a VPC in us-east-1 and make sure there is private connectivity to this VPC from on-prem.

Can PrivateS3 gateway be in a different region of managed S3 buckets?
----------------------------------------------------------------------

Yes. However in such case you will not be able to leverage the S3 Gateway Endpoint service to route packets to S3 within AWS network. PrivateS3 will forward traffic to public Internet to reach S3 in a different region.

Can PrivateS3 solution scale out?
----------------------------------

Yes. You can launch multiple PrivateS3 gateways in a multi-AZ fashion in a VPC. Aviatrix Controller automatically 
creates and manages AWS internal NLB to load balance the S3 access requests. 

How can I test PrivateS3?
----------------------------

There is a simple method to simulate DNS resolution to the PrivateS3 internal NLB. 

Launch a Linux instance or host, in sudo mode, edit file /etc/hosts. Add S3 bucket FQDN names to this file, as shown in the example below.

|dns_emulation|


How do I troubleshoot PrivateS3?
----------------------------------

PrivateS3 combines FQDN feature and stateful firewall feature. 

 1. Go to Security -> Egress Control -> Egress FQDN Filter. There should be a tag automatically created. Click Edit button to see if the desired S3 bucket name is configured. 
 #. Go to Gateway, select one PrivateS3 gateway, click Edit. Scroll down to Destination NAT to make sure the DNAT rule is configured. 

Does AWS S3 list command work?
-----------------------------------------

Yes. AWS S3 CLI "list" command requires s3.region.amazonaws.com in the bucket rule where region is represented. This is automatically populated 
by the Controller.  


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

.. |dns_emulation| image:: sfc_media/dns_emulation .png
   :scale: 30%

.. disqus::
