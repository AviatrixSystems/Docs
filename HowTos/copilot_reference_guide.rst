.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility


====================================
Aviatrix CoPilot User Reference Guide
====================================

Aviatrix CoPilot is a component of Aviatrix platform offering that extends visibility into complex, multi-cloud networks deployed and managed by Aviatrix Controller. 
CoPilot delivers, end-to-end, in-depth, historical analytics of multi cloud networks with a single pane of glass that offers application flows, inventory, health, and complete topological view of the network.  

This guide will provide descriptions and definitions of functionalities that are available in Aviatrix CoPilot.


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

The Aviatrix gateways running in your multi-cloud network enable you to run diagnostics from them directly from Topology. Performing diagnostics from Topology can dramatically reduce the time spent troubleshooting issues.

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


Create and save topology filters
--------------------------------

Create filters to narrow down the network constructs to include in your topology maps and save the filters to your local system.

To create and save filters for topology:

1.  Log in to CoPilot.

2.  From the sidebar, select Topology.

3.  In Network view, click the **Toggle Filter** slider to enable the topology filter editor page.

4.  In Select a Key to Filter on, select a key and value to filter on. You can apply any number of filters to a given filter group.

5.  In Filter Group Name, assign a name to your filter/filter group.

6.  Click **Save**.

    The filter is saved to your local system.

    When you want to view the topology layout for this filter, click **Load Filters** and select it from the list. If you load more than one filter, the layout of all of them is displayed in the map.

    After a filter/filter group is loaded, you can edit or delete it.


Search and filter for cloud native custom tags
----------------------------------------------

Search and filter for custom tags you created in your cloud provider environment for your VPC/VNets and instances.

This feature is available starting from Controller release 6.6. 

To filter for cloud native VPC/VNet tags and instance tags:

1.  Log in to CoPilot.

2.  From the sidebar, select Topology.

3.  In Network view, click the **Toggle Filter** slider to enable the topology filter editor page.

4.  From the Select a Key to Filter on list, under the CSP Tags category, select the cloud native tag to filter on.


View Topology Changes (Topology Replay)
---------------------------------------

This section describes how to use the Topology Replay feature of Aviatrix CoPilot. You use Topology Replay to see what changed in your environment and when it changed. This feature can be used, for example, shortly after a problem occurs in the network to see if recent changes to network constructs may have caused the problem. See also Topology Replay Properties.

Topology Replay shows when route, credential, and other metrics in your cloud network constructs changed. The changes are shown for all constructs regardless if they are located in one or multiple clouds. You can view the changes (additions, modifications, and deletions) that were made to the properties of subnets, gateways, and gateway connections. A time series visualization graphs change-set data as points (blue dots) with each change set collected at one-minute intervals. Clicking on a change set in the time series panel loads it into the topology map and changes details pane where you can inspect the data. For more information about UI controls in topology replay, see Topology Replay Properties.

To view topology changes in your environment:

1.  Log in to CoPilot.

2.  From the sidebar, click Topology, and then click the Topology Replay tab.

    The topology replay page opens showing a topology map, a changes details pane, and a time series panel.

3.  Locate and load the changes you want to inspect:

    -   (**To locate the most recent changes**) When the page first opens or is refreshed, the most recent change set is automatically loaded in the topological map and details pane. In the time series panel, the change set is shown as a dark blue box that indicates the number of changes within it. For example, **120 Changes** (this is the default title of the change set).

    -   (**To locate earlier changes**) By default, in the time series panel, CoPilot shows changes that occurred within one-minute increments. Each Expand icon has a number which represents the number of change sets that exist in that focused time period. Click on an Expand icon to zoom into that time period.

        **Note:** Alternatively, on the track pad, pinch or stretch out two fingers to quickly zoom out of or zoom into a time period.

        The bottom of the time series visualization shows changes that were recorded over the last week. There, you can drag the time-window control lines (blue vertical lines) to encompass a day (or multiple days) to quickly zoom into change sets for that time period.

        Keep zooming into a time period until you see a View icon. The View icon indicates a change set at that point in time. Click on the View icon to load the change set. It may take a few seconds to load. After it loads, the View icon is replaced by a blue box with the title of the change set (the title reflects the number of changes in the change set). Hovering over the blue box displays the end time of the change set.

    -   (**To locate a specific change by title or note**) You can change the titles of change sets. You can also associate notes with them. To search for a specific change set based on a previously applied title or note, click the search icon in the changes details pane, enter any text that is part of the title or note, and then click Search. Change sets matching the search criteria are listed. Click on one from the list to load it.

