﻿.. meta::
   :description: Aviatrix User SSL VPN with OneLogin SAML Configuration
   :keywords: OneLogin, SAML, user vpn, Aviatrix, OpenVPN

.. toctree::
   :numbered:

==============================================================================
OpenVPN® with SAML Authentication on OneLogin IdP
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against a OneLogin IdP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., OneLogin) for authentication.

Pre-Deployment Checklist
-----------------------------
Before configuring SAML integration between Aviatrix and OneLogin, make sure the following is completed:

#. `Aviatrix Controller <#aviatrix-controller>`__ is setup and running.
#. Have a valid `OneLogin account <#onelogin-account>`__ with admin access.
#. Download and install the `Aviatrix SAML VPN client <#aviatrix-client>`__.

.. _aviatrix_controller:

Aviatrix Controller
####################

If you haven’t already deployed the Aviatrix controller, follow `the Controller Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

.. _onelogin_account:

OneLogin Account
################

A valid OneLogin account with admin access is required to configure the integration.

.. _aviatrix_client:

Aviatrix VPN Client
###################

All users must use the Aviatrix VPN client to connect to the system.  Download the client for your OS `here <../Downloads/samlclient.html>`__.


Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your OneLogin IDP:

#. Create a `OneLogin SAML App <#onelogin-saml-app>`__ for Aviatrix
#. Create a `SAML Endpoint <#onelogin-saml-endpoint>`__ in the Aviatrix Controller


.. _onelogin_saml_app:

OneLogin SAML App
#################

Before you start, pick a short name to be used for the SAML application name.  In the notes below we will refer to this as **aviatrix_onelogin**.  But it can be any string.

We will use the string you select for the SAML application name to generate a URL for OneLogin to connect with Aviatrix.  This URL is defined below as **SP_ACS_URL**.  This URL should be constructed as:

   ``https://<your controller ip or host name>/flask/saml/sso/<aviatrix_onelogin>``

   .. tip::

      Replace **<your controller ip or host name>** with the actual host name or IP address of your controller and **<aviatrix_onelogin>** with the string you chose to refer to the SAML application.
   
#. Login to OneLogin as an administrator
#. Add a new App (**Apps* > **Add Apps**)

   |imageOLAddAppsMenu|
   
#. Search for `SAML Test Connector`

   |imageOLNewAppSearch|

#. Select **SAML Test Connector (IdP)**
#. Enter the Configuration values and click **Save**

   |imageOLNewAppStep1|

   You can download the rectangular image from `here <./onelogin_saml_media/aviatrix-logo-rect.png>`__ and the square image from `here <./onelogin_saml_media/aviatrix-logo-square.png>`__.

#. Click on **Configuration** tab
#. Enter the values

   +--------------------+------------------------------------------------------+
   | Field              | Value                                                |
   +====================+======================================================+
   | RelayState         | Blank                                                |
   +--------------------+------------------------------------------------------+
   | Audience           | **SP_ACS_URL**                                       |
   +--------------------+------------------------------------------------------+
   | Recipient          | **SP_ACS_URL**                                       |
   +--------------------+------------------------------------------------------+
   | ACS (Consumer)     | **SP_ACS_URL**                                       |
   | URL Validator      |                                                      |
   +--------------------+------------------------------------------------------+
   | ACS (Consumer) URL | **SP_ACS_URL**                                       |
   +--------------------+------------------------------------------------------+
   | Single Logout URL  | Blank                                                |
   +--------------------+------------------------------------------------------+

#. Click **Save**
#. Click on the **Parameters** tab
#. Add the following custom parameters (case sensitive)

   +--------------------+------------+-----------------------------------------+
   | Field              | Value      | Flags                                   |
   +====================+============+=========================================+
   | Email              | Email      | Include in SAML assertion               |
   +--------------------+------------+-----------------------------------------+
   | FirstName          | First Name | Include in SAML assertion               |
   +--------------------+------------+-----------------------------------------+
   | LastName           | Last Name  | Include in SAML assertion               |
   +--------------------+------------+-----------------------------------------+

   |imageOLNewAppParams|

#. Optionally, add a field to map to the profile in Aviatrix

   +--------------------+----------------+-------------------------------------+
   | Field              | Value          | Flags                               |
   +====================+================+=====================================+
   | Profile            | (User Defined) | Include in SAML assertion           |
   +--------------------+----------------+-------------------------------------+

#. Click **Save**
#. Click on **SSO** tab
#. Note the **Issuer URL** for the next step.
   
.. _onelogin_saml_endpoint:

Aviatrix Controller SAML Endpoint
#################################

#. Login to your Aviatrix Controller
#. Expand **OpenVPN**, select **Advanced** in the navigation menu
#. Go to the **SAML** tab
#. Click **+ Add New** button
#. Follow the table below for details on the fields in the table:

   +----------------------------+-----------------------------------------+
   | Field                      | Description                             |
   +----------------------------+-----------------------------------------+
   | Endpoint Name              | Pick                                    |
   +----------------------------+-----------------------------------------+
   | IPD Metadata Type          | URL                                     |
   +----------------------------+-----------------------------------------+
   | IDP Metadata Text/URL      | Paste in the **Issuer URL** obtained    |
   |                            | from the OneLogin app.                  |
   +----------------------------+-----------------------------------------+
   | Entity ID                  | Select `Hostname`                       |
   +----------------------------+-----------------------------------------+
   | Custom SAML Request        | Unchecked                               |
   | Template                   |                                         |
   +----------------------------+-----------------------------------------+

   |imageAvtxSAMLEndpoint|

Test the Integration
--------------------

You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.

|imageAvtxTestSAML|

.. _create_aviatrix_vpn_user:

Create a VPN User
#################

#. Log in to the Aviatrix Controller
#. Click `OpenVPN®` in the left navigation menu
#. Select `VPN Users`
#. Click `+ Add New`
#. Select the `VPC ID` and `LB/Gateway Name` for your SAML Gateway
#. Enter a name in the `User Name` field
#. Enter any valid email address in the `User Email` field (this is where the cert file will be sent). Alternatively, you can download the cert if you do not enter an email address.
#. Select the `SAML Endpoint`
#. Click `OK`

.. _validate_entire_process:

Validate
########

#. Log in to the Aviatrix Controller
#. Click `OpenVPN®` in the left navigation menu
#. Select `VPN Users`
#. Download the configuration for your test user created in the previous step
#. Open the Aviatrix VPN Client application
#. Click `Load Conf` and select the file downloaded
#. Click `Connect`

.. |imageOLNewAppSearch| image:: onelogin_saml_media/onelogin_new_app_search.png
.. |imageOLNewAppStep1| image:: onelogin_saml_media/onelogin_new_app_step1.png
.. |imageOLNewAppParams| image:: onelogin_saml_media/onelogin_parameters.png
.. |imageAvtxTestSAML| image:: onelogin_saml_media/avtx_saml_endpoint_test.png
.. |imageAvtxSAMLEndpoint| image:: onelogin_saml_media/avtx_saml_endpoint.png
.. |imageOLAddAppsMenu| image:: onelogin_saml_media/onelogin_select_add_apps.png
