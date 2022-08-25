.. meta::
  :description: Aviatrix CoPilot Image Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


====================================
Aviatrix CoPilot Image Release Notes
====================================

Aviatrix CoPilot is delivered via one image that should be maintained with the latest version for managing security and support for the product. You launch the Aviatrix CoPilot image instance in the AWS, Microsoft Azure, Google Cloud, Oracle Cloud, or respective cloud marketplace. 

After a base image is launched from a marketplace, the CoPilot instance will update to the latest software release version upon startup. 

If you have an existing CoPilot and you want to uptake a new image release version, you must first launch a new CoPilot based on the new image release version and then migrate data from the old instance to the new instance. For information, see the discussion about migrating CoPilot data in *Aviatrix CoPilot Deployment Guide*. 

For information about new features and enhancements for CoPilot software releases, see `Aviatrix CoPilot Release Notes <https://docs.aviatrix.com/HowTos/copilot_release_notes.html>`_.


CoPilot Image: Version 2.0.6 (08/25/22) — Azure
------------------------------------------------------

-   Aviatrix CoPilot image version 2.0.6 released on 08/25/22 on the Azure cloud platform. 

The image remediates `CVE-2021-45960 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45960>`_.


CoPilot Image: Version 2.2.2 (07/26/22) — OCI/OCI Gov
------------------------------------------------------

-   Aviatrix CoPilot image version 2.2.2 released on 07/26/22 on the OCI and OCI Gov cloud platforms. 

The image remediates `CVE-2021-45960 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45960>`_. 


CoPilot Image: Version 2.0.6 (07/08/22) — GCP
------------------------------------------------------

-   Aviatrix CoPilot image version 2.0.6 released on 07/08/22 on the GCP cloud platform. 

The image remediates `CVE-2021-45960 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-45960>`_.


CoPilot Image: Version 1.5.1 (07/06/22) — Azure
------------------------------------------------------

-   Aviatrix CoPilot image version 1.5.1 released on 07/06/22 on the Azure cloud platform. 

The image contains general updates.


CoPilot Image: Version 2.0.4 (07/06/22) — AWS ARM
------------------------------------------------------

-   Aviatrix CoPilot image version 2.0.4 released on 07/06/22 on the AWS cloud platform for AWS ARM image. 

The image remediates `CVE-2021-43527 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-43527>`_.


CoPilot Image: Version 2.0.4 (06/23/22) — AWS
------------------------------------------------------

-   Aviatrix CoPilot image version 2.0.4 released on 06/23/22 on the AWS cloud platform. 

The image remediates `CVE-2021-43527 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-43527>`_.


CoPilot Image: Version 1.5.1 (01/14/22)
---------------------------------------

-   Aviatrix CoPilot image version 1.5.1 released on 01/14/2022. 

If you are deploying the 1.5.1 image version from the marketplace, the following disk volume and auto-scaling features are now available.

    **Note:** These feature are available only if you deploy the new 1.5.1 image version.

-   **New disk (volume) support** — You can now allocate data disks (volumes) to your Aviatrix CoPilot deployment to be used for expandable storage. During instance creation in the marketplace, you can attach a data disk (data volume) to be used for CoPilot storage. When you deploy the instance, the initial setup process will automatically detect the disk/volume you attached during instance creation and format and attach your disks (a logical disk/volume is created from all physical disks). As your storage needs increase later (after deploying), you can also add more disks (volumes) as needed. See `CoPilot Disk (Volume) Management <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-disk-volume-management>`_ for more information.

-   **Auto-scaling memory support** — CoPilot now supports automatic memory sizing for the ETL and datastore based on the physical memory of the instance at boot. New base images will default to these automatic settings, but existing deployments will keep their current configuration unless updated. Memory settings are still located under Settings > Configuration > Options.


.. disqus::

.. |service_account_modal| image:: copilot_releases/service_account_modal.png
.. |appIQ_1| image:: copilot_releases/appIQ_1.png
    :width: 30%
