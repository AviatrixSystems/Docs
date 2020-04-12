.. meta::
  :description: Aviatrix Getting Started
  :keywords: CoPilot,visibility


============================================================
Aviatrix CoPilot Deployment Guide
============================================================


Launch CoPilot
--------------
CoPilot is available as an all-in-one virtual appliance that's hosted in users' own IaaS cloud environment. 
It can be launched as an EC2 instance in AWS, or virtual machine in Azure. Please make sure default configurations for resources settings that are recommended by marketplaces are applied during launch.
After successfuly launching the instance, follow this steps to configure CoPilot instance parameters and launch. 



Instance Configuration Details
******************************

- Configure your copilot security group as shown below to allow the following: 

  - 443 from anywhere user access (User Interface)

  - UDP port 31283 from 0.0.0.0/0 or specific gateway IPs 

.. tip::
  If security requirement dictates that security groups not be open to 0.0.0.0/0, you can program the security group to open this UDP port to aviatrix gateway EIPs. You can leverage controllers security group management to copy the IP addresses of the gateways 

 

Configure CoPilot and Netflow 
-----------------------------

- In EC2 console go to Elastic IP and assign an EIP to copilot instance 

- Configure a dedicate user account on aviatrix controller for copilot 

.. note::
  As of 1.1.4 Copilot requires read-only access + access to ping and traceroute function for diagnositc capabilities 


Configure controller to send NetFlow records to copilot 
--------------------------------------------------------
- Login to Aviatrix controller 

- Go to Settings -> Loggings 

- Use the EIP of copilot as the server and UDP port 31283 (default) 

.. note::
  You have the option of selecting which gateways generate flows 
  
Deployment is complete. At this point your Copilot is setup and ready to use. You should start seeing NetFlow in less than 5 minutes. Note that when you launch CoPilot at first your version number will be the based on the version in the image. Within an hour, Copilot version will be updated. 

System Design Considerations 
----------------------------


If you are using AVX Transit Service, you might consider turning NetFlow on only in transit to avoid duplicating traffic. 