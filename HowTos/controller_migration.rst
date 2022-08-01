.. meta::
   :description: controller Migration
   :keywords: controller high availability, controller HA, auto scaling, Azure, GCP, OCI

=========================================================
Controller Migration in Azure, GCP, and OCI
=========================================================

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

* Run an audit on the Controller’s primary access account and all the remaining secondary accounts to make sure that the IAM roles and policies are set up as suggested. In your Controller, go to Accounts > Access Accounts > select an account > click **Audit**. Repeat these steps for all access accounts for the CSP where your Controller instance is located (AWS, Azure, GCP, or OCI).
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

1. In your GCP account, make a list of the old Controller’s region, availability zone, instance size, and any specific subnets so that you can use the same parameters to launch the new Controller. To find this information, log into your GCP account > click on the menu in the top left and scroll down to Compute Engine > hover over Compute Engine and select VM instances. On the VM Instances page, find your Controller instance, click on the three dots on the right side of its row in the table, and select **View network details**.

(Optional) If you are using a BYOL license, note your old Controller's Customer ID. In your Aviatrix Controller, go to Settings > Controller > License > Setup Aviatrix Customer ID.

2. Take a backup of the existing Controller. In your Controller, go to Settings  >  Maintenance  > Backup & Restore  >  Backup. Click **Backup now**.

3. If you do not have a bucket for data storage, create a new one. In your GCP account, go to Cloud Storage > Browser.

|gcp_cloud_storage_browser|

4. Click **Create Bucket**. Add the necessary information and click **Create**.
5. If you have not reserved a static IP for the old Controller and want to do so, go to your GCP account > VPC Network > IP Addresses. Select **Reserve External Static Address**. 

|gcp_reserve_external_static_address|

6. Enter the details of the IP address and click **Reserve**.
7. Before stopping this old instance, disassociate the reserved IP address. Click **Change**. Then, click on the Attach to dropdown menu and select **None**.

|gcp_attach_to_none|

8. Shut down the old Controller instance. 

|gcp_stop_instance|

9. Launch a new Controller instance in the same region and VPC, of the same size as your old Controller. Review the details you saved from your old Controller to ensure they match. To launch the new instance, go to your GCP account > Marketplace > search for "Aviatrix" > choose your required Aviatrix platform > click **Launch**. Make sure to replicate the same region, subnet (if required), and size of the old Controller. See the `Google Startup Guide <https://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`_ for thorough instructions.
10. Once the new Controller launches, associate the reserved static IP address to this new instance. In your GCP account, go to VPC Network > IP Addresses > select the IP address > change > select the newly launched Controller.

Setting up the New GCP Controller
-----------------------------------------------

1. Log into the newly launched Controller instance. 

* Username  - admin
* Password  - the private IP of the newly launched instance

2. Set a new password and upgrade this Controller to the same version as your old Controller instance. This might take up to 5 minutes.
3. Log into the new Controller and onboard your primary access account (the GCP account). Make sure to have your Google Cloud credentials available, as you will need it to onboard your GCP account. In your Controller, go to Accounts > Access Accounts > GCP.
4. If you are using a BYOL Controller, onboard your Aviatrix Customer ID. This is necessary only if you are using a BYOL Controller. Use your old Controller's Customer ID.
5. Once everything is set up and ready, restore the backup from the bucket. Go to your Controller > Settings > Maintenance > Backup & Restore > Restore > fill in the appropriate details > click **Restore**.

It will take a few minutes for the backup to be restored. You can verify the dashboard to see if all the configuration from the old Controller has been restored. 

6. If you do not have an IP reserved for your Controller, and post-migration you have been assigned a new IP address, perform Controller IP migration. Go to Troubleshoot > Diagnostics > Controller IP address migration > click **Migrate**.

Before Controller IP migration :

|gcp_before_migrating_ip|

After Controller IP migration :

|gcp_after_migrating_ip|

See the instructions in the Post Migration Tasks section below to finish this Controller migration.

Controller Migration in OCI
#############################################

1. In your old Controller, navigate to Settings > Maintenance > Backup & Restore tab > Backup and click **Backup Now**.
2. Create a new Controller based on the latest OCI Controller image. Use `these instructions <https://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`_.

Post Migration Tasks
---------------------------

After testing to ensure that the Controller migration is complete and successful, you can delete the old Controller. It can be left in "Stopped" status for a while, but it should never be started. If it is started, this old Controller will reach out to the gateways and the network could have issues with two Controllers trying to monitor/modify the gateways. 

Migrating the Controller IP Address
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After migrating to a new Controller, make sure you have migrated your public IP address as well. 

1. In Azure, GCP, or OCI, disassociate the Static Public IP or Elastic IP address from your old Controller and associate it with your new Controller.
2. In your new Controller, in the left sidebar, go to Troubleshoot > Diagnostics > scroll down to the Controller IP Address Migration section. If two IPs display under Controller Public IP, click **Migrate**.

Restore
^^^^^^^^^^^^^^^^^^^^^^^^^^

Restore the data from your old Controller. In your new Controller, go to Settings > Maintenance > Backup & Restore tab > Restore and click **Restore**.

.. |gcp_cloud_storage_browser| image:: controller_migration_media/gcp_cloud_storage_browser.png
   :scale: 60%

.. |gcp_reserve_external_static_address| image:: controller_migration_media/gcp_reserve_external_static_address.png
   :scale: 60%

.. |gcp_attach_to_none| image:: controller_migration_media/gcp_attach_to_none.png
   :scale: 80%

.. |gcp_stop_instance| image:: controller_migration_media/gcp_stop_instance.png
   :scale: 70%

.. |gcp_before_migrating_ip| image:: controller_migration_media/gcp_before_migrating_ip.png
   :scale: 60%

.. |gcp_after_migrating_ip| image:: controller_migration_media/gcp_after_migrating_ip.png
   :scale: 60%

.. disqus::
