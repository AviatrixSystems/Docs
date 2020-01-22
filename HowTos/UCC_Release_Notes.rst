=======================================
Release Notes
=======================================

R5.3 (Coming soon)
=====================

1. Networking 
--------------------

 - **AWS Transit Gateway (TGW) Inter Region Peering**
 - **Approval Process for BGP Learned Routes** 
 - **CloudWAN Customize routes on CloudWAN with Tags**
 - **CloudWAN Saves Multiple IOS Config Versions** 
 - **Use NLB to load balance UDP based User VPN** allows you to use AWS Network Loadbalancer for UDP traffic to scale out User VPN solution. The advantage for the deployment is improved throughput performance comparing to TCP based VPN solution.  

2. Security
--------------

 - **Aviatrix Transit FireNet for Azure**
 - **Aviatrix Transit Gateway supports multiple TGW Security Domains**
 - **Check Point CloudGuard** can be launched from Aviatrix Controller for FireNet use case.  
 - **Fortinet FortGate** can be launched from Aviatrix Controller for FireNet use case.
 - **Secure S3 Transfer** allows you to leverage Direct Connect to access S3 buckets while preventing data leakage. 
 - **FireNet Fail Close** provides an option to FireNet gateway to drop packets when no firewall instances are attached. 

3. Operation
-------------

 - **FlightPath to support IP address**
 - **FlightPath for Azure**
 - **FlightPath for GCP**
 - **Dynamically display packets while packet capture is on** allows you to view the packet summary on the Controller console while they are being captured. 
 - **User VPN Cert Issue Date** 
 - **User VPN Client Software Control** allows you to set a minimum Aviatrix VPN client software version that is allowed to connect successfully. 

R5.2.2092 (1/15/2020)
=======================

 - **Bug fix** Aviatrix Active Mesh Transit Gateway takes exception when building Transit Peering. 

R5.2.2071 (1/10/2020)
=========================

 - **Bug fix** on-prem adverting the default route 0.0.0.0/0 via TGW DXGW is not propagated through Aviatrix Transit Peering. 
 - **Bug fix** Fix exception when using "Export to Terraform" feature with Aviatrix created VPC resource. 
 - **Enhancement** to reduce failover time for Connected Transit deployment.

R5.2.2047 (12/19/2019)
========================

 - **Bug fix** Azure China upgraded to upgrade from 5.1 to 5.2.
 - **Bug fix** Aviatrix Transit Gateway with multiple Spoke gateways exhibits memory leaks. 
 - **Bug fix** GCP gateway replacement function fails.
 - **Bug fix** GCP gateway names, VPC route table tables and route entry names can exceed cloud provider's limits. 
 - **Bug fix** Failed to delete IPSec policy when deleting Spoke to Spoke peering. 
 - **Enhancement** Add remote troubleshoot support on CloudN.

R5.2.2011 (12/06/2019)
========================

- **Customize Network Filtering of FQDN** Allow configuration to customize the network CIDRS to not be included in FQDN filtering. One use case is if on-prem requires certain network CIDRs to skip FQDN filtering. To configure, go to Security -> Egress Control -> Egress FQDN Filter. Select Customize Network Filtering.


R5.2.1991 (12/04/2019)
===========================

Security
------------------------------

 - **Transit FireNet** Firewall Network for AWS Encrypted Transit VPC. Transit FireNet integrates Firewall Network function into the Aviatrix Transit Gateway function. With this new capability, you can deploy firewall instances into the encrypted transit network to allow security policy management and IDS/IPS functions. To learn more, refer to `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_.  
 - **Public Subnet Filtering** provides the packet filtering capability to instances deployed in AWS VPC public subnets. Leveraging the AWS Ingress Routing service, the Public Subnet Filtering gateway filters out the malicious IP addresses detected by Amazon GuardDuty. Additionally, the filtering gateway provide FQDN functions for Egress traffic from the public instances. To configure, go to Security -> Public Subnets. Refer to `Public Subnet Filtering Gateway FAQ <https://docs.aviatrix.com/HowTos/public_subnet_filtering_faq.html>`_ for more information.   
 - **Independent Verdict for Each Egress Control Rule** allows you to apply Allow or Deny to each FQDN rule. The use case is if you have a large set of FQDN names that should be allowed but only a small subset be denied, you can avoid inputting a large set of rules by creating a Deny rule of the small subset and one Allow rule with wild card for the large set. To configure, go to Security -> Egress Control. Select a tag, click Edit and add new rules. For more information, refer to `Base Policy <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#base-policy>`_.
 - **FireNet Performance Improvement** FireNet performance achieves 40Gbps throughput. For details, check `this link. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#what-is-the-maximum-performance-firenet-can-achieve>`_
 - **Palo Alto VM-Series Multiple Versions** can be launched from the Aviatrix Controller. The use case is companies with policy of not using the latest software releases. To configure, follow the `Firewall Network Workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_.
 - **API Support for Stateful Firewall Rules Update** allows individual rule to be inserted, appended and deleted. 

Networking
-------------

 - **Aviatrix CloudWAN** provides two capabilities. It centrally manages Cisco IOS routers from the Controller by allowing you to program and edit the IOS CLIs, monitoring the routers' metrics and reachability. It also automatically connects the Cisco IOS routers to the Transit Network with the shortest latency by integrating AWS Global Accelerator. For more information, check out `Cloud WAN FAQ <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html>`_. The use case is to manage and connect the already deployed millions of Cisco IOS routers in the least fiction way and minimum human errors. 
 - **BGP AS_PATH Prepend for Transit Gateway Peering** allows the on-prem learned routes to be propagated to the Transit peering routes along with the AS_PATH information. This feature requires no configuration. 
 - **Consider AS_PATH for Next Hop Decision** enhances the next hop routing decision when the Transit Gateway make decisions. Previously when multiple remote sites advertise the same network CIDRs, Aviatrix Transit Gateway routes with ECMP. With this enhancement, the Transit Gateway selects the shortest AS_PATH length as the preferred routes. Only when remote sites advertises with the same AS_PATH lengths the Transit Gateway routes based on ECMP. This feature requires no configuration. 

Operations
------------

 - **FQDN Dashboard** displays statistics of egress bound destination FQDN names both accepted and rejected. You can further deep dive to see the statistics for each gateways. To view the statistics, go to Dashboard and scroll down to FQDN Stats. 
 - **Flightpath** to include ActiveMesh spoke gateways, ActiveMesh Transit Gateways and peering gateways.  
 - **Selective Gateways for Logging** allows to not to have to enable all gateways for logging events. To configure, go to Settings -> Logging, select a log service, click Advanced to edit the list of the gateways to forward the log to the log service. By default, all gateways are included. 
 - **Show Deployment per Access Account** displays what is deployed, for example, the number of encrypted Spoke gateways, the number of VPC attachment, the number of FQDN gateways and the site2cloud tunnels, deployed for each access account. The use case is to gain visibility of the Aviatrix usage per each account and helps to charge back to teams who are part of the deployment. To view, go to Access Accounts, highlight one access account, click on the three dots skewer, click Show Deployment.
 - **TGW Route Auditing** allows you to immediately discover the missing routes in Spoke VPC route tables and its associated TGW route tables. To use, go to TGW Orchestrator -> List. Highlight one attachment, click the three dots and click Audit Routes.
 - **TGW Audit** expands its capability to audit all route entries of attached VPC route tables in addition to route entries in TGW route tables. To use, go to TGW Orchestrator -> Audit. Select one TGW and click Run On-Demand Audit. 

R5.1.1183 (12/2/2019)
=======================

 - **Bug fix** BGP learned routes parsing error. 
 - **Bug fix** Transit Peering filter not updating new learned routes. 

R5.1.1016 (11/21/2019)
=======================

 - **Bug fix** Fix firewall instance launch failure in AWS Hong Kong region.
 - **Bug fix** NTP configuration corruption fix. 

R5.1.989 (11/17/2019)
=======================

 - **Enhancement** Controller does not allow Transit gateway peering when multiple Transit Gateways are in the same VPC. 
 - **Bug fix** Gateways fail to forward syslog to remote syslog server when Controller cannot reach the syslog server. 
 - **Terraform enhancement** Add Terraform Export for aviatrix_firewall_instance, aviatrix_firenet_resources, aviatrix_firenet.
 - **Bug fix** Export to Terraform feature is broken.

R5.1.973 (11/6/2019)
======================

 - **Bug fix** ActiveMesh does not report tunnel counts to AWS when Metered AMI is deployed. 
 - **Bug fix** Aviatrix Transit Gateway peering does not report tunnel counts to AWS when Metered AMI is deployed. 

R5.1.969 (11/3/2019)
======================

 - **Enhancement** Import VPN users now include user profile field. 
 - **Bug fix** Azure native peering is broken. 
 - **Bug fix** FireNet gateway does not load balance UDP traffic. 
 - **Bug fix** Cannot detach Spoke gateway when customized CIDRs feature is configured on the Spoke gateway. 
 - **Bug fix** Fail to import user via CSV file when Geo VPN and SAML are enabled. 

R5.1.962 (10/29/2019)
=========================

 - **Bug fix** Aviatrix Controller API calls cause Panorama to become unusable overtime as Panorama fills up its desk space. This is a must fix that impacts all FireNet deployment with Panorama. 
 - **Bug fix** FireNet does not load balance UDP packets correctly. This is a must fix that impacts all FireNet deployment where UDP traffic such as DNS, goes through the FireNet.  
 - **Bug fix** ActiveMesh Transit Gateway stops forwarding packets when forwarding from one VTI interface to another. This is a must fix that impacts all multi sites ActiveMesh Transit Gateway deployment.
 - **Bug fix** Transit VPC route propagation gets disabled when other Transit VPN connection is deleted. This is a must fix that impacts all multi sites ActiveMesh Transit Gateway deployment. 

R5.1.943 (10/25/2019)
=======================

 - **Bug fix** Hostname is blocked in VPN profile policy configuration. Revert the change. 
 - **Bug fix** Transit gateway peering is missing on dashboard. 

R5.1.935 (10/19/2019)
==========================

Transit Gateway Enhancement
------------------------------

 - **Transit Gateway Peering with Network Filter** allows you block route propagation from one transit gateway side to the other. This use case is to allow two regions of transit network to connect with each other when there are exact overlapping network CIDRs by blocking on each Transit Gateway these CDIRs. To configure, go to Transit Network -> Transit Peering -> Add New, or Edit an existing peer. For more info, refer to `Filtered CIDRs <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#filtered-cidrs>`_.

 - **Route Table Selection** allows VPC route tables to be selected when attaching attaching a Spoke VPC gateway. Only the selected route tables are programmed for learning routes and reprogramming routes at failover time. `API support <https://api.aviatrix.com/?version=latest#6a8a1c4c-14b6-4f11-b280-d218f60cea1e>`_ only. 

 - **TGW DXGW and VPN Enhancment** allows DXGW and VPN to be deployed in any Security Domain. One use case is if you have multiple VPN connection and do not wish to have the remote sites to have connectivity with each other, you can now create VPN connections in different Security Domains. 
 - **ASN Path Prepend** adds ASN number when Aviatrix transit gateway redistribute routes to its BGP peer. For new Transit connection, the Aviatrix Transit gateway automatically inserts its ASN number. To insert ASN path in an existing connection, go to Transit Network -> Advanced Config -> Prepend AS Path

Security
------------

 - **Force_Drop Function** in statefule firewall rule to allow immediate packet dropping on established sessions. 
 - **Stateful Firewall Port Configuration Enhancement** allows you to add multiple port numbers and multiple port ranges separated by comma in the same rule. 
 - **FQDN for non TCP 443 SSL protocol** allows you to execute FQDN filtering function for HTTPS traffic running on non TCP port 443. The use case is for HTTPS based applications that need to access Internet sites on non TCP port 443. To configure, select HTTPS as the protocol and input a specific TCP port. With is feature, you can configure wild card. 

Operations
------------
 - **IAM Policy Auto Update** allows you to update secondary accounts to the latest IAM policy from the Controller console. To configure, go to Accounts -> Access Accounts. Select an account, click the 3 dots skewer and click "Update policy"
 - **New Dashboard Panel** displays what has been built and if they are healthy.  

R5.1.845 (10/8/2019)
=====================

- **Bug fix** Prevent upgrade from 4.7 to 5.1 directly without going through 5.0 release. 
- **new API** for selecting firewall instance size.
 

R5.1.842 (10/1/2019)
=====================


1. FireNet Network Enhancement
---------------------------------

 - **Firewall Network load balancing from TGW** allows both primary gateway and backup gateway to present its ENI interface so that packets initiated from the Spoke VPCs can be forwarded to both gateways in the AZ affinity or nearest AZ affinity fashion.  
 - **Management access from On-Prem** allows on-prem to connect with private IP address of the firewall device deployed in the Native Firewall Domain, Native Egress Domain and Aviatrix Firewall Domain. To enable, go to TGW Orchestrator -> List, highlight the firewall domain, click Edit, click to enable. Note in this release, both accessing from on-prem via Aviatrix Edge Domain and accessing from TGW plus DXGW/VPN are supported.
 - **Improve FireNet gateway failover time** to be under 16 seconds. 

2. Networking
-----------------
 - **Aviatrix ActiveMesh** is officially available.

R5.0.2782 (9/30/2019)
=======================

 - **Bug fix** Disable Account Audit and Gateway Audit features that cause memory leak in controller. 

R5.0.2773 (9/20/2019)
=======================

 - **Bug fix** GovCloud does not support m4.xlarge on Palo Alto Networks VM-Series, fixed the issue with m5.xlarge instance type. 
 - **Bug fix** Multiple gateway security groups can cause gateway audit to generate false alarm. 

R5.0.2768 (9/18/2019)
========================

 - **Bug fix** FQDN process may take 2 to 5 minutes to restart when a new URL rule is updated. 

