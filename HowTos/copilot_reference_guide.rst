.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility


=====================================
Aviatrix CoPilot User Reference Guide
=====================================

Aviatrix CoPilot is a component of Aviatrix platform offering that extends visibility into complex, multi-cloud networks deployed and managed by Aviatrix Controller. 
CoPilot delivers, end-to-end, in-depth, historical analytics of multi cloud networks with a single pane of glass that offers application flows, inventory, health, and complete topological view of the network.  

This guide provides descriptions and definitions of functionalities that are available in Aviatrix CoPilot.


Getting Started with CoPilot
=============================

This section covers how to log in to CoPilot and describes how main functional areas of CoPilot are organized in the navigation menu.

Logging in to CoPilot 
-----------------------

To log in to CoPilot, use the following steps:

1.  Launch CoPilot in your web browser:

    `https://<copilot static public ip address>/`

    where `<copilot static public ip address>` is the static public IP address of your deployed CoPilot software instance/virtual machine.

    Alternatively, you can launch CoPilot in your web browser directly from Aviatrix Controller as described in the next step.

2.  (Optional) To launch CoPilot in your web browser directly from Aviatrix Controller:

    a.  In Aviatrix Controller, under Settings, select CoPilot.

    b.  For the CoPilot Association, set the status to **Enabled**. 

    c.  In the **IP Address/Hostname field**, enter the static IP address for your running CoPilot instance/virtual machine. This can be the private or public IP address of your CoPilot instance/virtual machine. The IP address specified here is used for connectivity between the controller and CoPilot for intra-platform communication (such as API message exchanges). If CoPilot is located in the same VPC/VNet as your controller, specifying a private IP can increase operational bandwidth and potentially save on cost. If you enter the private IP address here, then go to the next step to specify the public IP address.

    d.  If you specified the private IP address of your CoPilot instance in “IP Address/Hostname”, enter the public IP address of your CoPilot instance in the **Public IP (Optional)** field. This enables you to open CoPilot in your web browser directly from your Controller.

    e.  In the action bar of your Controller homepage, click on the application icon, and then select **CoPilot**. 

3.  Enter your Controller account credentials or SAML credentials.


CoPilot navigation menu
------------------------
 
The navigation menu organizes CoPilot functional areas as follows: 

|nav_menu|

**Dashboard**

- The dashboard shows the inventory of all managed resources in your networks and the status of those resources (up or down). See `CoPilot Dashboard`_.

**Networking**

- **Topology** shows the logical and physical layout of your networks, latencies for all connections, and recorded changes made to the network over time. See `Working with Topology`_.

**Secured Networking**

- **Network Segmentation** shows how network domains can or cannot communicate with eachother and ability to configure network segmentation for inter-VPC/VNet connectivity (reachability). See `Working with Security`_.

