.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility


====================================
CoPilot User Reference Guide
====================================

Aviatrix CoPilot is a component of Aviatrix platform offering that extends visibility into complex, multi-cloud networks deployed and managed by Aviatrix controller. 
CoPilot delivers, end-end, in-depth, historical analytics of multi cloud networks with a single pane of glass that offers application flows, inventory, health, and complete topological view of the network.  

This guide will provide descriptions and definition of functionalities that are available in Aviatrix CoPilot.


CoPilot Dashboard
================= 

This section describes the Aviatrix CoPilot dashboard.

The CoPilot Dashboard offers a broad perspective on the inventory and status of your deployment. CoPilot Dashboard shows an inventory of all resources across all clouds in your multi-cloud network that are managed by Aviatrix Controller. The Dashboard shows the number and status of these managed resources as well as a breakdown of each on a per cloud basis. A topology geographic map shows where the managed VPCs/VPNs/VNETs are located across the globe.

First displayed in Dashboard are inventory chips providing information about managed resources across your cloud networks. Inventory chips show the number and status of each managed resource. 

The number on the inventory chip represents the total number of instances of that managed resource that exists across your multi-cloud network. 

To view the status of a managed resource, click the status marker in its associated inventory chip. The status marker is:  

- A green checkmark when all instances of that resource type are on (connected, running). 
- A red exclamation mark when one or more instances of that resource type are off (disconnected, shut down). 

- Virtual Data Center 

  A Virtual Data Centers (VDC) is a logical “walled garden” that binds different resources together using a shared network space. This is synonymous to VPC in AWS and GCP, vNETs in Azure, and so forth 

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

    In Network Graph, in Network view, CoPilot displays a network topology map that shows the logical and physical layout of how managed network resources are connected across multiple clouds. Topology provides a visual representation of deployed networks (VPCs/VNETs/VCNs), gateways, instances, and gateway connections. CoPilot automatically draws the map when it connects to Aviatrix Controller.

    The Aviatrix Gateways running in your multi-cloud network enable you to run diagnostics from them directly from Topology. When highlighting a gateway, click on the DIAG button to see options available for performing diagnostics from the gateway that is in focus.

-   **Network Graph - Transit View**

    In Network Graph, in Transit view, CoPilot shows the topology of your Aviatrix transit network in relation to your deployed Aviatrix transit gateways. By clicking on the Aviatrix transit icon, you can see all of the transit VPCs/VNETs, VPNs that are managed by Aviatrix Controller. By clicking on a region icon, you can see the spoke VPCs/VNETs/VPNs that the controller currently manages. By clicking on a spoke VPC/VNET/VPN, you can see all network constructs inside of that spoke. You can use the search field to find specific resources.

-   **Latency Monitor**

    In Latency Monitor, CoPilot shows detailed latencies, historically for the last hour, last day, last week, and last month, for all links (connections) between managed resources. You can use the date picker to view historical latencies for a custom timeframe. You can filter the historical latency information by search field, such as by the name of a specific gateway to view historical latencies that relate only to that gateway.

-   **Topology Replay**

    In Topology Replay, CoPilot shows what changed in your environment and when it changed. CoPilot shows when route, credential, and other metrics in your cloud network constructs have changed over time. A timeline panel shows you all of the changes (as change sets) that were recorded over the last month. You can analyze the additions, modifications, and deletions recorded in each change set. You can delete change sets when you no longer need them.

Highlights of Topology capabilities 
-------------------------------------

- Stateful representations
  
  Connectivity elements in topology reflect state of the object:
    
    - Connections between Aviatrix gateways are drawn with color codes representing the status of their connection.
    - Aviatrix gateway icons represent the state of the gateway. A down gateway is shown in the black line. 
    - Tunnels statuses are shown with green or red lines, representing the status of the link.
- Search for any objects and their properties

  In the topology, you can search for any objects that are plotted. This allows you to quickly isolate and identify
  resources that you are looking for in your entire environment and across clouds.


