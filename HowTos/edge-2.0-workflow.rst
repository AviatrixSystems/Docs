.. meta::
   :description: Aviatrix Edge 2.0
   :keywords: Edge as a spoke, KVM, ESXi, secure edge, edge gateway

============================
Deploying Aviatrix Edge  2.0
============================

Aviatrix Edge 2.0 (Edge as a Spoke) enables you to extend your cloud network to the Edge and easily integrate it with your remote locations and data centers. You can extend your Aviatrix-managed platform to the Edge as well as support multi-cloud multi-transit connectivity. 

Aviatrix Edge 2.0 is supported in AWS, Azure, and OCI. Edge 2.0 is supported in GCP for non-High-Performance Encryption (HPE) environments.

This document provides instructions for deploying Aviatrix Edge 2.0 on VMware ESXi or on open-source Kernel-based Virtual Machine (KVM). 

For examples of Edge 2.0 designs, refer to `Aviatrix Edge Design Patterns <http://docs.aviatrix.com/HowTos/edge-design-patterns.html>`_.

For additional information about Aviatrix Edge 2.0, refer to `Aviatrix Secure Edge FAQ <http://docs.aviatrix.com/HowTos/secure_edge_faq.html>`_. 

For the Aviatrix Edge 1.0 for ESXi workflow, refer to `Deploying Aviatrix Edge 1.0 for VMware ESXi <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html>`_.
   

Aviatrix Edge Network Connectivity
==================================

|edge-network-connectivity|

Prerequisites
=============

Aviatrix Edge 2.0 requires the following:

-	Aviatrix Controller 6.8
-	VMware ESXi

    -	OVA image for VMware ESXi (see `Requesting Aviatrix Edge Gateway Image File <http://docs.aviatrix.com/HowTos/secure-edge-kvm.html#requesting-an-aviatrix-edge-gateway-image-file>`_).
    -	VMware ESXi 6.7 or 7.0.1
    -	Sufficient VMware ESXi resources to run Edge Gateway (see `Aviatrix Edge 2.0 Installation Requirements <http://docs.aviatrix.com/HowTos/secure-edge-kvm.html#aviatrix-edge-2.0-installation-requirements>`_).
    -	(Optional) VMware vCenter Server
	
	For information about installing VMware products, refer to the VMware product documentation.
	
-	KVM

    -	QCOW2 image for KVM (see `Requesting Aviatrix Edge Gateway Image File <http://docs.aviatrix.com/HowTos/secure-edge-kvm.html#requesting-an-aviatrix-edge-gateway-image-file>`_).
    -	KVM server running in Linux Bare Metal Server
    -	CentOS 7.6-1810
    -	QEMU Version 1.5.3, Release 160.el7_6.3
    -	Sufficient KVM resources to run Edge Gateway (see `Aviatrix Edge 2.0 Installation Requirements <http://docs.aviatrix.com/HowTos/secure-edge-kvm.html#aviatrix-edge-2.0-installation-requirements>`_).
	
	For information about installing KVM products, refer to KVM product documentation.
	
-	Aviatrix Transit Gateway BGP ASN configured. High-Performance Encryption (HPE) is optional for Edge 2.0 attachments.
-	Access to Aviatrix Controller using the Internet or private network with DNS resolution from the Edge Gateway Management interface
-	BGP-enabled router to peer with Edge Gateway LAN interface via BGP over LAN

Requesting an Aviatrix Edge Gateway Image File
----------------------------------------------

Before you begin the deployment of the Edge Gateway, submit a request to Aviatrix Support for a link to the Edge Gateway image file. You will use the image file to deploy the Edge virtual machine.

1. Log in to the Aviatrix Support Portal: `<https://support.aviatrix.com>`_.

2. Select **Submit a request**.

3. In the **Subject** field, enter **Requesting access to Edge image**.

4. In the **Edge Location** field, enter the physical address of the location where you will install the Edge VM(s), such as a data center, headend, co-location site, or office. If you are installing Edge VMs at more than one location, provide the following information for each physical location:

    - Physical Address (Do not enter a P.O.Box.)
    - City
    - State or Locality
    - Zip Code or Postal Code
    - Country

5. In the **Type of VM**, enter **OVA** for VMware ESXi or **QCOW2** for KVM.

