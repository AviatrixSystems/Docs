.. meta::
  :description: Aviatrix China Product Overview
  :keywords: cloud networking, aviatrix, IPsec VPN, Global Transit Network, site2cloud

=============================================
Aviatrix China Overview
=============================================

What Features Are Supported in Which China Region Cloud?
========================================================

+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| **Feature**                                                            | **AWS China** | **Azure China** | **Alibaba China Regions** |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Controller Marketplace Launch                                          | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| CoPilot Marketplace Launch                                             | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Transit Gateway Peering                                                | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Multi Accounts                                                         | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Transit Network Spoke and Transit Gateways                             | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Transit to External IPsec Devices                                      | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Site2Cloud VPN for All Gateways                                        | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Create a VPC                                                           | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Terraform                                                              | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Backup and Restore                                                     | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Logging Service Integration (Rsyslog, Netflow, and CloudWatch)         | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Native Peering                                                         | Yes           | Yes             | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| FlightPath Expert Diagnostics                                          | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| VPC Tracker                                                            | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Controller Security Group Management                                   | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Launch Controller with CloudFormation                                  | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Firewall Network                                                       | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Firenet                                                                | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Insane Mode Encryption                                                 | Yes           | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Managed CloudN                                                         | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Transit to AWS VGW                                                     | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| BGP over LAN                                                           | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| BGP over GRE                                                           | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| AWS TGW                                                                | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| FQDN Egress Control                                                    | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Stateful Firewall                                                      | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Advanced NAT                                                           | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Remote Access User VPN (OpenVPN)                                       | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| PrivateS3                                                              | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| IPv6                                                                   | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Controller Migrate                                                     | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Logging Service Integration (Splunk, Firebeat, Sumologic, and Datadog) | No            | No              | No                        |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+
| Network Segmentation						     | Yes           | Yes             | Yes                       |
+------------------------------------------------------------------------+---------------+-----------------+---------------------------+


What is Aviatrix China Design Assumption?
============================================

- Aviatrix Controller in Global cannot deploy China gateway

- Aviatrix Controller in China cannot deploy Global gateway


What is China Multi-Cloud Network Coverage?
============================================

You must overcome performance limitations and satisfy government requirements to create a global multi-cloud network that includes the China region. 
Slow connection speeds and high-latency associated with the China region can be overcome by using a dedicated line to create an Aviatrix transit connection 
and deploying services close to the China region. To satisfy legal regulations in China you must have an Internet Content Provider (ICP) license.

For more information, see What is a China ICP License.

What is a China ICP License?
============================

Regulations in China require you to acquire an Internet Content Provider (ICP) license from the government and register the license with your CSP 
to provide internet services in China. In China, an ICP license is required to establish SSL connections between different regions, ISPs, CSPs, or to 
cross national borders. Aviatrix supports transit gateways using AWS China, Azure China, and Alibaba multi-cloud networks in the China region.
Obtaining and implementing an ICP is a process and you should follow the directions of your compliance experts. 

There are some general guidelines Aviatrix recommends following to implement a multi-cloud network in the China region.
 
 - Create or use a Legal Entity in China to apply for the ICP license.
 
 - Apply for a Legal Domain name in the China Registration.
 
 - Acquire the ICP certificate from the China Ministry of Industry and Information Technology (MIIT).
 
 - Register the ICP certificate with your to CSP in the China region.
 
 - Use dedicated lines from certified telecom carries for connections between China and the rest of the world.
 
 - Deploy the Aviatrix Controller, CoPilot, and Multi-Cloud Network in China.

What issue will hit if the company doesn't follow China Regulation?
===================================================================

Both Aviatrix Controller and Gateway in the China region cannot communicate to each other properly.

How to find Aviatrix Controller and CoPilot on China Marketplace?
===================================================================

- Login AWS China Portal

- Navigate to AWS marketplace for Ningxia and Beijing Region

- Search for the keyword "Aviatrix"

  |aviatrix_aws_china_marketplace|
  
.. Note:: Both Aviatrix Controller and CoPilot are published on AWS China Marketplace only.
..

Where is the URL for Aviatrix Controller and CoPilot on China Marketplace?
===========================================================================

- `Aviatrix Secure Networking Platform - BYOL <https://awsmarketplace.amazonaws.cn/marketplace/pp/prodview-tr55yz2zpuzlo>`_

- `Aviatrix CoPilot - BYOL <https://awsmarketplace.amazonaws.cn/marketplace/pp/prodview-m73cvirso7uu6>`_

Where is the URL to launch Aviatrix Controller from AWS CloudFormation in AWS China?
=====================================================================================

- `aws-china-cloudformation-aviatrix-controller-and-IAM-setup-BYOL.template <https://cn-northwest-1.console.amazonaws.cn/cloudformation/home?region=cn-northwest-1#/stacks/new?stackName=AviatrixController&templateURL=https://aviatrix-public-download.s3.cn-north-1.amazonaws.com.cn/aws-china/cloudformation-templates/aviatrix-controller-and-IAM-setup-CFT/aviatrix-controller-and-IAM-setup-cft-BYOL.template>`_

What is the design recommendation for China region?
====================================================

  |aviatrix_design_recommendation_china|

What is the design recommendation to build connectivity between China and Global regions?
=========================================================================================

  |aviatrix_design_recommendation_china_global|

.. |aviatrix_design_recommendation_china| image:: aviatrix_china_overview_media/aviatrix_design_recommendation_china.png
   :scale: 50%

.. |aviatrix_design_recommendation_china_global| image:: aviatrix_china_overview_media/aviatrix_design_recommendation_china_global.png
   :scale: 50%
   
.. |aviatrix_aws_china_marketplace| image:: aviatrix_china_overview_media/aviatrix_aws_china_marketplace.png
   :scale: 50%
   
.. disqus::