Interacting with Topology 
---------------------------
Objects on the topology support drag and drop. You can click, drag and drop resources to reorganize the objects 

.. tip:: You can multi-select objects for drag and drop by holding control/command key and selecting

- Search


  The search box allows you to filter the objects that are plotted on the topology.

- Filter 

  Filter menu offers the option to hide/show different category of the object, to ensure topology shows only what you as the user care about 
 
- Layout
   
  You can save and reload layouts in the topology using the layout menu. If you prefer the topology to load a default
  layout, you can select one as the default

- Physics options 

  By default topology objects are organized using physics engines. This menu allows you to configure physical 
  gravity settings that manages placement of objects. You can adjust different parameters, or turn the physics off
  completely for complete control over placement of the objects 


Performing diagnostics from Topology
-------------------------------------

The Aviatrix gateways running in your multi-cloud network enable you to run diagnostics from them directly from Topology. Performing diagnostics from Topology can dramatically 
reduce the time spent troubleshooting issues.

To perform diagnostics from Topology (from an Aviatrix Gateway):

1.  In Topology, click on an Aviatrix Gateway in the topology map to select it.

2.  Click the DIAG button.

3.  Perform any of the following diagnostic tasks for the gateway:

    1.  PING: Run pings directly from the gateway to outside of the Aviatrix managed network or to any resource inside the network.

    2.  TRACEROUTE: Run trace route.

    3.  Test Connectivity: Test the connectivity of the gateway to a specified host running on a specified TCP or UDP port.

    4.  ACTIVE SESSIONS: View sessions that are active on the selected gateway. You can filter active sessions by search criteria. For example, a search on a specific port to see if the gateway has an action session on that port.

    5.  INTERFACE STATS: View interface statistics about the gateway. The number of interfaces or tunnels associated with the gateway is displayed. Click on the name of an interface or tunnel to see its statistical information.

Working with FlowIQ
===================

This section describes the FlowIQ feature of Aviatrix CoPilot.

FlowIQ provides visualization of traffic flows that traverse Aviatrix gateways. In FlowIQ, you can find any network traffic that is moving across any gateway managed by the Aviatrix Controller in your Aviatrix transit network (multi-cloud or single cloud network). CoPilot displays metadata about traffic that flows across each link in your Aviatrix transit network. FlowIQ enables you to identify where data in your network is going to and where it is coming from and you can filter for detailed information about the traffic down to the packet level. 

Flows provides you with critical visibility capability to that traffic that traverses your network.

Interacting with the flows
--------------------------
FlowIQ provides various views for visualizing traffic records. The views respond to filters that are selected. 
The filters that are set by the user are carried across all of the views. 


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

- VPC/VNET/VCN Routes: Routing tables for all virtual data centers (VPC/VNET/VCN) in any cloud provider. 

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

When configuring notifications, you can choose email or Webhook destinations. Before you begin, specify the email or Webhook addresses in the Notifications tab of CoPilot Settings. For more information about Webhooks, see `CoPilot Webhooks Customization  <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#copilot-webhooks-customization>`_.

To configure notifications:

1. From the sidebar, click Notifications.
#. In Define Alert, type the name you want to use for the alert.
#. In Condition, select the metric or condition that must be met to trigger the alert.
#. Click Add Recipients and select the email address or Webhook destination where you want the alert to be sent. Repeat this step for each recipient you want to receive the alert.
#. Click Save. The alert is enabled. When the condition is met for the metric you specified, CoPilot will now send an alert to the email or Webhook system you specified.

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

- **Block threat-IP traffic.** In ThreatGuard, you can enable blocking of threat-IP traffic. To block threat-IP traffic, alerts must first be enabled. When blocking is enabled, the Controller upon first detecting a threat IP in a traffic flow, instantiates security rules (stateful firewall rules) on all gateways that are within that flow (all gateways within the VPC/VNET/VCN) to immediately block the threat-IP associated traffic. If the threat IP is removed from the database of the threat-IP source, the Controller automatically removes the security rules for that specific threat IP from the affected gateways and associated traffic is no longer blocked. Otherwise, the security rules for that specific threat IP remain enforced. NOTE: If you disable ThreatGuard blocking, the action removes all existing firewall rules instantiated by Aviatrix Controller for all threats (that is, all threat IPs) detected up to that point.

