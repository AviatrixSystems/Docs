.. meta::
   :description: Site 2 Cloud
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel


==============================
Site to Cloud VPN Instructions
==============================

Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

The Site to Cloud VPN (or Site2Cloud for short) configuration workflow is as 
follows, with major steps highlighted.


::

 1. Create a gateway in a VPC where you like to connect to sites.

   Go to Gateway -> New Gateway. The gateway may have VPN Access
   disabled.

 2. (Optional) Create a secondary gateway in the same VPC for HA.

   Go to Gateway -> New Gateway. The gateway may have VPN access
   disabled.

 3. Create a connection to a remote site

   Go to site2Cloud -> Add New, make sure,

   a. Select the VPC/VNet Name where Aviatrix gateway for encryption is
      launched.

   b. If HA is not enabled:

      i. At Gateway field, select a gateway launched in the earlier
         step.

   c. Else if HA is enabled:

      i.  At Primary Gateway field, select a gateway launched earlier as
          primary gateway.

      ii. At Backup Gateway field, select a gateway launched earlier as
          backup gateway.

   d. Input the connection with a unique name, for example,
      NewYork-site.

   e. at Remote Gateway Type, select "AWS VGW" if the remote site is a VPC with AWS VGW VPN gateway; select "Aviatrix" if the remote site is on-prem Aviatrix gateway; select "Generic" if the remote site gateway is a third party router or firewall. 

   f. At Remote Gateway IP Address, enter the public IP address of the
      edge router for the remote site. Note if the Remote Gateway Type is Aviatrix, the Remote Gateway IP address is the public IP address of the site. 

   g. At Remote Subnet, enter network CIDR of the remote/customer site. If
      there are multiple subnets, enter each one separated with comma.
      For example, you may enter “192.168.1.0/24,192.168.2.0/24” without
      the quote.

   h. Pre-shared Key is an optional field. If you leave it blank, Aviatrix will auto generate a pre-shared key. You can paste your own pre-shared key if you prefer. 

   i. Do not select Private Route Encryption. (This feature is for
      overlay encryption on a AWS Direct Connect or Azure Express Route)

   j. If you leave Local Subnet blank, Local Subnet will be the VPC/VNet CIDR. You can add more Local Subnet CIDR blocks, separate by comma. Make sure you include the VPC/VNet as well. These Local Subnets are advertised to Remote Subnets that the site2cloud connection can reach. You can change this settings later. 

   k. Algorithms field is prepopulated with default values. Click the field if you need to customize the algorithms. 

 4. Click OK to create a connection. 

 5. Generate remote site configuration template

   Go to site2Cloud

   a. Select the connection you just created, a EDIT panel will appear.

   b. Click Download Configuration.

   c. If your remote site device is not listed in the dropdown menu,
      simply select an available one in the menu.

   d. Click “Yes, Download” to download a template file that contains
      the gateway public IP address, VPC CIDR, pre-shared secret and
      encryption algorithm. Incorporate the information to your remote
      router/firewall configuration. If the remote gateway is a Aviatrix CloudN, go to site2cloud and simply import the downloaded configuration file and click OK. 

Network Device Support
======================

Aviatrix site2cloud supports all types of on-prem firewall and router devices that 
terminate VPN connection. Below are configuration examples to specific devices. 

    - `pfSense IPsec VPN <CloudToPfSense.html>`__
    - `Palo Alto Next-Gen Firewall (PAN) <http://docs.aviatrix.com/HowTos/S2C_GW_PAN.html>`_
    - `Check Point Firewall <http://docs.aviatrix.com/HowTos/S2C_GW_CP.html>`_
    - `Cisco ASA <http://docs.aviatrix.com/HowTos/S2C_GW_ASA.html>`_


Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.

.. |image0| image:: site2cloud_media/image1.png
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
