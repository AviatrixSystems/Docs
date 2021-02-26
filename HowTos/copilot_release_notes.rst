.. meta::
  :description: Aviatrix CoPilot Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


============================================================
Aviatrix CoPilot Release Notes
============================================================

Releases 1.4.0.1, 1.4.0.2
----------------------------

- **Enhancement** Enhanced Topology Replay to add zoom and move to preview timeline
- **Enhancement** Throttle Latency Calls to reduce controller cpu usage (for large scale env), removed duplicate latency calls for edges
- **Bug fix** Topology Transit View - Single node clusters for VPC, Fix for Spokes with Peering Connections, Connect S2C to regions
- **Bug fix** Dashboard not showing OCI in Geo Map
- **Bug fix** Segments not showing up randomly on Domain Segmentation. Truncate long labels and add tooltip


Release 1.4.0
-------------------

- **Copilot Theme** New Dark Mode The moon icon in the Copilot header can be toggled to switch between light mode and dark mode.
- **Topology Replay** Full view of what’s changed in your infrastructure. Instantly see any change (for ex: GWs go up/down, tunnels flap, peerings added) to your topology at any timestamp and manage your changesets.
- **Multi Cloud Network Segmentation** Now in Security tab, Logical view -> you can visualize which spoke (or Site2Cloud instance) can reach which other spokes based on the security domains they are part of. In the physical view -> you can visualize the spokes (or S2C instances) grouped by the transit gateways and their reachability based on the security domains they are attached to.
- **Transit View for Topology** Topology Revamped. Clear the clutter and visualize multi-cloud topology with just the Aviatrix transits connected to regions. Double click to open/close VPC/VNET clusters.
- **Improved FlowIQ Filters** Use “not equal to” in a filter rule to specify negation. Group filter rules using “NOT” to specify negation of all the filter rules together.
- **Interface Stats** Use the Diag button in topology to view interface statistics for a gateway

Releases 1.3.2.1, 1.3.2.2, 1.3.2.3
-----------------------------------

- **Bug fix** Fixes to saved filter groups in FlowIQ
- **Bug fix** Fixes to pie charts in FlowIQ Trends
- **Bug fix** Fixes to top navigation header to always show it
- **Enhancement** Better error checking for dashboard APIs
- **Enhancement** Changes to slider step while defining alerts for Rx, Tx and RxTx metrics

Release 1.3.2
-------------------

- **Enhanced FlowIQ Filters** Now filter FlowIQ results by performing complex queries by doing logical ANDs and ORs between different filters. Filter groups can now be searched and selected in FlowIQ
- **Alerts** Now get alerted when a Site2Cloud tunnel or BGP connection status changes
- **Enhanced Diagnosis in Topology** Test connectivity from a selected gateway to a host IP
- **Session Visibility** Active Sessions for a selected Gateway
- **Enhanced Index Management and Data Retention policies** Now you can better control how long you want to retain data for each of FlowIQ, Performance, FlowIQ, latencies.
- **Multi-Cloud AppIQ Support** AppIQ supports all clouds (FlightPath may not work across all clouds)
- **Performance Monitoring** A much cleaner legend for performance monitoring charts
- **Topology Enhancement** New Truncate/expand labels in topology

Release 1.3.1.2
-------------------

- **Bug fix** to flight path in AppIQ report
- **Enhancement** Change Cluster Labels in Topology to VPC Labels
- **Enhancement** Gov Cloud icons show up in Topology

Release 1.3.1.1
-------------------

 - **Bug fix** Fixes to latency tracker

Release 1.3.1
-------------------

- **Enhancement** Receive email and webhook alerts when a Gateway or Tunnel is down
- **Latencies** View historical latencies and perform search to filter latencies of interest
- **Enhancement** Cleaner topology with truncated labels and latency numbers align along edges
- **Enhancement** Cleaner topology in AppIQ
- **Enhancement** Filter table columns in GW Routes and VPC Routes

Release 1.3.0
-------------------

- **Security** Egress FQDN Dashboard, search and live monitoring
- **Alerts** Webhooks integration for alerts - Use Webhooks to alert on telemetry data

Release 1.2.1.2
-------------------

