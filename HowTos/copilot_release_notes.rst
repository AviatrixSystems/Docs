.. meta::
  :description: Aviatrix CoPilot Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


============================================================
Aviatrix CoPilot Release Notes
============================================================

This section describes new features and enhancements for Aviatrix CoPilot software releases.

For information about Aviatrix CoPilot image releases, see `Aviatrix CoPilot Image Release Notes <https://docs.aviatrix.com/HowTos/copilot_release_notes_images.html>`_.

CoPilot Releases 1.8.0, 1.8.1, 1.8.2, 1.8.3 (4/05/2022)
--------------------------------------------------------

-   (Anomalies - New!) **Network Behavior Analytics** — You can now select any VPC/VNet(s) in your clouds to have CoPilot learn their behaviors based on a group of metrics and alert you when it detects anomalous behavior in them. When configured for network behavior analytics, CoPilot performs continuous network behavior analysis of the VPC/VNet workloads during a configurable learning period. The learned behavior or *fingerprint* is a behavioral baseline against which CoPilot can detect abnormal network operating patterns or *anomalies*. Anomalies could represent threats on your network, systems being down, high traffic for a planned launch, or some other abnormal behavior. For information about enabling network behavior analytics, see `Working with Anomalies <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-anomalies>`_.

-   (FlowIQ) **FlowIQ Filter by CSP Tags** — You can now search for traffic using your cloud-native instance tags and VPC tags. Use the tags in FlowIQ filters that take an address field like Source Address or Destination Address. For example, to see traffic flows between business units, this filter group with the AND operand will show traffic flows between accounting and engineering resources where the CSP tag associated with each resource is Name = `department` and Value = `accounting` or `engineering` respectively:

    ```
    Source Address is equal to department accounting

    Destination Address is equal to department engineering
    ```

-   (ThreatIQ with ThreatGuard) **Prepend/Append ThreatGuard Rules** — By default, ThreatGuard firewall rules *append* instantiated rules — Aviatrix Controller adds the ThreatGuard rule to the end of the rules list at the time the threat triggered the rule. You can now choose to have ThreatGuard firewall rules *prepend* instantiated rules where Aviatrix Controller adds the ThreatGuard rule to the beginning of the rules list at the time the threat triggered the rule. From the ThreatIQ > ThreatGuard page, select the prepend option when configuring ThreatGuard blocking. For more information, see `About ThreatGuard Firewall Rules <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#about-threatguard-firewall-rules>`_.

-   (Notifications) **Edit Alerts** — You can now edit alert configurations. From the Notifications > Configure > Configured Alerts list, locate the alert and click on the blue pen icon. Make any changes needed to the name, condition, email recipient, or webhook payload and then click **Update**. For more information, see `Edit Notifications <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#edit-notifications>`_. 

-   Performance Improvements.

-   Bug fixes.


CoPilot Release 1.7.1, 1.7.2 (2/23/2022), 1.7.3 (2/24/2022)
-----------------------------------------------------------

Minor bug fixes.


CoPilot Release 1.7.0 (2/23/2022)
---------------------------------

-   (Reports) — You can create a report that summarizes the resource utilization (telemetry) data for Aviatrix gateways in a single cloud or across all clouds in your multi-cloud network. Of the approximately 80 performance metrics that CoPilot exposes (system and network metrics), you can select from any or all of them to report on for the time period you specify. Per gateway, when reporting on network metrics, CoPilot aggregates the metrics across all interfaces (default), or if specified, reports the metrics for each interface. The data in the report can be organized by gateway or by metric. The report can be exported in PDF. For information about creating a resource utilization report, see `Create a Resource Utilization Report <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#create-a-resource-utilization-report>`_.

-   (Topology) — Search and filter for cloud native VPC/VNET/VCN tags — You can search and filter for VPC/VNET/VCN tags that you set in the native cloud service provider console. This feature is available starting from Controller release 6.6. To filter for VPC/VNET/VCN tags, from Topology, click the Toggle Filter slider to enable it. In the key list, under the CSP Tags category, select the VPC/VNET/VCN tag to filter for.

