.. meta::
  :description: Multi-Cloud Transit Network List
  :keywords: Transit VPC, Transit hub, AWS Global Transit Network, Encrypted Peering, Transitive Peering, AWS VPC Peering, VPN, List


================================================================
Transit List
================================================================

Config Private VPC Default Route
-----------------------------------

This feature allows to configure default route in private VPC only. 
This is only supported for AWS Spoke gateway.
 

Skip Public VPC Route Table
------------------------------

Route Table Optimization allows customer to skip public VPC route table programming. This is only supported for AWS Spoke gateway and ActiveMesh 2.0 only.
Customize Spoke CIDR and this feature are mutually exclusive. 


Auto Advertise Spoke Site2Cloud CIDRs
------------------------------------------

Dynamic Route updates on Spoke for Site2Cloud allows regional redundancy for Overlapping and Non-overlapping CIDRs.

Route will be Auto Advertised or Removed for Remote and Local Virtual CIDRs when:
  1. S2C connection is created/deleted
  #. S2C connection status change up/down
  #. Spoke to Transit link goes down
  
This feature is supported for mapped S2C connections only and on the following clouds:
  * AWS and AWS-Gov, 
  * GCP, 
  * Azure and Azure-Gov