- **Micro-Segmentation** provides granular network security policy enforcement for distributed applications in the cloud. See the discussion about `secure networking with micro-segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_.

- **Egress Control** shows egress FQDN data, search and live monitoring of what sites are being accessed outside of your network. 

**Security Services**

- **ThreatIQ** provides ability to monitor for security threats in your Aviatrix cloud network, set alerts when threats are detected in the network traffic flows, and block traffic that is associated with threats. See `Working with ThreatIQ`_.

- **Anomaly Detection** provides continuous network behavior analysis on your cloud workloads for detecting unusual behaviors or anomalies in the network. See `Working with Anomalies`_.

- **Geoblocking** provides ability to block IP traffic coming into and coming from a country. 

**Monitor**

- **FlowIQ** shows detailed traffic flow analysis of the network displaying metadata about traffic that flows across each link, global heat map and trends, provides ability to filter traffic based on many conditions including native CSP tags and identify top talkers in the network. See `Working with FlowIQ`_.

- **Performance** shows the resource utilization (telemetry) data for all managed resources across your Aviatrix transit network and provides ability to resize gateways based on policies. See `Working with Performance`_.

- **Traffic & Latencies** shows detailed metrics on data sent and received in the last hour and day for instances, regions, GWs and VPCs/VNets. Shows detailed latencies, historically for the last hour, last day, last week, and last month, for all connections between managed resources. 

- **Notifications** provides ability to configure alerts so that you can be notified about changes in your Aviatrix transit network, see all triggered alerts, pause alerts, and set preferred notification channel (webhooks/email). See `Working with Notifications`_.

**Troubleshoot**

- **AppIQ** shows security domain and traffic information between any two cloud instances that are connected by way of your Aviatrix transit network. 

- **Cloud Routes** shows all routing information for managed resources spanning your Aviatrix transit network, including resources across clouds and on-prem (for Site 2 Cloud connections). View routing information for gateways, VPC/VNets, Site 2 Cloud connections, and BGP connections across all clouds without having to log in to individual cloud provider consoles. 

**Administration**

- **Reports** offers detailed reports showing your inventory of managed resources and telemetry statistics for them in a single cloud or across all clouds in your multi-cloud network. 

- **Audit** shows changes performed by users on your system and which users made API calls to Aviatrix Controller. 

**Billing & Cost**

- **Aviatrix Billing** shows costs for Aviatrix services. 

- **CostIQ** provides visibility into the traffic data of your deployed networks that are managed by the Aviatrix Controller as they relate to your cost centers. This traffic data are reported as percentages of traffic generated by end instances in Spoke VPC/VNets. 

**Settings**

- The Settings pages are used by application administrators to configure and tune the platform and perform system administrative tasks. See `CoPilot Settings`_.


CoPilot Dashboard
================= 

This section describes the Aviatrix CoPilot dashboard.

The CoPilot Dashboard offers a broad perspective on the inventory and status of your deployment. CoPilot Dashboard shows an inventory of all resources across all clouds in your multi-cloud network that are managed by Aviatrix Controller. The Dashboard shows the number and status of these managed resources as well as a breakdown of each on a per cloud basis. A topology geographic map shows where the managed VPC/VNets are located across the globe.

First displayed in Dashboard are inventory chips providing information about managed resources across your cloud networks. Inventory chips show the number and status of each managed resource. 

The number on the inventory chip represents the total number of instances of that managed resource that exists across your multi-cloud network. 

To view the status of a managed resource, click the status marker in its associated inventory chip. The status marker is:  

- A green checkmark when all instances of that resource type are on (connected, running). 

- A red exclamation mark when one or more instances of that resource type are off (disconnected, shut down). 

- Virtual Data Center 

  A Virtual Data Centers (VDC) is a logical “walled garden” that binds different resources together using a shared network space. This is synonymous to VPC in AWS and GCP, VNets in Azure, and so forth 

- Gateway by type: 

  It returns distribution of gateways by type. Each pie support on-hover to display the number for that slice represents 

- Accounts per cloud  

  This chart shows the number of access accounts per cloud 

- Gateway per Cloud 

  This chart shows distribution of Aviatrix gateways per Cloud 

- Total Bytes 

  Offers total bytes seen over the network in the past 24 hours 



Working with Topology
=====================

This section describes the Topology feature of Aviatrix CoPilot. 

Topology provides a visual representation of deployed networks, gateways, instances, and gateway connections.

The Topology feature gives you visibility into your network as follows:

-   **Network Graph - Network View**

    In Network Graph, in Network view, CoPilot displays a network topology map that shows the logical and physical layout of how managed network resources are connected across multiple clouds. Topology provides a visual representation of deployed networks (VPCs/VNets/VCNs), gateways, instances, and gateway connections. CoPilot automatically draws the map when it connects to Aviatrix Controller.

    The Aviatrix Gateways running in your multi-cloud network enable you to run diagnostics from them directly from Topology. When highlighting a gateway, click on the DIAG button to see options available for performing diagnostics from the gateway that is in focus.

-   **Network Graph - Transit View**

    In Network Graph, in Transit view, CoPilot shows the topology of your Aviatrix transit network in relation to your deployed Aviatrix transit gateways. By clicking on the Aviatrix transit icon, you can see all of the transit VPCs/VNets that are managed by Aviatrix Controller. By clicking on a region icon, you can see the spoke VPC/VNets that the controller currently manages. By clicking on a spoke VPC/VNet, you can see all network constructs inside of that spoke. You can use the search field to find specific resources.

-   **Latency Monitor**

    In Latency Monitor, CoPilot shows detailed latencies, historically for the last hour, last day, last week, and last month, for all links (connections) between managed resources. You can use the date picker to view historical latencies for a custom timeframe. You can filter the historical latency information by search field, such as by the name of a specific gateway to view historical latencies that relate only to that gateway.

-   **Topology Replay**

    In Topology Replay, CoPilot shows what changed in your environment and when it changed. CoPilot shows when route, credential, and other metrics in your cloud network constructs have changed over time. A timeline panel shows you all of the changes (as change sets) that were recorded over the last month. You can analyze the additions, modifications, and deletions recorded in each change set. You can delete change sets when you no longer need them.

You access Topology in CoPilot by going to Home > Networking > Topology or typing Topology in the navigation search.

You can click the New Topology Experience toggle to see a new version of the map introduced in CoPilot release 3.0.1 (Topology V2). See `Topology Map Version 2 Layout`_ for a description of what constructs are shown on the 5 rings of the Topology V2 map.


Highlights of Topology capabilities 
-------------------------------------

- Stateful representations
  
  Connectivity elements in Topology reflect the state of the object:
    
    - Connections between Aviatrix gateways are drawn with color codes representing the status of their connections.
    - Aviatrix gateway icons represent the state of the gateway. A gateway that is down is shown as a black line. 
    - Tunnels statuses are shown with green or red lines, representing the status of the link.

- Search for any objects and their properties

  In Topology, you can search for any objects that are plotted. This allows you to quickly isolate and identify
  resources that you are looking for in your entire environment and across clouds.


Interacting with Topology 
---------------------------
Objects on the topology maps support drag and drop. You can click, drag and drop resources to reorganize the objects. 

.. tip:: You can multi-select objects for drag and drop by holding control/command key and selecting.

- Toggle filter

  Enable the filter editor page where you can create and save your own topology filters and filter groups, load them in the map, and edit or delete them.

- Search

  The search box allows you to filter the objects that are plotted on the topology.

- Filter 

  Filter menu offers the option to hide/show different categories of the objects to ensure the topology shows only what you care about. 
 
- Layout
   
  You can save and reload layouts in the topology using the layout menu. If you prefer the topology to load a default
  layout, you can select one as the default.

- Physics options 

  By default topology objects are organized using physics engines. This menu allows you to configure physical 
  gravity settings that manage the placement of objects. You can adjust different parameters, or turn the physics off
  completely for complete control over placement of the objects. 

Topology Physics Options
------------------------

This section describes the physics options that control how objects move in the network topology map.

+-------------------------+------------------------------------------------------------------------------------+
|Topology Physics Option  |   Description                                                                      |
+=========================+====================================================================================+
|Physics Enabled          |   Enable or disable physics effects in the topology map.                           |
|                         |   Deselect this option if you do not want objects to move on their own and have    |
|                         |   them stay in the location you place them (when you click and drag them there).   |
+-------------------------+------------------------------------------------------------------------------------+
|Smooth Edges             |   Enable or disable smooth edges for objects in the topology map.                  |
|                         |   Deselect this option if you do not want the lines between the nodes to be        |
|                         |   smoothed.                                                                        |
|                         |   Smooth edges are more computationally expensive but they produce better layouts. |
+-------------------------+------------------------------------------------------------------------------------+
|Node Repulsion           |   Controls how strongly the objects in the map repulse other objects that come     |
|                         |   near them. The higher the value, the more force applies to the repulsion field   |
|                         |   around each object.                                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Central Gravity          |   Controls the force by which all objects in the network are pulled to a center of |
|                         |   gravity in the topology map.                                                     |
+-------------------------+------------------------------------------------------------------------------------+
|Spring Length            |   Controls how far apart objects appear from each other when they are moving or at |
|                         |   rest. The edges are modelled as springs.                                         |
+-------------------------+------------------------------------------------------------------------------------+
|Spring Constant          |   Controls how quickly objects go back (spring back) to their original position    |
|                         |   after they are dragged and released. The higher the value, the more quickly      |
|                         |   the objects spring back into place.                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Dampening                |   Controls how much the moving of objects (in one physics simulation iteration)    |
|                         |   carries over into moving objects again (next physics simulation iteration). The  |
|                         |   higher the value, the more velocity of movement carries over into moving         |
|                         |   subsequent objects.                                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Max Velocity             |   Controls how long it takes for objects to stop moving after they are dragged     |
|                         |   and released. The higher the value, the more time it takes for objects to        |
|                         |   stabilize (stop moving) after having been dragged.                               |
+-------------------------+------------------------------------------------------------------------------------+
|Min Velocity             |   Controls how long it takes for objects to stop moving after they are dragged     |
|                         |   and released. The higher the value, the less time it takes for objects to stop   |
|                         |   moving after having been dragged.                                                |
+-------------------------+------------------------------------------------------------------------------------+


Performing diagnostics from Topology
-------------------------------------

You can run diagnostics from Aviatrix gateways running in your multi-cloud network directly from Topology (V1 Topology only). Performing diagnostics from Topology can dramatically reduce the time spent troubleshooting issues. You can also run diagnostics from gateways directly from Cloud Routes.

To perform diagnostics from Topology (from an Aviatrix Gateway):

1.  In Topology, click on an Aviatrix Gateway in the topology map to select it.

2.  Click the DIAG button.

3.  Perform any of the following diagnostic tasks for the gateway:

    a.  PING: Run pings directly from the gateway to outside of the Aviatrix managed network or to any resource inside the network.

    b.  TRACEROUTE: Run trace route.

    c.  TRACEPATH: Discover the MTU on the path if router supports it.

    d.  TRACELOG: Upload a gateway's tracelog directly to Aviatrix Support. The controller and gateway tracelog is uploaded and the support team notified.

    e.  Test Connectivity: Test the connectivity of the gateway to a specified host running on a specified TCP or UDP port.

    f.  ACTIVE SESSIONS: View sessions that are active on the selected gateway. You can filter active sessions by search criteria. For example, a search on a specific port to see if the gateway has an action session on that port.

    g.  INTERFACE STATS: View interface statistics about the gateway. The number of interfaces or tunnels associated with the gateway is displayed. Click on the name of an interface or tunnel to see its statistical information.

    h.  PACKET CAPTURE: Capture packets on any gateway. Filter on host and port number and specify the capture time. Search and filter by time, source address, destination address, source port, destination port, protocol, flags, length, and info. Select the interface on the physical or virtual interface you want to capture on. Click Start to start the capture, click Stop to stop the capture, then click Download to download the pcap file. The pcap file can be viewed by Wireshark.

    i.  SERVICE ACTIONS: Check the status of gateway services and restart services.


About Security Scanner
-----------------------

The Security Scanner enables you to detect some vulnerabilities that an attacker could potentially exploit within your Aviatrix-managed VPCs/VNets.

The Security Scanner does not open ports on machines whose ports you have closed by way of private firewalls. A security scan is performed only on ports that are open by your intentional security design.

A security scan reports the following for end instances within your Aviatrix-managed spoke VPCs/VNets:

    -   If a TLS certificate has a malformed configuration.
    -   If the certificate is not publicly known — it is self-signed or signed with a private root certificate.
    -   If the TLS versions used for encrypted communication are outdated / insecure. 

Security Scanner is run from the Aviatrix CoPilot user interface from the Topology page. See `Scan for vulnerabilities using Security Scanner`_. 

You can enable the Security Scanner feature on a per CoPilot instance basis to allow only a specific CoPilot to be able to trigger a scan.  

The security scan feature only inspects TLS/SSL protocols.
 

Scan for vulnerabilities using Security Scanner
------------------------------------------------

This section describes how to scan for vulnerabilities using Security Scanner. For information about Security Scanner, see `About Security Scanner`_.

To scan for vulnerabilities using Security Scanner:

1.  Log in to CoPilot.

2.  From the sidebar, select Topology.

3.  In the topology map, select the instance (not a gateway) from which you want to perform the scan. 

    Note that the scan will be performed on given ports in the Aviatrix-managed VPC/VNet associated with the selected instance.

4.  In the properties pane, click the **Security Scan** button.

5.  In Ports, select the port(s) you want the Security Scanner to scan. 

    You can specify one or multiple individual ports or a range of ports (for example, 8000:8010).

    You can select as many ports as you'd like.

6.  Click **Run**.

    A process on a spoke gateway that is associated with the selected instance scans the port(s) you specified, inspecting TLS/SSL protocols. The results of the scan display in the right pane. Note: The security scan feature only inspects TLS/SSL protocols.

7.  Analyze the scan report results: 

    -   **A scan rating**: The rating reflecting the ranking of TLS services found on the encrypted connections. The TLS rankings are defined by a well-known security source that tracks vulnerable ciphers. Rankings include:

        -   A+ — Very secure. The service follows recommended standards by providing only TLS 1.3 with strong cipher suites for the most secure sessions.

        -   A  — Secure. The service is using TLS 1.2 or more recent versions with strong cipher suites which are considered secure.

        -   B  — Weak. The service is using TLS 1.0 or more recent versions and/or weak cipher suites that may be supported by wider range of devices but are not recommended from a security point of view.

        -   C  — Insecure. The service is using invalid certificates (self-signed, expired, or signed with a private root certificate) or relies on deprecated SSL 3 or older versions or on deprecated cipher suites that are considered insecure.

    -   **A list of vulnerabilities**: The table lists all vulnerabilities encountered by the scan. 

8.  If you want to show only vulnerabilities associated with actionable tasks, enable the **Show only Vulnerabilities** filter.

9.  Take action to mitigate any vulnerabilities found and run the scan again to confirm the vulnerabilities are removed.


Create and save topology filters
--------------------------------

Create filters to narrow down the network constructs to include in your topology maps and save the filters to your local system.

To create and save filters for topology, use the following steps:

1.  In CoPilot, go to Home > Networking > Topology.

2.  In Network view, click the **Toggle Filter** slider to enable the topology filter editor page.

3.  In Select a Key to Filter on, select a key and value to filter on. You can apply any number of filters to a given filter group.

4.  In Filter Group Name, assign a name to your filter/filter group.

5.  Click **Save**.

    The filter is saved to your local system.

    When you want to view the topology layout for this filter, click **Load Filters** and select it from the list. If you load more than one filter, the layout of all of them is displayed in the map.

    After a filter/filter group is loaded, you can edit or delete it.


Search and filter for cloud native custom tags
----------------------------------------------

Search and filter for custom tags you created in your cloud provider environment for your VPC/VNets and instances.

This feature is available starting from Controller release 6.6. 

To filter for cloud native VPC/VNet tags and instance tags, use the following steps:

1.  In CoPilot, go to Home > Networking > Topology.

2.  In Network view, click the **Toggle Filter** slider to enable the topology filter editor page.

3.  From the Select a Key to Filter on list, under the CSP Tags category, select the cloud native tag to filter on.


View Topology Changes (Topology Replay)
---------------------------------------

This section describes how to use the Topology Replay feature of Aviatrix CoPilot. You use Topology Replay to see what changed in your environment and when it changed. This feature can be used, for example, shortly after a problem occurs in the network to see if recent changes to network constructs may have caused the problem. See also Topology Replay Properties.

Topology Replay shows when route, credential, and other metrics in your cloud network constructs changed. The changes are shown for all constructs regardless if they are located in one or multiple clouds. You can view the changes (additions, modifications, and deletions) that were made to the properties of subnets, gateways, and gateway connections. A time series visualization graphs change-set data as points (blue dots) with each change set collected at one-minute intervals. Clicking on a change set in the time series panel loads it into the topology map and changes details pane where you can inspect the data. For more information about UI controls in topology replay, see Topology Replay Properties.

To view topology changes in your environment, use the following steps:

1.  In CoPilot, go to Home > Networking > Topology, and then click the Replay tab.

    The topology replay page opens showing a topology map, a changes details pane, and a time series panel.

2.  Locate and load the changes you want to inspect:

    -   (**To locate the most recent changes**) When the page first opens or is refreshed, the most recent change set is automatically loaded in the topological map and details pane. In the time series panel, the change set is shown as a dark blue box that indicates the number of changes within it. For example, **120 Changes** (this is the default title of the change set).

    -   (**To locate earlier changes**) By default, in the time series panel, CoPilot shows changes that occurred within one-minute increments. Each Expand icon has a number which represents the number of change sets that exist in that focused time period. Click on an Expand icon to zoom into that time period.

        **Note:** Alternatively, on the track pad, pinch or stretch out two fingers to quickly zoom out of or zoom into a time period.

        The bottom of the time series visualization shows changes that were recorded over the last week. There, you can drag the time-window control lines (blue vertical lines) to encompass a day (or multiple days) to quickly zoom into change sets for that time period.

        Keep zooming into a time period until you see a View icon. The View icon indicates a change set at that point in time. Click on the View icon to load the change set. It may take a few seconds to load. After it loads, the View icon is replaced by a blue box with the title of the change set (the title reflects the number of changes in the change set). Hovering over the blue box displays the end time of the change set.

    -   (**To locate a specific change by title or note**) You can change the titles of change sets. You can also associate notes with them. To search for a specific change set based on a previously applied title or note, click the search icon in the changes details pane, enter any text that is part of the title or note, and then click Search. Change sets matching the search criteria are listed. Click on one from the list to load it.

3.  **Inspect changes for a loaded change set.**

    You inspect changes for a change set in the changes details pane.

    When inspecting changes:

    -   Network constructs are organized by construct type in a tree view. Expand the tree for each contruct type to drill down to properties of that construct that were added, modified, or deleted. Changes are shown as green for additions, orange for modifications, and red for deletions.

    -   Click on a network construct in the topology map to bring its change details into focus in the details pane.

    -   For each selected construct in the changes details pane, select or deselect the eyeball icon to toggle between showing only changed data for a construct or showing all data for a construct (to put the changes in context).

    -   Click the AUDIT button to open the Audit tab of the Security section where you can see which users made API calls to Aviatrix Controller during the time period of the change set.
4.  (**To modify the title of a change set**) To modify the title of a change set that is loaded in the changes details pane, click on the red notepad icon to open note view. The title is displayed over the dates (the default title is the number of changes in the change set). Click the blue pen icon. Select the title and change it, and then click the Save icon. When you search the timeline for change sets, you can now search by your title text.

5.  (**To associate a note with a change set**) To associate a note with a change set that is loaded in the changes details pane, click on the red notepad icon to open note view. Click the blue pen icon, type your note, and then click the Save icon. When you search the timeline for change sets, you can now search by your note text.

6.  (**To delete a change set**) To delete a change set that is loaded, in the time series panel, click on the red X associated with the dark blue box that represents it. It will be permanently deleted from the topology-replay database. You can also choose to delete all previous change sets recorded up to that point.



Topology Replay Properties
--------------------------

This section describes properties of the Topology Replay feature in Aviatrix CoPilot.

Topology Replay - Topology Map
+++++++++++++++++++++++++++++++++++++++++

The topology map shows network constructs that were changed in the environment for changes associated with the currently loaded change set.

Properties of the topology map include:

-   Show full topology

    Click **Show full topology** to see how the changed constructs relate to all constructs in your Aviatrix managed environment (the full topology is shown at that point in time).

-   Disable physics

    Click **Disable physics** if you do not want objects to move on their own and have them stay in the location you place them (when you click and drag them there).

-   Hide Highlights

    Click **Hide highlights** to remove the circles from the objects in the map that denote they represent changed constructs.


Topology Replay - Changes Details Pane 
+++++++++++++++++++++++++++++++++++++++++

The changes details pane shows all details for the currently loaded change set, including:

-   The name of the change set (reflecting the total number of changes in it).
-   The start time and end time for which changes were recorded.
-   The number of changes by type that were made to the properties of constructs:
    -   Additions
    -   Deletions
    -   Modifications
-   The network constructs that are associated with the changes organized by construct type in a tree view. Detailed information about what metrics changed for each construct is shown. For modifications, the old value is shown striked out near the new value.


Properties of the changes details pane include:

-   **AUDIT**

    Click the **AUDIT** button to open the Audit tab (of the CoPilot Security page) where you can view the users that made API calls to Aviatrix Controller during the time period of the change set.

-   **NOTES**

    Click the red notepad icon to associate a note with the loaded change set or to change the change set's title. Click the blue pen icon, then edit the title or add/edit a note, and then click the Save icon. The title is displayed over the dates (the default title is the number of Changes in the change set). When you search the timeline for change sets, you search by your title or note text.

-   Search

    Use the search to search for change sets by your custom change-set title or note text (for notes you associated with changes sets).

-   Show only changed data/ Show all changes

    Use the eyeball icon to toggle between showing only changed data for a construct or showing all data for a construct (to put the changes in context). This option can be set per construct, per construct type, or globally.


Topology Replay - Time Series Panel
+++++++++++++++++++++++++++++++++++++++++

The time series visualization graphs change-set data as points (blue dots) with each change-set collected at one-minute intervals shown in the change timeline (top half of the panel). The overview timeline in the time series panel (bottom half of the panel) shows the duration of all replay data (from the first replay date to the current date). The most recently recorded change set is shown as a dark blue box labeled with the number of changes in that change set.

Properties of the time series panel include:

-   Currently loaded change set

    The time series panel highlights the current change set as a dark blue box labeled with the number of changes the change set contains. Hover over the box to view the end time of the change set. The green box represents the base of the currently loaded change set.

-   **Expand** controls to zoom into a time period

    In the change timeline (top half of the panel) each Expand icon has a number which represents the number of change sets that exist in that change-set cluster. On your track pad, pinch or stretch out two fingers to quickly zoom into or zoom out of a time period to view change sets that occurred within a more narrow timeframe. You can also zoom into a time period by clicking on the Expand icons. You can click on and drag the top of the panel backward and forward to view changes that happened minutes earlier/later.

-   Time-window control lines

    In the overview timeline (bottom half of the panel), after you zoom into a time period by clicking on the Expand icons or by using your track pad, two time-window control lines (blue vertical lines) display near the current time (the red line). Drag the time-window control lines where needed to focus in on the day or days you want to locate change sets in.

    |time_control_image|

-   **View** controls to load a change set

    The View icon indicates a change set at that point in time. Click on a View control to load a change set; this populates the network constructs associated with the changes in the topology map and displays the details for their changes in the changes details pane. The constructs associated with the changes are circled in the map.

Topology Map Version 2 Layout
-------------------------------

In CoPilot release 3.0.1, a new topology map was introduced (Topology V2). Use the **New Topology Experience** toggle to switch to Topology V2. Topology V2 can display large network topologies. The illustration below shows the network constructs that get laid out in the 5 circles of Topology V2. The following constructs are placed on the circle working from the most outer circle to the most inner circle: 1) External Connections (S2C), 2) Instances, 3) Subnets, 4) Spoke Gateway VPC/VNets, 5) Transit Gateway VPC/VNets.

  |topology_v2| |topology_map_v2| 

Some functions have not migrated to V2 such as gateway diagnostics (note you can run gateway diagnostics from the Cloud Routes page also).

Working with FlowIQ
===================

This section describes the FlowIQ feature of Aviatrix CoPilot.

FlowIQ provides you with critical visibility capability to the traffic that traverses your network, displaying metadata about traffic that flows across each link. FlowIQ provides visualization of traffic flows, enabling you to inspect any network traffic that is moving across any gateway managed by the Aviatrix Controller in your Aviatrix transit network (multi-cloud or single cloud network). FlowIQ enables you to identify where data in your network is going to and where it is coming from and you can filter for detailed information about the traffic down to the packet level. 

You access FlowIQ in CoPilot by going to Home > Monitor > FlowIQ or typing FlowIQ in the navigation search.

You can click the New FlowIQ Experience toggle to see a new version of the flows screens in CoPilot release 3.0.1.


Interacting with the flows
--------------------------
FlowIQ provides various views for visualizing traffic records. The views respond to filters that are selected. 
The filters that you set are carried across all of the views. 


FlowIQ overview page
--------------------------
In the FlowIQ overview page, CoPilot provides an overview of all the traffic that has traversed across your Aviatrix transit network over the last hour, day, week, month, or over a custom timeframe.

The traffic information is broken down into various categories displayed in pie charts. 

By default, the pie charts show details for all traffic. You can filter the information to show only the traffic you are interested in analyzing.  When you click on any pie-chart slice, CoPilot automatically creates a filter that narrows down the information displayed across all pie charts. Each time you select another slice, CoPilot adds another rule to your filter group.

After you analyze traffic data based on one or more filters, clear the filter(s) so that CoPilot returns to showing data for all traffic.


FlowIQ flows page
--------------------------
In the Flow IQ flows page, CoPilot shows all the traffic that is currently seen by your multi-cloud transit no matter which cloud the traffic is on.

You can view how much traffic was sent in the last hour, day, week, month, or a custom timeframe. 

The pie charts show which source addresses and destination addresses receive the most and least bytes of data for the top 10 addresses.

Using the Sankey graph, you can easily identify which source and destination hosts have the most traffic being exchanged between them (top talkers) in your network by the thickest colored bars. Hover over each colored bar to see what destination host the source host is sending traffic to based on how much traffic is being sent between them.


FlowIQ geolocation page
--------------------------
In the Flow IQ geolocation page, CoPilot provides an overview of where traffic is coming from and going to within your cloud fabric over the last hour, day, week, month, or over a custom timeframe. The map shows the approximate location of your Aviatrix managed network constructs across the globe. 

When you set the time period to Last Day, you can more easily see where most of the traffic is coming from and going to.

Security teams can use the geolocation view to easily identify which countries the traffic coming into their network is coming from to help determine if unexpected traffic poses a security vulnerability.

The geolocation traffic information is broken down into various categories displayed in pie charts.

By default, the pie charts show details for all traffic. You can filter the information for the pie charts to show only the traffic you are interested in analyzing.  When you click on any pie-chart slice, CoPilot automatically creates a filter that narrows down the information displayed across all pie charts. Each time you select another slice, CoPilot adds another rule to your filter group.

After you analyze traffic data based on one or more filters, clear the filter(s) so that CoPilot returns to showing data for all traffic.


FlowIQ trends page
--------------------------
In the FlowIQ trends page, CoPilot shows an overview of traffic as it moves over time for traffic based on: 

- A specified destination port.

- A specified source address.

- A specified destination address.

- Total bandwidth based on direction of traffic, ingress or egress. 

By default, the graphs show details for the top ten results. You can filter the information for the graphs to show only the traffic you are interested in analyzing.  When you click on any pie-chart slice (or listed value), CoPilot automatically creates a filter that narrows down the information displayed across all graphs. Each time you select another slice, CoPilot adds another rule to your filter group.

After you analyze traffic data based on one or more filters, clear the filter(s) so that CoPilot returns to showing data for the top ten results.


FlowIQ records page
--------------------------
In the FlowIQ records page, CoPilot shows detailed information about all the traffic flows seen by your multi-cloud transit no matter which cloud the traffic is on. 

The Flow Records table shows you the detailed records of the traffic down to the packet level.

You can filter the flow records in the Flow Records table by hovering over any value in the table and selecting the filter icon. 

You can export the flow records data table to CSV if you want to save them for later viewing or import them into your own analytics platform.


Working with Performance
========================

This section describes the Performance feature of Aviatrix CoPilot.

You access Performance in CoPilot by going to Home > Monitor > Performance or typing Performance in the navigation search.

In Performance, CoPilot displays the resource utilization (telemetry) data for all managed resources (your Aviatrix controller and gateways) across your Aviatrix transit network (multi-cloud and single cloud). You can filter telemetry data based on one or more resources (hosts) located in any cloud. When choosing multiple resources, CoPilot displays the telemetry data for those resources in a comparative graph.

The telemetry data CoPilot displays for managed resources includes:

- Free memory 
- CPU utilization 
- Disk free 
- Rx rate of the interface 
- Tx rate of the interface 
- Rx Tx rate combined of the interfaces 

The system and network metrics on which CoPilot reports telemetry data are the same as those used for triggering notifications. For descriptions of the metrics, see `Metrics used for Triggering Notifications <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#id3>`_ in *Aviatrix CoPilot User Reference Guide*.


Resizing managed resources (gateways) based on policies
--------------------------------------------------------

CoPilot monitors the resource utilization (telemetry) data for all *managed resources* (your gateways and controller) across your Aviatrix transit network (multi-cloud and single cloud). You can create policies that guide you on when to replace or *scale* the managed resources up or down based on the telemetry data. When virtual machines/instances on which your Aviatrix gateways run exceed your policy thresholds, CoPilot generates an alert with the recommended action to take for scaling the resource. You set resource-scale policies on a per VPC/VNet level. All gateways within the given VPC/VNet are monitored.

When configured alarms are triggered based on the monitored telemetry data, CoPilot generates a resource-scale alert and you can take the recommended action to scale the gateways up or down directly from CoPilot.

**ATTENTION:** Consider the following when resizing:

-   When choosing the instance size to scale up or down, the instance sizes displayed are those that are supported for gateways in their respective clouds and CoPilot will use their default configurations for resource settings during launch.
-   The sizes listed do not represent the recommended sizes for your specific scaling needs. It is recommended that you work with your performance team to determine the instance size that best suits the requirements of your network infrastructure prior to scaling.
-   If you resize a gateway that does not have a high availability gateway (HA Gateway does not exist because HA was not enabled on that gateway), a network downtime will occur until the gateway restarts with its new instance size.
-   After you resize a gateway based on a resource-scale alert, it is recommended that you review the resource-scale policy associated with the alert and determine if you want to make any changes to it.

An audit log is kept so you can get a holistic view of how many times your resource-scale policies have been triggered. The audit log is under Performance > Scaling > Events.

For instructions on creating a resource-scale policy, see “Create a resource-scale policy” in *Aviatrix CoPilot User Reference Guide*.

Create a resource-scale policy
--------------------------------

Create policies that guide you on when to replace or *scale* your managed resources (gateways) up or down based on resource utilization (telemetry) data.

To create a resource-scale policy:

1.  Log in to CoPilot.

2.  In Performance > Scaling > Policies, click **+ Scaling Policy**.

