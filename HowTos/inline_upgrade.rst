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
   
Pre-upgrade Checklist:
-----------------------

Here are a few steps that we suggest you go through before the actual upgrade. If you are scheduling the upgrade during a maintenance window, you can execute these before the maintenance window, so you can make best use of your downtime.

#. Ensure that all gateways are in green/up status. If not, please check out `Support Center <https://docs.aviatrix.com/Support/support_center.html>`_ for common issues and solutions
#. Ensure that all the tunnels are green/up - if not, work with the right teams to debug and bring them up.
#. Execute "AviatrixConsole/Settings/Maintenance/Upgrade/DryRun" to make sure that all gateways are ready for upgrade. If any gateways fail the dry run, please run "AviatrixConsole/Troubleshoot/Diagnostics/Gateway/Diagnostics" and review results to make sure there is a good communication path between the Controller and the Gateway. If you cannot fix it, please click on "Submit Results" and then open a ticket by sending an email to support@aviatrix.com.
#. Please make sure that you have the right accounts/credentials to update IAM policies in all AWS accounts during the upgrade process


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
    
#. Please go to “”AviatrixConsole/Settings/Maintenance/Upgrade/GatewayUpgradeStatus” and check that all gateways have been upgraded - “Current Version” on all gateways should match the version you have upgraded to. Please flip through additional pages if you have more than 20 gateways. If any gateway failed, please run `diagnostics <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_ and a `forced upgrade <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_. If needed, please open a ticket with diags and `tracelogs  <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_.
#. Make a backup after the upgrade by following instructions documented `here <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.
#. If you are using terraform, please use the appropriate branch from https://github.com/AviatrixSystems/terraform-provider-aviatrix. For more information please go to https://github.com/AviatrixSystems/terraform-provider-aviatrix#controller-version

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

Please also keep your AWS IAM Policies updated to the latest (preferably before upgrading controller software).

Step 01: Login to your AWS GUI console

|common_image1|

Step 02: Go to IAM service

|common_image2|

A. Update “aviatrix-assume-role-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Step 03: Click "Policies" and search for the policy "aviatrix-assume-role-policy"

If you have not created "aviatrix-assume-role-policy", please see
`here <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#create-aviatrix-assume-role-policy>`__.

|aviatrix-assume-role-policy_image3|

Step 04: Click Edit Policy

|aviatrix-assume-role-policy_image4|

Step 05: Click tab "JSON"

Step 06: Update Policy: copy and paste the policy text from `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`__ and then click button "Review policy" and button "Save changes".

B. Update “aviatrix-app-policy”:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Step 07: Click "Policies" and search for the policy "aviatrix-app-policy"

If you have not created "aviatrix-app-policy", please see
`here <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#create-aviatrix-app-policy>`__.

|aviatrix-app-policy_image5|

Step 08: Click Edit Policy

|aviatrix-app-policy_image6|

Step 09: Click tab "JSON"

Step 10: Update Policy: copy and paste the policy provided by `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__ and then click button "Review policy" and button "Save changes".

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
