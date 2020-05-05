.. meta::
   :description: AWS Transit Gateway Limits
   :keywords: AWS Transit Gateway, AWS TGW, VPC limits, AWS Route limits, AWS Peering limits, VPN Limits, AWS Network limits, SMTP 

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

===========================================================================================
AWS Transit Gateway Limits
===========================================================================================

AWS recently announced the Transit Gateway (TGW), a service that significantly simplifies VPC connections and consolidates the edge. 

It is good to know TGW limits and functional limitations both for planning and operation. 

For example, while a TGW route table can carry thousands of routes, a TGW VPN has the same hard limit 
of 100 BGP routes as the classic VGW VPN. When the BGP prefixes exceed 100, the TGW VPN randomly resets the BGP session, 
leading to unpredictable network outages. 

The TGW VPN makes the route limit a more serious problem as a TGW route table does not summarize Spoke VPC CIDRs when propagating them to on-prem. This is unlike the Transit VPC CSR solution or Aviatrix solution where the instance based gateway can summarize
the Spoke VPC CIDRs. As you migrate Transit VPC to TGW, you should be aware of the new route budget. For example, if you have 50 Spoke VPCs, your on-prem BGP prefixes should be less than 50. 
If you are already using Cisco CSR to summarize Spoke VPC CIDRs to avoid the route limit, migrating to native TGW will not work.  

AWS publishes Transit Gateway limits at `this link. <https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-limits.html>`_

Below is a list of commonly asked limits and limitations by network engineers.  


===================================================                  =============== =====================
Functions                                                            Limits  	     Comments   
===================================================                  =============== =====================
Propagating on-prem routes to Spoke VPC route table                  not supported   VPC owner's responsibility. Learn more `here <https://docs.aviatrix.com/HowTos/tgw_faq.html#why-should-i-use-aviatrix-tgw-orchestrator-to-build-a-transit-network-architecture>`_
Direct Connect support on TGW                                        supported       
Inter region TGW connectivity                                        supported
TGW VPN Static                                                       manual          In addition to updating Spoke VPC route table, you need to update the TGW route table for on-prem routes.
TGW VPN BGP prefix total                                             100             TGW does not summarize Spoke VPC CIDRs routes. The total route limit is aggregated routes from both on-prem and Spoke VPCs. 
Spoke VPC Route entries in a route table                             100             Default is 50. Performance is impacted when more than 100 routes present. 
===================================================                  =============== =====================


Check out how the Transit Gateway Orchestrator solves `these issues. <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_

.. |survey| image:: opstools_survey_media/survey.png
   :scale: 30%
   

.. disqus::    
