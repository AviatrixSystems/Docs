.. meta::
    :description: Upgrade Aviatrix Controller and Gateways
    :keywords: Style Guide, Documentation

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
    .toc-backref {
    display: none !important;
   }
  </style>
   <script>
    window.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('.toc-backref');
    elements.forEach(function(element) {
        element.classList.remove('toc-backref');
    });
  });
  </script>
   
=============================================
Upgrade Aviatrix Controller and Gateways
=============================================

.. contents:: Section Overview






.. important::

              Aviatrix strongly recommends you perform the tasks in the operations checklist including a dry run upgrade and system backup before upgrading your deployment of the Aviatrix network platform. Taking the time to perform dry runs and backing up your Aviatrix Platform configuration reduces the potential for issues during the upgrade and allows you to easily restore your configuration if there are issues after the upgrade. Correct any issues you find during your preparation before proceeding with an Aviatrix upgrade. If you cannot resolve all issues after following the preparation and dry run procedures, please open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_.
              

             

Overview of the Aviatrix Controller and Gateways Upgrade
===========================================================================


Aviatrix encourages you to keep your platform controller and gateways up to date to ensure you are operating the most secure and highest performing versions available. To facilitate less disruptive upgrades and reduce maintenance windows Aviatrix provides a rolling selective upgrade process. You can choose to upgrade all Aviatrix gateways in all regions simultaneously or select specific gateways and regions to upgrade in logical groups conforming to your network update policies and maintenance windows.

Perform all preparatory tasks and verify all prerequisites are satisfied before performing Aviatrix upgrades. For more information, see Preparing to Upgrade the Aviatrix Network Platform.

You can perform the following operations:

* Performing a Platform Software Upgrade Dry Run
* Performing a Gateway Software Upgrade Dry Run
* Upgrading the Platform Software
* Upgrading the Gateway Software
* Rolling Back the Gateway Software
* Upgrading the Gateway Image

Incremental upgrades are only available in Aviatrix 6.5 and later releases. If you are upgrading from a release prior to 6.5, it is strongly recommended to open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_ before proceeding with any upgrade. This is necessary to ensure a thorough review and redesign of your network architecture to align with the latest best practices and supported versions.


About Aviatrix Upgrade
----------------------------

There are two types of upgrades for the Aviatrix Platform and gateways:

* **Software Upgrade** Platform and gateway software upgrades replace the relevant Aviatrix controller and gateway packages, configuration files, and binaries without disrupting network traffic or replacing the gateways. All software upgrades are hitless.
* **Image Upgrade** Gateway image upgrades replace the current gateways. Traffic throughput is briefly disrupted during image upgrades.

There are two types of patch updates:

* **Security Patches** Security patches are released when security updates to underlying software components become available. Most security patches are hitless. Review the release notes for the patch to discover if the upgrade is hitless or disruptive.
* **Software Patches** Software patches are released to address compatibility issues when they arise. You should apply the patches to the Aviatrix system when they become available if you are using any applications or configurations affected by the patch.  Most software patches are hitless. Review the release notes for the patch to discover if the upgrade is hitless or disruptive.

About Release Numbers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Aviatrix release numbers follow the Major.Minor.Build format. For example, the release number 6.5.100 indicates:

* 6 is the major release number.
* 5 is the minor release number.
* 100 is the build number.

Each release type has different functionality parameters.

* **Major** Includes new features and updates that affect the platform infrastructure and user interfaces.
* **Minor** Includes modified and new small features and updates that may affect the platform infrastructure and user interfaces.
* **Build** Corrected issues and feature enhancements.

Upgrade Options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When you initiate an upgrade, Aviatrix automatically presents the most
recently published build for the selected major or minor release
version.

**Upgrading Build Version**

When you upgrade from one build version of a minor release to another build of the same minor release, the available version may skip over previously released build numbers. For example, you could upgrade from 6.6.100 to the latest build 6.6.900 and the system skips any intermediate builds.



**Upgrading Minor Releases of Controller and Gateways**

When upgrading from one minor version of a major release to another, it is necessary to follow a sequential upgrade process and cannot skip over intermediate minor release versions. Each minor release must be upgraded sequentially. For instance, when upgrading from 6.5.current to 6.8.latest, the intermediate releases 6.6.latest and 6.7.latest must be upgraded first.

