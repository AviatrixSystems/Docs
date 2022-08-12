====================================================
Aviatrix Controller and Gateway Image Release Notes
====================================================

Controller Images: 05112022_AWS_utility_controller Version: 051022 (6/09/2022)
=============================================

Release 05112022_AWS_utility_controller includes the following updates:

* Upgraded Apache, LibNSS3, OpenSSL, Zlib, and Rsync

This image also replaces the 122520, 100621, and 110421 Controller versions of BYOL images, which were delisted from the AWS marketplace on May 26.

Controller Images: 05112022_AWS_utility_controller Version: 051022 (6/09/2022)
=============================================

Release version 05112022_AWS_utility_controller includes the following updates:

* Upgraded Apache, LibNSS3, OpenSSL, Zlib, and Rsync

This image also replaces the 122520, 100621, and 110421 Controller versions of utility images, which were delisted from the AWS marketplace on May 26.

Controller Images: 05112022_AWS_metered_controller Version: 051022 (6/09/2022)
=============================================

Release version 05112022_AWS_metered_controller includes the following updates:

* Upgraded Apache, LibNSS3, OpenSSL, Zlib, and Rsync

This image also replaces the 122520, 100621, and 110421 Controller versions of utility images, which were delisted from the AWS marketplace on May 26.

Gateway Images: Alibaba AMI - Version: 042322 (6/09/2022)
=============================================

Release version hvm-cloudx-aliyun-042322 includes the following updates:

* Upgraded Apache, LibNSS3, OpenSSL, Zlib, and Rsync

Controller Images: 05112022_AWS_utility_controller Version: 051022 (6/2/2022)
=============================================

This image addresses multiple public vulnerabilities impacting Apache, LibNSS3, OpenSSL, Zlib, and Rsync which is included on our Controller: `CVE-2022-22719 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22719>`_, `CVE-2022-22720 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22720>`_, `CVE-2021-43527 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-43527>`_, `CVE-2022-0778 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-0778>`_, and `CVE-2018-25032 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-25032>`_.

This image replaces the 122520, 100621, and 110421 BYOL Controller versions, which were removed from the AWS marketplace on May 26 and are no longer installable.

Controller Images: 05112022_AWS_metered_controller Version: 051022 (6/2/2022)
===========================================

This image addresses multiple public vulnerabilities impacting Apache, LibNSS3, OpenSSL, Zlib, and Rsync which is included on our Controller: `CVE-2022-22719 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22719>`_, `CVE-2022-22720 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-22720>`_, `CVE-2021-43527 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-43527>`_, `CVE-2022-0778 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2022-0778>`_, and `CVE-2018-25032 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-25032>`_.

This image replaces the 122520, 100621, and 110421 BYOL Controller versions, which were removed from the AWS marketplace on May 26 and are no longer installable.

Controller Images: AWS AMI – Version: 110421 (11/8/2021)
======================================================

Release version 110421 includes the following updates:

- Added support for AWS IMDSv2.
- Corrected issue with the Aviatrix Controller initialization hanging after image migrating to a new image.
- Closed potential vulnerability in Ubuntu.

Controller Images: AWS AMI – Version: 100621 (10/13/2021)
======================================================

This release addresses vulnerabilities fixed by Apache version 2.4.51.

- Controller image version 100621 includes Apache version 2.4.51 which closed vulnerabilities `CVE-2021-40438 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-40438>`_, `CVE-2021-33193 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-33193>`_ and vulnerabilities closed in previous Apache releases.
- Controller image version 100621 closes a potential denial-of-service vulnerability and corrects an issue with launching controller HA.

Gateway Images: hvm-cloudx-aws- Version 022021, hvm-cloudx-aliyun-122520 (5/10/2021) 
============================================================================

Both release versions include the following updates:

- R6.4.2499 Software Version is required
- Support new IPSec encryption mechanism
- Update security patches to date 
- Introduced the gateway in AWS China and Ali Cloud
- Fix and pass vulnerabilities scan to Feb/2021

Controller Images: AWS AMI – Version 050120 (8/17/2020) 
===============================================

Release version 050120 includes the following updates:

- R6.1.1280 Software Version is required
- Update Linux kernel and packages versions 
- Remove packages no longer used by the product 
- Set X-XSS-Protection and X-Content-Type-Options by default 
- Fix all vulnerabilities up to Jun/2020 (mid ref: 15727) 

Gateway Images: hvm-cloudx-aws-102320 (11/10/2020)
==================================================

Release version 102320 includes the following updates:

- R6.2.1837 Software Version is required
- New image fetch mechanism 
- Update security patches to date 
- Linux Kernel update and package upgrade 
- New network drivers 
- Fix and pass vulnerabilities scan to Sep/2020 (mid ref: 18262) 

.. |controller_migration| image:: image_release_notes_media/controller_migration.png
   :scale: 50%

.. |gateway_replace| image:: image_release_notes_media/gateway_replace.png
   :scale: 50%

.. disqus::