6. Click **Submit**. Aviatrix Support will respond with a link you can use to download the Edge Gateway image file.



Aviatrix Edge 2.0 Installation Requirements
===========================================

The following sections describe the virtual machine instance configuration, network interfaces, ports and protocols, and access requirements for the Edge Gateway to communicate with the Aviatrix Controller and the Aviatrix Transit Gateway.

Virtual Machine CPU and Memory Configurations
---------------------------------------------

The following table provides CPU and memory configurations of the virtual machine instance supported for the Aviatrix Edge Gateway deployment.

+---------------------+----------------------+--------------------------+------------------------+
| **Deployment Type** | **Hardware Profile** | **Storage Requirements** | **Note**               |
+=====================+======================+==========================+========================+
| Small               | 2 vCPU - 4GB         | 64 GB                    | PoC / Test only        |
+---------------------+----------------------+--------------------------+------------------------+
| Medium              | 4 vCPU - 8GB         | 64 GB                    | <5Gbps throughput      |
+---------------------+----------------------+--------------------------+------------------------+
| Large               | 8 vCPU - 16GB        | 64 GB                    | ~10Gbps throughput     |
+---------------------+----------------------+--------------------------+------------------------+
| X-Large             | 16 vCPU - 32GB       | 64 GB                    | ~10Gbps throughput     |
+---------------------+----------------------+--------------------------+------------------------+

.. Important::
   We recommend that you not change the Edge VM resource allocation after deploying it. Aviatrix support may not be able to assist with any issue that occurs on a system with customized resource allocation.

Oversubscription of host resources can lead to a reduction of performance and your instance could become unstable. We recommend that you follow the guidelines and the best practices for your host hypervisor.

Aviatrix Edge Networking and Ports and Protocols
------------------------------------------------

|edge-network-port-protocol|

The following sections describe the Edge network interfaces, port, and protocols.

Aviatrix Edge Network Interfaces
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+-----------------------+------------------------------------------------------------------------+
|**Interface**          | **Description**                                                        |
+=======================+========================================================================+
|WAN eth0               | Interface to connect to the Aviatrix Transit Gateway.                  |
|                       | Requires a default gateway and Layer 3 reachability to Transit Gateway |
|                       | Private or Public IP.                                                  |
+-----------------------+------------------------------------------------------------------------+
|LAN eth1               | Interface to connect to the LAN network. Requires a BGP session with   | 
|                       | LAN Router.                                                            |
+-----------------------+------------------------------------------------------------------------+
|Management eth2        | Interface to connect to the Aviatrix Controller. Requires a default    |
|                       | gateway, DNS access and Internet access to Aviatrix Controller,        |
|                       | Aviatrix software download, and tracelog upload.                       |
+-----------------------+------------------------------------------------------------------------+

Aviatrix Edge Ports and Protocols
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

+------------+-------------------------------------------+--------------+----------+-----------------------+
|**Source**  | **Destination**                           | **Protocol** | **Port** | **Purpose**           |
+============+===========================================+==============+==========+=======================+
| WAN eth0   | Aviatrix Transit Gateway eth0 private or  | UDP          | 500      | IPsec                 |
|            | public IP address.                        |              |          |                       |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| WAN eth0   | Aviatrix Transit Gateway eth0 private or  | UDP          | 4500     | IPsec                 |
|            | public IP address.                        |              |          |                       |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| Mgmt eth2  | DNS server                                | UDP          | 53       | DNS lookup            |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| Mgmt eth2  | NTP                                       | UDP          | 123      | NTP                   |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| Mgmt eth2  | Aviatrix Controller FQDN or               | TCP          | 443      | Edge to Controller    |
|            | public IP address.                        |              |          | registration          |
|            | controller.aviatrixnetwork.com            |              |          |                       |
|            | spire-server.aviatrixnetwork.com          |              |          |                       |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| Mgmt eth2  | security.aviatrix.com                     | TCP          | 443      | Credentials sync      |
|            |                                           |              |          | Software download     |
+------------+-------------------------------------------+--------------+----------+-----------------------+
| Mgmt eth2  | diag.aviatrix.com                         | TCP          | 443      | Tracelog upload       |
|            |                                           |              |          | Remote support        |
+------------+-------------------------------------------+--------------+----------+-----------------------+

