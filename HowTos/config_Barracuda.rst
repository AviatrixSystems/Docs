.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall

**Some notes before deployment:**

1. This document complements the existing deployment guide that was designed to help you to associate a Palo Alto VM-Series. We are going to assume that you have completed all the steps from 1 to 6 before launching this firewall instance. Step 7a is not necessary as it is Palo Alto VM-Series specific.

2. Currently we do not have full integration between the Aviatrix dashboard and the Barracuda CloudGen Firewall, which means that you will not be able to update the firewall routing table via API, as it is currently possible with the Palo Alto VM-Series.


=========================================================
Deploying a Barracuda CloudGen Firewall for use with the Aviatrix FireNet
=========================================================

The goal of this document is to provide a step by step guide to launch and configure one or more Barracuda CloudGen Firewall instances to be integrated with the Aviatrix Firewall Network.

This setup will include basic “allow-all”  policies to serve as initial configuration to validate intended traffic is passing through the firewall instance.


1. Setup Firewall Network (FireNet)
---------------------------------------
Complete steps 1-5 of Firewall Network Workflow in the Aviatrix controller to prepare your Firewall VPC (FireNet VPC). This will also setup the subnets that you will need later for launching a Barracuda Firewall instance.

2. Deploy the Barracuda CloudGen Firewall Instance from the AWS Marketplace
----------------------------------------------------
2a. The Barracuda CloudGen Firewall is available as a Pay-As-You-Go(PAYG) or Bring-Your-Own-License(BYOL) model.  For ease of use we will use the PAYG model in this example.

2b. Click the Launch Instance link in the AWS console from the Region your Firenet has been deployed in.  Choose the AWS Marketplace link and search for Barracuda.  Choose the Barracuda CloudGen Firewall for AWS - PAYG.  

|image1|


2c. Click Continue when prompted.

|image2|

2d. Choose an instance size.  A t2.small can be used for the Demo.  Choose Next: Configure Instance Details

|image3|

2e. Choose the VPC created for the Aviatrix firenet from the dropdown.  Choose the Public-FW-ingress-egress-us-east-1b subnet.  In this example we are using the US-East region.

|image4|

2f. Scroll down to adjust the network interfaces.  Click Add Device to add another Network Interface.  On the Subnet dropdown for eth1, choose the aviatrix-fireGW-DMZ-firewall subnet.  

|image5|


2g. Click Next: Add Storage, then Next: Add Tags.  Add any necessary tags then click Next: Configure Security Group.  No changes need to be made to the Security Group now.  Choose Review and Launch, the Launch on the next screen.  You will be prompted for a key pair.  None will be needed for the Firewall.  Choose Launch Instances.



2h. You'll need to configure an Elastic IP in the AWS Console to connect to the Barracuda management interface.  `This <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html>`_ link will guide you through setting up an Elastic IP.  Once allocated, it will need to be associated to the private IP address of the Barracuda on eth0.



3. Login to Firewall and configure interfaces
------------------------------------------------



3a. Barracuda recommends configuring its instances with the Firewall Admin, a stand-alone Windows application.  Directions on downloading and using it can be found `here <https://campus.barracuda.com/product/cloudgenfirewall/doc/79463207/barracuda-firewall-admin/>`_


3b.  Open the Admin Client and use the Elastic IP, root as the Username, and the instance id from the AWS console as the initial password.  


|image6|

3c. You will be prompted to change the password upon first logging in.  Once prompted to login again, you will be asked to choose how you will administer the Firewall.  Choose Manage via Firewall Admin and confirm.

|image7|


3d. These steps will be following the `Barracuda Documentation <https://campus.barracuda.com/product/cloudgenfirewall/doc/79462723/how-to-add-aws-elastic-network-interfaces-to-a-firewall-instance/>`_ for adding an additional interface.  
Once logged in you will need to configure the second(eth1) interface on the Barracuda.  Go to CONFIGURATION > Configuration Tree > Box > Network.

|image8|

Click Lock.

In the left menu, click Interfaces.

In the Network Interface Cards table, double click the 10dynmod entry.  The window will open.

|image9|

From the Number of Interfaces, select the number of network interfaces attached to the firewall instance, in this case 2.
Click Ok.

|image10|

Click Send Changes and Activate.





3e. Now you need to add a Direct Attached Route for the second Network Interface.

Go to Configuration > Configuration Tree > Box > Network.

Click Lock.

In the left menu, click Routing.

Click + in the IPv4 Routing Table to add an attached route.

-Target Network address will be the subnet you put on eth1, the aviatrix-fireGW-DMZ-firewall subnet.

-Route Type, select direct attached network.

-Interface Name, select eth1.

-Trust Level, select Trusted.

|image11|

Click OK.
Click Send Changes and Activate.




3f. The Network Configuration will need to be activated now.

Go to CONTROL > Box.

In the Network section of the left menu, click Activate new network configuration.  The Network Activation window opens.

Click Failsafe.

The route is now pending in CONTROL > Network.

|image12|


