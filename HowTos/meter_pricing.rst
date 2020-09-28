.. meta::
   :description: Metered offering pricing
   :keywords: Aviatrix Transit, AWS Transit Gateway, TGW

===============================
Metered AMI Pricing References
===============================

This document describes Aviatrix Metered offering pricing for use cases and scenarios. It applies to both
AWS and Azure Metered AMI offerings. 


1. Multi-cloud Spoke Gateway Attachment
-----------------------------------------

=====================  ==============================  ==============================    ==============================  =============================== 
Spoke gateway types    no HA, no HPE Transit Gateway   yes HA, no HPE Transit Gateway    no HA, yes HPE Transit Gateway  yes HA, yes HPE Transit Gateway
=====================  ==============================  ==============================    ==============================  =============================== 
no HA, no HPE          $0.19/hour/attachment           $0.19/hour/attachment             $0.19/hour/attachment           $0.19/hour/attachment
yes HA, no HPE         $0.19/hour/attachment           $0.38/hour/attachment             $0.19/hour/attachment           $0.38/hour/attachment
no HA, yes HPE         $0.19/hour/attachment           $0.19/hour/attachment             $1.52/hour/attachment           $1.52/hour/attachment
yes HA, yes HPE        $0.19/hour/attachment           $0.38/hour/attachment             $1.52/hour/attachment           $3.04/hour/attachment
=====================  ==============================  ==============================    ==============================  =============================== 

2. Multi-cloud Transit Gateway Peering
-----------------------------------------

Multi-cloud Transit Gateway peering applies to both inter-region and inter-cloud `Aviatrix Transit Gateway peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_.

=============================  =====================================  ====================================== ====================================== ======================================
Transit Gateway types          no HA, no HPE peered Transit Gateway   yes HA, no HPE peered Transit Gateway  no HA, yes HPE peered Transit Gateway  yes HA, yes HPE peered Transit Gateway
=============================  =====================================  ====================================== ====================================== ======================================
no HA, no HPE                  $0.19/hour/attachment                  Not supported                          $0.19/hour/attachment                  Not supported
yes HA, no HPE                 Not supported                          $0.38/hour/attachment                  Not supported                          $0.19/hour/attachment
no HA, yes HPE                 $0.19/hour/attachment                  Not supported                          $1.52/hour/attachment                  Not supported
yes HA, yes HPE                Not supported                          $0.38/hour/attachment                  Not supported                          $3.04/hour/attachment
=============================  =====================================  ====================================== ====================================== ======================================

3. Multi-cloud Transit Gateway Connection to on-prem 
--------------------------------------------------------

========================= ================ ================== ===========================
Transit Gateway types     AWS VGW          External Device    Managed CloudN Appliance
========================= ================ ================== ===========================
no HA, no HPE             $0.19/hour       $0.58/hour         Not supported
yes HA, no HPE            $0.38/hour       $1.16/hour         Not supported
no HA, yes HPE            $0.19/hour       $0.58/hour         $1.52/hour
yes HA, yes HPE           $0.38/hour       $1.16/hour         $3.04/hour
========================= ================ ================== ===========================

4. Cloud Native Spoke Network Attachment
-------------------------------------------

=====================  =======================   ==============================
Native Spoke types     AWS TGW                   Multi-cloud Transit Gateway
=====================  =======================   ==============================
Azure VNet             Not supported             $0.19/hour/attachment
AWS VPC                $0.19/hour/attachment     Not supported
GCP VPC                Not supported             Not supported
=====================  =======================   ==============================

5. Cloud Native Network Peering
---------------------------------

====================================================     ======================
Cloud Native Peering types                               Price
====================================================     ======================
inter-region AWS TGW Peering                             $0.19/hour
AWS VPC Peering                                          $0
Azure VNet Peering                                       $0
====================================================     ======================




.. |deployment| image:: FAQ_media/deployment.png
   :scale: 30%

.. disqus::
