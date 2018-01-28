.. meta::
   :description: onboarding Frequently Asked Questions
   :keywords: Aviatrix Getting Started, Aviatrix, AWS

============================
Transit VPC FAQs
============================


How does Aviatrix Transit VPC Solution differ from Cisco CSR based solution?
------------------------------------------------------------------------------

They differ in the following areas.

 - **Network Segmentation** In the CSR solution, all Spoke VPCs have connectivity to each other through the Transit GW, even though these Spoke VPCs belong to different AWS account or business teams. In contrast, the Spoke VPCs have no connectivity to each other by default. Connectivity is built by design.

 - **Connectivity Efficiency** In Aviatrix solution, traffic between any two Spoke VPCs are routed directly, instead of going through the Transit GW, as opposed to going through the Transit GW in the CSR case. Decoupling the different traffic steam reduces performance bottleneck and removes single failure point. 

 - **Central Controll** In Aviatrix solution, the Aviatrix Controller is the single pane of glass for all networking in the cloud. 

 - **Simplicity** In Aviatrix solution, BGP is only deployed between Transit GW and VGW. No Spoke VPCs run BGP protocol. Simplicity leads to stability. Workflow based step by step instructions help you build out a Transit VPC solution in minutes. 

For a fun reading, here is a `blog on the differences. <https://www.aviatrix.com/blog/aviatrix-global-transit-solution-differ-csr-solution/>`_

How do I configure a Global Transit Network with Aviatrix solution?
--------------------------------------------------------------------

Follow the `Aviatrix Transit VPC Workflow <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. 

Should I deploy one Transit Group for Dev and one for Prod?
------------------------------------------------------------

If your reason for two Transit hubs is security and smaller blast radius, you need not to when using Aviatrix solution. By design, none of Spoke VPCs can talk to each other. Check out the `Single region design. <http://docs.aviatrix.com/HowTos/transitvpc_designs.html#single-region-transit-vpc-design>`_  

I have two regions and two Direct Connects, how do I build a multi region Transit solution?
-------------------------------------------------------------------------------------------------

For multi region, the redundancy is best built over VGW. Check out our `multi region design <http://docs.aviatrix.com/HowTos/transitvpc_designs.html#multi-regions-transit-vpc-design>`_

I have more than 100 VPCs, how do I overcome AWS route limits?
----------------------------------------------------------------

When you deploy Aviatrix Transit VPC solution, all Aviatrix gateways, Transit and Spoke, are deployed with `Designated Gateway Feature <http://docs.aviatrix.com/HowTos/gateway.html#designated-gateway>_ enabled by default. This allows to manage as many Spoke VPCs as you need.

I have a few high bandwidth applications, how do I deploy them in a Transit solution?
--------------------------------------------------------------------------------------

Currently the Transit solution has a maximum IPSEC throughput of around 1.5Gbps from the Transit GW. To support applications that require higher bandwidth, check out `this design pattern. <http://docs.aviatrix.com/HowTos/transitvpc_designs.html#gbps-trnasit-vpc-design>`_

How can I fit a egress firewall into this Transit VPC solution?
---------------------------------------------------------------

Egress firewall is deployed to provide protection for Internet access by instances in the private subnets. We believe you should not deploy the firewall in the Transit GW VPC. Instead, route Internet bound traffic directly to the firewall appliance from the Spoke VPCs, as shown in the `Egress Control Design. <http://docs.aviatrix.com/HowTos/transitvpc_designs.html#integrating-with-egress-firewall>`_ 






.. |image1| image:: FAQ_media/image1.png

.. disqus::
