.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
OpenVPN Gateway
===========================================================================


What is the recommended design for Aviatrix OpenVPN Solution?
---------------------------------------------------------------

**Our recommended design** is to let your VPN users connect into your cloud environment through an Aviatrix OpenVPN gateway, one or more behind a load balancer, and use the peering between VPC’s to allow access to your VPN Client’s into your other VPC’s. We recommend using VPN profiles to control/limit access to other VPC’s as you see fit.


How do I generate an .ovpn file for my SAML VPN users?
---------------------------------------------------------------------

Once you enable SAML auth for an OpenVPN gateway, you need to create a dummy user on the controller to generate an .ovpn file – you can share this file with all of your users. As the second authentication is through SAML, this should provide good security. This is per VPC+ELB/GW setup. If you have more than one such deployed VPC+ELB/GW setups, you would need a .ovpn file for each of those setups.


Can I connect via multiple VPN sessions from the same PC using Aviatrix VPN Client?
----------------------------------------------------------------------------------------------

Currently we do not support multiple VPN sessions from the same PC via the Aviatrix VPN Client


Which VPN Clients are supported with SAML authentication?
-----------------------------------------------------------------

At this time, we  support SAML authentication for our VPN clients only for our `Aviatrix VPN Client <https://docs.aviatrix.com/Downloads/samlclient.html>`_


Can I set a profile for my VPN user via SAML?
-----------------------------------------------------------------

You can add a custom attribute “Profile” in your IdP and the value will be passed to the Aviatrix OpenVPN gateway during authentication. Aviatrix controller will then attach the Profile provided by the IdP to the VPN user. Currently we only allow one profile value to be passed via SAML auth. This will override any local settings on the controller for this user.


Can I assign multiple profiles to the same users?
------------------------------------------------------------

You can assign multiple profiles to a VPN user - but, please make sure that they all have the same base policies (allow all or deny all).


What is the recommended default browser for Aviatrix OpenVPN with SAML Authentication?
--------------------------------------------------------------------------------------------

Microsoft Edge does not behave well with SAML authentication process when it is set as the default browser. Please try setting your default browser to Firefox or Chrome.


How to delete a Network Load Balancer which is created by Aviatrix? 
---------------------------------------------------------------------------------------------------

An ELB will be automatically deleted by the Aviatrix Controller if all the gateways behind it are deleted and if there are no more users attached to it. The last resort to delete an ELB is delete it from Troubleshoot > ELB. Please refrain from deleting an ELB from the AWS portal for any ELB created by Aviatrix controller.


Should I be worried about Tunnelblick VPN Client's warning message about "comp-lzo"?
----------------------------------------------------------------------------------------

Tunneblick VPN Client might show a warning about "comp-lzo" being deprecated when connecting to Aviatrix OpenVPN Gateway. You can safely ignore this message. We have kept this option in for backward compatibility


Why is my VPN client failing to connect with this error: “Network is unreachable for DNS resolution”?
-------------------------------------------------------------------------------------------------------

Aviatrix VPN Client needs to  have a successful name resolution for “localhost.aviatrix.com” to a local address 127.0.0.1. Some DNS servers do not allow this, resulting in the Aviatrix VPN Client failing to connect, displaying this error. If your dns server is resolving other domains, but failing to resolve localhost.aviatrix.com ("nslookup localhost.aviatrix.com" doesn’t return 127.0.0.1), you can employ a simple workaround of adding “localhost.aviatrix.com” pointing to “127.0.0.1” in the hosts file.
 
  * Mac/Linux: add “127.0.0.1  localhost.aviatrix.com” to /etc/hosts. You would need a sudo access for this
  * Windows: add “127.0.0.1  localhost.aviatrix.com” to C:\Windows\System32\Drivers\etc\hosts file. Please open your editor/notepad with “run as administrator” (edited)



Any known issue with DD-WRT routers?
-----------------------------------------------

Aviatrix VPN Client needs to be able to resolve localhost.aviatrix.com to 127.0.0.1. DD-WRT router is known to have an issue resolving this, so your VPN connection might fail. Please take a look at this `link <https://forum.dd-wrt.com/phpBB2/viewtopic.php?p=1064711>`_ for a workaround.


What should I do if Aviatrix VPN Client displays "Permission Denied" error?
--------------------------------------------------------------------------

If you encounter "Permission Denied" error while starting Aviatrix VPN Client on Microsoft Windows, you can fix this by running it with administrator role. Here are the steps for Windows 10:
    
  * From Start Menu, find Aviatrix VPN Client. Right-click and select Open File Location.
  * Right-click the program and go to Properties.
  * On the Properties window, click the Compatibility tab.
  * Under the Compatibility mode section, check the "Run as administrator" checkbox.
  * Click the OK button to save the settings and start the program again.
  

Looking for an easy LDAP solution for Aviatrix OpenVPN Solution?
------------------------------------------------------------------------------

Check out `AWS's LDAP <https://aws.amazon.com/directoryservice/faqs/>`_


