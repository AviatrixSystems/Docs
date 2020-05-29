.. meta::
  :description: Firewall Network Advanced Config
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
FireNet Advanced Config
=========================================================

For questions about FireNet, check out `FireNet FAQ. <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_
For questions on FireNet workflow, check out `FireNet Workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_

Firewall Health Check and Failover Detection using LAN Interface
---------------------------------------------------------------------
By default, Aviatrix Controller check the firewall's health by pinging the firewall's management IP address. In 6.0, firewall instance’s health can also be checked by pinging its LAN interface from the connecting Aviatrix FireNet gateway. This is an alternative approach which improves firewall failure detection time and detection accuracy.

.. note::
    - Firewall's failure detection by using LAN interface will be approx. 5 sec.
    - It also detects the data-plane failure
    - This enhancement is cloud and firewall vendors agnostic, and supported for Transit FireNet and FireNet both.

How to enable LAN Side ICMP Firewall Health Check?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Firewall Network --> Advance --> Click the 3 vertical dots as shown below:

|firewall_advanced_lan_1|

The expanded view shows the firewall deployed by the Aviatrix controller and towards the end of screen shot, one can enable/disable LAN side Health Check.

|firewall_advanced_lan_ping|

Verify LAN Side ICMP Health Check
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In this example AWS and Check Point used to demonstrate the functionality as shown below:

|example_topology_lan_ping|

Go to Check Point logs and Monitoring section, notice that the ICMP health check is initiated every 5 second from the Aviatrix Transit FireNet gateways. The 5 second setting is the default and cannot be changed.

|cp_icmp_lan_example|

Traffic Inspection
------------------------------------------------

You can enable and disable traffic inspection. When traffic inspection is disabled, FireNet gateway loops back all packets. 

Egress through Firewall
-----------------------

This is to enable Internet bound egress traffic for inspection. 

Fail Close
-------------

If you enable Fail Close, FireNet gateway drops all traffic when all firewalls are in Down state. 




.. |firewall_advanced_lan_1| image:: firewall_network_workflow_media/firewall_advanced_lan_1.png
   :scale: 30%

.. |firewall_advanced_lan_ping| image:: firewall_network_workflow_media/firewall_advanced_lan_ping.png
   :scale: 30%

.. |example_topology_lan_ping| image:: firewall_network_workflow_media/example_topology_lan_ping.png
   :scale: 30%

.. |cp_icmp_lan_example| image:: firewall_network_workflow_media/cp_icmp_lan_example.png
   :scale: 30%

.. |fqdn_in_firenet| image:: firewall_network_workflow_media/fqdn_in_firenet.png
   :scale: 30%

.. disqus::
