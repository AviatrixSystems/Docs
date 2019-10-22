.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix Gateway Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot Aviatrix Gateway

Workflow:
---------

1. Check basic information - Cloud Permission and Aviatrix Controller

      `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
   
      `Aviatrix Controller Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_controller.rst>`_

2. Troubleshoot Deployment configuration

  * Aviatrix

       `Check whether Aviatrix Gateway displays status properly from Aviatrix Controller`_

       `Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Gateways from Aviatrix Controller`_

       `Check basic network configuration of AWS where Aviatrix Gateway locates from Aviatrix Controller`_

  * Cloud Platform

       `Check basic network configuration of AWS where Aviatrix Gateway locates from AWS portal`_

3. Troubleshoot Basic Network function for Aviatrix Gateway from Aviatrix Controller
    
   `T_01. Verify Internet layer by sending ICMP traffic to a public server with IP`_

   `T_02. Verify Transport layer by sending traffic to a public server with IP/Protocol/Port`_

   `T_03. Verify Application layer by sending ICMP traffic to a public server with domain name`_

   `T_04. Verify connectivity between Controller and Gateway`_

4. Troubleshoot Application traffic
    
   `T_05. Verify whether Aviatrix Gateway can issue AWS EC2 API properly`_
   
Detail:
-------

Check whether Aviatrix Gateway displays status properly from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Check Point 1: Check Aviatrix Gateway Audit Status for  AWS type
    
      * https://docs.aviatrix.com/HowTos/gateway_audit.html
      
      * Expect to view “Pass” status
      
      * If the status displays "Error(SG)*”, Aviatrix Controller might not connect to Aviatrix Gateway properly
    
   Probable Causes:
   
      * this gateway instance’s security group does not have an inbound rule that is open to the Controller’s EIP
     
   Suggestions:
   
      1. Login AWS portal

      2. Find the Aviatrix Gateway in EC2 service

      3. Allow the Controller’s EIP with port 443 in inbound rules of security group

   Check Point 2: Check general Aviatrix Gateway State in Gateway page
   
      * Expect to view “UP” status

      * If the status does not display “UP” status, please check this `doc <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_ for the explanation and take action to bring it to UP status.

Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Gateways from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check whether diagnostic report can be performed  
    
      * https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html
      
      * Expect not to view the field 'Issues found’ inside the show results
      
      * If the field 'Issues found’ prompts, please follow the instruction to fix it or look for the suggestion as below:

         1. Check DNS Resolution output

            * Expect to view "DNS resolution": "Pass"

            * If not, please refer to `Troubleshooting_Diagnostics_Result doc <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_ for probable causes and how to address it.

            * Notes: Aviatrix Gateway uses 8.8.8.8 as default DNS
         
         2. Verify whether Gateway can consume AWS SQS properly
             
            * Expect to view "ApproximateNumberOfMessages": "0"

            * If not, 

               1. Please refer to `Troubleshooting_Diagnostics_Result doc <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_ for probable causes and how to address it.

               2. Or restart supervisor services if the above step does not address the issue
               
                  * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#service-actions
                  
                  * Steps:
                     
                     1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Gateway -> SERVICE ACTIONS
                     
                     2. Select the Gateway Name
                     
                     3. Select Services: supervisor
                     
                     4. Select Actions: Restart Service
                     
                     5. Click the button “OK"
                      
         3. Verify Aviatrix Gateway can receive HTTPS traffic from Aviatrix Controller

            * Check HTTPS Output field

            * Expect to view "443": ["up","reachable"]

            * If not, please refer to `Troubleshooting_Diagnostics_Result doc <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_ for probable causes and how to address it.

         4. Verify Aviatrix Controller can receive HTTPS traffic from Aviatrix Gateway

            * Check HTTPS Get Output field

            * Expect to view "HTTPS GET": "Pass"

            * If not, please refer to `Troubleshooting_Diagnostics_Result doc <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_ for probable causes and how to address it.

