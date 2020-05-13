=======================================
PCIRT Advisories
=======================================

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
