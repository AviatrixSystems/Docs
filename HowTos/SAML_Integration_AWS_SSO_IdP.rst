
.. toctree::
   :numbered:

==============================================================================
AWS SSO IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against AWS SSO IdP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (ISP) that redirects browser traffic from client to IdP (e.g., AWS SSO) for authentication.

Before configuring SAML integration between Aviatrix and AWS SSO, make sure you have a valid AWS account with administrator access.

  .. tip::

    If your AWS account is a consolidated account, you cannot set up SSO. SSO can only be enabled with a master account.

Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your AWS SSO IdP:

Step 1. Retrieve `Aviatrix SP Metadata <#awssso-saml-sp-metadata>`__ from the Aviatrix Controller

Step 2. Create an `AWS SSO SAML Application <#awssso-saml-app1>`__ for Aviatrix

Step 3. Retrieve `AWS SSO IdP metadata <#awssso-idp-metadata>`__

Step 4. Update `Aviatrix SP Endpoint <#awssso-update-saml-endpoint>`__ in the Aviatrix Controller

Step 5. `Test the Integration <#awssso-test-integration>`__ is Set Up Correctly

.. _awssso_saml_sp_metadata:

Step 1. Retrieve Aviatrix SP Metadata from Aviatrix Controller
##############################################################

Before creating the AWS SSO SAML Application, AWS SSO requires the Service Provider (SP) metadata file from the Aviatrix Controller. You can create a temporary SP SAML endpoint to retrieve the SP metadata for now.
Later on in the guide, the SP SAML endpoint will be updated.

Visit one of the following links based on your use case and follow step1 (Create temporary Aviatrix SP Endpoint for Aviatrix) from the link's Configuration section:

#. If integrating AWS SSO IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-31>`_
#. If integrating AWS SSO IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-31>`_

For AWS SSO, right click the **SP Metadata** button next to the SAML endpoint and save the file.

   |imageSPMetadataURL|

.. tip::
   Save this XML file to your local machine. It will be uploaded to the AWS SSO IdP in the later steps.

This step will ask you to pick a short name to be used for the SAML application name ``[Endpoint Name]``.  In the notes below we will refer to this as **aviatrix_awssso**.  It can be any string that will identify the SAML application you create in the IdP.

We will use the string you select for the SAML application name to generate a URL for AWS SSO to connect with Aviatrix.  This URL is defined below as **SP_ACS_URL**.  This URL should be constructed as:

``https://<<<your controller ip or host name>>>/flask/saml/sso/<<<aviatrix_awssso>>>``

.. tip::

  Replace **<<<your controller ip or host name>>>** with the actual host name or IP address of your controller and **<<<aviatrix_awssso>>>** with the ``[Endpoint Name]`` you chose to refer to the SAML application.

.. _awssso_saml_app1:

Step 2. Create an AWS SSO SAML Application
###########################################
.. note::

   This step is usually done by the AWS SSO Admin.

#. Login to your AWS console
#. Go to the AWS Single Sign-On service
#. Add a new Application (**Applications** > **Add a new application**)

   |imageAddAppsMenu|

#. Click **Custom SAML 2.0 application**

   |imageSelectCustom|

#. Enter a Display Name

#. Scroll to **Application metadata**
#. **Browse...** to the **SP Metadata** file saved in the `previous step (Step 1) <#awssso-saml-app>`_
#. Leave the **Application start URL** blank
#. Click **Save changes**

   |imageAppMetadata|

Add Attribute Mappings
++++++++++++++++++++++

#. Click on the **Attribute mappings** tab
#. Add the following attributes:

   +----------------------------+-----------------------------------------+
   | User attribute in the      | Maps to this string value or user       |
   | application                | attribute in the AWS SSO                |
   +============================+=========================================+
   | FirstName                  | ${user:givenName}                       |
   +----------------------------+-----------------------------------------+
   | LastName                   | ${user:familyName}                      |
   +----------------------------+-----------------------------------------+
   | Email                      | ${user:email}                           |
   +----------------------------+-----------------------------------------+

As shown below:

  |attribute_mapping|

#. Click **Save changes**

