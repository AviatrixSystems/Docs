.. meta::
  :description: Ingress Protection via Aviatrix Transit FireNet with Fortigate
  :keywords: AVX Transit Architecture, Aviatrix Transit network, Transit DMZ, Ingress, Firewall, Fortigate
  
==============================================================
Ingress Protection via Aviatrix Transit FireNet with Fortigate
==============================================================

This document illustrates a widely deployed architecture for Ingress traffic inspection/protection firewall that leverages AWS Load Balancers, 
`Transit FireNet for AWS <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html>`_ and 
`Fortigate VM in AWS <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#example-config-for-fortigate-vm-in-aws>`_.

Ingress traffic from Internet forwards to firewall instances first in Aviatrix Transit FireNet VPC and then reaches to application servers as shown 
in the diagram below. In this design pattern, each firewall instance must perform

  #. Source NAT (SNAT) on its LAN interface that connects to the Aviatrix FireNet gateway 

  #. Destination NAT (DNAT) to the IP of application server or application load balancer
  
|transit_firenet_ingress|

.. note::

	This design pattern also supports multiple of firewalls (scale out fashion) for each Aviatrix Transit FireNet gateway.

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

Refer to `Transit FireNet Workflow for AWS doc <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html>`_ for the below steps. Please adjust the topology depending on your requirements.

Step 1.1. Deploy VPCs for Transit FireNet and Spoke for Applicaton
-----------------------------------------------------------------

	- Create an Aviatrix Transit VPC by utilizing Aviatrix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ with Aviatrix FireNet VPC option enabled

	- Create an Aviatrix Spoke VPC for Application by utilizing Aviatrtix feature `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_ as the previous step or manually deploying it in AWS portal. Moreover, feel free to use your existing VPC.

Step 1.2. Deploy Aviatrix Multi-Cloud Transit Gateway and HA
----------------------------------------------------------

	- Follow this step `Deploy the Transit Aviatrix Gateway <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-2-deploy-the-transit-aviatrix-gateway>`_ to launch Aviatrix Transit gateway and enable HA in Transit FireNet VPC
	
	- Connected Transit mode is not necessary for this Ingress inspection solution.

Step 1.3. Deploy Spoke Gateway and HA
-----------------------------------

	- Follow this step `Deploy Spoke Gateways <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-3-deploy-spoke-gateways>`_ to launch Aviatrix Spoke gateway and enable HA in Spoke VPC for Application 

Step 1.4. Attach Spoke Gateways to Transit Network
------------------------------------------------

	- Follow this step `Attach Spoke Gateways to Transit Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-4-attach-spoke-gateways-to-transit-network>`_ to attach Spoke Gateways to Transit Gateways 

Step 1.5. Configure Transit Firewall Network
------------------------------------------------

	- `Configure Transit Firewall Network <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-6-configure-transit-firewall-network>`_
	
	- Adding spoke to the Inspected box for traffic inspection in 2> Manage FireNet Policy is not necessary for this Ingress solution as inbound traffic hit firewall instances first.

Step 1.6. Launch and Associate Firewall Instance
------------------------------------------------

	- `Subscribe Firewall Vendor in AWS Marketplace <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#step-7-subscribe-firewall-vendor-in-aws-marketplace>`_ for Fortigate Next Generation Firewall

	- Launch Fortigate Firewall instance for each Aviatrix Transit FireNet gateway by following this `step <https://docs.aviatrix.com/HowTos/transit_firenet_workflow_aws.html#fortigate-specifications>`_

		+--------------------------+-------------------------------------------------------------+
		| **Example setting**      | **Example value**                                           |
		+--------------------------+-------------------------------------------------------------+
		| Firewall Image           | Fortinet FortiGate Next-Generation Firewall                 |
		+--------------------------+-------------------------------------------------------------+
		| Firewall Image Version   | 6.4.2                                                       |
		+--------------------------+-------------------------------------------------------------+
		| Firewall Instance Size   | c5.xlarge                                                   |
		+--------------------------+-------------------------------------------------------------+
		| Egress Interface Subnet  | Select the subnet whose name contains "FW-ingress-egress".  |
		+--------------------------+-------------------------------------------------------------+
		| Key Pair Name (Optional) | The .pem file name for SSH access to the firewall instance. |
		+--------------------------+-------------------------------------------------------------+
		| Attach                   | Check                                                       |
		+--------------------------+-------------------------------------------------------------+
		
	- Wait for a couple of minutes for the Fortigate Firewall instances to turn into Running Instance state
	
	- Will walk through how to set up basic configuration for FortiGate (Fortinet) in the later section 'Workflow on Firewall instances - Fortigate'. Please move on to the next section 'Workflow on AWS Application Load Balancer' first

Workflow on AWS Application Load Balancer
=========================================

