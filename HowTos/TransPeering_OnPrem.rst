.. meta::
   :description: 
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel


==============================
[TODO NAME]
==============================



The Problem
===========



Solution: Bring Application to User
====================================



Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

The [TODO NAME] configuration workflow is as follows, with major steps
highlighted.

1. Establish a site2cloud connection between Cloud and On-Premise.

   a. Create a gateway in a VPC where you like to connect to sites

     Go to Gateway -> New Gateway. The gateway may have VPN Access disabled.
   
   b. (Optional) Create a secondary gateway in the same VPC for HA.

     Go to Gateway -> New Gateway. The gateway may have VPN access disabled.

   c. Create a connection to a remote site

      Go to site2Cloud -> Add New, make sure,

      I. Select the VPC/VNet Name where Aviatrix gateway for encryption is launched.

      #. If HA is not enabled:

         i. At Gateway field, select a gateway launched in the earlier step.

      #. Else if HA is enabled:

         i.  At Primary Gateway field, select a gateway launched earlier as primary gateway.

         ii. At Backup Gateway field, select a gateway launched earlier as backup gateway.

   #. Input the connection with a unique name, for example,
      NewYork-site.

   #. at Remote Gateway Type, 

      i. select "AWS VGW" if the remote site is a VPC with AWS VGW VPN gateway; 
      ii. select "Aviatrix" if the remote site is on-prem Aviatrix gateway; 
      iii. select "Generic" if the remote site gateway is a third party router or firewall. 

   #. At Remote Gateway IP Address, enter the public IP address of the edge router for the remote site. 
      Note if the Remote Gateway Type is Aviatrix, the Remote Gateway IP address is the public IP address of the site. 

   #. At Remote Subnet, enter network CIDR of the remote/customer site. 
      For example, you may enter “192.168.0.0/16.

   #. Pre-shared Key is an optional field. If you leave it blank, Aviatrix will auto generate a pre-shared key. You can paste your own pre-shared key if you prefer. 

   #. Do not select Private Route Encryption. (This feature is for
      overlay encryption on an AWS Direct Connect or Azure Express Route)

   #. The Local Subnets are advertised to Remote Subnets that the site2cloud connection can reach.
      For example, you may enter “10.10.0.0/16.

   #. Algorithms field is pre-populated with default values. Click the field if you need to customize the algorithms. 

   #. Click OK to create a connection. 

   #. Generate remote site configuration template

      Go to site2Cloud

      I. Select the connection you just created, an EDIT panel will appear.

      #. Click Download Configuration.

      #. If your remote site device is not listed in the dropdown menu, simply select an available one on the menu.

      #. Click “Yes, Download” to download a template file that contains the gateway public IP address, VPC CIDR, pre-shared 
         secret and encryption algorithm. Incorporate the information to your remote router/firewall configuration. If the 
         remote gateway is a Aviatrix CloudN, go to site2cloud and simply import the downloaded configuration file and click 
         OK. 

Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.

.. |image0| image:: site2cloud_media/image1.png
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
