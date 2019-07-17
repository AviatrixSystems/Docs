.. meta::
  :description: Cloud Networking Ref Design
  :keywords: cloud networking, aviatrix, Openvpn, SSL vpn, remote vpn, client vpn 


===================================
Configuring Aviatrix User SSL VPN
===================================

Aviatrix provides a cloud native and feature rich client `VPN <https://www.aviatrix.com/learning/glossary/vpn.php>`_ solution. The solution is based on OpenVPN® and is compatible with all OpenVPN® clients.  In addition, Aviatrix provides its own `client that supports SAML authentication <UserSSL_VPN_Okta_SAML_Config.html>`_ directly from the client. 

|image0|

.. note::

   Only AWS is drawn in the diagram, but this feature applies equally to Azure and Google Cloud.

Additional Information
----------------------
- `Aviatrix OpenVPN® features <./openvpn_features.html>`_ 
- `OpenVPN® FAQ <./openvpn_faq.html>`_
- `OpenVPN® design with multi VPCs <./Cloud_Networking_Ref_Des.html>`_

Configuration Workflow
----------------------

.. important::

   This document assumes you have set up an Aviatrix Controller.  Please see `this guide <../StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__ for more details.

There are 2 steps to setting up User VPN connectivity:

#. `Create a VPN Gateway <#create-a-vpn-gateway>`__
#. `Add a user <#create-vpn-users>`__

You can also `watch a video <https://www.youtube.com/watch?v=bbZFa8kVUQI&t=1s>`_ to learn how to setup remote user VPN. The video is not up to date as the product graphics has changed, but the idea remains the same. 

Create a VPN Gateway
^^^^^^^^^^^^^^^^^^^^

.. note::

   The description in the steps below provides critical fields to get you started. You can make changes to setup advanced features such as `MFA <https://docs.aviatrix.com/HowTos/gateway.html#mfa-authentication>`_ and profile based access later.  

#. Login to the Aviatrix Controller
#. Launch a gateway with VPN capability

   #. In the left navigation bar, click `Gateway`

   #. Click on the `+ New Gateway` button at the top of the page.

      |imageSelectGateway|

      .. important::

         You will need a public subnet in the VPC where the Gateway will be provisioned.  Be sure to provision a new one or identify the correct one prior to starting this step.

   #. Select the `Cloud Type` and enter a `Gateway Name`.

   #. Once the `Account Name` is selected, select the appropriate `Region` and `VPC`.

   #. After selecting the desired `VPC ID`, select the `Public Subnet` where the Gateway will be provisioned.

   #. Select the `Gateway Size` (t2.micro is sufficient for most test use cases).

      |imageCreateGateway|

   #. Select `VPN Access`. Leave the Advanced Options unselected.

      |imageSelectVPNAccess|

      .. note::

         Leave the Advanced Options unselected as you can configure it later.

      
   #. By default, `NLB <http://docs.aviatrix.com/HowTos/gateway.html#enable-elb>`_  will be enabled, meaning you can create more vpn gateways that are load balanced by the NLB. (NLB will be automatically created by Aviatrix.)


   #. If you wish to create more of such VPN gateways (for example, behind NLBs for load balancing), click `Save Template`. 

   #. Click `OK` to create the Gateway.

      .. note::

         Once you click `OK`, the Gateway will be provisioned and all the configuration will be applied.  This will take a minute or two.


VPN Users
^^^^^^^^^
Users can be added manually or authenticated with an existing LDAP server.

#. Login to the Aviatrix Controller
#. Expand OpenVPN® on the left navigation bar
#. Select `VPN Users`

   |imageOpenVPNUsers|

Create VPN Users
################

1. Click `+ Add New`
#. Select the `VPC ID` where this user should be attached.  The associated load balancer will appear in the `LB/Gateway Name`
#. Enter the `User Name` and `User Email`. The User Name must match the user name of your DUO account. The User Email is optional.
#. Click `OK`

   .. note::

      When a user is added to the database, an email with .ovpn file or .onc (for Chromebooks) will be sent to the user with detailed instructions.

   |imageAddNewVPNUser|

Download VPN User Certificate
###############################

You can also download the VPN user certificate to your desktop, as shown 
below. Load this certificate configuration file to your OpenVPN® client on your desktop. You should
be able to connect then.

|download_vpnfile| 

Conclusion
----------
You now have a working Aviatrix VPN Gateway.  Users can connect and gain access to their cloud resources.

Detailed audit logs are maintained and available in various logging platforms.

.. note::

   Audit reports are best viewed in `Aviatrix Splunk Application <AviatrixLogging.html#splunk-app-for-aviatrix>`__


.. |image0| image:: uservpn_media/AviatrixCloudVPN.png
   :width: 5.55625in
   :height: 3.26548in

.. |imageSelectGateway| image:: uservpn_media/select_gateway.png
   :scale: 50%

.. |imageCreateGateway| image:: uservpn_media/create_new_gateway.png
   :scale: 50%

.. |imageSelectVPNAccess| image:: uservpn_media/select_vpn_access.png

.. |imageOpenVPNProfiles| image:: uservpn_media/openvpn_profiles.png
   :scale: 50%

.. |imageOpenVPNUsers| image:: uservpn_media/openvpn_users.png

.. |imageAddNewProfile| image:: uservpn_media/add_new_profile.png
   :scale: 50%

.. |imageEditViewProfile| image:: uservpn_media/edit_view_profile.png
   :scale: 50%

.. |imageAddProfilePolicy| image:: uservpn_media/add_profile_policy.png
   :scale: 50%

.. |imageAddNewVPNUser| image:: uservpn_media/add_new_vpn_user.png
   :scale: 50%

.. |download_vpnfile| image:: uservpn_media/download_vpnfile.png
   :scale: 30%

OpenVPN is a registered trademark of OpenVPN Inc.

.. disqus::
