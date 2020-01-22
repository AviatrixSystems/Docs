﻿.. meta::
   :description: Aviatrix User SSL VPN Okta SAML Configuration
   :keywords: Okta, SAML, user vpn, okta saml, Aviatrix, OpenVPN

.. toctree::
   :numbered:

==============================================================================
OpenVPN® with SAML Authentication on Okta IDP
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against an Okta IDP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IDP (e.g., Okta) for authentication.

Pre-Deployment Checklist
-----------------------------
Before configuring SAML integration between Aviatrix and Okta, make sure the following is completed:

#. The `Aviatrix Controller <#aviatrix-controller>`__ is setup and running.
#. You have a valid `Okta account <#okta-account>`__ with admin access.
#. You have downloaded and installed the `Aviatrix SAML VPN client <#aviatrix-client>`__.

.. _aviatrix_controller:

Aviatrix Controller
####################

If you haven’t already deployed the Aviatrix controller, follow `the Controller Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.

.. _okta_account:

Okta Account
############

A valid Okta account with admin access is required to configure the integration.

.. _aviatrix_client:

Aviatrix VPN Client
###################

All users must use the Aviatrix VPN client to connect to the system.  Download the client for your OS `here <http://docs.aviatrix.com/Downloads/samlclient.html>`__.


Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your Okta IDP:

#. Create an `Okta SAML App <#okta-saml-app>`__ for Aviatrix
#. Retrieve `Okta IDP metadata <#okta-idp-metadata>`__
#. Launch an `Aviatrix Gateway <#aviatrix-gateway>`__
#. Create Aviatrix `SAML SP Endpoint <#aviatrix-saml-endpoint>`__
#. `Test the Integration <#test-integration>`__ is Set Up Correctly
#. Create `Aviatrix VPN User <#aviatrix-vpn-user>`__
#. `Validate <#validate-entire-process>`__

.. _okta_saml_app:

Create an Okta SAML App for Aviatrix
#####################################

.. note::

   This step is usually done by the Okta Admin.

#. Login to the Okta Admin portal
#. Follow `Okta documentation <https://developer.okta.com/standards/SAML/setting_up_a_saml_application_in_okta>`__ to create a new application.

   +----------------+----------------+
   | Field          | Value          |
   +================+================+
   | Platform       | Web            |
   +----------------+----------------+
   | Sign on method | SAML 2.0       |
   +----------------+----------------+

      |image0|

#. General Settings

   +----------------+-----------------+----------------------------------------+
   | Field          | Value           | Description                            |
   +================+=================+========================================+
   | App name       | Aviatrix        | This can be any value.  It will be     |
   |                |                 | displayed in Okta only.                |
   +----------------+-----------------+----------------------------------------+
   |                | Aviatrix logo:  | Aviatrix logo (optional)               |
   |                |                 |                                        |
   | App logo       | | |logoAlias1|_ |                                        |
   |                | | |logoAlias2|_ |                                        |
   +----------------+-----------------+----------------------------------------+
   | App visibility | N/A             | Leave both options unchecked           |
   +----------------+-----------------+----------------------------------------+

      |image1|

#. SAML Settings

   * General

   +----------------------+----------------------------------------------------+
   | Field                | Value                                              |
   +======================+====================================================+
   | Single sign on URL   | ``https://[host]/flask/saml/sso/[SP Name]``        |
   +----------------------+----------------------------------------------------+
   | Audience URI         | ``https://[host]/``                                |
   | (SP Entity ID)       |                                                    |
   +----------------------+----------------------------------------------------+
   | Default RelayState   |                                                    |
   +----------------------+----------------------------------------------------+
   | Name ID format       | Unspecified                                        |
   +----------------------+----------------------------------------------------+
   | Application username | Okta username                                      |
   +----------------------+----------------------------------------------------+

   ``[host]`` is the hostname or IP of your Aviatrix controller.  For example, ``https://controller.demo.aviatrix.live``

   ``[SP Name]`` is an arbitrary identifier.  This same value should be used when configuring SAML in the Aviatrix controller.

   |image2|

   * Attribute Statements

     +----------------+-----------------+--------------------------------------+
     | Name           | Name format     | Value                                |
     +================+=================+======================================+
     | FirstName      | Unspecified     | user.firstName                       |
     +----------------+-----------------+--------------------------------------+
     | LastName       | Unspecified     | user.lastName                        |
     +----------------+-----------------+--------------------------------------+
     | Email          | Unspecified     | user.email                           |
     +----------------+-----------------+--------------------------------------+

     |image3|

