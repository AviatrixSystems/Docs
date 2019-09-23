.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix Controller Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot Aviatrix Controller

Workflow:
---------

1. Troubleshoot Basic Network function from user’s environment to Aviatrix Controller

    `T_01. Verify Internet layer by sending ICMP traffic to the public IP of Aviatrix Controller`_
    
    `T_02. Verify Transport layer by sending traffic to the public IP of Aviatrix Controller with IP/Protocol/Port`_
    
    `T_03. [OPTIONAL] Verify Application layer by sending ICMP traffic to the domain name of Aviatrix Controller`_
    
    `T_04. Verify connectivity between user’s environment and Aviatrix Controller`_
  
2. Troubleshoot Deployment configuration

   * Aviatrix
  
      `Check whether the DNS function works properly in Aviatrix Controller`_

      `Check whether the IP in Aviatrix database is same as the current public IP of the controller`_

      `Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Controller from Aviatrix Controller`_
      
      `Check basic network configuration of AWS where Aviatrix Controller locates from Aviatrix Controller`_
 
   * Cloud Platform 
      
      `Check basic network configuration of AWS where Aviatrix Controller locates from AWS portal`_
      
3. Troubleshoot Basic Network function for Aviatrix Gateway from Aviatrix Controller

    `T_05. Verify Internet layer by sending ICMP traffic to a public server with IP from Aviatrix Controller`_
  
    `T_06. Verify Transport layer by sending traffic to a public server with IP/Protocol/Port from Aviatrix Controller`_
  
    `T_07. Verify Application layer by sending ICMP traffic to a public server with domain name from Aviatrix Controller`_
    
4. Troubleshoot Application traffic

    `T_08. Verify whether Aviatrix Gateway can issue AWS EC2 API properly from Aviatrix Controller`_

Detail:
-------

Check whether the DNS function works properly in Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Check Point 1: Check Aviatrix function CONTROLLER PUBLIC IP from Aviatrix Controller GUI

      * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#controller-public-ip

      * Steps:
      
        1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER PUBLIC IP

      * Expect to view only one public IP

      * If the output displays empty, Aviatrix solution will not work properly

    Probable Causes:

      * DNS which is used by Aviatrix Controller cannot resolve/forward public Domain name request properly.

    Suggestions:

      * Attempt to use a public DNS such as 8.8.8.8 or cloud platform default DNS first

      * `Check basic network configuration of AWS where Aviatrix Controller locates from AWS portal`_

