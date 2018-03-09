.. meta::
  :description: Global Transit Network
  :keywords: Transit VPC, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, AWS VPC Peering, VPN


=========================================================
AWS Global Transit Transit Network Workflow Instructions
=========================================================

This workflow provides you with a step by step instructions to build a Global Transit Network. 
The workflow abstracts and combines multiple existing Aviatrix features, such `Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html>`_, `Transitive Peering <http://docs.aviatrix.com/HowTos/TransPeering.html>`_ and `Site2Cloud <http://docs.aviatrix.com/HowTos/site2cloud.html>`_ to bring you a wizard like experience so that you do not have 
to go to multiple pages on the Controller console when building the Transit group.

For design guide, check out `Transit Network Design Patterns. <http://docs.aviatrix.com/HowTos/transitvpc_designs.html>`_ 

For more information, check out `Transit Network FAQ. <http://docs.aviatrix.com/HowTos/transitvpc_faq.html>`_

For other Aviatrix functions, such as `VPN access for users <http://docs.aviatrix.com/HowTos/uservpn.html>`_ and `VPN access for sites <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_, check out `Aviatrix Overview <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_

This Global Transit Network consists of a Transit gateway and a set of Spoke gateways for communications 
between Spoke VPC EC2 instances and on-prem network. 


.. note::
   For description purpose, gateway and GW are used interchangeably.
   Other than gateway deletion, resources created by this work flow should be deleted within the work flow. 

The Global Transit Network diagram is described as below. 

|image0|

Planning and Prerequisites
---------------------------

 1. If you have not launched Aviatrix Controller, start with `Aviatrix startup guide <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_
 #. Identify a VPC, call it Transit VPC, in a region where you want to launch the Transit GW. 
 #. Create a VGW in the same region. The VGW should not be attached to the Transit VPC if you plan to launch Transit GW in the same VPC. This VGW can be attached to a different VPC if this VPC CIDR is different from the Transit VPC where Transit GW is launched. (see `10Gbps Transit Network use case <http://docs.aviatrix.com/HowTos/transitvpc_designs.html#gbps-transit-vpc-design>`_). This VGW should be connected to on-prem either over Direct Connect or over Internet.  
 #. If this is your first time using Aviatrix, make sure you go through the Aviatrix Controller on-boarding process to create Aviatrix account that corresponds to an IAM role. For instructions on how to launch an Aviatrix Controller, check out `this link. <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_


Login to the Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Open a browser and navigate to https://<Controller Public IP address>/.  Once authenticated, click on `Transit Network` in the left navigation bar.

Follow the steps below to set up Transit Network.


1. Launch a Transit Gateway
-------------------------------------------

The Transit GW is the hub gateway, it servers to move traffic between a Spoke VPC and on-prem network.
The Transit GW must be launched on public subnet where its associated route table has a route 0.0.0.0/0 that points to AWS IGW. 

|image1|

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Cloud Type                                      Currently Transit GW can only be launched in AWS
Gateway Name                                    A unique name to identify the Transit GW
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS
Region                                          One of the AWS regions
VPC ID                                          The Transit VPC-id
Public Subnet                                   The public subnet on which Transit GW instance is deployed
Gateway Size                                    Transit GW `instance size <http://docs.aviatrix.com/HowTos/gateway.html#select-gateway-size>`_
Specify a Reachable DNS Servier IP Address      Leave it unselected
Add/Edit Tags                                   `Additional AWS Tags <http://docs.aviatrix.com/HowTos/gateway.html#add-edit-tags>`_ for the Transit GW instance
==========================================      ==========

.. Warning:: When selecting Transit GW instance size, choose a t2 series for Proof of Concept (POC) or prototyping only. Transit GW of t2 series instance type has a random packet drop of 3% for packet size less than 150 bytes when interoperating with VGW. This packet drop does not apply to Spoke GW.  

You can change the Transit GW size later by follow `this instructions. <http://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-do-i-resize-transit-gw-instance>`_

2. (Optionally) Enable HA for the Transit Gateway
--------------------------------------------------

When HA is enabled, a second Transit GW will be launched. Note both Transit GWs will be forwarding traffic in an event of tunnel failure between a Spoke VPC and Transit VPC, and between the Transit GW and VGW. For best practice, the HA GW should be launched on a different public subnet in a different AZ. 

|image2|

To disable Transit GW HA, go to Gateway page and delete the Transit GW with -hagw in the name extension. Note if the Transit GW is connected to VGW, you cannot disable Transit GW HA and if there are still Spoke GWs, you cannot disable
Transit GW HA either. 

3. Connect the Transit GW to AWS VGW 
-------------------------------------

This step builds a site2cloud IPSEC tunnel with VGW and establishes a BGP session with VGW to 
exchange routes between on-prem and the cloud. Note you just need to select the VGW ID in the drop down menu, Customer gateway will be automatically created as the result of this step. 

|image3|



=====================      ==========
**Setting**                **Value**
=====================      ==========
VPC ID                     The Transit VPC ID where Transit GW was launched
Connection Name            A unique name to identify the connection to VGW 
BGP Local AS Number        The BGP AS number the Transit GW will use to exchange routes with VGW
Primary Cloud Gateway      The Transit GW you created in Step 1
AWS VGW Account Name       The Aviatrix account that VGW is created with. This account could be the same as the account used by Transit GW, or it could be by a different account
VGW Region                 The AWS region where VGW is created
VGW ID                     VGW that is created in the VGW Region in the AWS VGW Account
=====================      ==========


Note Aviatrix Transit GW can connect to a VGW that belongs to a different AWS account in a different region. This is specified by 

It takes a few minutes for the VPN connection to come up and routes from VGW 
to be propagated. When the IPSEC tunnel with VGW is up, the Controller admin should receive an email notification.

