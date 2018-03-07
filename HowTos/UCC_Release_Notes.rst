=======================================
Release Notes
=======================================

R3.1 (3/6/2018)
===============

1. Connectivity
---------------

- **AWS Global Transit Network** work flow. The step by step guide to setup `AWS Global Transit Network. <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

- **AWS VPC Peering integration** is a 1-click operation to `configure native AWS VPC peering <http://docs.aviatrix.com/HowTos/peering.html>`_ for intra region and inter-region VPC communication. 

- **BGP dampening** `BGP dampening <http://docs.aviatrix.com/HowTos/advanced_config.html#bgp-dampening>`_ allows you suppress flapping routes.

2. Operations
--------------

- **Backup to encrypted S3 bucket** allows you to backup Controller configuration to an `encrypted S3 bucket <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_. Check out `this link <http://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_ to enable backup and restore feature. 

- **Modular NAT configuration** allows you to `enable or disable NAT <http://docs.aviatrix.com/HowTos/gateway.html#nat>`_ function after a gateway instance is launched. 

- **Gateway Force Upgrade** allows you to force upgrade a specific gateway. This is useful when Controller upgrade fails on some gateways. Go to Troubleshoot -> Diagnostics -> Gateway -> FORCE UPGRADE 

- **Configurable TLS version** allows you to turn off support for older versions, such as TLSv1.0 and TLSv1.1. TLSv1.2 is supported by default. To configure, go to Settings -> Advanced -> TLS VERSIONS SUPPORT

- **Dashboard Logical View** allows you to view VPCs and connection graph. Each dot represents a gateway deployed in a VPC. You can rearrange the graph by draging the dots. Make sure you click Save to save the changes.   
- **Gateway Single AZ** is an economic way to improve gateway uptime without running a standby instance. The Aviatrix Controller monitors the gateway's health and when gateway keep alive packets fail to arrive at the Controller, it stops and starts the gateway again. To configure, go to Gateway, select a gateway to Edit, then Enable or Disable Single AZ gateway HA. 

- **Security patches** for CIS-CAT and Meltdown.


R3.0 (12/1/2017)
================

1. Connectivity
---------------

- **BGP** Support BGP interoperability between Aviatrix gateway and AWS VGW. For use case details, check out `the Transit Network with BGP Setup Instructions. <http://docs.aviatrix.com/HowTos/bgp_transitive_instructions.html>`_.

- **IPmotion** For AWS migration and DR use case that allows on-prem VMs to migrate to AWS without changing their IP addresses. For use case and details, check out `this link. <http://docs.aviatrix.com/HowTos/ipmotion.html?highlight=ip%20motion>`_.

- **AWS ENA** on Aviatrix gateway. 


2. Security
-----------

- **Tag your security policy** to associate a CIDR with a name tag for a scalable and user friendly. For configuration detail, check `this link. <http://docs.aviatrix.com/HowTos/tag_firewall.html?highlight=tag>`_

- **AES-GCM crypto algorithm**. For IPSEC tunnel connectivity between two Aviatrix gateways, such as Aviatrix peering and IPmotion, the crypto algorithm has been upgraded to AES-GCM.


3. Controller
--------------

- **Audit** user actions on the Controller. All commands from web console or REST API are now logged to syslog and can be forwarded to integrated log services.

- **Name your controller** for ease of use. Click "Your controller name goes here" on the Controller console and start typing a new name. Hit return to save the name. 

- **On demand backup** of the Controller configuration to cloud storage. To configure, go to Settings -> Maintenance -> Backup & Restore -> Backup Now 

- **Backup multiple copies** of Controller configuration file. You can choose to backup multiple copies of configuration file. To do so, go to Settings -> Maintenance -> Backup & Restore and select Multiple Backup. Up to 3 backup files are stored. You can select any one of them to restore. 

- **Migrate licenses** from AWS Marketplace Utility image to BYOL. For details, check out `this link. <http://docs.aviatrix.com/HowTos/Migration_From_Marketplace.html>`_


4. Modular Configuration
-------------------------

- **Transitive Peering** supports multiple subnets being configured at the same time. Multiple subnets separated by comma can be added once when configuring transitive peering.

- Join Function now support the ability to delete all subnets at once in Join Function gateway.

5. Troubleshooting
-------------------

- **FlightPath tool**, an AWS EC2 to EC2 connectivity troubleshooting tool. In the first release, EC2 related resources, such as security groups, route table and Network ACLs are displayed side by side for easy visualization and troubleshooting. 

7. Datacenter Extension Features
---------------------------------

- **non-RFC1918** on premise network range is now supported. To add, first launch a Datacenter Extension gateway, go to Gateway List, select the gateway and click Edit. At Edit Extended Public CIDR, add one or multiple non-RFC1918 CIDR blocks separated by comma. For example, 100.64.0.0/24,100.64.1.0/24

- **Repair gateway** to replace a gateway in a limbo state. At the Datacenter Extension page, click Replace of specific gateway. 

R2.7
==========

1. Controller 
-------------------

- Console Responsiveness improvements. Significant improvements in page responsiveness when using controller web console. 

- Support third party signed certificate. You now can import a third party signed certificate to the controller. This should remove the "Not Secure" sign displayed by the browser. To configure, go to Settings -> Advanced -> Certificate -> CERTIFICATE IMPORT. First Enable Certificate Checking. The console will ask you to enter a domain name and generate a CSR file (Certificate Signing Request). Send this CSR to get singed, then import both CA and server certificate. Note if intermediate certificate is one of the return files, use the intermediate certificate file for CA import. 


2. Connectivity
-------------------

- Support Site2Cloud tunnel on TCP. In addition to run IPSEC tunnel on UDP protocol, you can now run on TCP 443. This option removes the requirements of having to open site firewall ports on UDP 4500/500. To configure, go to Site2Cloud -> Add New. Select TCP for Tunnel Type selection. 

3. Scalability
---------------

- Support load balancing UDP based OpenVPN® gateways. If your OpenVPN® users experience slow terminal response or long file transfer time, use UDP based VPN gateway can help. This release allows you to create multiple UDP based VPN gateways and load balance them in a round robin fashion by leveraging AWS Route53. To configure, go to OpenVPN® -> Advanced -> UDP Loadbalancer. Note with UDP protocol UDP port 1194 is used. When using from on-prem, firewall port UDP 1194 must be open. 

