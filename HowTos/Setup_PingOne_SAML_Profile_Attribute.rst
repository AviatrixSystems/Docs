.. meta::
   :description: Setup PingOne for Customers web SAML app with Profile Attribute
   :keywords: Profile, PingOne, PingOne for Customers, SAML, user vpn, PingOne saml, Aviatrix, OpenVPN, Controller

===============================================================
Setup PingOne for Customers web SAML app with Profile Attribute
===============================================================

This guide demonstrates the use of the **Profile** attribute in **PingOne for Customers** so each SAML user can be assigned a different VPN profile.

How VPN profile works
---------------------

The VPN profiles defined at the **Controller/OpenVPN/Profiles** contain egress control policy.  They are attached
to the VPN users defined at **Controller/OpenVPN/VPN Users** for controlling their VPN egress traffic.
Users without a profile is the same as having a profile with an **allow-all** policy, i.e., their egress traffic are
unrestricted.

For SAML VPN, the SAML user definition at the IDP has a **Profile** attribute for
specifying a VPN profile, overriding
the corresponding user's VPN profile assigned at the controller.
If unspecified, the corresponding VPN profile assigned at the controller will be used.

.. _pingone_for_customers_setup:

Setup PingOne for Customers Profile attribute
---------------------------------------------

#. `Define a new User attribute <#pingone_for_customers_new_user_attribute>`__ in the PingOne for customers portal for storing the VPN profile name.

#. `Define an attribute mapping <#pingone_for_customers_map_attribute>`__ for the new attribute using the name **Profile** so that the web SAML application knows how to compose the **Profile** information in the SAML response.
   
#. `Assign VPN profile <#pingone_for_customers_user_fill_attribute>`__ to each SAML user.

#. `Validate <#pingone_for_customers_validation>`__ the setup.

.. _pingone_for_customers_new_user_attribute:

Define a new User attribute
----------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.
   
#. Login to the PingOne Admin portal

#. Follow `PingOne documentation <https://docs.pingidentity.com/bundle/p14c/page/zhb1564020491029.html>`__ to add an User attribute. 

#. On the top of the page, click Settings.

#. On the left, under Directory, click Attributes.

#. Click + Add Attribute.

   |image0|

#. Click DECLARED

#. Click button "Next"

   |image0|
   
#. Enter the following information to create custom user attribute:

+-----------------------+---------------+---------------------------------------------------------------------------+
| Field                 | Value         | Description                                                               |
+-----------------------+---------------+---------------------------------------------------------------------------+
| Name                  | accessprofile | A unique identifier for the attribute.                                    |
+-----------------------+---------------+---------------------------------------------------------------------------+
| Display name          | accessprofile | The name of the attribute as you want it to appear in the,user interface. |
+-----------------------+---------------+---------------------------------------------------------------------------+
| Description           | (optional)    | A brief characterization of the application.                              |
+-----------------------+---------------+---------------------------------------------------------------------------+
| Enforce unique values | Uncheck       | Option to require the attribute,values be unique across the environment   |
+-----------------------+---------------+---------------------------------------------------------------------------+

.. note::

   In this example, the new attribute is named **accessprofile**.


#. Click Save and Close.

   |image0|

.. _pingone_for_customers_map_attribute:

Define an attribute mapping
---------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.

#. On the top of the page, click Connections.

#. Click Applications on the left.

#. Locate the Web SAML application to add this custom User attribute.

#. Click the details icon to expand the Web SAML application, and then click the pencil icon.

#. Click the "Attribute Mappings"

#. For updating attribute mapping, click the button "+ADD ATTRIBUTE" and then select "PingOne Attribute" to map PingOne user attribute to an attribute in this application as below.

   +------------------------+-----------------------+
   | PINGONE USER ATTRIBUTE | APPLICATION ATTRIBUTE |
   +------------------------+-----------------------+
   | accessprofile          | Profile               |
   +------------------------+-----------------------+
   
.. note::

   The application attribute **Profile** is required to be an exact match so that Aviatrix Controller can process.
   
|image0|

.. _pingone_for_customers_user_fill_attribute:

Assign VPN profile to each SAML user
-------------------------------------

.. note::

   This step is usually completed by the PingOne for Customers Admin.

For each SAML application user, edit the user profile for assigning the VPN profile 

#. On the top of the page, click Identities.

#. Locate the user you want to edit. You can browse or search for users.

#. Click the details icon to expand the user you want to edit, and then click the pencil icon.

#. On the Profile tab, scroll down to the "OTHER" section

#. Find the new User attribute "accessprofile" and 

|image0|

For each SAML application user, edit the user record in the Okta directory for assigning the VPN profile (**Okta/Directory/People/<your-user>/Profile/Edit**).
In this example, the VPN profile defined at the controller is named **access-profile**.
Currently, only one profile is allowed per SAML user.

|add_profile_attribute_to_user|

.. _pingone_for_customers_validation:

Validation
----------

The following example illustrates the use of the SAML user's **Profile** attribute explained
in previous sections:

* It uses an Aviatrix VPN gateway that has **certificate sharing** enabled. That is,
  only one VPN user is created at the Aviatrix VPN gateway.
  The corresponding **ovpn** file will be shared by all SAML VPN users defined in Okta.

* Two VPN profiles are created: The **default-profile** contains a base deny-all policy and
  is attached to the VPN user, stopping all VPN egress traffic by default.
  The **access-profile** contains the
  desired egress-traffic-allow policies.
  As a result, only the SAML users who have his/her **Profile** attribute set to **access-profile** will
  have the right VPN access while others will be restricted by the **default-profile**.

