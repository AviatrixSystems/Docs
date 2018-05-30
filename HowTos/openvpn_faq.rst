.. meta::
   :description: OpenVPN® FAQ
   :keywords: Aviatrix OpenVPN, Client VPN, OpenVPN, SAML client

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
capability. There is a default VPN CIDR “192.168.43.0/24”. But you can
change it, make sure the CIDR is outside the existing and future VPC
CIDR range. This VPN CIDR is where VPN server assign virtual IP address
to each user when she connects.

You can select Save Template to save the gateway template. When you come
to the page the next time, most of the fields are pre populated. You may
change any of the fields.

How can I avoid managing multiple VPN user certs?
-------------------------------------------------

If you have multiple VPCs, launching a VPN gateway in each VPC and create VPN users is not the correct way to manage. It forces your developers to carry multiple .ovpn certs and learn when to use which one when connecting to a VPC. 
`Leverage VPC to VPC connectivity to build a scalable solution. <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`_

How do I scale out VPN solution?
-------------------------------------

You can launch multiple VPN gateways in the same VPC at the Create
Gateway time.

While launching a gateway, select yes for “Enable AWS ELB”. This will
automatically create an AWS ELB (for the first gateway) and register the
gateway with the newly created load balancer. VPN traffic will be load
balanced across these multiple gateways.

It is required to have consistent gateway configuration when ELB is
enabled. For example, authentication methods, tunnel modes and PBR
configurations should be identical.

How do I setup Okta authentication for VPN?
--------------------------------------------------

Aviatrix vpn gateway integrates seamlessly with Okta. It can authenticate vpn users
to Okta service using Okta's OpenVPN® pluggin in module.
Follow the link: `How to setup Okta for Aviatrix VPN
gateway <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`__

How do I enable Geo VPN?
------------------------------

If you have global workforce that needs to access the cloud, Geo VPN
offers a superior solution. Geo VPN enables a VPN user to connect to a
nearest VPC that hosts Aviatrix VPN gateway.

To enable Geo VPN, go to OpenVPN® -> GEO VPN.

Also check out `this link for help. <http://docs.aviatrix.com/HowTos/GeoVPN.html>`_

How do I add a VPN user?
-----------------------------


After at least one gateway is created, you can add VPN users.

Click OpenVPN® -> VPN Users -> +Add New.

When a user is added, an email is sent to the user with instructions on
how to download client software and connect to VPN server.

If you like to assign user profile based policies, you need to create
profiles first, see the next section.

What user devices are VPN client software supported?
----------------------------------------------------------


Windows, MAC, Linux, Chromebook, Android and iOS devices are supported.

Is NAT capability supported on the gateway?
-------------------------------------------------


Yes, you can enable NAT function at gateway launch time. When enabled,
instances on the private subnet can access Internet directly.

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

How do I setup profile based security policies?
--------------------------------------------------


When a user connects to a VPC, the security policies associated with the
profile that the user is assigned to are applied to the VPN gateway
instance that user logs in. This effectively blocks traffic from
entering the network.

Click OpenVPN® -> Profiles -> +New Profile to create profiles, then click Edit
Policies to add rules. You can add multiple of them, then click on Save.

How do I assign a user to a profile?
-------------------------------------


When you create a VPN user at OpenVPN® -> VPN Users -> +Add New, you
can select profile option to assign the user to a specific profile.

You can also attach the user to a profile at a later time. Go to OpenVPN® -> Profiles. Click Attach User on a specific Profile and select a user that is added to the VPN gateway.

What if I want to change profile policies?
-------------------------------------------


You can change profile policies any time. However, the users who are
currently active in session will not receive the new policy. The user
need to disconnect and reconnect to VPN for the new policy to take
effect.

How do I change a user’s profile programmatically?
------------------------------------------------------


The controller provides a REST API which can be invoked to change a
user’s profile. Refer to API document under Help menu.

During this operation, the user’s existing VPN session will be
terminated. The new profile policy will take effect when he or she logs
in again.

The use case for this feature is to allow administrator to quarantine a
VPN user for security reasons.



