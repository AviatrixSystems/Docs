.. meta::
   :description: Secure Edge Deployment
   :keywords: Edge, Edge Gateway, EaaG, Edge ZTP


=========================
Deploying an Edge Gateway
=========================

This document provides instructions for setting up an Edge Gateway in VMware ESXi.

For information about Edge Gateway and the deployment requirements, refer to `Secure Edge FAQ <http://docs.aviatrix.com/HowTos/secure_edge_faq.html>`_.

To deploy an Edge Gateway, perform these steps.

#. `Configure an Edge Gateway in VMware ESXi <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#configuring-an-edge-gateway-in-vmware-esxi>`_.

#. `Launch the Edge Gateway in Aviatrix Controller <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#launching-an-edge-gateway-in-aviatrix-controller>`_.

#. `Attach the ISO image to the Edge Virtual Machine <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#attaching-the-iso-image-to-the-edge-virtual-machine>`_.

#. `Attach the Edge Gateway to the Transit Gateway <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html#attaching-an-edge-gateway-to-a-transit-gateway>`_.


Configuring an Edge Gateway in VMware ESXi
------------------------------------------

To configure an Edge Gateway in VMware ESX, follow these steps.

#. Download the ESXi OVA file from Aviatrix Support: `<https://support.aviatrix.com/downloads>`_.
   Use your login credentials to view the support download section or contact your Aviatrix account team.
#. In your browser, use your vCenter server IP address and one of the following URLs to log in to your VMware vSphere Web Client. In your Web browser, enter one of the following URLs to log in to your VMware vSphere Web Client.

   - https://vcenter_server_ip_address_or_fqdn/vsphere-client
   - https://vcenter_server_ip_address_or_fqdn:9443

#. To load OVA into the ESXi using vSphere, go to: ESXI > Virtual Machines > Create/Register VM.
#. Select Deploy a virtual machine from an OVF or OVA file. Click **Next**.
#. Enter a name for the Edge VM and drag the OVA file into the blue pane. Click **Next**.

   |image|

#. Select the storage device for the instance you created (the OVA is installed in this instance). Click **Next**.
#. In the Deployment options window, enter the network interface mappings and select the Deployment type. Refer to the pull-down menu or see `CPU and Memory Configuration <http://docs.aviatrix.com/HowTos/secure_edge_faq.html#cpu-and-memory-configurations>`_.

   |image|

#. Click **Next**.
#. In the Ready to complete window, click **Finish**.

Launching an Edge Gateway in Aviatrix Controller
------------------------------------------------

#. Log in to Aviatrix Controller 6.7.
#. Go to **CLOUDN** > **Setup**.
#. In the Launch an Edge Gateway page, enter the following Edge name and IP information as needed:

   a. Cloud Type is always set to **Aviatrix**. 
   b. In Gateway Name, enter a name for the new Edge Gateway.
   c. For ZTP File Type, select **ISO**.

      .. note::
         The ISO file is the equivalent of the Zero-Touch Provisioning (ZTP) token. ZTP allows network engineers to remotely deploy and provision network devices at remote locations.

   d. For Management Connection Type, select DHCP or Static, depending on your environment. 
   e. IP and DNS Settings: Enter using the applicable format. For example, if the Edge GW's WAN IP is 10.1.1.151, enter 10.1.1.151/24 or whatever your netmask is. 
   f. For Management Interface IP, enter the management interface IP for the Edge VM.
   g. For Default Gateway IP, enter the IP address of the Default Gateway in the Management Subnet.
   h. For Primary DNS Server, enter the DNS server for the Edge VM.
   i. For Secondary DNS server, enter the DNS server for the Edge VM.
   j. Check **Over Private Network** if the Edge    management connection is over AWS Direct Connect (DX) or Azure ExpressRoute (ER). Leave unchecked if the connection is over the public internet.
   k. For Management Egress IP, enter the IP address  of the Edge    VM visible to the controller (this IP is optional and can be added later).
   l. For WAN interface IP/ Mask, enter the interface IP/mask for the Edge VM.
   m. For WAN Default Gateway, enter the WAN … for the Edge VM.
   n. For LAN interface IP / Mask, enter… for the Edge VM. 

      The image below shows the Launch an Edge Gateway configuration when you do not select Over Private Network.

      |image|

      In the image below, the Over Private Network check box is selected.

      |image|

#. Click **Create**. Aviatrix Controller prompts you to download the ISO file.

Attaching the ISO Image to the Edge Virtual Machine
---------------------------------------------------

.. note::
   * The ZTP ISO file can only be used for a single Edge VM instance, and only one time for that instance. 
   * The ZTP token expires after about 24 hours. If you wait too long to boot up the VM with the attached ISO image, it will not work.  In that case, delete the Edge in the Controller UI and create a brand-new Edge to receive a new ISO file.

#. Upload the ISO file you downloaded from Aviatrix Controller to your VMware datastore.
#. In vSphere, select the Edge VM you created and click **Edit settings**.
#. Select the **Virtual Hardware** tab.
#. To load the ISO to the virtual CD drive, next to Status, check **Connect at power on**. 
#. Next to CD/DVD Drive 1, click the down arrow and select **Datastore ISO file** from the pull-down menu.
#. Next to the CD/DVD Media field, click **Browse**. Select the ISO file you downloaded.

   |image|

#. Click **Save**.
#. Reboot the Edge VM.

Access Requirements
-------------------

The following access needs to be permitted from the Edge Gateway: 

- TCP 443 access to the Aviatrix Controller’s public IP address 
- TCP 443 access to the Aviatrix Controller’s private IP address (only if you selected Over Private Network for management IP connectivity) 
- UPD 500/4500 access for the Transit Gateway’s public IP address

Attaching an Edge Gateway to a Transit Gateway
----------------------------------------------

Follow these steps:

#. In Aviatrix Controller, go to **CLOUDN** > **List**.
#. In Registered Devices, locate the Edge VM you created. Confirm the Edge VM was successfully registered. If the registration was successful, the status in the State column will show registered.

   |image|

   |image|

#. To attach the Edge Gateway to the Transit Gateway, go to **Controller** > **CLOUDN** > **Attach**.
#. In step 2, Attach Device to Cloud, complete the following fields:  

   .. note::
      If you are connecting over a public network, WAN discovery is currently mandatory.

   a. For Device Name, select the registered Edge Gateway.
   b. For Aviatrix Transit Gateway, select the transit gateway you want the Edge Gateway to connect to.
   c. For Connection name, enter the name of this connection.
   d. For Aviatrix Transit Gateway BGP ASN, enter the ASN for your transit gateway.
   e. For Device’s BGP ASN, enter the ASN for your Edge Gateway.
   f. For Device’s LAN Interface Neighbor’s IP, enter the Neighbor’s LAN Interface IP.
   g. For Device’s LAN Interface Neighbor’s BGP ASN, enter the Neighbor’s LAN interface BGP ASN.
   h. For Over Private Network, leave the box unchecked if you are building the tunnel over the public internet
      
      |image|

#. Click **Attach**.
#. Navigate back to **CLOUDN** > **List**. Once the tunnel is successfully built, the Edge GW status in the State column changes from registered to attached. 
   


.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. |interVNET_transit_peering| image:: transit_firenet_workflow_media/transit_subnet_inspection_azure_media/interVNET_transit_peering.png
   :scale: 40%

.. disqus::
