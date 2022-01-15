.. meta::
  :description: Aviatrix CoPilot Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


============================================================
Aviatrix CoPilot Release Notes
============================================================


This section describes new features and enhancements for Aviatrix CoPilot software releases.

For information about Aviatrix CoPilot image releases, see https://docs.aviatrix.com/HowTos/copilot_release_notes_images.html.

CoPilot Release 1.5.1 (1/12/2022)
---------------------------------

-   (Performance) Performance Charts now have cross hairs that are synced across all visible charts for easy correlation between metrics.

-   (Topology) Run VPC/VNET/VCN diagnostics and submit them to Aviatrix Support from Topology. From Topology, click on any VPC/VNET/VCN in a topology map, and then click DIAG in the node properties pane.

-   (Notifications>Configure) Use new input box to type in a value (instead of using the slider) for configuring notification thresholds.

-   Performance improvements.

For information about Aviatrix CoPilot image releases, see https://docs.aviatrix.com/HowTos/copilot_release_notes_images.html


CoPilot Release 1.5.0 (1/12/2022)
---------------------------------

-   **ThreatIQ map in dashboard** — The CoPilot Dashboard now includes the ThreatIQ map showing any threats over the last 24 hours.

-   **New gateway diagnostic features** 

      You can now perform the following diagnostic tasks for Aviatrix gateways (from Topology, click on any gateway in a topology map, and then click DIAG in the node properties pane):

     -   (TRACEPATH tab) Discover the MTU on the path (if router supports it).
     -   (TRACELOG tab) Upload a gateway's tracelog directly to Aviatrix Support. The controller and gateway tracelog is uploaded and the support team notified.
     -   (SERVICE ACTIONS tab) Check the status of gateway services and restart services.

-   Performance improvements and bug fixes.

Release 1.4.9.3 (12/28/2021)
-----------------------------
- UI improvements. 

  - You can now open Aviatrix Controller from CoPilot. From the CoPilot dashboard, click the Apps icon in the action bar, and then select **Controller**. The controller opens in a new browser tab.

  - Improvements were made to the ThreatIQ dashboard.

- Performance improvements. 
- Minor bug fixes. 

Releases 1.4.9.1, 1.4.9.2
-------------------------
- **Bug fix** Minor bug fixes.

Release 1.4.9
-----------------
- **New: Inventory Reports** You can now create customized, detailed reports for all or specific inventory (resources managed by Aviatrix Controller) running across your multi-cloud network.  To create a custom report, you answer questions that guide you to include only the information you want in the report. Each time you specify your criteria, the PDF report view updates in real time in an adjacent pane. You first specify the cloud provider(s) to include information about a single cloud or multiple clouds. You then specify the regions you have resources in that you want to include. You can further specify the VPCs/VNETs/VCNs in the region(s) and drill down further to specify the resource types (for example, gateways and instances). You can save and download the report. Currently, you cannot save a report filter.
- **Enhancement** (ThreatGuard) Now only users logged in to CoPilot who have Admin/Firewall Admin permissions can enable/disable ThreatGuard blocking.
- **Enhancement** (ThreatGuard) Selective Threat Blocking. You can now be selective about which VPCs/VNets/VCNs block threat IPs when ThreatGuard blocking is enabled. By default, all VPCs/VNets/VCNs block when ThreatGuard blocking is enabled. You can then use the Allow/Deny List to specify which ones will not block.
- **Enhancement** (Topology) Support for filtering on your own tags you created in the CSP (supported for tags added to gateways only at this time, not instances).
- **Enhancement** (Egress) For Egress, CoPilot now shows Rule and Action when a request hits a rule.
- **Enhancement** Performance improvements.
- **Bug fix** Minor bug fixes.