R5.0.2754 (9/16/2019)
=======================
 
- **Bug fix** for Oracle Cloud Infrastructure (OCI).

R5.0.2667 (9/9/2019)
=========================

1. Automation & Operations
----------------------------

 - **Official Terraform Provider** Aviatrix has become the official Terraform provider! Visit `Aviatrix Provider <https://www.terraform.io/docs/providers/aviatrix/index.html>`_. Terraform v0.12 is needed, please visit `Compatibility Chart <https://www.terraform.io/docs/providers/aviatrix/guides/release-compatibility.html>`_, `Terraform Provider 2.x Upgrade Guide <https://www.terraform.io/docs/providers/aviatrix/guides/v2-upgrade-guide.html>`_.
 - **New REST API site** visit `api.aviatrix.com <https://api.aviatrix.com/?version=latest>`_ to see our brand new API doc site!
 - **Access Account Audit** continuously monitors the health of Controller and individual access account. The Controller sends email alert to the admin user and logs the event when errors in the account setting are detected.
 - **Gateway Audit** continuously monitors the status of gateway cloud credentials and security groups. For AWS, this credential is the gateway's IAM roles and policies. The Controller sends email alert to the admin user and logs the event when errors of gateway cloud credentials are detected. To view the health of the gateway, go to Gateway page and check the field `Audit. <https://docs.aviatrix.com/HowTos/gateway_audit.html>`_
 - **Logs display the source IP address when a user login** to improve visibility.
 - **Logs display the latest at the top of the screen** for ease of use. The logs include Site2Cloud diagnostics messages and command log messages.
 - **Export VPC Tracker to XML** allows you to download in Excel form all VPCs the Controller retrieves. To download, go to Useful Tools -> VPC Tracker, click the refresh button and then click Export to CSV.
 - **Bulk import/export VPN Users** Allow onboarding VPN users in volume.
 - **Gateway restart** is a feature that when Controller detects a gateway goes down and initiates a failover, and in the meantime restart the failed gateway to recover its state. This feature is enabled by default on all gateways.

2. Multi Cloud
-----------------

 - **Azure Transit with Native Spoke VNet Support** Allows you to build a transit solution without launching an Aviatrix gateway in the Spoke VNet. The solution leverages the Azure native peering capability for the traffic between Spoke VNet and Transit VNet, it also leverages the Controller to propagate learned routes directly to Spoke VNet. Follow the `Transit Network Workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to get started by launching an Aviatrix Transit GW. Attach a Spoke VNet at `Step 6b <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#b-attach-azure-arm-spoke-vnet-via-native-peering>`_. 
 - **Azure Transit Insane Mode Support** expands our `Insane Mode Encryption Service <https://docs.aviatrix.com/HowTos/insane_mode.html>`_ to Azure networks. The support include Insane Mode encryption over Express Route, Insane Mode for VNet to VNet encrypted peering and Transit Peering connections. Launch an Azure gateway with Insane Mode enabled to get started. 
 - **GCP Transit Gateway Support** expands our `Transit Network Solution <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to Google GCP. Follow the `Transit Network Solution <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ instruction to get started. 
 - **Oracle Cloud (OCI) Spoke Gateway Support** expands our Transit Network Solution to OCI Spoke gateways. 

3. Networking
----------------

 - **IKEv2 support for Site2Cloud connections** expands site2cloud function to support IPSEC IKEv2. Follow the `site2cloud instructions <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ to get started. 
 - **IPv6 Support** enables an Aviatrix gateway to have IPv6 address. One use case is to leverage the unique addressing of IPv6 to solve overlapping network CIDR problem in the cloud networks. IPv6 is supported on User VPN function and Encrypted Peering function. To enable, go to Gateway page, select the gateway, click Edit. Scroll down to IPv6 and click Enable. Refer to `Aviatrix IPv6 <https://docs.aviatrix.com/HowTos/gateway.html#ipv6>`_ for more details. 
 - **Insane Mode over Internet** allows you to leverage the existing high speed Internet to build high performance encryption.
 - **User VPN Support two way communication** between client and cloud instances by disabling VPN gateway NAT function and program the VPC route table for traffic initiated from VPC to route back to your VPN desktop. 

4. Security
------------
 
 - **FQDN Applies to Private Domain Names** allows you to apply FQDN filter on Domain Names that resolve to private IP addresses. The use case is if you have host names that are on the private network and you need to apply whitelist filter. This is a global capability that applies to all FQDN tags. To enable, go to Egress Control -> Egress FQDN Filter, click "Enable Private Network Filter".
 - **Multi Wildcard for FQDN** allows the FQDN gateway to match more relaxed expressions, such as a-*.b*.com.
 - **FireNet for GovCloud** is available. Follow the instructions for `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to get started.
 - **Aviatrix FQDN gateway for FireNet** enables Aviatrix FQDN function to be centrally deployed in AWS Transit Gateway (TGW) environment. One use case is to limit the number of EIPs of egress packets to specific sites that require whitelist of source IP addresses. To enable, follow the `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ and deploy Aviatrix FQDN gateway at `Step 7c <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#c-launch-associate-aviatrix-fqdn-gateway>`_. Note only Egress Control for Internet bound traffic is supported.    
 
5. AWS Transit Gateway (TGW) Enhancement
-----------------------------------------
 - **Disable Spoke VPC local CIDR propagation** is an optional feature that when enabled the Spoke VPC CIDR is not propagated to TGW route table when the Spoke VPC is attached to TGW. One use case is to allow multiple VPCs to be in one Security Domain (share one TGW route table) without the connectivity between them, thus reducing the need to createe a large number of Security Domains in order to build isolation. This optional feature is enable when attaching a VPC at `TGW Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_.
 - **Select Spoke VPC route table for programming** is an optional feature that allows you to select which Spoke VPC route tables will be programmed of learned routes propagated from on-prem or other Spoke VPCs. One use case is that certain instances in the VPC do not participate the TGW Orchestrator.  
 - **Management access from On-Prem** allows on-prem to access privately (SSH or HTTPS) the firewall device deployed in the Native Firewall Domain, Native Egress Domain and Aviatrix Firewall Domain. To enable, go to TGW Orchestrator -> List, highlight the firewall domain, click Edit, click to enable.Note in this release, only accessing from on-prem via Aviatrix Edge Domain is supported. Accessing from TGW plus DXGW/VPN are not supported.  

6. ActiveMesh and Multi-Site Transit Beta
--------------------------------------------

Learn `Aviatrix Transit ActiveMesh Mode <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_.  Contact Aviatrix sales or support team for preview on ActiveMesh and Multi-site Transit Network. 


R4.7.590 (8/23/2019)
======================

 - **Bug fix** When attaching a Spoke VPC to TGW, VPC route table did not handle the case when there is AWS end point. 
 - **Bug fix** When connecting Transit gateway to external device, Transit gateway did not handle the case if on-prem router's advertised routes is a super set to the IPSEC end point IP address. 
 - **Bug fix** The profile attribute handling for SAML user VPN client did not consider error cases when profile attribute is absent or does not produce a match. 
 

R4.7.581 (8/11/2019)
=======================

 - **Transit peering for two transit gateways in the same VPC** removes the constraint that Transit Peering can only take place on two Aviatrix Transit Gateway in two different VPCs. The use case is if you have deployed two individual transit networks in the same VPC, now you can connect them by implementing Transit Gateway Peering. 


R4.7.501 (7/22/2019)
=======================

 - **Software update for Field Notice 0005** as described in `this document  <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0005-2019-07-22>`_. This software update applies to all customers who use Aviatrix Client VPN software for SAML authentication, and both Aviatrix Client VPN software and Controller are required to upgrade. If you use Aviatrix Client VPN software for non SAML authentication, you are not affected by the issues described in the Field Notice 0005.


R4.7.494 (7/14/2019)
======================

 - **Spoke VPC Gateway Attach Behavior** is modified such that when a spoke gateway is attached to the Aviatrix Transit GW, RFC 1918 routes are programmed. Conversely when a Spoke VPC gateway is detached from the Aviatrix Transit GW, all learned routes are deleted. Such behavior change simplifies migration process from Aviatrix Encrypted Transit architecture to AWS Transit Gateway (TGW) based transit architecture. Backward compatibility is ensured.
 - **Azure Gateway Launch** no longer creates a new resource, instead it now re-uses VNET resource. The use case is customers already created a resource group when creating a VNET. 
 - **Add Aviatrix Tag for Cross Account VPC Attachment** allows you to identify in the TGW route table Aviatrix attachment resource when the Spoke VPC is in a different AWS account.  
 - Bug fix that removes the unnecessary restarts of BGP process after software upgrades.  

R4.7.473 (7/7/2019)
================================================

 - **Palo Alto VM-Series Bootstrap function support** allows firewall instance to retrieve initial VM-Series configuration and policies stored in S3 bucket. The use case is to improve automation by allowing the VM-Series to load the initial policy configuration. For more information, refer to `VM-Series Bootstrap integration. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#example-configuration-for-bootstrap>`_
 - **Palo Alto VM-Series Panorama integration** allows firewall instances to be managed by Panorama. The use case is to have Panorama to centrally manage all firewall deployment both on-prem and in the cloud. For more information, refer to `Panorama integration. <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html#managing-vm-series-by-panorama>`_
 - **EIP Allocation for Transit Gateway** allows a Transit Gateway to be associated with an already allocated EIP. The use case is to manage the Aviatrix gateway EIP the same way you would manage your EC2 deployment EIPs, as they are all in the same pool. 
 - **Insane Mode Gateway Resizing** allows you to resize Insane Mode gateway after it is launched. This provides the flexibility of to manage instance cost when running Insane Mode. 

R4.7.419 (6/30/2019)
===============================================

 - bug fix for "Customize Spoke VPC advertising CIDR".
 - error checking for TGW VPN configuration parameters.


R4.7.378 (6/16/2019)
=====================

1. AWS Transit Gateway Orchestrator
-------------------------------------

 - **AWS TGW Egress/Ingress Domain** allows you to create a central egress network architecture without requiring to launch Aviatrix FireNet gateway. Aviatrix Orchestrator programs the necessary Spoke VPC route tables and TGW route tables to make sure Internet bound traffic from Spoke VPCs are forwarded to the VPC in egress domain. One use case for native egress domain is to reduce the number of EIPs you may have to whitelist to accessing third party SaaS service. In the egress domain, you can deploy `Aviatrix FQDN gateway <https://docs.aviatrix.com/HowTos/fqdn_faq.html>`_ or a virtual appliance to handle Internet bound traffic. Note in this network architecture, there is no built in scale out and redundancy as it is the case for Aviatrix Firewall Network. To configure, select "Native Egress/Ingress Domain" when `creating a New Security Domain <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain>`_ at the TGW Orchestrator Plan. 

 - **AWS TGW Firewall Domain** provides the firewall network architecture without requiring to launch Aviatrix FireNet gateway. Aviatrix Orchestrator programs the necessary Spoke VPC route tables and TGW route tables to make sure traffic that requires inspection is forwarded to the firewall security domain. One use case is to run a virtual appliance for packet inspection. Note in this network architecture, there is no built in scale out and redundancy as it is the case for Aviatrix Firewall Network architecture. To configure, select "Native Firewall Domain" when `creating a New Security Domain <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-a-new-security-domain>`_ at the TGW Orchestrator Plan.

 - **Customize Spoke VPC Route Table** allows you to program route entries in Spoke VPC route table that points to TGW as target. By default, Aviatrix Orchestrator programs RFC 1918 routes in the VPC route table to point to TGW, any routes that are outside of this range is dynamically programmed into the VPC route table. When you enable this feature, all dynamic route propagation will be stopped. One use case is if you simply want to program the default route to point to TGW. Another use case is if you do not wish Aviatrix Orchestrator to program any VPC routes, in which case you should enter 0.0.0.0/32 for the "Customizing Spoke VPC Rotues" field. To configure, enter a list of comma separated CIDRs at `Attach VPC to TGW <https://docs.aviatrix.com/HowTos/tgw_build.html#attach-vpc-to-tgw>`_ during TGW Orchestrator Build. 

 - **Customize TGW VPN Creation** with additional parameters, such as inside_ip_cidr and pre_shared_key. For more information, checkout the API `Attach Native VPN to TGW <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_.

2. Insane Mode Enhancement
----------------------------

 - **Insane Mode Dynamic Bandwidth Adjustment** significantly reduces Insane Mode tunnel switch over probability by automatically removing the failed encryption lane from the load balancing pool while keeping the remaining encryption lanes to continue to forward the traffic. After the failed lane is brought back up, it is then added back to the load balancing pool. Only when 50% of the lanes fail should the Controller declare the tunnel down and switch over to the backup tunnel.  

3. FQDN Enhancement
---------------------------------

 - **Performance Enhancement** to handle traffic burst. FQDN and system memory pool are significantly increased to handle large burst traffic. 


R4.6.587 (5/29/2019)
=====================

1. Networking
-------------------

 - **AWS Transit Gateway Orchestrator for VPN Integration** brings native TGW VPN connection to the Aviatrix Controller Orchestrator. Aviatrix Orchestrator periodically polls TGW route table learned routes from VPN connection and then programs the attach Spoke VPC route tables. One use case is for TGW VPN to connect to on-prem or a third party VPC via IPSec. To configure, follow the `TGW Plan workflow for VPN <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-vpn-connection>`_. 
 - **AWS Transit Gateway Orchestrator for Direct Connect Integration** brings native TGW DXGW cocnnection to the Aviatrix Controller Orchestrator. Aviatrix Orchestrator periodically polls TGW route table learned routes from Direct Connect Gateway connection and then programs the attach Spoke VPC route tables. One use case is for TGW DXGW to connect to on-prem. To configure, follow the `TGW Plan workflow for Direct Connect <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-direct-connect>`_.`
 - **Support multiple Firewall Network domains attached for the same TGW**. The use case is to separate VPC to VPC inspection from egress/ingress inspection. There is no User Interface change. To configure, follow the `Firewall Network workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_. Check out `this design pattern <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#firenet-deployment-model-6>`_ for how to use multi Firewall Networks in TGW environment. 

