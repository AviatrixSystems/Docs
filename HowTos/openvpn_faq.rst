.. meta::
   :description: OpenVPN® FAQ
   :keywords: Aviatrix OpenVPN, Client VPN, OpenVPN, SAML client, Remote User VPN

===========================
Aviatrix OpenVPN® FAQs
===========================


How do I launch a VPN gateway?
-----------------------------------

Click Gateway -> + New Gateway

The controller launches an Aviatrix gateway instance in
AWS/Azure/GCloud. The gateway instance must be launched from a public
subnet. You need to give it a name (The name is presented as a Gateway
Name field), this name becomes part of the instance name with a prefix
CloudOps.

In the Create page, select VPN Access to enable OpenVPN® server
capability. There is a default VPN CIDR “192.168.43.0/24”, but you can
change it to make sure the CIDR is outside the existing and future VPC
CIDR range. This VPN CIDR is where the VPN server assigns a virtual IP address
to each user when she connects.

You can select Save Template to save the gateway template. When you come
to the page the next time, most of the fields are pre populated. You may
change any of the fields.

How can I avoid managing multiple VPN user certs?
-------------------------------------------------

If you have multiple VPCs, launching a VPN gateway in each VPC and creating VPN users is not the correct way of management. It forces your developers to carry multiple .ovpn certs and learn when to use which one when connecting to a VPC. 
`Leverage VPC to VPC connectivity to build a scalable solution. <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_

How do I scale out VPN solution?
-------------------------------------

You can launch multiple `VPN gateways <https://docs.aviatrix.com/HowTos/uservpn.html>`_ in the same VPC. 
By default the first VPN gateway in a VPC is launched with a NLB. Subsequent VPN gateways in the same VPC
are automatically associated with the same NLB, enabling a scale out VPN solution, where the NLB load balances incoming VPN user sessions.    

Consistent gateway configuration is required when NLB is
enabled. For example, authentication methods, tunnel modes and PBR
configurations should be identical.

How do I setup Okta authentication for VPN?
--------------------------------------------------

An Aviatrix vpn gateway integrates seamlessly with Okta. It can authenticate vpn users
to Okta service using Okta's OpenVPN® plugin in module.
Follow this link for directions: `How to setup Okta for Aviatrix VPN
gateway <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`__

How do I enable Geo VPN?
------------------------------

If you have a global workforce that needs to access the cloud, Geo VPN
offers a superior solution. Geo VPN enables a VPN user to connect to the
nearest VPC that hosts an Aviatrix VPN gateway.

To enable Geo VPN, go to OpenVPN® -> GEO VPN.

Also check out `this link for help. <http://docs.aviatrix.com/HowTos/GeoVPN.html>`_

How do I add a VPN user?
-----------------------------


After at least one gateway is created, you can add VPN users.

Click OpenVPN® -> VPN Users -> +Add New.

When a user is added, an email is sent to the user with instructions on how to download client software and connect to a VPN server. You can customize this email by updating the settings at "OpenVPN -> Advanced -> Email". You could also use your own SMTP server to send these emails out by following `these instructions <https://docs.aviatrix.com/HowTos/alert_and_email.html#how-to-change-source-of-email-notification>`_

If you prefer to not share the .ovpn file with your users via email, do not enter the email address when you add a VPN user. You can then download the .ovpn file from OpenVPN -> VPN Users -> Select VPN User and then download the file and share it with your VPN user via your preferred file share mechanism.

If you would like to assign user profile based policies, you need to create
profiles first. See the next section.

What user devices are VPN client software supported?
----------------------------------------------------------


Windows, MAC, Linux, Chromebook, Android and iOS devices are supported.

Is NAT capability supported on the gateway?
-------------------------------------------------


Yes, you can enable NAT function at gateway launch time. When enabled,
instances on the private subnet can access the Internet directly.

If full tunnel mode is selected, you may want to enable NAT to allow
instances in the VPC to have direct Internet access.

