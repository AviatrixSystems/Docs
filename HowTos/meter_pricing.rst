.. meta::
   :description: Metered offering pricing
   :keywords: Aviatrix Transit, AWS Transit Gateway, TGW

===============================
Metered AMI Pricing Book
===============================

This document describes Aviatrix Metered offering pricing for use cases and scenarios. It applies to both
`AWS Metered AMI <https://aws.amazon.com/marketplace/pp/prodview-leh6ufnwbl6eo>`_ 
and `Azure Metered AMI <https://azuremarketplace.microsoft.com/en-us/marketplace/apps/aviatrix-systems.aviatrix-controller-saas?tab=Overview>`_ offerings. 

General license and pricing mapping is as follows:

::

  1 inter-cloud license = $0.70/hour
  1 intra-cloud license = 0.23/hour
  1 security service license = $0.23/hour
  1 user VPN license = $0.045/hour

Some common notions described in the following sessions:

::

   no HA - One gateway, HA gateway is not deployed.
   yes HA - One gateway and its HA gateway are deployed.
   no HPE - HPE (Insane Mode) is not enabled on the gateway. 
   yes HPE - HPE (Insane Mode) is enabled on the gateway. 
   yes SameCloud - In Spoke to Transit scenario, both gateways are in the same cloud. 
                   In Transit Gateway Peering scenario, both Transit Gateways are in the same cloud. 
   no SameCloud - A Spoke gateway and Transit Gateway are in the different clouds, 
                  or two Transit Gateways are in the different clouds. 
 

.. note ::

  When launching a selected t3 series gateway instance in AWS with Insane Mode option enabled, HPE license is **not** applied. The selected t3 series instances are: t3a.xlarge, t3a.medium, t3a.small, t3.large, t3.medium, t3.small. 
 
 
 
 
 
 

1. Multi-cloud Spoke Gateway Attachment
-----------------------------------------

===============================      ==============================  ==============================    ==============================  =============================== 
Spoke gateway types                  no HA, no HPE Transit Gateway   yes HA, no HPE Transit Gateway    no HA, yes HPE Transit Gateway  yes HA, yes HPE Transit Gateway
===============================      ==============================  ==============================    ==============================  =============================== 
no HA, no HPE, yes SameCloud         1 intra-cloud license           1 intra-cloud license             1 intra-cloud license           1 intra-cloud license
yes HA, no HPE, yes SameCloud        1 intra-cloud license           2 intra-cloud licenses            1 intra-cloud license           2 intra-cloud licenses
no HA, yes HPE, yes SameCloud        1 intra-cloud license           1 intra-cloud license             8 intra-cloud licenses          8 intra-cloud licenses 
yes HA, yes HPE, yes SameCloud       1 intra-cloud license           2 intra-cloud licenses            8 intra-cloud licenses          16 intra-cloud licenses
no HA, no HPE, no SameCloud          1 inter-cloud license           1 inter-cloud license             1 inter-cloud license           1 inter-cloud license
yes HA, no HPE, no SameCloud         1 inter-cloud license           2 inter-cloud licenses            1 inter-cloud license           2 inter-cloud licenses
no HA, yes HPE, no SameCloud         1 inter-cloud license           1 inter-cloud license             1 inter-cloud license           1 inter-cloud license
yes HA, yes HPE, no SameCloud        1 inter-cloud license           2 inter-cloud licenses            1 inter-cloud license           2 inter-cloud licenses
===============================      ==============================  ==============================    ==============================  =============================== 

2. Multi-cloud Transit Gateway Peering
-----------------------------------------

Multi-cloud Transit Gateway peering applies to both inter-region and inter-cloud `Aviatrix Transit Gateway peering <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html>`_.

