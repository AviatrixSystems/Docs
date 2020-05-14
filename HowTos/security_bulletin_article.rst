=======================================
PCIRT Advisories
=======================================

Aviatrix Product Security Team continually tests the software product, looking for vulnerabilities and weaknesses. If you have a security issue to report, please send it to support@aviatrix.com. Any such findings are fed back to Aviatrix's development teams and serious issues are described along with protective solutions in the advisories below.

Most Recent IR
================


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
TBD

**Acknowledgement**
Aviatrix is pleased to thank Rich Mirch, Senior Adversarial Engineer - TeamARES from Critical Start, Inc. for reporting this vulnerability under responsible disclosure. 

Article #: AVXSB-00001 
======================

CVE-ID 
------

CVE-2020-7224 [Created Date: 1/16/2020]

Product and Version 
-------------------

OpenVPN Client 2.5.7 

Affected Component 
------------------

OpenVPN client on Linux, MacOS, and Windows 

Description
-----------

Aviatrix OpenVPN client through 2.5.7 or older on Linux, MacOS, and Windows is vulnerable when OpenSSL parameters are altered from the issued value set; the parameters could allow unauthorized third-party libraries to load.  

Attack Type/ Vector(s) / Impact 
-------------------------------

Attack Type: 

  Remote 

Attack Vector(s): 

  Parameters could be altered from the issue value set; the parameters could allow unauthorized third-party libraries to load.

Impact: 

  Code Execution 

Improvements/Fixes 
------------------------------
  
- Do not allow users to alter the .ovpn file.  

- Upgrade to VPN client v2.6 to automatically check for the appropriate .ovpn file.  

- If the validation check fails, user will not be able to connect until the file is replaced to pass validation checks. 

- If the file is altered, obtain a replacement from your company’s Aviatrix VPN support team.   

References
----------

- https://docs.aviatrix.com/HowTos/security_bulletin_article.html#article-avxsb-00001

- https://docs.aviatrix.com/HowTos/openvpn_faq.html 

- https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-7224 


.. disqus::
