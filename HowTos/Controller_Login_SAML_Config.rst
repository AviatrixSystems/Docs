.. meta::
   :description: Aviatrix Controller Login SAML Configuration
   :keywords: Okta, SAML, controller login, Aviatrix

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

For Okta specific example, follow the instructions in `Aviatrix Controller Login on Okta IDP <https://docs.aviatrix.com/HowTos/Controller_Login_Okta_SAML_Config.html>`_.

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

An IDP refers to an identity provider for SAML. This could be any provider that supports a SAML end point like `Okta <./UserSSL_VPN_Okta_SAML_Config.html>`__ (the listed ones are tested). You will require administrator access to create IDP endpoints for SAML.


3. Configuration Steps
----------------------

Follow these steps to configure Aviatrix to authenticate against your Okta IDP:

1. Create `SAML App <#config-31>`__ for Aviatrix
2. Retrieve `IDP Metadata <#config-32>`__
#. Create Aviatrix `SAML SP Endpoint <#config-33>`__
#. `Test the Integration <#config-34>`__ is Set Up Correctly
#. `Validate <#config-35>`__

.. _Config_31:

3.1 Create a SAML App for Aviatrix at the IDP
#############################################

This step is usually done by the IDP adminstrator.

Create a SAML 2.0 app with the following settings that are based on the <aviatrix_sp_name> which is 'controller' for controller login:

#. Assertion Consumer Service URL* = https://aviatrix_controller_hostname/flask/saml/sso/<aviatrix_sp_name>
#. Audience URI(Entity ID)* = https://aviatrix_controller_hostname/
#. SP Metadata URL = https://aviatrix_controller_hostname/flask/saml/metadata/<aviatrix_sp_name>
#. SP Login URL = https://aviatrix_controller_hostname/flask/saml/login/<aviatrix_sp_name>
#. Default RelayState* = <empty>

.. important::

   After step 3.3, these values are also available in the controller under the `Settings` navigation item.  Then, select `Controller` and go to the `SAML Login` tab.

   ``aviatrix_sp_name`` is ``controller`` for controller login
   
   RelayState is currently not used by the Aviatrix SP

   

The following SAML attributes are expected:

#. FirstName
#. LastName
#. Email (unique identifier for SAML)

.. note::

   These values are case sensitive

.. _Config_32:

3.2  Retrieve IDP metadata
##########################

After creating the IDP, you need to retrieve IDP Metadata either in URL or text from the IDP application created in the previous step.

.. _Config_33:

3.3 Create Aviatrix SAML Endpoint
#################################

.. note::

   This step is usually completed by the Aviatrix admin.

#. Login to the Aviatrix Controller
#. Click `Settings` in the left navigation menu
#. Select `Controller`
#. Click on the `SAML Login` tab
#. Click `Enable` button

   |image0|

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | IPD Metadata Type       | Text or URL (depending on what was              |
   |                         | provided by the SAML provider)                  |
   +-------------------------+-------------------------------------------------+
   | IDP Metadata Text/URL   | Paste in the IDP metadata URL/Text              |
   |                         | copied from the SAML provider                   |
   |                         | configuration                                   |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Hostname                                        |
   +-------------------------+-------------------------------------------------+
   | Access                  | Select admin.                                   |
   |                         | read_only is not supported in this release.     |.
   |                         |                                                 |
   +-------------------------+-------------------------------------------------+

#. Click `OK`

.. _Config_34:

3.4 Test the Integration
########################

#. Click `Settings` in the left navigation menu
#. Select `Controller`
#. Click on the `SAML Login` tab
#. Click the `Test` button next to ``controller``

      |image1|

#. You should be redirected to IDP.  Login with your test user credentials.

   .. important::

      If everything is configured correctly, once you have authenticated another windows should open with the test user's access.

.. _Config_35:

3.5 Validate
############

#. Logout of the Aviatrix Controller
#. Login to the Aviatrix Controller by clicking the `SAML Login` button

    |image2|

#. You should be redirected to IDP.  Login with your test user credentials.

       .. important::

          If everything is configured correctly, once you have authenticated you will be redirected to the dashboard's controller.



.. |logoAlias1| replace::  Aviatrix logo with red background
.. _logoAlias1: https://www.aviatrix.com/news/press-kit/logo-aviatrix.png

.. |logoAlias2| replace:: Aviatrix logo with transparent background
.. _logoAlias2: https://www.aviatrix.com/images/logo-reverse.png

.. |image0| image:: Controller_Login_SAML_media/image0.png

.. |image1| image:: Controller_Login_SAML_media/image1.png

.. |image2| image:: Controller_Login_SAML_media/image2.png



.. disqus::
