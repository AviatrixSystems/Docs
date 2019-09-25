.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix Site2Cloud End to End traffic Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot Aviatrix Site2Cloud End to End traffic

Workflow:
---------

1. Check basic information - Cloud Permission, Aviatrix Controller, and Aviatrix Gateway

      `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
   
      `Aviatrix Controller Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_controller.rst>`_
      
      `Aviatrix Gateway Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_gateway.rst>`_
    
2. Troubleshoot Site2Cloud Deployment configuration

  * Aviatrix
  
      `Check Site2Cloud configuration from Aviatrix Controller`_
      
      `Check IPSec VPN tunnel logs from Site2Cloud Diagnostics`_
  
  * Cloud Platform
      
      `Check Aviatrix gateway’s instance level and network level for Site2Cloud feature from AWS portal`_
      
3. Check other Aviatrix Features Deployment configuration

      `Check other Aviatrix features on Aviatrix Gateway which might cause routing issue`_
      
4. Troubleshoot connectivity between Aviatrix gateway and Edge router

      `T_01. Verify Internet layer by sending ICMP traffic to the public IP of Edge router from Aviatrix Gateway`_

      `T_02. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Edge router from Aviatrix Gateway`_

      `T_03. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Aviatrix Gateway from Edge router`_
   
5. Check end device’s deployment configuration on Edge router side

      `Check end/testing device's instance level and network level configuration on Edge router side`_

      `T_04. Troubleshoot connectivity between end device and Edge router on edge router side`_
    
6. Check end device’s deployment configuration on Aviatrix gateway side

      `Check end/testing instance level and network level configuration on Aviatrix gateway side`_

      `T_05. Troubleshoot connectivity between end device and Aviatrix gateway on aviatrix gateway side`_
   
7. Troubleshoot connectivity between end device and end device

      `T_06. Verify Internet layer by sending ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP`_

      `T_07. Verify Internet layer by sending ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP`_

      `T_08. Verify Transport layer by sending traffic from end device on Aviatrix side to the end device on Edge router side with IP/Protocol/Port`_

      `T_09. Verify Transport layer by sending traffic from end device on Edge router side to the end device on Aviatrix side with IP/Protocol/Port`_

      `T_10. Verify real traffic between end to end devices`_
    
8. Refer to other troubleshooting documents

   * https://docs.aviatrix.com/Support/support_center_site2cloud.html
   
9. TODO list download link:  
   
Detail:
-------
    
Check Site2Cloud configuration from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Check IPSec VPN tunnel configuration detail from Site2Cloud page

      * https://docs.aviatrix.com/HowTos/site2cloud.html#edit-connection
      
      * Steps:
      
         1. Navigate to the Aviatrix GUI page: Site2Cloud
         
         2. Select the connection
         
         3. Click the three bar/hamburger button to view IPSec VPN tunnel detail
      
   * Check IPSec VPN tunnel configuration detail from Download Configuration
   
      * https://docs.aviatrix.com/HowTos/site2cloud.html#download-configuration
      
      * Steps:
         
         1. Navigate to the Aviatrix GUI page: Site2Cloud
         
         2. Select the connection
         
         3. Click the button "Download Configuration"
         
   * Check IPSec VPN tunnel configuration detail from Site2Cloud Diagnostics
   
      * https://docs.aviatrix.com/HowTos/site2cloud.html#troubleshooting
      
      * Steps:
         
         1. Navigate to the Aviatrix GUI page: Site2Cloud -> Diagnostics tab
         
         2. Select the related tunnel info for VPC ID/VNet Name, Connection, and Gateway 
         
         3. Select the Action "Show configuration"
         
         4. Click the button "OK"
         
