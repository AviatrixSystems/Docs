.. meta::
   :description: Aviatrix User SSL VPN with OneLogin SAML Configuration
   :keywords: OneLogin, SAML, user vpn, Aviatrix, OpenVPN

.. toctree::
   :numbered:

==============================================================================
 OneLogin IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure OneLogin as an IdP for an Aviatrix SAML SP (endpoint). When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., OneLogin) for authentication.

Visit one of the following links based on your use case:

  If integrating OneLogin IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_
  If integrating OneLogin IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_

Before configuring SAML integration between Aviatrix and OneLogin, make sure you have a valid OneLogin account with administrator access.


Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your OneLogin IdP:

Step 1. Create a `OneLogin SAML App <#onelogin-saml-app>`__ for Aviatrix

Step 2. Retrieve `OneLogin IdP metadata <#onelogin-idp-metadata>`__

Step 3. Update `Aviatrix SP Endpoint <#onelogin-update-saml-endpoint>`__ in the Aviatrix Controller

Step 4. `Test the Integration <#onelogin-test-integration>`__ is Set Up Correctly

.. _onelogin_saml_app:

Create a OneLogin SAML App for Aviatrix
#######################################
.. note::

   This step is usually done by the OneLogin Admin.

Before you start, pick a short name to be used for the SAML application name ``[Endpoint Name]``.  In the notes below we will refer to this as **aviatrix_onelogin**.  But, it can be any string.

We will use the string you select for the SAML application name to generate a URL for OneLogin to connect with Aviatrix.  This URL is defined below as **SP_ACS_URL**.  This URL should be constructed as:

   ``https://<your controller ip or host name>/flask/saml/sso/<aviatrix_onelogin>``

   .. tip::

      Replace **<your controller ip or host name>** with the actual host name or IP address of your controller and **<aviatrix_onelogin>** with the ``[Endpoint Name]`` you chose to refer to the SAML application.

#. Login to OneLogin as an administrator
#. Add a new App (**Apps** > **Add Apps**)

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

.. _onelogin_idp_metadata:

Retrieve OneLogin IdP metadata
##############################

#. Click on **SSO** tab
#. Copy the **Issuer URL** for the next step. This URL will be provided to the Aviatrix SP Endpoint.

  |imageOLSSOTab|

.. _onelogin_update_saml_endpoint:

Update Aviatrix SP Endpoint
###########################

.. note::

   This step is usually completed by the Aviatrix admin.
   OneLogin IdP provides IdP Metadata through URL obtained in `Retrieve OneLogin IdP metadata (Step 2) <#onelogin-idp-metadata>`_.

Continue with updating Aviatrix SAML Endpoint by visiting one of the following links based on your use case:

#. If integrating OneLogin IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-34>`_
#. If integrating OneLogin IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-34>`_

   +----------------------------+-----------------------------------------+
   | Field                      | Description                             |
   +----------------------------+-----------------------------------------+
   | Endpoint Name              | ``[Endpoint Name]``                     |
   +----------------------------+-----------------------------------------+
   | IPD Metadata Type          | URL                                     |
   +----------------------------+-----------------------------------------+
   | IdP Metadata Text/URL      | Paste in the **Issuer URL** obtained    |
   |                            | from the `OneLogin app <#onelogin-idpimetadata>`_.                  |
   +----------------------------+-----------------------------------------+
   | Entity ID                  | Select `Hostname`                       |
   +----------------------------+-----------------------------------------+
   | Access                     | Select admin or read-only access        |
   +----------------------------+-----------------------------------------+
   | Custom SAML Request        | Unchecked                               |
   | Template                   |                                         |
   +----------------------------+-----------------------------------------+

.. note::
   Each endpoint only supports one type of access. If you need admin and read-only access, create two separate SAML apps.
   `Hostname` is the default for Entity ID, but if you have other apps using the same hostname, use a custom Entity ID.

.. _onelogin_test_integration:

Test the Integration
####################

.. tip::
  Be sure to assign users to the new application in OneLogin prior to validating.  If you do not assign your test user to the Aviatrix SAML application, you will receive an error.

Continue with testing the integration by visiting one of the following links based on your use case:

1. If integrating OneLogin IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-35>`_
  #. Click `Settings` in the left navigation menu
  #. Select `Controller`
  #. Click on the `SAML Login` tab
2. If integrating OneLogin IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-35>`_
  #. Expand `OpenVPN®` in the navigation menu and click `Advanced`
  #. Stay on the `SAML` tab
You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.

|imageAvtxTestSAML|



.. |imageOLNewAppSearch| image:: onelogin_saml_media/onelogin_new_app_search.png
.. |imageOLNewAppStep1| image:: onelogin_saml_media/onelogin_new_app_step1.png
.. |imageOLNewAppParams| image:: onelogin_saml_media/onelogin_parameters.png
.. |imageAvtxTestSAML| image:: onelogin_saml_media/avtx_saml_endpoint_test.png
.. |imageAvtxSAMLEndpoint| image:: onelogin_saml_media/avtx_saml_endpoint.png
.. |imageOLAddAppsMenu| image:: onelogin_saml_media/onelogin_select_add_apps.png
.. |imageOLSSOTab| image:: onelogin_saml_media/onelogin_issuer_url.png
