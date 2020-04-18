.. meta::
   :description: PingOne IdP for SAML Integration
   :keywords: PingOne, SAML, user vpn, PingOne saml, Aviatrix, OpenVPN, Controller

.. toctree::
   :numbered:

==============================================================================
PingOne IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure PingOne as an IdP for an Aviatrix SAML SP (endpoint). When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., PingOne) for authentication.

Before configuring SAML integration between Aviatrix and PingOne, make sure you have a valid PingOne account with administrator access.

Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your PingOne IdP:

Step 1. Create a `temporary Aviatrix SP Endpoint <#aviatrix-endpoint>`__ in the Aviatrix Controller

Step 2. Create an `PingOne SAML App <#pingone-saml-app>`__ for Aviatrix in the PingOne Portal

Step 3. Retrieve `PingOne IdP metadata <#pingone-idp-metadata>`__

Step 4. Update `Aviatrix SP Endpoint <#pingone-update-saml-endpoint>`__ in the Aviatrix Controller

Step 5. `Test the Integration <#pingone-test-integration>`__ is Set Up Correctly

.. _aviatrix_endpoint:

Step 1. Create an Aviatrix SP Endpoint
########################################

Visit one of the following links based on your use case and follow step1 (Create temporary Aviatrix SP Endpoint for Aviatrix) from the link's Configuration section:

  If integrating PingOne IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-31>`_

  If integrating PingOne IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-31>`_

.. _pingone_saml_app:

Step 2. Create an PingOne SAML App for Aviatrix
###############################################

.. note::

   This step is usually done by the PingOne Admin.

#. Login to the PingOne Admin portal
#. Follow `PingOne documentation <https://docs.pingidentity.com/bundle/p14c/page/lyd1583255784891.html>`__ to Add a SAML application

   On the top of the page, click Connections.
   On the left, click Applications and then + Application.

   |image0|
      
   Click Web App, and then for SAML, click Configure.
   
   |image0|
   
   Create the application profile by entering the following information:

   +----------------------+---------------------------------------------------------+
   | Field                | Value                                                   |
   +======================+=========================================================+
   | Application name     | A unique identifier for the application.                |
   +----------------------+---------------------------------------------------------+
   | Description          | (optional)A brief characterization of the application.  |
   +----------------------+---------------------------------------------------------+
   | Icon.                | (optional)A pictorial representation of the application.|
   |                      | Use a file up to 1MB in JPG, JPEG, GIF, or PNG format.  |
   +----------------------+---------------------------------------------------------+


#. For Configure SAML Connection, enter the following: 

   +------------------------------+---------------------------------------------------+
   | Field                        | Value                                             |
   +------------------------------+---------------------------------------------------+
   | ACS URLs                     | ``https://[host]/flask/saml/sso/[Endpoint Name]`` |
   +------------------------------+---------------------------------------------------+
   | Signing certificate          | PingOne SSO Certificate for Default environment   |
   +------------------------------+---------------------------------------------------+
   | Signing                      | Sign Assertion                                    |
   +------------------------------+---------------------------------------------------+
   | Signing Algorithm            | RSA_SHA256                                        |
   +------------------------------+---------------------------------------------------+
   | Encryption                   | DISABLED                                          |
   +------------------------------+---------------------------------------------------+
   | Entity ID                    | ``https://[host]/``                               |
   +------------------------------+---------------------------------------------------+
   | SLO endpoint                 | Not Specified                                     |
   +------------------------------+---------------------------------------------------+
   | SLO response endpoint        | Not Specified                                     |
   +------------------------------+---------------------------------------------------+
   | SLO binding                  | HTTP POST                                         |
   +------------------------------+---------------------------------------------------+
   | Assertion validity duration  | 300                                               |
   +------------------------------+---------------------------------------------------+
   | Target Application URL       | Not Specified                                     |
   +------------------------------+---------------------------------------------------+
   | Enforce signed Authn request | Disabled                                          |
   +------------------------------+---------------------------------------------------+
   | Verification certificate     | No Verification Certificates Selected             |
   +------------------------------+---------------------------------------------------+

   ``[host]`` is the hostname or IP of your Aviatrix controller.  For example, ``https://controller.demo.aviatrix.live``

   ``[Endpoint Name]`` is an arbitrary identifier.  This same value should be used when configuring SAML in the Aviatrix controller. The example uses ``dev`` for ``[Endpoint Name]``

   |image0|
   
#. Click Save and Continue.

