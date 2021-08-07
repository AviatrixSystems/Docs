.. meta::
  :description: CloudWAN Workflow
  :keywords: SD-WAN, Cisco IOS, Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network

============================================================
Aviatrix CloudWAN Workflow for Azure Virtual WAN
============================================================

This technical note provides a step-by-step instruction how to build `CloudWAN Deployment on Azure Virtual WAN <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html#cloudwan-deployment-on-azure>`_. In this note you learn how to:

	#. create a virtual WAN, a hub, VPN gateway, and a connection between VNet and a hub in Azure portal.
	
	#. deploy a site and build a VPN connection between a site and a hub through Aviatrix Controller.
	
	#. verify end-to-end traffic between a site and a VM in Azure VNet.

**Note**: You can use the same VNet resource group names under different subscriptions.

For more information about CloudWAN, please check out the below documents:

  `CloudWAN FAQ <https://docs.aviatrix.com/HowTos/cloud_wan_faq.html>`_
  
  `CloudWAN workflow to get started <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html>`_

Topology
==================

|cloudwan_azure_vwan_topology|

::

    In this testing example, the on-premise router is Cisco IOS with network loopback address 1.1.1.1/32. 
    Azure Virtual Hub private address space is 10.0.0.0/16. Azure Virtual network which connects to the Virtual Hub is 192.168.22.0/24 and the testing VM IP is 192.168.22.5/32.


Part 1. Workflow on Azure
===========================

Step 1. Login Azure Portal
---------------------------

	- Open a browser
	
	- Navigate to the Azure portal
	
	- Sign in with Azure account

Step 2. Create a Virtual WAN 
----------------------------

	- Search for "Virtual WANs" on the search bar
	
	- Navigate to the page "Virtual WANs" by clicking the link "Virtual WANs" in the Services prompt list
	
	- Click the button "+Add" to go to the page "Create WAN"

	- Enter fields Subscription, Resource group, Resource group location, Name, and Type for Project details and Virtual WAN details:
	
		+-------------------------+-----------------------------------------------------------------------+
		| **Field**               | **Value**                                                             |
		+-------------------------+-----------------------------------------------------------------------+
		| Subscription            | Select the subscription                                               |
		+-------------------------+-----------------------------------------------------------------------+
		| Resource group          | Create new or use existing (i.e. Aviatrix-Azure-Virtual-WANS-Group)   |
		+-------------------------+-----------------------------------------------------------------------+
		| Resource group location | Select a resource location (i.e. West US 2)                           |
		+-------------------------+-----------------------------------------------------------------------+
		| Name                    | Enter a name for Virtual WAN (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2) |
		+-------------------------+-----------------------------------------------------------------------+
		| Type                    | Basic or Standard (i.e. Standard)                                     |
		+-------------------------+-----------------------------------------------------------------------+
	
		|cloudwan_azure_vwan_create_vwan|
	
	- Click the button "Review + create"
	
	- Click the button "Create"

	- Wait for a few minutes for Azure to create Virtual WAN

	- Go to the Resource group where the Azure Virtual WAN locates (i.e. Aviatrix-Azure-Virtual-WANS-Group)
	
	- Confirm Virtual WAN is created (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2)

	- Navigate to the page "Virtual WAN" by clicking on the Virtual WAN link (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2)

		|cloudwan_azure_vwan_confirm_vwan|

	- Check whether the Status of Virtual WAN is Succeeded
	
		|cloudwan_azure_vwan_check_status_vwan|

Step 3. Create a Hub with VPN gateway
-------------------------------------

	- Navigate to the page "Hubs" by clicking the link "Hubs" under the section "Connectivity" on the page "Virtual WAN" 
	
		|cloudwan_azure_vwan_create_hub|
	
	- Click the button "+ New Hub"
	
		|cloudwan_azure_vwan_click_hub|
	
	- Enter fields Region, Name, and Hub private address space for Virtual Hub Details

		+---------------------------+-----------------------------------------------------------------------------+
		| **Field**                 | **Value**                                                                   |
		+---------------------------+-----------------------------------------------------------------------------+
		| Region                    | Select a region for hub (i.e. West US 2)                                    |
		+---------------------------+-----------------------------------------------------------------------------+
		| Name                      | Enter a name for Hub (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2-Virtual-Hub-1) |
		+---------------------------+-----------------------------------------------------------------------------+
		| Hub private address space | Hub private address space (i.e. 10.0.0.0/16)                                |
		+---------------------------+-----------------------------------------------------------------------------+
	
		|cloudwan_azure_vwan_example_hub|
	
	- Click the button "Next: Site to site >" to create a VPN gateway
	
	- Toggle the button "Do you want to create a Site to site (VPN gateway)?" to "Yes" on under the tab "Site to site"
	
	- Copy the AS Number. Notes: the AS Number field here is not editabl at this moment.

	- Select the Gateway scale units based on your requirement (i.e 1 scale unit - 500 Mbps x 2)
	
		|cloudwan_azure_vwan_example_site2site|
	
	- Click the button "Review + create"
	
	- Click the button "Create"
	
	- Wait for at least 30 minutes for Azure to create Virtual Hub

	- Refresh or go back to the page "Hubs"
	
	- Check whether the Hub status is Succeeded
	
		|cloudwan_azure_vwan_check_status_hub|
		
