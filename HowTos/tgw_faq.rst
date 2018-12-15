.. meta::
  :description: TGW Orchestrator Overview
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
Transit Gateway (TGW) Orchestrator Feature FAQ
=========================================================

What is the Aviatrix TGW Orchestrator feature?
-----------------------------------------------

TGW Orchestrator feature serves three purposes:

 1. Orchestrates VPC to VPC and on-prem to VPC connectivities via AWS TGW. 
 #. Creates security boundaries between groups of VPCs to achieve network segmentation.. 
 #. Out-of-the-box integration of TGW and Direct Connect and Internet to re-use what has been built. 
 #. Provides a high performance and feature rich hybrid network for connecting to on-prem.

The TGW Orchestrator is illustrated in the diagram below.

|tgw_overview|

In the above diagram, AWS VPCs are grouped into four domains: Dev domain, Prod domain, Shared Service domain and 
Aviatrix Edge domain. Each VPC in the same domain can communicate with each other via TGW. VPCs in Prod domain cannot communicate 
with VPCs in Dev Domain, while all VPCs in Dev domain and Prod domain can communicate with Shared service domain and Aviatrix 
Edge domain. 

Through the Aviatrix Transit GW in the Aviatrix Edge domain, Spoke VPCs can communicate with on-prem over Direct Connect. 

In the deployment, the VPC in the Aviatrix Edge domain is a Spoke VPC from TGW point of view, however it serves as Transit VPC 
from Aviatrix Transit Network point of view. No Aviatrix gateways are deployed in Spoke VPCs except in the Transit VPC. 

Aviatrix Transit GW serves as hub connecting to Azure and GCP network. 


Why should I use Aviatrix TGW Orchestrator?
--------------------------------------------

Aviatrix TGW Orchestrator simplifies, abstracts and extends the latest AWS TGW service. Aviatrix Controller makes TGW based Transit 
architecture deployable by overcome `TGW limitations <https://docs.aviatrix.com/HowTos/aws_network_limits.html>`_. 

- **Functional Completeness** Aviatrix makes AWS Transit Gateway functionally deployable. The Orchestrator programs and updates both VPC route tables and TGW route tables so the routes are dynamically propagated to the Spoke VPCs. Read `this answer <https://docs.aviatrix.com/HowTos/tgw_faq.html#why-should-i-use-aviatrix-tgw-orchestrator-to-build-a-transit-network-architecture>`_ for more details.
- **Segmentation** The Orchestrator abstracts the route domain and route propagation concepts in TGW that allows you to create network segmentation by policy and intent. 
- **Scaling** Aviatrix solution overcomes TGW route limits to scale the hybrid deployment to hundreds/thousands of VPCs. . 
- **Hybrid** The Orchestrator extends the TGW capability to include Direct Connect support for connecting to on-prem datacenter. 
- **Multi Cloud Architecture** Aviatrix Controller creates and manages a multi cloud global transit architecture with a single pane of glass. 


How does Aviatrix TGW Orchestrator compliment AWS TGW service?
---------------------------------------------------------------

- **Dynamic Route Propagation** Using Aviatrix Orchestrator is the only guaranteed way to ensure your on-prem routes are properly propagated to Spoke VPCs. AWS TGW propagates VPC CIDR and IPSEC VPN routes to the TGW route table. But the routes are not propagated to the VPC route table. It is account owner's responsibility to program VPC route tables. Aviatrix TGW Orchestrator dynamically update route entries in the VPC route tables. 

- **Policy Abstraction** AWS TGW provides capability to allow two TGW route tables to propagate routes to each other, but the actual route entry programming is left to the owner. Aviatrix TGW Orchestrator builds on that and allows customers to define policies that form a security boundary. 

- **Troubleshooting** Single pane of glass for troubleshooting connectivity with expert diagnosis. 

