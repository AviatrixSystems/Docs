=======================================
Security FAQs
=======================================

Security Architecture 
=====================

Q. Is everything in the customer's AWS account?  
-----------------------------------------------

Yes, all Aviatrix AMI is deployed in the customer’s private cloud environment.   

Q. Will the controller in Aviatrix and gateway need to reach out to Aviatrix to receive command or send any device information or routing information to Aviatrix?
------------------------------------------------------------------------------------------------------------------------------------------------------------------

No, customer's configuration data is never accessed by Aviatrix. Only the below telemetry data flows back to Aviatrix are: 

- When customer push system log data to our encrypted customer S3 bucket for technical support.  

- When customer login to Aviatrix Controller, the license key is logged and validated to our license server. 

Q. Do we need a controller in each cloud environment like one for AWS, one for Azure?? And if not, how do I do multi-cloud traffic steering, if yes, then is there another web portal somewhere to manage different controllers?   
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

No, you don't. You can launch AWS, Azure, GCP, and OCI Gateways from a single Aviatrix Controller management console. Aviatrix orchestrate your policies to each Gateway nodes for your multi-cloud and datacenter infrastructure. You can manage your own datacenter network with a cloudN hardware gateway appliance. See detail on datacenter to cloud - nextgen transit network https://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html and datacenter extensions docs https://docs.aviatrix.com/HowTos/aviatrix_apis_datacenter_extension.html.  

Configuration Management
========================

Q. How Aviatrix instances are hardened?
----------------------------------------

- User will never login to Aviatrix Controller or Gateway instances. 
- Both root access and SSH access to the Aviatrix instances are not allowed. 
- Both Controller and Gateway instances have hard disk encryption, using Elastic Block Storage (EBS). See detail: https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-controller-ebs-volume and https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html.
- Aviatrix Gateway instance’s security group has an inbound rule that opens to the Controller EIP on port 443
- `How do I secure the Controller access? <https://docs.aviatrix.com/HowTos/FAQ.html#how-do-i-secure-the-controller-access>`_ 



Q. Is Aviatrix implementing custom OS then a software layer secures the OS? How do people login to each gateway device or it is completely managed by the controller portal, there are no root account things in that nature we need to secure? 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Aviatrix is an appliance shipped as a container. The Aviatrix Controller and Gateway EC2 instances are using Ubuntu OS which is maintained specifically for Aviatrix for infrastructure services. All OS patches are managed in the releases. Changes to the OS must go through our full QA process. We recommend customer to upgrade to the latest version on their Aviatrix Controller, there is a pull to upgrades.  

Database Security
=================

Q. Does Aviatrix Controller have a database running?
----------------------------------------------------

Controller instances have a local Mongodb installed in your local account is encrypted using disk encryption.  


.. disqus::
