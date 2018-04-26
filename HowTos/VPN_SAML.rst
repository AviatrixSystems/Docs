.. meta::
   :description: Aviatrix User SSL VPN Okta SAML Configuration
   :keywords: SAML, user vpn, saml, Aviatrix, OpenVPN, idp, sp

=====================================
OpenVPN® with SAML Authentication 
=====================================

1.  Overview
------------

Aviatrix user VPN is the only OpenVPN® based remote VPN solution that provides a VPN client that supports SAML authentication. 

This step-by-step guide shows you how to use Aviatrix SAML client to authenticate an IDP. When SAML client is used, Aviatrix controller acts as the service provider (SP) that redirects browser traffic from client to the IDP for authentication. 

2. Pre-Deployment Checklist
-----------------------------
Before configuring the SAML integration between Aviatrix and your IDP, make sure the following is completed:

	#. `Aviatrix Controller <#pdc-21>`__ is setup and running
	#. Have a valid `IDP account <#pdc-22>`__ with admin access
	#. `Download and install <#pdc-23>`__ the Aviatrix SAML client


.. _PDC_21:

2.1 Aviatrix Controller
#######################

If you haven’t already deployed the Aviatrix controller, follow `these instructions <../StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__ to deploy the Aviatrix controller.

.. _PDC_22:

2.2 IDP Account
###############

An IDP refers to an identity provider for SAML. This could be any provider that supports a SAML end point like `Okta <./UserSSL_VPN_Okta_SAML_Config.html>`__, OneLogin, `Google <./UserSSL_VPN_Google_SAML_Config.html>`__, Ping Identity, VmWare VIDM, ForgeRock's OpenAM etc. (The listed ones were tested). You will require administrator access to create IDP endpoints for SAML.

.. _PDC_23:

2.3 Aviatrix VPN Client
#######################

All users must use the Aviatrix VPN client to connect to the system.  Download the client for your OS `here <http://docs.aviatrix.com/Downloads/samlclient.html>`__.

3. Configuration
----------------

The configuration consists of 4 parts:

	1. Create `SAML App <#config-31>`__ for Aviatrix
	2. Retrieve `IDP Metadata <#config-32>`__
	3. Launch `Aviatrix Gateway <#config-33>`__
	4. Create `Aviatrix SAML SP <#config-34>`__
	5. Create `Aviatrix VPN user(s) <#config-35>`__

.. _Config_31:

3.1 Create a SAML App for Aviatrix at the IDP
#############################################

This step is usually done by the IDP adminstrator.

Create a SAML 2.0 app with the following settings:
	
#. App Name = Aviatrix VPN (arbitrary)
#. Assertion Consumer Service URL* = https://aviatrix_controller_hostname/flask/saml/sso/aviatrix_sp_name
#. Audience URI(Entity ID)* = https://aviatrix_controller_hostname/
#. SP Metadata URL = https://aviatrix_controller_hostname/flask/saml/metadata/aviatrix_sp_name
#. SP Login URL = https://aviatrix_controller_hostname/flask/saml/login/aviatrix_sp_name
#. Default RelayState* = <empty>
#. Name ID format = Unspecified
#. Application username = Okta username

.. note::

   After step 3.4, these values are also available in the controller under the OpenVPN® navigation item.  Then, select `Advanced` and go to the `SAML` tab.

The following SAML attributes are expected: 
		
#. FirstName
#. LastName
#. Email (unique identifier for VPN)
#. (Optional; only if required) Profile

.. note::

   These values are case sensitive

.. _Config_32:

3.2  Retrieve IDP metadata
##########################

After creating the IDP, you need to revtrieve IDP Metadata either in URL or text from the IDP application created in the previous step.

.. _Config_33:

3.3 Launch Aviatrix Gateway
###########################

This step is usually completed by the Aviatrix admin.

#. Login to the Aviatrix controller
#. Click `Gateway` in the navigation menu
#. Click `+ New Gateway`
#. Select the appropriate values for where to provision this Gateway
#. Check `VPN Access` and then `Enable SAML`

	|image6|
	
#. Leave the default settings for everything else
#. Click `OK` to launch the gateway