.. Important::

   The Aviatrix Controller requires access to the following ports for Edge Gateway deployment. You must allow access on these ports on your firewall.

      - MGMT: TCP 443 access to the Aviatrix Controller’s public IP address 
      - MGMT: TCP 443 access to the Aviatrix Controller’s private IP address (only permit this access if you selected **Management over Private Network** for management IP connectivity) 
      - WAN: UDP 500/4500


Aviatrix Edge 2.0 Deployment Workflow
=====================================

The diagram below provides a high-level view of the four-step process for deploying Aviatrix Edge 2.0 in Aviatrix Controller. You have the option to use either VMware ESXi or an open-source Kernel-based Virtual Machine (KVM) to deploy the Edge VM and attach the ZTP **.iso** file.

|edge-deploy-workflow|
 
1. Create the Edge Gateway ZTP ISO Image File
---------------------------------------------

.. note::
   You must have port 443 open to the IP address of the Aviatrix Controller. For the required access for Edge Gateway deployment, refer to `Aviatrix Edge Ports and Protocols <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#aviatrix-edge-ports-and-protocols>`_.

To create the Edge Gateway ISO image file, follow these steps.

1.  Log in to Aviatrix Controller 6.8.

2.  Go to **MULTI-CLOUD TRANSIT** > **Setup**

3.  In the **Launch an Aviatrix Spoke Gateway** page, enter the following values:

    a.  **Cloud Type**: Is always set to **Aviatrix**.

    b.  **ZTP File Type**: Select **iso**.

        .. note::
         The ISO file is the equivalent of the Zero-Touch Provisioning (ZTP) token. ZTP allows network engineers to remotely deploy and provision network devices at remote locations.

    c.  **Gateway Name**: Enter a name for the new Edge Gateway.

	d.  **Site ID**: Select an existing Site ID or create a new Site ID by entering a name (such as, edge-01) and click **Add item**. 
	
	     For guidance on whether to select an existing Site ID or create a new one, see `Edge Site ID Guidelines <http://docs.aviatrix.com/HowTos/secure_edge_kvm.html#edge-site-id-guidelines>`_.
	
    e.  **Management Connection Type**: Select DHCP or Static, depending on your environment. 
      
    .. note::
      Steps (f-n) are applicable only for static IP configuration on the management interface.
      For IP and DNS settings, enter using the applicable format. For example, if the Edge Gateway's WAN IP is 10.1.1.151, enter 10.1.1.151/24 or what your netmask is.
 
    f.  **Management Interface IP/Mask**: Enter the management interface IP/mask for the Edge VM.

    g.  **Default Gateway IP**: Enter the IP address of the Default Gateway for the Management Subnet.

    h.  **Primary DNS Server**: Enter the DNS server IP address.

    i.  **Secondary DNS server**: Enter the DNS server IP address, this field is optional.

	j.  **WAN Interface IP/Mask**: Enter the interface IP/mask for the Edge VM.

    k.  **WAN Default Gateway**: Enter the IP address of the Edge WAN interface.

    l.  **Management Over Private Network**: Check the box if the Edge management connection to the Aviatrix Controller is over a private network. Leave it unchecked if the connection is over the public internet.

    m.  **Management Egress IP CIDR**: Enter the IP address  of the Edge VM visible to the Aviatrix Controller (IP address to be allowed in the Controller Security Group. This IP is optional and can be added later).

         This field adds a security bypass filter rule for the incoming traffic on TCP/443 to your Controller.

    n.  **LAN Interface IP/Mask**: Enter the interface IP/mask for the Edge VM. 

	o.  **Active-Standby**: Check the box for active-standby mode (see `Active-Standby Edge <http://docs.aviatrix.com/HowTos/secure_edge_kvm.html#active-standby-edge>`_). Leave unchecked for Active-Active mode.
	
	.. Important::
          The Active-Active and Active-Standby modes are configured when you create the first Edge ZTP for a particular Site ID. If you need to change a configuration from Active-Active to Active-Standby, delete all the Edge Gateway for that Site ID and recreate the Edge Gateway with the new setting.

      |edge-launch-spoke-gateway|

4. To create the ISO image file, click **Create**. Aviatrix Controller prompts you to download the ISO file.

    Controller downloads the ZTP **.iso** file to your downloads folder. 