Check basic network configuration of AWS where Aviatrix Gateway locates from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check Cloud Platform instance level and network level from Aviatrix Controller
   
      * https://docs.aviatrix.com/HowTos/flightpath.html
      
      * Run flight path feature
      
      * Expect to meet the critical in `Check basic network configuration of AWS where Aviatrix Gateway locates from AWS portal`_

Check basic network configuration of AWS where Aviatrix Gateway locates from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check Cloud Platform instance level and network level from AWS portal
   
      1. Check the Security Group which is attached to Aviatrix Gateway
      
         * Expect to have the below rules in inbound rules as default:
         
            1. Type: All traffic, Protocol: All, Port Range: 0-65535, Source: Custom: ‘VPC CIDR'
            
            2. Type: HTTPS. Protocol: TCP, Port Range:443, Source: Custom: ‘CONTROLLER’S PUBLIC IP'
            
         * Expect to have the below rules in outbound rules as default:
      
            1. Type: All traffic, Protocol: All, Port Range: All, Destination: 0.0.0.0/0
      
      2. Check the Network ACL where Aviatrix Gateway locates
      
         * Expect to have the below rules in inbound rules as default:
      
            1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
      
            2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
      
         * Expect to have the below rules in outbound rules as default:
      
            1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
      
            2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
      
         * If customizing ACL is needed, please refer to this `document <https://docs.aviatrix.com/HowTos/customize_aws_acls_for_cloudn_dcx.html>`_
         
      3. Check the Routing Table where Aviatrix Gateway locates
      
         * Expect to have a route “0.0.0.0/0” pointing to AWS IGW since Aviatrix solution needs to be deployed in public subnet
         
         * If not, please add a route “0.0.0.0/0” pointing to AWS IGW
      
      4. Check whether the Routing Table where Aviatrix Gateway locates has Endpoint entry
      
         * Expect that the routing to AWS Endpoint does not impact the traffic to IGW/internet

         * NOTES: Private DNS or AWS interface endpoint might resolve an AWS service domain name into a private IP which might mislead the traffic to endpoint entry
      
      5. Check whether an EIP is assigned to Aviatrix Gateway

   Check Point 2: Check Cloud Platform network application level from AWS portal
   
      1. Check the DHCP options set on the VPC where the Aviatrix Gateways locates
      
         * Expect to use AWS DNS server as default as below example
         
            ::
         
            domain-name = us-west-1.compute.internal; domain-name-servers = AmazonProvidedDNS;
      
         * If users deploys a private DNS, please make sure the private DNS can forward request to public DNS properly
         
            * NOTES: Aviatrix Gateway uses DNS 8.8.8.8 as a default DNS. Users are able to remove the default DNS server for the Aviatrix gateway and instructs the gateway to use the `VPC DNS server configured in VPC DHCP option <https://docs.aviatrix.com/HowTos/gateway.html#use-vpc-vnet-dns-server>`_
      
      2. Check whether both DNS resolution and DNS hostnames are Enabled on the VPC where the Aviatrix Gateways locates
      
         * Expect to view the status “Enabled” for both DNS resolution and DNS hostnames
      
         * If not, please turn it to enable on AWS portal

   Check Point 3: Check whether AWS SQS with type FIFO exists in AWS portal
   
      * Expect to have the below info in AWS Simple Queue Service
      
         * A queue name with format “aviatrix-[AVIATRIX-GATEWAY-PUBLIC-IP].fifo”
      
         * This queue should exist in 
      
            * either the same region where Aviatrix Gateway locates
      
            * or in the supported FIFO queue region near to the region where Aviatrix Gateway locates https://aws.amazon.com/about-aws/whats-new/2019/02/amazon-sqs-fifo-qeues-now-available-in-15-aws-regions/
      
      * If there is no queue existed, Aviatrix Controller cannot deliver messages to Aviatrix Gateway

      Probable Causes:
      
         * Aviatrix software does not create an AWS FIFO queue properly
      
         * Users delete it by accident

      Suggestions:
      
         * By design, Aviatrix software will create a new AWS FIFO queue if it detects the queue is missing when Aviatrix Controller delivers messages to Aviatrix Gateway. Therefore, users can toggle (enable and then disable) the `SNAT <https://docs.aviatrix.com/HowTos/gateway.html#source-nat>`_ feature to force creating an AWS FIFO queue if needed.
      
         * Delete Aviatrix Gateway and re-create it through Aviatrix Controller