- **Direct Connect Support** AWS TGW provides on-prem connectivity via IPSEC VPN. It does not support Direct Connect. With Aviatrix TGW Orchestrator, Direct Connect customers can immediately benefit TGW service.  

- **Traffic Visibility** Netflow log support for traffic between on-prem and all VPCs.

- **Stateful Firewall** Enforce security policy for all traffic between on-prem and all VPCs.

- **10Gbps Transit** Support 10Gbps Transit network throughput. 

How does TGW Orchestrator work with Transit VPC?
-----------------------------------------------------

TGW Orchestrator leverages the Aviatrix Transit Network workflow for the hybrid connectivity function to on-prem datacenter and branches. It enables TGW Orchestrator to connect with on-prem over Direct Connect or Internet. 

TGW Orchestrator can also be used as a stand alone function for orchestrating VPC to VPC connections.  

When using TGW Orchestrator for hybrid connectivity, no gateways are deployed in the Spoke VPCs for hybrid function. 

How does TGW Orchestrator compare with Transit VPC?
-----------------------------------------------------

TGW Orchestrator can be deployed with some Spoke VPCs run Aviatrix gateways. When is the right use case to run Aviatrix Spoke gateway?

 1. If you need packet in flight to be encrypted, launch Aviatrix gateway in the Spoke VPC. 
 #. If you need various NAT function between Spoke and Transit VPC, use Aviatrix gateway in the Spoke VPC. 
 #. If you need to connect a Azure VNet as Spoke, use Aviatrix gateway in the Spoke VPC. 
 #. If you need to obtain Netflow and log information from the Spoke and Transit, use Aviatrix gateway. 

AWS released both CloudFormation and Terraform support for TGW, why should I use Aviatrix Orchestrator?
--------------------------------------------------------------------------------------------------------

Let's not confuse constructs with products. 

AWS CloudFormation for `TransitGateway <https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-ec2-transitgateway.html>`_ is a resource construct for TGW, so is the `Terraform example. <https://www.terraform.io/docs/providers/aws/r/ec2_transit_gateway_route_table.html>`_ 

They are all awesome, but these constructs are not enough to run your production network. 

For example, TGW does not propagate routes from on-prem to the VPC route table, that means there is no guarantee that your VPC instances can reach a specific on-prem server or host. Even if you hard coded the list of CIDRs to shuffle them down to TGW, what happens when a new VLAN or Subnet is stood up on-prem. Who is going to notify you?

Modern distributed network either requires BGP to dynamically propagate the routes or a controller that dynamically update the routes. Either approach, it is the only way to guarantee the network actually functions. At Aviatrix, we choose a software defined approach with our Controller. Unless you plan to develop a controller like ours, you should consider using our product. 

Learn more about TGW limitations from `this link <https://docs.aviatrix.com/HowTos/aws_network_limits.html>`_.


What is a Security Domain?
---------------------------

Security Domain is an Aviatrix enforced network of VPC members, where VPCs in the Security Domain can communicate with each other, and VPCs not in the security domain cannot communicate with VPCs in the Security Domain.

Aviatrix Security Domain is an abstraction builds upon AWS TGW route table concept. One or more Spoke VPCs are members in  
a security domain.

|security_domain|

VPCs in a security domain can communicate with each other via TGW. Each security domain has a corresponding route table on TGW. 

Aviatrix Controller dynamically programs and updates both VPC route tables so that instances in different 
Spoke VPCs in the same domain can communicate with each other.  

Two security domains are not connected, i.e., a Spoke VPC in one domain has no connectivity to another 
Spoke VPC in a different domain. Connection policy must be specified to connect the two domains so that VPCs in each domain can communicate with each other. 


What is a Connection Policy?
-----------------------------

A connection policy is an Aviatrix enforced cross Security Domain connectivity rules. 

A connection policy builds upon the TGW route table propagation concept, it specifies the 
connection relationship of one Security Domain to others. 
If two Security Domains connected by policy, instances in Spoke VPCs attached to each domain can communicate with each other via TGW. 