- Support Designated Gateway. If you are planning to have a large set of tunnels going through a gateway or are hitting AWS route entry limit, this feature is for you. If "Designated Gateway" option is selected at the gateway launch time, the Controller programs 3 route entries based on RFC1918 for the gateway. Controller will not program additional route entries when configure a VPN tunnel that end on the Designated Gateway. Note if you currently do not have a Designated Gateway and you are hitting route entry limit, launch a new gateway with Designated Gateway enabled and configure future tunnels from the Designated Gateway. Note there can only be one Designated Gateway per VPC. Designated Gateway only supports Gateway HA.  

4. Modular Configuration
--------------------------

- Allocate New EIP. When this option is selected at new gateway launch time, Controller always allocates a new EIP from AWS and associated it with the gateway. If this option is unchecked, Controller will first look at the EIP pool that belong to the account: if there is allocated but unassociated EIP, Controller will allocate EIP from this pool and associate it with the gateway, otherwise it will select one EIP from the pool and associate it with the gateway. 

- Support resizing active Gateway without deleting its peering tunnel. You can resize an active gateway when there peering HA configured. The workflow should be: 1) Settings -> Gateways -> select the gateway, select Edit. 2) Select it desired gateway instance size, click Change. As the result of this function, the gateway will be stopped and tunnel switch to backup tunnel. 3) Go to Settings -> Peering, select the peer and click Force Switchover.  

- Support resizing UDP based OpenVPN® gateway instance. 

5. NEW REST APIs
------------------

- Set VPC Access Base Policy.
- Update VPC Access Policy.
- Enable Packet Logging.



R2.6
===================

Connectivity
-------------

- Run encrypted tunnel on TCP port 443. Aviatrix Virtual Appliance CloudN now offers a TCP based secure tunnel connectivity. With this new capability, you do not need to open outbound UDP port 500 and 4500. The encrypted tunnel runs on TCP 443. To configure, go to Datacenter Extension, select TCP for the field Tunnel Type. UDP based encrypted tunnel is still supported. 

- Reserve on-prem segment for Datacenter Extension feature of CloudN. After deciding how many VPCs you wish to configure during on boarding, you can sub divide the segments to reserve some for on prem VM deployment. This allows you launch applications where some part of it (such as database) is on-prem and others parts of it (such as web front end) to be in VPC.  

- Google IDP support. Google IDP is now supported IDP for the Aviatrix SAML VPN solution. 

Security
---------

- FQDN blacklist. In addition to FQDN whitelist, FQDN whitelist is added as a base configuration for each FQDN tag. To configure, go to Advanced Config -> FQDN Filter. After you create a new tag, you can select either White List or Black List. With Black List, the URLs on the Black List will be rejected. 

REST API
---------

- New APIs are published. list active VPN users, edit Open VPN configuration, backup and restore, list vpc peers, list image. For API details, click `this link. <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`_ for details.

User Interface
--------------

- re-organize menu items on Settings. Under Settings -> Maintenance are Upgrade, Backup & Restore and Security Patches. Under Settings -> Controller are System Time, License information, Email settings and controller access method authentication LDAP or DUO configuration.oUnder Settings -> Advanced are tunnel timeout and keepalive configuration, password change and certificate management.  

- Make a wish. Customers can now send feedback on UI pages regarding features, usability and make a wish on new requirements and enhancements.   


R2.5
=============================

1. Security improvements
-------------------------

-  Provide security patch to upgrade OpenVPN® server to v2.4.3. To apply
   the patch, go to Settings->Patches and select OpenVPN® 2.4.3

-  New Aviatrix VPN client (v1.3.9) for user VPN (Mac, PC and Unix). To
   download, go to `this link. <http://docs.aviatrix.com/Downloads/samlclient.html>`__

-  Hardened password management for “forgot password”.

-  Additional ciphers for site to cloud tunnels for interoperability. To
   configure, go to Site2Cloud -> “Add New” -> Algorithms.

2. Public cloud specific features
----------------------------------

-  AWS China [available in the UCC version only] ·

-  Restful API support for AWS China. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

-  Aviatrix cluster peering over AWS peering. To enable it, go to
   Peering -> “Cluster Encrypted Peering” -> “New Peering” and select
   “Over AWS Peering”.

-  Aviatrix backup/restore in Google Cloud. To configure back/restore,
   go to Settings -> “Backup & Restore”.

-  Python script for Google Cloud Controller HA monitoring and
   restarting. `Follow <https://github.com/AviatrixSystems/Controller-HA-for-GCP>`__

3. Usability enhancements
--------------------------

-  Multiple enhancements on User Interface.

-  Aviatrix product Doc site is now available at http://docs.aviatrix.com

-  New browser support: IE 11

4. Administration automation
-----------------------------

-  Cloud-init script to accept input parameters to launch Aviatrix
   Controller on premises.

-  Automated Aviatrix Controller deployment in AWS using `Cloudformation:
   <http://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`__

-  GW Resizing API “edit\_gw\_config”.

-  Support proxy setting modification through “Advanced Config” ->
   “Proxy Settings”.

-  Frictionless install UX [Register Aviatrix on premises Gateway with
   UCC Controller at the time of install to auto-fetch initial
   configuration; available for AWS at this time].

5. Configurable Aviatrix Gateway Failover/HA time
--------------------------------------------------

-  Support configurable health check frequency between Aviatrix
   Controller and Gateways for customers to meet their HA failover time
   constraint. To change the health check frequency, go to Settings ->
   Keepalive. Select “slow” only when your network is unstable and
   gateways send too many status alerts.

6. Logs and troubleshooting
----------------------------

-  Aviatrix for Splunk has been published on Splunkbase. To download,
   click `this link <https://splunkbase.splunk.com/app/3585/>`__. For
   instructions on how to use the app, click `this
   link <https://github.com/AviatrixSystems/SplunkforAviatrix>`__. ·

-  Aviatrix for SumoLogic application is available. To download, click
   `this
   link <https://github.com/AviatrixSystems/SumoLogicforAviatrix>`__.

-  Rsyslog over UDP for customers needing UDP based rsyslog. To
   configure, go to Settings -> Loggings -> “Remote Syslog” and select
   UDP for “Protocol”

-  Configurable gateway debug level. To adjust the debug level, go to
   Troubleshot -> Diagnostics -> “Gateway Debug Level” and select the
   appropriate debug level for your gateway

7. New Aviatrix OVF for VMWare
-------------------------------

-  Visit download.aviatrix.com

UserConnect-031717
==================

Security
--------

