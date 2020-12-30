Use AWS Transit Gateway to Access Multiple VPCs in One Region
==============================================================

This reference guide will show how you can use an AWS Transit Gateway (TGW) to allow remote users to connect 
to multiple VPCs in the same region. Please see the overview image below for refernece. In this walkthtough, 
it is assumed you have created VPCs in your environment. If not, you can create and deploy VPCs directly from the 
Aviatrix Controller under the "useful tools" tab. Follow this link to learn more: `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_.

|vpn_with_tgw_one_region|

1. Create a TGW
-------------

The first step is to create a TGW from the Aviatrix Controller. 

    a. Log-In to the controller. 

   
    b. Navigate to the TGW Orchestrator tab on the left side of the screen and click "Plan".
    

    c. Next, select your cloud type. In this case it is AWS. Fill in the remaining information, name the TGW, and hit create.

|createTGW|

To learn more about Transit Gateway deployment follow this link:
 `AVX Transit for AWS FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html#next-gen-transit-for-aws-faq>`_


2. Create a Security Domain
----------------------------
In the same section under Step 2 titled "Segment your network" in the TGW Orchestrator is the "Create a Security Domain" step. 
Scroll down to see this step. For this design we will need to create three security domains:

    1. Shared Service Domain
    2. Dev Domain
    3. Prod Domain 

First select the AWS Transit Gateway Name you created in the previous step from the dropdown list. Next, name the first
Security Domain Name "Shared Service Domain" and hit "Create". Repeat this process for the other two domains.

|security_domain|

3. Build Connection Policies
-----------------------------
We now have created Security Domains, the next step is to use these domains to define the connection policies.

    1. First, make sure you select the AWS Transit Gateway Name created in Step 1. 
    2. Next, for "Security Domain Name" select Shared Services Domain. 
    3. Select the Dev domain from the Domain Connection Policy List under "Not Connected" and add it to the "Connected" list.
    4. Repeat this step for the Prod domain.

Now we have allowed both the Dev and Prod Domains to connect to the Shared Service Domain.     

|security_domains|

.. note:: You can call these domains anyname and use as many domains as needed. As seen in the image below Dev and Prod are simply called Domain 1 and Domain 2.

4. Attach VPCs to TGW
----------------------
The next step is to attach your existing VPCs to the Transit Gateway (TGW) created in Step 1. 

To perform this, navigate in the Aviatrix Controller to the "Build" section under the TGW Orchestrator tab.
In section 1 "Attach VPC to TGW" 

    a. Select the region of the TGW and your account
    
    b. Choose you Shared Servie VPC and TGW Name
    
    c. Select Shared Sevice Domain for the Security Domain Name 

    d. Click "Attach" 

|VPC_to_TGW|

5a. Launch a VPN Gateway
----------------------
Now that we have attached our VPCs to the TGW. We should create a VPN Gateway so users can access the instances in the VPCs.

    1. Navigate to to the Gateway tab on the Aviatrix Controller and click "New Gateway". 
    2. The cloud type is AWS and you can pick your own Gateway name. 
    3. Next pick the region we deployed in above and select the Shared Service VPC. 
    4. Choose to "Allocate New EIP" and of course select "VPN Access". 
    5. Lastly, hit "Create" 

A new VPN Gateway will be created in the Shared Service VPC.     

More detailed options for deploying an Aviatrix Gateway here: `Gateway Options <https://docs.aviatrix.com/HowTos/gateway.html>`_. 

|VPN_gateway|


5b. Configure VPN Gateway
--------------------------

Now, in order to segment the Development and Production VPCs we must enable Split Tunnel Mode on our VPN Gateway. 

    1. Under the OpenVPN® tab on the Aviatrix Controller click the "Edit Config" sub-menu. 
    2. In "VPC ID/VNet Name" select the Shared Service VPC we crerated earlier 
    3. Confirm the proper LB/Gateway Name is selected.
    4.In the "Modify Split Tunnel" section add the IPv4 CIDR ranges for the Dev and Prod VPCs.