3.  In Name, enter the name of your policy. You can enter any value you like.

4.  In VPC/VNets, select the VPC/VNet(s) on which to apply the policy. All gateways within the specified VPC/VNet(s) will be monitored to check if their telemetry data should trigger a resource-scale alert.

5.  In Trigger Condition, configure the alarms you want this policy to raise based on the monitored telemetry data:

    -   Select the metric and the condition for it that must be met to raise an alarm. You can specify multiple alarm conditions. For information about each metric, see `Metrics used for Triggering Notifications`_. 
    -   When multiple alarm conditions are specified, CoPilot generates a resource-scale alert when all the conditions are met.
    -   When the policy alarm condition(s) are met on any gateway in the monitored VPC/VNet(s), CoPilot generates a resource-scale alert.

6.  In Action, for the Wait Duration, specify the duration of time an alarm condition (or group of conditions) must be sustained for CoPilot to generate a resource-scale alert. This setting is to avoid raising alarms for network behavior that causes brief spikes in telemetry data.

7.  In Action, for Operation, specify the action you will want to take when alarm conditions are met for this policy.

    -   Select **Scale Up** if you will want to increase the size of the gateway virtual machine/instance(s). When you receive a resource-scale alert based on this policy, you will have the option to increase the size.
    -   Select **Scale Down** if you will want to decrease the size of the gateway virtual machine/instance(s). When you receive a resource-scale alert based on this policy, you will have the option to decrease the size.
8.  (Optional) If you want to notifiy people via email when resource-scale alerts are generated for this policy, toggle the **Configure Alerts** slider and specify the email recipient(s) to notify.

9.  Click **Save**.

    After you save the policy, CoPilot begins to monitor the VPC/VNets for any resource-scale policy alarms that get triggered. When an alarm is triggered, CoPilot generates an alert in the Performance > Scaling > Recommendations page. You can choose to scale the resource up or down directly from the Recommendations page by clicking on the link in the Recommendation column and specifying the size to use.

    **ATTENTION:** Consider the following when resizing:

    -   When choosing the instance size to scale up or down, the instance sizes displayed are those that are supported for gateways in their respective clouds and CoPilot will use their default configurations for resource settings during launch.
    -   The sizes listed do not represent the recommended sizes for your specific scaling needs. It is recommended that you work with your performance team to determine the instance size that best suits the requirements of your network infrastructure prior to scaling.
    -   If you resize a gateway that does not have a high availability gateway (HA Gateway does not exist because HA was not enabled on that gateway), a network downtime will occur until the gateway restarts with its new instance size.
    -   After you resize a gateway based on a resource-scale alert, it is recommended that you review the resource-scale policy associated with the alert and determine if you want to make any changes to it.


Working with Cloud Routes
=========================

This section describes the Cloud Routes feature of Aviatrix CoPilot.

You access Cloud Routes in CoPilot by going to Home > Troubleshoot > Cloud Routes or typing Cloud Routes in the navigation search.

In Cloud Routes, you can view all routing information for managed resources spanning your Aviatrix transit network, including resources across clouds (multi-cloud) and on-prem (for Site 2 Cloud connections). For multi-cloud, cloud engineers can view the information in a central place without having to log in to individual cloud provider consoles.

In Cloud Routes, you can view routing information for:

- Gateway Routes: Tunnel information for all Aviatrix gateways managed by the Controller across clouds.

  You can view the detailed routing table of each gateway, the state (up or down status) of the route (tunnel/interface), and more detailed information.

  You can filter routes based on gateway name to view the routing table of that specific gateway.

  You can filter routes based on a specific subnet to view all gateways across which the subnet is propagated.

  You can filter routes based on a specific IP address to view all gateways across which a subnet is propagated that includes the specific IP address.

- VPC/VNet/VCN Routes: Routing tables for all VPC/VNet/VCNs in any cloud provider. 

  You can filter routing tables based on a specific route table name.

  You can filter routing tables based on a specific subnet to view all routes across which the subnet is propagated.
 
  You can filter routing tables based on a specific IP address to view all routes across which a subnet is propagated that includes the specific IP address.

- Site 2 Cloud: Data center connections into the cloud. 

  You can view the tunnel status and the gateway to which it is connected.

  You can view the remote IP address and the type of tunnel.
 
- BGP Info: BGP connections from on-prem into the cloud.

  You can view advertised routes being sent to the remote site, learned routes that are being received from the remote site, and a map showing how the BGP connection is connected. The map shows the gateway the BGP connection is established on, the local ASN and IP, the connection name you defined, the remote ASN IP and the remote ASN. 

Performing diagnostics from Cloud Routes
------------------------------------------

You can run diagnostics from Aviatrix gateways running in your multi-cloud network directly from Cloud Routes. Performing diagnostics from Cloud Routes can dramatically reduce the time spent troubleshooting issues. You can also run diagnostics from gateways directly from Topology (Topology V1).

To perform diagnostics from Cloud Routes, use the following steps:

1.  In CoPilot, go to Home > Troubleshoot > Cloud Routes, and then click on the Gateway Routes tab.

2.  In the Gateway Routes view, locate the gateway from which you want to run diagnostics, and click the Gateway Diagnostics icon in its table row.

3.  Perform any of the following diagnostic tasks for the gateway:

    a.  PING: Run pings directly from the gateway to outside of the Aviatrix managed network or to any resource inside the network.

    b.  TRACEROUTE: Run trace route.

    c.  TRACEPATH: Discover the MTU on the path if router supports it.

    d.  TRACELOG: Upload a gateway's tracelog directly to Aviatrix Support. The controller and gateway tracelog is uploaded and the support team notified.

    e.  Test Connectivity: Test the connectivity of the gateway to a specified host running on a specified TCP or UDP port.

    f.  ACTIVE SESSIONS: View sessions that are active on the selected gateway. You can filter active sessions by search criteria. For example, a search on a specific port to see if the gateway has an action session on that port.

    g.  INTERFACE STATS: View interface statistics about the gateway. The number of interfaces or tunnels associated with the gateway is displayed. Click on the name of an interface or tunnel to see its statistical information.

    h.  PACKET CAPTURE: Capture packets on any gateway. Filter on host and port number and specify the capture time. Search and filter by time, source address, destination address, source port, destination port, protocol, flags, length, and info. Select the interface on the physical or virtual interface you want to capture on. Click Start to start the capture, click Stop to stop the capture, then click Download to download the pcap file. The pcap file can be viewed by Wireshark.

    i.  SERVICE ACTIONS: Check the status of gateway services and restart services.
 

Working with Notifications
==========================

This section describes the Notifications feature of Aviatrix CoPilot.

In Notifications, you can configure alerts so that you can be notified about changes in your Aviatrix transit network. The alerts can be based on common telemetry data monitored in the network. For example, you can receive an alert when the status of any Aviatrix Gateway in your network changes.

CoPilot supports Webhook alerts. Webhooks allow you to send notifications to third-party automation systems such as Slack. You can send a Webhook to any system that can take an HTTPS callback. A single alert can notify multiple systems/people. For information on how to customize the webhooks CoPilot generates, see `CoPilot Webhooks <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#id8>`_ in *Aviatrix CoPilot User Reference Guide*.

You can pause alerts. For example, if you are going to perform maintenance tasks on the network that you know will trigger pre-configured alerts, you can pause the alerts temporarily and unpause them when the maintenance is complete. See `Pause Alerts`_. 

In the Notification tab, CoPilot lists all alerts and shows if they are in a triggerd (open) or closed state. You can open an alert from the list to view its lifecycle. CoPilot closes the alert automatically when the alert metric no longer meets the condition to trigger the alert. The alert lifecycle provides a history for every alert that happens in your network environment.

You access Notifications in CoPilot by going to Home > Monitor > Notifications or typing Notifications in the navigation search.

Configure Alerts 
-----------------------

Configure alerts in CoPilot so you can be notified to events that occur in your network.

When configuring alerts, you can choose a notification channel of email or Webhook destinations. Before you begin, specify the email or Webhook addresses in the Notifications tab of CoPilot Settings. For more information about Webhooks, see `CoPilot Webhooks Customization  <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#id9>`_.

To configure alerts:

1. From the sidebar, click Notifications.
#. In Define Alert, type the name you want to use for the alert.
#. In Condition, select the metric or condition that must be met to trigger the alert. For descriptions of the system and network metrics used for triggering alerts, see `Metrics used for Triggering Notifications`_.
#. Click Add Recipients and select the email address or Webhook destination where you want the alert to be sent. Repeat this step for each recipient you want to receive the notification.
#. Click Save. The alert is enabled. When the condition is met for the metric you specified, CoPilot will now send a notification to the email or Webhook system you specified.

Edit Alerts
--------------------

You can edit alert settings you previously configured.

**Prerequisite**: (**If adding new email recipient/new webhook URL**) If you need to add new email recipients or new webhook payload URLs to receive the alert, add the new recipient's email address or new webhook configuration first in the Settings > Notifications tab.

To edit a previously configured notification:

1.  In CoPilot, go to Home > Monitor > Notifications.

2.  From the Configured Alerts list, locate the alert whose configuration you want to change and click on the blue pen icon.

    The Edit Alert screen opens for that specific alert.

3.  Change any of the following configuration settings as needed:

    -   Name of the Alert.
    -   Condition threshold for the alert condition.
    -   Whether you want to receive separate notifications for each host.
    -   Whether you want to apply the alert condition for all hosts.
    -   What email recipients or webhook payload URLs you want to receive the alert when conditions are met.
4.  (Cancel edit) To cancel the edit, click, **Cancel**.

5.  To save your edits, click **Update**.

    Your new configuration is displayed in the Editing Alerts pane. When conditions are met for the alert, your new configuration now applies.

Pause Alerts
--------------------

You can pause alerts.

To pause a previously configured alert.

1.  In CoPilot, go to Home > Monitor > Notifications.

2.  From the Configured Alerts list, locate the alert you want to pause and click the bell icon.

    A Pause badge for the notification will appear.

    |copilot-paused-notification|

    The notification will remain paused until you manually remove the pause.

3.  (Cancel pause) To cancel the pause, click the bell with a slash icon.

    The Pause badge will disappear and notifications will resume.

Metrics used for Triggering Notifications
------------------------------------------

For Aviatrix Controller and Aviatrix gateways, you can configure alerts to be notified to events that occur in your network such as performance bottlenecks or other problems. You configure alerts and the channels to be notified using the notifications feature in Aviatrix Copilot. This section describes some of the system and network metrics on which notifications can be based. When alert conditions are met for a metric, Copilot sends a notification. How you set a condition threshold to trigger an alert will depend on different factors. For example, for system metrics, the instance size can influence the condition threshold that makes sense. For metrics associated with cloud provider-maintained infrastructure, the desired condition threshold may vary between cloud service providers. Work with your network operations team to determine the metric conditions that will trigger alerts in your environment.


**System metrics for triggering notifications**

For Aviatrix Controller and Aviatrix gateways, you can configure alerts based on the following system metrics. Aviatrix gateways report live Linux system statistics (such as memory, CPU, I/O, processes, and swap) for the instances/virtual machines on which they run.

cpu_idle
    CPU Idle — Of the total CPU time, the percentage of time the CPU(s) spent idle.

cpu_ks
    CPU Kernel Space — Of the total kernel space memory on the host (VM/instance), the percentage of memory that is free.

cpu_steal
    CPU Steal — Of the average CPU wait time on the host (VM/instance), the percentage of time a virtual CPU waits for a real CPU while the hypervisor services another virtual processor. 

cpu_us
    CPU User Space — Of the total CPU time, the percentage of time spent running non-kernel code.

cpu_wait
    CPU Wait — Of the total CPU time, the percentage of time spent waiting for IO.

hdisk_free
    Disk Free — The storage space on the disk (volume) that is free/unused.

io_blk_in
    IO Blocks IN — The number of blocks received per second from a block device.

io_blk_out
    IO Blocks OUT — The number of blocks sent per second to a block device.

memory_buf
    Memory Buffer — The amount of memory used as buffers.

memory_cached
    Memory Cache — The amount of memory used as cache.

memory_free
    Memory Free — The amount of idle memory.

memory_swpd
    Memory Swapped — If swapped is enabled, the amount of virtual memory used.

nproc_non_int_sleep
    Processes Uninterruptable Sleep — The number of processes blocked waiting for I/O to complete.

nproc_running
    Processes Waiting To Be Run — The number of processes that are running or waiting for run time.

swap_from_disk
    Swaps From Disk — Memory that is swapped in every second from disk in kilobytes.

swap_to_disk
    Swaps To Disk — Memory that is swapped out every second to disk in kilobytes.

system_cs
    System Context Switches — The number of context switches per second.

system_int
    System Interrupts — The number of interrupts per second, including the clock.
   

**Network metrics for triggering notifications**

For Aviatrix Controller and Aviatrix gateways, you can configure alerts based on the following network metrics.

pkt_rate_total
    Total Rate (in packets) — The total (bidirectional) transmission in packet level per second. Instance size impacts how many packets per second the gateway can handle.

pkt_rx_rate
    Packets Received Rate — The total (received) transmission in packet level per second.

pkt_tx_rate
    Packets Transmitted Rate — The total (transmitted) transmission in packet level per second.

rate_bandwidth_egress_limit_exceeded
    (AWS Only) Bandwidth Egress Limit Exceeded Rate — The number of tx packets dropped because the bandwidth allowance limit was exceeded. This metric is supplied by the Elastic Network Adapter (ENA) driver only on AWS.

rate_bandwidth_ingress_limit_exceeded
    (AWS Only) Bandwidth Ingress Limit Exceeded Rate — The number of rx packets dropped because the bandwidth allowance limit was exceeded. This metric is supplied by the ENA driver only on AWS.

rate_conntrack_limit_exceeded
    (AWS Only) Conntrack Limit Exceeded Rate — The number of packets dropped because the connection count allowance limit was exceeded. This metric is supplied by the ENA driver only on AWS.

rate_peak_received
    Peak Received Rate — The highest bit rate that has been received by the interface on the Aviatrix gateway VM/instance.

rate_peak_sent
    Peak Transmitted Rate — The highest bit rate that has been transmitted by the interface on the Aviatrix gateway VM/instance.

rate_peak_total
    Peak Total Rate — The highest bit rate that has been received and transmitted or both by the interface on the Aviatrix gateway VM/instance.

rate_pps_limit_exceeded
    PPS Limit Exceeded Rate — The number of packets processed (bidirectional) by the Aviatrix gateway per second.

rate_received
    Received Rate — The rate of bits the Aviatrix gateway has received per second.

rate_rx_compressed
    Compressed Packets Received Rate — The number of compressed packets received per second.

rate_rx_drop
    Rate of Packets Dropped While Receiving — The number of packets dropped per second while receiving the packets.

rate_rx_errs
    Errored Packets Received Rate — The number of packets received per second that is flagged by the kernel as errored.

rate_rx_fifo
    Receiver FIFO Frames Rate — The number of overflow events per second when receiving packets.

rate_rx_frame
    Received Frames Rate — The number of frame alignment errors per second when receiving packets.

rate_rx_multicast
    Multicast Packets Received Rate — The number of multicast packets per second.

rate_sent
    Transmitted Rate — The rate of bits per second that has been transmitted by the interface on the Aviatrix gateway VM/instance.

rate_total
    Total Rate — The total (bidirectional) rate of bits processed per second by the interface on the Aviatrix VM/instance.  

rate_tx_carrier
    Transmitted Carrier Frames Rate — The number of frame transmission errors per second due to loss of carrier during transmission.

rate_tx_colls
    Collisions Rate during Transmission — The number of collisions per second during packet transmission.

rate_tx_compressed
    Compressed Packets Transmitted Rate — The number of correctly received compressed packets per second.

rate_tx_drop
    Rate of Packets Dropped during Transmission — The number of packets being dropped per second while sending.

rate_tx_errs
    Errored Packets Transmitted Rate — The total number of transmit problems per second.

rate_tx_fifo
    Transmission FIFO Frames Rate — The number of frame transmission errors per second due to device FIFO underrun/underflow.

GatewayStatus
    Gateway Status — Any gateway status change triggers an alert.

TunnelStatus
    Tunnel Status — Any link status change triggers an alert.

BGPpeeringStatus
    BGP Peering Status — Any BGP peering status change triggers an alert.

  

CoPilot Alert Condition Display Names
--------------------------------------

The following is a list of all alert condition display names shown by CoPilot. 

Many of the alerts are associated with detecting changes in resource utilization (telemetry) data for managed resources as described in see `Metrics used for Triggering Notifications`_.

Some alerts are associated with enhanced security services like `Network Behavior Analytics <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-anomalies>`_ (detecting network traffic finterprint anomalies) and `ThreatIQ with ThreatGuard <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-threatiq>`_ (detecting threat IPs identified by a well known threat-IP source).  

"Processes Waiting To Be Run"

"Processes Uninterruptible Sleep"

"System Interrupts"

"System Context Switches"

"Swaps To Disk"

"Swaps From Disk"

"IO Blocks IN"

"IO Blocks OUT"

"Memory Cache"

"Memory Buffer"

"Memory Swapped"

"Memory Free"

"Percent Memory Free"