2. AWS GovCloud
------------------

 - **AWS GovCloud Encrypted Transit** allows you to setup and operate an end-to-end encryption in a transit network. To configure, follow the `Encrypted Transit Network workflow. <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_
 - **AWS Transit Gateway Orchestrator for GovCloud** allows you to setup and operate AWS Transit Gateway based transit network. To learn more, follow the `AWS Transit Gateway Orchestrator <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.
 - **AWS Native Peering for GovCloud** supports AWS native peering in GovCloud. To configure, follow `this link. <https://docs.aviatrix.com/HowTos/peering.html#aws-vpc-peering>`_
 - **Backup & Restore for GovCloud** is the best practice to operate Aviatrix solution. Make sure you enable this feature. 

3. Compliance
--------------
 - **FIPS 140-2 Compliant module** allows you to install and operate FIPS 140-2 Crypto Module for SSL library. To learn more, check out `this document. <https://docs.aviatrix.com/HowTos/fips140-2.html>`_
 - **Security Patch status display** enhances the Security Patch function by displaying the patch status. 

R4.3.1275 (Patch release of 4.3 on 5/20/2019)
===============================================

 - Bug fix for Transit Gateway External Device connection option where on-prem end point uses local link address 169.254.0.0/16.
 - Bug fix for FQDN HTTP protocol handling. 
 - Bug fix for Transit Peering switch over.


R4.3.1262 (Patch release of 4.3 on 5/13/2019)
=============================================

 - **User Selected Subnet Attachment to TGW** allows you to customize the subnet/AZ of a VPC to attach to TGW. To configure, go to TGW Orchestrator -> Build. Select Advanced and multi select the subnets. For MAC, multi select is "Command + highlight". For Windows, multi select is "Control + highlight".
 - Bug fix for transit gateway peering. 
 - Bug fix for Datadog upgrade for Azure gateway. 
 - Remove TGW VPN background task.

R4.3.1230 (5/5/2019)
=====================

1. Networking
----------------

 - **Firewall Network (FireNet)** is the new iteration of Transit DMZ for deploying firewall in the cloud. FireNet provides the simplicity, scalability and automation for an optimal network architecture for firewall deployment. Check out the `FireNet FAQ <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_ to learn more. Follow `FireNet workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to start deploying. 
 - **Transit Peering InsaneMode** allows you to build high performance encrypted connection across AWS regions over AWS private Peering network infrastructure. To configure, first launch the Aviatrix Transit Gateway with InsaneMode enabled, Transit Peering InsaneMode will be automatically enabled when you configure `Transit Gateway Peering. <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_ This feature is only available for AWS deployment.
 - **User Accelerator Preview** integrates AWS Global Accelerator with Aviatrix User VPN to reduce user access latency. 
 - **Azure Native Peering** supports VNET to VNET native peering in the same Azure subscription. Cross subscription is not supported. To configure, go to Peering -> Azure Peering. 
 - **C5n Instance** is now supported. With C5n.18xlarge, InsaneMode IPSEC performance reaches 25Gbps. 
 - **Select Subnets for TGW Attachment** provides by REST API the flexibility to select which subnet to attach to AWS Transit Gateway (TGW). 
 - **Reuse Azure Resource Group** provides by REST API the ability to reuse the VNET resource group when launching an Azure gateway. 

2. Routing Policies
---------------------
 - **Filter Advertised Spoke VPC CIDRs** Supports the ability to exclude certain VPC subnets from advertising to transit gateway. One use case is if you have Spoke VPCs that have partial overlapping VPC CIDRs, by excluding the overlapping CIDRs, you can attach your VPC to Aviatrix Transit Gateway without error. This feature is only available for encrypted transit solution. To configure, check out `this link. <https://docs.aviatrix.com/HowTos/gateway.html#filter-advertised-spoke-vpc-cidrs>`_
 - **Transit Peers as Backup to On-prem local route** is a routing policy for Transit Gateway with the configuration to instruct all remote Transit Gateway peers not to advertise to their on-prem routes that are learned from the Transit Gateway with the configuration, except when the configured Transit Gateway loses connectivity to its on-prem. One use case is for a connected on-prem network with multiple datacenters where each datacenter is connected to a Transit Gateway and where the Aviatrix Transit Gateways form a mesh backbone. With this policy enabled, datacenters do not learn and advertise conflicting cloud routes to each other. To configure, select the Transit Gateway at the Gateway page, click Edit. Scroll down to "Transit Peers As Backup to On-prem", click Enable.  
 
3. Operation
-------------

 - **Terraform Exporter** is a tool to learn and build your deployment with Terraform starting from your Aviatrix Controller Console. For example, use Aviatrix Console to deploy a VPN gateway, add a VPN user. You can then download from the Console the Terraform .tf file and instructions. From this point on, you can add more users directly by editing the Terraform file. Great for Terraform beginners and teams who wish to migrate to use code to manage network infrastructure. To download the resources already configured via Console, go to Useful Tools -> Export to Terraform. Check out `this example guide <https://docs.aviatrix.com/HowTos/tf_export.html>`_ to learn how to use the tool.
 - **SumoLogic Ephemeral Collector** allows any stopped Aviatrix Controller and gateways to remove themselves from the SumoLogic console. 
 - **Datadog version 6 support** If you have already configured Datadog, you can upgrade to version 6 by disable and enable again. To configure, go to Settings -> Logging -> Datadog Agent
 - **Multiple Endpoints for SAML Login to Controller** allows read_only user to login via SAML authentication. To configure, Settings -> Controller -> SAML Login, to add more endpoint. Check out `this doc <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_ for instructions.

R4.2.764 (Patch release of 4.2 on 4/14/2019)
=============================================

 - Missing parameters for "skip_rfc1918" for Azure support.
 - Missing parameters for "skipp_rfc1918" for GCP support. 
 - Bug fix for Transit Peering in handling BGP manual route summary.

R4.2.740 (Patch release of 4.2 on 3/31/2019)
===============================================

Notable bug fixes:
 
 - When attaching a VPC with CIDR 192.168.0.0/16, the system crashes.
 - When on-prem advertises 0.0.0.0/0, spoke gateways in the transit deployment could lose connectivity to the Controller. 
 - FQDN process crashes when certain invalid or corrupted packets are received.
 - Datadog for gateway in ARM does not work. Fix is a workaround to disable Datadog in ARM.
 - InsaneMode BGP session goes down after phase-2 negotiation.

R4.2.634 (3/19/2019)
======================

1. Networking
----------------

- **Transit DMZ for Egress/Ingress Traffic Inspection** provides the networking capability to route Internet bound egress traffic from Spoke VPCs to a third party firewall deployed in the Aviatrix Transit DMZ architecture for inspection. Once `Transit DMZ <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html#>`_ is deployed, go to Transit DMZ -> Advanced, click the Skewer button. Scroll down to enable "Egress through Firewall".  

- **Transit DMZ for East-West Traffic Inspection** provides the networking capability to route VPC to VPC traffic to a third party firewall deployed in the Aviatrix Transit DMZ architecture for inspection. Once `Transit DMZ <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html#>`_ is deployed, go to Transit DMZ -> Advanced, click the Skewer button. Scroll down to enable "East-West Traffic Inspection".

- **BGP Filtering From Learned Routes** allows you to selectively propagate on-prem routes to Spoke VPCs. When applied to the Aviatrix Transit Gateway, all spoke VPCs are filtered by the same rules. One use case of this feature is for a Spoke VPC that is customer facing and you do not wish your customer to access all your on-prem network CIDRs. For more details, refer to `this link. <https://docs.aviatrix.com/HowTos/gateway.html#filter-routes-to-spoke-vpc>`_

- **Spoke VPC CIDR Customization** allows you to specify what to program to a Spoke VPC route tables and ignore any learned routes propagated from on-prem. One use case of this feature is for a Spoke VPC that is customer facing and your customer is propagating routes that may conflict with your on-prem routes. To learn more, refer to `this link. <https://docs.aviatrix.com/HowTos/gateway.html#customize-spoke-vpc-routes>`_

- **Palo Alto VM-Series instance launch** can be done from the Aviatrix Controller console. This simplifies the VM-Series integration into Transit DMZ. To launch, go to Transit DMZ -> Preparation, follow the instructions to launch VM-Series instance. Note you must first subscribe the VM-Series AMI from AWS Marketplace. 

2. Multi Cloud
----------------

- **GCP Spoke Gateway** allows you to launch a GCP gateway in the Aviatrix Next Gen Transit Network workflow. To launch, follow `the Transit VPC workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to launch a GCP Spoke gateway. 

- **GCP FQDN support** allows you to apply Aviatrix FQDN Egress Control to an Aviatrix GCP gateway. Follow `the instructions for FQDN Control <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ to get started.


3. Operation
-------------

- **Controller SAML Authentication** Aviatrix administrators can authenticate to the Controller by SAML authentication on an IDP. Follow the `instructions <https://docs.aviatrix.com/HowTos/Controller_Login_SAML_Config.html>`_ to setup authentication with SAML. 

- **Alert for New Release** sends email to the Controller admin email address to alert you when a major release becomes available. 

- **Aviatrix Gateway EBS Volume Encryption** allows you to encrypt the AWS gateway EBS volume after the gateway is launched. Learn more at this `link. <https://docs.aviatrix.com/HowTos/gateway.html#encrypt-ebs-volume>`_ 

- **Connectivity test** From the Aviatrix Controller you can launch two test instances and run a connectivity test in under two minutes time. One use case is to test connectivity two Spoke VPCs attached to Aviatrix Transit Gateway or AWS Transit Gateway. To use, go to the Controller console, Troubleshoot -> Diagnostics -> Network Validation.

4. Security
-------------
- **FQDN AZ Affinity Load Balancing** is an optimization to avoid cross AZ traffic charge. If you have two private route tables where each route table is associated with subnets in a separate AZ, the Aviatrix Controller programs the default route (0.0.0.0) in each route table to point to the Aviatrix gateway deployed in the that AZ. Note if you have more than two private route tables and more than two AZs of subnets, cross AZ traffic is still not avoidable for some private subnets.  

R4.1.946 (Patch release of 4.1 on 2/21/2019)
===============================================

Notable field found bug fixes:
 
 - Disable OPTIONS HTTP method to pass security scan. 
 - Detach or delete spoke gateway when the gateway instance has been deleted from AWS console. 
 - Allow editing manual summarization CIDR when spoke CIDR are either in primary or backup gateway. 
 

 

R4.1.914 (2/9/2019)
=====================

1. Networking
---------------

- **Transit Gateway Peering** establishes encrypted tunnels that connect inter region and inter cloud networks by transit gateways. This allows you to build a software defined, fully connected global transit network with multiple transit clusters. The spoke VPC/VNet CIDRs and on-prem routes are automatically propagated throughout the network. To configure, follow the `Transit Gateway Peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_ instructions.

- **Azure Transit Gateway** allows you to launch a transit gateway in Azure and build a transit network in Azure the same way for AWS. For configuration instructions, follow the `Global Transit Network Workflow Instructions <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. "Advertise Transit VNET CIDR" is not supported in 4.1.

- **AWS Transit Gateway DMZ** is a Bring Your Own Firewall architecture that seamlessly integrates virtual firewall appliances into the edge of the Next Gen Transit Network. By decoupling firewall functions from the network functions, the architecture allows a scalable firewall deployment that filters traffic between on-prem and cloud. Check out `Transit Gateway FAQ <https://docs.aviatrix.com/HowTos/transit_dmz_faq.html>`_ to learn more. For configuration, follow the `Transit DMZ workflow <https://docs.aviatrix.com/HowTos/transit_dmz_workflow.html>`_..

- **Palo Alto VM-Series Integration** integrates the firewall route updating and health monitoring into the Aviatrix Controller for the AWS Transit Gateway DMZ deployment. The Controller monitors and applies VM-series APIs to the appliance, thus simplifies the operations. For details, read `<https://docs.aviatrix.com/HowTos/transit_dmz_vendors.html>`_.

- **External Device support for Transit** allows you to build the Next Gena Transit Network without the constraint of the 100 route limits by AWS VGW. By establishing the IPSEC tunnel directly to your on-prem router over Direct Connect or Internet, VGW no longer carries the routes from on-prem and Spoke VPCs. To configure, follow the `Transit gateway to external device <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_. Check out the configuration examples for `on-prem ISR/ASR <https://docs.aviatrix.com/HowTos/transitgw_external.html#appendix-2-transit-connection-to-cisco-isr-asr-over-direct-connect>`_. 

- **Insane Mode Encryption** breaks the 1.25Gbps Transit VPC performance limit and allows you to scale your transit network to 10Gbps throughput with encryption between on-prem and Spoke network. Insane Mode is also supported for Spoke VPCs' connectivities with up to 20Gbps throughput. Follow `Insane Mode <https://docs.aviatrix.com/HowTos/insane_mode.html>`_ to learn more.

- **Aviatrix Hardware Appliance CloudN** is the on-prem appliance that enables the Insane Mode Encryption for the Next Gen Transit Network. For details, check out `Aviatrix hardware appliance CloudN <https://docs.aviatrix.com/HowTos/insane_mode.html>`_.

2. OpenVPN®
--------------