Is full tunnel mode supported on the gateway?
---------------------------------------------------


Yes, both split tunnel and full tunnel modes are supported. You can
specify the mode at the gateway launch time.

Full tunnel means all user traffic is carried through the VPN tunnel to
the gateway, including Internet bound traffic.

Split tunnel means only traffic destined to the VPC and any additional
network range is carried through the VPN tunnel to the gateway. Any
Internet bound traffic does not go through the tunnel.

To enable full tunnel mode, go to Edit Config -> MODIFY SPLIT TUNNEL, select No, as shown below.

|full_tunnel|

Can the maximum number of simultaneous connections to VPN gateway be configured?
--------------------------------------------------------------------------------------


Yes, you can set the maximum number of connections at the gateway launch
time.


What is user profile based security policy?
--------------------------------------------


In VPN access, a user is dynamically assigned a virtual IP address when
connected to a gateway. It is highly desirable to define resource access
policies based on the users. For example, you may want to have a policy
for all employees, a different policy for partners and a still different
policy for contractors. You may even give different policies to
different departments and business groups.

The profile based security policy lets you define security rules to a
target address, protocol and ports. The default rule for a profile can
be configured as deny all or allow all during profile creation. This
capability allows flexible firewall rules based on the users, instead of
a source IP address.

The security policy is dynamically pushed to the landing VPN gateway when a VPN user connects. 
It is only active when a VPN user is connected. When a VPN user disconnects, 
the security policy is deleted from the VPN gateway.  

How do I setup profile based security policies?
--------------------------------------------------


When a user connects to a VPC, the security policies associated with the
profile that the user is assigned to are applied to the VPN gateway
instance that user logs in. This effectively blocks traffic from
entering the network.

Click OpenVPN® -> Profiles -> +New Profile to create profiles, then click Edit
Policies to add rules. You can add multiple of them. Click Save. Click Update for the rules to take effect.

|profile_config|

How do I assign a user to a profile?
-------------------------------------


When you create a VPN user at OpenVPN® -> VPN Users -> +Add New, you
can select profile option to assign the user to a specific profile.

You can also attach the user to a profile at a later time. Go to OpenVPN® -> Profiles. Click Attach User on a specific Profile and select a user that is added to the VPN gateway.

|assign_user_to_profile|

What if I want to change profile policies?
-------------------------------------------


You can change profile policies any time. However, users who are
currently active in the session will not receive the new policy. The user
will need to disconnect and reconnect to VPN for the new policy to take
effect.

How do I change a user’s profile programmatically?
------------------------------------------------------


The controller provides a REST API which can be invoked to change a
user’s profile. Refer to API documentation under the Help menu.

During this operation, the user’s existing VPN session will be
terminated. The new profile policy will take effect when he or she logs
in again.

The use case for this feature is to allow an administrator to quarantine a
VPN user for security reasons.



Is DUO multi-factor authentication supported?
-----------------------------------------------


Yes. If your enterprise has a DUO account with multi-factor
authentication, it can be integrated into the VPN solution. From
Gateways tab, click Create. At the two-step authentication drop down menu,
select DUO, then enter your company Integration Key, Secret Key and API
hostname.

To obtain an Integration Key, Secret key and API hostname, log in to the DUO
website, `www.duo.com <http://www.duo.com>`__ as an admin. Click on the
left panel Applications, click Protect an Application below. Scroll down
the application list and select OpenVPN® (click Protect this
Application), the next screen should reveal the credentials you need to
configure on the Aviatrix controller.

For additional help, follow `this instruction. <http://docs.aviatrix.com/HowTos/duo_auth.html>`_

Currently, advanced features such as Trusted Device and Trusted Networks
are not supported. Send us a request if you would like to integrate these
features.

How do I configure LDAP authentication?
----------------------------------------

See details `here <./VPNUsers_LDAP.html>`__.

