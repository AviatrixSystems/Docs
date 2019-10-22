.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix FireNet Inspection End to End traffic Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips and simple topology to troubleshoot Aviatrix FireNet Inspection End to End traffic

Prerequisite Setup
------------------

Topology:

* TGW * 1

* Security Domain * 3

  * Firewall Domain * 1
  
    ::
      
      Example:
      FIRENET-SD
  
  * Spoke Domain * 2
  
    ::
      
      Example:
      CLIENT-SD and SERVER-SD

* Spoke VPC * 2

  ::
    
    Example:
    Spoke VPC 10.60.0.0/16
    Spoke VPC 10.61.0.0/16

* Aviatrix Firenet gateway * 1

* Firewall * 1

  ::
  
    Example:
    Palo Alto Firewall

* FireNet VPC * 1

  ::
  
    Example:
    FireNet VPC 10.66.0.0/16

Deployment:

  * Follow `Aviatrix Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to launch FireNet Security Domain, FireNet gateways and firewall instances.

  * Follow `Aviatrix TGW Orchestrator Plan workflow <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_ to:
  
    * create Spoke Security Domains
    
      ::
      
        Example:
        CLIENT-SD and SERVER-SD
    
    * build Connection policy between the CLIENT-SD domain and the SERVER-SD domain. 
	  
    * build Connection policy between CLIENT-SD domain and Firewall domain so that traffic in and out of the domain is inspected. 
    
  * Follow `Aviatrix TGW Orchestrator Build workflow <https://docs.aviatrix.com/HowTos/tgw_build.html>`_ to:
    
    * attach Spoke VPC 10.60.0.0/16 to CLIENT-SD to the TGW

    * attach Spoke VPC 10.61.0.0/16 to SERVER-SD  to the TGW


Workflow:
---------

1. Check basic information - Cloud Permission, Aviatrix Controller, and Aviatrix Gateway

      `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
   
      `Aviatrix Controller Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_controller.rst>`_
      
      `Aviatrix Gateway Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_gateway.rst>`_
    
2. Troubleshoot FireNet Deployment configuration

  * Aviatrix
  
    Check Connection Policy
    
      https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-connection-policy
  
      `Check Connection Policy from TGW Orchestrator View`_
      
      `Check Connection Policy from TGW Orchestrator Plan`_
			
			`Check Connection Policy from TGW Orchestrator List`_
      
    Check routing info in Cloud Platform which is related to TGW Orchestrator
      
      `Check routing info in Cloud Platform from TGW Orchestrator Audit`_
      
      `Check routing info in Cloud Platform from TGW Orchestrator Test`_
      
      `Check routing info for Spoke Security Domain in Cloud Platform from TGW Orchestrator List`_
			
			`Check routing info for FireNet Security Domain in Cloud Platform from TGW Orchestrator List`_
      
    `Check basic Firewall Network configuration from Firewall Network Advanced`_
     
    `Check routing info in Cloud Platform which is related to Firewall Network`_
   
    `Check routing info in Aviatrix FireNet Gateway from Firewall Network Advanced`_
      
		`Check routing info in Firewall from Firewall Network`_

  * Cloud Platform
	
		`Check routing info for TGW Orchestrator feature from AWS portal`_
      
		`Check Aviatrix gateway’s instance level and network level for FireNet feature from AWS portal`_
			
		`Check Firewall instance level and network level for FireNet feature from AWS portal`_
            
3. Troubleshoot connectivity between end device and end device

	`T_01. Verify Internet layer by sending ICMP traffic from end device in Client Spoke Security Domain to the end device in Server Spoke Security Domain with IP`_

	`T_02. Verify Transport layer by sending traffic from end device in Client Spoke Security Domain to the end device in Server Spoke Security Domain with IP/Protocol/Port`_

	`T_03. Verify real traffic between end to end devices`_
   
Detail:
-------

Check Connection Policy from TGW Orchestrator View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:

    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> View

    2. Select the TGW

    3. Select the security_domains

    4. Find your Spoke Domains and FireNet Domain

      ::

      Example:
      FIRENET-SD, CLIENT-SD and SERVER-SD

    5. Expand vpc_members and connected_domains on those Spoke Domains and FireNet Domain

  * Expect to view each security domain has corresponding VPC and connection policies as example below:

    * CLIENT-SD

      ::

      Example:
      vpc_members: VPC 10.60.0.0/16
      connected_domains: FIRENET-SD and SERVER-SD

    * SERVER-SD

      ::

      Example:
      vpc_members: VPC 10.61.0.0/16
      connected_domains: CLIENT-SD

    * FIRENET-SD

      ::

      Example:
      vpc_members: VPC 10.66.0.0/16
      connected_domains: CLIENT-SD
        
Check Connection Policy from TGW Orchestrator Plan
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
  * https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain
      
  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> Plan

    2. Navigate to the step 3 Add / Modify Connection Policies

    3. Select the target AWS Transit Gateway Name

    4. Find your Spoke Domains and FireNet Domain

      ::

      Example:
      FIRENET-SD, CLIENT-SD and SERVER-SD
         
  * Expect to view each security domain has corresponding domain connection policies as example below:

    * CLIENT-SD

      ::

      Example:
      Connected: FIRENET-SD and SERVER-SD

    * SERVER-SD

      ::

      Example:
      Connected: CLIENT-SD

    * FIRENET-SD

      ::

      Example:
      Connected: CLIENT-SD
			
Check Connection Policy from TGW Orchestrator List
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> List
		
		
    2. Find your Spoke Domains and FireNet Domain under the field Security Domain

      ::

      Example:
 			FIRENET-SD, CLIENT-SD and SERVER-SD
			
		3. Select one of the security domains and click the button "Show Details"
         
  * Expect to view each security domain has corresponding domain connection policies as example below:

    * CLIENT-SD

      ::

      Example:
      Connected Domain(s): FIRENET-SD and SERVER-SD

    * SERVER-SD

      ::

      Example:
      Connected Domain(s): CLIENT-SD

    * FIRENET-SD

      ::

      Example:
      Connected Domain(s): CLIENT-SD


Check routing info in Cloud Platform from TGW Orchestrator Audit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> Audit

    2. Click the button "Run On-Demand Audit"
    
  * Expect to view 'No issue found.' as example below:
  
    ::

    Example:
    No issue found.
  
  * If the output displays other string than 'No issue found.', Aviatrix solution will not work properly

  Probable Causes:

  * IAM permission issue 
  
  * Manually modify routes in Cloud platform 
  

  Suggestions:

	* Check IAM permission by following the documents `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
	
	* Refer to the message(s) in the prompt and correct those missing routes by one of the suggestions as below:
	
		* detach and attach VPC to TGW
		
		* disconnect and connect policy connection
		