Check whether the IP in Aviatrix database is same as the current public IP of the controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    Check Point 1: Check Aviatrix function CONTROLLER PUBLIC IP from Aviatrix Controller GUI

      * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#controller-public-ip

      * Steps:
    
        1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER PUBLIC IP

      * Expect to view only one public IP

      * If the output displays multiple public IPs, Aviatrix solution will not work properly

    Probable Causes:

      * The public IP configuration on Aviatrix Controller is not static or EIP type

      * The public IP gets changed after Aviatrix Controller reboot

    Suggestions:

      * Assign an EIP or static type of public IP to Aviatrix Controller

      * Execute IP Migration on Aviatrix Controller
    
      * Steps:
        
        1. https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#controller-ip-migration
        
        2. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER IP MIGRATION
        
        3. Confirm the IP info
        
        4. Click the button “Migrate"

Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Controller from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check whether diagnostic report can be performed  

      * https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html

      * Expect not to view the field 'Issues found’ inside the show results

      * If the field 'Issues found’ prompts, follow the instruction to fix it or look for the suggestion as below:

      1. Check DNS Resolution output
    
         * Expect to view "DNS resolution": "Pass"
        
         * If not, refer to `Troubleshooting_Diagnostics_Result <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_ doc for probable causes and how to address it.
        
         * Notes: Aviatrix Controller uses a DNS which is assigned by Cloud platform as default DNS

      2. Check Public IP output
    
         * Expect to view "Public IP": "Pass"
    
         * If not, refer to `Check basic network configuration of AWS where Aviatrix Controller locates from Aviatrix Controller`_
         
Check basic network configuration of AWS where Aviatrix Controller locates from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check Cloud Platform instance level and network level from Aviatrix Controller
  
      * https://docs.aviatrix.com/HowTos/flightpath.html
    
      * Run flight path feature
    
      * Expect to meet the criticals in `Check basic network configuration of AWS where Aviatrix Controller locates from AWS portal`_

Check basic network configuration of AWS where Aviatrix Controller locates from AWS portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   Check Point 1: Check Cloud Platform instance level and network level from AWS portal 

      1. Check the Security Group which is attached to Aviatrix Controller 
    
         * Expect to have the below rules in inbound rules as default:
        
            1. Type: HTTPS. Protocol: TCP, Port Range:443, Source: Custom: ‘CLIENT’S PUBLIC IP'
        
            2. Or Type: HTTPS. Protocol: TCP, Port Range:443, Source: 0.0.0.0/0
    
         * Expect to have the below rules in outbound rules as default:
        
            1. Type: All traffic, Protocol: All, Port Range: All, Destination: 0.0.0.0/0

      2. Check the Network ACL where Aviatrix Controller locates
    
         * Expect to have the below rules in inbound rules as default:
        
            1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
        
            2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
      
         * Expect to have the below rules in outbound rules as default:
        
            1. Rule # 100, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny ALLOW
        
            2. Rule # *, Type: ALL Traffic, Protocol: ALL, Port Range: ALL, Source: 0.0.0.0/0 Allow/Deny DENY
    
         * If customizing ACL is needed, please make sure both inbound and outbound rules are configured properly

      3. Check the Routing Table where Aviatrix Controller locates
    
         * Expect to have a route “0.0.0.0/0” pointing to AWS IGW since Aviatrix solution needs to be deployed in public subnet
    
         * If not, please add a route “0.0.0.0/0” pointing to AWS IGW

      4. Check whether the Routing Table where Aviatrix Controller locates has Endpoint entry
    
         * Expect that the routing to AWS Endpoint does not impact the traffic to IGW/internet
    
         * NOTES: PRIVATE DNS OR AWS INTERFACE ENDPOINT MIGHT RESOLVE A AWS SERVICE DOMAIN NAME INTO A PRIVATE IP WHICH MIGHT MISLEAD THE TRAFFIC TO END POINT ENTRY

      5. Check whether an EIP is assigned to Aviatrix Controller

   Check Point 2: Check Cloud Platform network application level from AWS portal 

      1. Check the DHCP options set on the VPC where the Aviatrix Gateways locates
    
         * Expect to use AWS DNS server as default as below example
         
            ::
         
               domain-name = us-west-1.compute.internal; domain-name-servers = AmazonProvidedDNS;
    
         * If users deploys private DNS, please make sure the private DNS can forward request to public DNS properly
        
         * NOTES: Aviatrix Controller uses a DNS which is assigned by Cloud platform as default DNS

      2. Check whether both DNS resolution and DNS hostnames are Enabled on the VPC where the Aviatrix Controller locates
    
         * Expect to view the status “Enabled” for both DNS resolution and DNS hostnames
    
         * If not, please turn it to enable on AWS portal

T_01. Verify Internet layer by sending ICMP traffic to the public IP of Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * For troubleshooting purpose, please temporarily allow ICMP traffic from your environment's public IP on Aviatrix Controller in Cloud Platform

   * Issue command #ping [CONTROLLER PUBLIC IP]

   * Expect to view Ping Success

   * If the Ping fail, please check the traceroute/tracert report to figure out where the traffic ends

   Probable Causes:

      * Aviatrix Controller is not UP

      * Basic network configuration in cloud platform does not configure properly
   
      * Firewall or network blocks the ICMP traffic
    
   Suggestions:

      * Check controller status

      * Check network configuration

T_02. Verify Transport layer by sending traffic to the public IP of Aviatrix Controller with IP/Protocol/Port
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Issue command #telent [CONTROLLER PUBLIC IP] 443

   * Expect to view telnet success

   * If it fails, please check the tcptraceroute report to figure out where the traffic ends

   Probable Causes:

      * Aviatrix Controller is not UP

      * Basic network configuration in cloud platform does not configure properly

      * Firewall or network blocks the 443 traffic
    
   Suggestions:

      * Check controller status

      * Check network configuration

T_03. [OPTIONAL] Verify Application layer by sending ICMP traffic to the domain name of Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * For troubleshooting purpose, please temporarily allow ICMP traffic from your environment's IP on Aviatrix Controller in Cloud Platform
  
   * Issue command #ping [CONTROLLER DOMAIN NAME]

   * Expect to view Ping Success

   * If the Ping fail, 
    
      * check the traceroute/tracert report to figure out where the traffic ends
    
      * issue the command #nslookup  [CONTROLLER DOMAIN NAME] to verify the IP

   Probable Causes:

      * A DNS cannot resolve this domain or forward this DNS request to a public DNS properly

      * Network configuration/routing to DNS

   Suggestions:

      * Check the DNS configuration/entry/record

      * Check network configuration

T_04. Verify connectivity between user’s environment and Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * Attempt to browse https://[AVIATRIX CONTROLLER PUBLIC IP] on Chrome browser

   * Expect to view Aviatrix Controller GUI successfully

   * If it fails, users cannot deploy Aviatrix solution through Aviatrix Controller GUI

   Probable Causes:
    
      * Browser cache or other issues

   Suggestions:

      * Clean the browser cache and try again

      * Attempt to use another browser such as Firefox

T_05. Verify Internet layer by sending ICMP traffic to a public server with IP from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#controller-utility

   * Take a public server 8.8.8.8 for example

   * Steps:
    
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER UTILITY
    
      2. Host Name (or IP): 8.8.8.8
    
      3. Click the button “Ping"

   * Expect to view Ping Success as example:

   ::

      Example: 

      PING 8.8.8.8 (8.8.8.8) 400(428) bytes of data.
      76 bytes from 8.8.8.8: icmp_seq=1 ttl=48 (truncated)
      76 bytes from 8.8.8.8: icmp_seq=2 ttl=48 (truncated)
      76 bytes from 8.8.8.8: icmp_seq=3 ttl=48 (truncated)
      76 bytes from 8.8.8.8: icmp_seq=4 ttl=48 (truncated)
      76 bytes from 8.8.8.8: icmp_seq=5 ttl=48 (truncated)

      --- 8.8.8.8 ping statistics ---
      5 packets transmitted, 5 received, 0% packet loss, time 4008ms
      rtt min/avg/max/mdev = 1.954/1.986/2.028/0.061 ms

T_06. Verify Transport layer by sending traffic to a public server with IP/Protocol/Port from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#network-connectivity-utility

   * Take a public server 8.8.8.8 for example

   * Steps:
    
      1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> NETWORK CONNECTIVITY UTILITY

      2. Hostname: 8.8.8.8

      3. Port: 443

      4. Gateway Name: Controller

      5. Protocol: TCP

      6. Click the button “Go"

   * Expect to view a green message “Able to reach 8.8.8.8 at 443 from controller” on Aviatrix GUI

T_07. Verify Application layer by sending ICMP traffic to a public server with domain name from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aviatrix.com/HowTos/Troubleshoot_Diagnostics.html#controller-utility

   * Take a public server www.google.com for example

   * Steps:
    
       1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER UTILITY

       2. Host Name (or IP): www.google.com

       3. Click the button “Ping"

   * Expect to view Ping Success and able to resolve the domain name to a public IP as example:

   ::

      Example: 
    
      PING www.google.com (216.58.194.164) 400(428) bytes of data.
      76 bytes from sfo07s13-in-f4.1e100.net (216.58.194.164): icmp_seq=1 ttl=51 (truncated)
      76 bytes from sfo07s13-in-f4.1e100.net (216.58.194.164): icmp_seq=2 ttl=51 (truncated)
      76 bytes from sfo07s13-in-f4.1e100.net (216.58.194.164): icmp_seq=3 ttl=51 (truncated)
      76 bytes from sfo07s13-in-f4.1e100.net (216.58.194.164): icmp_seq=4 ttl=51 (truncated)
      76 bytes from sfo07s13-in-f4.1e100.net (216.58.194.164): icmp_seq=5 ttl=51 (truncated)

      --- www.google.com ping statistics ---
      5 packets transmitted, 5 received, 0% packet loss, time 4004ms
      rtt min/avg/max/mdev = 2.126/2.139/2.154/0.009 ms

   * If it cannot resolve to a public IP or Ping fail, this Aviatrix Gateway might not function properly

   Probable Causes:

      * A private DNS cannot resolve a public domain or forward this public DNS request to a public DNS properly

      * The outbound rules of security group or ACL is not allowing traffic to 0.0.0.0/0

   Suggestions:

      1. please check the private DNS configuration

        1. Make sure it can resolve a public domain

        2. Make sure it can forward public DNS request to a public DNS

      2. Allow public traffic on security group and ACL

T_08. Verify whether Aviatrix Gateway can issue AWS EC2 API properly from Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   * https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRegions.html

   * Check the AWS EC2 API server in your VPC region in https://docs.aws.amazon.com/general/latest/gr/rande.html#ec2_region
  
   ::

      Take us-west-1 region for example: ec2.us-west-1.amazonaws.com

   * Steps:
    
       1. Navigate to the Aviatrix GUI page: Troubleshoot -> Diagnostics -> Network -> CONTROLLER UTILITY

       2. Host Name (or IP): ec2.us-west-1.amazonaws.com

       3. Click the button “Ping"

   * Expect to view Ping Success and able to resolve the domain name to a public IP as example:

   ::

      Example: 
    
      PING ec2.us-west-1.amazonaws.com (176.32.118.39) 400(428) bytes of data.
      408 bytes from 176.32.118.39: icmp_seq=1 ttl=251 time=1.94 ms
      408 bytes from 176.32.118.39: icmp_seq=2 ttl=251 time=1.96 ms
      408 bytes from 176.32.118.39: icmp_seq=3 ttl=251 time=1.99 ms
      408 bytes from 176.32.118.39: icmp_seq=4 ttl=251 time=1.96 ms
      408 bytes from 176.32.118.39: icmp_seq=5 ttl=251 time=2.02 ms

      --- ec2.us-west-1.amazonaws.com ping statistics ---
      5 packets transmitted, 5 received, 0% packet loss, time 4004ms
      rtt min/avg/max/mdev = 1.943/1.976/2.021/0.038 ms

   * If it resolves to a private IP or Ping fail, Aviatrix Gateway might not able to function AWS API properly

   Probable Causes:

      * There is an AWS endpoint/interface for AWS EC2 API in the routing table

      * A private DNS cannot resolve a public domain or forward this public DNS request to a public DNS properly

   Suggestions:

      1. Check whether your VPC/subnet/routing table has an AWS endpoint for AWS EC2 API

         1. Attempt to remove the endpoint first and then verify it again

      2. Check the private DNS configuration

         1. Make sure it can resolve a public domain

         2. Make sure it can forward public DNS request to a public DNS


.. disqus::
