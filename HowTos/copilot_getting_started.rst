.. meta::
  :description: Aviatrix Getting Started
  :keywords: CoPilot,visibility


============================================================
Aviatrix CoPilot Deployment Guide
============================================================


Launch CoPilot
==================

CoPilot is available as an all-in-one virtual appliance that's hosted in users' own IaaS cloud environment. 
It can be launched as an EC2 instance in AWS, or virtual machine in Azure. Please make sure default configurations for resources settings that are recommended by marketplaces are applied during launch.
After successfully launching the instance, follow this steps to configure CoPilot instance parameters and launch. 
Please note that you will need an Aviatrix Controller to use CoPilot. CoPilot is not a separate product.


Instance Configuration Details
------------------------------

- Configure your copilot security group as shown below to allow the following: 

  - 443 from anywhere user access (User Interface)

  - UDP port 31283 from 0.0.0.0/0 or specific gateway IPs 

.. tip::
  If security requirement dictates that security groups not be open to 0.0.0.0/0, you can program the security group to open this UDP port to aviatrix gateway EIPs. You can leverage controllers security group management to copy the IP addresses of the gateways 

 

Configure controllers access for CoPilot
=============================================

- Assign a static public IP address to CoPilot. For example, in EC2 console, you go to Elastic IP section and assign an EIP to copilot instance 

- On controller security groups, ensure 443 is open to public IP  of CoPilot instance

- Configure a dedicate user account on aviatrix controller for copilot 

- You should now be able to login to CoPilot with the credentials we configured above

.. note::
  If you are using RBAC, as of 1.1.5 Copilot requires read-only access + access to ping and traceroute functions for diagnositc capabilities 


Enable FlowIQ
=================

- Login to Aviatrix controller 

- Go to Settings -> Loggings -> NetFlow Logging

- Use the EIP of copilot as the server and UDP port 31283 (default) 

 
Deployment is complete. At this point your Copilot is setup and ready to use. You should start seeing NetFlow in less than 5 minutes. Note that when you launch CoPilot at first your version number will be the based on the version in the image. Within an hour, Copilot version will be updated. 

System Design Considerations 
==================================
- For production, it is best practice to inspect your gateways sizing and load prior to enabling flow logging. 
- You have the option of selecting which gateways generate flows should you want to enable visibility in subsections of the network.