- **OpenVPN® User Tracking** enables you to quickly correlate a destination IP address access to the specific VPN user. If you select Destination IPs and enter a list of IP addresses, the Aviatrix Controller console returns the list of the VPN user names that communicated with the IP address. If you select Username and enter VPN user names, the console returns all destination IP addresses the user visited. You can further filter on time span and selected VPN gateways. To use the feature, go to Troubleshoot -> Diagnostics -> VPN User. If your VPN configuration is Full Tunnel mode (as opposed to the default Split Tunnel mode), this tool enables the administrator to have complete visibility of your end user activities including Internet browsing.

- **OpenVPN® User Diagnostics** improves the speed to troubleshoot if a VPN user has connection problem. Simply enter the user name and discover the errors. To use, go to Troubleshoot -> Diagnostics -> VPN User, enter the VPN user name and click Go.

3. Troubleshoot
----------------

- **Flightpath With Expert Diagnostics** adds expert diagnostics capability to the popular `Flightpath tool <https://docs.aviatrix.com/HowTos/flightpath.html>`_. Flightpath reduces the stress of everyday troubleshooting by pulling together multiple AWS service pages to a single page with side by side display of source and destination information. With the new expert diagnostics, the Aviatrix Controller checks if there are any obvious configuration errors in instance security group rules, VPC route table entries, TGW route table entries and VPC network ACLs. Note this tool is heuristic and cannot replace human experience and judgment. 

- **Trace Path** is a tool to discover MTU size of devices along the network path. This is useful to help understand if the network devices support Jumbo Frame sizes when you deploy Insane Mode. To use, go to Troubleshoot -> Diagnostics -> Network -> GATEWAY UTILITY. Select the Aviatrix gateway name, outgoing interface, destination IP address or host name, and click Trace Path. 

- **Packet Capture Enhancement** allows you to see the tunnel interfaces with the gateways names for easy identification. To use, go to Troubleshoot -> Diagnostics -> Network -> PACKET CAPTURE. Select a gateway, Interface, optionally select Host, Port, Duration and Packet length. Click Start to start capturing packets, click Stop to stop the packet capturing.  Click Download to download the PCAP file that can be analyzed with Wireshark tools. 

4. Security
-----------

- **Port Range Configuration on Egress FQDN** allows you to configure TCP/UDP port range for non HTTP/HTTPS ports in a single policy and simplifies the configurations. The maximum port range span is 100 per policy. Configure multiple rules to support larger port range. To configure, go to Security -> Egress Control.  


5. Operations
---------------

- **Create a VPC** has a new enhancement that allows you to specify "Aviatrix Transit VPC" as an option. This is the best practice for deploying the Next Gen Transit Network, as it creates sufficient number of subnet and route tables. To create, go to Useful Tools -> Create a VPC, select the option "Aviatrix Transit VPC".

- **AWS Transit Gateway Audit** is a new function for  AWS Transit Gateway Orchestrator that monitors and alerts any out of band changes to AWS Transit Gateway (TGW) related resource, such as route table, route entry, route propagation attribute, VPC attachment and detachment. The out of band change refers to any configuration change that is not initiated from the Aviatrix Controller. To enable, go to the Controller console, TGW Orchestrator -> Audit turn on the auditing capability for each Transit Gateway.   


- **Display and Download Audit Log** displays on the Aviatrix Controller console who and when accessed the Aviatrix Controller and what commands have been issued. To display audit log, go to Troubleshoot -> Logs -> Display Audit. To filter, type in the search panel and click Display Audit again. To download the log file, click Download Audit. Note all logs are also stored in the syslog that you can export to external log services. 

- **Splunk Integration Enhancement** allows you to customize Splunk index for inputs.conf improving  log analysis visibility. 

- **Gateway Certificate Import** allows you to import third party signed certificate into Aviatrix gateways. To import, go to Settings -> Advanced -> Security -> IMPORT CERTIFICATE WITH KEY. Select the gateway, upload the CA Certificate and click OK.  



R4.0 (11/26/2018)
=================

1. Security
-------------

- **FQDN Source Filter** enhances egress FQDN function by allowing source IP filtering on any tag and gateway. An given tag can have different source IP filtering applying to different gateways. This provides fine grained configuration control. To configure, click Edit Source on an existing tag and select a gateway to edit. For details, read `Edit Source <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#edit-source>`_.  

2. Next Gen Transit Network
-----------------------------

- **AWS TGW Orchestrator** is a feature that extends the Aviatrix Transit Network to include AWS Transit Gateway. Key benefits are policy driven network segmentation, no need for Spoke VPC gateway and out-of-box integration with Direct Connect and Internet VPN. For details, check out `Aviatrix TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

- **Insane Mode Beta** allows you to build high performance network by deploying Aviatrix hardware appliance in the datacenter. Additional benefits are bypass VGW 100 route limits and high performance encryption over Direct Connect. Contact sales@aviatrix.com to be part of the beta program and learn the use cases for `Insane Mode  <https://docs.aviatrix.com/HowTos/insane_mode.html>`_. 

3. Operations
--------------

- **AWS CloudWatch Log Integration** exports the Aviatrix Controller and gateways logs to AWS ClouddWatch Log. If you are already using AWS CloudWatch log service, enable this feature to consolidate the logs from Aviatrix Controller and gateways to the same service. For details, read `AWS CloudWatch Integration <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. 



R3.5 (10/7/2018)
=================

1. Security
------------

- **Amazon GuardDuty Integration** adds enforcement functions to Amazon GuardDuty IDS and continuous monitoring service. For example, malicious probes found by GuardDuty can be blocked at the VPC network level automatically orchestrated by Aviatrix Controller. Read `Amazon GuardDuty Integration <https://docs.aviatrix.com/HowTos/guardduty.html>`_ to learn how GuardDuty and Aviatrix integration help securing your AWS deployment. 

- **Egress FQDN multi tag support** allows you to attach multiple FQDN tags to a gateway. This function simplifies the FQDN rule management. For example, you can create a common base tag of rules for all VPCs and additional tags for specific VPCs. 

- **Integrated Egress FQDN and NAT function** simplifies deploying FQDN service. Aviatrix Controller automatically replaces the existing AWS NAT Gateway route entry in AWS route table, if there is any, with Aviatrix gateway entry to minimize downtime and simplify deployment when launching FQDN service.     

- **Egress FQDN and Stateful Firewall interoperability** allows both services to operate together. You can use base Deny All for all your IP address based rules and still use Whitelist FQDN for host name based rules at the same time. 

2. Transit Network
--------------------

- **Connected Transit** enables all Spoke VPCs to communicate with each other with encryption via the Transit GW in a Transit Network deployment. This effectively builds a full mesh encrypted Transit network without building individual tunnels between Spoke VPCs. Read `Connect Transit <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_ for how to enable this function.  

- **Advertise Transit VPC CIDR** improves flexibility of Transit Network. Now an instance in Transit VPC can communicate with either Spoke and on-prem via Transit GW. For example, you can launch an Aviatrix SSL VPN gateway in the Transit VPC. Read `Advertise Transit VPC CIDR <https://docs.aviatrix.com/HowTos/site2cloud.html#advertise-transit-vpc-network-cidr-s>`_ for more details. 

3. Operations
--------------

- **Netflow support** enables you to record and log all TCP/UDP sessions flowing through all Aviatrix gateways.This adds more visibility to your network in addition to the existing log forwarding functions for Splunk, SumoLogic, Remote Syslog, DataDog and Logstash. Read `Netflow Integration <https://docs.aviatrix.com/HowTos/netflow.html#netflow-integration>`_ for more details.   

- **Alert Bell** is a new multi purpose alerting function displayed on the Aviatrix Controller Console. For example, Aviatrix Controller periodically scans your AWS route tables and alerts you if there is any blackhole entry in your AWS route table that needs to be cleaned up as best practice. GuardDuty findings are also recorded by Alert Bell. 

- **VPC Tracker** has been expanded to include network CIDRs discovered on your Azure accounts, Site2Cloud remote CIDRs and Transit Network on-prem CIDRs. For details, check out `VPC Tracker <https://docs.aviatrix.com/HowTos/vpc_tracker.html>`_.

- **Create Azure VNet** allows you to create a fully populated Azure VNet from Aviatrix Controller console. 

- **Specify an EIP** lets you specify an unassociated EIP in your allocated EIP pool at the gateway launch time. This helps you control what EIP to use for an Aviatrix gateway. 

- **Aviatrix resource tags support** gives you the option to reduce the Aviatrix required IAM policy scope by restricting actions on these tagged resource. All resources created by the Aviatrix Controller has an identifiable AWS tag. The key value pair of the tag is `Aviatrix-Created-Resource:Do-Not-Delete-Aviatrix-Created-Resource`. Follow information in this `section <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html#use-aviatrix-tags-to-limit-resource-deleting-policy-scope>`_ to limit the aviatrix-app-policy. An example IAM policy with Aviatrix tag can be found `here. <https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix_customized_IAM_app_policy.txt>`_


R3.4 (8/5/2018)
================

1. Security
-----------

- **Egress FQDN for non HTTP/HTTPS traffic** expands the popular FQDN feature to allow you to control traffic for SFTP, SSH and any other TCP/UDP port using domain names. The new FQDN is backward compatible and auto populates the default protocol and port number (TCP/443) when you configure. For details, check out `Egress Control Filter <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

- **Egress FQDN Import and Export** allows you to download and upload the rules of a FQDN tag in a text file format. This helps you manage large set of rules of multiple tags. For example, you may upload the text file downloaded from `FQDN Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_. You may also download rules from one tag and upload to a different tag to save time from typing. For details, check out `FQDN Export <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#export>`_ and `FQDN Import <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#import>`_.

- **FQDN Azure support** is now available. The configuration is the same as for AWS. 

- **FQDN Exception Rule** provides an option to block SSL request that does not have SNI field. For example, if an application use hard coded destination IP address in its HTTPS request, disabling Exception Rule will block the request, unless the IP address is configured as a rule in the tag. 

- **Network Address Translation** is significantly expanded to support combinations of SNAT, DNAT with flexible rules to enable new use cases. For example, gateway can now do network translation to a pool of IP addresses, a customized IP addresses and session based translation. This enables gateway to perform complex and customized network address translation requirements. For an example use case, check out `this solution guide. <https://docs.aviatrix.com/Solutions/egress_nat_pool.html>`_


2. Useful Tools
----------------

- **VPC Tracker** is a tool that provides a "at a glance" view of cloud network CIDR ranges of all your cloud accounts in all regions. No gateway launch required, just add `secondary access accounts on the Controller <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_, the Controller will retrieve all information for you. The VPC Tracker is also displayed on the Controller Dashboard. You have the option to turn it off. To view all VPC CIDRs, go to "Useful Tools" at the main navigation menu, click "VPC Tracker". To learn more, read the `VPC Tracker <https://docs.aviatrix.com/HowTos/vpc_tracker.html>`_.

- **Create VPC** is a tool that creates an AWS VPC with a public subnet and private subnet in each AZ, a public route table, private route table and IGW in a specified account and region. 

3. Connectivity
----------------

- **AWS NLB Support for Aviatrix OpenVPN® gateways** allows you to display the remote users' public IP address when they are connected to the gateway. 

- **Configurable Dead Peer Detection (DPD)** provides the flexibility to work with third security appliance when building the `Site2Cloud <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ tunnels. 

- **Use Your Own DNS** allows the gateway to use the DNS server configured in the VPC DHCP options.One use case is for Aviatrix gateways to export logs to a private Splunk Server that would like to have its DNS name configured on the `Logging setup <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_. For more information, read `the guide. <https://docs.aviatrix.com/HowTos/gateway.html#use-vpc-vnet-dns-server>`_ 


4. Operation
-------------

- **Controller HA in AWS** is simplified and now supports all types of AMIs in addition to BYOL. Follow the `instructions <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ to enable HA. 

- **Deployment Scale** is improved. A Controller of t2.large instance can support 500 Aviatrix gateways.  

R3.3 (6/10/2018)
=================

1. Security
------------

- **Egress FQDN Discovery** enables you to discover what Internet sites (URLs) your Apps in a VPC visit. When enabled on an Aviatrix NAT gateway, the gateways monitors and displays all the destination FQDN names from EC2 instances in the VPC, which helps you build whitelist for FQDN filter. This is a standalone feature, meaning you can use it even for curiosity purpose. To configure `Egress FQDN Discovery <https://docs.aviatrix.com/HowTos/fqdn_discovery.html>`_, go to Security -> Egress Control. Follow Step 1 and Step 2. To turn it off, simply click Stop button. Note FQDN Discovery and FQDN Filter are mutually exclusive on a given gateway.  

- **Egress FQDN View Log** provides you with a quick way to view gateway FQDN logs when you are curious to view some immediate results. Select a gateway with FQDN enabled, click Download, a compressed log file should be downloaded. Note to log for monitoring and auditing purpose, you should consider a `Logging Integration <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_.

- **AWS Controller Security Group Management** manages the Controller instance Security Groups to only allow TCP port 443 from Aviatrix gateway EIP. To enable this feature, go to Settings -> Controller -> Security Group Management, select the primary access account that launches the Controller, click Enable. Note this feature is available for AWS Controller only deployment. If you deploy the Controller in other cloud types, this feature is not supported. For information, `read this link. <http://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_ 

2. Connectivity
----------------

- **Azure Spoke Gateway** is now supported in the Transit Network workflow. To configure, follow the Transit Network workflow `Step 4 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-spoke-gateway>`_ to launch a Spoke gateway in Azure. 

- **Multi-CIDR VPC support** is now available if your VPC has multiple CIDR ranges. 

- **Destination NAT** on a gateway allows you to change your destination IP address prior to routing. To configure, go to Gateway page, select the gateway, click Edit. Scroll down to DNAT, click Edit/Add. Enter virtual address (mapped), real address, the protocol and port range are the scope of DNAT condition. Click `here <http://docs.aviatrix.com/HowTos/gateway.html#dnat>`_ for more information.  
- **Configurable Designated Gateway CIDR Range** allows you to add additional CIDRs that are outside of RFC1918. To configure, go to Gateway page, select the gateway, click Edit. Scroll down to "Edit Designated Gateway" to add additional CIDR list separated by comma. This feature is useful if your VPC CIDRs are outside of RFC1918. Click `the link here <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>`_ for more information.