-  First release to white list public Fully Qualified Domain Names (FQDN
   filtering) for egress HTTP and HTTPS traffic to Internet initiated by
   instances on private subnets in a VPC. The FQDNs can be specified
   with regex wild card, such as \*.example.com. A tag is defined as a
   list of FQDNs and one or more gateways is attached to a tag. Any
   updates to a tag automatically triggers updates to all gateways
   attached to the tag. Multiple tags can be defined on the controller.
   This feature works together with Gateway Security Policy feature
   where private network, IP address, protocol and ports can be
   filtered.

   To configure, go to "Advanced Config" -> "FQDN Filter". The workflow
   is 1) create a tag, 2) Click Enable to enable the tag, 3) Edit the
   tag by adding FQDN hostname part of URLs (e.g.
   `www.aviatrix.com <http://www.aviatrix.com>`__, or \*.google.com),
   and 4) Attach Gateway. One or more gateways can be attached to a tag.
   Step 1), 3) and 4) can be done first and then Enable the tag. Once
   the tag is enabled, HTTP and HTTPS traffic to these FQDN will be
   allowed, and any destination outside the FQDN will be denied.

   Note the gateway with FQDN must have NAT enabled for Internet egress
   traffic.

   Caveat: in this release FQDN filter is not failover capable when
   peering HA is configured.

Monitor and Troubleshooting
---------------------------

-  During UCC gateway launch, Controller now reports in text the
   progress of gateway creation in addition to the progress bar view.

-  “Dry Run” for system upgrade. Dry Run performs health checks for the
   Controller and gateways to detect potential upgrade failure without
   executing the command. Go to Settings -> Upgrade. Optionally, click
   Dry Run. If it is successful, you may click Upgrade.

-  Dashboard now displays a summary packet statistics per gateway. Click
   on a specific gateway, top 10 packet statistics of the gateway are
   also displayed.

-  Support test network connectivity. This is useful to troubleshoot any
   firewall or security policy that blocks connectivity from the
   controller or gateway. To test, go to Troubleshoot -> Diagnostics ->
   "Network Connectivity Utility". Select either Controller or one
   gateway and test if it can reach a specific port of a remote host.

-  Capability has been added to log tunnel status change notification to
   syslog (in addition to an email notification with the same content).

-  Enhancement has been made for tunnel status alert mechanism by
   allowing users to configure tunnel down detection time. To change the
   detection time, go to Settings -> Tunnels. The default detection time
   is 60 seconds.

-  Capability has been added to check the VPC settings of a specific
   gateway. VPC settings include security groups, route tables, subnets,
   Network ACLs, DHCP options. To configure, go to Troubleshoot -> VPC
   Diagnostics

-  Splunk forwarder has been upgraded from version 6.2 to version 6.4.

Connectivity and High Availability
----------------------------------

-  Support multiple independent UDP based VPN gateways (without ELB)
   within the same VPC. These VPN gateways can have different
   attributes. For example, one gateway has split tunnel configured
   while the other one has full tunnel configured.

-  Support API credential change on controller console for Azure ARM
   accounts when the credential becomes out of sync with the credential
   on cloud provider console. For example, the account credentials are
   changed by the cloud provider or user herself.

-  HA support has been added to Service Chaining with AWS gateways in
   different zones.

-  Support IAM role-based controller and cloud account for AWS GovCloud.
   The Controller must be in GovCloud to create GovCloud gateways with
   IAM role-based accounts.

-  Site2Cloud HA support has been added with CloudN as the on-prem
   device. To configure it, launch two gateways in the same VPC/VNet
   with UCC Controller. Then go to Site2Cloud page to create a new
   connection. Check "Enable HA" and select "Aviatrix" from "Remote
   Gateway Type" list. After creating the site2cloud connection, select
   this connection and download configuration with "Aviatrix" as
   "Vendor". Import the same configuration file at CloudN's Site2Cloud
   page.

Controller Administration
-------------------------

-  Function has been added to notify admin via admin email when a new
   release becomes available.

-  Support has been added to enforce password complexity of account
   users. To enable it, go to Settings -> Security -> "Password
   Management".

-  Support read only (operator) role for Controller management. The read
   only account has dashboard view, status view and list view, but
   cannot make modification to any configuration. To create a read only
   user, go to Accounts -> Account Users -> "New User". Select
   "read\_only" from the dropdown list of "Account Name".

-  CloudN's console password can be changed from the default
   "Aviatrix123#". To do so, type "enable" to enter config mode and then
   issue "change\_console\_password" command.

-  Capability has been added for HTTPS certificate check for control
   traffic between Controller and gateways. To turn on this function, go
   to Settings -> Security -> "Certificate Checking".

-  The following APIs have been added. For details of the complete APIs,
   refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  list\_vpcs\_summary

   -  peer\_ha\_switch\_over

   -  upload\_cloudx\_command\_log

   -  upgrade

UserConnect-013017
==================

-  First release of Service Chaining. Service Chaining capability allows
   multiple instance based functions to work in tandem to control
   traffic flow path within an AWS VPC. For example, a firewall instance
   can be service chained with Aviatrix gateway so that EC2 initiated
   traffic will first be sent to firewall for inspection before
   forwarding it to Aviatrix gateway for peering to another VPC. To
   enable the function, go to "Advanced Config" -> "Service Chaining" to
   select the route table and enter "Downstream IP". Aviatrix gateway
   will only modify the selected route table to specify which outgoing
   traffic needs to go through itself and also route the incoming
   traffic to the "Downstream IP" address. Normally, the selected route
   table is associated with the subnet of your firewall's WAN (or
   untrusted) interface. The "Downstream IP" should be the IP address of
   your firewall's WAN interface. For details, check out
   `this <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Aviatrix+Service+Chaining+Reference+Design.pdf>`__
   reference design.

-  Within AWS, support has been added to allow deployment of the UCC
   Controller in VPC's private subnet. To enable this, during the
   Controller's initial setup, when prompted for "If this controller is
   being launched on a private subnet, check the box below, otherwise,
   leave it blank", select "private subnet" and then click the "save"
   button. Please note that when the Controller is deployed in private
   subnet it can only create gateways in private subnets. We assume
   these private subnets in various VPCs can reach each other through
   AWS peering.

-  For AWS, account diagnostics have been added. To run these
   diagnostics, go to Troubleshoot -> Diagnostics -> "Account
   Diagnostics". This diagnostics command will validate the AWS account
   credentials and check the status of associated gateways and SQS
   queues.

-  There is now support for adding multiple CIDRs separated by commas in
   "Advanced Config"->"Join Function" -> "Allow Subnet" at CloudN.

-  Tunnel HA for Azure ARM gateways can now be created through "Advanced
   Config"->"Join Function". To enable tunnel HA, select a particular
   gateway on the "Gateway" page and then go to "Gateway for High
   Availability Tunnel/Peering" to create a backup gateway.

