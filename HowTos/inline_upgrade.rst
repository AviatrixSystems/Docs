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

#. Please check our `pre-operations checklist <https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures>`_ before any operations on your controller
#. Ensure that all gateways are in green/up status. If not, please check out `Support Center <https://docs.aviatrix.com/Support/support_center.html>`_ for common issues and solutions
#. Ensure that all the tunnels are green/up - if not, work with the right teams to debug and bring them up.
#. Execute "AviatrixConsole/Settings/Maintenance/Upgrade/DryRun" to make sure that all gateways are ready for upgrade. If any gateways fail the dry run, please run "AviatrixConsole/Troubleshoot/Diagnostics/Gateway/Diagnostics" and review results to make sure there is a good communication path between the Controller and the Gateway. If you cannot fix it, please click on "Submit Results" and then open a ticket by sending an email to support@aviatrix.com.
#. Please make sure that you have the right accounts/credentials to update IAM policies in all AWS accounts during the upgrade process
#. Please make a backup and check the S3 bucket to make sure the process was successful. If you don't have backup enabled, please follow the `backup instructions <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ to enable it.
#. If your controller is in AWS and running on a t2/t3 instance type, please make sure that "T2/T3 Unlimited" attribute is set to "enabled" via the AWS Console - select controller instance, click on "Actions/InstanceSettings/Change T2.T3 Unlimited/Enable"
#. Please make sure that your controller has DNS service available and has public network access - you can verify that by pinging www.google.com at "Controller/Troubleshoot/Diagnostics/Network/ControllerUtility". This is a requirement for upgrade and for the controller to function as designed.
#. Please run  account audit for all your AWS accounts from "Controller/Accounts/AccountAudit" - please make sure that all of them pass. The IAM policies should be setup as documented. If you have any issues, please look at our `troubleshooting playbooks <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_overview.html>`_
#. Our Controller AMI's are periodically upgraded. If you would like to upgrade your AMI, please follow the links listed below.
    * In release 5.3, we introduced a feature to upgrade the AMI of the controller from within the UI, for AWS.
    * If your Controller is on 5.2 or older release or if your controller is in Azure or GCP, you would have to migrate your Controller manually.
    * Release 5.4 requires that your Controller be running on an 1804 based AMI. If your Controller is running an older 1404 AMI you would have to first migrate your controller before upgrading to 5.4
    *  If in AWS, please check the AMI Name from “AWS portal Services/EC2/SelectControllerInstance/DescriptionTab/AMI-ID”. If it does not have 1804 in the Name, then it is running an older AMI. If the name has 1804 then it is running a newer AMI and migration is optional.
    * You can upgrade your controller by following the directions here
        * `Migration when an AMI type change is required <https://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_
        * `Controller AMI Migration: Azure: AWS <https://docs.aviatrix.com/HowTos/controller_migration.html>`_
        * `Controller AMI Migration: Azure <https://docs.aviatrix.com/HowTos/controller_migration.html#controller-migration-in-azure>`_
        * `Controller AMI Migration: GCP <https://docs.aviatrix.com/HowTos/controller_migration.html#controller-migration-in-gcp>`_



How to upgrade software
------------------------

Upgrades are done from the Controller UI.  To check for an available update and perform an upgrade, follow these steps:

#. Follow the directions listed below in this document to update your IAM policies in all accounts, before starting the upgrade process
#. Log in to your Controller.
#. Expand `Settings` navigation menu item
#. Click `Maintenance`
#. Click `Dry Run` to make sure the controller and gateway are in contact and allowed to download our software from our release server. If the `Dry Run` is unsuccessful, you may want to check controller/gateway security groups and VPC DNS settings to make sure their outbound traffic to Internet is allowed. 
#. Make a backup before the upgrade by following the instructions documented `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.
#. Click `Upgrade to the latest` to upgrade your software to the latest version

    #. If upgrading from a release<3.3.x: Please upgrade to the next immediate release by entering the right version in "Upgrade to custom release" - the correct order is: 2.5, 2.6, 2.7, 3.0, 3.1, 3.2, 3.3
    #. Upgrading from a release>=3.3.x: The Aviatrix Controller will enforce incremental upgrades, so please click on "Upgrade to the Latest". You might have to go through multiple upgrades before you reach the latest release. Follow the directions in the next note when you upgrade to release 4.0
    #. If upgrading from a release<4.0: Once you upgrade to 4.0, please go to "Aviatrix Console > Troubleshoot > Diagnostics > Services" and click on "Restart Cloudxd" - please click on it only one time, wait for a minute, close your browser and start a new https connection to Aviatrix Console. This is only needed if your controller is based on 14.04 AMI. This will not be required for later AMI's.
    #. **If you are running 4.7 or reached 4.7 during upgrade,** the next release to upgrade is 5.0 and you would have to go to "Upgrade to Custom Release" and enter "5.0" in "Release Version" and click on "Upgrade to a Custom Release" button. Once you have reached 5.0, you can go back to using "Upgrade to the Latest" button.
    #. **If you are running 5.4 or reached 5.4 during upgrade,** please check the version you are running. If you are running 5.4.1990 or higher, you can use "Upgrade to the Latest" to move to 6.0. If you are running a build lower than 5.4.1290, please upgrade to the latest 5.4 build by entering "5.4" in "Release Version" and click on "Upgrade to a Custom Release" button. Once you have reached a build 5.4.1290 or higher, you can go back to using "Upgrade to the Latest" button to move to 6.0
    #. **If you are running 6.0 or reached 6.0 during upgrade,** please check the version you are running. If you are running 6.0.2483 or higher, you can use "Upgrade to the Latest" to move to 6.1. If you are running a build lower than 6.0.2483, please upgrade to the latest 6.0 build by entering "6.0" in "Release Version" and click on "Upgrade to a Custom Release" button. Once you have reached a build 6.0.2483 or higher, you can go back to using "Upgrade to the Latest" button to move to 6.1

    #. **If you are trying to upgrade to the latest build in the same release that you are currently on,** please use the "Upgrade to Custom Release" and type in your release. For example, if you are running 5.2.2186 and the latest release shows 5.3.1499 and you would like to upgrade to 5.2.latestrelease (let's say 5.2.2199) and avoid going to 5.3 - you should type in "5.2" in the "Upgrade to Custom Release" textbox and then click on "Upgrade to Custom Release" button.

#. Please go to "AviatrixConsole/Settings/Maintenance/Upgrade/GatewayUpgradeStatus" and check that all gateways have been upgraded - “Current Version” on all gateways should match the version you have upgraded to. Please flip through additional pages if you have more than 20 gateways. If any gateway failed, please run `diagnostics <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_ and a `forced upgrade <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_. If needed, please open a ticket with diags and `tracelogs  <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_.
#. Make a backup after the upgrade by following instructions documented `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.
#. If you are using terraform, please use the appropriate branch from https://www.terraform.io/docs/providers/aviatrix/index.html (old link: https://github.com/terraform-providers/terraform-provider-aviatrix). For more information please go to https://www.terraform.io/docs/providers/aviatrix/index.html (old link: https://github.com/terraform-providers/terraform-provider-aviatrix#controller-version).
#. If you are using Aviatrix VPN Client, please consider upgrading to the `latest release <https://docs.aviatrix.com/Downloads/samlclient.html>`_.

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