You must have a CoPilot user account that has ``all_write`` or ``all_security_write`` permissions to be able to enable/disable ThreatGuard alerts and blocking.

Enable ThreatGuard Alerts
---------------------------

Enable ThreatGuard alerts to receive notifications when threat IPs are detected in your network traffic.

To enable ThreatGuard alerts, you must log in to CoPilot with a user account that has ``all_write`` or ``all_security_write`` permissions.

To enable ThreatGuard alerts:

1. Log in to CoPilot.
2. From the sidebar, click ThreatIQ, and then click the ThreatGuard tab.
3. Click the **Send Alert** button and then click the Send Alert slider so that it slides to the right.
4. In the ThreatGuard Configuration dialog, click Add Recipients. Select the email address destination to which you want to send ThreatGuard alerts. Repeat this for each recipient you want to receive the alert.
5. Click **CONFIRM**. ThreatGuard alerts are enabled. When a threat IP is detected in a traffic flow, CoPilot will now send a notification to the email or Webhook system you specified. The notification will state the threat IP that was detected in the blocked traffic.
6. (Optional) Verify that ThreatGuard alerts are enabled: A) From the sidebar, click Notifications. B) In the Configured Alerts list, locate the entry with the name **ThreatGuard Alert** that has the condition **When Threat IP Detected**. This entry validates that alerts are enabled.
7. (Optional) Enable ThreatGuard blocking. After alerts are enabled, you can opt to enable ThreatGuard blocking. See Enable ThreatGuard Blocking for instructions. When ThreatGuard blocking is enabled, Aviatrix Controller pushes down firewall policies to block threat-IP associated traffic as soon as it is detected.

Enable ThreatGuard Blocking 
---------------------------

Enable ThreatGuard blocking to block traffic at Aviatrix Gateways where threat IPs have traversed. When blocking is enabled, Aviatrix Controller pushed down firewall policies to block threat-IP associated traffic as soon as it is detected. All gateways in the VPC/VNET/VCN will block.

To enable ThreatGuard blocking, you must log in to CoPilot with a user account that has ``all_write`` or ``all_security_write`` permissions.

To enable ThreatGuard blocking:

1. Log in to CoPilot.
2. From the sidebar, click ThreatIQ, and then click the ThreatGuard tab.
3. Verify that ThreatGuard alerts are enabled. The alerts are enabled when the Send Alert status has a green checkmark. ThreatGuard alerts must be enabled before blocking can be enabled. See *Enable ThreatGuard Alerts* for instructions.
4. Click the **Block Traffic** button and then click the Block Threats slider so that it slides to the right. ThreatGuard blocking is enabled. Aviatrix Controller now enforces firewall policies to block threat-IP associated traffic as soon as it is detected. Each time a different IP threat is detected, a new firewall rule is instantiated on the gateway. All gateways in a VPC/VNET/VCN will block the associated traffic.
5. (Optional) Disable blocking. **Note:** When you disable ThreatGuard blocking, the action removes all existing firewall rules instantiated by Aviatrix Controller for all threats detected up to that point.   


Working with Reports
=====================

This section describes the Reports feature of Aviatrix CoPilot.

In Reports, you can create detailed reports showing your inventory of managed resources (resources managed by Aviatrix Controller) in a single cloud or across all clouds in your multi-cloud network.

You can quickly create reports that show on which cloud, region, and VPC/VNET/VCN specific managed resources are running. You can add columns to the report for different properties associated with resource types. You can apply complex filters to customize the data that gets included in the report for each resource type.

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

5.  In **Select the VPC(s)**, CoPilot shows all the VPCs/VNETs/VCNs in which you have managed resources for the region(s) you specified in the previous step. Select each VPC/VNET/VCN that includes managed resources to include in your report. If the types of managed resources to include are within all VPCs/VNETs/VCNs, click **Select All**.

