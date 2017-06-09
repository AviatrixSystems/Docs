.. meta::
   :description: Encryption over Express Route
   :keywords: Encryption, Azure, encryption over azure, ExpressRoute, Aviatrix

######################################################
Encryption over Azure ExpressRoute
######################################################



The Problem
------------

Azur ExpressRoute provides a private routed circuit to Azure VNet. The
VNet VPN gateway that terminates the ExpressRotue connects VNet virtual
machines with the on-prem servers in a traditional routing domain. While
Azure ExpressRoute provides a private link between customer’s on-prem
network and Azure VNet without going through Internet, packets between
on-prem edge and VNet travel through exchange points and third party
provider networks and are not encrypted. If encryption is a requirement
for security and compliance reasons, this is a problem.


Aviatrix Solution for Encryption over ExpressRoute
---------------------------------------------------

Aviatrix site2Cloud solution can be applied to encrypt traffic over
ExpressRoute, as shown below.

      |image0|

In the diagram above, an encrypted IPSec tunnel is established between
Aviatrix gateway and customer’s edge router.

Aviatrix gateway is deployed in a separate subnet from the subnets where
user virtual machines are launched. (The controller is not drawn.) This
is necessary as the Aviatrix gateway is the router for user subnets to
reach Enterprise datacenter.

Aviatrix gateway can be deployed in a 1:1 redundancy fashion where a
backup gateway is ready to take over should the primary IPSec tunnel
goes down due to gateway VM hardware/software failure.


The Aviatrix Benefits
----------------------

Aviatrix gateways are deployed and managed by an Aviatrix Cloud Connect
Controller (not shown in the diagram) which itself is a cloud instance
or VM. Some of the benefits are highlighted below:

-  The gateway interoperates with third party routing and firewall
   devices.

-  The gateway is launched from the controller web console with a few
   clicks.

-  Aviatrix gateways support 1:1 redundancy for high availability
   without any additional helper instance or VM. The controller monitors
   all IPSec tunnel status and automatically re-program the cloud
   infrastructure routing table and switch to a standby gateway instance
   when the tunnel goes down.

-  The controller provides diagnostic capabilities for troubleshooting
   the gateway and IPSec tunnel status.

-  Cloud VPN capability is integrated with the gateway, which enables
   individual users at remote sites to connect to VPC/VNet securely and
   directly without having to hair pining back to headquarter
   datacenter.

-  Extensive logging allows administrators to have complete visibility
   of network event and user browsing history.

Configuration Workflow
-----------------------

Before you start make sure you have the latest software by checking the
Dashboard. If an alert message displays, click Upgrade to download the
latest software.

For the network design, you need to decide if you want to enable HA for
the gateway.

The configuration workflow is as follows, with major steps highlighted.

| 1. (Optional) Enable HA
|     Go to VPC/VNet -> site2Cloud -> Options, select Enable HA, then Save.

|

| 2. Create a gateway in a VNet where you like to connect to enterprise datacenter.
|     Go to Gateway -> Create, make sure:

      -  The gateway is launched in different subnet from the user subnets. In this example, the gateway is deployed on Subnet1.

      -  The gateway may have VPN access disabled

| 3. (Optional) If HA is enabled, create a backup gateway in the same VNet.
|     Go to Gateway -> Create, make sure:

    -  The gateway is launched in different subnet from the user subnets. In
       this example, the gateway is deployed on Subnet1.

    -  The gateway may have VPN access disabled.

| 4. Create a connection to the Enterprise datacenter
|    Go to VPC/VNet -> site2Cloud -> Add, make sure,
|
|   a. Select the VPC/VNet Name where Aviatrix gateway for encryption is launched.
|   b. If HA is not enabled:
|      i. At Gateway field, select a gateway launched earlier for encryption.
|   c. Else if HA is enabled:
|      i.  At Primary Gateway field, select a gateway launched earlier as primary gateway.
|      ii.  At Backup Gateway field, select a gateway launched earlier as backup gateway.
|   d. Input the connection with a unique name, for example, FirstExpressRoute
|   e. At Customer Gateway IP Address, enter the public IP address of the edge router for Enterprise datacenter.
|   f. At Customer Network, enter network CIDR of the Enterprise datacenter. If there are multiple subnets, enter each one separated with comma.
|   g. Check Private Route Encryption:
|     i. At Cloud Subnet fields, enter Subnet2 and Subnet3 in CIDR format. For example, if Subnet2 is 10.10.1.0/24 and Subnet3 is 10.10.2.0/24, enter “10.10.1.0/24,10.10.2.0/24”.
|


| 5. Generate Enterprise datacenter configuration template
|    Go to VPC/VNet -> site2Cloud -> List,
|
|   a. Select the connection.
|   b. Click Download.
|   c. If your remote edge device is not listed in the dropdown menu, simply select an available one in the menu.
|   d. Click “Yes, Download” to download a template file that contains
      the gateway public IP address, VPC CIDR, pre-shared secret and
      encryption algorithm. Incorporate the information to your remote
      router/firewall configuration.
|
| 6. At the Enterprise datacenter or remote site, configure encryption on the edge device.
|   Make sure your peer network is Subnet2 and Subnet3, as shown in this example.
|

Troubleshooting
---------------


To check a tunnel state, go to VPC/VNet -> site2Cloud -> List, click on
the remote site name, the tunnel status will be displayed in a pop up
window.

To troubleshoot a tunnel state, go to VPC/VNet -> site2Cloud ->
Diagnostics.

For support, send email to support@aviatrix.com.

For feature request and feedback, click Make a wish at the bottom of
each page.

Enjoy!

.. |image0| image:: EncOverExpRoute_media/image1.png
   :width: 5.55625in
   :height: 3.26548in