-  Support has been added to allow the creation of two VPN gateways
   (without ELB) in the same VPC, one with SAML enabled and the other
   one with only certification authentication enabled (no MFA method
   supported on the 2\ :sup:`nd` gateway).

-  The Dashboard now displays the IPSec tunnels created by site2cloud
   connection.

-  Support has been added for enabling NAT on CloudN Controller itself.
   To enable this, go to Troubleshoot -> Diagnostics -> "NAT
   Configuration".

-  With this release, both the actual public IP address of the
   Controller and the stored public IP address if it is different from
   the actual public IP are displayed. To view these public IP
   addresses, go to Troubleshoot -> Diagnostics -> "Controller Public
   IP".

-  Proxy server support has been added on the UCC Controller for initial
   download and ongoing communication. During the Controller's initial
   setup, when prompted for "If the controller accesses the Internet
   through a proxy server, provide the following information, otherwise
   leave the fields blank", enter the server URLs for "HTTP Proxy" and
   "HTTPS Proxy". If the proxy server issues a self-signed certificate,
   upload a CA certificate.

-  The ability to setup proxy server setting for Internet connectivity
   in CloudN OVA has been added. To configure proxy server support, use
   "–setup\_network\_only {true\|false}" for clish command
   setup\_interface\_address and setup\_interface\_static\_address. Use
   clish command "setup\_network\_options {test\|save\|cancel}" to
   test/save/remove http/https proxy setting. Currently, "Datacenter
   Extension" and "Join Function" are not supported when proxy server is
   enabled.

-  Traceroute support has been added on gateways. To run "Trace Route",
   go to Troubleshoot -> Logs -> "Traceroute Utility".

-  For site2cloud, users can now select the route tables to be modified
   when "Encryption over ExpressRoute/DirectConnect" is enabled. Only
   subnets associated with the selected route tables will have tunnel
   connections to on-prem. To select route tables, go to Site2Cloud ->
   "Add New" and enable "Encryption over ExpressRoute/DirectConnect".
   Available route tables will show up in the "Route Tables to Modify"
   field.

-  The following APIs have been updated. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__.

   -  Added: update\_profile\_policy & add\_admin\_email\_addr

   -  Deprecated: add\_profile\_policy & del\_profile\_policy

   -  Changed: connect\_container & add\_vpn\_user

-  In the Aviatrix VPN client 1.2.49 release, Linux version AVPN client
   is now in the supported list. Linux version is only supported on
   Ubuntu.

UserConnect-121516
==================

-  Add support for three additional AWS regions: Ohio (us-east-2),
   Canada (ca-central-1) and London (eu-west-2).

-  Enable load balancer support for Azure ARM VPN gateway creation.

-  Add packet capture support for both Controller (CloudN only) and
   gateways. To run "Packet Capture", go to Troubleshoot -> Diagnostics.
   Select "Local" from "Gateway" list to capture packets on CloudN.
   Select a gateway name from "Gateway" list to capture packets on the
   particular gateway. The packet capture files are in .pcap format and
   can be downloaded for analysis.

-  Add traceroute support on Controller (CloudN only). To run "Trace
   Route", go to Troubleshoot -> Logs.

-  Extend the Peering HA support initiated at 102416 release from AWS to
   GCloud and Azure ARM. To enable this feature, go to Gateway ->
   "Gateway for High Availability Peering" to create the backup gateway
   first and then go to Peering -> "Encrypted Peering" to create the
   peering with "Enable HA" selected.

-  Add diagnostics tools for IPSec tunnels created through CloudN "Join
   Function". Go to "Advanced Config" -> "Join Function". Select the
   IPSec tunnel to run diagnostics on it. The following options are
   available: debug, ping, measure latency, restart services and check
   peering status.

-  Allow to add VPN users to each individual gateway (with ELB disabled)
   instead of the whole VPC. Select the gateway name from "LB/Gateway
   Name" list at OpenVPN® -> "VPN Users" -> "Add New" to add VPN users to
   that gateway.

-  Support migrating the same CloudN from one public IP address to
   another address. Go to Troubleshoot -> Diagnostics -> Migrate to
   migrate CloudN from its old public IP address to a new one.

-  Support Controller migration from the old CloudN to a new CloudN. Go
   to Settings -> "Backup & Restore" to run backup at the old CloudN.
   Launch a new CloudN with a different public IP. Go to Settings ->
   "Backup & Restore" to run restore at the new CloudN. The migration
   function will automatically update the new CloudN with its own public
   IP.

-  Support LDAP for Controller login. To enable it, go to Settings ->
   "Setup LDAP Login" to enable LDAP login first. Then add users at
   Accounts -> "Account Users" with local passwords. These account users
   should exist at LDAP server also. With LDAP login enabled, these
   users can log into Controller with their LDAP passwords. If LDAP
   login disabled, these users can log into Controller with their local
   passwords.

-  Allow credential change for AWS and GCloud accounts when the account
   credentials are changed by the cloud provider.

-  Support Okta along with "Client Certificate Sharing" when creating
   VPN gateways. Select "Okta" from "Two-step Authentication" list and
   select "Yes" for "Enable Client Certificate Sharing" when launching a
   new gateway. In previous releases, "Client Certificate Sharing" can't
   be enabled when Okta is used.

-  Allow users to customize the email notification (both email content
   and attachment file name) for VPN client. To configure it, go to
   OpenVPN® -> Configuration -> "User Defined Email Notification" to edit
   the file name or email content. The new email format will be used
   when a VPN certificate is issued.

-  Add support for the following new APIs. For details of the complete
   APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

   -  test\_ldap\_bind

   -  get\_gateway\_supported\_size

   -  get\_supported\_region

   -  list\_peer\_vpc\_pairs

   -  peer\_vpc\_pair

   -  unpeer\_vpc\_pair

-  Aviatrix VPN client 1.1.32 release

UserConnect-112816
==================

-  Added search capability to the Gateway list page. You can now search
   for gateways by any of the gateway attributes, such as Name, gateway
   instance size, account name, etc.

-  Added search capability to active VPN users list on dashboard. You
   can now search for active VPN users by all attributes, such as Name,
   Profile, Landing Gateway, etc.

-  CloudN "Join" function HA support. Join capability allows you to
   connect to an existing VPC with an IPSec tunnel. To enable HA, go to
   the Gateway page, click the gateway, and enable HA.

-  Remote Syslog enhancement. Enable remote syslog to optionally not be
   encrypted. To configure, go to Settings -> Loggings -> REMOTE SYSLOG,
   simply ignore the "cert" option.

