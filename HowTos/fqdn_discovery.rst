.. meta::
   :description: FQDN Discovery reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


=================================
 Egress FQDN Discovery
=================================

Discover what Internet sites your apps visit before you configure `Egress FQDN Filter <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

.. tip::

 If you already know the sites you apps visit or the FQDN names you need to apply, skip the Discovery step. 

Go to Security > Egress Control > Egress FQDN Discovery. Select a gateway from the dropdown menu and click **Start**. The monitoring will start, click **Show** at any time to see the captured destination sites. Click **Stop** to stop the entire Discovery process.

Start 
---------------

When you click **Start**, the Controller will automatically enable SNAT function on the gateway. 
The Controller looks for all private subnets in the VPC/VNet and replaces any 0.0.0.0/0 > NAT Gateway to 
instead point to the Aviatrix Gateway.

.. Important::

  During the Discovery step, the `Exception Rule <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html#exception-rule>`_ must be enabled (the checkbox should be marked, which is the default setting).

Stop
----------

When you click **Stop**, the VPC/VNet private route table entry for the default route (0.0.0.0/0) will be
restored to its previous setting.

Show
----------

While the Discovery is in progress, click **Show** at any time to see the captured destination sites.

Download
------------------

Click **Download** during or after the Discovery, the destination list will be downloaded. You can later 
import the list to configure the `FQDN Filter <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_.

Note that if a gateway is already attached to a FQDN tag, you cannot run the Discovery process, but you can view FQDN results immediately by going to Step 4, Egress FQDN View Log.


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
