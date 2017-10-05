.. meta::
  :description: IP motion Ref Design
  :keywords: AWS Migration, DR, Disaster Recovery, aviatrix, Preserving IP address, IPmotion, ip motion


=================================
IP Motion Setup Instructions
=================================

Aviatrix IPmotion (IP Motion) is a technology that connects the same two subnets between on-prem and in the VPC. The technology is useful when migration an on-prem VM to public cloud while preserving its IP address. It can also be used
for mission critical application HA to public cloud. 

The technology is described in the diagram below, where an on-prem VM with IP address 10.1.0.11 is migrated to AWS
while preserving its IP address. After migration, any on-prem VMs can continue to communicate with this migrated VM
as if it still resides on-prem. 

Note the actual migration process is not included in this document. We assume you have tools to migrate an on-prem to public cloud. 

 |image0|

Prerequisites
--------------

 1. Identify a subnet where you plan to migrate VMs. For example, the subnet is 10.1.0.0/24.
 #.  Create a AWS VPC with a public subnet that has identical CIDR as the on-prem subnet where migration is to take place. For example, create a VPC 10.1.0.0/16 with a public subnet 10.1.0.0/24.  

 #. Deploy Aviatrix virtual appliance CloudN on this subnet.  Read `this document <http://docs.aviatrix.com/StartUpGuides/CloudN-Startup-Guide.html>`_ on how to deploy the virtual appliance. 

 #. Once the virtual appliance is deployed, go through on-boarding process and create an AWS account. 

>>> For description purpose, a migrated VM that has the same IP address as its on-prem VM is called the migrated EC2 instance.  

Go to IPmotion at the navigation bar of the CloudN controller console and 
follow the steps below to setup IPmotion.  

1. Specify on-Prem IP Address List
-------------------------------------------

The IP address list of a subnet includes both the list of IP addresses of VMs that will be 
migrated and the list of IP addresses of VMs that will remain on-prem 
but need to communicate with the migrated VMs. 

One simple way to specifiy this address range is to provide the list of 
all running VMs, since out of this list, 
some or all VMs will be migrated to cloud. For example, if the running VMs
on subnet 172.16.1.0/24 are in the range of 172.16.1.10-172.16.1.20, and you plan to move
all running VMs to cloud, then specify this range for Step 1 as below.  

    ::

      172.16.1.10-172.16.1.20

.. Note:: the on-prem IP address format must have a "-" in the list even when it is a single IP address. Spcifiy multiple list by separting them with a comma. 

..

Note the larger this list is, the larger IPmotion gateway instance size needs to be in the cloud (AWS). 
The reason is that IPmotion gateway needs to allocate private IP addresses from AWS
for any on-prem VMs. 

You can optimize the list by making sure only the running VMs are being specified. For the above example, if 172.16.1.11 is an IP address not assigned to any VM, you should skip this address and specify a multiple range separating by a comma: 172.16.1.10-172.16.1.10,172.16.1.12-172.16.1.20. 

    ::
     
      172.16.1.10-172.16.1.10,172.16.1.12-172.16.1.20


Currently the largest number of VMs that a CloudN can handle on a subnet is 231 which requires a c4.4xlarge IPmotion gateway instance size. This number of VMs can be expanded in the future release. 

(You can further optimize the list for the on-prem part by specifying only the 
dependent VMs. 
For example, the CloudN is deployed on subnet 172.16.1.0/24. On this subnet, IP addresses of VMs that are planed to be migrated are 
172.16.1.10, 172.16.1.15-172.16.1.20. 
IP addresses of VMs that are to remain on the subnet but need to 
communicate with migrated VMs are in the range 172.16.1.50-172.16.1.70
then you should enter 
172.16.1.10-172.16.1.10,172.16.1.15-172.16.1.20,172.16.1.50-172.16.1.70)

  ::

   172.16.1.10-172.16.1.10,172.16.1.15-172.16.1.20,172.16.1.50-172.16.1.70


2. Reserve IPmotion Gateway IP Address List
--------------------------------------------

This field is about specifying 10 IP addresses that are not being used by 
any running VMs and reserve these addresses for Aviatrix IPmotion gateway. For example, 
if you specify 172.16.1.100-172.16.1.110 as IPmotion gateway reserved IP addresses, 
it means that these range of IP addresses are not currently used by any VM on 
the subnet, they are reserved by Aviatrix during migration phase. 

