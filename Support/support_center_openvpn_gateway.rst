.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
OpenVPN Gateway
===========================================================================

SAML
^^^^

* **Our recommended design** is to let your VPN users connect into your cloud environment through one gateway and use the peering between VPC’s to provide access to your VPN Client’s into your other VPC’s. We recommend using VPN profiles to control/limit access to other VPC’s as you see fit.
* **SAML and User on Controller:** Once you enable SAML auth for an OpenVPN gateway, you need to create a dummy user on the controller to create a .ovpn file – you can share this user’s .ovpn file with all of your users. As the second authentication is through SAML, this should provide good security. This is per VPC+ELB/GW setup. If you have more than one such deployed VPC+ELB/GW setups, you would need a .ovpn file for each of those setups.
* **Multiple Simultaneous Sessions from Client:** Currently we do not support multiple VPN sessions from the same pc via the Aviatrix VPN Client. We only support SAML auth via our `Aviatrix VPN Client <https://docs.aviatrix.com/Downloads/samlclient.html>`_
* **Profile from IdP:** If a custom attribute “Profile” is added in IdP and passed to Aviatrix during authentication, Aviatrix controller can attach the Profile provided by the IdP to the VPN user. Currently we only allow one profile value to be passed via SAML auth. This will override any local settings on the controller.
* **Multiple Profiles for each User:** If you want to have more than one profile, you can create a user on the controller and attach one or more profiles to this user. Please make sure that all the base policies are the same if you do use multiple profiles per user. You can share this users .ovpn file with the set of users you would want to have these Profiles associated. Please note that, for these users if the controller receives a Profile value during the SAML auth from the IdP – that will override the settings on the Controller. For example, you can create four users – “general”, “dev”, “mktg”, “admin”.

  * You can associate no profiles with “general” user and share the .ovpn file for the “general” user with all your OpenVPN users who would have profiles set at the IdP
  * For “dev” user you can associate with, say, “developer” profile – which provides access to the developer vpc. You can share “dev” user’s .ovpn file with all developers
  * For “mktg” user you can associate with, “marketing” and “sales” profiles – which provides access to the marketing and sales VPC’s. You can share “marketing” user’s .ovpn file with all marketing employees
  * You can attach all profiles to “admin” user– which provides access to all VPCs. You can share “admins” user’s .ovpn file with all admins

* Microsoft Edge does not behave well with SAML authentication process when it is set as the default browser. Please try setting your default browser to Firefox or Chrome.

Miscellaneous
^^^^^^^^^^^^^

* How to delete a Network Load Balancer which is created by Aviatrix? 

  * An ELB will be automatically deleted by the Aviatrix Controller if all the gateways behind it are deleted and if there are no more users attached to it. The last resort to delete an ELB is delete it from Troubleshoot > ELB.

* Tunneblick VPN Client might show a warning about "comp-lzo" being deprecated when connecting to Aviatrix OpenVPN Gateway. You can safely ignore this message. We have kept this option in for backward compatibility
* Aviatrix VPN Client needs to be able to resolve localhost.aviatrix.com to 127.0.0.1. DD-WRT router is known to have an issue resolving this, so your VPN connection might fail. Please take a look at this `link <https://forum.dd-wrt.com/phpBB2/viewtopic.php?p=1064711>`_ for a workaround.
* If you encounter "Permission Denied" error while starting Aviatrix VPN Client on Microsoft Windows, you can fix this by running it with administrator role. Here's steps for Windows 10.
    
  * From Start Menu, find Aviatrix VPN Client. Right-click and select Open File Location.
  * Right-click the program and go to Properties.
  * On the Properties window, click the Compatibility tab.
  * Under the Compatibility mode section, check the "Run as administrator" checkbox.
  * Click the OK button to save the settings and start the program again.

* Looking for an easy LDAP solution? Check out `AWS's LDAP <https://aws.amazon.com/directoryservice/faqs/>`_. 
* Deploy your Aviatrix OpenVPN Gateway's behind an ELB so you can scale up when needed and don't have to worry about losing IP address and having to reissue certificates.
* Make sure that there is no overlap between the local subnet of the computer running the VPN Client and the VPN CIDR Block. `Link <https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block>`_
* Be default, split VPN clients can only reach the VPC that the OpenVPN gateway is deployed. If you want them to reach other VPC's, please add them to "VPN CIDR" - `instructions <https://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html#multiple-vpcs-in-multi-regions-split-tunnel>`_
* In a Transit solution, note that traffic between spokes is not allowed and hence your clients will not be able to reach other spoke VPC's - checkout "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_". Also traffic from `Transit VPC <https://docs.aviatrix.com/HowTos/site2cloud.html#advertise-transit-vpc-network-cidr-s>`_ is also not advertised by default. 
* Using profiles to manage access? If you are assigning multiple profiles to same users - make sure they have the same base policies (allow all or deny all).
* Sometimes the clients might take some time to connect due to ELB's load - check the logs on the client.
* In the case of a full tunnel deployment, if an OpenVPN Gateway is edited to toggle the "Use VPC/VNet DNS Server" setting, please follow it by clicking on  OpenVPN/EditConfig/ReloadDHCPConfiguration to let the changes take effect. Note that this will restart the OpenVPN processes on the gateway, affecting all the connected clients.
* You can use `REST API <https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_get_vpn_ssl_ca_configuration>`_ to download vpn configuration for your users and save it on a shared folder, if you do not want to send them via email.