Check IPSec VPN tunnel logs from Site2Cloud Diagnostics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/site2cloud.html#troubleshooting

   * Steps:

      1. Navigate to the Aviatrix GUI page: Site2Cloud -> Diagnostics tab

      2. Select the related tunnel info for VPC ID/VNet Name, Connection, and Gateway 

      3. Select the Action "Show logs"

      4. Click the button "OK"
      
   Check Point 1: Check whether phase 1 is established
   
      * Expect to view the string "ISAKMP-SA established" in the latest log
     
      * If this string does not show up in the logs, IPSec VPN phase 1 does not establish properly
     
      Probable Causes:
      
         * Aviatrix Gateway cannot reach to the public IP of edge router

         * Edge router cannot process IPSec VPN phase 1 negotiation traffic with port 500

         * Phase 1 configuration on both IPSec VPN devices does not match
      
      Suggestions:
      
         * Check whether edge router can receive traffic from Aviatrix Gateway

            * `T_02. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Edge router from Aviatrix Gateway`_

         * Confirm whether phase 1 configuration is consistent on both edge routers

            * Phase 1 Authentication

            * Phase 1 DH Group

            * Phase 1 Encryption

            * Phase 1 lifetime: 28800

            * Pre-shared Key
      
   Check Point 2: Check whether phase 2 is established
   
      * Expect to view the string "IPsec-SA established" in the latest log
   
      * If this string does not show up in the logs, IPSec VPN phase 2 does not establish properly
     
      Probable Causes:
   
         * Edge router cannot process IPSec VPN phase 2 negotiation traffic with port 4500. Notes: if function nat traversal is enabled, IPSec VPN tunnel uses port 4500.

         * Phase 2 configuration on both IPSec VPN devices does not match
      
      Suggestions:
      
         * Check whether edge router can receive traffic from Aviatrix Gateway

            * `T_02. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Edge router from Aviatrix Gateway`_

         * Confirm whether phase 2 configuration is consistent on both edge routers

            * Phase 2 Authentication

            * Phase 2 DH Group

            * Phase 2 Encryption

            * Phase 2 lifetime: 3600

            * Remote Subnet and Local Subnet
         
   Check Point 3: Check whether message "seems to be dead" displays in the latest log
   
      * Expect not to view this string "seems to be dead" in the latest log
   
      * If this string shows up in the logs, IPSec VPN tunnel might disconnect at some point
     
      Probable Causes:
   
         * DPD configuration does not match on both IPSec VPN devices

         * Phase 1 rekey process somehow behaves anormal
      
      Suggestions:
      
         * Sync up DPD configuration on both IPSec VPN devices

            * interval 10 seconds

            * retry 3 times

            * max failure 3 times

         * or disable DPD function on both IPSec VPN devices
      
   Check Point 4: Check whether phase 2 negotiation uses port 4500
   
      * Expect to view that phase 2 negotiation uses port 4500
   
      * If phase 2 negotiation uses non 4500, it might have a chance to fail IPSec VPN tunnel depending on topology. Notes: if the function nat traversal is enabled, phase 2 negotiation uses port 4500; if the function nat traversal is disabled, phase 2 negotiation uses port 500
     
      Probable Causes:
   
         * user's environment has a NAT device thus the function nat traversal needs to be enabled
      
      Suggestions:
      
         * although the function nat traversal is not necessary to be configured on edge router (it depends on the whole network topology), we highly suggest to configure it since we enable it on Aviatrix Gateway side.
      
Check Aviatrix gateway’s instance level and network level for Site2Cloud feature from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check the Security Group which is attached to the Aviatrix Gateway
  
      * Expect to have the below rules in inbound rules as default:

         1. Type: Custom UDP Rule, Protocol: UDP, Port Range: 4500, Source: Custom: 'EDGE ROUTER PUBLIC IP'

         2. Type: Custom UDP Rule. Protocol: UDP, Port Range:  500, Source: Custom: 'EDGE ROUTER PUBLIC IP'

      * Expect to have the below rules in outbound rules as default:

         1. Type: All traffic, Protocol: All, Port Range: All, Destination: 0.0.0.0/0
         