This workflow example describes how to

	#. place an internet-facing AWS Load Balancer to load balance traffic to firewall instances in Transit FireNet

	#. place an internal AWS Load Balancer to load balance traffic to private application server in Application Spoke
	
	#. set up the related network components and private application web server with HTTP and port 8080
	
Please adjust the settings depending on your requirements.
	
Step 2.1. Create an AWS Application Load Balancer with scheme Internet-facing
-----------------------------------------------------------------------------

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
		
	- Wait for a couple of minutes and check firewall instances' healthy Status behind AWS Application Load Balancer
	
		|Internet_ALB_WEB_HTTP_8080_tg_healthcheck|
		
		.. note::
			
			Targets healthy status behind AWS load balancer can be found on the page "EC2 -> Target groups -> selecting the target group -> Targets" in AWS portal.
	
Step 2.2. Launch an Apache2 Web server in Application Spoke
-----------------------------------------------------------

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
	
Step 2.3. Create an AWS Application Load Balancer with scheme Internal
----------------------------------------------------------------------

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

This is just a simple example to set up Firwall for Ingress traffic. Please adjust the security settings depending on your requirements.

Step 3.1. Set up basic configuration for FortiGate (Fortinet)
-------------------------------------------------------------

	- Refer to `Fortigate Example <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#example-config-for-fortigate-vm-in-aws>`_ to launch Fortigate in AWS and for more details.
	
	- `Reset Fortigate Next Generation Firewall Password <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#reset-fortigate-next-generation-firewall-password>`_
	
	- `Configure Fortigate Next Generation Firewall port1 with WAN <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#configure-fortigate-next-generation-firewall-port1-with-wan>`_
	
	- `Configure Fortigate Next Generation Firewall port2 with LAN <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#configure-fortigate-next-generation-firewall-port2-with-lan>`_
	
	- `Create static routes for routing traffic to Spoke VPC <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#create-static-routes-for-routing-of-traffic-vpc-to-vpc>`_

Step 3.2. Configure Destination NAT (DNAT) to the FQDN/IP of Internal Application Load Balancer
-----------------------------------------------------------------------------------------------

	- Login Fortigate GUI
	
	- Navigate to the page "Policy & Objects -> Virtual IPs"
	
	- Click the button "+ Create New"
	
	- Enter fields for Name, Comments, Interface, Type, External IP address, Mapped address, and Port Forwarding as follows:
	
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
		
		|Ingress_Fortigate_DNAT|

	- Create a tag for Mapped address by clicking the button "+ Create"
	
		|Ingress_Fortigate_DNAT_Mapped_address|
		
	- Enter fields for Name, Type, FQDN, and Interface for Mapped address as follows:
	
		+---------------------+---------------------------------------------------------------------------------------------+
		| **Example setting** | **Example value**                                                                           |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Name                | Internal-ALB-WEB-HTTP-8080                                                                  |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Type                | FQDN                                                                                        |
		+---------------------+---------------------------------------------------------------------------------------------+
		| FQDN                | DNS name of the internal AWS Application Load Balancer which is created in the previos step |
		+---------------------+---------------------------------------------------------------------------------------------+
		| Interface           | any                                                                                         |
		+---------------------+---------------------------------------------------------------------------------------------+
		
		|Ingress_Fortigate_DNAT_Mapped_address_2|
		
		.. important::
		
			FQDN is the DNS name of the 'internal' AWS Application Load Balancer not 'internet-facing' AWS ALB.
		
		.. note::
			
			DNS name of the AWS Application Load Balancer can be found on the page "EC2 -> Load Balancing -> Load Balancers -> selecting the Load balancer -> Description -> DNS name"
			

Step 3.3. Apply Destination NAT (DNAT) and configure Source NAT (SNAT) on firewall's LAN interface in Firewall Policy to allow Ingress traffic
----------------------------------------------------------------------------------------------------------------------------------------------

	- Navigate to the page "Policy & Objects -> Firewall Policy"
	
	- Click the button "+ Create New"
	
	- Enter fields for Name, Incoming Interface, Outgoing Interface, Source, Destination, Service, Action, NAT,  IP Pool Configuration as follows:

		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		| **Section**                | **Example setting**   | **Example value**                                                                                 |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		| Edit Policy                | Name                  | Ingress-WEB-HTTP-8080                                                                             |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Incoming Interface    | WAN (port1)                                                                                       |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Outgoing Interface    | LAN (port2)                                                                                       |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Source                | all                                                                                               |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Destination           | Select the Virtual IPs 'DNAT-to-Internal-ALB-WEB-HTTP-8080' which is created in the previous step |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Service               | Create a new service for HTTP-8080                                                                |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | Action                | ACCEPT                                                                                            |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		| Firewall / Network Options | NAT                   | Enable                                                                                            |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
		|                            | IP Pool Configuration | Use Outgoing Interface Address                                                                    |
		+----------------------------+-----------------------+---------------------------------------------------------------------------------------------------+
	
		.. important::
		
			To enable DNAT function, need to select 'Virtual IPs' for Destination under Edit Policy.
			
			To enable SNAT function, need to enable NAT with IP Pool Configuration under Firewall / Network Options.
			
		|Ingress_Fortigate_Firewall_policy|
	
	- Create a new service for HTTP-8080 by clicking the button "+ Create"
	
		+------------------+---------------------+-----------------------+
		| **Section**      | **Example setting** | **Example value**     |
		+------------------+---------------------+-----------------------+
		| New Service      | Name                | HTTP-8080             |
		+------------------+---------------------+-----------------------+
		|                  | Category            | Web Access            |
		+------------------+---------------------+-----------------------+
		| Protocol Options | Protocol Type       | TCP/UDP/SCTP          |
		+------------------+---------------------+-----------------------+
		|                  | Address             | IP Range with 0.0.0.0 |
		+------------------+---------------------+-----------------------+
		|                  | Destination Port    | TCP with port 8080    |
		+------------------+---------------------+-----------------------+
	
		|Ingress_Fortigate_Firewall_policy_service|
		
	- Review Firewall Policy
	
		|Ingress_Fortigate_Firewall_policy_review|