Note AWS reserves the first 3 IP addresses of a subnet in VPC. 
For example, if the VPC subnet is 172.16.1.0/24, the first 3 addresses 
172.16.1.1, 172.16.1.2 and 172.16.1.3 are reserved by AWS.
if you have on-prem VMs that uses the first 3 IP addresses (excluding
default gateway, DNS or any other infrastructure purpose) of a subnet, the 
IPmotion method will not work. 


3. Launch IPmotion Gateway
----------------------------

This step launches an Aviatrix IPmotion gateway and builds an encrypted IPSEC tunnel between the two subnets. 
Note the IPmotion gateway size reflects how many on-prem VMs can be supported, as 
the table shown below.

===============================    ================================================================================
**IPmotion Gateway Size**           **Max VMs can be migrated**
===============================    ================================================================================
t2.micro                           1
t2.small                           5
t2.medium                          14
m4.large                           17
m4.xlarge                          55
m4.2xlarge                         55
m4.16xlarge                        231
c3.large                           26
c3.xlarge                          55
c3.2xlarge                         55
c3.4xlarge                         231
c4.large                           26
c4.xlarge                          55
c4.2xlarge                         55
c4.4xlarge                         231
c4.8xlarge                         231
===============================    ================================================================================


4. IPmotion Move
------------------

This step consists of two parts: Staging and Commit. 

Staging
^^^^^^^^
Staging is the preparation step. After an IP address is moved to Staging state, 
you can power up the migrated EC2 instance with the same IP address as the on-prem VM  
for testing and staging. Note the migrated EC2 instance at this point cannot communicate with on prem.

Highlight a specific IP address in on-prem panel and click the Staging button. 

Undo Staging
^^^^^^^^^^^^
If you want to move any IP address in Staging state back to on-prem, select the IP address and click Undo. 
Note if the migrated EC2 instance is already running, you must terminate the instance from AWS console before
you can move its IP address back to on-prem state. 


Commit
^^^^^^^^
Commit is to enable the migrated EC2 instance to communicate with any on-Prem VM. 

.. Note:: Before you commit an IP address, the on-prem VM that has been migrated must be powered down first. Commit the IP address implies that the migrated EC2 instance will be in operation. 
..

Hightlight a specific IP address and click the Commit button. 

Undo Commit
^^^^^^^^^^^

If migration fail after cut over, you can Undo the Commit by 
selecting the IP address from the cloud panel and click Undo.  

Undo function of Commit is to revert a committed IP address to Staging state. After reverting to Staging state, 
the communication between the migrated EC2 instance to on-prem is stopped and you can power up the on-prem VM and resume its operation. 


5. Test Connectivity
---------------------

After an IP address is committed, you can test connectivity. 
Go to CloudN console, Troubleshoot -> Diagnostics -> Netwowrk -> Ping Utility. Enter the committed IP address 
and click Ping. Make sure the security group of the migrated EC2 has ICMP allowed. Also make sure the 
migrated EC2 instance responds to Ping request.  

6. Troubleshooting Tips
-----------------------

- **View Button** click View button on Step 1 or Step 2 at any time to see what state an IP address is at.  
- **Reset Button** If all things fail and you like to start over, first delete the IPmotion gateway by going to Gateway List, select the gateway and click Delete. After Delete is completed, go to Step 1 and click Reset. You can then start it over by going through Step 1 again.  
- **Get Support** email support@aviatrix.com for assistance. 

7. Migrate more VMs on the same subnet
---------------------------------------

Repeat Step 4 to migrate more VMs on this subnet.

8. Migrate VMs in a different subnet
-------------------------------------

To migrate a VM in a different subnet, you need to launch a new virtual appliance CloudN on that subnet 
and repeat all the steps described in this document. 

For example, suppose you have created a VPC 10.16.0.0/16 and migrated subnet 10.1.0.0/24. Now you plan to migrate subnet 10.1.1.0/24. Follow these steps:

- Go to AWS console to create a second public subnet 10.1.1.0/24 in VPC 10.16.0.0/16. 
- Launch Aviatrix virtual appliance CloudN on subnet 10.1.1.0/24.
- Repeat the steps listed in this document.  

 
.. |image0| image:: ipmotion_media/ipmotion.png
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
