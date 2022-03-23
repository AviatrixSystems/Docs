.. meta::
  :description: Global Transit Network
  :keywords: Transit Network, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, Insane mode, Transit Gateway, TGW


===============================================
Standalone CloudN Deployment Checklist
===============================================

When Insane Mode is applied to improve encryption performance between on-prem and cloud, you need to deploy the Aviatrix hardware appliance CloudN. Making this use case work requires edge router configurations. This document lists the checklist you should follow in successfully deploying Insane Mode for hybrid connection. 

CloudN Insane Mode can be applied to hybrid connection by AWS Direct Connect or Azure Express Route. CloudN can also be applied to hybrid connection by Internet.

One CloudN supports `multiple Transit Gateway connections. <https://docs.aviatrix.com/HowTos/insane_mode.html#can-one-cloudn-appliance-connect-to-multiple-connections-of-direct-connect-or-express-route>`_

Starting in Release 6.2, Managed CloudN is the supported deployment model where CloudN configuration and operations are managed by the Controller. 

1. Understand deployment architecture, or how routing works in this use case.
2. Connection over AWS Direct Connect or Azure Express Route: if you use AWS Direct Connect or Azure Express Route to connect to your data center, the deployment architecture is 
demonstrated in the diagram below. The diagram uses AWS Direct Connect for illustration purposes, but the architecture applies to Azure Express Route. 

|insane_mode_howto_dx| 

The key ideas for this AWS scenario are:

 -  The edge (WAN) router runs a BGP session to VGW (AWS) where the edge router advertises a CloudN WAN subnet network and the VGW advertises the Transit VPC CIDR.
 -  CloudN LAN interface runs a BGP session to the edge router where the edge router advertises on-prem network address range to CloudN LAN interface.
 -  CloudN WAN interface runs a BGP session to Aviatrix Transit Gateway in the Transit VPC where Aviatrix Transit Gateway advertises all Spoke VPC CIDRs to CloudN and CloudN advertises on-prem network to the Aviatrix Transit Gateway. 

Following are a few common deployment architectures. 

Single Aviatrix CloudN Appliance 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment|

And the sample configuration on an ISR is as follows.

|ISR-sample-config|

Aviatrix CloudN Appliance with HA
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment_ha|

Redundant DX Deployment (Active/Standby)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
In this deployment model, Direct Connects and ExpressRoutes are being used in a Active/Standby mode. The Preferred path is indicated on the image.

.. note::
    The firewalls on the left side of the picture cannot handle asymmetric traffic, which may be the reason for having Direct Connect as Active/Standby.

|deployment_dual_dx|

Redundant DX Deployment (Active/Active)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
In this deployment model, Direct Connects/Express Routes are Active / Active. One of the requirements would be for the firewall to handle asymmetric routing.

|deployment_dual_dx_aa|

Step 1.2 Connection over Internet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you use high speed Internet to connect to a data center, the deployment architecture is described as below. 


|insane_mode_howto_internet| 

Key ideas are listed below:

  - CloudN LAN and WAN interfaces do not use public IP addresses. It relies on edge router or Firewall NAT function and Internet connectivity. 
  -  CloudN LAN interface runs a BGP session to the edge router where the edge router advertises on-prem network address range to CloudN LAN interface.
  -  CloudN WAN interface runs a BGP session to Aviatrix Transit Gateway in the Transit VPC/VNet where Aviatrix Transit Gateway advertises all Spoke VPC/VNet CIDRs to CloudN and CloudN advertises on-prem network to the Aviatrix Transit Gateway.

Example deployment diagram
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

|deployment_internet|

  

Step 2. Pre-deployment Request Form 
------------------------------------

After you understand the deployment architecture and decide to move forward for this deployment, the next step is to fill out the `CloudN
Appliance Request Form. <https://s3-us-west-2.amazonaws.com/aviatrix-download/InsaneMode_CloudN_Prep.docx>`_   

The Aviatrix support team configures a CloudN appliance based on your input in the Request Form, then 
ships the appliance.  Deployment topology for Aviatrix CloudN is as follows:

|InsaneBeta|

The key information in the Request Form that you must fill are explained below. 

=====================  ==================  ===========  ===============  ===============  ==================  =====================  =============================================================
CloudN Interface       Private IP Address  Subnet Mask  Default Gateway  MTU Size         Primary DNS Server  Secondary DNS Server   Note
=====================  ==================  ===========  ===============  ===============  ==================  =====================  =============================================================
1- WAN                                                                                    Not Required        Not Required           WAN port that connects edge router
2- LAN                                                  Not Required                      Not Required        Not Required           LAN port that connects edge router
3- MGMT                                                                  Not Required                                                Management port for CloudN configuration and software upgrade
4- HPE iLO                                                               Not Required     Not Required        Not Required           HP Integrated Lights-Out
=====================  ==================  ===========  ===============  ===============  ==================  =====================  =============================================================


2.1 Internet Access
~~~~~~~~~~~~~~~~~~~~~~~~
A CloudN appliance does not require a public IP address, but the management port requires outbound internet access on the management port for software upgrade. Please see `Required Access for External Sites <https://aviatrix.zendesk.com/hc/en-us/articles/4417312119437-Aviatrix-Products-Access-to-external-FQDN-required>`_. 