Can I combine LDAP and DUO authentication?
-------------------------------------------


Yes. With both LDAP and DUO authentication methods enabled on a gateway,
when launching the VPN client, a remote user will have to enter his or
her LDAP user credentials and then approve the authentication request
received on a registered mobile device to login to the VPN.

Is OKTA supported?
-------------------


Yes. OKTA with MFA is also supported. Follow the
`instructions <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`__



How does Policy Based Routing (PBR) work?
------------------------------------------


When PBR is enabled at gateway launch time, all VPN user traffic that arrives
at the gateway will be forwarded to a specified IP address defined as
the PBR default gateway. The user must specify the PBR Subnet which in AWS must
be in the same availability zone as the Ethernet 0 interface of the gateway.

When the PBR feature is combined with encrypted peering capability, a VPN user
should be able to access any instances in the peered VPC/VNets. This
helps build an end to end cloud networking environment. For details,
check out our `reference
design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

Another use case for Policy Based Routing is if you would like to route all
Internet bound traffic back to your own firewall device on Prem, or log
all user VPN traffic to a specific logging device. PBR lets you
accomplish that.



What are the monitoring capabilities?
-----------------------------------------

Active VPN users are displayed on the Dashboard. Click on any username and
the user VPN connectivity history is displayed.

You can also disconnect a user from the dashboard.

Does the Aviatrix OpenVPN® solution support SAML client?
-----------------------------------------------------

Yes. The Aviatrix VPN client is the only OpenVPN® based client software that supports SAML 
authentication from the client software itself. Read `here <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_ to learn more. 


When should I use the Aviatrix VPN client?
-------------------------------------------

Aviatrix's `VPN Client <../Downloads/samlclient.html>`__ supports SAML authentication from the VPN client itself.  If you need the VPN client itself to authenticate against an IDP (for example, Okta, Google, AWS SSO and Azure AD), you will need to use the Aviatrix VPN client.

An Aviatrix VPN gateway can authenticate a VPN user against OKTA on behalf of a VPN user.  In that case, the Aviatrix VPN client is not needed, and any OpenVPN® client software such as Tunnelblick can be supported.

Are multiple VPN configuration profiles supported by the Aviatrix VPN client?
--------------------------------------------------------------------------------

Note that this is about the OpenVPN® configuration file that is installed on end user machines. 

Aviatrix's `VPN Client <../Downloads/samlclient.html>`__ allows you to load and switch between one or more VPN profiles.

Load multiple configurations:

#. Open the client
#. Click on the `Advanced` button
#. Select the `Profile` tab
#. Click `Add` button
#. Enter a name for the new profile
#. Select the configuration file

Switch to a different configuration:

#. Open the client
#. Click the `Connect` button.  A drop down will appear.
#. Select the profile from the list
   
What is "Client Certificate Sharing"?
-------------------------------------

Enabling this feature allows the same user to be logged in from more than one location at a time.  If this option is disabled and a user logs in from a second location, the first location will be disconnected automatically.


How do I fix the Aviatrix VPN timing out too quickly?
----------------------------------------------

- How do I change the Renegotiation interval? 

#. Login to your Aviatrix Controller
#. Expand OpenVPN navigation menu and select **Edit Config**
#. Select the VPC/VNet (or DNS Name) and the Gateway
#. Scroll to the **Modify VPN Configuration** section
#. Set the `Name` drop down to **Renegotiation interval**
#. Change the `Status` to **Enabled**
#. Set the `Value (seconds)` to the desired timeout value
#. Click **OK**

|imageRenegotiationInterval|

.. note::

  We have a known issue of "Aviatrix VPN times out too quickly", but it is fixed in the releases after UCC 3.2. If you are using a VPN gateway that was created before release UCC 3.2 and would like to solve this issue, please first follow the above steps for "Renegotiation interval" and then disable it as below:
