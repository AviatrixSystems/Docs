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
Typical VPN client software on Windows, MAC, Linux, Chromebook, Android and iOS devices are supported.
If you are using Aviatrix VPN Client for OpenVPN with SAML authentication, only Windows, MAC, Linux and FreeBSD are supported.


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
   
Which log files should I share when I open a support ticket?
---------------------------------------------------------------

Please share the following log files with your support request. For MacOS, you can find them at "/Applications/Aviatrix VPN Client.app/Contents/Resources/logs" and for Windows, please look at “Program Files(x86)/Aviatrix VPN Client”

 * commandlog.log
 * server.log
 * openvpn1.log

How to restart Aviatrix Windows client background service?
---------------------------------------------------------------

#. Exit the Aviatrix VPN client from the tray
#. Use the Task Manager to end all openvpn.exe processes
#. Open a terminal and "Run as administrator"
#. Run command "sc stop AVPNC_RP" in the terminal
#. Run command "sc start AVPNC_RP" in the terminal
#. Start Aviatrix VPN client again

OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
