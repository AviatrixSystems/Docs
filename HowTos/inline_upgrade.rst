.. meta::
   :description: software upgrade of controller and gateways
   :keywords: hitless upgrade, inline upgrade, upgrade gateway software, no packet loss upgrade

###################################
Inline Software Upgrade
###################################

Aviatrix software is released frequently every 6 - 8 weeks. 
When a new release becomes available, an alert email will be sent to the 
controller admin. 

When upgrading a controller software, all gateways are upgraded with the new
software at the same time. This is done by controller pushing new software
to gateways directly and automatically. 

How to upgrade software
------------------------

At the controller dashboard, a !New alert icon appears when a new software becomes available, click the !New icon to upgrade. Select "UPGRADE TO THE LATEST" to upgrade.

Alternatively, go to Settings -> Controller -> Upgrade -> UPGRADE TO THE LATEST

Inline and hitless software upgrade
-----------------------------------

Aviatrix software upgrade happens inline without taking down the controller. 

In addition, gateway upgrade is hitless, that is, all gateway encrypted tunnels 
stay up without going down. There is no packet loss when upgrading the software. 

Upgrade impact on OpenVPN users
--------------------------------

Most upgrades do not impact connected OpenVPN users. In some cases,
OpenVPN service needs to be restarted as part of software upgrade, for example, 
upgrade to a new SSL version for security patch. 
in these cases, connected OpenVPN users
will experience an disconnect. They will need to connect again. 

When a release affects OpenVPN users, the Release Note will make a note of it.
Make sure you read Release Notes before making upgrade. 

.. disqus::
