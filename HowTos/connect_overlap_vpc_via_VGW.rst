

.. meta::
   :description: Create site2cloud connection with overlap network address ranges 
   :keywords: site2cloud, VGW, SNAT, DNAT, Overlap Network CIDR, overlap CIDRs


===========================================================================================
Connect Overlapping VPC to On-prem  
===========================================================================================

The Problem 
------------------

Organizations usually plan its cloud network address ranges. But there are times where a VPC CIDR
overlaps with on-prem network address range, yet it still requires connectivity to on-prem.

In this document, the scenario is such that traffic is always initiated from on-prem to VPC. The constraint is that 
there should be no source NAT nor destination NAT performed in the on-prem network.

As shown in the diagram below, on-prem network address range is 10.20.0.0/16. All other VPCs connect 
to on-prem via Aviatrix Transit solution. However there is one VPC named spoke-vpc with an identical CIDR 10.20.0.0/16.

|overlap_cidr|

The Solution
-------------------

Since on-prem network does not perform any NAT functions, NAT must be performed in the cloud network.

The key solution steps are:  

 1. Allocate two 1-1 mapped corresponding virtual address spaces for on-prem network and spoke-VPC. For example, allocate the virtual network 100.105.0.0/16 on-prem network, and 100.101.0.0/16 for the spoke-VPC virtual VPC CIDR. These two virtual address spaces must not overlap with any on-prem nor cloud address spaces. 
 #. Launch an Aviatrix gateway in the spoke-vpc.
 #. Builds an IPSEC tunnel between spoke-vpc and VGW: 
        a. Go to AWS Console for VPC service. Use the same VGW that is used for Aviatrix Transit solution to create an IPSEC tunnel to spoke-vpc with static routes 100.101.0.0/16 configured, as shown below. Then download the VPN configuration file.

   |vgw_config| 

	b. On the spoke-vpc side, go to Controller console, Site2Cloud, add new. Make sure the remote subnet list include 10.20.0.0/16 and 100.105.0.0/16. The local subnet is 100.101.0.0/16, the virtual address of the spoke-VPC, as shown in the screenshot below.

   |site2cloud|

 4. Performs both SNAT and DNAT functions on the Aviatrix gateway: 
        a. Go to Controller console, click Gateway. Select the Aviatrix gateway for spoke-vpc. Click Edit, and scroll down to find Destination NAT .
	b. Translates the cloud virtual destination address to its real address for each instance in the VPC.
        c. Mark the session with a number that is easy to remember. In this example, it is 119.
        d. Scroll up to find Source NAT. Translate the marked session to any on-prem virtual source address, as shown in the screenshot below. 
 
     |nat_config| 

       e. Repeat the NAT configuration for each cloud instance. 
 #. Done

Since VGW runs a BGP session to on-prem for normal Transit network, the spoke-vpc virtual CIDR 100.101.0.0/16 should be propagated to on-prem. From on-prem, the destination IP address takes the range 100.101.0.0/16.

.. |overlap_cidr| image:: connect_overlap_vpc_via_VGW_medium/overlap_cidr.png
   :scale: 30%

.. |vgw_config| image:: connect_overlap_vpc_via_VGW_medium/vgw_config.png
   :scale: 30%

   
.. |site2cloud| image:: connect_overlap_vpc_via_VGW_medium/site2cloud.png
   :scale: 30%

.. |nat_config| image:: connect_overlap_vpc_via_VGW_medium/nat_config.png
   :scale: 30%

.. disqus::    