T_01. Verify Internet layer by sending ICMP traffic to a public server with IP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#gateway-utility
   
   * Take a public server 8.8.8.8 for example
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY
      
      2. Select the Gateway Name
      
      3. Select the Interface: eth0
      
      4. Destination Host Name (or IP): 8.8.8.8
      
      5. Click the button “Ping"
   
      * Expect to view Ping Success as example:

      ::

         PING 8.8.8.8 (8.8.8.8) from 192.168.100.20 : 400(428) bytes of data.
         76 bytes from 8.8.8.8: icmp_seq=1 ttl=51 (truncated)
         76 bytes from 8.8.8.8: icmp_seq=2 ttl=51 (truncated)
         76 bytes from 8.8.8.8: icmp_seq=3 ttl=51 (truncated)
         76 bytes from 8.8.8.8: icmp_seq=4 ttl=51 (truncated)
         76 bytes from 8.8.8.8: icmp_seq=5 ttl=51 (truncated)

         --- 8.8.8.8 ping statistics ---
         5 packets transmitted, 5 received, 0% packet loss, time 4005ms
         rtt min/avg/max/mdev = 1.977/2.068/2.280/0.113 ms

T_02. Verify Transport layer by sending traffic to a public server with IP/Protocol/Port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#network-connectivity-utility
   
   * Take a public server 8.8.8.8 for example
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> NETWORK CONNECTIVITY UTILITY
      
      2. Hostname: 8.8.8.8
      
      3. Port: 443
      
      4. Gateway Name: Aviatrix Gateway
      
      5. Protocol: TCP
      
      6. Click the button “Go"
   
   * Expect to view a green message “Able to reach 8.8.8.8 at 443 from gateway [AVIATRIX-GATEWAY-NAME]” on Aviatrix GUI

T_03. Verify Application layer by sending ICMP traffic to a public server with domain name
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#gateway-utility
   
   * Take a public server www.google.com for example
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY
      
      2. Select the Gateway Name
      
      3. Select the Interface: eth0
      
      4. Destination Host Name (or IP): www.google.com
      
      5. Click the button “Ping"
       
   * Expect to view Ping Success and able to resolve the domain name to a public IP as example:

   ::
   
      PING www.google.com (172.217.6.68) 400(428) bytes of data.
      76 bytes from sfo07s17-in-f68.1e100.net (172.217.6.68): icmp_seq=1 ttl=51 (truncated)
      76 bytes from sfo07s17-in-f68.1e100.net (172.217.6.68): icmp_seq=2 ttl=51 (truncated)
      76 bytes from sfo07s17-in-f68.1e100.net (172.217.6.68): icmp_seq=3 ttl=51 (truncated)
      76 bytes from sfo07s17-in-f68.1e100.net (172.217.6.68): icmp_seq=4 ttl=51 (truncated)
      76 bytes from sfo07s17-in-f68.1e100.net (172.217.6.68): icmp_seq=5 ttl=51 (truncated)

      --- www.google.com ping statistics ---
      5 packets transmitted, 5 received, 0% packet loss, time 4007ms
      rtt min/avg/max/mdev = 1.836/1.857/1.906/0.046 ms

   * If it cannot resolve to a public IP or Ping fail, this Aviatrix Gateway might not function properly

   Probable Causes:
   
      * A private DNS cannot resolve a public domain or forward this public DNS request to a public DNS properly
      
      * The outbound rules of security group or ACL is not allowing traffic to 0.0.0.0/0

   Suggestions:
   
      1. please check the private DNS configuration if you enable the feature `“Use VPC/VNet DNS Server" <https://docs.aviatrix.com/HowTos/gateway.html#use-vpc-vnet-dns-server>`_
      
         1. Make sure it can resolve a public domain
      
         2. Make sure it can forward public DNS request to a public DNS
      
      2. `Check basic network configuration of AWS where Aviatrix Gateway locates from AWS portal`_