|split_tunnel_CIDR|

These ranges can be found by logging-into the AWS console and navigating to the VPC section. An easier method, is to navigate to the 
"Useful Tools" tab and click on the "VPC Tracker" sub-menu. There you can view all the CIDR ranges for your VPCs. 
You will see your Prod and Dev VPCs there. 

|VPC_tracker|


6. Configure Aviatrix VPN Client
---------------------------------


The first step is to add a new VPN User. This can be found in the "OpenVPN®" tab under the sub-menu "VPN Users". Click the "Add New"
button and imput your inofrmation. For the VPC ID we want to use the Shared Service VPC ID. 

|add_VPN_user|

Next, download your OpenVPN® configuration file.

|download_config|



Now, we should download the latest Aviatrix VPN Client from the Docs page here: `Aviatrix VPN Client <https://docs.aviatrix.com/Downloads/samlclient.html>`_.

Once the client is installed, import your OpenVPN® configuration file to the Aviatrix VPN Client. Once the client is open 
click the "+" button and choose your .ovpn file. Once the configuration file is imported click connect. 

|avtx_VPN_client_setup|

Once, you are connected via the Aviatrix VPN Client.  We can test that everything has been correctly configured. 
First, we will need the Private IP address of the EC2 instancerunning in either Dev or Prod VPCs. These IPs can be found 
in the AWS Console page under the EC2 banner. 

|EC2_private_IP|

Now, we can open a terminal on our computer and see if we can ping the EC2 instance using its private IP address. If we are connected, 
to the Avitrix VPN Client, we should a response. As a check, we can disconnect from the Aviatrix VPN Client and we should see no response. 
See below for an example of a proper ping response. 

|ping_test|

7. Last Steps
---------------

One last option we can congigure is under Step 3 of this guide "Connection Policies". As a test, we can remove either the Dev or 
Prod Domain from the "Connected" list. If we remove Dev from the "Connected" list for the Shared Service Policy and run a Ping test. 
We should receive no response from the EC2 instance in the Devolpment VPC. 



OpenVPN is a registered trademark of OpenVPN Inc.

.. |vpn_with_tgw_one_region| image:: uservpn_TGW_media/userVPN_SD.png
   :scale: 30%
.. |createTGW| image:: uservpn_TGW_media/createTGW.png
   :width: 5.5in
   :height: 2.5in
.. |security_domain| image:: uservpn_TGW_media/security_domain.png
   :width: 5.5in
   :height: 2.5in
.. |security_domains| image:: uservpn_TGW_media/security_domains.png
   :width: 5.5in
   :height: 2.5in
.. |VPC_to_TGW| image:: uservpn_TGW_media/VPC_to_TGW.png
   :width: 5.5in
   :height: 2.5in
.. |VPN_gateway| image:: uservpn_TGW_media/VPN_gateway.png
   :width: 5.5in
   :height: 2.5in
.. |split_tunnel_CIDR| image:: uservpn_TGW_media/split_tunnel_CIDR.png
   :width: 5.5in
   :height: 2.5in
.. |VPC_tracker| image:: uservpn_TGW_media/VPC_tracker.png
   :width: 5.5in
   :height: 2.5in
.. |add_VPN_user| image:: uservpn_TGW_media/add_VPN_user.png
   :width: 5.5in
   :height: 2.0in   
.. |download_config| image:: uservpn_TGW_media/download_config.png
   :width: 5.5in
   :height: 2.0in 
.. |avtx_VPN_client_setup| image:: uservpn_TGW_media/avtx_VPN_client_setup.png
   :scale: 30%   
.. |EC2_private_IP| image:: uservpn_TGW_media/EC2_private_IP.png
   :scale: 30%  
.. |ping_test| image:: uservpn_TGW_media/ping_test.png
   :scale: 30%     

.. disqus::