#. Set the `Name` drop down to **Renegotiation interval**
#. Change the `Status` to **Disabled**
#. Click **OK**


- How do I change the idle timeout?

#. Login to your Aviatrix Controller
#. Expand OpenVPN navigation menu and select **Edit Config**
#. Select the VPC/VNet (or DNS Name) and the Gateway
#. Scroll to the **Modify VPN Configuration** section
#. Set the `Name` drop down to **Idle timeout**
#. Change the `Status` to **Enabled**
#. Set the `Value (seconds)` to the desired timeout value
#. Click **OK**

|imageIdleTimeout|

.. note::

  We have a known issue "Aviatrix VPN times out too quickly", but it is fixed in the releases after UCC 3.2. If you are using a VPN gateway which was created before release UCC 3.2 and would like to solve this issue, please first follow the above steps for "idle timeout" and then disable it as below:
#. Set the `Name` drop down to **Idle timeout**
#. Change the `Status` to **Disabled**
#. Click **OK**

Where do I find the log for the Aviatrix Client?
-------------------------------------------------

#. Open the Aviatrix VPN Client
#. Click on the **Advanced** button
#. Click on the **Advanced** tab
#. Click on the **View** button next to the `View the log file` label

|imageClientLog|

Why can't my VPN client access a newly created VPC?
------------------------------------------------------------------

If you are using Split Tunnel mode, it is very likely that the new VPC CIDR is not part of CIDR ranges that the Aviatrix VPN gateway pushes down to the client when the VPN client connects. To fix it, 
follow these steps:

 1. At the main navigation menu, go to OpenVPN® -> Edit Config 
 #. Scroll down to MODIFY SPLIT TUNNEL, select yes to Split Tunnel Mode.
 #. At `Additional CIDRs <https://docs.aviatrix.com/HowTos/gateway.html#additional-cidrs>`_, enter the list of CIDR blocks including the new VPC CIDR that you wish the VPN client to access. 
 #. When complete, click Modify for the configuration to take effect. 
 #. Disconnect the VPN client and connect again, the new CIDR should take effect. 

How do I turn off NAT with an OpenVPN® gateway?
----------------------------------------------

An Aviatrix OpenVPN® gateway performs a NAT function for the user's VPN traffic, effectively masking out the VPN client's virtual IP address assigned by gateway from the `VPN CIDR Block <https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block>`_. This does not affect profile based policy enforcement as the landing vpn gateway has the information of the virtual IP address before NAT is performed and enforces policies based on user identification. 

If you do want to preserve the virtual IP address after the client packet leaves the gateway, you can do by enabling `PBR function <https://docs.aviatrix.com/HowTos/gateway.html#enable-policy-based-routing-pbr>`_. 

What IP Address is used for NAT'ing the VPN Clients?
-------------------------------------------------------

If the destination is another instance within the cloud provider, then the OpenVPN gateway’s private IP address is used to NAT the OpenVPN Client's traffic. But if the destination is outside the cloud provider(the Internet), then the public IP address of the OpenVPN Gateway is used.

   
OpenVPN® is a registered trademark of OpenVPN Inc.

.. |image1| image:: FAQ_media/image1.png
.. |imageIdleTimeout| image:: FAQ_media/idle_timeout.png
.. |imageClientLog| image:: FAQ_media/aviatrix_client_get_log.png
.. |imageRenegotiationInterval| image:: FAQ_media/renegotiation_interval.png

.. |full_tunnel| image:: FAQ_media/full_tunnel.png
   :scale: 30%

.. |profile_config| image:: FAQ_media/profile_config.png
   :scale: 30%

.. |assign_user_to_profile| image:: FAQ_media/assign_user_to_profile.png
   :scale: 30%

.. |windows_client| image:: openvpn_faq_media/windows_client.png
   :scale: 30%

.. |linux_client| image:: openvpn_faq_media/linux_client.png
   :scale: 30%
.. disqus::
