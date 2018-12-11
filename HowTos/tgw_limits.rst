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

AWS recently announced Transit Gateway (TGW), a service that significantly simplifies VPC connections and consolidates the edge. 

It is good to know TGW limits and functional limitations both for planning and operation. 

For example, while TGW route table can carry thousands of routes, TGW VPN has the same hard limit 
of 100 BGP routes as the classic VGW VPN. When the BGP prefixes exceed 100, TGW VPN randomly resets BGP session, 
leading to unpredictable network outage. 

TGW VPN makes the route limit a more serious problem as TGW route table does not summarize Spoke VPC CIDRs when propagating them to on-prem. Unlike the Transit VPC CSR solution or Aviatrix solution where the instance based gateway can summarize
the Spoke VPC CIDRs. As you migrate Transit VPC to TGW, you should be aware of the new route budget. For exampple, if you have 50 Spoke VPCs, your on-prem BGP prefixes should be less than 50. 
If you are already using Cisco CSR to summarize Spoke VPC CIDRs to avoid the route limit, migrating to native TGW will not work.  

AWS publishes Transit Gateway limits at `this link. <https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-limits.html>`_

Below is a list of commonly asked limits and limitations by network engineers.  


===================================================                  =============== =====================
Functions                                                            Limits  	     Comments   
===================================================                  =============== =====================
Propagating on-prem routes to Spoke VPC route table                  not supported   VPC owner's responsibility. Learn more `here <https://docs.aviatrix.com/HowTos/tgw_faq.html#why-should-i-use-aviatrix-tgw-orchestrator-to-build-a-transit-network-architecture>`_
Direct Connect support on TGW                                        not supported   publicly announced in the roadmap
Inter region TGW connectivity                                        not supported
TGW VPN Static                                                       manual          In addition to updating Spoke VPC route table, you need to make sure TGW route table is configured for on-prem routes..
TGW VPN BGP prefix total                                             100             TGW does not summarize Spoke VPC CIDRs routes. The total route limit is aggregated routes from both on-prem and Spoke VPCs. 
Spoke VPC Route entries in a route table                             100             default is 50. Performance impact on 100 routes. 
TGW VPN scaling                                                      reset BGP       Traffic goes down to zero before coming back up with higher throughput.  
===================================================                  =============== =====================



.. |survey| image:: opstools_survey_media/survey.png
   :scale: 30%
   

.. disqus::    