.. note::
	You must be registered to access the Aviatrix Customer Support website. If you are not already registered, you can sign-up at https://support.aviatrix.com.

2.2 BGP Requirement
~~~~~~~~~~~~~~~~~~~~~~~
BGP is required between the LAN port of the appliance and the on-prem router for route propagation.

Step 3. Deployment Checklist
-----------------------------------

3.1 Before Powering Up CloudN
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Before powering up CloudN, make sure: 
 
 a. The CloudN WAN cable, LAN cable and Management cable are properly plugged in to ASR and switches.
 #. Check the interface of ASR to CloudN WAN interface, make sure Proxy ARP is enabled (ip proxy-arp). 
 #. ASR DX (Direct Connect) or ExpressRoute interface should only advertise CloudN WAN interface subnet network to VGW.
 #. ASR LAN (Datacenter facing) interface does not advertise Transit VPC/VNet CIDR to datacenter.
 #. ASR to CloudN LAN interface advertises datacenter networks.
 #. The VGW is attached to the Transit VPC/VNet. 
 #. AWS Transit VPC/VNet Route Propagation is enabled. 
 #. If there is an edge firewall in front of the edge router, make sure the firewall opens UDP port 500 and UDP port 4500 for traffic from the CloudN WAN Interface. CloudN builds an IPsec tunnel between CloudN WAN interface and Aviatrix Transit Gateway. The BGP session between the two interfaces is inside the tunnel. 

3.2 Power up CloudN
~~~~~~~~~~~~~~~~~~~~~~~

After you power up CloudN, first test that the CloudN interfaces are alive and connected properly by doing the following tests.  

 a. From ASR, ping the CloudN LAN interface, WAN interface and Mgmt interface.
 #. CloudN mgmt interface can ping Internet (From CloudN cli console).

3.3 Upgrade CloudN to the Latest Software
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 a. Log in to the CloudN console. Open a browser console and type: https://CloudN_Mgmt_IP_Address.
 #. Log in with username "admin" and the password provided by your Aviatrix Support Representative (You can change the password later).
 #. Upgrade CloudN to the latest.

3.4 Configure NTP Sync and SMTP Services
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 a. Add a firewall rule to allow CloudN’s MGMT outbound UDP port 123 access to ntp.ubuntu.com or to a local NTP server.
 #. In the CloudN UI, go to Setting > Controller > System Time. Enter ntp.ubuntu.com or a local NTP server then select the Sync option.
 #. Do a manual sync to the NTP server.
 #. In the CloudN UI, go to Setting > Controller > Email. Setup the SMTP settings to allow CloudN to send alert emails.

3.5 Configure Insane Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the Controller in AWS, configure Transit Setup Step 3 to CloudN, make sure to select all the correct options.

.. 

 a. CloudN IP Address is the CloudN WAN IP address
 #. CloudN Neighbor IP Address is the ASR to the CloudN LAN interface IP address
 #. After configuration, download the configure file and import to CloudN.
 #. If there is HA, import to CloudN HA.

3.6 Troubleshooting Tips
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 a. Check on CloudN Console. Go to Site2Cloud, make sure the tunnel is up. 
 #. Check on CloudN Console, Go to Troubleshoot > Diagnostics > BGP, make sure the tunnel is up. Check BGP learned routes.
 #. Check on the Controller. Go to Transit Network > Advanced Config > BGP, make sure BGP is learning routes. Also check Diagnostics to execute BGP commands.
 #. Check on the Controller. Go to Controller > Site2Cloud and check the Site2Cloud and BGP status.
 

.. |tunnel_diagram| image:: insane_mode_media/tunnel_diagram.png
   :scale: 30%


.. |insane_tunnel_diagram| image:: insane_mode_media/insane_tunnel_diagram.png
   :scale: 30%

.. |insane_transit| image:: insane_mode_media/insane_transit.png
   :scale: 30%

.. |insane_datacenter| image:: insane_mode_media/insane_datacenter.png
   :scale: 30%

.. |datacenter_layout| image:: insane_mode_media/datacenter_layout.png
   :scale: 30%

.. |deployment| image:: insane_mode_media/deployment.png
   :scale: 30%

.. |deployment_ha| image:: insane_mode_media/deployment_ha.png
   :scale: 30%

.. |deployment_internet| image:: insane_mode_media/deployment_internet.png
   :scale: 30%

.. |deployment_dual_dx| image:: insane_mode_media/deployment_dual_dx.png
   :scale: 30%

.. |deployment_dual_dx_aa| image:: insane_mode_media/deployment_dual_dx_aa.png
   :scale: 30%
   
.. |ISR-sample-config| image:: insane_mode_media/ISR-sample-config.png
   :scale: 50%

.. |insane_routing| image:: insane_mode_media/insane_routing.png
   :scale: 30%

.. |insane_mode_howto_dx| image:: insane_mode_media/insane_mode_howto_dx.png
   :scale: 30%

.. |insane_mode_howto_internet| image:: insane_mode_media/insane_mode_howto_internet.png
   :scale: 30%

.. |InsaneBeta| image:: insane_mode_media/InsaneBeta.png
   :scale: 30%

.. disqus::