Check routing info in Cloud Platform from TGW Orchestrator Test
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> Test

    2. Select the source instance and destination instance on the related configuration
		
		3. Click the button "FlightPath Test"
    
  * Expect to view Pass.
    
  * If the output displays error/failed message, Aviatrix solution will not work properly

  Probable Causes:

  * IAM permission issue 
  
  * Manually modify routes in Cloud platform 
	
	* Either Security group or ACL is not configured properly
  
  Suggestions:

	* Check IAM permission by following the documents `Cloud Permission - AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_
	
	* Refer to the message(s) in the prompt and correct those missing routes by one of the suggestions as below:
	
		* detach and attach VPC to TGW
		
		* disconnect and connect policy connection
		
	* Correct the security group and ACL to allow traffic on both source and destination instances.
	
Check routing info for Spoke Security Domain in Cloud Platform from TGW Orchestrator List
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> List

    2. Find your Spoke Domains under the field Security Domain

      ::

      Example:
 			CLIENT-SD and SERVER-SD
			
		3. Select one of the spoke security domains and click the button "Show Details"
		
	* Expect to view:
	
		1. in VPC Route Table Details section
		
			* RFC 1918 routes (192.168.0.0/16, 10.0.0.0/8, and 172.16.0.0/12) points to AWS TGW 
		
		2. in TGW Route Table Details section 
	
			* one routing entry pointing to the Spoke VPC CIDR itself, tgw attachment ID itself, propagated type, and Resource Name with Spoke VPC name
			
			* rest of the routing entries pointing to
			
				* Spoke VPC CIDR, FireNet tgw attachment ID, static type, and Resource Name with FireNet VPC name
				
				* FireNet VPC CIDR, FireNet tgw attachment ID, static type, and Resource Name with FireNet VPC name
				
Check routing info for FireNet Security Domain in Cloud Platform from TGW Orchestrator List
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: TGW Orchestrator -> List

    2. Find your FireNet Security Domain under the field Security Domain

      ::

      Example:
 			FIRENET-SD
			
		3. Select it and click the button "Show Details"
		
	* Expect to view:
	
		1. in VPC Route Table Details section
		
			* routing table *-firenet-tgw-egress has a route 0.0.0.0/0 pointing to AWS TGW
			
			* routing table *-firenet-tgw-ingress has a route 0.0.0.0/0 pointing to the interface eth1 of Aviatrix FireNet gateway
			
			* routing table *-firenet-dmz-firewall has a route 0.0.0.0/0 pointing to the interface eth2 of Aviatrix FireNet gateway
			
		2. in TGW Route Table Details section 
			
			* routing entries of all Spoke and FireNet security domains, VPC CIDRS, and the corresponding info
			
Check basic Firewall Network configuration from Firewall Network Advanced
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: Firewall Network -> Advanced

    2. Click on the three dot button on the right FireNet VPC ID
		
	* Expect to view:
	
		1. status 'true' under the field Attached which proves Firewall instance is attached to FireNet gateway
		
		2. button "Enable" is clicked uder the section "Traffic Inspection"
		
		3. State 'up' under the section "FireNet Gateway"
		
		4. the below info under section AWS Firewall Network Route Tables
		
			* routing table * TGW Egress Subnet has a route 0.0.0.0/0 pointing to AWS TGW
			
			* routing table * TGW Ingress Subnet has a route 0.0.0.0/0 pointing to the interface eth1 of Aviatrix FireNet gateway
			
			* routing table * Firewall Subnet has a route 0.0.0.0/0 pointing to the interface eth2 of Aviatrix FireNet gateway 
			
Check routing info in Cloud Platform which is related to Firewall Network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  * Steps:
  
    1. Navigate to the Aviatrix GUI page: Firewall Network -> Vendor Integration

    2. Click on the first tab "Firewall"