Valid upgrade paths to a new minor release are determined by the current build (the one currently running) and the latest build available on the Aviatrix server.



**Upgrading Major Releases of Controller and Gateways**

When upgrading from one major release to another, it is required to perform a sequential upgrade and not skip over intermediate major release versions. Each major release must be upgraded in sequence. You also need to go through all the minor releases within each major release before moving on to the next major release.

For example, if you are currently on version 6.6.current and want to upgrade to version 8.0, you need to:

#. Upgrade from 6.6 to the latest minor release in the 6.x series (for example, 6.6.current to 6.6.latest, then to 6.7.latest, then 6.7.latest to 6.8.latest, and so on) until you reach the latest minor release in the 6.x series.
#. Once you have upgraded through all the minor releases in the 6.x series, you can then move on to the major release 7.0.
#. From 7.0, continue upgrading through all the minor releases in the 7.x series until you reach the latest minor release in the 7.x series.
#. Upgrade from the latest minor release in the 7.x series to version 8.0.

Upgrade Parameter Definitions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Platform Upgrade Window Parameter Definitions**

- **Previous Version** Previous version of the controller.
- **Current Version** Current version of the controller.
- **Kernel Version** Version of the controller's Linux kernel.
- **Release Versions** The upgrade option between the currently running version of the controller and the latest release available on the Aviatrix release server. For example, if you are running Aviatrix Platform 6.4.321 and the latest release available on the release server is 6.6.123 the Release Version field displays: UserConnect-6.6.123 (6.5,6.6). This indicates you must successively upgrade to 6.5 then upgrade to 6.6 to bring the platform up to the latest available version.
- **Target Release Version** New version of the Aviatrix Platform to which you are upgrading. If you do not specify a release number, the system automatically selects the latest build of the major and minor release currently running on the platform controller. The version cannot be a version earlier than the release currently running on the platform controller.


**Selective Gateway Upgrade Window Parameter Definitions**

- **Current Version** Current software version running on the gateway.
- **Previous Version** If the gateway has never been upgraded there is no version number. If the gateway has been upgraded at least once, this is the software version the gateway ran before the last upgrade.
- **Target Version** Software version to which the gateway can be upgraded. It is the same version as the current version of the platform controller.
- **Previous Image Version** If the gateway OS has never been upgraded there is no version number. If the gateway OS has been upgraded at least once, this is the image version the gateway ran before the last upgrade.
- **Current Image Version** Current version of the gateway underlying OS.
- **Target Image Version** Every gateway software version matches a unique recommended OS version that may change over time. This version is determined by a compatibility matrix. This field displays the OS version that will be used in case of an OS upgrade.
- **Kernel Version** Version of the gateway OS kernel.
- **Rollback Version** Software version to which the gateway can be rolled back. It is the same version as the previous version of the platform controller.
- **Rollback Image Version** OS version that will be used in case of a gateway software rollback. Depending on the system compatibility matrix, this version can be higher, lower, or the same OS version currently running on the gateway.
- **Account** Account attached to the gateway.
- **Cloud** Cloud provider hosting the gateway.
- **Region** Cloud region where the gateway is deployed.
- **Gateway Type** Gateway persona: transit, spoke, or standalone.
- **Gateway Role** Primary or secondary.


Upgrading OpenVPN Users
--------------------------------------------------------

Most upgrades do not impact connected OpenVPN users. In some cases, OpenVPN service needs to be restarted as part of the software upgrade. For example, upgrading to a new SSL version for security patches. In these cases, connected OpenVPN users are disconnected and need to reconnect after the upgrade. If a release requires stopping and restarting the service, the information is included in the release notes.

Rollbacks do disrupt services. If there is only one OpenVPN gateway in service, all user connections are lost and users cannot reconnect until the gateway is available. If there are other OpenVPN gateways available, the disconnected users can attempt to log in again and land on the available gateways.

Upgrading HA Gateways in an Active Mesh Topology
--------------------------------------------------------


Gateway traffic is briefly affected and there is a drop in throughput when you perform a gateway image upgrade, and when a gateway software upgrade is rolled back. If Aviatrix ActiveMesh mode is enabled and only one gateway in an ActiveMesh pair is selected for an upgrade, the system gracefully drains the traffic away from one of the gateways so it can be replaced. If both gateways in an ActiveMesh pair are selected, the gateways are replaced simultaneously without any additional safeguards.