"CPU Idle"

"CPU Wait"

"CPU User Space"

"CPU Kernel Space"

"Disk Free"

"Percent Disk Free"

"Disk Total"

"CPU Steal"

"Transmitted Rate"

"Received Rate"

"Total Rate"

"Peak Transmitted Rate"

"Peak Received Rate"

"Peak Total Rate"

"Received Bytes"

"Compressed Packets Received"

"Packets Dropped While Receiving"

"Errored Packets Received"

"Receiver FIFO Frames"

"Received Frames"

"Multicast Packets Received"

"Received Packets"

"Transmitted Bytes"

"Transmitted Carrier Frames"

"Collisions during Transmission"

"Compressed Packets Transmitted"

"Packets Dropped during Transmission"

"Errored Packets Transmitted"

"Transmission FIFO Frames"

"Transmitted Packets"

"Bandwidth Ingress Limit Exceeded"

"Bandwidth Egress Limit Exceeded"

"PPS Limit Exceeded"

"Conntrack Limit Exceeded"

"Linklocal Limit Exceeded"

"Packets Transmitted Rate"

"Packets Received Rate"

"Total Rate (in packets)"

"Compressed Packets Received Rate"

"Rate of Packets Dropped While Receiving"

"Errored Packets Received Rate"

"Receiver FIFO Frames Rate"

"Received Frames Rate"

"Multicast Packets Received Rate"

"Transmitted Carrier Frames Rate"

"Collisions Rate during Transmission"

"Compressed Packets Transmitted Rate"

"Rate of Packets Dropped during Transmission"

"Errored Packets Transmitted Rate"

"Transmission FIFO Frames Rate"

"Bandwidth Ingress Limit Exceeded Rate"

"Bandwidth Egress Limit Exceeded Rate"

"PPS Limit Exceeded Rate"

"Conntrack Limit Exceeded Rate"

"Linklocal Limit Exceeded Rate"

"Gateway Status"

"Tunnel Status"

"BGP Peering Status"

"Underlay Connection Status"

"Threat IP Detected"

"Anomaly Detected"

"Scaling Recommendation triggered"


Underlay Connection Status Alert
-----------------------------------

The Underlay Connection Status alert indicates a potential underlay communication issue. Potential causes of this alert include the following: 

-   A CSP link outage.
-   A misconfigured security group or ACL.
-   A firewall blocking traffic.
-   A router dropping packets.

This alert applies to connections between hosts running Aviatrix gateways. 

Monitored hosts will alert on syslog traffic where it is the source or the destination

When you set this alert for a host(s), CoPilot monitors the syslog from any connection that includes the host as the source or destination. When syslog data indicates a potential problem from each direction of the connection between that host and another host within 30 seconds of the other, the alert is triggered. On the same connection, if the syslog data later indicates the problem is resolved from either direction, the alert is automatically resolved.  


Working with AppIQ
==================

This section describes the AppIQ feature of Aviatrix CoPilot.

In AppIQ, you can generate a report that gives you visibility into security domain and traffic information between any two cloud instances that are connected by way of your Aviatrix transit network. For the source instance and destination instance you specify, CoPilot analyzes network traffic, security domain settings, and route table configurations to provide details that help you understand any problems with the network path between the two instances.

Working with Security
=====================

This section describes the Security functional area of Aviatrix CoPilot.

The Security functional area of CoPilot provides the following:

-   Network Segmentation — Ability to configure network segmentation for Aviatrix Multi-Cloud Transit Segmentation and view visualizations of your network domains and how they can or cannot connect to each other. See `About Network Domains`_.
-   Micro-Segmentation — (If enabled) Ability to create app domains that are used for micro-segmentation. For information about micro-segmentation, see the release notes for Aviatrix Controller 6.7 in `Aviatrix Controller and Gateway Release Notes <https://docs.aviatrix.com/HowTos/Controller_and_Software_Release_Notes.html>`_ and the discussion about `secure networking with micro-segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_ in the Aviatrix product documentation.
-   Egress — Ability to view what sites are being accessed outside of your network. See `Egress`_.
-   Audit — Ability to view changes performed by users on your system.


About Network Domains
----------------------

When you identify groups of spoke and edge VPC/VNets in your infrastructure with the same requirements from a networking point of view (network reachability), you may want to group them so that you can apply connection policies at the group level. You can group them as members of an Aviatrix network domain. A *network domain* is an Aviatrix enforced network of one or more spoke VPC/VNets. The key use case for building network domains is to segment traffic for an enhanced security posture. You use them in conjunction with connection policies to achieve the network isolation for inter-VPC/VNet connectivity that you want for your network.

Note: The term *network domain* used in CoPilot is synonymous with *security domain* used in Controller (the term *security domain* will be deprecated).

The following diagram shows two network domains, one named Blue and one named Green.

|transit_segmentation|

The members of a given network domain can communicate with each other but cannot communicate with members of other network domains unless you allow them to do so by configuring a connection relationship. Two or more connected network domains means that the spoke VPC/VNets that are members of each one can communicate with each other.

When you create a network domain, you give it a unique name, specify the spoke and edge VPC/VNets that are members of it, and specify any connection relationships you want it to have with other network domains.

Spoke and edge VPC/VNets within a given network domain communicate with each other via an Aviatrix transit gateway that is enabled for network segmentation. You must enable transit gateways for network segmentation before creating network domains that will use those transits for communication. The maximum number of network domains on each Aviatrix transit gateway is 200.

When a network domain is saved, the Aviatrix Controller dynamically programs and updates all of the applicable VPC/VNet route tables so that instances in different Spoke VPC/VNets in the same network domain can communicate with each other.

A network domain also applies to the hybrid connection from Aviatrix Transit Gateway to on-prem or remote sites. Each BGP peer or connection can be associated with one network domain.

For instructions on enabling network segmentation by using Aviatrix CoPilot, see `Enabling Network Segmentation for Inter-VPC/VNet Connectivity <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#enabling-network-segmentation-for-inter-vpc-vnet-connectivity>`_.

Enabling Network Segmentation for Inter-VPC/VNet Connectivity
--------------------------------------------------------------

Enable network segmentation for inter-VPC/VNet connectivity using network domains (**Aviatrix CoPilot instructions**).

This section describes how to enable network segmentation for inter-VPC/VNet connectivity using network domains. See also "About network domains". 

These instructions apply if you are using the Aviatrix CoPilot user interface to build network segmentation. To enable network segmentation using Aviatrix Controller, see the discussion about the Aviatrix multi-cloud transit segmentation workflow in the Aviatrix documentation.

To enable network segmentation for inter-VPC/VNet connectivity:

1.  Log in to CoPilot.

2.  From the sidebar, select Security.

3.  Enable network segmentation on each of the Aviatrix transit gateways in your network that will route traffic between network-domain members.

    See `Enable a transit gateway for network segmentation <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#enable-a-transit-gateway-for-network-segmentation>`_.

4.  Create your network domains.

    See `Create a Network Domain <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#create-a-network-domain>`_.

5.  Verify that your network segmentation configuration is implemented the way you want:

    -   In CoPilot, refer to the Security > Network Segmentation > Logical and Physical view visualizations. You should see your network domains. See "About network segmentation visualizations" for a description of the visualizations.
    -   Log in to compute instances that are running in separate spoke VPC/VNets that are members of the same network domain and verify they are allowed to connect to each other and not allowed to connect to spoke VPC/VNets that are not members of the network domain.
    -   Log in to compute instances that are running in different spoke VPC/VNets that are members of different network domains that have a connection relationship and verify they are allowed to connect to each other.

6.  If needed, make changes to your network segmentation configuration.

    Note the following points about changing a network segmentation configuration:

    -   For transit gateways that route traffic in your segments, you can disable them from network segmentation. You should only do this if there are no longer network domains relying on them for connectivity.
    -   For a given network domain, you can change its members (disassociate a spoke or edge gateway from it or associate new spoke or edge gateways to it) and connection relationships to other domains at any time.
    -   If you decide to switch network domains for a given spoke or edge gateway, you must first disassociate the spoke/edge from the network domain it is currently a member of before associating it with another network domain. For example, if you want a spoke to be in Domain_Dev instead of Domain_Prod, you must first remove the spoke from the associations list of Domain_Prod and save the domain and then add the spoke to the associations list of Domain_Dev and save the domain.
    -   Currently, you cannot change the name of a network domain after it has been saved. If you want to use a different name for an existing network segment, you must disassociate all spokes/edges and connection relationships from it and create a new network domain with those configurations with the new name.


Enable a transit gateway for network segmentation
---------------------------------------------------

If you decide to build Aviatrix network segmentation in your network, you must enable network segmentation on all of the transit gateways that will route traffic between the Aviatrix network domains.

To enable a transit gateway for network segmentation:

1.  In CoPilot, go to Home > Secured Networking > Network Segmentation.

2.  In the Network Domain view, click **Transit Gateways**.

3.  In the transit gateway list, set the network segmentation option to **Enabled** for each transit gateway in your infrastructure that will route traffic for the spoke VPC/VNets that will be members of your network domains.

4.  Click **Save**.

    The transit gateway is now enabled for network segmentation.

    ATTENTION: (**Disabled**) If you disable network segmentation on a transit gateway that connects spoke VPC/VNets that are members of a network domain, the spokes will no longer be able to communicate with each other using that transit gateway.


Create a network domain
------------------------

Create a network domain to be used for network segmentation. See also "About network domains".

**Pre-requisite Task:** Before creating an Aviatrix network domain, verify that you have enabled network segmentation on the transit gateways that will route traffic for its members.

To create a network domain:

1.  In CoPilot, go to Home > Secured Networking > Network Segmentation.

2.  In the Network Domain view, click **+ Network Domain**.

3.  In Name, specify a unique name for the network domain. 

    A network-domain name can only have letters, digits, a hyphen (-), and an underscore (_). The name must start with a letter and must have 2-27 characters. For example, **Dev_Domain**.

    **Note:** After you create and save a network domain, you cannot change its name.

4.  From the Associations list, select the spoke and edge VPC/VNets that are to be members of this network domain. Network-domain members can communicate with each other but cannot communicate with members of other network domains unless you configure them to do so in the next step.

5.  From the Connect to Network Domain list, specify the connection relationship of this network domain to other network domains. When you specify a connection relationship, it means the spokes in this network domain can communicate with spokes of the other network domain.

6.  Click **Save**.

    When you save the network domain configuration, Aviatrix Controller dynamically programs and updates the applicable VPC/VNet route tables so that instances in different spoke VPC/VNets in the same network domain \(and in connected network domains, if applicable\) can communicate with each other.

Network segmentation visualizations
------------------------------------

In Secured Networking > Network Segmentation, CoPilot uses visual elements to demonstrate the segments of your Aviatrix transit network that can and cannot communicate with each other if you created Aviatrix enforced network domains. The segments (*network domains*) and their ability to communicate with each other is dictated by the connection relationships you configure. You can enable network segmentation in Aviatrix Controller or in Aviatrix CoPilot. After your network segmentation configuration is enabled and saved, CoPilot dynamically shows the logical and physical view of your network-domain segments and their connection relationships in the network graph logical and physical views.

In **Security Logical View**, CoPilot lists the network domains defined and shows how they can and cannot communicate with each other (Network Domain Relationships). CoPilot also shows the connectivity between gateway VPCs/VNets (spoke or Site2Cloud instances) based on their network domains (Multi Cloud Network Domain Connectivity). The thick colored lines on the circle's edge represent the network domain assigned to the gateway's nodes resting on them and the thin colored lines within the circle represent the connectivity between the gateways.

In **Security Physical View**, CoPilot shows how spoke VPCs/VNets can communicate with other spoke VPCs/VNets based on their allowed network-domain connection relationships. When you hover over a spoke node on the circle, the thin colored lines within the circle represent the connectivity from that spoke to other spokes allowed to communicate with it.


About App Domains
----------------------

In CoPilot, in the Secured Networking > Micro-Segmentation page, you can create app domains. An *app domain* is a grouping of workloads, subnets, or VPC/VNets that require a uniform policy enforcement. When the micro-segmentation feature is enabled, you can create app domains in CoPilot under Security > Micro-segmentation. For detailed information about micro-segmentation and app domains, see the discussion about `secure networking with micro-segmentation <https://docs.aviatrix.com/HowTos/secure_networking_microsegmentation.html>`_ in the Aviatrix product documentation.


Working with Egress Control
============================

In Egress Control, CoPilot shows the URLs, domains, IP addresses that are being accessed outside of your Aviatrix transit network, including:

-   The top ten visited URLs.

-   The top 10 users (source IPs) that are accessing the top 10 visited URLs.

-   The URLs that are being accessed that are not allowed to go through (violating egress rules).

-   The countries that the top 10 visited URLs belong to.

-   The Aviatrix gateways the egress traffic is traversing.

-   The rules configured on the Egress Gateway.

You access Egress Control in CoPilot by going to Home > Secured Networking > Egress Control or typing Egress in the navigation search.


Working with ThreatIQ
=====================

This section describes the ThreatIQ feature of Aviatrix CoPilot.

You access ThreatIQ in CoPilot by going to Home > Security Services > ThreatIQ or typing ThreatIQ in the navigation search.

ThreatIQ enables you to monitor for security threats in your Aviatrix cloud network, set alerts when threats are detected in the network traffic flows, and block traffic that is associated with threats. All of these capabilities apply to your entire cloud network (multi-cloud or single cloud) that is managed by Aviatrix Controller.

ThreatIQ provides visibility into known malicious threats that have attempted to communicate to your cloud network. Aviatrix Cloud Network Platform communicates with a well known threat-IP source to stay abreast of malicious sites or IP addresses known to be bad actors (*threat IPs*). Netflow data is sent to CoPilot from Aviatrix Gateways in real time and CoPilot analyzes the traffic and compares it with a database of known malicious hosts to quickly detect traffic from threat IPs.

In ThreatIQ Threats view, a geographical map shows you the approximate locations of known malicious IPs that have communicated with your network within the specified time period selected. You can view the severity level of threat IPs detected and their associated attack classifications (as categorized by the well known threat-IP source).

In ThreatIQ, you can view detailed information about each threat record including the source IP of the threat, the destination IP, the gateways where the threat-IP traffic traversed, the associated traffic flow data (date and time, source and destination ports, and so on), and threat information such as why it was deemed a threat. For each threat record, you can open a network topology map where the associated compromised gateway is highlighted. You can drill down into the map to the instance level where the compromised instance (that is communicating and egressing to the threat IP) is highlighted. This topology view makes it easy to identify the subnet the compromised server was deployed on and the transit gateway it was using to communicate with the threat IP.

While the ThreatIQ Threats view provides visibility into the threats detected in your network, the ThreatGuard view enables you to take actions on those threats:

- **Enable alerts.** In ThreatGuard view, you can enable alerts so you are notified when threat-IP traffic is first detected. You can configure your preferred communication channel (email) for sending these ThreatGuard alerts. In CoPilot, in the Notifications option, you can view historical information about when the alerts were triggered, including the names of the gateways within the threat-IP traffic flow. ThreatGuard alerts are based on threat-IP data stored in a database that is regularly updated with the most current threats (new or removed). When a threat IP is removed from the threat-IP source (that is, the IP is no longer deemed malicious), the update is automatically pushed to Aviatrix Cloud Network Platform

- **Block threat-IP traffic.** In ThreatGuard, you can enable blocking of threat-IP traffic. To block threat-IP traffic, alerts must first be enabled. When blocking is enabled, the Controller upon first detecting a threat IP in a traffic flow, instantiates security rules (stateful firewall rules) on all gateways that are within that flow (all gateways within the VPC/VNet/VCN) to immediately block the threat-IP associated traffic. If the threat IP is removed from the database of the threat-IP source, the Controller automatically removes the security rules for that specific threat IP from the affected gateways and associated traffic is no longer blocked. Otherwise, the security rules for that specific threat IP remain enforced. NOTE: If you disable ThreatGuard blocking, the action removes all existing firewall rules instantiated by Aviatrix Controller for all threats (that is, all threat IPs) detected up to that point.

You can add a custom list of IP addresses (you consider threat IPs) to the database of known malicious hosts used by ThreatIQ with ThreatGuard. For information, see Add a Custom ThreatIQ IP List.

Enable ThreatGuard Alerts
---------------------------

Enable ThreatGuard alerts to receive notifications when threat IPs are detected in your network traffic.

To enable ThreatGuard alerts, you must log in to CoPilot with a user account that belongs to a group that has either ``all_write`` or ``all_security_write`` permissions.

To enable ThreatGuard alerts, use the following steps:

1. In CoPilot, go to Home > Security Services > ThreatIQ.
2. Click the ThreatGuard tab.
3. Click the **Send Alert** button and then click the Send Alert slider so that it slides to the right.
4. In the ThreatGuard Configuration dialog, click Add Recipients. Select the email address destination to which you want to send ThreatGuard alerts. Repeat this for each recipient you want to receive the alert.
5. Click **CONFIRM**. ThreatGuard alerts are enabled. When a threat IP is detected in a traffic flow, CoPilot will now send a notification to the email you specified. The notification will state the threat IP that was detected in the blocked traffic.
6. (Optional) Verify that ThreatGuard alerts are enabled: A) From the sidebar, click Notifications. B) In the Configured Alerts list, locate the entry with the name **ThreatGuard Alert** that has the condition **When Threat IP Detected**. This entry validates that alerts are enabled.
7. (Optional) Enable ThreatGuard blocking. After alerts are enabled, you can opt to enable ThreatGuard blocking. See Enable ThreatGuard Blocking for instructions. When ThreatGuard blocking is enabled, Aviatrix Controller pushes down firewall policies to block threat-IP associated traffic as soon as it is detected.

About ThreatGuard Firewall Rules
--------------------------------

ThreatGuard firewall rules are stateful firewall rules that are applied to Aviatrix gateways to block traffic for threats detected by the ThreatIQ with ThreatGuard feature. Threats are either IP addresses from the threat-IP source that Aviatrix Cloud Network Platform communicates with or from your custom ThreatIQ IP List. For information about ThreatIQ, see Working with ThreatIQ.

Aviatrix CoPilot scans flow records for threats. When ThreatGuard blocking is enabled, when CoPilot detects a threat IP in a traffic flow, it calls the controller with the firewall rules to add. The controller instantiates the ThreatGuard firewall rules on all gateways that are within that flow — all gateways within the VPC/VNet — to immediately block the threat-IP associated traffic.

By default, when ThreatGuard blocking is enabled, blocking occurs in all VPCs/VNets. When configuring ThreatGuard blocking, you have the option to exclude any VPC/VNet in your network from ThreatGuard blocking.

If a threat IP is removed from the database of the threat-IP source or from your custom ThreatIQ IP List, the controller automatically removes the ThreatGuard firewall rules for that specific threat IP from the affected gateways and associated traffic is no longer blocked. Otherwise, the ThreatGuard firewall rules for that specific threat IP remain enforced.

**Important:** If you disable ThreatGuard blocking, the action removes all existing ThreatGuard firewall rules instantiated by Aviatrix Controller for all threats (all threat IPs) detected up to that point.

When a ThreatGuard firewall rule is newly applied on a gateway that has existing rules applied, note the following:

-   The ThreatGuard firewall-rule drop policies are in addition to the existing firewall policies applied to the same gateways.
-   If you configure ThreatGuard firewall rules to *append* instantiated rules (default), Aviatrix Controller adds the ThreatGuard rule to the end of the rules list at the time the threat triggered the rule.
-   If you configure ThreatGuard firewall rules to *prepend* instantiated rules, Aviatrix Controller adds the ThreatGuard rule to the beginning of the rules list at the time the threat triggered the rule. **Note**: The prepend feature is available starting from Controller release 6.6.5544.
-   If you change the append/prepend configuration, the new configuration applies to new rules. The rules instantiated before the configuration change will retain their placement in the rules list.
-   Firewall rules are followed in order by the first matching condition. The rule that applies first is the action taken and no subsequent rules are used.

Enable ThreatGuard Blocking 
---------------------------

Enable ThreatGuard blocking to block traffic at Aviatrix Gateways where threat IPs have traversed. When blocking is enabled, Aviatrix Controller pushes down firewall policies to block threat-IP associated traffic as soon as it is detected. All gateways in the VPC/VNet will block when threat IPs traverse them.

To enable ThreatGuard blocking, you must log in to CoPilot with a user account that belongs to a group that has either ``all_write`` or ``all_security_write`` permissions.

To enable ThreatGuard blocking:

1.  In CoPilot, go to Home > Security Services > ThreatIQ.

2.  Click the ThreatGuard tab.

3.  Verify that ThreatGuard alerts are enabled. The alerts are enabled when the Send Alert status has a green checkmark. ThreatGuard alerts must be enabled before blocking can be enabled. See *Enable ThreatGuard Alerts* for instructions.

4.  Click the **Block Traffic** button and then click the Block Threats slider so that it slides to the right. 

    ThreatGuard blocking is enabled. Aviatrix Controller now enforces firewall policies to block threat-IP associated traffic as soon as it is detected. Each time a different IP threat is detected, a new firewall rule is instantiated on the gateway. By default, all gateways in a VPC/VNet will block the associated traffic. You can be selective about which VPC/VNets block threat IPs in the next step.

5.  (Optional - Deny ThreatGuard protection) Select VPC/VNets for which you do not want ThreatGuard blocking enabled. 

    -   For Configure Exclusion List for VPCs, click the pen icon. 
    -   In the Protected with ThreatGuard list, tick the check box of each VPC/VNet for which you do not want ThreatGuard blocking enabled. 
    -   Transfer the VPC/VNets to the Not Protected list and click **Save**. 
    -   For any VPC/VNets listed in the Not Protected list, the gateways in them will not block threat IPs when detected.

6.  (Optional - Prepend ThreatGuard rules) By default, ThreatGuard firewall rules *append* instantiated rules — Aviatrix Controller adds the ThreatGuard rule to the end of the rules list at the time the threat triggered the rule. If you want Controller to add the ThreatGuard rule to the beginning of the rules list, select the Prepend radio button. For more information, see "About ThreatGuard Firewall Rules". 

7.  (Optional - Disable blocking) **ATTENTION:** When you disable ThreatGuard blocking, the action removes all existing ThreatGuard firewall rules instantiated by Aviatrix Controller for all threats detected up to that point. 

    -   To disable blocking, in ThreatGuard view, click the Block Traffic check and then click the Block Threats slider. Click **Confirm** to disable all ThreatGuard firewall rules and stop ThreatGuard blocking. 

Add a Custom ThreatIQ IP List 
-----------------------------

Add a custom list of IP addresses to the database of known malicious hosts used by ThreatIQ with ThreatGuard. The custom threat IPs are handled by Aviatrix Controller in the same manner as the threat IPs identified through ThreatIQ with ThreatGuard (detection, alerts, blocking, and unblocking functionality is the same).

You must log in to CoPilot with a user account that has `all_write` or `all_security_write` permissions to add, modify, or delete a custom ThreatIQ IP list.

To add a custom ThreatIQ IP list:

1.  In CoPilot, go to Home > Security Services > ThreatIQ.

2.  Click the Custom Threat List tab.

3.  Click **Add Threat IP** and enter the details:

    -   IP — An IP address you consider a threat IP.
    -   Severity — Any term you want to use that indicates the severity of this threat IP.
    -   Color — The color you want to associate with this threat IP. The color is used in lists and charts of the ThreatIQ dashboard.
    -   Classification — Any term you want to use that indicates the classification of this threat IP.
    -   Info — Any custom note you want to state for this threat IP.
4.  To add more IP addresses to the list, click the plus sign and enter the details for each one.

5.  Click **Confirm**.

    The IP addresses are added to the database of known malicious hosts used by ThreatIQ with ThreatGuard.

    To change a threat IP entry, click the pen icon, double-click on a value to change it, and click the save icon. Threat records generated prior to the change retain earlier values (for example, if you change the color from blue to red, threat records generated before the color change still show blue).

    To delete an IP address from the list, click the trash icon. The IP address is removed from the database of known malicious hosts used by ThreatIQ with ThreatGuard. If ThreatGuard blocking has been applied for this threat IP, the Controller automatically removes the security rules for that specific threat IP from the affected gateways and associated traffic is no longer blocked.

Threats View Properties
-----------------------

Descriptions of the properties in the CoPilot ThreatIQ Threats view listed in alphabetical order:

-   **All Threats (Total)**

    Since ThreatIQ was turned on, the number of times total an action or event was detected that was correlated with any of the unique threat IPs.

-   **Start Time and End Time**

    (Start Time) Date and time from which you want to view what malicious IPs were occurring in the fabric of your Aviatrix transit network.

    (End Time) Date and time up to which you want to view what malicious IPs were occurring in the fabric of your Aviatrix transit network.

-   **Threat Classifications**

    Of the number of threats in the time period specified (by Start Time and End Time), what number of them is in a specific threat classification.

-   **Threat Count**

    The number of times the unique Threat IPs have been detected across your Aviatrix transit network within the time period specified (by Start Time and End Time).

-   **Threat Details**

    The Threat Details dialog provides a network topology diagram highlighting the location of the compromised host in your network, the flow data and overall netflow, and a summary of the threat severity as defined by the threat-IP source.

-   **Threat Severity**

    Of the number of threats in the time period specified (by Start Time and End Time), what number of them is in the Major threat severity category and Medium (Audit) threat severity category.

-   **Threats Over Time**

    Over the time period specified (by Start and End Time), a graph showing the number of threats that were detected. Spikes in the graph reflect days when more threats were detected.

-   **Total Threats Over Time**

    Over the time period specified (by Start and End Time), a graph showing the total count of threats. The count accumulates as you see more threats over time in that time period.

-   Unique Threat IPs

    The number of unique threat IPs that were detected across your Aviatrix transit network within the time period specified (by the Start Time and End Time). These are malicious IP addresses defined by a well known threat-IP source.

ThreatGuard View Properties
---------------------------

Descriptions of the properties in the CoPilot ThreatIQ ThreatGuard view listed in alphabetical order:

-   **Blocked Threat IPs**

    The number of unique threat IPs that traffic was blocked for.

-   **Block Traffic**

    Enable Aviatrix Gateways to block traffic that is associated with a threat IP.

-   **Firewall Rules Per Gateway**

    A pie chart showing the percentage of rules that are instantiated on each Aviatrix gateway.

-   **Gateways**

    The number of Aviatrix gateways that have instantiated firewall rules to block threat IP traffic.

-   **Rules**

    The number of firewall rules that were instantiated to block threat IP traffic.

-   **Send Alert**

    Enable CoPilot to send alert notifications (to one or more email/Webhook systems) when traffic that is associated with a threat IP is detected.

-   **Threats Blocked Per Gateway**

    A pie chart showing the percentage of threats that are blocked on each Aviatrix gateway.

-   **View Rules dialog**

    The View Rules dialog shows the ThreatGuard firewall rules that are applied on Aviatrix gateways.


Working with Geoblocking
=========================

This section describes the Geoblocking feature of Aviatrix CoPilot.

You access Geoblocking in CoPilot by going to Home > Security Services > Geoblocking or typing Geoblocking in the navigation search.

Geoblocking allow you to select a country to block IP traffic coming into and coming from the country. When GeoBlocking is enabled for a country, a tag-based security policy is implemented on each gateway to deny traffic for IP addresses associated with the country. 

All gateways in your VPC/VNets will block. When you unblock a country, the tag is removed from all gateways and the stateful firewall rules instantiated on them for that country are removed.

Enable Geoblocking
--------------------

Enable GeoBlocking to block IP traffic coming into and coming from a country.  

**Attention**: A CSP-region IP may be blocked if that region is in the blocked country. For example, if the public IP for your service is registered in a specific country by the CSP and you block that country.

By clicking on the country name, you can view recent IP traffic going to or coming from that selected country in the time range you specify.

To enable Geoblocking, you must log in to CoPilot with a user account that belongs to a group that has either ``all_write`` or ``all_security_write`` permissions.

To enable Geoblocking, use the following steps:

1. In CoPilot, go to Home > Security Services > Geoblocking.

   A list of the countries you can block and unblock displays. The IPs Observed column shows you the number of IP addresses CoPilot observed from each country when scanning Netflow records over the last seven days. If you click on a country name, you can view recent IP traffic going to or coming from that selected country in the time range you specify.

2. In the Status column, toggle the switch to **Blocked** for each country you want to block IP traffic. 

3. Click **Save**. 

   IP traffic coming into and coming from that country will be blocked on each Aviatrix gateway.

   **NOTE:** Each time you toggle the switch for a country to block or unblock, you must click **Save** for your changes to take effect. 

 
Working with Reports
=====================

This section describes the Reports feature of Aviatrix CoPilot.

You access Reports in CoPilot by going to Home > Administration > Reports or typing Reports in the navigation search.

In Reports, you can create an inventory report, a resource utilization (telemetry statistics) report, and a FlightCheck report. 

About Inventory Reports
--------------------------

Inventory reports give you detailed information about your inventory of managed resources (resources managed by Aviatrix Controller) in a single cloud or across all clouds in your multi-cloud network.

You can quickly create reports that show on which cloud, region, and VPC/VNet specific managed resources are running. 

You can add columns to the report for different properties associated with resource types. 

You can apply complex filters to customize the data that gets included in the report for each resource type.

Create an Inventory Report
--------------------------

Create a report showing inventory of managed resources (resources managed by Aviatrix Controller) in a single cloud or across all clouds in your multi-cloud network.

You can create a custom report by answering questions that guide you to include only those managed resources you want in your report. You can apply complex filters to further narrow down the contents of the report.

To create an inventory report:

1.  Log in to CoPilot

2.  From the sidebar, click Reports.

3.  In **Select the cloud(s)**, CoPilot shows icons for the clouds in which you have managed resources. Select one of the following:

    -   (Multi-cloud) If the report is to include managed resources that span across all of your clouds, click **All clouds**.
    -   If the report is to include managed resources for a single cloud, click the icon of the applicable cloud provider.
4.  In **Select the region(s)**, CoPilot shows the regions in which you have managed resources for the cloud(s) you specified in the previous step. Select each region that includes managed resources you want to include in your report. If the types of managed resources to include are within all regions, click **Select All**.

5.  In **Select the VPC(s)**, CoPilot shows all the VPC/VNets in which you have managed resources for the region(s) you specified in the previous step. Select each VPC/VNet that includes managed resources to include in your report. If the types of managed resources to include are within all VPC/VNets, click **Select All**.

6.  In **Select resource type(s)**, select the resource type icons to specify the resource types to include in the report.

7.  In **Select the properties**, CoPilot shows various properties that are associated with the resource types you specified in the previous step. Select a property to include it as a column in the report. The report preview pane automatically includes the *name* property of the managed resource and its *cloud*, *region*, and *VPC/VNet* properties (you can deselect them to remove them from the report). You can use the Search box to locate a property associated with data to include in the report. For example, for the gateway resource type, typing *size* in the search box returns a result `vpc_size`. By including `vpc_size` in the report, you can view what size instance each of those gateways are currently running on (the `vpc_size` property signifies the size of gateways). As another example, typing *trans* in the search box returns properties that include `transit` in the name, such as `transit_vpc`. By including the `transit_vpc` property in the report, you can view which of those gateways are transit gateways.

8.  In **Add filters**, you can optionally use filters to narrow down the managed resources to include in your report. For any property, you can set a filter using the property's value (TIP: When you include a property in the report, the value of it is listed in its associated report column). For example, if you have hundreds of gateways in your environment and want to narrow down the contents of the report to only transit gateways, add a filter with the rule to show only transit gateways (click ADD FILTERS, click ADD RULE, and then set field `gateway.transit.vpc` with the filter operator ``==`` set to value `yes` and click APPLY FILTERS). If you add a filter on a property you did not previously select to be included (displayed) in the report, the filter is applied but the property is not added to the report. In this case, it may be helpful to take note of your applied filter for future reference. NOTE: Currently, filters cannot be saved.

9.  (Optional) Save, download, or print the report. For printing, select the paper size and page orientation.

10. (Optional) To generate another report, clear filters (click CLEAR FILTERS if you created filters) and deselect any criteria that does not apply to your next report. Deselect the properties, deselect the resource types, deselect the VPCs/VNets, deselect the regions, and deselect the clouds as needed to report only on the data you want.

Create a Resource Utilization Report
------------------------------------

Create a report that summarizes the resource utilization (telemetry) data for Aviatrix gateways in a single cloud or across all clouds in your multi-cloud network. CoPilot exposes approximately 80 performance metrics (system and network metrics). You can select from any or all performance metrics to report on for the time period you specify. Per gateway, when reporting on network metrics, CoPilot aggregates the metrics across all interfaces (default), or if specified, reports the metrics for each interface.

CoPilot shows all gateways that are managed by Aviatrix Controller in any of your clouds, regions, and VPC/VNets. You create a custom report by selecting options that guide you to include only those Aviatrix gateways and performance metrics you want in the report.

To create a resource utilization report:

1.  Log in to CoPilot.

2.  From the sidebar, click Reports.

3.  For Resource Utilization Report, click **Start**.

4.  Select the period of time for which you want to report on resource utilization data. You can set the last hour, last day, last week, last month, or a custom time period.

5.  In **Select gateway(s)**, select the checkboxes for all Aviatrix gateways for which you want to report on telemetry data. You can also choose to report on telemetry data for your controller. Note the following points:

    If you want to report on *network metrics* for any given gateway AND you want to see the network metrics broken down by interface (not gateway aggregate), you must select both the **Show interface options** checkbox and the applicable per-gateway **Show per-interface graphs** checkbox. You can select any or all interfaces.

    You can use the options in the table to do the following:

    -   Search field: Search for gateways based on the following gateway properties:
        -   Gateway Name
        -   Gateway Type
        -   Cloud
        -   Region
        -   VPC Name
        -   VPC ID

    -   Columns: Remove any gateway-property columns from the table that are shown by default.
    -   Filters: Use custom filters to further narrow down the gateways to include in the report. Use the values for the gateway properties listed above to create your filters.
    -   Use the menu of each column heading to control how information displays in the table or to hide a column.
    -   Compact: Select the style of the report you want.