-  Aviatrix SAML VPN client preview for GCloud. The new Aviatrix SAML
   client provides a seamless user experience when authenticating a VPN
   user through a SAML IDP. For customers who use SAML based Single Sign
   On (SSO) for a unified user authentication and access control to
   their applications, this new capability allows them to treat the
   Aviatrix VPN solution as another application that authenticates VPN
   users by an already established mechanism. This preview release has
   been tested on GCloud. Forgerock is the primarily tested IDP and Okta
   has been partially verified. The supported platforms for the Aviatrix
   SAML VPM clients are Mac OSX, Windows 10, and Windows 7.

UserConnect-102416
==================

-  Scale out encrypted peering support for AWS. You can create a cluster
   in a VPC that consists of up to 7 gateways, peering between two
   clusters in two VPCs increases packet throughput. To enable cluster
   encrypted peering, click Cluster Encrypted Peering under Peering tab.
   Preliminary iperf performance test shows TCP packet throughput can
   reach up to 8.5Gbps with bi-directional traffic. For more
   information, check out `Cluster Peering Reference
   Design <http://docs.aviatrix.com/HowTos/Cluster_Peering_Ref_Design.html>`__

-  Controller HA support. Create a standby controller in any region and
   any cloud (AWS, Azure ARM and GCloud). When the primary controller
   goes down, the standby controller takes over and becomes operational.
   To enable the feature, click Settings -> Controller HA -> Enable.
   Input the standby controller's public IP address. You also need to
   input standby controller's admin username and password for
   authentication purpose.

-  Enhanced peering HA support. The new peering HA feature reduces
   failover to a backup peering to under 2 seconds. To enable the
   feature, click Peering -> Encrypted Peering and enable HA. Note the
   current gateway HA support will be phased out in the future.

-  Transitive peering support for Azure ARM, Azure classic, GCloud and
   Azure China. Built on the earlier release of transitive peering
   support for AWS, this feature is now covered by all cloud types. This
   feature enables you to deploy a hub and spoke architecture of
   multiple VPCs in a simple point and click manner. To enable
   transitive peering, click Peer -> Transitive Peering.

-  Peering Diagnostics support. Troubleshooting peering tunnel status is
   made easy. Click Diag of the specific peer. Options are debug, test
   latency, ping and restart the tunnel.

-  Display the public IP address of the controller. This feature is
   useful for CloudN64 virtual appliance where its public IP address is
   needed for configuring Site2Cloud capability. To view the
   controller's public IP address, click Troubleshoot -> Diagnostics ->
   CONTROLLER PUBLIC IP.

-  Support all Azure ARM regions.

-  Support interoperability of Aviatrix gateway Site2Cloud to AWS VGW
   and Azure VPN Gateway. When configuring Site2Cloud, you can select
   the specific cloud provider VPN gateways to ensure encrypted tunnel
   work correctly.

-  Add REST API for CloudN64 Join features: allow subnet to VPC and
   delete subnet to VPC. For the complete APIs, refer to `API
   Document <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Services+Gateway+Controller+API+reference.pdf>`__

UserConnect-101016
==================

-  Add Mumbai (ap-south-1) to AWS region support list.

-  Support multiple Splunk indexers by importing Splunk config file.
   This enables Aviatrix controller and gateway logs to be integrated
   with multiple Splunk servers that many enterprises deploy. To
   configure, go to Settings -> Loggings -> Splunk. Select Import files
   to import a Splunk configuration file. You may also choose Manual
   Input, in this case each indexer must be listening on the same port.

-  Support DataDog agent for both controller and gateways. To enable, go
   to Settings -> Loggings -> DataDog, provide an API Key.

-  Enhancement for VPN user profile editing: when adding a user to a
   specific profile, only display those who do not belong to the
   profile. When deleting a user to a specific profile, only displays
   users who belong to the profile.

-  Support tooltip for many labels. Move mouse over a label, a detailed
   explanation displays for the label.

UserConnect-092216
==================

-  Support encryption over AWS peering. This capability allows two same
   region VPCs to send encrypted traffic to each other without going
   over Internet by leveraging AWS peering as underlying infrastructure.
   This mechanism significantly reduces data transfer cost. To use this
   feature, customer must configure AWS peering from AWS console between
   the two VPCs in the same region. To enable this feature, go to
   Peering -> Encrypted Peering -> New Peering. Check "Over AWS
   Peering". One use case for this feature is to enable NetApp OnTAP
   software to run in HA mode.

-  Support Azure ARM North Europe region.

-  Support Skyhook for Docker 1.12 release.

UserConnect-090416
==================

-  Support site2cloud use case where the gateway imports a template
   configuration file from a different Aviatrix gateway that initiates
   the configuration. This capability is useful to build IPSEC tunnels
   between two enterprises where each has its own Aviatrix UCC
   controller.

-  Support using Aviatrix CloudN as customer device for site2cloud
   connection. Follow these steps: 1) use UCC Controller to create a
   site2cloud connection by entering CloudN's public IP and subnet CIDRs
   for customer on-prem network. 2) On UCC Controller, select Aviatrix
   as vendor choice to download this site2cloud configuration file. 3)
   go to CloudN's site2cloud page and import the downloaded
   configuration file to establish the site2cloud connection.

-  Allow users to provide an optional IPSec pre-shared key when creating
   site2cloud connections. When the filled is left empty, UCC controller
   will automatically generate a pre-shared key.

-  Support HA for GCloud gateways with a zone selection option.

-  Update REST API to accommodate GUI 2.0 development

UserConnect-082116
==================

-  Support on GUI 2.0:

   -  Settings -> Change Password

   -  Settings -> Email

   -  Settings -> System Time

   -  OpenVPN® -> Profiles -> Edit -> Add New. Users can select subnets
      from VPCs/VNets without typing these CIDRs manually.

   -  Gateway -> Click "+" next to the gateway name. Users can display
      all VMs inside the gateway's VPC/VNet

-  VPN User list displays user email and associated profile information.

-  Allow users to setup VPN user license threshold notification. When
   license usage exceeds the threshold, email notification will be sent
   out to admin's account.

-  Azure Aviatrix gateway image is available at marketplace. There is no
   need to download gateway image to your storage account before
   launching a gateway. Instead, users need to subscribe to the Aviatrix
   Companion Gateway in Azure marketplace. This new capability
   significantly reduces Azure gateway deployment time. The Aviatrix
   Companion Gateway is free of charge. Please refer to startup guide
   for details.

UserConnect-072216
==================