.. Note::
   Controller displays a message that confirms when you have successfully downloaded the **.iso** file you created for the Edge gateway. The .iso file will expire 24 hours after you create it, so you must mount the .iso file to an Edge VM to complete the Edge gateway registration within that timeframe, as you cannot download it again and will have to repeat the above steps.
   
Next, deploy the Edge virtual machine and attach the ZTP **.iso** file in the VMware or KVM environment.

Edge Site ID Guidelines
^^^^^^^^^^^^^^^^^^^^^^^

Aviatrix Edge 2.0 uses Site ID to identify an Edge location and Edge Gateway pair. This allows to group multiple Edge Gateways at the same Edge location using the same Site ID.
Multiple Edge Gateways can be grouped and deployed in Active-Active or Active-Standby mode.

Follow these guidelines to decide whether to use an existing Site ID or create a new one.

-	Use an existing Site ID if:

    -	You want to have Active-Standby on 2 Edge Gateways (assign the same Site ID).
    -	You want to have ECMP on multiple Edge Gateways (assign the same Site ID).
	
-	Edge Gateways with the same Site ID:

    -	Can only join the same domain.
    -	Can have the same or different local ASN.
    -	Need to have FireNet traffic inspection configured per site.
	
-	If you want to configure FireNet management on the Edge Gateway, you need to configure it per site.
-	When multiple Edge Gateways are attached to a common transit, the transit will propagate routes from Edge Gateways with the same Site ID to other Edge Gateways with a different Site ID but will not propagate routes from the Edge Gateways to other Edge Gateways with the same Site ID.

2. Deploying the Edge Virtual Machine and Attaching the ZTP ISO File
--------------------------------------------------------------------

To deploy the Edge virtual machine on KVM, skip to step `2c. Deploying the Edge Virtual Machine in KVM<http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#2c.-deploying-the-edge-virtual-machine-in-kvm>`_.

2a. Deploying the Edge Virtual Machine in VMware ESXi
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To deploy the Edge virtual machine in VMware ESXi, follow these steps. 

1. Download the ESXi OVA file by using the link provided to you by Aviatrix Support. See `Requesting a VMware ESXi OVA File <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#requesting-a-vmware-esxi-ova-file>`_.

2. Log into VMware vSphere Web client to access the ESXi host.

   You can use vSphere Web client to manage ESXi host, launch a VM, mount ISO files, and start and stop the Aviatrix Edge Gateway.

3. To load the OVA file into the ESXi using vSphere, go to: **ESXI** > **Virtual Machines** > **Create/Register VM**.

4. Select **Deploy a virtual machine from an OVF or OVA file**. Click **Next**.

5. Enter a name for the Edge VM and drag the OVA file into the blue pane. Click **Next**.

   |secure_edge_ova_load_file|

6. In the Select storage page, select the storage device for the instance you created (the OVA is installed in this instance). Click **Next**.

7. In the Deployment options window, enter the network interface mappings and select the Deployment type. (Refer to the pull-down menu or see `Virtual Machine CPU and Memory Configurations <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#virtual-machine-cpu-and-memory-configurations>`_.)

   .. Note::
      If necessary, you can change the network interface mappings after deployment.

   |secure_edge_ova_deploy_options|

8. Click **Next**.

9. In the Ready to complete page, click **Finish**.

Next, attach the ZTP **.iso** and the Edge will auto-mount the media which contains the configuration file to be provisioned to the Edge.

2b. Attaching the ISO Image to the Edge Virtual Machine in VMware ESXi
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::
   * The ZTP ISO file can only be used for a single Edge VM instance, and only one time for that instance. 
   * The ZTP token expires after 24 hours. If you wait too long to boot up the VM with the attached ISO image, it will not work. In that case, delete the Edge Gateway in the Controller UI and create a new Edge Gateway to receive a new ISO file.

1. Upload the ISO file you downloaded from Aviatrix Controller to your VMware datastore.

2. In vSphere, select the Edge VM you created and click **Edit settings**.

3. Select the **Virtual Hardware** tab.

4. Next to CD/DVD Drive 1, click the down arrow and select **Datastore ISO file** from the pull-down menu.