6.  For **Select system metric(s)** and **Select network metric(s)**, select any or all metrics you want to include in the report.

7.  In **Choose report format**, select how you want the information to be organized in the report:

    -   Group by metric (default): Each page in the report is a different metric with all selected gateways listed for that metric. This is useful if you want to compare metrics between gateways.
    -   Group by gateway: Each page is a gateway with its own metrics listed.

8.  Click **Create Report**.

9.  (Optional) For reports that are grouped by metric, the metric charts use a linear scale by default. Depending on the data you are reporting on, you may choose to use a logarithmic scale. Enable logarithmic scale for charts by clicking on the slider.

10. (Optional) Download the report using the blue download icon.

11. (Optional) To generate another report, at the top of the Resource Utilization Report page, click the arrow to return to the main Reports page and repeat the procedure.


Create a FlightCheck Report
------------------------------------

Create a report showing the results of validation checks run on your Aviatrix platform. A FlightCheck report will show you the following: 

-   If your CSP account status is not intact (the IAM policy deviates from the Aviatrix default policy).

-   If backups are not configured.

-   If gateways are down.

-   If syslog is not configured.

-   If SAML login is not enabled.

-   If connections are down.

-   If your enterprise runs SAP, the resources communicating with SAP services (lists SAP known ports). 

The report also shows your current controller version, the latest controller version, the controller Apache version, and your current CoPilot version. 

To create a FlightCheck report:

1.  Log in to CoPilot.

2.  From the sidebar, click Reports.

3.  For FlightCheck Report, click **Start**.

    The FlightCheck report is generated.
 

Working with Anomalies
=======================

This section describes the network behavior analytics feature of Aviatrix CoPilot.

You access the network behavior analytics feature in CoPilot by going to Home > Security Services > Anomaly Detection or typing Anomaly in the navigation search.

In the Anomaly Detection page, you can enable CoPilot to perform continuous network behavior analysis on your cloud workloads on a per VPC/VNet basis so that CoPilot can learn the routine behaviors of the VPC/VNets based on a group of metrics. The analysis enables CoPilot to detect any unusual network behaviors (anomalies) that could represent threats on your network, systems being down, high traffic for a planned launch, or some other abnormal behavior. You can choose to be alerted when anomalies are detected so you can carry out any needed network operations activities to secure your workloads.

**How Does Network Behavior Analytics Work?**

When enabling network behavior analytics, CoPilot establishes a VPC/VNet network-behavior *fingerprint* that is custom to your organization's multi-cloud activity. The fingerprint is a collection of data and traffic patterns for traffic going into and coming out of all end instances within a VPC/VNet and is the result of CoPilot's profiling of the VPC/VNet over a configurable period of time or *learning period*. The fingerprint is a learned data set and behavioral baseline against which CoPilot can detect abnormal network operating patterns or *anomalies*.

At the conclusion of the learning period, CoPilot can begin detecting anomalies from the fingerprint of the applicable cloud workloads and begin sending alerts for the same if alerts are enabled. The alerts signify active network behaviors that could represent expected network activity or could represent an active threat such as data exfiltration or lateral movement. When CoPilot sends an alert for anomalies detected, the alert contains the details of the metric(s) whose percentage of deviation was outside of the normal fingerprint.

Anomalies are assigned a low, medium, or high severity. The severity level depends on how much the overall traffic that caused the anomaly deviated from established thresholds derived from fingerprinted operating patterns:

-   Low — Less than 50% deviated from outlier threshold.
-   Medium — Less than 50 - 75% deviated from outlier threshold.
-   High — More than 75% deviated from outlier threshold.

CoPilot considers various metric data points when establishing the network-behavior fingerprint. When analyzing active network behavior, CoPilot tracks how many standard deviation points the active network behavior of each metric is from the behavior of the fingerprint. A single anomaly can be associated with one or multiple metrics that have deviated from the behavior of the fingerprint.

You can set a sensitivity level for detecting anomalies that determines how small or large a deviation in normal traffic patterns must be for CoPilot to consider it an anomaly. A higher sensitivity means any small deviation from the fingerprint behavioral baseline is considered an anomaly. High sensitivity could cause alert fatigue when alerts are enabled. A lower sensitivity means an anomaly is detected only when there is a large deviation from the fingerprint behavioral baseline. In this case, anomalies that are greater outliers are detected.

When detecting anomalies, CoPilot compares active network behavior at one hour intervals against the fixed fingerprinted data set.

For instructions on enabling network behavior analytics, see `Enable Network Behavior Analytics <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#enable-network-behavior-analytics>`_.

For the information CoPilot reports when detecting anomalies, see `Dashboard for Anomalies Detected <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#dashboard-for-anomalies-detected>`_.

For the fingerprint metrics that can trigger anomalies, see `Network Behavior Analytics Metrics <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#network-behavior-analytics-metrics>`_.


Enable Network Behavior Analytics
----------------------------------

Enable CoPilot to perform network behavior analysis on any VPC/VNet in your multi-cloud network. See "Working with Anomalies" for information about how CoPilot detects anomalies when network behavior analytics is enabled.

After you enable network behavior analytics on a VPC/VNet, the learning period must be completed before CoPilot will start detecting anomalies and (if enabled) sending alerts for the same.

**Note:** You must click **Save** on the Anomalies Configuration page to save any and all changes that you make to your network behavior analytics configuration including those made in the Monitor VPC/VNets dialog. When you are done with your configuration, verify the message "Unsaved Changes" is not displayed at the top of the Configuration page.

To enable network behavior analytics, you must log in to CoPilot with a user account that belongs to a group that has either ``all_write`` or ``all_security_write`` permissions.

To enable network behavior analytics:

1.  Log in to CoPilot.

2.  From the sidebar, click **Anomalies**.

3.  In the Configuration page, set the sensitivity level for detecting anomalies in your network. The configuration applies across all VPC/VNets for which network behavior analytics is enabled. You can change this global setting later if you decide to use a different sensitvity level later.

    High — Anomaly is detected for any small deviation from the behavioral baseline established in the VPC/VNet fingerprint. High sensitivity can cause alert fatigue when alerts are enabled.

    Low — Anomaly is detected for only the large deviations from the behavioral baseline established in the VPC/VNet fingerprint. In this case, anomalies that are greater outliers are detected the most.

4.  (Optional) Click the Alerts slider to enable CoPilot to send alerts when it detects anomalies. In the Create Alert dialog, click **Add Recipient** and select the channels you want to receive alerts. Click **Save**.

5.  Click the pen icon to open the dialog to specify the VPC/VNets you want enabled for network behavior analytics.

6.  In the Available list, tick the check box of each VPC/VNet you want enabled for network behavior analytics and transfer them to the Monitored list. TIP: The name of the VPC/VNets in the Monitored list that apply to your current configuration turn green.

7.  In Learning Period, set the number of weeks you want CoPilot to spend learning the network behavior of the selected VPC/VNets. The minimum learning period is 2 weeks and the maximum is 52 weeks.

    At the end of the learning period, CoPilot establishes a network-behavior fingerprint for each VPC/VNet. The fingerprint is a collection of data and traffic patterns for traffic going into and coming out of all end instances within your VPC/VNets. The fingerprint is the result of CoPilot’s learning of that data and traffic and cannot be changed after it is established. To detect anomalies, CoPilot compares all future active network behavior at one hour intervals against the fixed fingerprinted data set. You can clear the fingerprint for a VPC/VNet and have CoPilot learn a new fingerprint. See the step below (Relearn network-behavior) for details.

8.  Click **Save** to apply your settings and then click **Save** in the Configuration page to save the settings. After your configuration is saved, you will see the message "Configuration Saved Successfully" at the top of the page.

9.  (View details of monitored VPC/VNets) In the Configuration page, after your configuration is saved, you will see the message "Configuration Saved Successfully" at the top of the page.

    To view details about the VPC/VNets you enabled for network behavior analytics that are still in the learning phase, click the table list icon or *in Learning Phase* label. The status of "Active" in the Learning column means they are still in the network-behavior learning period. The date in the Detection column is the date by which their learning period completes and CoPilot will begin detecting and reporting on anomalies.

10. (Relearn network-behavior of a VPC/VNet) You can clear the fingerprint for a VPC/VNet and have CoPilot learn a new fingerprint for it. If a VPC/VNet is in the active learning state, and you want to learn a new fingerprint, remove the VPC/VNet from the profiling list, and save that change in the Anomalies Configuration page. You can then repeat steps 5 through 8 to re-add the VPC/VNet to the profiling list and begin a new learning period that will establish a new fingerprint.

