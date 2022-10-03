.. meta::
   :description: Documentation for Controller and Gateway Software Patches
   :keywords: software patches, patches, software

###################################
Software Patches
###################################


The following software patches are recently released by Aviatrix.

=================================================================             ====================      ===============================================================
**Patch Name**                                                                **Version**               **Description**
=================================================================             ====================      ===============================================================
Update with latest instance types support for cloud regions                         5.4 or earlier      Update the latest instance types support for cloud regions

                                                                                                        This patch is only applicable to Aviatrix Controller.
Update controller version info in the DB                                            5.4 or earlier      Update the controller version info in the DB

                                                                                                        This patch is only applicable to Aviatrix Controller.
Apply xml file patch for Splunk year 2020 bug                                       5.4 or earlier      This patch is required due to changes in Splunk. Click `here <https://docs.splunk.com/Documentation/Splunk/8.0.1/ReleaseNotes/FixDatetimexml2020>`_ for more details.

                                                                                                        Patch applied to Avitrix Controller and Gateway both.
Mitigation for Datadog Agent installation issue on opensource OS                     5.2 or earlier      DataDog will not be installed properly without the patch on Controller due to
                                                                                                        known DataDog issue with "hash sum mismatch" in APT repositories.
                                                                                                        Applicable to Aviatrix Gateway and Controller both.
=================================================================             ====================      ===============================================================

To apply a patch:

1) Backup your Aviatrix Controller. For more information, see `Controller Backup and Restore <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.

2) Apply the security or software patch on the controller. From the Aviatrix Controller, navigate to Settings > Maintenance > SecurityPatches or SoftwarePatches and click on **UpdateAvailablePatches**. You should see the new patch in the display. 

3) Apply the patch by clicking on the icon on the right and selecting **Apply Patch** from the popup menu.

4) Validate the update by clicking on the icon on the right and selecting **Patch Status** and scrolling down to bottom of page.

5) Backup your Aviatrix Controller again to save the new configuration.

.. disqus::
