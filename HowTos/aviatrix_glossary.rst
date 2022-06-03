.. meta::
   :description: Aviatrix Glossary
   :keywords: glossary, dictionary, Aviatrix, ACE

============================
Aviatrix Glossary
============================


This Glossary provides definitions of Aviatrix products, features, tools, and general terminology.

ACE (Aviatrix Certified Engineer) Training
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Aviatrix Certified Engineer (ACE) program is a multi-cloud networking and security certification available to technical professionals and cloud practitioners. The program offers an overview of the networking industry’s move from on-premise to cloud servers, the main cloud service providers (AWS, Azure, GCP, and OCI) and their platforms, the necessity of multi-cloud networking architecture, and case studies that demonstrate how multi-cloud networking architecture has benefitted specific customers.

ActiveMesh	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The new Aviatrix Encrypted Transit Network architecture where both primary gateways and backup gateways forward data packets in a load-balancing fashion to maximize performance. ActiveMesh is a step beyond a full-mesh structure, in which every node in the network is connected to every other node.

Aviatrix Controller	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A central console or single pane of glass that provides visibility and control for your multi-cloud network, including its gateways, users, security, and operations. The platform uses the centralized intelligence and knowledge of the controller to dynamically program both native cloud network constructs and Aviatrix’s own advanced services.

Aviatrix CoPilot	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The visibility and analytics companion to Aviatrix Controller that provides a global operational view of your multi-cloud network. CoPilot provides accurate, real-time information about your controller-managed environment from the location and health status of all managed resources to detailed flow records for traffic traversing any gateway. Copilot dynamically renders visualizations (maps, graphs, charts, and reports) to give you deep visibility into your enterprise class network across a single or multiple clouds. CoPilot provides interactive diagnostic tools for locating and troubleshooting network issues and enhanced security features for detecting and blocking threats trying to penetrate the network.

Aviatrix FireNet	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A turnkey or ready-made network solution to deploy firewall instances in the cloud. FireNet significantly simplifies firewall instance deployment and allows the firewall instances to inspect traffic between VPCs/VNets/VCNs (East West) traffic, between VPCs/VNets/VCNs and the Internet (Egress) traffic, and VPC/VNet/VCN to on-prem (North South) traffic.

FireNet also allows you to scale firewall deployment to multiple Availability Zones and multi-instances so that your network can grow with your company.

Aviatrix CloudN	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Manages and automates secure connectivity of on-prem Cisco IOS Routers to the cloud.

Aviatrix Edge	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The hardware/virtual appliance provided by Aviatrix as an alternative to SDWAN solutions (formerly known as CloudN or ExoGateway). Aviatrix Edge connects different CSP (Cloud Service Provider) networks in its multi-cloud networking architecture framework. 


Aviatrix Gateway	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An Aviatrix gateway is a virtual router you deploy in your network to route traffic in accordance with the connection and security policies you define in Aviatrix Secure Cloud Network Platform.  Aviatrix gateways support the connectivity requirements of cloud networks that use a transit hub-and-spoke architecture and are available in different types: Transit, Spoke, Egress, VPN, and NAT.

**Transit**: Connectivity between on-prem and the cloud. Site-to-cloud single region or multiple region and site-to-cloud single cloud or multiple cloud. For advanced transit networking, connectivity between one region to another or one cloud to another. 

**Spoke**: Connectivity between the Spoke VPC/VNet to the Transit. Deployed on the Spoke VPC/VNet. A spoke gateway can also be a site-to-cloud landing option.      

**Egress**: An Aviatrix gateway that performs the function of cloud-to-Internet egress filtering and egress security. Connectivity between a VPC/VNet and the Internet. 

**VPN**: An Aviatrix gateway that performs the function of VPN connectivity. Connectivity between your partners/branches and your cloud services for site-to-cloud VPN access (deployed on the partner/branch side). Also connectivity between your remote users and the cloud for dynamic enforcement to differentiate the different users connecting into the cloud. Useful for companies that have no on-prem data center (all resources are in the cloud). 

**NAT**: An Aviatrix gateway that performs the NAT function. 


Egress FQDN Filtering	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Secures VPC/VNet/VCN Egress by filtering outbound traffic to the Internet. This feature enables companies to discover what Internet sites their cloud apps are communicating with, push filtering policies instantly to one VPC or hundreds of VPCs, move from NAT Gateway (IP address based) to Fully Qualified Domain Name (FQDN) filtering, and audit all events, including the packets. 

You can view Egress FQDN filtering in the Aviatrix Controller or by exporting logs to Splunk, Sumologic, and Datadog to standardize reporting and correlate events.

FlowIQ	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Aviatrix CoPilot’s dynamic topology mapping, which helps companies maintain an accurate view of their global multi-cloud networks. FlowIQ helps you analyze global network traffic flows using global heat maps and time series trend charts to easily pinpoint and troubleshoot traffic anomalies.

ThreatIQ	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Aviatrix CoPilot feature that enables you to monitor for security threats in your Aviatrix cloud network, set alerts when threats are detected in the network traffic flows, and block traffic that is associated with threats. All of these capabilities apply to your entire cloud network (multi-cloud or single cloud) that is managed by Aviatrix Controller.

.. disqus::