.. meta::
  :description: Aviatrix CoPilot Release Notes
  :keywords: CoPilot,visibility, monitoring, performance, operations


============================================================
Aviatrix CoPilot Release Notes
============================================================

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
