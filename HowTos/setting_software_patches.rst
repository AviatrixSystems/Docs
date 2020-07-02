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
Mitigation for Datadog Agent installation issue on Ubuntu 14.04                     5.2 or earlier      DataDog will not be installed properly without the patch on Controller due to
                                                                                                        known DataDog issue with "hash sum mismatch" in APT repositories.
                                                                                                        Applicable to Aviatrix Gateway and Controller both.
=================================================================             ====================      ===============================================================


.. disqus::
