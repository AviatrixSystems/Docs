*************
Security FAQs
*************

Browse Questions
=================

`Is customer data contained in the customer's AWS account?`_

`Will the controller and gateway need to reach out to Aviatrix environment to receive command or send routing data to Aviatrix?`_

`Do we need a controller in each cloud environment like one AWS, one for Azure, etc. If not, how do I do multi-cloud traffic steering?`_

`How are gateway devices hardened?`_

`Does Aviatrix Controller have a database running?`_

`How does Gateway device communicates/authenticates to controller? And if there is a central command for those controllers how does communication/auth happen there?`_

`Is Aviatrix SOC2 certified?`_

`Is Aviatrix PCI-DSS compliant?`_

`Is Aviatrix HIPAA compliant?`_

`Is Aviatrix FedRamp compliant?`_

`Is Aviatrix software in compliant with Section 508, IT Accessibility Standards?`_

`Is Aviatrix FIPS 140-2 certified?`_

`Can Aviatrix software support GovCloud implementation?`_

`Does Aviatrix Controller and Gateway instances by default supports anti-malware agent?`_

`Is it possible to do OS disk encryption on the aviatrix gateways without taking gateway down?`_

`Can customer create their own custom harden image for the Aviatrix Controller or Gateway instance OS?`_

`Can we install alert logic and tools on the aviatrix gateways for monitoring network traffic and resource consumption?`_

`Can we patch the Aviatrix Controller and Gateway using our Systems Manager agent?`_

`Does Aviatrix implement Secure Coding and Development practice to ensure that the Aviatrix software is not vulnerable to DDOS, SQL Injection and/or Cross Site Scripting Attacks?`_

`Does Aviatrix software support IKEv2?`_

`Does Aviatrix software support role-based access control (RBAC)?`_

`What IAM policy is required to use Aviatrix?`_

`Can I use my company’s SSL Certificate for the Controller and Gateway?`_

`How is the data encrypted during transmission from source Controller to destination Gateway?`_

`Can I access the Controller and Gateway EC2 instances to apply patches?`_

Is customer data contained in the customer's AWS account?
---------------------------------------------------------

Yes, all Aviatrix AMI is deployed in the customer’s private cloud environment.

Will the controller and gateway need to reach out to Aviatrix environment to receive command or send routing data to Aviatrix? 
---------------------------------------------------------------------------------------------------------------------------------------

No, customer's configuration data is never accessed by Aviatrix. The only time Aviatrix receives information from customer is for:  

  * When customer push log data to our encrypted customer S3 bucket for technical support.
  
  * For customers using BYOL license, the license activity (acquisition and retiring a license) is validated to the Aviatrix license server.  

Do we need a controller in each cloud environment like one AWS, one for Azure, etc. If not, how do I do multi-cloud traffic steering?  
---------------------------------------------------------------------------------------------------------------------------------------

No, you don’t. One Aviatrix Controller manages cloud deployment in AWS, Azure, GCP, and OCI. Aviatrix Controller launches gateways in each cloud and orchestrates your policies to build network segmentation and secure connectivity.

How are gateway devices hardened?
---------------------------------

Aviatrix gateways are virtual machines in the cloud launched from the Controller.  

  * User cannot login to Aviatrix Controller or Gateway instances, as the Controller SSH access is disabled. 
  
  * User cannot login to the Aviatrix gateway as the SSH access is disabled. 
  
  * Both Controller and Gateway instances have hard disk encryption, using Elastic Block Storage (EBS). See detail: https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-controller-ebs-volume and https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html. 
  
  * Aviatrix Gateway instance’s security group inbound rule only opens to the Controller EIP on port 443. See additional detail here `How do I secure the Controller access? <https://docs.aviatrix.com/HowTos/FAQ.html#how-do-i-secure-the-controller-access>`_
  
Is Aviatrix implementing custom OS then a software layer secures the OS? How do people login to each gateway device or it is completely managed by the controller portal, there are no root account things in that nature we need to secure?
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