4.  **Inspect changes for a loaded change set.**

    You inspect changes for a change set in the changes details pane.

    When inspecting changes:

    -   Network constructs are organized by construct type in a tree view. Expand the tree for each contruct type to drill down to properties of that construct that were added, modified, or deleted. Changes are shown as green for additions, orange for modifications, and red for deletions.

    -   Click on a network construct in the topology map to bring its change details into focus in the details pane.

    -   For each selected construct in the changes details pane, select or deselect the eyeball icon to toggle between showing only changed data for a construct or showing all data for a construct (to put the changes in context).

    -   Click the AUDIT button to open the Audit tab of the Security section where you can see which users made API calls to Aviatrix Controller during the time period of the change set.
5.  (**To modify the title of a change set**) To modify the title of a change set that is loaded in the changes details pane, click on the red notepad icon to open note view. The title is displayed over the dates (the default title is the number of changes in the change set). Click the blue pen icon. Select the title and change it, and then click the Save icon. When you search the timeline for change sets, you can now search by your title text.

6.  (**To associate a note with a change set**) To associate a note with a change set that is loaded in the changes details pane, click on the red notepad icon to open note view. Click the blue pen icon, type your note, and then click the Save icon. When you search the timeline for change sets, you can now search by your note text.

7.  (**To delete a change set**) To delete a change set that is loaded, in the time series panel, click on the red X associated with the dark blue box that represents it. It will be permanently deleted from the topology-replay database. You can also choose to delete all previous change sets recorded up to that point.



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


Working with FlowIQ
===================

This section describes the FlowIQ feature of Aviatrix CoPilot.

FlowIQ provides you with critical visibility capability to the traffic that traverses your network, displaying metadata about traffic that flows across each link. FlowIQ provides visualization of traffic flows, enabling you to inspect any network traffic that is moving across any gateway managed by the Aviatrix Controller in your Aviatrix transit network (multi-cloud or single cloud network). FlowIQ enables you to identify where data in your network is going to and where it is coming from and you can filter for detailed information about the traffic down to the packet level. 


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

In Performance, CoPilot displays the resource utilization (telemetry) data for all managed resources across your Aviatrix transit network (multi-cloud and single cloud). You can filter telemetry data based on one or more resources (hosts) located in any cloud. When choosing multiple resources, CoPilot displays the telemetry data for those resources in a comparative graph.

The telemetry data CoPilot displays for managed resources includes:

- Free memory 
- CPU utilization 
- Disk free 
- Rx rate of the interface 
- Tx rate of the interface 
- Rx Tx rate combined of the interfaces 

Working with Cloud Routes
=========================

This section describes the Cloud Routes feature of Aviatrix CoPilot.

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

Working with Notifications
==========================

This section describes the Notifications feature of Aviatrix CoPilot.

In Notifications, you can configure alerts so that you can be notified about changes in your Aviatrix transit network. The alerts can be based on common telemetry data monitored in the network. For example, you can receive an alert when the status of any Aviatrix Gateway in your network changes.

CoPilot supports Webhook alerts. Webhooks allow you to send notifications to third-party automation systems such as Slack. You can send a Webhook to any system that can take an HTTPS callback. A single alert can notify multiple systems/people.

You can pause alerts. For example, if you are going to perform maintenance tasks on the network that you know will trigger pre-configured alerts, you can pause the alerts temporarily and unpause them when the maintenance is complete.

In the Notification tab, CoPilot lists all alerts and shows if they are in a triggerd (open) or closed state. You can open an alert from the list to view its lifecycle. CoPilot closes the alert automatically when the alert metric no longer meets the condition to trigger the alert. The alert lifecycle provides a history for every alert that happens in your network environment.

Configure Notifications 
-----------------------

Configure notifications in CoPilot so you can be alerted to events that occur in your network.

When configuring notifications, you can choose email or Webhook destinations. Before you begin, specify the email or Webhook addresses in the Notifications tab of CoPilot Settings. For more information about Webhooks, see `CoPilot Webhooks Customization  <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#id1>`_.

To configure notifications:

1. From the sidebar, click Notifications.
#. In Define Alert, type the name you want to use for the alert.
#. In Condition, select the metric or condition that must be met to trigger the alert.
#. Click Add Recipients and select the email address or Webhook destination where you want the alert to be sent. Repeat this step for each recipient you want to receive the alert.
#. Click Save. The alert is enabled. When the condition is met for the metric you specified, CoPilot will now send an alert to the email or Webhook system you specified.

Edit Notifications 
--------------------

You can edit notification settings you previously configured.

**Prerequisite**: (**If adding new email recipient/new webhook URL**) If you need to add new email recipients or new webhook payload URLs to receive the alert, add the new recipient's email address or new webhook configuration first in the Settings > Notifications tab.

To edit a previously configured notification:

1.  From the sidebar, click Notifications.

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


Metrics used for Triggering Notifications
------------------------------------------