- **AWS China Support**. Both Controller and gateway can be launched in AWS China. Follow the `AWS China Controller Startup Guide <http://docs.aviatrix.com/StartUpGuides/aviatrix-china-controller-startup-guide.html>`_ to get started. 

- **Spoke CIDRs Summarization support** allows you to reduce the number of routes advertised by Aviatrix Transit GW to VGW, to overcome the VGW limit of carrying a maximum of 100 routes. Click `here <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-to-summarize-spoke-vpc-cidr-ranges>`_ for configuration details.  

3. Ease of Use
---------------

- **Modular Remote User VPN** enables you to configure or modify all VPN parameters after the VPN gateway is launched. We recommend you not to select any Advanced Option when launching a VPN gateway and configure any specific parameter at later time.  

- **Workflow for all Use Cases**. Major Aviatrix use cases now have a workflow to guide you through. 

- **Azure Companion Gateway** is no longer needed to be subscribed. The subscription step has been removed. 

4. Operations
--------------

- **In Product Chat** is now available. This is an experimental feature, it should be used for simple questions or asking to buy more Aviatrix licenses. For proper technical support, continue to use email support@aviatrix.com where tickets are managed and tracked. 

- **Source Category** is supported in Sumo Logic specification. To configure, go to Settings -> Logging -> SUMOLOGIC Logging.

- **Source Address** is added in FQDN logs. This enables you to see which EC2 instance send packets to a target hostname. 

- **Access Account Name** is now searchable. 

- **New REST APIs** are available for all features in 3.3.

- **List Spoke Gateways** allows you to easily see what are the Spoke gateways are attached to a selected Transit gateway. To view, scroll down to Step 9 at Transit Network workflow, select a Transit GW and view the attached Spoke gateways. 




R3.2 (4/18/2018)
=================

1. Security
---------------

- **Gateway Subnet Monitoring** monitors the public subnet where Aviatrix gateway is deployed and automatically stops any user instance in the subnet. This feature ensures unwanted instances are not launched on public subnets in a VPC. To configure, go to Gateway -> Edit -> Monitor Gateway Subnets.If you want to exclude certain user instances from being stopped, you can enter their instance IDs. 

2. Operations
--------------

- **SSL Certificate Import** allows to import your own key and wildcard certificate for Controller HTTPS access. To import the certificate and key, go to Settings -> Advanced -> Security -> Import Method and select "Import Certificate with Key". 

- **Disable Admin User Login** allows to disable Controller login as user "admin". To enable/disable it, go to Settings -> Controller -> Login Customization.

- **Migrate controller** allows you to migrate among different licenses including Metered, Utility and BYOL through Controller backup and restore.

3. Troubleshooting
-------------------

- **Transit Network** can detect overlapping CIDRs between learned on-prem CIDRs and advertised spoke CIDRs. Controller will display these overlapping CIDRs at Site2Cloud -> Edit page in addition to sending email alerts.

- **Gateway Replacement** allows to replace a problematic gateway but still keep its configuration. To replace the gateway, go to Troubleshoot -> Diagnostics -> Gateway Replace.

- **UCC Controller Public IP Migration** can be used after Controller's public IP is changed. To migrate, go to Troubleshoot -> Diagnostics -> Network -> Migrate.

4. REST API
------------

- 50 REST APIs have been added to the Controller. For details, refer to `API Doc <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_
 

R3.1 (3/6/2018)
===============

1. Connectivity
---------------

- **AWS Global Transit Network** is a new workflow that provides a step by step guide to setup `AWS Global Transit Network. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

- **AWS VPC Peering integration** is a 1-click operation to `configure native AWS VPC peering <http://docs.aviatrix.com/HowTos/peering.html>`_ for intra region and inter-region VPC communication. 

- **BGP dampening** `BGP dampening <http://docs.aviatrix.com/HowTos/advanced_config.html#bgp-dampening>`_ allows you suppress flapping routes.

2. Operations
--------------

- **Backup to encrypted S3 bucket** allows you to backup Controller configuration to an `encrypted S3 bucket <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_. Check out `this link <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_ to enable backup and restore feature. 

- **Modular NAT configuration** allows you to `enable or disable NAT <http://docs.aviatrix.com/HowTos/gateway.html#nat>`_ function after a gateway instance is launched. 

- **Gateway Force Upgrade** allows you to force upgrade a specific gateway. This is useful when Controller upgrade fails on some gateways. Go to Troubleshoot -> Diagnostics -> Gateway -> FORCE UPGRADE 

- **Configurable TLS version** allows you to turn off support for older versions, such as TLSv1.0 and TLSv1.1. TLSv1.2 is supported by default. To configure, go to Settings -> Advanced -> TLS VERSIONS SUPPORT

- **Dashboard Logical View** allows you to view VPCs and connection graph. Each dot represents a gateway deployed in a VPC. You can rearrange the graph by draging the dots. Make sure you click Save to save the changes.   
- **Gateway Single AZ** is an economic way to improve gateway uptime without running a standby instance. The Aviatrix Controller monitors the gateway's health and when gateway keep alive packets fail to arrive at the Controller, it stops and starts the gateway again. To configure, go to Gateway, select a gateway to Edit, then Enable or Disable Single AZ gateway HA. 

- **Security patches** for CIS-CAT and Meltdown.

- **Terraform provider** is now available for `Transit Network <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_

- **Updated Aviatrix APIs** is now organized by functions and easier to `follow. <http://docs.aviatrix.com/HowTos/Aviatrix_Controller_API.html>`_


R3.0 (12/1/2017)
================

1. Connectivity
---------------

- **BGP** Support BGP interoperability between Aviatrix gateway and AWS VGW. For use case details, check out `the Transit Network with BGP Setup Instructions. <http://docs.aviatrix.com/HowTos/bgp_transitive_instructions.html>`_.

- **IPmotion** For AWS migration and DR use case that allows on-prem VMs to migrate to AWS without changing their IP addresses. For use case and details, check out `this link. <http://docs.aviatrix.com/HowTos/ipmotion.html?highlight=ip%20motion>`_.

- **AWS ENA** on Aviatrix gateway. 


2. Security
-----------

- **Tag your security policy** to associate a CIDR with a name tag for a scalable and user friendly. For configuration detail, check `this link. <http://docs.aviatrix.com/HowTos/tag_firewall.html?highlight=tag>`_

- **AES-GCM crypto algorithm**. For IPSEC tunnel connectivity between two Aviatrix gateways, such as Aviatrix peering and IPmotion, the crypto algorithm has been upgraded to AES-GCM.


3. Controller
--------------

- **Audit** user actions on the Controller. All commands from web console or REST API are now logged to syslog and can be forwarded to integrated log services.

- **Name your controller** for ease of use. Click "Your controller name goes here" on the Controller console and start typing a new name. Hit return to save the name. 

- **On demand backup** of the Controller configuration to cloud storage. To configure, go to Settings -> Maintenance -> Backup & Restore -> Backup Now 

- **Backup multiple copies** of Controller configuration file. You can choose to backup multiple copies of configuration file. To do so, go to Settings -> Maintenance -> Backup & Restore and select Multiple Backup. Up to 3 backup files are stored. You can select any one of them to restore. 

- **Migrate licenses** from AWS Marketplace Utility image to BYOL. For details, check out `this link. <http://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_


4. Modular Configuration
-------------------------

- **Transitive Peering** supports multiple subnets being configured at the same time. Multiple subnets separated by comma can be added once when configuring transitive peering.

- Join Function now support the ability to delete all subnets at once in Join Function gateway.

5. Troubleshooting
-------------------

- **FlightPath tool**, an AWS EC2 to EC2 connectivity troubleshooting tool. In the first release, EC2 related resources, such as security groups, route table and Network ACLs are displayed side by side for easy visualization and troubleshooting. 

7. Datacenter Extension Features
---------------------------------

- **non-RFC1918** on premise network range is now supported. To add, first launch a Datacenter Extension gateway, go to Gateway List, select the gateway and click Edit. At Edit Extended Public CIDR, add one or multiple non-RFC1918 CIDR blocks separated by comma. For example, 100.64.0.0/24,100.64.1.0/24

- **Repair gateway** to replace a gateway in a limbo state. At the Datacenter Extension page, click Replace of specific gateway. 

R2.7
==========

1. Controller 
-------------------

- Console Responsiveness improvements. Significant improvements in page responsiveness when using controller web console. 

- Support third party signed certificate. You now can import a third party signed certificate to the controller. This should remove the "Not Secure" sign displayed by the browser. To configure, go to Settings -> Advanced -> Certificate -> CERTIFICATE IMPORT. First Enable Certificate Checking. The console will ask you to enter a domain name and generate a CSR file (Certificate Signing Request). Send this CSR to get singed, then import both CA and server certificate. Note if intermediate certificate is one of the return files, use the intermediate certificate file for CA import. 


2. Connectivity
-------------------

- Support Site2Cloud tunnel on TCP. In addition to run IPSEC tunnel on UDP protocol, you can now run on TCP 443. This option removes the requirements of having to open site firewall ports on UDP 4500/500. To configure, go to Site2Cloud -> Add New. Select TCP for Tunnel Type selection. 

3. Scalability
---------------

- Support load balancing UDP based OpenVPN® gateways. If your OpenVPN® users experience slow terminal response or long file transfer time, use UDP based VPN gateway can help. This release allows you to create multiple UDP based VPN gateways and load balance them in a round robin fashion by leveraging AWS Route53. To configure, go to OpenVPN® -> Advanced -> UDP Loadbalancer. Note with UDP protocol UDP port 1194 is used. When using from on-prem, firewall port UDP 1194 must be open. 

- Support Designated Gateway. If you are planning to have a large set of tunnels going through a gateway or are hitting AWS route entry limit, this feature is for you. If "Designated Gateway" option is selected at the gateway launch time, the Controller programs 3 route entries based on RFC1918 for the gateway. Controller will not program additional route entries when configure a VPN tunnel that end on the Designated Gateway. Note if you currently do not have a Designated Gateway and you are hitting route entry limit, launch a new gateway with Designated Gateway enabled and configure future tunnels from the Designated Gateway. Note there can only be one Designated Gateway per VPC. Designated Gateway only supports Gateway HA.  

4. Modular Configuration
--------------------------

- Allocate New EIP. When this option is selected at new gateway launch time, Controller always allocates a new EIP from AWS and associated it with the gateway. If this option is unchecked, Controller will first look at the EIP pool that belong to the account: if there is allocated but unassociated EIP, Controller will allocate EIP from this pool and associate it with the gateway, otherwise it will select one EIP from the pool and associate it with the gateway. 

- Support resizing active Gateway without deleting its peering tunnel. You can resize an active gateway when there peering HA configured. The workflow should be: 1) Settings -> Gateways -> select the gateway, select Edit. 2) Select it desired gateway instance size, click Change. As the result of this function, the gateway will be stopped and tunnel switch to backup tunnel. 3) Go to Settings -> Peering, select the peer and click Force Switchover.  

- Support resizing UDP based OpenVPN® gateway instance. 

5. NEW REST APIs
------------------

- Set VPC Access Base Policy.
- Update VPC Access Policy.
- Enable Packet Logging.



R2.6
===================

Connectivity
-------------

- Run encrypted tunnel on TCP port 443. Aviatrix Virtual Appliance CloudN now offers a TCP based secure tunnel connectivity. With this new capability, you do not need to open outbound UDP port 500 and 4500. The encrypted tunnel runs on TCP 443. To configure, go to Datacenter Extension, select TCP for the field Tunnel Type. UDP based encrypted tunnel is still supported. 

- Reserve on-prem segment for Datacenter Extension feature of CloudN. After deciding how many VPCs you wish to configure during on boarding, you can sub divide the segments to reserve some for on prem VM deployment. This allows you launch applications where some part of it (such as database) is on-prem and others parts of it (such as web front end) to be in VPC.  

- Google IDP support. Google IDP is now supported IDP for the Aviatrix SAML VPN solution. 

Security
---------

- FQDN blacklist. In addition to FQDN whitelist, FQDN whitelist is added as a base configuration for each FQDN tag. To configure, go to Advanced Config -> FQDN Filter. After you create a new tag, you can select either White List or Black List. With Black List, the URLs on the Black List will be rejected. 

REST API
---------

- New APIs are published. list active VPN users, edit Open VPN configuration, backup and restore, list vpc peers, list image. For API details, click `this link. <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`_ for details.

User Interface
--------------

- re-organize menu items on Settings. Under Settings -> Maintenance are Upgrade, Backup & Restore and Security Patches. Under Settings -> Controller are System Time, License information, Email settings and controller access method authentication LDAP or DUO configuration.oUnder Settings -> Advanced are tunnel timeout and keepalive configuration, password change and certificate management.  

- Make a wish. Customers can now send feedback on UI pages regarding features, usability and make a wish on new requirements and enhancements.   


R2.5
=============================

1. Security improvements
-------------------------

-  Provide security patch to upgrade OpenVPN® server to v2.4.3. To apply
   the patch, go to Settings->Patches and select OpenVPN® 2.4.3

-  New Aviatrix VPN client (v1.3.9) for user VPN (Mac, PC and Unix). To
   download, go to `this link. <http://docs.aviatrix.com/Downloads/samlclient.html>`__

-  Hardened password management for “forgot password”.

-  Additional ciphers for site to cloud tunnels for interoperability. To
   configure, go to Site2Cloud -> “Add New” -> Algorithms.

