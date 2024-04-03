=======================================
PSIRT Advisories
=======================================

Aviatrix Product Security Team continually tests the software product, looking for vulnerabilities and weaknesses. If you have a security issue to report, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_. Any such findings are fed back to Aviatrix's development teams and serious issues are described along with protective solutions in the advisories below.

Please note the below Aviatrix Security recommendations and communication plans:

- Aviatrix strongly recommend customers to stay on the latest release to resolve features and bug issues. All fixes are in the new release; we do not patch older release versions.

- Customers are strongly recommended to perform image migration 2x a year. The migration process provides the latest system level security patch

- All known software vulnerabilities are submitted to Mitre for CVE-ID references by Aviatrix Systems

- Aviatrix publish Field Notices and send alerts to Controller Admin in the Controller console when security related issues are published

25. Aviatrix Egress FQDN Firewall Security Misconfiguration
-------------------------------------------------------------

**Date** 04/02/2024

**CVE #** CVE-2023-52087

**Risk Rating** 5.5 (Medium) AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N

**Description**

Aviatrix discovered a security issue related to the Aviatrix Egress FQDN Firewall. In prior releases, the firewall would ALLOW traffic on TLS ports for non-TLS traffic or for TLS traffic which did not have SNI headers.

The current release will change the default behavior to DENY for non-TLS traffic or TLS traffic without SNI data on the TLS port (tcp/443).

This is a breaking change from prior releases, so to be sure to see the Solutions section of this advisory if this functionality must be preserved.

**Impact**

Packets that should be blocked by the Egress FQDN Firewall will be allowed through unexpectedly.

**Affected Products**

All versions before:

- 7.1.3006
- 7.0.2239
- 6.9.822
- 6.8.1826

**Solution**

If you require allowing non-TLS traffic egress over HTTPS port, perform the following:

- Aviatrix Controller > Security > Egress Control > 3. Egress FQDN Filer > Global Config (CLICK)
- ENABLE "non-TLS traffic over HTTPS port" under Global Settings. For release 7.0.2239 and 7.1.3006 this can be done from the Controller UI. For release 6.9.822 or 6.8.1826 this cannot be done from the UI.
- If you choose to revert back to the Old default behavior in release 6.9.822 or 6.8.1826, please contact Aviatrix Support who can help you toggle to ALLOW for this feature.

Since the non-TLS traffic using HTTPS port (tcp/443) is not logged in the syslog messages, there is no way to detect (in prior releases) this kind of traffic on the Aviatrix Controller/CoPilot UI.

24. Aviatrix Egress FQDN Firewall High-Availability Security Misconfiguration
-------------------------------------------------------------

**Date** 04/02/2024

**CVE #** CVE-2023-52087

**Risk Rating** 5.5 (Medium) AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N

**Description**

If an Aviatrix Egress FQDN HA gateway is launched after an Egress FQDN tag is attached to the main gateway, then the HA gateway is launched in non-enforcing mode. The non-enforcing setting is clearly visible on the Controller UI. In this configuration, when the primary drops, the secondary will not enforce as expected.

**Impact**

The secondary Egress FQDN Firewall may come up in non-enforcing mode. This will potentially allow traffic through the Egress FQDN Firewall unexpectedly.

**Affected Products**

All versions before:

- 7.1.3006
- 7.0.2239
- 6.9.822
- 6.8.1826

**Solution**

- If you are running affected Aviatrix software releases and have existing HA Egress Firewall Gateways, temporarily remove the Egress FQDN Filter tag from the primary gateway and then re-add it.
- If you are running affected Aviatrix software releases and creating new HA Egress Firewall Gateways, create the HA gateway before assigning an Egress FQDN Filter tag.
- The latest Aviatrix software revisions have resolved this issue and no action is needed.


23. Aviatrix Controller and Gateways - Unauthorized Access
----------------------------------------------------------

**Date** 08/02/2022