For Aviatrix Controller and Aviatrix gateways, you can configure notifications to be alerted to events that occur in your network such as performance bottlenecks or other problems. You configure alerts and the channels to be notified using the notifications feature in Aviatrix Copilot. This section describes some of the system and network metrics on which notifications can be based. When alert conditions are met for a metric, Copilot sends a notification. How you set a condition threshold to trigger an alert will depend on different factors. For example, for system metrics, the instance size can influence the condition threshold that makes sense. For metrics associated with cloud provider-maintained infrastructure, the desired condition threshold may vary between cloud service providers. Work with your network operations team to determine the metric conditions that will trigger alerts in your environment.


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
    (AWS Only) Bandwidth Egress Limit Exceeded Rate — The number of tx packets dropped because the bandwidth allowance limit was exceeded.

rate_bandwidth_ingress_limit_exceeded
    (AWS Only) Bandwidth Ingress Limit Exceeded Rate — The number of rx packets dropped because the bandwidth allowance limit was exceeded.

rate_conntrack_limit_exceeded
    (AWS Only) Conntrack Limit Exceeded Rate — The number of packets dropped because the connection count allowance limit was exceeded.

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

  


Working with AppIQ
==================

This section describes the AppIQ feature of Aviatrix CoPilot.

In AppIQ, you can generate a report that gives you visibility into security domain and traffic information between any two cloud instances that are connected by way of your Aviatrix transit network. For the source instance and destination instance you specify, CoPilot analyzes network traffic, security domain settings, and route table configurations to provide details that help you understand any problems with the network path between the two instances.

Working with Security
=====================

This section describes the Security feature of Aviatrix CoPilot.

In Security, CoPilot uses visual elements to demonstrate the segments in your Aviatrix transit network that can and cannot communicate with each other. The segments are enabled by way of security domains and their ability to communicate with each other is dictated by security domain policies. You enable security domains and set security domain policies in Aviatrix Controller. CoPilot shows the logical and physical view of the domain segments and their connection relationships.

Working with ThreatIQ
=====================

This section describes the ThreatIQ feature of Aviatrix CoPilot.

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

To enable ThreatGuard alerts:

1. Log in to CoPilot.
2. From the sidebar, click ThreatIQ, and then click the ThreatGuard tab.
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

Enable ThreatGuard blocking to block traffic at Aviatrix Gateways where threat IPs have traversed. When blocking is enabled, Aviatrix Controller pushed down firewall policies to block threat-IP associated traffic as soon as it is detected. All gateways in the VPC/VNET/VCN will block.

To enable ThreatGuard blocking, you must log in to CoPilot with a user account that belongs to a group that has either ``all_write`` or ``all_security_write`` permissions.

To enable ThreatGuard blocking:

1. Log in to CoPilot.
2. From the sidebar, click ThreatIQ, and then click the ThreatGuard tab.
3. Verify that ThreatGuard alerts are enabled. The alerts are enabled when the Send Alert status has a green checkmark. ThreatGuard alerts must be enabled before blocking can be enabled. See *Enable ThreatGuard Alerts* for instructions.
4. Click the **Block Traffic** button and then click the Block Threats slider so that it slides to the right. ThreatGuard blocking is enabled. Aviatrix Controller now enforces firewall policies to block threat-IP associated traffic as soon as it is detected. Each time a different IP threat is detected, a new firewall rule is instantiated on the gateway. By default, all gateways in a VPC/VNet will block the associated traffic. You can be selective about which VPC/VNets block threat IPs in the next step.
5. (Optional - Deny ThreatGuard protection) Select VPC/VNets for which you do not want ThreatGuard blocking enabled. For Configure Exclusion List for VPCs, click the pen icon. In the Protected with ThreatGuard list, tick the check box of each VPC/VNet for which you do not want ThreatGuard blocking enabled. Transfer the VPC/VNets to the Not Protected list and click **Save**. For any VPC/VNets listed in the Not Protected list, the gateways in them will not block threat IPs when detected.
6. (Optional - Prepend ThreatGuard rules) By default, ThreatGuard firewall rules *append* instantiated rules — Aviatrix Controller adds the ThreatGuard rule to the end of the rules list at the time the threat triggered the rule. If you want Controller to add the ThreatGuard rule to the beginning of the rules list, select the Prepend radio button. For more information, see "About ThreatGuard Firewall Rules". 
7. (Optional - Disable blocking) **Note:** When you disable ThreatGuard blocking, the action removes all existing ThreatGuard firewall rules instantiated by Aviatrix Controller for all threats detected up to that point. To disable blocking, in ThreatGuard view, click the Block Traffic check and then click the Block Threats slider. Click **Confirm** to disable all ThreatGuard firewall rules and stop ThreatGuard blocking. 

Add a Custom ThreatIQ IP List 
-----------------------------

