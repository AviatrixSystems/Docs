.. raw:: html

    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, notranslate, noimageindex">
=========================================================
Is Amazon inter-region peering encrypted?
=========================================================

Yes but not how you would think.

Amazon claims that `All network traffic between regions is encrypted <https://aws.amazon.com/answers/networking/aws-multiple-region-multi-vpc-connectivity/>`_ but what does that really mean, let's dig deeper.

In this `blog <https://aws.amazon.com/blogs/aws/new-almost-inter-region-vpc-peering/>`_, Amazon mentions that they use AEAD to encrypt the data, which is a form of encryption utilized by MACSEC. `MACSEC <https://en.wikipedia.org/wiki/IEEE_802.1AE>`_ refers to encryption for media access at the Layer 1/2 level, or at the Ethernet frame layer. MACSEC has been around for a long time, but it started getting more attention after the Snowden revelations. More and more companies started encrypting their own fibers to make sure that third parties along the fiber stretch couldn't snoop on their data.

This means that the traffic traversing from Amazon Region to the next Region, is encrypted at the layer 2 transport level, and that provides physical level protection of the cable/fiber connecting those regions. This also means that Amazon is holding their end of the `shared responsibility model <https://aws.amazon.com/compliance/shared-responsibility-model/>`_, in that they are not allowing anyone to physically intercept communications.

If Meltdown and Spectre taught us anything is that using shared resources can be potentially insecure. Think about this: the cable is encrypted and protected from physical access, but what about logical protection from one customer to the next?  If your business is subject to data privacy regulations, transmitting data along with other customers might not be the best approach. Granted, the outer layer is encrypted from external third parties, but the logical layers are not encrypted from fellow tenants.

If communication intra region should be secured between your own VPCs to prevent any malicious co-tenant to go snooping on your data, then inter region peering security concerns are no different. Furthermore, you are no longer sharing that link with the few co-tenants of your same compute infrastructure, but with everyone that needs multi-region communications, arguably a bigger number of players.  Also, remember that the intra-region service is also open to other countries, so if you are subject to sovereign regulations then you might want to dig deeper at how your data is being transported and what that means from a regulatory standpoint.

.. disqus::
