.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix OpenVPN End to End traffic Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot Aviatrix OpenVPN End to End traffic

Workflow:
---------

1. Check basic information - Cloud Permission, Aviatrix Controller, and Aviatrix Gateway

      `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
   
      `Aviatrix Controller Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_controller.rst>`_
      
      `Aviatrix Gateway Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_gateway.rst>`_
    
2. Troubleshoot OpenVPN Deployment configuration

  * Aviatrix
  
      `Check OpenVPN configuration from Aviatrix Controller`_
  
  * Cloud Platform
      
      `Check Aviatrix gateway’s instance level and network level for OpenVPN feature from AWS portal`_

      `Check AWS components which are created by Aviatrix when ELB function is enabled from AWS portal`_

3. Troubleshoot other Aviatrix Features Deployment configuration

    `Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue`_

4. Troubleshoot end device’s Deployment configuration
    
    `Check end/testing device's instance level and network level from AWS portal`_

5. Troubleshoot connectivity between Aviatrix and OpenVPN client
    
    `Check OpenVPN client’s log for detail`_
    
    `Troubleshoot Network between Aviatrix and OpenVPN client`_

6. Troubleshoot connectivity between OpenVPN client and end device

    `T_01. Verify Internet layer by sending ICMP traffic to the end device with IP`_

    `T_02. Verify Transport layer by sending traffic to the end device with IP/Protocol/Port`_

    `T_03. Verify DNS by issuing command #nslookup [DOMAIN NAME OF END DEVICE] on OpenVPN client`_

    `T_04. Verify connectivity between OpenVPN client and end device`_

Detail:
-------

Check OpenVPN configuration from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Check what tunnel mode is configured on this Aviatrix Gateway

      * https://docs.aviatrix.com/HowTos/openvpn_faq.html#is-full-tunnel-mode-supported-on-the-gateway

   *  Check VPN CIDR

      * https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block

   * Check additional CIRDs

      * https://docs.aviatrix.com/HowTos/gateway.html#additional-cidrs

   * Check Name server

      * https://docs.aviatrix.com/HowTos/gateway.html#nameservers

   * Check Search Domains

      * https://docs.aviatrix.com/HowTos/gateway.html#search-domains

   * Check Enable ELB

      * https://docs.aviatrix.com/HowTos/gateway.html#enable-elb

   * Check VPN NAT

      * https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat

   * More info in https://docs.aviatrix.com/HowTos/gateway.html

Check Aviatrix gateway’s instance level and network level for OpenVPN feature from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Check the Security Group which is attached to the Aviatrix Gateway
  
    * If ELB is enabled:
  
      * Type: Custom TCP Rule, Protocol: TCP, Port Range: 943, Source: Custom: ‘0.0.0.0/0'
  
    * If ELB is NOT enabled:
  
      * Type: Custom UDP Rule, Protocol: UDP, Port Range: 1194, Source: Custom: ‘0.0.0.0/0'

Check AWS components which are created by Aviatrix when ELB function is enabled from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Check whether Load Balancers is created
  
    * Listeners: TCP : 443

  Check Point 2: Check whether Target Groups is created
  
    * Description tab/Basic Configuration: Protocol: TCP, Port: 943, and Target type: instance
  
    * Targets tab:
    
      * Check whether the Instance ID is Aviatrix OpenVPN gateway
    
      * Port: 943
    
      * Status: healthy

Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Check whether OpenVPN Profiles feature is configured
  
    * https://docs.aviatrix.com/HowTos/openvpn_features.html#authorization
  
    * https://docs.aviatrix.com/HowTos/openvpn_faq.html#what-is-user-profile-based-security-policy
  
  * Check whether Site2Cloud feature is configured
  
    * https://docs.aviatrix.com/HowTos/site2cloud.html
  
    * If so, please make sure there is no overlap CIDR since S2C routing has high priority
  
  * Check whether Stateful Firewall is configured
  
    * https://docs.aviatrix.com/HowTos/tag_firewall.html
  
  * Check whether PBR is configured
  
    * https://docs.aviatrix.com/HowTos/gateway.html#enable-policy-based-routing-pbr

