.. meta::
  :description: CloudWAN Workflow
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network

============================================================
Aviatrix CloudWAN Workflow for Azure Virtual WAN
============================================================

To learn CloudWAN, check out 

  `CloudWAN FAQ <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html>`_
  
  `CloudWAN workflow to get started <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html>`_

Introduction
------------

This workflow provides you the step by step instructions to build "CloudWAN Deployment on Azure Virtual WAN"

Topology
--------


Prerequisite on Azure
----------------------------

1. Login Azure Portal


2. Create a Virtual WAN 

- Search for Virtual WANs
- Click the button "+Add"
- Create WAN
- Click the button "Review + create"
- Click the button "Create"
- Go to the Resource Group "Aviatrix-Azure-Virtual-WANS-Group"
- Confirm Virtual WAN is created "Aviatrix-Azure-Virtual-WAN-1-US-2"
- Navigate to the Virtual WAN page by clicking on the Virtual WAN link

3. Create a Hub with VPN gateway

- Navigate to the Hub page by clicking the link "Connectivity -> Hubs" on Virtual WAN page 
- Click the button "+ New Hub"
	- Region
	- Name
	- Hub private address space
- Click the button "Review + create"
- Click the button "Create"

Wait for Hub ready

4. [optional] Create a VPN gateway in the existing Hub

5. Connect the VNet to the hub

Step 2. Create a site 
----------------------

- Step 1 Register a Branch Router in Register page

- Check the state is displayed "registered" at List/Edit page

- Update the WAN interface at Attach page
	- Prepare to Attach
	- Click the button "DISCOVER WAN INTERFACES"
	- Update WAN Primary Interface IP if needed
	- Click the button "APPLY"

Step 3. Create the VPN site to hub
----------------------------------

- Step 2 Attach Branch to Cloud

Verification
------------

Resource
------------
https://docs.microsoft.com/en-us/azure/virtual-wan/virtual-wan-site-to-site-portal
