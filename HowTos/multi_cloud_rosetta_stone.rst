.. meta::
  :description: Multi-Cloud Rosetta Stone or comparison of terms across Cloud Service Providers
  :keywords: Rosetta Stone, Cloud Service Provider, CSP, AWS, Azure, GCP, OCI, virtual machine, disk, volume, gateway, synonym

=========================
Multi-Cloud Rosetta Stone
=========================

While some terms across the cloud computing industry are standard, such as a firewall or IP address, Aviatrix works with multiple CSPs (Cloud Service Providers) who use different vocabulary for similar concepts. This document gives you, an Aviatrix user, a comprehensive list of common cloud computing terms and their synonyms.  

+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| **Aviatrix term**   |     **Definition**                                            | **AWS**               | **Azure**             | **GCP**                   | **OCI**                  |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Network interface   | A physical or digital connection and a network                | VIFs (Virtual         | Network interface     | Network Interface         | Virtual Network Interface|
|                     | and a network                                                 | Interfaces) — Public, |                       |                           | Card (VNIC)              |
|                     |                                                               | Private, or Transit   |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Peering             | Free data sharing between two providers, services, or other   | VPC (Virtual Private  | Virtual Network (VN)  | VPC (Virtual Private      | Local / Remote VCN       |
|                     | Internet entities                                             | Cloud) Peering        | Peering               | cloud) Network Peering    | (Virtual Cloud Network)  |
|                     |                                                               |                       |                       |                           |  Peering                 |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Data storage        | Separate components or virtual sites for cloud storage        | S3 buckets (Simple    | Azure Blob Storage    | Google Cloud Storage      | Object Storage service   |
| solution            |                                                               |(Storage Service)      |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Virtual machines    | A computer resource with its own operating system and         | EC2 (Elastic Compute  | Azure Virtual Machine | IAAS / GCE (Google        | Oracle Compute, including|
|                     | functions that can run alongside similar resources (other     | Cloud) instance       |                       | Compute Engine) or VM     | Flexible Virtual Machines|
|                     | Virtual Machines) on the same physical host machine.          |                       |                       | (Virtual Machine)/PAAS/   | and bare metal compute   |
|                     |                                                               |                       |                       | GAE (Google APP Engine)   |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| IAM (Identity       | Management of users accounts and permission – important for   | AWS Identity and      | Azure Active Directory| Cloud IAM and Cloud       | Oracle Identity and      |
| Access Management)  | accessibility and security                                    | Access Management     |                       | Identity Aware Proxy      | Access Management        |
|                     |                                                               | (IAM)                 |                       |                           | or Cloud Identity Cloud  |
|                     |                                                               |                       |                       |                           | service (SaaS based)     |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Subnet              | A separate system within a network                            | Public or private     | Subnet (defined as    | Subnet (public by default;| Public or private subnet |
|                     |                                                               | subnet (specified at  | public or private by  | remove the default route  | (specified at the time   |
|                     |                                                               | the time of creation) | whether or not it is  | for Internet access to    | of creation)             |
|                     |                                                               |                       | connected to an       | make the VPC private)     |                          |
|                     |                                                               |                       | Internet Gateway)     |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Internet Gateway    | A service that provides internet connection to the Virtual    | IGW (Internet Gateway)| Public IP Addresses   | Cloud NAT provides        | Internet Gateway         |
|                     | Machine                                                       |                       | are automatically able| outgoing connectivity     | (Virtual Machine)        |
|                     |                                                               |                       | to connect to the     | for the resources: Compute| instances without        | 
|                     |                                                               |                       | Internet              | Engine VM                 | external IP addresses    |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| NAT Gateway         | Allows private subnets to connect to the Internet             | NAT Gateway (Network  | Azure NAT Gateway     | Cloud NAT                 | NAT Gateway              |
|                     |                                                               | Address Translation   |                       |                           |                          |
|                     |                                                               | Gateway)              |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Transit Gateway     | A network transit hub that can interconnect VPCs and          | TGW (Transit Gateway) | Azure Virtual WAN     | Cloud Router (NCC)        | Dynamic Routing Gateway  |
|                     | on-premise networks                                           |                       |                       |                           | (DRG)  The intermediary  |
|                     |                                                               |                       |                       |                           | can be a VCN or a dynamic| 
|                     |                                                               |                       |                       |                           | routing gateway (DRG)    |
|                     |                                                               |                       |                       |                           | in your on-premises      |
|                     |                                                               |                       |                       |                           | network                  |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| VPN Gateway         | Connects Site-to-Site VPN tunnels to a specific VPC/VNet/VCN  | VGW (Virtual Private  | VNG (VPN Gateway)     | Cloud VPN Gateway         | VPN Connect              |
|                     |                                                               | Gateway)              |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Site2Cloud          | Connection between an on-premise system and the cloud         | DXGW (Direct Connect  | ExpressRoute          | InterConnect              | FastConnect              |
|                     |                                                               | Gateway)              |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Customer Gateway    | Customer router that connects with VGW/TGW/DXGW               | Customer Gateway (CGW)| Local network gateway | On-premises VPN Gateway   | Customer Premises        |
|                     |                                                               |                       |                       |                           | Equipment (CPE)          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Availability Zone   | Locations in different regions that can sustain local         | AZ (Availability Zone)| AZ (Availability Zone)| AZ (Availability Zone)    | AD (Availability Domain) |
| (AZ)                | failures. Each Availability Zone has a separate data center.  |                       |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Network ACL (Access | A list on a router that shows which traffic should be allowed | NACL (Network Access  | Managed via NSGS      | Firewall Rules            | SLs (Security Lists):    |
| Control List)       | or blocked from the system.                                   | Control List)         | (Network Security     |                           | Default, Custom          |
|                     |                                                               |                       | Groups)               |                           |                          |    
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Attachment          |                                                               | Attachment (way to    | Attachment            | Virtual Local Area Network| VCN Attachment/RPC       | 
|                     |                                                               | connect to a gateway) |                       | (VLAN) Attachment         | attachment               |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Custom or           | Routes designed by users instead of by the cloud provider     | User-Defined Routing  | User-Defined Route    | Custom routes (as opposed |                          |
| user-defined routes |                                                               | (UDR)                 | (UDR)                 | to system routes)         |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Domain Name System  | The Domain Name System translates the domain names that are   | Route 53 (DNS)        | Azure DNS             | Cloud DNS                 | Oracle DNS               |
| (DNS)               | easier for human to remember, such as www.example.com, to the |                       |                       |                           |                          |
|                     | IP (Internet Protocol) addresses that  distinguish devices,   |                       |                       |                           |                          |
|                     | websites, and other Internet entities from each other. DNS    |                       |                       |                           |                          |
|                     | removes the need for people to remember complex numeric or    |                       |                       |                           |                          |
|                     | alphanumeric IP addresses such as 314.837.1.2.                |                       |                       |                           |                          |
|                     | Some websites compare DNS to a phonebook for the Internet.    |                       |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Load balancing      | Balancing the “load” or effort of a network so that no one    | ALB (Application Load | Azure Load Balancer or| Cloud Load Balancer,      | Oracle Cloud             |  
|                     | cloud machine is overworked.                                  | Balancing) or Elastic | Application Gateway   | TCP/UDP Network Load      | Infrastructure Load      |
|                     |                                                               | Load Balancing (ELB)  |                       | Balancing, or Network     | Balancing  or            |
|                     |                                                               |                       |                       | Load Balancing            | Infrastructure Flexible  |
|                     |                                                               |                       |                       |                           | Network Load Balancing   |
|                     |                                                               |                       |                       |                           | service (Network Load    |
|                     |                                                               |                       |                       |                           | Balancer)                |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Machine             | A virtual resource or template that contains all the          | AMI (Amazon Machine   | VM Image              | Machine image             | Custom image             |
| image/imaging       | information required to launch, backup, or restore an         | Image)                |                       |                           |                          |
|                     | instance or virtual machine                                   |                       |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Guard Duty + Guard  | A threat detection system that can detect and eliminate       | Amazon Guard Duty     | Sentinel              | Google Cloud Armor        | Cloud Access Security    |
| Duty Enforcement    | threats                                                       | (detects threats but  |                       |                           | Broker (CABS)            |
|                     |                                                               | does not act on them) |                       |                           |                          |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
| Physical disk/volume| Storage for cloud-related data                                | Volume                | Data Disk             | Bucket                    | Oracle Cloud             |
|                     |                                                               |                       |                       |                           | Infrastructure (OCI)     |
|                     |                                                               |                       |                       |                           | File Storage             |
+---------------------+---------------------------------------------------------------+-----------------------+-----------------------+---------------------------+--------------------------+
.. disqus::