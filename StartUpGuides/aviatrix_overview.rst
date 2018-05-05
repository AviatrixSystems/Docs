.. meta::
  :description: Aviatrix Product Overview
  :keywords: cloud networking, aviatrix, OpenVPN®, SSL VPN, Global Transit Network, site2cloud


=============================================
Aviatrix Overview
=============================================

What Do We Do?
================

Aviatrix is a cloud networking company. We believe encryption for data in transit is 
the new fundamental for all network connectivities. All data we connect is 
encrypted, either via IPSEC or SSL, over Internet or private links. 

We focus on solving networking problems in use cases relevant to public clouds. 
These use cases are: 

- datacenter to cloud (`Next Gen Global Transit Network solution <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_)  
- cloud to cloud VPN (`Encrypted peering <http://docs.aviatrix.com/HowTos/peering.html>`_ connectivity in a cloud and multi cloud ) 
- user to cloud VPN (`Remote user VPN (OpenVPN® based SSL VPN solution) <http://docs.aviatrix.com/HowTos/uservpn.html>`_ for developers) 
- site to cloud VPN (`Branch and customer sites to cloud <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_) 
- multicloud VPN (`Multicloud Peering <http://docs.aviatrix.com/HowTos/GettingStartedAzureToAWSAndGCP.html>`_)

We also provide security features for workloads/application in the cloud: 

- `Gateway inline L4 stateful firewall. <http://docs.aviatrix.com/HowTos/tag_firewall.html>`_ 
- `VPC Egress Security. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_

In addition, we have specific network solutions for `cloud migration <http://docs.aviatrix.com/HowTos/ipmotion.html>`_ and 
agile `datacenter extension <http://docs.aviatrix.com/Solutions/aviatrix_aws_meshVPC.html>`_ to cloud for vmware workloads. 

Where To Find Us?
==================

Our product, Aviatrix Secure Networking Platform, consists of two components, Controller and
gateway. Gateways are launched from the Controller
browser console by using your cloud account credentials with cloud provider APIs.
The Controller image is available in `AWS Marketplace, <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_  `Azure Marketplace <http://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html>`_ and `GCloud <http://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`_.

We are not a SaaS company, our product runs in your account and environment. We have no access to your data or credentials. 

Why Should You Consider Us?
=============================

Customers find the most compelling value of our product is ease of use, both at configuration time and operation time. Ease of use is easier said than done in networking as it is by nature complex, how can one achieve that? Here is how we do it:

- **Abstraction**  Abstraction is key to achieve ease of use at configuration time. Abstraction is about hiding layers and layers of complex network protocols, it is also about use-case-driven at presentation layer by combining multiple networking components and features. APIs and Terraform templates also benefit from this abstraction as fewer of them need to be managed.

- **External Integration** We integrated and developed applications for all popular logging services to forward events, alerts and a turn key dashboard to achieve ease of use at operation time. 

- **Centrally Managed** A single pane of glass to manage all your cloud network scattered in different regions and clouds.

For example, we hide the platform differences between AWS, Azure and GCP, so that you have the same
experience when networking to any of them or between them. 

Another example, we hide the complexity of building IPSEC so that you have the same 
experience when you build an IPSEC tunnel as you would with AWS native peering: a couple of clicks or a couple of APIs. And we do one better, not only the connectivity is setup, the underlying route entry is 
configured too so that you have a turn key solution. 

Beyond ease of use, Aviatrix solutions solve many problems better than other products in each of the use cases. This document summarizes these problems. Links to 
configuration documents are listed at the end of each section.  

Our goal is to become your go-to tool for all things cloud networking. 


Datacenter to Cloud: Aviatrix Next-Gen Transit Network 
=========================================================

Aviatrix Next-Gen Transit Network solution solves many problems when connecting datacenters to a growing number of VPCs.

These problems are listed below:

 a. **Change Control** Each time a new VPC is stood up, a change control process has to take place to modify the edge router for Direct Connect or IPSEC over Internet. This is not agile and the risk of errors in configuration is not acceptable.
 #. **BGP** The CSR based Global Transit solution runs VGW in each spoke VPC which runs a BGP session to Transit hub. This is operationally challenging to manage and troubleshoot. The BGP in VGW is a black box and  invisible to outside.  
 #. **Not Secure** All spoke VPCs in The CSR based Global Transit solution have connectivity to each other through BGP route propagation. There is no network segmentation. The blast radius is my entire cloud network and datacenters. Not acceptable by security team. 
 #. **Reach Route Limit** AWS has route entry limits of 100 per each routing table. Combining the number of VPC CIDRs and the list of on-prem CIDRS, this route limit is fast approaching or already a problem.
 #. **Extra Charge** In the CSR based solution, traffic from one spoke VPC to another spoke VPC traverses through one transit and sometimes two transit hub, resulting in 2x or 3x egress charge. 
 #. **Too Complex** The CloudOps is a team of 6 engineers managing 34 AWS services, the skill set and resources it takes to manage the CSR based Transit network is beyond what we want to handle. 

Follow this `self qualification process <https://www.aviatrix.com/blog/aviatrix-global-transit-solution-differ-csr-solution/>`_ to help your team decide if Aviatrix is the right solution for you. 
For how to setup the solution, follow up with `this doc. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_  

Cloud to Cloud Peering
============================

Aviatrix encrypted peering solution builds IPSEC tunnels to connect two VPC/Vnet. It solves these problems:

 a. **Regulation** My industry and regulations require packet in motion to be encrypted. AWS intra peering has no encryption. AWS inter region peering has one shared key. Not acceptable. 
 #. **Reach Route Limit** AWS has route entry limits of 100 per each routing table. Combining the number of VPC CIDRs and the list of on-prem CIDRS, this route limit is fast approaching or already a problem.
 #. **Multi Cloud** My workloads in AWS need connectivity to works loads in Azure or Google. 
 #. **Defense in Depth** My CloudOps tools communicate to instances with data that is not encrypted. I need encryption for traffic between Shared Service VPC to workload VPC.
 #. **Require 10Gbps Encrypted Throughput** I need encryption for all data in motion and I need the performance to be up to 10Gbps.

Aviatrix peering solution can be found `here. <http://docs.aviatrix.com/HowTos/peering.html>`_

User to Cloud Access
==============================

Giving developers, contractors and partners around the globe direct access to VPC/VNet is the best way to reduce access latency and improve productivity. How to make it secure, high performance and manageable are key to the solution. 

Aviatrix user to cloud solution is based on OpenVPN®.  
The solution solves these problems:

 a. **Bastion Station** Bastion Station or Jump Host is a hack and insecure to allow developers to access cloud. Not acceptable. 
 #. **Too Many Certs** If each VPC runs a SSL VPN gateway and there are 50 VPCs, each developer needs to carry 50 VPN certificates and must learn which certificate to use to access which VPC. Not acceptable. 
 #. **Large Group** We have over 500 developers, need a VPN solution that scales beyond a single instance based VPN solution. 
 #. **OKTA** We are looking for a VPN solution that integrates with OKTA or DUO. 
 #. **Blocked by Firewall** We have a Linux machine in the office that needs to behave like a VPN client. We need a VPN solution that runs on TCP port 443 to allow this machine to go through the corporate firewall. 
 #. **Global Workforce** We have developers in multiple geo locations, cannot have them all land in the cloud in the same region. Latency will kill user experience. 
 #. **SAML Client** We are looking for a OpenVPN® based VPN solution with SAML client support.  

Aviatrix user VPN solution cab be found `on this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`_
One feature in the solution that customers like the most is `Profile Based Access Control. <http://docs.aviatrix.com/HowTos/openvpn_features.html#authorization>`_


Site to Cloud Connectivity over Internet 
=========================================

If you run a SaaS service that needs to securely move data from your customer sites to the cloud, or 
your enterprise has hundreds of branch offices that need to connect to the cloud, building secure 
tunnel to the cloud directly over Internet is the most economical way as you leverage the Internet infrastructure already in place. 

In this case, the cloud provider's native VPN solution falls short by a long shot. Aviatrix site2cloud solution solves these problems:

 a. **AWS/Azure VPN Gateway Limitation** Native cloud provider VPN solution typically can support 30 connections per VPN gateway. I have more than 30 sites, the native solution is not usable. 
 #. **No Manual** I have to configure and manage hundreds or thousands of IPSEC tunnels, the manual way by using traditional vendors such as Cisco ASA and CSR is not possible. 
 #. **Overlapping IP addresses** We run a SaaS operation, the CIDR blocks at your customer sites are not controlled by us. If a customer CIDR block overlaps with our operation VPC CIDR, we have to find a way to NAT the address. The cloud provider native solution is not usable in this case. 
 #. **Encryption Algorithm Mismatch** As SaaS operators, we cannot control what VPN device a customer wishes to use. My end of VPN termination needs to have the flexibility to interoperate with customer equipment. The native solution does not have that flexibility. 
 #. **Too Slow to Onboard a Customer** VPN runs on UDP port 500/4500, my customers have to request corporate firewall ports to open, is there a way to run IPSEC tunnel on TCP 443?
 #. **Traffic Direction Problem** My SaaS service requires traffic to be initiated from cloud to the customer site, AWS VPN gateway cannot support this traffic pattern. We have to setup a separate machine to constantly ping to keep the tunnel up! 

To learn how to setup Aviatrix site2cloud, follow up with `this link. <http://docs.aviatrix.com/HowTos/site2cloud.html>`_

Gateway Inline L7 FQDN for Egress Control
==================================================

This solution is about adding security control to private workloads or applications accessing Internet. 
AWS and Azure provide a NAT gateway or NAT service, but it is limited in scope. Traditional firewall is either too complex or too expensive to be deployed per VPC. 
Aviatrix L7 FQDN filter solves these problems:

 a. **Only IP Based Rules** AWS provides security groups for its NAT gateway, but it is IP address based and limits to 50 rules. My application needs to make API calls to Office 365 and that site along resolves to hundreds of changing IP addresses. Using Security group is not an acceptable solution. 
 #. **Firewall for Each VPC is Too Complex** My cloud instances are workloads and programs, they make API calls to known destinations. Deploying a traditional firewall that requires certs and keys to decrypt every packet for inspection is too complex and an overkill. 
 #. **Firewall for Each VPC is Too Expensive** Traditional firewall of IDS/IPS is too expensive to be deployed per VPC. 
 #. **Whitelisting** All I need is to be able to white list or black list the well known destinations by specifying them as fully qualified domain names (FQDN) for my http and https traffic. Support wild card or regex is a bonus. 

Follow up with more details on `Aviatrix FQDN filter solution. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_

Gateway inline L4 Stateful Firewall
====================================

Whenever there is traffic going through Aviatrix gateway, you can apply IP address based stateful 
firewall policies. This reduces the need to have to configure security groups of each instances in the VPC for traffic between VPCs. There is no limit as to how many rules you can apply on Aviatrix gateway. Aviatrix solution solves these problems:

 a. **Security Rule Limits** An cloud instance's security group has a limit of 50 rules. How do I get around that?
 #. **Enforce Security Policies** Developers don't always follow the best practice when it comes to security, enforcing policies at the gateway takes that worry away. 
 #. **Regulation** We cannot use AWS VPC Peering as it does not allow us to apply policies. We need an infrastructure presence that not only provides security but also enforce policies. 

To learn how to setup the L4 firewall, `follow the doc. <http://docs.aviatrix.com/HowTos/tag_firewall.html>`_

Cloud Migration
==================

Current cloud migration practice is complex and time consuming. The root case is the requirements that migrating VM must change its IP address after the migration. Read how Aviatrix solves `this problem. <http://docs.aviatrix.com/HowTos/ipmotion.html>`_ 

Extending Workloads to Cloud
==============================

Not all your workloads require the bandwidth and latency that calls for a Direct Connect transport. For your Dev and QA or many applications, an existing Internet connectivity is sufficient. Even better, Aviatrix provides a unique solution that you do not even need to make changes to the edge router. `Learn how this solution works. <http://docs.aviatrix.com/Solutions/aviatrix_aws_meshVPC.html>`_


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image0| image:: AviatrixCloudControllerStartupGuide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |image1| image:: AviatrixCloudControllerStartupGuide_media/image002.png
   :width: 4.80625in
   :height: 3.21803in
.. |image2| image:: AviatrixCloudControllerStartupGuide_media/image003.png
   :width: 5.33067in
   :height: 2.04513in
.. |image3| image:: AviatrixCloudControllerStartupGuide_media/image004.png
   :width: 4.92712in
   :height: 2.20352in
.. |image4| image:: AviatrixCloudControllerStartupGuide_media/image005.png
   :width: 5.53494in
   :height: 3.11814in
.. |image5| image:: AviatrixCloudControllerStartupGuide_media/image006.png
   :width: 5.21042in
   :height: 2.60298in
.. |image6| image:: AviatrixCloudControllerStartupGuide_media/image007.png
   :width: 4.61664in
   :height: 4.22847in


.. add in the disqus tag

.. disqus::
