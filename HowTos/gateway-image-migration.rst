
===================================================
Migrating Gateway Images
===================================================

Introduction
^^^^^^^^^^^^^^^^^^^^^^^^^^^

A gateway image is a virtual resource or template that contains all the information required to launch, backup, or restore a gateway in your cloud network. Aviatrix periodically releases new gateway images that include updates, enhancements, and security improvements. A best practice is to plan to upgrade your gateways at least once a quarter.

You may need to upgrade your gateway image outside of a periodic upgrade in the following situations:

* Aviatrix has released a new gateway image as part of a security update or product enhancement.
* A gateway requires significant repair.

This document shows you how to upgrade an Aviatrix Gateway to a new image.

.. note::

  A gateway image upgrade is also known as a gateway replacement.

.. important::

  For major security issues or software issues, Aviatrix sends out a field notice to notify you to upgrade to the newest image. You can review past `Field Notices <https://docs.aviatrix.com/HowTos/field_notices.html>`_ and `Aviatrix Controller and Gateway Image Release Notes <https://docs.aviatrix.com/HowTos/image_release_notes.html>`_.

Prerequisites
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

- Check the `current software version <https://docs.aviatrix.com/documentation/latest/platform-administration/controller-migration.html>`_ of your Controller. You cannot upgrade your gateways to a newer version than your Controller.
- (Cloud gateways) An image upgrade to 6.7.1574 and later versions will fail if the Cloud Gateway is based on IKE-type Racoon**. You must perform an image upgrade of Cloud gateways running IKE-type Racoon before performing the software upgrade. An image upgrade will upgrade the gateway image version and thereby change the IKE-type on the gateways from Racoon to Strongswan.

Cloud gateways running older images will not be able to upgrade from 6.6 to 6.7.1574 without performing an image upgrade of gateways to switch to IKE-type Strongswan. All Cloud gateways must run Strongswan prior to upgrading to version 6.1574.

** If your account uses Racoon-based Cloud, contact Aviatrix Support to replace your Cloud hardware to Strongswan before upgrading to version 6.7.1574.
** Note that CloudN Gateways, as opposed to Cloud gateways, can run Racoon-based gateways up to release 6.8.1148.

- Every quarter, or if you receive a field notice about a new image, schedule this gateway image upgrade for an off-peak time on your network, during a maintenance window. These upgrades do require some downtime, but they have minimal impact.
- Consider enabling HA (High Availability) on the Transit and Spoke Gateways that require an image upgrade if you have not done so. HA helps minimize downtime.

  * If you do not have HA configured, a gateway image upgrade requires downtime.
  * If you have HA configured, when you perform a gateway image upgrade, your Controller routes all traffic to the gateway that is not being replaced. Performance during the upgrade depends on the size of the gateway and the amount of traffic.

.. tip::

  Before upgrading, consider `upsizing <https://docs.aviatrix.com/HowTos/gateway.html?highlight=resize#gateway-resize>`_, that is, increasing the size of your gateway, if the traffic load is high.

.. warning::

  Even with HA configured, if you have high traffic during a gateway image upgrade, the gateway that remains up could receive too much traffic. Schedule gateway image upgrades during a low-traffic period.

* Before upgrading any gateway images, `upgrade <https://docs.aviatrix.com/HowTos/selective_upgrade.html#upgrading-the-platform-software>`_ your Controller to the latest software version. This software upgrade ensures that you can update to the latest gateway image and reduce downtime for gateway image upgrades.

Image Upgrades by Gateway Type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The process and best practices for upgrading a gateway image can differ based on the type of gateway. Review this list to decide how to structure and schedule your gateway image upgrades.

+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Gateway Type                           | Image Upgrade Notes                                                                                                                                                                |
+========================================+====================================================================================================================================================================================+
| OpenVPN Gateway                        | * When you have an Open VPN Gateway deployed behind a load balancer, you can upgrade images in batches without causing an outage, depending on the number of users you have.       |
|                                        | * For OpenVPN Gateways that are not deployed with a load balancer, you should expect an outage.                                                                                    |
|                                        | * If any users are already on an OpenVPN gateway, they will be bumped when the gateway goes through an image upgrade. If you have more than one OpenVPN gateway, the end user can  |
|                                        |   connect immediately to another gateway.                                                                                                                                          |
+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| FQDN Gateways with HA                  | The Controller does not reroute all traffic for these gateways.                                                                                                                    |
+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Public Subnet Filtering (PSF) Gateway  | This gateway type does not have HA.                                                                                                                                                |
+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Transit and Spoke Gateways             | If your network has many Spoke Gateways, replacing the transit primary or HA Gateways takes more time. Wait for one group of image upgrades to complete before beginning another.  |
+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Site2Cloud Gateways                    | A best practice is to upgrade one gateway at a time.                                                                                                                               |
|                                        |                                                                                                                                                                                    |
|                                        |                                                                                                                                                                                    |
|                                        |                                                                                                                                                                                    |
|                                        |                                                                                                                                                                                    |
+----------------------------------------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+


Upgrade Gateway Image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. In your Controller, go to Settings > Maintenance.
2. In the Selective Gateway Upgrade window, select the gateways that require an upgrade. The system automatically selects the platform controller current software version and the compatible gateway image version for that software version.

.. tip::

  * Your Controller can replace up to 15 gateways in parallel. Try to group your image upgrades in groups of no more than 15.
  * For greater simplicity and efficiency, combine all your HA gateways, which have “hagw” in their names, and all primary gateways in separate operations.
  * To organize multiple image upgrades, considering spreading out groups of upgrades in separate windows on your browser.

3. Click **Image Upgrade**. You can follow the status in the progress window.

Replacing a gateway can take 5-7 minutes. After the gateway is up, it takes more time for the tunnels to come up. The total length of time required varies depending on the number of tunnels.

.. note::

  Upgrading gateway images for gateways with many tunnels can take some time. For example, depending on the software version of the Controller, it may take up to one hour to upgrade 4,000 tunnels.


Migrating Unmanaged Disk to Managed Disk (Azure)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you have a gateway deployed on Azure and you intend to migrate your unmanaged disk to a managed disk, it is recommended to follow the process of `gateway image upgrade <https://docs.aviatrix.com/HowTos/gateway-image-migration.html#upgrade-gateway-image>`_. This gateway image upgrade will automatically migrate the unmanaged disk to a managed disk after the gateway image upgrade.



.. important::
   It is highly recommended to migrate your unmanaged disk to a managed disk as soon as possible, as Azure will be `retiring <https://azure.microsoft.com/en-gb/updates/azure-unmanaged-disks-will-be-retired-on-30-september-2025>`_ unmanaged disks soon.



Verify
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Verify the gateway upgrade by reviewing the gateway information in the Current Image Version column.
For information about migrating your Controller to a new image, please see `this document  <https://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_ for AWS Controllers and `this document <https://docs.aviatrix.com/HowTos/controller_migration.html>`_ for Azure, GCP, or OCI Controllers.

.. disqus::