5. To load the ISO to the virtual CD drive, next to **Status**, check **Connect at power on**.
 
6. Next to the CD/DVD Media field, click **Browse**. Select the ISO file you downloaded.

   |secure_edge_edit_settings|

   .. note::
      **Connect at power on** (step 4) is required when you attach the ISO image to the VM for the first time. If the VM is powered on at the time you attach the ISO image, select the **Datastore ISO file** and save the configuration to make the ISO available to ZTP.

7. Click **Save**.

Next, verify Edge in Controller. See `Verifying Edge in Controller <http://docs.aviatrix.com/HowTos/secure_edge_kvm.html#verifying-edge-in-controller>`_.)

2c. Deploying the Edge Virtual Machine in KVM
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Locate the downloaded ZTP .iso file you created in Aviatrix Controller and perform these steps in your KVM hypervisor to attach the .iso file. 

1.	Log on to KVM Guest OS (CentOS).
2.	Deploy qcow2 via the CLI or the virt-manager UI.
3.	Add two additional network adapters.
4.	Add a CD ROM and attach/mount the downloaded ZTP .iso.


For more information about deploying virtual machines and attaching .iso file in KVM , refer to KVM product documentation.

After you attach the ZTP **.iso**, the KVM hypervisor will auto-mount the media which contains the configuration file to be provisioned to the Edge.

Next, verify Edge in Controller. See `Verifying Edge in Controller <http://docs.aviatrix.com/HowTos/secure_edge_kvm.html#verifying-edge-in-controller>`_.)

2d. Verifying Edge in Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wait for about 5 minutes after you have attached the ZTP **.iso** file and log in to Aviatrix Controller and complete the following steps.

1.	In Aviatrix Controller, go to **Multi-Cloud Transit** > **List** > **Spoke**.
2.	In the **State** column, verify that the Edge you created is in the **up** state. Click the refresh button to update the registration status.

|edge-verify|

Next, attach the Edge Gateway to the Transit Gateway.

3. Attach Edge Gateway to Transit Gateway
-----------------------------------------

For Edge Gateway attachment over a public network, you must update the WAN Public IP on the Edge Gateway and configure BGP ASNs on the Transit Gateway before you attach Edge Gateway.

3a. Update WAN Public IP
^^^^^^^^^^^^^^^^^^^^^^^^

To update the WAN Public IP, follow these steps.

1.	In Aviatrix Controller, go to **Gateway** > **Select a Spoke Gateway**. 
2.  Select the Edge Gateway you want to attach and click **Edit**.
3.	In IP Configurations, click **Discover Public IP**. 
4.  Verify the Public IP and click **Update**. 

.. Important::
    If you have multiple Edge Gateways, make sure each Edge Gateway has a unique WAN Public IP.
	
|edge-ip-config|

3b. Configure BGP ASNs
^^^^^^^^^^^^^^^^^^^^^^

To configure BGP AS Numbers (ASN), follow these steps.

1.	In Aviatrix Controller, go to **MULTI-CLOUD TRANSIT** > **Advanced Config** > **Edit Transit**. 
2.  Select your Transit Gateway and enter the Local AS Number for the gateway. Click **CHANGE**.
3.	Select **Edit Spoke**. 
4.  In the **BGP Spoke Gateway** pull-down menu, select the Edge Gateway you created and enter the Local AS Number for the Edge Gateway. 5.  Click **CHANGE**.


3b. Attach Edge Gateway to Transit Gateway 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After you have udated the WAN Public IP on the Edge Gateway and configured the BGP ASNs on both the Transit Gateway, follow these steps to attach the Edge Gateway to the Transit Gateway.

1.	In Aviatrix Controller, go to **MULTI-CLOUD TRANSIT** > **List** > **Spoke**. Confirm that the Edge Gateway you created is up.
2.	Navigate to **MULTI-CLOUD TRANSIT** > **Setup** > **Attach / Detach** > **1a Attach Spoke Gateway to Transit Network**.

|edge-attach-spoke-to-transit|

