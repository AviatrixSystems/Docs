.. meta::
  :description: Ingress Protection via Aviatrix Transit FireNet with Fortigate
  :keywords: AVX Transit Architecture, Aviatrix Transit network, Transit DMZ, Ingress, Firewall, Fortigate
  
==============================================================
Ingress Protection via Aviatrix Transit FireNet with Fortigate
==============================================================

This document illustrates a simple architecture for Ingress traffic inspection/protection firewall that leverages AWS Load Balancers, 
`Transit FireNet for AWS <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html>`_ and 
`Fortigate Example <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#example-config-for-fortigate-vm-in-aws>`_.

Ingress traffic from Internet forwards to firewall instances first in Aviatrix Transit FireNet VPC and then reaches to application servers as shown 
in the diagram below. In this design pattern, each firewall instance must performs

  #. Source NAT (SNAT) on its LAN interface that connects to the Aviatrix FireNet gateway 

  #. Destination NAT (DNAT) to the IP of application server or application load balancer
  
|transit_firenet_ingress|

This document describes a step-by-step Ingress Protection via Aviatrix Transit FireNet with Fortigate deployment workflow for R6.1 and later. 
In this note you learn how to:

	#. Workflow on Transit FireNet for AWS
  
	#. Workflow on AWS Application Load Balancer
	
	#. Workflow on Firewall instances - Fortigate

For more information about Transit FireNet, please check out the below documents:

  `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_
  
  `Firewall Network Design Patterns <https://docs.aviatrix.com/HowTos/firewall_network_design_patterns.html>`_

Prerequisite
====================

First of all, `upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.1
  
In this example, we are going to deploy the below VPCs in AWS

	- Aviatrix Transit FireNet VPC (i.e. 10.70.0.0/16)

	- Aviatrix Spoke VPC for Application (i.e. 10.3.0.0/16)

Workflow on Transit FireNet for AWS
=====================================

Step 1. Deploy VPCs
---------------------

	- Create an Aviatrix Transit VPC by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

	- Create an Aviatrix Spoke VPC for Application by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in AWS portal. Moreover, feel free to use your existing VPC.
	
	- Refer to `Create VPCs <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-1-create-vpcs>`_ in Transit FireNet Workflow for AWS doc

Step 2. Deploy Aviatrix Multi-Cloud Transit Gateways
------------------------------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA in Transit FireNet VPC

Step 3. Deploy Spoke Gateways
------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA in Spoke VPC for Application 

Step 4. Attach Spoke Gateways to Transit Network
------------------------------------------------

	- Follow this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Spoke Gateways to Transit Gateways 

Step 5. Configure Transit Firewall Network
------------------------------------------------

Step 6. Launch and Associate Firewall Instance
------------------------------------------------


Workflow on AWS Application Load Balancer
=========================================

This workflow example describes how to

	#. place an internet-facing AWS Load Balancer to load balance traffic to firewall instances in Transit FireNet

	#. place an internal AWS Load Balancer to load balance traffic to private application server in Application Spoke
	
	#. set up the related network components and private application web server with HTTP and port 8080
	
Step 1. Create an AWS Application Load Balancer with scheme Internet-facing
---------------------------------------------------------------------------

In Transit FireNet VPC, create an internet-facing AWS Application Load Balancer by following the steps below:

	- Select Application Load Balancer HTTP/HTTPS
	
		|Ingress_ALB|
	
	- Select items as follows in Step 1: Configure Load Balancer
		
		+---------------------+------------------------+-------------------------------------------------------------------+
		| **Section**         | **Field**              | **Value**                                                         |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Basic Configuration | Scheme                 | internet-facing                                                   |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | IP address type        | ipv4                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Listeners           | Load Balancer Protocol | HTTP                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | Load Balancer Port     | 8080                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Availability Zones  | VPC                    | Aviatrix Transit FireNet VPC                                      |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | Availability Zones     | select the subnet with *-Public-FW-ingress-egress-AZ-* in each AZ |
		+---------------------+------------------------+-------------------------------------------------------------------+
	
		|Ingress_Internet_ALB_Step_1_Configure_Load_Balancer|
		
	-	Create a security group with Protocol TCP and Port 8080 in Step 3: Configure Security Groups
	
		|Ingress_Internet_ALB_Step_3_Configure_Security_Groups|
	
	- Select items as follows in Step 4: Configure Routing
	
		+--------------------------------+---------------+-------------------+
		| **Section**                    | **Field**     | **Value**         |
		+--------------------------------+---------------+-------------------+
		| Target group                   | Target group  | New target group  |
		+--------------------------------+---------------+-------------------+
		|                                | Target type   | Instance          |
		+--------------------------------+---------------+-------------------+
		|                                | Protocol      | HTTP              |
		+--------------------------------+---------------+-------------------+
		|                                | Port          | 8080              |
		+--------------------------------+---------------+-------------------+
		| Health checks                  | Protocol      | HTTPS             |
		+--------------------------------+---------------+-------------------+
		|                                | Path          | /                 |
		+--------------------------------+---------------+-------------------+
		| Advanced health check settings | Port          | override with 443 |
		+--------------------------------+---------------+-------------------+
		|                                | Success codes | 302               |
		+--------------------------------+---------------+-------------------+
		
		|Ingress_Internet_ALB_Step_4_Configure_Routing|

	- Select firewall instances and click the button "Add to registered" in Step 5: Register Targets
	
		|Ingress_Internet_ALB_Step_5_Register_Targets_1|

	- Confirm the selected firewall instances are placed under the section "Registered targets"
	
		|Ingress_Internet_ALB_Step_5_Register_Targets_2|
		
	- Review the configuration in Step 6: Review
	
		|Ingress_Internet_ALB_Step_6_Review|
	
Step 2. Launch an Apache2 Web server in Application Spoke
----------------------------------------------------------

In Application Spoke, create an Ubuntu Server 18.04 LTS virtual machine and install Apache2 HTTP Server with custom port 8080 as a web application server.

+---------------------+-------------------+
| **Example setting** | **Example value** |
+---------------------+-------------------+
| Protocol            | HTTP              |
+---------------------+-------------------+
| Port                | 8080              |
+---------------------+-------------------+

.. Note::

	Refer to `Install The Latest Apache2 HTTP Server ( 2.4.34 ) On Ubuntu 16.04 | 17.10 | 18.04 LTS Servers <https://websiteforstudents.com/install-the-latest-apache2-2-4-34-on-ubuntu-16-04-17-10-18-04-lts-servers/>`_ to install Apache2 HTTP Server
	
	Refer to `How To Change Apache Default Port To A Custom Port <https://www.ostechnix.com/how-to-change-apache-ftp-and-ssh-default-port-to-a-custom-port-part-1/>`_ to use custom port 8080
	