In the example below, both Dev_Domain and Prod_Domain have connection policy to Shared_Service_Domain. Dev_Domain and Prod_Domain are not connected. Instances of a VPC in Dev_Domain can communicate with instances of a VPC in Shared_Service_Domain. But instances of a VPC in Dev_Domain cannot communicate with instances of a VPC in Prod_Domain. 

|domain_policy_diagram|

Aviatrix Controller programs all VPC route tables and TGW route tables so that two Security Domains with a 
connection policy can communicate with each other automatically. 

What are the benefits of using Security Domains and Connection Policies?
--------------------------------------------------------------------------

Using Security Domains and Connection Policies allow you to identify groups of VPCs with the same requirements from 
networking point of view and then apply connection policies at the group level. This avoids having to individually 
specify connections at VPC level. The Aviatrix Controller takes care of route programming of all route tables. 

One analogy to think of a Security Domain is datacenter VLAN/Subnets and hosts connecting to the 
VLAN/Subnet. 

In the Aviatrix Security Domain concept, a security domain is a VLAN, a host is VPC plugging in to the VLAN. 
Hosts in the same VLAN can communicate with each other. If two VLANs are defined by policy to be connected, the 
hosts in different VLAN can communicate with each other. 

 

What is the Default_Domain?
---------------------------

When a TGW is created by the Aviatrix Controller, the Default_Domain is created and a route table corresponding to the Default_Domain is created on TGW. If you do not plan on building any network segmentation, you can use Default_Domain for inter Spoke VPC and hybrid communications. 

What is the Shared_Service_Domain?
-----------------------------------

When a TGW is created by the Aviatrix Controller, the Shared_Service_Domain is created and a route table corresponding to the Shared_Service_Domain is created on TGW. 

You can attach a Spoke VPC to this domain and host your shared service instances such as your DevOps tools. 

Shared_Service_Domain is always connected to Default_Domain and Aviatrix_Edge_Domain.

What is the Aviatrix_Edge_Domain?
----------------------------------

When a TGW is created by the Aviatrix Controller, the Aviatrix_Edge_Domain is created and a route table corresponding to the Aviatrix_Edge_Domain is created on TGW. 

Aviatrix_Edge_Domain is designated for connecting VPCs managed by TGW Orchestrator to on-prem network. There must be one VPC 
attached to this domain. In the VPC, an Aviatrix Transit GW is deployed and used for data traffic forwarding between Spoke VPCs and on-prem network. 

Aviatrix_Edge_Domain is always connected to the Shared_Service Domain and the Default_Domain.


How to deploy TGW Orchestrator?
--------------------------------

TGW Orchestrator is deployed in two stages. 

 - `Plan <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_: Define and setup Security Domains and Connection Policies.
 - `Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_: Attach a VPC to TGW and Security Domain.

In addition, you can 

 - List: List what is programmed in the TGW route table for a given Security Domain. 
 - View: View what VPC members are attached to Security Domains and Connection Policies. 
 - Test: instance to instance end-to-end Troubleshoot. 

What can be displayed at the View page?
-----------------------------------

View page provides the following information:

 - ALL TGWs created by the Controller.
 - All Security Domains under a TGW.
 - All VPC members in a Security Domain.
 - For a given Security Domain, what other domains it connects to. 
 - All VPC attachments to a TGW.
 - For a given VPC, what other VPCs in other domains it connects to. 


|tgw_view|

What are the TGW Orchestrator deployment scenarios?
------------------------------------------------------

Check out some `design patterns <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html>`_ that address your requirements. 

Can I change my plan or VPC attachment on TGW Orchestrator?
------------------------------------------------------------

Yes, all stages (Plan, Build, List, View and Test) are modular. You can change your design any time. 

I already have a TGW and some VPCs attached to it, how do I migrate?
----------------------------------------------------------------------