Check other Aviatrix features on Aviatrix Gateway which might cause routing issue
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Check whether SNAT feature is configured
  
    * https://docs.aviatrix.com/HowTos/gateway.html#enable-nat
  
    * https://docs.aviatrix.com/HowTos/gateway.html#source-nat
  
  * Check whether DNAT feature is configured
  
    * https://docs.aviatrix.com/HowTos/gateway.html#destination-nat
    
  * Check whether Network Mapping feature is configured
  
    * https://docs.aviatrix.com/HowTos/gateway.html#network-mapping
    
  * Check whether Site2Cloud Mapped feature is configured
  
    * https://docs.aviatrix.com/HowTos/site2cloud.html#connection-type-mapped
    
T_01. Verify Internet layer by sending ICMP traffic to the public IP of Edge router from Aviatrix Gateway
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * For troubleshooting purpose, please consider allowing ICMP traffic on Edge router to confirm Aviatrix Gateway can reach to the Edge router.
  
   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#gateway-utility
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY
      
      2. Select the Gateway Name
      
      3. Select the Interface: eth0
      
      4. Destination Host Name (or IP): [Public IP of Edge router]
      
      5. Click the button “Ping"
     
  * If the Ping fails, Aviatrix Gateway might not able to reach to the public IP of Edge router. If the Edge router does not allow ICMP traffic for security concern, please troubleshoot the connectivity by refering to `T_02. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Edge router from Aviatrix Gateway`_

  Probable Causes:
  
    * End device does not allow ICMP traffic from the public IP of Aviatrix Gateway
  
    * Traffic might be mis-routed or be blocked somewhere

  Suggestions:
  
    * Check the firewall settings on Edge router
       
    * Execute function “Packet Capture” on Edge router
    
    * Execute function `Network Traceroute <https://docs.aviatrix.com/HowTos/troubleshooting.html#network-traceroute>`_ on Aviatrix Gateway and check the report to figure out where the traffic ends
    
T_02. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Edge router from Aviatrix Gateway
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#network-connectivity-utility
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> NETWORK CONNECTIVITY UTILITY
      
      2. Hostname: [Public IP of Edge router]
      
      3. Port: 500
      
      4. Gateway Name: Aviatrix Gateway
      
      5. Protocol: UDP
      
      6. Click the button “Go"
   
   * Expect to view a green message “Able to reach [Public IP of Edge router] at 500 from gateway [AVIATRIX-GATEWAY-NAME]” on Aviatrix GUI
   
      7. Test port 4500 by following the previous steps 

   * If the testing fails, Aviatrix Gateway might not able to reach to the public IP of Edge router with the specific port 500 or 4500.

   Probable Causes:

    * End device does not allow traffic with port 500 or 4500 from the public IP of Aviatrix Gateway

    * Traffic might be mis-routed or be blocked somewhere

   Suggestions:

    * Check the firewall settings on Edge router

    * Execute function “Packet Capture” on Edge router - check whether traffic from Aviatrix Gateway can hit the Edge router and the Edge router can return the traffic back to Aviatrix Gateway properly.

T_03. Verify Transport layer by sending traffic with port 500/4500 to the public IP of Aviatrix Gateway from Edge router
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    * Send traffic with port 500 from Edge router to Aviatrix Gateway by similar Telnet command
    
    * Send traffic with port 4500 from Edge router to Aviatrix Gateway by similar Telnet command
  
  * If the telnet traffic fails, the real application traffic might not work properly

  Probable Causes:
  
    * Traffic might be mis-routed or be blocked somewhere
    
    * The related IPSec VPN configuraion on Cloud platform does not configure properly

  Suggestions:
  
    * `Check Site2Cloud configuration from Aviatrix Controller`_
  
    * Execute Aviatrix feature “Packet Capture” on Aviatrix gateway to view incoming and outgoing traffic
      
      * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture
      