2. Public cloud specific features
----------------------------------

-  AWS China [available in the UCC version only] ·

-  Restful API support for AWS China. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

-  Aviatrix cluster peering over AWS peering. To enable it, go to
   Peering -> “Cluster Encrypted Peering” -> “New Peering” and select
   “Over AWS Peering”.

-  Aviatrix backup/restore in Google Cloud. To configure back/restore,
   go to Settings -> “Backup & Restore”.

-  Python script for Google Cloud Controller HA monitoring and
   restarting. `Follow <https://github.com/AviatrixSystems/Controller-HA-for-GCP>`__

3. Usability enhancements
--------------------------

-  Multiple enhancements on User Interface.

-  Aviatrix product Doc site is now available at http://docs.aviatrix.com

-  New browser support: IE 11

4. Administration automation
-----------------------------

-  Cloud-init script to accept input parameters to launch Aviatrix
   Controller on premises.

-  Automated Aviatrix Controller deployment in AWS using `Cloudformation:
   <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__

-  GW Resizing API “edit\_gw\_config”.

-  Support proxy setting modification through “Advanced Config” ->
   “Proxy Settings”.

-  Frictionless install UX [Register Aviatrix on premises Gateway with
   UCC Controller at the time of install to auto-fetch initial
   configuration; available for AWS at this time].

5. Configurable Aviatrix Gateway Failover/HA time
--------------------------------------------------

-  Support configurable health check frequency between Aviatrix
   Controller and Gateways for customers to meet their HA failover time
   constraint. To change the health check frequency, go to Settings ->
   Keepalive. Select “slow” only when your network is unstable and
   gateways send too many status alerts.

6. Logs and troubleshooting
----------------------------

-  Aviatrix for Splunk has been published on Splunkbase. To download,
   click `this link <https://splunkbase.splunk.com/app/3585/>`__. For
   instructions on how to use the app, click `this
   link <https://github.com/AviatrixSystems/SplunkforAviatrix>`__. ·

-  Aviatrix for SumoLogic application is available. To download, click
   `this
   link <https://github.com/AviatrixSystems/SumoLogicforAviatrix>`__.

-  Rsyslog over UDP for customers needing UDP based rsyslog. To
   configure, go to Settings -> Loggings -> “Remote Syslog” and select
   UDP for “Protocol”

-  Configurable gateway debug level. To adjust the debug level, go to
   Troubleshot -> Diagnostics -> “Gateway Debug Level” and select the
   appropriate debug level for your gateway

7. New Aviatrix OVF for VMWare
-------------------------------

-  Visit download.aviatrix.com

UserConnect-031717
==================

Security
--------

-  First release to white list public Fully Qualified Domain Names (FQDN
   filtering) for egress HTTP and HTTPS traffic to Internet initiated by
   instances on private subnets in a VPC. The FQDNs can be specified
   with regex wild card, such as \*.example.com. A tag is defined as a
   list of FQDNs and one or more gateways is attached to a tag. Any
   updates to a tag automatically triggers updates to all gateways
   attached to the tag. Multiple tags can be defined on the controller.
   This feature works together with Gateway Security Policy feature
   where private network, IP address, protocol and ports can be
   filtered.

   To configure, go to "Advanced Config" -> "FQDN Filter". The workflow
   is 1) create a tag, 2) Click Enable to enable the tag, 3) Edit the
   tag by adding FQDN hostname part of URLs (e.g.
   `www.aviatrix.com <http://www.aviatrix.com>`__, or \*.google.com),
   and 4) Attach Gateway. One or more gateways can be attached to a tag.
   Step 1), 3) and 4) can be done first and then Enable the tag. Once
   the tag is enabled, HTTP and HTTPS traffic to these FQDN will be
   allowed, and any destination outside the FQDN will be denied.

   Note the gateway with FQDN must have NAT enabled for Internet egress
   traffic.

   Caveat: in this release FQDN filter is not failover capable when
   peering HA is configured.

Monitor and Troubleshooting
---------------------------

-  During UCC gateway launch, Controller now reports in text the
   progress of gateway creation in addition to the progress bar view.

-  “Dry Run” for system upgrade. Dry Run performs health checks for the
   Controller and gateways to detect potential upgrade failure without
   executing the command. Go to Settings -> Upgrade. Optionally, click
   Dry Run. If it is successful, you may click Upgrade.

-  Dashboard now displays a summary packet statistics per gateway. Click
   on a specific gateway, top 10 packet statistics of the gateway are
   also displayed.

-  Support test network connectivity. This is useful to troubleshoot any
   firewall or security policy that blocks connectivity from the
   controller or gateway. To test, go to Troubleshoot -> Diagnostics ->
   "Network Connectivity Utility". Select either Controller or one
   gateway and test if it can reach a specific port of a remote host.

-  Capability has been added to log tunnel status change notification to
   syslog (in addition to an email notification with the same content).

-  Enhancement has been made for tunnel status alert mechanism by
   allowing users to configure tunnel down detection time. To change the
   detection time, go to Settings -> Tunnels. The default detection time
   is 60 seconds.

-  Capability has been added to check the VPC settings of a specific
   gateway. VPC settings include security groups, route tables, subnets,
   Network ACLs, DHCP options. To configure, go to Troubleshoot -> VPC
   Diagnostics

-  Splunk forwarder has been upgraded from version 6.2 to version 6.4.

Connectivity and High Availability
----------------------------------

-  Support multiple independent UDP based VPN gateways (without ELB)
   within the same VPC. These VPN gateways can have different
   attributes. For example, one gateway has split tunnel configured
   while the other one has full tunnel configured.

-  Support API credential change on controller console for Azure ARM
   accounts when the credential becomes out of sync with the credential
   on cloud provider console. For example, the account credentials are
   changed by the cloud provider or user herself.

-  HA support has been added to Service Chaining with AWS gateways in
   different zones.

-  Support IAM role-based controller and cloud account for AWS GovCloud.
   The Controller must be in GovCloud to create GovCloud gateways with
   IAM role-based accounts.

-  Site2Cloud HA support has been added with CloudN as the on-prem
   device. To configure it, launch two gateways in the same VPC/VNet
   with UCC Controller. Then go to Site2Cloud page to create a new
   connection. Check "Enable HA" and select "Aviatrix" from "Remote
   Gateway Type" list. After creating the site2cloud connection, select
   this connection and download configuration with "Aviatrix" as
   "Vendor". Import the same configuration file at CloudN's Site2Cloud
   page.

Controller Administration
-------------------------

-  Function has been added to notify admin via admin email when a new
   release becomes available.

-  Support has been added to enforce password complexity of account
   users. To enable it, go to Settings -> Security -> "Password
   Management".

-  Support read only (operator) role for Controller management. The read
   only account has dashboard view, status view and list view, but
   cannot make modification to any configuration. To create a read only
   user, go to Accounts -> Account Users -> "New User". Select
   "read\_only" from the dropdown list of "Account Name".

-  CloudN's console password can be changed from the default
   "Aviatrix123#". To do so, type "enable" to enter config mode and then
   issue "change\_console\_password" command.

-  Capability has been added for HTTPS certificate check for control
   traffic between Controller and gateways. To turn on this function, go
   to Settings -> Security -> "Certificate Checking".

-  The following APIs have been added. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  list\_vpcs\_summary

   -  peer\_ha\_switch\_over

   -  upload\_cloudx\_command\_log

   -  upgrade

UserConnect-013017
==================

-  First release of Service Chaining. Service Chaining capability allows
   multiple instance based functions to work in tandem to control
   traffic flow path within an AWS VPC. For example, a firewall instance
   can be service chained with Aviatrix gateway so that EC2 initiated
   traffic will first be sent to firewall for inspection before
   forwarding it to Aviatrix gateway for peering to another VPC. To
   enable the function, go to "Advanced Config" -> "Service Chaining" to
   select the route table and enter "Downstream IP". Aviatrix gateway
   will only modify the selected route table to specify which outgoing
   traffic needs to go through itself and also route the incoming
   traffic to the "Downstream IP" address. Normally, the selected route
   table is associated with the subnet of your firewall's WAN (or
   untrusted) interface. The "Downstream IP" should be the IP address of
   your firewall's WAN interface. For details, check out
   `this <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Aviatrix+Service+Chaining+Reference+Design.pdf>`__
   reference design.

-  Within AWS, support has been added to allow deployment of the UCC
   Controller in VPC's private subnet. To enable this, during the
   Controller's initial setup, when prompted for "If this controller is
   being launched on a private subnet, check the box below, otherwise,
   leave it blank", select "private subnet" and then click the "save"
   button. Please note that when the Controller is deployed in private
   subnet it can only create gateways in private subnets. We assume
   these private subnets in various VPCs can reach each other through
   AWS peering.

-  For AWS, account diagnostics have been added. To run these
   diagnostics, go to Troubleshoot -> Diagnostics -> "Account
   Diagnostics". This diagnostics command will validate the AWS account
   credentials and check the status of associated gateways and SQS
   queues.

-  There is now support for adding multiple CIDRs separated by commas in
   "Advanced Config"->"Join Function" -> "Allow Subnet" at CloudN.

-  Tunnel HA for Azure ARM gateways can now be created through "Advanced
   Config"->"Join Function". To enable tunnel HA, select a particular
   gateway on the "Gateway" page and then go to "Gateway for High
   Availability Tunnel/Peering" to create a backup gateway.

-  Support has been added to allow the creation of two VPN gateways
   (without ELB) in the same VPC, one with SAML enabled and the other
   one with only certification authentication enabled (no MFA method
   supported on the 2\ :sup:`nd` gateway).

-  The Dashboard now displays the IPSec tunnels created by site2cloud
   connection.

-  Support has been added for enabling NAT on CloudN Controller itself.
   To enable this, go to Troubleshoot -> Diagnostics -> "NAT
   Configuration".

-  With this release, both the actual public IP address of the
   Controller and the stored public IP address if it is different from
   the actual public IP are displayed. To view these public IP
   addresses, go to Troubleshoot -> Diagnostics -> "Controller Public
   IP".

-  Proxy server support has been added on the UCC Controller for initial
   download and ongoing communication. During the Controller's initial
   setup, when prompted for "If the controller accesses the Internet
   through a proxy server, provide the following information, otherwise
   leave the fields blank", enter the server URLs for "HTTP Proxy" and
   "HTTPS Proxy". If the proxy server issues a self-signed certificate,
   upload a CA certificate.

-  The ability to setup proxy server setting for Internet connectivity
   in CloudN OVA has been added. To configure proxy server support, use
   "–setup\_network\_only {true\|false}" for clish command
   setup\_interface\_address and setup\_interface\_static\_address. Use
   clish command "setup\_network\_options {test\|save\|cancel}" to
   test/save/remove http/https proxy setting. Currently, "Datacenter
   Extension" and "Join Function" are not supported when proxy server is
   enabled.

-  Traceroute support has been added on gateways. To run "Trace Route",
   go to Troubleshoot -> Logs -> "Traceroute Utility".

-  For site2cloud, users can now select the route tables to be modified
   when "Encryption over ExpressRoute/DirectConnect" is enabled. Only
   subnets associated with the selected route tables will have tunnel
   connections to on-prem. To select route tables, go to Site2Cloud ->
   "Add New" and enable "Encryption over ExpressRoute/DirectConnect".
   Available route tables will show up in the "Route Tables to Modify"
   field.

-  The following APIs have been updated. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  Added: update\_profile\_policy & add\_admin\_email\_addr

   -  Deprecated: add\_profile\_policy & del\_profile\_policy

   -  Changed: connect\_container & add\_vpn\_user

-  In the Aviatrix VPN client 1.2.49 release, Linux version AVPN client
   is now in the supported list. Linux version is only supported on
   Ubuntu.

UserConnect-121516
==================

-  Add support for three additional AWS regions: Ohio (us-east-2),
   Canada (ca-central-1) and London (eu-west-2).

-  Enable load balancer support for Azure ARM VPN gateway creation.

-  Add packet capture support for both Controller (CloudN only) and
   gateways. To run "Packet Capture", go to Troubleshoot -> Diagnostics.
   Select "Local" from "Gateway" list to capture packets on CloudN.
   Select a gateway name from "Gateway" list to capture packets on the
   particular gateway. The packet capture files are in .pcap format and
   can be downloaded for analysis.

-  Add traceroute support on Controller (CloudN only). To run "Trace
   Route", go to Troubleshoot -> Logs.

-  Extend the Peering HA support initiated at 102416 release from AWS to
   GCloud and Azure ARM. To enable this feature, go to Gateway ->
   "Gateway for High Availability Peering" to create the backup gateway
   first and then go to Peering -> "Encrypted Peering" to create the
   peering with "Enable HA" selected.

-  Add diagnostics tools for IPSec tunnels created through CloudN "Join
   Function". Go to "Advanced Config" -> "Join Function". Select the
   IPSec tunnel to run diagnostics on it. The following options are
   available: debug, ping, measure latency, restart services and check
   peering status.

-  Allow to add VPN users to each individual gateway (with ELB disabled)
   instead of the whole VPC. Select the gateway name from "LB/Gateway
   Name" list at OpenVPN® -> "VPN Users" -> "Add New" to add VPN users to
   that gateway.

-  Support migrating the same CloudN from one public IP address to
   another address. Go to Troubleshoot -> Diagnostics -> Migrate to
   migrate CloudN from its old public IP address to a new one.

-  Support Controller migration from the old CloudN to a new CloudN. Go
   to Settings -> "Backup & Restore" to run backup at the old CloudN.
   Launch a new CloudN with a different public IP. Go to Settings ->
   "Backup & Restore" to run restore at the new CloudN. The migration
   function will automatically update the new CloudN with its own public
   IP.

