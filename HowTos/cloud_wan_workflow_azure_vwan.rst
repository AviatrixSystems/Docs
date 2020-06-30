.. meta::
  :description: CloudWAN Workflow
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network

============================================================
Aviatrix CloudWAN Workflow for Azure Virtual WAN
============================================================

This technical note provides a step-by-step instructions how to build "CloudWAN Deployment on Azure Virtual WAN." In this note you learn how to:

	#. create a virtual WAN, a hub, VPN gateway, and a connection between VNet and a hub in Azure portal
	
	#. deploy a site and build a VPN connection between a site and a hub through Aviatrix Controller
	
	#. verify end-to-end traffic between a site and a VM in VNet

For more information about CloudWAN, please check out the below documents:

  `CloudWAN FAQ <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html>`_
  
  `CloudWAN workflow to get started <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html>`_

Topology
==================

::

    In this example, the on-prem network address range is 10.3.0.0/16 and all other spoke VPCs connect to on-prem via 
    Aviatrix Global Transit HA Network with Active Mesh, however there is one spoke VPC with an identical CIDR of 10.3.0.0/16.

Workflow for Azure
==================

Step 1. Login Azure Portal
---------------------------

Step 2. Create a Virtual WAN 
----------------------------

		- Search for Virtual WANs
		- Click the button "+Add"
		- Create WAN
		- Click the button "Review + create"
		- Click the button "Create"
		- Go to the Resource Group "Aviatrix-Azure-Virtual-WANS-Group"
		- Confirm Virtual WAN is created "Aviatrix-Azure-Virtual-WAN-1-US-2"
		- Navigate to the Virtual WAN page by clicking on the Virtual WAN link

Step 3. Create a Hub with VPN gateway
-------------------------------------

		- Navigate to the Hub page by clicking the link "Connectivity -> Hubs" on Virtual WAN page 
		- Click the button "+ New Hub"
			- Region
			- Name
			- Hub private address space
		- Click the button "Review + create"
		- Click the button "Create"
		
		Wait for Hub ready
		
[Optional] Step 4. Create a VPN gateway in the existing Hub
-----------------------------------------------------------

Step 5. Connect the VNet to the hub
-----------------------------------


Workflow for Aviatrix
=====================

Prerequisite
------------

	#. `Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.0
	
	#. `Create primary access account for Azure in Aviatrix Controller <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#azure-arm>`_

Step 6. Login Aviatrix Contoller
--------------------------------

Step 7. `Register a Branch Router <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#register-a-branch-router>`_
--------------------------------

	- Navigate to the page "CLOUDWAN -> Register" 
	
	- Find the panel 1) Register a Branch Router
	
	- Enter fields for Branch Name, Branch Router's Management IP Address, Vendor / Device / OS, Router's Console Access Authentication, Username, Private Key/Password, SSH Port, and Optional Information.

		======================================  =======================
		**Field**               								**Value**
		======================================  =======================
		Branch Name             								The name of the branch router (i.e. )
		Branch Router's Management IP Address   The public management IP of the branch router
		Vendor / Device / OS        						The operation system of the branch router (i.e. ios)
		Router's Console Access Authentication  Access authentication to public management IP (i.e. Password)
		Username                								Username to access branch router
		Password               									Password to access branch router         
		SSH Port             	 									SSH port to access branch router 
		Optional Information                    [optional] The related address info for the branch router
		======================================	=======================

	- Click the button "REGISTER"
	
Step 8. `Check whether Aviatrix controller connects to the public management IP of the branch router properly <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#connect-to-the-controller>`_
----------------------------------	

	- Navigate to the page "CLOUDWAN -> List/Edit" 
	
	- Check the state is displayed "registered" on the column "State"

Step 9. `Prepare to Attach <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#prepare-to-attach>`_
----------------------------------
	
	- Navigate to the page "CLOUDWAN -> Attach"
	
	- Find the panel 1) Prepare to Attach 
	
	- Select the branch router which is created in the previous step
	
	- Click the button "DISCOVER WAN INTERFACES"
	
	- Select WAN interface in the drop down menu
	
	- Update WAN primary interface IP if needed
	
	- Click the button "APPLY"
	
Step 10.  `Attach the Branch Router to Azure Virtual WAN <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#option-3-attach-to-azure-vwan>`_
----------------------------------

Create the VPN site to hub

	- Navigate to the page "CLOUDWAN -> Attach"
	
	- Find the panel 2) Attach Branch to Cloud
	
	- Select the radio button "Azure Virtual WAN"
	
	- Enter fields for Branch Name, Access Account Name, Resource Group, Hub Name, Connection Name, and Branch Router's BGP ASN.

		==================================		=================================
		**Field**															**Value**
		==================================		=================================
		Branch Name                           A registered branch router.
		Access Account Name                   Azure vWAN option
		Resource Group                        The Access Account for Azure subscription 
		Hub Name                              Azure vWAN Hub created on Azure portal
		Connection Name                       A unique name for the connection.
		Branch Router's BGP ASN               Only BGP is supported. Enter BGP ASN number on the branch router.
		==================================		=================================

Verification
------------

Resource
------------
https://docs.microsoft.com/en-us/azure/virtual-wan/virtual-wan-site-to-site-portal
