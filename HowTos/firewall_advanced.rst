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


Step 1: Enable ICMP on Firewall Devices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


**Palo Alto Network**
~~~~~~~~~~~~~~~~~~~~~~

Go to Network -> Network Profiles -> Interface Mgmt, create profile to allow ping

|pan_network_profile|

Next, Go to Network -> Interfaces, select **"Ethernet 1/2"**, go to Advanced tab -> Management Profile and select the profile just created in above step

|pan_lan_attach|

Commit changes

**Panoroma**
~~~~~~~~~~~~~~~~~

Configure stack similar to Palo Alto Network shown above.

**Check Point**
~~~~~~~~~~~~~~~~~~~~~

Go to SmartConsole -> Global Properties -> Firewall -> Accept ICMP requests.

|cp_ping_enable_1|

|cp_ping_enable_2|

**Fortigate (Fortinet)**
~~~~~~~~~~~~~~~~~~~~~~~~~~`

Go to Network -> Interfaces -> Edit Interface -> Check "PING" box

|fortigate_example_ping|

Step 2: Configure Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Firewall Network --> Advanced --> Click the 3 vertical dots as shown below:

|firewall_advanced_lan_1|

The expanded view shows the firewall deployed by the Aviatrix controller and towards the end of screen shot, one can enable/disable LAN side Health Check.

|firewall_advanced_lan_ping|


Step 3: Verify LAN Side ICMP Health Check
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In this example, AWS and Check Point used to demonstrate the functionality as shown below:

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

.. |pan_network_profile| image:: firewall_network_workflow_media/pan_network_profile.png
   :scale: 30%

.. |pan_lan_attach| image:: firewall_network_workflow_media/pan_lan_attach.png
   :scale: 30%

.. |cp_ping_enable_1| image:: firewall_network_workflow_media/cp_ping_enable_1.png
   :scale: 30%

.. |cp_ping_enable_2| image:: firewall_network_workflow_media/cp_ping_enable_2.png
   :scale: 30%

.. |fortigate_example_ping| image:: firewall_network_workflow_media/fortigate_example_ping.png
   :scale: 30%

.. disqus::
