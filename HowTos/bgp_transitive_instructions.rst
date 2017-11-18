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

#. Launch Aviatrix gateway in the Transit VPC.

#. Create Customer Gateway in Transit VPC.

#. Create AWS VPN tunnel in Transit VPC.

#. Disassociate VGW from VPC (if it was associated).

#. Create Site2Cloud tunnel on Aviatrix Gateway to work with AWS VGW over VPN tunnel. Enable BGP, advertise Transit VPC network.

#. Make sure tunnel is up and working.

#. At Controller console, Advanced Config -> BGP, view “remote network”, this is on-prem network obtained through route exchange between.

#. At a spoke VPC, configure peering between spoke VPC and Transit VPC

#. At spoke VPC, configure transitive peering from spoke VPC to on-prem via Transit VPC. The on-prem network should be the network CIDRs obtained from “remote network” in BGP page.
 

.. disqus::
