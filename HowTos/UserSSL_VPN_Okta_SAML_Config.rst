.. meta::
   :description: Aviatrix User SSL VPN Okta SAML Configuration
   :keywords: Okta, SAML, user vpn, okta saml, Aviatrix

=====================================
User SSL VPN Okta SAML Configuration
=====================================
=====================================


1.  Overview
------------

Aviatrix is a next generation cloud networking solution built from the ground up for the public cloud.
It simplifies the way you enable site to cloud, user to cloud, and cloud to cloud secure connectivity
and access. The Aviatrix solution requires no new hardware and deploys in minutes.

The Aviatrix solution comprise of two components – Aviatrix Gateway and a Controller.

This start up guide provides step by step instructions on how to deploy the Aviatrix Controller.
Once the controller is deployed then you can deploy Aviatrix Gateways to connect your users to your
VPC, VPC to VPC or sites to VPC.

1.1 Aviatrix Features
----------------------

Aviatrix is a scale out VPC peering solution for AWS, Azure and Google Cloud. It offers encrypted
peering across regions and clouds and remote access to VPC from any device running OpenVPN clients.
Aviatrix Gateways offer the following functionality for your cloud:

- Complete replacement for Jump Hosts or Bastion stations to SSH into VPCs – convenience for developers that security teams would approve and is a cloud best practice.
-	VPC Isolation and VPC internetworking– Expand to multiple VPCs, regulate access to VPCs and connect them securely with Private IPs addresses.
-	Encrypted VPC peering across AWS regions and AZs and to Azure VNETs or branch offices – a full mesh encrypted Hybrid Cloud.
-	Geo Aware SSL VPN solution that connects users securely to the nearest VPCs with support for latest SSL ciphers and MFA with Duo, Okta, Google and AD/LDAP.
-	Scale Out solution integrated with ELB and all cloud native services – AWS S3, SQS, SNS, R53, CloudTrail.
-	Ease of deployment making it simple to onboard users or environments with overlapping CIDRs.
-	Access and Event logging for audit and compliance support – log forwarding to Splunk, Logstash and Sumo Logic.
- 	IAM and Billing Management, Notifications and Triggers across AWS and Azure accounts.
- 	Guarantees higher network uptime with high availability with failover.

2. Pre-Deployment Checklist
-----------------------------
Before configuring the SAML integration between Aviatrix and Okta, make sure the following is completed.

Pre Installation Check List

	1.	Aviatrix Controller is setup and running.
	2.	Have a valid Okta account with admin access.
	3.	Download and install the Aviatrix SAML client These prerequisites are explained in detail below.


2.1 Aviatrix Controller
------------------------

If you haven’t already deployed the Aviatrix controller, follow the below instructions on how to deploy the Aviatrix controller.
`Instructions here.  <http://docs.aviatrix.com>`_

2.2 Okta Account
----------------

A valid Okta account with admin access is required to configure the integration. If you don’t already have an Okta account, 
please create one with the following link from Okta.
`Okta create account <https://www.okta.com/start-with-okta/>`_

2.3 Aviatrix SAML Client
------------------------

All users must use the Aviatrix SAML client to connect to the system.  Download the client for your OS 
`here. <http://docs.aviatrix.com/Downloads/samlclient.html>`_

For Linux users, do this:::

  tar -xvzf AVPNC_linux.tar.gz; 
  cd AVPNC_setup; 
  ./install.sh 
  
to install type AVPNC in the terminal to run.

3. Configuration
----------------

The integration configuration consists of 4 parts.

	1.	Create an Okta SAML App for Aviatrix
	2.	Retrieve OKta IDP metadata
	3.	Launch Aviatrix Gateway
	4.	Create Aviatrix SAML SP

Please complete the configuration in the following order.

3.1 Create an Okta SAML App for Aviatrix
-----------------------------------------

This step is usually done by the Okta Admin.

	1.	Login to the Okta Admin portal
	2.	Click “Admin”
	3.	Click “Applications”
	4.	Click “Add Application”
	5.	Click “Create New App”
	
		a.	Platform = Web
		b.	Sign on method = SAML 2.0

|image0|
	
	6.	General Settings
	
		a.	App Name = Aviatrix Dev (arbitrary)

|image1|

	7.  SAML Settings
		a.	Single sign on URL* = https://aviatrix_controller_ip/flask/saml/sso/aviatrix_username
		b.	Audience URI* = https://aviatrix_controller_ip/flask/saml/sso/aviatrix_username
		c.	Default RelayState* = https://aviatrix_controller_ip/flask/saml/sso/aviatrix_username
		d.	Name ID format = Unspecified
		e.	Application username = Okta username
		
		|image2|
		
		The aviatrix_controller_ip is the public IP address of the Aviatrix controller. The aviatrix_username
		is an arbitrary identifier. Note this value as it will be needed when configuring SAML from the Aviatrix controller. 
		Please contact your Aviatrix admin if you do not have the Aviatrix controller’s public IP address.
		
		f.	Attribute Statements
		
			i.	FirstName -> Unspecified -> user:firstName
			ii.	LastName -> Unspecified -> user:lastName
			iii.	Email -> Unspecified -> user:email

|image3|		
			
	8.  Done		
	
	
3.2  Retrieve Okta IDP metadata
--------------------------------
This step is usually completed by the Okta admin.

After the above application is created, click on “Sign On” and then “View Setup Instructions”.

|image4|

Look for the section titled “IDP metadata to your SP provider”.

|image5|
Note this information. This information will be used to configure the SAML configuration on the Aviatrix controller.

3.3	Launch Aviatrix Gateway
-----------------------------

This step is usually completed by the Aviatrix admin.

	1.	Login to the Aviatrix controller
	2.	Click Gateway -> Add New
	3.	Select the appropriate Account, region, vpc, subnet and gateway size
	4.	Check “VPN Access” and then “Enable SAML”

	|image6|
	
	5.	Default settings for everything else.
	
	6.	Click “OK” to launch the gateway.
	
	
3.4	Create Aviatrix SAML SP
-------------------------------

This step is usually completed by the Aviatrix admin.

1.	Login to the Aviatrix Controller
2.	Click OpenVPN -> VPN Users -> Add New
3.	Select the VPC where the above gateway was launched
4.	Username = aviatrix_username (this is the username that you choose during the Okta SAML configuration)
5.	User Email = any valid email address (this is where the cert file will be sent
6.	IPD Metadata type = Text
7.	IDP Metadata Text = paste in the IDP metadata from the Okta configuration
8.	Entity ID = Hostname

|image7|

9.  Done
	


4	Appendix –Support
-------------------------

Standard: 8x5 Enterprise Phone Support, email support, product-specific knowledge-base and user forum is included. For Additional levels of support and support offers please visit:

http://www.aviatrix.com/support


	
.. |image0| image:: SSL_VPN_Okta_SAML_media/image0.png

.. |image1| image:: SSL_VPN_Okta_SAML_media/image1.png

.. |image2| image:: SSL_VPN_Okta_SAML_media/image2.png

.. |image3| image:: SSL_VPN_Okta_SAML_media/image3.png

.. |image4| image:: SSL_VPN_Okta_SAML_media/image4.png

.. |image5| image:: SSL_VPN_Okta_SAML_media/image5.png

.. |image6| image:: SSL_VPN_Okta_SAML_media/image6.png

.. |image7| image:: SSL_VPN_Okta_SAML_media/image7.png


.. disqus::