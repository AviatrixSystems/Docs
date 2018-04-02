.. meta::
   :description: software upgrade of controller and gateways
   :keywords: hitless upgrade, inline upgrade, upgrade gateway software, no packet loss upgrade

###################################
Inline Software Upgrade
###################################

Aviatrix software is released frequently every 6 - 8 weeks.
When a new release becomes available, an email will be sent to the controller admin.

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


.. disqus::

.. |imageUpgrade| image:: inline_upgrade_media/controller_upgrade.png