[Optional] Step 4. Create a VPN gateway in the existing Hub
-----------------------------------------------------------

This step guide you how to create a VPN gateway in an existing Hub if you have not launched it.

	- Navigate to the page "Hubs" by clicking the link "Hubs" under the section "Connectivity" on the page "Virtual WAN" 
	
	- Navigate to the page "Virual HUB" by clicking the link with your Hub name on the Hubs table (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2-Virtual-Hub-1)
	
		|cloudwan_azure_vwan_link_hub|

	- Search the panel "VPN (Site to site)"
	
	- Click the button "(Create)" to create a VPN gateway inside the Hub
	
	- Copy the AS Number. Notes: the AS Number field here is not editabl at this moment.

	- Select the Gateway scale units based on your requirement (i.e 1 scale unit - 500 Mbps x 2)
	
	- Click the button "Create"
	
		|cloudwan_azure_vwan_example_vpngw|
	
	- Wait for at least 30 minutes for Azure to create VPN gateway
	
	- Refresh the page
	
	- Check whether the VPN Gateway status is succeeded
	
		|cloudwan_azure_vwan_check_status_vpngw|
		
Step 5. Connect the VNet to the hub
-----------------------------------
	
	- Navigate back to the page "Virtual WAN" by clicking on the Virtual WAN link (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2) in the Resource Group (i.e. Aviatrix-Azure-Virtual-WANS-Group)
	
	- Navigate to the page "Virtual network connections" by clicking the link "Virtual network connections" under the section "Connectivity" on the page "Virtual WAN"
	
		|cloudwan_azure_vwan_link_virtual_network_connections|
	
	- Click the button "+ Add connection"
	
	- Enter Connection name, Hubs, Subscription, Resource group, Virtual network, and Routing configuration.

		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| **Field**                 | **Value**                                                                                                                              |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Connection name           | Enter a name for connection (i.e. Aviatrix-Azure-WAN-to-VNET-192-168-22-connection)                                                    |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Hubs                      | Select the hub you want to associate with this connection (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2-Virtual-Hub-1)                       |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Subscription              | Select the subscription                                                                                                                |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Resource group            | Select the Resource group where has a Virtual network to associate with this connection (i.e. rg-av-Azure-West-US-2-192-168-22-881195) |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Virtual network           | Select the virtual network you want to connect to this hub (i.e. Azure-West-US-2-192-168-22)                                           |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Associate Route Table     | Select Route Tables for this connection (i.e. Default)                                                                                 |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Propagate to Route Tables | Select Propagate to Route Tables (i.e. Default)                                                                                        |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		| Static routes             | Customize routes to specify next hop as an IP address, for example a NVA IP address (i.e. leave it blank)                              |
		+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------+
		
		.. note::
			
			The virtual network cannot have an already existing virtual network gateway.
	
		|cloudwan_azure_vwan_example_virtual_network_connections|			
			
	- Wait for a few minutes for Azure to create Virtual network connection
	
	- Refresh and navigate back to the page "Virtual network connections" by clicking the link "Virtual network connections" under the section "Connectivity" on the page "Virtual WAN"
	
	- Check whether the field "Virtual network connection status" is displayed Succeeded
	
		|cloudwan_azure_vwan_check_status_virtual_network_connections|		
			
Part 2. Workflow on Aviatrix
=============================

Prerequisite
------------

	#. `Upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ Aviatrix Controller to at least version 6.0
	
	#. `Create primary access account for Azure in Aviatrix Controller <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#azure-arm>`_

Step 6. Login Aviatrix Contoller
--------------------------------

	- Open a browser
	
	- Navigate to the Aviatrix Controller
	
	- Sign in with Aviatrix account