* If the gateway has BPG peers, the BGP process is shut down and the protocol reconverges to elect alternative routes.
* The tunnel interfaces are shut down. The controller recalculates alternative routes and distributes them to the gateways within the Aviatrix network.
* If the selected gateway is a spoke, the controller modifies the underlay cloud routing table of the selected gateway that was acting as the next hop for the default route or RFC1918 routes. The HA peer is selected as the next hop.






Prepare for the Aviatrix Upgrade
===========================================================================


Aviatrix recommends you perform the tasks in the Operations Checklist before upgrading your deployment of the Aviatrix network platform. Taking the time perform dry runs and backing up your Aviatrix Platform configuration reduces the potential for issues during the upgrade and allows you to easily restore your configuration if there are issues after the upgrade. Correct any issues you find during your preparation before proceeding with an Aviatrix upgrade.

Before you perform the Aviatrix Upgrade, perform the following tasks:

#. Go through the `Upgrade Operations Checklist`_.
#. Complete the `Preupgrade Tasks for Controller and Gateways`_.



**Upgrade Operations Checklist**
--------------------------------------------------------

Understanding the Release Contents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To understand the contents and potential impact of upgrading to a specific software release, see `Aviatrix Controller and Gateway Software Release Notes <https://docs.aviatrix.com/HowTos/Controller_and_Software_Release_Notes.html>`_.

To understand the contents and potential impact of upgrading to a specific image release, see `Aviatrix Controller and Gateway Image Release Notes <https://docs.aviatrix.com/HowTos/image_release_notes.html>`_.

**Verify DNS Settings**

The Aviatrix Controller must have a reliable DNS resolution service available. Aviatrix recommends using the default 8.8.8.8 for the DNS IP address. Using the default address is not required, but your network must be able to resolve public names and have uninterrupted access to the DNS name resolver.

**AWS and Azure DNS Settings**

If the controller is running on AWS or Azure, you can go to the controller Settings for the DNS and Disable the VPC or VNET DNS Server to force the controller to use 8.8.8.8.

Verify Public Internet Access
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Verify access to the public internet from the Aviatrix Controller. The controller must be open for inbound traffic on port 443 and outbound traffic on port 22. Aviatrix recommends you enable security groups to restrict access. Go to the Network tab on the Diagnostics page under Troubleshooting and perform the following tasks.

* Ping a widely known public hostname or IP address with the Controller Utility.
* Ping www.security.aviatrix.com from TCP/443 with the Network Connectivity Utility.
* Ping www.github.com from port TCP/443 with the Network Connectivity Utility.
* Ping www.github.com from port TCP/22 with the Network Connectivity Utility.

Verify Account Permissions and Access
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to the Accounts page and perform the following tasks.

* Go to the Accounts Audit tab under Accounts and perform an Account Audit. Correct any reported issues.
* Verify all accounts can access all connected cloud resources.
* Verify the Aviatrix primary access account is available and that the account credentials are valid.
* The IAM policies must be configured as recommended by Aviatrix. For more information, see Controller Instance Requirements.
* If you are migrating your Aviatrix Platform Controller to a new image, verify the new image has all required accounts and permissions before migrating the controller. If you are restoring an image from a backup, the required accounts and permissions should all be available. Migration operations fail if there is not at least one Aviatrix backup file available.

Verify Controller and Gateway Status
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to the Controller Dashboard and check the status of the Aviatrix Platform Controller and gateways.

* Verify all gateways are up and the status is green.
* Verify all tunnels are up and the status is green.

AWS Specific Upgrade Checklist
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Verify Controller HA Version**

You should be running the latest version of the Controller HA application before upgrading. If there is a newer version of Controller HA available, you should upgrade by disabling and reenabling the Controller HA feature. For more information, see https://docs.aviatrix.com/HowTos/controller_ha.html .

**Verify Controller HA is Enabled**

If you use Controller HA do not disable your HA configuration before upgrading the platform controller or gateways. If you do disable Controller HA before upgrading, the system deploys a new controller and restores the most recent backup.

**Settings for t2 and t3 Instances**