-   (Topology) — You can create and save topology filters. From the main topology page, click the **Toggle Filter** slider to access the filter editor page. See `Create and Save Topology filters <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#create-and-save-topology-filters>`_.

-   (Topology) When doing packet capture on a gateway from topology, you can now filter by virtual interfaces.

-   (FlowIQ)  — The FlowIQ Records page format is improved. 

-   (Performance) — In performance charts, CoPilot now shows the minimum and maximum values for metrics so you can see the absolute valleys and peaks for the metric within the selected timeframe.

-   SAML users on Aviatric Controller with admin permissions also have admin access in CoPilot. 

-   (UI Improvement) — The auto-refresh component for setting the refresh interval in the Performance, Topology, and Settings > Resources pages is replaced by a button that takes up less space in the UI. Click on the button to set the refresh interval or disable auto-refresh for that page. 

-   Performance improvements.

-   Minor bug fixes.


CoPilot Release 1.6.3 (1/31/2022)
---------------------------------

-   **Security fix**: This patch mitigates a vulnerability that would allow an attacker to escalate user permissions.


CoPilot Release 1.6.2 (1/28/2022)
---------------------------------

-   **Security fix**: This patch mitigates a vulnerability that would allow an attacker to escalate user permissions.


CoPilot Release 1.6.1 (1/26/2022)
---------------------------------

-   Search and filter for instance tags — You can now search and filter for instance tags in Topology (feature available starting from Controller release 6.6). To filter for instance tags, from Topology, click the Filter slider to enable it. In the key list, under the CSP Tags category, select the instance tag to filter for.

-   Added auto refresh to the Resources page (Settings).

-   Performance improvements.

-   Minor bug fixes.


CoPilot Release 1.6.0 (1/25/2022)
---------------------------------

-   (Topology) Packet capture from Topology — You can now capture packets on any gateway. In a topology map, click on any gateway where you wish to do packet capture, click DIAG in the node properties pane, and then click the PACKET CAPTURE tab. In the Packet Capture page, you can further filter on host and port number and specify the capture time. You can also search and filter by time, source address, destination address, source port, destination port, protocol, flags, length, and info. Click Start to start the capture, click Stop to stop the capture, then click Download to download the pcap file. The pcap file can be viewed by Wireshark.

-   (FlowIQ) You can now filter for information by gateway name using the new FlowIQ fields: src_gateway_name (Source Gateway), dest_gateway_name (Destination Gateway), and gw_gateway (Gateway Name).

-   (ThreatIQ) Custom ThreatIQ IP List — Network administrators can now maintain a list of IP addresses they consider to be threat IPs. For each IP address in the custom threat IP list, you can specify a custom severity, classification, color (for display in lists), and informational note. When a custom threat-IP list is added, and those threat IPs are detected, the threats are shown in the ThreatIQ map on the Dashboard. The custom threat IPs are handled by Aviatrix Controller in the same manner as the threat IPs identified through ThreatIQ with ThreatGuard (detection, blocking, and unblocking functionality is the same). In the current release, custom ThreatIQ IP lists must be created in CoPilot under ThreatIQ > Custom Threat List.

-   Support for expanding existing physical volumes — For data disks you already allocated to your CoPilot deployment, you can increase their size. After increasing their size via the CSP, log into CoPilot and go to Settings > Resources. In the Resources page, locate the physical volume in the Disk Usage table associated with the resized data disk and click its corresponding RESIZE button. CoPilot resizes the physical volume to match the size of your expanded disk. TIP: In the Disk Usage table, click the detail control ( ˅ ) to the left of the Filesystem column for each physical volume until you locate the enabled RESIZE button.

-   (Usability) Latency Charts now have cross hairs that are synced across all visible charts for easy correlation between metrics.

-   Performance improvements.

-   Minor bug fixes.

CoPilot Release 1.5.1 (1/12/2022)
---------------------------------

-   (Performance) Performance Charts now have cross hairs that are synced across all visible charts for easy correlation between metrics.

