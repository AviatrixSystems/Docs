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
      
    Check routing info in Cloud Platform which is related to TGW Orchestrator
      
      `Check routing info in Cloud Platform from TGW Orchestrator Audit`_
      
      `Check routing info in Cloud Platform from TGW Orchestrator Test`_
      
      `Check routing info in Cloud Platform from TGW Orchestrator List`_
      
    `Check bacsic Firewall Network configuration from Firewall Network Advanced`_
     
    `Check routing info in Cloud Platform which is related to Firewall Network`_
   
    `Check routing info in Aviatrix FireNet Gateway from Firewall Network Advanced`_
      
  `Check routing info in Firewall from Firewall Network `_
  
      -----[OLD]-----
  
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
  
  * 
  
  *

  Suggestions:

  * Attempt to use a public DNS such as 8.8.8.8 or cloud platform default DNS first

  * `Check basic network configuration of AWS where Aviatrix Controller locates from AWS portal`_
  