.. _awssso_idp_metadata:

Step 3. Retrieve AWS SSO IdP metadata
#####################################

Copy the **AWS SSO IdP metadata file** URL. This URL will be provided to the Aviatrix SP endpoint later on.

   |imageCopyURL|

.. _awssso_saml_app2:


.. _awssso_update_saml_endpoint:

Step 4. Update Aviatrix SP Endpoint
###################################

.. note::

   This step is usually completed by the Aviatrix admin.
   AWS SSO IdP provides IdP Metadata through URL obtained in `Retrieve AWS SSO IdP metadata (Step 3) <#awssso-idp-metadata>`_.
   AWS SSO IdP requires a custom SAML request template.

Continue with updating Aviatrix SAML Endpoint by visiting one of the following links based on your use case:

#. If integrating AWS SSO IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-34>`_
#. If integrating AWS SSO IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-34>`_

   +----------------------------+-----------------------------------------+
   | Field                      | Description                             |
   +----------------------------+-----------------------------------------+
   | Endpoint Name              | ``[Endpoint Name]``                     |
   +----------------------------+-----------------------------------------+
   | IPD Metadata Type          | URL                                     |
   +----------------------------+-----------------------------------------+
   | IdP Metadata Text/URL      | Paste in the                            |
   |                            | **AWS SSO SAML metadata file URL**      |
   |                            | copied earlier from  `AWS SSO dashboard <#awssso-idp-metadata>`_.  |
   +----------------------------+-----------------------------------------+
   | Entity ID                  | Select `Hostname`                       |
   +----------------------------+-----------------------------------------+
   | Access                     | Select admin or read-only access        |
   +----------------------------+-----------------------------------------+
   | Custom SAML Request        | Checked                                 |
   | Template                   |                                         |
   +----------------------------+-----------------------------------------+

.. note::
   Each endpoint only supports one type of access. If you need admin and read-only access, create two separate SAML apps.
   `Hostname` is the default for Entity ID, but if you have other apps using the same hostname, use a custom Entity ID.

   |add_saml_endpoint|


#. Remove the XML element ``<samlp:NameIdPolicy>..</samlp:NameIdPolicy>``

   .. note::
      This is required to connect with AWS SSO.  If you don't do this, you will receive an error message when testing.

#. Click **OK**
#. Right click on the **SP Metadata** button next to the SAML endpoint just created and save the file to your local machine.

   |imageSPMetadataURL|

   .. tip::
      Save this XML file to your local machine.  It will be used in the next step.

.. _awssso_test_integration:

5. Test the Integration
########################

.. tip::
   Be sure to assign users to the new application in AWS Single Sign-on service prior to validating.  You can use AWS SSO Directory service under AWS SSO page to assign users. If you do not assign your test user to the Aviatrix SAML application, you will receive an error.

Continue with testing the integration by visiting one of the following links based on your use case:

1. If integrating AWS SSO IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-35>`__

  #. Click `Settings` in the left navigation menu
  #. Select `Controller`
  #. Click on the `SAML Login` tab

2. If integrating AWS SSO IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-35>`__

  #. Expand `OpenVPN®` in the navigation menu and click `Advanced`
  #. Stay on the `SAML` tab

You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.

|imageAvtxTestButton|

.. |imageAddAppsMenu| image:: awssso_saml_media/add_new_application.png
.. |imageSelectCustom| image:: awssso_saml_media/select_custom_application.png
.. |imageCopyURL| image:: awssso_saml_media/copy_metadata_file_url.png
.. |imageAvtxSAMLEndpoint| image:: awssso_saml_media/avx_controller_saml.png
.. |imageSPMetadataURL| image:: awssso_saml_media/sp_metadata_button.png
.. |imageAvtxTestButton| image:: awssso_saml_media/avtx_test_button.png
.. |imageAppMetadata| image:: awssso_saml_media/application_metadata_save.png
.. |add_saml_endpoint| image:: awssso_saml_media/add_saml_endpoint.png
   :scale: 30%%
.. |attribute_mapping| image:: awssso_saml_media/attribute_mapping.png
   :scale: 30%%