Step 7. `Register a Branch Router <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#register-a-branch-router>`_
--------------------------------

	- Navigate to the page "CLOUDWAN -> Register" 
	
	- Find the panel 1) Register a Branch Router
	
	- Enter fields for Branch Name, Branch Router's Management IP Address, Vendor / Device / OS, Router's Console Access Authentication, Username, Private Key/Password, SSH Port, and Optional Information.

		+----------------------------------------+------------------------------------------------------------------+
		| **Field**                              | **Value**                                                        |
		+----------------------------------------+------------------------------------------------------------------+
		| Branch Name                            | The name of the branch router (i.e. Aviatrix-Office-Cisco-ISR-1) |
		+----------------------------------------+------------------------------------------------------------------+
		| Branch Router's Management IP Address  | The public management IP of the branch router                    |
		+----------------------------------------+------------------------------------------------------------------+
		| Vendor / Device / OS                   | The operation system of the branch router (i.e. ios)             |
		+----------------------------------------+------------------------------------------------------------------+
		| Router's Console Access Authentication | Access authentication to public management IP (i.e. Password)    |
		+----------------------------------------+------------------------------------------------------------------+
		| Username                               | Username to access branch router                                 |
		+----------------------------------------+------------------------------------------------------------------+
		| Private Key/Password                   | Private Key/Password to access branch router                     |
		+----------------------------------------+------------------------------------------------------------------+
		| SSH Port                               | SSH port to access branch router                                 |
		+----------------------------------------+------------------------------------------------------------------+
		| Optional Information                   | [optional] Address info for the branch router                    |
		+----------------------------------------+------------------------------------------------------------------+

	- Click the button "REGISTER"
	
		|cloudwan_azure_vwan_avx_example_register_branch_router|
		
	- Repeat the above steps for more branch routers
		
Step 8. `Check whether Aviatrix controller connects to the public management IP of the branch router properly <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#connect-to-the-controller>`_
----------------------------------	

	- Navigate to the page "CLOUDWAN -> List/Edit" 
	
	- Check the state is displayed "registered" on the column "State"
	
		|cloudwan_azure_vwan_avx_check_status_branch_router|		

Step 9. `Prepare to Attach <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#prepare-to-attach>`_
----------------------------------
	
	- Navigate to the page "CLOUDWAN -> Attach"
	
	- Find the panel 1) Prepare to Attach 
	
	- Select the branch router which is created in the previous step
	
	- Click the button "DISCOVER WAN INTERFACES"
	
		|cloudwan_azure_vwan_avx_click_discover_wan_interfaces_button|		
		
	- Select WAN interface in the drop-down menu
	
	- Update WAN primary interface and IP if needed
	
	- Click the button "APPLY"
	
		|cloudwan_azure_vwan_avx_example_prepare_to_attach|	
	
Step 10.  `Attach the Branch Router to Azure Virtual WAN <https://docs.aviatrix.com/HowTos/cloud_wan_workflow.html#option-3-attach-to-azure-vwan>`_
----------------------------------

	- Navigate to the page "CLOUDWAN -> Attach"
	
	- Find the panel 2) Attach Branch to Cloud
	
	- Select the radio button "Azure Virtual WAN"
	
	- Enter fields for Branch Name, Access Account Name, Resource Group, Hub Name, Connection Name, and Branch Router's BGP ASN.

		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| **Field**               | **Value**                                                                                                 |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Branch Name             | A registered branch router (i.e. Aviatrix-Office-Cisco-ISR-1)                                             |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Access Account Name     | The Access Account for Azure subscription                                                                 |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Resource Group          | The Resource Group where Azure Virtual WAN locates (i.e. Aviatrix-Azure-Virtual-WANS-Group)               |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Hub Name                | Azure Virtual Hub which is created on Azure portal (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2-Virtual-Hub-1) |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Connection Name         | A unique name for the connection (i.e. Aviatrix-Office-Cisco-ISR-1-to-Azure-Hub)                          |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		| Branch Router's BGP ASN | Only BGP is supported. Enter BGP ASN number on the branch router. (i.e. 65222)                            |
		+-------------------------+-----------------------------------------------------------------------------------------------------------+
		
	- Click the button "ATTACH"
		
		|cloudwan_azure_vwan_avx_example_attach_branch_to_cloud|
	
	- Repeat the above steps for more VPN connections
	
Step 11. Check whether the connection status is Up
----------------------------------

	- Navigate to the page "SITE2CLOUD -> Setup"
	
	- Locate the connection which is created in the previous step (i.e. Aviatrix-Office-Cisco-ISR-1-to-Azure-Hub)
	
	- Check whether the connection status is Up as below example
	
		|cloudwan_azure_vwan_avx_check_connection_status|
		
Step 12. Check whether the VPN connection status is Up on Azure portal
----------------------------------

	- Navigate to the page "Hubs" by clicking the link "Hubs" under the section "Connectivity" on the page "Virtual WAN" 
	
	- Navigate to the page "Virual HUB" by clicking the link with your Hub name on the Hubs table (i.e. Aviatrix-Azure-Virtual-WAN-1-US-2-Virtual-Hub-1)
	
	- Navigate to the page "VPN (Site to site)" by clicking the link "VPN (Site to site)" under the section "Connectivity"
	
	- Check whether both connection status is Succeeded and Connectivity status is Connected as below example
	
		|cloudwan_azure_vwan_azure_check_connection_status|	
		
