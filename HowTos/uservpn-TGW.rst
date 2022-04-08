Use AWS Transit Gateway to Access Multiple VPCs in One Region
==============================================================

This reference guide will show how you can use an AWS Transit Gateway (TGW) to allow remote users to connect to multiple VPCs in the same region. Please see the overview image below for reference. 

You must have already created VPCs in your environment. If not, you can create and deploy VPCs directly from the Aviatrix Controller under **Useful Tools > Create a VPC**. Follow this link to learn more: `Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_.

|vpn_with_tgw_one_region|

1. Create a TGW
---------------

The first step is to create a TGW from the Aviatrix Controller. 

    a. Log in to the Aviatrix Controller. 

    b. Navigate to the **TGW Orchestrator > Plan** tab in the left sidebar.
    
    c. Next, select your cloud type (in this case, AWS). Fill in the remaining information, name the TGW, and click **Create**.

|createTGW|

To learn more about Transit Gateway deployment:
 `AVX Transit for AWS FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html#next-gen-transit-for-aws-faq>`_


2. Create a Network Domain
----------------------------
You create a network domain under "Segment your network" on the Plan tab in the TGW Orchestrator. For this design you need to create three network domains:

    1. Shared Service Domain
    2. Dev Domain
    3. Prod Domain 

First select the AWS Transit Gateway Name you created in the previous step from the dropdown list. Next, name the first network domain "Shared Service Domain" and click **Create**. Repeat this process for the other two domains.

|security_domain| <<need to update this screenshot when it is ready>>

3. Build Connection Policies
-----------------------------
After creating network domains, you use these domains to define the connection policies.

1. First, make sure you select the AWS Transit Gateway Name created in Step 1. 
#. For "Network Domain Name" select Shared Services Domain. 
#. Select the Dev domain from the Domain Connection Policy List under "Not Connected" and add it to the "Connected" list.
#. Repeat this step for the Prod domain.

Now you have allowed both the Dev and Prod Domains to connect to the Shared Service Domain.     

|security_domains|

.. note:: You can call these domains any name and use as many domains as needed. As seen in the image below Dev and Prod are called Domain 1 and Domain 2.

4. Attach VPCs to TGW
----------------------
The next step is to attach your existing VPCs to the Transit Gateway (TGW) created in Step 1. 

To perform this, in the Aviatrix Controller navigate to the **TGW Orchestrator > Build** tab.
In section 1 "Attach VPC to TGW":

    a. Select the region of the TGW and your account.
    
    b. Choose your Shared Service VPC and TGW Name.
    
    c. Select Shared Service Domain for the Network Domain Name.

    d. Click **Attach**. 

|VPC_to_TGW|

5a. Launch a VPN Gateway
----------------------
Now that you have attached our VPCs to the TGW, you create a VPN Gateway so users can access the instances in the VPCs.

1. In the left sidebar of the Aviatrix Controller, click **Gateway** and then click **Create New**. 
#. Select AWS as the cloud type and enter a Gateway name. 
#. Pick the region deployed above and select the Shared Service VPC. 
#. Select the **Allocate New EIP** and **VPN Access** checkboxes. 
#. Click **Create**.

A new VPN Gateway is created in the Shared Service VPC.     

See this link for more detailed options for deploying an Aviatrix Gateway: `Gateway Options <https://docs.aviatrix.com/HowTos/gateway.html>`_. 

|VPN_gateway|


5b. Configure VPN Gateway
--------------------------

To segment the Development and Production VPCs you must enable Split Tunnel Mode on your VPN Gateway. 

1. In the left sidebar of the Aviatrix Controller, navigate to **OpenVPN® > Edit Config**. 
#. In VPC ID/VNet Name select the Shared Service VPC you created earlier.
#. Confirm the proper LB/Gateway Name is selected.
#.In the Modify Split Tunnel section add the IPv4 CIDR ranges for the Dev and Prod VPCs.

|split_tunnel_CIDR|

These ranges can be found by logging in to the AWS console and navigating to the VPC section. Another way to find these ranges is navigating to the Aviatrix Controller Useful Tools tab and clicking on the "VPC Tracker" sub-menu. There you can view all the CIDR ranges for your VPCs. You will see your Prod and Dev VPCs. 

|VPC_tracker|


6. Configure Aviatrix VPN Client
---------------------------------

1. Add a new VPN User. In the Aviatrix Controller, navigate to **OpenVPN® > VPN Users**. Click **Add New** and input your information. For the VPC ID use the Shared Service VPC ID. 

|add_VPN_user|

#. Download your OpenVPN® configuration file.

|download_config|

#. Download the latest Aviatrix VPN Client from the Docs page here: `Aviatrix VPN Client <https://docs.aviatrix.com/Downloads/samlclient.html>`_.

#. Once the client is installed, import your OpenVPN® configuration file to the Aviatrix VPN Client. Once the client is open click the "+" button and choose your .ovpn file. Once the configuration file is imported click **Connect**. 

|avtx_VPN_client_setup|

#. After you are connected via the Aviatrix VPN Client you can test that everything has been configured correctly. First, make note of the Private IP address of the EC2 instance running in either the Dev or Prod VPCs. These IPs can be found on the AWS Console page under the EC2 banner. 

|EC2_private_IP|

#. Open a terminal on your computer and see if you can ping the EC2 instance using its private IP address. If you are connected to the Aviatrix VPN Client, you should see a response. As a check, you can disconnect from the Aviatrix VPN Client and you should see no response. 
See below for an example of a proper ping response. 

|ping_test|

7. Last Steps
---------------

One last option you can configure is under Step 3 of this guide "Connection Policies". As a test, you can remove either the Dev or Prod Domain from the "Connected" list. If you remove Dev from the "Connected" list for the Shared Service Policy and run a Ping test, you should receive no response from the EC2 instance in the Development VPC. 


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