Check end/testing device's instance level and network level configuration on Edge router side
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check the firewall configuration on end device
     
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
      
   Check Point 2: Check the routing configuration on end device
  
      * Expect to route traffic back to the range which is defined in the IPSec VPN tunnel
      
   Check Point 3: Check the Security Group which is attached to the end/testing instance if it is deployed in AWS
      
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
   
   Check Point 4: Check the Network ACL where end/testing instance locates if it is deployed in AWS
   
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
   
   Check Point 5: Check the Routing Table where end/testing instance locates if it is deployed in AWS
   
      * Expect to route traffic back to the range which is defined in the IPSec VPN tunnel
      
T_04. Troubleshoot connectivity between end device and Edge router on edge router side
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check whether Edge router can reach to the IP of the end device
      
   Check Point 2: Check whether end device can reach to the IP of the Edge router
   
   Check Point 3: Attempt to simulate sending traffic from end device to the range which is defined in the IPSec VPN tunnel
   
      * Expect Edge router receives the traffic from end device
      
      * Execute function "packet capture" on Edge router
      
Check end/testing instance level and network level configuration on Aviatrix gateway side
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check the firewall configuration on end device
   
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
      
   Check Point 2: Check the routing configuration on end device
  
      * Expect to route traffic back to the range which is defined in the IPSec VPN tunnel
      
   Check Point 3: Check the Security Group which is attached to the end/testing instance if it is deployed in AWS
      
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
   
   Check Point 4: Check the Network ACL where end/testing instance locates if it is deployed in AWS
   
      * Expect to allow traffic from the range which is defined in the IPSec VPN tunnel
   
   Check Point 5: Check the Routing Table where end/testing instance locates if it is deployed in AWS
   
      * Expect to route traffic back to the range which is defined in the IPSec VPN tunnel
      
T_05. Troubleshoot connectivity between end device and Aviatrix gateway on aviatrix gateway side
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check whether Aviatrix gateway can reach to the IP of the end device
   
      * If troubleshooting purpose, please allow ICMP traffic on end device from Aviatrix gateway
   
      * Steps:

         1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY

         2. Select the Gateway Name

         3. Select the Interface: eth0

         4. Destination Host Name (or IP): [IP of end device on Aviatrix gateway side]

         5. Click the button “Ping"
      
      Probable Causes:
  
         * End device does not allow ICMP traffic from the private IP of Aviatrix Gateway

         * Traffic might be mis-routed or be blocked somewhere

      Suggestions:
  
         * Check the firewall settings on end device
         
         * `Check end/testing instance level and network level configuration on Aviatrix gateway side`_

         * Execute function “Packet Capture” on end device

         * Execute function `Network Traceroute <https://docs.aviatrix.com/HowTos/troubleshooting.html#network-traceroute>`_ on Aviatrix Gateway and check the report to figure out where the traffic ends
    
   Check Point 2: Check whether end device can reach to the private IP of the Aviatrix Gateway
   
   Check Point 3: Attempt to simulate sending traffic from end device to the range which is defined in the IPSec VPN tunnel
   
      * Expect that Aviatrix gateway receives the traffic from end device
      
      * Execute `Packet Capture feature <https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture>`_ from Aviatrix Controller GUI
      