Add a custom list of IP addresses to the database of known malicious hosts used by ThreatIQ with ThreatGuard. The custom threat IPs are handled by Aviatrix Controller in the same manner as the threat IPs identified through ThreatIQ with ThreatGuard (detection, alerts, blocking, and unblocking functionality is the same).

You must log in to CoPilot with a user account that has `all_write` or `all_security_write` permissions to add, modify, or delete a custom ThreatIQ IP list.

To add a custom ThreatIQ IP list:

1.  Log in to CoPilot.

2.  From the sidebar, click ThreatIQ, and then click the Custom Threat List tab.

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

 
Working with Reports
=====================

This section describes the Reports feature of Aviatrix CoPilot.

In Reports, you can create detailed reports showing your inventory of managed resources (resources managed by Aviatrix Controller) in a single cloud or across all clouds in your multi-cloud network.

You can quickly create reports that show on which cloud, region, and VPC/VNet specific managed resources are running. You can add columns to the report for different properties associated with resource types. You can apply complex filters to customize the data that gets included in the report for each resource type.

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

Working with Anomalies
=======================

This section describes the network behavior analytics feature of Aviatrix CoPilot.

In Anomalies, you can enable CoPilot to perform continuous network behavior analysis on your cloud workloads on a per VPC/VNet basis so that CoPilot can learn the routine behaviors of the VPC/VNets based on a group of metrics. The analysis enables CoPilot to detect any unusual network behaviors (anomalies) that could represent threats on your network, systems being down, high traffic for a planned launch, or some other abnormal behavior. You can choose to be alerted when anomalies are detected so you can carry out any needed network operations activities to secure your workloads.

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

The Settings page allows you to configure various CoPilot settings. The default entries are usually sufficient. Ensure that you understand the impact of changing an option before making the change. Typically, you only need to set the Controller IP options by specifying the controller IP address and the controller service account.

Configuration
---------------

Options
~~~~~~~~~~~~~~~

============================  ===================================================================  
 netflowPort                    Allows you to change the port on which flows are sent/received
----------------------------  -------------------------------------------------------------------
 etlHeapSize                    Memory allocation for ETL
----------------------------  -------------------------------------------------------------------
 dataStoreHeapSize              Memory allocation for Data Store
============================  ===================================================================

DNS Lookup Server
~~~~~~~~~~~~~~~~~~~~~~~~

============================  ===================================================================  
 server_1                      Primary DNS Server
----------------------------  -------------------------------------------------------------------
 server_2                      Backup DNS Server
============================  ===================================================================


Disk Space Management
~~~~~~~~~~~~~~~~~~~~~~~~
**Min. disk space % avail. threshold**
  Allows you to set a threshold based on available disk space, at which point automatic 
  data deletion start. When this threshold is reached, CoPilot will start deleting records in order of 
  first in first out. 
**Set threshold**
  This option defines at what time of the day this check is run 

**Reset Controller IP**
  The resets the IP to which CoPilot is tied to

Services
----------
This page allows you stop/start/restart various services. 

Use **Services Download Log Bundle Locally** to download the support log bundle to your local system. Submit a support ticket first.

Use **Services Upload Log Bundle to Support** to send your support log bundle directly to Aviatrix Support (the log bundle is uploaded to s3).


Resources
-----------
The Resources page provides resource utilization levels about the virtual machine (instance) on which CoPilot runs as well as the storage allocated to the instance.

**Disk Usage:**

The size, used disk space, and free disk space of the attached root disk (volume). The bar chart shows used space in blue.

The size, used disk space, and free disk space of the logical volume CoPilot created for storage. The bar chart shows used space in blue. Note: The logical volume information displays only if you deployed the Aviatrix CoPilot 1.5.1 image version from the marketplace.

**CPU Usage:**

The approximate total CPU usage of all processors. CoPilot fetches the current value at your specified refresh interval. The chart displays data for the last 20 intervals.

**Memory Usage:**

The amount of total memory used. CoPilot fetches the current value at your specified refresh interval. The chart displays data for the last 20 intervals.


Licensing 
-----------
This page provides functionality for viewing your current license key or releasing the license. 

If you plan to terminate your current instance of CoPilot and deploy a new instance using the same license key, copy the Customer ID of the current instance first and save it for reuse later, and then release the CoPilot license of the current instance. To release the license, click the RESET button. After you deploy the new instance of CoPilot, you will be prompted to enter the customer ID during initial setup. Re-enter the same customer ID you copied.

Index Management
-----------------

Managing Your Appliance 
========================================
 

**Backup and recovery**

In order to provide backup to your data, you can leverage instance snapshot methodology in the cloud.

You can configure periodic snapshots, based on your preferred interval, to be able retain data in case of corruption or disk loss on EBS.  



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