#. For attribute mapping, click the button "+ADD ATTRIBUTE" and then select "PingOne Attribute" to map PingOne user attribute to an attribute in this application as below.

   * Attribute Statements

   +------------------------+-----------------------+
   | PINGONE USER ATTRIBUTE | APPLICATION ATTRIBUTE |
   +------------------------+-----------------------+
   | User ID                | saml_subject          |
   +------------------------+-----------------------+
   | Given Name             | FirstName             |
   +------------------------+-----------------------+
   | Family Name            | LastName              |
   +------------------------+-----------------------+
   | Email Address          | Email                 |
   +------------------------+-----------------------+

   Notes: User ID is a default required in PingOne

   |image3|


#. Click Save and Close.

.. _okta_idp_metadata:

Step 3. Retrieve PingOne IdP metadata
#####################################

.. note::

   This step is usually completed by the PingOne admin.

#. After the application is created in PingOne, click Connections on the top of the page and then click Applicationso n the left.

#. Find the application and 


 On the top of the page, click Connections.
On the left, click Applications.
Locate the SAML application you want to edit. You can browse or search for applications.
Click the details icon to expand the SAML application you want to edit, and then click the pencil icon. 

#. Copy the URL from the *Identity Provider metadata* link. This value will be used to configure the Aviatrix SP Endpoint.

  |image4|



.. _okta_update_saml_endpoint:

Step 4. Update Aviatrix SP Endpoint
###################################

.. note::

   This step is usually completed by the Aviatrix admin.
   Okta IdP provides IdP Metadata through text or URL obtained in `Retrieve Okta IdP metadata (Step 3) <#okta-idp-metadata>`_.

Continue with updating Aviatrix SAML Endpoint by visiting one of the following links based on your use case:

#. If integrating Okta IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-34>`_
#. If integrating Okta IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-34>`_

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | Endpoint Name           | ``[Endpoint Name]`` (Use the same name you entered    |
   |                         | in the Okta Application previously)             |
   +-------------------------+-------------------------------------------------+
   | IdP Metadata Type       | Text                                            |
   +-------------------------+-------------------------------------------------+
   | IdP Metadata Text/URL   | ``URL copied from Okta`` (IdP metadata URL)     |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Select `Hostname`                               |
   +-------------------------+-------------------------------------------------+
   | Access                  | Select admin or read-only access                |
   +-------------------------+-------------------------------------------------+
   | Custom SAML Request     | Unchecked                                       |
   | Template                |                                                 |
   +-------------------------+-------------------------------------------------+

.. note::
   Each endpoint only supports one type of access. If you need admin and read-only access, create two separate SAML apps.
   `Hostname` is the default for Entity ID, but if you have other apps using the same hostname, use a custom Entity ID.

.. _okta_test_integration:

Step 5. Test the Integration
#############################

.. tip::
  Be sure to assign users to the new application in Okta prior to validating.  If you do not assign your test user to the Aviatrix SAML application, you will receive an error.

Continue with testing the integration by visiting one of the following links based on your use case:

1. If integrating Okta IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-35>`_
  #. Click `Settings` in the left navigation menu
  #. Select `Controller`
  #. Click on the `SAML Login` tab
2. If integrating Okta IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-35>`_
  #. Expand `OpenVPN®` in the navigation menu and click `Advanced`
  #. Stay on the `SAML` tab

You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.

Configure Okta for Multifactor Authentication (OPTIONAL)
########################################################

Once you have successfully configured Okta IdP with Aviatrix SP, you can configure Okta for Multifactor Authentication.

Please read this `article <https://support.okta.com/help/Documentation/Knowledge_Article/Multifactor-Authentication-1320134400>`__ from Okta on Multifactor setup.

See this `article <https://support.okta.com/help/Documentation/Knowledge_Article/Configuring-Duo-Security-734413457>`__ if you're interested in using DUO in particular.


OpenVPN is a registered trademark of OpenVPN Inc.

.. |logoAlias1| replace::  Aviatrix logo with red background
.. _logoAlias1: https://www.aviatrix.com/news/press-kit/logo-aviatrix.png

.. |logoAlias2| replace:: Aviatrix logo with transparent background
.. _logoAlias2: https://www.aviatrix.com/images/logo-reverse.png

.. |image0| image:: SSL_VPN_Okta_SAML_media/image0.png

.. |image1| image:: SSL_VPN_Okta_SAML_media/image1.png

.. |image2| image:: SSL_VPN_Okta_SAML_media/image2.png

.. |image3| image:: SSL_VPN_Okta_SAML_media/image3.png

.. |image4| image:: SSL_VPN_Okta_SAML_media/image4.png

.. |image5| image:: SSL_VPN_Okta_SAML_media/image5.png

.. |image6| image:: SSL_VPN_Okta_SAML_media/image6.png

.. |image7| image:: SSL_VPN_Okta_SAML_media/image7.png

.. |imageControllerNavOpenVPNAdvanced| image:: SSL_VPN_Okta_SAML_media/OpenVPN_Advanced_SAML_AddNew.png
   :scale: 50%

.. disqus::