3.	In the **Spoke Gateway/Source Gateway** pull-down menu, select the Edge Gateway you created.
4.	In the **Transit Gateway/NextHop Gateway** pull-down menu, select your Transit Gateway.
5.	To connect over a private network, check **Over Private Network** box. Leave unchecked to connect using a public network.
6.	To configure Jumbo Frame on Edge Gateway, check **Jumbo Frame** box.
7.	To build High-Performance Encryption (HPE), check **Insane Mode** box. Leave unchecked if you do not require HPE. 
8.  Click **ATTACH**. 

.. Important::
    To create an Insane Mode attachment, make sure the Transit Gateway is enabled for Insane Mode.
	
.. Note::
    For Insane Mode over the Internet, you will need to enter the Insane Mode Tunnel Number.

To verify the Edge Gateway attachment:

* From Controller: Navigate to **Multi-Cloud Transit** > **List** > **Spoke**
* From CoPilot: Navigate to **Topology** > **Network Graph** > **Network**.

4. Connect Edge Gateway to External Device (BGP over LAN)
---------------------------------------------------------

To connect the Edge Gateway to LAN Routing using BGP over LAN, follow these steps.

1.	Go to **MULTI-CLOUD TRANSIT** > **Setup** > **External Connection**. 
2.  In **Connect to VGW/External Device/Azure VNG**, enter the following values:

    a.	Select these options: External Device, BGP, and LAN.
    b.	**VPC Name/Site ID**: Select an existing Edge Site ID from the drop-down list.
    c.	**Connection Name**: Enter a unique name to identify the connection to the LAN router.
    d.	**Aviatrix Gateway BGP ASN**: Enter the BGP AS number the Edge Gateway will use to exchange routes with the LAN router.
    e.	**Primary Aviatrix Gateway**: Select the Edge Gateway you created.
    f.	**Remote BGP AS Number**: Enter the BGP AS number configured on the LAN router.
    g.	**Remote LAN IP**: Enter the LAN router IP address for BGP peering.
    h.	**Local LAN IP**: Enter the Edge LAN interface IP address for BGP peering.

|edge-connect-external-device|

2. Click **CONNECT**.


Active-Active Edge and Active-Standby Edge Modes
================================================

When deploying multiple Edge Gateways, you have the option to use Active-Active mode or Active-Standby mode for connectivity between Edge Gateways and Transit Gateways.

Active-Active Edge
------------------

In Active-Active mode, all Edge-to-Transit connections perform load sharing and transit the traffic.  

.. Note::
    Active-Active mode can support more than 2 Edge Gateways. While there is no maximum number of Edge Gateways, Aviatrix recommends a maximum of 4.
	
Active-Standby Edge
-------------------

Active-Standby mode provides the flexibility on Aviatrix Transit Gateways and Aviatrix BGP Spoke Gateways to connect to on-prem with only one active tunnel and one backup/standby tunnel. 

|edge-active-standby|

.. Important::
    *  The Active-Standby Preemptive setting is per site and is decided when you create the first Edge Gateway for that Site ID. You cannot choose a different setting when you add more Edge Gateways to that site. 
	*  Active-Standby Mode only supports ActiveMesh 2.0.


Transitive Routing
==================

The Transitive Routing feature allows an Edge Gateway to forward routes between multiple Transit Gateways that are connected to it. In Edge 2.0, you have the option to enable or disable Transitive Routing for an Edge Gateway; it is disabled by default.

|edge-transitive-routing|

Configuring Transitive Routing
------------------------------

To configure Transitive Routing, follow these steps.

1. Attach the Edge Gateway to the first Transit Gateway. Follow the steps in `3b. Attach Edge Gateway to Transit Gateway <http://docs.aviatrix.com/HowTos/secure_edge_kvm.html#3b.-attach-edge-gateway-to-transit-gateway>`_.
2. Repeat and attach the Edge Gateway to the second Transit Gateway.
3. Navigate to **MULTI-CLOUD TRANSIT** > **Advanced Config** > **Transitive Routing**.
4. Click the toggle to enable Transitive Routing.
5. Verify routes on each Aviatrix Transit Gateway.


Transit Peering over Public Network for Backup Path
===================================================

If you have a multi-cloud environment across Cloud Service Providers, for example, AWS and Azure, you can create Transit Gateway Peering over public network and use the Transit Gateway Peering as a secondary or backup path while the Edge Gateway with Transitive Routing enabled is used as the primary path for forwarding traffic.

|edge-transit-peering|