If your Aviatrix Controller is in AWS and running on a t2 or t3 instance type and you are planning a platform image upgrade, you must set the T2/T3 Unlimited attribute to enabled.  For more information, see https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/burstable-performance-instances-unlimited-mode-concepts.html.

Rules for Upgrading the Controller and Gateways
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In addition to satisfying the requirements and following recommendations in the Operations Checklist, you must follow these rules when you are upgrading your Aviatrix Platform.

*  Upgrade the platform controller before upgrading the individual gateways. Platform controller versions cannot be behind gateway versions.
*  All gateways must be running the same version as the platform controller before you can upgrade the platform controller.
*  Follow the valid upgrade options.





**Note:** The ability to run different gateway software versions facilitates rolling upgrades and software rollback functions. Running different software versions in your network is not a valid operational design implementation.




Preupgrade Tasks for Controller and Gateways
--------------------------------------------------------
Check the following prerequisites before you upgrade your controller and gateways:


Before upgrading your controller and gateways, check the following prerequisites:

Inspect the Current Controller CPU Utilization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
. Inspect the current Controller's overall CPU and memory utilization from *CoPilot UI > Monitor > Performance* or from
*Controller UI > DASHBOARD > Controller Metrics*:
- Ensure that the CPU utilization of the Controller is no more than 50%.
- Verify that the memory utilization of the Controller is no more than 60%.
These utilization thresholds should be met before initiating the upgrade.

. Check the Controller storage usage from *CoPilot UI > Monitor > Performance* or from *Controller UI > DASHBOARD > Controller Metrics*:

- If you are upgrading to version 6.8, add additional disks. Add approximately 2.5MB per tunnel.
- Ensure that the Controller has enough free disk space (at least 30% free) for the upgrade.
- If the available disk space is insufficient, resize the Controller disk to an appropriate size before proceeding with the upgrade.

Perform Controller and CoPilot Backup
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Perform a full backup of the CoPilot and the Controller:

- Before initiating the upgrade process, it is crucial to perform a full backup of both Copilot and the Controller.
- Save the previous backup in case it is needed for restoration purposes.

