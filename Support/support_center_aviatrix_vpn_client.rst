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

* Please share the following 3 log files from the Aviatrix VPN client installation folder with your support request:

  * commandlog.log

  * server.log

  * openvpn1.log


* Before Aviatrix VPN Client 2.4.10, you can find them at **/Applications/Aviatrix VPN Client.app/Contents/Resources** for **MacOS**,
  at **Program Files(x86)/Aviatrix VPN Client** for **Windows**, and at
  **/usr/bin/AVPNC_bin** for **Ubuntu**.  

* For Aviatrix VPN client 2.4.10 - 2.9.6, these files have been moved into the **LOGS** sub-folder of the
  aforementioned directories.

* For Aviatrix VPN client 2.10.x and after, you can find these files under the following directory (and  
  **SERVER** subfolder):

  *  **~/Library/Logs** for **Mac**,

  *  **~/.AviatrixVPNC** for **Linux**, and

  *  **%APPDATA%\AviatrixVPNC** for **Window**. For Window OS, you can open the folder %APPDATA% using
     the Run
     command box (Start Menu/Windows System/Run).  Simply enter %APPDATA% at the Open field, click Browse
     button and search for AviatrixVPNC.

  Note also that openvpn1.log is renamed to avxopenvpn.log.

How to address some common issues with Users and the VPN Client
--------------------------------------------------------------------------------------------

In some cases you may see an error when launching the VPN Client.  Some examples are below.

* Email not found in SAML Attributes:

  * Check your default browser and if this is set to Safari please try setting this to Chrome or Firefox then attempt to connect again.
  * If you are using Chrome please try disabling all extensions. Then test your connection. You may need to enable them one by one to determine which one is causing the issue
   
* Cannot run "Route Add" Command on Windows clients:

  * This error usually occurs when the profile was not properly imported into the client. If a user double clicks on the profile it will be opened by the Client but will not be able to properly run. Have the end user first open the client and import the Configuration in by clicking on the + at the bottom of the client should resolve this issue.
  
* Users are not able to connect from Windows Machines:

  * Please check control panel/network settings and look for tap adaptor. If not found, please try the following
  
    * Uninstall vpn client software, reboot and reinstal the latest vpn client and alow the tap drivers to be installed.
    * If the tap driver is not getting installed, try installing it from `here <https://docs.aviatrix.com/Downloads/vpnclientguide.html#windows-win>`_
    * Sometimes anti virus or firewall programs might not allow the tap driver to be installed, please disable them before installing the software
    * Check if any firewall applications are blocking the vpn connections
