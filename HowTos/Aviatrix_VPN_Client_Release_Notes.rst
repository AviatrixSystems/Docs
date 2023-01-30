Aviatrix VPN Client Release Notes
-------------------------------------------------

**2.16.42 - Jan 04 2023**

- Prevent connection issues when the existing connection has not completely terminated
- Update the About window with message to reach out to IT network admin for any issues with VPN client
- Update OpenSSL version to 1.1.1o for Windows VPN clients
- VPN client now supports Ubuntu 22.04
- Ubuntu 16.04 support has been deprecated

**Issues Corrected in VPN Client 2.16.42**

When you set your minimum version client to 2.16.42 under OpenVPN > Advanced > Global Config > Minimum Aviatrix VPN Client Version, Mac and Ubuntu users received an error: “the required minimum VPN client is 2.16.42.” Note that this issue did not affect Windows users.

**2.14.14 - April 27 2021**

  - Support non-ASCII Windows user login account
  - Support non-ASCII VPN connection profile name on the client UI
  - Support opensource OS deb format installer
  - `Enhance the Windows client security <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-31776>`_

**2.13.12 - Jan 28 2021**

  - Provide a MD5 checksum along with every single installer
  - Support MacOS Big Sur
  - Verify the settings before exiting the Settings UI

**2.12.10 - September 3 2020**

  - Support opensource OS FIPS
  - A toggle to support Cisco Umbrella DNS servers or the VPC DNS servers on MacOS
  - Support multiple MacOS system login accounts
  - Allow override of manually set DNS flag to be enabled by default on MacOS

**2.11.6 - July 22 2020**

 - OpenSSL lib of the MacOS client is updated to 1.1.11g
 - OpenSSL lib of the Windows client is updated to 1.1.11f
 - Enhance the security to prevent Man-in-the-middle attack
 - Boost the Windows client data throughput
 - Improve the connectivity of the MacOS client under the unstable WiFi connection
 - Improve the connectivity of the Windows client under the high data throughput

**2.10.8 - May 14 2020**

 - Address client vulnerabilities of elevation in privilege and arbitrary file write.

**2.9.6 - April 23 2020**

 - Support displaying system use notifications


**2.8.2 - April 10 2020**

 - Boost VPN throughput


**2.7.9 - March 4 2020**

 - UI enhancements for password-based authentication
 - Support the OVPN parameter: 'route'
 - Fixed issue where tray icon sometimes did not accurately reflect the VPN status
 - Fixed issue where VPN client becomes unresponsive if quit from the MacOS taskbar
 - VPN client will now no longer erroneously prompt for another authentication retry after previous fail
 - Fixed issue where the old VPN client will not quit, and crashes, if not uninstalled prior to the installation of a newer client


**2.6.6 - Jan 29 2020**

 - Improve the user experience to add a new VPN profile
 - `Security fixes for the OpenVPN params <https://docs.aviatrix.com/HowTos/security_bulletin_article.html#article-avxsb-00001>`_


**2.5.7 - Nov 20 2019**

 - New UI
 - Detect missing VPN configuration file
 - Fixed password based authentication issues on Windows
 - Fixed the intermittent VPN disconnection issues


**2.4.10 - Nov 2 2019**

 - Security fixes
 - Remove config caching causing issues on MacOS
 - Fixes an issue preventing connection after switching between auth types


**2.3.10 - Oct 18 2019**

 - Support MacOS Catalina
 - Resolve fresh installation issues
 - Set version in PkgInfo in Mac
 - Nameserver wasn't being pushed correctly in Windows 10


**2.2.10 - Sep 26 2019**

 - FIPS 140-2 support for openvpn
 - Sorting and ordering profiles
 - Option to disable legacy port usage
 - Support non-ascii characters in the ovpn configuration file name


**2.1.3 - Aug 1 2019**

 - Security fixes


**2.0.3 - Jul 23 2019**

 - Fix for localhost cert being revoked
 - Backward compatible with older controller via self signed cert


**1.10.16 - Jul 9 2019**

 - Security fix for backend communication
 - Fixed Windows log rotation errors
 - Added an option to hide connnection window
 - Added an option to hide notifications
 - Fixed Mac dnsResponder not restarting to remove cached DNS
 - Updated bundled tap driver


**1.9 - Oct 18 2018**

 - Mac - Add an option to override manually set DNS
 - Mac - Fixed an issue that gave "cannot assign requested address" error while switching between Wifi networks on full tunnel
 - Mac - Upgraded openvpn to 2.4.3
 - Prevent new connections while disconnecting
 - Windows - Fixed a log rotation error
 - Windows - Install tap driver on silent install
 - Alert if localhost.aviatrix.com does not resolve to 127.0.0.1 (Eg: DD-WRT)
 - Handle private DNS/Full tunnel disconnects better


**1.8 - Jun 22 2018**

 - Windows VPN Service to run the client without Admin access
 - Graceful VPN exit on windows(8.0 and above) disconnect
 - Add platform, GUI version and peer info
 - Add resolvconf dependency for opensource OS.
 - Fix some connection issues on Mac


**1.7 - Mar 7 2018**

 - Support for Profile as an attribute feature


**1.6 - Dec 19 2017**

 - FreeBSD support
 - Configure reconnection behaviour on network disconnection
 - Disable TLSv1 for client browser communication
 - View log issue fix


**1.5 - Oct 16 2017**

 - Mac does not require admin password to run
 - Mac icon fix
 - Removed cert warning
 - Bundled TAP driver for Windows
 - Improved linux support. Fixed system tray. App mode
 - Debian installation files
 - Fixed viewing logs in Linux


**1.4 - Aug 8 2017**

 - Signed Mac application
 - Parallel windows execution fix


**1.3 - Jun 15 2017**

 - Disconnection fixes
 - Timeout fixes
 - Connection profile is displayed
 - IE support for SAML
 - Signed Windows application


**1.2 - Mar 15 2017**

 - HTTPS Version for SAML
 - Multiple Profiles
 - Linux version
 - Connection status detection
 - Unblock disconnection while connecting
 - Retry prompt for LDAP
 - Multi process feature for Mac/Linux.
 - Removed VPN Lockdown
 - Permissions fixes
 - Fixes in logging


**1.1 - Jan 30 2017**

 - Settings window for troubleshooting
 - Mac default application behavior
 - Bug fixes for hangs
 - In built resources
 - Connection timeout issues fixed
 - Kill other OpenVPN® on start
 - Connection status fix
 - VPN lockdown feature


**1.0 - Dec 15 2016**

 - Initial release
 - HTTP Version


OpenVPN is a registered trademark of OpenVPN Inc.
