.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Setup Palo Alto VM-Series for POC
=========================================================

In this document, we provide an example to setup the VM-Series for you to validate that packets are indeed
sent to the VM-Series for VPC to VPC traffic inspection.

Aviatrix Firewall Network (FireNet) workflow launches VM-Series at `Step 7a. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_ After the launch complete, the console displays the
VM-Series instance with its public IP address of management interface and allows you to download the .pem file 
for SSH access to the instance. 

Below are the steps to setup an "Allow ALL" policy. 

1. Download VM-Series Access Key
----------------------------------

After `Step 7a <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_ is completed, you'll see the Download button as below. Click the button to download the .pem file.

|access_key|

2. Reset VM-Series Password
--------------------------------

For Metered AMI, open a terminal and run the following command. 

::
  
 ssh-i <private_key.pem> admin@<public-ip_address>
 configure
 set mgt-config users admin password	 
 commit

For BYOL, open a terminal and run the following command.

::

 ssh-i <private_key.pem> admin@<public-ip_address>
 configure
 set mgt-config users admin password
 set deviceconfig system dns-setting servers primary <ip_address>
 commit

Terminate the SSH session.

3. Login to VM-Series
------------------------

Go back to the Aviatrix Controller Console. Go to Firewall Network workflow, Step 7a. Click on the Management UI that
takes you the VM-Series you just launched. 

Login with Username "admin". Password is the password you set at the previous step. 

4. Configure VM-Series ethernet1/1 and WAN Zone
-------------------------------------------------

Once login, click Network tab, you should see a list of ethernet interfaces. Click ethernet1/1 and 
configure as the following screenshot. 

 - Click Network tab
 - Click ethernet1/1
 - Click Config tab.
 - Select "layer3" for Interface Type
 - Click Config
 - Select default for Virtual Router at Config tab
 - Click New Zone for Security Zone to create a WAN zone. 
 - At the next pop up screen, name the new zone "WAN" and click OK 

|new_zone|

Continue, 

 - Select IPV4 tab
 - Select DHCP Client
 - Uncheck "Automatically create default route pointing to default gateway provided by server, as shown below

|ipv4|

Click Commit. Once Commit is complete, you should see the Link State turn green at the Network page for ethernet1/1. 

5. Configure VM-Series ethernet1/2 and LAN Zone
---------------------------------------------------

Repeat Step 4 for ethernet1/2. Name the new zone LAN

Click Commit. Once Commit is complete, you should see the Link State turn green at the Network page for ethernet1/2.

6. Configure Allow All Policies
---------------------------------

 - Click Policies tab.
 - Click +Add at the bottom left corner to create a new policy.
 - Click General tab. Name the policy Allow-all.
 - Click Source tab. Select Any for both panels.
 - Click Destination tab. Select Any for both panels.
 - Click Application tab. Select Any.
 - Click Commit to commit the Allow-all policy.

Now the VM-Series has its Allow All policy setup. 

7. Setup API access 
----------------------

In order for Aviatrix Controller to automatically update firewall instance route tables, monitor firewall instance health and manage instance failover, you need to setup API access permissions. 





.. |access_key| image:: config_paloaltoVM_media/access_key.png
   :scale: 30%

.. |new_zone| image:: config_paloaltoVM_media/new_zone.png
   :scale: 30%

.. |ipv4| image:: config_paloaltoVM_media/ipv4.png
   :scale: 30%

.. disqus::