-  GUI 2.0 becomes production. To access GUI 2.0, go to
   `https://controller\_ip/ <https://controller_ip/preview/>`__. Note:
   Old GUI is still available at https://controller_ip/v1/. All the new
   features developed in this release are only available for GUi 2.0.

-  **(Known issue: After upgrading to UserConnect-072216, the browser
   does not log out properly. You must type in https://controller_ip to
   re-login)**

-  Allow users to specify their own ELB names when creating AWS/GCloud
   VPN gateways. If no ELB name specified by users, Controller will
   provide a default ELB name.

-  Support AWS IAM role. When AWS IAM role is used, there is no need to
   enter AWS access key and secret key when creating a cloud account at
   Controller. Instead, two IAM roles will be created. Controller will
   use the role-based temporary security credentials to request access
   to AWS resources. Cloud account created by IAM role helps to reduce
   the risk of compromising AWS credentials. Please refer to `Aviatrix
   IAM role Configuration
   Guide <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`__
   for details.

-  Support AWS Geo VPN to include other cloud type's ELB DNS name. To
   configure, go to OpenVPN® -> Configuration to enable AWS Geo VPN
   first. Then you can add ELB DNS names from other cloud types to Geo
   VPN. With this capability, VPN gateway in Azure and GCloud can be
   included as part of Geo VPN solution.

-  Support gateway resizing without a need to terminate the old gateway
   and create a new one. This feature is available for AWS, Azure
   Classic, Azure ARM and GCloud but only on gateways without ELBs. To
   configure, go to Gateway, select the target gateway and desired size
   from "Gateway Size" dropdown list", click Change button.

-  Support an option to select subnet/availability zone when enabling HA
   for AWS. To configure, go to Gateway, select the target gateway and
   the desired subnet from "Backup Gateway Subnet" dropdown list, click
   "Enable HA" button.

-  Support an option to select ELB name when editing VPN gateway
   configuration. This feature is useful for GCloud network, which may
   have multiple ELBs, each in a different subnet. To configure, go to
   Advanced Config -> Edit Config and select the ELB from "LB Name"
   dropdown list.

-  Support to map multiple real CIDRs to multiple virtual CIDRs for
   site2cloud connection "mapped" connection. The multiple CIDRs need to
   be separated by a comma. The numbers and masks of the real CIDRs and
   corresponding virtual CIDRs must match each other.

-  A new Aviatrix IAM custom policy is provided with more restrictive
   rules and some additional rules to support role-based IAM.

UserConnect-063016
==================

-  GUI 2.0 for preview. To access GUI 2.0, go to
   https://controller_ip/preview/. Note: Old GUI is still available at
   https://controller_ip. GUI 2.0 doesn't support all the features
   available at the old GUI at this time.

-  Note: GUI 2.0 requires the controller to run on a instance with at
   least 4GB of memory. If your current controller does not meet this
   requirement, follow the procedure below:

   -  AWS controller: stop the controller instance, change instance type
      to t2.medium or larger, start the controller instance again.

   -  Azure Classic and Azure ARM controller: you can change the
      instance dynamically to at least D2 without stopping the instance
      first.

   -  Google Controller: stop the controller instance, change instance
      type to n1-standard-2, start the controller instance again.

-  Support site2cloud connection between customer network and cloud
   network where the two sides may have overlapping CIDRs. Only GUI 2.0
   support this feature. To configure, select "Mapped" for "Connection
   Type" and assign different virtual subnets to both customer network
   and cloud network.

-  GUI 2.0 dashboard displays IPSec tunnel status and link latency of an
   encrypted peering. When IPSec tunnel status of an encrypted peering
   flips between up and down, an email notification will be sent to the
   admin.

-  GUI 2.0 displays all VPN users added to the controller without
   selecting VPC ID/VNet name first. VPN users are sorted alphabetically
   for easy search.

UserConnect-052616
==================

-  Project Skyhook release: Docker swarm cluster container access
   support. From your desktop, you now can access Docker containers in a
   multi-host Docker swarm cluster built on a VXLAN overlay network that
   may span AWS, Azure and Google. To enable this feature, go to
   VPC/VNet -> VPN Access -> Skyhook: Docker Container Access. This
   feature is available on VPN gateways created after upgrade to this
   release. (If you have enabled ELB, delete the existing gateways and
   create new one. VPN user database are not affected.) For reference
   design on how to use this feature to access Docker containers, check
   out `this
   link <http://docs.aviatrix.com/HowTos/ContainerAccess.html>`__.
   Key benefits: a) MFA and user profile based access control apply to
   containers in the same manner as for instances. b) use the familiar
   tools such as curl, vim and wget on container without resorting to
   "docker exec" type of commands.

UserConnect-050316
==================

-  Enhance stability, manageability and debug ability for gateway launch
   and encrypted peering functions.

-  Support one load balancer in each different subnet of the same GCloud
   network.

-  Kernel 3.13.0-74 support on new gateway launches.

UserConnect-040316
==================

-  When VPN gateways are behind ELB, allow to import a new CRL URL
   without recreating VPN users/profiles or reissuing VPN certificates.
   To configure, delete all the VPN gateways first and then go to
   VPC/VNet -> VPN Access -> Certificate Management -> Import
   Certificates. Make sure that "CA Certificate", "Server Certificate"
   and "Server Private Key" are the same as before. The new CRL URL can
   be entered in "CRL Distribution Point URI" field. After finishing
   certificate management, recreate the VPN gateways behind ELB.

-  Enhance "Encrypted Peering" by verifying IPSec tunnel connection
   state after creating the peering.

-  Provide "Test HA" function for verifying VPC high availability. To
   test it, go to VPC/VNet -> VPC HA to enable HA for your gateway first
   and then click "Test HA" button to test HA function.

-  Enhance gateway creation by only listing the cloud types enabled in
   cloud accounts.

-  Allow to modify site2cloud connection and configuration template by
   editing “Cloud Networks” or “Customer Networks” CIDRs. To use this
   feature, go to VPC/VNet -> Site2Cloud -> List -> Edit. If changes
   need to be made for subnets/address spaces in VPC/VNet, select “Cloud
   Networks” to enter all VPC/VNet CIDRs. If changes need to be made for
   subnets in on-prem network, select “Customer Networks” to enter all
   on-prem CIDRs. This feature minimizes the configuration changes on
   customer sites by not having to delete the existing site2cloud
   connection.

UserConnect-032516
==================

First release for Azure ARM cloud support. If you currently have
deployments in Azure Classic, we recommend you skip this release. Azure
ARM is the new Azure portal that is significantly different in how API
works comparing with Azure Classic.