- **Bug fix** A fix to AppIQ inconsistency in topology instances

Release 1.2.1.1
-------------------

- **Enhancements** Compressed the AppIQ report file size for easier download
- **Bug fix** in BGP routes and AppIQ charts

Release 1.2.1
-------------------
- **AppIQ** generates a comprehensive report of control plane connectivity between any two cloud endpoints connected with Aviatrix Transit Network which includes link status, latency, bandwidth, traffic, and performance monitoring data.

  |appIQ_1| |appIQ_2| |appIQ_3|

- **BGP Info** shows detailed BGP connections information with routes, map and status inside Cloud Routes

  |bgp_1| |bgp_2| |bgp_3|

- **Continuous Latency Monitoring** allows to see the continuous historical latencies data on Topology in Multi-Cloud environment between Transit and Spoke.

  |latency_1| |latency_2|
  
  
- **Performance Improvements** for Cloud Routes and Scheduled Tasks that run behind the scenes.

Release 1.2.0.5
-------------------
- **Topology Enhancement** Search and Filter capability and Customize Topology Layout options
- **Site2Cloud** shows detailed S2C connections information with routes and status inside Cloud Routes
- **Notification** allows to pause alerts and delete old alert notifications
- **Operational Enhancements** auto delete flowIQ and Perfmon indexes to save disk space

Release 1.2.0.3
-------------------
Version 1.2.0.3 requires users to enter valid credentials for the controller that Copilot will store as a **Service Account**. This Service Account is needed
so Copilot can process and send alerts based on configured thresholds. This Service Account can be a read-only account the user created on
the controller. This dialog will only show one time when no service account has been configured.
The Service Account can be changed in **Settings** .

|service_account_modal|


- Notifications
  Ability to configure and receive alerts when CPU Utilization, Free Disk, Free Memory, Rx, Tx, Rx Tx of any host exceeds a user specified threshold
  Add email addresses of recipients in settings -> notifications to receive alerts
  Monitor and manage the lifecycle of alerts from the time they first triggered to the time they are resolved in the notifications page

- CloudRoutes
  Multi cloud GW Routes and VPC/VNET Routes with search functionality

- Topology
  Cluster Latency Click on connections between 2 clusters and start latency monitor for all connections between clusters

- FlowIQ
  Support for CSV export in records page
  Added support for filtering of instances using tags
  Now showing Flow Throughput and Flow Duration data in the records page

- Bug Fixes
  Few Bug fixes and performance improvements to load topology and instances faster

Release 1.1.9
-------------------
- Security Updates

Release 1.1.8
-------------------
- Topology Clustering 
- Enhancements to Perf Mon charts with time period support
- Saving of Filter Groups in Flow IQ

Release 1.1.7.1
-------------------
- Topology Highlight
- Performance Monitoring Charts with multiple hosts
- && and || support for FlowIQ Filters

Release 1.1.6.1
-------------------
- Tagging functionality extended, Tag Manager in Settings Pages, Latency Charts, Filtering in Flow IQ improved

Release 1.1.5.2 
-------------------
- Added support for tagging in Topology 
- Added support for custom SSL certificate import


Release 1.1.4.2 
-------------------
- Addressed the issue with license key validation

Release 1.1.4 (GA)
-------------------

- Enabled license management
- Added support for multi-select
- Added ability to delete indexes
- Added storage auto-delete threshold configuration
- Added diagnostics (ping/traceroute) to topology

.. disqus::

.. |service_account_modal| image:: copilot_releases/service_account_modal.png
.. |appIQ_1| image:: copilot_releases/appIQ_1.png
    :width: 30%
.. |appIQ_2| image:: copilot_releases/appIQ_2.png
    :width: 30%
.. |appIQ_3| image:: copilot_releases/appIQ_3.png
    :width: 30%
.. |bgp_1| image:: copilot_releases/bgp_1.png
    :width: 35%
.. |bgp_2| image:: copilot_releases/bgp_2.png
    :width: 30%
.. |bgp_3| image:: copilot_releases/bgp_3.png
    :width: 30%
.. |latency_1| image:: copilot_releases/latency_1.png
    :width: 40%
.. |latency_2| image:: copilot_releases/latency_2.png
    :width: 40%