Release 1.4.8
-----------------
- **New: ThreatGuard** You can now block and get alerted on the threats detected in your network. A dashboard to configure and view ThreatGuard in action.
- **Enhancement** Improved alerts.
- **Enhancement** More metrics. All of Performance V2 metrics are now supported for receiving alerts.
- **Enhancement** Ability to pick and choose one/more/all hosts and one/more/all of interfaces to receive telemetry and node status alerts.
- **Enhancement** Support for filtering domains and hosts in Network Segmentation graphs.
- **Enhancement** Faster Cloud Routes pages and faster Notifications page.
- **Enhancement** Performance improvements.
- **Bug fix** Minor bug fixes.

Release 1.4.7.4
-----------------
- **Bug fix** Fixes to latencies in Topology.

Release 1.4.7.3
-----------------
- **Enhancement** Improvements to GW, Tunnel, S2C alerts.
- **Enhancement** Performance improvements in backend tasks.
- **Enhancement** Configurable settings for Network Segmentation charts.
- **Bug fix** Fix in V2 Telemetry alerts.


Release 1.4.7.2
-----------------
- **Bug fix** Fixes to Legend in Network Segmentation Page.
- Revert ETL migration for Customers with older than 6.4 Controllers
- **Bug fix** Minor improvements to Performance V2 Charts.


Release 1.4.7.1
-----------------
- **Bug fix** Minor bug fixes in Performance Monitor V2.

Release 1.4.7
-----------------
- **New: ThreatIQ** Real time identification of threats in ThreatIQ.
- **Enhancement** Performance V2. Many more metrics to monitor performance of hosts, interfaces and tunnels. In the Performance Page, click on **Switch to V2**.
- **Enhancement** Latencies for Site 2 Cloud links.
- **Enhancement** You can now filter topology data by node type.
- **Enhancement** Improved Cloud Routes Search and show only the routes with longest prefix.
- **Enhancement** Upgraded AppIQ with V2 performance metrics.
- **Enhancement** Performance improvements.
- **Bug fix** Minor bug fixes.


Release 1.4.6.4
-----------------
- **Bug fix** Fixes to SSO login.


Release 1.4.6.3
-----------------
- **Enhancement** Improvements to individual alerts per host.
- **Enhancement** In Dashboard, added a chart for instances per region.
- **Bug fix** Fixes to topology replay.
- **Bug fix** Fixes to topology saved layouts.


Release 1.4.6.3
-----------------
- **Enhancement** Improvements to individual alerts per host.
- **Enhancement** In Dashboard, added a chart for instances per region.
- **Bug fix** Fixes to topology replay.
- **Bug fix** Fixes to topology saved layouts.


Release 1.4.6.2
-----------------
- **Bug fix** Fix to the offline upgrade process.


Release 1.4.1
-----------------
- **Bug fix** Fix in Webhooks test button.

Release 1.4.6
-----------------
- **Enhancement** You can now receive individual alert notifications for each host.
- **Enhancement** AppIQ now works across all clouds.
- **Enhancement** In Topology, you can show and hide latencies.
- **Bug fix** Fixes for Dashboard Charts.
- **Bug fix** Fixes for Security Charts.

Release 1.4.5.3
-----------------
- **Enhancement** In Dashboard, new chart for Instances Per Cloud.
- **Bug fix** Fixes for Gateways Active Sessions and Interfaces.
- **Bug fix** Fixes for Security Charts.

Release 1.4.5.2
-----------------
- **Enhancement** Security updates.
- **Bug fix** Webhook templates bug fix.


Release 1.4.5.1
-----------------
- **Bug fixes** Minor bug fixes in Dashboard pie charts and VPC Routes.

Release 1.4.5
-----------------
- **Enhancement** Support for offline upgrade and offline installation of CoPilot.
- **Enhancement** Support for templates in Webhooks.
- **Enhancement** Support for Alibaba Cloud.
- **Settings -> Index Management** Support for searching and filtering indices.
- **Bug fixes** Minor bug fixes.


