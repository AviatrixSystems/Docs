=======================================
PCERT Advisories
=======================================

IR#: AVX-IR-20-001 
======================
Description
-----------

Aviatrix OpenVPN client through 2.5.7 or older on Linux, MacOS, and Windows is vulnerable when OpenSSL parameters are altered from the issued value set; the parameters could allow unauthorized third-party libraries to load.  


Product and Version 
-------------------

OpenVPN Client 2.5.7 on Linux, MacOS, and Windows 

CVE-ID 
------

CVE-2020-7224 [Created Date: 1/16/2020]

Description
-----------

Aviatrix OpenVPN client through 2.5.7 or older on Linux, MacOS, and Windows is vulnerable when OpenSSL parameters are altered from the issued value set; the parameters could allow unauthorized third-party libraries to load.  

Solutions
------------------------------
  
- Upgrade to VPN client v2.6 to automatically check for the appropriate .ovpn file.
- Do not allow users to alter the .ovpn file.  
- If the validation check fails, user will not be able to connect until the file is replaced to pass validation checks. 
- If the file is altered, obtain a replacement from your company’s Aviatrix VPN support team.   

Acknowledgement
----------
Aviatrix is pleased to thank Rich Mirch for reporting this vulnerability under responsible disclosure.


.. disqus::