T_04. Verify connectivity between Controller and Gateway
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#network-connectivity-utility

   Check Point 1: Check whether gateway can reach to controller with port 443
   
   * Steps:
   
      1. Collect the public IP of controller
      
      2. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> NETWORK CONNECTIVITY UTILITY
      
      3. Hostname: [CONTROLLER-PUBLIC-IP] 
      
      4. Port: 443
      
      5. Gateway Name: Aviatrix Gateway
      
      6. Protocol: TCP
      
      7. Click the button “Go"

   * Expect to view a green message “Able to reach [CONTROLLER-PUBLIC-IP] at 443 from gateway [AVIATRIX-GATEWAY-NAME]” on Aviatrix GUI

   Check Point 2: Check whether controller can reach to gateway with port 443
   
   * Steps:
   
      1. Collect the public IP of gateway
      
      2. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> NETWORK CONNECTIVITY UTILITY
      
      3. Hostname:  [GATEWAY-PUBLIC-IP] 
      
      4. Port: 443
      
      5. Gateway Name: Aviatrix Gateway
      
      6. Protocol: TCP
      
      7. Click the button “Go"
   
   * Expect to view a green message “Able to reach [GATEWAY-PUBLIC-IP] at 443 from controller" on Aviatrix GUI

   Probable Causes:
   
      * Either Security Group or ACL is not configured properly
   
      * Apache does not work properly

   Suggestions:
   
      * Follow the instructions in `Check whether Aviatrix Gateway displays status properly from Aviatrix Controller`_
   
      * Follow the instructions in `Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Gateways from Aviatrix Controller`_
   
      * Enable the function `CONTROLLER SECURITY GROUP MANAGEMENT <https://docs.aviatrix.com/HowTos/FAQ.html#how-do-i-secure-the-controller-access>`_ on Aviatrix Controller 

T_05. Verify whether Aviatrix Gateway can issue AWS EC2 API properly
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html
   
   * Check the AWS EC2 API server in your VPC region in https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region
   
   ::
   
      Take us-west-1 region for example: ec2.us-west-1.amazonaws.com
   
   * Steps:
   
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY
      
      2. Select the Gateway Name
      
      3. Select the Interface: eth0
      
      4. Destination Host Name (or IP): ec2.us-west-1.amazonaws.com
      
      5. Click the button “Ping"
    
   * Expect to view Ping Success and able to resolve the domain name to a public IP as example:

   ::
   
      PING ec2.us-west-1.amazonaws.com (176.32.118.30) 400(428) bytes of data.
      408 bytes from 176.32.118.30 (176.32.118.30): icmp_seq=1 ttl=251 time=0.276 ms
      408 bytes from 176.32.118.30 (176.32.118.30): icmp_seq=2 ttl=251 time=0.274 ms
      408 bytes from 176.32.118.30 (176.32.118.30): icmp_seq=3 ttl=251 time=0.306 ms
      408 bytes from 176.32.118.30 (176.32.118.30): icmp_seq=4 ttl=251 time=0.344 ms
      408 bytes from 176.32.118.30 (176.32.118.30): icmp_seq=5 ttl=251 time=0.300 ms

      --- ec2.us-west-1.amazonaws.com ping statistics ---
      5 packets transmitted, 5 received, 0% packet loss, time 4060ms
      rtt min/avg/max/mdev = 0.274/0.300/0.344/0.025 ms

   * If it resolves to a private IP or Ping fail, Aviatrix Gateway might not able to function AWS API properly

   Probable Causes:
   
      * There is an AWS endpoint/interface for AWS EC2 API in the routing table or subnet

   Suggestions:
   
      1. Check whether your VPC/subnet/routing table has an AWS endpoint for AWS EC2 API
   
      2. Attempt to remove the endpoint first and then verify it again