If you login to AWS Console and select service VPC in the region where VGW is, you should see Customer Gateway and VPN Connections have been created. Do not delete or modify them from AWS Console. These resources are deleted 
when you Disconnect VGW at step 8. 

You can check if routes are properly propagated by going to Advanced Config at 
navigation bar, select BGP. Select the Transit GW, click details. 
The Learned Routes should be the list of the routes propagated from VGW. 
Scroll down to see the total number of learned routes. 

4. Launch a Spoke Gateway
-------------------------

|image4|

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Cloud Type                                      Currently Spoke GW can only be launched in AWS
Gateway Name                                    A unique name to identify the Spoke GW
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS
Region                                          One of the AWS regions
VPC ID                                          The Spoke VPC-id
Public Subnet                                   The public subnet where the Spoke GW instance is deployed
Gateway Size                                    Spoke GW `instance size <http://docs.aviatrix.com/HowTos/gateway.html#select-gateway-size>`_
Specify a Reachable DNS Servier IP Address      Leave it unselected
Enable NAT                                      Select the option if the Spoke GW will also be the NAT gateway for the Spoke VPC
Add/Edit Tags                                   `Additional AWS Tags <http://docs.aviatrix.com/HowTos/gateway.html#add-edit-tags>`_ for the Transit GW instance
==========================================      ==========

You can enable NAT function on Spoke GW if egress to Internet is intended to 
go through the Spoke GW. Once NAT is enabled, you can further configure `FQDN whitelists for egress filter. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_

5. (Optionally) Enable HA for the Spoke Gateway
------------------------------------------------


6. Join a Spoke GW to Transit GW Group
---------------------------------------

This step attaches a Spoke VPC to the Transit GW Group by building a Aviatrix encrypted peering and transitive peering between the Spoke GW and the Transit GW. The Controller also instructs the Transit GW to start advertise the Spoke VPC CIDR to VGW via the established BGP session.

|image5|

To attach more Spoke VPCs to this Transit GW Group, repeat Step 4 to Step 6. 

7. Remove a Spoke GW from a Transit GW Group
--------------------------------------------

This step detaches one Aviatrix Spoke VPC from a Transit GW Group. 
The Controller also instructs the Transit GW to stop advertising the Spoke VPC CIDR 
to VGW. 

Note the Spoke GW is not deleted and you can go to step 6 to attach the Transit GW group again. 

To delete a Spoke GW, go to Gateway on the main navigation tab, select the gateway and click Delete. 


8. Add More Spoke VPCs
---------------------------------------

Repeat step 4 to 6 to add more Spoke VPCs to the Transit GW group.

|image6|

9. View the Network Topology
-------------------------------------

You can view the network topology by going to the Dashboard. Click on the Map View to switch to Logical View. 
In the Logical View, each gateway is represented by a dot. You can rearrange the initial drawing by moving the dot, 
zoom in or zoom out, move the graph around. After you are done moving, click the Save icon. 

10. Remove Transit GW to VGW Connection
----------------------------------------

You can remove the BGP and site2cloud IPSEC connection to VGW via this step. Note all Spoke VPCs must be detached from the Transit GW Group 
before you can remove the Transit GW to VGW connection.

You can go to Step 3 to build the connection again. 

11. Troubleshoot BGP
---------------------

Under `Advanced Config` on the main navigation bar, click BGP. The Transit GW will have BGP Mode as Enabled. 
Click the Transit GW and click Details to see Advertised Networks and Learned Networks. 
Learned Networks are network CIDR blocks that BGP learned from VGW. Advertised Networks are Spoke VPC CIDRs. 

You can also click Diagnostics. Select one of the show commands or type in yourself if you know the commands to 
see more BGP details. 

To troubleshooting connectivity between a Spoke VPC instance and a on-prem host, follow `these steps. <http://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_

12. Disable Transit GW HA
--------------------------

Go to Gateway page, locate the Transit GW with "-hagw" in the gateway name extension, highlight the 
gateway and click Delete. 

Note Transit GW and its back up companion are in active/active state, that is, both gateways could 
be forwarding traffic. To disable Transit GW HA, it is best practice to make sure there is no traffic 
going through the backup Transit GW. 

13. Transit Network APIs
-------------------------

There are multiple resources to help you automate Transit Network setup. Noteif you are building a Transit Network following the workflow, you should use the APIs documented below. 

 - `Transit Network section in API doc <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm#api-doc-transit-network>`_. 

 - `Terraform example. <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_

 - `Python API example for Transit Network <https://github.com/AviatrixSystems/TransitNetworkAPI_python_example>`_


What's next?
---------------------------------------

Aviatrix Controller AMIs can be found on AWS Marketplace. 

`Aviatrix Controller BYOL AMI. <https://aws.amazon.com/marketplace/pp/B0155GAZ1C?qid=1520370707533&sr=0-1&ref_=srh_res_product_title>`_

`Aviatrix Controller 5-tunnel Utility AMI. <https://aws.amazon.com/marketplace/pp/B0155GB0MA?qid=1520370771464&sr=0-7&ref_=srh_res_product_title>`_
 
.. |image0| image:: transitvpc_workflow_media/aviatrix-transit-service.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: transitvpc_workflow_media/transitGw-launch.png
   :width: 2.55625in
   :height: 1.0in

.. |image2| image:: transitvpc_workflow_media/TransitGW-HA.png
   :width: 2.55625in
   :height: 1.0in

.. |image3| image:: transitvpc_workflow_media/connectVGW.png
   :width: 2.55625in
   :height: 1.0in

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :width: 2.55625in
   :height: 2.50in

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :width: 3.55625in
   :height: 3.26548in

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :width: 3.55625in
   :height: 3.26548in

.. disqus::