**Risk Rating** High for Gateways.

**Description** Gateway APIs contain functions that are inappropriately authenticated and would allow an authenticated VPN user to inject arbitrary commands.

**Impact** A successful attack would allow an authenticated VPN user to execute arbitrary comments against Aviatrix gateways.

**Affected Products** Aviatrix Gateways

**Solution** Upgrade your Aviatrix Controller and gateway software to:

- 6.6.5712 or later
- 6.7.1376 or later

**Acknowledgement** Aviatrix would like to thank Thomas Wallin from Splunk for the responsible disclosure of this issue. 

22. Remote Code Execution
----------------------------------------

**Date** 05/27/2022

**Risk Rating** `AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H (10.0) <https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?vector=AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H&version=3.1>`_ 

**Description** Several vulnerabilities could be combined by an attacker to abuse a Gateway command mechanism that would allow arbitrary remote code execution. This vulnerability is not known to be exploited.

**Impact** An unauthenticated attacker to run arbitrary commands against Aviatrix gateways.

**Affected Products** Aviatrix Controller and Gateways.

**Solution: Upgrade your controller and gateway software to:** 
  - 6.4.3057
  - 6.5.3233
  - 6.6.5612
  - 6.7.1185

21. Post-Auth Remote Code Execution
----------------------------------------

**Date** 04/11/2022

**Risk Rating** High

**Description** TLDAP APIs contain functions that are inappropriately sanitized, and would allow an authenticated malicious user to inject arbitrary commands.

**Impact** A local user to the controller UI could execute arbitrary code.

**Affected Products** Aviatrix Controller.

**Solution: Upgrade your controller and gateway software to:** 
  - 6.4.3049
  - 6.5.3166
  - 6.6.5545

20. Aviatrix Controller and Gateways - Privilege Escalation
----------------------------------------

**Date** 02/03/2022

**Risk Rating** Medium

**Description** The publicly disclosed CVE-2021-4034 and CVE-2022-0185 are local privilege escalation vulnerabilities disclosed in the past two weeks. 
When successfully executed, an attack exploiting these vulnerabilities can cause a local privilege escalation giving unprivileged users administrative rights on the target machine. The Aviatrix Gateway, Controller, and Copilot are all running vulnerable versions of the Linux packages. 
However, in order to successfully exploit these vulnerabilities, an attacker requires local access to our systems and no vulnerability known to us today would allow such attack. 

**Impact** A local user to our appliances can escalate his privileges to root.

**Affected Products** Aviatrix Controller and Gateways.

**Solution** 
  - Upgrade Copilot to Release 1.6.3.
  - Apply security patch [AVI-2022-0001 - CVE-2021-4034 and CVE-2022-0185 Privilege Escalation Patches] to controllers.

19. Aviatrix Controller and Gateways - Unauthorized Access
----------------------------------------

**Date** 01/11/2022

**Risk Rating** High for Gateways, medium for Controller.

