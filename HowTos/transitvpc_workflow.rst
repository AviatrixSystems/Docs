.. meta::
  :description: Global Transit Network
  :keywords: Transit VPC, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering


===================================
Transit VPC Workflow Instructions
===================================

This workflow provides you with a step by step instructions to build a Global Transit Network. 
The workflow abstracts and combines multiple existing Aviatrix features, such `Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html>`_, `Transitive Peering <http://docs.aviatrix.com/HowTos/TransPeering.html>`_ and `Site2Cloud <http://docs.aviatrix.com/HowTos/site2cloud.html>`_ to bring you a wizard like experience so that you do not have 
to go to multiple pages on the Controller console when building the Transit group.

For design guide, check out `Transit VPC Design Patterns. <http://docs.aviatrix.com/HowTos/transitvpc_designs.html>`_ 

For more information, check out `Transit VPC FAQs. <http://docs.aviatrix.com/HowTos/transitvpc_faq.html>`_


This Global Transit Network consists of a Transit gateway and a set of Spoke gateways, to faciliate communication 
between Spoke VPC EC2 instances and on-prem network. 


.. note::
   For description purpose, gateway and GW are used interchangebly.
   Other than gateway deletion, resources created by this work flow should be deleted within the work flow. 

The Global Transit Network diagram is described as below. 

|image0|

Planning and Prerequisites
---------------------------

 1. Identify a VPC, call it Transit VPC, in a region where you want to launch the Transit GW. 
 #. Create a VGW in the same region. The VGW can be either attached to the Transit VPC or detached. This VGW can be connect to on-prem either over Direct Connect or over Internet.  
 #. If this is your first time using Aviatrix, make sure you go through the Aviatrix Controller on-boarding process to create Aviatrix account that corresponds to an IAM role. For instructions on how to launch an Aviatrix Controller, check out `this link. <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_


Login to the Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Open a browser and navigate to https://<Controller Public IP address>/.  Once authenticated, click on `Transit VPC` in the left navigation bar.

Follow the steps below to set up Transit VPC network.


1. Launch a Transit Gateway
-------------------------------------------

The Transit GW is the hub gateway, it servers to move traffic between a Spoke VPC and on-prem network.

|image1|


2. (Optionally) Enable HA for the Transit Gateway
--------------------------------------------------

When HA is enabled, a second Transit GW will be launched. Note both Transit GWs will be forwarding traffic in any event of tunnel failure between a Spoke VPC and Transit VPC, and between the Transit GW and VGW.  

|image2|

3. Connect the Transit GW to AWS VGW 
-------------------------------------

This step builds a site2cloud IPSEC tunnel with VGW and establishes BGP session with VGW to 
exchange routes between on-prem and the cloud.

|image3|

4. Launch a Spoke Gateway
-------------------------

|image4|

5. (Optionally) Enable HA for the Spoke Gateway
------------------------------------------------


6. Join a Spoke GW to Transit GW Group
---------------------------------------

This step attaches a Aviatrix encrypted peering and transitive peering between the Spoke GW and the Transit GW. The Controller also instructs the Transit GW to start advertise the Spoke VPC CIDR to VGW via the established BGP session.

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
