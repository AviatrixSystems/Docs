.. meta::
   :description: software upgrade of controller and gateways
   :keywords: hitless upgrade, inline upgrade, upgrade gateway software, no packet loss upgrade

###################################
Inline Software Upgrade
###################################

Aviatrix software is released frequently every 6 - 8 weeks.

When upgrading a controller's software, all gateways are upgraded with the new software at the same time. This is done by the controller pushing new software to gateways directly and automatically once requested.

.. note::
   
   We strongly recommend that you make a backup before you start the upgrade process. Please follow the directions `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`__.
   
   Please also check out our `release notes <https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html>`_.
   
Pre-upgrade Checklist:
-----------------------

Here are a few steps that we suggest you go through before the actual upgrade. If you are scheduling the upgrade during a maintenance window, you can execute these before the maintenance window, so you can make best use of your downtime.

#. Check `pre-operations checklist <https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures>`_ before any operations on your controller.
#. Ensure that all gateways are in green/up status. If not, check out `Support Center <https://docs.aviatrix.com/Support/support_center.html>`_ for common issues and solutions.
#. Ensure that all the tunnels are green/up - if not, work with the right teams to debug and bring them up.
#. Execute "AviatrixConsole/Settings/Maintenance/Upgrade/DryRun" to make sure that all gateways are ready for upgrade. If any gateways fail the dry run, please run "AviatrixConsole/Troubleshoot/Diagnostics/Gateway/Diagnostics" and review results to make sure there is a good communication path between the Controller and the Gateway. If you cannot fix it, please click on "Submit Results" and then open a ticket at https://aviatrix.zendesk.com or by sending an email to support@aviatrix.com.
#. Make sure that you have the right accounts/credentials to update IAM policies in all AWS accounts during the upgrade process.
#. Do a backup and check the S3 bucket to make sure the process was successful. If you don't have backup enabled, please follow the `backup instructions <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ to enable it.
#. If your controller is in AWS and running on a t2/t3 instance type, make sure that "T2/T3 Unlimited" attribute is set to "enabled" via the AWS Console - select controller instance, click on "Actions/InstanceSettings/Change T2.T3 Unlimited/Enable"
#. Make sure that your controller has DNS service available and has public network access - you can verify that by pinging www.google.com at "Controller/Troubleshoot/Diagnostics/Network/ControllerUtility". This is a requirement for upgrade and for the controller to function as designed.
#. Run  account audit for all your AWS accounts from "Controller/Accounts/AccountAudit" - please make sure that all of them pass. The IAM policies should be setup as documented. If you have any issues, please look at our `troubleshooting playbooks <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_overview.html>`_
#. Make sure that your account has elevated permissions to launch host instances where such operations may become necessary.
#. Please clean up your bucket where you store your controller backups, so that only the last 3 relevant configuration files are seen. Any old configurations should be moved out to your archive bucket/folder.
#. New Controller AMIs are published over time. If you would like to upgrade your AMI, please follow the links listed below.
    * In release 5.3, we introduced a feature to upgrade the AMI of the controller from within the UI, for AWS.
    * If your Controller is on 5.2 or older release or if your controller is in Azure or GCP, you would have to migrate your Controller manually.
    * Release 5.4 requires that your Controller be running on an 1804 based AMI. If your Controller is running an older 1404 AMI you would have to first migrate your controller before upgrading to 5.4
    *  If in AWS, please check the AMI Name from “AWS portal Services/EC2/SelectControllerInstance/DescriptionTab/AMI-ID”. If it does not have 1804 in the Name, then it is running an older AMI. If the name has 1804 then it is running a newer AMI and migration is optional.
    * You can upgrade your controller by following the directions here
        * `Migration when an AMI type change is required <https://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_
        * `Controller AMI Migration: Azure: AWS <https://docs.aviatrix.com/HowTos/controller_migration.html>`_
        * `Controller AMI Migration: Azure <https://docs.aviatrix.com/HowTos/controller_migration.html#controller-migration-in-azure>`_
        * `Controller AMI Migration: GCP <https://docs.aviatrix.com/HowTos/controller_migration.html#controller-migration-in-gcp>`_
