.. meta::
   :description: BGP, transitive peering, Peering
   :keywords: BGP, transitive peering, Aviatrix inter region peering, inter cloud peering

##############################################
Transit Network with BGP Setup Instructions
##############################################

Introduction
=============

`Aviatrix Services Architecture <http://aviatrix.com/blog/architectural-evolution-networking-public-cloud/>`_ builds automated and scalable network architecture for the cloud, 
as shown in the diagram below. Key characteristics in architecture: 

 - Spoke VPC to Spoke VPC networking is direct without going through the Transit VPC and is orchestrated by the central controller. 
 - BGP runs between the gateway in the Transit VPC and AWS VGW to faciliate communication between Spoke VPC and on-prem. The idea is you need to configure on-prem connectivity to VGW once and there is no need again when new Spoke VPC is stood up.  

|image0|

This guide provides instructions on how to enable BGP for a Transit VPC solution. 
Aviatrix gateway deployed in Transit VPC exchanges routes with a VGW that connects to on-prem by Direct Connect. 

Deploymnet Steps
=================

1. Establish BGP between Aviatrix Gateway and VGW in Transit VPC
-------------------------------------------------------------------

a. Create VGW at Transit VPC for Direct Connect that connects to on-prem. Enable BGP to exchange routes between VGW and on-prem network.

#. Launch Aviatrix Gateway in the Transit VPC.

#. Create Customer Gateway (CGW) in Transit VPC with the following configuration:

   - Routing: Dynamic

   - IP Address: Public IP of Aviatrix Gateway
 
#. Create AWS VPN Connection in Transit VPC with the following configuration:

   - Virtual Private Gateway: VGW in Transit VPC
  
   - Customer Gateway: CGW created above

   - Routing Options: Dynamic (requires BGP)

#. Download configuration template from AWS VPN Connection for "Generic" vendor (Referred as 'Configuration Template' below) .

#. Detach VGW from Transit VPC (if it was attached).

#. Create Site2Cloud tunnel on Aviatrix Gateway to work with AWS VGW with the following configuration:

   - VPC ID/VNet Name: Transit VPC ID
   
   - Connection Type: Unmapped

   - Connection Name: Any name

   - Remote Gateway Type: AWS VGW
 
   - Tunnel Type: UDP

   - Algorithms: Deselected

   - Encryption over ExpressRoute/DirectConnect: Deselected

   - BGP: Selected

   - Remote AS Number: "IPSec Tunnel #1"->"Border Gateway Protocol (BGP) Configuration"->"Virtual Private Gateway ASN" from 'Configuration Template'

   |image1|

   - CGW Inside IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Inside IP Addresses"->"Customer Gateway" from 'Configuration Template'

   |image2|

   - VGW Inside IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Inside IP Addresses"->"Virtual Private Gateway" from 'Configuration Template'

   |image3|

   - Advertise Network: Transit VPC CIDR
  
   - Enable HA: Deselected

   - Primary Cloud Gateway: Aviatrix Gateway in Transit VPC

   - Remote Gateway IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Outside IP Addresses"->"Virtual Private Gateway" from 'Configuration Template'

   |image4|

   - Pre-shared Key: "IPSec Tunnel #1"->"Internet Key Exchange Configuration"->"Pre-Shared Key" from 'Configuration Template'

   |image5|

#. At Controller console, Advanced Config -> BGP:

   - Edit "Local AS Num" if required
   
   - Enable "BGP"

#. At Controller's Site2Cloud page:

   - Make sure site2cloud tunnel is up and working 

   - View “Remote Subnet”, this is on-prem network obtained through route exchange between.

2. Connect Spoke VPC to on-prem
---------------------------------

a. At a Spoke VPC, launch an Aviatrix Gateway.

#. At Controller console, Peering -> Encrypted Peering, create peering between Aviatrix Gateways at spoke VPC and Transit VPC.

#. At Controller console, Peering -> Transitive Peering, create transitive peering from spoke VPC to on-prem via Transit VPC. Transitive Peering configuration:i

   - Source Gateway: Spoke VPC Gateway

   - Nexthop Gateway: Transit VPC Gateway

   - Destination CIDR: on-prem network displayed at Site2Cloud -> "Remote Subnet"

#. At Controller's Site2Cloud page, select the Site2Cloud connection created above by Aviatrix gateway at Transit VPC with BGP. At "BGP Advertised Networks" field, append Spoke VPC's CIDR to the list.

#. Repeat the above section for each Spoke VPC connected to Transit VPC.

Release 3.0 Limitations
========================

1. You need to edit each Spoke VPC Transitive Peering settings when on-prem network is changed. The changed network can be viewed from the Controller Advanced -> BGP page. 

#. When a new Spoke VPC is created, you need to edit the advertised network by Aviatrix Gateway. Go to Site2Cloud, select the connection to VGW, enter the complete list for the filed BGP Advertised Networks.

.. |image0| image:: bgp_media/servicearchitecture.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: bgp_media/VGW_ASN.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image2| image:: bgp_media/CGW_IP.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image3| image:: bgp_media/VGW_IP.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image4| image:: bgp_media/VGW_Public_IP.PNG
   :width: 5.55625in
   :height: 3.26548in

.. |image5| image:: bgp_media/Pre_shared.PNG
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