.. _okta_idp_metadata:

Retrieve Okta IDP metadata
#####################################

.. note::

   This step is usually completed by the Okta admin.

After the application is created in Okta, go to the `Sign On` tab for the application.  Then, click on the `View Setup Instructions` button.

    |image4|

Look for the section titled `Provide the following IDP metadata to your SP provider`.

    |image5|

.. important::

   Copy the text displayed.  This value will be used to configure the SAML on the Aviatrix controller.

You need to assign the application to your account. Please follow steps 11 through 14 at `Okta documentation <https://developer.okta.com/standards/SAML/setting_up_a_saml_application_in_okta>`__ 

.. _aviatrix_gateway:

Launching an Aviatrix VPN Gateway
###########################

.. note::

   This step is usually completed by the Aviatrix admin.

#. Log in to the Aviatrix controller
#. Click `Gateway` in the left navigation menu
#. Click the `+ New Gateway` button
#. Enter a `Gateway Name`
#. Select the appropriate `Account Name`, `Region`, `VPC ID`, `Public Subnet` and `Gateway Size`
#. Check `VPN Access`
#. Check `Enable SAML`

	|image6|

#. For information on the other settings, please refer to `this <./uservpn.html>`__ document
#. Click `OK` to create the Gateway

.. _aviatrix_saml_endpoint:

Create Aviatrix SAML Endpoint
#############################

.. note::

   This step is usually completed by the Aviatrix admin.

#. Login to the Aviatrix Controller
#. Click `OpenVPN®` in the left navigation menu
#. Select `Advanced`
#. Click on the `SAML` tab
#. Click `+ Add New` button

   |imageControllerNavOpenVPNAdvanced|

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | Endpoint Name           | ``SP Name`` (Use the same name you entered      |
   |                         | in the Okta Application previously)             |
   +-------------------------+-------------------------------------------------+
   | IDP Metadata Type       | Text                                            |
   +-------------------------+-------------------------------------------------+
   | IDP Metadata Text       | ``Value Copied from Okta`` (Paste the value     |
   |                         | copied from Okta SAML configuration)            |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Hostname                                        |
   +-------------------------+-------------------------------------------------+

#. Click `OK`

.. _test_integration:

Test the Integration
####################

#. Start the Aviatrix VPN Client

   .. note::
      If you don't start the client, you will receive a warning from the browser in the last step of this process

#. Log in to the Aviatrix Controller
#. Click `OpenVPN®` in the left navigation menu
#. Select `Advanced`
#. Click on the `SAML` tab
#. Click the `Test` button next to the ``SP Name`` created in the previous step

   .. tip::

      You will need to assign the new Okta application to a test user's Okta account before clicking `Test`.

#. You should be redirected to Okta.  Login with your test user credentials.

   .. important::

      If everything is configured correctly, once you have authenticated you will be redirected back to the controller and the window will close.


.. _create_aviatrix_vpn_user:

Create a VPN User
#################

#. Login to the Aviatrix Controller
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

#. Login to the Aviatrix Controller
#. Click `OpenVPN®` in the left navigation menu
#. Select `VPN Users`
#. Download the configuration for your test user created in the previous step
#. Open the Aviatrix VPN Client application
#. Click `Load Conf` and select the file downloaded
#. Click `Connect`

.. note::

   SAML VPN supports shared certificates. You can share the certificate among VPN users or create more VPN users


Configure Okta for Multi Factor Authentication (OPTIONAL)
########################################################

Once you have successfully configured Okta IDP with Aviatrix SP, you can configure Okta for Multi Factor Authentication.

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