#. New Gateway AMIs are published over time with fixes for known issues and vulnerabilites. We strongly recommend that you periodically check and update your gateway AMI's
    * New Gateways are automatically deployed with the latest AMI - we suggest that you upgrade to the latest Controller release and then deploy new gateways
    * Gateways can be upgraded to use the latest AMI's through the `gateway replace operation <https://docs.aviatrix.com/HowTos/image_release_notes.html#existing-customers-gateway-image-upgrade>`_. We recommend that this operation is executed when the Controller is running the latest version, so your gateways can be built using the latest AMI
    * If your controller is running V6.2.1955 or later, you can go to "Settings->Maintenance->Software Patches->Update Available Patches", to download a new utility called "Generate list of Aviatrix Gateways using deprecated AMIs". Running this patch will send an email to the admin with a list of gateways running deprecated AMI's.
    * **From v6.4, when you upgrade your Aviatrix Controller and Gateways, any gateways which are running on Ubuntu14 and Ubuntu16 run the risk of not getting upgraded** as documented in `Field Notice 28 <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0026-2021-04-28>`_. Please follow the instructions in the field notice to identify these gateways and replace them before you start your upgrade to 6.4
#. If you have deployed `Controller HA in AWS <https://docs.aviatrix.com/HowTos/controller_ha.html>`_, please check the version you have deployed. If there is a `newer version of Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html#faq>`_ available, you shoud upgrade by `disabling Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-disable-controller-ha>`_ and then `enabling the Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-enable-controller-ha>`_ feature. Do not stop the Controller if you have Controller HA feature enabled - this will deploy a new controller and restore the nightly backup. If you have to stop the Controller, you should first disable the Controller HA feature.
#. Please go through the list of `Field Notices <https://docs.aviatrix.com/HowTos/field_notices.html>`_ that are published and take actions for the ones that apply to your setup



How to upgrade software
------------------------

Upgrades are done from the Controller UI.  To check for an available update and perform an upgrade, follow these steps:

