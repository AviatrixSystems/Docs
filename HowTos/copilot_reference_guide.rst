.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility


====================================
CoPilot User Reference Guide
====================================

Aviatrix CoPilot is a component of Aviatrix platform offering that extends visibility into complex, multi-cloud networks deployed and managed by Aviatrix controller. 
CoPilot delivers, end-end, in-depth, historical analytics of multi cloud networks with a single pane of glass that offers application flows, inventory, health, and complete topological view of the network.  

This guide will provide descriptions and definition of functionalities that are available in Aviatrix CoPilot.


Dashboard
================ 

Dashboard offers a broad perspective on the inventory and status of your deployment. 
The tiles on top of the page shows different aggregated numbers of different networking nodes in your multi-cloud environments.  

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



Topology
================


Topology provides a visual representation of deployed networks, gateways, instances, and gateway connection.

Highlights of Topology capabilities: 
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

  The search bar allows you to filter the objects that are plotted on the topology.

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

Topology providers the user with the ability to perform troubleshooting inside the topology. This can dramatically 
reduce the time spent troubleshooting issues. 
When highlighting a gateway, click on the “Diag” button to see options available for sending ping/traceroute 
from the gateway that is in focus.

FlowIQ
================


FlowIQ section provides visualization of traffic flows that traverse AVX gateways.  
Flows provider the user with critical visibility capability to that traffic that traverses their network.

Interacting with the flows
--------------------------
FlowIQ providers various views for visualizing traffic records. The view respond to filters that are selected. 
The filters that are set by the user are carried across all of views. 

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


