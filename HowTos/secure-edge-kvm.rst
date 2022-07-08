.. meta::
   :description: Aviatrix Edge
   :keywords: Edge as a spoke, KVM, ESXi, secure edge


==============================================
Deploying Aviatrix Edge  2.0 (Edge as a Spoke)
==============================================

This document provides step-by-step instructions for deploying Aviatrix Edge 2.0 on either VMware ESXi or an open-source Kernel-based Virtual Machine (KVM). 

Aviatrix Edge 2.0 enables you to extend your cloud network to the Edge and easily integrate it with your remote locations and data centers. You can extend your Aviatrix-managed platform to the Edge as well as support multi-cloud/multi-transit connectivity. For examples of Edge 2.0 designs, refer to Edge Design Patterns below. For additional information about Aviatrix Edge 2.0, refer to Aviatrix Edge FAQ. 

For the Aviatrix Edge 1.0 for ESXi workflow, refer to `Deploying Aviatrix Edge 1.0 for VMware ESXi <http://docs.aviatrix.com/HowTos/Controller_and_Software_Release_Notes.html#preview-features>`_.


.. note::
   Aviatrix Edge 2.0 is currently supported in AWS, Azure, and OCI. GCP is only supported for non-High-Performance Encryption (HPE) environments. 
   
Aviatrix Edge 2.0 Deployment Workflow
=====================================

The diagram below provides a high-level view of the four-step process for deploying Aviatrix Edge 2.0 in Aviatrix Controller. You have the option to use either VMware ESXi or an open-source Kernel-based Virtual Machine (KVM) to deploy the Edge VM and attach the ZTP .iso file.

|image1|

Prerequisites
-------------

Aviatrix Edge 2.0 requires the following:
•	Aviatrix Controller 6.8
•	Aviatrix Transit Gateway BGP ASN configured (High-Performance Encryption (HPE) is now optional for Edge 2.0 attachments)
•	VMware ESXi  
o	Request Aviatrix Edge Gateway 6.8 OVA for VMware ESXi
o	VMware ESXi 6.7 or 7.0.1
o	Sufficient VMware ESXi resources to run Edge Gateway   (see Installation Requirements)
o	VMware vCenter Server (Optional)
•	KVM  
o	Request QCOW2 image for KVM 
o	KVM server running in Linux Bare Metal Server
o	CentOS 7.6-1810
o	QEMU Version 1.5.3, Release 160.el7_6.3
o	Resource requirements are the same as for ESXi (see Installation Requirements)
•	Access to Controller via the Internet    or private network with DNS resolution from the Edge Gateway Management interface
•	BGP-enabled   router to peer with Edge Gateway LAN interface via BGP over LAN
•	Default RBAC access account for Edge Gateway (see Creating a Default RBAC Access Account for Edge 2.0)







.. disqus::