Configuring Transit Peering over Public Network
-----------------------------------------------

To create Transit Peering over public network to use as backup path, follow these steps.

1.	In the Aviatrix Controller, go to **MULTI-CLOUD TRANSIT** > **Transit Peering**.
2.  Create a Transit Gateway Peering by following the `Transit Gateway Peering over Public Network workflow <https://docs.aviatrix.com/HowTos/transit_gateway_peering_over_public_network_workflow.html>`_.
3.	Go to **MULTI-CLOUD TRANSIT** > **Advanced Config**. Select the first Transit Gateway and take note the Local AS Number. 
4.	Scroll down to the **Connection AS Path Prepend** section. Select the Transit Peering connection name.
5.	In the **Prepend AS Path** field, input the same Local AS Number three times separated by space.

|edge-transit-peering-config|

6.	Repeat steps 3, 4, and 5 for the second Transit Gateway.


Interactions with NAT
=====================

In Aviatrix Edge 2.0, the following NAT scenarios are supported:

-  Customized SNAT on Edge Gateway - For traffic initiated from Edge location towards Transit Gateway or CSP.
-  DNAT on Edge Gateway - For traffic initiated from CSP towards Edge location.

.. Note::
    ActiveMesh connections are available in the NAT connection for non-HPE connections.

Default RBAC Access Account for Edge
====================================

In Aviatrix Edge 2.0, you have the option to create a default RBAC group and assign users to this group with permissions to create, delete, and manage Edge Gateways.

Creating the Default RBAC Access Account for Edge
-------------------------------------------------

To create an RBAC group with permissions to create, delete, and manage Edge gateways, follow these steps.

1.	Log in to Aviatrix Controller 6.8.

2.  Go to **ACCOUNTS** > **Permission Groups** > **ADD NEW**.

3.  In the **Group Name** field, enter a name for the group, and then click **OK**.

4.  In **Permission Groups**, select new group name, and then click **MANAGE PERMISSION**.

5.  In **Permissions for group "Group Name"**, click **ADD NEW**. 

6.  In **Add permissions to group "Group Name"**, select Gateway – All read/write for Gateway. 

7.  Click **OK**, and then click **Close**.

|edge-rbac|

8.	In **Permission Groups**, select the new group name, and then click **MANAGE ACCESS ACCOUNTS**.

9.	In **Access accounts for group "Group Name"**, click **ADD NEW**. 

10.  In **Add access accounts to group "Group Name"**, select **edge_admin**. 

11.  Click **OK**, and then click **Close**.

You can now create or assign a user account with the newly created RBAC group.


Selective Gateway Upgrade for Edge 2.0
-----------------------------------------

The Aviatrix Edge 2.0 base OS is not upgradeable. To update the base OS to a newer version, you can only deploy a newer version of the Aviatrix Edge image to a new VM to replace it.

As Edge 2.0 base OS is not field upgradeable, Edge 2.0 does not support selective gateway image update and software rollback.

Troubleshooting
---------------

You can use the Clish commands below to troubleshoot the Edge Gateway.

To run Clish on the Edge Gateway, log in with the username **admin**.

+-----------------------------------+--------------------------------------------------------+
| Command                           | Description                                            |
+===================================+========================================================+
| change_console_password           | Changes the password for the CLI login.                |
+-----------------------------------+--------------------------------------------------------+
| diagnostics                       | Show gateway diagnostics from                          |
|                                   | /home/ubuntu/cloudx-aws/avx_edge_status.json, which is |
|                                   | written by register process or reset_config process.   |
+-----------------------------------+--------------------------------------------------------+
| logout                            | Log out of the console.                                |
+-----------------------------------+--------------------------------------------------------+
| ping [-c count] [dest]            | Ping destination, optional parameter ping packet count.|
|                                   | The default is 5.                                      |
+-----------------------------------+--------------------------------------------------------+
| reboot                            | Reboot the system.                                     |
+-----------------------------------+--------------------------------------------------------+
| register                          | Register with the Controller.                          |
+-----------------------------------+--------------------------------------------------------+
| reset_config                      | Deregister and reset to factory default.               |
+-----------------------------------+--------------------------------------------------------+
| set_controller_ip [controller_ip] | Set controller ip, usually performed after controller  |
|                                   | migration when controller ip changed.                  |
+-----------------------------------+--------------------------------------------------------+
| show_interfaces                   | Show output from the command “ifconfig -a | more”.     |
+-----------------------------------+--------------------------------------------------------+
| show_routes                       | Show output from the command “ip route show table all”.|
+-----------------------------------+--------------------------------------------------------+
| test connect                      | Test TLS and port 443 connection to controller.        |
+-----------------------------------+--------------------------------------------------------+
| test dns [host_name]              | Test DNS availability.                                 |
+-----------------------------------+--------------------------------------------------------+
| test port                         | Test controller port 443 reachability.                 |
+-----------------------------------+--------------------------------------------------------+
| unlock                            | Unlock console and enter Linux shell.                  |
+-----------------------------------+--------------------------------------------------------+

