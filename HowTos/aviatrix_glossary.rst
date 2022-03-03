.. meta::
   :description: Aviatrix Glossary
   :keywords: glossary, dictionary, Aviatrix, ACE

This Glossary provides definitions of Aviatrix products, features, tools, and general terminology.

ACE (Aviatrix Certified Engineer) Training
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Aviatrix Certified Engineer (ACE) program is a multi-cloud networking and security certification available to technical professionals and cloud practitioners. The program offers an overview of the networking industry’s move from on-premise to cloud servers, the main cloud service providers (AWS, Azure, GCP, and OCI) and their platforms, the necessity of multi-cloud networking architecture, and case studies that demonstrate how multi-cloud networking architecture has benefitted specific customers.

ActiveMesh	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The new Aviatrix Encrypted Transit Network architecture where both primary gateways and backup gateways forward data packets in a load-balancing fashion to maximize performance. ActiveMesh is a step beyond a full-mesh structure, in which every node in the network is connected to every other node.

Aviatrix Controller	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A central console or single pane of glass that provides visibility and control for your multi-cloud network, including its gateways, users, security, and operations. The platform uses the centralized intelligence and knowledge of the controller to dynamically program both native cloud network constructs and Aviatrix’s own advanced services.

Aviatrix CoPilot	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A read-only solution that provides a global operational view of your multi-cloud network. CoPilot offers the visibility of the Controller without the same control over the network.

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

Aviatrix Spoke Gateway	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In Aviatrix’s Hub-and-Spoke topology, a Spoke Gateway connects components within the same CSP (Cloud Service Provider) main account or tenancy. 

Aviatrix Transit Gateway	
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In Aviatrix’s Hub-and-Spoke Topology, a Transit Gateway connects a company’s subnets across the main Cloud Service Providers: AWS, Azure, GCP & OCI. This Transit Gateway connection provides high-speed and secure data transfers between networks while allowing for traffic engineering and multi-account subscription monitoring.

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