Check end/testing device's instance level and network level from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Check the Security Group which is attached to the end/testing instance
  
    * Expect to have at least allowing Aviatrix OpenVPN’s private IP in inbound rules if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is enabled:
    
      1. Type: All traffic, Protocol: All, Port Range: 0-65535, Source: Custom: ‘Aviatrix OpenVPN’s private IP'
  
    * Expect to have at least allowing virtual IP of the VPN user or the whole VPN CIDR in inbound rules if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is not enabled:
    
      1. Type: All traffic, Protocol: All, Port Range: 0-65535, Source: Custom: ‘VPN CIDR'

  Check Point 2: Check the Network ACL where Aviatrix Gateway locates
  
    * Expect to have the below rules in inbound rules as default:
  
      1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
    
      2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
  
    * Expect to have the below rules in outbound rules as default:
    
      1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
    
      2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
  
    * If customizing ACL is needed, make sure inbound and outbound has the regarding configuration for VPN traffic especially outbound rule

  Check Point 3: Check the Routing Table where your end device locates
  
    * Expect to have
    
      1. “VPC CIDR” local route
    
      2. a route entry “virtual IP of the VPN user” or “VPN CIDR” pointing Aviatrix Gateway if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is not enabled

  Check Point 4: Execute Packet Capture on end device if possible
  
    * Expect to view as below traffic for incoming traffic
    
      1. Aviatrix OpenVPN’s private IP if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is enabled.
    
      2. virtual IP of the VPN user if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is not enabled.
  
    * Expect to view outing traffic

Check OpenVPN client’s log for detail
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * https://docs.aviatrix.com/HowTos/openvpn_client_faq.html

Troubleshoot Network between Aviatrix and OpenVPN client
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  Check Point 1: Check whether OpenVPN client can reach to AWS NLB/Aviatrix OpenVPN gateway via internet
  
    * Check there is no firewall configuration blocking OpenVPN session on client’s environment

      * OS firewall

      * Network environment
      
      * https://docs.aviatrix.com/Support/support_center_openvpn_gateway.html#why-are-my-dns-settings-changes-not-taking-effect

    * Check the routing info on client’s OS/Network environment

      * Make sure client has access to internet especially the public IP of Aviatrix OpenVPN gateway or the domain name of AWS NLB

      * Utilize command traceroute/tracert to confirm the routing path

    * Attempt to issue telnet command from client’s OS to

      * The domain name of OpenVPN gateway/AWS NLB which you can copy from Aviatrix OpenVPN ovpn file with the parameter ‘remote'

    * If the above step fails, attempt to issue telnet command to the public IP of OpenVPN gateway/AWS NLB to differentiate whether it is DNS issue

  Check Point 2: Check whether VPN user is displayed on the Dashboard from Aviatrix Controller
  
    * https://docs.aviatrix.com/HowTos/openvpn_faq.html#what-are-the-monitoring-capabilities
    
    * If VPN user is not displayed, attempt to troubleshoot authentication
      
      * https://docs.aviatrix.com/HowTos/openvpn_features.html#authentication-options

      * For troubleshooting purpose, please consider disable authentication and attempt to establish OpenVPN session again

      * `Troubleshoot MFA authentication for NON SAML scenario`_

  Check Point 3: Check routing info on OpenVPN client’s OS after establishing OpenVPN session
  
    * Check whether your VPN CIDR overlaps or is same as your client’s network
    
      * https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block
      
      * If the CIDR is identical, please change either your client’s network or VPN CIDR of Aviatrix OpenVPN gateway
    
    * Check what tunnel mode is configured on this Aviatrix Gateway
      
      * https://docs.aviatrix.com/HowTos/openvpn_faq.html#is-full-tunnel-mode-supported-on-the-gateway
      
      * If it is split tunnel mode,
          
          * the VPC CIDR where your end device locates should display in your routing table
      
      * If it is full tunnel mode, 
          
          * since all traffic will forward to the OpenVPN virtual interface, at least the below routes should display in your routing table
              
              * 0/1 pointing to OpenVPN Gateway's VPN CIDR with OpenVPN virtual interface
              
              * 128.0/1 pointing to OpenVPN Gateway's VPN CIDR with OpenVPN virtual interface

  Check Point 4: Check DNS info on OpenVPN client’s OS after establishing OpenVPN session
  
    * https://docs.aviatrix.com/Support/support_center_openvpn_gateway.html#why-are-my-dns-settings-changes-not-taking-effect
    
    * If DNS info does not display properly in the client’s OS, please check
    
      * whether you hard code DNS in your PC/laptop
      
      * whether your office/home router hard code DNS settings

  Check Point 5:  Check the traffic between OpenVPN client and Aviatrix Gateway after establishing OpenVPN session
  
    * Test ICMP traffic from OpenVPN client to the private IP of Aviatrix OpenVPN gateway
    
    * Execute Packet Capture feature from Aviatrix Controller
      
      * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture
    
    * `Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue`_