Is DUO multi-factor authentication supported?
-----------------------------------------------


Yes. If your enterprise has a DUO account with multi-factor
authentication, it can be integrated into the VPN solution. From
Gateways tab, click Create. At two-step authentication drop down menu,
select DUO, then enter your company Integration Key, Secret Key and API
hostname.

To obtain Integration Key, Secret key and API hostname, login to DUO
website as an admin, `www.duo.com <http://www.duo.com>`__, click on the
left panel Applications, click Protect an Application below. Scroll down
the application list and select OpenVPN® (click Protect this
Application), the next screen should reveal the credentials you need to
configure on the Aviatrix controller.

For additional help, follow `this instruction. <http://docs.aviatrix.com/HowTos/duo_auth.html>`_

Currently advanced feature such as Trusted Device and Trusted Networks
are not supported. Send us a request if you like to integrate these
features.

How do I configure LDAP authentication?
----------------------------------------


LDAP configuration is part of the Gateway creation when VPN Access is
enabled. Enter the necessary parameters and click Enable button to
enable LDAP authentication for VPN clients. If your LDAP server is
configured to demand client certificates for incoming TLS connections,
upload a client certificate in PEM format (This certificate should
contain a public and private key pair).

Can I combine LDAP and DUO authentication?
-------------------------------------------


Yes. With both LDAP and DUO authentication methods enabled on a gateway,
when launching the VPN client, a remote user will have to enter his or
her LDAP user credentials and then approve the authentication request
received on a registered mobile device to login to VPN.

Is OKTA supported?
-------------------


Yes. OKTA with MFA is also supported. Follow the
`instructions <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`__



How does Policy Based Routing (PBR) work?
------------------------------------------


When PBR is enabled at gateway launch time, all VPN user traffic arrives
at the gateway will be forwarded to a specified IP address defined as
PBR default gateway. User must specify the PBR Subnet which in AWS must
be in the same availability zone as Ethernet 0 interface of the gateway.

When PBR feature is combined with encrypted peering capability, VPN user
should be able to access any instances in the peered VPC/VNets. This
helps build an end to end cloud networking environment. For details,
check out our `reference
design <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__.

Another use case for Policy Based Routing is if you like to route all
Internet bound traffic back to your own firewall device on Prem, or log
all user VPN traffic to a specific logging device, PBR lets you
accomplish that.



What are the monitoring capabilities?
-----------------------------------------

Active VPN users are displayed on the Dashboard. Click on any username,
the user VPN connectivity history is displayed.

You can also disconnect a user from the dashboard.


When should I use the Aviatrix VPN client?
-------------------------------------------

Aviatrix's `VPN Client <../Downloads/samlclient.html>`__ supports SAML authentication from the VPN client itself.  If you need the VPN client itself to authenticate against an IDP (for example, Okta or Duo), you will need to use the Aviatrix VPN client.

Aviatrix VPN gateway can authenticate a VPN user against OKTA on behalf of a VPN user.  In that case, you don’t need Aviatrix VPN client, any OpenVPN® clients software such as Tunnelblick can be supported.

Are multiple profiles supported by the Aviatrix VPN client?
-----------------------------------------------------------

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
#. Click `Connect` button.  A drop down will appear.
#. Select the profile from the list
   
What is "Client Certificate Sharing"?
-------------------------------------

Enabling this feature allows the same user to be logged in from more than one location at a time.  If this option is disabled and a user logs in from a second location, the first location will be disconnected automatically.


How do I change the idle timeout?
---------------------------------

#. Login to your Aviatrix Controller
#. Expand OpenVPN navigation menu and select **Edit Config**
#. Select the VPC/VNet (or DNS Name) and the Gateway
#. Scroll to the **Modify VPN Configuration** section
#. Set the `Name` drop down to **Idle timeout**
#. Change the `Status` to **Enabled**
#. Set the `Value (seconds)` to the desired timeout value
#. Click **OK**

|imageIdleTimeout|


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image1| image:: FAQ_media/image1.png
.. |imageIdleTimeout| image:: FAQ_media/idle_timeout.png

.. disqus::
