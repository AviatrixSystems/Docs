.. meta::
   :description: Documentation for Controller and Gateway Security Patches
   :keywords: security patches, patches

###################################
Security Patches
###################################


Security Patch Note for Controllers (11/01/21)
===================================================================== 

**Subject**: AVI-2021-0005 Apache Request Smuggling Vulnerability Security Patch.

**Issues**: This patch addresses vulnerabilities fixed by Apache version 2.4.51. 

Aviatrix released new AMIs for AWS on 10/13/21 to address vulnerabilities (`CVE-2021-40438 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-40438>`_ and `CVE-2021-33193 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-33193>`_). You are fully covered if you migrated your Controller to use the new AMIs mentioned in `Controller Images: AWS AMI – Version 100621 <https://docs.aviatrix.com/HowTos/image_release_notes.html#controller-images-aws-ami-version-100621-10-13-21>`_, following the instructions for `existing customers to perform a Controller image upgrade <https://docs.aviatrix.com/HowTos/image_release_notes.html#existing-customers-controller-image-upgrade-migration>`_.

This patch will address the same issue without requiring a Controller migration.

For Controllers running in AWS, Aviatrix recommends that you migrate your Controllers as instructed in `Existing Customers - Controller Image upgrade (Migration)  <https://docs.aviatrix.com/HowTos/image_release_notes.html#existing-customers-controller-image-upgrade-migration>`_.

For Controllers running in cloud service providers other than AWS (Azure, GCP, etc.), you can apply this security patch.

To apply the security patch:

  #. Secure a maintenance window and execute the following during the maintenance window. 

  #. Go to your Controller (any version) management console. 

  #. Go to Settings > Maintenance > Backup & Restore.  Make sure you have a backup of your current settings.  

  #. Go to Settings > Maintenance > Security Patches and click on "Update available patches".  

  #. From the list of patches, apply the "AVI-2021-0005 Apache Request Smuggling Vulnerability" patch.  

  #. Back up your Controller again.  


(CloudN standalone mode) To apply the security patch if you have CloudN running in a standalone mode, Aviatrix suggests you run the following in a maintenance window:

  #. Go to CloudN > Maintenance > Security Patches and click on "Update available patches".  

  #. Please make sure that CloudN has outbound access to 0.0.0.0/0 for ports 80 and 443 before applying the patch. 

  #. From the list of patches, apply the "AVI-2021-0005 Apache Request Smuggling Vulnerability" patch.  


(CloudN in CaaG mode) To apply the security patch if you have CloudN running in a CaaG mode, Aviatrix suggests you run the following during a maintenance window:

  #. Detach CaaG from the Transit Gateway. 

  #. Deregister the CaaG Gateway. 

  #. Reload the CloudN UI page.  

  #. Go to CloudN > Maintenance > Security Patches and click on "Update available patches".  

  #. Please make sure that CloudN has outbound access to 0.0.0.0/0 for ports 80 and 443 before applying the patch.

  #. From the list of patches, apply the "AVI-2021-0005 Apache Request Smuggling Vulnerability" patch.  

  #. Register CaaG back to the Controller.  

  #. Attach CaaG back to the Transit Gateway.

Security Patch Note (10/25/2021)
===================================================================== 

**Subject**: AVI-2021-0006 Critical Vulnerability Security Patch

**Issues**: This security patch contains a fix for a Controller vulnerability. 

This security patch was made available Monday, October 25th, 2021 at 05:00PM PST. The critical vulnerability addressed by this patch was privately disclosed to Aviatrix and is not known to be exploited. It affects services of our Controller available on port 443 and would allow an unauthenticated attacker to execute code on the controller. This could be mitigated by limiting access to the https/port 443 of the Controller, or by running a Web Application Firewall (WAF) in front of it.

For more information about securing Controller access, see https://docs.aviatrix.com/HowTos/FAQ.html#how-do-i-secure-the-controller-access.

Aviatrix strongly recommends you install the **AVI-2021-0006 Critical Vulnerability Security Patch**.

To apply a security patch, please refer to the following steps:

* First, do a backup on your Controller in “Controller/Settings/Maintenance/Backup&Restore/Backup Now”
* Go to “Controller/Settings/Maintenance/Security Patches” and click on “Update Available Patches”
* You should see a new patch called: “AVI-2021-0006 Critical Vulnerability Security Patch”
* Apply the patch, by clicking on the icon on the right and selecting “Apply Patch”
* Take a backup again at “Controller/Settings/Maintenance/Backup&Restore/Backup Now”

**Note:**

* The security patch does not impact the data path or control path and can be executed without a maintenance window
* This patch can be applied on releases 6.2 and higher
* Aviatrix **strongly recommends** you to upgrade to releases 6.4 or higher. Please check out the `release notes <https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html>`_ and follow the `upgrade instructions <https://aviatrix.zendesk.com/hc/en-us/articles/4403944002829-Aviatrix-Controller-Upgrade>`_

Security Note 6.5.1936, 6.4.2869, 6.3.2526, and 6.2.2052 (10/11/2021)
===================================================================== 

**Subject**: Security release for Aviatrix versions 6.5.1936, 6.4.2869, 6.3.2526, and 6.2.2052.

**Issues**: The latest 6.5, 6.4, 6.3, and 6.2 versions contain fixes for two vulnerabilities. 

**AVX-15638** – Corrected vulnerability that could result in a Denial-of-Service (DoS) in Aviatrix's controller API which allows an attacker to fill the disk of the controller. The API vulnerability is blocked in the latest controller software versions. 

For more information, see `CVE-2021-40870 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-40870>`_

