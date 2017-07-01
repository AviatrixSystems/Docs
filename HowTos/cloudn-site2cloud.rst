.. meta::
   :description: CloudN for Site 2 Cloud
   :keywords: Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel


==============================
CloudN for Site2coud 
==============================

CloudN can be deployed on-prem as a virtual router. 
This guide helps you to configure Site2Cloud IPSEC tunnels on CloudN that connects to an Aviatrix Gateway in AWS VPC, Azure VNet, Google Cloud VPC. 
(CloudN can also connects to any third party router or 
firewall for IPSEC tunnel.)    

|image8|


Configuration Workflow
======================

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

The Site2Cloud on CloudN configuration workflow is very simple.  

1. If the remote cloud gateway is an Aviatrix gateway, you should already have
   a configuration text file for this connection. If you need help to get this 
   file, check out `this link. <http://docs.aviatrix.com/HowTos/site2cloud.html>`_ 

     a. Click Site2Cloud on the left navigation panel, click +Add New. 
     #. Click Import (located at the right corner of the screen)
     #. Click OK. You are done. 
     #. Refresh the screen, the tunnel should be up. 
     #. Add a static route on the default gateway where CloudN is deployed to point to CloudN as the next hop to reach the remote site. 

#. If the remote side is NOT an Aviatrix gateway:

     a. Click Site2Cloud -> +Add New
     #. Enter Connection Name. For example: store1-to-cloud
     #. At Remote Gateway IP Address, fill the public IP address of the 
        remote gateway. For example, 54.12.1.4
     #. Enter Pre-shared Key.
     #. Enter Remote Subnet CIDR blocks. For example, 10.2.2.0/24
     #. Enter Local Subnet CIDR blocks. For example, 192.168.1.0/24
     #. Click OK. 
     #. Add a static route on the default gateway where CloudN is deployed to to point to CloudN as teh next hop to reach the remote site. 



Troubleshooting
===============

To check a tunnel state, go to Site2Cloud, the tunnel status will be
displayed in a pop up window.

To troubleshoot a tunnel state, go to Site2Cloud -> Diagnostics.

.. |image8| image:: site2cloud_media/image009.png
   :width: 5.08365in
   :height: 3.25278in


.. disqus::
