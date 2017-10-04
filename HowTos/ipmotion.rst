.. meta::
  :description: IP motion Ref Design
  :keywords: AWS Migration, DR, Disaster Recovery, aviatrix, Preserving IP address, IPmotion, ip motion


=================================
IPmotion Setup Instructions
=================================

Aviatrix IPmotion is a technology that connects the same two subnets between on-prem and in the VPC. The technology is useful when migration an on-prem VM to public cloud while preserving its IP address. It can also be used
for mission critical application HA to public cloud. 

The technology is described in the diagram below, where an on-prem VM with IP address 10.1.0.11 is migrated to AWS
while preserving its IP address. After migration, any on-prem VMs can continue to communicate with this migrated VM
as if it still resides on-prem. 

 |image0|

Prerequisites
--------------

 - To implement IPmotion, you must first deploy Aviatrix virtual appliance CloudN on a subnet where VM migrations take place.  Read `this document <http://docs.aviatrix.com/StartUpGuides/CloudN-Startup-Guide.html>`_ on how to deploy the virtual appliance. 

 - Once the virtual appliance is deployed, go through on-boarding process and create an AWS account. 

 - Create a AWS VPC with a public subnet that has identical CIDR as the on-prem subnet where CloudN is deployed. 


Go to IPmotion at the navigation bar and 
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

Note, the format must have a "-" in the list even when there is a single IP address. 

Note the larger this list is, the larger gateway instance size needs to be. 
The reason is that gateway needs to allocate private IP addresses from AWS
for any on-prem VMs. 

You can optimize the list by making sure only the running VMs are being specified. For the above example, if 172.16.1.11 is an IP address not assigned to any VM, you should skip this address and specify a multiple range separating by a comma: 172.16.1.10-172.16.1.10,172.16.1.12-172.16.1.20. 

    ::
     
      172.16.1.10-172.16.1.10,172.16.1.12-172.16.1.20


Currently the largest number of VMs that a CloudN can handle on a subnet is 232 which requires a c4.4xlarge gateway instance size. This number can be expanded in the future release. 

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


2. Reserve Gateway IP Address List
-------------------------------------

This field is about specifying 10 IP addresses that are not being used by 
any running VMs and reserve these addresses for Aviatrix gateway. For example, 
if you specify 172.16.1.100-172.16.1.110 as gateway reserved IP address, 
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
Note the gateway size reflects how many on-prem VMs can be supported, as 
the table shown below.

===============================    ================================================================================
**IPmotion Gateway Size**           **Max on-prem VMs**
===============================    ================================================================================
t2.micro                           2
t2.small                           6
t2.medium                          15
m4.large                           18
m4.xlarge                          56
m4.2xlarge                         56
m4.16xlarge                        232
c3.large                           27
c3.xlarge                          56
c3.2xlarge                         56
c3.4xlarge                         232
c4.large                           27
c4.xlarge                          56
c4.2xlarge                         56
c4.4xlarge                         232
c4.8xlarge                         232
===============================    ================================================================================


4. IPmotion Move
------------------

This step consists of two parts: staging and commit. 

Staging
^^^^^^^^
Staging is the preparation step. After an IP address is moved to Staging, the migrated cloud instance can be booted
up with the same IP address for testing and staging. Note the cloud instance at this point cannot communicate with VMs on prem.

Highlight a specific IP address and click the Staging button. 

Commit
^^^^^^^^
Commit is to enable the migrated cloud instance to communicate with any on-Prem VM. 

.. Note:: Before you commit an IP address, the on-prem VM that has been migrated must be powered down. 
..

Hightlight a specific IP address and click the Commit button. 

5. Migrate more VMs on the same subnet
---------------------------------------

Repeat Step 4 to migrate more VMs.

6. Migrate VMs in a different subnet
-------------------------------------

To migrate a VM in a different subnet, you need to launch a new virtual appliance CloudN on that subnet 
and repeat all the steps described in this document. 

 
.. |image0| image:: ipmotion_media/ipmotion.png
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
