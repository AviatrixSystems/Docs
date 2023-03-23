

Reserve For On-Prem Use
==========================

The Datacenter Cloud InterConnect (DCCX) feature works by dividing a VLAN or subnet into sub segments. 
Each sub segment becomes a CIDR block for VPC/VNet. If you want to reserve some of the sub segments 
for on-prem use, i.e., to launch VMs on these subnets, you can do so by reserving some CIDR blocks. 

One use case for this feature is for cloud burst. 

The VMs launched on a reserved subnet will treat instances in VPC/VNet as if they are on the same VLAN. 
If you have an application that requires the on-prem resource and in the cloud resource to be on the same subnet/VLAN,
this deployment will satisfy that.  

.. Note:: This feature is available for R2.6 and later. 



.. disqus::