#. Follow the directions listed in this `document to update your IAM policies <https://docs.aviatrix.com/HowTos/iam_policies.html#automatically-updating-iam-policies>`_ in all accounts, before starting the upgrade process
#. Head to Upgrade section by logging in to your Controller, expand `Settings` navigation menu item and click on `Maintenance`
#. Click `Dry Run` to make sure the controller and gateway are in contact and allowed to download software from our release server. If the `Dry Run` is unsuccessful, you may want to check controller/gateway security groups and VPC DNS settings to make sure their outbound traffic to Internet is allowed. 
#. Make a backup before the upgrade by following the instructions documented `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.
#. Please clean up your bucket where you store your controller backups, so that only the last 3 relevant configuration files are seen. Any old configurations should be moved out to your archive bucket/folder.
#. Controller Upgrade Operation
    * For every single upgrade action, you should go through all of the following steps:
        * Ensure that all gateways and tunnels are up
        * Test all your network paths for connectivity - before upgrade
        * Backup your controller configuration before upgrade
        * Dry Run
        * Upgrade
        * Verify that all gateways are upgraded
        * Verify that all gateways and tunnels are up
        * Test all your network paths for connectivity - after upgrade
        * Backup your controller configuration - after upgrade
    * Upgrading Controller to the latest build in the Current Release
        * To upgrade to latest build in the same release that the Controller is currently on, please use the "Settings/Maintenance/Upgrade/Upgrade to Custom Release" and type in the current running release. For example, if your Controller is running 6.2.1000 and you would like to upgrade to latest build on 6.2 (let's say 6.2.2500) - you should type in "6.2" in the "Upgrade to Custom Release" textbox and then click on "Upgrade to Custom Release" button.
    * Upgrading Controller to next release
        * The first upgrade should always be to the latest build in the current release. For example, if you are starting with your Controller running 6.2.1000, you should first upgrade to latest build of 6.2, before you upgrade to 6.3 - by going to "Settings/Maintenance/Upgrade/Upgrade to Custom Release" and entering "6.2". After the first upgrade to latest build in the same release, use the following instructions to upgrade to next release (6.3 for this example)
        * You can use "Settings/Maintenance/Upgrade/Upgrade to the Latest" to move to the next release, except in the following cases:
            * If upgrading from a release<3.3.x: Please upgrade to the next immediate release by entering the right version in "Upgrade to custom release" - the correct order is: 2.5, 2.6, 2.7, 3.0, 3.1, 3.2, 3.3
            * When you reach release 4.0: Please go to “Aviatrix Console > Troubleshoot > Diagnostics > Services” and click on “Restart Cloudxd” - please click on it only one time, wait for a minute, close your browser and start a new https connection to Aviatrix Console. Continue upgrading using "Settings/Maintenance/Upgrade/Upgrade to the Latest"
            * When you reach release 4.7: Please go to "Upgrade to custom release" and enter "5.0"
#. Please go to "AviatrixConsole/Settings/Maintenance/Upgrade/GatewayUpgradeStatus" and check that all gateways have been upgraded - “Current Version” on all gateways should match the version you have upgraded to. Please flip through additional pages if you have more than 20 gateways. If any gateway failed, please run `diagnostics <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_ and a `forced upgrade <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_. If needed, please open a ticket with diags and `tracelogs  <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_. If any of the gateways were not upgraded as they were running older ubuntu 14 or ubuntu 16 images, you can `replace them to have them rebuilt with the latest ami's <https://docs.aviatrix.com/HowTos/image_release_notes.html#existing-customers-gateway-image-upgrade>`_. We recommend that these older gateways be replaced before upgrading to v6.4. Please check `Field Notice 28 <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0028-2021-05-03>`_
#. Make a backup after the upgrade by following instructions documented `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.
#. If you are using terraform, please use the appropriate branch from https://www.terraform.io/docs/providers/aviatrix/index.html (old link: https://github.com/terraform-providers/terraform-provider-aviatrix). For more information please go to https://www.terraform.io/docs/providers/aviatrix/index.html (old link: https://github.com/terraform-providers/terraform-provider-aviatrix#controller-version).
#. If you are using Aviatrix VPN Client, please consider upgrading to the `latest release <https://docs.aviatrix.com/Downloads/samlclient.html>`_.
#. Please review your Gateway AMI's and Controller AMI as mentioned in the `Pre-upgrade Checklist <https://docs.aviatrix.com/HowTos/inline_upgrade.html#pre-upgrade-checklist>`_ above and upgrade the AMI's, as needed.

.. note::
   
     To reduce issues related to upgrading, starting version 3.3, the Controller will let you upgrade only to the next maintenance release. For example, from 3.3.x, you can only upgrade to 3.4 first and can then upgrade again to get to 3.5. If you are running a version earlier than 3.3, please upgrade to the next higher version first and repeat till you get to 3.3, using the “Upgrade to a Custom Release” function. If you are running version 3.3 or later, you can upgrade using the “Upgrade to the Latest” method as mentioned above – but note that you might have to upgrade multiple times to get to the latest release.

     Example: A controller running 3.1 can go to the latest release(lets say, 3.5) using the following steps:
      - Backup. Upgrade to 3.2 using “Upgrade to a Custom Release”
      - Backup. Upgrade to 3.3 using “Upgrade to a Custom Release”
      - Backup. Upgrade to 3.4 using “Upgrade to the Latest”
      - Backup. Upgrade to 3.5 using “Upgrade to the Latest”

   |imageUpgrade|
   
.. note::
   
   If you have been provided a custom release version, please enter that version into the `Release Version` field and click `Upgrade to a custom release` button.

Inline and hitless software upgrade
-----------------------------------

Aviatrix software upgrade happens inline without taking down the controller.

In addition, gateway upgrades are hitless.  That is, all gateway encrypted tunnels stay up during the upgrade process. There is no packet loss when upgrading the software.

Upgrade impact on OpenVPN® users
--------------------------------

Most upgrades do not impact connected OpenVPN® users. In some cases, OpenVPN® service needs to be restarted as part of software upgrade, for example, upgrade to a new SSL version for security patch. In these cases, connected OpenVPN® users will be disconnected and will need to connect again.

Upgrading from release 4.3 and up will not result in an openvpn restart, so existing openvpn connections will not be dropped

When a release affects OpenVPN® users, the Release Note will make a note of it.
Make sure you read the Release Notes before applying an upgrade.

OpenVPN is a registered trademark of OpenVPN Inc.

How to update AWS-IAM-Policy
----------------------------------------

Login to the Controller, go to Accounts -> Access Accounts -> click on an AWS account, click the 3 dots skewer. In the drop 
down menu, select Update Policy, click OK to confirm. The IAM policy will be automatically updated. 

.. note::
   
   Please also update the AWS-IAM-Policy for all Secondary Access Accounts.

.. disqus::

.. |imageUpgrade| image:: inline_upgrade_media/controller_upgrade.png
.. |common_image1| image:: customize_aws_iam_policy_media/image2.png
   :width: 3.42946in
   :height: 2.39623in
.. |common_image2| image:: customize_aws_iam_policy_media/image3.png
   :width: 5.23044in
   :height: 3.58491in
.. |aviatrix-assume-role-policy_image3| image:: customize_aws_iam_policy_media/image6.png
   :width: 5.13900in
   :height: 3.28302in
.. |aviatrix-assume-role-policy_image4| image:: customize_aws_iam_policy_media/image7.png
   :width: 6.11245in
   :height: 3.92453in
.. |aviatrix-app-policy_image5| image:: customize_aws_iam_policy_media/image4.png
   :width: 5.13900in
   :height: 3.28302in
.. |aviatrix-app-policy_image6| image:: customize_aws_iam_policy_media/image5.png
   :width: 6.11245in
   :height: 3.92453in
