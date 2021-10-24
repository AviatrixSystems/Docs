.. meta::
   :description: Documentation for Controller and Gateway Security Patches
   :keywords: security patches, patches

###################################
Security Patches
###################################

The following security patches are recently released by Aviatrix.

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

To apply a patch:

1) Backup your Aviatrix Controller. For more information, see `Controller Backup and Restore <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.

2) Apply the security or software patch on the controller. From the Aviatrix Controller, navigate to Settings > Maintenance > SecurityPatches or SoftwarePatches and click on **UpdateAvailablePatches**. You should see the new patch in the display. 

3) Apply the patch by clicking on the icon on the right and selecting **Apply Patch** from the popup menu.

4) Validate the update by clicking on the icon on the right and selecting **Patch Status** and scrolling down to bottom of page.

5) Backup your Aviatrix Controller again to save the new configuration.

.. disqus::
