.. meta::
   :description: AWS Network Limits
   :keywords: VPC limits, AWS Route limits, AWS Peering limits, VPN Limits, AWS Network limits, SMTP 


===========================================================================================
AWS Network Limits and Limitations
===========================================================================================

It is good to know about the AWS network limits both for planning and troubleshooting: you can build your architecture that allows you to overcome these limits; it saves you time of troubleshooting 
when there is a failure or downtime in your network. 

For example, AWS VGW carries a hard limit of 100 BGP routes in total. When the BGP prefixes exceed 100, VGW randomly resets BGP session, leading to unpredictable potential network downtime. 

AWS publishes a VPC limits at `this link. <https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html>`_

In addition to limits, there are limitations in functionality. 

Below is a list of commonly asked limits and limitations by network engineers.  


========================================  =============== =====================
Functions                                 Limits  	  Comments   
========================================  =============== =====================
VPC Peering Limit per VPC                 125             default limit is 50. Constrained also by route limit of 100
VPC Route entries in a route table        100             default is 50. Performance impact on 100 routes. 
BGP prefix total on VGW                   100             exceeding the limit results in random BGP resets 
VGW instance size scaling                 reset BGP       trigger a BGP downtime 
DNAT function in VGW                      not available   
SNAT function in VGW                      not available   
NAT Gateway policies                      not available
VPN connections per VPC                   10
VPN traffic initiation                    from on-prem    traffic must be initiated from on-prem to establish VPN tunnel with VGW
DXGW cross accounts                       not available
VIF per Direct Connect                    50
NLB for UDP traffic                       not available
Inter region peering MTU size             1500 bytes
Outgoing SMTP traffic on port 25          throttled       you can send request to lift the throttle.
========================================  =============== =====================


 




.. |survey| image:: opstools_survey_media/survey.png
   :scale: 30%
   

.. disqus::    