* For testing purpose, create two SAML users in Okta, respectively, with and without setting the
  **Profile** attribute to **access-profile**.  Verify their VPN connection by
  checking the displayed profile of their VPN sessions at **Controller/Dashboard**.

Here are the steps for setting up the example:

#. Follow the guide `OpenVPN® with SAML Authentication on Okta IDP <https://docs.aviatrix.com/HowTos/UserSSL_VPN_Okta_SAML_Config.html>`__
   to configure the controller to authenticate against the Okta IDP.  The Aviatrix SAML Endpoint in this
   example is named vpn-5-1-okta (**Controller/OpenVPN/Advanced/SAML**):

   |vpn-5-1-okta|

#. Enable certificate sharing and split tunnel (**Controller/OpenVPN/Edit Config/<your-vpn-gw>**):

   |cert-sharing|

#. Create a **default-profile** with base deny-all policy (**Controller/OpenVPN/Profiles/Add new**). This default-profile
   will be attached to the VPN user, i.e., no egress traffic is allowed by default.

   |default-profile|

#. Create a second profile the **access-profile** with base deny-all policy and subsequently edit it
   to add the allowed egress traffic (**Controller/OpenVPN/Profiles/<access-profile>/Edit**). This VPN profile will be
   assigned to the SAML User at the Okta IDP.
   For the purpose of this test, it can contain any dummy policy:

   |access-profile|

#. Create one VPN user with the **default-profile** at the Aviatrix VPN gateway (**Controller/OpenVPN/VPN Users/Add new**):

   |vpn-user|

#. Download the **ovpn** file of the VPN user just created and load it into
   the Aviatrix VPN client.

   |download-cert|

#. Create two users in Okta (**Okta/Directory/People/Add Person**).
   For ease of identification, user1 is given an email address at gmail.com and user2
   at yahoo.com.

   |add-person|

#. Assign the SAML VPN application to the two users in Okta
   (**Okta/Directory/People/<your-saml-user>/Applications/Assign Applications**).
   In this example, **vpn-5-1** is our VPN SAML application.

   |assign-app|

#. Follow Steps 1 and 2 in `Setup Okta Profile attribute <#okta-setup>`__ to define the **Profile**
   attribute in Okta.

#. Follow `Assign VPN profile <#okta-fill-attribute>`__ to
   set user1's **Profile** attribute to **access-profile**.

#. From the Aviatrix VPN client, make a VPN connection using user1 Okta credential and observe the result at **Controller/Dashboard**.
   Repeat the same for user2. The following screenshots show the results.

   * User1 (gmail.com) with **Profile** attribute set to **access-profile**:

      |browser_user_with_profile|

      |dashboard_user_with_profile|

   * User2 (yahoo.com) without setting the **Profile** attribute:

      |browser_user_without_profile|

      |dashboard_user_without_profile|

.. |open_profile_editor| image:: Setup_Okta_SAML_Profile_Attribute_media/open_profile_editor.png
   :scale: 70%

.. |open_user_template| image:: Setup_Okta_SAML_Profile_Attribute_media/open_user_template.png
   :scale: 70%

.. |profile_editor_add| image:: Setup_Okta_SAML_Profile_Attribute_media/profile_editor_add.png
   :scale: 70%

.. |add_profile_attribute_to_user_template| image:: Setup_Okta_SAML_Profile_Attribute_media/add_profile_attribute_to_user_template.png
   :scale: 70%

.. |add_profile_attribute_to_app| image:: Setup_Okta_SAML_Profile_Attribute_media/add_profile_attribute_to_app.png
   :scale: 70%

.. |add_profile_attribute_to_user| image:: Setup_Okta_SAML_Profile_Attribute_media/add_profile_attribute_to_user.png
   :scale: 70%

.. |dashboard_user_with_profile| image:: Setup_Okta_SAML_Profile_Attribute_media/dashboard_user_with_profile.png
   :scale: 70%

.. |browser_user_with_profile| image:: Setup_Okta_SAML_Profile_Attribute_media/browser_user_with_profile.png
   :scale: 70%

.. |dashboard_user_without_profile| image:: Setup_Okta_SAML_Profile_Attribute_media/dashboard_user_without_profile.png
   :scale: 70%

.. |browser_user_without_profile| image:: Setup_Okta_SAML_Profile_Attribute_media/browser_user_without_profile.png
   :scale: 70%

.. |vpn-5-1-okta| image:: Setup_Okta_SAML_Profile_Attribute_media/vpn-5-1-okta.png
   :scale: 70%

.. |cert-sharing| image:: Setup_Okta_SAML_Profile_Attribute_media/cert-sharing.png
   :scale: 70%

.. |default-profile| image:: Setup_Okta_SAML_Profile_Attribute_media/default-profile.png
   :scale: 70%

.. |access-profile| image:: Setup_Okta_SAML_Profile_Attribute_media/access-profile.png
   :scale: 70%

.. |vpn-user| image:: Setup_Okta_SAML_Profile_Attribute_media/vpn-user.png
   :scale: 70%

.. |download-cert| image:: Setup_Okta_SAML_Profile_Attribute_media/download-ovpn.png
   :scale: 70%

.. |add-person| image:: Setup_Okta_SAML_Profile_Attribute_media/add-person.png
   :scale: 70%

.. |assign-app| image:: Setup_Okta_SAML_Profile_Attribute_media/assign-app.png
   :scale: 70%

.. disqus::