The Aviatrix Controller and Gateway EC2 instances are using Ubuntu OS which is maintained specifically for Aviatrix for infrastructure services. All OS patches are managed in the releases. Changes to the OS must go through our full QA process. We recommend customer to upgrade to the latest version on their Aviatrix Controller

Does Aviatrix Controller have a database running?
-------------------------------------------------

Controller instances have a local MongoDB installed. The instance is encrypted using disk encryption.

How does Gateway device communicates/authenticates to controller? And if there is a central command for those controllers how does communication/auth happen there?  
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

Controllers send messages to your SQS or via HTTPS to the Gateway. Gateway pull messages from SQS.   

Is Aviatrix SOC2 certified?
---------------------------

Yes, Aviatrix is SOC2 Type 1 certified and SOC2 Type 2 is target for Aug 2020. 

Is Aviatrix PCI-DSS compliant?  
------------------------------

Aviatrix is not in-scope for PCI-DSS compliant. We do not process credit card information nor do we have access to the customer’s data. Aviatrix software is deployed in the customer’s private network.

Is Aviatrix HIPAA compliant?
------------------------------

Aviatrix is not in-scope for HIPAA compliant. We do not process PHI/ePHI nor do we have access to the customer’s data. Aviatrix software is deployed in the customer’s private network. Internally, the company hires Third Party Administrator (TPA) for HR benefit services. We collect the business associate agreement for TPAs.   

Is Aviatrix FedRamp compliant?
------------------------------

Aviatrix is not in-scope for FedRamp compliance because it is not a SaaS product and Aviatrix software is installed in the federal network. However, Aviatrix is currently certified for SOC2 and we are also working on additional readiness for other frameworks such as NIST 800-171, ISO 27002, HIPAA and PCI.

Is Aviatrix software in compliant with Section 508, IT Accessibility Standards?
-------------------------------------------------------------------------------

Aviatrix covers Level A ready under the VPAT (Voluntary Product Accessibility Template) standards.   

Is Aviatrix FIPS 140-2 certified?  
---------------------------------

Yes. https://docs.aviatrix.com/HowTos/fips140-2.html  

Can Aviatrix software support GovCloud implementation?   
------------------------------------------------------

Yes. We support GovCloud AWS infrastructure.    

Does Aviatrix Controller and Gateway instances by default supports anti-malware agent?  
--------------------------------------------------------------------------------------

Because Aviatrix is an appliance, we do not allow customer SSH access to install anti-malware software in the instance. Aviatrix controller and gateway instances are protected with hard disk encryption using Elastic Block Storage (EBS). Customers update the Aviatrix software only from the Controller web management console.  

Is it possible to do OS disk encryption on the aviatrix gateways without taking gateway down?  
---------------------------------------------------------------------------------------------

No, customers are not allowed to add additional software code in Aviatrix gateway instance. The instance is implemented with hard disk encryption equivalent using Elastic Block Store (EBS) encryption.  Below are additional details for this technology.  

  * https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html   
  
  * https://docs.aviatrix.com/HowTos/encrypt_ebs_volume.html  
  
  * https://docs.aviatrix.com/HowTos/encrypt_ebs_volume.html#how-to-encrypt-gateway-ebs-volume-via-aviatrix-controller 
  
Can customer create their own custom harden image for the Aviatrix Controller or Gateway instance OS?
-----------------------------------------------------------------------------------------------------

Unfortunately, we are an appliance, delivered in a "software" container. The instances are not accessible and is Elastic Block Store (EBS) encryption is implemented.

Can we install alert logic and tools on the aviatrix gateways for monitoring network traffic and resource consumption? 
----------------------------------------------------------------------------------------------------------------------

No, however, we support integrations to top SIEM platforms for your internal Threat/SOC operations. In your Aviatrix Controller management console, go to Settings > Logging. You will have options to send system logs to one of the below options.   

  * Remote syslog (recommended to use)  

  * AWS CloudWatch  

  * Splunk Enterprise  

  * Datadog  

  * Elastic Filebeat  

  * Sumo Logic  

  * Netflow  

