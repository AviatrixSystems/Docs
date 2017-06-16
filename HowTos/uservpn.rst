.. meta::
  :description: Cloud Networking Ref Design
  :keywords: cloud networking, aviatrix, Openvpn, SSL vpn, remote vpn 


=================================
OpenVPN
=================================

This guide helps you build a user vpn solution. If you like to learn how to build a user vpn solution with multiple VPCs, refer to `this link. <http://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html>`__

Configuration Workflow
----------------------

Tips: Mouse over the fields to see its definition. Do a software upgrade
if an upgrade alert message appears on your dashboard page.

The description in the steps below provides critical fields you need to
select; it may not include all fields. Make sure you have the correct
VPC ID and its region for the VPC ID field and region in each step.

1. Launch a gateway with VPN capability in a VPC

   a. Click Gateway. Click +New Gateway. 

   b. In the dropdown, select Cloud Type. 

   c. Provide a unique Gateway Name, such mgmt-gw. 

   d. Select one account you created earlier and a region, VPC ID, Public Subnet on which the vpn gateway will be launched and user will land.

   e. Select VPN Access. More fields will appear. If you just want a basic user vpn solution without multi-factor authentication, you can skip the rest of the vpn related fields and click OK to launch a vpn gatewway. By default, ELB will be enabled, meaning you can create more vpn gateways that are load balanced by the ELB. (ELB will be automatically created by Aviatrix.)

   f. Use the default VPN CIDR Block. The VPN CIDR Block is the virtual IP address pool that VPN user will be assigned. 

   g. If you use a DUO or Okta for multi factor authenication, select one of them at Two-step Authentication, more fields will appear. For details on Okta authentication, check out `this link. <http://docs.aviatrix.com/HowTos/HowTo_Setup_Okta_for_Aviatrix.html>`__  

   h. If you select Split Tunnel Mode, only the VPC CIDR traffic will go through the tunnel. If you specify "Additional CIDRs", then these and the VPC CIDR will go through the vpn tunnel. You can modify Split tunnel settings later when more VPCs are created. (Go to OpenVPN -> Edit Config -> MODIFY SPLIT TUNNEL to make changes. Make sure you specify all the CIDRs, separated by comma.) You can leave Nameservers and Search Domains blank if you don't have one.  
   i. ELB is enabled by default. If you disable ELB, your vpn traffic runs on UDP port 1194. When ELB is enabled, your vpn traffic runs on TCP 443. TCP 443 makes it easier to go through corporate firewall.  

   j.  Click LDAP if vpn user should be authenticated by AD or LDAP server. After you fill up the LDAP fields, make sure you run "Test LDAP Configuration" to test your configuration is valid. 

   k. If you wish to create more of such vpn gateways (for example, behind ELBsfor load balancing), click Save Template, which will save your LDAP and multi-factor authentication credentials. 


2. Add Users and Profiles

   A profile is defined by a list of access policies with allow or deny for policy. When a vpn user is connected to vpn gateway, the user's profile is pushed dynamically to the vpn gateway and the user can only access resources defined in the profile. When a vpn user disconnects from the gateway, the policies are deleted.  

   If a vpn user has no profile associatioin, the user has full access to all resurces. Note you can modify a user profile at any given time.  

   a. (Optionally) Go to OpenVPN -> Profiles to create as many profiles as you
      please. The target field can be FQDN (DNS names or fully qualified
      domain name).

   b. Go to OpenVPN -> VPN Users to add as many user as you please.
      Associate each user with a profile. Note if no profile is
      associated, user has full access to all resources. When a user is
      added to the database, an email with .ovpn file or .onc (for
      Chromebooks) will be sent to the user with detailed instructions.


.. disqus::
