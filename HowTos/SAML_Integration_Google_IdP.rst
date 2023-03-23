
.. toctree::
   :numbered:

==============================================================================
Google IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against a Google IdP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., Google) for authentication.

Before configuring SAML integration between Aviatrix and Google, make sure you have a valid Google account with administrator access.

Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your Google IdP:

Step 1. Create a `temporary Aviatrix SP Endpoint <#aviatrix-endpoint>`__ in the Aviatrix Controller

Step 2. Create a `Google SAML Application <#google-saml-app1>`__ for Aviatrix

Step 3. Retrieve `Google IdP metadata <#google-idp-metadata>`__

Step 4. Update `Aviatrix SP Endpoint <#google-update-saml-endpoint>`__ in the Aviatrix Controller

Step 5. `Test the Integration <#google-test-integration>`__ is Set Up Correctly

.. _aviatrix_endpoint:

Step 1. Create an Aviatrix SP Endpoint
########################################

Visit one of the following links based on your use case and follow step1 (Create temporary Aviatrix SP Endpoint for Aviatrix) from the link's Configuration section:

  If integrating Google IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-31>`_

  If integrating Google IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-31>`_

This step will ask you to pick a short name to be used for the SAML application name ``[Endpoint Name]``.  In the notes below we will refer to this as **aviatrix_google**.  It can be any string that will identify the SAML application you create in the IdP.

We will use the string you select for the SAML application name to generate a URL for Google IdP to connect with Aviatrix.  This URL is defined below as **SP_ACS_URL**.  This URL should be constructed as:

``https://<<<your controller ip or host name>>>/flask/saml/sso/<<<aviatrix_google>>>``

.. tip::

  Replace **<<<your controller ip or host name>>>** with the actual host name or IP address of your controller and **<<<aviatrix_google>>>** with the ``[Endpoint Name]`` you chose to refer to the SAML application.


.. _google_saml_app1:

Step 2. Create a Google SAML App for Aviatrix
###############################################

.. note::

   This step is usually done by the Google Admin.

#. Login to the Google Admin portal
#. Follow `Google documentation <https://support.google.com/a/answer/6087519?hl=en>`__ to create a new **custom** application.

   Click on the `Setup My Own Custom App`

   |imageStep1|

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

.. _google_idp_metadata:

Step 3. Retrieve Google IdP metadata
#####################################

   Scroll down to `Option 2`.  Click the `Download` button next to the `IdP metadata` label.

   |imageStep2|

   The IdP metadata text will be used to configure the Aviatrix SP Endpoint.


.. _google_update_saml_endpoint:

Step 4. Update Aviatrix SP Endpoint
###################################

.. note::

   This step is usually completed by the Aviatrix admin.
   Google IdP provides IdP Metadata through text obtained in `Retrieve Google IdP metadata (Step 3) <google-idp-metadata>`_.

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
   | Access                  | Select admin or read-only access                |
   +-------------------------+-------------------------------------------------+
   | Custom SAML Request     | Unchecked                                       |
   | Template                |                                                 |
   +-------------------------+-------------------------------------------------+

.. note::
   Each endpoint only supports one type of access. If you need admin and read-only access, create two separate SAML apps.
   `Hostname` is the default for Entity ID, but if you have other apps using the same hostname, use a custom Entity ID.

#. Click `OK`

.. _google_test_integration:

Step 5. Test the Integration
############################

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
