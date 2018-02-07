.. meta::
   :description: UCC Frequently Asked Questions
   :keywords: Aviatrix encrypted peering, multi cloud peering

===========================
Peering FAQ
===========================


What does Aviatrix encrypted peering do?
-----------------------------------------

Aviatrix encrypted peering builds an encrypted tunnel between two
VPC/VNet with a single click. In addition to build the encrypted connection,
the controller also program the cloud infrastructure routing table so that
you don't have to.

The VPC and/or VNet can be across region
and across cloud. The solution enables you to build an
encrypted network. You can enable stateful firewalls on each VPC/VNet to
add additional security measures.

When should I consider using Aviatrix encrypted peering?
---------------------------------------------------------

Check `this link. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html#cloud-to-cloud-peering>`_

How do I configure encrypted peering?
---------------------------------------


	Step 1: Gateway -> +New Gateway in one existing VPC/VNet. VPN
	access may be disabled.

	Step 2: Repeat Step 1 with a different VPC ID or VNet Name.

	Step 3: At Peering -> Encrypted Peering -> +New Peering. Select the two
	gateway names and click OK.

Is native AWS Peering supported?
--------------------------------

Yes, you can configure AWS intra region peering and inter region peering where it is available 
from the Controller console. Go to Peering -> AWS Peering.

Cross accounts are supported. 



.. |image1| image:: FAQ_media/image1.png

.. disqus::
