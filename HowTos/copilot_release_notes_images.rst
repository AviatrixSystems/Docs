.. meta::
  :description: Aviatrix CoPilot Image Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


====================================
Aviatrix CoPilot Image Release Notes
====================================

Aviatrix CoPilot is delivered via one image that should be maintained with the latest version for managing security and support for the product. You launch the Aviatrix CoPilot image instance in the AWS, Azure, or respective cloud marketplace.

CoPilot Image: Version 1.5.1 (01/14/22)
---------------------------------------

-   Aviatrix CoPilot image version 1.5.1 released on 01/14/2022. If you are deploying the 1.5.1 image version from the marketplace, the following disk volume and auto-scaling features are now available.

    **Note:** These feature are available only if you deploy the new 1.5.1 image version.

-   **New disk (volume) support** — You can now allocate data disks (volumes) to your Aviatrix CoPilot deployment to be used for expandable storage. During instance creation in the marketplace, you can attach a data disk (data volume) to be used for CoPilot storage. When you deploy the instance, the initial setup process will automatically detect the disk/volume you attached during instance creation and format and attach your disks (a logical disk/volume is created from all physical disks). As your storage needs increase later (after deploying), you can also add more disks (volumes) as needed.

-   **Auto-scaling memory support** — CoPilot now supports automatic memory sizing for the ETL and datastore based on the physical memory of the instance at boot. New base images will default to these automatic settings, but existing deployments will keep their current configuration unless updated. Memory settings are still located under Settings > Configuration > Options.


.. disqus::

.. |service_account_modal| image:: copilot_releases/service_account_modal.png
.. |appIQ_1| image:: copilot_releases/appIQ_1.png
    :width: 30%
