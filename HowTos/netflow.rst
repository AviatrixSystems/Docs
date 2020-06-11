.. meta::
   :description: Netflow integration
   :keywords: Logging, Netflow, Egress Control, AWS VPC


=================================
 Netflow Integration 
=================================

Starting in release 3.5, Aviatrix Controller and gateways can forward `Netflow <https://en.wikipedia.org/wiki/NetFlow>`_ logs to your designated service point. Netflow V5 is supported. 

To enable, click Settings on the main navigation bar, click Logging, and scroll down to NETFLOW AGENT.

Input the IP address and the port number of the destination Netflow service and click Enable. All gateways will have Netflow enabled by default. You can select a subset of gateways to have Netflow 
enabled in the Advanced option. 

All flows are captured, there is no option to sample a fraction of the packets. 

Both Netflow V5 and V9 are supported. 

. 



.. |discovered_sites| image::  fqdn_discovery_media/discovered_sites.png
   :scale: 50%

.. |fqdn-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-new-tag.png
   :scale: 50%

.. |fqdn-add-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-new-tag.png
   :scale: 50%

.. |fqdn-enable-edit| image::  FQDN_Whitelists_Ref_Design_media/fqdn-enable-edit.png
   :scale: 50%

.. |fqdn-add-domain-names| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-domain-names.png
   :scale: 50%

.. |fqdn-attach-spoke1| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke1.png
   :scale: 50%

.. |fqdn-attach-spoke2| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke2.png
   :scale: 50%


.. add in the disqus tag

.. disqus::
