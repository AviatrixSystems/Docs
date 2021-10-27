=======================================
Image Release Notes
=======================================

****Next Controller image is scheduled for November 2021****

****Next Gateway image is scheduled for November 2021****


Controller Images: AWS AMI – Version 100621 (10/13/21)
====================================================================================================

This release addresses vulnerabilities fixed by Apache version 2.4.51.

- Controller image version 100621 includes Apache version 2.4.51 which closed vulnerabilities `CVE-2021-40438 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-40438>`_, `CVE-2021-33193 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-33193>`_ and vulnerabilities closed in previous Apache releases.
 
- Controller image version 100621 closes a potential denial-of-service vulnerability and corrects an issue with launching controller HA.



Gateway Images: hvm-cloudx-aws- 022021, hvm-cloudx-aliyun-122520 (5/10/2021) 
====================================================================================================

- R6.4.2499 Software Version is required

- Support new IPSec encryption mechanism

- Update security patches to date 

- Introduced the gateway in AWS China and Ali Cloud

- Fix and pass vulnerabilities scan to Feb/2021


Controller Images: AWS AMI – 050120 (8/17/2020) 
===============================================

- R6.1.1280 Software Version is required

- Update Linux kernel and packages versions 

- Remove packages no longer used by the product 

- Set X-XSS-Protection and X-Content-Type-Options by default 

- Fix all vulnerabilities up to Jun/2020 (mid ref: 15727) 

Gateway Images: hvm-cloudx-aws-102320 (11/10/2020)
==================================================

- R6.2.1837 Software Version is required

- New image fetch mechanism 

- Update security patches to date 

- Linux Kernel update and package upgrade 

- New network drivers 

- Fix and pass vulnerabilities scan to Sep/2020 (mid ref: 18262) 

=======================================
Overview
=======================================

Aviatrix multi-cloud networking platform is delivered via two images, a Controller image and a gateway image,  
both should be maintained with the latest version for managing security 
and support for the product. Aviatrix intends to publish 2 new images per year.

New Customer Installation Procedures 
====================================

- Customer launches the Aviatrix Controller image instance in the AWS, Azure, or respective cloud marketplace.  

- Customer launches new gateways from the Controller. The Controller will automatically pull the latest compatible Gateway version.   

Existing Customers - Controller Image upgrade (Migration) 
=========================================================

- Customer is responsible for migrate their existing Controller to the latest image. See image list below.  

- To implement the **latest Controller image**, perform the following steps: 

  #. Go to your Controller management console 

  #. Go to Settings > Maintenance > Software Upgrade.  Make sure you are on the right software version for the migration. If not, upgrade your software version.  

  #. Go to Settings > Maintenance > Backup & Restore. Make sure you have a backup of your current settings.  

  #. Go to Settings > Maintenance > Migration. Migrate your controller to the latest image.  

  |controller_migration|

Note: Migrating your Controller does not impact your network data plane. Your existing Gateways should continue operating during migration.  

Existing Customers- Gateway Image upgrade 
===========================================

- To implement the **latest Gateway image**, perform the following steps: 

  #. Go to your Controller management console 

  #. Go to Troubleshoot > Diagnostics > Gateway -> Gateway Replace. Select each Gateway and click Replace. (`More info on  Gateway Replace operation <https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#gateway-replace>`_)

  |gateway_replace|


.. |controller_migration| image:: image_release_notes_media/controller_migration.png
   :scale: 50%

.. |gateway_replace| image:: image_release_notes_media/gateway_replace.png
   :scale: 50%

.. disqus::
