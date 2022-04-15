.. meta::
   :description: Setup PingOne for Customers web SAML app with Profile Attribute
   :keywords: Profile, PingOne, PingOne for Customers, SAML, user vpn, PingOne saml, Aviatrix, OpenVPN, Controller

===============================================================
Setting up PingOne for Customers Web SAML App with Profile Attribute
===============================================================

This guide demonstrates the use of the **Profile** attribute in **PingOne for Customers** so each SAML user can be assigned a different VPN profile.

How a VPN Profile Works
----------------------------------

The VPN profiles defined at the **Controller/OpenVPN/Profiles** contain egress control policy.  They are attached to the VPN users defined at **Controller/OpenVPN/VPN Users** for controlling their VPN egress traffic. Users without a profile is the same as having a profile with an **allow-all** policy, i.e., their egress traffic are unrestricted.

For SAML VPN, the SAML user definition at the IDP has a **Profile** attribute for specifying a VPN profile, overriding the corresponding user's VPN profile assigned at the Controller. If unspecified, the corresponding VPN profile assigned at the controller will be used.

.. _pingone_for_customers_setup:

Setting up PingOne for Customers Profile Attribute
-----------------------------------------------------------------

#. `Define a new User attribute <#pingone-for-customers-new-user-attribute>`__ in the PingOne for customers portal for storing the VPN profile name.

#. `Define an attribute mapping <#pingone-for-customers-map-attribute>`__ for the new attribute using the name **Profile** so that the web SAML application knows how to compose the **Profile** information in the SAML response.
   
#. `Assign VPN profile <#pingone-for-customers-user-fill-attribute>`__ to each SAML user.

#. `Validate <#pingone-for-customers-validation>`__ the setup.

.. _pingone_for_customers_new_user_attribute:

Defining a New User Attribute
-----------------------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.
   
1. Log into the PingOne Admin portal.
2. Follow `PingOne documentation <https://docs.pingidentity.com/bundle/p14c/page/zhb1564020491029.html>`__ to add an User attribute. 
3. On the top of the page, click **Settings**.
4. On the left, under Directory, click **Attributes**.
5. Click **+ Add Attribute**.

   |pingone_idp_adding_attribute|

6. Click **Declared**.

   |pingone_idp_adding_attribute_declared|

7. Click **Next**.
8. Enter the following information to create the custom user attribute:

   +-----------------------+---------------+---------------------------------------------------------------------------+
   | Field                 | Value         | Description                                                               |
   +-----------------------+---------------+---------------------------------------------------------------------------+
   | Name                  | accessprofile | A unique identifier for the attribute.                                    |
   +-----------------------+---------------+---------------------------------------------------------------------------+
   | Display name          | accessprofile | The name of the attribute as you want it to appear in the user interface. |
   +-----------------------+---------------+---------------------------------------------------------------------------+
   | Description           | (optional)    | A brief characterization of the application.                              |
   +-----------------------+---------------+---------------------------------------------------------------------------+
   | Enforce unique values | Uncheck       | Option to require the attribute values be unique across the environment   |
   +-----------------------+---------------+---------------------------------------------------------------------------+

   .. note::

      In this example, the new user attribute is named **accessprofile**.

   |pingone_idp_setting_attribute|

9. Click **Save and Close**.

.. _pingone_for_customers_map_attribute:

Defining an Attribute Mapping
------------------------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.

#. On the top of the page, click **Connections**.
#. Click **Applications** on the left.
#. Locate the Web SAML application to add this custom User attribute.
#. Click the details icon to expand the Web SAML application, and then click the pencil icon.
#. Click **Attribute Mappings**.
#. For updating attribute mapping, click the button **+Add Attribute** and then select **PingOne Attribute** to map PingOne user attribute to an application attribute as below.

   +------------------------+-----------------------+
   | PingOne Attribute | Application Attribute |
   +------------------------+-----------------------+
   | accessprofile          | Profile               |
   +------------------------+-----------------------+
   
   .. note::

      The application attribute **Profile** is required to be an exact match so that Aviatrix Controller can process in the SAML response.
   
   |pingone_idp_saml_attribute_mapping|

.. _pingone_for_customers_user_fill_attribute:

Assigning VPN Profile to Each SAML User
----------------------------------------------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.

For each SAML application user, edit the user profile for assigning the VPN profile.

#. On the top of the page, click **Identities**.
#. Locate the user you want to edit. You can browse or search for users.
#. Click the details icon to expand the user you want to edit, and then click the pencil icon.
#. On the Profile tab, scroll down to the **Other** section.
#. Find the new User attribute "accessprofile" and assign the VPN profile.

   .. note::

      In this example, the VPN profile defined at the Controller is named **access-profile**.

   |pingone_idp_vpn_profile|

.. _pingone_for_customers_validation:

Validation
----------

Please refer to this `doc <https://docs.aviatrix.com/HowTos/Setup_Okta_SAML_Profile_Attribute.html#validation>`__ for more validation details.


.. |pingone_idp_adding_attribute| image:: Setup_PingOne_SAML_Profile_Attribute_media/pingone_idp_adding_attribute.png

.. |pingone_idp_adding_attribute_declared| image:: Setup_PingOne_SAML_Profile_Attribute_media/pingone_idp_adding_attribute_declared.png

.. |profile_editor_add| image:: Setup_PingOne_SAML_Profile_Attribute_media/profile_editor_add.png

.. |pingone_idp_setting_attribute| image:: Setup_PingOne_SAML_Profile_Attribute_media/pingone_idp_setting_attribute.png

.. |pingone_idp_saml_attribute_mapping| image:: Setup_PingOne_SAML_Profile_Attribute_media/pingone_idp_saml_attribute_mapping.png

.. |pingone_idp_vpn_profile| image:: Setup_PingOne_SAML_Profile_Attribute_media/pingone_idp_vpn_profile.png

.. disqus::
