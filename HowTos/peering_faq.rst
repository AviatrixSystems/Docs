.. meta::
   :description: UCC Frequently Asked Questions
   :keywords: Aviatrix encrypted peering, multi-cloud peering

===========================
Peering FAQ
===========================


What does Aviatrix encrypted peering do?
-----------------------------------------------------

Aviatrix encrypted peering builds an encrypted tunnel between two
VPC/VNets with a single click. In addition to building the encrypted connection,
the Controller also programs the cloud infrastructure routing table so that
you don't have to.

The VPC and/or VNet can be across regions
and across the cloud. The solution enables you to build an
encrypted network. You can enable stateful firewalls on each VPC/VNet to
add additional security measures.

When should I consider using Aviatrix encrypted peering?
------------------------------------------------------------------------

See `this document <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html#cloud-to-cloud-peering>`_.

How do I configure encrypted peering?
---------------------------------------

1. Gateway > **+New Gateway** in one existing VPC/VNet. VPN access may be disabled.
2. Repeat Step 1 with a different VPC ID or VNet Name.
3. At Peering > Encrypted Peering > **+New Peering**. Select the two gateway names and click **OK**.

Is native AWS Peering supported?
------------------------------------------

Yes, you can configure AWS intra region peering and inter-region peering where it is available 
from the Controller. Go to Peering > AWS Peering.

Cross accounts are supported. 

How do I configure encrypted peering with ActiveMesh and Insane Mode both enabled?
------------------------------------------------------------------------------------

You can configure an encrypted peering with ActiveMesh and Insane Mode by going through the `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, as described in the following steps. 

 1. Go to Transit Network > Setup > Step 4, Launch a Spoke Gateway to launch the primary Spoke Gateway. Select ActiveMesh. Select Insane Encryption.
 #. Go to Transit Network > Setup > Step 5, Enable HA to launch the HA gateway for the Spoke Gateway created in the above step.
 #. Repeat the above two steps for the peering VPC/VNet. 
 #. Go to Peering > Encrypted Peering, +Add New. Select the two primary gateways created in the above steps. Select HA. Click **OK**. 

Note that both primary gateway and backup gateway forward traffic. The VPC/VNet route tables are divided so that half of the route tables 
point the peered VPC/VNet CIDR to the primary gateway and the other half of the route tables point the peered VPC/VNet CIDR to the HA gateway. This
division is best effort. 

Each gateway runs ECMP to the peered gateways.  

What is the encryption algorithm for encrypted peering? 
---------------------------------------------------------

Phase 1:
  - Authentication: SHA-256
  - DH group: 14
  - Encryption: AES-256-CBC

Phase 2:
   - Authentication: AES-128-GCM-96
   - Encryption: AES-128-GCM-96


.. |image1| image:: FAQ_media/image1.png

.. disqus::