.. _Config_34:

3.4 Create Aviatrix SAML SP (Endpoint)
######################################

This step is usually completed by the Aviatrix admin.

#. Login to the Aviatrix Controller
#. Expand `OpenVPN®` in the navigation menu and click `Advanced`
#. Stay on the `SAML` tab and click `+ Add New`

   +----------------------------+-----------------------------------------+
   | Field                      | Description                             |
   +----------------------------+-----------------------------------------+
   | Endpoint Name              | aviatrix_sp_name (this is the same name |
   |                            | that you choose during the IDP          |
   |                            | configuration)                          |
   +----------------------------+-----------------------------------------+
   | IPD Metadata Type          | Text or URL (depending on what was      |
   |                            | provided by the SAML provider)          |
   +----------------------------+-----------------------------------------+
   | IDP Metadata Text/URL      | Paste in the IDP metadata URL/Text      |
   |                            | copied from the SAML provider           |
   |                            | configuration                           |
   +----------------------------+-----------------------------------------+
   | Entity ID                  | Select `Hostname` or `Custom`           |
   +----------------------------+-----------------------------------------+
   | Custom Entity ID           | Only visible if `Entity ID` is `Custom` |
   +----------------------------+-----------------------------------------+
   | Custom SAML Request        |                                         |
   | Template                   |                                         |
   +----------------------------+-----------------------------------------+

.. _Config_341:

3.4.1 Test the integration
##########################

.. note::

   Have an instance of the VPN client running.  If you do not, it might throw a warning

#. Login to the Aviatrix Controller
#. Expand `OpenVPN®` in the navigation menu and click `Advanced`
#. Stay on the `SAML` tab
#. Select the row that was created in the previous step (`aviatrix_sp_name`)
#. Click on the `Test` action
#. You should be redirected to the IDP, now you can log in and should be redirected back to the controller

.. _Config_35:

3.5 Create VPN user(s)
######################

+----------------------------+-----------------------------------------+
| Field                      | Description                             |
+----------------------------+-----------------------------------------+
| VPC ID                     | Select the VPC/VNet where the Gateway   |
|                            | was created                             |
+----------------------------+-----------------------------------------+
| LB/Gateway Name            | Select the appropriate load balancer    |
|                            | or gateway                              |
+----------------------------+-----------------------------------------+
| User Name                  | Name of the VPN user                    |
+----------------------------+-----------------------------------------+
| User Email                 | Any valid email address (this is where  |
|                            | the cert file will be sent).            |
|                            | Alternatively you can download the cert |
|                            | if you dont enter email                 |
+----------------------------+-----------------------------------------+
| SAML Endpoint              | Select the SAML endpoint                |
+----------------------------+-----------------------------------------+


.. note::

   SAML  supports shared certificates.  You can share the certificate among VPN users or create more VPN users.


3.6 Test VPN Connectivity
#########################
	Download and install the Aviatrix VPN client for your platform from `here <https://aviatrix-systems-inc-docs.readthedocs-hosted.com/Downloads/samlclient.html>`__
	Launch the Aviatrix client and load the certificate ("Load config")that you downloaded/received from email on step 3.5
	Click on "Connect". This should launch the browser instance and prompt you for authentication, if not already logged in. 
	If the connection is successfull, the client icon should turn green. 
	You can ensure VPN connectivity by trying to ping the private IP of the gateway you launched or any other instance in the same cloud network

  

OpenVPN is a registered trademark of OpenVPN Inc.


.. |image0| image:: SSL_VPN_Okta_SAML_media/image0.png

.. |image1| image:: SSL_VPN_Okta_SAML_media/image1.png

.. |image2| image:: SSL_VPN_Okta_SAML_media/image2.png

.. |image3| image:: SSL_VPN_Okta_SAML_media/image3.png

.. |image4| image:: SSL_VPN_Okta_SAML_media/image4.png

.. |image5| image:: SSL_VPN_Okta_SAML_media/image5.png

.. |image6| image:: SSL_VPN_Okta_SAML_media/image6.png

.. |image7| image:: SSL_VPN_Okta_SAML_media/image7.png


.. disqus::