3g. A virtual IP needs to be added to the Virtual Server.  It will be the private IP assigned to your eth1 interface from the AWS console.

Go to CONFIGURATION > Configuration Tree > Box > Virtual Servers > your virtual server > Server Properties.

Click Lock.

Click + in the Additional IP table. The Additional IP window opens.

- In Additional IP, add the private IP address configured for the network interface in step 1.

-Reply to Ping, select Yes.

|image13|

Click OK.
Click Send Changes and Activate.



4. Create static routes for routing of traffic VPC to VPC
------------------------------------------------------------

4a.The next step is to update the route table. For the purpose of this guide, we suggest adding three routes, each for a RFC1918 address pointing to the private IP of the eth2/ENI of the Aviatrix gateway in question (whether you are attaching the instance to the main or to the backup gateway). 

4b. Go to CONFIGURATION > Configuration Tree > Box > Network.

Click Lock.

In the left menu, click Routing.

Click + in the IPv4 Routing Table to add a gateway route.

-Target Network address will be a summary of your VPCs or all private addresses.

-Route Type, select gateway.

-Gateway, add the private IP of the eth2 interface of your primary Aviatrix FireNet Gateway.

-Trust Level, select Trusted.

|image14|

Click OK.
Click Send Changes and Activate.

The Network Configuration will need to be activated now.

Go to CONTROL > Box.

In the Network section of the left menu, click Activate new network configuration.  The Network Activation window opens.
Click Failsafe.

4c. For the second interface to become available to the Barracuda the instance will need to be rebooted from the AWS console.
If it hasn't already been done, Source/Dest. Check will also need to be disabled for both of the ENIs associated to the Barracuda.

|image15|



5. Configure basic traffic policy to allow traffic
-----------------------------------------------------------

5a. Security Groups in AWS for the Barracuda ENIs will need to be adjusted as necessary to allow the traffic from the various VPCs to hit the interface.

5b. Building rules to allow VPC to VPC traffic, and Egress traffic if needed is next.

There are two pre-built rules, CLOUD-NET-2-INTERNET and CLOUD-NET-2-CLOUD-NET, that we can adjust to match your VPCs within AWS.

Go to CONFIGURATION > Configuration Tree > Virtual Servers > your virtual server > NGFW(Firewall) > Forwarding Rules.

Click Lock.

Open the CLOUD-NET-2-INTERNET rule and add your VPCs CIDR ranges to the Source field.

|image16|

Click OK.
Click Send Changes and Activate.

5c. Do the same for the CLOUD-NET-2-CLOUD-NET rule, adding your VPCs to the Source and Destination fields.  Leaving the Connection Method as Original Source IP will help in any future troubleshooting or logging.

|image17|




6. Ready to go!
---------------

Now your firewall instance is ready to receive packets!

The next step is specifying which network domain needs packet inspection by defining a connection policy that connects to
the firewall domain. This is done by `Step 8 <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#specify-security-domain-for-firewall-inspection>`_ in the Firewall Network workflow.

For example, deploy Spoke-1 VPC in Security_Domain_1 and Spoke-2 VPC in Security_Domain_2. Build a connection policy between the two domains. Build a connection between Security_Domain_2 to Firewall Domain.

Launch one instance in Spoke-1 VPC and Spoke-2 VPC. From one instance, ping the other instance. The ping should go through. 

7. View Traffic Log
----------------------
Traffic can be viewed on the FIREWALL section of the Firewall Admin.  The two most useful views are Live and History.  History will show you any expired sessions and any traffic blocked by the firewall, while the Live view will show any active sessions.

|image18|

8. Scale out
----------------------

Additional Firewall instances can be added to the FireNet as needed, and load balanced using the Aviatrix Gateways.

.. |image1| image:: ./barracuda_images/image1.png
    :width: 100%
.. |image2| image:: ./barracuda_images/image2.png
    :width: 100%
.. |image3| image:: ./barracuda_images/image3.png
    :width: 100%
.. |image4| image:: ./barracuda_images/image4.png
    :width: 100%
.. |image5| image:: ./barracuda_images/image5.png
    :width: 100%
.. |image6| image:: ./barracuda_images/image6.png
    :width: 100%
.. |image7| image:: ./barracuda_images/image7.png
    :width: 100%
.. |image8| image:: ./barracuda_images/image8.png
    :width: 100%
.. |image9| image:: ./barracuda_images/image9.png
    :width: 100%
.. |image10| image:: ./barracuda_images/image10.png
    :width: 100%
.. |image11| image:: ./barracuda_images/image11.png
    :width: 100%
.. |image12| image:: ./barracuda_images/image12.png
    :width: 100%
.. |image13| image:: ./barracuda_images/image13.png
    :width: 100%
.. |image14| image:: ./barracuda_images/image14.png
    :width: 100%
.. |image15| image:: ./barracuda_images/image15.png
    :width: 100%
.. |image16| image:: ./barracuda_images/image16.png
    :width: 100%
.. |image17| image:: ./barracuda_images/image17.png
    :width: 100%
.. |image18| image:: ./barracuda_images/image18.png
    :width: 100%