-  Support launching gateways in Microsoft Azure Resource Manager (ARM)
   VNet. Follow the embedded Aviatrix’s instructions to collect
   Application Endpoint, Application Client ID and Application Client
   Secret before creating a cloud account. The main feature supported by
   ARM in this release is Site2Cloud. Peering with ARM VNet is not
   supported in this release.

-  Site2Cloud supports to generate a configuration template for generic
   customer gateway devices.

-  Support security patches for both controller and gateways. To apply
   the software patch, go to Setting -> System -> Security Patches. The
   patch available for this release is glibc Vulnerability.

UserConnect-031016
==================

-  Support launching gateways in Microsoft Azure China. Azure China
   account is required to launch the gateways in Azure China.

-  Support launching gateways in Amazon AWS GovCloud. AWS GovCloud
   account is required to launch the gateways in AWS GovCloud.

-  Support Site2Cloud null encryption. This feature allows you to create
   an IPSec tunnel without encrypting the packets. To configure, go to
   VPC/VNet -> Site2Cloud -> Add and then select “Null Encryption”.

UserConnect-021516
==================

This release consists of a few significant features: GCloud Support,
Modular Split Tunnel Configuration, Site to Cloud, Encryption for Azure
ExpressRoute, Transitive Peering and VNet route diagnostics, as
described below:

-  Support Google Cloud (GCloud). The following major functions are
   available on GCloud for this release:

   -  Launch an Aviatrix Controller from GCloud directly. Follow `the
      instructions <http://docs.aviatrix.com/StartUpGuides/google-aviatrix-cloud-controller-startup-guide.html>`__
      to do so.

   -  From AWS/Azure/GCloud controller, you can now launch a gateway in
      GCloud.

   -  GCloud account creation, editing and deletion

   -  Multiple GCloud projects support

   -  GCloud gateway (with or without ELB, with or without VPN access)
      creation and deletion

   -  Gateway encrypted peering to other projects in GCloud and with AWS
      VPC and Azure VNets.

   -  Security policies at GCloud network level.

   -  Edit configuration (LDAP, DHCP, and Split Tunnel) on existing
      gateway

-  Support the ability to edit the split tunnel mode on existing VPN
   gateways. Previously, to make any split tunnel related configuration
   changes, users have to delete the existing VPN gateways and re-create
   new ones. With this release, when you add a new VPC/VNet and your VPN
   users need to access them via VPN, you just modify the CIDRs at
   “additional CIDRs” field at split tunnel configuration without
   deleting any existing gateways. To configure, go to VPC/VNet -> Edit
   Configuration-> Modify Split Tunnel. Note all additional CIDRs (the
   CIDRs that are not the VPC/VNet CIDR where VPN gateways are deployed)
   must be entered all together, separated by comma. For example, you
   have two new VPCs, 10.10.0.0/16 and 10.11.0.0/16, and you like to
   access them via split tunnel VPN. You must enter at the Modify Split
   Tunnel field “10.10.0.0/16,10.11.0.0/16” without the quote. In
   addition, you may need to add encrypted peering with the new VPCs in
   order for traffic to go through. The changes are effective
   immediately to the VPN gateway in the VPC/VNet. If there are multiple
   VPN gateways behind a load balancer, they are all updated at the same
   time. Active VPN users will be disconnected during this configuration
   time.

-  Support Transitive Peering. Transitive Peering enables you to route
   traffic from instances in Source VPC, encrypted, through a NextHop
   VPC gateway to reach a destination. Before creating Transitive
   Peering’, you need to make Encrypted Peering between Source VPC and
   NextHop VPC first. To create/delete Transitive Peering, go to
   VPC/VNet -> Encrypted Peering -> Transitive Peering.

-  Support site to cloud IPSec VPN connections. Using this feature, you
   can create IPSec VPN connections linking your on-prem networks to
   VPC/VNets in the cloud. To configure, go to VPC/VNet -> Site2Cloud.
   After adding a site2cloud connection, you can download a
   configuration template file for your on-prem devices (Only Cisco ASA
   configuration template is available now). If High Availability (HA)
   function is enabled, one gateway serves as the primary VPN connection
   endpoint and the other one serves as the backup. In case on-prem
   device loses the VPN connection to the primary VPN gateway, it can
   switch to the backup gateway to recover the VPN connection. Some
   diagnostic tools for site2cloud are also provided.

-  Support encryption for Azure ExpressRoute. This feature allows to run
   IPSec over Azure Express Route to ensure a higher security level. To
   enable it, first launch a gateway in a subnet dedicated for the
   gateway, then go to VPC/VNet -> Site2Cloud, click “Add” tab and
   select “Private Route Encryption”.

-  Support VNet route diagnostics. Go to Settings -> Troubleshooting ->
   VNet Route Diagnostics to find various VNet routing related
   diagnostics tools.

UserConnect-011316
==================

-  Support VPN certificates maintained by a third party PKI system.
   Third party PKI must be created before any gateway launch. To enable
   this feature, go to VPC/VNet -> VPN Access -> Certificate Management.
   Use this feature to import certificates and download VPN
   configuration files.

-  Support the ability to edit the LDAP settings on existing VPN
   gateways. Previously, to make any LDAP related configuration changes,
   users have to delete the existing VPN gateways and re-create new
   ones. With this support, you can enable, disable, or modify LDAP
   configuration on existing VPN gateways without deleting them. To
   configure, go to VPC/VNet -> Edit Configuration-> Modify LDAP
   Configuration.

UserConnect-121015
==================

-  Support remote syslog to a third party or Aviatrix syslog server. The
   feature allows 24x7 premium customer to forward both controller and
   gateway events to a customized Aviatrix syslog server for debugging
   and troubleshooting purpose. This feature improves customers network
   uptime. To enable this feature, go to Settings -> Setup loggings ->
   Remote Syslog.

-  Support the ability to push down to VPN user client the DHCP settings
   made in AWS VPC Console “Create DHCP Options Set” menu. For example,
   if you wish to change DNS name after the gateway has been launched,
   you can use this feature to make changes. The active VPN users will
   be disconnected when this feature is executed. To configure, go to
   VPC/VNet -> Edit Configuration -> Reload DHCP Configuration.

UserConnect-112415
==================

-  Support Sumologic logging collector. When enabled, syslog data from
   the controller and all gateways will be forwarded to a Sumologic
   account. To enable, click Settings -> Setup Loggings -> Sumologic

-  Add LDAP user search capability when Test LDAP Configuration to
   further test drive the correctness of a LDAP configuration.

-  Enable gateway High Availability capability with a pair of gateway
   instances in active and hot standby mode. To enable, go to VPC/VNet
   -> VPC HA.

