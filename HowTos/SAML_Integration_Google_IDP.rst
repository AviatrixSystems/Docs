.. meta::
   :description: Aviatrix User SSL VPN Google SAML Configuration
   :keywords: Google, SAML, user vpn, google saml, Aviatrix, OpenVPN

.. toctree::
   :numbered:

==============================================================================
Google IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against a Google IdP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., Google) for authentication.

Visit one of the following links based on your use case:

  If integrating Google IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_
  If integrating Google IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_

Before configuring SAML integration between Aviatrix and Google, make sure you have a valid Google account with administrator access.

Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your Google IdP:

Step 1. Create a `Google SAML Application <#google-saml-app1>`__ for Aviatrix

Step 2. Retrieve `Google IdP metadata <#google-idp-metadata>`__

Step 3. Continue Creating `Google SAML Application <#google-saml-app2>`__ for Aviatrix

Step 4. Update `Aviatrix SP Endpoint <#google-update-saml-endpoint>`__ in the Aviatrix Controller

Step 5. `Test the Integration <#google-test-integration>`__ is Set Up Correctly


.. _google_saml_app1:

Create a Google SAML App for Aviatrix
#####################################

.. note::

   This step is usually done by the Google Admin.

#. Login to the Google Admin portal
#. Follow `Google documentation <https://support.google.com/a/answer/6087519?hl=en>`__ to create a new **custom** application.

   Click on the `Setup My Own Custom App`

   |imageStep1|

.. _google_idp_metadata:

Retrieve Google IdP metadata
############################

   Scroll down to `Option 2`.  Click the `Download` button next to the `IdP metadata` label.

   |imageStep2|

   The IdP metadata text will be used to configure the Aviatrix SP Endpoint.


.. _google_saml_app2:

Continue Creating Google SAML App for Aviatrix
##############################################

#. Basic Information

   +-------------------+-----------------+-------------------------------------+
   | Field             | Value           | Description                         |
   +===================+=================+=====================================+
   | Application Name  | Aviatrix        | This can be any value.  It will be  |
   |                   |                 | displayed in Google only.           |
   +-------------------+-----------------+-------------------------------------+
   | Description       |                 | This can be any value.              |
   +-------------------+-----------------+-------------------------------------+
   |                   | Aviatrix logo:  | Aviatrix logo (optional)            |
   |                   |                 |                                     |
   | Upload logo       | | |logoAlias1|_ |                                     |
   |                   | | |logoAlias2|_ |                                     |
   +-------------------+-----------------+-------------------------------------+

      |imageStep3|


#. Service Provider Details

   +----------------------+----------------------------------------------------+
   | Field                | Value                                              |
   +======================+====================================================+
   | ACS URL              | ``https://[host]/flask/saml/sso/[Endpoint Name]``        |
   +----------------------+----------------------------------------------------+
   | Entity ID            | ``https://[host]/``                                |
   +----------------------+----------------------------------------------------+
   | Start URL            | ``https://[host]/flask/saml/sso/[Endpoint Name]``        |
   +----------------------+----------------------------------------------------+
   | Signed Response      | Checked                                            |
   +----------------------+----------------------------------------------------+
   | Name ID              | Basic Information / Primary Email (Default)        |
   +----------------------+----------------------------------------------------+
   | Name ID Format       | UNSPECIFIED                                        |
   +----------------------+----------------------------------------------------+

   ``[host]`` is the hostname or IP of your Aviatrix controller.  For example, ``https://controller.demo.aviatrix.live``

   ``[Endpoint Name]`` is an arbitrary identifier.  This same value should be used when configuring SAML in the Aviatrix controller.

   |imageStep4|

#. Attribute Mapping

     +----------------+-----------------+--------------------------------------+
     | Attribute      | Category        | User field                           |
     +================+=================+======================================+
     | FirstName      | Basic           | First Name                           |
     +----------------+-----------------+--------------------------------------+
     | LastName       | Basic           | Last Name                            |
     +----------------+-----------------+--------------------------------------+
     | Email          | Basic           | Primary Email                        |
     +----------------+-----------------+--------------------------------------+

     |imageStep5|

