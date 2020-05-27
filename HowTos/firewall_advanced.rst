.. meta::
  :description: Firewall Network Advanced Config
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
FireNet Advanced Config
=========================================================

For questions about FireNet, check out `FireNet FAQ. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_
For questions on FireNet workflow, check out `FireNet Workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_

Traffic Inspection
------------------------------------------------

You can enable and disable traffic inspection. When traffic inspection is disabled, FireNet gateway loops back all packets. 

Egress through Firewall
-----------------------

This is to enable Internet bound egress traffic for inspection. 

Fail Close
-------------

If you enable Fail Close, FireNet gateway drops all traffic when all firewalls are in Down state. 




.. |firewall_domain| image:: firewall_network_workflow_media/firewall_domain.png
   :scale: 30%

.. |gw_launch| image:: firewall_network_workflow_media/gw_launch.png
   :scale: 30%

.. |private_interfaces| image:: firewall_network_workflow_media/private_interfaces.png
   :scale: 30%

.. |panvm_bucket| image:: firewall_network_workflow_media/panvm_bucket.png
   :scale: 30%

.. |fqdn_in_firenet| image:: firewall_network_workflow_media/fqdn_in_firenet.png
   :scale: 30%

.. disqus::