Unlike VPC where once you have created it and launched instances in the VPC you cannot delete the VPC or move
the instances easily, TGW and its attachments can all be changed without making changes to the instances and VPC CIDRs. Simply detach the VPCs from the current TGW, launch a new TGW and build it out again. 

Aviatrix TGW Orchestrator manages the entire life cycle of network, including Security Domains, all TGWs and 
attachments should be created and managed by the Orchestrator.    

I plan to isolate a Dev Domain and Prod Domain, but there is one VPC in Dev that needs to connect to Prod. What should I do?
-----------------------------------------------------------------------------------------------------------------------------

Since you can create as many security domains as you need, you can create one domain  
and connect this domain to your Prod domain, and if needed, also to the Dev domain. Simply attach the
special VPC to this domain, it will have connectivity to Prod domain. 

How does CSR based Transit VPC solution compare with TGW?
----------------------------------------------------------

TGW significantly simplifies building VPC connections. But TGW itself is functionally incomplete for hybrid connection.
For example, TGW does not propagate routes to Spoke VPCs, which means using TGW alone does not offer a functional hybrid
solution.

The example below illustrates the how CSR based Transit VPC provides an end-to-end solution while TGW alone leaves Spoke VPC route table all empty.

|tgw_transit_vpc_compare|

The missing function of TGW is listed as below:

 - Not able to propagate routes from on-prem to the Spoke VPCs.
 - Not able to connect with Direct Connect.
 - The TGW VPN has 100 route limits.
 - TGW route table cannot summarize routes to advertise to TGW VPN.

While you may think you can gather the on-prem routes and program the Spoke VPC tables, it is not so simple. The on-prem routes
change from time to time as new networks are added or removed, which means you need a reliable way to monitor the route changes, handle exceptions, dealing with errors and duplicate routes -- essentially a function carried by BGP or an orchestrator.

Why should I use Aviatrix TGW Orchestrator to build a transit network architecture?
-------------------------------------------------------------------------------------

Aviatrix TGW Orchestrator fulfills the need to propagate on-prem routes to the Spoke VPCs. This function is either carried by BGP or software defined. In the Aviatrix case, it is software defined and performed by the Controller. The diagram below
shows how CSR Transit VPC, TGW and Aviatrix Orchestrator compare for route propagation function.


|tgw_transit_orchestrator_compare|

What value does Aviatrix gateway provide in the TGW Orchestrator?
------------------------------------------------------------------

Aviatrix gateway deployed at the edge/transit VPC provides the following values:

 - Ensure the correctness of connectivity by monitoring and dynamically programming on-prem network address ranges to Spoke VPCs route tables.
 - Avoid network outage by detecting and alerting overlapping and conflicting network address ranges between on-prem and all VPCs.
 - Avoids AWS VGW or TGW VPN 100 route limits by summarizing Spoke VPC CIDRs advertisements to on-prem network.
 - Provides traffic visibility by supporting Netflow logs between on-prem network and all VPCs.
 - Provides stateful firewall to enforce policy between on-prem network and all VPCs.
 - Out-of-box integration to support Direct Connect.
 - Connects multi-region TGW deployment.
 - Supports Transit DMZ architecture by inserting third party firewalls at the edge/transit VPC.
 - Supports 10Gbps Transit network throughput.


.. |tgw_overview| image:: tgw_overview_media/tgw_overview.png
   :scale: 30%

.. |security_domain| image:: tgw_overview_media/security_domain.png
   :scale: 30%

.. |domain_policy_diagram| image:: tgw_overview_media/domain_policy_diagram.png
   :scale: 30%

.. |tgw_view| image:: tgw_overview_media/tgw_view.png
   :scale: 30%

.. |tgw_transit_vpc_compare| image:: tgw_overview_media/tgw_transit_vpc_compare.png
   :scale: 30%

.. |tgw_transit_orchestrator_compare| image:: tgw_overview_media/tgw_transit_orchestrator_compare.png
   :scale: 30%

.. disqus::