-  Add Help me! for a drop down display of VPC/VNet in a specific region
   and cloud account.

UserConnect-112015
==================

-  Clean up onboarding messages and texts for Azure usage.

UserConnect-111015
==================

-  Support Geo VPN feature where a VPN user is connected to a nearest
   VPC. To enable Geo VPN, go to VPC/VNet -> VPN Access -> Geo VPN.

UserConnect-110615
==================

-  Bug fix to allow multi-AZ and PBR routing configuration scenario.

-  Added AZ display along with subnet info at gateway create.

-  Created Reference Designs.

UserConnect-102615
==================

-  Support 2FA DUO authentication to console log in, in addition to
   password credentials. The configuration is at Settings -> System ->
   Setup 2FA Login.

UserConnect-101615
==================

-  Support multiple controller and gateway clusters in the same VPC.

UserConnect-100115
==================

-  Support Okta authentication.

-  Support integration of Elasticsearch on the controller.

-  Support both allow and deny rules for each VPC security policies.

UserConnect-092815
==================

-  Support PBR event syslog for NAT translation of every TCP/UDP/ICMP
   session. The log describes the VPN user virtual IP address, source
   port and the destination IP address and port. By correlating with VPN
   username and its assigned virtual IP address, IT admin can uniquely
   track and identify every VPN users’ access activity history to both
   internal resource and external resource.

-  Support multiple users in admin privilege. Support multiple users in
   user account privilege.

UserConnect-092115
==================

-  Added hard token authentication support on DUO security. Made DUO
   authentication configuration optional. When “Token” is configured as
   the Push Mode for all gateways, user must append the 6 digits’ token
   number to their password.

   **Note: **

1. **All active VPN users will be disconnected for this upgrade duo to
   VPN server restart.**

2. **You must log out and log back in again for new features to take
   effect.**

3. **You need to run upgrade command two times.**

-  Support VPN user certificate re-issuing. When existing VPN user
   certificate is re-issued, the current certificate of the user is
   revoked and a new certificate is sent to the user.

-  Active VPN user on dashboard display is dynamically refreshed every 5
   minutes.

UserConnect-082815
==================

-  Support launch gateways in Microsoft Azure.

UserConnect-082515
==================

-  Support backup DUO push. When both LDAP and DUO are enabled, user can
   type #push1 or #push2 appending to the password field to specify
   which phone in the DUO device list to be notified for approval. For
   example, if a user John Smith’s password is johnsmith, he can type at
   password prompt johnsmith#push1 or johnsmith#push2 to specify the
   first phone or the second phone to be notified. If only password is
   typed in, the default phone (the first phone on the device list in
   DUO) will be notified.

   **Note: You must run upgrade command twice to have the upgrade take
   effect for this particular upgrade. All VPN users need to be deleted
   and added again as the existing certificates will not work with the
   new encryption algorithm. The first upgrade command may generate an
   exception, just ignore it and run upgrade again. **

   Suggested upgrade procedure: delete all existing users. Upgrade once
   and upgrade again, and then add users back.

-  Support enhanced encryption algorithms: AES-256-CBC, SHA512, TLS1.2
   and TLS-AUTH.

-  Detailed display of VPC/gateway on Dashboard. Clicking on the gateway
   name displays the complete configuration of the gateway.

-  Support REST API for all CloudOps commands.

-  Support the option to launch gateway when creating CloudOps VPC pool.

-  Support CloudOps Access IP address map history and initiator (from
   Console or from REST API).

-  Hash all password.

-  Add confirmation check when deleting a VPC or gateway.

-  Dynamically display controller logs on UI.

-  Bug fixes for out of order gateway command delivery and multiple
   identical users on the same gateway display.

UserConnect-081315
==================

-  Support for CloudOps VPC pool creation and CloudOps Read Me First.

-  Support additional route push to VPN client when split tunnel is
   enabled.

-  Disable password caching and credential saving in .onc file for
   Chromebook users.

-  Display profile name instead of command name in VPN active user
   Dashboard.

-  Fix typos in email notification sent to VPN users.

-  For UDP connections, send a disconnect message to VPN gateway
   immediately when the client terminates.

-  Fix release version alert problem.

UserConnect-072815
==================

-  Support Diagnostics on controller and gateways.

-  Added DNS name service for CloudOps Networking feature.

-  Dashboard performance improvement.

-  Enhance Chromebook VPN ONC file connection name to be profiled based.

-  Bug fix for logstash forwarder.

UserConnect-071615
==================

-  Support upgrades without terminating existing active VPN users unless
   specifically documented.

-  Various bug fixings.

-  General UI look and feel update.

UserConnect-070615
==================

-  Integrate LDAP configuration with Gateway creation to streamline
   provisioning process.

-  Display Profile fields in Active VPN User dashboard.

-  Support logstash forwarder to forward all syslog and auth log to
   designated logstash server.

-  Support software release version visibility.

UserConnect-061915
==================

-  Support template generation at create gateway and configure VPN
   access.

-  Support user activity history

UserConnect-061015
==================

-  Support operator account where operator can only access dashboard.

-  Support disconnect user from dashboard page.

UserConnect-060315
==================

-  Support capability to manage instances in overlapping CIDRs of VPCs.

-  Support dashboard for active user display.

UserConnect-052615
==================

-  LDAP client certificate import facility to support LDAP servers with
   TLS client verification

-  Support configurable action parameter in user profile policy

-  Support forwarding of syslog events to Logstash server

UserConnect-051515
==================

-  Support LDAP + Duo multi-factor combined authentication

-  Support configurable base policy for user profiles

-  REST API to change a VPN user’s profile

UserConnect-050915
==================

-  Support Chromebook as a VPN client.

-  Support DUO multi-factor authentication.

-  Support syslog display with regex filtering capability for each VPN
   gateway.

UserConnect-050215
==================

-  Support policy based routing on the VPN server to allow enterprise to
   re-direct traffic to its own backbone.

UserConnect-042315
==================

-  Support user authentication via Google 2-Step Verification process.
   Support multiple email domain names.

UserConnect-041715
==================

-  Support setting the maximum number of connections for each gateway.

-  Support NAT capability for each gateway.

-  Support both split tunnel and full tunnel mode for each gateway.

-  Support gateway size c4.2xlarge.

-  Support add and delete members on the Profile page.

UserConnect-032315
==================

-  Support user profile based security policies.

-  Support scale out and highly available OpenVPN® solutions for direct
   access to VPCs.

-  Support LDAP integration.

-  Support Windows, MAC OS and Chromebook clients.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