How can I scale my VPN user setup?
---------------------------------------------------

Deploy your Aviatrix OpenVPN Gateway's behind a Load Balancer so you can scale up by adding more VPN gateways behind the ELB, when needed, and don't have to worry about losing IP address and having to reissue certificates to all of your VPN users. Alternatively, you may choose to use `Aviatrix UDP LoadBalanced VPN using DNS <https://docs.aviatrix.com/HowTos/DNSVPN.html>`_
.

How can the OpenVPN made Highly Available?
-----------------------------------------------

We have HA built into our OpenVPN system. By default the OpenVPN gateways are deployed behind a `Load Balancer <https://docs.aviatrix.com/HowTos/gateway.html#enable-elb>`_ in AWS. When you deploy additional OpenVPN gateways in the same VPC, they are deployed behind the same ELB, so the system becomes HA and resilient to any failures.

Here are `instructions <https://docs.aviatrix.com/HowTos/DNSVPN.html>`_ to use LB with UDP OpenVPN sessions.


What is the recommended VPN CIDR Block (default is 192.168.43.0/24)?
------------------------------------------------------------------------------

Make sure that there is no overlap between the local subnet of the computer running the VPN Client and the VPN CIDR Block. `Link <https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block>`_. Also make sure that you have enough ip address space to support all of you VPN usersm since we use 2 IP addresses per user, the 192.168.43.0/24 should be good for ~64 users. Pick a larger subnet for more users.


How does a vpn client access resources from different VPCs when connecting to OpenVPN gateway?
-------------------------------------------------------------------------------------------------

Be default, split VPN clients can only reach the VPC that the OpenVPN gateway is deployed. If you want them to reach other VPC's, please add them to "VPN CIDR" - `instructions <https://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html#multiple-vpcs-in-multi-regions-split-tunnel>`_


If OpenVPN gateway is created in a Spoke Gateway VPC in Transit Network, can my VPN users access other Spoke's resources?
---------------------------------------------------------------------------------------------------------------

In a Transit solution, note that traffic between spokes is not allowed by default and hence your clients will not be able to reach other spoke VPC's - checkout "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_". Also traffic from `Transit VPC <https://docs.aviatrix.com/HowTos/site2cloud.html#advertise-transit-vpc-network-cidr-s>`_ is also not advertised by default.

We recommend that you deploy OpenVPN on a separate Gateway to take advantage of the Load Balancer for scalability.


Why do my VPN clients take longer to connect, sometimes?
--------------------------------------------------------------------

Sometimes the clients might take some time to connect due to ELB's load - check the logs on the client. Temporary network connectivity issue, DNS resolution on your PC and other factors may contribute to this slow connection issue.


Why are my DNS settings changes not taking effect?
--------------------------------------------------------

In the case of a full tunnel deployment, if an OpenVPN Gateway is edited to toggle the "Use VPC/VNet DNS Server" setting, please follow it by clicking on  OpenVPN/EditConfig/ReloadDHCPConfiguration to let the changes take effect. Note that this will restart the OpenVPN processes on the gateway, affecting all the connected clients. The VPC DNS settings are shared with an OpenVPN user only in a Full tunnel setup. For split tunnel setup, the configured Nameservers field in OpenVPN/EditConfig/Modify Split Tunnel will be pushed to the connected clients. An empty Nameservers field will not push any DNS settings to the connected clients but instead will use the client's local DNS from his local network or manually configured. 


How can I send the VPN config files to my users?
------------------------------------------------------

By default, when you add the email address to a user, they will receive the VPN config file (.ovpn) via email. If you do not want to share these files via email, please do not enter the email address for the vpn users. You can then download these files, one at a time from the Controller, UI per user. You can use our `REST API <https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_get_vpn_ssl_ca_configuration>`_ - and then share it via your preferred mechanism with your VPN user. The REST API allows you to scale up if you deploy it via automation.


How can I customize the email that is sent out when a new VPN user is added?
--------------------------------------------------------------------------------------------

You can customize the message of the email and the filename of the .ovpn file by following the instructions `here <https://docs.aviatrix.com/HowTos/openvpn_faq.html?highlight=openvpn%20email#how-do-i-add-a-vpn-user>`_.  We will enhance this feature in future to allow you to customize the subject as well, stay tuned. 


My Mac is not picking up the DNS server setting when connected?
-------------------------------------------------------------------------

The OpenVPN gateway will push the DNS setting to the vpn clients (by default for full tunnel and when configured for split-tunnel). Note that an empty Nameservers field in split-tunnel mode will not push any DNS settings to the connected clients but instead will use the client's local DNS from his local network or manually configured.

If the Mac has the DNS configured manually, then it cannot be overwritten by the VPN Client. We have a couple of workarounds for this issue. 

* Turn on the "Allow override of manually set DNS" option in the VPN Client / Advanced / Advanced
* Change the DNS setting on your Mac so that it will be picked up from the DHCP server