6.  In **Select resource type(s)**, select the resource type icons to specify the resource types to include in the report.

7.  In **Select the properties**, CoPilot shows various properties that are associated with the resource types you specified in the previous step. Select a property to include it as a column in the report. The report preview pane automatically includes the *name* property of the managed resource and its *cloud*, *region*, and *VPC/VNET/VCN* properties (you can deselect them to remove them from the report). You can use the Search box to locate a property associated with data to include in the report. For example, for the gateway resource type, typing *size* in the search box returns a result `vpc_size`. By including `vpc_size` in the report, you can view what size instance each of those gateways are currently running on (the `vpc_size` property signifies the size of gateways). As another example, typing *trans* in the search box returns properties that include `transit` in the name, such as `transit_vpc`. By including the `transit_vpc` property in the report, you can view which of those gateways are transit gateways.

8.  In **Add filters**, you can optionally use filters to narrow down the managed resources to include in your report. For any property, you can set a filter using the property's value (TIP: When you include a property in the report, the value of it is listed in its associated report column). For example, if you have hundreds of gateways in your environment and want to narrow down the contents of the report to only transit gateways, add a filter with the rule to show only transit gateways (click ADD FILTERS, click ADD RULE, and then set field `gateway.transit.vpc` with the filter operator ``==`` set to value `yes` and click APPLY FILTERS). If you add a filter on a property you did not previously select to be included (displayed) in the report, the filter is applied but the property is not added to the report. In this case, it may be helpful to take note of your applied filter for future reference. NOTE: Currently, filters cannot be saved.

9.  (Optional) Save, download, or print the report. For printing, select the paper size and page orientation.

10. (Optional) To generate another report, clear filters (click CLEAR FILTERS if you created filters) and deselect any criteria that does not apply to your next report. Deselect the properties, deselect the resource types, deselect the VPCs/VNETs/VCNs, deselect the regions, and deselect the clouds as needed to report only on the data you want.


CoPilot WebHooks Customization
==============================

You can customize the webhooks Aviatrix CoPilot generates for sending to external systems (such as Slack) by using the Handlebars templating language. Examples are provided in this topic for high level variables that are exposed in CoPilot notification alerts.

CoPilot alerts expose the following high level variables (objects):

- **alert**
- **event**
- **webhook**

Each object exposes additional variables that can be accessed.

Alert
-------

The alert object exposes ::

  "alert": {
    "closed": false,
    "metric": "CPU Utilization",
    "name": "High CPU Usage",
    "status": "OPEN",
    "threshold": 80,
    "unit": "%"
  }

Event
-------

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

Webhook
---------

The webhook object exposes ::

  "webhook": {
    "name": "",
    "secret": "",
    "tags": [],
    "url": ""
  }

Creating a custom webhook and accessing individual fields
-----------------------------------------------------------

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

|webhook_image|


Settings
======================

Settings page allows user to configure various settings of CoPilot. Please ensure to reach the documentation
before making any changes to the settings

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
This page allows you stop/start/restart various services

Resources
-----------
Resources helps you understand the resource utilization levels in your appliances 
and take necessary actions


Licensing 
-----------
This page provides functionality for viewing your current license or release the license. 
**Releasing License*** this 

Index Management
-----------------

Managing Your Appliance 
========================================
 

**Backup and recovery**  
  In order to provide backup to your data, you can leverage instance snapshot methodology in the cloud.
  You can configure periodic snapshots
  ,based on your preferred interval, to be able retain data in case of corruption or disk loss on EBS  



..  |dashboard_image| image:: CoPilot_reference_guide_media/CoPilot_dashboard.png
    :width: 200

..  |topology_image| image:: CoPilot_reference_guide_media/CoPilot_topology.png
    :width: 200


..  |flowIQ_image| image:: CoPilot_reference_guide_media/CoPilot_flowiq.png
    :width: 200

..  |webhook_image| image:: copilot_reference_guide_media/webhookImage.png
    :scale: 50%