Step 3.4. Repeat the above steps for all your firewall instances
----------------------------------------------------------------

Step 3.5. Reference
--------------------

	-  Inbound application traffic with firewall resiliency in `Amazon Web Services (AWS) Reference Architecture <https://www.fortinet.com/content/dam/fortinet/assets/white-papers/wp-aws-reference-architecture.pdf>`_ 

	- INBOUND APPLICATION TRAFFIC WITH FIREWALL RESILIENCY in `wp-aws-transit-gateway-cloud-services.pdf <https://www.fortinet.com/content/dam/fortinet/assets/white-papers/wp-aws-reference-architecture.pdf>`_ 
		
	- `FortiGate Cookbook <https://docs.fortinet.com/document/fortigate/6.2.4/cookbook/954635/getting-started>`_
	
Ready to go!
=============

Now firewall instances and private application server are ready to receive Ingress traffic!

Open your browser and access the DNS of AWS Internet Application Load Balancer with HTTP and port 8080.

	|Ingress_private_WEB_server_access|
	
.. |transit_firenet_ingress| image:: ingress_firewall_example_media/Ingress_Aviatrix_Transit_FireNet_topology.png
   :scale: 30%
   
.. |Ingress_ALB| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_ALB.png
   :scale: 30%	 
	 
.. |Ingress_Internet_ALB_Step_1_Configure_Load_Balancer| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_1_Configure_Load_Balancer.png
   :scale: 30%
	 
.. |Ingress_Internet_ALB_Step_3_Configure_Security_Groups| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_3_Configure_Security_Groups.png
   :scale: 30%
	 
.. |Ingress_Internet_ALB_Step_4_Configure_Routing| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_4_Configure_Routing.png
   :scale: 30%

.. |Ingress_Internet_ALB_Step_5_Register_Targets_1| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_5_Register_Targets_1.png
   :scale: 30%
	 
.. |Ingress_Internet_ALB_Step_5_Register_Targets_2| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_5_Register_Targets_2.png
   :scale: 30%
	 
.. |Ingress_Internet_ALB_Step_6_Review| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internet_ALB_Step_6_Review.png
   :scale: 30%
	 
.. |Internet_ALB_WEB_HTTP_8080_tg_healthcheck| image:: ingress_protection_transit_firenet_fortigate_media/Internet_ALB_WEB_HTTP_8080_tg_healthcheck.png
   :scale: 30%
	 
.. |Ingress_Internal_ALB_Step_1_Configure_Load_Balancer| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internal_ALB_Step_1_Configure_Load_Balancer.png
   :scale: 30%
	 
.. |Ingress_Internal_ALB_Step_6_Review| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Internal_ALB_Step_6_Review.png
   :scale: 30%
	 
.. |Ingress_Fortigate_DNAT| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_DNAT.png
   :scale: 30%

.. |Ingress_Fortigate_DNAT_Mapped_address| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_DNAT_Mapped_address.png
   :scale: 30%
	 
.. |Ingress_Fortigate_DNAT_Mapped_address_2| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_DNAT_Mapped_address_2.png
   :scale: 30%
	 
.. |Ingress_Fortigate_Firewall_policy| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_Firewall_policy.png
   :scale: 30%
	 
.. |Ingress_Fortigate_Firewall_policy_service| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_Firewall_policy_service.png
   :scale: 30%
	 
.. |Ingress_Fortigate_Firewall_policy_review| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_Fortigate_Firewall_policy_review.png
   :scale: 30%
	 
.. |Ingress_private_WEB_server_access| image:: ingress_protection_transit_firenet_fortigate_media/Ingress_private_WEB_server_access.png
   :scale: 30%	 
	 
.. disqus::
