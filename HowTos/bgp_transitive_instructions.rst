.. meta::
   :description: BGP, transitive peering, Peering
   :keywords: BGP, transitive peering, Aviatrix inter region peering, inter cloud peering


Introduction
=============

This guide provides instructions on how to enable BGP for a Transit VPC solution. 
Aviatrix gateway deployed in Transit VPC exchanges routes with a VGW that connects to on-prem by Direct Connect. 

Deploymnet Steps
=================

1. Create VGW at Transit VPC for Direct Connect that connects to on-prem. Enable BGP to exchange routes between VGW and on-prem network.

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

   - CGW Inside IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Inside IP Addresses"->"Customer Gateway" from 'Configuration Template'

   - VGW Inside IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Inside IP Addresses"->"Virtual Private Gateway" from 'Configuration Template'

   - Advertise Network: Transit VPC CIDR
  
   - Enable HA: Deselected

   - Primary Cloud Gateway: Aviatrix Gateway in Transit VPC

   - Remote Gateway IP Address: "IPSec Tunnel #1"->"Tunnel Interface Configuration"->"Outside IP Addresses"->"Virtual Private Gateway" from 'Configuration Template'

   - Pre-shared Key: "IPSec Tunnel #1"->"Internet Key Exchange Configuration"->"Pre-Shared Key" from 'Configuration Template'

#. At Controller console, Advanced Config -> BGP:

   - Edit "Local AS Num" if required
   
   - Enable "BGP"

#. At Controller's Site2Cloud page:

   - Make sure site2cloud tunnel is up and working 

   - View “Remote Subnet”, this is on-prem network obtained through route exchange between.

#. At a Spoke VPC, launch an Aviatrix Gateway.

#. At Controller console, Peering -> Encrypted Peering, create peering between Aviatrix Gateways at spoke VPC and Transit VPC.

#. At Controller console, Peering -> Transitive Peering, create transitive peering from spoke VPC to on-prem via Transit VPC. Transitive Peering configuration:i

   - Source Gateway: Spoke VPC Gateway

   - Nexthop Gateway: Transit VPC Gateway

   - Destination CIDR: on-prem network displayed at Site2Cloud -> "Remote Subnet"

#. At Controller's Site2Cloud page, select the site2cloud connection created above. At "BGP Advertise Networks" field, append Spoke VPC's CIDR to the list.

#. Repeat Step 10 - Step 13 for each Spoke VPC connected to Transit VPC.

.. disqus::