Step 3. Create an AWS Application Load Balancer with scheme Internal
---------------------------------------------------------------------

In Application Spoke VPC, create an internal AWS Application Load Balancer by refering to the steps below:

	- Select Application Load Balancer HTTP/HTTPS
	
		|Ingress_ALB|
		
	- Select items as follows in Step 1: Configure Load Balancer

		+---------------------+------------------------+-------------------------------------------------------------------+
		| **Section**         | **Field**              | **Value**                                                         |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Basic Configuration | Scheme                 | internal                                                          |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | IP address type        | ipv4                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Listeners           | Load Balancer Protocol | HTTP                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | Load Balancer Port     | 8080                                                              |
		+---------------------+------------------------+-------------------------------------------------------------------+
		| Availability Zones  | VPC                    | Aviatrix Spoke VPC for application                                |
		+---------------------+------------------------+-------------------------------------------------------------------+
		|                     | Availability Zones     | select the subnet where private application servers locate        |
		+---------------------+------------------------+-------------------------------------------------------------------+
		
		|Ingress_Internal_ALB_Step_1_Configure_Load_Balancer|
		
	-	Create a security group with Protocol TCP and Port 8080 in Step 3: Configure Security Groups
	
	- Select items as follows in Step 4: Configure Routing
	
		+--------------------------------+---------------+-------------------+
		| **Section**                    | **Field**     | **Value**         |
		+--------------------------------+---------------+-------------------+
		| Target group                   | Target group  | New target group  |
		+--------------------------------+---------------+-------------------+
		|                                | Target type   | Instance          |
		+--------------------------------+---------------+-------------------+
		|                                | Protocol      | HTTP              |
		+--------------------------------+---------------+-------------------+
		|                                | Port          | 8080              |
		+--------------------------------+---------------+-------------------+
		| Health checks                  | Protocol      | HTTP              |
		+--------------------------------+---------------+-------------------+
		|                                | Path          | /                 |
		+--------------------------------+---------------+-------------------+
		| Advanced health check settings | Port          | traffic port      |
		+--------------------------------+---------------+-------------------+
		|                                | Success codes | 200               |
		+--------------------------------+---------------+-------------------+
	
	- Select private application server and click the button "Add to registered" in Step 5: Register Targets
	
	- Review the configuration in Step 6: Review
	
		|Ingress_Internal_ALB_Step_6_Review|
		
