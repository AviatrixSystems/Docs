.. meta::
  :description: Aviatrix Client VPN Features 
  :keywords: cloud working, Openvpn, SSL vpn, remote vpn, client vpn, Aviatrix 


====================================
Aviatrix OpenVPN Feature Highlights
====================================

This document highlights Aviatrix OpenVPN features. For how to setup Aviatrix OpenVPN
for developers and remote workers to access public cloud, consult `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`_

VPN Management
---------------

- **Centrally Managed**  A single panel of glass allows you to manages all vpn users, vpn certificates and vpn user visibilities.  
- **OpenVPN Compatible** Build on OpenVPN and is compatible with all OpenVPN client software. 
- **Split Tunnel** Support split tunnel mode where only specified CIDRs ranges go through the vpn tunnel. 
- **Full Tunnel** Support full tunnel mode where all user IP sessions including Internet browsing go through the vpn tunnel. 
- **PKI Managment** Support bring your own (BYOL) PKI management system. 
- **Force Disconnect** All admin to force disconnect a vpn user from the controller console. 
- **Dashboard** View all active vpn users and their connectivities history from the controller console dashboard.
- **REST API** Support REST API for all managment activities.

Authentication Options 
-----------------------

- **LDAP/AD Integration**  Authenticates vpn user from Aviatrix gateways in addition to vpn certificate authentication.
- **DUO Integration** Authenticates vpn user from Aviatrix gateways in addition to vpn cert authentication.
- **OKTA Integration** Authenticates vpn user from Aviatrix gateways in addition to vpn cert authentication. 
- **MFA Integration** Combines LDAP and DUO for multi-factor authentication. 
- **Shared Certificate** Support a shared certificate arrangment among vpn users. (When this option is is selected, you should enable additional authentication options to ensure secure access.) 
- **Client SAML Integration** Authenticate vpn user directly from Aviatrix VPN client to any IDP via SAML protocol.

Authorization
--------------

- **Profile Based Access Control** Each vpn user can be assigned to a profile that is defined by access privilages to network, host, protocol and ports. The access control is dynamically enforced when a vpn user connects to the public cloud via an Aviatrix vpn gateway.  

Scale Out Performance
----------------------

- **TCP based VPN** You can use Aviatrix integrated ELB to load balance multiple Aviatrix vpn gateways. When ELB is used, OpenVPN client software runs on TCP port 443. TCP based VPN requries no corporte firewall when VPN client is on-prem.
- **UDP based VPN**  You can use Aviatrix integrated AWS Route53 round robin routing to load balance multiple Aviatrix vpn gateways. When Route53 round robin routing is used, OpenVPN client software runs on UDP port 1193. UPD based VPN has improved file transfer performance. 
- **Geo VPN** For TCP based VPN, you can use Aviatrix integrated AWS Route53 latency based routing to load balance clients resided in different geographic locations.  

Logging Integration
-------------------

- **VPN User** vpn user connectivity history and bandwidth usage can be logged to Splunk, SumoLogic, ELK, Remote Syslog and DataDog.
- **User Activitiy** each vpn user TCP/UDP session can be logged to Splunk, SumoLogic, ELK, Remote Syslog and DataDog.

Client Software
----------------
 
- **OpenVPN Client Software** All OpenVPN client software are supported. The supported clients are macOS, Windows, iOS, Android, Chromebook, Linux and BSD. 
- **Aviatrix VPN Client** Aviatrix VPN Client supports macOS, Windows and Linux Debian distribution and BSD distribution. Choose Aviatrix VPN Client if you require SAML authentication directly from vpn client software. 

.. disqus::
