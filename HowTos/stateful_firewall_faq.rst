

.. raw:: html

   <style>
    /* override table no-wrap */
   .wy-table-responsive table td, .wy-table-responsive table th {
       white-space: normal !important;
   }
   </style>

=================================
 Stateful Firewall FAQ
=================================

What is the Aviatrix Stateful Firewall?
--------------------------------------------------

Aviatrix Stateful Firewall is a feature on the Aviatrix Gateway. 
It is a L4 stateful firewall that filters network CIDR, protocol, and port on the packet forwarding path. 

The stateful firewall allows each individual rule to be defined as Allow, Deny and Force Drop, in addition to a base rule. 

.. note:: Aviatrix recommends that you not use the Stateful Firewall feature in HA pairs because the gateways do not synchronize the firewall state.


Is there a limitation on the number of tags?
----------------------------------------------------------

There is no limitation on the number of tags. 

How do I configure a stateful firewall?
-------------------------------------------------------

Follow the instructions described `here <https://docs.aviatrix.com/HowTos/tag_firewall.html>`_.


.. |egress_overview| image::  FQDN_Whitelists_Ref_Design_media/egress_overview.png
   :scale: 30%

.. |fqdn| image::  FQDN_Whitelists_Ref_Design_media/fqdn.png
   :scale: 50%

.. |fqdn-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-new-tag.png
   :scale: 50%

.. |fqdn-add-new-tag| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-new-tag.png
   :scale: 50%

.. |fqdn-enable-edit| image::  FQDN_Whitelists_Ref_Design_media/fqdn-enable-edit.png
   :scale: 50%

.. |fqdn-add-domain-names| image::  FQDN_Whitelists_Ref_Design_media/fqdn-add-domain-names.png

.. |fqdn-attach-spoke1| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke1.png
   :scale: 50%

.. |fqdn-attach-spoke2| image::  FQDN_Whitelists_Ref_Design_media/fqdn-attach-spoke2.png
   :scale: 50%

.. |export| image::  FQDN_Whitelists_Ref_Design_media/export.png
   :scale: 50%

.. |fqdn_in_firenet| image:: firewall_network_workflow_media/fqdn_in_firenet.png
   :scale: 30%

.. add in the disqus tag

.. disqus::