**Description** On the Aviatrix Controller, a successful attack would allow an unauthenticated remote attacker partial access to configuration information and allow them to disrupt the service. On the gateway, a successful attack would allow an unauthenticated network-adjacent attacker (i.e.: an attacker present on the gateway's VPC) access to its API.

**Impact** Access to configuration information and disruption of service.

**Affected Products** Aviatrix Controller, Gateways and Copilot.

**Solution** Upgrade your controller and gateway software to:
  - 6.4.2995 or later.
  - 6.5.2898 or later.

18. Aviatrix Controller - Remote file execution
----------------------------------------

**Date**
10/04/2021
 
**Risk Rating**
Critical

**Description**
The Aviatrix Controller legacy API had a vulnerability allowing an unauthenticated attacker to upload arbitrary files, including .php scripts, to the filesystem. These uploaded scripts will be processed by the web frontend, allowing an attacker to run code of their choosing.

**Impact**
Remote file execution

**Affected Product**
Aviatrix Controller prior to the fixed versions.

**Solution**
The vulnerability has been fixed in:

  - UserConnect-6.2-1804.2043 or later
  - UserConnect-6.3-1804.2490 or later
  - UserConnect-6.4-1804.2838 or later
  - UserConnect-6.5-1804.1922 or later


**CVE-ID**
CVE-2021-40870

**Acknowledgement**
Aviatrix would like to thank the team at Tradecraft (https://www.wearetradecraft.com/) for the responsible disclosure of these issues. 

17. OpenVPN - Abitrary File Write
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
High

**Description**
The VPN service write logs to a location that is writable

**Impact**
Unauthorized file permission

**Affected Product**
Aviatrix OpenVPN R2.8.2 or earlier  

**Solution**
Aviatrix OpenVPN OpenVPN 2.10.8 - May 14 2020 or later 

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

16. Bypass htaccess security control
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Low

**Description**
The htaccess control to prevent requests to a cert directory can be bypassed to download files.

**Impact**
Excessive Permission

**Affected Product**
Controller 5.3.1516

**Solution**
Controller R5.4.1290 (8/5/2020) or later 

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure.

15. Insecure File Permissions
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Medium

**Description**
Several world writable files and directories were found

**Impact**
Excessive Permission

**Affected Product**
Controller 5.3.1516

**Solution**
Controller R5.4.1290 (8/5/2020) or later 

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure.

14. Bypass Htaccess Security Control
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Low

**Description**
The htaccess control to prevent requests to directories can be bypassed for file downloading.

**Impact**
Unauthorized file download

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.4.1290 (8/5/2020) or later 

**CVE-ID**
CVE-2020-26549

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

13. Insecure sudo rule
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Medium

**Description**
A user account has permission to execute all commands access as any user on the system.

**Impact**
Excessive permission

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.4.1290 (8/5/2020) or later

**CVE-ID**
CVE-2020-26548

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

12. Cleartext Ecryption Key Storage
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
High

**Description**
Encrypted key values are stored in cleartext in a readable file

**Impact**
Access to read key in encrypted format

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.3.1151 (6/4/2020) or later
Migration required to the latest AMI Software Version 050120 (Aug 13, 2020)

**CVE-ID**
CVE-2020-26551

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

11. Pre-Auth Account Takeover
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Critical

**Description**
An API file does not require a valid session and allows for updates of account email addresses. 

**Impact**
Access to unauthorized files

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.4.1290 (8/5/2020) or later 

**CVE-ID**
CVE-2020-26552

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 


10. Post-Auth Remote Code Execution
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
High

**Description**
Several APIs contain functions that allow arbitrary files to be uploaded to the web tree.

**Impact**
Access to unauthorized files

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R6.0.2483 (8/4/2020) or later 

**CVE-ID**
CVE-2020-26553

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

9. Pre-Auth Remote Code Execution
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Critical

**Description**
An API file does not require a valid session ID and allows arbitrary files to be uploaded to the web tree.

**Impact**
Access to unauthorized files

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R6.0.2483 (8/4/2020) or later 

**CVE-ID**
CVE-2020-26553

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 


8. Insufficiently Protected Credentials
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Critical

**Description**
An encrypted file containing credentials to unrelated systems is protected by a weak key.

**Impact**
Encryption key may not meet the latest security standard

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.3.1151 (6/4/2020) or later 

**CVE-ID**
CVE-2020-26550

**Acknowledgement**
Aviatrix would like to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 



7. Observable Response Discrepancy from API
----------------------------------------

**Date**
5/19/2020
 
**Risk Rating**
Medium

**Description**
The Aviatrix Cloud Controller appliance is vulnerable to a user enumeration vulnerability. 

**Impact**
A valid username could be used for brute force attack. 

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade 5.4.1204 (5/8/2020) or later 

**CVE-ID**
CVE-2020-13413

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 


6. OpenVPN Client - Elevation of Privilege 
---------------------------------------

**Date**
5/19/2020

**Risk Rating**
High

**Description**
The Aviatrix VPN client on Linux, macOS, and Windows is vulnerable to an Elevation of Privilege vulnerability. This vulnerability was previously reported (CVE-2020-7224), and a patch was released however the fix is incomplete.  

**Impact**
This would impact dangerous OpenSSL parameters code execution that are not authorized.
Impacts macOS, Linux and Windows clients.

**Affected Product**
Client VPN 2.8.2 or earlier 
Controller & Gateway 5.2 or earlier 

**Solution**
Client VPN upgrade to 2.10.7 
Controller & Gateway upgrade to 5.3 or later 
In Controller, customer must configure OpenVPN minimum client version to 2.10.7  

**CVE-ID**
CVE-2020-13417

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 


5. Cross Site Request Forgery (CSRF)
---------------------------------

**Date**
5/12/2020
 
**Risk Rating**
Critical

**Description**
An API call on Aviatrix Controller web interface was found missing session token check to control access.  

**Impact**
Application may be vulnerable to Cross Site Request Forgery (CSRF) 

**Affected Product**
Aviatrix Controller with software release 5.3 or earlier 

**Solution**
Controller & Gateway upgrade 5.4.1204 (5/8/2020) or later 

**CVE-ID**
CVE-2020-13412

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

4. Hard Coded Credentials
-------------------------

**Date**
1/16/2020

**Risk Rating**
Low

**Description**
The Aviatrix Cloud Controller contains credentials unused by the software. This is a clean-up effort implemented to improve on operational and security maintenance. 

**Impact**
This would impact operation and maintenance complexity. 

**Affected Product**
Aviatrix Controller 5.3 or lower

**Solution**
Controller & Gateway upgrade 5.4.1204 (5/8/2020) or later 
Recommended: AWS Security Group settings grants only authorized Controller Access in your environment

**CVE-ID**
CVE-2020-13414

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

3. CSRF on Password Reset  
----------------------

**Date**
1/16/2020
 
**Risk Rating**
Medium

**Description**
Controller Web Interface session token parameter is not required on an API call, which opens the application up to a Cross Site Request Forgery (CSRF) vulnerability. 

**Impact**
Vulnerability could lead to the unintended reset of a user’s password. 

**Affected Product**
Aviatrix Controller 5.3 or lower

**Solution**
Upgrade 5.4.1066 (must be on version is 5.0 or above) 
Make sure your AWS Security Group settings limit authorized Controller Access only

**CVE-ID**
CVE-2020-13416

2. XML Signature Wrapping in SAML
------------------------------

**Date**
2/26/2020

**Risk Rating**
High

**Description**
An attacker with any signed SAML assertion from the Identity Provider can establish a connection (even if that SAML assertion has expired or is from a user who is not authorized to access Aviatrix). 

**Impact**
Aviatrix customer using SAML 

**Affected Product**
Aviatrix Controller 5.1 or lower

**Solution**
Aviatrix Controller 5.2 or later
Plus Security Patch “SAML XML signature wrapping vulnerability” 

**CVE-ID**
CVE-2020-13415

**Acknowledgement**
Aviatrix is pleased to thank Ioannis Kakavas from Elastic for reporting this vulnerability under responsible disclosure. 

1. OpenVPN Client Arbitrary File Write
------------------------------------

**Date**
1/16/2020
 
**Risk Rating**
High

**Description**
Aviatrix OpenVPN client through 2.5.7 or older on Linux, MacOS, and Windows is vulnerable when OpenSSL parameters are altered from the issued value set; the parameters could allow unauthorized third-party libraries to load. 

**Impact**
OpenVPN client on Linux, MacOS, and Windows   

**Affected Product**
OpenVPN Client 2.5.7 

**Solution**
Upgrade to VPN client v2.6 or later

**CVE-ID**
CVE-2020-7224

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 


.. disqus::
