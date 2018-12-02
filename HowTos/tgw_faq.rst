.. meta::
  :description: TGW Orchestrator Overview
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator Feature FAQ
=========================================================

What is the Aviatrix TGW Orchestrator feature?
-----------------------------------------------

TGW Orchestrator feature serves three purposes:

 1. Orchestrates VPC to VPC connectivities via AWS TGW. 
 #. Creates security boundaries between groups of VPCs to achieve network segmentation.. 
 #. Out-of-the-box integration of TGW and Direct Connect and Internet to re-use what has been built. 

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

Aviatrix TGW Orchestrator simplifies, abstracts and extends the latest AWS TGW service. 

- **Simplification** The Orchestrator programs and updates both VPC route tables and TGW route tables so the routes are dynamically propagated to the Spoke VPCs. 
- **Segmentation** The Orchestrator abstracts the route domain and route propagation concepts in TGW that allows you to create network segmentation by policy and intent. 
- **Hybrid** The Orchestrator extends the TGW capability to include Direct Connect support for connecting to on-prem datacenter. 
- **Multi Cloud Architecture** Aviatrix Controller creates and manages a multi cloud global transit architecture with a single pane of glass. 

How does Aviatrix TGW Orchestrator compliment AWS TGW service?
---------------------------------------------------------------

- **Dynamic Route Propagation** AWS TGW propagates VPC CIDR and IPSEC VPN routes to the TGW route table. But the routes are not propagated to the VPC route table. It is account owner's responsibility to program VPC route tables. Aviatrix TGW Orchestrator dynamically update route entries in the VPC route tables. 

- **Policy Abstraction** AWS TGW provides capability to allow two TGW route tables to propagate routes to each other, but the actual route entry programming is left to the owner. Aviatrix TGW Orchestrator builds on that and allows customers to define policies that form a security boundary. 

- **Troubleshooting** Single pane of glass for troubleshooting connectivity with expert diagnosis. 

- **Direct Connect Support** AWS TGW provides on-prem connectivity via IPSEC VPN. It does not support Direct Connect. With Aviatrix TGW Orchestrator, Direct Connect customers can immediately benefit TGW service.  

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
 - View: View what has been configured for Security Domains and Connection Policies. 
 - Test: instance to instance end-to-end Troubleshoot. 

For example, you can view TGW, Security Domains and Connection Policies at the View page. 

|tgw_view|

What are the TGW Orchestrator deployment scenarios?
------------------------------------------------------

Check out some `design patterns <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html>`_ that address your requirements. 

Can I change my plan or VPC attachment on TGW Orchestrator?
------------------------------------------------------------

Yes, all stages (Plan, Build, List, View and Test) are modular. You are change your design any time. 

I already have a TGW and some VPCs attached to it, how do I migrate?
----------------------------------------------------------------------

Unlike VPC where once you have created it and launched instances in the VPC you cannot delete the VPC or move
the instances easily, TGW and its attachments can all be changed without making changes to the instances and VPC CIDRs. Simply detach the VPCs from the current TGW, launch a new TGW and build it out again. 

Aviatrix TGW Orchestrator manages the entire life cycle of network, including Security Domains, all TGWs and 
attachments should be created and managed by the Orchestrator.    

I plan to isolate create a Dev Domain and Prod Domain, but there is one VPC in Dev that needs to connect to Prod. What should I do?
------------------------

Since you can create as many security domains as you need, you can create one domain  
and connect this domain to your Prod domain, and if needed, also to the Dev domain. Simply attach the
special VPC to this domain, it will have connectivity to Prod domain. 



.. |tgw_overview| image:: tgw_overview_media/tgw_overview.png
   :scale: 30%

.. |security_domain| image:: tgw_overview_media/security_domain.png
   :scale: 30%

.. |domain_policy_diagram| image:: tgw_overview_media/domain_policy_diagram.png
   :scale: 30%

.. |tgw_view| image:: tgw_overview_media/tgw_view.png
   :scale: 30%

.. disqus::
