.. meta::


====================================
Aviatrix OpenVPN® Feature Highlights
====================================

This document highlights Aviatrix OpenVPN® features. For how to instructions, consult `this link <http://docs.aviatrix.com/HowTos/uservpn.html>`_.

VPN Management
--------------------------

- **Centrally Managed**  A single pane of glass allows you to manage all VPN users, VPN certificates, and VPN user visibility.  
- **OpenVPN® Compatible** Built on OpenVPN® and is compatible with all OpenVPN® client software. 
- **Split Tunnel** Supports split tunnel mode where only specified CIDRs ranges go through the VPN tunnel. 
- **Full Tunnel** Supports full tunnel mode where all user IP sessions including Internet browsing go through the VPN tunnel. 
- **PKI Management** Supports Bring Your Own (BYO) PKI management system.
- **Force Disconnect** Any admin can force disconnect a VPN user from the Controller. 
- **Dashboard** View all active VPN users and their connection history from the Controller dashboard.
- **API** Support API for all management activities.

Authentication Options 
-------------------------------------------

- **LDAP/AD Integration**  Authenticates VPN user from Aviatrix Gateways in addition to VPN certificate authentication.
- **DUO Integration** Authenticates VPN user from Aviatrix Gateways in addition to VPN cert authentication.
- **OKTA Integration** Authenticates VPN user from Aviatrix Gateways in addition to VPN cert authentication. 
- **MFA Integration** Combines LDAP and DUO for multi-factor authentication. 
- **Shared Certificate** Supports a shared certificate arrangement among VPN users. (When this option is is selected, you should enable additional authentication options to ensure secure access.) 
- **Client SAML Integration** Authenticates a VPN user directly from the Aviatrix VPN client to any IDP via SAML protocol.

Authorization
--------------

- **Profile-Based Access Control** Each VPN user can be assigned to a profile that is defined by access privileges to network, host, protocol and ports. The access control is dynamically enforced when a VPN user connects to the public cloud via an Aviatrix VPN Gateway.  

For more description, refer to `this link <https://docs.aviatrix.com/HowTos/openvpn_faq.html#what-is-user-profile-based-security-policy>`_.

For how to create user profiles and access policies, refer to `this link <https://docs.aviatrix.com/HowTos/openvpn_faq.html#how-do-i-setup-profile-based-security-policies>`_.

For how to assign VPN users to profiles, refer to `this link <https://docs.aviatrix.com/HowTos/openvpn_faq.html#how-do-i-assign-a-user-to-a-profile>`_.

Scale Out Performance
-------------------------------------

- **TCP-based VPN** For a universal/no firewall/no fuss user VPN solution, use an Aviatrix-integrated NLB to load balance multiple Aviatrix VPN gateways. When NLB is used, OpenVPN® client software runs on TCP port 443. TCP-based VPN requires no special corporate firewall rules when VPN client is on-prem.
- **UDP-based VPN**  For a high performance user VPN solution, use Aviatrix-integrated AWS Route53 round robin routing to load balance multiple Aviatrix VPN gateways. When Route53 round robin routing is used, OpenVPN® client software runs on UDP port 1193. UDP-based VPN has improved file transfer performance.
- **Geo VPN** For TCP-based VPN, you can use Aviatrix-integrated AWS Route53 latency-based routing to load balance clients residing in different geographic locations.  

Logging Integration
-------------------

- **VPN User** VPN user connection history and bandwidth usage can be logged to Splunk, SumoLogic, ELK, Remote Syslog and DataDog.
- **User Activity** Each VPN user TCP/UDP session can be logged to Splunk, SumoLogic, ELK, Remote Syslog and DataDog.

Client Software
---------------------------
 
- **OpenVPN® Client Software** All OpenVPN® client software is supported. The supported clients are macOS, Windows, iOS, Android, Chromebook, Linux and BSD. 
- **Aviatrix VPN Client** Aviatrix VPN Client supports macOS, Windows and Linux Debian distribution and BSD distribution. Choose Aviatrix VPN Client if you require SAML authentication directly from VPN client software. 
To download and install Aviatrix VPN Client, refer to `this link <https://docs.aviatrix.com/Downloads/samlclient.html>`_.

OpenVPN® is a registered trademark of OpenVPN Inc.

.. disqus::