-   (Topology) Run VPC/VNET/VCN diagnostics and submit them to Aviatrix Support from Topology. From Topology, click on any VPC/VNET/VCN in a topology map, and then click DIAG in the node properties pane.

-   (Notifications>Configure) Use new input box to type in a value (instead of using the slider) for configuring notification thresholds.

-   Performance improvements.

If you deploy Aviatrix CoPilot image version 1.5.1 from the marketplace, the following disk volume and auto-scaling features are now available:

-   New disk (volume) support — You can now allocate data disks (volumes) to your Aviatrix CoPilot deployment to be used for expandable storage. During instance creation in the marketplace, you can attach a data disk (data volume) to be used for CoPilot storage. When you deploy the instance, the initial setup process will automatically detect the disk/volume you attached during instance creation and format and attach your disks (a logical disk/volume is created from all physical disks). As your storage needs increase later (after deploying), you can also add more disks (volumes) as needed. See `CoPilot Disk (Volume) Management <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-disk-volume-management>`_ for more information.

-   Auto-scaling memory support — CoPilot now supports automatic memory sizing for the ETL and datastore based on the physical memory of the instance at boot. New base images will default to these automatic settings, but existing deployments will keep their current configuration unless updated. Memory settings are still located under Settings > Configuration > Options.


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


Archived release notes
-----------------------
Below are archived release notes for CoPilot release versions 1.4.6.4 and earlier.


**Release 1.4.6.4 (7/07/2021)**

- **Bug fix** Fixes to SSO login.


**Release 1.4.6.3**

- **Enhancement** Improvements to individual alerts per host.
- **Enhancement** In Dashboard, added a chart for instances per region.
- **Bug fix** Fixes to topology replay.
- **Bug fix** Fixes to topology saved layouts.


**Release 1.4.6.3**

- **Enhancement** Improvements to individual alerts per host.
- **Enhancement** In Dashboard, added a chart for instances per region.
- **Bug fix** Fixes to topology replay.
- **Bug fix** Fixes to topology saved layouts.


**Release 1.4.6.2**

- **Bug fix** Fix to the offline upgrade process.


**Release 1.4.1**

- **Bug fix** Fix in Webhooks test button.

**Release 1.4.6**

- **Enhancement** You can now receive individual alert notifications for each host.
- **Enhancement** AppIQ now works across all clouds.
- **Enhancement** In Topology, you can show and hide latencies.
- **Bug fix** Fixes for Dashboard Charts.
- **Bug fix** Fixes for Security Charts.

**Release 1.4.5.3**

- **Enhancement** In Dashboard, new chart for Instances Per Cloud.
- **Bug fix** Fixes for Gateways Active Sessions and Interfaces.
- **Bug fix** Fixes for Security Charts.

**Release 1.4.5.2**

- **Enhancement** Security updates.
- **Bug fix** Webhook templates bug fix.


**Release 1.4.5.1**

- **Bug fixes** Minor bug fixes in Dashboard pie charts and VPC Routes.

**Release 1.4.5**

- **Enhancement** Support for offline upgrade and offline installation of CoPilot.
- **Enhancement** Support for templates in Webhooks.
- **Enhancement** Support for Alibaba Cloud.
- **Settings -> Index Management** Support for searching and filtering indices.
- **Bug fixes** Minor bug fixes.


**Release 1.4.4**

- **Bug fix** Performance Fixes for Dashboard - Overview and Traffic Pages load faster.
- **Bug fix** Security fixes
- **Improvement** Topology loads better
- **Enhancement** Latencies can now be refreshed at user specified intervals
- **Enhancement** Topology Replay - loads much faster for bigger changes

**Release 1.4.3.3**

- **Bug fix** Security fixes

**Release 1.4.3**