**AVX-15740** - The latest version of the Aviatrix AWS CloudFormation stack improves security by removing 0.0.0.0 entry on port 443 so the Aviatrix controller is not open to the world by default. However, this means related gateway IP entries need to be added to the security group when a new gateway is deployed for the gateway to talk to controller. To achieve this automatically, the Controller Security Group Management feature will be auto enabled when a user creates the first AWS account. If you are performing the manual backup and restore procedure, please inherit all the original security groups in the newly launched controller.   

Mitigation: Please upgrade to the latest release. For detailed instructions related to this security upgrade, please see https://aviatrix.zendesk.com/hc/en-us/articles/4410621458317.

-If you are running 6.2, upgrade to 6.2.2052 or later. Aviatrix strongly recommends you upgrade to 6.4.2869 or later, 6.2 `EoL <https://aviatrix.com/wp-content/uploads/2021/08/Aviatrix-EOL-Policy.pdf>`_ is 10/15/2021. 

-If you are running 6.3, upgrade to 6.3.2526 or later. Aviatrix strongly recommends you upgrade to 6.4.2869 or later, 6.3 `EoE <https://aviatrix.com/wp-content/uploads/2021/08/Aviatrix-EOL-Policy.pdf>`_ was 7/31/2021.

-If you are running 6.4, upgrade to 6.4.2869 or later. 

-If you are running 6.5, upgrade to 6.5.1936 or later. 

Security Note 6.2.2043, 6.3.2490, 6.4.2838, and 6.5.1922 (9/11/2021)
===================================================================

**Subject**: Security release for Aviatrix versions 6.5, 6.4, 6.3, and 6.2. 

**Issues**: The latest 6.5, 6.4, 6.3, and 6.2 versions contain fixes for several vulnerabilities in the controller API: 

- Several APIs used to upload configurations of certain services did not verify the authentication of the service or user executing the API call properly.
- `CVE-2021-40870 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-40870>`_: Similar APIs designed to upload files from authenticated users did not properly sanitize their destination input, which could eventually allow an unauthenticated user to execute arbitrary code via directory traversal.
- Fix for Aviatrix issue AVX-14852 described in Aviatrix FN 0032: In rare occasions, Controller backup file could get corrupted, resulting in gateways being shown as “down” if used for a Controller restore.

**Mitigation**: Please upgrade to the latest release. For instructions, go to `support.aviatrix.com <https://support.aviatrix.com/>`_ and search for *Aviatrix Controller Upgrade*.


- If you are running 6.2, upgrade to 6.2.2043 or later. Aviatrix strongly recommends you upgrade to 6.4.2838 or later, 6.2 `EoL <https://aviatrix.com/wp-content/uploads/2021/08/Aviatrix-EOL-Policy.pdf>`_ is 10/15/2021.
- If you are running 6.3, upgrade to 6.3.2490 or later. Aviatrix strongly recommends you upgrade to 6.4.2838 or later, 6.3 `EoE <https://aviatrix.com/wp-content/uploads/2021/08/Aviatrix-EOL-Policy.pdf>`_ was 7/31/2021.
- If you are running 6.4, upgrade to 6.4.2838 or later.
- If you are running 6.5, upgrade to 6.5.1922 or later.

**Credit**: Aviatrix would like to thank the team at Tradecraft (https://www.wearetradecraft.com/) for the responsible disclosure of these issues.

=================================================================             ====================      =======================================================
**Patch Name**                                                                **Version**               **Description**
=================================================================             ====================      =======================================================
Increase File Descriptor limit                                                  5.4 or earlier          This patch will fix the VPN connection issue.
                                                                                                        Before this patch openVPN do not have
                                                                                                        permission to open more than 1024 connections
                                                                                                        socket and it hangs if more than 1024 sockets are open.

                                                                                                        This patch is only applicable to Gateways, and not required after UserConnect-4.3.
Enable support for FIPS 140-2                                                   6.0 or earlier          Enable support for FIPS 140-2 Module. Click `here <https://docs.aviatrix.com/HowTos/fips140-2.html>`_ for more details.

                                                                                                        This patch is only applicable to Aviatrix Gateways.
Remove old UI                                                                   6.0 or earlier          This patch will remove the unnecessary web server components from old UI pages which could be accessible without requiring a credentials.

                                                                                                        Patch applied to Avitrix Controller only.
X-XSS-Protection and X-Content-Type-Options Headers                             5.2+                    X-XSS-Protection and X-Content-Type-Options Headers did not configure properly without the patch.

                                                                                                        Applicable to Aviatrix Gateway and Controller both.
SAML XML signature wrapping vulnerability                                       6.0 or earlier          The SAML implementation in the Aviatrix controller was vulnerable to XML Signature Wrapping without the patch.
                                                                                                        Without the patch, an attacker with any signed SAML assertion from the Identity Provider can establish a connection even if that SAML assertion has expired or is from a user who is not authorized to access Aviatrix.

                                                                                                        Applicable to Aviatrix Controller only.
=================================================================             ====================      =======================================================

.. important::
    Increase File Descriptor limit patch will disconnect all VPN Users.

Applying a Security Patch
==========================

To apply a patch:

1) Backup your Aviatrix Controller. For more information, see `Controller Backup and Restore <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.

2) Apply the security or software patch on the controller. From the Aviatrix Controller, navigate to Settings > Maintenance > SecurityPatches or SoftwarePatches and click on **UpdateAvailablePatches**. You should see the new patch in the display. 

3) Apply the patch by clicking on the icon on the right and selecting **Apply Patch** from the popup menu.

4) Validate the update by clicking on the icon on the right and selecting **Patch Status** and scrolling down to bottom of page.

5) Backup your Aviatrix Controller again to save the new configuration.

.. disqus::
