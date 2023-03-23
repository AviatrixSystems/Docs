
.. toctree::
   :numbered:

==============================================================================
Centrify IdP for SAML Integration
==============================================================================

Overview
------------

This guide provides an example on how to configure Aviatrix to authenticate against Centrify IdP.  When SAML client is used, your Aviatrix controller acts as the Identity Service Provider (SP) that redirects browser traffic from client to IdP for authentication.

Before configuring SAML integration between Aviatrix and Centrify, make sure you have a valid Centrify account with administrator access.

Configuration Steps
-------------------

Follow these steps to configure Aviatrix to authenticate against your Azure AD IdP:

Step 1. Retrieve `Aviatrix SP Metadata <#centrify-saml-sp-metadata>`__ from the Aviatrix Controller

Step 2. Create a `Centrify SAML Application <#centrify-saml-app>`__ for Aviatrix

Step 3. Retrieve `Centrify IdP metadata <#centrify-idp-metadata>`__

Step 4. Update `Aviatrix SP Endpoint <#centrify-update-saml-endpoint>`__ in the Aviatrix Controller

Step 5. `Test the Integration <#centrify-test-integration>`__ is Set Up Correctly

..  _centrify_saml_sp_metadata:

Step 1. Retrieve Aviatrix SP Metadata from Aviatrix Controller
###############################################################

Before creating the Centrify SAML Application, Centrify requires the Service Provider (SP) metadata file from the Aviatrix Controller. You can create a temporary SP SAML endpoint to retrieve the SP metadata for now.
Later on in the guide, the SP SAML endpoint will be updated.

Follow one of the links below according to your use case:

#. If integrating Centrify IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-31>`_
#. If integrating Centrify IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-31>`_

For Centrify, right click the **SP Metadata** button next to the SAML endpoint and save the file.

   |image3|

   Here you can retrieve the SP metadata by clicking on the SP metadata

   |image4|

   .. tip::
      Copy the above metadata as text. It will be pasted into the Centrify IdP in the later steps.

    .. note::
       You can also use URL method if you have configured signed certificates for the Aviatrix Controller, but not for the initial self-signed certificate.


.. _centrify_saml_app:

Step 2. Create a Centrify SAML App for Aviatrix
###############################################

1. From the Centrify App->Add New App->Custom, select SAML and click on “Add”. Click yes and close the prompt. This lets you configure the application.

2. Configure app settings. Enter a name for your application, click Save and go to the next page

  |image0|

3. In the Metadata XML section, paste the SP metadata that was copied in the `previous section (Step 1) <#centrify-saml-sp_metadata>`_ Click on “Save” and go to the next section

  |image5|

.. note::

  You can also use URL method if you have configured signed certificates for the Aviatrix Controller, but not for the initial self-signed certificate.

4. Configure the following SAML attributes (Email is the unique identifier)

   +----------------+---------------------+
   | FirstName      | LoginUser.FirstName |
   +----------------+---------------------+
   | LastName       | LoginUser.LastName  |
   +----------------+---------------------+
   | Email          | LoginUser.Email     |
   +----------------+---------------------+

   Also, the custom logic needs to be set for the attributes to work

   setAttribute("exampleAttr", "DOMAIN\\user");

   |image6|

   You can preview the SAML response and this step and select the user.
   Make sure that there are no errors.

   Click “Save” and go to the next tab

#. Add users

  |image7|

  Click “Save” and go the next tab

#. Add any policies if you require them. Click “Save” and go to the next tab

#. Use the default “Directory service field” mapping. Click “Save” and go to the next tab

	|image8|

#. Configure the next pages if you require them, "Linked applications","Provisioning", "App Gateway" if you require them. Click “Save”. The SAML configuration at the IdP is now complete


.. _centrify_idp_metadata:

Step 3. Retrieve Centrify IdP metadata
#######################################

#. Copy the metadata URL from the Trust page.

	|image1|

.. _centrify_update_saml_endpoint:

Step 4. Update Aviatrix SP Endpoint
###########################

.. note::

   This step is usually completed by the Aviatrix admin.
   Centrify IdP provides IdP Metadata through URL obtained in `Retrieve Centrify IdP metadata (Step 3) <#centrify-idp-metadata>`_.

Continue with updating Aviatrix SAML Endpoint by visiting one of the following links based on your use case:

#. If integrating Centrify IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-34>`_
#. If integrating Centrify IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-34>`_

   +----------------------------+-----------------------------------------+
   | Field                      | Description                             |
   +----------------------------+-----------------------------------------+
   | Endpoint Name              | ``[Endpoint Name]``                     |
   +----------------------------+-----------------------------------------+
   | IPD Metadata Type          | URL                                     |
   +----------------------------+-----------------------------------------+
   | IdP Metadata Text/URL      | Paste in the **Issuer URL** obtained    |
   |                            | from the `Centrify app <#centrify-idpimetadata>`_.                  |
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

.. _centrify_test_integration:

Step 5. Test the Integration
#############################

.. tip::
  Be sure to assign users to the new application in Centrify prior to validating.  If you do not assign your test user to the Aviatrix SAML application, you will receive an error.

Continue with testing the integration by visiting one of the following links based on your use case:

1. If integrating Centrify IdP with `Controller Login SAML Config <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html#config-35>`_
  #. Click `Settings` in the left navigation menu
  #. Select `Controller`
  #. Click on the `SAML Login` tab
2. If integrating Centrify IdP with `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html#config-35>`_
  #. Expand `OpenVPN®` in the navigation menu and click `Advanced`
  #. Stay on the `SAML` tab

You can quickly validate that the configuration is complete by clicking on the **Test** button next to the SAML endpoint.


.. |image0| image:: centrify_media/image1.jpg

.. |image1| image:: centrify_media/image2.jpg

.. |image2| image:: centrify_media/image3.jpg

.. |image3| image:: centrify_media/image4.jpg

.. |image4| image:: centrify_media/image5.jpg

.. |image5| image:: centrify_media/image6.jpg

.. |image6| image:: centrify_media/image7.jpg

.. |image7| image:: centrify_media/image8.jpg

.. |image8| image:: centrify_media/image9.jpg

.. |image9| image:: centrify_media/image10.jpg

.. |image10| image:: centrify_media/image11.png