#. Disable "Signed Response"

   #. Open the Service Provider Details for the SAML application just created.  Uncheck `Signed Response`.
   #. Click `Save`

.. _google_update_saml_endpoint:

Update Aviatrix SP Endpoint
#############################

.. note::

   This step is usually completed by the Aviatrix admin.
   Google IdP provides IdP Metadata through text obtained in `Retrieve Google IdP metadata (Step 2) <google-idp-metadata>`_.

Continue with updating Aviatrix SAML Endpoint by visiting one of the following links based on your use case:

#. If integrating Google IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-34>`_
#. If integrating Google IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-34>`_

   |imageControllerNavOpenVPNAdvanced|

   +-------------------------+-------------------------------------------------+
   | Field                   | Value                                           |
   +=========================+=================================================+
   | Endpoint Name           | ``Endpoint Name`` (Use the same name you entered |
   |                         | in the Google Application previously)           |
   +-------------------------+-------------------------------------------------+
   | IdP Metadata Type       | Text                                            |
   +-------------------------+-------------------------------------------------+
   | IdP Metadata Text       | ``Value Copied from Google`` (Paste the value   |
   |                         | from `Google IdP Metadata file <#google-idp-metadata>`_`)                            |
   +-------------------------+-------------------------------------------------+
   | Entity ID               | Hostname                                        |
   +-------------------------+-------------------------------------------------+
   | Access                  | Select admin or read_only access                |
   +-------------------------+-------------------------------------------------+
   | Custom SAML Request     | Unchecked                                       |
   | Template                |                                                 |
   +-------------------------+-------------------------------------------------+

.. note::
   Each endpoint only supports one type of access. If you need admin and read-only access, create two separate SAML apps.
   `Hostname` is the default for Entity ID, but if you have other apps using the same hostname, use a custom Entity ID.

#. Click `OK`

.. _google_test_integration:

Test the Integration
####################

.. tip::

  Be sure to assign users to the new application in Google prior to validating.  If you do not assign your test user to the Aviatrix SAML application, you will receive an error.

Continue with testing the integration by visiting one of the following links based on your use case:

1. If integrating Google IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-35>`_
  #. Click `Settings` in the left navigation menu
  #. Select `Controller`
  #. Click on the `SAML Login` tab
2. If integrating Google IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-35>`_
  #. Expand `OpenVPN®` in the navigation menu and click `Advanced`
  #. Stay on the `SAML` tab

You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.



.. |logoAlias1| replace::  Aviatrix logo with red background
.. _logoAlias1: https://www.aviatrix.com/news/press-kit/logo-aviatrix.png

.. |logoAlias2| replace:: Aviatrix logo with transparent background
.. _logoAlias2: https://www.aviatrix.com/images/logo-reverse.png

.. |imageStep1| image:: SSL_VPN_Google_SAML_media/gsaml_step1.png
   :scale: 25%

.. |imageStep2| image:: SSL_VPN_Google_SAML_media/gsaml_step2.png
   :scale: 25%

.. |imageStep3| image:: SSL_VPN_Google_SAML_media/gsaml_step3.png
   :scale: 25%

.. |imageStep4| image:: SSL_VPN_Google_SAML_media/gsaml_step4.png
   :scale: 25%

.. |imageStep5| image:: SSL_VPN_Google_SAML_media/gsaml_step5.png
   :scale: 25%

.. |imageGwVPNSAML| image:: SSL_VPN_Google_SAML_media/gw_vpn_saml.png

.. |imageControllerNavOpenVPNAdvanced| image:: SSL_VPN_Google_SAML_media/OpenVPN_Advanced_SAML_AddNew.png
   :scale: 50%

.. disqus::
