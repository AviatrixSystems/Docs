.. meta::
  :description: Multi-Cloud Rosetta Stone or comparison of terms across Cloud Service Providers
  :keywords: Rosetta Stone, Cloud Service Provider, CSP, AWS, Azure, GCP, OCI, virtual machine, disk, volume, gateway, synonym

=========================
Multi-Cloud Rosetta Stone
=========================

While some terms across the cloud computing industry are standard, such as a firewall or IP address, Aviatrix works with multiple CSPs (Cloud Service Providers) who use different vocabulary for similar concepts. This document gives you, an Aviatrix user, a comprehensive list of common cloud computing terms and their synonyms.  

+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| **Aviatrix term**|     **Definition**                                  | **AWS**               | **Azure**             | **GCP**                   | **OCI**                  |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Network interface| A physical or digital connection and a network      | VIFs (Virtual         | Network interface     | Network Interface         | Virtual Network Interface|
|                  | and a network                                       | Interfaces) — Public, |                       |                           | Card (VNIC)              |
|                  |                                                     | Private, or Transit   |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Peering          | Free data sharing between two providers, services,  | VPC (Virtual Private  | Virtual Network (VN)  | VPC (Virtual Private      | Local / Remote VCN       |
|                  | or other Internet entities                          | Cloud) Peering        | Peering               | cloud) Network Peering    | (Virtual Cloud Network)  |
|                  |                                                     |                       |                       |                           |  Peering                 |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Data storage     | Separate components or virtual sites for cloud      | S3 buckets (Simple    | Azure Blob Storage    | Google Cloud Storage      | Object Storage service   |
| solution         | storage                                             |(Storage Service)      |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Virtual machines | A computer resource with its own operating system   | EC2 (Elastic Compute  | Azure Virtual Machine | IAAS / GCE (Google        | Oracle Compute, including|
|                  | and functions that can run alongside similar        | Cloud) instance       |                       | Compute Engine) or VM     | Flexible Virtual Machines|
|                  | resources (other Virtual Machines) on the same      |                       |                       | (Virtual Machine)/PAAS/   | and bare metal compute   |
|                  | physical host machine.                              |                       |                       | GAE (Google APP Engine)   |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| IAM (Identity    | Management of users accounts and permission         | AWS Identity and      | Azure Active Directory| Cloud IAM and Cloud       | Oracle Identity and      |
| Access           | – important for accessibility and security          | Access Management     |                       | Identity Aware Proxy      | Access Management        |
| Management)      |                                                     | (IAM)                 |                       |                           | or Cloud Identity Cloud  |
|                  |                                                     |                       |                       |                           | service (SaaS based)     |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Subnet           | A separate system within a network                  | Public or private     | Subnet (defined as    | Subnet (public by default;| Public or private subnet |
|                  |                                                     | subnet (specified at  | public or private by  | remove the default route  | (specified at the time   |
|                  |                                                     | the time of creation) | whether or not it is  | for Internet access to    | of creation)             |
|                  |                                                     |                       | connected to an       | make the VPC private)     |                          |
|                  |                                                     |                       | Internet Gateway)     |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Internet Gateway | A service that provides internet connection to the  | IGW (Internet Gateway)| Public IP Addresses   | Cloud NAT provides        | Internet Gateway         |
|                  | Virtual Machine                                     |                       | are automatically able| outgoing connectivity     | (Virtual Machine)        |
|                  |                                                     |                       | to connect to the     | for the resources: Compute| instances without        | 
|                  |                                                     |                       | Internet              | Engine VM                 | external IP addresses    |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| NAT Gateway      | Allows private subnets to connect to the Internet   | NAT Gateway (Network  | Azure NAT Gateway     | Cloud NAT                 | NAT Gateway              |
|                  |                                                     | Address Translation   |                       |                           |                          |
|                  |                                                     | Gateway)              |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Transit Gateway  | A network transit hub that can interconnect VPCs    | TGW (Transit Gateway) | Azure Virtual WAN     | Cloud Router (NCC)        | Dynamic Routing Gateway  |
|                  | and on-premise networks                             |                       |                       |                           | (DRG)  The intermediary  |
|                  |                                                     |                       |                       |                           | can be a VCN or a dynamic| 
|                  |                                                     |                       |                       |                           | routing gateway (DRG)    |
|                  |                                                     |                       |                       |                           | in your on-premises      |
|                  |                                                     |                       |                       |                           | network                  |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| VPN Gateway      | Connects Site-to-Site VPN tunnels to a specific     | VGW (Virtual Private  | VNG (VPN Gateway)     | Cloud VPN Gateway         | VPN Connect              |
|                  | VPC/VNet/VCN                                        | Gateway)              |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Site2Cloud       | Connection between an on-premise system and the     | DXGW (Direct Connect  | ExpressRoute          | InterConnect              | FastConnect              |
|                  | cloud                                               | Gateway)              |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Customer Gateway | Customer router that connects with VGW/TGW/DXGW     | Customer Gateway (CGW)| Local network gateway | On-premises VPN Gateway   | Customer Premises        |
|                  |                                                     |                       |                       |                           | Equipment (CPE)          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Availability     | Locations in different regions that can sustain     | AZ (Availability Zone)| AZ (Availability Zone)| AZ (Availability Zone)    | AD (Availability Domain) |
| Zone (AZ)        | local failures. Each Availability Zone has a        |                       |                       |                           |                          |
|                  | separate data center.                               |                       |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Network ACL      | A list on a router that shows which traffic should  | NACL (Network Access  | Managed via NSGS      | Firewall Rules            | SLs (Security Lists):    |
| (Access Control  | be allowed or blocked from the system.              | Control List)         | (Network Security     |                           | Default, Custom          |
| List)            |                                                     |                       | Groups)               |                           |                          |    
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Attachment       |                                                     | Attachment (way to    | Attachment            | Virtual Local Area Network| VCN Attachment/RPC       | 
|                  |                                                     | connect to a gateway) |                       | (VLAN) Attachment         | attachment               |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Custom or        | Routes designed by users instead of by the cloud    | User-Defined Routing  | User-Defined Route    | Custom routes (as opposed |                          |
| user-defined     | provider                                            | (UDR)                 | (UDR)                 | to system routes)         |                          |
| routes           |                                                     |                       |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Domain Name      | The Domain Name System translates the domain names  | Route 53 (DNS)        | Azure DNS             | Cloud DNS                 | Oracle DNS               |
| System (DNS)     | that are easier for human to remember, such as      |                       |                       |                           |                          |
|                  | www.example.com, to the  IP (Internet Protocol)     |                       |                       |                           |                          |
|                  | addresses that distinguish devices, websites,       |                       |                       |                           |                          |
|                  | and other Internet entities from each other. DNS    |                       |                       |                           |                          |
|                  | removes the need for people to remember complex     |                       |                       |                           |                          |
|                  | numeric or alphanumeric IP addresses such as        |                       |                       |                           |                          |
|                  | 314.837.1.2. Some websites compare DNS to a         |                       |                       |                           |                          |
|                  | phonebook for the Internet.                         |                       |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Load balancing   | Balancing the “load” or effort of a network so      | ALB (Application Load | Azure Load Balancer or| Cloud Load Balancer,      | Oracle Cloud             |  
|                  | that no one cloud machine is overworked.            | Balancing) or Elastic | Application Gateway   | TCP/UDP Network Load      | Infrastructure Load      |
|                  |                                                     | Load Balancing (ELB)  |                       | Balancing, or Network     | Balancing  or            |
|                  |                                                     |                       |                       | Load Balancing            | Infrastructure Flexible  |
|                  |                                                     |                       |                       |                           | Network Load Balancing   |
|                  |                                                     |                       |                       |                           | service (Network Load    |
|                  |                                                     |                       |                       |                           | Balancer)                |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Machine          | A virtual resource or template that contains all    | AMI (Amazon Machine   | VM Image              | Machine image             | Custom image             |
| image/imaging    | the information required to launch, backup, or      | Image)                |                       |                           |                          |
|                  | restore an instance or virtual machine              |                       |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Guard Duty +     | A threat detection system that can detect and       | Amazon Guard Duty     | Sentinel              | Google Cloud Armor        | Cloud Access Security    |
| Guard Duty       | eliminate threats                                   | (detects threats but  |                       |                           | Broker (CABS)            |
| Enforcement      |                                                     | does not act on them) |                       |                           |                          |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Physical         | Storage for cloud-related data                      | Volume                | Data Disk             | Bucket                    | Oracle Cloud             |
| disk/volume      |                                                     |                       |                       |                           | Infrastructure (OCI)     |
|                  |                                                     |                       |                       |                           | File Storage             |
+------------------+-----------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
.. disqus::