

###################################
Diagnostics
###################################

Network
---------

This section provides tools to test the network connectivity of the Aviatrix Controller and Gateways.


Gateway Utility
~~~~~~~~~~~~~~~~~

This section provides Traceroute, Ping, and Tracepath tools to test network connectivity for Aviatrix Gateways.    


Network Connectivity Utility
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Network Connectivity tool allows you to test if the Aviatrix Controller or Gateway is able to reach a host with a specified protocol and port number.

.. note:: Network connectivity tests using UDP protocol cannot be used to reliably determine connectivity as load balancers or security groups could consume the UDP packet, indicating a false positive. A UDP test that says success does not gurantee UDP connectivity. However, a UDP test showing failure means there are issues with UDP connectivity.

Packet Capture
~~~~~~~~~~~~~~~~

This tool enables a gateway to capture the forwarding packets for a period of time with the specified host, port, network interface, and packet length.

Here are some Wireshark tips:

 1. **Sort the conversations** On Wireshark, go to **Statistics** > **Conversations**. All Conversations captured are displayed in the pop-up window. For each conversation, it shows how many bytes are transferred in which direction. 

 2. **Filter on conversation** From the above pop-up window, select one conversation. Right-click on the conversation, select **Apply as Filter** > A <-> B. The Wireshark capture window will automatically filter the other conversation out. 


 3. **View Throughput** On Wireshsark, go to **Statistics** > **TCP Stream Graphs** > **Throughput**. The Throughput for this TCP session will be displayed in a pop-up window. 

An example screenshot on conversation filtering is shown as below. 

|wireshark_filter|


Controller Utility
~~~~~~~~~~~~~~~~~~~~

This tool allows the Aviatrix Controller to perform a ping test to a specific host to run a network connectivity test.


Controller IP Migration
~~~~~~~~~~~~~~~~~~~~~~~~~

The Controller IP Migration feature enables you to migrate your Controller’s IP address to a new IP address after you associate a new IP address in AWS, Azure, GCP, or OCI or through API.
Use this feature if your Controller does not use an EIP (Elastic IP) address, load balancer, or FQDN, and you take one or more of the following actions:

* Restart or reboot your Controller.
* Restore your Controller from backup.
* Reassociate your Controller’s IP address.

In these cases, use this feature to migrate the Controller’s IP address so that the gateways managed by this Controller have the correct IP address.
Most accounts use an EIP or FQDN and therefore do not need to use the Controller IP Migration feature.


Remote Support 
~~~~~~~~~~~~~~~~~

By enabling Remote Support, you grant privileged level access to your Aviatrix Controller and any connected Aviatrix gateways to the Aviatrix Support team. This establishes a trusted connection between your Controller and the Aviatrix diagnostic server for diagnostic purposes.

When Remote Support is enabled, an Aviatrix software engineer may run scripts and CLI debugging commands on the Controller and on any connected gateways, to triage issues. This access persists until you disable Remote Support. 

You must disable the Remote Support option when the debugging session is complete. When Remote Support is disabled, all trusted sessions and the underlying process enabling the trusted connection are immediately terminated on your Controller and gateways. This prevents further access to your Controller and gateways. 

Controller Public IP
~~~~~~~~~~~~~~~~~~~~~~

This section displays the current public IP of the controller.


.. raw:: html

   <hr width="%80"/>


Gateway
---------

Diagnostics
~~~~~~~~~~~~~~

Refer to `Run diagnostics on a gateway. <http://docs.aviatrix.com/HowTos/troubleshooting.html>`__


Force Upgrade
~~~~~~~~~~~~~~~


.. note:: The Force Upgrade feature is not supported from Release 6.5 and onwards. For Gateway upgrades, refer to `Upgrading the Aviatrix Cloud Network Platform <http://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.

This feature allows you to upgrade one particular gateway. A common use case is that during Controller upgrade, if an unpredicted network connectivity issue occurs that causes one specific gateway to fail to upgrade, you can simply solve the problem by using this feature.


Service Actions
~~~~~~~~~~~~~~~~~

This section allows you to view the status of the services running on a gateway, such as rsyslog, supervisor BGP service, and so on. Furthermore, you can restart a service if there is an indication showing that the service might not be working properly.


Keep Gateway on Error
~~~~~~~~~~~~~~~~~~~~~~~

By default, the Controller will roll back all the operations (gateway, EIP, security-group creations, and so on) if an error occurs during a gateway creation. However, this function allows you to keep the gateway instance for debugging purposes. This feature disables the roll back operation if the Status is set to True.


Gateway Replace
~~~~~~~~~~~~~~~~~


.. note:: The Gateway Replace feature is not supported from Release 6.5 and onwards. For Gateway upgrades, refer to `Upgrading the Aviatrix Cloud Network Platform <http://docs.aviatrix.com/HowTos/selective_upgrade.html>`_.

