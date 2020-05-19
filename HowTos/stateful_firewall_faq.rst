.. meta::
   :description: FQDN whitelists reference design
   :keywords: FQDN, whitelist, Aviatrix, Egress Control, AWS VPC


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

What is Aviatrix Stateful Firewall?
---------------------------------------

Aviatrix stateful firewall is feature on the Aviatrix gateway. 
It is a L4 stateful firewall that filters network CIDR, protocol and port on the packet forwarding path. 

The stateful firewall allows each individual rule to be defined as Allow, Deny and Force Drop, in addition to a base rule. 

How many rules can be configured on a gateway?
------------------------------------------------

Currently you can configure up to 500 rules on each gateway. This limitation is not due to the lack of capacity in the gateways, but is 
because of the implementation of how rules are sent to the gateways. 

In the next release (5.2), the limitation will be removed. 

What is the API to configure stateful firewall?
--------------------------------------------------------

The API for the stateful firewall can be found `here. <https://api.aviatrix.com/?version=latest#ce6b766f-4d4a-4e68-8419-4b93fa6281b4>`_.

Follow the example in the API doc to setup multiple rules. 

Currently the API call requires you to input the entire set of the rules for each call. There is no incremental append or delete
functions. 

In the next release (5.2), there will be new APIs to append new rules and delete a specific rule. 

Is there limitation on the number of tags?
--------------------------------------------

There is no limitation on the number of tags. 

How to configure stateful firewall?
---------------------------------------

Follow the instructions described in `this link. <https://docs.aviatrix.com/HowTos/tag_firewall.html>`_


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
