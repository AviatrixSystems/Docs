.. meta::
   :description: software upgrade of controller and gateways
   :keywords: hitless upgrade, inline upgrade, upgrade gateway software, no packet loss upgrade

###################################
Inline Software Upgrade
###################################

Aviatrix software is released frequently every 6 - 8 weeks.

When upgrading a controller software, all gateways are upgraded with the new software at the same time. This is done by controller pushing new software to gateways directly and automatically once requested.

How to upgrade software
------------------------

Upgrades are done from the Controller UI.  To check for an available update and perform an upgrade, follow these steps:

#. Login to your Controller
#. Expand `Settings` navigation menu item
#. Click `Maintenance`
#. Click `Upgrade to the latest` to upgrade your software to the latest version

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

When a release affects OpenVPN® users, the Release Note will make a note of it.
Make sure you read Release Notes before applying an upgrade.


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
