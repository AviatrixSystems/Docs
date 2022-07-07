.. meta::
   :description: controller Migration
   :keywords: controller high availability, controller HA, auto scaling, Azure, GCP

=====================================
Controller Migration in Azure, GCP, and OCI
=====================================

Introduction
^^^^^^^^^^^^^^^

You may need to migrate your Aviatrix Controller in the following situations:

  * If your Controller uses an old machine image and you are trying to upgrade to a new software version that requires the latest image. 
  * If you need to transition to a newer machine image for your Controller based on a recommendation from Aviatrix Support.

.. note::

  A machine image is named a "VM image" (Virtual Machine Image) in Azure, a "machine image" in GCP, and a "custom image" in OCI.

The Controller Migration process involves three main steps:

* Fulfill the prerequisites, including backing up your old Controller.
* Delete your old Controller in the CSP Account from which you originally launched it: Azure, GCP, or OCI.
* Launch a new Controller from the relevant CSP marketplace.
* Restore the data from your old Controller to your new Controller.

.. important::

  The **Migrate** button under Settings > Maintenance > Migration tab only migrates Controllers that were launched from AWS. Controllers launched from Azure, GCP, or OCI need to be migrated manually, as shown below. To migrate a Controller that was launched from AWS, please see `this document <https://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_.

Prerequisites
^^^^^^^^^^^^^^^^^

* Run an `account audit <https://docs.aviatrix.com/HowTos/account_audit.html>`_ on the Controller account and all secondary accounts to make sure that the `IAM roles and policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_ are set up as suggested.
* Enable a `Controller backup <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ using the access account for the CSP from which you launched the Controller (Azure, GCP, or OCI).
* Schedule the migration during a maintenance window and a walk through the `pre-op checklist <https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures>`_.
* `Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ to the latest build of your current release.
* `Disable <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-disable-controller-ha>`_ your Controller's HA configuration if HA is set up. You can `reenable <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ HA on the new Controller once migration is complete.
* If you are using SAML login for either the Controller login (Settings/Controller/SAMLLogin) and/or for openvpn authentication (OpenVPN/Advanced/SAML), please make sure that the endpoints configured on the Controller and the SAML applications in the IdP match exactly.

.. note::

Do not add any new configurations to your old Controller before migrating, as those updates may be lost in the migration process.

.. important::

`Disabling <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-disable-controller-ha>`_ HA configuration is critical.

Migrate
^^^^^^^^^^^^^^

.. note::

  A temporary EIP is created for business continuity during migration.  A new private IP will be created on the new Controller.

Controller Migration in Azure
##################################

1. In your old Controller, navigate to Settings > Maintenance > Backup & Restore tab > Backup and click **Backup Now**.
2. Launch the new Controller from the Azure marketplace. Use `these instructions <https://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html>`_.

Controller Migration in GCP
##################################

.. note::

GCP Controller image in 5.4 versions and higher versions of the Controller image are based on the 18.04 ubuntu distribution.

1. In your old Controller, navigate to Settings > Maintenance > Backup & Restore tab > Backup and click **Backup Now**.
2. Create a new Controller based on the latest GCP Controller image. Use `these instructions <https://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`_.

Controller Migration in OCI
##########################

1. In your old Controller, navigate to Settings > Maintenance > Backup & Restore tab > Backup and click **Backup Now**.
2. Create a new Controller based on the latest OCI Controller image. Use `these instructions <https://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`_.

Post Migration Tasks
---------------------------

After testing to ensure that the Controller migration is complete and successful, you can delete the old Controller. It can be left in "Stopped" status for a while, but it should never be started. If it is started, this old Controller will reach out to the gateways and the network could have issues with two Controllers trying to monitor/modify the gateways. 

Migrating the Controller IP Address
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After migrating to a new Controller, make sure you have migrated your public IP address as well. 

1. In Azure, GCP, or OCI, disassociate the Static Public IP or Elastic IP address from your old Controller and associate it with your new Controller.
2. In your new Controller, in the left sidebar, go to Troubleshoot > Diagnostics > scroll down to the Controller IP Address Migration section. If two IPs display under Controller Public IP, click **Migrate**.

Restore
^^^^^^^^^^^^^^^^^^^^^^^^^^

Restore the data from your old Controller. In your new Controller, go to Settings > Maintenance > Backup & Restore tab > Restore and click **Restore**.

.. disqus::