Traffic Flow Verification
=========================

    In this traffic verification example, the on-premise router is Cisco IOS with network loopback address 1.1.1.1/32. Azure Virtual Hub private address space is 10.0.0.0/16. Azure Virtual network which connects to the Virtual Hub is 192.168.22.0/24 and the private IP of the testing VM is 192.168.22.5/32.
		
		- Traffic from on-premise router Cisco IOS to cloud VM
		
			- Issue ICMP traffic from on-prem loopback interface to a Virtual IP of cloud instance
			
				|cloudwan_azure_vwan_verification_on_prem_router_issue_icmp|
			
			- Execute packet capture on the cloud instance
				
				|cloudwan_azure_vwan_verification_cloud_vm_tcpdump_icmp|
		
		- Traffic from cloud VM to on-premise router Cisco IOS
		
			- Issue ICMP traffic from cloud instance to on-prem loopback interface address
			
				|cloudwan_azure_vwan_verification_cloud_vm_issue_icmp|
			
Resource
------------

	https://docs.microsoft.com/en-us/azure/virtual-wan/virtual-wan-site-to-site-portal

.. |cloudwan_azure_vwan_topology| image:: cloud_wan_faq_media/cloudwan_azure_vwan.png
   :scale: 50%
	 
.. |cloudwan_azure_vwan_create_vwan| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_create_vwan.png
   :scale: 50%
	 
.. |cloudwan_azure_vwan_confirm_vwan| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_confirm_vwan.png
   :scale: 50%
	 
.. |cloudwan_azure_vwan_check_status_vwan| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_check_status_vwan.png
   :scale: 50%	 
	 
.. |cloudwan_azure_vwan_create_hub| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_create_hub.png
   :scale: 50%	 

.. |cloudwan_azure_vwan_click_hub| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_click_hub.png
   :scale: 50%	 

.. |cloudwan_azure_vwan_example_hub| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_example_hub.png
   :scale: 50%	 

.. |cloudwan_azure_vwan_example_site2site| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_example_site2site.png
   :scale: 50%	 
	 
.. |cloudwan_azure_vwan_check_status_hub| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_check_status_hub.png
   :scale: 50%	   
	 
.. |cloudwan_azure_vwan_link_hub| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_link_hub.png
   :scale: 50%		 
	 
.. |cloudwan_azure_vwan_example_vpngw| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_example_vpngw.png
   :scale: 50%		 
	 
.. |cloudwan_azure_vwan_check_status_vpngw| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_check_status_vpngw.png
   :scale: 50%		 
	 
.. |cloudwan_azure_vwan_link_virtual_network_connections| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_link_virtual_network_connections.png
   :scale: 50%		

.. |cloudwan_azure_vwan_example_virtual_network_connections| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_example_virtual_network_connections.png
   :scale: 50%	

.. |cloudwan_azure_vwan_check_status_virtual_network_connections| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_check_status_virtual_network_connections.png
   :scale: 50%	

.. |cloudwan_azure_vwan_avx_example_register_branch_router| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_example_register_branch_router.png
   :scale: 50%	

.. |cloudwan_azure_vwan_avx_check_status_branch_router| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_check_status_branch_router.png
   :scale: 50%	

.. |cloudwan_azure_vwan_avx_click_discover_wan_interfaces_button| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_click_discover_wan_interfaces_button.png
   :scale: 50%	
	 
.. |cloudwan_azure_vwan_avx_example_prepare_to_attach| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_example_prepare_to_attach.png
   :scale: 50%	
	
.. |cloudwan_azure_vwan_avx_example_attach_branch_to_cloud| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_example_attach_branch_to_cloud.png
   :scale: 50%	

.. |cloudwan_azure_vwan_avx_check_connection_status| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_avx_check_connection_status.png
   :scale: 50%	
	 
.. |cloudwan_azure_vwan_azure_check_connection_status| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_azure_check_connection_status.png
   :scale: 50%	
	 
.. |cloudwan_azure_vwan_verification_on_prem_router_issue_icmp| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_verification_on_prem_router_issue_icmp.png
   :scale: 50%	

.. |cloudwan_azure_vwan_verification_cloud_vm_tcpdump_icmp| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_verification_cloud_vm_tcpdump_icmp.png
   :scale: 50%	
	 
.. |cloudwan_azure_vwan_verification_cloud_vm_issue_icmp| image:: cloud_wan_faq_media/azure_vWAN/cloudwan_azure_vwan_verification_cloud_vm_issue_icmp.png
   :scale: 50%	
	 
.. disqus::