T_06. Verify Internet layer by sending ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * For troubleshooting purpose, please consider allowing ICMP traffic on end device to confirm the whole routing path.
  
  * Steps:
  
    1. Send ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP by Ping command
    
    2. Send ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP by Traceroute/Tracert command

  * If the Ping fails, please check the traceroute/tracert report to figure out where the traffic ends

  Probable Causes:
  
    * End device does not allow ICMP traffic 
    
    * Traffic might be mis-routed or be blocked somewhere

  Suggestions:
  
    * `Check other Aviatrix features on Aviatrix Gateway which might cause routing issue`_

    * Execute Aviatrix feature `Packet Capture <https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture>`_ on Aviatrix gateway to view incoming and outgoing traffic

      * https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture

    * Check IPSec VPN tunnel - security association details from Site2Cloud Diagnostics

      * https://docs.aviatrix.com/HowTos/site2cloud.html#troubleshooting

      * Steps:

         1. Navigate to the Aviatrix GUI page: Site2Cloud -> Diagnostics tab

         2. Select the related tunnel info for VPC ID/VNet Name, Connection, and Gateway 

         3. Select the Action "Show security association details"

         4. Click the button "OK"

         5. Record the packet status which you can search for the keyword "current:" on the outgoing info 
         
         ::
         
            [Aviatrix Gateway private IP to Edge Router public IP]
            [UPDATE EXAMPLE LATER]

         6. Click the button "OK" again

         7. Compare the packet status again

      * Expect to view the packet status value increasing

   * Check IPSec VPN tunnel statistics for the incoming traffic on Edge router

   * Check whether Edge router configures SNAT or DNAT feature

      * if so, check NAT function statistics

   * Execute feature “Packet Capture” on Edge router to view incoming and outgoing traffic
   
   * Check firewall configuration on Edge router
   
T_07. Verify Internet layer by sending ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * For troubleshooting purpose, please consider allowing ICMP traffic on end device to confirm the whole routing path.

   * Steps:

      1. Send ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP by Ping command

      2. Send ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP by Traceroute/Tracert command

   * If the Ping fails, please check the traceroute/tracert report to figure out where the traffic ends

   Probable Causes:

      * End device does not allow ICMP traffic 

      * Traffic might be mis-routed or be blocked somewhere

   Suggestions:
  
      * `Check other Aviatrix features on Aviatrix Gateway which might cause routing issue`_

      * Execute Aviatrix feature `Packet Capture <https://docs.aviatrix.com/HowTos/troubleshooting.html#packet-capture>`_ on Aviatrix gateway to view incoming and outgoing traffic

      * Check IPSec VPN tunnel - security association details from Site2Cloud Diagnostics

         * https://docs.aviatrix.com/HowTos/site2cloud.html#troubleshooting

         * Steps:

            1. Navigate to the Aviatrix GUI page: Site2Cloud -> Diagnostics tab

            2. Select the related tunnel info for VPC ID/VNet Name, Connection, and Gateway 

            3. Select the Action "Show security association details"

            4. Click the button "OK"

            5. Record the packet status which you can search for the keyword "current:" on the incoming info 

            ::

               [Edge Router public IP to Aviatrix Gateway private IP]
               [UPDATE EXAMPLE LATER]

            6. Click the button "OK" again

            7. Compare the packet status again

         * Expect to view the packet status value increasing

      * Check IPSec VPN tunnel statistics for the outgoing traffic on Edge router

      * Check whether Edge router configures SNAT or DNAT feature

         * if so, check NAT function statistics

      * Execute feature “Packet Capture” on Edge router to view incoming and outgoing traffic
      
      * Check firewall configuration on Edge router
   
T_08. Verify Transport layer by sending traffic from end device on Aviatrix side to the end device on Edge router side with IP/Protocol/Port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Troubleshooting steps are similar to `T_06. Verify Internet layer by sending ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP`_
      
      * Instead of sending ICMP traffic, try to simulate the traffic by issuing command #telnet with specific port
    
T_09. Verify Transport layer by sending traffic from end device on Edge router side to the end device on Aviatrix side with IP/Protocol/Port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    
   * Troubleshooting steps are similar to `T_07. Verify Internet layer by sending ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP`_
      
      * Instead of sending ICMP traffic, try to simulate the traffic by issuing command #telnet with specific port

T_10. Verify real traffic between end to end devices
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~    
    
   * Troubleshooting steps are similar to 
   
      `T_06. Verify Internet layer by sending ICMP traffic from end device on Aviatrix side to the end device on Edge router side with IP`_
      
      `T_07. Verify Internet layer by sending ICMP traffic from end device on Edge router side to the end device on Aviatrix side with IP`_
      
   * Instead of sending ICMP traffic, try to troubleshoot the real traffic
   