For more details, see `Controller Backup and Restore <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.



Check for the Non-HA (High Availability) Gateways
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Check for the non-HA gateways:

- Determine whether your environment includes any non-HA gateways.
- Please note that the upgrade procedure provided below is designed for environments with HA gateways.
- If your environment does not have HA gateways and extensively uses S2C, it is recommended to consult Aviatrix Support before proceeding with the upgrade.

(Optional) Set up a Testing Environment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


Before proceeding with the upgrade in the production environment, it is highly recommended to establish a dedicated testing environment. This environment should closely mirror the production setup, including hardware, software, and configurations. By doing so, you can simulate the production conditions and assess the compatibility and performance of the upgraded software in a controlled manner.

Only when the testing phase is successfully completed, and all identified issues have been resolved, should you proceed with the upgrade in the production environment.





Procedures for Upgrading Aviatrix Controller and Gateways
===========================================================================

This section outlines the general Controller and gateway upgrade instructions.

General Controller and Gateways Upgrade Guidance
--------------------------------------------------------
* Upgrade the Controller before upgrading the Gateways:

  - It is important to upgrade the Controller first, ensuring it is at the desired release version.
  - Once the Controller is successfully upgraded, proceed to upgrade the Gateways.
* Upgrade from the current version to the latest release version within the current release:

  - Verify that the latest release version is available for your current release.
  - Consult the documentation specific to your current release version for detailed upgrade instructions.
  - Follow the provided steps to upgrade both the Controller and Gateways to the latest release version.

* Upgrade from the current release (for example, version N) to a higher release (N+1 release):

  - Note that both the Controller and Gateways do not support multi-hop upgrades.
  - Upgrade sequentially from one adjacent version to another.
  - Determine the higher release version (N+1) to which you wish to upgrade.

* Upgrade HA (High Availability) gateways first, then upgrade primary gateways:

  - To ensure proper continuity and system availability, it is recommended to upgrade HA gateways before upgrading primary gateways. This sequence minimizes any potential disruptions during the upgrade process.

.. note::
   It is recommended to schedule upgrades during a maintenance window when short periods of traffic disruption can be tolerated. In HA setups, the disruption should be minimal.


.. list-table:: Upgrade Steps Outline
   :widths: 20 80
   :header-rows: 1

   * - Step No.
     - Description
   * - 1
     -    Back up Copilot and the Controller
   * - 2
     -    Upgrade Controller to the latest release version of the current release.
   * - 3
     -    Upgrade HA Gateways to the latest release version of the current release.
   * - 4
     -    Upgrade primary gateways to the latest release version of the current release.
   * - 5
     -    Upgrade Controller from current release (for example, version N) to a higher release (N+1 release).
   * - 6
     -    Upgrade HA Gateways from the current release (for example, version N) to a higher release (N+1 release).
   * - 7
     -    Upgrade primary gateways from the current release (for example, version N) to a higher release (N+1 release).


Single-Version Upgrade for Controller and Gateways
--------------------------------------------------------

A single-version Controller and Gateway upgrade refer to:

* Upgrade from the current version to the latest release version within the current release.

* Upgrade from the current release (for example, version N) to a higher release (N+1 release).


Before you upgrade your Controller and Gateways, it is highly recommended to check the `Preupgrade Tasks for Controller and Gateways`_.

- Before proceeding with the upgrade in the production environment, perform the upgrade in a testing environment.

- It is important to upgrade the Controller first, ensuring it is at the desired release version.
- Once the Controller is successfully upgraded, proceed to upgrade the Gateways.



This section instructs on how to perform single-version Controller and Gateway upgrade.



.. note::
   Aviatrix recommends you perform a dry run upgrade on the platform controller and gateways before you execute the upgrade. A dry run is a sanity and health check that verifies there are no potential upgrade restrictions or conflicts before upgrading the software on the platform controller and selected gateways. Network issues, version conflicts, and other upgrade blocker issues are reported. Review the dry run upgrade results and correct any issues before proceeding with the upgrade.


Performing a Platform Software Upgrade Dry Run
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To perform a platform software upgrade dry run:

#. Click on Settings in the Aviatrix Controller main menu and select Maintenance.
#. Optional. In the Platform Upgrade window, enter the target major and minor release number in the Release Version field. For example, 6.5. If you do not specify a release number, the system automatically selects the latest build of the major and minor release currently running on the platform controller.
#. Click on Dry Run.
#. After the progress meter closes, review the information in the Upgrade Result window.

* If there are no errors, you can continue with the upgrade process.
* If there are errors, you must resolve them before continuing with the upgrade.

5. Close the Upgrade Result window.



Upgrade your Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to upgrade your Controller to a desired version:

#. Log in to your Controller UI.
#. Go to *SETTINGS > Maintenance*, and click *Upgrade* to open the upgrade panel.
#. Under the *Platform Upgrade* section, enter the release number to which you want to upgrade. By default, it will upgrade to the latest version of the current release. Alternatively, you can specify a specific release version.

#. Click *PLATFORM UPGRADE* to initiate the Controller upgrade process.

Performing a Gateway Software Upgrade Dry Run
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To perform a gateway software upgrade dry run:

#. Click on Settings in the Aviatrix Controller main menu and select Maintenance. Gateways can only be upgraded to the latest version of the platform controller software. The system automatically selects the platform Controller's current software version and the compatible gateway image version for that software version.
#. In the Selective Gateway Upgrade window, click on Dry Run.
#. After the progress meter closes, review the information in the Upgrade Result window.
#. If there are no errors, you can continue with the upgrade process.
#. If there are errors, you must resolve them before continuing with the upgrade.
#. Close the Upgrade Result window.


Upgrade your Gateways
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to upgrade your Gateways to a desired version:

#. Log in to your Controller UI.
#. Go to **SETTINGS > Maintenance**, and click **Upgrade** to open the upgrade panel.
#. Go to the *Selective Gateway Upgrade* section, and choose the gateways you want to upgrade from the dropdown list. However, please note that the system will upgrade the Controller first and then the gateways.
#. Click **Dry Run** to check for potential issues.
#. (Optional) If any issues are reported, address and fix them accordingly.
#. Click **SOFTWARE UPGRADE** to upgrade the selected gateways.

#. Wait for the upgrade process to complete and verify that you receive a successful upgrade message.

.. note::

   * Upgrade HA (High Availability) gateways first, then upgrade primary gateways:

     - To ensure proper continuity and system availability, it is recommended to upgrade HA gateways before upgrading primary gateways. This sequence minimizes any potential disruptions during the upgrade process.
   * After upgrading your HA gateways, upgrade the primary gateways.






Multiple-Version Upgrade for Controller and Gateways
--------------------------------------------------------

The multiple-version upgrade refers to:

Upgrade Controller and Gateways from one version to another, where there are multiple intermediate versions between the current version and the target version.


When upgrading from one minor version of a major release to another or from one major release to another, it is necessary to follow a sequential upgrade process and cannot skip over intermediate release versions.

Before Upgrade
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Before you upgrade your Controller and Gateways, it is highly recommend to check the xref:controller-upgrade-workflow.adoc[General Controller and Gateways Upgrade Guidance].

- Before proceeding with the upgrade in the production environment, perform the upgrade in a testing environment.

- It is important to upgrade the Controller first, ensuring it is at the desired release version.
- Once the Controller is successfully upgraded, proceed to upgrade the Gateways.



Perform the Pre-upgrade Tasks
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Check and perform all the pre-upgrade tasks.

#. Check the Upgrade Checklist

#. Perform all the items listed in the upgrade checklist.




Check your Controller Version and Determine the Upgrade Path
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need to identify your current Controller release version and the major release version that you want to upgrade to.

Determine the Controller version you are running:

#. On CoPilot UI, click the caret (^) symbol on the top left.
#. Look for the version number under *Aviatrix Controller*.

.. note::
   If you are currently using Aviatrix Controller version 6.5 or earlier, it is strongly recommended to open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_ before proceeding with any upgrade. This is necessary to ensure a thorough review and redesign of your network architecture to align with the latest best practices and supported versions.




Determine your Controller License and Image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Log into your cloud provider to check your license information and Controller image information.

* If your Controller is not using the Bring Your Own License  (BYOL) license or your Controller image is 2021 or earlier:

  #. Perform Controller Migration to use the latest BYOL controller image.
  #.  If your Controller did not have a fixed EIP, go to **Controller UI > SETTINGS > CoPilot Association** to update your CoPilot Association to point to the new EIP of the Controller.
* If your Controller is already using a BYOL license but does not have an ABUP (Aviatrix Bring Your Own Support) customer ID:

  #. Subscribe to the *Aviatrix Secure Networking Platform 2208-Universal 24x7 Support* subscription offer license .
  #. Apply your new Customer ID on the **Controller UI > SETTINGS > License** page.





Upgrade Controller and Gateways
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Follow the outlined steps below to upgrade your Controller and Gateways basing on your start version and end version.

For the detailed upgrade procedure for a single-version upgrade, see `Single-Version Upgrade for Controller and Gateways`_.

Multiple-Version Upgrade Starting from Version 6.5
*******************************************************


.. list-table:: Multi-Version Upgrade Starting from Version 6.5
   :widths: 30 30 50
   :header-rows: 1

   * - Upgrade Start Version
     - Upgrade End Version
     - Upgrade Steps
   * - 6.5
     - 6.8
     - #. Upgrade your Controller Software to version 6.6.
       #.  Upgrade your gateway images [Note1]_ to version 6.6.
       #.  Upgrade your Controller Software to version 6.7.
       #.  Upgrade the software of gateways to version 6.7.
       #.  Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.



   * - 6.5
     - 6.9
     - #. Upgrade your Controller Software to version 6.6.
       #.  Upgrade your gateway images [Note1]_  to version 6.6.
       #.  Upgrade your Controller Software to version 6.7.
       #.  Upgrade the software of gateways to version 6.7.
       #.  Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.
       #.  Upgrade your Controller Software to version 6.9.
       #.  Upgrade your gateway images [Note3]_ to version 6.9.

.. note::

   .. [Note1] Image upgrade required if the gateways are not running the latest released image for that version. See table below.


   .. [Note2] Image upgrade required for raccoon to strongswan gateway migration, gateway pull mode migration, and active-mesh migration.


   .. [Note3] There is a performance enhancement in the latest images for 6.9 and 7.0. Image upgrades are highly recommended for transit gateways and optional for spoke gateways.


Gateway Images that Do not Require Additional Image Upgrade
*************************************************************
.. list-table:: Gateway Images that Do not Require Additional Image Upgrade
   :widths: 13 16 16 16 16 18
   :header-rows: 1

   * - Upgrade-to-Version
     -  AWS
     -  Azure
     -  GCP
     -  OCI
     -  Alibaba
   * - 6.6
     - hvm-cloudx-aws-031222
     - aviatrix-companion-gateway-v8
     - gw-base-04102021
     - aviatrix_gateway_54_1042_20210426_patched_v2
     - hvm-cloudx-aliyun-122520
   * - 6.7
     - hvm-cloudx-aws-031722
     - aviatrix-companion-gateway-v10u
     - gw-base-04092022
     - aviatrix_gateway_54_20220323
     - hvm-cloudx-aliyun-042322
   * - 6.8
     - hvm-cloudx-aws-080322
     - aviatrix-companion-gateway-v13u
     - gw-base-08032022
     - aviatrix_gateway_54_20220323
     - hvm-cloudx-aliyun-062422
   * - 6.9
     - hvm-cloudx-aws-030923
     - aviatrix-companion-gateway-v15u-6-9
     - gw-base-08032022
     - aviatrix_gateway_54_20220323
     - hvm-cloudx-aliyun-062422

Multiple-Version Upgrade Starting from Version 6.6
*************************************************************


.. list-table:: Multi-Version Upgrade Starting from Version 6.6
   :widths: 30 30 50
   :header-rows: 1

   * - Upgrade Start Version
     - Upgrade End Version
     - Upgrade Steps
   * - 6.6
     - 6.8
     - #. Upgrade your Controller Software to version 6.7.
       #.  Upgrade the software of gateways to version 6.7.
       #.  Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.



   * - 6.6
     - 6.9
     - #. Upgrade your Controller Software to version 6.7.
       #.  Upgrade the software of gateways to version 6.7.
       #.  Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.
       #.  Upgrade your Controller Software to version 6.9.
       #.  Upgrade your gateway images [Note3]_ to version 6.9.

.. note::
   .. [Note2] Image upgrade required for raccoon to strongswan gateway migration, gateway pull mode migration, and active-mesh migration.

   .. [Note3] There is a performance enhancement in the latest images for 6.9 and 7.0. Image upgrades are highly recommended for transit gateways and optional for spoke gateways.


Multiple-Version Upgrade Starting from Version 6.7
************************************************************


.. list-table:: Multi-Version Upgrade Starting from Version 6.7
   :widths: 30 30 50
   :header-rows: 1

   * - Upgrade Start Version
     - Upgrade End Version
     - Upgrade Steps
   * - 6.7
     - 6.8
     - #. Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.



   * - 6.7
     - 6.9
     - #. Upgrade your Controller Software to version 6.8.
       #.  Upgrade your gateway images [Note2]_ to version 6.8.
       #.  Upgrade your Controller Software to version 6.9.
       #.  Upgrade your gateway images [Note3]_ to version 6.9.

.. note::

   .. [Note2] Image upgrade required for raccoon to strongswan gateway migration, gateway pull mode migration, and active-mesh migration.

   .. [Note3] There is a performance enhancement in the latest images for 6.9 and 7.0. Image upgrades are highly recommended for transit gateways and optional for spoke gateways.


Multiple-Version Upgrade Starting from Version 6.8
******************************************************************


.. list-table:: Multi-Version Upgrade Starting from Version 6.8
   :widths: 30 30 50
   :header-rows: 1

   * - Upgrade Start Version
     - Upgrade End Version
     - Upgrade Steps
   * - 6.8
     - 6.9
     - #. Upgrade your Controller Software to version 6.9.
       #.  Upgrade your gateway images [Note3]_ to version 6.9.

.. note::

   .. [Note3] There is a performance enhancement in the latest images for 6.9 and 7.0. Image upgrades are highly recommended for transit gateways and optional for spoke gateways.




Upgrading the Gateway Image
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Traffic is briefly disrupted during the image upgrade in cluster configurations.

**Note:** If ActiveMesh mode is not enabled or you are or running ActiveMesh 1.0, please open an Aviatrix Support ticket before attempting an upgrade.

To perform a gateway image upgrade:

#. Click on Settings in the Aviatrix Controller main menu and select Maintenance.
#. In the Selective Gateway Upgrade window, select the gateways to be upgraded.  The system automatically selects the platform controller current software version and the compatible gateway image version for that software version.
#. Click on Image Upgrade. You can follow the status in the progress window.
#. Verify the gateway upgrade by reviewing the gateway information in the Current Image Version column.


Verify your Upgrade Status
===========================================================================

After performing an upgrade, it is important to verify the upgrade status to ensure that it has been completed successfully.

Verify Controller Upgrade Status
--------------------------------------------------------
#. Go to your Controller upgrade window from **Controller UI > Settings > Maintenance > Upgrade**.
#. Check if the upgrade window displays a message indicating that the Controller upgrade has been completed successfully.
#. Ensure that the displayed Controller version is updated to the latest version.

If the above conditions are met, it means that your Controller upgrade has been successfully completed.


Verify Gateway Upgrade Status
--------------------------------------------------------
After you have completed the upgrade, you can:

#. Go to **Controller UI > Settings > Maintenance > Selective Gateway Upgrade** to check the gateway upgrade status. Alternatively, you can also go to *CoPilot UI > Gateways >  Gateway Management > Upgrade Controller* to check the gateway upgrade status.
#. Look for the **Update Status** field.

   * If the **Update Status** displays "complete" on the Controller UI or "Upgrade Completed" on the CoPilot UI, it indicates that the gateway upgrade has been successfully completed. Alternatively, you can check the current version on the *Controller Upgrade* card.
   * If the **Update Status** shows any other status, it means that your gateway upgrade has failed.


Rolling Back Gateway Software
===========================================================================

You can roll back gateway software upgrades to the previous version. However, you cannot roll back platform Controller, CA Access Gateway (CAAG), or CloudN upgrades.

Gateway software rollbacks are briefly disruptive because the gateway is replaced. The gateway image version may also change during the software rollback. If the gateway to be rolled back is running the same image version before and after upgrading, when you roll back to the older software version the system creates a new gateway with the same image and the older software version.


Gateway software rollbacks are briefly disruptive. You can only roll back the gateway software to the previous platform controller version running on the gateway. To perform a gateway software rollback:

#. Click on Settings in the Aviatrix Controller main menu and select Maintenance.
#. In the Selective Gateway Upgrade window, select the gateways to be rolled back. The system automatically selects the platform controller previous version for the rollback target.
#. Click on Software Rollback. You can follow the status in the progress window.
#. Verify the gateway software rollback by reviewing the gateway information in the Current Version column.


Troubleshooting
===========================================================================

In rare cases where the controller and a group of gateways are selected for upgrade and a fatal bug is discovered in the new software, a situation where the controller and gateways are stuck running different versions could develop. If this condition occurs assistance from Aviatrix Support is required.
For example:

* A controller and gateways are running version 6.5.200.
* You upgrade the controller and a subset of gateways to 6.5.300.
* You rollback the gateways to 6.5.200 because of a bug in the 6.5.300 software.
* Now the controller is running 6.5.300 and all gateways are running 6.5.200, and the gateways cannot be upgraded to 6.5.300 because of the bug.
* The bug is resolved in controller version 6.5.400, so you want to upgrade to 6.5.400 to resolve the issue. However, this is not supported because the controller and gateways must be running the same software version before the controller can be upgraded.
* In this corner case, you must contact Aviatrix Support to upgrade the controller to the newer version. Support will diagnose the issue and provide the API operation required to perform the Controller upgrade.








.. |upgrade.build.release| image:: selective_upgrade_media/upgrade.build.release.png
   :scale: 100%
.. |upgrade.minor.release| image:: selective_upgrade_media/upgrade.minor.release.png
   :scale: 100%
.. |upgrade.major.release| image:: selective_upgrade_media/upgrade.major.release.png
   :scale: 100%
.. |upgrade.mixed.versions| image:: selective_upgrade_media/upgrade.mixed.versions.png
   :scale: 75%
.. |upgrade.mixed.versions.fail| image:: selective_upgrade_media/upgrade.mixed.versions.fail.png
   :scale: 75%
.. |upgrade.gateway.reroute| image:: selective_upgrade_media/upgrade.gateway.reroute.png
   :scale: 100%


