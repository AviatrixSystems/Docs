.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center, Aviatrix VPN Client

===========================================================================
Aviatrix VPN Client
===========================================================================


Where can I get the latest Aviatrix VPN Client?
--------------------------------------------------------

The Aviatrix VPN Client and release notes can be found at https://docs.aviatrix.com/Downloads/samlclient.html


Why does my client keep crashing regularly after connecting?
---------------------------------------------------------------

Please check with your admin to see if you have any automated installs on your Aviatrix VPN Client. While the client has an established session, if the application is installed again, it will end up crashing the running client. Please ask your admin to check on the application version before pushing an install.


Which log files should I share when I open a support ticket?
---------------------------------------------------------------

Please share the following log files with your support request. For MacOS, you can find them at "/Applications/Aviatrix VPN Client.app/Contents/Resources/logs" and for Windows, please look at “Program Files(x86)/Aviatrix VPN Client”

  * commandlog.log
  * server.log
  * openvpn1.log
  
 How to address some comman issues with Users and the VPN Cleint.
--------------------------------------------------------------------------------------------
In some cases you may see an error when launching the VPN Client.  Some examples are below.
Email not found in SAML Attributes
   * Check your default browser and if this is set to Safari please try setting this to Chrome or Firefox then attempt to connect again.
   * If you are using Chrome please try disabling all extensions. Then test your connection. You may need to enable them one by one to determine which one is causing the issue
   
Cannot run Route Add Command on Windows clients.
   * This error usually occurs when the profile was not properly imported into the client. If a user double clicks on the profile it will be opened by the Client but will not be able to properly run. Have the end user first open the client and import the Configuration in by clicking on the + at the bottom of the client should resolve this issue.
