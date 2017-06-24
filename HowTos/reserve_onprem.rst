.. meta::
   :description: Reserve on-prem sub segments
   :keywords: Datacenter Extension, cloud burst 


Reserve For on-prem Use
========================

Datacenter Extension feature works by dividing a VLAN or subnet into sub segments. 
Each sub sugment becomes a CIDR block for VPC/VNet. If You like to reserve some of the sub segments to for on-prem use, i.e., to launch VMs on these subnets, you can do so by reserving some CIDR blocks. 

One use case for this feature is for cloud burst. 

The VMs launched on a reserved subnet will treat instances in VPC/VNet as if they are on the same VLAN. If you have application that requires the on-pre resource and in the cloud resoure to be on the same subnet/VLAN, this deployment will satisfy that.  




.. disqus::
