.. meta::
   :description: [TODO]
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, peering, encrypted peering, transitive peering, encrypted transitive, aviatrix


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

1. Establish a site2cloud connection between Transitive Cloud VPC and On-Prem.

   a. Create a gateway in a Cloud VPC [i.e. 10.10.0.0/24] where you like to connect to sites.
   
      Go to Gateway -> New Gateway. The gateway may have VPN Access disabled.
   
   b. (Optional) Create a secondary gateway in the same VPC for HA.
      
      Go to Gateway -> New Gateway. The gateway may have VPN access disabled.

   c. Create a connection to a remote site

      Go to site2Cloud -> Add New, make sure,

      Select the VPC/VNet Name where Aviatrix gateway for encryption is launched.

      I. If HA is not enabled:

         - At Gateway field, select a gateway launched in the earlier step.

      #. Else if HA is enabled:

         - At Primary Gateway field, select a gateway launched earlier as primary gateway.

         - At Backup Gateway field, select a gateway launched earlier as backup gateway.

   #. Input the connection with a unique name, for example, NewYork-site.

   #. At Remote Gateway Type, 

      I. select "AWS VGW" if the remote site is a VPC with AWS VGW VPN gateway; 
      #. select "Aviatrix" if the remote site is on-prem Aviatrix gateway; 
      #. select "Generic" if the remote site gateway is a third party router or firewall. 

   #. At Remote Gateway IP Address, enter the public IP address of the edge router for the remote site. 
      Note if the Remote Gateway Type is Aviatrix, the Remote Gateway IP address is the public IP address of the site. 

   #. At Remote Subnet, enter network CIDR of the remote/customer site. 
      For example, you may enter “192.168.0.0/16".

   #. Pre-shared Key is an optional field. If you leave it blank, Aviatrix will auto generate a pre-shared key. You can paste your own pre-shared key if you prefer. 

   #. Do not select Private Route Encryption. (This feature is for
      overlay encryption on an AWS Direct Connect or Azure Express Route)

   #. The Local Subnets are advertised to Remote Subnets that the site2cloud connection can reach.
      For example, you may enter “10.10.0.0/16".

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

2. Establish an Encrypted Peering between Cloud VPC and Transitive Cloud VPC.
   
   a. At Gateway menu, create a gateway in an existing Cloud VPC/VNet. 
      For example, 10.10.1.0/24.

   #. Repeat the step 1 for a different Cloud VPC/VNet. 
      For example, 10.10.2.0/24, 10.10.3.0/24.

   #. Select "Enable HA" if you wish to build a backup encrypted tunnel for HA. Note that you must first create two respective backup gateways prior to this step. To launch backup gateways, go to Gateway page, select the gateway, click Edit, At "Gateway for High Availability Peering" field, select one public subnet and click Create. 

   #. At Peering -> Encrypted Peering, click New Peering to peer the gateway on Cloud VPC and the one on Transitive Cloud VPC.
      For example:
 
      I. Aviatrix GW #1 and Aviatrix GW #0
      #. Aviatrix GW #2 and Aviatrix GW #0
      #. Aviatrix GW #3 and Aviatrix GW #0

   #. Note "Over AWS Peering" field currently only works when used in conjunction to transitive peering. When this field is selected, the controller does not program the AWS routing table to points peer VPC CIDR routes to the gateway. 

3. Establish an Encrypted Transitive Peering through Cloud VPC, Transitive Cloud VPC and On-Prem.

   a. Create an encrypted transitive peering

      Go to Peering -> Transitive Peering -> New Peering, make sure:
      
      I. At Source VPC drop down menu, select the peering gateway launched in Cloud VPC.
         For example, Aviatrix GW #1, Aviatrix GW #2 or Aviatrix GW #3
      
      #. At Next Hop VPC drop down menu, select the gateway launched in Transitive Cloud VPC.
         For example, Aviatrix GW #0
      
      #. At Destination CIDR, fill in the destination CIDR of the co-location.
         For example, 192.168.0.0/16. Note this address should be unique across your network.

   b. Repeat the above step for more co-locations.


Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.

.. |image0| image:: site2cloud_media/image1.png
   :width: 5.03147in
   :height: 2.57917in

.. disqus::
