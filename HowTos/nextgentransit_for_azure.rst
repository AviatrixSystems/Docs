.. meta::
   :description: AVX Transit for Azure
   :keywords: AVX Transit Architecture for Azure

============================================
AVX Transit Architecture for Azure
============================================


Aviatrix AVX Transit for Azure
---------------------------------------------------------------

The Aviatrix AVX Transit for Azure is an architecture to interconnect multiple VNets and on-prem in a hub and spoke 
deployment model, as shown in the diagram below. 

|nextgentransit_for_azure|

In the above diagram, the Aviatrix Controller is a VM that manages all networking connectivities from VNets to on-prem. 
It deploys one Aviatrix gateway (two for redundancy) in each VNet. The Transit gateway deployed in the transit VNet connects to on-prem over Express Route or Internet. 

Multiple Transit Gateways can also be interconnected. Spoke VNets can communicate to 
remote Spoke VNets through the two connected Transit Gateways, as shown below.    

|multiregion_azure|

Why do I need Aviatrix AVX Transit for Azure?
------------------------------------------------------

Transit architecture is about building connectivity between cloud and on-prem in the most agile manner possible. In the Transit architecture, there is one connection (not including the backup) between on-prem and a Transit Hub VNet. Everything else (the Spoke VNet to on-prem traffic) is routed through the Transit Hub VNet.

The alternative to Transit architecture (often referred to as "flat" architecture) is to build one connection, either IPSEC over Internet or Express Route, each time you spin up a new VNet in Azure. This requires changes at the on-prem edge, which requires a change control process that takes from days to weeks.

Azure provides certain hub-and-spoke capabilities with limitations. Here are some examples. 

 - The Azure native hub-and-spoke can only be deployed in the same region. A spoke VNet in one region cannot connect to the hub in a different region.
 - Two hubs cannot be interconnected. 
 - Spoke VNets connecting to the same hub cannot communicate with each other through the hub.
 - There is no encryption between spoke, hub and on-prem.
 - Azure native networking has different capabilities and semantics than AWS native networking. What skills your operations team has invested in AWS do not apply to Azure, you must invest in Azure also. Aviatrix provides a single pane of glass to unify cloud networking for all cloud providers.


The Benefits of the Aviatrix AVX Transit for Azure
-------------------------------------------------------------------

 - **Simplicity** The Aviatrix Controller provides an abstraction layer and workflow to build the Transit network. You do not need to program any Azure route tables, manage the route entries or understand the significant details about Azure networking.
 - **Multi Subscriptions Support** The Controller provides a single pane of glass to manage the entire cloud network of multiple Azure subscriptions. 
 - **Logging Service Integration** Out-of-the-box integration with Splunk, Sumo Logic, DataDog, ELK, remote syslog and Netflow.
 - **Visibility** View connectivity status, network latency and traffic statistics from a central dashboard. 
 - **Global** The Spoke VNet can be in a different region than the Transit VNet. 
 - **Transit Peering** Two Transit Gateways can be interconnected so that Spoke VNets connecting to a Transit VNet can communicate with each through the Transit Peering. 
 - **No Route Limits** The Aviatrix solution auto summarizes the on-prem and Spoke VNet routes so that Spoke VNet route entries do not exceed the route limits. 
 - **End-to-End Encryption** All traffic in flight, between Spoke VNets and between Spoke to on-prem, is encrypted.
 - **Spoke to Spoke via Transit** Spoke to Spoke traffic can be routed through the Transit Gateway.

How does it work?
-------------------------------------------------------------------------------------------------

The AVX Transit Network is a Duo Mode architecture. While the Transit Gateway runs 
BGP protocol, advertising Spoke VNets CIDRs to an on-prem network and learning the on-prem network CIDRs, Spoke VNets do not run dynamic routing protocols. Learned routes by the Transit Gateway are reported to the Controller which in turn propagate to the Spoke VNets. By minimizing dynamic protocol running in the network, operations and troubleshooting become simple. 
CloudOps engineers without extensive networking background are able to build and manage the network. 


How do I deploy it?
--------------------------------------------------------------------

The Aviatrix Controller is available in the Azure Marketplace. 

 1. Follow the `Azure Startup Guide <https://docs.aviatrix.com/StartUpGuides/azure-aviatrix-cloud-controller-startup-guide.html>`_ to launch the Controller. 
 #. Follow the onboarding steps to setup Azure API credentials so that the Controller can launch gateways on behalf of the Azure account. 
 #. Select the use case Next-Gen Transit Network and follow the `workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ to start building the transit network.   


.. |nextgentransit_for_azure| image:: nextgentransit_for_azure_media/nextgentransit_for_azure.png
   :scale: 30%

.. |multiregion_azure| image:: nextgentransit_for_azure_media/multiregion_azure.png
   :scale: 30%

.. disqus::
