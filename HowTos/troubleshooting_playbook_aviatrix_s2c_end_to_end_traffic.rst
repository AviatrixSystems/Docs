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

5. Check end device’s deployment configuration on edge router side

      `Check end/testing device's instance level and network level from AWS portal`_

6. Troubleshoot connectivity between end device and Edge router on edge router side
    
7. Check end device’s deployment configuration on Aviatrix gateway side
    
8. Troubleshoot connectivity between end device and Aviatrix gateway on aviatrix gateway side
    
    `Troubleshoot Network between Aviatrix and OpenVPN client`_

9. Troubleshoot connectivity between end device and end device

    `T_01. Verify Internet layer by sending ICMP traffic to the end device with IP`_

    `T_02. Verify Transport layer by sending traffic to the end device with IP/Protocol/Port`_

    `T_03. Verify DNS by issuing command #nslookup [DOMAIN NAME OF END DEVICE] on OpenVPN client`_

    `T_04. Verify connectivity between OpenVPN client and end device`_
    
10. Other troubleshooting documents

   https://docs.aviatrix.com/Support/support_center_site2cloud.html
   
   Aviatrix default configuration:
      
      nat traversal is enabled
    
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

            * issue cli #ping [PUBLIC IP OF ED]

            * telnet 500

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

            * telnet 4500

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
  
    * https://docs.aviatrix.com/HowTos/site2cloud.html?#connection-type-mapped
    
Troubleshoot connectivity between Aviatrix gateway and Edge router
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