11. (Add to CoPilot's learning) After CoPilot starts detecting anomalies, it reports the details of each in the Dashboard for Anomaly Detection. In the list of anomalies detected, you can use the thumbs down icon to indicate whether an anomaly reported is not actually an anomaly. In this way, you can add to CoPilot's learning to detect anomalies more accurately for your network.

Dashboard for Anomalies Detected
---------------------------------

The Anomaly Dashboard shows details about the anomalies CoPilot detected, historically for the last hour, last day, last week (default), and last month, for all VPC/VNets for which network behavior analytics was enabled.

You can use the date picker to view historical anomalies for a custom timeframe.

By default, the latest anomaly detected is listed at the top of the anomaly list table.

For a reported anomaly, you can use the thumbs down icon to indicate whether an anomaly reported is not actually an anomaly. CoPilot will consider the new data point in addition to the existing fingerprinted baseline to improve its identification of anomalies moving forward.

**Total Anomalies** — Total number of anomalies detected within the specified time period.

**VPCs/VNets with Anomalies** — The number of profiled VPC/VNets in which any of the anomalies were detected within the specified time period.

**Metrics causing Anomalies** — Of all the metrics in the fingerprint CoPilot considers for detecting anomalies, the number of metrics whose normal-behavior deviation have caused anomalies within the specified time period.

**Anomalies by Severity** — The number of anomalies that are considered low, medium, or high in severity where the severity level is:

-   Low — The overall traffic that caused the anomaly is less than 50% deviated from outlier thresholds.

-   Medium — The overall traffic that caused the anomaly is less than 50 - 75% deviated from outlier thresholds.

-   High — The overall traffic that caused the anomaly is more than 75% deviated from outlier thresholds.

**Anomalies by VPC/VNet** — The number of anomalies that occurred in each VPC/VNet within the specified time period.

**Anomalies by Top Metric** — For the metrics within the VPC/VNet fingerprint, the ones that caused the most anomalies in the specified time period and the number of anomalies they caused.

**Anomalies Over Time** — The number of anomalies that occurred on specific dates with the severity of the anomaly shown as green (Low), yellow (Medium), or red (High).

**Total Anomalies (Cumulative)** — The cumulative number of anomalies that occurred over time from the start of the detection period for all profiled VPC/VNets.

Table of Anomalies — A list of the anomalies that were reported:

-   Detected At — Timestamp of the anomaly. Each row in the table represents an anomaly classified by its timestamp.

-   VPC/VNet — The VPC/VNet and cloud environment where the anomaly occured.

-   Cloud — The cloud environment where the VPC/VNet resides.

-   Metrics — Of the metrics CoPilot used to establish theVPC/VNet fingerprint, the number of metrics that triggered the anomaly. Hover over the number to see the percentage of deviation over the VPC/VNet fingerprint that occurred for the metric(s).

-   Severity — The severity level of the anomaly.

-   Thumbs Down icon — Use the thumbs down icon to indicate whether an anomaly reported is not actually an anomaly. CoPilot will consider the new data point in addition to the existing fingerprinted baseline to improve its identification of anomalies moving forward.


Network Behavior Analytics Metrics
-----------------------------------

When you enable network behavior analytics on a VPC/VNet, CoPilot learns its normal behaviors based on the group of metrics described in this section. The metric descriptions apply to all end instances in a VPC/VNet that is being monitored for network behavior analytics.

-   **Egress Bytes**

    Total bytes of data for all outbound traffic sent from all end instances.

-   **Egress IPs**

    Total count of unique IP addresses all end instances are talking to for outbound traffic.

-   **Egress Ports**

    Total number of unique ports all end instances are sending traffic to for outbound traffic.

-   **Ingress Bytes**

    Total bytes of data from all the inbound traffic coming to all end instances.

-   **Ingress IPs**

    Total count of unique IP addresses all end instances are receiving traffic from.

-   **Ingress Ports**

    Total number of unique ports all end instances are receiving traffic from for inbound traffic.

-   **Total Bytes**

    Total bytes of data for traffic coming out of and traffic going into all end instances.

-   **Total Packets**

    Total number of packets for traffic coming out of and traffic going into all end instances.

Working with CostIQ 
=========================

This section describes the CostIQ feature of Aviatrix CoPilot. 

The CostIQ feature gives you visibility into the traffic data of your deployed networks that are managed by the Aviatrix Controller as they relate to your cost centers. This traffic data are reported as percentages of traffic generated by end instances in Spoke VPC/VNets.

You access CostIQ in CoPilot by going to Home > Billing & Cost > CostIQ or typing CostIQ in the navigation search. If you see a message on the CostIQ page that you must first migrate to a metered license to enable the CostIQ feature, see `Enabling the CostIQ Feature`_.

The cost information displayed in CostIQ is grouped by:

- Cost Center  - A group of VPCs/VNets. These VPC/VNets contain resources used by your real-life cost centers or business units.

- Shared Service  - A cloud or network resource shared by multiple teams or cost centers. You define Shared Services by listing the IP addresses or IP CIDR ranges of the shared resource hosts. 

Overview
^^^^^^^^^^^^^^^^^^^^^
|costiq-overview-tab|

The CostIQ Overview tab shows cost information about Aviatrix-managed resources across your entire multi-cloud network. The charts and tables included show the traffic and cost data of your Cost Centers and Shared Services.

Use the Time Period options at the top of the page to adjust the time period for these data visualizations. 

+----------------------+------------------------------------------------------------+
|Chart or Graph        | Description                                                |
+----------------------+------------------------------------------------------------+
| Top Cost Centers     |Top Cost Centers lists the Cost Centers in your network     |
|                      |with the highest costs. The percentage on the right shows   |
|                      |each Cost Center's expenditure as a percentage of total     |
|                      |network costs.                                              |
+----------------------+------------------------------------------------------------+
|Top Shared Services   |Top Shared Services lists the Shared Services in your       |
|                      |network with the highest costs. The percentage on the right |
|                      |shows each Shared Service's expenditure as a percentage of  | 
|                      |total network costs.                                        |
+----------------------+------------------------------------------------------------+
|Cost Center Traffic   | This graph shows traffic trends for each Cost Center in    |
|Trends                | your network. Each Cost center is represented as a         |
|                      | colored line on the graph. Each data point in each line    |
|                      | represents one Cost Center's percentage of traffic out of  | 
|                      | the total traffic for all Shared Services. Use this graph  |
|                      | to review increases or decreases in the                    | 
|                      | traffic of each Cost Center.                               |
+----------------------+------------------------------------------------------------+
|Shared Service Traffic| This graph shows traffic trends for each Shared            |
|Trends                | Service in your network. Each Shared Service is represented|
|                      | as a colored line on the graph. Each data point in each    |
|                      | line represents one Shared Service's percentage of traffic |
|                      | out of the total traffic for all Shared Services. Use this |
|                      | graph to review increases or decreases in the              | 
|                      | traffic of each Shared Service.                            | 
+----------------------+------------------------------------------------------------+

Cost Centers
^^^^^^^^^^^^^^^^^^^^^^^^^^

The Cost Centers tab lists the Cost Centers you have created, the CSPs that contain the Cost Center resources, and the percentage of total traffic for which each Cost Center is responsible.

Select a Cost Center to drill down on its information. A panel opens on the right to show data for each VPC and VNet in this Cost Center.

|costiq-cost-centers-tab|

Use the Time Period options at the top of the page to adjust the time period of for these data visualizations. 

The table below shows data for each VPC or VNet:

+----------------+---------------------------------------------------+
|Column          |Description                                        |
+----------------+---------------------------------------------------+
|VPC/VNet        | The VPC or VNet in this Cost Center.              |
+----------------+---------------------------------------------------+
|Region          | The VPC/VNet's region.                            |
+----------------+---------------------------------------------------+
|Rel. Traffic    |The percentage of Cost Center traffic out of the   |
|                |total spoke traffic.                               |
+----------------+---------------------------------------------------+
|Traffic         | The absolute value of this VPC or VNet's traffic. |
+----------------+---------------------------------------------------+

In this panel, select any VPC/VNet to drill down on the Spoke Gateways it includes. This table shows the following data: 

+----------------------+--------------------------------------------------+
|Column                |Description                                       |
+----------------------+--------------------------------------------------+
|Gateway               |The gateway in this VPC or VNet.                  |
+----------------------+--------------------------------------------------+
|Rel. Traffic          |The percentage of this gateway's traffic out of   |
|                      |the total VPC or VNet traffic.                    |
+----------------------+--------------------------------------------------+
|Abs. Traffic          |The percentage of this gateway's traffic out of   |
|                      |the total Cost Center's traffic.                  |
+----------------------+--------------------------------------------------+
|Traffic               | The absolute value of this VPC or VNet's traffic.|
+----------------------+--------------------------------------------------+

Adding a New Cost Center
----------------------------------------------

To add a new Cost Center, click the **+ Cost Center** near the top left. 

1.  Name the Cost Center.

    -   You can use the following values for Cost Center names: alphanumeric characters, whitespace, hyphens, and underscores. 

    -   The maximum length of a name is 128 characters.

    -   Special characters are not allowed.

2.  Click on the **Associate VPC/VNets** dropdown menu and select the VPCs/VNets to include in the Cost Center. These VPCs or VNets should be the ones used by your real-life cost centers. The VPC/VNets defined in each cost center are typically mutually exclusive. You can include the same VPC/VNet in multiple cost centers, but doing so can skew cost-reporting results. For example, if you define 2 cost centers with VPC/VNets that overlap, the shared services report will show them both as consumers of the shared service.

3.  Click **Save**.

Editing Cost Centers
----------------------------------------------

To edit a Cost Center, in the panel on the right, click the Edit icon |edit-icon|. You can rename the Cost Centers or add and remove the VPC/VNets included.

Deleting Cost Centers
----------------------------------------------

1.  To delete a Cost Center, in the panel on the right, click the Delete icon |delete-icon|. 

2.  Click **Confirm**.

Deleting a Cost Center does not affect the VPCs/VNets it includes or any data; it only removes the Cost Center as a way of organizing and visualizing historical cost data for your network. 

Shared Services
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Shared Services page displays cost data for your Shared Services, or networking resources used by multiple teams or departments in your network. Shared Services are organized by the IP addresses of the resources hosts. 

For example, a Shared Service could be an AWS S3 bucket that multiple teams use. The Shared Services view displays what percent of the S3 bucket's total traffic each team is responsible for. You can break down or organize the Shared Services drilldown by:

- Cost Center  - Select this view to see the traffic for each Cost Center in your network.

- Cloud Account  - Select this view to see the traffic going to defined Shared Services from instances/hosts owned by a specific Cloud Account. CoPilot considers the Spoke Gateway Cloud Account (not the VPC Cloud Account).

Select a Shared Service to drill down on its data. A panel opens on the right to show more granular data. 

You can break down or organize the Shared Services drilldown by:

- Cost Center  - Select this view to see the traffic to the Shared Services for each Cost Center in your network.

- Cloud Account  - Select this view to see the traffic organized by each individual Cloud Account in your network (in AWS, Azure, GCP, or OCI). Note that CoPilot considers a VPC or VNet a Cloud Account, but not a Spoke Gateway. 

Select a Cost Center to drill down on its information. A panel opens on the right to show data for each VPC and VNet in this Cost Center.

Use the Time Period options at the top of the page to adjust the time period of for these data visualizations. 

The table below shows data for each Cost Center or Cloud Account, depending on how you filtered the Breakdown of the data, by Cost Center or Cloud Account: 

+-----------------------------+-------------------------------------------------------------------+
|Column                       |Description                                                        |
+-----------------------------+-------------------------------------------------------------------+
|Cost Center or Cloud Account | The Cost Center or Cloud Account in this Shared Service.          |
+-----------------------------+-------------------------------------------------------------------+
|Cloud                        | The Cost Center or Cloud Account's region.                        |
+-----------------------------+-------------------------------------------------------------------+
|Rel. Traffic                 |The percentage of this Cost Center or Cloud Account's traffic to   |
|                             |the Shared Shared Service out of total Shared Service traffic.     |
+-----------------------------+-------------------------------------------------------------------+
|Traffic                      |The absolute value of this Cost Center or Cloud Account's traffic. |
+-----------------------------+-------------------------------------------------------------------+

Select a Cost Center or Cloud Account in this panel to drill down further to the VPC/VNets it includes:

+----------------------+--------------------------------------------------------------------+
|Column                |Description                                                         |
+----------------------+--------------------------------------------------------------------+
|VPC/VNet              | Each VPC/VNet in this Shared Service.                              |
+----------------------+--------------------------------------------------------------------+
|Rel. Traffic          |The percentage of this VPC or VNet's traffic to the Shared Service  |
|                      |out of the total Cost Center or Cloud Account's traffic to the      |
|                      |Shared Service.                                                     |
+----------------------+--------------------------------------------------------------------+
|Abs. Traffic          |The percentage of this VPC or VNet's traffic to the Shared Service  |
|                      |out of the Shared Service's traffic.                                |
+----------------------+--------------------------------------------------------------------+
|Traffic               | The absolute value of this VPC/VNet's traffic.                     |
+----------------------+--------------------------------------------------------------------+

Select a VPC or VNet in this panel to drill down further to the gateways it includes:

|costiq-shared-service-drilldown-2|

+----------------------+--------------------------------------------------------------------+
|Column                |Description                                                         |
+----------------------+--------------------------------------------------------------------+
|Gateway               | Each gateway in this VPC or VNet.                                  |
+----------------------+--------------------------------------------------------------------+
|Rel. Traffic          |The percentage of gateway traffic to the Shared Service out of the  |
|                      |total VPC traffic to the Shared Service.                            |
+----------------------+--------------------------------------------------------------------+
|Abs. Traffic          |The percentage of this gateway's traffic to the shared Service out  |
|                      | of the total Shared Service traffic.                               |
+----------------------+--------------------------------------------------------------------+
|Traffic               | The absolute value of this gateway's traffic.                      |
+----------------------+--------------------------------------------------------------------+

Adding Shared Services
-------------------------------------------------------

To add a new Shared Service, click **+ Shared Service** near the top left. 

1.  Name the Shared Service.

    -   You can use the following values for Shared Service names: alphanumeric characters, whitespace, hyphens, and underscores.
 
    -   The maximum length of a name is 128 characters.

    -   Special characters are not allowed.

2.  Add the individual IP addresses or IP CIDR ranges to include in the Shared Service.

3.  Click **Save**.

Editing Shared Services
-------------------------------------------------------

To edit a Shared Service, in the panel on the right, click the Edit icon |edit-icon|. You can rename the Shared Services or add and remove the IP CIDR ranges it includes.

Deleting Shared Services
-------------------------------------------------------

1.  To delete a Shared Service, in the panel on the right, click the Delete icon |delete-icon|. 

2.  Click **Confirm**.

Deleting a Shared Service does not affect the IP addresses or CIDRs it includes or any data; it only removes the Shared Service as a way of organizing and visualizing historical cost data for your network. 

Enabling the CostIQ Feature
----------------------------

You access CostIQ in CoPilot by going to Home > Billing & Cost > CostIQ or typing CostIQ in the navigation search. 

If you see a message on the CostIQ page that you must first subscribe to the new Universal Image subscription, you need to perform a few tasks before you can enable the CostIQ feature.

If you want to schedule a demo of CostIQ, you can click **Schedule Demo** from the CostIQ page to go to the Aviatrix demonstration request page. 

If you decide to enable the CostIQ feature, use the following steps:

1.  Subscribe to the “Aviatrix Secure Networking Platform Metered 2208” subscription offer in the CSP marketplace and obtain the Customer ID. Refer to the *Aviatrix Controller and Gateways Release Notes* for any restrictions that may apply to the “Aviatrix Secure Networking Platform Metered 2208” subscription offer. 

2.  In Controller, go to Home > Settings > Controller > License.

3.  Input the Customer ID into the **Setup Aviatrix Customer ID** field, and click **Save**..

4.  Log in to CoPilot with a user account that has adminstrative privileges. 

5.  In CoPilot, go to Home > Settings > Licensing.

6.  In the Add-on Features list, click **Enable** for the CostIQ feature.


Working with Aviatrix Billing 
==============================

This section describes the Aviatrix Billing feature of Aviatrix CoPilot. 

Aviatrix Billing enables you to analyze the costs of your Aviatrix Controller and gateways. You can review your account's Total Cost and review costs by CSP (Cloud Service Provider), region, group of Cloud Accounts, and individual Cloud Account.

You access Aviatrix Billing in CoPilot by going to Home > Billing & Cost > Aviatrix Billing or typing Aviatrix Billing in the navigation search.


Overview of Aviatrix Billing
------------------------------

The graphs, donut charts, and components on the Overview tab display costs and cost metrics for your Aviatrix account.

.. important::

  * The Aviatrix Billing feature requires that your Controller use software version 6.8.1148 or later. 
  * Only users logged in as admin, with the username "admin," can review this page.
  * Any timestamps on this page are in UTC time. This time zone is set because your account bill is cut off at midnight UTC.

Year to Date Cost  - Your total Aviatrix costs from January 1, in dollars.
Billing Plan  - Your billing plan for the year:

- Standard (Public Rate) – The standard rate as published on the CSP marketplace listing.

- Custom (Private Offer) – A modified rate from a private offer from Aviatrix.

Total Cost  - Your total Aviatrix cost for this year in dollars, broken down by month. 

Use the donut charts, horizontal bar charts, and line graph on the lower section of the page to see more detailed analytics of our Aviatrix costs. Use the Time Period options at the top of the page to adjust the time period for the data in each component.

- Top Costs by Cloud - Use this donut chart to compare costs for each of your CSP accounts: AWS, Azure, Alibaba Cloud, GCP, and others.

- Top Costs by Region - Use this donut chart to compare costs for each region in your network, for all CSPs. 

- Top Costs by VPC/VNet - Use this horizontal bar chart to compare costs for each VPC or VNet in every CSP.

- Cloud Account Breakdown - Use this donut chart and horizontal bar graph to compare costs for each individual cloud account and cloud Account Group in every CSP.

- Billing Metrics Breakdown  - Use this donut chart to compare costs for various aspects or components of your network, including:

  - Inter tunnels, Intra tunnels, Security, and Usercount.

  - Usercount - Charge per total user count, based on the number of VPN users.

- Trend - Use this line graph to compare total costs in dollars for each billing metric or Cloud Account in your network per day. Use the dropdown menu in the top right to select which data categorization to use: Billing Metric or Cloud Account. 

|aviatrix-billing-overview-tab|

Explore tab of Aviatrix Billing
----------------------------------

|aviatrix-billing-explore-tab|

Use the Explore tab to break down your costs in each CSP (Cloud Service Provider). This page offers data visualization and drilldown so that you can see more granular data. 

Use the Time Period options at the top to change the time period covered in your view.

Cost graph in Aviatrix Billing
--------------------------------

This tiled graph represents your account's cost in each CSP by using the size of a tile to visually compare each cost to other network costs. Click on any title to drill down further on the cost for each CSP. 

**Drill Down to Region**

When you click on any tile, the graph zooms in and uses a new set of tiles to represent the cost of each region in which your accounts are located in this CSP. 

**Drill Down to VPC/VNet**

Click on one of the region titles to drill down another level and see the costs for each VPC or VNet in that region.

**Drill Down to Gateways**

Click on one of the VPC/VNet tiles to see the costs for the primary and, if relevant, HA gateways in this VPC/VNet.

To drill up from any level, select the drilldown level you want to review from the breadcrumbs about the graph: for example, select one level in _Cost > OCI > us-ashburn-1 > copilot-oci-use-t1_ to see that level of detail.

In each level of drilldown, see the table on the right side of the page to see each cost and the relative cost.

+------------------------------------------+----------------------+----------------------------------------------+
|**Name**                                  |**Cost**              |**Rel %**                                     |
+==========================================+======================+==============================================+
|The name of the component                 |The cost in dollars   |The percent cost of this component out of     |
|in each level of drill down: CSP, region, |for this component.   |the total cost of all components in this      |
|VPC/VNet, or gateway.                     |                      |level of drilldown. For example, the          |
|                                          |                      |cost of your accounts in this CSP out of costs|
|                                          |                      |for your whole network, or the cost of this   |
|                                          |                      |VPC/VNet out of all VPCs/VNets in this region.|
|                                          |                      |This column should sum to 100%.               |
+------------------------------------------+----------------------+----------------------------------------------+

Cloud Accounts tab in Aviatrix Billing
-----------------------------------------

Use the Cloud Accounts tab to review costs by individual Cloud Account. This page is organized by Account Groups, which help organize and categorize your cloud accounts. Refer to the Cloud Account Breakdown component on the Aviatrix Billing Overview tab of this page for a donut chart and horizontal bar graph visualization of this data.

In the table, each individual Cloud Account is left-indented and appears below the Account Group's row. 

.. important::

  Each account can only appear in one Account Group at a time.

+---------------------------------+-----------------------+-------------------+--------------------+-----------------+--------------------+
|Account Group/Accounts           |Clouds                 |Prev. Week         |Prev. Month         |Year to Date     |CY' *year*          |
+=================================+=======================+===================+====================+=================+====================+
|The name of each Account Group   |The Cloud Service      |The previous week's|The previous month's|The cost of this |The cost of this    | 
|and account. Each account is     |Providers (CSPs) of    |costs for this     |costs for this      |account or       |account or Account  |
|indented in the table and listed |the accounts in this   |account or Account |account or Account  |Account Group in |Group in the last   |
|below its Account Group.         |account group. You can |Group.             |Group.              |this calendar    |calendar year.      |
|                                 |have multiple CSPs     |                   |                    |year.            |                    |
|                                 |represented in a group.|                   |                    |                 |                    |
+---------------------------------+-----------------------+-------------------+--------------------+-----------------+--------------------+

Creating Account Groups
-------------------------------------------

1.  To create a new Account Group, click the Actions dropdown menu in the top left and select **Create New Account Group**.

|aviatrix-billing-cost-account-actions-menu|

2.  Enter the Account Group's name.

3.  Click on the dropdown menu to select the accounts that should belong to this Account Group. Note that only accounts that are not in existing Account Groups are available to add.

4.  Click **Save**.

Editing Account Groups
-------------------------------------------

1.  To edit the name of an Account Group, click the More icon |more-icon| at the right end of the Account Group's row in the table.

2.  Edit the Account Group's name and click **Save**.

**Moving Account Groups**
1. To move an Account Group, click the **Actions** menu in the top left and select **Move Account Group**.

**Removing Accounts from an Account Group**
1.  To move an account from one Account Group to another, select the group in the table and click the **Actions** dropdown menu in the top left. Click **Remove from Account Group**.

2.  Click **Confirm**. 

.. note::

  If you move the only account in an Account Group into another group, that Account Group disappears. You can recreate that Account Group by following the steps in the "Creating Account Groups" section above.

Deleting Account Groups
-------------------------------------------

1.  To delete an Account Group, click on the Delete icon |delete-icon| at the right end of the Account Group's row in the table.

2.  Click **Confirm**.


Viewing latencies between connections in your Aviatrix managed network
========================================================================

CoPilot provides ways for you to see the latencies between connections/links in your Aviatrix transit network as follows. 
 
-   **Latency page**: In CoPilot Home > Monitor > Traffic & Latencies, you can see detailed latencies, historically for the last hour, last day, last week, and last month, for all links (connections) between managed resources. You can use the date picker to view historical latencies for a custom timeframe. You can filter the historical latency information by search field, such as by the name of a specific gateway to view historical latencies that relate only to that gateway.

-   **Topology map**: In CoPilot Home > Networking > Topology, click a link in the topology map and the latency information for that link is shown in the properties pane.
 
-   **AppIQ report**: In CoPilot Home > Troubleshoot> AppIQ, the latency information for the connections between the two instances you specify (for source and destination instances) is included in the AppIQ report results.


CoPilot WebHooks
===================

This sections provides the following information:

- How to customize the webhooks Aviatrix CoPilot generates for sending to external systems (such as Slack and PagerDuty). See "CoPilot Webhooks Customization".

- An example for setting up PagerDuty to receive CoPilot alerts via webhooks. See "Example: PagerDuty Webhook Payload URL".

CoPilot Webhooks Customization
-------------------------------

You can customize the webhooks Aviatrix CoPilot generates for sending to external systems (such as Slack) by using the Handlebars templating language. Examples are provided in this topic for high level variables that are exposed in CoPilot notification alerts.


CoPilot alerts expose the following high level variables (objects):

- **alert**
- **event**
- **webhook**

Each object exposes additional variables that can be accessed.

**Alert**

The alert object exposes ::

  "alert": {
    "closed": false,
    "metric": "CPU Utilization",
    "name": "High CPU Usage",
    "status": "OPEN",
    "threshold": 80,
    "unit": "%"
  }

**Event**

The event object exposes ::

  "event": {
    "receiveSeparateAlert": false,
    "exceededOrDropped": "Exceeded",
    "newlyAffectedHosts": ["spoke1", "spoke1-hagw"],
    "recoveredHosts": ["spoke2"],
    "message": "Alert Updated",
    "timestamp": "2021-05-22T17:49:20.547Z"
  }

where:

- ``newlyAffectedHosts`` represents the hosts that are now affected but were not affected before. These hosts usually need the user’s attention the most.
- ``recoveredHosts`` represents the hosts that are now recovered.
- ``receiveSeparateAlert`` is for individual host alerts.


**Webhook**

The webhook object exposes ::

  "webhook": {
    "name": "",
    "secret": "",
    "tags": [],
    "url": ""
  }

**Creating a custom webhook and accessing individual fields**


Example 1: If individual alerts for hosts is ON, receive a string. Else receive an array.  ::

  {  
    "status": "{{#if alert.closed}}ok{{else}}critical{{/if}}", 
    "check": {{alert.name}},
    "copilotstatus": {{alert.status}},
    "host": {{#if event.receiveSeparateAlert}}
    {{#if event.newlyAffectedHosts}}
      {{event.newlyAffectedHosts.[0]}}
    {{else}}
      {{event.recoveredHosts.[0]}}
    {{/if}}
  {{else}}
    {{#if event.newlyAffectedHosts}}
      {{event.newlyAffectedHosts}}
    {{else}}
      {{event.recoveredHosts}}
    {{/if}}
  {{/if}},
    "alert_timestamp": "Received <<alert.metric>> at <<event.timestamp>>"
  }


Example 2  ::

  {
    "myAlert": {{alert.name}},
    "triggeredAt": {{event.timestamp}},
    "eventMessage": {{event.message}},
    "triggeredMetric": {{alert.metric}},
    "status": {{alert.status}},
    "webHookName": {{webhook.name}},
    "webHookTags": {{webhook.tags}}
  }​

Output:  ::

  {
    "myAlert": "High CPU Usage",
    "triggeredAt": "2021-05-22T18:06:34.143Z",
    "eventMessage": "Alert Updated",
    "triggeredMetric": "CPU Utilization",
    "status": "OPEN",
    "webHookName": "test",
    "webHookTags": [
      "customTag"
    ]
  }​

Templates support JSON and String formatted output as values.

In situations where you want to specifically format the value of an output, it needs to be converted from JSON (default) to a string value.

“webhook”: {{webhook}}→ produces JSON: ::

  {
    "webhook": {
      "name": "",
      "secret": "",
      "tags": [
        "test",
        "123",
        "emergency"
      ],
      "url": ""
    }
  }​

“webhook”: “<<webhook>>” → produces STRING: ::

  {
    "webhook": "{\n  \"name\": \"\",\n  \"secret\": \"\",\n  \"tags\": [\n    \"test\",\n    \"123\",\n    \"emergency\"\n  ],\n  \"url\": \"\"\n}"
  }

String escaped values allow for custom messages to be used in values. ::

  {
    "webhook": "My Custom Webhook message <<webhook>>"
  }

Output:  ::

  {
    "webhook": "My Custom Webhook message {\n  \"name\": \"\",\n  \"secret\": \"\",\n  \"tags\": [\n    \"test\",\n    \"123\",\n    \"emergency\"\n  ],\n  \"url\": \"\"\n}"
  }

Looping over lists in templates using #attribute...  .  .../attribute. Any content between the # and / is expanded once for each list item, and the special attribute ``.`` can be used to refer to it.

Some attributes refer to a list of results:

- ``webhook.tags`` list of optional user-defined strings, configured on a per-webhook basis.
- ``event.newlyAffectedHosts`` represents the hosts that are now affected but were not affected before. These hosts usually need the user’s attention the most.
- ``event.recoveredHosts`` represents the hosts that are now recovered.

::

  {
    "webHookTags": {{webhook.tags}}
  }

Output: ::

  {
    "webHookTags": [
      "customTag",
      "Slack",
      "Emergency"
    ]
  }

If you want to customize the output for list items: ::

   {
     "webhook": "<<#webhook.tags>> tag:<<.>> <</webhook.tags>>"
   }

Output: ::

  {
    "webhook": " tag:test  tag:123  tag:emergency "
  }

Escaping quotes for return values when creating custom values is performed automatically for strings within << >>.

``{{{some_quoted_var}}}`` disables escapes altogether, which should be avoided, as it can unexpectedly cause embedded strings to form invalid JSON, for example, an alert name of ``A “great” alert``, quotes, newlines, tabs, and so on are not allowed in JSON strings.

Input: ::

  {
    "alertStatus": "Name:{{{alert.name}}} Metric:{{{alert.metric}}} alert"
  }

Output: ::

  {
    "alertStatus": "Name:High CPU Usage Metric:CPU Utilization alert"
  }

Custom Slack Webhook example (slack document: https://app.slack.com/block-kit-builder/): ::

  {
    "blocks":[
      {
        "type":"header",
        "text":{
          "type":"plain_text",
          "text":":fire:<<alert.name>>:fire:"
        }
      },
      {
        "type":"divider"
      },
      {
        "type":"section",
        "text":{
          "type":"mrkdwn",
          "text":"newly affected hosts:\n <<#event.newlyAffectedHosts>>:arrow_down:<<.>>\n<</event.newlyAffectedHosts>>"
        }
      },
      {
        "type":"actions",
        "elements":[
          {
            "type":"button",
            "text":{
              "type":"plain_text",
              "text":"Confirm",
              "emoji":true
            },
            "value":"click_me_123",
            "action_id":"actionId-0"
          }
        ]
      },
      {
        "type":"section",
        "text":{
          "type":"mrkdwn",
          "text":"status: <<alert.status>>\nthreshold: <<alert.threshold>><<alert.unit>>\ntime: <<event.timestamp>>\nmesssage: <<event.message>>"
        }
      }
    ]
  }


**Webhook Example**

|webhookImage|


Example: PagerDuty Webhook Payload URL
---------------------------------------

If you want to set up PagerDuty to receive CoPilot alerts via webhooks, this section provides an overview of the steps including generating the PagerDuty webhook payload URL to which CoPilot will send POST requests. You specify the URL when you configure CoPilot notifications in Settings > Notifications > Webooks. 

For the most current information about receiving HTTP callbacks in your PagerDuty account, always refer to the `PagerDuty support documentation  <https://support.pagerduty.com/docs/webhooks>`_.

**Prerequisite**: Before you begin, create a PagerDuty developer account at the `PagerDuty Developer Platform site  <https://developer.pagerduty.com/sign-up/>`_.

**Summary of Steps**:

-   (In PagerDuty) Log in to your PagerDuty Developer Console.
-   (In PagerDuty) Create the PagerDuty application service.
-   (In CoPilot) Configure CoPilot notifications via webhooks to send alerts to your new service.

To set up PagerDuty to receive CoPilot alerts via webhooks:

1.  Log in to your PagerDuty Developer Console and click **Create New App**.

    If you do not see the **Create New App** button after logging in, navigate to Integrations > Developer Mode from the console menu.

    |notifs_pager_create_app|

2.  Fill in the requested fields, such as App Name, Brief Description, and Category (you can specify multiple values for the category field):

    |notifs_pager_build_app|

3.  Click **Save**.

4.  In the next page, locate the Events Integration box, and click **Add**.

    |notifs_pager_event_int|

5.  Fill in the requested fields:

    -   Transform Event Data: Yes
    -   Debug Mode: Off (or on, if preferred)
    -   Change Events: Not required
    -   Redirect URLs: Not required
6.  For Create a Test Service, modify the pre-populated value if preferred and click **Create**.

    |notifs_pager_create_test|

    After you click Create, your Integration Key and API Endpoint are created but the API Endpoint URL is not correct until you click **Save**. Before you save the service, the endpoint looks like this:

    |notifs_pager_endpoint_before|

7.  Click **Save** to save the test service.

    After saving the service, your endpoint looks like this:

    |notifs_pager_endpoint_correct|

    The page refreshes and reverts back to the main screen for your new application.

8.  Locate the Events Integration box, and click **Manage**.

9.  Copy the Events API Endpoint.

10. Log in to CoPilot.

11. Navigate to Settings > Notifications > Webooks section.

12. Click **+ New** to create a webhook configuration for PagerDuty.

13. In the webhook configuration panel, fill in the fields. For Webhook Payload URL, paste your copied Events API Endpoint URL.

    |notifs_pager_endpoint_paste|

14. Click the **Test** button on the webhook test payload.

    This sends a test to PagerDuty. If the test is successful, you will see a Success message:

    |notifs_pager_webhook_test|

    To see the alert in PagerDuty, follow the next step.

15. (Verify Alert Sent) In PagerDurty, click on your profile icon in the app bar and select **Subscriptions**.

    |notifs_pager_webhook_verify|

16. In the top menu, click **Incidents**.

    You should see your alert. For example:

    |notifs_pager_webhook_verified|



CoPilot Settings
======================

This section describes the Settings options of Aviatrix CoPilot.

The CoPilot > Settings page allows you to configure various CoPilot settings. The default entries are usually sufficient. Ensure that you understand the impact of changing an option before making the change. Typically, you only need to set the Controller IP options by specifying the controller IP address and the controller service account.

Configuration
---------------

**Options**

============================  ===================================================================  
 netflowPort                    Allows you to change the port on which flows are sent/received
----------------------------  -------------------------------------------------------------------
 etlHeapSize                    Memory allocation for ETL
----------------------------  -------------------------------------------------------------------
 dataStoreHeapSize              Memory allocation for Data Store
============================  ===================================================================

**DNS Lookup Server**

============================  ===================================================================  
 server_1                      Primary DNS Server
----------------------------  -------------------------------------------------------------------
 server_2                      Backup DNS Server
============================  ===================================================================

**Certificate Management**

CoPilot comes with a self-signed certificate and key. You can upload your own SSL certificate and key.
 
If you are using a Windows Internal CA, the following is an example of the certificate format for the .crt and .key file:
 
-   SSL Certificate: **aviatrixCustomerCertificate** -> PEM-encoded X509 full-chain certificate
 
-   SSL Certificate Key: **aviatrixCustomerKey** -> PEM-encoded RSA private key (not encrypted with DES3)
 
SSL Certificate: **aviatrixCustomerCertificate** example: ::

  -----BEGIN CERTIFICATE-----
  <root CA cert>
  -----END CERTIFICATE-----
  -----BEGIN CERTIFICATE-----
  <intermediate CA cert>
  -----END CERTIFICATE-----

SSL Certificate Key: **aviatrixCustomerKey** example: ::
 
  -----BEGIN RSA PRIVATE KEY-----
  <private key>
  -----END RSA PRIVATE KEY-----
 
**Controller Public IP/FQDN**
  This option can be the public IP address or the FQDN of your Controller. If your organization's team members log in to Aviatrix Controller via SAML, and you want them to be able to log in to CoPilot via SAML authentication also, this value must match the value you specified for the **Single sign on URL** SAML setting of your IdP application. If you specified the Controller's IP address in the SSO URL, specify the Controller IP address here. If you specified the Controller's FQDN in the SSO URL, specify the Controller FQDN here. For more information, see CoPilot Login vai SAML in *Aviatrix CoPilot Deployment Guide*.

**Reset Controller IP**
  This option resets the IP address of the Controller with which CoPilot is associated.

**Reset Service Account**
  This option resets the account to be used as the CoPilot service account. 


Services
----------
The CoPilot > Settings > Services page allows you to stop/start/restart various CoPilot services. It also includes options that enable Aviatrix Support to troubleshoot problems with your CoPilot instance. 

Use **Download Log Bundle Locally** to download the support log bundle to your local system. Submit a support ticket first.

Use **Upload Log Bundle to Support** to send your support log bundle directly to Aviatrix Support (the log bundle is uploaded to s3).

Use **Remote Support** to allow an Aviatrix Support member to SSH into your CoPilot instance without having to open a security group. To enable the SSH tunnel, set the option to **Enabled**. Provide the port number shown to your Support representative. After the support issue is resolved and access to your instance is no longer needed, set the option to **Disabled**.


Resources
-----------
The CoPilot > Settings > Resources page provides resource utilization levels about the virtual machine (instance) on which CoPilot runs as well as the storage allocated to the instance.

**Disk Usage**

The size, used disk space, and free disk space of the attached root disk (volume). The bar chart shows used space in blue.

The size, used disk space, and free disk space of the logical volume CoPilot created for storage. The bar chart shows used space in blue. Note: The logical volume information displays only if you deployed the Aviatrix CoPilot 1.5.1 image version from the marketplace.

**CPU Usage:**

The approximate total CPU usage of all processors. CoPilot fetches the current value at your specified refresh interval. The chart displays data for the last 20 intervals.

**Memory Usage:**

The amount of total memory used. CoPilot fetches the current value at your specified refresh interval. The chart displays data for the last 20 intervals.


Licensing 
-----------
This page shows application administrators details about the licensing and features assocated with their CoPilot platform. 

**Add-on Features**

The list of Aviatrix features available to enable.

**Feature Previews**

The list of Public Preview or Private Preview features that are available in Aviatrix CoPilot. For a description of public preview and priviate preview, see *Aviatrix Controller and Gateways Release Notes*. 

**Controller**

License details of the Controller associated with this CoPilot: Controller license ID number, issue date, expiration date, allocation (the number used by controller instances), and total (the total number of controller instances that can use the license).

Note: Prior to CoPilot release 3.0.0, CoPilot required its own license (customer ID). CoPilot now uses the Controller license (a separate CoPilot license is no longer used).

Index Management
-----------------
This page shows details about CoPilot database indices.

Advanced Settings
------------------
This page has options for setting a minimum disk space threshold, various task server intervals, and some other settings related to CoPilot functions. For task server intervals, the default entries are usually sufficient. Ensure that you understand the impact of changing an option before making the change.

**Disk Space Management**

**Min. disk space % avail. threshold**
  Allows you to set a threshold based on available disk space, at which point automatic 
  data deletion start. When this threshold is reached, CoPilot will start deleting records in order of 
  first in first out. 


Managing Your Appliance 
========================================
 

**Backup and recovery**

In order to provide backup to your data, you can leverage instance snapshot methodology in the cloud.

You can configure periodic snapshots, based on your preferred interval, to be able retain data in case of corruption or disk loss on EBS.  


..  |copilot-paused-notification| image:: copilot_reference_guide_media/copilot-paused-notification.png
    :scale: 80%

.. |topology_v2| image:: copilot_releases/topology_v2.png
    :width: 30%

.. |topology_map_v2| image:: copilot_releases/topology_map_v2.png
    :width: 30%

..  |transit_segmentation| image:: copilot_reference_guide_media/transit_segmentation.png
    :scale: 60%

..  |dashboard_image| image:: CoPilot_reference_guide_media/CoPilot_dashboard.png
    :width: 200

..  |topology_image| image:: CoPilot_reference_guide_media/CoPilot_topology.png
    :width: 200

..  |flowIQ_image| image:: CoPilot_reference_guide_media/CoPilot_flowiq.png
    :width: 200

..  |time_control_image| image:: copilot_reference_guide_media/topology_replay_time_preview.png
    :width: 200

..  |webhookImage| image:: copilot_reference_guide_media/webhookImage.png
    :scale: 70%

..  |notifs_pager_create_app| image:: copilot_reference_guide_media/notifs_pager_create_app.png
    :scale: 70%

..  |notifs_pager_build_app| image:: copilot_reference_guide_media/notifs_pager_build_app.png
    :scale: 70%

..  |notifs_pager_create_test| image:: copilot_reference_guide_media/notifs_pager_create_test.png
    :scale: 60%

..  |notifs_pager_endpoint_before| image:: copilot_reference_guide_media/notifs_pager_endpoint_before.png
    :scale: 70%

..  |notifs_pager_endpoint_correct| image:: copilot_reference_guide_media/notifs_pager_endpoint_correct.png
    :scale: 70%

..  |notifs_pager_endpoint_paste| image:: copilot_reference_guide_media/notifs_pager_endpoint_paste.png
    :scale: 70%

..  |notifs_pager_event_int| image:: copilot_reference_guide_media/notifs_pager_event_int.png
    :scale: 60%

..  |notifs_pager_webhook_test| image:: copilot_reference_guide_media/notifs_pager_webhook_test.png
    :scale: 60%

..  |notifs_pager_webhook_verified| image:: copilot_reference_guide_media/notifs_pager_webhook_verified.png
    :scale: 70%

..  |notifs_pager_webhook_verify| image:: copilot_reference_guide_media/notifs_pager_webhook_verify.png
    :scale: 50%

..  |costiq-overview-tab| image:: copilot_reference_guide_media/costiq-overview-tab.png
    :scale: 70%

..  |costiq-shared-service-drilldown-2| image:: copilot_reference_guide_media/costiq-shared-service-drilldown-2.png
    :scale: 70%

..  |costiq-cost-centers-tab| image:: copilot_reference_guide_media/costiq-cost-centers-tab.png
    :scale: 70%

..  |edit-icon| image:: copilot_reference_guide_media/edit-icon.png
    :scale: 90%

..  |delete-icon| image:: copilot_reference_guide_media/delete-icon.png
    :scale: 100%

..  |nav_menu| image:: copilot_reference_guide_media/nav_menu.png
    :scale: 70%

.. |aviatrix-billing-overview-tab| image:: copilot_reference_guide_media/aws-billing-overview-tab.png
   :scale: 70%

.. |aviatrix-billing-explore-tab| image:: copilot_reference_guide_media/aws-billing-explore-tab.png
   :scale: 70%

.. |aviatrix-cost-account-billing-actions-menu| image:: copilot_reference_guide_media/aws-billing-explore-tab.png
   :scale: 50%

.. |more-icon| image:: copilot_reference_guide_media/more-icon.png
   :scale: 100%

.. |delete-icon| image:: copilot_reference_guide_media/delete-icon.png
   :scale: 100%