===============================  =====================================  ====================================== ====================================== ======================================
Transit Gateway types            no HA, no HPE peered Transit Gateway   yes HA, no HPE peered Transit Gateway  no HA, yes HPE peered Transit Gateway  yes HA, yes HPE peered Transit Gateway
===============================  =====================================  ====================================== ====================================== ======================================
no HA, no HPE, yes SameCloud     1 intra-cloud license                  Not supported                          1 intra-cloud license                  Not supported
yes HA, no HPE, yes SameCloud    Not supported                          2 intra-cloud licenses                 Not supported                          2 intra-cloud licenses
no HA, yes HPE, yes SameCloud    1 intra-cloud license                  Not supported                          8 intra-cloud licenses                 Not supported
yes HA, yes HPE, yes SameCloud   Not supported                          2 intra-cloud licenses                 Not supported                          16 intra-cloud licenses
no HA, no HPE, no SameCloud      1 inter-cloud license                  Not supported                          1 inter-cloud license                  Not supported
yes HA, no HPE, no SameCloud     Not supported                          2 inter-cloud licenses                 Not supported                          2 inter-cloud licenses
no HA, yes HPE, no SameCloud     1 inter-cloud license                  Not supported                          8 inter-cloud licenses                 Not supported
yes HA, yes HPE, no SameCloud    Not supported                          2 inter-cloud licenses                 Not supported                          16 inter-cloud licenses
===============================  =====================================  ====================================== ====================================== ======================================

3. Multi-cloud Transit Gateway Connection to on-prem 
--------------------------------------------------------

========================= ======================    ======================      ===========================
Transit Gateway types     AWS VGW                   External Device             Managed CloudN Appliance
========================= ======================    ======================      ===========================
no HA, no HPE             1 inter-cloud license     1 inter-cloud license       Not supported
yes HA, no HPE            2 inter-cloud licenses    2 inter-cloud licenses      Not supported
no HA, yes HPE            1 inter-cloud license     1 inter-cloud license       8 intra-cloud licenses
yes HA, yes HPE           2 inter-cloud licenses    2 inter-cloud licenses      16 intra-cloud licenses
========================= ======================    ======================      ===========================

4. Native Spoke Network Attachment
-------------------------------------------

Native Spoke refers to a spoke VPC or VNet in a hub-and-spoke architecture. In this scenario, there is no Aviatrix Spoke gateway deployed in the Spoke network. 

=====================  =======================   ==============================
Native Spoke types     AWS TGW                   Multi-cloud Transit Gateway
=====================  =======================   ==============================
Azure VNet             Not supported             1 intra-cloud license
AWS VPC                1 intra-cloud license     Not supported
GCP VPC                Not supported             Not supported
=====================  =======================   ==============================

5. Cloud Native Network Peering
---------------------------------

====================================================     ======================
Cloud Native Peering types                               License
====================================================     ======================
inter-region AWS TGW Peering                             1 intra-cloud license
AWS VPC Peering                                          0 intra-cloud license
Azure VNet Peering                                       0 intra-cloud license
====================================================     ======================

6. FQDN Egress Control
-------------------------

====================================================     ===========================
Aviatrix gateway types                                   FQDN Function configured
====================================================     ===========================
no HA                                                    1 security-service license
yes HA                                                   2 security-service licenses
3 AZ                                                     3 security-service licenses
====================================================     ===========================

7. Site2Cloud 
---------------

====================================================     ======================
Aviatrix gateway types                                   Site2Cloud configured
====================================================     ======================
no HA                                                    1 inter-cloud license
yes HA                                                   2 inter-cloud licenses
====================================================     ======================

8. PrivateS3
-------------------------

====================================================     ==============================
Aviatrix gateway types                                   PrivateS3 Function configured
====================================================     ==============================
no HA                                                    1 security-service license
N number of gateways                                     N security-service licenses
====================================================     ==============================

9. User VPN
-------------

====================================================     ======================
Aviatrix gateway                                         User VPN configured
====================================================     ======================
1 active user connection                                 1 user license
====================================================     ======================


.. |deployment| image:: FAQ_media/deployment.png
   :scale: 30%

.. disqus::
