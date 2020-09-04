.. meta::
  :description: Aviatrix CoPilot Release Notes
  :keywords: CoPilot,visibility


============================================================
Aviatrix CoPilot Release Notes
============================================================


Release 1.1.4 (GA)
-------------------

- Enabled license management
- Added support for multi-select
- Added ability to delete indexes
- Added storage auto-delete threshold configuration
- Added diagnostics (ping/traceroute) to topology


Release 1.1.4.2 
-------------------
- Addressed the issue with license key validation

Release 1.1.5.2 
-------------------
- Added support for tagging in Topology 
- Added support for custom SSL certificate import

Release 1.1.6.1
-------------------
- Tagging functionality extended, Tag Manager in Settings Pages, Latency Charts, Filtering in Flow IQ improved

Release 1.1.7.1
-------------------
- Topology Highlight
- Performance Monitoring Charts with multiple hosts
- && and || support for FlowIQ Filters

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


.. |service_account_modal| image:: copilot_releases/service_account_modal.png