Below is a link for more detail for this control: https://docs.aviatrix.com/HowTos/AviatrixLogging.html  

Can we patch the Aviatrix Controller and Gateway using our Systems Manager agent?
---------------------------------------------------------------------------------

Our instances are appliances. The EC2 instances are managed by Aviatrix. To patch Aviatrix Controller and Gateway, customer needs to log into their Controller management console and update to the latest Aviatrix upgrade version. We do not permit access into the appliance for OS update or any agent installation.  

Does Aviatrix implement Secure Coding and Development practice to ensure that the Aviatrix software is not vulnerable to DDOS, SQL Injection and/or Cross Site Scripting Attacks?
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Aviatrix security measures for SDLC includes access, change, vulnerability, threat intelligence and risk management safeguards. To ensure we protect our software code from known attacks like CSS, SQL Injection it DDOS, we run vulnerability scans prior to each release to detect them for mitigation. We also work closely with security researchers to detect zero days threats and annually, we work with Coalfire to review perform source code review and independent penetration testing.  

Does Aviatrix software support IKEv2?
--------------------------------------

IKEv2 is supported for site2cloud. IKEv2 for transit is in our roadmap. 

Does Aviatrix software support role-based access control (RBAC)? 
----------------------------------------------------------------

Yes, RBAC in Aviatrix Controller web application is available in version 5.4. The default role available is admin and read_only out of the box. Customer can add more permission group in the Aviatrix Controller console under Account > Permission Group.  All user is assigned to a RBAC Group. Each group can have many permissions. See detail here: https://docs.aviatrix.com/HowTos/rbac_faq.html

|security_rbac_1|

|security_rbac_2|

What IAM policy is required to use Aviatrix?  
--------------------------------------------

Since Aviatrix is an appliance deployed in your AWS account, you will create your AWS IAM Policy. When you launch Aviatrix, some services will deploy IAM Policy to operate the service, however, it is the customer’s responsibility to edit the policy to your internal policy. Here is a link to the IAM policy for each template. When you edit the policy, we recommend you perform internal testing. 

See detail IAM Policy used for Aviatrix: https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html?highlight=iam%20policy#iam-policies-required-for-aviatrix-use-cases 

See sample on how to edit your IAM Policy for Aviatrix: https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html 

Can I use my company’s SSL Certificate for the Controller and Gateway? 
----------------------------------------------------------------------

Yes, you can. To implement the SSL Certificate for your controller, go to Setting > Advanced > Security sub tab. 

|security_bulletin_faq_certificate|

SSL verification check is not enabled by default. Customer should enable.

How is the data encrypted during transmission from source Controller to destination Gateway? 
--------------------------------------------------------------------------------------------

By default, the data transfer is on TCP over TLSv1.2 for encryption. Customers have the option downgrade due to internal dependency conflicts. You can configure this in Aviatrix Controller by clicking on Settings > Advanced > Security. It is under TLS Versions Support section. 

|security_bulletin_faq_encrypted_transmission|

Can I access the Controller and Gateway EC2 instances to apply patches?  
-----------------------------------------------------------------------

Aviatrix is an appliance and we do not provide SSH access to our appliance for Controller or Gateway. Customer should apply their security patches from the Aviatrix Controller management console in 2 areas: 

  - Click on Settings > Maintenance > Security Patches tab. If the customer is on version 5.1 or above, they should be able to apply the patch. 
  
  - Click on Settings > Maintenance > Upgrade tab. We recommend customer to be on the latest upgrade version to get the latest security fixes 

Our security patches and fixes come in both methods. Customer should test and apply them according to their patch policy. 

.. |security_rbac_1| image:: security_bulletin_media/security_bulletin_faq_rbac_1.png

.. |security_rbac_2| image:: security_bulletin_media/security_bulletin_faq_rbac_2.png

.. |security_bulletin_faq_certificate| image:: security_bulletin_media/security_bulletin_faq_certificate.png

.. |security_bulletin_faq_encrypted_transmission| image:: security_bulletin_media/security_bulletin_faq_encrypted_transmission.png	

.. disqus::
