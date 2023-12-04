==============================================
Aviatrix Controller and Gateway Release Notes
==============================================

.. important::

  Aviatrix strongly recommends you perform the tasks in the operations checklist including a dry run upgrade before upgrading your deployment of the Aviatrix network platform. Taking the time to perform dry runs and backing up your Aviatrix Platform configuration reduces the potential for issues during the upgrade and allows you to easily restore your configuration if there are issues after the upgrade. Correct any issues you find during your preparation before proceeding with an Aviatrix upgrade. If you cannot resolve all issues after following the preparation and dry run procedures, please open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_.
  
If you are upgrading from release 6.5.x or later, follow the guidelines and procedures in `Upgrading the Aviatrix Cloud Network Platform <https://docs.aviatrix.com/HowTos/selective_upgrade.html>`_. If you are upgrading from release 6.4.x or earlier, follow the guidelines and procedures in `Inline Software Upgrade for 6.4 and Earlier Releases <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_.

If you deploy your Aviatrix platform with Terraform, see the `Aviatrix Terraform Release Notes <https://registry.terraform.io/providers/AviatrixSystems/aviatrix/latest/docs/guides/release-notes>`_. 


Public Preview Features 
========================

Aviatrix releases features in public preview mode to offer you the opportunity to experiment with concepts and features that may develop into official product offerings. Your valuable feedback helps shape and improve the experience for everyone.

- Features in public preview mode are fully tested and safe for deployment in production environments.
- Public preview mode feature options, performance, and scalability may be limited compared to the final feature.
- Aviatrix does not charge for using features in public preview mode. You could be charged if the public preview feature is promoted to an officially supported feature. 
- If a feature in public preview mode is promoted to an officially supported product it will be announced in the product release notes.
- Public preview mode features are clearly marked in the UI.

Private Preview Features
=========================

Aviatrix releases features in private preview mode to offer you the opportunity to experiment with concepts and features that may develop into official product offerings. Your valuable feedback helps shape and improve the experience for everyone.

- Features in private preview mode should not be deployed in production environments.
- Features in private preview mode may have undergone limited testing.
- Support for features in private preview mode may be limited and handled with low priority.  
- Aviatrix does not charge for using features in private preview mode. You could be charged if the private preview feature is promoted to an officially supported feature. 
- If a feature in private preview mode is promoted to an officially supported product it will be announced in the product release notes.
- Private preview mode features are clearly marked in the UI but are disabled by default. If you wish to enable a private preview mode feature, please contact your sales representative.

.. important::

  For the release notes of Controller and Gateway software versions 7.0 and later, click `here <https://docs.aviatrix.com/documentation/latest/release-notes/software-release-notes/software-release-notes.html>`_. The content below is a list of release notes for software versions 6.9 and earlier.

6.9.733 Release Notes (08/29/23)
==========================================

**Issues Corrected in Aviatrix Release 6.9.733**

* **AVX-39662**	- (GCP) Upgrading a GCP Transit Gateway with BGPoLAN and Firenet features enabled might have resulted in the loss of direct connectivity to firewall appliance management.
* **AVX-43546**	- After the Aviatrix Controller lost Management connection to a Transit/Edge Gateway, the Gateway lost all learned routes from the on-prem environment.
* **AVX-43547** - On a newly registered CloudN, users could not create attachments to multiple transits from a single CloudN Gateway.
* **AVX-43552**	- A previous method for adding new metrics to interface RRD files caused unnecessary delay and decreased performance. Resolved this issue so that the new metrics are available without the extra expense of time and performance. You must upgrade to software version 7.0.1307 or 7.1.XXXX or later to access the new metrics.
* **AVX-45566** - VPN NAT for gateway traffic didn’t work as expected because one of the NAT-related chains is missing in the iptables.
  Action required: Upgrade your gateway image.
* **AVX-45569** - Linux auditd logs filled the disk space of some instances.
* **AVX-45571** - (Azure) After an Azure FireNet-enabled gateway image upgrade, the gateway went into the “config_fail” state.

  Action required: To resolve this issue, try restarting the gateway. If the gateway state does not change, please contact Aviatrix Support.
* **AVX-44818** - Bootstrap configuration for a firewall took longer than expected, causing traffic loss from the Transit Gateway.

  Use the following two attributes in Terraform to provide sufficient time for the firewalls to be configured via Bootstrap so that the configuration is applied to the firewalls. Note that the specific values for these attributes

  * number_of_retries - (Optional) Number of retries for save or synchronize. (Set to at least 1, default is 0)
  * retry_interval - (Optional) Retry interval in seconds for save or synchronize. Example: 900. Default value: 300. Recommended: 900.

* **AVX-48199** - (GCP) Controllers that manage GCP resources may run into errors when a new Controller instance is started (via Controller High Availability or Controller Migration)  or when a new GCP account is onboarded.

**Known Issues in Aviatrix Release 6.9.733**

* **AVX-45156** - On an AEP Dell device, when you configure a Transit Gateway attachment with HPE (High Performance Encryption) mode, you could not set the tunnel count to more than 2.

  If you have a higher bandwidth/performance requirement which requires more tunnels, please contact Aviatrix Support for help.

* **AVX-45567** - (GCP) Simultaneous, multiple GCP gateway image upgrades in the same GCP project might fail. To resolve this issue, try upgrading the gateway images again.
* **AVX-45682** - A rare issue with a gateway software upgrade may cause the BGP neighbor status to go down. To resolve this issue, restart the gateway.
* **AVX-45684** - This issue occurs when you try to do a dry run for a Controller software version upgrade with more than one version in the pending list for upgrading. When you choose “latest” as the default version for the upgrade, the Controller incorrectly runs the dry run for the last version to upgrade to instead of the next upgrade version. For example, if you are running a dry run for 6.8 > 6.9 > 7.0 > 7.1, the Controller ran the dry run for 7.1 instead of 6.9.

  To resolve this issue, when you do a dry run, make sure to manually enter the next upgrade version instead of leaving the default, “latest.” For example, when you upgrade from 6.8 > 6.9 > 7.0 > 7.1, enter “6.9” as the version for the dry run.

6.8.1826 Release Notes (08/29/23)
===========================================

**Issues Corrected in Aviatrix Release 6.8.1826**

* **AVX-39662**	- (GCP) Upgrading a GCP Transit Gateway with BGPoLAN and Firenet features enabled might have resulted in the loss of direct connectivity to firewall appliance management.
* **AVX-43546**	- After the Aviatrix Controller lost Management connection to a Transit/Edge Gateway, the Gateway lost all learned routes from the on-prem environment.
* **AVX-43547** - On a newly registered CloudN, users could not create attachments to multiple transits from a single CloudN Gateway.
* **AVX-45566** - VPN NAT for gateway traffic didn’t work as expected because one of the NAT-related chains is missing in the iptables.
  Action required: Upgrade your gateway image.
* **AVX-45569** - Linux auditd logs filled the disk space of some instances.
* **AVX-45571** - (Azure) After an Azure FireNet-enabled gateway image upgrade, the gateway went into the “config_fail” state.
* **AVX-44818** - Bootstrap configuration for a firewall took longer than expected, causing traffic loss from the Transit Gateway.

  Use the following two attributes in Terraform to provide sufficient time for the firewalls to be configured via Bootstrap so that the configuration is applied to the firewalls. Note that the specific values for these attributes

  * number_of_retries - (Optional) Number of retries for save or synchronize. (Set to at least 1, default is 0)
  * retry_interval - (Optional) Retry interval in seconds for save or synchronize. Example: 900. Default value: 300. Recommended: 900.

**Known Issues in Aviatrix Release 6.8.1826**

* **AVX-45156** - On an AEP Dell device, when you configure a Transit Gateway attachment with HPE (High Performance Encryption) mode, you could not set the tunnel count to more than 2.

  If you have a higher bandwidth/performance requirement which requires more tunnels, please contact Aviatrix Support for help.

* **AVX-45567** - (GCP) Simultaneous, multiple GCP gateway image upgrades in the same GCP project might fail. To resolve this issue, try upgrading the gateway images again.
* **AVX-45682** - A rare issue with a gateway software upgrade may cause the BGP neighbor status to go down. To resolve this issue, restart the gateway.
* **AVX-45683**	- (GCP) Upgrading a GCP Transit Gateway with BGPoLAN and FireNet features enabled from any in 6.7 or 6.8 releases might result in 7-10 seconds of traffic loss of direct connectivity to firewall appliance management.
* **AVX-45684** - This issue occurs when you try to do a dry run for a Controller software version upgrade with more than one version in the pending list for upgrading. When you choose “latest” as the default version for the upgrade, the Controller incorrectly runs the dry run for the last version to upgrade to instead of the next upgrade version. For example, if you are running a dry run for 6.8 > 6.9 > 7.0 > 7.1, the Controller ran the dry run for 7.1 instead of 6.9.

  To resolve this issue, when you do a dry run, make sure to manually enter the next upgrade version instead of leaving the default, “latest.” For example, when you upgrade from 6.8 > 6.9 > 7.0 > 7.1, enter “6.9” as the version for the dry run.

* **AVX-48199** - (GCP) Controllers that manage GCP resources may run into errors when a new Controller instance is started (via Controller High Availability or Controller Migration)  or when a new GCP account is onboarded.

6.7.1601 Release Notes (06/14/23)
=========================================

**Enhanced Features in Aviatrix Release 6.7.1601**

* **AVX-41036** - (AWS) Added support for the UAE (United Arab Emirates) region, or me-central-1, for AWS Gateways and VPCs.

6.9.545 Release Notes (05/04/2023)
===============================================

**Enhanced Features in Aviatrix Release 6.9.545**

* **AVX-36880** - You can now upgrade images for multiple non-Activemesh standalone Aviatrix Gateways in batches, instead of individually. This improvement makes the image upgrade process faster and more efficient for this type of gateway.

You can upgrade non-Activemesh gateway images in batch if they have no peerings, or if only one of the gateways has a peering. If more than one non-Activemesh gateway has a peering, the batch image upgrade will fail.

.. note::

  Only one image-upgrade session is allowed for non-Activemesh gateways. This means that all desired gateways must be included in a single upgrade session. However, multiple non-Activemesh gateways can be upgraded simultaneously as part of a single upgrade session.

Please see `Upgrading Gateway Images <https://docs.aviatrix.com/documentation/latest/platform-administration/gateway-image-migration.html?expand=true>`_ for more information.

* **AVX-38963** - Previously, the Aviatrix OpenVPN® feature could not be used in conjunction with Site2Cloud certificate-based authentication. Now, you can use both features at the same time.

6.8.1646 Release Notes (05/04/2023)
================================================

**Enhanced Features in Aviatrix Release 6.8.1646**

* **AVX-36880** - You can now upgrade images for multiple non-Activemesh standalone Aviatrix Gateways in batches, instead of individually. This improvement makes the image upgrade process faster and more efficient for this type of gateway.

You can upgrade non-Activemesh gateway images in batch if they have no peerings, or if only one of the gateways has a peering. If more than one non-Activemesh gateway has a peering, the batch image upgrade will fail.

.. note::

  Only one image-upgrade session is allowed for non-Activemesh gateways. This means that all desired gateways must be included in a single upgrade session. However, multiple non-Activemesh gateways can be upgraded simultaneously as part of a single upgrade session.

Please see `Upgrading Gateway Images <https://docs.aviatrix.com/documentation/latest/platform-administration/gateway-image-migration.html?expand=true>`_ for more information.

* **AVX-38963** - Previously, the Aviatrix OpenVPN® feature could not be used in conjunction with Site2Cloud certificate-based authentication. Now, you can use both features at the same time.

6.7.1583 (04/24/23)
=============================
  
**Important Notices in Aviatrix Release 6.7.1583**

**AVX-34656** - 

 * ActiveMesh 1.0 is no longer supported in release 6.8.1148. A Controller upgrade from 6.7.1583 to 6.8.1148 will be blocked if the Controller is running ActiveMesh 1.0. To migrate to ActiveMesh 2.0, go to Settings > Maintenance > Migration > ActiveMesh 2.0 before you upgrade to 6.8.1148.
 * (Azure) Azure FireNet gateway without a Load Balancer is no longer supported in 6.8.1148. A Controller upgrade from 6.7.1583 to 6.8.1148 will be blocked if you have such a deployment. Before you upgrade, rebuild any Azure FireNet gateway to enable a Load Balancer.

**Enhanced Features in Aviatrix Release 6.7.1583**

**AVX-36747** - Aviatrix Controller and gateway images are switching from Racoon based IKE to Strongswan based IKE. Your Controller and gateways will use the image’s Linux kernel version to determine which IKE-type to enable. If the Linux kernel version is 5.4 (or newer), upgrade is supported.

6.9.529 (04/24/2023)
=========================

**Enhanced Features in Aviatrix Release 6.9.529**

* **AVX-36880** - You can now upgrade images for multiple non-Activemesh Aviatrix Gateways in batches, instead of individually. This improvement makes the image upgrade process faster and more efficient for this type of gateway.

  You can upgrade non-Activemesh gateway images in batch if they have no peerings, or if only one of the gateways has a peering. If more than one non-Activemesh gateway has a peering, the batch image upgrade will fail.

.. note::
 
 Only one image-upgrade session is allowed for non-Activemesh gateways. This means that all desired gateways must be included in a single upgrade session. However, multiple non-Activemesh gateways can be upgraded simultaneously as part of a single upgrade session.
 
Please see `Upgrading Gateway Images <https://docs.aviatrix.com/documentation/latest/platform-administration/gateway-image-migration.html>_` for more information.

* **AVX-39732** - (Azure) Aviatrix has added support for the following Standard_Dxs_v5 instance types for VMs (Virtual Machines):

 * Standard_D2ds_v5
 * Standard_D4ds_v5
 * Standard_D8ds_v5
 * Standard_D16ds_v5
 * Standard_D32ds_v5
 * Standard_D48ds_v5
 * Standard_D64ds_v5

 This enhancement was added to enable you to resize from Standard_Dx_v3 instance types to the Standard_Dxs_v5 instance types listed above. This resizing was not possible with previously-supported Standard_Dxs_v5 instance types. See `here <https://learn.microsoft.com/en-us/azure/virtual-machines/azure-vms-no-temp-disk>_` for more information about resizing VMs in Azure.

**Issues Corrected in Aviatrix Release 6.9.529**

* **AVX-38158** - (Alibaba) With CoPilot Security Group Management enabled, when you brought up gateways in Ali cloud, they would be missing Security Group rules on CoPilot. This issue meant there would be no visibility of netflow and syslog data from the gateways.
* **AVX-38161** - If a Spoke Gateway has multiple Custom Mapped or Mapped Site2Cloud connections, Forward Traffic to Transit configuration enabled, and the same virtual destination CIDRs are configured in other Site2Cloud connections, a failover in one connection will cause TCP sessions belonging to the other connections to drop.
* **AVX-39023** - Gateway Diagnostics would encounter an error and not display the results.

6.9.522 (04/17/2023)
=====================

* **AVX-10154** - (Azure) If you have deployed Aviatrix gateways in Azure that use a companion-gateway-version less than or equal to “aviatrix-companion-gateway-v8,” upgrade to software release 6.7.1185 or newer before performing an image upgrade of these gateways. No immediate action is required. Do not perform any `Out-of-band <https://read.docs.aviatrix.com/HowTos/general_glossary.html#oob-out-of-band>`_ or Manual activity related to Azure unmanaged disks, as they will be `retired <https://azure.microsoft.com/en-gb/updates/azure-unmanaged-disks-will-be-retired-on-30-september-2025/>`_ in 2025.
* **AVX-27396** - (Azure) You can now use HPE (High Performance Encryption) on the following Azure instances:

 * B2ms
 * D2_v4
 * D4_v4
 * D2_v5 (12.5 Gbps compared to D2_v4 5 Gbps)
 * D4_v5 (12.5 Gbps compared to 10 Gbps with D4_v4)
 * D8_v5
 * D16_v5

* **AVX-32231** - A new safety check has been added to help avoid configuration errors. With this safety check, you cannot set up your Spoke Gateway with Custom Mapped/Mapped configuration with Overlapping CIDRs in any of the following:

  Local Initiated Traffic Destination Virtual CIDRs
  Remote Initiated Traffic Source Virtual CIDRs
  Remote Subnet (Virtual)

  * **AVX-32894** - (Azure) You can now use Accelerated Networking on Azure gateways with instance sizes that support this feature. See the list of supported instance sizes `here <https://learn.microsoft.com/en-us/azure/virtual-network/accelerated-networking-overview>`_.
* **AVX-34431** - (AWS) AWS gateways will now support a new instance type, C6in, in select regions.
* **AVX-35789** - Previously, if the gateway daemon code experienced errors, it could be difficult to receive alerts for those errors. Now, if the gateway daemon code experiences errors, you receive a notification through the Controller’s bell icon.
* **AVX-38080** - The wait limit for communication between gateways and the Controller has been extended from 2.5 minutes to 10 minutes. This extension provides the necessary time for gateways to successfully upgrade.
* **AVX-36562** - The FlightPath feature has two improvements:

 * This feature can now track egress traffic to the Internet.
 * FlightPath now selects the route with the lowest metric when traversing the Linux route table.

* **AVX-36246** - Added new API endpoints for Datadog: "ddog-gov.com", "us3.datadoghq.com", "us5.datadoghq.com".
* **AVX-36425** - You can now configure DNAT in non-active gateways.
* **AVX-36747** - Aviatrix Controller and gateway images are switching from IKE-type Racoon to IKE-type Strongswan. Your Controller and gateways will use the image’s Linux kernel version to determine which IKE-type to enable. If the Linux kernel version is 5.4(or newer), Strongswan is enabled.

**Issues Corrected in Aviatrix Release 6.9.522**

* **AVX-28468** - Equinix can workaround this issue by allowing the Controller’s IP address access SSH port 22 in the VNF's ACL. By doing this, sshgw can directly SSH to the VM via its public IP.
* **AVX-20197** - After the Single AZ HA setting on a gateway was enabled and the GSO/GRO setting was disabled, the gateway may have auto-restarted multiple times.
* **AVX-34680** - When you deleted a GCP gateway with a Site2Cloud connection, certain gateway resources were deleted before the Controller rejected the deletion.
* **AVX-35096** - (Azure) An API error may have caused the Controller to become unresponsive.
* **AVX-35646** - Previously, the gateway name reported in logs generated by the HTTP/HTTPS FQDN enforcer was “NA.” Now, the gateway name is correctly reported for newly created gateways.
* **AVX-35844** - (AWS) When you had a Transit Gateway attached to an AWS TGW and many Site2Cloud connections, the TGW list and plan page loaded slowly.
* **AVX35958** - The primary and HA gateway shared the same remote IP configuration.
* **AVX-36387** - (AWS) You received a gateway error message, “Missing account or VPC,” when you tried to bring up a gateway.
* **AVX-36794** - If a Spoke Gateway has multiple Custom Mapped or Mapped Site2Cloud connections, Forward Traffic to Transit configuration enabled, and the same virtual destination CIDRs are configured in other Site2Cloud connections, a failover in one connection will cause TCP sessions belonging to the other connections to drop.
* **AVX-36893** - A Controller restore may have failed if the Controller had some dangled files.
* **AVX-36913** - (GCP) GCP gateways may experience CPU spikes every 10 minutes.
* **AVX-36971** - A gateway instance could shut down as you used the Monitor Gateway Subnet feature.
* **AVX-37020** - (Azure) Upgrading certain older Azure gateways was unsuccessful because they did not have the “gw_subnet_cidr” attribute.
* **AVX-37066** - Under certain conditions, when you tried to download Egress FQDN logs or stats, the download failed and you received an error message: ... 'utf-8' codec can't decode byte ...
* **AVX-37801** - (Azure) Deleting an Azure Spoke Gateway incorrectly deleted user-created RFC1918 routes in the VNet route table.
* **AVX-38409** - A gateway credential could be doubly encrypted.
* **AVX-38471** - If the quagga bgp Debian packages were not installed properly, the Aviatrix Controller would try to reinstall the package instead of failing the gateway configuration.
* **AVX-38682** - (GCP) When you selected the CheckPoint BYOL image as the third-party firewall option, the CheckPoint PAYG image came up instead.
* **AVX-39037** - If you added policy rules to Distributed Firewalling, additional and unnecessary code could always run, even if the rules were deleted.
* **AVX-39040** - Gateways reconnecting to the Controller could cause a resource leak on the gateway.

**Known Issues in Release 6.9.522**

* **AVX-36138** - Gateway initialization, including Cloud Gateway creation, Cloud Gateway Image Upgrade, or Cloud Gateway Software Rollback fails if you completed both of the operations below (regardless of order):

 * Changing the controller time zone to those ahead of UTC/GMT. For example, for Australia/Sydney (AEST), the offset UTC is UTC+11:00.
 * PKI re-bootstrap (including Certificate Domain Update and Gateway CA Certificate Upload)
 * If you’ve already completed the actions above, try your gateway initialization again after X hours where X is the time zone difference between your Controller and the UTC/GMT. For example, if you change the Controller time zone to Australia/Sydney (AEST) and then upload the Gateway CA Certificate at 09:00, you need to wait until 20:00 (09:00 plus the 11:00-hour offset) to successfully create/replace/rollback any cloud gateway.

* **AVX-37895** - (Azure) Gateway deployment in Azure can fail if the Network Security Group (NSG) is not applied on the Controller’s Network Interface Card (NIC). If this happens, use one of two methods to resolve the issue:
 * Disable and reenable the Controller Security Group management. This requires a disruption in traffic.
 * In Azure, locate the NSG, which uses the format AVX-SG-<Pubic -IP>, and attach this NSG manually to the Controller’s NIC. This method does not require disruption in traffic.
* **AVX-36492** - When single-IP HA (High Availability) is enabled on Aviatrix Gateways and the HA gateway goes up, a bug may cause the security group to not be added to the gateway. To resolve this issue, manually add the security group to the HA gateway.


6.8.1621 (04/13/2023)
============================================

**Enhanced Features in Release 6.8.1621**

* **AVX-10154** - (Azure) If you have deployed Aviatrix gateways in Azure that use a companion-gateway-version less than or equal to “aviatrix-companion-gateway-v8,” upgrade to software release 6.7.1185 or newer before performing an image upgrade of these gateways. No immediate action is required. Do not perform any `Out-of-band <https://read.docs.aviatrix.com/HowTos/general_glossary.html#oob-out-of-band>`_ or Manual activity related to Azure unmanaged disks, as they will be `retired <https://azure.microsoft.com/en-gb/updates/azure-unmanaged-disks-will-be-retired-on-30-september-2025/>`_ in 2025.
* **AVX-27396** - (Azure) You can now use HPE (High Performance Encryption) on the following Azure instances:

 * B2ms
 * D2_v4
 * D4_v4
 * D2_v5 (12.5 Gbps compared to D2_v4 5 Gbps)
 * D4_v5 (12.5 Gbps compared to 10 Gbps with D4_v4)
 * D8_v5
 * D16_v5

* **AVX-32231** - A new safety check has been added to help avoid configuration errors. With this safety check, you cannot set up your Spoke Gateway with Custom Mapped/Mapped configuration with Overlapping CIDRs in any of the following:

  Local Initiated Traffic Destination Virtual CIDRs
  Remote Initiated Traffic Source Virtual CIDRs
  Remote Subnet (Virtual)

* **AVX-32894** - (Azure) You can now use Accelerated Networking on Azure gateways with instance sizes that support this feature. See the list of supported instance sizes `here <https://learn.microsoft.com/en-us/azure/virtual-network/accelerated-networking-overview>`_.
* **AVX-34431** - (AWS) AWS gateways will now support a new instance type, C6in, in select regions.
* **AVX-35789** - Previously, if the gateway daemon code experienced errors, it could be difficult to receive alerts for those errors. Now, if the gateway daemon code experiences errors, you receive a notification through the Controller’s bell icon.
* **AVX-38080** - The wait limit for communication between gateways and the Controller has been extended from 2.5 minutes to 10 minutes. This extension provides the necessary time for gateways to successfully upgrade.
* **AVX-36425** - You can now configure DNAT in non-active gateways.
* **AVX-36562** - The FlightPath feature has two improvements:

 * This feature can now track egress traffic to the Internet.
 * FlightPath now selects the route with the lowest metric when traversing the Linux route table.

* **AVX-36747** - Aviatrix Controller and gateway images are switching from IKE-type Racoon to IKE-type Strongswan. Your Controller and gateways will use the image’s Linux kernel version to determine which IKE-type to enable. If the Linux kernel version is 5.4(or newer), Strongswan is enabled.

**Issues Corrected in Release 6.8.1621**

* **AVX-20197** - After the Single AZ HA setting on a gateway was enabled and the GSO/GRO setting was disabled, the gateway may have auto-restarted multiple times.
* **AVX-34680** - When you deleted a GCP gateway with a Site2Cloud connection, certain gateway resources were deleted before the Controller rejected the deletion.
* **AVX-35096** - (Azure) An API error may have caused the Controller to become unresponsive.
* **AVX-35646** - Previously, the gateway name reported in logs generated by the HTTP/HTTPS FQDN enforcer was “NA.” Now, the gateway name is correctly reported for newly created gateways.
* **AVX-35844** - (AWS) When you had a Transit Gateway attached to an AWS TGW and many Site2Cloud connections, the TGW list and plan page loaded slowly.
* **AVX-35958** - The primary and HA gateway shared the same remote IP configuration.
* **AVX-36387** - (AWS) You received a gateway error message, “Missing account or VPC,” when you tried to bring up a gateway.
* **AVX-36546** - FlightPath may have incorrectly shown Spoke and Transit Gateway routes as inactive if the Controller and Gateways were using the following software versions: 7.0.1373, 7.0.1383, 6.9.308, or 6.8.1483.
* **AVX-36794** - If a Spoke Gateway has multiple Custom Mapped or Mapped Site2Cloud connections, Forward Traffic to Transit configuration enabled, and the same virtual destination CIDRs are configured in other Site2Cloud connections, a failover in one connection will cause TCP sessions belonging to the other connections to drop.
* **AVX-36893** - A Controller restore may have failed if the Controller had some dangled files.
* **AVX-36971** - A gateway instance could shut down as you used the Monitor Gateway Subnet feature.
* **AVX-37020** - (Azure) Upgrading certain older Azure gateways was unsuccessful because they did not have the “gw_subnet_cidr” attribute.
* **AVX-37066** - Under certain conditions, when you tried to download Egress FQDN logs or stats, the download failed and you received an error message: ... 'utf-8' codec can't decode byte ...
* **AVX-37801** - (Azure) Deleting an Azure Spoke Gateway incorrectly deleted user-created RFC1918 routes in the VNet route table.
* **AVX-38409** - A gateway credential could be doubly encrypted.
* **AVX-38471** - If the quagga bgp Debian packages were not installed properly, the Aviatrix Controller would try to reinstall the package instead of failing the gateway configuration.
* **AVX-38682** - (GCP) When you selected the CheckPoint BYOL image as the third-party firewall option, the CheckPoint PAYG image came up instead.
* **AVX-39037** - If you added policy rules to Distributed Firewalling, additional and unnecessary code could always run, even if the rules were deleted.

**Known Issues in Aviatrix Release 6.8.1621**

* **AVX-36138** - Gateway initialization, including Cloud Gateway creation, Cloud Gateway Image Upgrade, or Cloud Gateway Software Rollback fails if you completed both of the operations below (regardless of order):

 * Changing the controller time zone to those ahead of UTC/GMT. For example, for Australia/Sydney (AEST), the offset UTC is UTC+11:00.
 * PKI re-bootstrap (including Certificate Domain Update and Gateway CA Certificate Upload)
 * If you’ve already completed the actions above, try your gateway initialization again after X hours where X is the time zone difference between your Controller and the UTC/GMT. For example, if you change the Controller time zone to Australia/Sydney (AEST) and then upload the Gateway CA Certificate at 09:00, you need to wait until 20:00 (09:00 plus the 11:00-hour offset) to successfully create/replace/rollback any cloud gateway.

* **AVX-36492** - When single-IP HA (High Availability) is enabled on Aviatrix Gateways and the HA gateway goes up, a bug may cause the security group to not be added to the gateway. To resolve this issue, manually add the security group to the HA gateway.
* **AVX-37895** - (Azure) Gateway deployment in Azure can fail if the Network Security Group (NSG) is not applied on the Controller’s Network Interface Card (NIC). If this happens, use one of two methods to resolve the issue:

  Disable and reenable the Controller Security Group management. This requires a disruption in traffic.
  In Azure, locate the NSG, which uses the format AVX-SG-<Pubic -IP>, and attach this NSG manually to the Controller’s NIC. This method does not require disruption in traffic.


6.9.355 (03/24/2023)
====================================

**Enhanced Features in Release 6.9.355**

* **AVX-32231** - A new safety check has been added to help avoid configuration errors. With this safety check, you cannot set up your Spoke Gateway with Custom Mapped/Mapped configuration with Overlapping CIDRs in any of the following:

 * Local Initiated Traffic Destination Virtual CIDRs
 * Remote Initiated Traffic Source Virtual CIDRs
 * Remote Subnet (Virtual)

**Issues Corrected in Release 6.9.355**

* **AVX-34680**  - When you deleted a GCP gateway with a Site2Cloud connection, certain gateway resources were deleted before the Controller rejected the deletion.
* **AVX-35646** - Previously, the gateway name reported in logs generated by the HTTP/HTTPS FQDN enforcer was “NA.” Now, the gateway name is correctly reported for newly created gateways.
* **AVX-36971** - The Monitor Gateway Subnet feature could shut down gateways during their initialization phase but not in subsequent phases.
* **AVX-36794**  - If a Spoke Gateway has multiple Custom Mapped or Mapped Site2Cloud connections, Forward Traffic to Transit configuration enabled, and the same virtual destination CIDRs are configured in other Site2Cloud connections, a failover in one connection will cause TCP sessions belonging to the other connections to drop.
* **AVX-37020**  - (Azure) Upgrading certain older Azure gateways was unsuccessful because they did not have the “gw_subnet_cidr” attribute. 

6.8.1512 (03/24/2023)
====================================

**Enhanced Features in Release 6.8.1512**

* **AVX-32231** - A new safety check has been added to help avoid configuration errors. With this safety check, you cannot set up your Spoke Gateway with Custom Mapped/Mapped configuration with Overlapping CIDRs in any of the following:

 * Local Initiated Traffic Destination Virtual CIDRs
 * Remote Initiated Traffic Source Virtual CIDRs
 * Remote Subnet (Virtual)

**Issues Corrected in Release 6.8.1512**

* **AVX-34680**  - When you deleted a GCP gateway with a Site2Cloud connection, certain gateway resources were deleted before the Controller rejected the deletion.
* **AVX-35646** - Previously, the gateway name reported in logs generated by the HTTP/HTTPS FQDN enforcer was “NA.” Now, the gateway name is correctly reported for newly created gateways.
* **AVX-36971** - The Monitor Gateway Subnet feature could shut down gateways during their initialization phase but not in subsequent phases.
* **AVX-36794**  - If a Spoke Gateway has multiple Custom Mapped or Mapped Site2Cloud connections, Forward Traffic to Transit configuration enabled, and the same virtual destination CIDRs are configured in other Site2Cloud connections, a failover in one connection will cause TCP sessions belonging to the other connections to drop.
* **AVX-37020**  - (Azure) Upgrading certain older Azure gateways was unsuccessful because they did not have the “gw_subnet_cidr” attribute.

6.9.349 (03/20/2023)
====================================

**Enhanced Features in Release 6.9.349**

* **AVX-36246** - Added new API endpoints for Datadog: "ddog-gov.com", "us3.datadoghq.com", "us5.datadoghq.com".

6.9.331 (02/16/2023)
==================================

**Enhanced Features in Release 6.9.331**

* **AVX-35773** - During vendor integration with Panorama, increased the wait time for a Panorama commit to 1 minute. Because it can take some time for Panorama to commit template changes, doing a device push before that commit is ready could cause incomplete routes being pushed to devices. The increased wait time ensures that the Panorama commit is complete before the device push.
* **AVX-36147** - Removed the peering status check during the configuration workflow for NAT gateways. Now, you can configure NAT without waiting for the connection status to be UP.

**Issues Corrected in Release 6.9.331**

* **AVX-32921** - Some VPN user traffic to certain destinations was dropped on the VPN Gateway. This issue could occur when the VPN Gateway was rebooted and old VPN profile rules were not cleaned up from the system iptables.
* **AVX-34845**  - Removed a file from managed CloudN or the CaaG device during an upgrade to improve security.
* **AVX-35077**  - (Azure) If the Azure Spoke Gateways were down and a Transit Gateway propagated to an Azure Spoke Gateway with the default route, the Spoke VNet could not program route table default routes.
* **AVX-35613** - When the Controller’s timezone was set to any other time zone than UTC (Coordinated Universal Time), a software upgrade became stuck at 99% progress.
* **AVX-35728**  - If an incorrect passphrase was entered when attempting to enable SSH access to your Controller, a bug was causing all the keys for on-prem managed CloudN or CaaG devices to be removed.

6.8.1509 (02/16/2023)
==================================

**Enhanced Features in Release 6.8.1509**

* **AVX-35773** - During vendor integration with Panorama, increased the wait time for a Panorama commit to 1 minute. Because it can take some time for Panorama to commit template changes, doing a device push before that commit is ready could cause incomplete routes being pushed to devices. The increased wait time ensures that the Panorama commit is complete before the device push.
* **AVX-36147** - Removed the peering status check during the configuration workflow for NAT gateways. Now, you can configure NAT without waiting for the connection status to be UP.

**Issues Corrected in Release 6.8.1509**

* **AVX-32921** - Some VPN user traffic to certain destinations was dropped on the VPN Gateway. This issue could occur when the VPN Gateway was rebooted and old VPN profile rules were not cleaned up from the system iptables.
* **AVX-34845**  - Removed a file from managed CloudN or the CaaG device during an upgrade to improve security.
* **AVX-35077**  - (Azure) If the Azure Spoke Gateways were down and a Transit Gateway propagated to an Azure Spoke Gateway with the default route, the Spoke VNet could not program route table default routes.
* **AVX-35613** - When the Controller’s timezone was set to any other time zone than UTC (Coordinated Universal Time), a software upgrade became stuck at 99% progress.
* **AVX-35728**  - If an incorrect passphrase was entered when attempting to enable SSH access to your Controller, a bug was causing all the keys for on-prem managed CloudN or CaaG devices to be removed.

**Known Issues in Release 6.8.1509**

* **AVX-29183**  - Performing a dry run in 6.8.1148 and later versions will fail if the CSP Gateway’s image and/or CloudNs are based on IKE-type Racoon**, even though the upgrade from version 6.8.1148 to 6.9.128 will succeed. Aviatrix recommends performing an image upgrade of gateways running IKE-type Racoon before performing the software upgrade. An image upgrade will upgrade the gateway image version and thereby change the IKE-type on the gateways from Racoon to Strongswan. Please follow the steps below to perform a `Gateway Image Upgrade <https://docs.aviatrix.com/documentation/latest/platform-administration/gateway-image-migration.html>`_:

Controller > Settings > Maintenance > Selective Gateway Upgrade > Select the gateway which lists IKE-type Racoon > click **Image Upgrade**.

Gateways running older images will not be able to upgrade from 6.7.1185 to 6.8.1148 without performing an image upgrade of gateways to switch to IKE-type Strongswan. All gateways must run Strongswan prior to upgrading to version 6.8.1148.

** If your account uses Racoon-based CloudN, contact Aviatrix Support to replace your CloudN hardware to Strongswan before upgrading to version 6.8.1148.

6.7.1574 (02/16/2023)
==================================

**Upgrade Prerequisites in Release 6.7.1574**

* **AVX-29183** - (Cloud gateways) An image upgrade to 6.7.1574 and later versions will fail if the Cloud Gateway is based on IKE-type Racoon**. You must perform an image upgrade of Cloud gateways running IKE-type Racoon before performing the software upgrade. An image upgrade will upgrade the gateway image version and thereby change the IKE-type on the gateways from Racoon to Strongswan. Please follow the steps below to upgrade these Cloud gateways:

  Controller > Settings > Maintenance > Selective Gateway Upgrade > Select the gateway which lists IKE-type Racoon > click Image Upgrade.

  Cloud gateways running older images will not be able to upgrade from 6.6.5224 to 6.7.1574 without performing an image upgrade of gateways to switch to IKE-type Strongswan. All Cloud gateways must run Strongswan prior to upgrading to version 6.1574.

  ** If your account uses Racoon-based Cloud, contact Aviatrix Support to replace your Cloud hardware to Strongswan before upgrading to version 6.7.1574.
  ** Note that CloudN Gateways, as opposed to Cloud gateways, can run Racoon-based gateways up to release 6.8.1148.
  

**Enhanced Features in Release 6.7.1574**

* **AVX-35773** - During vendor integration with Panorama, increased the wait time for a Panorama commit to 1 minute. Because it can take some time for Panorama to commit template changes, doing a device push before that commit is ready could cause incomplete routes being pushed to devices. The increased wait time ensures that the Panorama commit is complete before the device push.

**Issues Corrected in Release 6.7.1574**

* **AVX-34845**  - Removed a file from managed CloudN or the CaaG device during an upgrade to improve security.
* **AVX-35077**  - (Azure) If the Azure Spoke Gateways were down and a Transit Gateway propagated to an Azure Spoke Gateway with the default route, the Spoke VNet could not program route table default routes.
* **AVX-35613** - When the Controller’s timezone was set to any other time zone than UTC (Coordinated Universal Time), a software upgrade became stuck at 99% progress.
* **AVX-35728**  - If an incorrect passphrase was entered when attempting to enable SSH access to your Controller, a bug was causing all the keys for on-prem managed CloudN or CaaG devices to be removed.

**Known Issues in Release 6.7.1574**

* **AVX-29183** - (Cloud gateways) An image upgrade to 6.7.1574 and later versions will fail if the Cloud Gateway is based on IKE-type Racoon**. See the Upgrade Prerequisites section.

6.7.1550 (02/01/2023)
==================================
**Issues Corrected in Release 6.7.1550**

* **AVX-26020** - When you did a Controller backup and restore, the Controller temporarily lost its BGP routes. This loss caused network flapping and a loss of traffic until the routes were restored.
* **AVX-34823** - (AWS and Azure) In AWS accounts in the Controller that were onboarded using a key and secret instead of IAM Roles, an error occurred when you tried to bring up an Azure gateway.

**Known Issues in Release 6.7.1550**

.. warning::

  **AVX-30776**  - (Azure) To avoid Azure gateway image upgrade issues with unmanaged disks, `upgrade <https://read.docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_ to Controller version 6.7.1550 before upgrading your gateway image.

6.8.1483 (02/01/2023)
==================================

**Feature Enhancements in Aviatrix Release 6.8.1483**

* **AVX-34591**  - (AWS) Added support for the UAE (United Arab Emirates) region, or me-central-1, for AWS Gateways and VPCs.

**Issues Corrected in Aviatrix Release 6.8.1483**

* **AVX-34823** - (AWS and Azure) In AWS accounts in the Controller that were onboarded using a key and secret instead of IAM Roles, an error occurred when you tried to bring up an Azure gateway.

**Known Issues in Aviatrix Release 6.8.1483**

* **AVX-27704** - When a gateway had too many routes, the CoPilot Cloud Routes page did not display anything.

.. warning::

  **AVX-30776**  - (Azure) To avoid Azure gateway image upgrade issues with unmanaged disks, `upgrade <https://read.docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_ to Controller version 6.7.1550 before upgrading your gateway image.

6.9.308 (02/01/2023)
==================================

**Feature Enhancements in Aviatrix Release 6.9.308**

* **AVX-34591**  - (AWS) Added support for the UAE (United Arab Emirates) region, or me-central-1, for AWS Gateways and VPCs.

**Issues Corrected in Aviatrix Release 6.9.308**

* **AVX-34823** - (AWS and Azure) In AWS accounts in the Controller that were onboarded using a key and secret instead of IAM Roles, an error occurred when you tried to bring up an Azure gateway.

**Known Issues in Aviatrix Release 6.9.308**

* **AVX-27704** - When a gateway had too many routes, the CoPilot Cloud Routes page did not display anything.

.. warning::

  **AVX-30776**  - (Azure) To avoid Azure gateway image upgrade issues with unmanaged disks, `upgrade <https://read.docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_ to Controller version 6.7.1550 before upgrading your gateway image.

6.9.295 (01/24/2023)
==================================

**Issues Corrected in Release 6.9.295**

* **AVX-34401** - After the Controller was updated to the 6.7.1376 software version with the AVX-25632 bug fix, you could not attach a CloudN as a Gateway (CaaG) to an Azure Transit Gateway.
* **AVX-34887**  - BGP learned routes have been optimized to handle 10K routes with long AS Path lengths from multiple neighbors. This update helps you scale your network successfully.

6.8.1469 (01/24/2023)
==================================

**Issues Corrected in Release 6.8.1469**

* **AVX-34401** - After the Controller was updated to the 6.7.1376 software version with the AVX-25632 bug fix, you could not attach a CloudN as a Gateway (CaaG) to an Azure Transit Gateway.
* **AVX-34887**  - BGP learned routes have been optimized to handle 10K routes with long AS Path lengths from multiple neighbors. This update helps you scale your network successfully.

6.7.1535 (01/24/2023)
==================================

**Issues Corrected in Release 6.7.1535**

* **AVX-34401** - After the Controller was updated to the 6.7.1376 software version with the AVX-25632 bug fix, you could not attach a CloudN as a Gateway (CaaG) to an Azure Transit Gateway.
* **AVX-34887**  - BGP learned routes have been optimized to handle 10K routes with long AS Path lengths from multiple neighbors. This update helps you scale your network successfully.

6.7.1526 (01/09/2023)
=================================

**Enhanced Features in Release 6.7.1526**

* **AVX-33814** - When an account had too many S2C connections, transit segmentation pages failed to load.

**Issues Corrected in Aviatrix Release 6.7.1526**

* **AVX-28175** - If you created an Azure Transit Gateway of size Dv4 and Dsv4 with BGP over LAN interfaces and HPE, you experienced an error: *[AVXERR-TRANSIT-0173] FireNet and BGP over LAN features require at least 4 interfaces.*
* **AVX-31614** - When the Cloud VPC/VNet route table was full, new routes were not programmed when old routes were withdrawn.


6.9.282 (01/06/2023)
==================================

**Enhanced Features in Release 6.9.282**

* **AVX-26394** - For users authenticated using SAML to log in to Controller, you can now block them from logging in if they do not have a Profile. Previously, such users would be logged in as read-only. 

  You can enable this option using the Block Empty Profiles toggle switch per SAML endpoint in your Controller. Navigate to Settings > Controller > SAML login.

* **AVX-28938 (AWS)** - You can now overcome the 1000-rule limitation in AWS for security group rules per instance by using the Controller Security Access Control feature. Instead of using AWS Security groups to control access to the Controller, the Controller itself manages incoming TCP 443 access. You can configure this feature using API 2.5. Please contact Aviatrix Support for more information.
* **AVX-32976** - Aviatrix now supports service in the Azure China North 3 region.
* **AVX-33021** - When authenticating a Site2Cloud connection using PSK-based authentication, you can now ignore or skip the Remote ID check by entering ““ in the Remote Identifier field. This enhancement lets you authenticate connections for Remote ID types that Aviatrix Gateways do not support, including IPv6, FQDN, or email. 

  This change also allows you to check if a tunnel is down because of a mismatched Remote ID. You can enter ““ in the Remote Identifier field, and if the tunnel comes up, the Remote ID could be mismatched.

* **AVX-33814** - When an account had too many S2C connections, transit segmentation pages failed to load.
* **AVX-34089** - You can now use the KEY_ID as the remote identifier in the Pre-Shared Key authentication for editing Site2Cloud connection configuration.

**Issues Corrected in Aviatrix Release 6.9.282**

* **AVX-25209** - The Aviatrix rsyslog may have unexpectedly stopped forwarding logging packets to remote server(s).
* **AVX-28175** - If you created an Azure Transit Gateway of size Dv4 and Dsv4 with BGP over LAN interfaces and HPE, you experienced an error: *[AVXERR-TRANSIT-0173] FireNet and BGP over LAN features require at least 4 interfaces.*
* **AVX-30621 (AWS)** - Controllers with a large number of access accounts experienced excessive memory usage.
* **AVX-31614** - When a Cloud VPC/VNet route table was full, new routes were not programmed when old routes were withdrawn.
* **AVX-32351** - During Packet Capture, if you clicked **Download** multiple times, you received an error message: “Failed to open file.” Now, you can download successfully even if you click **Download** multiple times.
* **AVX-32283** - Certain web operations related to the Egress FQDN feature stalled due to fragmented TLS handshake packets. As a solution, the Aviatrix team coupled handling of these fragmented packets with the handling of packets with no SNI.

  To allow connections with fragmented client hellos to go through, enable your Controller’s FQDN configuration to allow packets with no SNI to go through.

* **AVX-32730** - You could not modify a UserVPN LDAP configuration and upload a CA certificate when more than one VPN Gateway was deployed behind a load balancer.
* **AVX-32904** - If the Edge node could not access the Aviatrix release server because of a firewall setting or because the Management was over a private network, enabling the FIPS caused the Edge gateway to fail. The gateway could not be recovered.
* **AVX-33791** - When the Netflow feature was either enabled or disabled, the NAT iptables rules could have been lost.

**Features Deprecated in Aviatrix Release 6.9.282**

**AVX-31334**  

* The Transitive Peering feature is deprecated. This feature's functionality will be replaced by Aviatrix Multi-Cloud Transit.
* Aviatrix recommends deleting Transitive Peerings from your account, and then upgrading your Controller.

6.8.1455 (01/06/2023)
==============================

**Enhanced Features in Release 6.8.1455**

* **AVX-26394** - For users authenticated using SAML to log in to Controller, you can now block them from logging in if they do not have a Profile. Previously, such users would be logged in as read-only. 

  You can enable this option using the Block Empty Profiles toggle switch per SAML endpoint in your Controller. Navigate to Settings > Controller > SAML login.

* **AVX-28938 (AWS)** - You can now overcome the 1000-rule limitation in AWS for security group rules per instance by using the Controller Security Access Control feature. Instead of using AWS Security groups to control access to the Controller, the Controller itself manages incoming TCP 443 access. You can configure this feature using API 2.5. Please contact Aviatrix Support for more information.
* **AVX-30716** - Previously, Aviatrix Edge gateways were listening on port 111 on all interfaces. Now, Aviatrix has removed the open port 111 to improve security.
* **AVX-33021** - When authenticating a Site2Cloud connection using PSK-based authentication, you can now ignore or skip the Remote ID check by entering ““ in the Remote Identifier field. This enhancement lets you authenticate connections for Remote ID types that Aviatrix Gateways do not support, including IPv6, FQDN, or email. 

  This change also allows you to check if a tunnel is down because of a mismatched Remote ID. You can enter ““ in the Remote Identifier field, and if the tunnel comes up, the Remote ID could be mismatched.

* **AVX-33814** - When an account had too many S2C connections, transit segmentation pages failed to load.
* **AVX-34089** - You can now use the KEY_ID as the remote identifier in the Pre-Shared Key authentication for editing Site2Cloud connection configuration.

**Issues Corrected in Aviatrix Release 6.8.1455**

* **AVX-25209** - The Aviatrix rsyslog may have unexpectedly stopped forwarding logging packets to remote server(s).
* **AVX-28175** - If you created an Azure Transit Gateway of size Dv4 and Dsv4 with BGP over LAN interfaces and HPE, you experienced an error: *[AVXERR-TRANSIT-0173] FireNet and BGP over LAN features require at least 4 interfaces*.
* **AVX-31614** - When the Cloud VPC/VNet route table was full, new routes were not programmed when old routes were withdrawn.
* **AVX-32351** - During Packet Capture, if you clicked **Download** multiple times, you received an error message: “Failed to open file.” Now, you can download successfully even if you click **Download** multiple times.
* **AVX-32283** - Certain web operations related to the Egress FQDN feature stalled due to fragmented TLS handshake packets. As a solution, the Aviatrix team coupled handling of these fragmented packets with the handling of packets with no SNI.

  To allow connections with fragmented client hellos to go through, enable your Controller’s FQDN configuration to allow packets with no SNI to go through.

* **AVX-32807** - Resolved an asymmetric traffic flow issue with the rxhash network setting. Note that this fix is essential for customers who are upgrading Azure Gateway images from v8 to v13.
* **AVX-33791** - When the Netflow feature was either enabled or disabled, the NAT iptables rules could have been lost. 

**Features Deprecated in Aviatrix Release 6.8.1455**

**AVX-31334**  

* The Transitive Peering feature is deprecated. This feature's functionality will be replaced by Aviatrix Multi-Cloud Transit.
* Aviatrix recommends deleting Transitive Peerings from your account, and then upgrading your Controller.

6.8.1400 (11/18/2022)
===============================

**Issues Corrected in Aviatrix Release 6.8.1400**

**AVX-32273** - Known Aviatrix CSP (Cloud Service Provider) gateway base images launched in release 6.3, 6.4, and 6.5 with default python 2.7.17 are not compatible with python 3.6.9 in the versions (6.8.1148 and newer) of Aviatrix software. To avoid this issue, upgrade your Controller to the latest version and `upgrade <https://read.docs.aviatrix.com/HowTos/gateway-image-migration.html>`_ all gateways images launched in 6.5 or older to the latest version.

6.9.223  (11/18/2022)
===============================

**Issues Corrected in Aviatrix Release 6.9.223**

**AVX-32273** - Known Aviatrix CSP (Cloud Service Provider) gateway base images launched in release 6.3, 6.4, and 6.5 with default python 2.7.17 are not compatible with python 3.6.9 in the versions (6.8.1148 and newer) of Aviatrix software. To avoid this issue, upgrade your Controller to the latest version and `upgrade <https://read.docs.aviatrix.com/HowTos/gateway-image-migration.html>`_ all gateways images launched in 6.5 or older to the latest version.

6.7.1506 (11/14/2022)
=================================

**Issues Corrected in Aviatrix Release 6.7.1506**

**AVX-13508** – (AWS users) When you launch a gateway, the gateway uses the Default encryption key set in your AWS account > EC2 > Settings > EBS encryption. Previously, to use a key other than the Default key, you had to go to your AWS account > EC2 > Settings > EBS encryption and click Manage. 
Now, if you want to use a different encryption key than the Default encryption key, you can use Terraform or API to specify which encryption key to use for this gateway.

* **AVX-25209** – The Aviatrix rsyslog may have unexpectedly stopped forwarding logging packets to remote server(s).

* **AVX-26005** - When you did a Controller backup and restore, the Controller temporarily lost its BGP routes. This loss caused network flapping and a loss of traffic until the routes were restored.

* **AVX-26020** – Previously, when a Controller backup and restore was performed, the Controller temporarily lost its BGP routes. This loss caused network flapping and a loss of traffic until the routes were restored.

* **AVX-28821** – When a Controller’s time zone was changed to any time zone other than UTC, CoPilot did not display host information under Performance > Network Metrics for the Last Hour. 
Note: To resolve this issue in versions older than release 6.9.b, restart cloudxd in your Controller by going to Diagnostics > Services > CloudXD > Actions > Restart.

* **AVX-29016** – When a CAAG or Edge Gateway was registered while your LAN/WAN interface was down, the CloudN list would fail to display. You could not perform basic actions like Diag, Deregister, or Reset Configuration.

* **AVX-30443** – BGP learned routes were temporarily removed and then added back ActiveMesh 1.0 was migrated to ActiveMesh 2.0. This issue could cause traffic interruption.

**Features Deprecated in Aviatrix Release 6.7.1506**

**AVX-31334**  

* The Transitive Peering features is deprecated. This features’ functionality will be replaced by Aviatrix Multi-Cloud Transit.
* Aviatrix recommends deleting Transitive Peerings from your account, and then upgrading your Controller.


6.9.221 (11/04/2022)
==========================================
**New Features in Release 6.9.221**

**Controller Security Access Control**

Attention AWS users. The Controller Security Access Control feature overcomes the 1000-rule limitation of AWS security group rules per instance. Instead of using AWS Security Groups to control access to the Controller, the Controller itself manages incoming TCP 443 access. You can configure this feature using API 2.5. Please contact Aviatrix Support for more information.

**Issues Corrected in Aviatrix Release 6.9.221**

**AVX-25209** – The Aviatrix rsyslog may have unexpectedly stopped forwarding logging packets to remote server(s). 

**Deprecated Features in Aviatrix Release 6.9.221**

* The Transitive Peering features is deprecated. This features’ functionality will be replaced by Aviatrix Multi-Cloud Transit.
* Aviatrix recommends deleting Transitive Peerings from your account, and then upgrading your Controller.


6.8.1398 (11/04/2022)
======================================
**New Features in Release 6.8.1398**

**Controller Security Access Control**

Attention AWS users. The Controller Security Access Control feature overcomes the 1000-rule limitation of AWS security group rules per instance. Instead of using AWS Security Groups to control access to the Controller, the Controller itself manages incoming TCP 443 access. You can configure this feature using API 2.5. Please contact Aviatrix Support for more information.

**Issues Corrected in Aviatrix Release 6.8.1398**

**AVX-25209** – The Aviatrix rsyslog may have unexpectedly stopped forwarding logging packets to remote server(s). 

**Deprecated Features in Aviatrix Release 6.8.1398**

* The Transitive Peering feature is deprecated. This feature's functionality will be replaced by Aviatrix Multi-Cloud Transit.
* Aviatrix recommends deleting Transitive Peerings from your account, and then upgrading your Controller.

6.9.188 (10/21/2022)
==========================================

**Issues Corrected in Aviatrix Release 6.9.188**

* **AVX-28821** - When you changed a Controller’s time zone to any time zone other than UTC, CoPilot did not display host information under Performance > Network Metrics for the Last Hour.
 
.. note::
  
  To resolve this issue in versions older than release 6.9.188, restart cloudxd in your Controller by going to Diagnostics > Services > CloudXD > Actions > Restart.

* **AVX-28898** - A large number of Site2Cloud connections degraded your Controller’s responsiveness.
* **AVX-29364** – When a GRE tunnel goes down, your gateway withdraws routes. Previously, gateways withdrew routes one at a time, which could take a long time. This enhancement ensures that gateways withdraw routes in bulk to speed up the process.
* **AVX-29691** - Under scale setups with thousands of tunnels, when micro-segmentation was disabled, the process could still run and consume an entire CPU core.
* **AVX-30443** – BGP learned routes were temporarily removed and then added back when you migrated ActiveMesh 1.0 to ActiveMesh 2.0. This issue could cause traffic interruption.
* **AVX-30545** - A gateway using a Linux kernel version older than 4.20 will see a configure route failure with an error message: Failed to get real route: protocol not available. To avoid this issue, upgrade your gateways to the latest image.


6.8.1369 (10/21/2022)
==============================

**Issues Corrected in Aviatrix Release 6.8.1369**

.. important::

  Before upgrading to 6.8.1369, upgrade your gateway images to the latest image.

* **AVX-28821** - When you changed a Controller’s time zone to any time zone other than UTC, CoPilot did not display host information under Performance > Network Metrics for the Last Hour. 

.. note::
  
  To resolve this issue in versions older than release 6.8.1369, restart cloudxd in your Controller by going to Diagnostics > Services > CloudXD > Actions > Restart.

* **AVX-28898** - A large number of Site2Cloud connections degraded your Controller’s responsiveness.
* **AVX-29364** - When a GRE tunnel goes down, your gateway withdraws routes. Previously, gateways withdrew routes one at a time, which could take a long time. This enhancement ensures that gateways withdraw routes in bulk to speed up the process.
* **AVX-29691** - Under scale setups with thousands of tunnels, when micro-segmentation was disabled, the process could still run and consume an entire CPU core.
* **AVX-30443** - BGP learned routes were temporarily removed and then added back when you migrated ActiveMesh 1.0 to ActiveMesh 2.0. This issue could cause traffic interruption.
* **AVX-30545** - A gateway using a Linux kernel version older than 4.20 will see a configure route failure with an error message: Failed to get real route: protocol not available. To avoid this issue, upgrade your gateways to the latest image.

6.9.161 (09/30/2022)
===========================

**Issues Corrected in Aviatrix Release 6.9.161**

* **AVX-26004** - Resolved an issue involving AWS accounts and permissions. If you onboarded an AWS account to your Controller, but your Controller didn’t have permission for some regions in that account, your account would print traceback logs, sometimes in large amounts. These logs did not affect performance but were unhelpful for managing your accounts. This fix suppressed those logs.
* **AVX- 27653** - Resolved two issues that could cause gateways to crash: the conduit binary could become overwhelmed by Linux kernel netlink messages, and IP fragmented packets could trigger a kernel crash if the packet fragment was smaller than the UDP header.  This fix included releasing a new kernel driver.

.. important::

  If you experienced this issue, **restart your gateway** to use the new kernel driver.

* **AVX-27657** - A full memory would cause the gateway’s tunnels to flap.
* **AVX-28242** - Fixed an issue that prevented OpenVPN users from connecting to their VPN after adding a second search domain separated by a comma (Controller > Edit Config > Modify Split Tunnel). Now, OpenVPN users can enter multiple search domain names separated by commas in a split  tunnel configuration.
* **AVX-29002** - If you mapped a Site2Cloud configuration to a Spoke Gateway and then upgraded your gateway image with version 6.8.1148 software, traffic to your remote Site2Cloud connection would break.
* **AVX-29016** - When you registered a CAAG or Edge Gateway while your LAN/WAN interface was down, the CloudN list would fail to display. You could not perform basic actions like Diag, Deregister, or Reset Configuration.

**Known Issues in Aviatrix Release 6.9.161**

* **AVX-29643** - There is an MSS clamp at 1370 whenever packets need to cross an AWS inter-region peering or any other underlay that does not support jumbo frames.

6.8.1342 (09/30/2022)
===============================

**Issues Corrected in Aviatrix Release 6.8.1342**

* **AVX-26004** - Resolved an issue involving AWS accounts and permissions. If you onboarded an AWS account to your Controller, but your Controller didn’t have permission for some regions in that account, your account would print traceback logs, sometimes in large amounts. These logs did not affect performance but were unhelpful for managing your accounts. This fix suppressed those logs.
* **AVX-27653** - Resolved two issues that could cause gateways to crash: the conduit binary could become overwhelmed by Linux kernel netlink messages, and IP fragmented packets could trigger a kernel crash if the packet fragment was smaller than the UDP header.  This fix included releasing a new kernel driver.

.. important::

  If you experienced this issue, **restart your gateway** to use the new kernel driver.

* **AVX-27657** - A full memory would cause the gateway's tunnels to flap.
* **AVX-28242** - Fixed an issue that prevented OpenVPN users from connecting to their VPN after adding a second search domain separated by a comma (Controller > Edit Config > Modify Split Tunnel). Now, OpenVPN users can enter multiple search domain names separated by commas in  a split tunnel configuration.
* **AVX-29002** - If you mapped a Site2Cloud configuration to a Spoke Gateway and then upgraded your gateway image with version 6.8.1148 software, traffic to your remote Site2Cloud connection would break.
* **AVX-29016** - When you registered a CAAG or Edge Gateway while your LAN/WAN interface was down, the CloudN list would fail to display. You could not perform basic actions like Diag, Deregister, or Reset Configuration.


6.7.1480 (09/20/2022) 
=========================

**Feature Enhancements in 6.7.1480** 

* **AVX-23493** - You can now use the secondary IP as the Destination CIDR in SNAT/DNAT rules as long as the gateway is not in Insane Mode. 
* **AVX-25957** - Improved the performance of enabling an Egress FQDN tag so that the process is 5x faster. With this enhancement, adding a rule to an Egress FQDN tag is up to 50x faster. 

**Issues Corrected in 6.7.1480** 

* **AVX-17842** - Exception error displayed in version 6.7.1186 with spoke gateways in Azure, with SNAT and Insane Mode Encryption enabled. 
* **AVX-25499** - An Aviatrix regular gateway (as opposed to a Transit or Spoke Gateway), did not have routes to local VPC CIDRs. 
* **AVX-26933** - When you created a route-based Site2Cloud connection from the Controller's Site2Cloud setup page and selected the HA gateway as the primary source gateway, the route table was not populated correctly. 
* **AVX-27658** - Updated API call to retrieve specific transit Firenet spoke policies. 
* **AVX-27716** - An error may show "configuration not up-to-date" while upgrading an old image (kernel versions prior to version 5.4) to 6.8.1149. The old image will upgrade despite this error.

6.8.1311 (09/12/2022) 
=========================

**New Features in Release 6.8.1311** 

* (`Public Preview <https://docs.aviatrix.com/HowTos/Controller_and_Software_Release_Notes.html#public-preview-features>`_ feature) **Network Security Scanner** - The Security Scanner enables you to detect vulnerabilities of instances that an attacker could potentially exploit within your Aviatrix-managed VPCs/VNets. 

  * To run the scanner, open Aviatrix CoPilot and navigate to Topology. 
  * Select an instance (not a gateway) in the map and click the **Security Scanner** button in the resource's properties pane. 
  * Enter one port, multiple ports, or a range of ports to scan and click **Run**. A Scan Report opens on the right. Note that this feature only inspects TLS/SSL protocols. 
 
**Enhanced Features in Release 6.8.1311** 

* **Secondary IP as Destination CIDR** - If you tried to set a gateway's secondary IP as the Destination CIDR of NAT rules, you received an error message. You can now use this secondary IP as the Destination CIDR as long as the gateway is not in Insane Mode. 
* **Micro-segmentation** - Micro-segmentation is now supported on AWS GovCloud and Azure Government as well as AWS, Azure, and GCP. 
* **Performance Improvements for Egress FQDN Tags** - Improved the performance of enabling an Egress FQDN tag so that the process is 5x faster. With this enhancement, adding a rule to an Egress FQDN tag is up to 50x faster. 

**Issues Corrected in Aviatrix Release 6.8.1311** 

* **AVX-25499** - An Aviatrix regular gateway (as opposed to a Transit or Spoke Gateway), did not have routes to local VPC CIDRs.
* **AVX-26020** - When you did a Controller backup and restore, the Controller temporarily lost its BGP routes. This loss caused network flapping and a loss of traffic until the routes were restored.
* **AVX-26933** - When you created a route-based Site2Cloud connection from the Controller's Site2Cloud setup page and selected the HA gateway as the primary source gateway, the route table was not populated correctly.
* **AVX-27215** - When you have a large network with FireNet gateways, applying Terraform took a long time and may have overused the Controller CPU.
* **AVX-27323** - When you exported a Terraform configuration from your Controller, the downloaded config file may have shown incorrect information. For example, if you exported a gateway configuration by navigating to Useful Tools > Export To Terraform > Gateway > gateway_snat OR gateway_dnat, the downloaded config file may have incorrectly shown that the snat_policy:
 
     - Has an interface argument with the tunnel interface ID. 
     - Has a connection argument with the transit connection ID.  

* In this situation, the correct config info would be that the snat_policy: 

     - Has an interface argument with an empty value. 
     - Has a connection argument with the transit connection ID.

* **AVX-27330** - Fixed upgrade issue if the customer deployed GW before 5.3.
* **AVX-27716** - An error may show â€œconfiguration not up-to-dateâ€ while upgrading an old image (kernel versions prior to version 5.4) to 6.8.1149. The old image will upgrade despite this error.
* **AVX-27732** - FIPS 140-2 is neither supported nor required for Edge devices. Previously, if you tried to enable FIPS on the Controller, the edge gateway configuration would fail. Now, if you try to enable user-vpn in FIPS mode silently, the Edge gateways will bypass the request.
* **AVX-27820** - Resolved an issue that sometimes caused a Controller to read the VPC CIDR of a gateway incorrectly. This issue caused an error message when OpenVPN was enabled: "Failed to initialize GlobalConfigDB:" 
Error while trying to migrate from MongoDB to Etcd: Invalid IP address 1." 

6.9.128 (09/09/2022) 
=====================

**Important Notices for Release 6.9.128**

**Upgrading CloudN**

*CloudN users*:

* Make sure that your CloudN hardware is *version 2.1 or a later version*. If your hardware is 2.0 or earlier, you will need a hardware refresh.  

* *Replace* CloudN hardware version prior to 2.1 with *CloudN hardware version 2.1 or later*. You could also migrate to Aviatrix Edge.  

.. note::

  To check which CloudN hardware version you are currently using, check your server. A server with a single SSD is running HW version 2.0 or a prior version and needs an update. A server with dual SSD Hard Disk drives is HW 2.1 or a later version and does not need an update.  

- **AVX-37948** - (CoPilot users) The system metric Memory Free (memory_free) used in CoPilot for configuring alerts had been using a definition that was inconsistent with the operating system (OS) definition. Starting in 6.9.128 the metrics memory_available and memory_free are consistent with the OS definition.

  Due to this change, after upgrading your Controller, you may receive many Memory Free alerts indicating the memory free dropped. To mitigate this issue, you can change your alert configurations from using mem_free to using memory_available instead.


**Enhanced Features in Release 6.9.128** 

* **Micro-segmentation** - `Micro-segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_ is now supported on AWS GovCloud and Azure Government as well as AWS, Azure, and GCP. 
* **NAT Support for Private Mode** - NAT (Network Address Translation) is now supported on gateways while using `Private Mode <https://docs.aviatrix.com/HowTos/privatemode.html>`_. This enhancement includes: 

  * DNAT and customized SNAT. 
  * Terraform support for NAT. 

* **New Metered Offer in AWS and Azure** - Aviatrix offers a new metered license, **Aviatrix Secure Networking Platform Metered 2208-Universal 24x7 Support**, in the AWS and Azure marketplaces. This license offers access to upcoming Aviatrix features and flexible billing options.
  
  * New customers can subscribe to this license using the `AWS Getting Started Guide <https://docs.aviatrix.com/StartUpGuides/aws_getting_started_guide.html>`_ or `Azure Startup Guide <https://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html>`_.  
  * Existing customers, migrate to this license as soon as possible to access upcoming new features and flexible billing options. See the AWS or Azure sections of `this document <https://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_. 

* **Secondary IP as Destination CIDR** - If you tried to set a gateway's secondary IP as the Destination CIDR of NAT rules, you received an error message. You can now use this secondary IP as the Destination CIDR as long as the gateway is not in Insane Mode. 

**Public Preview Features in Aviatrix Release 6.9.128**

(`Public Preview <https://docs.aviatrix.com/HowTos/Controller_and_Software_Release_Notes.html#public-preview-features>`_ feature) **Network Security Scanner** - The Security Scanner enables you to detect vulnerabilities of instances that an attacker could potentially exploit within your Aviatrix-managed VPCs/VNets.

* To run the scanner, open Aviatrix CoPilot and navigate to Topology.
* Select an instance (not a gateway) in the map and click the **Security Scanner** button in the resource's properties pane.
* Enter one port, multiple ports, or a range of ports to scan and click **Run**. A Scan Report opens on the right. Note that this feature only inspects TLS/SSL protocols.

**Issues Corrected in Aviatrix Release 6.9.128** 

* **AVX-27215** - When you have a large network with FireNet gateways, applying Terraform took a long time and may have overused the Controller CPU. 
* **AVX-27716** - An error may show â€œconfiguration not up-to-dateâ€ while upgrading an old image (kernel versions prior to version 5.4) to 6.8.1149. The old image will upgrade despite this error. 
* **AVX-27732** - FIPS 140-2 is neither supported nor required for Edge devices. Previously, if you tried to enable FIPS on the Controller, the edge gateway configuration would fail. Now, if you try to enable user-vpn in FIPS mode silently, the Edge gateways will bypass the request. 
* **AVX-27820** - Resolved an issue that sometimes caused a Controller to read the VPC CIDR of a gateway incorrectly. This issue caused an error message when OpenVPN was enabled: "Failed to initialize GlobalConfigDB: Error while trying to migrate from MongoDB to Etcd: Invalid IP address 1." 

**Known Issues in Aviatrix Release 6.9.128**

* **AVX-35490** - After a Controller software upgrade or a CloudXD restart, the Controller migrates BGP routes, automatically triggering an “Approve New Routes” email for existing pending CIDRs on gateways with learned CIDRs approval enabled. This issue has no functional impact. Approved CIDRs remain intact and no routes are changed.

6.8.1149 (08/17/2022)
=====================

**Issues Corrected in Aviatrix Release 6.8.1149**

- **AVX-27330** - Fixed upgrade issues for gateways deployed before version 5.3.

**Known Issues in Aviatrix Release 6.8.1149**

- **AVX-27716** - An error may show "configuration not up-to-date" while upgrading an old image (kernel versions prior to version 5.4) to 6.8.1149. The old image will upgrade despite this error.

6.7.1436 (08/16/2022)
=====================

**Issues Corrected in Aviatrix Release 6.7.1436**

- **AVX-18788** - When a GCP spoke/transit using insane mode and attached to other gateway is resized to a larger size the network throughput does not increase as expected. This fix ensures that spoke/transit gateway throughput increases the network throughput when resized to a larger size. 
- **AVX-24610** - When the AWS TGW API returns an error to search routes from a route table, the VPN /Direct Connect learned routes are withdrawn. It should be treated as no change. 
- **AVX-24730** - The user should be able to go to the Settings > Controller > Login Customization page, the page allows the user to change the admin login restriction setting and set controller banner. 
- **AVX-24860** - Enabled support for legacy Azure Germany North Region.  Azure does not allow users to create a new resource group in the legacy Germany North Region however users can still access or update the resource created in the legacy region previously. 
- **AVX-25128** - An exception is seen when migrating transit gateway tunnel status in MongoDB to etc. when transit gateway has CloudN attached. When migrating transit gateway tunnel status in MongoDB to etcd, for transit gateways that have CloudN attached, use CloudN private_ip for peer_ip to fix the exception. If tunnel status in MongoDB does not have peer_ip, update it with peer_ip based on peer info from tunnel status msg controller received from a gateway. When a GCP spoke/transit using insane mode and attached to another gateway is resized to a larger size the network throughput does not increase as expected. This fix ensures that spoken/transit gateway throughput increases the network throughput when resized to a larger size. 
- **AVX-25641** - When the customer configures the route-based mapped site2cloud connections (including enabling Forward Traffic to Transit) with tunnel or gateway failover or subnet editing, some customer traffic could be dropped. This is because the code incorrectly updates the routing parts of the connection. To fix the issue, the customer should update the versions with the fix, and image upgrades the gateways to get rid of the incorrect routing information on the gateway so that the new code can rebuild the correct routing. 
- **AVX-25721** - For a spoke gateway, if the CIDR propagated from transit gateway has longer prefix than the CIDR propagated from S2C connection, existing software ignores the route/CIDR from transit gateway. The patch fixes this error and keeps longer prefix route from transit gateway.
- **AVX-25976** - With this change, we will not program unnecessary entries in the VPC route table for DNAT configured with s2c connection. Thus, there is nothing to be cleaned up when the DNAT configuration is removed. 
- **AVX-25993** - The logging service for Rsyslog supports up to 9 profiles. It is a bug in which the configuration during restore allows each profile enablement to start the Rsyslog service (6 times or more) in less than 2 seconds. The system service defaults 5 times in 10 seconds; otherwise, the Rsyslog service will fail in "starting". The fix is to ensure that the Rsyslog service is only restarted once for all profiles. 
- **AVX-26086** - Corrected the logic to program the learned 0.0.0.0/0 route on the Azure cloud route table. 
- **AVX-26208** - Corrected issue with Security Group Management in certain cases when restoring from a backup. 
- **AVX-26374** - The controller database can go into a state where it has empty peer IPs for tunnels between transit gateways and CloudN devices. This prevents the gateway snapshot creation and prevents configuration/route updates being propagated to the gateway. This Software patch script will correct the controller database entries.
- **AVX-26852** - If users have/use 65535 in their BGP route AS path at the beginning of the path before any other ASN's, it is replaced with IMPLICIT. This prevents an exception from occurring and prevents BGP route flapping. 

**Known Issues in Aviatrix Release 6.7.1436**

- **AVX-24701** - When the AWS TGW API returns an error to search routes from a route table, the VPN /Direct Connect learned routes are withdrawn. It should be treated as no change. 
- **AVX-25459** - If you have one of the VPC CIDRs as same as the spoke gateway's subnet CIDR, some routes cannot be updated correctly in the spoke gateway route table. 
- **AVX-25709** - Exception seen when disabling TGW Firenet la launched before the 6.3 release. 
- **AVX-26684** - GRE external connection may miss routes on the HA Transit. 

**Deprecated Features in Aviatrix Release 6.7.1436**

Transitive Peering Feature Deprecated

-  The Transitive Peering feature is deprecated. This feature's functionality will be replaced by `Aviatrix Multi-Cloud Transit <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_.
 
(AWS) UserVPN Gateways Do Not Support Classic Load Balancers
 
**AVX-24015** - (AWS) AWS classic Load Balancers are not supported with UserVPN gateways. Instead, `migrate <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/migrate-classic-load-balancer.html>`_ to Network Load Balancers in your AWS account.


6.6.5721 (08/16/2022)
=====================

**Issues Corrected in Aviatrix Release 6.6.5721**

- **AVX-18788** - When a GCP spoke/transit using insane mode and attached to other gateway is resized to a larger size the network throughput does not increase as expected. This fix ensures that spoke/transit gateway throughput increases the network throughput when resized to a larger size. 
- **AVX-24610** - When the AWS TGW API returns an error to search routes from a route table, the VPN /Direct Connect learned routes are withdrawn. It should be treated as no change. 
- **AVX-24730** - The user should be able to go to the Settings > Controller > Login Customization page, the page allows the user to change the admin login restriction setting and set controller banner. 
- **AVX-24860** - Enabled support for legacy Azure Germany North Region.  Azure does not allow users to create a new resource group in the legacy Germany North Region however users can still access or update the resource created in the legacy region previously. 
- **AVX-25459** - If you have one of the VPC CIDRs as same as the spoke gateway's subnet CIDR, some routes cannot be updated correctly in the spoke gateway route table. 
- **AVX-25490** - New controller versions could be hit with error messages upon upgrade, such as "TypeError: '1370' has type str, but expected one of: int, long". This is because the previous version has some gateway level tunnel configurations which could have some values of the string type, and the newer version expects the integer type. The latest controller image versions with the fix will automatically convert the string values into integer values so that the upgrade could finish. 
- **AXV-25514** - If users have/use 65535 in their BGP route AS path at the beginning of the path before any other ASN's, it is replaced with IMPLICIT. This prevents an exception from occurring and prevents BGP route flapping. 
- **AVX-25641** - When the customer configures the route-based mapped site2cloud connections (including enabling Forward Traffic to Transit) with tunnel or gateway failover or subnet editing, some customer traffic could be dropped. This is because the code incorrectly updates the routing parts of the connection. To fix the issue, the customer should update the versions with the fix, and image upgrades the gateways to get rid of the incorrect routing information on the gateway so that the new code can rebuild the correct routing. 
- **AVX-25673** - After using SITE2CLOUD Diagnostics 'Enable verbose logging', 'Disable verbose logging' fails to disable verbose logging. 
- **AVX-25721** - For a spoke gateway, if the CIDR propagated from transit gateway has longer prefix than the CIDR propagated from S2C connection, existing software ignores the route/CIDR from transit gateway. The patch fixes this error and keeps longer prefix route from transit gateway.
- **AVX-25976** - With this change, we will not program unnecessary entries in the VPC route table for DNAT configured with s2c connection. Thus, there is nothing to be cleaned up when the DNAT configuration is removed. 
- **AVX-25993** - The logging service for Rsyslog supports up to 9 profiles. It is a bug in which the configuration during restore allows each profile enablement to start the Rsyslog service (6 times or more) in less than 2 seconds. The system service defaults 5 times in 10 seconds; otherwise, the Rsyslog service will fail in "starting". The fix is to ensure that the Rsyslog service is only restarted once for all profiles. 
- **AVX-26086** - Corrected the logic to program the learned 0.0.0.0/0 route on the Azure cloud route table. 
- **AVX-26208** - Corrected issue with Security Group Management in certain cases when restoring from a backup. 
- **AVX-27359** - CloudN SW upgrade from image prior to 6.6.5721 need to use "upgrade to a custom release" to upgrade to latest 6.6 (6.6.5721).

**Known Issues in Aviatrix Release 6.6.5721**

- **AVX-24701** - When the AWS TGW API returns an error to search routes from a route table, the VPN /Direct Connect learned routes are withdrawn. It should be treated as no change. 
- **AVX-25709** - Exception seen when disabling TGW Firenet la launched before the 6.3 release. 
- **AVX-26684** - GRE external connection may miss routes on the HA Transit. 


6.8.1148 (08/09/2022)
=====================

**Important Notices in Aviatrix Release 6.8.1148** 

- **AVX-26666** - For gateway rollback to work in 6.8, your Controller and gateways must be on the latest version of 6.7 (6.7.1376) before upgrading to 6.8.
- **AVXSRE-395** - Aviatrix is continuously improving its products and services, requiring to migrate to new IP addresses. Therefore, if you are filtering out part of all the traffic from your controllers to the Internet, please update your rules to allow Aviatrix Central Services according to our Support Portal: Aviatrix Products: `Required Access for External Sites <https://aviatrix.zendesk.com/hc/en-us/articles/4417312119437-Aviatrix-Products-Required-Access-for-External-Sites>`_
- **AVX-31465** - **CloudN users**: Before upgrading your Controller to version 6.8.1148, make sure your CloudN base software is upgraded to version 6.6.5721 or a later version. 

.. note::

  To check which CloudN base software version you are currently using, log into your CloudN IP address. 

The following Private Preview Features are available in this release:

- **Managed CloudN for AWS and Azure China** - Managed CloudN for AWS and Azure China provides High-Performance Encryption (Insane Mode) to on-premises locations in China with CloudN. Refer to `Managed CloudN Workflows <https://docs.aviatrix.com/HowTos/CloudN_workflow.html>`_.
- **AVX-37948** - (CoPilot users) The system metric Memory Free (memory_free) used in CoPilot for configuring alerts had been using a definition that was inconsistent with the operating system (OS) definition. Starting in 6.8.1148 the metrics memory_available and memory_free are consistent with the OS definition.

  Due to this change, after upgrading your Controller, you may receive many Memory Free alerts indicating the memory free dropped. To mitigate this issue, you can change your alert configurations from using mem_free to using memory_available instead.

**New Features in Aviatrix Release 6.8.1148**

- **Aviatrix Edge 2.0** - The Aviatrix Edge solution enables enterprises to extend the Cloud operational model to the edge network for consistent and repeatable architecture, management, visibility, security, and control. This cloud-out architecture enables enterprises to leverage the Aviatrix platform ubiquitous support for edge connectivity. The result is secure, seamless connectivity to edge locations such as data centers, co-locations, remote sites, provider locations, branch offices, and retail stores. Aviatrix Edge 2.0 solution is offered in VMware ESXi and KVM form factors that lets you deploy an Edge Gateway with Spoke Gateway capabilities at the edge network. For more information about Aviatrix Edge, refer to the `Aviatrix Edge FAQ <https://docs.aviatrix.com/HowTos/edge-faq.html>`_.
- **Azure BGP over LAN multi-peer and Azure Route Server Integration** - Aviatrix now supports multi-peer BGP Over LAN connections in Azure. This feature offers new functionality, such as the ability to interoperate with multiple third-party virtual appliances such as SD-WAN cloud instances without having to use any tunnelling protocols such as IPsec. Please see `this document <https://docs.aviatrix.com/HowTos/azure_bgpolan_multi_peer.html>`_ for more information.
- **Certificate-Based Authentication for Site2Cloud VPN** - You can now use certificate-based authentication when configuring a Site2Cloud connection between your Aviatrix gateways and external devices. Currently only the Palo Alto VM-Series firewall is supported as an external device. See `here <https://docs.aviatrix.com/HowTos/site2cloud-cacert.html>`_ for more information. 
- **HPE for AWS/Azure China** - AWS China and Azure China CSPs now support High Performance Encryption (HPE).
- **Aviatrix Controller Deployment from Azure China** - Aviatrix now supports deploying a Controller from Azure China. See `this document <https://docs.aviatrix.com/HowTos/aviatrix_china_overview.html>`_ for more information about which Aviatrix features and services are available for China marketplaces. Please note that Aviatrix CoPilot is still only available in AWS China.
- **Preserve AS Path** - In 6.7.1319, we introduced a new toggle, "Preserve AS Path". When enabled, this toggle ensured gateways retained the AS path in manually advertised routes, and that routes would be advertised as local if the route did not exist in best route DB. This change improves failover behavior; gateways will stop advertising any manually advertised CIDR if it is no longer in the best DB (the route is no longer advertised as local).
- **Private Mode Phase 1** - Private Mode is a global setting that offers secure orchestrated intra- and multi-cloud networking by removing the need for public IPs for Aviatrix gateways. `Click here for more information about Private Mode <https://docs.aviatrix.com/HowTos/privatemode.html>`_.

**Enhanced Features in Aviatrix Release 6.8.1148**

- **CoPilot Clustered Deployment from Aviatrix Controller UI (AWS CSP only)** - If you deployed Aviatrix Controller in AWS, you now have the option to deploy Aviatrix CoPilot as a clustered (fault tolerant) system directly from your Aviatrix Controller UI. For detailed information, see the Aviatrix CoPilot Deployment Guide.
- **Near-hitless GW Resize/Replace** -- Aviatrix cloud and routing orchestration enhancements now allow for near hitless traffic loss when performing an image upgrade or when resizing a gateway from the Controller (applies to HA pairs).
- **Site2Cloud Individual IPSec Tunnel Reset** - Aviatrix now allows gateways with multiple Site2Cloud tunnels to reset individual non-HPE or strongSwan IPSec tunnels instead of restarting the entire VPN service. This functionality does not disrupt other attached tunnels. This is not supported for IPSec racoon tunnels. 
- **CoPilot Notification Thresholds** - Notification thresholds can be set on gateway tunnel counts configured in CoPilot to send alert notifications via the UI and email. 
- **Site2Cloud Mapped NAT** - Site2Cloud mapped NAT now supports 32 remote/on-prem CIDRs and ten Site2Cloud connections. The AWS Spoke gateway size must be at least t3.small (or equivalent size in other CSPs). You should keep the number of routes in the landing Spoke VPC route tables to a minimum for better performance of landing Spoke gateway failovers or upgrades. Using RFC 1918 CIDRs to map the remote/on-prem CIDRs is strongly recommended.

**Deprecated Features in Aviatrix Release 6.8.1148**

- ActiveMesh 1.0 is deprecated in this release. You can upgrade to ActiveMesh 2.0 using the Controller's Migrate option. 
-  The Transitive Peering feature is deprecated. This feature's functionality will be replaced by `Aviatrix Multi-Cloud Transit <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_.

**UI Enhancements in Aviatrix Release 6.8.1148**

- Support for deploying a CoPilot clustered deployment
- Support for deploying Aviatrix Edge Gateway
- Added CA Certificate section in Site2Cloud (Controller)
- Added Private Mode section in Settings (Controller)

**Issues Corrected in Aviatrix Release 6.8.1148**

- **AVX-10899** - When a new subnet was added to a Google Cloud VPC after a spoke was created, the firewall rules were not getting updated to reflect the new subnet. After this fix, when a new subnet is added, the firewall rule is updated when attaching Spoke to Transit. If a Spoke is already attached to Transit and a new subnet is added, the Spoke needs to be detached and reattached to update the firewall rule.
- **AVX-17284** - Fixed Stateful firewall log throttling. The logs no longer undergo quick rotation.
- **AVX-17650** - Previously the Controller was stuck at 99% when performing a custom upgrade dry run on CloudN. This no longer occurs.
- **AVX-18788** - When the instance size of a GCP Spoke/Transit Gateway using Insane Mode that is attached to another gateway is increased network throughput increases accordingly. 
- **AVX-19569** - Fixed the issue of "TCP" protocol FQDN rules for port 8443 not being enforced when an "HTTP" protocol FQDN rule for port 8443 exists.
- **AVX-20038** - Fixed the issue where the "aviatrix-Aviatrix-Ingress-routing" edge route table was not programmed correctly when PSF gateway was deployed to a public subnet matching its VPC's CIDR. 
- **AVX-21889** - You can now successfully insert a stateful Firewall Rule using a reference rule from previously existing rules.
- **AVX-22495** - Occasionally an AWS Transit FireNet Gateway Image upgrade would result in config_fail with the error message "failed to bring up interface eth3". This error no longer occurs.
- **AVX-22928** - If you delete a GCP gateway that is connected to an external gateway, you now see an error in the Controller indicating that deletion is not possible because of the external connection. Previously, the gateway was removed from the database and an error was not displayed in the Controller. To delete the GCP gateway, you must first delete the connection to the external gateway. 
- **AVX-23292** - On Edge gateways, if the "clish" command "˜diagnostics" is typed before Controller registration is run, it will show an exception saying the diagnostics file does not exist. After the fix, an error message displays indicating that gateway registration is not triggered.
- **AVX-23383** - Improved the function of Aviatrix gateways in High-Performance Encryption (HPE) mode by increasing the number of interfaces an NTP service can handle from 1024 to 4096.
- **AVX-23407** - The best route may not have been selected correctly based on the AS path lengths and metric values among routes of the same BGP connection. When this route was used to represent the BGP source and compared with route from other sources, the result could be incorrect.
- **AVX-23725** - Improved the storage methods for FQDN tags. The domain names in FQDN tags for Egress FQDN Filter will now be stored in a case-insensitive manner. For example, tag1: www.Google.com, TCP, 443 and tag2: www.google.com, TCP, 443 will be stored as one tag (www.google.com, TCP, 443).
- **AVX-23809** - When the maximum number of buckets supported for Private S3 is reached, the correct error is displayed.
- **AVX-24658** - The Python scheduler has been improved to accommodate more tasks. This ensures that all tasks are scheduled and triggered on time without being missed or having to wait.
- **AVX-24701/24610** - Previously when the Controller ran an API call to AWS to pull the routes from the AWS GW (when attached to an Aviatrix Transit Gateway) and the API returned an error, the Controller withdrew the routes. Now when the API returns an error the Controller no longer changes the routes and waits to run the API again.
- **AVX-24730** - The Settings > Controller > Login Customizationâ€ page in the Aviatrix Controller now displays as expected.
- **AVX-24860** - Enabled support for legacy Azure Germany North Region. Azure does not allow you to create new resource groups in this region. However, you can access and/or update resources previously created in this legacy region.
- **AVX-25082** - An uncaught exception caused the Aviatrix metering system to report metering inaccurately. This has been fixed.
- **AVX-25128** - An exception occurs when migrating Transit Gateway tunnel status in MongoDB to etcd when the Transit Gateway has a CloudN attached. To fix this issue, when migrating Transit Gateway tunnel status in MongoDB to etcd that have CloudN attached, use the CloudN private_ip for the peer_ip. If the tunnel status in MongoDB does not a peer_ip, update it with the peer_ip based on the peer information from the gateway tunnel status message received by the Controller.
- **AVX-25228** - Under certain conditions a gateway can be deleted but its peering information is still in the peering_info database, which can cause an exception. Now, the gateway information is removed from the peering_info database when the gateway is deleted.
- **AVX-25256** - A control plane service running on a gateway no longer consumes multiple gigabytes of memory when there are many IPsec tunnels.
- **AVX-25257** - An inefficient lookup routine in our internal routing service on Transit gateways running in Azure resulted in a persistently high CPU usage for a large number (1000+) of tunnels. This has been corrected.
- **AVX-25289** - A bug in the Preserve AS Path feature resulted in manual summary CIDRs not present in the best route database being listed in BGP Advertise CIDRs on the BGP page for the HA gateway. The routes are programmed correctly; this is a display-only issue. Customers who have enabled this feature must disable and re-enable the feature on the Transit gateway to correct the display issue. 
- **AVX-25425** - The dry run for 6.8.1148 will fail if the CSP gateways are using an older AMI, but the upgrade will succeed. To prevent any issues with your gateways, performing an "Image Upgrade" from the Controller (Settings > Maintenance > Upgrade) is recommended. CSP gateways with older AMIs (released in early 2021) may not be able to upgrade after 7.0.
- **AVX-25524** - Fix filter removed after auto-refresh gateway list.
- **AVX-25632** - Fixed the issue where the Aviatrix Controller was creating more tunnels which exceeds the maximum throughput of the CSP, for the same gateway instance sizes in terms of core counts.
- **AVX-25687** - When single SNAT is enabled, traffic toward the Spoke VPC CIDRs is no longer SNAT'ed. Before this change, all traffic egress from Spoke GW eth0 interface would be SNAT'ed, leading to asymmetric traffic on Transit gateways.  
- **AVX-25993** - The logging service for Rsyslog supports up to nine profiles. The configuration during restore allowed each profile enablement to start the Rsyslog service (6 times or more) in less than 2 seconds. The system service defaults five times in 10 seconds; otherwise, the Rsyslog service will fail in "starting". The fix ensures that the Rsyslog service is only restarted once for all profiles.
- **AVX-26007** - The only user actions possible during a restore are enabling remote support or uploading tracelog. All other actions are blocked.
- **AVX-26086** - Corrected the logic to program the learned 0.0.0.0/0 route on the Azure CSP route table.
- **AVX-26095** - An improperly configured security group prevented gateways from sending keepalive checks to the Aviatrix Controller. This should have marked the gateways as down. However, because of a bug in our internal service, the Controller continued to mark those gateways as up. 
- **AVX-26188** - IPsec tunnel re-establishment time on the Transit gateway has been improved when there is a large number of tunnels. This will shorten the time it takes to recover from a failure event.

**Known Issues in Aviatrix Release 6.8.1148**

- **AVX-13908** - In a Site2Cloud connection, the public or private IP address of the remote endpoint is used as the Remote Identification. If one side uses a public IP and the other side uses a private IP, the Site2Cloud connection will not be established since the remote identification does not match.
- **AVX-24650** - Single SNAT is not supported in Private Mode.
- **AVX-25641** - When the customer configures the route-based mapped Site2Cloud connections (including enabling Forward Traffic to Transit) with tunnel or gateway failover or subnet editing, some customer traffic could be dropped. This is because the code incorrectly updates the routing parts of the connection. To fix the issue, you should upgrade your Controller to version 6.8.1148; 6.6e or later; or 6.7b or later. You must also perform an image upgrade on the gateways that is equivalent to the Controller version. This removes the incorrect routing information on the gateway so that the new code can rebuild the correct routing.
- **AVX-26115, AVX-27062** - Micro-segmentation: Before upgrading from 6.7 to 6.8:

   - remove invalid characters or spaces, if any, in app domain or policy names
   - if there is a policy that contains port 0, change it to a valid value
   - port ranges should follow < lower port number - higher port number > format 


- **AVX-25673** - After Site2Cloud verbose logging is enabled, it cannot be disabled in the UI.
- **AVX-26419** - If you are connecting to another Aviatrix device, using IKEv2 is preferred. IKEv2 support started in version 5.0.2667. If you configure IKEv1 in a Site2Cloud connection that uses certificate-based authentication and is connecting to another Aviatrix device, you must add the intermediate CA's in addition to the root CA. When an intermediate CA is renewed and re-authentication is attempted, the Site2Cloud connection will go down until you add the new certificate.
- **AVX-27653** - If you are using software version 6.8.1148 on an outdated gateway image, your Controller could have a memory limitation issue. `Upgrade <https://docs.aviatrix.com/HowTos/gateway-image-migration.html>`_ your gateway images to avoid this issue.
- **AVX-35490** - After a Controller software upgrade or a CloudXD restart, the Controller migrates BGP routes, automatically triggering an “Approve New Routes” email for existing pending CIDRs on gateways with learned CIDRs approval enabled. This issue has no functional impact. Approved CIDRs remain intact and no routes are changed.
- **AVX-46969** - You may see a high rate of packet drops for your Transit Gateways. If you experience this issue, please contact Aviatrix Support and ask for guidance in upgrading to release 6.9.128.

**Features Deprecated in Aviatrix Release 6.8.1148**

(AWS) UserVPN Gateways Do Not Support Classic Load Balancers
 
**AVX-24015** - (AWS) AWS classic Load Balancers are not supported with UserVPN gateways. Instead, `migrate <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/migrate-classic-load-balancer.html>`_ to Network Load Balancers in your AWS account.

6.7.1376 (08/02/2022) 
=========================

**Important Notices in Aviatrix Release 6.7.1376** 

- **AVX-26277** - Controllers running earlier versions of Aviatrix Controller software on AWS AMI version 051022 (released June 9, 2022) will halt due to resource exhaustion after a period of time depending on the level of activity the Controller sees. If using AWS AMI version 051022, you must upgrade to version 6.7.1376 (or 6.6.5712) to prevent this behavior.

**Enhancements in Aviatrix Release 6.7.1376** 

- **AVX-25470: Create single HPE tunnel for Transit and Spoke Attachments** - By default, when HPE is used for Transit peering and Spoke attachments over private IPs, Aviatrix creates the maximum number of HPE tunnels possible given the instance sizes. This enhancement adds the ability to create a single HPE tunnel for Transit peering and spoke attachments over private IPs. Both Transit and Spoke Gateways must have HPE enabled. In Terraform you can enable this by setting the "enable_max_performance" field to "false" when creating Transit peering and Spoke attachments. If using HPE for private Transit peering and Spoke attachments, please re-create those connections once â€œenable_max_performanceâ€ option is enabled.  
- **AVX25657: CoPilot Notification Thresholds** - Notification thresholds can be set on gateway tunnel counts configured in CoPilot to send alert notifications via the UI and email. 

**Issues Corrected in Aviatrix Release 6.7.1376** 

- **AVI-2021-0006** - Fixed a remote code execution vulnerability for users of Aviatrix VPN.
- **AVX-23386** - Upgraded Spire to fix CVE-2021-27099, CVE-2021-27098, CVE-2021-44716, and CVE-2022-24675.
- **AVX-25514** - An exception no longer occurs when migrating Transit gateway BGP routes from MongoDB to etcd if the BGP routes have 65535 in the AS path. Possible BGP route flapping is also prevented.
- **AVX-24658** - The Python scheduler has been improved to accommodate more tasks. This ensures that all tasks are scheduled and triggered on time without being missed or having to wait.
- **AVX-25082** - An uncaught exception caused the Aviatrix metering system to report metering inaccurately. This has been fixed.
- **AVX-25128** - An exception occurs when migrating Transit Gateway tunnel status in MongoDB to etcd when the Transit Gateway has a CloudN attached. To fix this issue, when migrating Transit Gateway tunnel status in MongoDB to etcd that have CloudN attached, use the CloudN private_ip for peer_ip. If the tunnel status in MongoDB does not a peer_ip, update it with the peer_ip based on the peer information from the gateway tunnel status message received by the Controller.
- **AVX-25257** - An inefficient lookup routine in our internal routing service on Transit gateways running in Azure resulted in a persistently high CPU usage for a large number (1000+) of tunnels. This has been corrected.
- **AVX-25289** - A bug in the Preserve AS Path feature resulted in manual summary CIDRs not present in the best route database being listed in BGP Advertise CIDRs on the BGP page for the HA gateway. The routes are programmed correctly; this is a display-only issue. Customers who have enabled this feature must disable and reenable the feature on the Transit gateway to correct the display issue.
- **AVX-25632** - Fixed the issue where the Aviatrix Controller was creating more tunnels which exceeds the maximum throughput of the CSP, for the same gateway instance sizes in terms of core counts. 
- **AVX-25687** - When single SNAT is enabled, traffic toward the Spoke VPC CIDRs is no longer SNAT'ed. Before this change, all traffic egress from Spoke GW eth0 interface would be SNAT'ed, leading to asymmetric traffic on Transit gateways. 
- **AVX-25993** - The logging service for Rsyslog supports up to nine profiles. The configuration during restore allowed each profile enablement to start the Rsyslog service (6 times or more) in less than 2 seconds. The system service defaults five times in 10 seconds; otherwise, the Rsyslog service will fail in "starting". The fix ensures that the Rsyslog service is only restarted once for all profiles.
- **AVX-26007** - The only user actions possible during a restore are enabling remote support or uploading tracelog. All other actions are blocked.
- **AVX-26086** - Corrected the logic to program the learned 0.0.0.0/0 route on the Azure CSP route table.
- **AVX-26095** - An improperly configured security group prevented gateways from sending keepalive checks to the Aviatrix Controller. This should have marked the gateways as down. However, because of a bug in our internal service, the Controller continued to mark those gateways as up. 
- **AVX-26188** - For cases where Transit gateways had a large number of tunnels and encountered a failover event, strongSwan would take a long time to reestablish and restore tunnels, since strongSwan was configured to monitor all interfaces on the gateway. strongSwan config was altered to only monitor the eth0 interface, which results in a shorter restoration time.
- **AVX-26205** - The number of available threads in strongSwan was increased to improve scalability and support more than 2000 tunnels. 
- **AVX-26374** - The Controller database had empty peer IPs for tunnels between Transit Gateways and CloudN. This prevented the gateway snapshot creation, and also prevented configuration/route updates from being propagated to the gateway. This software patch script will correct the Controller database entries. 


6.6.5712 (08/02/2022)
=========================

**Important Notices in Aviatrix Release 6.6.5712** 

- **AVX-26277** - Controllers running earlier versions of Aviatrix Controller software on AWS AMI version 051022 (released June 9, 2022) will halt due to resource exhaustion after a period of time depending on the level of activity the Controller sees. If using AWS AMI version 051022, you must upgrade to version 6.6.5712 (or 6.7.1376) to prevent this behavior.

**New Features in Aviatrix Release 6.6.5712**

- **AVX-25289** - In 6.7.1319, Aviatrix introduced a new toggle, "Preserve AS Path". When enabled, this toggle ensured gateways retained the AS path in manually advertised routes, and that routes would be advertised as local if the route did not exist in the best route DB. 
This change improves failover behavior; gateways will stop advertising any manually advertised CIDR if it is no longer in the best DB (the route is no longer advertised as local).  

**Issues Corrected in Aviatrix Release 6.6.5712** 

- **AVI-2021-0006** - Fixed a remote code execution vulnerability for users of Aviatrix VPN.
- **AVX-23386** - Upgraded Spire to fix CVE-2021-27099, CVE-2021-27098, CVE-2021-44716, and CVE-2022-24675.
- **AVX-25514** - An exception no longer occurs when migrating Transit gateway BGP routes from MongoDB to etcd if the BGP routes have 65535 in the AS path. Possible BGP route flapping is also prevented.
- **AVX-24658** - The Python scheduler has been improved to accommodate more tasks. This ensures that all tasks are scheduled and triggered on time without being missed or having to wait.
- **AVX-25082/25598** - Stale transit peering entries in the database resulted in an issue listing transit peers. This resulted in incorrect metered billing. 
- **AVX-25128** - An exception occurs when migrating Transit Gateway tunnel status in MongoDB to etcd when the Transit Gateway has a CloudN attached. To fix this issue, when migrating Transit Gateway tunnel status in MongoDB to etcd that have CloudN attached, use the CloudN private_ip for peer_ip. If the tunnel status in MongoDB does not a peer_ip, update it with the peer_ip based on the peer information from the gateway tunnel status message received by the Controller.
- **AVX-25257** - An inefficient lookup routine in our internal routing service on Transit gateways running in Azure resulted in a persistently high CPU usage for a large number (1000+) of tunnels. This has been corrected.
- **AVX-25993** - The logging service for Rsyslog supports up to nine profiles. The configuration during restore allowed each profile enablement to start the Rsyslog service (6 times or more) in less than 2 seconds. The system service defaults five times in 10 seconds; otherwise, the Rsyslog service will fail in "starting". The fix ensures that the Rsyslog service is only restarted once for all profiles.
- **AVX-26007** - The only user actions possible during a restore are enabling remote support or uploading tracelog. All other actions are blocked.
- **AVX-26086** - Corrected the logic to program the learned 0.0.0.0/0 route on the Azure CSP route table.
- **AVX-26095** - An improperly configured security group prevented gateways from sending keepalive checks to the Aviatrix Controller. This should have marked the gateways as down. However, because of a bug in our internal service, the Controller continued to mark those gateways as up. 
- **AVX-26188** - For cases where Transit gateways had a large number of tunnels and encountered a failover event, strongSwan would take a long time to reestablish and restore tunnels, since strongSwan was configured to monitor all interfaces on the gateway. strongSwan config was altered to only monitor the eth0 interface, which results in a shorter restoration time.
- **AVX-26205** - The number of available threads in strongSwan was increased to improve scalability and support more than 2000 tunnels. 
- **AVX-26374** - The Controller database had empty peer IPs for tunnels between Transit Gateways and CloudN. This prevented the gateway snapshot creation, and also prevented configuration/route updates from being propagated to the gateway. This software patch script will correct the Controller database entries. 


6.7.1325 (07/25/2022) 
========================= 

**Issues Corrected in Aviatrix Release 6.7.1325**  

- **AVX-25128** - An exception is seen when migrating Transit Gateway tunnel status in MongoDB to etcd when Transit Gateway has CloudN attached. Fix:

#. When migrating Transit Gateway tunnel status in MongoDB to etcd, for Transit Gateways that have CloudN attached, use CloudN private_ip for peer_ip to fix the exception.
#. If tunnel status in MongoDB does not have peer_ip, update it with peer_ip based on peer info from the tunnel status msg controller received from a gateway.

6.6.5667 (07/25/2022) 
========================= 

**Issues Corrected in Aviatrix Release 6.6.5667**  

- **AVX-25128** C An exception is seen when migrating Transit Gateway tunnel status in MongoDB to etcd when Transit Gateway has CloudN attached. Fix:

#. When migrating Transit Gateway tunnel status in MongoDB to etcd, for Transit Gateways that have CloudN attached, use CloudN private_ip for peer_ip to fix the exception.
#. If tunnel status in MongoDB does not have peer_ip, update it with peer_ip based on peer info from the tunnel status msg controller received from a gateway.

6.7.1324 (07/06/2022) 
========================= 

**Feature Enhancements in 6.7.1324** 

- **AVX-25293** - Jumbo frames can be enabled and disabled for GRE tunnels.

6.6.5662 (06/15/2022) 
========================= 

**Feature Enhancements in 6.6.5662** 

- **AVX-21263** - Improved email notifications. When a GRE tunnel in your account goes down or up, the Aviatrix Controller sends the GRE tunnel status change to the registered email address(es). This email notification contains the timestamp for the tunnel status change. 
- **AVX-23383** - Improved the function of Aviatrix gateways in High-Performance Encryption (HPE) mode by increasing the number of interfaces an NTP service can handle from 1024 to 4096. 

**Issues Corrected in Aviatrix Release 6.6.5662** 

- **AVX-21823** - Image upgrade causing incorrect firewall_rtb config on AWS Transit FireNet with network exclude list. 
- **AVX-21889** - You can now successfully insert a stateful Firewall Rule using a reference rule from previously existing rules. 
- **AVX-22791** - Starting with release 6.6, the Controller consolidates emails so that emails with the same email address and subject line are combined (helping limit the number of emails while still delivering important status notifications). These email notifications were being consolidated incorrectly. 
- **AVX-23407** - The best route may not have been selected correctly based on the AS path lengths and metric values among routes of the same BGP connection. When this route was used to represent the BGP source and compared with route from other sources, the result could be incorrect. 

6.7.1319 (06/10/2022) 
========================= 

**Feature Enhancements in 6.7.1319** 

* **AVX-21263** - Improved email notifications. When a GRE tunnel in your account goes down or up, the Aviatrix Controller sends the GRE tunnel status change to the registered-email-address(es). This email notification contains the timestamp for the tunnel status change. 
* **AVX-23069** - Added a new toggle switch, â€œPreserve AS Path,â€ to Multi-Cloud Transit > Advanced Config. This option allows you to preserve an AS Path during manual BGP route advertisements, which reduces the chances of routing loops and wrong route selection on the peer side. 

* You can enable this option in both the Gateway Manual BGP Advertised Network List and the Connection Manual BGP Advertised Network List, and on Transit and Spoke Gateways.  
* When the â€œPreserve AS Pathâ€ option is disabled, the AS path is stripped during BGP route advertisements from Transit or Spoke Gateways to neighbors. 

* **AVX-23105** - Enhanced Controller validation for micro-segmentation. The Controller now checks that gateway kernel version is greater or equal to 5.4.0 before allowing you to configure micro-segmentation. Micro-segmentation requires this minimum kernel for data plane enforcement. 
* **AVX-23163** - The account/gateway auditing interval has been changed from every hour to every 24 hours. This change improves the memory performance of the Controller. 
* **AVX-23383** - Improved the function of Aviatrix gateways in High Performance Encryption (HPE) mode by increasing the number of interfaces an NTP service can handle from 1024 to 4096. 
* **AVX-23725** - Improved the storage methods for FQDN tags. The domain names in FQDN tags for Egress FQDN Filter will now be stored in a case insensitive manner. For example, tag1: www.Google.com, tcp, 443 and tag2: www.google.com, tcp, 443 will be stored as one tag (www.google.com, tcp, 443). 

**Public Preview Features in 6.7.1319** 

The following Public Preview Features are available in this release: 

* **Micro-segmentation** â€“ Micro-segmentation provides granular network security policy enforcement for distributed applications in the cloud. It enables a unified network access policy model for your applications with distributed points of policy enforcement throughout your network. For information about micro-segmentation, see `Secure Networking with Micro-Segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_ in the Aviatrix product documentation. 

The **Micro-segmentation** public preview feature has the following enhancements:

* AVX-23249  - **Micro-segmentation rule priority** â€“ You can now specify a priority number to the micro-segmentation rules you create. The priority number determines the order in which your rules are applied. A lower priority number indicates higher precedence, with the highest priority being 0.
* AVX-23536  - **Micro-segmentation system messages** â€“ You can now view a list of system messages about your micro-segmentation configurations by clicking the bell icon in the CoPilot action bar.

**Issues Corrected in Aviatrix Release 6.7.1319** 

* **AVX-21889** â€“ You can now successfully insert a stateful Firewall Rule using a reference rule from previously existing rules. 
* **AVX-21946** - Micro-segmentation policy logging could display the incorrect policy UUID. 
* **AVX-22110** - Micro-segmentation policy statistics could be overcounted. 
* **AVX-22181** - The Controller crashed when using an Azure API to get VNet routing tables. The crash occurred because the system did not consider the possibility of a failure case in which â€œNoneTypeâ€ is returned. 
* **AVX-22184** - When an Edge Gateway expires, its state is listed as â€œwaitingâ€ on the Upgrade page. This â€œwaitingâ€ Gateway prevents the Controller from successfully upgrading. The actual state of the edge is â€œExpired,â€ which is shown in the CloudN > List.  

   If an Edge Gateway is expired in your Controller, navigate to CloudN > List on the left sidebar. On the Registered Devices page, select the Edge Gateway with the state â€œwaiting,â€ click the Diag dropdown menu, and select Reset Configuration. Then, your Controller can successfully upgrade. 

* **AVX-22208** - Launching a new GCP Gateway with Insane Mode and peering it with another GCP Insane Mode Gateway failed to program the Linux route table correctly. This issue is caused by GCE HPE Gateways with HA pairs to have incorrect entries for secondary IP addresses. The gateway could not recover from this error; you had to terminate the existing gateway and launch a new one. 
* **AVX-22504** - An error displayed when the Alibaba Cloud subnet list was empty: â€œTypeError: 'NoneType' object is not subscriptable.â€ Now, the Controller resolves the error automatically without displaying an error message.  
* **AVX-22791** - Starting with release 6.6, the Controller consolidates emails so that emails with the same email address and subject line are combined (helping limit the number of emails while still delivering important status notifications). These email notifications were being consolidated incorrectly. 
* **AVX-22903** - After a new Controller was launched for the first time, there were no routes from the Transit Gateway to the Spoke Gateway. 
* **AVX-22929** - Potential micro-segmentation app domain filter issue: If an account ID was associated with more than one account name, an app domain may have shown an empty list of resolved CIDRs when one of those account names was used as match criteria for a VM or VPC/VNet filter. 
* **AVX-22934** - ICMP packets could have nonfunctioning associated ports. 
* **AVX-23077** - A gateway would continue trying to enforce micro-segmentation policies on deleted network interfaces. 
* **AVX-23187** - On the Selective Gateway Upgrade page (available in your Controller through Settings > Maintenance), the table has been improved to display more information about your gateways. The table has two new columns: State and Update Status.  

1. **State** - This column displays the state of a gateway: up, down, waiting (for a newly launched gateway waiting to go up), and config_fail (if the gateway configuration failed). 
2. **Update Status** - This column displays the status of a gateway that you just updated:  

* **upgrading** - The update is processing and sending a message to the gateway. 
* **downloading** - The gateway received the upgrade request and is downloading the gwsw.tgz. 
* **downloaded** - The gateway has downloaded the information and preparing to install. 
* **installing** - The gateway is installing the update. 
* **initializing** - The gateway is running the gateway upgrade service which includes initializing modules and restarting services.
* **complete** - The latest update is complete. 
* **upgrade_fail** - The upgrade failed due to a gateway being stopped, a hardware failure, network reachability, or another issue. Try restarting the gateway from your Controller or directly from the related CSP, and then redo the software upgrade. If the "upgrade_fail" status persists, please do an image upgrade. 

* **AVX-23407** - The best route may not have been selected correctly based on the AS path lengths and metric values among routes of the same BGP connection. When this route was used to represent the BGP source and compared with route from other sources, the result could be incorrect. 
* **AVX-23437** - A packet that matched both a source and a destination app domain could be misclassified. 
* **AVX-23925** - Having many micro-segmentation policies (the maximum is 64 policies) might result in performance degradation. 

**Known Issues in 6.7.1319** 

* **AVX-21307** - In the 6.7 release, when you create a large number of gateways using Terraform, some gateways may end in a config_fail state. This rare issue may be related to a transient network or release server connectivity (too many gateways' connections for download of packages). To resolve this issue, replace the gateways that show the â€œconfig_failâ€ state. 

6.4.3057 (05/26/2022) 
=======================

Issues Corrected in Aviatrix Release 6.4.3057

- **AVI-2022-0002** - A vulnerability was discovered which could allow an unauthenticated attacker to run arbitrary commands against Aviatrix gateways. This is not known to be exploited. 
- **AVX-23200** - When connectivity is lost between a Controller and a Gateway, and the Controller is unable to perform a health check on the Gateway by establishing an HTTPS connection, then an SSH-based connection will be used to perform the health check. The results of the health check are supposed to assist the Controller in determining whether a data-plane change is necessary (e.g., routing table updates).


6.5.3233 (05/26/2022) 
=======================

Issues Corrected in Aviatrix Release 6.5.3233

- **AVI-2022-0002** - A vulnerability was discovered which could allow an unauthenticated attacker to run arbitrary commands against Aviatrix gateways. This is not known to be exploited. 
- **AVX-10577** - Licensing metrics were not visible. 
- **AVX-19811** - You can now insert a stateful firewall policy by specifying the position where you want to insert the policy. This feature is presently available through **Insert Stateful Firewall Rules** API using **position** param. The **position** param is 1 indexed. 
- **AVX-20271** - Restricted concurrent uploads to make it harder for a remote attacker to fill the disk to defend against a denial-of-service attack. The check was too restrictive and causing concurrent uploads to overwrite each other. We enhanced the feature to allow for concurrency without sacrificing the original defense. 
- **AVX-21238** - High Performance Encryption (HPE) Gateways with many HPE peerings that have transit segmentation enabled would encounter an Out of Memory (OOM) issue. The gateway failed to recover even after a reboot.â€¯ 
- **AVX-21332** - You can now use â€œinsert_stateful_firewall_rulesâ€ API to insert stateful firewall rules, even when the table is empty. 
- **AVX-22040** - Exception seen when disconnecting a firewall domain from Aviatrix edge domain on an AWS Transit Gateway.  
- **AVX-23200** - When connectivity is lost between a Controller and a Gateway, and the Controller is unable to perform a health check on the Gateway by establishing an HTTPS connection, then an SSH-based connection will be used to perform the health check. The results of the health check are supposed to assist the Controller in determining whether a data-plane change is necessary (e.g., routing table updates).

Known Issues in Release 6.5.3233

- **AVX-22976** - When you roll back a non-AWS primary and HA gateway together in any of the following patterns, one of the rollbacks fails:  

* 6.6.5612 to 6.6
* 6.6.5612 to 6.5
* 6.5.3233 to 6.5

To avoid this issue, roll back one gateway at a time between primary and HA gateways. If you experience a configuration failure, roll back the gateway for which the configuration failed again. 

6.6.5612 (05/12/2022) 
=======================

**Important Notices in Aviatrix Release 6.6.5612** 

- **AVX-20579** - In order for release 6.7 to roll back to 6.6 correctly, the Controller and gateways must be running official **6.6.5612** or a release after **6.6.5612** before moving to 6.7. 
- **AVX-22443** - For a rollback from 6.7 to **6.6.5612** to run successfully, upgrade from **6.6.5404** or **6.6.5545** to **6.6.5612** before upgrading to 6.7. 

**Issues Corrected in Aviatrix Release 6.6.5612** 

- **AVI-2022-0002** - A vulnerability was discovered which could allow an unauthenticated attacker to run arbitrary commands against Aviatrix gateways. This is not known to be exploited. 
- **AVX-10577** - Licensing metrics were not visible. 
- **AVX-20408** - Added an extra check to prevent an exception that can occur while adding a VPC object. The exception caused the VPC to unexpectedly become unavailable from a Spoke Gateway. 
- **AVX-20485** - When you added a Site2Cloud Connection with HA that had Local/Remote Tunnel IP (Primary) settings, but the connection was missing Local/Remote Tunnel IP (Backup), the configuration failed with an error.  
- **AVX-20978** - Only one active profile rsyslog config showed up in gateways, even when the gateway had multiple profiles.  
- **AVX-21238** - High Performance Encryption (HPE) Gateways with many HPE peerings that have transit segmentation enabled encountered an Out of Memory (OOM) issue. The gateway failed to recover even after a reboot. 
- **AVX-21332** - You can now use â€œinsert_stateful_firewall_rulesâ€ API command to insert stateful firewall rules, even when the table is empty. 
- **AVX-22040** - Exception seen when disconnecting a firewall domain from an Aviatrix Edge domain on an AWS Transit Gateway. 
- **AVX-22396** - Due to a VPC ID exception, upgrading an OCI Transit FireNet Gateway failed if the gateway had an associated firewall and an HAGW (High Availability Gateway). 

**Known Issues in Release 6.6.5612** 

- **AVX-22630** - If you are running an older Controller image, you may experience an error (*pymongo.errors.OperationFailure: exception: invalid operator '$filter'*) while trying to view the transit tunnel status. A workaround for this issue is to migrate to the latest Controller image. 
- **AVX-22976** - When you roll back a non-AWS primary and HA gateway together in any of the following patterns, one of the rollbacks fails:  

* 6.6.5612 to 6.6. 
* 6.6.5612 to 6.5. 

To avoid this issue, roll back one gateway at a time between primary and HA gateways.   
If you experience a configuration failure, roll back the config_fail gateway again. 

- **AVX-23006** - When you create a regular gateway immediately after creating a Public Subnet Filtering (PSF) gateway with GuardDuty enabled, a RACE occurs. The RACE can accidentally block the newly created gateway, which is front ended by this PSF gateway. Please wait for the PSF Gateway to finish creation before creating the regular gateway. 

**Feature Upgrade Notice**

- **AVX-22884** - The Standalone CloudN workflow is not supported for releases later than 6.5. A Standalone CloudN upgrade from Release 6.5 to 6.6 or from Release 6.6 to 6.7 is not supported.

You should plan to migrate your Standalone CloudN deployment to Managed CloudN. To migrate to Managed CloudN, see `this document <https://docs.aviatrix.com/HowTos/CloudN_workflow.html#migrating-a-standalone-cloudn-to-a-managed-cloudn>`_.

**Note**: From Release 6.6.5404 onwards, registering CloudN with the Controller does not require the CloudN and the Controller to be the same version. You can register CloudN version 6.6 with Controller version 6.7.

6.7.1186 (05/11/2022) 
=======================

**Issues Corrected in Aviatrix Release 6.7.1186** 

- **AVX-22903** - After a new controller is launched for the first time, there are no routes from the Transit Gateway to the Spoke Gateway. 

6.7.1185 (05/09/2022) 
=======================

**Important Notice in Release 6.7.1185**

* **AVX-37948** - (CoPilot users) The system metric Memory Free (memory_free) used in CoPilot for configuring alerts had been using a definition that was inconsistent with the operating system (OS) definition. Starting in 6.7.1185 the metrics memory_available and memory_free are consistent with the OS definition.

  Due to this change, after upgrading your Controller, you may receive many Memory Free alerts indicating the memory free dropped. To mitigate this issue, you can change your alert configurations from using mem_free to using memory_available instead.

**New Features in Aviatrix Release 6.7.1185** 

* **Deploy CoPilot from your controller UI (AWS cloud only)** — If you deployed Aviatrix Controller in AWS, you now have the option to deploy Aviatrix CoPilot directly from your controller UI. This eliminates the need to go to the AWS marketplace and simplifies a few steps for provisioning the CoPilot instance. When deploying this way, the controller deploys CoPilot in the same region/availability zone where it is homed. For instructions, see "CoPilot instance launch using Controller UI (AWS Only)" in the Aviatrix CoPilot documentation.

.. note::

  If you want to deploy CoPilot in a different AWS region/availability zone than where your controller is homed or in a different cloud, follow the instructions in "CoPilot instance launch from cloud provider marketplace" to deploy CoPilot.

* **Aviatrix Secure Edge** - Aviatrix Secure Edge has a virtual from factor that lets you deploy an Edge Gateway as a standard virtual machine (VM). It is designed to enable enterprises migrating to the cloud to integrate their on-premises footprint as spokes into the enterprise cloud backbone. For more information about Secure Edge, refer to `Secure Edge FAQ <http://docs.aviatrix.com/HowTos/secure_edge_faq.html>`_. 
* **Deploy CoPilot from your controller UI (AWS cloud only)** - If you deployed Aviatrix Controller in AWS, you now have the option to deploy Aviatrix CoPilot directly from your controller UI. This eliminates the need to go to the AWS marketplace and simplifies a few steps for provisioning the CoPilot instance. When deploying this way, the controller deploys CoPilot in the same region/availability zone where it is homed. For instructions, see the discussion about launching a CoPilot instance from the Controller UI in Aviatrix CoPilot Deployment Guide. 

  Note: If you want to deploy CoPilot in a different AWS region/availability zone than where your controller is homed or in a different cloud, please deploy CoPilot manually from the CSP marketplace.

**Enhanced Features in Aviatrix Release 6.7.1185** 

* **Transit Peering over Public Network** - Aviatrix Transit Gateway peering over public network now supports Transit Gateway peering over the internet using Insane Mode High-Performance Encryption (HPE) between GCP and Azure, AWS, OCI. `<http://docs.aviatrix.com/HowTos/transit_gateway_peering.html#peering-over-public-network>`_. 
* **Subnet-Level Inspection in Azure** - Subnet-Level inspection in Azure is enhanced to optimize intra-VNet traffic behavior. With this optimization, traffic between VMs in the same subnet and intra-VNet traffic between VMs in different subnets and the same subnet group is routed through the Azure native Virtual Network instead of the Aviatrix Spoke Gateway. If traffic inspection is desired between subnets in a VNet, the subnets must be in different subnet groups. For more information, refer to Using Subnet Inspection in Azure to Redirect Subnet-Level Traffic to `Aviatrix Transit FireNet and NGFW <http://docs.aviatrix.com/HowTos/transit_subnet_inspection_azure.html>`_. 

**UI enhancements in Aviatrix Release 6.7.1185** 

- Added support for CoPilot deployment. 

**Terminology Changes in Aviatrix Release 6.7.1185** 

- Renamed "Security Domains" to "Network Domain" 

In releases prior to Controller 6.7, the term security domain was used to refer to the segments you define for Aviatrix network segmentation. Security domain is renamed network domain in the controller UI and documentation. 

- Renamed "Peering Menu" to "Native Peering"

**Known Issues in Aviatrix Release 6.7.1185** 

- **AVI-2022-0002** - A vulnerability was discovered which could allow an unauthenticated attacker to run arbitrary commands against Aviatrix gateways. This is not known to be exploited. 
- **AVX-22184** - When an Edge Gateway expires, its state is listed as â€œwaitingâ€ on the Upgrade page. This â€œwaitingâ€ Gateway prevents the Controller from successfully upgrading. The actual state of the edge is â€œExpired,â€ which is shown in the CloudN > List. 
 
   If an Edge Gateway is expired in your Controller, navigate to CloudN > List on the left sidebar. On the Registered Devices page, select the Edge Gateway with the state â€œwaiting,â€ click the Diag dropdown menu, and select Reset Configuration. Then, your Controller can successfully upgrade.
- **AVX-22810** - After a successful platform upgrade, the gateway status indicates the operation is complete before the operation actually completes.
- **AVX-22851** - During a rare telemetry related timing issue, gateway deletion and creation operations may experience exceptions that send the admin an exception email. This was caused by the software attempting to access a gateway object that does not exist.

  **Workaround**: If the newly created gateway does not come up because of this issue, the workaround is to upgrade the gateway image.

- **AVX-35490** - After a Controller software upgrade or a CloudXD restart, the Controller migrates BGP routes, automatically triggering an “Approve New Routes” email for existing pending CIDRs on gateways with learned CIDRs approval enabled. This issue has no functional impact. Approved CIDRs remain intact and no routes are changed.

**Issues Corrected in Aviatrix Release 6.7.1185** 

- **AVI-2022-0002** - A vulnerability was discovered which could allow an unauthenticated attacker to run arbitrary commands against Aviatrix gateways. This is not known to be exploited. 
- **AVX-10577** - Licensing metrics were not visible. 
- **AVX-16122** - The Packet Logging toggle switch on the Stateful Firewall > Policy tab page was not working. 
- **AVX-17174** - Controller traceroute utility not showing first-hop when HPE is enabled between Spoke and Transit. 
- **AVX-18291** - Failed daily and manual controller backups due to a rare corner case condition. 
- **AVX-18700** - When the Stateful firewall rules reach above 500 rows of rules during add/insert/delete the firewall rule, it will throw error as â€œCommand to execute is too long.â€ 
- **AVX-18796** - The Controller to Gateway control channel uses certificate-based authentication. The Intermediate Certificate Authority (ICA) certificate TTL is set to renew automatically every 6 months. A week before the TTL expiration, the ICA will prepare the next certificate as part of the rotation. During this period, if any Gateway gets re-certified, the Controller will use the newly prepared/activated ICA certificate to sign it. If the Gateway flaps and reconnects during this period, the controller will reject these connections resulting in the Gateway being marked down. Since this issue can result in the controller marking gateways down, Aviatrix strongly recommends upgrading your software to a version that includes the issue correction. 

  Note that after this fix, the certificate's validity changes from 60 days to 30 days. The rotation frequency also changes from 30 days to 15 days. 

- **AVX-18876** - For BGP connections associated with the domain, "seen" routes learned from this connection got re-advertised back to the same connection when these BGP routes are in the best DB. 
- **AVX-19811** - You can now insert a stateful firewall policy by specifying the position where you want to insert the policy. This feature is presently available through â€œInsert Stateful Firewall Rulesâ€ API using â€œpositionâ€ param. The â€œpositionâ€ param is 1 indexed. 
- **AVX-20022** - You can now configure the gateway interfaces to enable or disable generic receive offload (GRO) and generic segmentation offload (GSO). 
- **AVX-20173** - Incorrect gateways configured when disabling Transit FireNet on the gateway. 
- **AVX-20271** - Restricted concurrent uploads to make it harder for a remote attacker to fill the disk to defend against a denial-of-service attack. The check was too restrictive and causing concurrent uploads to overwrite each other. We reworked the feature to allow for concurrency without sacrificing the original defense. 
- **AVX-20616** - Supported filtering and pagination of security domain policies. This change makes the Add/Modify Connection Policy feature easier to use, especially in accounts that have a large number of policies. 
- **AVX-20706** - While configuring the Panorama integration for FireNet on the vendor integration page, selecting â€œFW to showâ€ caused an exception. 
- **AVX-20970** - Ignore the default RFC1918 routes check in the unselected route tables when you attach a Spoke Gateway with the selective route tables. 
- **AVX-21215** - Changed the terms â€œRBAC Groupâ€ and â€œPermission Groupâ€œ to â€œPermission Groupâ€œ on the â€œAccount Userâ€ page to avoid confusion. 
- **AVX-21332** - You can now use "insert_stateful_firewall_rules" API command to insert stateful firewall rules, even when the table is empty. 
- **AVX-21740** - Terraform error prevented an interface from being specified for SNAT and DNAT policies when using policy-based connections. 
- **AVX-22040** - Exception seen when disconnecting a firewall domain from Aviatrix edge domain on an AWS Transit Gateway. 
- **AVX-22443** - In order for 6.7 to rollback back to 6.6 correctly, upgrade controllers to any 6.6 release after 6.6.5545 before upgrading to 6.7.
- **AVX-22808** - Insert_stateful_firewall_rules now inserts the rule in a correct order both in the control plane and the IP tables when it is done using the reference rule.
- **AVX-22847** - The gateway is stuck in an upgrade "initializing" state and needs ways to recover effectively during scaling.

**Private Preview Features in Release 6.7.1185**

The following `Private Preview Features`_ are available in this release:

- **Micro-segmentation** - Micro-segmentation provides granular network security policy enforcement for distributed applications in the cloud. It enables a unified network access policy model for your applications with distributed points of policy enforcement throughout your network. For information about micro-segmentation, see `Secure Networking with Micro-Segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_ in the Aviatrix product documentation.
- **Web Application Firewall** - The Aviatrix Web Application Firewall (WAF) feature detects and blocks malicious traffic before it reaches your controller. Enabling the Aviatrix WAF helps protect your applications from malicious activity by filtering the HTTP and HTTPS traffic. The WAF is enabled by with a button on the WAF tab in the Aviatrix Controller settings.

**Important Notices in Release 6.7.1185**

(CoPilot users) The system metric *Memory Free* (memory_free) used in CoPilot for configuring alerts had been using a definition that was inconsistent with the operating system (OS) definition. Starting 6.7 the metrics memory_available and memory_free are consistent with the OS definition.

6.4.3049 (04/08/2022) 
=======================

**Issues Corrected in Aviatrix Release 6.4.3049**

- **AVX-16838** - A newly created Controller failed to get its public IP, causing some gateways to fail to start. 
- **AVX-18878** - Sessions may be prevented from getting immediately logged out after certain API calls. 
- **AVX-19811** - You can now insert a stateful firewall policy by specifying the position where you want to insert the policy. This feature is presently available through "Insert Stateful Firewall Rulesâ€ API using "positionâ€ param. The "positionâ€ param is 1 indexed. 
- **AVX-20064** - Enabled users to insert a Force Drop rule on the top of the list of Stateful Firewall rules without changing the order of the rules in the table. 
- **AVX-20159** - When a user does an image upgrade/rollback on multiple gateways simultaneously, it could hit an exception in race condition, causing some gateway upgrade/rollback failures. These failures could cause the FireNet Gateway to not function properly after the upgrade/rollback. 
- **AVX-20271** - Restricted concurrent uploads to make it harder for a remote attacker to fill the disk to defend against a denial-of-service attack. The check was too restrictive and causing concurrent uploads to overwrite each other. We reworked the feature to allow for concurrency without sacrificing the original defense. 
- **AVI-2022-0004** - Fixed an internally-reported vulnerability that would allow an authenticated user to gain command line privileges on the controller. This is not known to be exploited. 

6.5.3166 (04/06/2022) 
=======================

**Enhanced Features in Release 6.5.3166**

- **AVX-15117** - Large (4G+) tracelog uploads consumed excessive CPU, which caused gateway flapping. Optimized performance for launching gateways, viewing tunnel status, and uploading trace logs in large deployments. 
- **AVX-16906** - Extended support for AES-256-GCM encryption for Site2Cloud IPsec tunnels. 
- **AVX-20064** - Enabled users to insert a Force Drop rule on the top of the list of Stateful Firewall rules without changing the order of the rules in the table. 

**UI Enhancements in Release 6.5.3166**

- **AVX-19672** - Added an error message when adding a new Site2Cloud connection to warn users that AES-256-GCM encryption algorithms are not supported on older gateway images. 

**Issues Corrected in Aviatrix Release 6.5.3166**

- **AVX-16122** - The Packet Logging toggle switch on the Stateful Firewall > Policy tab page was not working.
- **AVX-16838** - A newly created Controller failed to get its public IP, causing some gateways to fail to start. 
- **AVX-17650** - CloudN custom upgrade dry run GUI hanging at 99%, but commands.log showing succeeded. 
- **AVX-18796** - The Controller to Gateway control channel uses certificate-based authentication. The Intermediate Certificate Authority (ICA) certificate TTL is set to renew automatically every 6 months. A week before the TTL expiration, the ICA will prepare the next certificate as part of the rotation. During this period, if any Gateway gets re-certified, the Controller will use the newly prepared/activated ICA certificate to sign it. If the Gateway flaps and reconnects during this period, the controller will reject these connections resulting in the Gateway being marked down. Since this issue can result in the controller marking gateways down, Aviatrix strongly recommends upgrading your software to a version that includes the issue correction. 

 Note that after this fix, the certificate's validity changes from 60 days to 30 days. The rotation frequency also changes from 30 days to 15 days. 

- **AVX-18878** - Sessions may be prevented from getting immediately logged out after certain API calls. 
- **AVX-20159** - When a user does an image upgrade/rollback on multiple gateways simultaneously, it could hit an exception in race condition, causing some gateway upgrade/rollback failures. These failures could cause the FireNet Gateway to not function properly after the upgrade/rollback. 
- **AVI-2022-0004** - Fixed an internally-reported vulnerability which would allow an authenticated user to gain command line privileges on the controller. This is not known to be exploited. 
- **AVX-20970** - Ignore the default RFC1918 routes check in the unselected route tables when you attach a Spoke Gateway with the selective route tables. 

6.6.5545 (03/31/2022)
=======================

**New Features in Release 6.6.5545**

- **AVX-14021** - The Aviatrix Controller now supports OCI Gov Cloud accounts. To onboard these accounts, find the Aviatrix image in the OCI Gov Marketplace and subscribe. Then, open the Onboarding page in your Aviatrix Controller and use the `Oracle Onboarding Guide <https://docs.aviatrix.com/HowTos/oracle-aviatrix-cloud-controller-onboard.html>`_ to begin onboarding.

**Enhanced Features in Release 6.6.5545**

- **AVX-14100** - Added support for c2-standard-60 instance type for Aviatrix Insane Mode on GCP. For Insane Mode on GCP performance throughput, refer to `GCP Performance Test Results <https://docs.aviatrix.com/HowTos/insane_mode_perf.html?highlight=gcp%20performance%20test%20results#gcp-performance-test-results>`_.
- **AVX-15117** - Large (4G+) tracelog uploads consumed excessive CPU, which caused gateway flapping. 
- **AVX-20423** - Optimized performance for launching gateways, viewing tunnel status, and uploading trace logs in large deployments. 
- **AVX-17030** - In a Site2Cloud connection, the same IP address in the remote gateway peer and the remote subnet is now supported. This is useful when configuring a Site2Cloud connection to a third-party environment where only one public IP address is exposed. For more information, refer to the `Site2Cloud FAQs <https://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_.
- **AVX-19161** - Added New Site2Cloud RX Balancing option to the Multi-Cloud Transit > Advanced Config > Edit Transit page. Enabling this option can increase forwarding throughput on Aviatrix Transit Gateways for BGP-over-GRE External Device traffic (a.k.a. Site2Cloud or S2C GRE tunnels), in these situations:

* On certain topologies that require high throughput, with External Devices that limit the number of GRE tunnels.
* Where maintaining a high number of GRE tunnels increases operational burden.

Note: This option is only available for Aviatrix Transit Gateways deployed in AWS on C5 and C5n instance types (except for c5.large and c5n.large).

- **AVX-20200** - Clarified a confusing error message in an automated exception email that had little context: "AttributeError: 'NoneType' object has no attribute 'resource_guid'â€.
- **AVX-20022** - You can now configure the gateway interfaces to enable or disable generic receive offload (GRO) and generic segmentation offload (GSO).
- **AVX-20383** - Added support for updating the secondary CIDRs in firewall-related VPC route tables for Azure FireNet gateways. The secondary CIDRs are usually added by user OOB (Out of Band) in a CSP. Then, an API needs to be called to manually update the changed CIDR set normally to the gateway route tables. However, for an Azure cloud case, the firewall-related VPC route tables also need to be updated. This product enhancement ensures that update. The API involved is "update_encrypted_spoke_vpc_cidrsâ€.

**UI Enhancements in Release 6.6.5545**

- **AVX-15459** - Replaced â€˜vpc_id with "OCID" for OCI Gateways to make sure these values are unique. Now, every OCI vpc_id value has been migrated from vpc_name to OCID. For example, "vpc-oracle-testâ€ is migrated to "ocid1.vcn.oc1.iad.aaaaaaaaba3pv6wkcr4jqae5f44n2b2m2yt2j6rx32uzr4h25vqstifsfdsq.â€  The Controller UI will display <vpc_id>~~<vpc_name> in the VPC ID field for better readability: for example, "ocid1.vcn.oc1.iad.aaaaaaaaba3pv6wkcr4jqae5f44n2b2m2yt2j6rx32uzr4h25vqstifsfdsq~~vpc-oracle-test.â€
- **AVX-18941** - Removed the Site2Cloud Standalone CloudN feature to improve routing functionality for Controllers upgraded to release 6.6 or above. Customers running Standalone CloudN in earlier releases (6.4 or below) can upgrade existing CloudN hardware or plan for an upgrade to Aviatrix Edge.
- **AVX-20616** - Supported filtering and pagination of security domain policies. This change makes the Add/Modify Connection Policy feature easier to use, especially in accounts that have large number of policies.

**Known Issues in Release 6.6.5545**

- **AVX-20656** - If you have AWS CloudWatch enabled in your deployment, disable it before upgrading from 6.5 to any 6.6 release.
   If you upgrade while AWS CloudWatch is still enabled, the system will enter a config fail state and the network will go down. You can return the system to sane condition by using Disable/Enable CloudWatch.
- **AVX-20978** - Only one active profile rsyslog config shows up in gateways, even when the gateway has multiple profiles. A workaround for this issue is to remove the entire Syslog profile index and then add them back using Terraform. Then, the rsyslog configs appears in all gateways.

**Issues Corrected in Aviatrix Release 6.6.5545**

- **AVX-14253** - An Azure Transit Gateway took excessive time to advertise a newly attached Spoke Gateway's CIDRs over BGP.
- **AVX-16122** - After successfully enabling packet logging for either allow all or deny all base policy for stateful firewalls, packet logging was automatically removed.
- **AVX-16838** - A newly created Controller failed to get its public IP, causing some gateways to fail to start.
- **AVX-17058** - The S2C EIPs of Single IP HA gateways were leaked on gateway deletion after stopping/starting the gateway.
- **AVX-19498** - When using S2C Single IP HA, the gateway EIP was not released after the gateway deletion.
- **AVX-19811** - You can now insert a stateful firewall policy by specifying the position where they want to insert the policy. This feature is presently available through "Insert Stateful Firewall Rulesâ€ API using "positionâ€ param. The "positionâ€ param is 1 indexed.
- **AVX-20064** - Enabled users to insert a Force Drop rule on the top of the list of Stateful Firewall rules without changing the order of the rules in the table.
- **AVX-20109** - Some gateway software upgrades failed with an "Archive is too shortâ€ message, but a software upgrade succeeded after retrying.
- **AVX-20159** - When a user does an image upgrade/rollback on multiple gateways simultaneously, it could hit an exception in race condition, causing some gateway upgrade/rollback failures. These failures could cause the FireNet Gateway to not function properly after the upgrade/rollback.
- **AVX-20173** - Incorrect gateways configured when disabling Transit FireNet on the gateway.
- **AVI-2022-0004** - Fixed an internally-reported vulnerability which would allow an authenticated user to gain command line privileges on the Controller. This is not known to be exploited.
- **AVX-20271** - Improved the cleanup of concurrent uploads that temporary files created by concurrent route updates. This fix prevents the overwrite of the temporary update files.
- **AVX-20471** - When both Transit Gateways of a transit peering didn't have an AS number configured, CIDRs from static connection at one Transit Gateway would not be propagated to the peering Transit Gateway.
- **AVX-20647** - Performance fix for route processing in multi-domain environment.
- **AVX-20765** - If you had a TGW Firewall domain that enabled egress inspection, but this firewall's domain was not connected to the Aviatrix Edge Domain, this setup enabled management access from the Aviatrix Edge domain. This issue caused the default route 0.0.0.0/0 to be incorrectly propagated to the Transit Gateway in the Aviatrix Edge domain.
- **AVX-20970** - Ignore the default RFC1918 routes check in the unselected route tables when you attach a Spoke Gateway with the selective route tables.

6.6.5413 (03/18/2022)  
====================== 

**Issues Corrected in Release 6.6.5413** 

- **AVX-20271** - Restricted concurrent uploads to make it harder for a remote attacker to fill the disk and better defend against denial of service attacks. Overly restrictive checks allowed concurrent uploads to overwrite each other. This update allows for concurrency without sacrificing the original defensive goals.

- **AVX-20502** - Controller upgrade from 6.5 to 6.6 causes BGP to go down on Aviatrix Transit Firenet. The issue occurs when the following conditions are met:

#. The AWS Transit FireNet is enabled.
#. The Transit FireNet gateway is attached to the AWS Transit Gateway as an edge gateway.
#. The AWS Transit Gateway is added to the Transit FireNet inspection list.

6.5.3012 (03/17/2022)
===================================

**Issues Corrected in Aviatrix Release 6.5.3012**

- **AVX-18796** - The Controller to Gateway control channel uses certificate-based authentication. The Intermediate Certificate Authority (ICA) certificate TTL is set to renew automatically every 6 months. A week before the TTL expiration, the ICA will prepare the next certificate as part of the rotation. During this period, if any Gateway gets re-certified, the Controller will use the newly prepared/activated ICA certificate to sign it. If the Gateway flaps and reconnects during this period, the controller will reject these connections resulting in the Gateway being marked down. Since this issue can result in the controller marking gateways down, Aviatrix strongly recommends upgrading your software to a version that includes the issue correction.

Note that after this fix, the certificate's validity changes from 60 days to 30 days. The rotation frequency also changes from 30 days to 15 days.

- **AVX-20109** - Upgrade procedure update. If you are upgrading your controller and gateways from 6.5 to 6.6, you cannot use the selective gateways feature.

#. From the Aviatrix Controller, go to Settings > Maintenance > Selective upgrade and perform a Platform Upgrade to 6.6 with all gateways selected. For more information, see `Upgrading the Aviatrix Cloud Network Platform <https://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.
#. If you see an "Archive is too shortâ€ message of any given gateway during the platform upgrade, you need to perform step 3. Otherwise, you can skip step 3.
#. After the Upgrade is done, go to Settings > Maintenance > Selective upgrade and select the gateways listed in the "Archive is too short" message. Perform the gateway software upgrade again.

**Known Issues in Aviatrix Release 6.5.3012**

- **AVX-20201** - Controller sends false alert email about CloudN after upgrading or rebooting Managed CloudN configurations. You can ignore this false alert email.

6.4.3015 (03/17/2022)  
=====================================

**Issues Corrected in Aviatrix Release 6.4.3015**

- **AVX-18796** - The Controller to Gateway control channel uses certificate based authentication. The Intermediate Certificate Authority (ICA) certificate TTL is set to renew automatically every 6 months. A week before the TTL expiration, the ICA will prepare the next certificate as part of the rotation. During this period if any Gateway gets re-certified, the Controller will use the newly prepared/activated ICA certificate to sign it. If the Gateway flaps and reconnects during this period, the controller will reject these connections resulting in the Gateway being marked down. Since this issue can result in the controller marking gateways down, Aviatrix strongly recommends upgrading your software to a version that includes the issue correction.
- **AVX-20109** - Upgrade procedure update. If you are upgrading your controller and gateways from 6.5 to 6.6, you cannot use the selective gateways feature.

#. From the Aviatrix Controller, go to Settings > Maintenance > Selective upgrade and perform a Platform Upgrade to 6.6 with all gateways selected. For more information, see `Upgrading the Aviatrix Cloud Network Platform <https://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.
#. If you see an "Archive is too short" message of any given gateway during the platform upgrade, you need to perform step 3. Otherwise, you can skip step 3.
#. After the Upgrade is done, go to Settings > Maintenance > Selective upgrade and select the gateways listed in the "Archive is too short" message. Perform the gateway software upgrade again.

**Known Issues in Aviatrix Release 6.4.3015**

- **AVX-20201** - Controller sends false alert email about CloudN after upgrading or rebooting Managed CloudN configurations. You can ignore this false alert email.

6.6.5409 (03/13/2022)  
====================== 

**Issues Corrected in Release 6.6.5409** 

- **AVX-18796** - The Controller to Gateway control channel uses certificate based authentication. The Intermediate Certificate Authority (ICA) certificate TTL is set to renew automatically every 6 months. A week before the TTL expiration, the ICA will prepare the next certificate as part of the rotation. During this period if any Gateway gets re-certified, the Controller will use the newly prepared/activated ICA certificate to sign it. If the Gateway flaps and reconnects during this period, the controller will reject these connections resulting in the Gateway being marked down. Since this issue can result in the controller marking gateways down, Aviatrix strongly recommends upgrading your software to a version that includes the issue correction.
- **AVX-20109** - Upgrade procedure update. If you are upgrading your controller and gateways from 6.5 to 6.6, you cannot use the selective gateways feature.

#. From the Aviatrix Controller, go to Settings > Maintenance > Selective upgrade and perform a Platform Upgrade to 6.6 with all gateways selected. For more information, see `Upgrading the Aviatrix Cloud Network Platform <https://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.
#. If you see an "Archive is too short" message of any given gateway during the platform upgrade, you need to perform step 3. Otherwise, you can skip step 3.
#. After the Upgrade is done, go to Settings > Maintenance > Selective upgrade and select the gateways listed in the "Archive is too short" message. Perform the gateway software upgrade again.
.
**Known Issues in Aviatrix Release 6.6.5409**

- **AVX-20201** - Controller sends false alert email about CloudN after upgrading or rebooting Managed CloudN configurations. You can ignore this false alert email.
- **AVX-20502** - Controller upgrade from 6.5 to 6.6 causes BGP to go down on Aviatrix Transit FireNet. The issue occurs when the following conditions are met:
#. The AWS transit FireNet is enabled.
#. The Transit FireNet gateway is attached to the AWS Transit Gateway as an edge gateway.
#. The AWS Transit Gateway is added to the Transit FireNet inspection list.

6.6.5404 (02/28/2022)  
====================== 

**Enhanced Features in Release 6.6.5404**

- Added support for gateway rollback from 6.6.a to versions 6.6 and 6.5. 
- Added new option for users to select between preemptive or non-preemptive failover behavior for Active/Standby deployments for S2C connections. 
- Added support for BGP on Spoke route propagation control to Transit. 
- Added support for BGP MD5 authentication. 

**Public Preview Features in Release 6.6.5404**

The following `Public Preview Features`_ are available in this release:

- Azure Subnet-Level Inspection enables inspection by Aviatrix Transit FireNet solution for traffic flowing between subnets within a VNet or in different VNets. For more information, refer to `Using Subnet Inspection in Azure to Redirect Subnet-Level Traffic to Aviatrix Transit FireNet and NGFW <https://docs.aviatrix.com/HowTos/transit_subnet_inspection_azure.html>`_. 

**UI Enhancements in Release 6.6.5404**

- Improved the sub-menu BGP located under Transit FireNet on the left sidebar in the Aviatrix Controller.

**Known Issues in Release 6.6.5404**

- **AVX-10002** - Firewall's URL inspection rules are dropping packets with controller(or spire).aviatrixnetwork.com and showing failed registration.
- **AVX-16838** - Release server API showing an error during IP update.
- **AVX-17650** - CloudN custom upgrade dry run GUI hanging at 99%, but commands.log showing succeeded.
- **AVX-20502** - Controller upgrade from 6.5 to 6.6 causes BGP to go down on Aviatrix Transit FireNet. The issue occurs when the following conditions are met:
#. The AWS Transit FireNet is enabled.
#. The Transit FireNet Gateway is attached to the AWS Transit Gateway as an edge gateway.
#. The AWS Transit Gateway is added to the Transit FireNet inspection list.
- **AVX-20978** - Only one active profile rsyslog config shows up in gateways, even when the gateway has multiple profiles. A workaround for this issue is to remove the entire Syslog profile index and then add them back using Terraform. Then, the rsyslog configs appears in all gateways.

**Issues Corrected in Release 6.6.5404** 

- **AVX-18803** - Unable to detach external device connection from Transit due to Exception Error.
- **AVX-18845** - Exception is seen while "adding/deleting" routes on Stand-Alone CloudN.
- **AVX-18876** - For BGP connections associated with domain, seen routes learned got re-advertised back to same connection when these BGP routes are in BestDB.
- **AVX-18878** - Sessions may be prevented from getting immediately logged out after certain API calls in the RNE. 

6.6.5230 (02/09/2022)  
====================== 

**Issues Corrected in Release 6.6.5230**  

- **AVX-14504** - Terraform relies on the API get_instance_by_id / CLI "firewall_instance get instance --instance_id <ID>" to refresh the state of the aviatrix_firewall_instance resource. However, in some Azure FireNet deployments the API returns the incorrect value for the attached Transit Gateway. 
- **AVX-18700** - When the stateful firewall rules configured on a gateway reaches a limit of 500 and above, while performing "Add/Delete/Insert" operations the following error may be encountered - "Command to execute too long".


**Known Issues in Release 6.6.5230** 

- **AVX-20502** - Controller upgrade from 6.5 to 6.6 causes BGP to go down on Aviatrix Transit FireNet. The issue occurs when the following conditions are met:
#. The AWS Transit FireNet is enabled.
#. The Transit FireNet Gateway is attached to the AWS Transit Gateway as an edge gateway.
#. The AWS Transit Gateway is added to the Transit FireNet inspection list.


6.5.3006 (02/09/2022)  
====================== 

**Issues Corrected in Release 6.5.3006** 

- **AVX-14504** - Terraform relies on the API get_instance_by_id / CLI "firewall_instance get instance --instance_id <ID>" to refresh the state of the aviatrix_firewall_instance resource. However, in some Azure FireNet deployments the API returns the incorrect value for the attached Transit Gateway. 
- **AVX-17620** - Improved stateful firewall duplicate rule checks if duplicate rules are already present in the system. 
- **AVX-17332** - While onboarding a Google account either through UI or Terraform, subsequent onboarding attempts with incorrect Google Project ID will display an error.
- **AVX-18148** - Excessive load on cloudxd induced due to rsyslog monitoring certain user visible changes.Excessive email alerts generated about rsyslog while trying to reduce rsyslog monitoring load on core processes.
- **AVX-18291** - Daily controller backup failing with traceback on command 'tar' returning non-zero exit status. 
- **AVX-18700** - When the stateful firewall rules configured on a gateway reaches a limit of 500 and above, while performing "Add/Delete/Insert" operations the following error may be encountered - "Command to execute too long". 

6.4.3008 (02/09/2022)  
===================== 

**Issues Corrected in Release 6.4.3008** 

- **AVX-17620** - Improved stateful firewall duplicate rule checks if duplicate rules are already present in the system. 

6.6.5224 (01/23/2022) 
=====================

**Enhanced Features in Release 6.6.5224**

- Added support for Aviatrix Spoke Gateway to External Device (BGP-Enabled Spoke). Introduced in Aviatrix release 6.6, you can now create Spoke Gateways that are BGP-enabled and NAT-enabled. Aviatrix Cloud Network Platform has always supported NAT in a way that most enterprises need in order to meet their business and technical requirements. Using BGP-enabled and NAT-enabled Spoke Gateways gives you yet more capabilities to implement policy based SNAT/DNAT functions in strategic places in your network architecture. For more information, see the discussion about `Aviatrix Spoke Gateway to External Device <https://docs.aviatrix.com/HowTos/spokegw_external.html>`_. 
- Added support for Google Cloud Platform (GCP) BGP over LAN to support multi peer instance. This allows Aviatrix Transit Gateways to communicate with a pair of instances in the same VPC in GCP without running any tunnelling protocol such as IPSec or GRE. For more information, see the discussion about `GCP Multi-cloud Transit BGP over LAN Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_gcp_workflow.html>`_. 
- Added support for AWS TGW Connect over Direct Connect. Amazon Web Services (AWS) enables AWS customers to integrate their Software Defined Wide Area Network (SD-WAN) devices with AWS Transit Gateway and AWS Direct Connect so they can use their existing SD-WAN devices to connect their on-premises networks to an AWS Transit Gateway. In support of this, Aviatrix enables you to create one or multiple Transit Gateway Connect attachments over Direct Connect. You can also create Transit Gateway Connect peer attachments. For instructions, see the topic `Enable AWS TGW connect over Direct Connect <https://docs.aviatrix.com/HowTos/tgwconnect.html>`_. 
- Added support for Aviatrix Controller Security Assertion Markup Language (SAML) based authentication user VPN access in Azure. For instructions, see the topic `Azure SAML Authorization VPN Access <https://docs.aviatrix.com/HowTos/azure_saml_auth_vpn_access.html>`_. 
- Added support for FireNet with PAN in AWS China. 
- Added support for Checkpoint integration with private SSH keys. 

**UI Enhancements in Release 6.6.5224**

- Improved FireNet and Multi-Cloud Transit workflows reducing clicks and navigation steps.
- Decommissioning and Renaming of CLOUDWAN to CLOUDN.
- Notification bar includes message history.
- Guided "What's New" information for first Aviatrix Controller user login.
- Launch CoPilot from the Aviatrix Controller App Drawer.
- Enable daily backup added to notification menu.
- Use consistent naming in action menu and config box for the list view of Transit Gateway.

**Changed Behaviors in Release 6.6.5224**

- The 6.6 release introduces a behavior change in the Multi-Cloud Transit Active-Standby Site2Cloud behavior, if the setting is enabled. After a failover, when the primary gateway is back up, the traffic is switched over automatically back to the primary Site2Cloud connection. This brings more predictability and fits into the model of most on-prem firewalls. In 6.6, this behavior cannot be adjusted. If Active-Standby is disabled (which is the default setting), there is no behavior change. If you have questions about this behavior, please contact your Aviatrix account team.
- Before 6.6, when BGP ECMP is enabled, routes from different domain can be combined to form ECMP at gateway. This is incorrect behavior and is fixed in 6.6, such that only BGP routes from the same domain can be combined for ECMP. 
- Aviatrix no longer supports non-ActiveMesh transit network configurations beginning in release 6.6. Aviatrix recommends that if you are running version 6.5 or earlier, you upgrade to version 6.5.1922 or a higher 6.5 version before upgrading to 6.6.

**Upgrade Behaviors and Restrictions in Release 6.5224**

- To upgrade to 6.6, you must manually enter "6.6" in the Aviatrix Controller upgrade window. 
- You cannot rollback to Aviatrix version 6.5 after upgrading to 6.6.

**Known Issues in Release 6.6.5224**

- Cannot add more than 2 remote and 2 local subnet pair tunnels to a Site2Cloud policy based connection with the Aviatrix Controller.

  - Workaround: Use Site2Cloud to delete or add new subnet pair tunnels to a Site2Cloud policy based connection.

- OCI is not yet compatible with the 6.6 release. Until a new image is available, initializing your controller to the latest will fail.

  - Workaround: initialize your controller to 6.5 first and upgrade to 6.6. Controllers already installed with 6.3 or newer should be able to upgrade to 6.6 without issue.

- The controller's database version and schema are changed in 6.6. You might notice that there will be a brief period of error messages in the controller's log while this change is happening. The errors should stop without user intervention after the upgrade is complete. 

**AVX-35490** - After a Controller software upgrade or a CloudXD restart, the Controller migrates BGP routes, automatically triggering an “Approve New Routes” email for existing pending CIDRs on gateways with learned CIDRs approval enabled. This issue has no functional impact. Approved CIDRs remain intact and no routes are changed.

**Issues Corrected in Release 6.6.5224**

- **AVX-14515** - Exception seen when configuring vendor integration with a Palo Alto Firewall VM which has no route tables.
- **AVX-14568** - If there are any GWs that are not reachable by the controller before the Controller HA Migration starts, the control planes of these GWs will be out of sync because there will be an implicit control-plane certificate re-bootstrap as a part of Control HA Migration process. The issue exists before 6.5.2835 (exclusive) and all 6.4 releases. 
- **AVX-14754** - When Controller Security Group Management is enabled and launching a gateway causes controller SG to reach limit, it will show correct error "The maximum number of rules per security group has been reached. 
- **AVX-14822** - Controller Security Group Management will add gateway IP rule to customer attached controller SGs as well as controller created SGs. 
- **AVX-15180** - Allows you to configure default route as destination CIDR in customized SNAT. 
- **AVX-15454** - Deleted dependency of storage account for Azure China gateways. 
- **AVX-15639** - When replacing a gateway using image upgrade the new gateway was missing the Aviatrix-Created-Resource tag. 
- **AVX-15651** - Incorrect existing references to default Aviatrix AWS IAM role names. 
- **AVX-15704** - While creating an IKEv2 enabled site2cloud connection, you will see "Failed to establish a new connection" error.snat 
- **AVX-15978** - The conntrack "allow all" rule should always be placed above the "drop all" rule in the order of operations.
- **AVX-16100** - You can configure DNAT on transit GW, either ActiveMesh or non-ActiveMesh connection. 
- **AVX-16375** - For policy based site2cloud connection, if one of the s2c tunnel is down on a Transit Gateway, traffic from attached spoke, or peering transit, or AWS TGW to the Transit Gateway will be dropped. 
- **AVX-16450** - Addressed issues with CloudN registration in some scenarios. 
- **AVX-16486** - Improved IPSec performance on high latency links. 
- **AVX-16494** - Performance optimization in monitoring IPSec states. 
- **AVX-16496** - When upgrading a standalone CloudN implementation:

  - For CloudN versions < 6.5.2613: Full outbound access on TCP ports 80 and 443 on CloudN Management is required. 
  - For CloudN versions >= 6.5.2613:  Please follow the `Internet Access <https://docs.aviatrix.com/HowTos/CloudN_insane_mode.html#internet-access>`_ instructions. For a list of required FDQNs, please see `Required Access for External Sites <https://aviatrix.zendesk.com/hc/en-us/signin?return_to=https%3A%2F%2Faviatrix.zendesk.com%2Fhc%2Fen-us%2Farticles%2F4417312119437-Aviatrix-Products-Access-to-external-FQDN-required>`_.

- **AVX-17027** - The UI upgrade progress bar getting stuck at 99% during standalone CloudN upgrade. 
- **AVX-17302** - Secondary CIDRs in OCI VCN not advertised to Transit Gateway. 
- **AVX-17420** - If the account is deleted or deactivated from AWS, VPC attachment from AWS TGW is getting deleted. You must manually clean up all blackhole routes (RFC1918 or customized routes) on AWS. 
- **AVX-17432** - For route based, unmapped S2C, when the connection is down, the routes for the remote CIDRs are still associated with the connection, i.e. the routes are not removed. 
- **AVX-17512** - Addressed an issue in NAT programming on Spoke-HA when sync-to-ha is enabled. 
- **AVX-17582** - Closed potential security issue the controller UI console. 
- **AVX-17628** - Closed potential SSH security issue for users upgrading from previous releases. 
- **AVX-17740** - Launching a gateway on a Native GWLB FireNet VPC is incorrectly allowed. Disabling Native GWLB FireNet before detaching the VPC from its TGW (if it was attached to one) was incorrectly allowed.  
- **AVX-17849** - Existing issues in Flightpath for Azure NSG's. 
- **AVX-18047** - Jumbo Frame support on the GRE connection not enabled. 
- **AVX-18148** - Excessive load on cloudxd induced due to rsyslog monitoring certain user visible changes.Excessive email alerts generated about rsyslog while trying to reduce rsyslog monitoring load on core processes. 
- **AVX-18149** - Controller becoming slow or non-responsive when executing large number of certain API requests. 
- **AVX-18164** - The performance of the API to list the security policies of a gateway is not satisfactory. 

6.5.2898 (01/11/2022)
=====================

**Issues Corrected in Aviatrix Release 6.5.2898**
 
- **AVX-9033** - Some logs are too big on CloudN.
- **AVX-14426** - Tunnels take a long time to become established and on occasion can flap even during establishment in IPSEC IKE interoperability.
- **AVX-14659** - Tunnel flaps when attaching Spoke Gateways running IPSec strongSwan to Transit Gateways running IPSec racoon, or Transit Gateways running IPSec strongSwan to Transit Gateways running IPSec racoon.
- **AVX-16967** - When a SNAT rule is added/removed for a gateway, it needs to check if the NAT rule is duplicated in the route tables. The checking is dependent on the NAT routes if load balanced or generic (not load balanced). You must miss the checking for duplicated routes to include the HA gateways in the interface list. It may give a wrong conclusion that some NAT rules were duplicated.
- **AVX-17214** - If any conntrack module related errors are observed in 6.5. (g's build number) and after, AVXERR format can be used for first level debugging. 'AVXERR-CONNTRACK-0001': 'Gateway Error: {}', 'AVXERR-CONNTRACK-0002': 'Required/Invalid option: {}' 'AVXERR-CONNTRACK-0003': 'Not found/File error: {}' 'AVXERR-CONNTRACK-0004': 'Not Supported: {}' 
- **AVX-17349** - Closed vulnerability AVI-2021-0008, allowing an unauthenticated attacker partial access to configuration information on controllers and an unauthenticated network-adjacent attacker API access on gateways. 
- **AVX-17420** - If the account is deleted or deactivated from AWS, VPC attachment from AWS TGW is getting deleted. You must manually clean up all blackhole routes (RFC1918 or customized routes) on AWS.
- **AVX-17628** - Hardened SSH security for legacy users.
- **AVX-17740** - Launching a gateway on a Native GWLB FireNet VPC was incorrectly allowed. Disabling Native GWLB FireNet before detaching the VPC from its TGW (if it was attached to one) was incorrectly allowed.
- **AVX-18149** - Controller becoming slow or non-responsive when executing large number of certain API requests.

**Known Behaviors in Aviatrix Release 6.5.2898**

- If your Controller is running 6.4 and you have ControllerHA enabled, there is a very small chance that your HA recovery might fail if your Controller goes down by any chance. If that happens, you can manually restore the backup on your new Controller. To avoid this, please upgrade to the 6.5 release.
- **AVX-16496** - When upgrading a standalone CloudN implementation:

  - For CloudN versions < 6.5.2613: Full outbound access on TCP ports 80 and 443 on CloudN Management is required. 
  - For CloudN versions >= 6.5.2613: Please follow the instructions at Standalone `CloudN Deployment Checklist <https://docs.aviatrix.com/HowTos/CloudN_insane_mode.html?highlight=StandAlone%20CloudN%20>`_. For a list of required FDQNs, please see `Required Access for External Sites <https://aviatrix.zendesk.com/hc/en-us/signin?return_to=https%3A%2F%2Faviatrix.zendesk.com%2Fhc%2Fen-us%2Farticles%2F4417312119437-Aviatrix-Products-Access-to-external-FQDN-required>`_.

- **AVX-15458** - After Controller and standalone CloudN's are upgraded from 6.3 to 6.4, to access CloudN device in web UI:

  - Use CloudN management IP address inside on-premises network. 
  - Use CloudN LAN IP address from Spoke workplace in the CSP network.

- **AVX-17221** - If you have Managed CloudN, Aviatrix requires you to follow the Managed instructions and allow access to the sites mentioned for the CloudN Managed Port. If your Managed CloudN ends up in a "config_fail" state after your Controller is upgraded, you have the following options:

  Option 1:

  #. Deregister your CloudN. Follow the instructions to allow management port outbound access.
  #. Follow NTP sync instructions at `Managed CloudN Workflows <https://docs.aviatrix.com/HowTos/CloudN_workflow.html#step-2-2-configure-ntp-sync-and-smtp-services>`_.
  #. Register your CloudN.

  Option 2: Open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_.
  
6.4.2995 (01/11/2022) 
=====================

**Issues Corrected in Aviatrix Release 6.4.2995** 

- **AVX-14537** - Error establishing Raccoon native CaaG attachment with larger transit instance size (Ex: c5.4xlarge, Standard_D8_v3) and number of IPSec Tunnels > 32. 
- **AVX-17349** - Closed vulnerability AVI-2021-0008, allowing an unauthenticated attacker partial access to configuration information on controllers and an unauthenticated network-adjacent attacker API access on gateways. 

6.5.2835 (12/10/2021) 
=====================

**Issues Corrected in Aviatrix Release 6.5.2835** 

- **AVX-9033** - The routing logs are not rotated on CloudN and are not included in the trace logs. 
- **AVX-14298** - The following CVEs were addressed in this release: `CVE-2007-2243 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-2243>`_ and `CVE-2004-1653 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-1653>`_. 
- **AVX-14659** - IPSec tunnel flapping between gateways running different flavors of IPSec infra. 
- **AVX-16121** - After a successful image upgrade, the gateway state changes from success to config_fail after about 5 minutes. 
- **AVX-16563** - Security Group Management feature fails on an Aviatrix Controller deployed in GCP after a Controller Migration operation. 
- **AVX-16912** - Cannot create Transit GW with HA in OCI using Terraform scripts. 
- **AVX-16967** - Deleting one or more Customized SNATs generates a "route already exists in route table" error. 
- **AVX-17489** - When deleting one CIDR from the spoke customized advertise CIDR list, the CIDR should only be removed from the Transit Gateway and the rest of the network. However, during deletion the CIDR was removed from the spoke itself, which deletes the routes added for static S2c. 
 
**Known Issues in Aviatrix Release 6.5.2835**

- If your Controller is running 6.4 and you have ControllerHA enabled, there is a very small chance that your HA recovery might fail if your Controller goes down by any chance. If that happens, you can manually restore the backup on your new Controller. To avoid this, please upgrade to the 6.5 release.
- **AVX-16121** - In Aviatrix version 5.x, Logstash Forwarder was replaced by `Filebeat Forwarder <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#filebeat-forwarder>`_ in the supported logging services. If you enabled logstash before this switch, please disable/enable logstash on the Filebeat Forwarder in "Controller/Logging" before upgrading your Aviatrix Controller, otherwise your Gateways might come up in the "config_fail" state after the upgrade. You might need to update your configuration on your collection side to accommodate this change. If you already upgraded and have Gateways in the "config_fail" state, you can do an "Image Upgrade" on the impacted Gateway to resolve the issue. 
- **AVX-17221** - If you have Managed CloudN, Aviatrix requires you to follow the Managed instructions and allow access to the sites mentioned for the CloudN Managed Port. If your Managed CloudN ends up in a "config_fail" state after your Controller is upgraded, you have the following options:

  Option 1:

  #. Deregister your CloudN. Follow the instructions to allow management port outbound access.
  #. Follow NTP sync instructions at `Managed CloudN Workflows <https://docs.aviatrix.com/HowTos/CloudN_workflow.html#step-2-2-configure-ntp-sync-and-smtp-services>`_.
  #. Register your CloudN.

  Option 2: Open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_.

6.4.2973 (11/19/2021)
=====================

- If your Controller is running 6.4 and you have ControllerHA enabled, there is a very small chance that your HA recovery might fail if your Controller goes down by any chance. If that happens, you can manually restore the backup on your new Controller. To avoid this, please upgrade to the 6.5 release.
- **AVX-16121** - In Aviatrix version 5.x, Logstash Forwarder was replaced by `Filebeat Forwarder <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#filebeat-forwarder>`_ in the supported logging services. If you enabled logstash before this switch, please disable/enable logstash on the Filebeat Forwarder in "Controller/Logging" before upgrading your Aviatrix Controller, otherwise your Gateways might come up in the "config_fail" state after the upgrade. You might need to update your configuration on your collection side to accommodate this change. If you already upgraded and have Gateways in the "config_fail" state, you can do an "Image Upgrade" on the impacted Gateway to resolve the issue. 
- **AVX-17221** - If you have Managed CloudN, Aviatrix requires you to follow the Managed instructions and allow access to the sites mentioned for the CloudN Managed Port. If your Managed CloudN ends up in a "config_fail" state after your Controller is upgraded, you have the following options:

  Option 1:

  #. Deregister your CloudN. Follow the instructions to allow management port outbound access.
  #. Follow NTP sync instructions at `Managed CloudN Workflows <https://docs.aviatrix.com/HowTos/CloudN_workflow.html#step-2-2-configure-ntp-sync-and-smtp-services>`_.
  #. Register your CloudN.

  Option 2: Open a ticket with `Aviatrix Support <https://support.aviatrix.com/>`_.

**Issues Corrected in Aviatrix Release 6.4**

- **AVX-15653** - Controller image migration fails to progress past the initialization state.
- **AVX-16494** - CPU overconsumption by IP processes on gateways.
- **AVX-16601** - In some corner cases, if the API enable_gateway_auto_recovery option is used on the Controller to overcome the Azure maintenance windows it causes the ethernet interfaces on the gateways to go missing. In some cases, the API failed to stop and start the affected gateways. If you have this feature enabled, please disable it and then enable it again after the upgrade or open a Support ticket at https://support.Aviatrix.com to get assistance.

6.5.2721 (11/18/2021)
=====================

**Issues Corrected in Aviatrix Release 6.5.2721**

- **AVX-15735** - CoPilot unable to display gateway active sessions from the Aviatrix Controller.
- **AVX-16494** - CPU overconsumption by IP processes on gateways.
- **AVX-16572** - Listing interfaces on a gateway takes a long time with large number of Site2Cloud connections.
- **AVX-16601** - In some corner cases, if the API enable_gateway_auto_recovery option is used on the Controller to overcome the Azure maintenance windows it causes the ethernet interfaces on the gateways to go missing. In some cases, the API failed to stop and start the affected gateways. If you have this feature enabled, please disable it and then enable it again after the upgrade or open a Support ticket at https://support.Aviatrix.com to get assistance.

**Feature Enhancements in Aviatrix Release 6.5.2721**

- **AVX-9927** - Added message for unstable network connectivity prompting user to refresh page to reconnect.
- **AVX-10080** - Added support for Transit Firenet in AWS China for Checkpoint.

6.3.2551 (11/12/2021)
=====================

**Issues Corrected in Aviatrix Release 6.3.2551**

- **AVX-16569** - Controller image migration fails to progress past the initialization state.

6.3.2548 (11/04/2021)
=====================

**Issues Corrected in Aviatrix Release 6.3.2548**

- **AVX-15897** - Fixed an issue for Gateway Replace/Create/ForceUpgrade operations if Splunk logging was enabled on it, which was seen on all releases after 10/13/2021 (when Splunk behavior changed).
- **AVX-15985** - Fixed the issue where the Controller get_gateway_stats API was returning stats for deleted interfaces.
- **AVX-16017** - Users were unable to create Microsoft Azure Resource Manager (ARM) China Gateway for the 6.3 version. This issue was fixed by updating an Azure China image link for 6.3.
- This release includes a fix for the security vulnerability AVI-2021-0006 that would allow an unauthenticated attacker to execute arbitrary code on the Controller (this vulnerability was also fixed by our security patch released on 10/25/2021 as described here https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#security-patch-note-10-25-2021).

6.4.2945 (10/31/2021)
=====================

**Issues Corrected in Aviatrix Release 6.4**

- **AVX-11175** - FQDN feature will handle any case changes to the UserAgent field made by a proxy.
- **AVX-15438** - For gateways with HPE connections to other gateways or CloudN gateways, a resize-up operation will make use of excess capacity, but a later replace operation might cause gateway to go to config_fail state. This fix addresses the issue.
- **AVX-15528** - The real-time status of the gateway is not returned in GCP when there are a large number of instances in the VPC.
- **AVX-15599** - Cannot launch a gateway on private OOB Controller.
- **AVX-15897** - Fixed an issue for Gateway Replace/Create/ForceUpgrade operations if Splunk logging was enabled on it, which was seen on all releases after 10/13/2021 (when Splunk behavior changed).
- **AVX-15978** - The conntrack allow all rule should always be above DROP all rule. The order should be honored. Fixed in this release.
- **AVX-15985** - Fixed the issue where Controller get_gateway_stats API was returning stats for deleted interface.
- **AVX-16066** - Stateful-Firewall ESTABLISHED rule deleted from FORWARD chain.
- **AVX-16100** - Fix that allows configuration of DNAT on transit GW on non-active mesh connection.

6.5.2613 (10/28/2021)
=====================

**Issue Corrected in Aviatrix Release 6.5**

- **AVX-15444** - This fixes CaaG registration version check error.

6.5.2608 (10/27/2021)
=====================

**Feature Enhancements in Aviatrix Release 6.5**

- Added support for AWS BGP over LAN to support multiple peer instances. Scale up to 10 BGP over LAN peers per Transit Gateway, and 20 total per Transit Gateway pair. This provides a higher throughput, better redundancy, and a consolidation of BGP over LAN peers for on-prem connectivity on a pair of Transit Gateways. For more information, see the discussion about `BGP over LAN Multi-Peer <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_workflow.html#bgp-over-lan-multi-peer>`_.
- Added fields "ec2 role" and "app role" in the Controller UI to support custom roles for AWS IAM based accounts. It is highly recommended to use a customized name for "ec2 role" and "app role" instead of the Aviatrix default roles for better security.
- **AVX-15101** - Added support for Azure Government Cloud Availability Zones.

**Issues Corrected in Aviatrix Release 6.5**

- **AVX-9927** - The Controller does a page refresh automatically when detecting a network issue.
- **AVX-11175** - FQDN feature will handle any case changes to the UserAgent field made by a proxy.
- **AVX-13851** - Site2cloud edit to update Local Identifier as private IP for External Device connection will update all tunnels correctly.
- **AVX-14224** - Improvements to Spire Gateway Service for handling a large number of gateways.
- **AVX-14240** - Improved messaging for CloudN without public IP.
- **AVX-14397** - CaaG's state changed to config_fail due to a wrong certificate name.
- **AVX-14600** - Support Palo Alto Firewall vendor integration with multiple IPs configured on the eth interfaces
- **AVX-14610** - Corrected non-ASCII characters while displaying the logs from Troubleshoot->Logs.
- **AVX-14619** - Fixed an issue causing packet drops when migrating from ActiveMesh 1.0 to 2.0.
- **AVX-14678** - Support multiple firewalls to be created and attached to Transit Gateway in Azure when Panorama vendor integration is configured.
- **AVX-14700** - Addressed an issue where some Gateways could be reported in a down state if Certificate Domain is updated.
- **AVX-14729** - Fixed an issue with cloudN upgrade failing dry run caused due to SSLError (Cert Expired).
- **AVX-14820** - Addressed an issue with Gateways being in up state during an upgrade from 6.4 to 6.5.
- **AVX-15012** - Exception error during disabling OCI transit FireNet function.
- **AVX-15071** - Fixed firewall tuple setting from changing during Controller upgrade.
- **AVX-15083** - Fixed issues with Site2Cloud with "Single IP HA" feature having issues with customized SNAT features when "sync to HA gateway" configuration is enabled.
- **AVX-15138** - Fixed route table priority to deal with CIDR overlap between advertised routes from Transit and CaaG/CloudN eth2 MGMT interface.
- **AVX-15198** - Process optimization to avoid db updates when Transit Gateway details are listed by the Aviatrix Controller or CoPilot.
- **AVX-15238** - Fixed a CaaG registration failure issue after the cert domain is changed from default.
- **AVX-15332** - Fixed an issue that was causing the Controller migration process to fail.
- **AVX-15454** - Deleted dependency of storage account for Azure China gateways.
- **AVX-15528** - The real-time status of the gateway is not returned in GCP when there are a large number of instances in the Project.
- **AVX-15639** - When replacing a gateway using image upgrade the new gateway was missing the Aviatrix-Created-Resource tag. This has been fixed by ensuring the tag is added while launching the new gateway.
- **AVX-15653** - Fixed an issue where Controller migration fails when custom IAM roles and limited permissions are used.
- **AVX-15704** - Fixed the issue when creating an IKEv2 enabled site2cloud connection, where "Failed to establish a new connection" error displays.
- **AVX-15897** - Fixed an issue for Gateway Replace/Create/ForceUpgrade operations if Splunk logging was enabled on it, which was seen on all releases after 10/13/2021 (when Splunk behavior changed).
- **AVX-15978** - The conntrack allow all rule should always be above DROP all rule. The order should be honored. Fixed in this release.
- **AVX-15985** - Fixed the issue where Controller get_gateway_stats API was returning stats for deleted interface.
- **AVX-16100** - Fix that allows configuration of DNAT on transit GW on non-ActiveMesh connection.
- **AVX-16130** - Fixed an issue where S2C GRE tunnel was showing it was down even though the S2C connection passing traffic with BGPoGRE was up.
- This release includes a fix for the security vulnerability AVI-2021-0006 that would allow an unauthenticated attacker to execute arbitrary code on the Controller (this vulnerability was also fixed by our security patch released on 10/25/2021 as described here https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#security-patch-note-10-25-2021).


- The following CVEs were addressed in this release: `CVE-2007-2243 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2007-2243>`_ and `CVE-2004-1653 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-1653>`_.

**Known Behaviors in Aviatrix Release 6.5**

- **AVX-16151** - The [NAT] incorrect tunnel is used during DNAT rule programming for Transit Gateway with HA. When DNAT is configured on non-active-mesh Transit Gateway with "Sync to HA" enabled, the DNAT rule may not be programmed correctly on HA Gateway and the Transit Gateway failover may see traffic impact. **Workaround** The workaround for this issue is that the DNAT config needs to be separately programmed on the primary and HA Gateway rather than programming on the primary Gateway side with "Sync to HA" enabled.

6.4.2859 (9/22/2021)
=====================

**Feature Enhancements in Aviatrix Release 6.4**

- **AVX-15101** - Added support for Azure Government Cloud Availability Zones.
- Enhanced stateful firewall functionality.
- Enhanced certificate functionality.

**Issues Corrected in Aviatrix Release 6.4**

- **AVX-14678** - Unable to create multiple firewalls attached to the same Transit Gateway in Azure environments.
- **AVX-15138** - When a Spoke or Transit Gateway advertises a CIDR that overlaps with a CaaG or StandAlone CloudN MGMT eth2 subnet, and the client application accesses the device through the eth2 MGMT interface, the reply traffic is not returned through the eth2 MGMT interface.
- **AVX-15198** - When Transit Gateway details are listed by the Aviatrix Controller or CoPilot, an exception may occur because the request is in replica mode and incorrectly tries to update the Mongo DB.

6.5.1905 (8/24/2021)
=====================

**New Features in Aviatrix Release 6.5**

**Selective Upgrades**

To facilitate less disruptive upgrades and reduce maintenance windows Aviatrix provides a rolling selective upgrade process. You can choose to upgrade all Aviatrix gateways simultaneously or select specific gateways and regions to upgrade in logical groups conforming to your network update policies and maintenance windows. For more information, see `Upgrading the Aviatrix Cloud Network Platform <https://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.  

**Feature Enhancements in Aviatrix Release 6.5**

- **AVX-9881** - Added support for using the same Azure Virtual Network name and resource group names under different subscriptions.
- **AVX-10188** - Added warning message when disabling the import certificate which includes the impact and effects of disabling the certificate.
- **AVX-10493** - Added support for Alibaba cloud including China regions in Aviatrix FlightPath.
- **AVX-10799** - Added support for Alibaba cloud including Global and China regions to Aviatrix VPC Tracker.
- **AVX-13615** - Added AWS GuardDuty support for AWS GovCloud monitoring.

**Modified Behaviors in Aviatrix Release 6.5**

- **AVX-9894** - Removed deprecated optional custom logging fields for Splunk, Sumo, and Filebeat from the user interface.
- **AVX-10113** - When you import security certificates on the gateways and controller, the certificate must include the proper FQDN. 
 
 For example:
 openssl req -new -subj "/C=GB/CN=foo" \
                  -addext "subjectAltName = DNS:foo.co.uk" \
                  -addext "certificatePolicies = 1.2.3.4" \
                  -newkey rsa:2048 -keyout key.pem -out req.pem
                  
Alternatively, you can add the SubjectAlternateName (SAN) tag in the openssl.cnf file before generating the certificate. The SAN tag makes sure your certificate includes the SubjectAlternateName which is validated by the Apache server on the controller. Versions of UserConnect-6.4 and later require the proper SubjectAlternateName including altNames be set in the certificates when they are imported. If the SAN is not specified, importing the certificates fails.

- **AVX-14009** - Added option to allow all traffic from the local VPC CIDR block to the network security group created during the OCI gateway creation process. Previously, only TCP port 443 traffic from the controller was added to the security group. By default, OCI allows all traffic from RFC1918 blocks. This change only applies to non-RFC1918 VPC CIDR block configurations.

**Known Behaviors in Aviatrix Release 6.5**

*Upgrading to Aviatrix Release 6.5*

- This behavior does not affect ActiveMesh gateways. In non-ActiveMesh environments, only one transit or Spoke Gateway can have the image upgraded or the software rolled back at a time. If you select multiple gateways, you receive an error message. For multiple API calls to replace gateways using Terraform, only one gateway is allowed and the others fail. For Terraform calls, Aviatrix recommends you set parallelism=1. 

*Gateway Issue Discovered After Upgrade*

In rare cases where the controller and a group of gateways are selected for upgrade and a fatal bug is discovered in the new software, a situation where the controller and gateways remain running different versions could develop. If this condition occurs assistance from Aviatrix Support is required.
For example:
A controller and gateways are running version 6.5.200.

- You upgrade the controller and a subset of gateways to 6.5.300.
- You rollback the gateways to 6.5.200 because of a bug in the 6.5.300 software. 
- Now the controller is running 6.5.300 and all gateways are running 6.5.200, and the gateways cannot successfully be upgraded to 6.5.300 because of the bug.
- The bug is resolved in controller version 6.5.400, so you want to upgrade to 6.5.400 to resolve the issue. However, this is not supported because the controller and gateways must be running the same software version before the controller can be upgraded.
- In this corner case, you must contact Aviatrix Support to upgrade the controller to the newer version. Support will diagnose the issue and provide the API operation required to perform the con-troller upgrade.

*Gateway Rollbacks*

Gateway rollback operations are not supported after Controller restore operations.

**Issues Corrected in Aviatrix Release 6.5**

- **AVX-10552** - Changed TGW VPN tunnel details response in API so list_attachment_route_table_detail  returns are in dictionary format rather than a long string.


6.4.2830 (08/28/2021)
=====================

**Issues Corrected**

- **AVX-13787** Incorrect gateway status is reported for default routes when an OCI gateway in insane mode is attached to a Transit FireNet gateway.
- **AVX-14295** When on-premise routes are injected or withdrawn, they are incorrectly removed in connected domain route tables.
- **AVX-14426** Newly deployed cloud gateways use a new IKE implementation and may cause negotiation issues when spoke or on-premise tunnels are configured with an older IKE implementation on one side and the new Aviatrix IKE implementation on the transit side. You may observe tunnels taking a long time to become established, and on occasion may observe route flapping even after the tunnel is established.
- **AVX-14689** Creating an Aviatrix gateway in the Alibaba Cloud may fail because the public IP address may not get converted to an elastic IP address.

6.4.2791 (08/20/2021)
=====================

- **Bug fix** The FQDN egress filtering gateway blocks traffic after adding whitelisting tags to the egress filtering gateway.

6.4.2783 (07/15/2021)
=====================

- **Bug fix** This issue is related to our smallest supported instance size in AWS which is t2.micro. In 6.4 the t2.micro instances were under additional memory pressure because of new services enabled in 6.4. As a result, some customers may experience gateway down events after upgrading to 6.4. This issue resolves those issues by optimizing several scheduled jobs which burden the t2.micro appliances.
- **Enhancement** In order to alleviate memory pressure on our smallest supported AWS instance size; t2.micro, we now enable swap memory on instances with less than 1G of memory. This allows short periods of over-provision to be tolerated by the operating system ensuring continuous operations.

R6.4.2776 (07/13/2021)
========================

.. note::
  - If upgrading from 6.3 to 6.4, please make sure to upgrade the image to 6.3 latest first before upgrading it to release 6.4.
  - Starting 6.4, Standalone CloudN no longer support HPE over Internet
 
- **Bug fix** NAT rule is missing after replacing a gateway with and S2C mapped tunnel.
- **Bug fix** When an S2C mapped tunnel route is modified the old iptable entry is not removed.
- **Bug fix** HA Controller restorations partially fail when DataDog API is integrated.
- **Bug fix** In Azure clouds the Controller does not deploy more than one firewall instance in the same availability set as the Controller.
- **Bug fix** False license expiration alerts can be sent to subscribers.
- **Bug fix** When adding a FireNet instance to the routing path, the default value of the "Attach" flag should be "false".
- **Bug fix** In some implementations, the firewall does not block traffic to subdomains of domains that are on the whitelist.
- **Bug fix** The RBAC permissions for Site2cloud configuration download are not correct.
- **Bug fix** Failed to attach HPE Spoke to Transit due to route already exists error.
- **Bug fix** Controller unable to push RFC-1918 route to Panorama.
- **Bug fix** Azure Peering UI filter not working.
- **Bug fix** Unable to enter User VPN filter content fields on the Controller dashboard.
- **Enhancement** Reduced memory consumption for BGP event monitoring process and other processes. 
- **Enhancement** Improved reliability by requiring the OVPN file to use the Global Accelerator DNS name to resolve to the 2 static IP addresses of the accelerator.
- **Enhancement** Allow changes to the MTU setting in the Aviatrix OVPN client during runtime.
- **Enhancement** Shortened execution time and memory usage for removing list_vpc and list_saml_info users.
- **Enhancement** Allow the same PSK to be used for primary and backup Aviatrix gateways based on S2C tunnel policy.
- **Enhancement** Allow use of colon in tags.

R6.4.2674 (06/26/2021)
========================

- **Bug fix** In AWS and Azure clouds, gateway and FireNet tag keys and values do not support the colon (:) and other special characters.
- **Bug fix** Added support for Azure Controller Security Group Management allowing the Network Security Group and the Azure Controller to use different Resource Groups.
- **Bug fix** Added support for Multiple Dynamic SAML Profile attributes for controller login in list format.
- **Bug fix** Added size suggestions for deploying ActiveMesh Insane Mode gateway instances in Azure India regions.
- **Bug fix** Transit list page displays exceptions during gateway deployment.

R6.4.2672 (06/11/2021)
========================

- **Bug fix** Gateway FQDN logs fail to download resulting in an error message.
- **Bug fix** Availability Domain and Fault Domain not available in OCI gateway and firewall instances.
- **Bug fix** Terraform bug fix, cannot delete all gateway tags.
- **Bug fix** SNAT cannot be disabled on Azure Spoke Gateway.
- **Bug fix** OCI Gateways deployed with Active Mesh are not being deployed in separate Availability Domains.
- **Bug fix** CAAG OCI, OCI tunnels missing after replacing the OCI Transit Gateway
- **Bug fix** Aviatrix Controller in Azure unable to push RFC-1918 route to Panorama in OCI.
- **Bug fix** Intermittent connectivity issues from CoPilot to Controller.
- **Bug fix** Enabling FQDN Discovery fails, some configuration changes are not removed, and the network connection breaks.
- **Bug fix** Upgrade fails when upgrades from 6.3 to 6.4 using the upgrade to latest release feature.
- **Bug fix** Cannot add certificates to LDAP configuration, error C:\fakepath\user.crt does not exist.
- **Enhancement** Aviatrix Controller blocks multiple simultaneous logins from one account.

R6.4.2618 (05/30/2021)
========================

.. note::
  Customers using Azure Controller Release 6.3 and managed CloudN, should hold off upgrading Controller with CloudN to 6.4 until next 6.4-patch
  
- **Bug fix** Enabling segmentation caused some routes missing in the spoke routing table
- **Bug fix** Fixed exception for SAML VPN connection.
- **Bug fix** In Ali Cloud, Transit Gateway showed all connections down.
- **Bug fix** In some corner cases Controller HA, backup/restore broke the control connection between the controller and CloudN.
- **Bug fix** Fixed exception when downloading the OCI OVPN file.
- **Bug fix** Fixed Managed CloudN exception during registration.
- **Enhancement** In IAM policy, enable parallel role swapping after role name change.

R6.4.2561 (05/18/2021)
========================

.. note::
  Customers should hold off upgrading Controller with CloudN to 6.4 until next 6.4-patch

- **Bug fix** When FQDN gateways deployed in HA topologies have private route tables with the IAM deny policy applied, the default route restoration fails when the FQDN feature is disabled. Default route restoration only works only in non-HA topologies.
- **Bug fix** In the Alibaba cloud, after running for a while BGP sessions on the IPSEC tunnel can go down at random.
- **Bug fix** When using insane mode over the internet, missing Elastic IP addresses can cause some tunnels not to come up.
- **Bug fix** When a new Transit Gateway for FireNet is launched on Azure, a false notification indicating that interface eth1 is down and needs to be restarted manually is sent.
- **Bug fix** Disconnecting last BGP connection does not clear the IP prefix configuration.
- **Bug fix** When a new best path is selected, old routes are deleted causing traffic interruptions.
- **Bug fix** In GCP, when FireNet and FQDN Filtering are enabled the gateway is no longer associated with the existing instance group after the gateway is replaced.
- **Bug fix** Deleting then recreating transit peering connections blocks some tunnels from delivering traffic.
- **Bug fix** In GCP, after a NIC connection goes down the gateway fails to restart.
- **Bug fix** Route updates can take excessive time after upgrading to 6.4.
- **Bug fix** Unable to attach OCI Spoke Gateway to OCI Transit Gateway after upgrading to 6.4.
- **Bug fix** When a spoke is attached to an egress IP, the skip public route table update operation is not working.
- **Bug fix** Some gateways may not be upgraded during the 6.4 upgrade process.
- **Bug fix** When FQDN gateways deployed in HA topologies have private route tables with the IAM deny policy applied, the default route restoration fails when the FQDN feature is disabled. Default route restoration only works only in non-HA topologies.
- **Bug fix** Block creating a global network from AWS China controllers.
- **Bug fix** In Alibaba clouds, after deleting a Transit Gateway you may find invalid paths to certificates.
- **Bug fix** Enable the custom Gateway IAM role feature for AWS China and Government clouds through the API. 

R6.4.2499 (05/10/2021)
========================

1. Multi-Cloud Transit Network
--------------------------------
- **Alibaba Cloud Support** expands the Aviatrix Multi-Cloud Transit solution to support the Alibaba Cloud. This includes support for Ali Global and Ali China region. For more information, check out `Alibaba Cloud Account Credential Setup <https://docs.aviatrix.com/HowTos/aviatrix_account_alibaba.html>`_

- **China Multi-Cloud Network Architecture Support** expands the Aviatrix Multi-Cloud Transit solution to AWS, Azure, and Alibaba public clouds in China regions. For more information, check out `Aviatrix China Overview <https://docs.aviatrix.com/HowTos/aviatrix_china_overview.html>`_. Support includes:
  
  * Aviatrix Controller image and CoPilot image in AWS China Marketplace.
  
  * Multi-Cloud Transit solution in AWS China, Azure China and Alibaba China regions.

- **Multi-Tier Transit** supports the hierarchical Multi-Cloud Transit Gateway deployment model, and adds the ability to traverse more than two Aviatrix Multi-Cloud Transit Gateways. This feature improves operational simplicity by aggregating multiple Aviatrix Transits. One use case is centralized firewall design for multiple Aviatrix-Transits in a single region, which allows in-region traffic without any inspection. To configure Multi-Tier Transit, go to Multi-cloud Transit -> Advance Config. Select the Transit Gateway and enable the Multi-Tier Transit feature. For more information, refer to `Multi-Tier Transit doc <https://docs.aviatrix.com/HowTos/transit_advanced.html#multi-tier-transit>`_
- **Transit Peering Insane Mode Support over Public Network** provides high performance Transit Gateway peering to multi-cloud networks with public network connectivity between AWS and Azure only. To configure Insane Mode over public networks, go to Multi-cloud Transit -> Transit Peering -> +Add New. Select the option Insane mode over Internet for a new peering connection. For more information, refer to `Peering over Public Network or Internet doc <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#peering-over-public-network-or-internet>`_
- **OCI Transit Insane Mode Support** expands our Insane Mode Encryption Service to OCI networks. The support includes Insane Mode for VCN to VCN encrypted peering and Transit Peering connections. Launch an OCI gateway with Insane Mode enabled to get started. For more information, refer to `OCI Performance Test Results <https://docs.aviatrix.com/HowTos/insane_mode_perf.html#oci-performance-test-results>`_
- **IAM Role and Policy for Gateways** separate IAM policy for Aviatrix gateway. API support only.
- **BGP Connection Holdtime** can now be modified through the Aviatrix Controller. One use case of modifying BGP Hold Timer is to have a quicker BGP failover time. For more information, refer to `BGP Hold Time doc <https://docs.aviatrix.com/HowTos/transit_advanced.html#bgp-hold-time>`_

2. FireNet
-------------
- **Aviatrix Transit FireNet for OCI** allows you to deploy firewall instances in OCI. The OCI FireNet can be used for East-West, North-South and Ingress-Egress inspection with Palo Alto Networks VM-Series only. For more information, check out `Transit FireNet Workflow for OCI <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_oci.html>`_ and `Example Config for Palo Alto Network VM-Series in OCI <https://docs.aviatrix.com/HowTos/config_paloaltoOCI.html>`_.
- **FireNet Fortinet Integration Enhancement** now supports Fortinet firewall integration with the Aviatrix Transit FireNet solution. This integration allows automatic route updates in Fortigate routing tables by the Aviatrix Controller. You no longer need to statically configure RFC 1918 or any other routes in Fortigate. This integration is supported for AWS, Azure, and GCP Public clouds only. For more information, check out `Transit FireNet Workflow for AWS, Azure, GCP, and OCI <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html>`_

- **Check Point CloudGuard in GCP** is now available when deploying Aviatrix Transit FireNet. Refer to this example `CheckPoint workflow in GCP <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#transit-firenet-workflow-for-aws-azure-and-gcp>`_ for more details.
- **Fortinet Fortigate for GCP** is now available in GCP when deploying Aviatrix Transit FireNet.
- **Custom AMI Support for Firewall Instances** allows customer to launch the special images provided by firewall vendors. API support only.

3. Site2Cloud
---------------
- **Dynamic routes update for Site2Cloud Connections** adds the capability to auto advertise or remove the remote subnet automatically based on the Up/Down status of the Site2Cloud tunnel. To configure dynamic routes for Site2Cloud, go to Multi-Cloud Transit -> List -> Spoke -> Select Spoke Gateway and click "Auto Advertise Spoke S2C CIDRs" to enable dynamic routes. For more information, refer to `Auto Advertise Spoke Site2Cloud CIDRs doc <https://docs.aviatrix.com/HowTos/transit_list.html#auto-advertise-spoke-site2cloud-cidrs>`_
- **Site2Cloud Single Public IP Failover Support** enhances the HA mechanism to use a single public IP address and single tunnel from the remote site (on-prem) point of view. To configure Site2Cloud Single Public IP Failover, go to Site2Cloud -> Add New -> Enable HA. Check the box to Enable Single IP HA to activate Single Public IP Failover. This applies to AWS and Azure only. For more information, refer to `Site2Cloud IPSec VPN Instructions <https://docs.aviatrix.com/HowTos/site2cloud.html>`_
- **Jumbo Frame Support** adds the ability to turn on/off Insane Mode jumbo frame support for the Site2Cloud tunnel between the Aviatrix Transit Gateway and CloudN. To enable jumbo frame support, go to Site2Cloud -> Select Site2Cloud connection to CloudN. Click Edit and enable jumbo frame support. For more information, refer to `Jumbo Frame doc <https://docs.aviatrix.com/HowTos/site2cloud.html#jumbo-frame>`_

4. Security
---------------
- **Egress FQDN Enhancement** is now supported for multiple Egress FQDN gateways in GCP. This feature includes support for GCP Shared VPC as well as Distributed and Centralized Egress for FQDNs.

5. Operations
-----------------
- **Create a VPC Enhancement** adds an option in "Create a VPC" to select an existing Resource Group for Azure under Advanced options.
- **Co-Pilot integration with Controller** delivers the operational simplicity you need by presenting Aviatrix Controller as a single-pane of glass for managing the Day 0, Day 1 and Day 2 operations of the cloud fabric. The integration with Co-Pilot brings additional capabilities including the SAML and DUO integration, and RBAC control. To configure the CoPilot Controller integration, log into the Aviatrix Controller console and go to Settings -> CoPilot -> Enable CoPilot Association to integrate CoPilot with Aviatrix Controller. For more information, refer to `CoPilot doc <https://docs.aviatrix.com/HowTos/Settings_CoPilot.html>`_
- **Performance and Scalability Improvements** Significant performance improvements for the Aviatrix Multi-Cloud Network Architecture (MCNA) especially for a very large enterprise networks.
- **Route Table Optimization** allows customer to skip public route table programming. This is supported in AWS only. For more information, refer to `Transit List doc <https://docs.aviatrix.com/HowTos/transit_list.html>`_
- **Notification Enable/Disable Option** gives an ability to customers to disable exception emails send to Aviatrix. For more information, refer to `How to not send exception notification to Aviatrix doc <https://docs.aviatrix.com/HowTos/alert_and_email.html#how-to-not-send-exception-notification-to-aviatrix>`_

6. Behavior Change Notice 
-------------------------- 
- Aviatrix is setting the public IP address of a peer device as the default remote identifier for an S2C connection. If the peer device uses its private IP address as the local identifier, the user needs to manually update the private IP of the peer device to use the remote identifier. In the Aviatrix Controller, go to the Aviatrix S2C page -> Edit connection -> Remote Identifier and update the private IP of the peer device to use the remote identifier. 
 
- The API "get_transit_or_spoke_gateway_details" result format changed.

- Two CaaG can't have the same public IP, e.g. mgmt interface behind the same NAT gateway.

7. Before you Upgrade 
-------------------------- 
- Gateway FQDN names (gateway_name + aviatrixnetwork.com) longer than 64 characters will prevent gateways from booting up correctly.
- Standalone CloudN cannot be upgrade to 6.4.
- Please review the latest field notices (FN#22 - 28), and take a recommended action for any `field notices <https://docs.aviatrix.com/HowTos/field_notices.html>`_ applicable to your environment.
- Aviatrix released new gateway and Controller images/AMIs for AWS and Azure.

R6.3.2475 (05/22/2021)
=======================
- **End of life** Gateway images based on old opensource OS versions deprecated. You MUST replace these with new opensource OS version images before upgrading to 6.4. Refer to FN28 for more details.
- **Bug fix** Fixed exception for OCI gateway launch.
- **Bug fix** Fixed bug in GCP FireNet with Palo Alto VM-Series image version listing.
- **Bug fix** In some corner cases Controller HA, backup/restore breaks the control connection between the controller and CloudN.
- **Bug fix** Fixed an issue with BGP route advertisement after spoke attachment
- **Bug fix** When a gateway NIC goes down, an alert will be triggered and the gateway will be taken down and brought back up again after self-remediation. 
- **Bug Fix** If a VNet route table is deleted unexpectedly, VNets could connect to the wrong Transit Gateway spoke for the subscription. When VNets under different subscriptions use the same Resource group name, and both Spoke VNets connect to different Transit Gateways, the controller cannot distinguish which VNet should attach to which gateway.

R6.3.2415 (04/19/2021)
=======================

- **Co-Pilot integration with Controller** delivers operational simplicity by presenting Aviatrix Controller and CoPilot in a single pane of glass for managing the Day 0, Day 1 and Day 2 operations of the cloud fabric. The Aviatrix Controller integration with Co-Pilot adds capabilities to the Controller including SAML and DUO integration, and RBAC control. To configure the CoPilot Controller integration, log into the Aviatrix Controller console and go to Settings -> CoPilot -> Enable CoPilot Association to integrate CoPilot with Aviatrix Controller.
- **Enhancement** Improved CloudN to controller reachability mechanism for public and private subnets.
- **Enhancement** Improved error handling for Aviatrix Controller HA process.
- **Bug fix** Fixed the backup restoration API response for Aviatrix Controller HA mechanism.
- **Bug fix** Blocked the exclude CIDR feature for Native GWLB FireNet.
- **Bug fix** Fixed exception for Site2Cloud remote subnet modifications.
- **Bug fix** Corrected invalid netflow data sent to CoPilot.
- **Bug fix** Fixed GCP security rule for Site2Cloud over private IP.
- **Bug fix** Corrected route table programming for native GWLB.
- **Bug fix** Fixed gateway creation issue when customized IAM policy is used in AWS.
- **Bug fix** Fixed default route restoration for FQDN when discovery is disabled.
- **Bug fix** Improved error messages for native GWLB egress.
- **Bug fix** Allowed ActiveMesh 2.0 migration without disabling Transit FireNet for older releases.

R6.3.2364 (03/18/2021)
=======================

- **Aviatrix Transit FireNet for GCP** allows you to deploy firewall instances in GCP. For more information, check out `Transit FireNet Workflow <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#transit-firenet-workflow-for-aws-azure-and-gcp>`_.
- **Segmentation Enhancement** Add the Multi-Cloud Transit segmentation support for CloudN
- **Site2Cloud Enhancement** Clear Session option is added in Site2Cloud connection to clear the active connection sessions running through Aviatrix gateways.
- **Multi-Cloud Transit Enhancement** New capability to attach managed CloudN with Multi-Cloud Aviatrix Transit without High Performance Encryption (HPE) for Oracle cloud only.
- **FlightPath Enhancement** Add support for IP address as a source
- **TGW Enhancement** Add support for AWS TGW connect
- **Bug fix** Enhanced AWS ENA conntrack data into the syslog
- **Bug fix** Improve the route programming mechanism for Spoke VPC to filter the customize CIDRs first before installing into the Spoke VPC route table.
- **Bug fix** Fix the Dashboard status display issue for BGP over LAN.
- **Bug fix** Fix the Aviatrix Gateways "Polling" status after Controller Backup & Restore and IP migration
- **Bug fix** Add the missing parameters in template for "Export to Terraform" feature
- **Bug fix** Fix exception for CloudN registration after controller migration.

R6.3.2247 (03/01/2021)
=======================

- **Bug fix** Race condition causing exception for Aviatrix Transit Gateway peering.
- **Bug fix** Fix the TGW attachment deletion issue when customize IAM policy is used in AWS.
- **Bug fix** Fix the Site2Cloud diagnostics display issue.
- **Bug fix** Missing "Aviatrix-Created-Resource" tag for Aviatrix Gateway keypair in AWS.
- **Bug fix** Fix exception for CloudN when eth0 is down.

R6.3.2216 (2/22/2021)
=======================

- **Enhancement** Significant improvements in failover time through a series of optimization for overlapping networks.
- **Enhancement** Add Clear Session capability in Site2Cloud connection to clear all the conntrack sessions entry.
- **Enhancement** Add the Active-Standby mode on ActiveMesh 2.0 support for BGP over LAN scenario.
- **Enhancement** Add API support to unify programming RFC1918 routes in native egress domain
- **Enhancement** New capability to split sending gateway metrics and syslog to different log management systems
- **Bug fix** Allow more than 16 network CIDRs in the Site2Cloud configuration.
- **Bug fix** Address Route programming failure in OCI VCN route entry in Site2Cloud configuration.
- **Bug fix** Unable to launch Palo Alto VM-Series in AWS GovCloud.
- **Bug fix** Revert check introduced in 6.3.2092 for ActiveMesh 2.0 that blocks the Aviatrix Transit Peering if ASN# for Aviatrix Transit Gateways are same or not set.
- **Bug fix** Fix the long security domain names display issue in Aviatrix Controller.
- **Bug fix** Fix exception when using "Export to Terraform" feature for fqdn_tag_rule.
- **Bug fix** Fix the route propagation for HPE Aviatrix Transit Gateway eth0 in Azure.
- **Bug fix** Update RFC1918 routes in OCI VCN for non-default security list.
- **Bug fix** Fix the default route entry removal issue when "Use VPC/VNET DNS Server" feature in-use.
- **Bug fix** Security patch for SAML vulnerability

R6.3.2092 (1/31/2021)
=======================

1. Multi-Cloud Transit Network
--------------------------------

- **Transit in Azure with Express Route** allows you to build an Aviatrix Transit and Transit FireNet solutions while leveraging the native Azure Express Route for on-prem to cloud connectivity and route propagation. One use case is to deploy in an environment where encryption between data center and cloud is not required but using native high performance Express Route is required. Both native Spoke VNet and Aviatrix Spoke Gateways are supported as Spoke attachment. For configuration workflow, follow the `Multi-cloud Transit Integration with Azure Expressroute workflow <https://docs.aviatrix.com/HowTos/integrate_transit_gateway_with_expressroute.html>`_.

- **Transit BGP over GRE Tunnel** provides an alternative tunneling protocol to IPSec when connecting Aviatrix Transit Gateway to on-prem. One use case is for an organization that requires high performance but not encryption. With GRE tunneling, Multi-cloud Transit Gateways in AWS connects with on-prem network devices without deploying Aviatrix CloudN appliances. Only available in AWS (Azure and GCP do not support GRE). For configuration information, refer to `Aviatrix Transit Gateway to External Devices <https://docs.aviatrix.com/HowTos/transitgw_external.html#how-to-configure>`_. For end-to-end configuration workflow and performance benchmark, refer to `GRE Tunneling workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_gre_high_performance_workflow.html>`_. 

- **Transit BGP to LAN** allows Aviatrix Transit Gateways to communicate with other instances in the same VPC or VNet without running any tunneling protocol. One use case is to interoperate with cloud virtual appliances such as a SD-WAN cloud gateway instances that do not have the capability to support BGP over IPSec or GRE protocols. For configuration and performance information, refer to `BGP over LAN in AWS Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_workflow.html>`_. For Azure, refer to `BGP over LAN in Azure Workflow <https://docs.aviatrix.com/HowTos/transit_gateway_external_device_bgp_over_lan_azure_workflow.html>`_. 

- **Manual Advertise Routes per BGP Connection** expands the existing gateway based manual advertising routes feature to apply it to each BGP connection. One use case is to have better route advertising control for each remote BGP peer. For configuration details, refer to `Connection Base Manual BGP Advertisement <https://docs.aviatrix.com/HowTos/transit_advanced.html#connection-manual-bgp-advertised-network-list>`_.  

- **Transit Approval per BGP Connection** expands the existing Aviatrix Transit Gateway based Transit Approval feature to apply it to each on-prem BGP connection for fine grain control of network CIDRs admitted to the cloud network. To configure, go to Multi-cloud Transit -> Approval. Select a Transit Gateway, select Mode Connection and select a connection, enable Learned CIDRs Approval. For more information, refer to `Transit Approval <https://docs.aviatrix.com/HowTos/transit_approval.html>`_. 

- **Private Transit Gateway Peering with Single-Tunnel Mode** expands the existing Insane Mode Transit Gateway Peering Over Private Network to apply it to single IPSec tunnel. One use case is for low speed encryption between cloud networks (up to 4Gbps). For more information, refer to `Transit Peering in Single-Tunnel mode. <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#single-tunnel-mode>`_. 

- **Transit to External Device Using IKEv2** provides an option to run IKEv2 with the on-prem site. For more information, refer to `Aviatrix Transit Gateway to External Devices <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_. 

- **Client Proxy** allow both the Controller and Aviatrix gateways to use external proxy server for Internet facing API access. One use case is to satisfy compliance requirements where all traffic destined to Internet is required to go through a proxy server. For configuration information, refer to `proxy configuration <https://docs.aviatrix.com/HowTos/advanced_config.html#proxy>`_. 

- **Improve AWS t3 instances IPSec performance** to up to 6Gbps (MTU 1500 Bytes) for Multi-cloud Transit and Spoke Gateway without additional license charge. The mechanism is to allow Insane Mode to be applied the t3 series without charging the Insane Mode license. For performance details on t3 series, refer to `t3 series Insane Mode performance <https://docs.aviatrix.com/HowTos/insane_mode_perf.html#t3-instance-series-performance>`_. 

- **Support N2 and C2 instance types on GCP gateways** improves Insane Mode performance on GCP cloud. For new network throughput with these new instance types, refer to `GCP Insane Mode Performance. <https://docs.aviatrix.com/HowTos/insane_mode_perf.html#gcp-performance-test-results>`_ 

- **Managed CloudN Appliance** supports in GCP. Refer to `Managed CloudN workflow <https://docs.aviatrix.com/HowTos/CloudN_workflow.html>`_.

- **License Info** license change to inter-cloud for Aviatrix Transit to AWS VGW connection.


2. FireNet
=============

- **FireNet integration with AWS Gateway Load Balancer** provides the capability where adding or removing a firewall to the FireNet does not impact the existing established network sessions. AWS Gateway Load Balancer (GWLB) integration is supported for both TGW based FireNet and Multi-cloud Transit FireNet. For configuration details on TGW based FireNet without Aviatrix FireNet gateways, refer to `Native AWS GWLB Integration <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#b-enable-native-aws-gwlb-for-firenet-function>`_. For configuration details on TGW based FireNet with Aviatrix FireNet gateways, refer to `FireNet with GWLB <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-enable-the-aviatrix-gateway-for-firenet-function>`_. For Multi-cloud Transit FireNet GWLB integration, refer to `Enable Transit FireNet <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#a-enable-transit-firenet-on-aviatrix-transit-gateway>`_. 

3. User VPN
=============

- **Download Aviatrix SAML VPN Client from Controller** provides self-service ability for organizations to download Aviatrix SAML VPN Client software from the Controller directly for SAML authenticated users. This simplifies administration for on-boarding new VPN users. To enable, go to OpenVPN -> Advanced -> Global Config -> Download SAML VPN Client to enable. For more information, refer to `Self Service Download SAML Client <https://docs.aviatrix.com/HowTos/openvpn_faq.html#what-is-download-saml-vpn-client>`_. 

4. Site2Cloud
=============

- **Route based IPSEC with IKEv2** provides an option to run route-based VPN with IKEv2. For more information, refer to `Create Site2Cloud Connection <https://docs.aviatrix.com/HowTos/site2cloud.html#create-site2cloud-connection>`_. 
- **Change Local Identifier** provides the flexibility to update either gateway's public IP address or private IP address as local identifier. To configure, refer to `Local Identifier <https://docs.aviatrix.com/HowTos/site2cloud.html#local-identifier>`_. 
- **DPD Parameters** can now be modified through the Controller User Interface in additional to API and Terraform. One use case of modifying DPD parameters is to reduce tunnel failure detection time. To configure, refer to `DPD Configuration <https://docs.aviatrix.com/HowTos/site2cloud.html#dead-peer-detection>`_. 
- **Event Trigger** is a new mechanism to reduce failure detection time. This is an alternative to the default setting where tunnel status change is detected by a periodic monitoring process running on the gateways. To configure, refer to `Event Triggered HA <https://docs.aviatrix.com/HowTos/site2cloud.html#event-triggered-ha>`_. 
- **Failover Time Reduction for Overlapping Networks** Significant improvements in failover time reduction through a series of optimization. Refer to `Tuning For Sub-10 Seconds Failover Time in Overlapping Networks. <https://docs.aviatrix.com/HowTos/s2c_overlapping_cidrs_with_fast_convergence.html>`_.

5. Security
==============

- **Reduce Email API Blocking** is an enhancement for non HTTP/HTTPS traffic configured on a FQDN gateway where a set of large site's well known IP addresses are pre-populated to the FQDN gateways, thus significantly reducing the probability that applications still cannot make API calls (mostly email services) even though the FQDN rules for these sites are configured. The set of sites are: gmail.com, hotmail.com, microsoft.com, live.com, outlook.com, office.com ad office365.com. The applicable TCP ports are: 25, 465, 587, 143, 993 and 995.  
- **Edit Stateful Firewall Rules Enhancement** simplifies editing and viewing IP address based stateful firewall  rules, allowing large set of rules to be managed easily. To configure, go to Security -> Stateful Firewall -> Policy to edit policies.   


R6.2.2016 (2/18/2021)
=======================

- **Bug fix** Security patch for SAML Vulnerability.


R6.2.2003 (2/15/2021)
=======================

- **Enhancement** Add API support to turn off Jumbo frame support.
- **Bug fix** Allow more than 16 network CIDRs in the Site2Cloud configuration. 
- **Bug fix** Route programming failure in OCI VCN route entry. 
- **Bug fix** Unable to launch Palo Alto VM-Series in AWS GovCloud. 


R6.2.1955 (1/16/2021)
======================

 - **Bug fix** GCP Spoke Gateway with SNAT configuration propagates route incorrectly. 
 - **Enhancement** Optimize Spoke Gateway attach/detach functions when "Customize VPC Route table" feature is enabled. 
 - **Enhancement** Improve email authentication mechanism for emails generated by Controller. 
 - **Enhancement** Optimize Multi-cloud transit network failover time. 
 - **Bug fix** Unable to launch Palo Alto VM-Series with version 9.x
 - **Bug fix** GCP Controller backup and restore fails. 

R6.2.1925 (12/12/2020)
========================

- **Enhancement** Execute all Azure Spoke VNet programming in parallel. The scope of the enhancement includes individual route entry update and multiple VNet route tables update. The result is a significant reduction in Spoke attachment time and certain failover convergence time. 
- **Enhancement** Improve Controller daemon process robustness.  

R6.2.1914 (12/04/2020)
========================

- **Bug fix** Not able to detach a native Spoke VNet when its resource group is deleted on Azure console. 
- **Bug fix** FQDN crashes when the number of FQDN rules exceed 1000. 
- **Enhancement** Increase the number of FQDN rules to 1500. 

R6.2.1891 (11/20/2020)
========================

- **Bug fix** OCI Spoke VCN default route tables not programmed correctly. 
- **Bug fix** After removing Spoke FQDN, Spoke Gateway route table entries are missing. 
- **Enhancement** Reduce excessive logging on Controller. 
- **Enhancement** Add new regions to OCI. 
- **Enhancement** Performance enhancement when interoperating with Copilot. 
- **License Info** Site2Cloud license change to inter-cloud for Aviatrix Transit to AWS VGW connection.


R6.2.1837 (11/10/2020)
=======================

- **Enhancement** Add conntrack_count to syslog.
- **Enhancement** FireNet LAN interface keep alive is enhancement with follow up TCP keep alive packets when ICMP ping fails, making the firewall detection more robust. Customer needs to open TCP port 443 from the gateway eth2 IP for this to take effect. No additional configuration required.
- **Enhancement** New AWS gateway AMI "hvm-cloudx-aws-102320" with the latest AWS SR-IOV device driver enhancement. 
- **Bug fix** FQDN feature not working when ports are selected as all. 
- **Enhancement** on interoperating with co-pilot. 
- **Enhancement** Add disaster debugging capability when the Controller Apache daemon process fail to start.


R6.2.1742 (10/15/2020)
========================

1. Multi-cloud Transit Network
---------------------------------

- **Active-Standby Mode on ActiveMesh 2.0** provides the flexibility on Aviatrix Transit Gateways to connect to on-prem with only one active tunnel and the other one as backup. The use case is a deployment scenario where on-prem device such as firewalls does not support asymmetric routing on two tunnels. When Active-Standby mode is enabled, it applies to both BGP and Static Remote Route Based `External Device Connections <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_ and for each connection, only one tunnel is active in forwarding traffic at any given time. To configure, go to Multi-cloud Transit -> Advanced Config, select the Aviatrix Transit Gateway to enable Active-Standby. For more information, refer to `Active-Standby <https://docs.aviatrix.com/HowTos/transit_advanced.html#active-standby>`_.

- **Segmentation based BGP CIDRs Advertisements** advertises only those Spoke CIDRs that have connection policy to a specific on-prem connection. For example, consider a multi-tenant deployment where Aviatrix Transit Gateway connects to multiple on-prem sites over BGP, each site connecting to a set of Spokes through `AWS TGW Edge Segmentation <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-edge-segmentation>`_ or `Multi-cloud Segmentation <https://docs.aviatrix.com/HowTos/transit_segmentation_faq.html#what-is-multi-cloud-transit-segmentation>`_. With this new feature, Aviatrix Transit Gateway only advertises Spoke CIDRs that are relevant to the on-prem site. This behavior is enabled as the default when launching a new Transit Gateway. For existing deployment, you can enable it by going to Multi-cloud Transit -> Advanced Config, select an Aviatrix Transit Gateway, scroll down to `Refresh BGP Advertise Network Routes`. 

- **Multi-cloud Transit Gateway Peering over Private Network** expands Transit Gateway peering over multi-cloud where there is private network connectivity cross cloud. One use case is two Aviatrix Transit Gateways deployed in two different public cloud where each has its private connectivity such as AWS Direct Connect and Azure Express Route connecting to on-prem or a co-location. By building a high performance Transit Gateway private peering, Aviatrix Transit Gateway forwards traffic over the private links to the other Aviatrix Transit Gateway and beyond with encryption for data in motion. To configure, go to Multi-cloud Transit -> Transit Peering -> +Add New. Select the option Peering over Private Network for a new peering connection. For an example configuration, refer to `Multi-cloud Transit Peering over Private Networks <https://docs.aviatrix.com/HowTos/transit_gateway_peering_with_private_network_workflow.html>`_.

- **Insane Mode in GCP** is now available for Multi-cloud Transit solution. For performance benchmark, refer to `GCP Insane Mode performance test results <https://docs.aviatrix.com/HowTos/insane_mode_perf.html#gcp-performance-test-results>`_. Insane Mode is enabled when launching a new Aviatrix Transit Gateway or Spoke Gateway in GCP. 

- **Managed CloudN Appliance** simplifies CloudN configuration and operation by allowing it to be managed by the Controller. Active-Active deployment model supports up to 25Gbps encryption performance. Refer to `Managed CloudN workflow <https://docs.aviatrix.com/HowTos/CloudN_workflow.html>`_. GCP support is in the future release. 

- **Custom Mapped Site2Cloud in Spoke** solves all issues of overlapping network addresses with remote networks by expanding Site2Cloud `Mapped <https://docs.aviatrix.com/HowTos/site2cloud.html#connection-type-mapped>`_ function in a Spoke. 

- **TGW with Multicast capability** allows you to launch an AWS TGW with multicast capability. A use case is to support applications running on multicast protocols. API support only.

- **Update Attached Spoke VNet CIDR** allows you to update Spoke VNet CIDR when there is a change without having to detach the Spoke and attach again, thus removing any down time or outage. API support only.

- **Default Tagging in Azure** adds Aviatrix default tag when Controller creates resources such as launching an Aviatrix gateway, create route entries, load balancer and route tables.  

- **Enhancement in Creating a VNet** defines public and private subnets and their associated route tables. This helps clarify how Aviatrix Controller manages route table and their programming. For details, refer to `Aviatrix Default Route Handling <https://docs.aviatrix.com/HowTos/default_route_faq.html>`_.

- **Default Routing Handling** enforces rules on how Aviatrix Controller handles the propagation and programming of cloud networks. Specifically the Controller only overwrite the default route on private subnets. For details, refer to `Aviatrix Default Route Handling <https://docs.aviatrix.com/HowTos/default_route_faq.html>`_. 


2. FireNet
-------------

- **FireNet 2-tuple Forwarding Algorithm Support** expands FireNet forwarding algorithm to include forwarding decision based on only the source and destination IP address. One use case is to support an application where multiple TCP sessions are used for an egress Internet service therefore requiring all sessions to go through one firewall with the same source NAT IP address. To configure, go to Firewall Network -> Advanced. Select the FireNet gateway, click the 3 dots skewer, scroll down to Firewall Forwarding, select 2-Tuple. For more information, refer to `Firewall Forwarding Algorithms <https://docs.aviatrix.com/HowTos/firewall_advanced.html#firewall-hashing>`_.  

- **Centralized FQDN on Azure FireNet** allows Aviatrix FQDN gateways to be deployed in FireNet solution in Azure. One use case is to consolidate egress control to reduce cost with centralized statistical multiplexing. To configure, go to Firewall Network -> Setup -> 7c. For more information, refer to `Launch & Associate Aviatrix FQDN gateway <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#c-launch-associate-aviatrix-fqdn-gateway>`_. 

- **Bootstrap support in Azure FireNet on Palo Alto Networks VM-Series, Check Point and FortiGate** simplifies FireNet deployment in Azure. For details, refer to `VM-Series bootstrap in Azure <https://docs.aviatrix.com/HowTos/pan_bootstrap_example_azure.html>`_, `Check Point bootstrap in Azure <https://docs.aviatrix.com/HowTos/checkpoint_bootstrap_azure.html>`_ and `FortiGate bootstrap in Azure <https://docs.aviatrix.com/HowTos/fortigate_bootstrap_example_azure.html>`_. 

- **Bootstrap support in AWS FireNet on Check Point and FortiGate** simplifies FireNet deployment in AWS. For details, refer to `Check Point bootstrap in AWS <https://docs.aviatrix.com/HowTos/checkpoint_bootstrap_azure.html>`_ and `FortiGate bootstrap in AWS <https://docs.aviatrix.com/HowTos/fortigate_bootstrap_example.html>`_. 


3. Operations
------------------

- **Discover Unencrypted Flows** is a useful tool to provide visibility on any non TCP port 443 and port 22 traffic running in a VPC in AWS. By running, recording and analyzing VPC flow logs in an on-demand fashion, this tool helps infrastructure engineers to understand application traffic patterns without cost incurring for long running VPC Flow Logs. By excluding TCP port 443 and port 22 traffic, the tool highlights any unencrypted traffic in the network.  

- **Session Visibility** displays active connection sessions running through Aviatrix gateways. This is useful for troubleshooting connectivity issue. To view sessions, go to Troubleshoot -> Diagnostics -> Gateway -> Session View. Or go to Security -> Stateful Firewall -> Session View. 

- **16,000,000 Max Connection Session Table Size** This improves the ability of Aviatrix gateways to handle the concurrent sessions going through the gateway. 

R6.1.1425 (11/9/2020)
=========================

- **Bug fix** CloudN failover route selection is not based on best route algorithm. 
- **Bug fix** Retry when Controller DNS lookup fails intermittently. 

R6.1.1415 (10/25/2020)
========================

- **Enhancement** Increase the max connection session table size to 16,000,000. Also include connection track entry count in the gateway diagnostics information. 

R6.1.1409 (10/20/2020)
=========================

- **Bug fix** FireNet VPC does not advertise its CIDR to on-prem when FireNet Management is enabled on the Aviatrix Edge Security Domain. 
- **Bug fix** Custom upgrade is broken. 
- **Bug fix** Site2Cloud Custom Mapped option becomes unavailable after upgrading. 

R6.1.1401 (10/4/2020)
======================

- **Bug fix** When attaching an Insane Mode Spoke Gateway to Transit Gateway, the action succeeds even though the underlying cloud provider peering (AWS PCX and Azure VNet Peering) fails. 
- **Bug fix** Controller does not update the egress default route when Spoke Gateways experience a failover. 
- **Bug fix** Enabling advertising transit CIDR breaks Azure transit network. 
- **Bug fix** Single AZ gateway replace function is broken.
- **Enhancement** Improve IKEv2 compatibility with Cisco ASA when re-establishing a tunnel after it goes down without restarting the VPN service. 
- **Enhancement** Enable multi-core processing capability on the Controller to handle co-pilot queries. API support to enable/disable multi-core processing in case of failure. 

R6.1.1338 (9/24/2020)
======================

- **Bug fix** Aviatrix Transit connecting to external device with 2 different ASNs doesn't work properly 
- **Bug fix** TGW attaching sometimes fails due to RAM authentication timeout. 
- **Bug fix** Custom SNAT is not able to select eth0 on Aviatrix Transit Gateway. 
- **Bug fix** Cannot edit mapped tunnels built before 6.0

R6.1.1309 (9/7/2020)
======================

- **Gateway Rename feature removal** Gateway Rename feature has been removed from UI. 
- **Account Rename feature removal** Account Rename feature has been removed from UI. 
- **Enhancement** Consistent Login Banner when custom banner login is enabled. 
- **Enhancement** Enable multicast option when creating an AWS Transit Gateway (TGW). API support only.
- **Bug fix** fix Insane Mode gateway replacement function bug. 
- **Bug fix** fix Transit Gateway Manual Summarize route bug.
- **Bug fix** fix FireNet error programming firewall instances when they go through stop and start process. 
- **Bug fix** fix gateway launch tag attachment to ensure when a gateway is launched tag is part of the AWS API call. 


R6.1.1280 (8/17/2020)
=======================

- **Bug fix** fix multiple issues with TGW Approval, TGW Peering inspection and FireNet integration. 
- **Bug fix** Transit Peering with SNAT creates redundant rules. 
- **Bug fix** FQDN with Edit Source behavior change. 
- **Enhancement** Add support for Aviatrix gateway certificate import. 
- **Bug fix** CloudN asymmetric routing for management interface. 



R6.1.1163 (8/5/2020)
=====================

- **Bug fix** fix upgrade issue. 

R6.1.1162 (8/1/2020)
=======================

1. Multi-cloud Network
--------------------------------

- **Scale out Firewalls in Azure FireNet** allows FireNet to support multiple firewall virtual machines in Azure. The use case is to support more than 2 firewall deployment to meet performance requirements. Only new FireNet gateways in Azure supports scale out firewall feature. Refer to `this document <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_azure.html>`_.

- **Azure GovCloud** is now supported for both Controller and Aviatrix gateways. Controller can be launched from Azure GovCloud marketplace. Follow `Azure Startup Guide <https://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html>`_ to get started. 


- **Prepend ASN on BGP Connection** expands Prepend ASN to specific BGP connection. Previously the ASN prepend applies to the entire Aviatrix Transit Gateway, this feature brings the flexibility to prepend different ASN for different BGP connections. The use case is to provide more flexibility on the Aviatrix Transit Gateway to influence the next hop selection of the upstream BGP neighbour. To configure, go to Multi-Cloud Transit -> Advanced Config. Select an Aviatrix Transit Gateways, scroll down to Connection AS PATH Prepend, select a connection and enter one or more enter AS numbers separated by space. For more details, refer to `Connection AS PATH Prepend <https://docs.aviatrix.com/HowTos/transit_advanced.html#connection-as-path-prepend>`_. 

- **Multi-cloud Segmentation Enhancement** now handles egress default route in a consistent way by introducing individual route tables for each Security Domain on an Aviatrix Multi-cloud Transit Gateway. This release is not backward compatible to the implementation in Release 6.0. To migrate, `disable Multi-cloud Segmentation <https://docs.aviatrix.com/HowTos/transit_segmentation_workflow.html#disable-aviatrix-transit-gateway-for-segmentation>`_ on each Aviatrix Transit Gateway, upgrade to Release 6.1 and `enable <https://docs.aviatrix.com/HowTos/transit_segmentation_workflow.html#enable-aviatrix-transit-gateway-for-segmentation>`_ again. To learn more on deployment limitation, refer to `this link. <https://docs.aviatrix.com/HowTos/transit_segmentation_faq.html#what-is-the-limitation-of-segmentation>`_ 

- **FireNet Check Point Integration Enhancement** now support Check Point firewall or security gateway automatic route updates to its routing tables by the Controller. You no longer need to statically configure RFC 1918 or any other routes.

- **FireNet for AWS TGW Inter Region Traffic Inspection** allows you to specifically inspect traffic crossing TGW Peering regions. One use case is in certain deployment, it is not desirable to specify all traffic going in and out of a Security Domain, rather the requirement is to only inspect traffic that moves across the regions. For configuration details, refer to `Inspect Inter Region Traffic <https://docs.aviatrix.com/HowTos/tgw_plan.html#inspect-inter-region-traffic>`_.

2. Security
----------------

- **Auto PrivateS3** significantly improves PrivateS3 usability and security by automatically retrieving S3 bucket names for PrivateS3 filtering. One use case is to support large set of S3 buckets owned by organizations without having to manually import into the Controller. The second use case is to prevent accidental or intentional manual  input S3 buckets that are not owned by organization. For workflow, check out `PrivateS3 workflow <https://docs.aviatrix.com/HowTos/privateS3_workflow.html>`_.

- **Subnets Pass-through** allows you to specify certain subnets in a VPC to bypass any FQDN filter rules. One use case is that certain subnets, for example,  are for Dev environment, therefore does not require to be FQDN filtered or logged. To configure, go to Security -> Egress Control -> Egress FQDN Gateway View. Select a gateway, click Actions -> Edit Pass-through. Select subnet or multi select subnets to allow bypass the filter. For more details, refer to `FQDN Source Pass-through <https://docs.aviatrix.com/HowTos/fqdn_viewlog.html#edit-pass-through>`_.

- **Exact Port Match** now applies to each FQDN rule. One use case is if you only specify an FQDN rule for TCP port 443, packets with the same FQDN rule for TCP port 80 are dropped unless you have the specific FQDN rule on TCP port 80. This is a bug fix, no configuration required. For more information, refer to `Exact Match <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#exact-match>`_. 

- **FQDN Option for Exact Match** is a new feature where if a FQDN rule does not have * an exact match is expected. If this global option is not enabled, FQDN rules use regex to match any FQDN names that are subset of the name. For example, if salesforce.com is a rule and Exact Match option is enabled, finance.salesforce.com is not a match and will be dropped. For configuration details, refer to `FQDN Exact Match <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#exact-match>`_. 


3. Operations
-----------------

- **Account Name Alias** allows you to change the account name after it is created by providing an alias name and allowing it to be modified at any given time. The use case is customers often need to change some account names after the network has been built out to certain scale. By allowing account name alias to be modified without having to delete the account and thus reduces network downtime. To change account name alias, go to Accounts -> Access Accounts, hover the mouse at a specific account, click the Pen icon and start typing. Refer to `this document <https://docs.aviatrix.com/HowTos/aviatrix_account.html#setup-account-name-alias>`_.

- **Gateway Name Alias** allow you to change an Aviatrix gateway name after it is created by providing an alias name and allowing it to be modified at any time. The use case is customers often need to change some gateway names after the network has been built out to certain scale. By allowing gateway name alias to be modified without having to delete the gateway and thus reduces network downtime. To change gateway name alias, go to Gateway, hover the mouse at a specific gateway name, click the Pen icon and start typing. Note the original gateway name is still maintained as "Original Name". Refer to `this document <https://docs.aviatrix.com/HowTos/gateway.html#gateway-name-alias>`_. Note this feature does not interoperate with Co-Pilot at this time. For customers who deploy Co-Pilot, making changes the gateway names breaks Co-Pilot. The work around is not to use this feature or change back the gateway name. 


- **Create a VPC Enhancement** now creates multiple route tables associated with public and private subnets. One use case is to allow traffic load balancing when Aviatrix Spoke Gateways are deployed. To configure, go to Useful Tools -> Create a VPC. For more details, check out `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_.
 
- **Controller Access Security on Azure** extends the Access Security feature to Azure. When an Aviatrix gateway is launched, security rule is automatically added to the Controller inbound rule. This allows Controller admin to only open inbound TCP port 443 to Aviatrix gateways and no-prem public IP addresses, thus improving Controller security. To configure, go to Settings -> Controller -> Access Security. Select the Controller account and enable. For more details, refer to `Enable Controller Security Group Management <https://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_.  

- **Login Banner** allows you to customize banner text for first time login for compliance. Any user who login for the first time must acknowledge the text before proceeding to Controller. To configure, go to Settings -> Controller -> Login Customization -> Login Banner. For more information, refer to `Login Banner <https://docs.aviatrix.com/HowTos/controller_config.html#login-banner>`_.

4. User VPN
--------------

- **Max Routes Pushing to VPN Client** has now been increased to 250. This allow a larger network deployment. Requires Aviatrix VPN client 2.11. No configuration change is needed.  

- **GeoVPN to use DHCP Setting** for DNS name resolution from the VPC where the VPN gateway is deployed. This reduces latency as DNS service is likely to be closer to the source of the VPN user location. For configuration examples, refer to `VPN Access Gateway Selection by Geolocation of User <https://docs.aviatrix.com/HowTos/GeoVPN.html>`_.

R6.0.2483 (8/4/2020)
======================

- **Bug fix** fix upgrade jump version issue. 

R6.0.2481 (8/1/2020)
======================

- **Bug fix** Latest Chrome browser login issue. 


R6.0.2466 (7/22/2020)
=======================

- **Bug fix** Missing MSS clamping configuration resulted in egress traffic loss. 
- **Bug fix** Handle VNet UDR routes programming when Azure Netapp service is deployed in the Spoke VNet. 
- **Bug fix** AWS GovCloud cannot list firewall options. 
- **Bug fix** Configure the system to prevent memory leak.
- **Enhancement** API support for t3a.x gateway instance types. 
- **Bug fix** Missing configuration parameters in download file for Site2Cloud for Cisco ASA devices. 

R6.0.2387 (7/10/2020)
======================

- **Bug fix** New gateway launching is missing MSS clamping rule which affects connectivity for potentially different types of traffic including egress and multi region Transit Gateway peering, etc. 

R6.0.2383 (7/2/2020)
======================

- **Bug fix** for error out when using Diagnostics to force upgrade a gateway. 

R6.0.2373 (6/30/2020)
=======================

- **Enhancement on TGW VPN Approval** improves TGW VPN Approval for overlapping CIDRs to prevent black holing traffic. For details, refer to `this link <https://docs.aviatrix.com/HowTos/tgw_approval.html>`_. For the enhancement to take effect, you need to first disable TGW Approval for each connection, upgrade to 6.0 and enable it again. Note you must first disable Approval before upgrading to 6.0. 
- **Bug fix** for FQDN thread process stuck. 
- **Bug fixes** to improve stability and use cases. 

R6.0.2269 (6/19/2020)
=====================

1. Aviatrix Multi-Cloud Transit
-----------------------------------------

- **ActiveMesh 2.0**  unifies the Aviatrix Transit Gateway next hop route selection by conforming to BGP next hop selection algorithm for all traffic sources. The use case is to provide a predictable routing path in a multi regions, multi cloud  and multi sites environments. All new Transit Network deployed is launched with ActiveMesh 2.0. For a one time migration from the existing deployment, go to Settings -> Migration -> ActiveMesh 2.0 Migration. Click Migrate. To learn more details, check out `ActiveMesh 2.0 Details <https://docs.aviatrix.com/HowTos/activemesh_faq.html#what-is-activemesh-2-0>`_.
- **Multi-Cloud Transit Segmentation** allows you to segment the Aviatrix multi-cloud transit network (where Aviatrix Transit Gateways and Spoke Gateways are deployed) by specifying domains and connection policy across all clouds and regions. To learn more, check out `Aviatrix Transit Network Segmentation FAQ <https://docs.aviatrix.com/HowTos/transit_segmentation_faq.html>`_.
- **External Device to Support Static Remote Route-Based** provides the interoperability between a route-based Aviatrix Transit Gateway and a remote route-based IPSEC tunnel connection. The use case is to allow the remote site to participate in the ActiveMesh 2.0 route selection in a unified manner. To configure, go to Multi-Cloud Transit -> Setup -> Step 3 -> External Device -> Static Remote Route-Based.
- **Dual Transit FireNet** allows you to attach an Aviatrix Spoke Gateway to two Aviatrix Transit Gateways, each with Transit FireNet service enabled but with a different purpose. One carries Egress/Ingress inspection and the other carries East-West and North-South inspection. The use case is to allow different policies to be implemented easily. To configure, go to Multi-Cloud Transit -> Transit FireNet -> `Step 1b. <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html#b-enable-transit-firenet-on-aviatrix-egress-transit-gateway>`_
- **Aviatrix Transit Gateway ECMP Disable Option** allows you to turn off ECMP for next hop selection. The use case is if on-prem deploy a firewall devices that require symmetric routing. The BGP ECMP is disabled by default. To enable, go to Multi-Cloud Transit -> Advanced Config -> Edit Transit -> BGP ECMP. For more information, refer to `BGP ECMP <https://docs.aviatrix.com/HowTos/transit_advanced.html#bgp-ecmp>`_.
- **Advanced NAT Function for Azure and GCP** is now available for Aviatrix Spoke Gateways. The use case is to resolve overlapping network CIDRs between on-prem network and Spoke network. To learn more on Aviatrix advanced SNAT/DNAT functions, check out `Aviatrix Advanced SNAT <https://docs.aviatrix.com/HowTos/gateway.html#source-nat>`_ and `Aviatrix Advanced DNAT <https://docs.aviatrix.com/HowTos/gateway.html#destination-nat>`_.
- **GCP Multi Region Transit HA** leverages the GCP capability of multi regions in a single VPC and provide Aviatrix Transit/Spoke Gateway HA in a different region. The use case is to improve regional failure by the ability to failover to a different region. 
- **Azure Availability Zone Support** allows you to deploy an Aviatrix gateway in Azure in a specified availability zone where it is applicable. Not all regions support availability zones and where it is not, availability set is supported.  
- **Change Aviatrix Transit Gateway AS Number** provides the ability to change AS number of Aviatrix Transit Gateways. The use case is to avoid human errors when there are multiple BGP connections. To configure, go to Multi-Cloud Transit -> Advanced Config -> Edit Transit -> LOCAL AS NUMBER, enter the desired AS number and click Change. 
- **Sync Controller Best Routes to Aviatrix Transit Gateway** allows the Controller to reprogram an Aviatrix Transit Gateway route table in case they go out of sync. The use case is to recover the routes from an unforeseeable errors in the deployment. To configure, go to Multi-Cloud Transit -> Advanced Config. Select the Aviatrix Transit Gateway, scroll down to `Sync Controller Best Routes to Transit Gateway`, click Sync Routes. 


2. Firewall Network (FireNet)
------------------------------

- **Firewall Instances Health Check Enhancement** checks a firewall instance's health by pinging its LAN interface from the connecting Aviatrix FireNet gateway. This is an alternative option to checking health through firewall's management interface, which improves firewall failure detection time and detection accuracy. Available for both FireNet and Transit FireNet deployment and in both AWS and Azure. To configure, go to Firewall Networks -> Advanced, select the FireNet gateway, click the 3-dot skewer, scroll to Keep Alive via Firewall LAN Interface, click Enable. To learn more, refer to `Firewall Health Check with LAN Interface <https://docs.aviatrix.com/HowTos/firewall_advanced.html#firewall-health-check-and-failover-detection-using-lan-interface>`_.
- **FireNet Exclude CIDRs** allows you to exclude a list of network CIDRs to be excluded from going through firewall inspection even though its associated Security Domain or network requires inspection. One use case is to exclude the Aviatrix Controller deployed in the Shared Service VPC to be excluded from inspection while Shared Service VPC traffic is inspected. This improves the Controller reachability by not subjecting the Controller access to unintentional firewall policy errors. For details, check out `Exclude CIDR <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#how-to-exclude-specific-cidrs-from-being-inspected-by-the-firewall>`_.
- **Check Point CloudGuard in Azure** is now available in Azure when deploying Aviatrix Transit FireNet. Refer to `this example CheckPoint workflow in Azure <https://docs.aviatrix.com/HowTos/config_CheckPointAzure.html>`_ for more details. 
- **Fortinet Fortigate in Azure** is now available in Azure when deploying Aviatrix Transit FireNet. 
- **Check Point Dynamic Route Update** enhances FireNet Check Point integration by dynamically updates CloudGuard route tables by the Controller. The use case is for networks with non-RFC 1918 routes that require specific route table programming on the Check Point appliance. 

3. User VPN
--------------

- **Signed Cert for SAML Authentication** improves security of User VPN SAML authentication when it authenticates with the IDPs by providing a signed cert. To configure, go to OpenVPN -> Advanced -> SAML -> Add a New SAML Endpoint, select the option "Sign Authn Requests". For SAML login to the Controller, go to Settings -> Controller -> SAML Login -> Add a New SAML Endpoint, select the option "Sign Authn Requests".
- **Dashboard to Display user speed** allows you to access individual User VPN client performance. To view the client VPN speed, go to Dashboard, scroll down to the Use VPN section to view. 
- **Terraform for Attaching a user to profile** allows you to update the user profile in modular fashion.  

4. Site2Cloud
---------------

- **Route Based IPSEC** provides flexibility to configuration. One use case for selecting route based VPN is to solve overlapping network CIDRs with on-prem as referred in `this example <https://docs.aviatrix.com/HowTos/connect_overlap_cidrs_routebasedipsec.html>`_. To learn more about route based VPN, check out `the FAQ <https://docs.aviatrix.com/HowTos/activemesh_faq.html#what-is-route-based-vpn-and-policy-based-vpn>`_. 
- **Mapped Configuration for Route Based IPSEC** supports both SNAT and DNAT on the network address ranges. The use case is to connect two IP address overlapping networks, for example a cloud VPC and on-prem, where on-prem cannot implement any network address translation. Comparing with individual IP address based translation, this significantly simplifies configuration. Note this configuration is implemented on route based IPSEC tunnel of an Aviatrix gateway site2cloud connection. To configure, go to Site2Cloud -> Add New. For Connection Type, select `Mapped`. For an example configuration, refer to `Solving Overlapping Networks with Network Mapped IPSec. <https://docs.aviatrix.com/HowTos/connect_overlap_cidrs_routebasedipsec.html>`_ For more complex solutions, read `Overlapping Network Connectivity Solutions <https://docs.aviatrix.com/HowTos/overlapping_network_solutions.html>`_.
- **Intelligent Troubleshooting** provides expert analysis to the IPSEC syslog and reduces diagnosis time. To use, go to Site2Cloud -> Diagnostics. Select one connection, select `Run Analysis`. 
- **Shared the Same Pre-Shared Keys** provides an option for both primary and backup IPSEC tunnel to share the same pre-shared keys. The use case is to reduce the configuration burden for on-prem devices. To configure, go to Site2Cloud -> Add New. Check the option `Same Pre-shared Key as Primary` when creating a connection. For configuration details, check out `Site2Cloud configuration workflow <https://docs.aviatrix.com/HowTos/site2cloud.html#site2cloud-ipsec-vpn-instructions>`_. 

5. Egress Control 
-------------------
- **FQDN Search** supports general search for a specified destination FQDN during a specified period of time. One use case is to troubleshoot on an FQDN tag entry without the need to upload tracelog. 
- **Disable Caching FQDN Entries** prevents potential data leakage to large domain names that contain unrelated sites. To configure, go to Security -> Egress Control -> Egress FQDN Filter -> Global Configs -> Caching. Click to Disable. 

6. Operations
-----------------

- **Multi Remote Syslog Servers Support** allows an Aviatrix gateway to forward its syslog to a different remote syslog server than other gateways. The use case is customer may have multiple syslog servers deployed in different regions and Aviatrix gateways deployed in regions should forward syslog data to the server it is assigned to. 
- **Netflow v9 Support** adds new capability in addition to the current v5 support. 
- **CloudWatch Customize Configuration** now supports group name customization. The use case is to provide flexibility for customer to name their log folders. To configure, go to Settings -> Logging -> CloudWatch -> Advanced -> Log Group Name, enter a name of your choice. 
- **New User Interface** aims to reduce web interface screen load time and improve user experience.   
- **Datadog multi site support** to allow Datadog agent to send syslog to a destination site. To configure, go to Settings -> Logging -> Datadog Agent -> Enable Datadog Agent. Select a site datadoghq.com or datadoghq.eu.

7. AWS Transit Gateway (TGW)
-------------------------------

- **Intra Domain Firewall Inspection** allows AWS VPCs in the same Security Domain to be inspected by FireNet. The use case is a Security Domain in which all VPCs can communicate with each other, but all traffic requires logging and inspection. To enable, go to TGW Orchestrator -> List -> TGW Security Domains. Select one Security Domain, click Actions -> Edit Intra Domain Inspection. For additional information, refer to `Edit Intra Domain Firewall Inspection <https://docs.aviatrix.com/HowTos/tgw_list.html#edit-intra-domain-inspection>`_.
- **Change Spoke VPC's Security Domains** provides the ability to change a Spoke VPC's Security Domain without detaching the VPC from the TGW. The use case is to reduce Spoke VPC connectivity downtime when it needs to change its associated domains. To configure, go to TGW Orchestrator -> List -> Select the attached Spoke VPC -> Actions -> Switch Security Domain. In the pop up window, select the desired Security Domain to associate. For more information, refer to `Switch Security Domain <https://docs.aviatrix.com/HowTos/tgw_list.html#switch-security-domain>`_.
- **Update Spoke VPC Route Tables** provides the ability to update a Spoke VPC route tables without detaching the VPC from TGW. The use case is to reduce Spoke VPC connectivity downtime when its subnets and route tables are added or deleted. To configure, go to TGW Orchestrator -> List -> Select the attached Spoke VPC -> Actions -> Update VPC CIDR. For more information, refer to `Update VPC CIDR <https://docs.aviatrix.com/HowTos/tgw_list.html#update-vpc-cidr>`_.
- **Edit Spoke VPC Local Route Propagation** provides the ability to enable and disable attached Spoke VPC local route propagation without detaching the VPC. The use case is to disable local route propagation after a Spoke VPC is attached to TGW. To configure, go to TGW Orchestrator -> List -> Select the attached Spoke VPC -> Actions -> Edit Spoke VPC Local Route Propagation. For more information, refer to `Edit Spoke VPC Local Route Propagation <https://docs.aviatrix.com/HowTos/tgw_list.html#edit-spoke-vpc-local-route-propagation>`_. 

R5.4.1290 (8/5/2020)
=====================

- **Bug fix** fix the issue of jumping versions when upgrading. 

R5.4.1283 (7/17/2020)
=====================

- **Bug fix** upgrade failure from R5.3 to R5.4 

R5.4.1281 (7/15/2020)
=======================

- **Bug fix** Gateway memory leak when rsyslog is not initialized properly. 
- **Bug fix** Gateway memory configuration change to allow smaller memory footprint. 
- **Bug fix** Sometimes firewall instances in FireNet become inaccessible. 


R5.4.1251 (6/19/2020)
========================

- **Bug fix** nightly cron job hit exception. 

R5.4.1249 (6/15/2020)
======================

- **Enhancement** to support us-west-4 region in GCP. 
- **Bug fix** on gateway replacement that has AWS LB deployed. 

R5.4.1240 (6/1/2020)
=====================

- **Bug fix** Insane Mode to support Transit FireNet in Azure has an issue when the FireNet gateway is rebooted. 

R5.4.1238 (5/27/2020)
======================

- **Enhancement** Insane Mode to support Transit FireNet in Azure. 
- **Bug fix** CloudN to work with RBAC.

R5.4.1234 (5/20/2020)
======================

- **Bug fix** when importing user excel sheet for User VPN. 
- **Enhancement** to support the new Palo Alto VM-Series Bundle 1 and Bundle 2.

R5.4.1232 (5/18/2020)
=======================

- **Enhancement to Gateway Syslog Download** allows you to a gateway syslog directly from the Gateway. API support only.
- **Bug fix** Aviatrix Transit Gateway update learned routes incorrectly in certain cases. 
- **Route Update Convergence Enhancement** to improve route propagation and convergence time when routes are changed to the Transit network. 


R5.4.1204 (5/8/2020)
======================

- **Bug fix** fix API bug in enable_fqdn_cache_global.

R5.4.1201 (5/7/2020)
======================

- **Enhancement on FQDN** to disable learned FQDN entry IP address caching. API support only.
- **Enhancement on User VPN** to improve page load time by caching VPC tags. 
- **CloudN Enhancement** to support Netflow to export logs. 
- **Enhancement to Gateway page** to allow gateway AMI image name to be displayed. This is useful to identify if a gateway runs on older AMI image that needs replacement to newer AMI image. 

R5.4.1140 (4/21/2020)
======================

- **Support More AWS TGW Peering Regions** Newly available regions of AWS TGW Peering is now supported. 
- **User VPN Customizing Notification** You can now customize pop up messages after a VPN user is connected. To configure, go to OpenvVPN -> Advanced -> System Use Notification. One use case is for customer to write their own messages for compliance. Please ensure that you are running Aviatrix VPN Client version 2.9 or higher to view the usage notification
- **VPN DPD Interval Configuration** allows you to specify DPD interval. API support only.
- **Gateway Default Memory Alert Threshold** is changed to 80% to provide earlier warning to the Controller admin. 
- **Change Gateway Default Size** at launch time to t3.small.
- **Bug fix** User VPN to Save Configuration Template to allow multiple gateways to have the same configuration when attached to the same NLB. 
- **Performance Optimization** in handling the route programming time for large deployment of Aviatrix Transit Gateway peering. 
- **CloudN Enhancement** in handling tunnel down message with Insane Mode. 

R5.4.1074 (4/3/2020)
=====================

- **Bug fix** Restore a list of APIs that was deleted incorrectly. 

R5.4.1066 (4/1/2020)
=====================

1. Operations
------------------

- **Role Based Access Control** allows you to both limit access to the Controller functions and enable self-service for users with different permission privileges. Read `RBAC FAQ <https://docs.aviatrix.com/HowTos/rbac_faq.html>`_ for more details. 

2. Networking 
----------------

- **User VPN Performance Improvements** improves gateway performance when User VPN is enabled on the gateway. To receive enhanced performance, replace an existing gateway or launch a new gateway with `VPN Access <https://docs.aviatrix.com/HowTos/gateway.html#vpn-access>`_ enabled.   
- **Aviatrix Transit Network Spoke Gateways to Support SNAT/DNAT Functions** enable you to support additional use cases in Aviatrix Transit network. These use cases are `"accessing cloud applications with virtual IP addresses" <https://docs.aviatrix.com/HowTos/transit_for_publicIP.html>`_ and `"connecting overlapping addresses from on-prem to Spoke VPCs in ActiveMesh network" <https://docs.aviatrix.com/HowTos/transit_solution_activemesh_spoke_snat_dnat_rfc1918.html>`_.  
- **Azure Virtual WAN Integration with CloudWAN** expands Aviatrix CloudWAN solution to allow branch office Cisco IOS routers to automatically connect to Azure Virtual WAN by automatically programming IPSEC and BGP on IOS routers.  
- **Azure Gateways Enhancement** Azure gateways is now launched by the Controller managed disk option instead of storage account for enhanced security. 
- **User VPN Profile Multi Attribute Support** allows multiple attributes to be specified in the SAML IDP user database. Simply include a list of the names of User VPN Profiles in the user data profile field at the IDP database. 

3. Security Integration
-------------------------

- **CheckPoint CloudGuard Integration** now supports CloudGuard All-In-One R80.40. In addition, the initial SSH access process is removed for all CloudGuard AMIs. Check out `CheckPoint CloudGuard Configuration Examples <https://docs.aviatrix.com/HowTos/config_CheckPointVM.html>`_ for more details. 
- **FortiGate Bootstrap Configuration** is now supported. For details on how to configure, read `Bootstrap Configuration Example for FortiGate Firewall <https://docs.aviatrix.com/HowTos/fortigate_bootstrap_example.html>`_.

R5.3.1551 (6/4/2020)
======================

- **Bug fix** Change user password should require login CID. 
- **Enhancement** Multiple enhancement back porting to 5.3. 


R5.3.1524 (4/26/2020)
========================

- **Bug fix** Enhancement for Controller migration.
- **Bug fix** CloudN missing routes after Transit Gateway is rebooted. 

R5.3.1516 (4/3/2020)
======================

- **Bug fix** Transit Peering not learning routes correctly when remote transit peering configured static routes. 
- **Bug fix** Back out auto refresh of BGP sessions after upgrading. 
- **Enhancement** to the ability to update Aviatrix Transit VPC CIDR. 

R5.3.1499 (3/17/2020)
=======================

- **Bug fix** FQDN statistics on the dashboard could cause the Controller to freeze. 
- **Bug fix** Cannot edit network CIDRs in Site2Cloud configuration. 
- **Bug fix** Azure FireNet firewall instance launch with enforcement for username/password. 
 
R5.3.1491 (3/11/2020)
=======================

- **Bug fix** Gateway launch failure triggered rollback function delete all VPC routes. 
- **Bug fix** GCP VPN gateway shows in unhealthy state when it is still forwarding traffic.
- **Bug fix** Azure gateway floods with IPSEC keep alive messages.

R5.3.1468 (3/4/2020)
======================

- **Bug fix** for Controller Migration feature.

R5.3.1428 (2/21/2020)
=======================

- **Bug fix** AWS GovCloud IAM roles is broken.

R5.3.1399 (2/20/2020)
======================

- **Bug fix** CloudWAN gateway instance not programming ingress security group. 
- **Enhancement** to support Azure Africa region.

R5.3.1391 (2/17/2020)
========================

**Important Notice**
----------------------

Release 5.3 is the last software version that supports older Controller AMIs. If your Controller AMI is one of the following, we have
provided an `one click migration <https://docs.aviatrix.com/HowTos/controller_migration.html>`_  to migrate to a new Controller after the Controller is upgraded to 5.3. The following Controller AMIs requires
migration beyond release 5.3:

 - Controller AMI ID contains "aviatrix_cloud_services_gateway_081517"
 - Controller AMI ID contains "aviatrix_cloud_services_gateway_111517"
 - Controller AMI ID contains "aviatrix_cloud_services_gateway_043018"

1. AWS Transit Gateway (TGW) Orchestrator
--------------------------------------------

 - **AWS Transit Gateway (TGW) Inter Region Peering** Allows you to connect TGWs deployed in different regions by using the native AWS TGW Inter Region Peering. Aviatrix solution enables you to implement Security Domains in a global fashion where you can specify a Security Domain in one region to connect a Security Domain in a different region. Read more on `TGW Inter Region Peering <https://docs.aviatrix.com/HowTos/tgw_plan.html#tgw-inter-region-peering>`_.
 - **Update Spoke VPC CIDR** applies to an attached Spoke VPC and allows you to update Spoke VPC CIDR after it is attached to TGW, for example, new subnets or route tables are added to the Spoke VPC. To configure, go to TGW Orchestrator -> List, select the Spoke VPC, click the 3 dots skewer and select Update Spoke VPC CIDR. 
 - **Edit Spoke VPC Customized Routes** allows you to edit Spoke VPC route table entries that target to TGW. To configure, go to TGW Orchestrator -> List, select the Spoke VPC, click the 3 dots skewer and select Edit Spoke VPC Customized Routes.
 - **Edit Spoke VPC Advertised Routes** allows you to advertise to TGW via Controller a different set of routes other than the default VPC CIDR. To configure, go to TGW Orchestrator -> List, select the Spoke VPC, click the 3 dots skewer and select Edit Spoke VPC Advertised Rotues to edit. 
 - **A Spoke VPC to Attache to Multiple TGWs** allows you to attach a Spoke VPC to multiple TGWs as long as the VPC route tables do not have conflicting route entries.
 - **Spoke VPC Reachability** shows all VPCs and attachments that a given Spoke VPC can reach by `Connection Policies <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-connection-policy>`_. To view, go to TGW Orchestrator -> List/Edit, highlight one attachment, select Attachment Reachability at the 3 dots skewer. 

2. Networking 
--------------------

 - **CloudWAN Tags** allows you to create a tag (template) that consists of list of CLI configuration commands and applies to routers that are attached to it. The use case is if you need to customize CLI commands that are outside the automated BGP & IPSec configuration by CloudWAN, you can do so by creating one or more tag and apply to the routers at once. To learn more, read `CloudWAN Tags <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#configuration-tags>`_. 
 - **CloudWAN Saves & Restore Config Versions** Allows you to save and restore a complete IOS configuration for a branch router. To learn more, go to `Save & Restore Config <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#save-config>`_.
 - **Use NLB to load balance UDP based User VPN** allows you to use AWS Network Loadbalancer for UDP traffic to scale out User VPN solution. The advantage for the deployment is improved throughput performance comparing to TCP based VPN solution.  

3. Security
--------------

 - **PrivateS3** allows you to whitelist S3 buckets access from on-prem over AWS Direct Connect private VIF without data leakage. If you transfer data to/from S3 using the high bandwidth Direct Connect, currently there is no solution to do so without the risk of data being transferred to unauthorized S3 buckets.  To learn more, read `PrivateS3 FAQ <https://docs.aviatrix.com/HowTos/privateS3_workflow.html>`_ 
 - **Aviatrix Transit Gateway Edge Segmentation** allows you to specify which `Aviatrix edge VPN connection <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ can communicate with which Security Domain in TGW deployment. To learn more, read `Edge Segmentation <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-edge-segmentation>`_.
 - **Aviatrix Transit FireNet for Azure** allows you to deploy firewall instances in Azure. For more information, check out `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_.
 - **Check Point CloudGuard** can be launched from Aviatrix Controller for FireNet use case. The Controller monitors the firewall instances' health and automatically detach the unhealthy instance and reattach when it becomes healthy. Note static routes need to be programmed on the firewall instances. 
 - **Fortinet FortiGate** can be launched from Aviatrix Controller for FireNet use case. The Controller monitors the firewall instances' health and automatically detach the unhealthy instance and reattach when it becomes healthy. Note static routes need to be programmed on the firewall instances.
 - **FireNet Fail Close** provides an option to FireNet gateway to drop packets when no firewall instances are attached. To enable, go to Firewall Network -> Advanced, highlight one FireNet gateway, click the 3 dots skewer. At Fail Close, click Enable.

4. Operation
-------------

 - **Approval for BGP Learned Routes** Enables you to explicitly make a decision if a dynamically learned routes be allowed to propagate to your cloud network. One use case is to apply this feature to a TGW VPN/DXGW that connects with a partner network where you can control which learned routes are allowed to propagate. This feature applies to both AWS TGW and Aviatrix Transit Gateway dynamically learned routes. To learn more, check out `Approval for TGW <https://docs.aviatrix.com/HowTos/tgw_approval.html>`_ and `Aviatrix Encrypted Transit Approval <https://docs.aviatrix.com/HowTos/transit_approval.html>`_.
 - **FlightPath to support IP address** allows either source or destination to be IP address based. This enables you to troubleshoot connectivity to, for example, on-prem host with a certain IP address. 
 - **FlightPath for Azure** allows you to troubleshoot connectivity issues in Azure in a much faster way by pulling relevant information at once and present in a side by side panels. It also provides expert diagnostics to identify problems. To use, go to Troubleshoot -> FlightPath. 
 - **FlightPath for GCP** allows you to troubleshoot connectivity issues in GCP in a much faster way by pulling relevant information at once and present in a side by side panels. It also provides expert diagnostics to identify problems. To use, go to Troubleshoot -> FlightPath.
 - **Dynamically display packets while packet capture is on** allows you to view the packet summary on the Controller console while they are being captured. 
 - **User VPN Cert Issue Date** displays the date of a VPN user creation. The display is on the Dashboard page. 
 - **User VPN Client Software Control** allows you to set a minimum Aviatrix VPN client software version that is allowed to connect successfully. To configure, go to OpenVPN -> Edit Config -> MINIMUM VPN CLIENT VERSION to set the Aviatrix VPN client version.
 - **Migrate Controller** allows you to migrate your Controller AMI image from older opensource OS versions. To migrate, go to Settings -> Maintenance -> Migration.

R5.2.2153 (2/7/2020)

 - **Enhancement** to reduce the number of alert emails. 
 - **Enhancement** to reject an on-prem learned route if it is a subset of cloud network CIDR. 

R5.2.2122 (1/25/2020)
========================

 - **Enhancement** Allow site2cloud gateways to support Active-Active mode where both tunnels are up and packets are routed to both gateways via respective VPC route tables. To enable, go to Site2Cloud, click on the connection, scroll down to Active Active HA and click Enable. 
 - **Enhancement** Allow the service account credential to be re-used by GCP projects. 
 - **Bug fix** Fix Azure gateway memory leak issue. 
 - **Bug fix** Enhancement to FQDN warning messages.
 - **Bug fix** Fix issue with Spoke VPC with Customized routes on non ActiveMesh encrypted transit network. 
 - **Bug fix** Fix issue with Customized DNS server not restored when after backup/restore. 

R5.2.2092 (1/15/2020)
=======================

 - **Bug fix** Aviatrix Active Mesh Transit Gateway takes exception when building Transit Peering. 

R5.2.2071 (1/10/2020)
=========================

 - **Bug fix** on-prem adverting the default route 0.0.0.0/0 via TGW DXGW is not propagated through Aviatrix Transit Peering. 
 - **Bug fix** Fix exception when using "Export to Terraform" feature with Aviatrix created VPC resource. 
 - **Enhancement** to reduce failover time for Connected Transit deployment.

R5.2.2047 (12/19/2019)
========================

 - **Bug fix** Azure China upgraded to upgrade from 5.1 to 5.2.
 - **Bug fix** Aviatrix Transit Gateway with multiple Spoke Gateways exhibits memory leaks. 
 - **Bug fix** GCP gateway replacement function fails.
 - **Bug fix** GCP gateway names, VPC route table tables and route entry names can exceed cloud provider's limits. 
 - **Bug fix** Failed to delete IPSec policy when deleting Spoke to Spoke peering. 
 - **Enhancement** Add remote troubleshoot support on CloudN.

R5.2.2011 (12/06/2019)
========================

- **Customize Network Filtering of FQDN** Allow configuration to customize the network CIDRS to not be included in FQDN filtering. One use case is if on-prem requires certain network CIDRs to skip FQDN filtering. To configure, go to Security -> Egress Control -> Egress FQDN Filter. Select Customize Network Filtering.


R5.2.1991 (12/04/2019)
===========================

Security
------------------------------

 - **Transit FireNet** Firewall Network for AWS Encrypted Transit VPC. Transit FireNet integrates Firewall Network function into the Aviatrix Transit Gateway function. With this new capability, you can deploy firewall instances into the encrypted transit network to allow security policy management and IDS/IPS functions. To learn more, refer to `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_.  
 - **Public Subnet Filtering** provides the packet filtering capability to instances deployed in AWS VPC public subnets. Leveraging the AWS Ingress Routing service, the Public Subnet Filtering gateway filters out the malicious IP addresses detected by Amazon GuardDuty. Additionally, the filtering gateway provide FQDN functions for Egress traffic from the public instances. To configure, go to Security -> Public Subnets. Refer to `Public Subnet Filtering Gateway FAQ <https://docs.aviatrix.com/HowTos/public_subnet_filtering_faq.html>`_ for more information.   
 - **Independent Verdict for Each Egress Control Rule** allows you to apply Allow or Deny to each FQDN rule. The use case is if you have a large set of FQDN names that should be allowed but only a small subset be denied, you can avoid inputting a large set of rules by creating a Deny rule of the small subset and one Allow rule with wild card for the large set. To configure, go to Security -> Egress Control. Select a tag, click Edit and add new rules. For more information, refer to `Base Policy <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#base-policy>`_.
 - **FireNet Performance Improvement** FireNet performance achieves 40Gbps throughput. For details, check `this link. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#what-is-the-maximum-performance-firenet-can-achieve>`_
 - **Palo Alto VM-Series Multiple Versions** can be launched from the Aviatrix Controller. The use case is companies with policy of not using the latest software releases. To configure, follow the `Firewall Network Workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_.
 - **API Support for Stateful Firewall Rules Update** allows individual rule to be inserted, appended and deleted. 

Networking
-------------

 - **Aviatrix CloudWAN** provides two capabilities. It centrally manages Cisco IOS routers from the Controller by allowing you to program and edit the IOS CLIs, monitoring the routers' metrics and reachability. It also automatically connects the Cisco IOS routers to the Transit Network with the shortest latency by integrating AWS Global Accelerator. For more information, check out `Cloud WAN FAQ <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html>`_. The use case is to manage and connect the already deployed millions of Cisco IOS routers in the least fiction way and minimum human errors. 
 - **BGP AS_PATH Prepend for Transit Gateway Peering** allows the on-prem learned routes to be propagated to the Transit peering routes along with the AS_PATH information. This feature requires no configuration. 
 - **Consider AS_PATH for Next Hop Decision** enhances the next hop routing decision when the Transit Gateway make decisions. Previously when multiple remote sites advertise the same network CIDRs, Aviatrix Transit Gateway routes with ECMP. With this enhancement, the Transit Gateway selects the shortest AS_PATH length as the preferred routes. Only when remote sites advertises with the same AS_PATH lengths the Transit Gateway routes based on ECMP. This feature requires no configuration. 

Operations
------------

 - **FQDN Dashboard** displays statistics of egress bound destination FQDN names both accepted and rejected. You can further deep dive to see the statistics for each gateways. To view the statistics, go to Dashboard and scroll down to FQDN Stats. 
 - **Flightpath** to include ActiveMesh Spoke Gateways, ActiveMesh Transit Gateways and peering gateways.  
 - **Selective Gateways for Logging** allows to not to have to enable all gateways for logging events. To configure, go to Settings -> Logging, select a log service, click Advanced to edit the list of the gateways to forward the log to the log service. By default, all gateways are included. 
 - **Show Deployment per Access Account** displays what is deployed, for example, the number of encrypted Spoke Gateways, the number of VPC attachment, the number of FQDN gateways and the site2cloud tunnels, deployed for each access account. The use case is to gain visibility of the Aviatrix usage per each account and helps to charge back to teams who are part of the deployment. To view, go to Access Accounts, highlight one access account, click on the three dots skewer, click Show Deployment.
 - **TGW Route Auditing** allows you to immediately discover the missing routes in Spoke VPC route tables and its associated TGW route tables. To use, go to TGW Orchestrator -> List. Highlight one attachment, click the three dots and click Audit Routes.
 - **TGW Audit** expands its capability to audit all route entries of attached VPC route tables in addition to route entries in TGW route tables. To use, go to TGW Orchestrator -> Audit. Select one TGW and click Run On-Demand Audit. 

R5.1.1183 (12/2/2019)
=======================

 - **Bug fix** BGP learned routes parsing error. 
 - **Bug fix** Transit Peering filter not updating new learned routes. 

R5.1.1169 (11/25/2019)
=======================

- **Bug fix** Transit Gateway filter does not work properly 

R5.1.1016 (11/21/2019)
=======================

 - **Bug fix** Fix firewall instance launch failure in AWS Hong Kong region.
 - **Bug fix** NTP configuration corruption fix. 

R5.1.989 (11/17/2019)
=======================

 - **Enhancement** Controller does not allow Transit Gateway peering when multiple Transit Gateways are in the same VPC. 
 - **Bug fix** Gateways fail to forward syslog to remote syslog server when Controller cannot reach the syslog server. 
 - **Terraform enhancement** Add Terraform Export for aviatrix_firewall_instance, aviatrix_firenet_resources, aviatrix_firenet.
 - **Bug fix** Export to Terraform feature is broken.

R5.1.973 (11/6/2019)
======================

 - **Bug fix** ActiveMesh does not report tunnel counts to AWS when Metered AMI is deployed. 
 - **Bug fix** Aviatrix Transit Gateway peering does not report tunnel counts to AWS when Metered AMI is deployed. 

R5.1.969 (11/3/2019)
======================

 - **Enhancement** Import VPN users now include user profile field. 
 - **Bug fix** Azure native peering is broken. 
 - **Bug fix** FireNet gateway does not load balance UDP traffic. 
 - **Bug fix** Cannot detach Spoke Gateway when customized CIDRs feature is configured on the Spoke Gateway. 
 - **Bug fix** Fail to import user via CSV file when Geo VPN and SAML are enabled. 

R5.1.962 (10/29/2019)
=========================

 - **Bug fix** Aviatrix Controller API calls cause Panorama to become unusable overtime as Panorama fills up its desk space. This is a must fix that impacts all FireNet deployment with Panorama. 
 - **Bug fix** FireNet does not load balance UDP packets correctly. This is a must fix that impacts all FireNet deployment where UDP traffic such as DNS, goes through the FireNet.  
 - **Bug fix** ActiveMesh Transit Gateway stops forwarding packets when forwarding from one VTI interface to another. This is a must fix that impacts all multi sites ActiveMesh Transit Gateway deployment.
 - **Bug fix** Transit VPC route propagation gets disabled when other Transit VPN connection is deleted. This is a must fix that impacts all multi sites ActiveMesh Transit Gateway deployment. 

R5.1.943 (10/25/2019)
=======================

 - **Bug fix** Hostname is blocked in VPN profile policy configuration. Revert the change. 
 - **Bug fix** Transit Gateway peering is missing on dashboard. 

R5.1.935 (10/19/2019)
==========================

Transit Gateway Enhancement
------------------------------

 - **Transit Gateway Peering with Network Filter** allows you block route propagation from one Transit Gateway side to the other. This use case is to allow two regions of transit network to connect with each other when there are exact overlapping network CIDRs by blocking on each Transit Gateway these CIDRs. To configure, go to Transit Network -> Transit Peering -> Add New, or Edit an existing peer. For more info, refer to `Filtered CIDRs <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#filtered-cidrs>`_.

 - **Route Table Selection** allows VPC route tables to be selected when attaching attaching a Spoke VPC gateway. Only the selected route tables are programmed for learning routes and reprogramming routes at failover time. API support only.

 - **TGW DXGW and VPN Enhancement** allows DXGW and VPN to be deployed in any Security Domain. One use case is if you have multiple VPN connection and do not wish to have the remote sites to have connectivity with each other, you can now create VPN connections in different Security Domains. 
 - **ASN Path Prepend** adds ASN number when Aviatrix Transit Gateway redistribute routes to its BGP peer. For new Transit connection, the Aviatrix Transit Gateway automatically inserts its ASN number. To insert ASN path in an existing connection, go to Transit Network -> Advanced Config -> Prepend AS Path

Security
------------

 - **Force_Drop Function** in stateful firewall rule to allow immediate packet dropping on established sessions. 
 - **Stateful Firewall Port Configuration Enhancement** allows you to add multiple port numbers and multiple port ranges separated by comma in the same rule. 
 - **FQDN for non TCP 443 SSL protocol** allows you to execute FQDN filtering function for HTTPS traffic running on non TCP port 443. The use case is for HTTPS based applications that need to access Internet sites on non TCP port 443. To configure, select HTTPS as the protocol and input a specific TCP port. With is feature, you can configure wild card. 

Operations
------------
 - **IAM Policy Auto Update** allows you to update secondary accounts to the latest IAM policy from the Controller console. To configure, go to Accounts -> Access Accounts. Select an account, click the 3 dots skewer and click "Update policy"
 - **New Dashboard Panel** displays what has been built and if they are healthy.  

R5.1.845 (10/8/2019)
=====================

- **Bug fix** Prevent upgrade from 4.7 to 5.1 directly without going through 5.0 release. 
- **new API** for selecting firewall instance size.
 

R5.1.842 (10/1/2019)
=====================


1. FireNet Network Enhancement
---------------------------------

 - **Firewall Network load balancing from TGW** allows both primary gateway and backup gateway to present its ENI interface so that packets initiated from the Spoke VPCs can be forwarded to both gateways in the AZ affinity or nearest AZ affinity fashion.  
 - **Management access from On-Prem** allows on-prem to connect with private IP address of the firewall device deployed in the Native Firewall Domain, Native Egress Domain and Aviatrix Firewall Domain. To enable, go to TGW Orchestrator -> List, highlight the firewall domain, click Edit, click to enable. Note in this release, both accessing from on-prem via Aviatrix Edge Domain and accessing from TGW plus DXGW/VPN are supported.
 - **Improve FireNet gateway failover time** to be under 16 seconds. 

2. Networking
-----------------
 - **Aviatrix ActiveMesh** is officially available.

R5.0.2782 (9/30/2019)
=======================

 - **Bug fix** Disable Account Audit and Gateway Audit features that cause memory leak in controller. 

R5.0.2773 (9/20/2019)
=======================

 - **Bug fix** GovCloud does not support m4.xlarge on Palo Alto Networks VM-Series, fixed the issue with m5.xlarge instance type. 
 - **Bug fix** Multiple gateway security groups can cause gateway audit to generate false alarm. 

R5.0.2768 (9/18/2019)
========================

 - **Bug fix** FQDN process may take 2 to 5 minutes to restart when a new URL rule is updated. 

R5.0.2754 (9/16/2019)
=======================
 
- **Bug fix** for Oracle Cloud Infrastructure (OCI).

R5.0.2667 (9/9/2019)
=========================

1. Automation & Operations
----------------------------

 - **Official Terraform Provider** Aviatrix has become the official Terraform provider! Visit `Aviatrix Provider <https://www.terraform.io/docs/providers/aviatrix/index.html>`_. Terraform v0.12 is needed, please visit `Compatibility Chart <https://www.terraform.io/docs/providers/aviatrix/guides/release-compatibility.html>`_, `Terraform Provider 2.x Upgrade Guide <https://www.terraform.io/docs/providers/aviatrix/guides/v2-upgrade-guide.html>`_.
 - **New API site** visit `api.aviatrix.com <https://api.aviatrix.com/?version=latest>`_ to see our brand new API doc site!
 - **Access Account Audit** continuously monitors the health of Controller and individual access account. The Controller sends email alert to the admin user and logs the event when errors in the account setting are detected.
 - **Gateway Audit** continuously monitors the status of gateway cloud credentials and security groups. For AWS, this credential is the gateway's IAM roles and policies. The Controller sends email alert to the admin user and logs the event when errors of gateway cloud credentials are detected. To view the health of the gateway, go to Gateway page and check the field `Audit. <https://docs.aviatrix.com/HowTos/gateway_audit.html>`_
 - **Logs display the source IP address when a user login** to improve visibility.
 - **Logs display the latest at the top of the screen** for ease of use. The logs include Site2Cloud diagnostics messages and command log messages.
 - **Export VPC Tracker to XML** allows you to download in Excel form all VPCs the Controller retrieves. To download, go to Useful Tools -> VPC Tracker, click the refresh button and then click Export to CSV.
 - **Bulk import/export VPN Users** Allow onboarding VPN users in volume.
 - **Gateway restart** is a feature that when Controller detects a gateway goes down and initiates a failover, and in the meantime restart the failed gateway to recover its state. This feature is enabled by default on all gateways.

2. Multi Cloud
-----------------

 - **Azure Transit with Native Spoke VNet Support** Allows you to build a transit solution without launching an Aviatrix gateway in the Spoke VNet. The solution leverages the Azure native peering capability for the traffic between Spoke VNet and Transit VNet, it also leverages the Controller to propagate learned routes directly to Spoke VNet. Follow the `Transit Network Workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to get started by launching an Aviatrix Transit GW. Attach a Spoke VNet at `Step 6b <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering>`_. 
 - **Azure Transit Insane Mode Support** expands our `Insane Mode Encryption Service <https://docs.aviatrix.com/HowTos/insane_mode.html>`_ to Azure networks. The support include Insane Mode encryption over Express Route, Insane Mode for VNet to VNet encrypted peering and Transit Peering connections. Launch an Azure gateway with Insane Mode enabled to get started. 
 - **GCP Transit Gateway Support** expands our `Transit Network Solution <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to Google GCP. Follow the `Transit Network Solution <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ instruction to get started. 
 - **Oracle Cloud (OCI) Spoke Gateway Support** expands our Transit Network Solution to OCI Spoke Gateways. 

3. Networking
----------------

 - **IKEv2 support for Site2Cloud connections** expands site2cloud function to support IPSEC IKEv2. Follow the `site2cloud instructions <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ to get started. 
 - **IPv6 Support** enables an Aviatrix gateway to have IPv6 address. One use case is to leverage the unique addressing of IPv6 to solve overlapping network CIDR problem in the cloud networks. IPv6 is supported on User VPN function and Encrypted Peering function. To enable, go to Gateway page, select the gateway, click Edit. Scroll down to IPv6 and click Enable. Refer to `Aviatrix IPv6 <https://docs.aviatrix.com/HowTos/gateway.html#ipv6>`_ for more details. 
 - **Insane Mode over Internet** allows you to leverage the existing high speed Internet to build high performance encryption.
 - **User VPN Support two way communication** between client and cloud instances by disabling VPN gateway NAT function and program the VPC route table for traffic initiated from VPC to route back to your VPN desktop. 

4. Security
------------
 
 - **FQDN Applies to Private Domain Names** allows you to apply FQDN filter on Domain Names that resolve to private IP addresses. The use case is if you have host names that are on the private network and you need to apply whitelist filter. This is a global capability that applies to all FQDN tags. To enable, go to Egress Control -> Egress FQDN Filter, click "Enable Private Network Filter".
 - **Multi Wildcard for FQDN** allows the FQDN gateway to match more relaxed expressions, such as a-*.b*.com.
 - **FireNet for GovCloud** is available. Follow the instructions for `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to get started.
 - **Aviatrix FQDN gateway for FireNet** enables Aviatrix FQDN function to be centrally deployed in AWS Transit Gateway (TGW) environment. One use case is to limit the number of EIPs of egress packets to specific sites that require whitelist of source IP addresses. To enable, follow the `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ and deploy Aviatrix FQDN gateway at `Step 7c <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#c-launch-associate-aviatrix-fqdn-gateway>`_. Note only Egress Control for Internet bound traffic is supported.    
 
5. AWS Transit Gateway (TGW) Enhancement
-----------------------------------------
 - **Disable Spoke VPC local CIDR propagation** is an optional feature that when enabled the Spoke VPC CIDR is not propagated to TGW route table when the Spoke VPC is attached to TGW. One use case is to allow multiple VPCs to be in one Security Domain (share one TGW route table) without the connectivity between them, thus reducing the need to createe a large number of Security Domains in order to build isolation. This optional feature is enable when attaching a VPC at `TGW Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_.
 - **Select Spoke VPC route table for programming** is an optional feature that allows you to select which Spoke VPC route tables will be programmed of learned routes propagated from on-prem or other Spoke VPCs. One use case is that certain instances in the VPC do not participate the TGW Orchestrator.  
 - **Management access from On-Prem** allows on-prem to access privately (SSH or HTTPS) the firewall device deployed in the Native Firewall Domain, Native Egress Domain and Aviatrix Firewall Domain. To enable, go to TGW Orchestrator -> List, highlight the firewall domain, click Edit, click to enable.Note in this release, only accessing from on-prem via Aviatrix Edge Domain is supported. Accessing from TGW plus DXGW/VPN are not supported.  

6. ActiveMesh and Multi-Site Transit Beta
--------------------------------------------

Learn `Aviatrix Transit ActiveMesh Mode <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_.  Contact Aviatrix sales or support team for preview on ActiveMesh and Multi-site Transit Network. 


R4.7.590 (8/23/2019)
======================

 - **Bug fix** When attaching a Spoke VPC to TGW, VPC route table did not handle the case when there is AWS end point. 
 - **Bug fix** When connecting Transit Gateway to external device, Transit Gateway did not handle the case if on-prem router's advertised routes is a super set to the IPSEC end point IP address. 
 - **Bug fix** The profile attribute handling for SAML user VPN client did not consider error cases when profile attribute is absent or does not produce a match. 
 

R4.7.581 (8/11/2019)
=======================

 - **Transit peering for two Transit Gateways in the same VPC** removes the constraint that Transit Peering can only take place on two Aviatrix Transit Gateway in two different VPCs. The use case is if you have deployed two individual transit networks in the same VPC, now you can connect them by implementing Transit Gateway Peering. 


R4.7.501 (7/22/2019)
=======================

 - **Software update for Field Notice 0005** as described in `this document  <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0005-2019-07-22>`_. This software update applies to all customers who use Aviatrix Client VPN software for SAML authentication, and both Aviatrix Client VPN software and Controller are required to upgrade. If you use Aviatrix Client VPN software for non SAML authentication, you are not affected by the issues described in the Field Notice 0005.


R4.7.494 (7/14/2019)
======================

 - **Spoke VPC Gateway Attach Behavior** is modified such that when a Spoke Gateway is attached to the Aviatrix Transit GW, RFC 1918 routes are programmed. Conversely when a Spoke VPC gateway is detached from the Aviatrix Transit GW, all learned routes are deleted. Such behavior change simplifies migration process from Aviatrix Encrypted Transit architecture to AWS Transit Gateway (TGW) based transit architecture. Backward compatibility is ensured.
 - **Azure Gateway Launch** no longer creates a new resource, instead it now re-uses VNET resource. The use case is customers already created a resource group when creating a VNET. 
 - **Add Aviatrix Tag for Cross Account VPC Attachment** allows you to identify in the TGW route table Aviatrix attachment resource when the Spoke VPC is in a different AWS account.  
 - Bug fix that removes the unnecessary restarts of BGP process after software upgrades.  

R4.7.473 (7/7/2019)
================================================

 - **Palo Alto VM-Series Bootstrap function support** allows firewall instance to retrieve initial VM-Series configuration and policies stored in S3 bucket. The use case is to improve automation by allowing the VM-Series to load the initial policy configuration. For more information, refer to `VM-Series Bootstrap integration. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#example-configuration-for-bootstrap>`_
 - **Palo Alto VM-Series Panorama integration** allows firewall instances to be managed by Panorama. The use case is to have Panorama to centrally manage all firewall deployment both on-prem and in the cloud. For more information, refer to `Panorama integration. <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html#managing-vm-series-by-panorama>`_
 - **EIP Allocation for Transit Gateway** allows a Transit Gateway to be associated with an already allocated EIP. The use case is to manage the Aviatrix gateway EIP the same way you would manage your EC2 deployment EIPs, as they are all in the same pool. 
 - **Insane Mode Gateway Resizing** allows you to resize Insane Mode gateway after it is launched. This provides the flexibility of to manage instance cost when running Insane Mode. 

R4.7.419 (6/30/2019)
===============================================

 - bug fix for "Customize Spoke VPC advertising CIDR".
 - error checking for TGW VPN configuration parameters.


R4.7.378 (6/16/2019)
=====================

1. AWS Transit Gateway Orchestrator
-------------------------------------

 - **AWS TGW Egress/Ingress Domain** allows you to create a central egress network architecture without requiring to launch Aviatrix FireNet gateway. Aviatrix Orchestrator programs the necessary Spoke VPC route tables and TGW route tables to make sure Internet bound traffic from Spoke VPCs are forwarded to the VPC in egress domain. One use case for native egress domain is to reduce the number of EIPs you may have to whitelist to accessing third party SaaS service. In the egress domain, you can deploy `Aviatrix FQDN gateway <https://docs.aviatrix.com/HowTos/fqdn_faq.html>`_ or a virtual appliance to handle Internet bound traffic. Note in this network architecture, there is no built in scale out and redundancy as it is the case for Aviatrix Firewall Network. To configure, select "Native Egress/Ingress Domain" when `creating a New Security Domain <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain>`_ at the TGW Orchestrator Plan. 

 - **AWS TGW Firewall Domain** provides the firewall network architecture without requiring to launch Aviatrix FireNet gateway. Aviatrix Orchestrator programs the necessary Spoke VPC route tables and TGW route tables to make sure traffic that requires inspection is forwarded to the firewall security domain. One use case is to run a virtual appliance for packet inspection. Note in this network architecture, there is no built in scale out and redundancy as it is the case for Aviatrix Firewall Network architecture. To configure, select "Native Firewall Domain" when `creating a New Security Domain <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain>`_ at the TGW Orchestrator Plan.

 - **Customize Spoke VPC Route Table** allows you to program route entries in Spoke VPC route table that points to TGW as target. By default, Aviatrix Orchestrator programs RFC 1918 routes in the VPC route table to point to TGW, any routes that are outside of this range is dynamically programmed into the VPC route table. When you enable this feature, all dynamic route propagation will be stopped. One use case is if you simply want to program the default route to point to TGW. Another use case is if you do not wish Aviatrix Orchestrator to program any VPC routes, in which case you should enter 0.0.0.0/32 for the "Customizing Spoke VPC Rotues" field. To configure, enter a list of comma separated CIDRs at `Attach VPC to TGW <https://docs.aviatrix.com/HowTos/tgw_build.html#attach-vpc-to-tgw>`_ during TGW Orchestrator Build. 

 - **Customize TGW VPN Creation** with additional parameters, such as inside_ip_cidr and pre_shared_key.

2. Insane Mode Enhancement
----------------------------

 - **Insane Mode Dynamic Bandwidth Adjustment** significantly reduces Insane Mode tunnel switch over probability by automatically removing the failed encryption lane from the load balancing pool while keeping the remaining encryption lanes to continue to forward the traffic. After the failed lane is brought back up, it is then added back to the load balancing pool. Only when 50% of the lanes fail should the Controller declare the tunnel down and switch over to the backup tunnel.  

3. FQDN Enhancement
---------------------------------

 - **Performance Enhancement** to handle traffic burst. FQDN and system memory pool are significantly increased to handle large burst traffic. 


R4.6.587 (5/29/2019)
=====================

1. Networking
-------------------

 - **AWS Transit Gateway Orchestrator for VPN Integration** brings native TGW VPN connection to the Aviatrix Controller Orchestrator. Aviatrix Orchestrator periodically polls TGW route table learned routes from VPN connection and then programs the attach Spoke VPC route tables. One use case is for TGW VPN to connect to on-prem or a third party VPC via IPSec. To configure, follow the `TGW Plan workflow for VPN <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-vpn-connection>`_. 
 - **AWS Transit Gateway Orchestrator for Direct Connect Integration** brings native TGW DXGW cocnnection to the Aviatrix Controller Orchestrator. Aviatrix Orchestrator periodically polls TGW route table learned routes from Direct Connect Gateway connection and then programs the attach Spoke VPC route tables. One use case is for TGW DXGW to connect to on-prem. To configure, follow the `TGW Plan workflow for Direct Connect <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-direct-connect>`_.`
 - **Support multiple Firewall Network domains attached for the same TGW**. The use case is to separate VPC to VPC inspection from egress/ingress inspection. There is no User Interface change. To configure, follow the `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_. Check out `this design pattern <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#firenet-deployment-model-6>`_ for how to use multi Firewall Networks in TGW environment. 

2. AWS GovCloud
------------------

 - **AWS GovCloud Encrypted Transit** allows you to setup and operate an end-to-end encryption in a transit network. To configure, follow the `Encrypted Transit Network workflow. <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
 - **AWS Transit Gateway Orchestrator for GovCloud** allows you to setup and operate AWS Transit Gateway based transit network. To learn more, follow the `AWS Transit Gateway Orchestrator <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.
 - **AWS Native Peering for GovCloud** supports AWS native peering in GovCloud. To configure, follow `this link. <https://docs.aviatrix.com/HowTos/peering.html#aws-vpc-peering>`_
 - **Backup & Restore for GovCloud** is the best practice to operate Aviatrix solution. Make sure you enable this feature. 

3. Compliance
--------------
 - **FIPS 140-2 Compliant module** allows you to install and operate FIPS 140-2 Crypto Module for SSL library. To learn more, check out `this document. <https://docs.aviatrix.com/HowTos/fips140-2.html>`_
 - **Security Patch status display** enhances the Security Patch function by displaying the patch status. 

R4.3.1275 (Patch release of 4.3 on 5/20/2019)
===============================================

 - Bug fix for Transit Gateway External Device connection option where on-prem end point uses local link address 169.254.0.0/16.
 - Bug fix for FQDN HTTP protocol handling. 
 - Bug fix for Transit Peering switch over.


R4.3.1262 (Patch release of 4.3 on 5/13/2019)
=============================================

 - **User Selected Subnet Attachment to TGW** allows you to customize the subnet/AZ of a VPC to attach to TGW. To configure, go to TGW Orchestrator -> Build. Select Advanced and multi select the subnets. For MAC, multi select is "Command + highlight". For Windows, multi select is "Control + highlight".
 - Bug fix for Transit Gateway peering. 
 - Bug fix for Datadog upgrade for Azure gateway. 
 - Remove TGW VPN background task.

R4.3.1230 (5/5/2019)
=====================

1. Networking
----------------

 - **Firewall Network (FireNet)** is the new iteration of Transit DMZ for deploying firewall in the cloud. FireNet provides the simplicity, scalability and automation for an optimal network architecture for firewall deployment. Check out the `FireNet FAQ <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_ to learn more. Follow `FireNet workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to start deploying. 
 - **Transit Peering InsaneMode** allows you to build high performance encrypted connection across AWS regions over AWS private Peering network infrastructure. To configure, first launch the Aviatrix Transit Gateway with InsaneMode enabled, Transit Peering InsaneMode will be automatically enabled when you configure `Transit Gateway Peering. <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_ This feature is only available for AWS deployment.
 - **User Accelerator Preview** integrates AWS Global Accelerator with Aviatrix User VPN to reduce user access latency. 
 - **Azure Native Peering** supports VNET to VNET native peering in the same Azure subscription. Cross subscription is not supported. To configure, go to Peering -> Azure Peering. 
 - **C5n Instance** is now supported. With C5n.18xlarge, InsaneMode IPSEC performance reaches 25Gbps. 
 - **Select Subnets for TGW Attachment** provides by API the flexibility to select which subnet to attach to AWS Transit Gateway (TGW). 
 - **Reuse Azure Resource Group** provides by API the ability to reuse the VNET resource group when launching an Azure gateway. 

2. Routing Policies
---------------------
 - **Filter Advertised Spoke VPC CIDRs** Supports the ability to exclude certain VPC subnets from advertising to Transit Gateway. One use case is if you have Spoke VPCs that have partial overlapping VPC CIDRs, by excluding the overlapping CIDRs, you can attach your VPC to Aviatrix Transit Gateway without error. This feature is only available for encrypted transit solution. To configure, check out `this link. <https://docs.aviatrix.com/HowTos/gateway.html#filter-advertised-spoke-vpc-cidrs>`_
 - **Transit Peers as Backup to On-prem local route** is a routing policy for Transit Gateway with the configuration to instruct all remote Transit Gateway peers not to advertise to their on-prem routes that are learned from the Transit Gateway with the configuration, except when the configured Transit Gateway loses connectivity to its on-prem. One use case is for a connected on-prem network with multiple datacenters where each datacenter is connected to a Transit Gateway and where the Aviatrix Transit Gateways form a mesh backbone. With this policy enabled, datacenters do not learn and advertise conflicting cloud routes to each other. To configure, select the Transit Gateway at the Gateway page, click Edit. Scroll down to "Transit Peers As Backup to On-prem", click Enable.  
 
3. Operation
-------------

 - **Terraform Exporter** is a tool to learn and build your deployment with Terraform starting from your Aviatrix Controller Console. For example, use Aviatrix Console to deploy a VPN gateway, add a VPN user. You can then download from the Console the Terraform .tf file and instructions. From this point on, you can add more users directly by editing the Terraform file. Great for Terraform beginners and teams who wish to migrate to use code to manage network infrastructure. To download the resources already configured via Console, go to Useful Tools -> Export to Terraform. Check out `this example guide <https://docs.aviatrix.com/HowTos/tf_export.html>`_ to learn how to use the tool.
 - **SumoLogic Ephemeral Collector** allows any stopped Aviatrix Controller and gateways to remove themselves from the SumoLogic console. 
 - **Datadog version 6 support** If you have already configured Datadog, you can upgrade to version 6 by disable and enable again. To configure, go to Settings -> Logging -> Datadog Agent
 - **Multiple Endpoints for SAML Login to Controller** allows read_only user to login via SAML authentication. To configure, Settings -> Controller -> SAML Login, to add more endpoint. Check out `this doc <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_ for instructions.

R4.2.764 (Patch release of 4.2 on 4/14/2019)
=============================================

 - Missing parameters for "skip_rfc1918" for Azure support.
 - Missing parameters for "skipp_rfc1918" for GCP support. 
 - Bug fix for Transit Peering in handling BGP manual route summary.

R4.2.740 (Patch release of 4.2 on 3/31/2019)
===============================================

Notable bug fixes:
 
 - When attaching a VPC with CIDR 192.168.0.0/16, the system crashes.
 - When on-prem advertises 0.0.0.0/0, Spoke Gateways in the transit deployment could lose connectivity to the Controller. 
 - FQDN process crashes when certain invalid or corrupted packets are received.
 - Datadog for gateway in ARM does not work. Fix is a workaround to disable Datadog in ARM.
 - InsaneMode BGP session goes down after phase-2 negotiation.

R4.2.634 (3/19/2019)
======================

1. Networking
----------------

- **Transit DMZ for Egress/Ingress Traffic Inspection** provides the networking capability to route Internet bound egress traffic from Spoke VPCs to a third party firewall deployed in the Aviatrix Transit DMZ architecture for inspection. Once `Transit DMZ <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html#>`_ is deployed, go to Transit DMZ -> Advanced, click the Skewer button. Scroll down to enable "Egress through Firewall".  

- **Transit DMZ for East-West Traffic Inspection** provides the networking capability to route VPC to VPC traffic to a third party firewall deployed in the Aviatrix Transit DMZ architecture for inspection. Once `Transit DMZ <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html#>`_ is deployed, go to Transit DMZ -> Advanced, click the Skewer button. Scroll down to enable "East-West Traffic Inspection".

- **BGP Filtering From Learned Routes** allows you to selectively propagate on-prem routes to Spoke VPCs. When applied to the Aviatrix Transit Gateway, all spoke VPCs are filtered by the same rules. One use case of this feature is for a Spoke VPC that is customer facing and you do not wish your customer to access all your on-prem network CIDRs. For more details, refer to `this link. <https://docs.aviatrix.com/HowTos/gateway.html#filter-routes-to-spoke-vpc>`_

- **Spoke VPC CIDR Customization** allows you to specify what to program to a Spoke VPC route tables and ignore any learned routes propagated from on-prem. One use case of this feature is for a Spoke VPC that is customer facing and your customer is propagating routes that may conflict with your on-prem routes. To learn more, refer to `this link. <https://docs.aviatrix.com/HowTos/gateway.html#customize-spoke-vpc-routes>`_

- **Palo Alto VM-Series instance launch** can be done from the Aviatrix Controller console. This simplifies the VM-Series integration into Transit DMZ. To launch, go to Transit DMZ -> Preparation, follow the instructions to launch VM-Series instance. Note you must first subscribe the VM-Series AMI from AWS Marketplace. 

2. Multi Cloud
----------------

- **GCP Spoke Gateway** allows you to launch a GCP gateway in the Aviatrix Next Gen Transit Network workflow. To launch, follow `the Transit VPC workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to launch a GCP Spoke Gateway. 

- **GCP FQDN support** allows you to apply Aviatrix FQDN Egress Control to an Aviatrix GCP gateway. Follow `the instructions for FQDN Control <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ to get started.


3. Operation
-------------

- **Controller SAML Authentication** Aviatrix administrators can authenticate to the Controller by SAML authentication on an IDP. Follow the `instructions <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_ to setup authentication with SAML. 

- **Alert for New Release** sends email to the Controller admin email address to alert you when a major release becomes available. 

- **Aviatrix Gateway EBS Volume Encryption** allows you to encrypt the AWS gateway EBS volume after the gateway is launched. Learn more at this `link. <https://docs.aviatrix.com/HowTos/gateway.html#encrypt-ebs-volume>`_ 

- **Connectivity test** From the Aviatrix Controller you can launch two test instances and run a connectivity test in under two minutes time. One use case is to test connectivity two Spoke VPCs attached to Aviatrix Transit Gateway or AWS Transit Gateway. To use, go to the Controller console, Troubleshoot -> Diagnostics -> Network Validation.

4. Security
-------------
- **FQDN AZ Affinity Load Balancing** is an optimization to avoid cross AZ traffic charge. If you have two private route tables where each route table is associated with subnets in a separate AZ, the Aviatrix Controller programs the default route (0.0.0.0) in each route table to point to the Aviatrix gateway deployed in the that AZ. Note if you have more than two private route tables and more than two AZs of subnets, cross AZ traffic is still not avoidable for some private subnets.  

R4.1.946 (Patch release of 4.1 on 2/21/2019)
===============================================

Notable field found bug fixes:
 
 - Disable OPTIONS HTTP method to pass security scan. 
 - Detach or delete Spoke Gateway when the gateway instance has been deleted from AWS console. 
 - Allow editing manual summarization CIDR when spoke CIDR are either in primary or backup gateway. 
 

 

R4.1.914 (2/9/2019)
=====================

1. Networking
---------------

- **Transit Gateway Peering** establishes encrypted tunnels that connect inter region and inter cloud networks by Transit Gateways. This allows you to build a software defined, fully connected global transit network with multiple transit clusters. The spoke VPC/VNet CIDRs and on-prem routes are automatically propagated throughout the network. To configure, follow the `Transit Gateway Peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_ instructions.

- **Azure Transit Gateway** allows you to launch a Transit Gateway in Azure and build a transit network in Azure the same way for AWS. For configuration instructions, follow the `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. "Advertise Transit VNET CIDR" is not supported in 4.1.

- **AWS Transit Gateway DMZ** is a Bring Your Own Firewall architecture that seamlessly integrates virtual firewall appliances into the edge of the Next Gen Transit Network. By decoupling firewall functions from the network functions, the architecture allows a scalable firewall deployment that filters traffic between on-prem and cloud. Check out `Transit Gateway FAQ <https://docs.aviatrix.com/HowTos/transit_dmz_faq.html>`_ to learn more. For configuration, follow the `Transit DMZ workflow <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html>`_..

- **Palo Alto VM-Series Integration** integrates the firewall route updating and health monitoring into the Aviatrix Controller for the AWS Transit Gateway DMZ deployment. The Controller monitors and applies VM-series APIs to the appliance, thus simplifies the operations. For details, read `<https://docs.aviatrix.com/HowTos/transit_dmz_vendors.html>`_.

- **External Device support for Transit** allows you to build the Next Gena Transit Network without the constraint of the 100 route limits by AWS VGW. By establishing the IPSEC tunnel directly to your on-prem router over Direct Connect or Internet, VGW no longer carries the routes from on-prem and Spoke VPCs. To configure, follow the `Transit Gateway to external device <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_. Check out the configuration examples for `on-prem ISR/ASR <https://docs.aviatrix.com/HowTos/transitgw_external.html#appendix-2-transit-connection-to-cisco-isr-asr-over-direct-connect>`_. 

- **Insane Mode Encryption** breaks the 1.25Gbps Transit VPC performance limit and allows you to scale your transit network to 10Gbps throughput with encryption between on-prem and Spoke network. Insane Mode is also supported for Spoke VPCs' connectivities with up to 20Gbps throughput. Follow `Insane Mode <https://docs.aviatrix.com/HowTos/insane_mode.html>`_ to learn more.

- **Aviatrix Hardware Appliance CloudN** is the on-prem appliance that enables the Insane Mode Encryption for the Next Gen Transit Network. For details, check out `Aviatrix hardware appliance CloudN <https://docs.aviatrix.com/HowTos/insane_mode.html>`_.

2. OpenVPNÂ®
--------------

- **OpenVPNÂ® User Tracking** enables you to quickly correlate a destination IP address access to the specific VPN user. If you select Destination IPs and enter a list of IP addresses, the Aviatrix Controller console returns the list of the VPN user names that communicated with the IP address. If you select Username and enter VPN user names, the console returns all destination IP addresses the user visited. You can further filter on time span and selected VPN gateways. To use the feature, go to Troubleshoot -> Diagnostics -> VPN User. If your VPN configuration is Full Tunnel mode (as opposed to the default Split Tunnel mode), this tool enables the administrator to have complete visibility of your end user activities including Internet browsing.

- **OpenVPNÂ® User Diagnostics** improves the speed to troubleshoot if a VPN user has connection problem. Simply enter the user name and discover the errors. To use, go to Troubleshoot -> Diagnostics -> VPN User, enter the VPN user name and click Go.

3. Troubleshoot
----------------

- **Flightpath With Expert Diagnostics** adds expert diagnostics capability to the popular `Flightpath tool <https://docs.aviatrix.com/HowTos/flightpath.html>`_. Flightpath reduces the stress of everyday troubleshooting by pulling together multiple AWS service pages to a single page with side by side display of source and destination information. With the new expert diagnostics, the Aviatrix Controller checks if there are any obvious configuration errors in instance security group rules, VPC route table entries, TGW route table entries and VPC network ACLs. Note this tool is heuristic and cannot replace human experience and judgment. 

- **Trace Path** is a tool to discover MTU size of devices along the network path. This is useful to help understand if the network devices support Jumbo Frame sizes when you deploy Insane Mode. To use, go to Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY. Select the Aviatrix gateway name, outgoing interface, destination IP address or host name, and click Trace Path. 

- **Packet Capture Enhancement** allows you to see the tunnel interfaces with the gateways names for easy identification. To use, go to Troubleshoot -> Diagnostics -> Network -> PACKET CAPTURE. Select a gateway, Interface, optionally select Host, Port, Duration and Packet length. Click Start to start capturing packets, click Stop to stop the packet capturing.  Click Download to download the PCAP file that can be analyzed with Wireshark tools. 

4. Security
-----------

- **Port Range Configuration on Egress FQDN** allows you to configure TCP/UDP port range for non HTTP/HTTPS ports in a single policy and simplifies the configurations. The maximum port range span is 100 per policy. Configure multiple rules to support larger port range. To configure, go to Security -> Egress Control.  


5. Operations
---------------

- **Create a VPC** has a new enhancement that allows you to specify "Aviatrix Transit VPC" as an option. This is the best practice for deploying the Next Gen Transit Network, as it creates sufficient number of subnet and route tables. To create, go to Useful Tools -> Create a VPC, select the option "Aviatrix Transit VPC".

- **AWS Transit Gateway Audit** is a new function for  AWS Transit Gateway Orchestrator that monitors and alerts any out of band changes to AWS Transit Gateway (TGW) related resource, such as route table, route entry, route propagation attribute, VPC attachment and detachment. The out of band change refers to any configuration change that is not initiated from the Aviatrix Controller. To enable, go to the Controller console, TGW Orchestrator -> Audit turn on the auditing capability for each Transit Gateway.   


- **Display and Download Audit Log** displays on the Aviatrix Controller console who and when accessed the Aviatrix Controller and what commands have been issued. To display audit log, go to Troubleshoot -> Logs -> Display Audit. To filter, type in the search panel and click Display Audit again. To download the log file, click Download Audit. Note all logs are also stored in the syslog that you can export to external log services. 

- **Splunk Integration Enhancement** allows you to customize Splunk index for inputs.conf improving  log analysis visibility. 

- **Gateway Certificate Import** allows you to import third party signed certificate into Aviatrix gateways. To import, go to Settings -> Advanced -> Security -> IMPORT CERTIFICATE WITH KEY. Select the gateway, upload the CA Certificate and click OK.  



R4.0 (11/26/2018)
=================

1. Security
-------------

- **FQDN Source Filter** enhances egress FQDN function by allowing source IP filtering on any tag and gateway. A given tag can have different source IP filtering applying to different gateways. This provides fine grained configuration control. To configure, click Edit Source on an existing tag and select a gateway to edit. For details, read `Edit Source <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#edit-source>`_.  

2. Next Gen Transit Network
-----------------------------

- **AWS TGW Orchestrator** is a feature that extends the Aviatrix Transit Network to include AWS Transit Gateway. Key benefits are policy driven network segmentation, no need for Spoke VPC gateway and out-of-box integration with Direct Connect and Internet VPN. For details, check out `Aviatrix TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

- **Insane Mode Beta** allows you to build high performance network by deploying Aviatrix hardware appliance in the datacenter. Additional benefits are bypass VGW 100 route limits and high performance encryption over Direct Connect. Contact sales@aviatrix.com to be part of the beta program and learn the use cases for `Insane Mode  <https://docs.aviatrix.com/HowTos/insane_mode.html>`_. 

3. Operations
--------------

- **AWS CloudWatch Log Integration** exports the Aviatrix Controller and gateways logs to AWS CloudWatch Log. If you are already using AWS CloudWatch log service, enable this feature to consolidate the logs from Aviatrix Controller and gateways to the same service. For details, read `AWS CloudWatch Integration <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. 



R3.5 (10/7/2018)
=================

1. Security
------------

- **Amazon GuardDuty Integration** adds enforcement functions to Amazon GuardDuty IDS and continuous monitoring service. For example, malicious probes found by GuardDuty can be blocked at the VPC network level automatically orchestrated by Aviatrix Controller. Read `Amazon GuardDuty Integration <https://docs.aviatrix.com/HowTos/guardduty.html>`_ to learn how GuardDuty and Aviatrix integration help securing your AWS deployment. 

- **Egress FQDN multi tag support** allows you to attach multiple FQDN tags to a gateway. This function simplifies the FQDN rule management. For example, you can create a common base tag of rules for all VPCs and additional tags for specific VPCs. 

- **Integrated Egress FQDN and NAT function** simplifies deploying FQDN service. Aviatrix Controller automatically replaces the existing AWS NAT Gateway route entry in AWS route table, if there is any, with Aviatrix gateway entry to minimize downtime and simplify deployment when launching FQDN service.     

- **Egress FQDN and Stateful Firewall interoperability** allows both services to operate together. You can use base Deny All for all your IP address based rules and still use Whitelist FQDN for host name based rules at the same time. 

2. Transit Network
--------------------

- **Connected Transit** enables all Spoke VPCs to communicate with each other with encryption via the Transit GW in a Transit Network deployment. This effectively builds a full mesh encrypted Transit network without building individual tunnels between Spoke VPCs. Read `Connect Transit <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_ for how to enable this function.  

- **Advertise Transit VPC CIDR** improves flexibility of Transit Network. Now an instance in Transit VPC can communicate with either Spoke and on-prem via Transit GW. For example, you can launch an Aviatrix SSL VPN gateway in the Transit VPC. Read `Advertise Transit VPC CIDR <https://docs.aviatrix.com/HowTos/site2cloud.html#advertise-transit-vpc-network-cidr-s>`_ for more details. 

3. Operations
--------------

- **Netflow support** enables you to record and log all TCP/UDP sessions flowing through all Aviatrix gateways.This adds more visibility to your network in addition to the existing log forwarding functions for Splunk, SumoLogic, Remote Syslog, DataDog and Logstash. Read `Netflow Integration <https://docs.aviatrix.com/HowTos/netflow.html#netflow-integration>`_ for more details.   

- **Alert Bell** is a new multi purpose alerting function displayed on the Aviatrix Controller Console. For example, Aviatrix Controller periodically scans your AWS route tables and alerts you if there is any blackhole entry in your AWS route table that needs to be cleaned up as best practice. GuardDuty findings are also recorded by Alert Bell. 

- **VPC Tracker** has been expanded to include network CIDRs discovered on your Azure accounts, Site2Cloud remote CIDRs and Transit Network on-prem CIDRs. For details, check out `VPC Tracker <https://docs.aviatrix.com/HowTos/vpc_tracker.html>`_.

- **Create Azure VNet** allows you to create a fully populated Azure VNet from Aviatrix Controller console. 

- **Specify an EIP** lets you specify an unassociated EIP in your allocated EIP pool at the gateway launch time. This helps you control what EIP to use for an Aviatrix gateway. 

- **Aviatrix resource tags support** gives you the option to reduce the Aviatrix required IAM policy scope by restricting actions on these tagged resource. All resources created by the Aviatrix Controller has an identifiable AWS tag. The key value pair of the tag is `Aviatrix-Created-Resource:Do-Not-Delete-Aviatrix-Created-Resource`. Follow information in this `section <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html#use-aviatrix-tags-to-limit-resource-deleting-policy-scope>`_ to limit the aviatrix-app-policy. An example IAM policy with Aviatrix tag can be found `here. <https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix_customized_IAM_app_policy.txt>`_


R3.4 (8/5/2018)
================

1. Security
-----------

- **Egress FQDN for non HTTP/HTTPS traffic** expands the popular FQDN feature to allow you to control traffic for SFTP, SSH and any other TCP/UDP port using domain names. The new FQDN is backward compatible and auto populates the default protocol and port number (TCP/443) when you configure. For details, check out `Egress Control Filter <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

- **Egress FQDN Import and Export** allows you to download and upload the rules of a FQDN tag in a text file format. This helps you manage large set of rules of multiple tags. For example, you may upload the text file downloaded from `FQDN Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_. You may also download rules from one tag and upload to a different tag to save time from typing. For details, check out `FQDN Export <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#export>`_ and `FQDN Import <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#import>`_.

- **FQDN Azure support** is now available. The configuration is the same as for AWS. 

- **FQDN Exception Rule** provides an option to block SSL request that does not have SNI field. For example, if an application use hard coded destination IP address in its HTTPS request, disabling Exception Rule will block the request, unless the IP address is configured as a rule in the tag. 

- **Network Address Translation** is significantly expanded to support combinations of SNAT, DNAT with flexible rules to enable new use cases. For example, gateway can now do network translation to a pool of IP addresses, a customized IP addresses and session based translation. This enables gateway to perform complex and customized network address translation requirements. For an example use case, check out `this solution guide. <https://docs.aviatrix.com/Solutions/egress_nat_pool.html>`_


2. Useful Tools
----------------

- **VPC Tracker** is a tool that provides a "at a glance" view of cloud network CIDR ranges of all your cloud accounts in all regions. No gateway launch required, just add `secondary access accounts on the Controller <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_, the Controller will retrieve all information for you. The VPC Tracker is also displayed on the Controller Dashboard. You have the option to turn it off. To view all VPC CIDRs, go to "Useful Tools" at the main navigation menu, click "VPC Tracker". To learn more, read the `VPC Tracker <https://docs.aviatrix.com/HowTos/vpc_tracker.html>`_.

- **Create VPC** is a tool that creates an AWS VPC with a public subnet and private subnet in each AZ, a public route table, private route table and IGW in a specified account and region. 

3. Connectivity
----------------

- **AWS NLB Support for Aviatrix OpenVPNÂ® gateways** allows you to display the remote users' public IP address when they are connected to the gateway. 

- **Configurable Dead Peer Detection (DPD)** provides the flexibility to work with third security appliance when building the `Site2Cloud <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ tunnels. 

- **Use Your Own DNS** allows the gateway to use the DNS server configured in the VPC DHCP options.One use case is for Aviatrix gateways to export logs to a private Splunk Server that would like to have its DNS name configured on the `Logging setup <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_. For more information, read `the guide. <https://docs.aviatrix.com/HowTos/gateway.html#use-vpc-vnet-dns-server>`_ 


4. Operation
-------------

- **Controller HA in AWS** is simplified and now supports all types of AMIs in addition to BYOL. Follow the `instructions <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ to enable HA. 

- **Deployment Scale** is improved. A Controller of t2.large instance can support 500 Aviatrix gateways.  

R3.3 (6/10/2018)
=================

1. Security
------------

- **Egress FQDN Discovery** enables you to discover what Internet sites (URLs) your Apps in a VPC visit. When enabled on an Aviatrix NAT gateway, the gateways monitors and displays all the destination FQDN names from EC2 instances in the VPC, which helps you build whitelist for FQDN filter. This is a standalone feature, meaning you can use it even for curiosity purpose. To configure `Egress FQDN Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_, go to Security -> Egress Control. Follow Step 1 and Step 2. To turn it off, simply click Stop button. Note FQDN Discovery and FQDN Filter are mutually exclusive on a given gateway.  

- **Egress FQDN View Log** provides you with a quick way to view gateway FQDN logs when you are curious to view some immediate results. Select a gateway with FQDN enabled, click Download, a compressed log file should be downloaded. Note to log for monitoring and auditing purpose, you should consider a `Logging Integration <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_.

- **AWS Controller Security Group Management** manages the Controller instance Security Groups to only allow TCP port 443 from Aviatrix gateway EIP. To enable this feature, go to Settings -> Controller -> Security Group Management, select the primary access account that launches the Controller, click Enable. Note this feature is available for AWS Controller only deployment. If you deploy the Controller in other cloud types, this feature is not supported. For information, `read this link. <http://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_ 

2. Connectivity
----------------

- **Azure Spoke Gateway** is now supported in the Transit Network workflow. To configure, follow the Transit Network workflow `Step 4 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_ to launch a Spoke Gateway in Azure. 

- **Multi-CIDR VPC support** is now available if your VPC has multiple CIDR ranges. 

- **Destination NAT** on a gateway allows you to change your destination IP address prior to routing. To configure, go to Gateway page, select the gateway, click Edit. Scroll down to DNAT, click Edit/Add. Enter virtual address (mapped), real address, the protocol and port range are the scope of DNAT condition. Click `here <http://docs.aviatrix.com/HowTos/gateway.html#dnat>`_ for more information.  
- **Configurable Designated Gateway CIDR Range** allows you to add additional CIDRs that are outside of RFC1918. To configure, go to Gateway page, select the gateway, click Edit. Scroll down to "Edit Designated Gateway" to add additional CIDR list separated by comma. This feature is useful if your VPC CIDRs are outside of RFC1918. Click `the link here <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>`_ for more information.

- **AWS China Support**. Both Controller and gateway can be launched in AWS China. Follow the `AWS China Controller Startup Guide <http://docs.aviatrix.com/StartUpGuides/aviatrix-china-controller-startup-guide.html>`_ to get started. 

- **Spoke CIDRs Summarization support** allows you to reduce the number of routes advertised by Aviatrix Transit GW to VGW, to overcome the VGW limit of carrying a maximum of 100 routes. Click `here <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-to-summarize-spoke-vpc-cidr-ranges>`_ for configuration details.  

3. Ease of Use
---------------

- **Modular Remote User VPN** enables you to configure or modify all VPN parameters after the VPN gateway is launched. We recommend you not to select any Advanced Option when launching a VPN gateway and configure any specific parameter at later time.  

- **Workflow for all Use Cases**. Major Aviatrix use cases now have a workflow to guide you through. 

- **Azure Companion Gateway** is no longer needed to be subscribed. The subscription step has been removed. 

4. Operations
--------------

- **Source Category** is supported in Sumo Logic specification. To configure, go to Settings -> Logging -> SUMOLOGIC Logging.

- **Source Address** is added in FQDN logs. This enables you to see which EC2 instance send packets to a target hostname. 

- **Access Account Name** is now searchable. 

- **New APIs** are available for all features in 3.3.

- **List Spoke Gateways** allows you to easily see what are the Spoke Gateways are attached to a selected Transit Gateway. To view, scroll down to Step 9 at Transit Network workflow, select a Transit GW and view the attached Spoke Gateways. 




R3.2 (4/18/2018)
=================

1. Security
---------------

- **Gateway Subnet Monitoring** monitors the public subnet where Aviatrix gateway is deployed and automatically stops any user instance in the subnet. This feature ensures unwanted instances are not launched on public subnets in a VPC. To configure, go to Gateway -> Edit -> Monitor Gateway Subnets.If you want to exclude certain user instances from being stopped, you can enter their instance IDs. 

2. Operations
--------------

- **SSL Certificate Import** allows to import your own key and wildcard certificate for Controller HTTPS access. To import the certificate and key, go to Settings -> Advanced -> Security -> Import Method and select "Import Certificate with Key". 

- **Disable Admin User Login** allows to disable Controller login as user "admin". To enable/disable it, go to Settings -> Controller -> Login Customization.

- **Migrate controller** allows you to migrate among different licenses including Metered, Utility and BYOL through Controller backup and restore.

3. Troubleshooting
-------------------

- **Transit Network** can detect overlapping CIDRs between learned on-prem CIDRs and advertised spoke CIDRs. Controller will display these overlapping CIDRs at Site2Cloud -> Edit page in addition to sending email alerts.

- **Gateway Replacement** allows to replace a problematic gateway but still keep its configuration. To replace the gateway, go to Troubleshoot -> Diagnostics -> Gateway Replace.

- **UCC Controller Public IP Migration** can be used after Controller's public IP is changed. To migrate, go to Troubleshoot -> Diagnostics -> Network -> Migrate.

4. API
------------

- 50 APIs have been added to the Controller.
 

R3.1 (3/6/2018)
===============

1. Connectivity
---------------

- **AWS Global Transit Network** is a new workflow that provides a step by step guide to setup `AWS Global Transit Network. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

- **AWS VPC Peering integration** is a 1-click operation to `configure native AWS VPC peering <http://docs.aviatrix.com/HowTos/peering.html>`_ for intra region and inter-region VPC communication. 

- **BGP dampening** `BGP dampening <http://docs.aviatrix.com/HowTos/advanced_config.html#bgp-dampening>`_ allows you suppress flapping routes.

2. Operations
--------------

- **Backup to encrypted S3 bucket** allows you to backup Controller configuration to an `encrypted S3 bucket <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_. Check out `this link <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_ to enable backup and restore feature. 

- **Modular NAT configuration** allows you to `enable or disable NAT <http://docs.aviatrix.com/HowTos/gateway.html#nat>`_ function after a gateway instance is launched. 

- **Gateway Force Upgrade** allows you to force upgrade a specific gateway. This is useful when Controller upgrade fails on some gateways. Go to Troubleshoot -> Diagnostics -> Gateway -> FORCE UPGRADE 

- **Configurable TLS version** allows you to turn off support for older versions, such as TLSv1.0 and TLSv1.1. TLSv1.2 is supported by default. To configure, go to Settings -> Advanced -> TLS VERSIONS SUPPORT

- **Dashboard Logical View** allows you to view VPCs and connection graph. Each dot represents a gateway deployed in a VPC. You can rearrange the graph by dragging the dots. Make sure you click Save to save the changes.   
- **Gateway Single AZ** is an economic way to improve gateway uptime without running a standby instance. The Aviatrix Controller monitors the gateway's health and when gateway keep alive packets fail to arrive at the Controller, it stops and starts the gateway again. To configure, go to Gateway, select a gateway to Edit, then Enable or Disable Single AZ gateway HA. 

- **Security patches** for CIS-CAT and Meltdown.

- **Terraform provider** is now available for `Transit Network <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_

- **Updated Aviatrix APIs** is now organized by functions and easier to `follow. <http://docs.aviatrix.com/HowTos/Aviatrix_Controller_API.html>`_


R3.0 (12/1/2017)
================

1. Connectivity
---------------

- **BGP** Support BGP interoperability between Aviatrix gateway and AWS VGW. For use case details, check out `the Transit Network with BGP Setup Instructions. <http://docs.aviatrix.com/HowTos/bgp_transitive_instructions.html>`_.

- **IPmotion** For AWS migration and DR use case that allows on-prem VMs to migrate to AWS without changing their IP addresses. For use case and details, check out `this link. <http://docs.aviatrix.com/HowTos/ipmotion.html?highlight=ip%20motion>`_.

- **AWS ENA** on Aviatrix gateway. 


2. Security
-----------

- **Tag your security policy** to associate a CIDR with a name tag for a scalable and user friendly. For configuration detail, check `this link. <http://docs.aviatrix.com/HowTos/tag_firewall.html?highlight=tag>`_

- **AES-GCM crypto algorithm**. For IPSEC tunnel connectivity between two Aviatrix gateways, such as Aviatrix peering and IPmotion, the crypto algorithm has been upgraded to AES-GCM.


3. Controller
--------------

- **Audit** user actions on the Controller. All commands from web console or API are now logged to syslog and can be forwarded to integrated log services.

- **Name your controller** for ease of use. Click "Your controller name goes here" on the Controller console and start typing a new name. Hit return to save the name. 

- **On demand backup** of the Controller configuration to cloud storage. To configure, go to Settings -> Maintenance -> Backup & Restore -> Backup Now 

- **Backup multiple copies** of Controller configuration file. You can choose to backup multiple copies of configuration file. To do so, go to Settings -> Maintenance -> Backup & Restore and select Multiple Backup. Up to 3 backup files are stored. You can select any one of them to restore. 

- **Migrate licenses** from AWS Marketplace Utility image to BYOL. For details, check out `this link. <http://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_


4. Modular Configuration
-------------------------

- **Transitive Peering** supports multiple subnets being configured at the same time. Multiple subnets separated by comma can be added once when configuring transitive peering.

- Join Function now support the ability to delete all subnets at once in Join Function gateway.

5. Troubleshooting
-------------------

- **FlightPath tool**, an AWS EC2 to EC2 connectivity troubleshooting tool. In the first release, EC2 related resources, such as security groups, route table and Network ACLs are displayed side by side for easy visualization and troubleshooting. 

7. Datacenter Extension Features
---------------------------------

- **non-RFC1918** on premise network range is now supported. To add, first launch a Datacenter Extension gateway, go to Gateway List, select the gateway and click Edit. At Edit Extended Public CIDR, add one or multiple non-RFC1918 CIDR blocks separated by comma. For example, 100.64.0.0/24,100.64.1.0/24

- **Repair gateway** to replace a gateway in a limbo state. At the Datacenter Extension page, click Replace of specific gateway. 

R2.7
==========

1. Controller 
-------------------

- Console Responsiveness improvements. Significant improvements in page responsiveness when using controller web console. 

- Support third party signed certificate. You now can import a third party signed certificate to the controller. This should remove the "Not Secure" sign displayed by the browser. To configure, go to Settings -> Advanced -> Certificate -> CERTIFICATE IMPORT. First Enable Certificate Checking. The console will ask you to enter a domain name and generate a CSR file (Certificate Signing Request). Send this CSR to get singed, then import both CA and server certificate. Note if intermediate certificate is one of the return files, use the intermediate certificate file for CA import. 


2. Connectivity
-------------------

- Support Site2Cloud tunnel on TCP. In addition to run IPSEC tunnel on UDP protocol, you can now run on TCP 443. This option removes the requirements of having to open site firewall ports on UDP 4500/500. To configure, go to Site2Cloud -> Add New. Select TCP for Tunnel Type selection. 

3. Scalability
---------------

- Support load balancing UDP based OpenVPNÂ® gateways. If your OpenVPNÂ® users experience slow terminal response or long file transfer time, use UDP based VPN gateway can help. This release allows you to create multiple UDP based VPN gateways and load balance them in a round robin fashion by leveraging AWS Route53. To configure, go to OpenVPNÂ® -> Advanced -> UDP Loadbalancer. Note with UDP protocol UDP port 1194 is used. When using from on-prem, firewall port UDP 1194 must be open. 

- Support Designated Gateway. If you are planning to have a large set of tunnels going through a gateway or are hitting AWS route entry limit, this feature is for you. If "Designated Gateway" option is selected at the gateway launch time, the Controller programs 3 route entries based on RFC1918 for the gateway. Controller will not program additional route entries when configure a VPN tunnel that end on the Designated Gateway. Note if you currently do not have a Designated Gateway and you are hitting route entry limit, launch a new gateway with Designated Gateway enabled and configure future tunnels from the Designated Gateway. Note there can only be one Designated Gateway per VPC. Designated Gateway only supports Gateway HA.  

4. Modular Configuration
--------------------------

- Allocate New EIP. When this option is selected at new gateway launch time, Controller always allocates a new EIP from AWS and associated it with the gateway. If this option is unchecked, Controller will first look at the EIP pool that belong to the account: if there is allocated but unassociated EIP, Controller will allocate EIP from this pool and associate it with the gateway, otherwise it will select one EIP from the pool and associate it with the gateway. 

- Support resizing active Gateway without deleting its peering tunnel. You can resize an active gateway when their peering HA configured. The workflow should be: 1) Settings -> Gateways -> select the gateway, select Edit. 2) Select it desired gateway instance size, click Change. As the result of this function, the gateway will be stopped and tunnel switch to backup tunnel. 3) Go to Settings -> Peering, select the peer and click Force Switchover.  

- Support resizing UDP based OpenVPNÂ® gateway instance. 

5. NEW APIs
------------------

- Set VPC Access Base Policy.
- Update VPC Access Policy.
- Enable Packet Logging.



R2.6
===================

Connectivity
-------------

- Run encrypted tunnel on TCP port 443. Aviatrix Virtual Appliance CloudN now offers a TCP based secure tunnel connectivity. With this new capability, you do not need to open outbound UDP port 500 and 4500. The encrypted tunnel runs on TCP 443. To configure, go to Datacenter Extension, select TCP for the field Tunnel Type. UDP based encrypted tunnel is still supported. 

- Reserve on-prem segment for Datacenter Extension feature of CloudN. After deciding how many VPCs you wish to configure during on boarding, you can sub divide the segments to reserve some for on-prem VM deployment. This allows you launch applications where some part of it (such as database) is on-prem and others parts of it (such as web front end) to be in VPC.  

- Google IDP support. Google IDP is now supported IDP for the Aviatrix SAML VPN solution. 

Security
---------

- FQDN blacklist. In addition to FQDN whitelist, FQDN whitelist is added as a base configuration for each FQDN tag. To configure, go to Advanced Config -> FQDN Filter. After you create a new tag, you can select either White List or Black List. With Black List, the URLs on the Black List will be rejected. 

API
---------

- New APIs are published. list active VPN users, edit Open VPN configuration, backup and restore, list VPC peers, list image. For API details, click `this link. <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`_ for details.

User Interface
--------------

- re-organize menu items on Settings. Under Settings -> Maintenance are Upgrade, Backup & Restore and Security Patches. Under Settings -> Controller are System Time, License information, Email settings and controller access method authentication LDAP or DUO configuration.oUnder Settings -> Advanced are tunnel timeout and keepalive configuration, password change and certificate management.  

- Make a wish. Customers can now send feedback on UI pages regarding features, usability and make a wish on new requirements and enhancements.   


R2.5
=============================

1. Security improvements
-------------------------

-  Provide security patch to upgrade OpenVPNÂ® server to v2.4.3. To apply
   the patch, go to Settings->Patches and select OpenVPNÂ® 2.4.3

-  New Aviatrix VPN client (v1.3.9) for user VPN (Mac, PC and Unix). To
   download, go to `this link. <http://docs.aviatrix.com/Downloads/samlclient.html>`__

-  Hardened password management for "forgot password".

-  Additional ciphers for site to cloud tunnels for interoperability. To
   configure, go to Site2Cloud -> "Add New" -> Algorithms.

2. Public cloud specific features
----------------------------------

-  AWS China [available in the UCC version only] Â·

-  Restful API support for AWS China. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

-  Aviatrix cluster peering over AWS peering. To enable it, go to
   Peering -> "Cluster Encrypted Peering" -> "New Peering" and select
   "Over AWS Peering".

-  Aviatrix backup/restore in Google Cloud. To configure back/restore,
   go to Settings -> "Backup & Restore".

-  Python script for Google Cloud Controller HA monitoring and
   restarting. `Follow <https://github.com/AviatrixSystems/Controller-HA-for-GCP>`__

3. Usability enhancements
--------------------------

-  Multiple enhancements on User Interface.

-  Aviatrix product Doc site is now available at http://docs.aviatrix.com

-  New browser support: IE 11

4. Administration automation
-----------------------------

-  Cloud-init script to accept input parameters to launch Aviatrix
   Controller on premises.

-  Automated Aviatrix Controller deployment in AWS using `Cloudformation:
   <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__

-  GW Resizing API "edit\_gw\_config".

-  Support proxy setting modification through "Advanced Config" ->
   "Proxy Settings".

-  Frictionless install UX [Register Aviatrix on premises Gateway with
   UCC Controller at the time of install to auto-fetch initial
   configuration; available for AWS at this time].

5. Configurable Aviatrix Gateway Failover/HA time
--------------------------------------------------

-  Support configurable health check frequency between Aviatrix
   Controller and Gateways for customers to meet their HA failover time
   constraint. To change the health check frequency, go to Settings ->
   Keepalive. Select "slow" only when your network is unstable and
   gateways send too many status alerts.

6. Logs and troubleshooting
----------------------------

-  Aviatrix for Splunk has been published on Splunkbase. To download,
   click `this link <https://splunkbase.splunk.com/app/3585/>`__. For
   instructions on how to use the app, click `this
   link <https://github.com/AviatrixSystems/SplunkforAviatrix>`__.

-  Aviatrix for SumoLogic application is available. To download, click
   `this
   link <https://github.com/AviatrixSystems/SumoLogicforAviatrix>`__.

-  Rsyslog over UDP for customers needing UDP based rsyslog. To
   configure, go to Settings -> Loggings -> "Remote Syslog" and select
   UDP for "Protocol".

-  Configurable gateway debug level. To adjust the debug level, go to
   Troubleshot -> Diagnostics -> "Gateway Debug Level" and select the
   appropriate debug level for your gateway.

7. New Aviatrix OVF for VMWare
-------------------------------

-  Visit download.aviatrix.com

UserConnect-031717
==================

Security
--------

-  First release to white list public Fully Qualified Domain Names (FQDN
   filtering) for egress HTTP and HTTPS traffic to Internet initiated by
   instances on private subnets in a VPC. The FQDNs can be specified
   with regex wild card, such as \*.example.com. A tag is defined as a
   list of FQDNs and one or more gateways is attached to a tag. Any
   updates to a tag automatically triggers updates to all gateways
   attached to the tag. Multiple tags can be defined on the controller.
   This feature works together with Gateway Security Policy feature
   where private network, IP address, protocol and ports can be
   filtered.

   To configure, go to "Advanced Config" -> "FQDN Filter". The workflow
   is 1) create a tag, 2) Click Enable to enable the tag, 3) Edit the
   tag by adding FQDN hostname part of URLs (e.g.
   `www.aviatrix.com <http://www.aviatrix.com>`__, or \*.google.com),
   and 4) Attach Gateway. One or more gateways can be attached to a tag.
   Step 1), 3) and 4) can be done first and then Enable the tag. Once
   the tag is enabled, HTTP and HTTPS traffic to these FQDN will be
   allowed, and any destination outside the FQDN will be denied.

   Note the gateway with FQDN must have NAT enabled for Internet egress
   traffic.

   Caveat: in this release FQDN filter is not failover capable when
   peering HA is configured.

Monitor and Troubleshooting
---------------------------

-  During UCC gateway launch, Controller now reports in text the
   progress of gateway creation in addition to the progress bar view.

-  "Dry Run" for system upgrade. Dry Run performs health checks for the
   Controller and gateways to detect potential upgrade failure without
   executing the command. Go to Settings -> Upgrade. Optionally, click
   Dry Run. If it is successful, you may click Upgrade.

-  Dashboard now displays a summary packet statistics per gateway. Click
   on a specific gateway, top 10 packet statistics of the gateway are
   also displayed.

-  Support test network connectivity. This is useful to troubleshoot any
   firewall or security policy that blocks connectivity from the
   controller or gateway. To test, go to Troubleshoot -> Diagnostics ->
   "Network Connectivity Utility". Select either Controller or one
   gateway and test if it can reach a specific port of a remote host.

-  Capability has been added to log tunnel status change notification to
   syslog (in addition to an email notification with the same content).

-  Enhancement has been made for tunnel status alert mechanism by
   allowing users to configure tunnel down detection time. To change the
   detection time, go to Settings -> Tunnels. The default detection time
   is 60 seconds.

-  Capability has been added to check the VPC settings of a specific
   gateway. VPC settings include security groups, route tables, subnets,
   Network ACLs, DHCP options. To configure, go to Troubleshoot -> VPC
   Diagnostics

-  Splunk forwarder has been upgraded from version 6.2 to version 6.4.

Connectivity and High Availability
----------------------------------

-  Support multiple independent UDP based VPN gateways (without ELB)
   within the same VPC. These VPN gateways can have different
   attributes. For example, one gateway has split tunnel configured
   while the other one has full tunnel configured.

-  Support API credential change on controller console for Azure ARM
   accounts when the credential becomes out of sync with the credential
   on cloud provider console. For example, the account credentials are
   changed by the cloud provider or user herself.

-  HA support has been added to Service Chaining with AWS gateways in
   different zones.

-  Support IAM role-based controller and cloud account for AWS GovCloud.
   The Controller must be in GovCloud to create GovCloud gateways with
   IAM role-based accounts.

-  Site2Cloud HA support has been added with CloudN as the on-prem
   device. To configure it, launch two gateways in the same VPC/VNet
   with UCC Controller. Then go to Site2Cloud page to create a new
   connection. Check "Enable HA" and select "Aviatrix" from "Remote
   Gateway Type" list. After creating the site2cloud connection, select
   this connection and download configuration with "Aviatrix" as
   "Vendor". Import the same configuration file at CloudN's Site2Cloud
   page.

Controller Administration
-------------------------

-  Function has been added to notify admin via admin email when a new
   release becomes available.

-  Support has been added to enforce password complexity of account
   users. To enable it, go to Settings -> Security -> "Password
   Management".

-  Support read only (operator) role for Controller management. The read
   only account has dashboard view, status view and list view, but
   cannot make modification to any configuration. To create a read only
   user, go to Accounts -> Account Users -> "New User". Select
   "read\_only" from the dropdown list of "Account Name".

-  CloudN's console password can be changed from the default. To do so, type "enable" to enter config mode and then
   issue "change\_console\_password" command.

-  Capability has been added for HTTPS certificate check for control
   traffic between Controller and gateways. To turn on this function, go
   to Settings -> Security -> "Certificate Checking".

-  The following APIs have been added. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  list\_vpcs\_summary

   -  peer\_ha\_switch\_over

   -  upload\_cloudx\_command\_log

   -  upgrade

UserConnect-013017
==================

-  First release of Service Chaining. Service Chaining capability allows
   multiple instance based functions to work in tandem to control
   traffic flow path within an AWS VPC. For example, a firewall instance
   can be service chained with Aviatrix gateway so that EC2 initiated
   traffic will first be sent to firewall for inspection before
   forwarding it to Aviatrix gateway for peering to another VPC. To
   enable the function, go to "Advanced Config" -> "Service Chaining" to
   select the route table and enter "Downstream IP". Aviatrix gateway
   will only modify the selected route table to specify which outgoing
   traffic needs to go through itself and also route the incoming
   traffic to the "Downstream IP" address. Normally, the selected route
   table is associated with the subnet of your firewall's WAN (or
   untrusted) interface. The "Downstream IP" should be the IP address of
   your firewall's WAN interface. For details, check out
   `this <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Aviatrix+Service+Chaining+Reference+Design.pdf>`__
   reference design.

-  Within AWS, support has been added to allow deployment of the UCC
   Controller in VPC's private subnet. To enable this, during the
   Controller's initial setup, when prompted for "If this controller is
   being launched on a private subnet, check the box below, otherwise,
   leave it blank", select "private subnet" and then click the "save"
   button. Please note that when the Controller is deployed in private
   subnet it can only create gateways in private subnets. We assume
   these private subnets in various VPCs can reach each other through
   AWS peering.

-  For AWS, account diagnostics have been added. To run these
   diagnostics, go to Troubleshoot -> Diagnostics -> "Account
   Diagnostics". This diagnostics command will validate the AWS account
   credentials and check the status of associated gateways and SQS
   queues.

-  There is now support for adding multiple CIDRs separated by commas in
   "Advanced Config"->"Join Function" -> "Allow Subnet" at CloudN.

-  Tunnel HA for Azure ARM gateways can now be created through "Advanced
   Config"->"Join Function". To enable tunnel HA, select a particular
   gateway on the "Gateway" page and then go to "Gateway for High
   Availability Tunnel/Peering" to create a backup gateway.

-  Support has been added to allow the creation of two VPN gateways
   (without ELB) in the same VPC, one with SAML enabled and the other
   one with only certification authentication enabled (no MFA method
   supported on the 2\ :sup:`nd` gateway).

-  The Dashboard now displays the IPSec tunnels created by site2cloud
   connection.

-  Support has been added for enabling NAT on CloudN Controller itself.
   To enable this, go to Troubleshoot -> Diagnostics -> "NAT
   Configuration".

-  With this release, both the actual public IP address of the
   Controller and the stored public IP address if it is different from
   the actual public IP are displayed. To view these public IP
   addresses, go to Troubleshoot -> Diagnostics -> "Controller Public
   IP".

-  Proxy server support has been added on the UCC Controller for initial
   download and ongoing communication. During the Controller's initial
   setup, when prompted for "If the controller accesses the Internet
   through a proxy server, provide the following information, otherwise
   leave the fields blank", enter the server URLs for "HTTP Proxy" and
   "HTTPS Proxy". If the proxy server issues a self-signed certificate,
   upload a CA certificate.

-  The ability to setup proxy server setting for Internet connectivity
   in CloudN OVA has been added. To configure proxy server support, use
   "-setup\_network\_only {true\|false}" for clish command
   setup\_interface\_address and setup\_interface\_static\_address. Use
   clish command "setup\_network\_options {test\|save\|cancel}" to
   test/save/remove http/https proxy setting. Currently, "Datacenter
   Extension" and "Join Function" are not supported when proxy server is
   enabled.

-  Traceroute support has been added on gateways. To run "Trace Route",
   go to Troubleshoot -> Logs -> "Traceroute Utility".

-  For site2cloud, users can now select the route tables to be modified
   when "Encryption over ExpressRoute/DirectConnect" is enabled. Only
   subnets associated with the selected route tables will have tunnel
   connections to on-prem. To select route tables, go to Site2Cloud ->
   "Add New" and enable "Encryption over ExpressRoute/DirectConnect".
   Available route tables will show up in the "Route Tables to Modify"
   field.

-  The following APIs have been updated. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  Added: update\_profile\_policy & add\_admin\_email\_addr

   -  Deprecated: add\_profile\_policy & del\_profile\_policy

   -  Changed: connect\_container & add\_vpn\_user

-  In the Aviatrix VPN client 1.2.49 release, Linux version AVPN client
   is now in the supported list.

UserConnect-121516
==================

-  Add support for three additional AWS regions: Ohio (us-east-2),
   Canada (ca-central-1) and London (eu-west-2).

-  Enable load balancer support for Azure ARM VPN gateway creation.

-  Add packet capture support for both Controller (CloudN only) and
   gateways. To run "Packet Capture", go to Troubleshoot -> Diagnostics.
   Select "Local" from "Gateway" list to capture packets on CloudN.
   Select a gateway name from "Gateway" list to capture packets on the
   particular gateway. The packet capture files are in .pcap format and
   can be downloaded for analysis.

-  Add traceroute support on Controller (CloudN only). To run "Trace
   Route", go to Troubleshoot -> Logs.

-  Extend the Peering HA support initiated at 102416 release from AWS to
   GCloud and Azure ARM. To enable this feature, go to Gateway ->
   "Gateway for High Availability Peering" to create the backup gateway
   first and then go to Peering -> "Encrypted Peering" to create the
   peering with "Enable HA" selected.

-  Add diagnostics tools for IPSec tunnels created through CloudN "Join
   Function". Go to "Advanced Config" -> "Join Function". Select the
   IPSec tunnel to run diagnostics on it. The following options are
   available: debug, ping, measure latency, restart services and check
   peering status.

-  Allow to add VPN users to each individual gateway (with ELB disabled)
   instead of the whole VPC. Select the gateway name from "LB/Gateway
   Name" list at OpenVPNÂ® -> "VPN Users" -> "Add New" to add VPN users to
   that gateway.

-  Support migrating the same CloudN from one public IP address to
   another address. Go to Troubleshoot -> Diagnostics -> Migrate to
   migrate CloudN from its old public IP address to a new one.

-  Support Controller migration from the old CloudN to a new CloudN. Go
   to Settings -> "Backup & Restore" to run backup at the old CloudN.
   Launch a new CloudN with a different public IP. Go to Settings ->
   "Backup & Restore" to run restore at the new CloudN. The migration
   function will automatically update the new CloudN with its own public
   IP.

-  Support LDAP for Controller login. To enable it, go to Settings ->
   "Setup LDAP Login" to enable LDAP login first. Then add users at
   Accounts -> "Account Users" with local passwords. These account users
   should exist at LDAP server also. With LDAP login enabled, these
   users can log into Controller with their LDAP passwords. If LDAP
   login disabled, these users can log into Controller with their local
   passwords.

-  Allow credential change for AWS and GCloud accounts when the account
   credentials are changed by the cloud provider.

-  Support Okta along with "Client Certificate Sharing" when creating
   VPN gateways. Select "Okta" from "Two-step Authentication" list and
   select "Yes" for "Enable Client Certificate Sharing" when launching a
   new gateway. In previous releases, "Client Certificate Sharing" can't
   be enabled when Okta is used.

-  Allow users to customize the email notification (both email content
   and attachment file name) for VPN client. To configure it, go to
   OpenVPNÂ® -> Configuration -> "User Defined Email Notification" to edit
   the file name or email content. The new email format will be used
   when a VPN certificate is issued.

-  Add support for the following new APIs. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

   -  test\_ldap\_bind

   -  get\_gateway\_supported\_size

   -  get\_supported\_region

   -  list\_peer\_vpc\_pairs

   -  peer\_vpc\_pair

   -  unpeer\_vpc\_pair

-  Aviatrix VPN client 1.1.32 release

UserConnect-112816
==================

-  Added search capability to the Gateway list page. You can now search
   for gateways by any of the gateway attributes, such as Name, gateway
   instance size, account name, etc.

-  Added search capability to active VPN users list on dashboard. You
   can now search for active VPN users by all attributes, such as Name,
   Profile, Landing Gateway, etc.

-  CloudN "Join" function HA support. Join capability allows you to
   connect to an existing VPC with an IPSec tunnel. To enable HA, go to
   the Gateway page, click the gateway, and enable HA.

-  Remote Syslog enhancement. Enable remote syslog to optionally not be
   encrypted. To configure, go to Settings -> Loggings -> REMOTE SYSLOG,
   simply ignore the "cert" option.

-  Aviatrix SAML VPN client preview for GCloud. The new Aviatrix SAML
   client provides a seamless user experience when authenticating a VPN
   user through a SAML IDP. For customers who use SAML based Single Sign
   On (SSO) for a unified user authentication and access control to
   their applications, this new capability allows them to treat the
   Aviatrix VPN solution as another application that authenticates VPN
   users by an already established mechanism. This preview release has
   been tested on GCloud. Forgerock is the primarily tested IDP and Okta
   has been partially verified. The supported platforms for the Aviatrix
   SAML VPM clients are Mac OSX, Windows 10, and Windows 7.

UserConnect-102416
==================

-  Scale out encrypted peering support for AWS. You can create a cluster
   in a VPC that consists of up to 7 gateways, peering between two
   clusters in two VPCs increases packet throughput. To enable cluster
   encrypted peering, click Cluster Encrypted Peering under Peering tab.
   Preliminary iperf performance test shows TCP packet throughput can
   reach up to 8.5Gbps with bi-directional traffic. For more
   information, check out `Cluster Peering Reference
   Design <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

-  Controller HA support. Create a standby controller in any region and
   any cloud (AWS, Azure ARM and GCloud). When the primary controller
   goes down, the standby controller takes over and becomes operational.
   To enable the feature, click Settings -> Controller HA -> Enable.
   Input the standby controller's public IP address. You also need to
   input standby controller's admin username and password for
   authentication purpose.

-  Enhanced peering HA support. The new peering HA feature reduces
   failover to a backup peering to under 2 seconds. To enable the
   feature, click Peering -> Encrypted Peering and enable HA. Note the
   current gateway HA support will be phased out in the future.

-  Transitive peering support for Azure ARM, Azure classic, GCloud and
   Azure China. Built on the earlier release of transitive peering
   support for AWS, this feature is now covered by all cloud types. This
   feature enables you to deploy a hub and spoke architecture of
   multiple VPCs in a simple point and click manner. To enable
   transitive peering, click Peer -> Transitive Peering.

-  Peering Diagnostics support. Troubleshooting peering tunnel status is
   made easy. Click Diag of the specific peer. Options are debug, test
   latency, ping and restart the tunnel.

-  Display the public IP address of the controller. This feature is
   useful for CloudN64 virtual appliance where its public IP address is
   needed for configuring Site2Cloud capability. To view the
   controller's public IP address, click Troubleshoot -> Diagnostics ->
   CONTROLLER PUBLIC IP.

-  Support all Azure ARM regions.

-  Support interoperability of Aviatrix gateway Site2Cloud to AWS VGW
   and Azure VPN Gateway. When configuring Site2Cloud, you can select
   the specific cloud provider VPN gateways to ensure encrypted tunnel
   work correctly.

-  Add API for CloudN64 Join features: allow subnet to VPC and
   delete subnet to VPC. For the complete APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

UserConnect-101016
==================

-  Add Mumbai (ap-south-1) to AWS region support list.

-  Support multiple Splunk indexers by importing Splunk config file.
   This enables Aviatrix Controller and gateway logs to be integrated
   with multiple Splunk servers that many enterprises deploy. To
   configure, go to Settings -> Loggings -> Splunk. Select Import files
   to import a Splunk configuration file. You may also choose Manual
   Input, in this case each indexer must be listening on the same port.

-  Support DataDog agent for both Controller and gateways. To enable, go
   to Settings -> Loggings -> DataDog, provide an API Key.

-  Enhancement for VPN user profile editing: when adding a user to a
   specific profile, only display those who do not belong to the
   profile. When deleting a user to a specific profile, only displays
   users who belong to the profile.

-  Support tooltip for many labels. Move mouse over a label, a detailed
   explanation displays for the label.

UserConnect-092216
==================

-  Support encryption over AWS peering. This capability allows two same
   region VPCs to send encrypted traffic to each other without going
   over Internet by leveraging AWS peering as underlying infrastructure.
   This mechanism significantly reduces data transfer cost. To use this
   feature, customer must configure AWS peering from AWS console between
   the two VPCs in the same region. To enable this feature, go to
   Peering -> Encrypted Peering -> New Peering. Check "Over AWS
   Peering". One use case for this feature is to enable NetApp OnTAP
   software to run in HA mode.

-  Support Azure ARM North Europe region.

-  Support Skyhook for Docker 1.12 release.

UserConnect-090416
==================

-  Support site2cloud use case where the gateway imports a template
   configuration file from a different Aviatrix gateway that initiates
   the configuration. This capability is useful to build IPSEC tunnels
   between two enterprises where each has its own Aviatrix UCC
   controller.

-  Support using Aviatrix CloudN as customer device for site2cloud
   connection. Follow these steps: 1) use UCC Controller to create a
   site2cloud connection by entering CloudN's public IP and subnet CIDRs
   for customer on-prem network. 2) On UCC Controller, select Aviatrix
   as vendor choice to download this site2cloud configuration file. 3)
   go to CloudN's site2cloud page and import the downloaded
   configuration file to establish the site2cloud connection.

-  Allow users to provide an optional IPSec pre-shared key when creating
   site2cloud connections. When the filled is left empty, UCC controller
   will automatically generate a pre-shared key.

-  Support HA for GCloud gateways with a zone selection option.

-  Update API to accommodate GUI 2.0 development

UserConnect-082116
==================

-  Support on GUI 2.0:

   -  Settings -> Change Password

   -  Settings -> Email

   -  Settings -> System Time

   -  OpenVPNÂ® -> Profiles -> Edit -> Add New. Users can select subnets
      from VPCs/VNets without typing these CIDRs manually.

   -  Gateway -> Click "+" next to the gateway name. Users can display
      all VMs inside the gateway's VPC/VNet

-  VPN User list displays user email and associated profile information.

-  Allow users to setup VPN user license threshold notification. When
   license usage exceeds the threshold, email notification will be sent
   out to admin's account.

-  Azure Aviatrix gateway image is available at marketplace. There is no
   need to download gateway image to your storage account before
   launching a gateway. Instead, users need to subscribe to the Aviatrix
   Companion Gateway in Azure marketplace. This new capability
   significantly reduces Azure gateway deployment time. The Aviatrix
   Companion Gateway is free of charge. Please refer to startup guide
   for details.

UserConnect-072216
==================

-  GUI 2.0 becomes production. To access GUI 2.0, go to
   `https://controller\_ip/ <https://controller_ip/preview/>`__. Note:
   Old GUI is still available at https://controller_ip/v1/. All the new
   features developed in this release are only available for GUi 2.0.

-  **(Known issue: After upgrading to UserConnect-072216, the browser
   does not log out properly. You must type in https://controller_ip to
   re-login)**

-  Allow users to specify their own ELB names when creating AWS/GCloud
   VPN gateways. If no ELB name is specified by users, the Controller will
   provide a default ELB name.

-  Support AWS IAM role. When AWS IAM role is used, there is no need to
   enter AWS access key and secret key when creating a cloud account at
   Controller. Instead, two IAM roles will be created. Controller will
   use the role-based temporary security credentials to request access
   to AWS resources. Cloud account created by IAM role helps to reduce
   the risk of compromising AWS credentials. Please refer to `Aviatrix
   IAM role Configuration
   Guide <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`__
   for details.

-  Support AWS Geo VPN to include other cloud type's ELB DNS name. To
   configure, go to OpenVPNÂ® -> Configuration to enable AWS Geo VPN
   first. Then you can add ELB DNS names from other cloud types to Geo
   VPN. With this capability, VPN gateway in Azure and GCloud can be
   included as part of Geo VPN solution.

-  Support gateway resizing without a need to terminate the old gateway
   and create a new one. This feature is available for AWS, Azure
   Classic, Azure ARM and GCloud but only on gateways without ELBs. To
   configure, go to Gateway, select the target gateway and desired size
   from "Gateway Size" dropdown list", click Change button.

-  Support an option to select subnet/availability zone when enabling HA
   for AWS. To configure, go to Gateway, select the target gateway and
   the desired subnet from "Backup Gateway Subnet" dropdown list, click
   "Enable HA" button.

-  Support an option to select ELB name when editing VPN gateway
   configuration. This feature is useful for GCloud network, which may
   have multiple ELBs, each in a different subnet. To configure, go to
   Advanced Config -> Edit Config and select the ELB from "LB Name"
   dropdown list.

-  Support to map multiple real CIDRs to multiple virtual CIDRs for
   site2cloud connection "mapped" connection. The multiple CIDRs need to
   be separated by a comma. The numbers and masks of the real CIDRs and
   corresponding virtual CIDRs must match each other.

-  A new Aviatrix IAM custom policy is provided with more restrictive
   rules and some additional rules to support role-based IAM.

UserConnect-063016
==================

-  GUI 2.0 for preview. To access GUI 2.0, go to
   https://controller_ip/preview/. Note: Old GUI is still available at
   https://controller_ip. GUI 2.0 doesn't support all the features
   available at the old GUI at this time.

-  Note: GUI 2.0 requires the controller to run on a instance with at
   least 4GB of memory. If your current controller does not meet this
   requirement, follow the procedure below:

   -  AWS controller: stop the controller instance, change instance type
      to t2.medium or larger, start the controller instance again.

   -  Azure Classic and Azure ARM controller: you can change the
      instance dynamically to at least D2 without stopping the instance
      first.

   -  Google Controller: stop the controller instance, change instance
      type to n1-standard-2, start the controller instance again.

-  Support site2cloud connection between customer network and cloud
   network where the two sides may have overlapping CIDRs. Only GUI 2.0
   support this feature. To configure, select "Mapped" for "Connection
   Type" and assign different virtual subnets to both customer network
   and cloud network.

-  GUI 2.0 dashboard displays IPSec tunnel status and link latency of an
   encrypted peering. When IPSec tunnel status of an encrypted peering
   flips between up and down, an email notification will be sent to the
   admin.

-  GUI 2.0 displays all VPN users added to the controller without
   selecting VPC ID/VNet name first. VPN users are sorted alphabetically
   for easy search.

UserConnect-052616
==================

-  Project Skyhook release: Docker swarm cluster container access
   support. From your desktop, you now can access Docker containers in a
   multi-host Docker swarm cluster built on a VXLAN overlay network that
   may span AWS, Azure and Google. To enable this feature, go to
   VPC/VNet -> VPN Access -> Skyhook: Docker Container Access. This
   feature is available on VPN gateways created after upgrade to this
   release. (If you have enabled ELB, delete the existing gateways and
   create new one. VPN user database are not affected.) For reference
   design on how to use this feature to access Docker containers, check
   out `this
   link <http://docs.aviatrix.com/HowTos/ContainerAccess.html>`__.
   Key benefits: a) MFA and user profile based access control apply to
   containers in the same manner as for instances. b) use the familiar
   tools such as curl, vim and wget on container without resorting to
   "docker exec" type of commands.

UserConnect-050316
==================

-  Enhance stability, manageability and debug ability for gateway launch
   and encrypted peering functions.

-  Support one load balancer in each different subnet of the same GCloud
   network.

-  Kernel 3.13.0-74 support on new gateway launches.

UserConnect-040316
==================

-  When VPN gateways are behind ELB, allow to import a new CRL URL
   without recreating VPN users/profiles or reissuing VPN certificates.
   To configure, delete all the VPN gateways first and then go to
   VPC/VNet -> VPN Access -> Certificate Management -> Import
   Certificates. Make sure that "CA Certificate", "Server Certificate"
   and "Server Private Key" are the same as before. The new CRL URL can
   be entered in "CRL Distribution Point URI" field. After finishing
   certificate management, recreate the VPN gateways behind ELB.

-  Enhance "Encrypted Peering" by verifying IPSec tunnel connection
   state after creating the peering.

-  Provide "Test HA" function for verifying VPC high availability. To
   test it, go to VPC/VNet -> VPC HA to enable HA for your gateway first
   and then click "Test HA" button to test HA function.

-  Enhance gateway creation by only listing the cloud types enabled in
   cloud accounts.

-  Allow to modify site2cloud connection and configuration template by
   editing "Cloud Networks" or "Customer Networks" CIDRs. To use this
   feature, go to VPC/VNet -> Site2Cloud -> List -> Edit. If changes
   need to be made for subnets/address spaces in VPC/VNet, select "Cloud
   Networks" to enter all VPC/VNet CIDRs. If changes need to be made for
   subnets in on-prem network, select "Customer Networks" to enter all
   on-prem CIDRs. This feature minimizes the configuration changes on
   customer sites by not having to delete the existing site2cloud
   connection.

UserConnect-032516
==================

First release for Azure ARM cloud support. If you currently have
deployments in Azure Classic, we recommend you skip this release. Azure
ARM is the new Azure portal that is significantly different in how API
works comparing with Azure Classic.

-  Support launching gateways in Microsoft Azure Resource Manager (ARM)
   VNet. Follow the embedded Aviatrix instructions to collect
   Application Endpoint, Application Client ID and Application Client
   Secret before creating a cloud account. The main feature supported by
   ARM in this release is Site2Cloud. Peering with ARM VNet is not
   supported in this release.

-  Site2Cloud supports to generate a configuration template for generic
   customer gateway devices.

-  Support security patches for both controller and gateways. To apply
   the software patch, go to Setting -> System -> Security Patches. The
   patch available for this release is glibc Vulnerability.

UserConnect-031016
==================

-  Support launching gateways in Microsoft Azure China. Azure China
   account is required to launch the gateways in Azure China.

-  Support launching gateways in Amazon AWS GovCloud. AWS GovCloud
   account is required to launch the gateways in AWS GovCloud.

-  Support Site2Cloud null encryption. This feature allows you to create
   an IPSec tunnel without encrypting the packets. To configure, go to
   VPC/VNet -> Site2Cloud -> Add and then select "Null Encryption".

UserConnect-021516
==================

This release consists of a few significant features: GCloud Support,
Modular Split Tunnel Configuration, Site to Cloud, Encryption for Azure
ExpressRoute, Transitive Peering and VNet route diagnostics, as
described below:

-  Support Google Cloud (GCloud). The following major functions are
   available on GCloud for this release:

   -  Launch an Aviatrix Controller from GCloud directly. Follow `the
      instructions <http://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`__
      to do so.

   -  From AWS/Azure/GCloud controller, you can now launch a gateway in
      GCloud.

   -  GCloud account creation, editing and deletion

   -  Multiple GCloud projects support

   -  GCloud gateway (with or without ELB, with or without VPN access)
      creation and deletion

   -  Gateway encrypted peering to other projects in GCloud and with AWS
      VPC and Azure VNets.

   -  Security policies at GCloud network level.

   -  Edit configuration (LDAP, DHCP, and Split Tunnel) on existing
      gateway

-  Support the ability to edit the split tunnel mode on existing VPN
   gateways. Previously, to make any split tunnel related configuration
   changes, users have to delete the existing VPN gateways and re-create
   new ones. With this release, when you add a new VPC/VNet and your VPN
   users need to access them via VPN, you just modify the CIDRs at
   "additional CIDRs" field at split tunnel configuration without
   deleting any existing gateways. To configure, go to VPC/VNet -> Edit
   Configuration-> Modify Split Tunnel. Note all additional CIDRs (the
   CIDRs that are not the VPC/VNet CIDR where VPN gateways are deployed)
   must be entered all together, separated by comma. For example, you
   have two new VPCs, 10.10.0.0/16 and 10.11.0.0/16, and you like to
   access them via split tunnel VPN. You must enter at the Modify Split
   Tunnel field "10.10.0.0/16,10.11.0.0/16" without the quote. In
   addition, you may need to add encrypted peering with the new VPCs in
   order for traffic to go through. The changes are effective
   immediately to the VPN gateway in the VPC/VNet. If there are multiple
   VPN gateways behind a load balancer, they are all updated at the same
   time. Active VPN users will be disconnected during this configuration
   time.

-  Support Transitive Peering. Transitive Peering enables you to route
   traffic from instances in Source VPC, encrypted, through a NextHop
   VPC gateway to reach a destination. Before creating Transitive
   Peering, you need to make Encrypted Peering between Source VPC and
   NextHop VPC first. To create/delete Transitive Peering, go to
   VPC/VNet -> Encrypted Peering -> Transitive Peering.

-  Support site to cloud IPSec VPN connections. Using this feature, you
   can create IPSec VPN connections linking your on-prem networks to
   VPC/VNets in the cloud. To configure, go to VPC/VNet -> Site2Cloud.
   After adding a site2cloud connection, you can download a
   configuration template file for your on-prem devices (Only Cisco ASA
   configuration template is available now). If High Availability (HA)
   function is enabled, one gateway serves as the primary VPN connection
   endpoint and the other one serves as the backup. In case on-prem
   device loses the VPN connection to the primary VPN gateway, it can
   switch to the backup gateway to recover the VPN connection. Some
   diagnostic tools for site2cloud are also provided.

-  Support encryption for Azure ExpressRoute. This feature allows to run
   IPSec over Azure Express Route to ensure a higher security level. To
   enable it, first launch a gateway in a subnet dedicated for the
   gateway, then go to VPC/VNet -> Site2Cloud, click "Add" tab and
   select "Private Route Encryption".

-  Support VNet route diagnostics. Go to Settings -> Troubleshooting ->
   VNet Route Diagnostics to find various VNet routing related
   diagnostics tools.

UserConnect-011316
==================

-  Support VPN certificates maintained by a third party PKI system.
   Third party PKI must be created before any gateway launch. To enable
   this feature, go to VPC/VNet -> VPN Access -> Certificate Management.
   Use this feature to import certificates and download VPN
   configuration files.

-  Support the ability to edit the LDAP settings on existing VPN
   gateways. Previously, to make any LDAP related configuration changes,
   users have to delete the existing VPN gateways and re-create new
   ones. With this support, you can enable, disable, or modify LDAP
   configuration on existing VPN gateways without deleting them. To
   configure, go to VPC/VNet -> Edit Configuration-> Modify LDAP
   Configuration.

UserConnect-121015
==================

-  Support remote syslog to a third party or Aviatrix syslog server. The
   feature allows 24x7 premium customer to forward both controller and
   gateway events to a customized Aviatrix syslog server for debugging
   and troubleshooting purpose. This feature improves customers network
   uptime. To enable this feature, go to Settings -> Setup loggings ->
   Remote Syslog.

-  Support the ability to push down to VPN user client the DHCP settings
   made in AWS VPC Console "Create DHCP Options Set" menu. For example,
   if you wish to change DNS name after the gateway has been launched,
   you can use this feature to make changes. The active VPN users will
   be disconnected when this feature is executed. To configure, go to
   VPC/VNet -> Edit Configuration -> Reload DHCP Configuration.

UserConnect-112415
==================

-  Support Sumologic logging collector. When enabled, syslog data from
   the controller and all gateways will be forwarded to a Sumologic
   account. To enable, click Settings -> Setup Loggings -> Sumologic

-  Add LDAP user search capability when Test LDAP Configuration to
   further test drive the correctness of a LDAP configuration.

-  Enable the gateway High Availability capability with a pair of gateway
   instances in active and hot standby mode. To enable, go to VPC/VNet
   -> VPC HA.

-  Add Help me! for a drop down display of VPC/VNet in a specific region
   and cloud account.

UserConnect-112015
==================

-  Clean up onboarding messages and texts for Azure usage.

UserConnect-111015
==================

-  Support Geo VPN feature where a VPN user is connected to a nearest
   VPC. To enable Geo VPN, go to VPC/VNet -> VPN Access -> Geo VPN.

UserConnect-110615
==================

-  Bug fix to allow multi-AZ and PBR routing configuration scenario.

-  Added AZ display along with subnet info at gateway create.

-  Created Reference Designs.

UserConnect-102615
==================

-  Support 2FA DUO authentication to console log in, in addition to
   password credentials. The configuration is at Settings -> System ->
   Setup 2FA Login.

UserConnect-101615
==================

-  Support multiple controller and gateway clusters in the same VPC.

UserConnect-100115
==================

-  Support Okta authentication.

-  Support integration of Elasticsearch on the controller.

-  Support both allow and deny rules for each VPC security policies.

UserConnect-092815
==================

-  Support PBR event syslog for NAT translation of every TCP/UDP/ICMP
   session. The log describes the VPN user virtual IP address, source
   port and the destination IP address and port. By correlating with VPN
   username and its assigned virtual IP address, IT admin can uniquely
   track and identify every VPN user's access activity history to both
   internal resource and external resource.

-  Support multiple users in admin privilege. Support multiple users in
   user account privilege.

UserConnect-092115
==================

-  Added hard token authentication support on DUO security. Made DUO
   authentication configuration optional. When "Token" is configured as
   the Push Mode for all gateways, user must append the 6 digits' token
   number to their password.

   **Note: **

1. **All active VPN users will be disconnected for this upgrade duo to
   VPN server restart.**

2. **You must log out and log back in again for new features to take
   effect.**

3. **You need to run upgrade command two times.**

-  Support VPN user certificate re-issuing. When existing VPN user
   certificate is re-issued, the current certificate of the user is
   revoked and a new certificate is sent to the user.

-  Active VPN user on dashboard display is dynamically refreshed every 5
   minutes.

UserConnect-082815
==================

-  Support launch gateways in Microsoft Azure.

UserConnect-082515
==================

-  Support backup DUO push. When both LDAP and DUO are enabled, user can
   type #push1 or #push2 appending to the password field to specify
   which phone in the DUO device list to be notified for approval. For
   example, if a user John Smith's password is johnsmith, he can type at
   password prompt johnsmith#push1 or johnsmith#push2 to specify the
   first phone or the second phone to be notified. If only password is
   typed in, the default phone (the first phone on the device list in
   DUO) will be notified.

   **Note: You must run upgrade command twice to have the upgrade take
   effect for this particular upgrade. All VPN users need to be deleted
   and added again as the existing certificates will not work with the
   new encryption algorithm. The first upgrade command may generate an
   exception, just ignore it and run upgrade again. **

   Suggested upgrade procedure: delete all existing users. Upgrade once
   and upgrade again, and then add users back.

-  Support enhanced encryption algorithms: AES-256-CBC, SHA512, TLS1.2
   and TLS-AUTH.

-  Detailed display of VPC/gateway on Dashboard. Clicking on the gateway
   name displays the complete configuration of the gateway.

-  Support API for all CloudOps commands.

-  Support the option to launch gateway when creating CloudOps VPC pool.

-  Support CloudOps Access IP address map history and initiator (from
   Console or from API).

-  Hash all password.

-  Add confirmation check when deleting a VPC or gateway.

-  Dynamically display controller logs on UI.

-  Bug fixes for out of order gateway command delivery and multiple
   identical users on the same gateway display.

UserConnect-081315
==================

-  Support for CloudOps VPC pool creation and CloudOps Read Me First.

-  Support additional route push to VPN client when split tunnel is
   enabled.

-  Disable password caching and credential saving in .onc file for
   Chromebook users.

-  Display profile name instead of command name in VPN active user
   Dashboard.

-  Fix typos in email notification sent to VPN users.

-  For UDP connections, send a disconnect message to VPN gateway
   immediately when the client terminates.

-  Fix release version alert problem.

UserConnect-072815
==================

-  Support Diagnostics on controller and gateways.

-  Added DNS name service for CloudOps Networking feature.

-  Dashboard performance improvement.

-  Enhance Chromebook VPN ONC file connection name to be profiled based.

-  Bug fix for logstash forwarder.

UserConnect-071615
==================

-  Support upgrades without terminating existing active VPN users unless
   specifically documented.

-  Various bug fixings.

-  General UI look and feel update.

UserConnect-070615
==================

-  Integrate LDAP configuration with Gateway creation to streamline
   provisioning process.

-  Display Profile fields in Active VPN User dashboard.

-  Support logstash forwarder to forward all syslog and auth log to
   designated logstash server.

-  Support software release version visibility.

UserConnect-061915
==================

-  Support template generation at create gateway and configure VPN
   access.

-  Support user activity history

UserConnect-061015
==================

-  Support operator account where the operator can only access dashboard.

-  Support disconnect user from dashboard page.

UserConnect-060315
==================

-  Support capability to manage instances in overlapping CIDRs of VPCs.

-  Support dashboard for active user display.

UserConnect-052615
==================

-  LDAP client certificate import facility to support LDAP servers with
   TLS client verification

-  Support configurable action parameter in user profile policy

-  Support forwarding of syslog events to Logstash server

UserConnect-051515
==================

-  Support LDAP + Duo multi-factor combined authentication.

-  Support configurable base policy for user profiles.

-  API to change a VPN user's profile.

UserConnect-050915
==================

-  Support Chromebook as a VPN client.

-  Support DUO multi-factor authentication.

-  Support syslog display with regex filtering capability for each VPN
   gateway.

UserConnect-050215
==================

-  Support policy-based routing on the VPN server to allow enterprise to
   re-direct traffic to its own backbone.

UserConnect-042315
==================

-  Support user authentication via Google 2-Step Verification process.
   Support multiple email domain names.

UserConnect-041715
==================

-  Support for setting the maximum number of connections for each gateway.

-  Support NAT capability for each gateway.

-  Support both split tunnel and full tunnel mode for each gateway.

-  Support gateway size c4.2xlarge.

-  Support add and delete members on the Profile page.

UserConnect-032315
==================

-  Support user profile-based security policies.

-  Support scale out and highly available OpenVPNÂ® solutions for direct
   access to VPCs.

-  Support LDAP integration.

-  Support for Windows, MAC OS, and Chromebook clients.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