Troubleshoot MFA authentication for NON SAML scenario
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  1. Check the logs on MFA authentication server if possible
  
    * Use a third-party tool or client to verify the security/credential works properly
  
  2. Check MFA authentication server's instance level and network level
  
    * If server is deployed in AWS portal, please check whether Security Group, Network ACL and Routing Table are configured properly to receive traffic from Aviatrix OpenVPN gateway.
  
    * If server is deployed in other cloud platforms, internet or On-Prem, please check the similar configuration
  
  3. `Check OpenVPN client’s log for detail`_
  
  4. Check whether Aviatrix OpenVPN gateway can reach to the authentication server
  
    * Utilize Aviatrix GATEWAY UTILITY feature to test ICMP traffic and DNS configuration
      
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY
    
      2. Attempt to send ICMP traffic to the IP of the server if possible
    
      3. Attempt to send ICMP traffic to the domain name of the server to verify Aviatrix gateway can resolve the domain name to IP properly
    
    * Utilize Aviatrix NETWORK CONNECTIVITY UTILITY feature to test the hostname and port
    
      * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#network-connectivity-utility

T_01. Verify Internet layer by sending ICMP traffic to the end device with IP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * For troubleshooting purpose, please consider allowing ICMP traffic on end device to confirm the whole routing path.
  
  * Steps:
  
    1. Send ICMP traffic from OpenVPN client to the end device with IP by Ping command
    
    2. Send ICMP traffic from OpenVPN client to the end device with IP by Traceroute/Tracert command

  * If the Ping fails, please check the traceroute/tracert report to figure out where the traffic ends

  Probable Causes:
  
    * End device does not allow ICMP traffic 
      
      * check for the private IP of Aviatrix OpenVPN gateway if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is enabled.
      
      * check for the VPN CIDR if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is disabled.
  
    * Traffic might be mis-routed or be blocked somewhere

  Suggestions:
  
    * `Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue`_
  
    * Execute Aviatrix feature “Packet Capture” on Aviatrix OpenVPN gateway to view incoming and outgoing traffic
      
      * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture

T_02. Verify Transport layer by sending traffic to the end device with IP/Protocol/Port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    * Send traffic  from OpenVPN client to the end device by Telnet command
  
  * If the telnet traffic fails, the real application traffic might not work properly

  Probable Causes:
  
    * End device does not allow Protocol/Port properly
  
    * End device does not allow
      
      * for the private IP of Aviatrix OpenVPN gateway if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is enabled.
      
      * for the VPN CIDR if `VPN NAT <https://docs.aviatrix.com/HowTos/gateway.html#vpn-nat>`_ is disabled.
  
    * Traffic might be mis-routed or be blocked somewhere

  Suggestions:
  
    * `Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue`_
  
    * Execute Aviatrix feature “Packet Capture” on Aviatrix OpenVPN gateway to view incoming and outgoing traffic
      
      * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture

T_03. Verify DNS by issuing command #nslookup [DOMAIN NAME OF END DEVICE] on OpenVPN client
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    * Execute command #nslookup [DOMAIN NAME OF END DEVICE] on OpenVPN client
  
  * If DNS request fails, traffic will not send to the end device properly

  Probable Causes:
  
    * DNS cannot resolve the domain name
  
    * OpenVPN client cannot route traffic to the DNS

  Suggestions:
  
    * Troubleshoot DNS configuration
  
    * Attempt to issue nslookup command with different record in DNS
      
      * #nslookup [ANOTHER DOMAIN IN DNS RECORD] 
  
    * Troubleshoot the routes between OpenVPN Client and DNS
  
    * Attempt to issue nslookup command with specific DNS IP 
      
      * #nslookup [DOMAIN NAME] [DNS IP]
  
    * Check whether users configure additional CIDRS and Name server properly on Aviatrix OpenVPN gateway
  
    * https://docs.aviatrix.com/HowTos/gateway.html#additional-cidrs
  
    * https://docs.aviatrix.com/HowTos/gateway.html#nameservers
    
T_04. Verify connectivity between OpenVPN client and end device
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Steps:
   
      * Send the real application traffic from OpenVPN client to the end device
   
   * If it still fails, please follow the Suggestions as below:

   Suggestions:
   
      * `Check other Aviatrix features on Aviatrix OpenVPN Gateway which might cause routing issue`_
      
      * Execute Aviatrix feature “Packet Capture” on Aviatrix OpenVPN gateway to view incoming and outgoing traffic

         * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture
