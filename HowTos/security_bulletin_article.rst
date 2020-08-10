=======================================
PSIRT Advisories
=======================================

Aviatrix Product Security Team continually tests the software product, looking for vulnerabilities and weaknesses. If you have a security issue to report, please send it to support@aviatrix.com. Any such findings are fed back to Aviatrix's development teams and serious issues are described along with protective solutions in the advisories below. 

Most Recent IR
================

12. OpenVPN - Abitrary File Access
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
Aviatrix OpenVPN R2.10.7 or later 

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

11. Bypass Htaccess Security Control
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Low

**Description**
The htaccess control to prevent requests to the a directory can be bypassed to download files.

**Impact**
Unauthorized file download

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.4.1290 (8/5/2020) or later 

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

10. Cleartext Storage of Cryptographic Key 
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
High

**Description**
Encrypted keys values are stored in readable file

**Impact**
Access to read key in encrypted format

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.3.1151 (6/4/2020) or later

**CVE-ID**
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

9. Pre-Auth Account Takeover
----------------------------------------

**Date**
8/10/2020
 
**Risk Rating**
Critical

**Description**
An unused API file does not require a valid session access and allowed update access.

**Impact**
Access to unauthorized files

**Affected Product**
Aviatrix Controller 5.3 or earlier  

**Solution**
Controller & Gateway upgrade R5.4.1290 (8/5/2020) or later 

**CVE-ID**
TBD

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
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 



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