- **Dashboard -> Traffic page** Detailed metrics on data sent and received in the last hour and day for instances, regions, GWs and VPCs/VNETs/VCNs. Also shows the trend and detailed traffic chart for each cloud construct. Ties into FlowIQ for deeper visibility.
- **Security -> Audit** End to end audit on every API call (with response status, user who made the call, arguments for the call), aggregated hourly, daily, monthly and fully searchable, filterable and sortable.
- **Search for titles/notes in the topology replay timeline across timestamps** Replay now ties into Audit so that you know who made the infrastructure change(s) and when it was (they were) made.
- **SSO** Configure CoPilot in the Controller UI and login into CoPilot from the Controller directly without having to enter the credentials. 
- **Cloud Routes and BGP** section now scale to work with Controller 6.4 API changes, backward compatible with pre-6.4 APIs.
- **Cloud Routes Search** Search, filter and highlight across routes/GWs for anything you see on the page (name, routes, cloud provider, status, tunnels). Search for IP in Subnet also highlights which CIDR the IP is part of.
- Look and feel improvements for Settings Pages and Notifications page.
- **Bug fix** Good number of UX enhancements and bug fixes.


**Release 1.4.2.1**

- A patch update to the release 1.4.2 
- **Improvement** in scalability and security. Support 100k+ changes in topology diff and more than 250k tunnels in the cloud routes section (which is about 40MB of tunnels data rendered in less than 5 secs). We also made improvements to our middleware to secure CoPilot. We now logout the user immediately from accessing copilot data, if the user gets deleted from the Controller.


**Release 1.4.2**

- **Scale** Scaled the cloud routes section to handle any number of routes, so for GWs with 10ks of routes is blazing fast. The Latency charts are scaled too to handle 1000s of charts each for one topology edge.
- **Search** You can even search and highlight across 1000s of routes across GWs. 
- **Bug fix** We fixed our disk cleanup logic that periodically frees up space in the copilot instance for a user specified threshold percentage of free disk.
- **Bug fix** We fixed some bugs in topology replay, talking of which, you can now hide/show highlited nodes to clear the clutter while viewing changed nodes.
- **Enhancement** When you receive a ‘closed’ alert (email or webhook) it also contains what hosts were previously affected, so customers can use third party tools (like OpsGenie) to parse for fields of their interest.
- **Improvement** Minor UX improvements 

**Release 1.4.1** 

- **Bug Fixes** 
- **Scale** Large environment support in Latency Monitor and in Replay. 
- **Topology Replay** Ability to now add notes and a tag to a change in replay.

**Releases 1.4.0.1, 1.4.0.2**

- **Enhancement** Enhanced Topology Replay to add zoom and move to preview timeline
- **Enhancement** Throttle Latency Calls to reduce Controller cpu usage (for large scale env), removed duplicate latency calls for edges
- **Bug fix** Topology Transit View - Single node clusters for VPC, Fix for Spokes with Peering Connections, Connect S2C to regions
- **Bug fix** Dashboard not showing OCI in Geo Map
- **Bug fix** Segments not showing up randomly on Domain Segmentation. Truncate long labels and add tooltip


**Release 1.4.0**

- **CoPilot Theme** New Dark Mode The moon icon in the CoPilot header can be toggled to switch between light mode and dark mode.
- **Topology Replay** Full view of what’s changed in your infrastructure. Instantly see any change (for ex: GWs go up/down, tunnels flap, peerings added) to your topology at any timestamp and manage your changesets.
- **Multi Cloud Network Segmentation** Now in Security tab, Logical view -> you can visualize which spoke (or Site2Cloud instance) can reach which other spokes based on the security domains they are part of. In the physical view -> you can visualize the spokes (or S2C instances) grouped by the transit gateways and their reachability based on the security domains they are attached to.
- **Transit View for Topology** Topology Revamped. Clear the clutter and visualize multi-cloud topology with just the Aviatrix transits connected to regions. Double click to open/close VPC/VNET clusters.
- **Improved FlowIQ Filters** Use “not equal to” in a filter rule to specify negation. Group filter rules using “NOT” to specify negation of all the filter rules together.
- **Interface Stats** Use the Diag button in topology to view interface statistics for a gateway

**Releases 1.3.2.1, 1.3.2.2, 1.3.2.3**

