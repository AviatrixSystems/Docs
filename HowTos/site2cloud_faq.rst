.. meta::
   :description: Site2Cloud Frequently Asked Questions
   :keywords: Aviatrix Site2Cloud, Aviatrix, AWS

============================
Site2Cloud FAQs
============================

What does Site2Cloud do?
----------------------------------

Site2Cloud builds an encrypted connection between two sites over the Internet
in an easy-to-use and template-driven manner. Its workflow is similar to AWS VGW or Azure VPN.  

On one end of the tunnel is an Aviatrix Gateway. The other end could be an on-prem router, firewall, or 
another public cloud VPC/VNet, that the Aviatrix Controller does not manage.  

What are the use cases for Site2Cloud?
----------------------------------------

Here are common use cases:

 - **SaaS provider to its customer site** If you need to move data continuously and securely from customer or partner sites to your SaaS service hosted in AWS, Azure, or Google, building an encrypted tunnel between the customer site and your SaaS service is required. 

 - **Branch offices to cloud** If you have branch offices that need to access applications hosted in AWS or Azure, using Site2Cloud is the most economical way to build a secure tunnel. You can use your existing Internet connection and not have to pay extra to SD-WAN vendors to go through their cloud.

Why should I consider using Aviatrix Site2Cloud?
--------------------------------------------------------------

For a comparative analysis of why you should use Aviatrix, refer to `Site to Cloud Connectivity over Internet <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html#site-to-cloud-connectivity-over-internet>`_. 

In addition, Aviatrix provides a simple point-and-click user interface for you to build and manage a large deployment. 

How do I configure Site2Cloud?
--------------------------------------------

To set up a Site2Cloud connection, refer to `Site2Cloud IPsec VPN Instructions <http://docs.aviatrix.com/HowTos/site2cloud.html>`_.

Does Site2Cloud support HA?
------------------------------------------

Yes. Enable HA when configuring a Site2Cloud connection. 

What are the encryption algorithms supported?
---------------------------------------------------------------

====================================       ================================================================================================================================
**Type**                                   **Value**
====================================       ================================================================================================================================
Phase 1 Authentication                     SHA-1, SHA-512, SHA-384, SHA-256
Phase 1 DH Groups                          1, 2, 5, 14, 15, 16, 17, 18, 19, 20, 21 (20 & 21 IKEv2 Only)
Phase 1  Encryption                        AES-256-CBC, AES-256-GCM-64, AES-256-GCM-96, AES-256-GCM-128, AES-192-CBC, AES-128-CBC, AES-128-GCM-64, AES-128-GCM-96, AES-128-GCM-128, 3DES
Phase 2 Authentication                     HMAC-SHA-1, HMAC-SHA-512, HMAC-SHA-384, HMAC-SHA-256, NO-AUTH
Phase 2 DH Groups                          1, 2, 5, 14, 15, 16, 17, 18, 19, 20, 21 (20 & 21 IKEv2 Only)
Phase 2 Encryption                         AES-128-CBC, AES-192-CBC, AES-256-CBC, AES-256-GCM-64, AES-256-GCM-96, AES-256-GCM-128, AES-128-GCM-64, AES-128-GCM-96, AES-128-GCM-128, 3DES, NULL-ENCR

====================================       ================================================================================================================================

Is IKEv2 supported?
---------------------

Yes.

How frequently are keys rotated?
-------------------------------------------

Re-key for IKE phase 1 is every 8 hours. Re-key for IKE phase 2 is every hour. 

Can you configure a Site2Cloud connection using the same public IP address for the remote gateway and the remote subnet?
------------------------------------------------------------------------------------------------------------------------------------------------------------

Yes. In a Site2Cloud connection, the same IP address in the remote gateway peer and the remote subnet is supported.  This is useful when configuring a Site2Cloud connection to a third-party environment where only one public IP is exposed.

This feature is supported only for policy-based unmapped Site2Cloud connections in AWS and GCP for standalone gateways, not ActiveMesh gateways.

Are there configuration examples with other devices?
--------------------------------------------------------------------

Aviatrix Site2Cloud supports all types of on-prem, firewall, and router devices that
terminate VPN connections. Below are the configuration examples for specific devices.

    - `Azure VPN Gateway <./avxgw_azurevpngw_site2cloud.html>`_
    - `AWS VGW <./site2cloud_awsvgw.html>`_
    - `pfSense IPsec VPN <./CloudToPfSense.html>`__
    - `Palo Alto Next-Gen Firewall (PAN) <./S2C_GW_PAN.html>`__
    - `Check Point Firewall <./S2C_GW_CP.html>`__
    - `Cisco ASA <./S2C_GW_ASA.html>`__
    - `FortiGate <./site2cloud_fortigate.html>`__
    - `Cisco Meraki MX64 <./site2cloud_meraki.html>`__
    - `Cisco ISR <./S2C_GW_IOS.html>`__
    - `Cisco Meraki vMX100 <./site2cloud_meraki_vmx100.html>`_
    - `Aviatrix Gateway <./site2cloud_aviatrix.html>`_

Are there any Tech Notes on solving overlapping IP addresses?
-----------------------------------------------------------------------------

Below are the Tech Notes that demonstrate how to solve overlapping IP addresses.

  - `Site2Cloud with customized SNAT <https://docs.aviatrix.com/HowTos/s2c_vgw_snat.html>`_.
  - `Site2Cloud for overlapping IP addresses <https://docs.aviatrix.com/HowTos/s2c_overlapping_subnets.html>`_.
  - `Site2Cloud to public IP addresses <https://docs.aviatrix.com/HowTos/s2c_for_publicIP.html>`_.
  - `How to build site to site connection <https://docs.aviatrix.com/HowTos/site_to_site_vpn.html>`_
  - `Connecting offices to multiple VPCs using AWS Peering <https://docs.aviatrix.com/HowTos/simpletransit.html>`_
  - `Connect Networks with Overlap CIDRs <https://docs.aviatrix.com/HowTos/connect_overlap_cidrs.html>`_
  - `Connect Overlapping VPC to On-prem <https://docs.aviatrix.com/HowTos/connect_overlap_vpc_via_VGW.html>`_
  
How to troubleshoot Site2Cloud connection with IKEv2?
------------------------------------------------------------------------

Refer to `Troubleshooting IPsec VPN connection with IKEv2 <https://docs.aviatrix.com/HowTos/troubleshooting_ipsec_vpn_connection_with_ikev2.html>`_.

.. |image1| image:: FAQ_media/image1.png

.. disqus::
