.. meta::
   :description: Aviatrix Controller Login SAML Configuration
   :keywords: SAML, controller login, Aviatrix, idp, sp

.. toctree::
   :numbered:

==============================================================================
Aviatrix Controller Login with SAML Authentication
==============================================================================

1.  Overview
------------

This guide provides an example on how to configure Aviatrix Controller to authenticate to an IDP.  When SAML is
used for Controller access authentication, your Aviatrix controller acts as the
Identity Service Provider (ISP) that redirects browser traffic from client to IDP (e.g., Okta) for authentication.

Aviatrix controller SAML login supports multiple SAML endpoints with varying access and utilizing different IDP's.

For different IDP's, there will be links to each individual IDP integration.

2. Pre-Deployment Checklist
-----------------------------
Before configuring SAML integration between Aviatrix and IDP, make sure the following is completed:

#. `Aviatrix Controller <#pdc-21>`__ is setup and running
#. Have a valid `IDP account <#pdc-22>`__ with admin access

.. _PDC_21:

2.1 Aviatrix Controller
#######################

If you haven’t already deployed the Aviatrix controller, follow `the Controller Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

.. _PDC_22:

2.2 IDP Account
###############

An IDP refers to an identity provider for SAML. This could be any provider that supports a SAML end point like `Okta <./SAML_Integration_Okta_IDP.html>`__,
`OneLogin <./SAML_Integration_OneLogin_IDP.html>`__, `Google <./SAML_Integration_Google_IDP.html>`__,
`AWS SSO <./SAML_Integration_AWS_SSO_IDP.html>`__, and `Azure AD <./SAML_Integration_Azure_AD_IDP.html>`__.
You will require administrator access to create IDP endpoints for SAML. Check `IDP-specific SAML Integration <#idp-integration>`__ to see a list of guides for supported IDP's



3. Configuration Steps
----------------------

Follow these steps to configure Aviatrix to authenticate against IDP:

  1. Create `temporary Aviatrix SP Endpoint <#config-31>`__ for Aviatrix controller
  2. Create `SAML IDP App <#config-32>`__ with specific IDP
  #. Retrieve `IDP Metadata <#config-33>`__ from IDP
  #. Update `Aviatrix SP Endpoint <#config-34>`__ with IDP metadata
  #. `Test the Integration <#config-35>`__ is set up correctly
  #. `Validate <#config-36>`__

.. _Config_31:

3.1 Create temporary Aviatrix SP Endpoint
#########################################
.. note::

   This step is usually completed by the Aviatrix admin.
   This endpoint will be updated later on in the guide, at this step, we will be using placeholder values.
   Choose an endpoint name for ``aviatrix_sp_name`` which will be used throughout the guide.
   This guide will use ``aviatrix_saml_controller`` as an example for ``aviatrix_sp_name``

#. Login to the Aviatrix Controller
#. Click `Settings` in the left navigation menu
#. Select `Controller`
#. Click on the `SAML Login` tab
#. Click `Add/Update` button

   |image3-1-1|

   |image3-1-2|

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | Endpoint Name           | ``aviatrix_sp_name`` (this is the same name     |
   |                         | that you chose above)                           |
   +-------------------------+-------------------------------------------------+
   | IPD Metadata Type       | Text or URL (depending on what was              |
   |                         | provided by the SAML provider)                  |
   |                         | For now, choose URL                             |
   +-------------------------+-------------------------------------------------+
   | IDP Metadata Text/URL   | IDP metadata URL/Text copied from the SAML      |
   |                         | provider configuration                          |
   |                         | For now, put in a placeholder URL,              |
   |                         | such as "https://www.google.com"                |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Select `Hostname` for now                       |
   +-------------------------+-------------------------------------------------+
   | Access                  | Select admin or read_only access                |
   +-------------------------+-------------------------------------------------+
   | Custom SAML Request     | For now leave blank, depending on your specific |
   | Template                | IDP, you may have to check this option          |
   +-------------------------+-------------------------------------------------+

#. Click `OK`
#. Depending on your IDP provider, you may need to upload SP metadata. After temporary SAML endpoint is created:

  - Right click **SP Metadata** button next to the SAML endpoint and save file to your local machine.
  - Click **SP Metadata** button, and copy the SP metadata as text

.. _Config_32:

3.2 Create a SAML App for Aviatrix with the IDP
###############################################

.. note::

   This step is usually done by the IDP administrator.
   This sections shows only generalized process for creating a SAML application.
   Refer to the `IDP-specific SAML App Integration <#idp-integration>`_ section for links to detailed steps with each particular IDP.

Create a SAML 2.0 app with the IDP Provider. The following settings are based on the <aviatrix_sp_name>:

#. Assertion Consumer Service URL* = https://aviatrix_controller_hostname/flask/saml/sso/<aviatrix_sp_name>
#. Audience URI(Entity ID)* = https://aviatrix_controller_hostname/
#. SP Metadata URL = https://aviatrix_controller_hostname/flask/saml/metadata/<aviatrix_sp_name>
#. SP Login URL = https://aviatrix_controller_hostname/flask/saml/login/<aviatrix_sp_name>
#. Default RelayState* = <empty>