Tech Notes About BGP and Routing
--------------------------------

If the connectivity to the Cloud Service Provider (CSP) is over a private network:  

- The edge (WAN) router runs a BGP session to VGW (AWS) where the edge router advertises an Edge Gateway WAN subnet network, and the VGW advertises the Transit VPC CIDR. 

- The Edge Gateway LAN interface runs a BGP session to the edge router where the edge router advertises the on-prem network address range to Edge Gateway LAN interface. 

- The Edge Gateway WAN interface runs a BGP session to the Transit Gateway in the Transit VPC where Transit Gateway advertises all Spoke VPC CIDRs to the Edge Gateway, and the Edge Gateway advertises on-prem network to the Transit Gateway. 

If the connectivity to the CSP is over a public network: 

- The Edge Gateway LAN and WAN interfaces do not use public IP addresses. The interfaces rely on the edge router or Firewall NAT function and Internet connectivity. 

- The Edge Gateway LAN interface runs a BGP session to the edge router where the edge router advertises the on-prem network address range to the Edge Gateway LAN interface. 



.. |secure_edge_ova_deploy_options| image:: CloudN_workflow_media/secure_edge_ova_deploy_options.png
   :scale: 80%
   
.. |secure_edge_edit_settings| image:: CloudN_workflow_media/secure_edge_edit_settings.png
   :scale: 50%
   
.. |secure_edge_ova_load_file| image:: CloudN_workflow_media/secure_edge_ova_load_file.png
   :scale: 80%

.. |edge-active-standby| image:: CloudN_workflow_media/edge-active-standby.png
   :scale: 50%

.. |edge-attach-spoke-to-transit| image:: CloudN_workflow_media/edge-attach-spoke-to-transit.png
   :scale: 50%

.. |edge-connect-external-device| image:: CloudN_workflow_media/edge-connect-external-device.png
   :scale: 50%

.. |edge-deploy-ova-template| image:: CloudN_workflow_media/edge-deploy-ova-template.png
   :scale: 50%

.. |edge-deploy-workflow| image:: CloudN_workflow_media/edge-deploy-workflow.png
   :scale: 50%

.. |edge-ip-config| image:: CloudN_workflow_media/edge-ip-config.png
   :scale: 50%

.. |edge-launch-spoke-gateway| image:: CloudN_workflow_media/edge-launch-spoke-gateway.png
   :scale: 50%

.. |edge-multiple-transit-redundant| image:: CloudN_workflow_media/edge-multiple-transit-redundant.png
   :scale: 50%

.. |edge-multiple-transit-single-edge| image:: CloudN_workflow_media/edge-multiple-transit-single-edge.png
   :scale: 50%

.. |edge-network-connectivity| image:: CloudN_workflow_media/edge-network-connectivity.png
   :scale: 50%

.. |edge-network-port-protocol| image:: CloudN_workflow_media/edge-network-port-protocol.png
   :scale: 50%

.. |edge-rbac| image:: CloudN_workflow_media/edge-rbac.png
   :scale: 50%

.. |edge-transitive-routing| image:: CloudN_workflow_media/edge-transitive-routing.png
   :scale: 50%	

.. |edge-transit-peering| image:: CloudN_workflow_media/edge-transit-peering.png
   :scale: 50%

.. |edge-transit-peering-config| image:: CloudN_workflow_media/edge-transit-peering-config.png
   :scale: 50%

.. |edge-verify| image:: CloudN_workflow_media/edge-verify.png
   :scale: 50%


