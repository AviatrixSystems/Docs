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

Topology provides a visual representation of deployed networks, gateways, instances, and gateway connection.

Highlights of Topology capabilities 
-------------------------------------

- Stateful representations
  
  Connectivity elements in topology reflect state of the objet:
    
    - Connections between Aviatrix gateways are drawn with color codes representing the status of thir connection.
    - Aviatrix gateway icons represent the state of the gateway. A down gateway is shown in the black line 
    - Tunnels statuses are shown with green or red lines, representing the status of the link
- Search for any objects and their properties

  In the topology you can search for any objects that are plotted. This allows you quickly isolate and identify
  resources that you are looking in your entire environment, and across clouds


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

Topology provides the user with the ability to perform troubleshooting inside the topology. This can dramatically 
reduce the time spent troubleshooting issues. 

When highlighting a gateway, click on the “Diag” button to see options available for sending ping/traceroute 
from the gateway that is in focus.

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

Working with ThreatIQ
=====================

This section describes the ThreatIQ feature of Aviatrix CoPilot.

ThreatIQ provides visibility into threats that may attack your network. Aviatrix Cloud Network Platform communicates with a well known threat-IP source to stay abreast of malicious sites or IP addresses known to be bad actors (threat IPs). Netflow data is sent to CoPilot from Aviatrix Gateways in real time and CoPilot analyzes the traffic and compares it with a database of known malicious hosts to quickly detect traffic from threat IPs.

In ThreatIQ Threats view, a geographical map shows you the locations in your Aviatrix transit network where threat-IP traffic is occurring or has occurred within a specified time period. You can view the severity level of threat IPs detected and their associated attack classifications (as categorized by the well known threat-IP source).
In ThreatIQ, you can view detailed information about each attack including the source IP of the threat, the destination IP, the gateways where the threat-IP traffic traversed, the associated traffic flow data (date and time, source and destination ports, and so on), and threat information such as why it was deemed a threat. For each attack, you can open a network topology map where the associated compromised network is highlighted. You can drill down into the map to the server level where the compromised server (that is communicating and egressing to the threat IP) is highlighted. This topology view makes it easy to identify the subnet the compromised server was deployed on, the VPC it was deployed within, and the transit gateway it was using to communicate with the threat IP.


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