Release 1.4.4
-----------------
- **Bug fix** Performance Fixes for Dashboard - Overview and Traffic Pages load faster.
- **Bug fix** Security fixes
- **Improvement** Topology loads better
- **Enhancement** Latencies can now be refreshed at user specified intervals
- **Enhancement** Topology Replay - loads much faster for bigger changes

Release 1.4.3.3
-----------------
- **Bug fix** Security fixes

Release 1.4.3
-----------------
- **Dashboard -> Traffic page** Detailed metrics on data sent and received in the last hour and day for instances, regions, GWs and VPCs/VNETs/VCNs. Also shows the trend and detailed traffic chart for each cloud construct. Ties into FlowIQ for deeper visibility.
- **Security -> Audit** End to end audit on every API call (with response status, user who made the call, arguments for the call), aggregated hourly, daily, monthly and fully searchable, filterable and sortable.
- **Search for titles/notes in the topology replay timeline across timestamps** Replay now ties into Audit so that you know who made the infrastructure change(s) and when it was (they were) made.
- **SSO** Configure CoPilot in the Controller UI and login into CoPilot from the Controller directly without having to enter the credentials. 
- **Cloud Routes and BGP** section now scale to work with Controller 6.4 API changes, backward compatible with pre-6.4 APIs.
- **Cloud Routes Search** Search, filter and highlight across routes/GWs for anything you see on the page (name, routes, cloud provider, status, tunnels). Search for IP in Subnet also highlights which CIDR the IP is part of.
- Look and feel improvements for Settings Pages and Notifications page.
- **Bug fix** Good number of UX enhancements and bug fixes.


Release 1.4.2.1
-----------------
- A patch update to the release 1.4.2 
- **Improvement** in scalability and security. Support 100k+ changes in topology diff and more than 250k tunnels in the cloud routes section (which is about 40MB of tunnels data rendered in less than 5 secs). We also made improvements to our middleware to secure CoPilot. We now logout the user immediately from accessing copilot data, if the user gets deleted from the Controller.


Release 1.4.2
----------------
- **Scale** Scaled the cloud routes section to handle any number of routes, so for GWs with 10ks of routes is blazing fast. The Latency charts are scaled too to handle 1000s of charts each for one topology edge.
- **Search** You can even search and highlight across 1000s of routes across GWs. 
- **Bug fix** We fixed our disk cleanup logic that periodically frees up space in the copilot instance for a user specified threshold percentage of free disk.
- **Bug fix** We fixed some bugs in topology replay, talking of which, you can now hide/show highlited nodes to clear the clutter while viewing changed nodes.
- **Enhancement** When you receive a ‘closed’ alert (email or webhook) it also contains what hosts were previously affected, so customers can use third party tools (like OpsGenie) to parse for fields of their interest.
- **Improvement** Minor UX improvements 

Release 1.4.1 
-----------------
- **Bug Fixes** 
- **Scale** Large environment support in Latency Monitor and in Replay. 
- **Topology Replay** Ability to now add notes and a tag to a change in replay.

Releases 1.4.0.1, 1.4.0.2
----------------------------

- **Enhancement** Enhanced Topology Replay to add zoom and move to preview timeline
- **Enhancement** Throttle Latency Calls to reduce Controller cpu usage (for large scale env), removed duplicate latency calls for edges
- **Bug fix** Topology Transit View - Single node clusters for VPC, Fix for Spokes with Peering Connections, Connect S2C to regions
- **Bug fix** Dashboard not showing OCI in Geo Map
- **Bug fix** Segments not showing up randomly on Domain Segmentation. Truncate long labels and add tooltip


Release 1.4.0
-------------------

- **CoPilot Theme** New Dark Mode The moon icon in the CoPilot header can be toggled to switch between light mode and dark mode.
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
Version 1.2.0.3 requires users to enter valid credentials for the Controller that CoPilot will store as a **Service Account**. This Service Account is needed
so CoPilot can process and send alerts based on configured thresholds. This Service Account can be a read-only account the user created on
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