.. important::

   After step 3.4, these values are also available in the controller under the `Settings` navigation item.  Then, select `Controller` and go to the `SAML Login` tab.

   RelayState is currently not used by the Aviatrix SP


The following SAML attributes are expected:

#. FirstName
#. LastName
#. Email (unique identifier for SAML)

.. note::

   These values are case sensitive


.. _Idp_Integration:

**IDP-specific SAML App Integration**

.. note::

  You will require administrator access to create IDP endpoints for SAML.

These are guides with specific IDP's that were tested to work with Aviatrix SAML integration:

#. `AWS SSO <./SAML_Integration_AWS_SSO_IDP.html>`__
#. `Azure AD <./SAML_Integration_Azure_AD_IDP.html>`__
#. `Centrify <./SAML_Integration_Centrify_IDP.html>`__
#. `Google <./SAML_Integration_Google_IDP.html>`__
#. `Okta <./SAML_Integration_Okta_IDP.html>`__
#. `OneLogin <./SAML_Integration_OneLogin_IDP.html>`__

Other tested IDP's include:
Ping Identity, VmWare VIDM, ForgeRock's OpenAM etc.


.. _Config_33:

3.3  Retrieve IDP metadata
##########################

After creating the IDP, you need to retrieve IDP Metadata either in URL or text from the IDP application created in the previous step.

#. AWS SSO  - provides IDP metadata URL, needs a custom SAML request template, and will need to provide SP metadata file from Aviatrix
#. Azure AD - provides IDP metadata URL and needs a custom SAML request template
#. Centrify - provides IDP metadata URL and will need to provide SP metadata text from Aviatrix
#. Google   - provides IDP metadata text
#. Okta     - provides IDP metadata text
#. OneLogin - provides IDP metadata URL

.. _Config_34:

3.4 Update Aviatrix SP Endpoint
###############################

.. note::

   This step is usually completed by the Aviatrix admin.
   Take note of the IDP Metadata type along with Text/URL your IDP provides, and if you need a custom SAML request template in the previous section

#. Login to the Aviatrix Controller
#. Click `Settings` in the left navigation menu
#. Select `Controller`
#. Click on the `SAML Login` tab
#. Click `Add/Update` button

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | Endpoint Name           | ``aviatrix_sp_name`` (this is the same name     |
   |                         | that you chose in step 3.1)                     |
   +-------------------------+-------------------------------------------------+
   | IPD Metadata Type       | Text or URL (depending on what was              |
   |                         | provided by the SAML provider)                  |
   +-------------------------+-------------------------------------------------+
   | IDP Metadata Text/URL   | IDP metadata URL/Text copied from the SAML      |
   |                         | provider configuration                          |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Select `Hostname` or `Custom`                   |
   +-------------------------+-------------------------------------------------+
   | Custom Entity ID        | Only visible if `Entity ID` is `Custom`         |
   +-------------------------+-------------------------------------------------+
   | Access                  | Select admin or read_only access                |
   +-------------------------+-------------------------------------------------+
   | Custom SAML Request     | Depending on your specific                      |
   | Template                | IDP, you may have to check this option.         |
   |                         | Refer to `IDP-specific Integration <#idp-integration>`__    |
   +-------------------------+-------------------------------------------------+

#. Click `OK`

.. _Config_35:

3.5 Test the Integration
########################

#. Click `Settings` in the left navigation menu
#. Select `Controller`
#. Click on the `SAML Login` tab
#. Click the `Test` button next to ``aviatrix_sp_name``

      |image3-5|

#. You should be redirected to IDP.  Login with your test user credentials.

   .. important::

      If everything is configured correctly, once you have authenticated another windows should open with the test user's access.

.. _Config_36:

3.6 Validate
############

#. Logout of the Aviatrix Controller
#. Choose from the dropdown box your ``aviatrix_sp_name``
#. Login to the Aviatrix Controller by clicking the `SAML Login` button.

    |image3-6|

#. You should be redirected to IDP.  Login with your test user credentials.

       .. important::

          If everything is configured correctly, once you have authenticated you will be redirected to the dashboard's controller.



.. |logoAlias1| replace::  Aviatrix logo with red background
.. _logoAlias1: https://www.aviatrix.com/news/press-kit/logo-aviatrix.png

.. |logoAlias2| replace:: Aviatrix logo with transparent background
.. _logoAlias2: https://www.aviatrix.com/images/logo-reverse.png

.. |image3-1-1| image:: Controller_Login_SAML_media/image3-1-1.png

.. |image3-1-2| image:: Controller_Login_SAML_media/image3-1-2.png

.. |image3-5| image:: Controller_Login_SAML_media/image1.png

.. |image3-6| image:: Controller_Login_SAML_media/image3-6.png



.. disqus::
