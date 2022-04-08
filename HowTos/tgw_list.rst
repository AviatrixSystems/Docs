network domain.. meta::
  :description: TGW List
  :keywords: AWS Transit Gateway, Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, TGW Build


=========================================================
TGW List
=========================================================

<<<<<<< Updated upstream
Clicking **List** under TGW Orchestrator List in the left menu provides options for working with your list of Transit Gateway attachments and TGW network domains. It also allows you to make modular changes on attachments and network domains. 
=======
TGW List page provides the list of TGW Attachments and TGW network domains. It also allows you to make modular changes on attachments and network domains. 
>>>>>>> Stashed changes

For background information, refer to the `TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

Before anything displays in the list, you must have completed some tasks on the `TGW Orchestrator Build <https://docs.aviatrix.com/HowTos/tgw_build.html>`_ page. 

TGW
------

The TGW tab on the List page shows the TGWs created by the Controller. 

TGW lists also allows you to select a FireNet Inspection Mode. 

TGW Attachments
-------------------------------------------

Showing Details
~~~~~~~~~~~~~~~

You use the Attachments tab on the List page to display routing details of TGW attachments, Spoke VPCs, or TGW VPN/DXGWs. 
The routing details include the Spoke VPC's VPC route table entries, its attached TGW route table entries and Edge 
Domain VPC route table entries, and its TGW route tables entries. The visibility helps to verify the correctness
of route entries.   

To view, on the TGW Orchestrator > List page, open the  Attachments tab. Select the attachment, and click **Actions > Show Details**. 

Showing Attachment Reachability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Show Attachment Reachability displays the selected attachment's connectivity configuration graphically. 


Auditing Routes
~~~~~~~~~~~~~~

Audit Routes verify route correctness by scanning the attachment's VPC route table, its attached TGW route table 
and connected TGW route tables. Use this to detect missing routes deleted by mistake or through programming 
errors.  

Updating VPC CIDR
~~~~~~~~~~~~~~~~~

If a new Spoke VPC CIDR is added/deleted or a new VPC route is added/deleted, clicking this option updates VPC 
attachments without having to detach the VPC first. 

Update VPC CIDR automatically makes routing adjustment when there is VPC CIDR change, for example, a new VPC CIDR has 
been added to the VPC. It also makes routing adjustment when a new route table is added or deleted. 

To configure, go to TGW Orchestrator > List > TGW Attachment. Select the attachment, click **Actions** > **Update VPC CIDR**.


Editing Spoke VPC Customized Routes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, RFC 1918 summarized routes and learned non-RFC 1918 specific routes are dynamically programmed into
each Spoke VPC's VPC route table. This feature allows you to statically program specific routes whose 
target is TGW. 

.. Note::

 When Edit Spoke VPC Customized Routes is enabled, all dynamically learned routes by the Spoke VPC are not programmed into the Spoke VPC route tables.  

To configure, go to TGW Orchestrator > List > TGW Attachment. Select the attachment, click **Actions** > **Edit Spoke VPC Customized Routes**. Enter a list of network CIDRs separated by comma. 


Editing Spoke VPC Advertised Routes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, Spoke VPC advertises its VPC CIDR to TGW route table. This feature allows you to advertise different network CIDRs. 

There are environments where all Spoke VPCs have one identical CIDR, attaching these Spoke VPCs to a TGW will result in error. 
For example, Spoke VPC CIDR is 10.10.0.0/16, 100.100.0.0/16 where 100.100.0.0/16 is common across all Spoke VPCs. 
By using this feature, the Spoke VPC only advertises 10.10.0.0/16.  

To configure, go to TGW Orchestrator > List > TGW Attachment. Select the attachment, click Actives > Customize Spoke VPC Advertised Routes. Enter a list of network CIDRs separated by comma. 

Editing Spoke VPC Local Route Propagation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This feature changes an attached Spoke VPC local route propagation attribute without detaching the VPC. 

To configure, go to TGW Orchestrator > List > TGW Attachment. Select one attachment, click **Actions** > **Edit Spoke VPC** Local Route Propagation. 

Switching Network Domain
~~~~~~~~~~~~~~~~~~~~~~~~~

This feature allows you to switch a Spoke VPC's network domains without having to detach the Spoke VPC first. 

<<<<<<< Updated upstream
To configure, go to **TGW Orchestrator > List > Attachments**. Select an attachment, and click **Actions > Switch Network Domain**. In the dropdown menu, select the desired network domain and click **Update**. 
=======
To configure, go to TGW Orchestrator > List > TGW Attachment. Select one attachment, click **Actions** > **Switch Network Domain**. In the dropdown menu, select the desired network domain, and click **Update**. 
>>>>>>> Stashed changes

FireNet Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To allow access to the private IP of the MGMT interface of the Firewalls, enable Management Access From Onprem. This feature advertises the Firewalls private MGMT subnet to your Edge domain. This allows administrators and Firewall MGMT servers to connect to the Firewall without having to go over the internet.

To enable, navigate to **TGW Orchestrator > List** and highlight the FireNet VPC.  Then choose **Actions** > **FireNet Management**.

TGW Network Domains
------------------------------

Showing Details
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Select a network domain and click **Actions > Show Details** to display the TGW route table entries. 

Editing Intra Domain Inspection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

By default, traffic between VPCs in the same network domain does not get inspected by firewalls in the FireNet deployment. 
<<<<<<< Updated upstream

This feature allows you to enable firewall inspection for traffic within network domain. 

Select a network domain and click **Actions > Enable Intra Domain Inspection** to enable intra-domain firewall inspection.

=======

This feature allows you to enable firewall inspection for traffic within one network domain. 
>>>>>>> Stashed changes

Enabling Edge Inspection
~~~~~~~~~~~~~~~~~~~~~~~~

This option applies to connection-based inspection mode. When connection-based inspection is enabled, use this option to enable Egress
inspection for a specific domain. 

Select a network domain and click **Actions > Enable Egress Inspection** to enable egress inspection.


TGW Connection
-----------------------

The **TGW Orchestrator > List > Connection** page lists all Connection Policies. Each Connection Policy is represented by two rows. 
Each row represents one Connection Policy in one direction. 

Enabling Inspection
~~~~~~~~~~~~~~~~~~~

This configuration is to specify an inspection rule for connection-based mode. 

Select one Connection Policy row by clicking on the row. Then click **Actions** > **Enable Inspection**. In the popup dropdown menu, select the 
firewall domain to associate. Click **Update**. The reverse direction is automatically configured. 

Disabling Inspection
~~~~~~~~~~~~~~~~~~~

This configuration is to disable an inspection rule for connection-based mode. Disable Inspection is only available for an inspection rule
if it is already enabled. 

Select one Connection Policy row by clicking on the row. Then click **Actions** > **Disable Inspection**. In the popup dropdown menu, select the
firewall domain to disassociate. Click **Update**. The reverse direction is automatically configured.




.. |firewall_launch| image:: tgw_list_media/firewall_launch.png
   :scale: 30%

.. disqus::