This feature allows you to replace an existing gateway that is not functional by launching a new gateway and restoring the configuration to the new gateway. Use this feature only when you have exhausted all other options. You may open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ if you need additional support.

Select a gateway in the drop down menu and click **Replace**.


To run gateway diagnostics, refer to `Run diagnostics on a gateway. <http://docs.aviatrix.com/HowTos/troubleshooting.html>`__ and `Service Description of Diagnostic Result. <http://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`__

.. note:: When the Controller performs a gateway replacement procedure, efforts are made to minimize the downtime. For example, 
when a failed Spoke Gateway is being replaced, the Controller first redirects the traffic to a healthy Spoke Gateway by 
modifying the Spoke VPC route table to route all instance or VM traffic to the healthy gateway, it also 
moves the routes from the Transit Gateways pointing to the failed Spoke Gateway to the healthy Spoke Gateway for traffic 
moving from Transit Gateway to Spoke Gateway. After the failed gateway is terminated and a new gateway is launched and 
configuration installed, the Controller then programs the Spoke VPC route table to load balancing some subnets/route table
to point to the new gateway and also move the routes back on the Transit Gateways. 

Similar process happens when a Transit Gateway is being replaced. 

As a result the downtime is under 10 seconds for each gateway replacement in the Multi-Cloud Transit solution. 

Similarly, when a failed gateway with Site2Cloud connections are being replaced, traffic is first redirected to 
the other healthy gateway before the failed gateway is terminated and replaced. 

Session View
~~~~~~~~~~~~

This feature allows you to view active connection sessions running through Aviatrix Gateways. This is useful for troubleshooting connectivity issue. 

To view sessions:

	- go to **Troubleshoot** > **Diagnostics** > **Gateway** > **Session View**

	- or go to **Security** > **Stateful Firewall** > **Session View**
   

.. raw:: html

   <hr width="%80"/>


VPN User
----------

VPN User Diagnostics
~~~~~~~~~~~~~~~~~~~~~~

This feature provides the status diagnostic information of a VPN user.


VPN User History Search
~~~~~~~~~~~~~~~~~~~~~~~~~

This tool allows you to search the VPN connection log on a particular VPN gateway with the filtering feature.


.. raw:: html

   <hr width="%80"/>


Cloud
-------

Account Diagnostics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This feature checks if the access accounts have the correct configuration to meet the Controller's requirements.

.. note:: This operation may take a couple minutes to finish if there are multiple access accounts. This feature supports AWS based access accounts only.
..


VPC Diagnostics with Resources Information
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The diagnostic result of this feature provides the information of a specified VPC/VNet, such as DHCP options, subnets, ACLs, route tables, security groups and VM instances configurations.


VNet Route Diagnostics
~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: This feature supports Azure Classic only.
..

This feature provides the following operations that can be applied to a VNet:
    1. Display all route tables
    2. Display route table details
    3. Add a route table
    4. Delete a route table
    5. List route table and subnet tables
    6. List effective route of an instance
    7. Add a route in a route table
    8. Delete a route
    9. Turn IP fwd ON
    10. Turn IP fwd OFF
    11. Get IP fwd
    12. Associate a subnet to a route table
    13. Dissociate a subnet from a route table

Refresh Tags
~~~~~~~~~~~~~

This feature syncs up AWS VPC name tags if users change the VPC name in AWS.


.. raw:: html

   <hr width="%80"/>


Database
----------

DB Diagnostics
~~~~~~~~~~~~~~~~

This section allows you to view database tables and restart a server for functionality recovering purposes.

.. warning:: We strongly advise that you contact `Aviatrix Support <https://support.aviatrix.com>`_ before performing the operations to "Drop Database" or to "Delete Collection".
..


.. raw:: html

   <hr width="%80"/>


Services
----------

This feature allows you to view the services status of the Controller and Gateways. Moreover, it provides the ability to restart the services if there is an indication showing that a particular service is not working properly.


.. raw:: html

   <hr width="%80"/>


BGP
-----

This section provides the ability to view BGP configurations for diagnostics or any purposes.


.. raw:: html

   <hr width="%80"/>


System Resources
------------------

This feature allows you to set the threshold for notifications when the disk or memory usage of a Controller or Gateway has reached certain percentage of the total usage. The default behavior is to alert administrators when the disk usage crosses 90% or if memory usage crosses 80%.


Network Validation: Connectivity Test
---------------------------------------

When you select the **Source Network** and **Destination Network**, the Aviatrix Controller will spin up two instances 
and run a connectivity test. After the test completes, you can re-run the test. There is only one pair of test endpoints that is valid at any given time. If you want to test a different endpoint, delete the current pair and launch a new pair. These instances are visible in the Gateway page, under "View Instances"


.. |wireshark_filter| image:: troubleshoot_diag_media/wireshark_filter.png
   :scale: 30%


.. disqus::