- **Bug fix** Fixes to saved filter groups in FlowIQ
- **Bug fix** Fixes to pie charts in FlowIQ Trends
- **Bug fix** Fixes to top navigation header to always show it
- **Enhancement** Better error checking for dashboard APIs
- **Enhancement** Changes to slider step while defining alerts for Rx, Tx and RxTx metrics

**Release 1.3.2**

- **Enhanced FlowIQ Filters** Now filter FlowIQ results by performing complex queries by doing logical ANDs and ORs between different filters. Filter groups can now be searched and selected in FlowIQ
- **Alerts** Now get alerted when a Site2Cloud tunnel or BGP connection status changes
- **Enhanced Diagnosis in Topology** Test connectivity from a selected gateway to a host IP
- **Session Visibility** Active Sessions for a selected Gateway
- **Enhanced Index Management and Data Retention policies** Now you can better control how long you want to retain data for each of FlowIQ, Performance, FlowIQ, latencies.
- **Multi-Cloud AppIQ Support** AppIQ supports all clouds (FlightPath may not work across all clouds)
- **Performance Monitoring** A much cleaner legend for performance monitoring charts
- **Topology Enhancement** New Truncate/expand labels in topology

**Release 1.3.1.2**

- **Bug fix** to flight path in AppIQ report
- **Enhancement** Change Cluster Labels in Topology to VPC Labels
- **Enhancement** Gov Cloud icons show up in Topology

**Release 1.3.1.1**

 - **Bug fix** Fixes to latency tracker

**Release 1.3.1**

- **Enhancement** Receive email and webhook alerts when a Gateway or Tunnel is down
- **Latencies** View historical latencies and perform search to filter latencies of interest
- **Enhancement** Cleaner topology with truncated labels and latency numbers align along edges
- **Enhancement** Cleaner topology in AppIQ
- **Enhancement** Filter table columns in GW Routes and VPC Routes

**Release 1.3.0**

- **Security** Egress FQDN Dashboard, search and live monitoring
- **Alerts** Webhooks integration for alerts - Use Webhooks to alert on telemetry data

**Release 1.2.1.2**

- **Bug fix** A fix to AppIQ inconsistency in topology instances

**Release 1.2.1.1**

- **Enhancements** Compressed the AppIQ report file size for easier download
- **Bug fix** in BGP routes and AppIQ charts

**Release 1.2.1**

- **AppIQ** generates a comprehensive report of control plane connectivity between any two cloud endpoints connected with Aviatrix Transit Network which includes link status, latency, bandwidth, traffic, and performance monitoring data.

  |appIQ_1| |appIQ_2| |appIQ_3|

- **BGP Info** shows detailed BGP connections information with routes, map and status inside Cloud Routes

  |bgp_1| |bgp_2| |bgp_3|

- **Continuous Latency Monitoring** allows to see the continuous historical latencies data on Topology in Multi-Cloud environment between Transit and Spoke.

  |latency_1| |latency_2|
  
  
- **Performance Improvements** for Cloud Routes and Scheduled Tasks that run behind the scenes.

**Release 1.2.0.5**

- **Topology Enhancement** Search and Filter capability and Customize Topology Layout options
- **Site2Cloud** shows detailed S2C connections information with routes and status inside Cloud Routes
- **Notification** allows to pause alerts and delete old alert notifications
- **Operational Enhancements** auto delete flowIQ and Perfmon indexes to save disk space

**Release 1.2.0.3**

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

**Release 1.1.9**

- Security Updates

**Release 1.1.8**

- Topology Clustering 
- Enhancements to Perf Mon charts with time period support
- Saving of Filter Groups in Flow IQ

**Release 1.1.7.1**

- Topology Highlight
- Performance Monitoring Charts with multiple hosts
- && and || support for FlowIQ Filters

**Release 1.1.6.1**

- Tagging functionality extended, Tag Manager in Settings Pages, Latency Charts, Filtering in Flow IQ improved

**Release 1.1.5.2** 

- Added support for tagging in Topology 
- Added support for custom SSL certificate import

**Release 1.1.4.2** 

- Addressed the issue with license key validation

**Release 1.1.4 (GA)**

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
