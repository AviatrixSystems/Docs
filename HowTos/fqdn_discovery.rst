.. meta::
   :description: FQDN Discovery reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


=================================
 Egress FQDN Discovery 
=================================

Discover what Internet sites your apps visit before you configure `Egress FQDN Filter <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

.. tip::

 If you already know the sites you apps visit, you can skip this step. 

Go to Security -> Egress Control -> Egress FQDN Discovery. Select a gateway from the drop down menu (The gateway needs to have `SNAT <https://docs.aviatrix.com/HowTos/gateway.html?highlight=SNAT#enable-nat>`_ enabled), click Start. The monitoring will start, click Show at any time to see the captured destination sites. Click Stop to stop the entire Discovery process.

Note if a gateway is already attached to a FQDN tag, you cannot run discovery process, but you can view FQDN results immediately by going to Step 4 "Egress FQDN View Log". 


|discovered_sites|


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
