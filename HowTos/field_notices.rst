=======================================
Field Notices
=======================================

.. Note::

 This field notice is provided as a service to our customers to proactively update them on major issues. This service is provided without any changes in our SLA. The information in this field notice will be updated as we learn more.

Field Notice 0001 (2018/10/19)
-----------------------------------------------------------------------------
**SSL UserVPN with SAML function might fail with Chrome v70**
 
Problem
Remote users connecting via SSL UserVPN functionality authenticated through SAML cannot establish session.
 
Description
Aviatrix controllers and gateways provide SSL UserVPN service with authentication through SAML as described in `this doc <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_. Google Chrome v70 has altered the behavior of an element in HTML (they add an extra whitespace). This affects our product’s ability to interface with the SAML id providers and breaks the authentication process, resulting in remoteVPN users not being able to connect to your network. We have notified Google about this issue.
 
Solution
Customers deploying SSL UserVPN with SAML authentication are requested to upgrade to 3.5.362 or later, if they are running 3.3 or later release. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade. For software version prior to 3.3, please reach out to us at support@aviatrix.com. Another workaround to restore the service to your users is to use Firefox as their default browser.
  
Support:
For further information, or to open a support ticket, please visit https://www.aviatrix.com/support/.  
 
 
Field Notice 0002 (2018/10/19)
-------------------
**Route update propagation inconsistency from on-premise networks affecting 3.5 releases prior to 3.5.362 for Transit Network**
 
Problem:
BGP Route propagation could fail intermittently from on-premise networks to cloud networks in Transit Network.
 
Description:
Aviatrix controllers and gateways use BGP to summarize and propagate the network routes. Due to an unexpected software change, 3.5 releases prior to 3.5.362 are affected and cannot forward routes in certain scenarios. This issue has been addressed in 3.5.362 and all customers who have deployed Transit Network and are running any 3.5 release prior to 3.5.362 are advised to upgrade to 3.5.362 or later, immediately. Customers who are running software version prior to 3.5 are not impacted by this issue.
 
Solution:
Customers deploying Transit Network are requested to upgrade to 3.5.362 or later, if they are running any 3.5.(<362) release. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade.
 
Support:
For further information or to open a support ticket, please visit https://www.aviatrix.com/support/.
 
========================================================================================


Field Notice 0003 (2018/12/1)
-------------------
**RFC1918 route propagation from TGW to on-premise networks affecting 4.0 releases prior to 4.0.580 for TGW Hybrid Connection**
 
Problem:
BGP Route propagation of RFC1918 (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) could affect the on-premise networks if the on-prem is advertising the same RFC1918 routes.
 
Description:
Aviatrix controllers and gateways use BGP to summarize and propagate the network routes. Due to an unexpected software change, software releases prior to 4.0.580 are affected and will forward the RFC1918 routes to VGW. This issue has been addressed in 4.0.580 and all customers who have deployed TGW and are running any release prior to 4.0.580 are advised to upgrade to 4.0.580 or later, immediately. 
 
Solution:
Customers deploying TGW are requested to upgrade to 4.0.580 or later. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade. After upgrading to 4.0.580 or later, please go to TGW Orchestrator > Plan > Step 7 to detach Aviatrix Transit GW from TGW and re-attach Aviatrix Transit GW to TGW in Step 6.

 
Support:
For further information or to open a support ticket, please visit https://www.aviatrix.com/support/.
 
========================================================================================


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
