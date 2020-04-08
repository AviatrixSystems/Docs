.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility


============================================================
Aviatrix CoPilot FAQs
============================================================


What is the defaul login for copilot? 
====================================================

Today copilot authenticates against aviatrix controller’s list of local users.  

Are the NetFlow records coming from controller or gateways?  
===============================================================================

NetFlow is configured in the controller  

What protocol does CoPilot use to talk to their controller? 
===============================================================================

RestAPI and HTTPS 

How long does it take for data to start showing in NetFlow? 
===============================================================================


It may take ~5 Minutes for NetFlow data to appear in the UI 

How are updates handled?  
===============================================================================


Automatic Update runs every 60 Mins, and automatically applies. In the current release, this is not configurable. 

Can the instance be resized?  
===============================================================================


Yes, for testing purposes. There are some configurations that are required, but it may make system less stable.  Please contact Sam for further info 

Can I configure NetFlow to be sent over private IP? 
===============================================================================


The answer to this question dependent on the environment. Although CoPilot can inherently support this here are some of the things to keep in mind to understand:  

Copilot does not discriminate whether NetFlow records are received from a public or private IP source address.  

Remember that the flow records are sent from the gateways directly to NetFlow collector (Copilot) 

Copilot does not setup a private overlay between gateways and itself, the onus is on the user to configure that. If a private communication path between the gateways and Copilot is available, then you can use Copilot’s private IP when input the collector IP in the controller. For example, if you have Aviatrix transit everywhere, and you put Copilot in one of the spokes, then you can private IP as the destination. 

The controller (as of 5.3) only supports for NetFlow collector, so whether you send flows to private IP of Copilot instance or its public IP is mutually exclusive.  


Does Copilot hold any user or sensitive data?  
===============================================================================

Copilot does not hold any user-identifiable or payment processing information. As of this release, it also does not hold any credentials on the appliance’s storage. However, it is a recommended to ensure all security best practices are followed. 

Can I Encrypt Volumes for CoPilot 
===============================================================================

In AWS, you can use EBS encryption should this be a requirement. To encrypt the disk for CoPilot, you will need to ensure encryption option is checked during launch of the VM. If this is not done at time of launch, you will then have to create a snapshot and recreate a new instance from that snapshot 

How does CoPilot get its data?
===============================================================================

1.Controller APIs

  CoPilot dials into controller to retrieve information from CoPilot

2.NetFlow

  Netflow is used to gather information about network traffic. Note that flows come directly from Aviatrix Gateways


How often is Netflow data pushed to Co-Pilot ? Can the push interval be adjusted ? 
===============================================================================

The answer to this question depends on the netflow agent used to generate flows on the sources. i.e Gateways.
However, the common practice is to wait for sometime for any flow/conversation to finish before "exporting" 
the flow to the collector, which in this case its CoPilot

How long is the data retained ? 
===============================================================================

This will depend on the nature of traffic and volume. The answer to this question will vary depending on different environment.

Can the data retention be adjusted ? 
===============================================================================

Today you can set a threshhold based on disk space available

Can we turn topology tunnels Red/Green based on tunnel status ? 
===============================================================================
The tunnles are responsive to the state of the link.

Can we provide bandwidth details of links/tunnels 
===============================================================================
If you can filter based on source and destination gateway, you can see this information.
