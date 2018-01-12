.. meta::
  :description: Global Transit Network
  :keywords: Transit VPC, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering


===================================
Transit VPC Workflow Instructions
===================================

This workflow provides you with a step by step instructions to build a Global Transit Network. 


.. note::
   For description purpose, gateway and GW are used interchangebly.

Planning and Prerequisites
---------------------------

 1. Identify a VPC, call it Transit VPC, in a region where you want to launch the Transit GW. 
 #. Create a VGW in the same region. The VGW can be either attached to the Transit VPC or detached. This VGW can be connect to on-prem either over Direct Connect or over Internet.  
 #. If this is your first time using Aviatrix, make sure you go through the Aviatrix Controller on-boarding process to create Aviatrix account that corresponds to an IAM role. For instructions on how to launch an Aviatrix Controller, check out `this link. <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_


Login to the Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Open a browser and navigate to `https://<Controller IP address>/`.  Once authenticated, click on `Transit VPC` in the left navigation bar.

Follow the steps below to set up Transit VPC network.


1. Launch a Transit Gateway
-------------------------------------------


2. (Optionally) Enable HA for the Transit Gateway
--------------------------------------------------


3. Connect the Transit GW to AWS VGW 
-------------------------------------

This step builds a site2cloud IPSEC tunnel with VGW and establishes BGP session with VGW to 
exchange routes between on-prem and the cloud.

4. Launch a Spoke Gateway
-------------------------


5. (Optionally) Enable HA for the Spoke Gateway
------------------------------------------------


6. Join a Spoke GW to Transit GW Group
---------------------------------------

This step builds a Aviatrix encrypted peering and transitive peering between the Spoke GW and the Transit GW. The Controller also instructs the Transit GW to start advertise the Spoke VPC CIDR to VGW via the established BGP session.

7. Remove a Spoke GW from a Transit GW Group
--------------------------------------------

This step removes the Aviatrix encrypted peering and transitive peering between the Spoke GW and the Transit GW 
built in the previous step. The Controller also instructs the Transit GW to stop advertising the Spoke VPC CIDR 
to VGW. 

Note the Spoke GW is not deleted and you can go to step 6 to join the Transit GW group again. 

To delete a Spoke GW, go to Gateway on the main navigation tab, select the gateway and click Delete. 


8. Add More Spoke VPCs
---------------------------------------

Repeat step 4 to 6 to add more Spoke VPCs to the Transit GW group.

9. View the Network Topology
-------------------------------------

You can view the network topology by going to the Dashboard. Click on the Map View to switch to Logical View. 
In the Logical View, each gateway is represented by a dot. You can rearrange the initial drawing by moving the dot, 
zoom in or zoom out, move the graph around. After you are done moving, click the Save icon. 

10. Remove Transit GW to VGW Connection
----------------------------------------

To remove or undo Step 3, click Site2Cloud in the main navigation bar, you should see a Site2Cloud connection from thee Transit GW. Click delete to disconnect the IPSEC tunnel between Transit GW and VGW. 

You can go to Step 3 to build the connection again. 

11. Troubleshoot BGP
---------------------

Under `Advanced Config` on the main navigation bar, click BGP. The Transit GW will have BGP Mode as Enabled. 
Click the Transit GW and click Details to see Advertised Networks and Learned Networks. 
Learned Networks are network CIDR blocks that BGP learned from VGW. Advertised Networks are Spoke VPC CIDRs. 

You can also click Diagnostics. Select one of the show commands or type in yourself if you know the commands to 
see more BGP details. 

 
.. |image0| image:: ipmotion_media/ipmotion.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: ipmotion_media/ipmotion-range-display.png
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
