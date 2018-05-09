.. meta::
   :description: OpenVPN® FAQ
   :keywords: Aviatrix OpenVPN, Client VPN, OpenVPN, SAML client

===========================
Aviatrix OpenVPN® Client FAQs
===========================


My Public IP address did not change after connecting to the VPN. Is my VPN configured correctly?
---------------------------------------------------------------------------------------------
You may be connecting to a split tunnel VPN. This ensures that only your connections are being forwarded through the tunnel. 


What user devices are VPN client software supported?
----------------------------------------------------------
Windows, MAC, Linux, Chromebook, Android and iOS devices are supported.
If you were asked to use Aviatrix VPN Client Windows, MAC, Linux and FreeBSD are supported


I have a token generator for my Okta account. How do I use it?
-------------------------------------------------------------
You can append the 6 digit token to your Okta password with to use it with the VPN during authentication

Which client should I use?
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
   
What is "Client Certificate Sharing"
------------------------------------

Enabling this feature allows the same user to be logged in from more than one location at a time.  If this option is disabled and a user logs in from a second location, the first location will be disconnected automatically.



OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