-  Support LDAP for Controller login. To enable it, go to Settings ->
   "Setup LDAP Login" to enable LDAP login first. Then add users at
   Accounts -> "Account Users" with local passwords. These account users
   should exist at LDAP server also. With LDAP login enabled, these
   users can log into Controller with their LDAP passwords. If LDAP
   login disabled, these users can log into Controller with their local
   passwords.

-  Allow credential change for AWS and GCloud accounts when the account
   credentials are changed by the cloud provider.

-  Support Okta along with "Client Certificate Sharing" when creating
   VPN gateways. Select "Okta" from "Two-step Authentication" list and
   select "Yes" for "Enable Client Certificate Sharing" when launching a
   new gateway. In previous releases, "Client Certificate Sharing" can't
   be enabled when Okta is used.

-  Allow users to customize the email notification (both email content
   and attachment file name) for VPN client. To configure it, go to
   OpenVPN® -> Configuration -> "User Defined Email Notification" to edit
   the file name or email content. The new email format will be used
   when a VPN certificate is issued.

-  Add support for the following new APIs. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

   -  test\_ldap\_bind

   -  get\_gateway\_supported\_size

   -  get\_supported\_region

   -  list\_peer\_vpc\_pairs

   -  peer\_vpc\_pair

   -  unpeer\_vpc\_pair

-  Aviatrix VPN client 1.1.32 release

UserConnect-112816
==================

-  Added search capability to the Gateway list page. You can now search
   for gateways by any of the gateway attributes, such as Name, gateway
   instance size, account name, etc.

-  Added search capability to active VPN users list on dashboard. You
   can now search for active VPN users by all attributes, such as Name,
   Profile, Landing Gateway, etc.

-  CloudN "Join" function HA support. Join capability allows you to
   connect to an existing VPC with an IPSec tunnel. To enable HA, go to
   the Gateway page, click the gateway, and enable HA.

-  Remote Syslog enhancement. Enable remote syslog to optionally not be
   encrypted. To configure, go to Settings -> Loggings -> REMOTE SYSLOG,
   simply ignore the "cert" option.

-  Aviatrix SAML VPN client preview for GCloud. The new Aviatrix SAML
   client provides a seamless user experience when authenticating a VPN
   user through a SAML IDP. For customers who use SAML based Single Sign
   On (SSO) for a unified user authentication and access control to
   their applications, this new capability allows them to treat the
   Aviatrix VPN solution as another application that authenticates VPN
   users by an already established mechanism. This preview release has
   been tested on GCloud. Forgerock is the primarily tested IDP and Okta
   has been partially verified. The supported platforms for the Aviatrix
   SAML VPM clients are Mac OSX, Windows 10, and Windows 7.

UserConnect-102416
==================

-  Scale out encrypted peering support for AWS. You can create a cluster
   in a VPC that consists of up to 7 gateways, peering between two
   clusters in two VPCs increases packet throughput. To enable cluster
   encrypted peering, click Cluster Encrypted Peering under Peering tab.
   Preliminary iperf performance test shows TCP packet throughput can
   reach up to 8.5Gbps with bi-directional traffic. For more
   information, check out `Cluster Peering Reference
   Design <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

-  Controller HA support. Create a standby controller in any region and
   any cloud (AWS, Azure ARM and GCloud). When the primary controller
   goes down, the standby controller takes over and becomes operational.
   To enable the feature, click Settings -> Controller HA -> Enable.
   Input the standby controller's public IP address. You also need to
   input standby controller's admin username and password for
   authentication purpose.

-  Enhanced peering HA support. The new peering HA feature reduces
   failover to a backup peering to under 2 seconds. To enable the
   feature, click Peering -> Encrypted Peering and enable HA. Note the
   current gateway HA support will be phased out in the future.

-  Transitive peering support for Azure ARM, Azure classic, GCloud and
   Azure China. Built on the earlier release of transitive peering
   support for AWS, this feature is now covered by all cloud types. This
   feature enables you to deploy a hub and spoke architecture of
   multiple VPCs in a simple point and click manner. To enable
   transitive peering, click Peer -> Transitive Peering.

-  Peering Diagnostics support. Troubleshooting peering tunnel status is
   made easy. Click Diag of the specific peer. Options are debug, test
   latency, ping and restart the tunnel.

-  Display the public IP address of the controller. This feature is
   useful for CloudN64 virtual appliance where its public IP address is
   needed for configuring Site2Cloud capability. To view the
   controller's public IP address, click Troubleshoot -> Diagnostics ->
   CONTROLLER PUBLIC IP.

-  Support all Azure ARM regions.

-  Support interoperability of Aviatrix gateway Site2Cloud to AWS VGW
   and Azure VPN Gateway. When configuring Site2Cloud, you can select
   the specific cloud provider VPN gateways to ensure encrypted tunnel
   work correctly.

-  Add REST API for CloudN64 Join features: allow subnet to VPC and
   delete subnet to VPC. For the complete APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

UserConnect-101016
==================

-  Add Mumbai (ap-south-1) to AWS region support list.

-  Support multiple Splunk indexers by importing Splunk config file.
   This enables Aviatrix controller and gateway logs to be integrated
   with multiple Splunk servers that many enterprises deploy. To
   configure, go to Settings -> Loggings -> Splunk. Select Import files
   to import a Splunk configuration file. You may also choose Manual
   Input, in this case each indexer must be listening on the same port.

-  Support DataDog agent for both controller and gateways. To enable, go
   to Settings -> Loggings -> DataDog, provide an API Key.

-  Enhancement for VPN user profile editing: when adding a user to a
   specific profile, only display those who do not belong to the
   profile. When deleting a user to a specific profile, only displays
   users who belong to the profile.

-  Support tooltip for many labels. Move mouse over a label, a detailed
   explanation displays for the label.

UserConnect-092216
==================

-  Support encryption over AWS peering. This capability allows two same
   region VPCs to send encrypted traffic to each other without going
   over Internet by leveraging AWS peering as underlying infrastructure.
   This mechanism significantly reduces data transfer cost. To use this
   feature, customer must configure AWS peering from AWS console between
   the two VPCs in the same region. To enable this feature, go to
   Peering -> Encrypted Peering -> New Peering. Check "Over AWS
   Peering". One use case for this feature is to enable NetApp OnTAP
   software to run in HA mode.

-  Support Azure ARM North Europe region.

-  Support Skyhook for Docker 1.12 release.

UserConnect-090416
==================

-  Support site2cloud use case where the gateway imports a template
   configuration file from a different Aviatrix gateway that initiates
   the configuration. This capability is useful to build IPSEC tunnels
   between two enterprises where each has its own Aviatrix UCC
   controller.

-  Support using Aviatrix CloudN as customer device for site2cloud
   connection. Follow these steps: 1) use UCC Controller to create a
   site2cloud connection by entering CloudN's public IP and subnet CIDRs
   for customer on-prem network. 2) On UCC Controller, select Aviatrix
   as vendor choice to download this site2cloud configuration file. 3)
   go to CloudN's site2cloud page and import the downloaded
   configuration file to establish the site2cloud connection.

-  Allow users to provide an optional IPSec pre-shared key when creating
   site2cloud connections. When the filled is left empty, UCC controller
   will automatically generate a pre-shared key.

-  Support HA for GCloud gateways with a zone selection option.

-  Update REST API to accommodate GUI 2.0 development

UserConnect-082116
==================

-  Support on GUI 2.0:

   -  Settings -> Change Password

   -  Settings -> Email

   -  Settings -> System Time

   -  OpenVPN® -> Profiles -> Edit -> Add New. Users can select subnets
      from VPCs/VNets without typing these CIDRs manually.

   -  Gateway -> Click "+" next to the gateway name. Users can display
      all VMs inside the gateway's VPC/VNet

-  VPN User list displays user email and associated profile information.

-  Allow users to setup VPN user license threshold notification. When
   license usage exceeds the threshold, email notification will be sent
   out to admin's account.

-  Azure Aviatrix gateway image is available at marketplace. There is no
   need to download gateway image to your storage account before
   launching a gateway. Instead, users need to subscribe to the Aviatrix
   Companion Gateway in Azure marketplace. This new capability
   significantly reduces Azure gateway deployment time. The Aviatrix
   Companion Gateway is free of charge. Please refer to startup guide
   for details.

UserConnect-072216
==================

-  GUI 2.0 becomes production. To access GUI 2.0, go to
   `https://controller\_ip/ <https://controller_ip/preview/>`__. Note:
   Old GUI is still available at https://controller_ip/v1/. All the new
   features developed in this release are only available for GUi 2.0.

-  **(Known issue: After upgrading to UserConnect-072216, the browser
   does not log out properly. You must type in https://controller_ip to
   re-login)**

-  Allow users to specify their own ELB names when creating AWS/GCloud
   VPN gateways. If no ELB name specified by users, Controller will
   provide a default ELB name.

-  Support AWS IAM role. When AWS IAM role is used, there is no need to
   enter AWS access key and secret key when creating a cloud account at
   Controller. Instead, two IAM roles will be created. Controller will
   use the role-based temporary security credentials to request access
   to AWS resources. Cloud account created by IAM role helps to reduce
   the risk of compromising AWS credentials. Please refer to `Aviatrix
   IAM role Configuration
   Guide <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`__
   for details.

-  Support AWS Geo VPN to include other cloud type's ELB DNS name. To
   configure, go to OpenVPN® -> Configuration to enable AWS Geo VPN
   first. Then you can add ELB DNS names from other cloud types to Geo
   VPN. With this capability, VPN gateway in Azure and GCloud can be
   included as part of Geo VPN solution.

-  Support gateway resizing without a need to terminate the old gateway
   and create a new one. This feature is available for AWS, Azure
   Classic, Azure ARM and GCloud but only on gateways without ELBs. To
   configure, go to Gateway, select the target gateway and desired size
   from "Gateway Size" dropdown list", click Change button.

-  Support an option to select subnet/availability zone when enabling HA
   for AWS. To configure, go to Gateway, select the target gateway and
   the desired subnet from "Backup Gateway Subnet" dropdown list, click
   "Enable HA" button.

-  Support an option to select ELB name when editing VPN gateway
   configuration. This feature is useful for GCloud network, which may
   have multiple ELBs, each in a different subnet. To configure, go to
   Advanced Config -> Edit Config and select the ELB from "LB Name"
   dropdown list.

-  Support to map multiple real CIDRs to multiple virtual CIDRs for
   site2cloud connection "mapped" connection. The multiple CIDRs need to
   be separated by a comma. The numbers and masks of the real CIDRs and
   corresponding virtual CIDRs must match each other.

-  A new Aviatrix IAM custom policy is provided with more restrictive
   rules and some additional rules to support role-based IAM.

UserConnect-063016
==================

-  GUI 2.0 for preview. To access GUI 2.0, go to
   https://controller_ip/preview/. Note: Old GUI is still available at
   https://controller_ip. GUI 2.0 doesn't support all the features
   available at the old GUI at this time.

-  Note: GUI 2.0 requires the controller to run on a instance with at
   least 4GB of memory. If your current controller does not meet this
   requirement, follow the procedure below:

   -  AWS controller: stop the controller instance, change instance type
      to t2.medium or larger, start the controller instance again.

   -  Azure Classic and Azure ARM controller: you can change the
      instance dynamically to at least D2 without stopping the instance
      first.

   -  Google Controller: stop the controller instance, change instance
      type to n1-standard-2, start the controller instance again.

-  Support site2cloud connection between customer network and cloud
   network where the two sides may have overlapping CIDRs. Only GUI 2.0
   support this feature. To configure, select "Mapped" for "Connection
   Type" and assign different virtual subnets to both customer network
   and cloud network.

-  GUI 2.0 dashboard displays IPSec tunnel status and link latency of an
   encrypted peering. When IPSec tunnel status of an encrypted peering
   flips between up and down, an email notification will be sent to the
   admin.

-  GUI 2.0 displays all VPN users added to the controller without
   selecting VPC ID/VNet name first. VPN users are sorted alphabetically
   for easy search.

UserConnect-052616
==================

-  Project Skyhook release: Docker swarm cluster container access
   support. From your desktop, you now can access Docker containers in a
   multi-host Docker swarm cluster built on a VXLAN overlay network that
   may span AWS, Azure and Google. To enable this feature, go to
   VPC/VNet -> VPN Access -> Skyhook: Docker Container Access. This
   feature is available on VPN gateways created after upgrade to this
   release. (If you have enabled ELB, delete the existing gateways and
   create new one. VPN user database are not affected.) For reference
   design on how to use this feature to access Docker containers, check
   out `this
   link <http://docs.aviatrix.com/HowTos/ContainerAccess.html>`__.
   Key benefits: a) MFA and user profile based access control apply to
   containers in the same manner as for instances. b) use the familiar
   tools such as curl, vim and wget on container without resorting to
   "docker exec" type of commands.

UserConnect-050316
==================

-  Enhance stability, manageability and debug ability for gateway launch
   and encrypted peering functions.

-  Support one load balancer in each different subnet of the same GCloud
   network.

-  Kernel 3.13.0-74 support on new gateway launches.

UserConnect-040316
==================

-  When VPN gateways are behind ELB, allow to import a new CRL URL
   without recreating VPN users/profiles or reissuing VPN certificates.
   To configure, delete all the VPN gateways first and then go to
   VPC/VNet -> VPN Access -> Certificate Management -> Import
   Certificates. Make sure that "CA Certificate", "Server Certificate"
   and "Server Private Key" are the same as before. The new CRL URL can
   be entered in "CRL Distribution Point URI" field. After finishing
   certificate management, recreate the VPN gateways behind ELB.

-  Enhance "Encrypted Peering" by verifying IPSec tunnel connection
   state after creating the peering.

-  Provide "Test HA" function for verifying VPC high availability. To
   test it, go to VPC/VNet -> VPC HA to enable HA for your gateway first
   and then click "Test HA" button to test HA function.