Workflow on Firewall instances - Fortigate	
==========================================

Step 1. Set up basic configuration for FortiGate (Fortinet)
-----------------------------------------------------------

	- Refer to `Fortigate Example <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#example-config-for-fortigate-vm-in-aws>`_ to launch Fortigate in AWS and for more details.
	
	- `Reset Fortigate Next Generation Firewall Password <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#reset-fortigate-next-generation-firewall-password>`_
	
	- `Configure Fortigate Next Generation Firewall port1 with WAN <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#configure-fortigate-next-generation-firewall-port1-with-wan>`_
	
	- `Configure Fortigate Next Generation Firewall port2 with LAN <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#configure-fortigate-next-generation-firewall-port2-with-lan>`_
	
	- `Create static routes for routing traffic to Spoke VPC <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#create-static-routes-for-routing-of-traffic-vpc-to-vpc>`_

Step 2. Configure Destination NAT (DNAT) to the IP of application load balancer
--------------------------------------------------------------------------------

	- Login Fortigate GUI
	
	- Navigate to the page "Policy & Objects -> Virtual IPs"
	
	- Click the button "+ Create New"
	
	- Enter fields for Name, Comments, Interface, Type, External IP address, Mapped address, and Port Forwarding as follows
	
		+-----------------+-----------------------+-----------------------------------------------+
		| **Section**     | **Example setting**   | **Example value**                             |
		+-----------------+-----------------------+-----------------------------------------------+
		| Edit Virtual IP | VIP type              | IPv4                                          |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Name                  | DNAT-to-Internal-ALB-WEB-HTTP-8080            |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Comments              | DNAT-to-Internal-ALB-WEB-HTTP-8080            |
		+-----------------+-----------------------+-----------------------------------------------+
		| Network         | Interface             | WAN (port1)                                   |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Type                  | FQDN                                          |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | External IP address   | Private IP of interface WAN (port1)           |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Mapped address        | Create a new tag 'Internal-ALB-WEB-HTTP-8080' |
		+-----------------+-----------------------+-----------------------------------------------+
		| Port Forwarding | Status                | enable                                        |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Protocol              | TCP                                           |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | External service port | 8080                                          |
		+-----------------+-----------------------+-----------------------------------------------+
		|                 | Map to port           | 8080                                          |
		+-----------------+-----------------------+-----------------------------------------------+

	- Create a tag for Mapped address by clicking the button "+ Create"
	
		||
		
	- Enter fields for Name, Type, FQDN, and Interface as follows for Mapped address
	
		+---------------------+---------------------------------------------------------------------------------------------+
		| **Example setting** | **Example value**                                                                           |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Name                | Internal-ALB-WEB-HTTP-8080                                                                  |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Type                | FQDN                                                                                        |
		+---------------------+---------------------------------------------------------------------------------------------+
		| FQDN                | DNS name of the internal AWS Application Load balancer which is created in the previos step |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Interface           | any                                                                                         |
		+---------------------+---------------------------------------------------------------------------------------------+
		
		||
		
		.. important::
		
			FQDN is the DNS name of the 'internal' AWS Application Load balancer not 'internet-facing' AWS ALB.
		
		.. note::
			
			DNS name of the AWS Application Load balancer can be found on the page "EC2 -> Load Balancing -> Load Balancers -> selecting the Load balancer -> Description -> DNS name"
			

Step 3. Apply Destination NAT (DNAT) and configure Source NAT (SNAT) on firewall's LAN interface in Firewall Policy to allow Ingress traffic
--------------------------------------------------------------------------------------------------------------------------------------------

	- Navigate to the page "Policy & Objects -> Firewall Policy"
	
	- Click the button "+ Create New"
	
	- Enter fields for Name, Incoming Interface, Outgoing Interface, Source, Destination, Service, Action, NAT,  IP Pool Configuration as follows:
	
	
	
	


.. |transit_firenet_ingress| image:: ingress_firewall_example_media/Ingress_Aviatrix_Transit_FireNet_topology.png
   :scale: 30%
   
.. disqus::
