.. meta::
   :description: Setup Okta SAML with Profile Attribute
   :keywords: Okta, Profile

=======================================
Setting up Okta SAML with Profile Attribute
=======================================

This guide demonstrates the use of the **Profile** attribute in **Okta** so each SAML user can be assigned a different
VPN profile.

How a VPN Profile Works
-----------------------------------------

The VPN profiles defined at the **Controller/OpenVPN/Profiles** contain an egress control policy. They are attached
to the VPN users defined at **Controller/OpenVPN/VPN Users** for controlling their VPN egress traffic.
Users without a profile is the same as having a profile with an **allow-all** policy, i.e., their egress traffic are
unrestricted.

For SAML VPN, the SAML user definition at the IDP has a **Profile** attribute for
specifying a VPN profile, overriding
the corresponding user's VPN profile assigned at the Controller.
If unspecified, the corresponding VPN profile assigned at the Controller will be used.

.. _okta_setup:

Setting up the Okta Profile Attribute
--------------------------------------------------

#. `Define a new attribute <#okta-new-attribute>`__ in the Okta User template for storing the VPN profile name.
#. `Define an attribute mapping <#okta-map-attribute>`__
   for the new attribute using the name **Profile**
   so that the SAML application
   knows how to compose the **Profile** information in the SAML response.
#. `Assign VPN profile <#okta-fill-attribute>`__ to each SAML user.
#. `Validate <#okta-validation>`__ the setup.

.. _okta_new_attribute:

Defining a New Attribute
--------------------------------

At Okta, define a new attribute in the **User** definition template using
**Okta/Directory/Profile Editor**.  In this example, the new attribute is named **accessprofile** and
it can store a string of up to 20 characters.

1. Open Profile Editor at **Okta/Directory/Profile Editor**.

   |open_profile_editor|

2. Click **Okta** on the left navigation bar to find the **User** definition template and click **Profile** to open.

   |open_user_template|

3. Click **Add Attribute** to add a new attribute in the user template.

   |profile_editor_add|

4. Define a string attribute with a name; in this example, we use **accessprofile**.

   |add_profile_attribute_to_user_template|

.. _okta_map_attribute:

Defining an Attribute Mapping
-----------------------------------------

In the SAML application (**Okta/Applications/<your-vpn-saml-app>/General/SAML Settings/Edit**),
define a mapping for the new attribute (e.g., **accessprofile**)
using the name **Profile**.
Note that the name **Profile** is required to be an exact match and the new attribute name is
pre-qualified with the keyword **user** for referencing a property in the user template.

|add_profile_attribute_to_app|

.. _okta_fill_attribute:

Assigning the VPN Profile to Each SAML User
---------------------------------------------------------

For each SAML application user, edit the user record in the Okta directory for assigning the VPN profile (**Okta/Directory/People/<your-user>/Profile/Edit**).
In this example, the VPN profile defined at the Controller is named **access-profile**.
Currently, only one profile is allowed per SAML user.

|add_profile_attribute_to_user|

.. _okta_validation:

Validation
-------------------

The following example illustrates the use of the SAML user's **Profile** attribute explained
in previous sections:

* It uses an Aviatrix VPN Gateway that has **certificate sharing** enabled. That is,
  only one VPN user is created at the Aviatrix VPN Gateway.
  The corresponding **ovpn** file will be shared by all SAML VPN users defined in Okta.

* Two VPN profiles are created: The **default-profile** contains a base deny-all policy and
  is attached to the VPN user, stopping all VPN egress traffic by default.
  The **access-profile** contains the
  desired egress-traffic-allow policies.
  As a result, only the SAML users who have his/her **Profile** attribute set to **access-profile** will
  have the right VPN access while others will be restricted by the **default-profile**.

* For testing purposes, create two SAML users in Okta, respectively, with and without setting the
  **Profile** attribute to **access-profile**. Verify their VPN connection by
  checking the displayed profile of their VPN sessions at **Controller/Dashboard**.

Here are the steps for setting up the example:

#. Follow the guide `OpenVPN® with SAML Authentication on Okta IDP <https://docs.aviatrix.com/HowTos/UserSSL_VPN_Okta_SAML_Config.html>`__
   to configure the Controller to authenticate against the Okta IDP.  The Aviatrix SAML Endpoint in this
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

#. Create one VPN user with the **default-profile** at the Aviatrix VPN Gateway (**Controller/OpenVPN/VPN Users/Add new**):

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
