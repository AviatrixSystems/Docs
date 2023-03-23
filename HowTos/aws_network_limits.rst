

===========================================================================================
AWS Network Limits and Limitations
===========================================================================================

It is good to know about the AWS network limits both for planning and troubleshooting: you can build your architecture to allow you to overcome these limits and it saves you time of troubleshooting 
when there is a failure or downtime in your network. 

For example, an AWS VGW carries a hard limit of 100 BGP routes in total. When the BGP prefixes exceed 100, VGW randomly resets the BGP session, leading to unpredictable potential network downtime. 

AWS publishes VPC limits at `this link. <https://docs.aws.amazon.com/vpc/latest/userguide/amazon-vpc-limits.html>`_

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
VPN traffic initiation                    from on-prem    traffic must be initiated from on-prem to establish a VPN tunnel with VGW
VIF per Direct Connect                    50
Inter region peering MTU size             1500 bytes      unlike intra region peering, there is no jumbo frame support, therefore inter region performance is maxed out at 5Gbps.
Outgoing SMTP traffic on port 25          throttled       you can send a request to lift the throttle.
========================================  =============== =====================


 




.. |survey| image:: opstools_survey_media/survey.png
   :scale: 30%
   

.. disqus::    