-  Enhance gateway creation by only listing the cloud types enabled in
   cloud accounts.

-  Allow to modify site2cloud connection and configuration template by
   editing “Cloud Networks” or “Customer Networks” CIDRs. To use this
   feature, go to VPC/VNet -> Site2Cloud -> List -> Edit. If changes
   need to be made for subnets/address spaces in VPC/VNet, select “Cloud
   Networks” to enter all VPC/VNet CIDRs. If changes need to be made for
   subnets in on-prem network, select “Customer Networks” to enter all
   on-prem CIDRs. This feature minimizes the configuration changes on
   customer sites by not having to delete the existing site2cloud
   connection.

UserConnect-032516
==================

First release for Azure ARM cloud support. If you currently have
deployments in Azure Classic, we recommend you skip this release. Azure
ARM is the new Azure portal that is significantly different in how API
works comparing with Azure Classic.

-  Support launching gateways in Microsoft Azure Resource Manager (ARM)
   VNet. Follow the embedded Aviatrix’s instructions to collect
   Application Endpoint, Application Client ID and Application Client
   Secret before creating a cloud account. The main feature supported by
   ARM in this release is Site2Cloud. Peering with ARM VNet is not
   supported in this release.

-  Site2Cloud supports to generate a configuration template for generic
   customer gateway devices.

-  Support security patches for both controller and gateways. To apply
   the software patch, go to Setting -> System -> Security Patches. The
   patch available for this release is glibc Vulnerability.

UserConnect-031016
==================

-  Support launching gateways in Microsoft Azure China. Azure China
   account is required to launch the gateways in Azure China.

-  Support launching gateways in Amazon AWS GovCloud. AWS GovCloud
   account is required to launch the gateways in AWS GovCloud.

-  Support Site2Cloud null encryption. This feature allows you to create
   an IPSec tunnel without encrypting the packets. To configure, go to
   VPC/VNet -> Site2Cloud -> Add and then select “Null Encryption”.

UserConnect-021516
==================

This release consists of a few significant features: GCloud Support,
Modular Split Tunnel Configuration, Site to Cloud, Encryption for Azure
ExpressRoute, Transitive Peering and VNet route diagnostics, as
described below:

-  Support Google Cloud (GCloud). The following major functions are
   available on GCloud for this release:

   -  Launch an Aviatrix Controller from GCloud directly. Follow `the
      instructions <http://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`__
      to do so.

   -  From AWS/Azure/GCloud controller, you can now launch a gateway in
      GCloud.

   -  GCloud account creation, editing and deletion

   -  Multiple GCloud projects support

   -  GCloud gateway (with or without ELB, with or without VPN access)
      creation and deletion

   -  Gateway encrypted peering to other projects in GCloud and with AWS
      VPC and Azure VNets.

   -  Security policies at GCloud network level.

   -  Edit configuration (LDAP, DHCP, and Split Tunnel) on existing
      gateway

-  Support the ability to edit the split tunnel mode on existing VPN
   gateways. Previously, to make any split tunnel related configuration
   changes, users have to delete the existing VPN gateways and re-create
   new ones. With this release, when you add a new VPC/VNet and your VPN
   users need to access them via VPN, you just modify the CIDRs at
   “additional CIDRs” field at split tunnel configuration without
   deleting any existing gateways. To configure, go to VPC/VNet -> Edit
   Configuration-> Modify Split Tunnel. Note all additional CIDRs (the
   CIDRs that are not the VPC/VNet CIDR where VPN gateways are deployed)
   must be entered all together, separated by comma. For example, you
   have two new VPCs, 10.10.0.0/16 and 10.11.0.0/16, and you like to
   access them via split tunnel VPN. You must enter at the Modify Split
   Tunnel field “10.10.0.0/16,10.11.0.0/16” without the quote. In
   addition, you may need to add encrypted peering with the new VPCs in
   order for traffic to go through. The changes are effective
   immediately to the VPN gateway in the VPC/VNet. If there are multiple
   VPN gateways behind a load balancer, they are all updated at the same
   time. Active VPN users will be disconnected during this configuration
   time.

-  Support Transitive Peering. Transitive Peering enables you to route
   traffic from instances in Source VPC, encrypted, through a NextHop
   VPC gateway to reach a destination. Before creating Transitive
   Peering’, you need to make Encrypted Peering between Source VPC and
   NextHop VPC first. To create/delete Transitive Peering, go to
   VPC/VNet -> Encrypted Peering -> Transitive Peering.

-  Support site to cloud IPSec VPN connections. Using this feature, you
   can create IPSec VPN connections linking your on-prem networks to
   VPC/VNets in the cloud. To configure, go to VPC/VNet -> Site2Cloud.
   After adding a site2cloud connection, you can download a
   configuration template file for your on-prem devices (Only Cisco ASA
   configuration template is available now). If High Availability (HA)
   function is enabled, one gateway serves as the primary VPN connection
   endpoint and the other one serves as the backup. In case on-prem
   device loses the VPN connection to the primary VPN gateway, it can
   switch to the backup gateway to recover the VPN connection. Some
   diagnostic tools for site2cloud are also provided.

-  Support encryption for Azure ExpressRoute. This feature allows to run
   IPSec over Azure Express Route to ensure a higher security level. To
   enable it, first launch a gateway in a subnet dedicated for the
   gateway, then go to VPC/VNet -> Site2Cloud, click “Add” tab and
   select “Private Route Encryption”.

-  Support VNet route diagnostics. Go to Settings -> Troubleshooting ->
   VNet Route Diagnostics to find various VNet routing related
   diagnostics tools.

UserConnect-011316
==================

-  Support VPN certificates maintained by a third party PKI system.
   Third party PKI must be created before any gateway launch. To enable
   this feature, go to VPC/VNet -> VPN Access -> Certificate Management.
   Use this feature to import certificates and download VPN
   configuration files.

-  Support the ability to edit the LDAP settings on existing VPN
   gateways. Previously, to make any LDAP related configuration changes,
   users have to delete the existing VPN gateways and re-create new
   ones. With this support, you can enable, disable, or modify LDAP
   configuration on existing VPN gateways without deleting them. To
   configure, go to VPC/VNet -> Edit Configuration-> Modify LDAP
   Configuration.

UserConnect-121015
==================

-  Support remote syslog to a third party or Aviatrix syslog server. The
   feature allows 24x7 premium customer to forward both controller and
   gateway events to a customized Aviatrix syslog server for debugging
   and troubleshooting purpose. This feature improves customers network
   uptime. To enable this feature, go to Settings -> Setup loggings ->
   Remote Syslog.

-  Support the ability to push down to VPN user client the DHCP settings
   made in AWS VPC Console “Create DHCP Options Set” menu. For example,
   if you wish to change DNS name after the gateway has been launched,
   you can use this feature to make changes. The active VPN users will
   be disconnected when this feature is executed. To configure, go to
   VPC/VNet -> Edit Configuration -> Reload DHCP Configuration.

UserConnect-112415
==================

-  Support Sumologic logging collector. When enabled, syslog data from
   the controller and all gateways will be forwarded to a Sumologic
   account. To enable, click Settings -> Setup Loggings -> Sumologic

-  Add LDAP user search capability when Test LDAP Configuration to
   further test drive the correctness of a LDAP configuration.

-  Enable gateway High Availability capability with a pair of gateway
   instances in active and hot standby mode. To enable, go to VPC/VNet
   -> VPC HA.

-  Add Help me! for a drop down display of VPC/VNet in a specific region
   and cloud account.

UserConnect-112015
==================

-  Clean up onboarding messages and texts for Azure usage.

UserConnect-111015
==================

-  Support Geo VPN feature where a VPN user is connected to a nearest
   VPC. To enable Geo VPN, go to VPC/VNet -> VPN Access -> Geo VPN.

UserConnect-110615
==================

-  Bug fix to allow multi-AZ and PBR routing configuration scenario.

-  Added AZ display along with subnet info at gateway create.

-  Created Reference Designs.

UserConnect-102615
==================

-  Support 2FA DUO authentication to console log in, in addition to
   password credentials. The configuration is at Settings -> System ->
   Setup 2FA Login.

UserConnect-101615
==================

-  Support multiple controller and gateway clusters in the same VPC.

UserConnect-100115
==================

-  Support Okta authentication.

-  Support integration of Elasticsearch on the controller.

-  Support both allow and deny rules for each VPC security policies.

UserConnect-092815
==================

-  Support PBR event syslog for NAT translation of every TCP/UDP/ICMP
   session. The log describes the VPN user virtual IP address, source
   port and the destination IP address and port. By correlating with VPN
   username and its assigned virtual IP address, IT admin can uniquely
   track and identify every VPN users’ access activity history to both
   internal resource and external resource.

-  Support multiple users in admin privilege. Support multiple users in
   user account privilege.

UserConnect-092115
==================

-  Added hard token authentication support on DUO security. Made DUO
   authentication configuration optional. When “Token” is configured as
   the Push Mode for all gateways, user must append the 6 digits’ token
   number to their password.

   **Note: **

1. **All active VPN users will be disconnected for this upgrade duo to
   VPN server restart.**

2. **You must log out and log back in again for new features to take
   effect.**

3. **You need to run upgrade command two times.**

-  Support VPN user certificate re-issuing. When existing VPN user
   certificate is re-issued, the current certificate of the user is
   revoked and a new certificate is sent to the user.

-  Active VPN user on dashboard display is dynamically refreshed every 5
   minutes.

UserConnect-082815
==================

-  Support launch gateways in Microsoft Azure.

UserConnect-082515
==================

-  Support backup DUO push. When both LDAP and DUO are enabled, user can
   type #push1 or #push2 appending to the password field to specify
   which phone in the DUO device list to be notified for approval. For
   example, if a user John Smith’s password is johnsmith, he can type at
   password prompt johnsmith#push1 or johnsmith#push2 to specify the
   first phone or the second phone to be notified. If only password is
   typed in, the default phone (the first phone on the device list in
   DUO) will be notified.

   **Note: You must run upgrade command twice to have the upgrade take
   effect for this particular upgrade. All VPN users need to be deleted
   and added again as the existing certificates will not work with the
   new encryption algorithm. The first upgrade command may generate an
   exception, just ignore it and run upgrade again. **

   Suggested upgrade procedure: delete all existing users. Upgrade once
   and upgrade again, and then add users back.

-  Support enhanced encryption algorithms: AES-256-CBC, SHA512, TLS1.2
   and TLS-AUTH.

-  Detailed display of VPC/gateway on Dashboard. Clicking on the gateway
   name displays the complete configuration of the gateway.

-  Support REST API for all CloudOps commands.

-  Support the option to launch gateway when creating CloudOps VPC pool.

-  Support CloudOps Access IP address map history and initiator (from
   Console or from REST API).

-  Hash all password.

-  Add confirmation check when deleting a VPC or gateway.

-  Dynamically display controller logs on UI.

-  Bug fixes for out of order gateway command delivery and multiple
   identical users on the same gateway display.

UserConnect-081315
==================

-  Support for CloudOps VPC pool creation and CloudOps Read Me First.

-  Support additional route push to VPN client when split tunnel is
   enabled.

-  Disable password caching and credential saving in .onc file for
   Chromebook users.

-  Display profile name instead of command name in VPN active user
   Dashboard.

-  Fix typos in email notification sent to VPN users.

-  For UDP connections, send a disconnect message to VPN gateway
   immediately when the client terminates.

-  Fix release version alert problem.

UserConnect-072815
==================

-  Support Diagnostics on controller and gateways.

-  Added DNS name service for CloudOps Networking feature.

-  Dashboard performance improvement.

-  Enhance Chromebook VPN ONC file connection name to be profiled based.

-  Bug fix for logstash forwarder.

UserConnect-071615
==================

-  Support upgrades without terminating existing active VPN users unless
   specifically documented.

-  Various bug fixings.

-  General UI look and feel update.

UserConnect-070615
==================

-  Integrate LDAP configuration with Gateway creation to streamline
   provisioning process.

-  Display Profile fields in Active VPN User dashboard.

-  Support logstash forwarder to forward all syslog and auth log to
   designated logstash server.

-  Support software release version visibility.

UserConnect-061915
==================

-  Support template generation at create gateway and configure VPN
   access.

-  Support user activity history

UserConnect-061015
==================

-  Support operator account where operator can only access dashboard.

-  Support disconnect user from dashboard page.

UserConnect-060315
==================

-  Support capability to manage instances in overlapping CIDRs of VPCs.

-  Support dashboard for active user display.

UserConnect-052615
==================

-  LDAP client certificate import facility to support LDAP servers with
   TLS client verification

-  Support configurable action parameter in user profile policy

-  Support forwarding of syslog events to Logstash server

UserConnect-051515
==================

-  Support LDAP + Duo multi-factor combined authentication

-  Support configurable base policy for user profiles

-  REST API to change a VPN user’s profile

UserConnect-050915
==================

-  Support Chromebook as a VPN client.

-  Support DUO multi-factor authentication.

-  Support syslog display with regex filtering capability for each VPN
   gateway.

UserConnect-050215
==================

-  Support policy based routing on the VPN server to allow enterprise to
   re-direct traffic to its own backbone.

UserConnect-042315
==================

-  Support user authentication via Google 2-Step Verification process.
   Support multiple email domain names.

UserConnect-041715
==================

-  Support setting the maximum number of connections for each gateway.

-  Support NAT capability for each gateway.

-  Support both split tunnel and full tunnel mode for each gateway.

-  Support gateway size c4.2xlarge.

-  Support add and delete members on the Profile page.

UserConnect-032315
==================

-  Support user profile based security policies.

-  Support scale out and highly available OpenVPN® solutions for direct
   access to VPCs.

-  Support LDAP integration.

-  Support Windows, MAC OS and Chromebook clients.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
