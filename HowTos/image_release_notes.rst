=======================================
Overview
=======================================

Aviatrix multi-cloud networking solution is delivered in two kinds of images, both should be maintained with the latest version for managing security 
and support for the product. Aviatrix roadmap is to publish 2 new images per year. 

New Customer Installation Procedures 
====================================

- Customer will download the Aviatrix Controller image in the AWS, Azure, or respective cloud marketplace.  

- Customer will launch new gateways from the Controller. The Controller will automatically pull the latest compatible Gateway version.   

Existing Customers - Controller Image upgrade (Migration) 
=========================================================

- Customer is responsible for migrate their existing Controller to the latest image. See image list below.  

- To implement the **latest Controller image**, perform the following steps: 

  #. Go to your Controller management console 

  #. Go to Settings > Maintenance > Software Upgrade.  Make sure you are on the right software version for the migration. If not, upgrade your software version.  

  #. Go to Settings > Maintenance > Backup & Restore. Make sure you have a backup of your current settings.  

  #. Go to Settings > Maintenance > Migration. Migrate your controller to the latest image.  

  |controller_migration|

Note: Migrating your Controller will not impact your network transits. Your existing Gateways are still running.  

Existing Customers- Gateway Image upgrade 
===========================================

- To implement the **latest Gateway image**, perform the following steps: 

  #. Go to your Controller management console 

  #. Go to Troubleshoot > Diagnostics > Gateway subtab. There is a section called Gateway Replace. You will select each Gateway and click Replace. 

  |gateway_replace|

=======================================
Image Release Notes
=======================================

Controller Images 
=================

****Next Controller image is scheduled for Feb 2021****

AWS AMI – 050120 (8/17/2020) 
----------------------------

- R6.1.1280 Software Version is required for this change 

- Update new Linux kernel and packages versions 

- Remove packages no longer use by the product 

- Set X-XSS-Protection and X-Content-Type-Options by default 

- Fix all vulnerabilities up to Jun/2020 (mid ref: 15727) 

Gateway Images 
=================

****Next Gateway image is scheduled for Mar 2021****

hvm-cloudx-aws-102320 (11/10/2020)
----------------------------------

- R6.2.1837 Software Version is required for this change 

- New image fetch mechanism 

- Update security patches to date 

- New Linux Kernel and package upgrade 

- New network drivers 

- Fix and passed vulnerabilities scan to Sep/2020 (mid ref: 18262) 

.. |controller_migration| image:: image_release_notes_media/controller_migration.png
   :scale: 50%

.. |gateway_replace| image:: image_release_notes_media/gateway_replace.png
   :scale: 50%

.. disqus::
