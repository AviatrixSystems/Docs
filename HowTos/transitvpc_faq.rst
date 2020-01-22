.. meta::
   :description: onboarding Frequently Asked Questions
   :keywords: Aviatrix Getting Started, Aviatrix, AWS

============================
Transit VPC/VNET FAQ
============================


Why should I choose Transit architecture?
-------------------------------------------

Transit architecture is about building connectivity between cloud and on-prem in the most agile manner possible. In the Transit architecture, there is one connection (not including the backup) between on-prem and a Transit VPC. Everything else (the Spoke VPCs to on-prem traffic) is routed through the Transit VPC.

The alternative to Transit architecture (often referred to as "flat" architecture) is to build one connection, either IPSEC over Internet or Direct Connect, each time you spin up a new VPC or VNet in the cloud. This requires changes at the on-prem edge, which requires a change control process that takes from days to weeks.

How do I configure a Global Transit Network with Aviatrix solution?
--------------------------------------------------------------------

For Next Gen Transit Network for AWS deployment, follow the `Aviatrix Transit Gateway Orchestrator  Workflow <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_.

For Next Gen Transit Network for Azure deployment, follow the instructions `here. <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ 

Should I deploy one Transit Group for Dev and one for Prod?
------------------------------------------------------------

If your reason for two Transit hubs is security and a smaller blast radius, you need not worry about these when using Aviatrix solution. Simply create two Security Domains in your deployment. 

I have two regions and two Direct Connects, how do I build a multi region Transit solution?
-------------------------------------------------------------------------------------------------

Starting from release 4.1, `inter region transit network <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html#connecting-transit-gateways-in-multi-regions-multi-cloud>`_ can be connected directly. Follow the instructions `here <https://docs.aviatrix.com/HowTos/transit_gateway_peering.html#transit-gateway-peering>`_. 

I have more than 100 VPCs, how do I overcome AWS route limits (100)?
--------------------------------------------------------------------

When `AWS VGW carries more than 100 routes <https://aws.amazon.com/premiumsupport/knowledge-center/troubleshoot-bgp-vpn/>`_, its BGP session will crash unexpectedly, resulting in your network outage.

Azure network has similar limitations, the following techniques work for both cloud providers.

These are the options Aviatrix solution provides:

1. Summarizing Spoke VPC Routes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enable `Spoke VPC route summarization <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-to-summarize-spoke-vpc-cidr-ranges>`_ so that Transit GW advertise as few routes to VGW as possible. As long as you can control the number of total routes on the VGW not to exceed 100, the Transit Network can support as many Spoke VPCs as you need.

Aviatrix Controller sends out alert/warning messages when it determines that the total routes carried by the VGW exceeds 80. This is to alert you to start reducing routes carried by the VGW to avoid potential network outage. This alert message is sent each time there is a route VGW advertised from VGW to Transit GW.

2. By Pass VGW
~~~~~~~~~~~~~~~~

To permanently solve the route limit problem and not have to worry about summarizing routes at all and ever, use `External Device Option <https://docs.aviatrix.com/HowTos/transitgw_external.html>`_ to connect to on-prem directly over Direct Connect or the Internet. 


Can I launch multiple Transit GW groups from one Controller?
-------------------------------------------------------------

Yes, you can launch multiple Transit GW groups from one Aviatrix Controller. 
Simply start at `Transit Gateway Plan stage <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_ to create a new TGW in a different region or the same region.

I have a few high bandwidth applications, how do I deploy them in a Transit solution?
--------------------------------------------------------------------------------------

Aviatrix's `Insane Mode solution <https://docs.aviatrix.com/HowTos/insane_mode.html>`_ provides 10Gbps Transit network throughput. 


How can I fit an egress firewall into the Next Gen Transit solution?
----------------------------------------------------------------------

There are two types of requirements.

1. Egress Control Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your compliance requires egress policies and you have currently implemented AWS NAT gateways, consider using `Aviatrix Egress Control <https://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_, it is the most efficient way to provide a FQDN filter for all TCP/UDP protocols.  

2. Bring your own Firewall
~~~~~~~~~~~~~~~~~~~~~~~~~~~

If your security team requires inline IDS/IPS firewall function, consider `Transit DMZ architecture, <https://docs.aviatrix.com/HowTos/transit_dmz_faq.html>`_ which maximizes the firewall appliance performance by decoupling networking and security. 


What are the automation methods for Transit Network?
-----------------------------------------------------

There are multiple resources to help you automate Transit Network setup. Note that if you are building a Transit Network following the workflow, you should use the APIs documented below.

 - `Transit Network section in API doc <http://docs.aviatrix.com/HowTos/Aviatrix_Controller_API.html>`_.

 - `Terraform example. <http://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_

 - `Python API example for Transit Network <https://github.com/AviatrixSystems/TransitNetworkAPI_python_example>`_

Does Aviatrix Transit Network support HA?
------------------------------------------

You can enable multi AZ HA during the workflow when launching a Transit VPC gateway or Spoke VPC gateway.

Why are AWS t2 series instance types not recommended for production deployment on a Transit GW?
---------------------------------------------------------------------------------------------

When a t2 series Transit GW communicate with VGW over IPSEC, there is a 3% packet drop for packet size less than 150 bytes by Transit GW due to an issue with AWS Xen hypervisor and the kernel version GW is using. This will be fixed in a future release.

Note that this packet drop issue does not affect Spoke gateways.

How do I resize a Transit GW instance?
------------------------------------

Go to the Gateway page at the navigation bar, select the Transit GW, click Edit, scroll up to see the options and find Gateway Resize. Select the desired size and click Change.

Resizing a Transit GW requires the gateway instance to be stopped and started again in a different size. There will be network time for traffic between cloud and on-prem. There should be no downtime for traffic between VPCs as cloud to cloud traffic does
not go through the Transit GW.

During resizing, traffic will be switched to the backup Transit GW if HA is enabled, this will also switch Spoke to Transit traffic if Spoke VPC has HA enabled. Resizing a Transit GW will cause network downtime.

How do I know which Transit GW that a Spoke GW is sending traffic to?
----------------------------------------------------------------------

You can tell which Transit GW carries the network traffic from a specific Spoke VPC by going to Advanced Config -> BGP. Select the Transit GW and click Detail. If the list of the Advertised Network includes the Spoke VPC CIDR, this Transit GW routes traffic from the Spoke to on-prem; if it does not, check out the backup Transit GW.

How can I route VPC egress Internet bound traffic to on-prem to go through the corporate firewall?
---------------------------------------------------------------------------------------------------

If you advertise 0.0.0.0/0 to VGW, Spoke VPCs will have that route point to the Transit GW and route egress Internet traffic to VGW and back to on-prem. Make sure you do not have NAT enabled on the Spoke GW or AWS NAT service enabled in the VPC.

How do I know if the tunnel between the VGW and the Transit GW is up?
---------------------------------------------------------------

Go to Site2Cloud, the tunnel status is displayed for each connection.

How do I find out what routes being propagated from on-prem?
------------------------------------------------------------

On-prem routes are propagated to the VGW which in turn propagates to the Transit GW. There are two ways to see what learned routes are by the Transit GW:

1. Go to Site2Cloud, select the connection you specified at Step 3 during the Transit Network Workflow. Scroll down, you will see the Learned Network. Search for a learned route by typing a specific CIDR.
#. Go to Peering -> Transitive Peering. Click the box next to Destination CIDR column for a specific Spoke VPC GW. The Learned Routes will be shown and is searchable.
#. Go to Advanced Config -> BGP -> select a Transit GW, click Detail

How do I find out BGP information on a Transit GW?
-------------------------------------------------

Go to Advanced Config -> BGP -> Diagnostics, click the box for Predefined Show List. A list of BGP commands will be displayed. If you turn on debug command, make sure to turn it off when debug is finished to ensure the Transit GW is not flooded with debug
messages. Excessive debug messages reduce throughput.

How do I delete a Spoke GW?
-----------------------------

Go to Gateway page, select the gateway you wish to delete and click Delete.

An instance in a Spoke VPC cannot communicate with on-prem network, how do I troubleshoot?
-------------------------------------------------------------------------------------------

There are many reasons why an instance in a Spoke VPC cannot communicate with an on-prem host or VM.
The following troubleshooting steps may be helpful.

1. Make sure the `connection between VGW and Transit GW <http://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-do-i-know-if-the-tunnel-between-vgw-and-transit-gw-is-up>`_ is up.

#. Make sure the CIDR of the on-prem problem subnet (where VM or host is not reachable from a Spoke VPC instance) is propagated to Spoke VPC, that is, make sure Spoke VPC where the problem instance is deployed has `connectivity <http://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-do-i-find-out-what-routes-being-propagated-from-on-prem>`_ to the problem subnet in on-prem network.

#. Run traceroute by using an Aviatrix gateway as a test EC2. Launch a t2.micro instance Aviatrix Gateway from the `Gateway <http://docs.aviatrix.com/HowTos/gateway.html#gateway>`_ at the navigation bar (this gateway is going to be used as a test EC2 instance). Once this gateway is launched, you can run a `traceroute <http://docs.aviatrix.com/HowTos/troubleshooting.html#network-traceroute>`_ from this gateway (test EC2 instance) to the on-prem problem VM. (When the test is done, remember to delete the gateway to conserve consumption.)

#. Do a traceroute from the on-prem problem VM or host to the Aviatrix gateway test EC2 launched from the above steps.

#. You can do a packet capture by going to Troubleshoot -> Diagnostics -> PACKET CAPTURE. Select the right tunnel interface and run packet capture.

#. If the above tests pass, you should check security group settings on the instance and the destination VM.

How do I build encryption over Direct Connect?
------------------------------------------------

AWS provides native solutions to add VPN capability between VGW and on-prem over Direct Connect. This improves security as data in motion is encrypted. Follow `the instructions here <https://aws.amazon.com/premiumsupport/knowledge-center/create-vpn-direct-connect/>`_ for this capability.

We build an encryption between Aviatrix Transit GW and a VGW and between a Transit GW and a Spoke GW to provide an end to end encryption protection.

How do I build redundancy between VGW and on-prem?
--------------------------------------------------

AWS provides a few native options for redundancy between VGW and on-prem. You can build redundant active/active VPN connections, redundant active/active DX connections and DX with backup VPN connections.

`Read this doc <https://aws.amazon.com/answers/networking/aws-multiple-data-center-ha-network-connectivity/>`_ for implementation details.

How do I deploy user VPN use case on Transit Network solution?
--------------------------------------------------------------

We recommend you to deploy `user VPN <http://docs.aviatrix.com/HowTos/uservpn.html>`_ in a
shared service VPC. If this shared service VPC has connectivity to all other VPCs, a user can reach any instances in these VPCs as long as his/her profile policy allows.

Does Transit Network support Azure VNet?
------------------------------------------

Starting from Release 3.3, you can launch a Spoke gateway in Azure VNet. Best practice is to
setup the Azure VNet the same way you usually do with AWS VPC: two types of subnets, public subnets and private subnets with respective routing tables, where Spoke gateway is launched in public subnet.

.. tip::

 Note that in Azure there is no explicit concept of public subnet. The idea here is to set up separate subnets and respective routing tables for Aviatrix gateway and user VMs. For convenience, we use the term "public subnet" to describe the subnet where Aviatrix Spoke gateway is launched.

Such separation of subnets and routing tables provides you with the flexibility if you plan
to use Spoke gateway also for FQDN functions.

Why do I receive BGP overlapping address alert emails?
-------------------------------------------------------

When Aviatrix Controller detects that on-prem propagated routes overlap or are a superset of Spoke VPC
CIDR ranges, it sends an email to admin, alerting a potential misconfiguration. Such email is
sent once when a route change event occurs, for example, when BGP routes are flapping.

The feature is enabled by default. If you wish not to receive the alert email, you can disable it.

Go to Advanced Config -> BGP -> Overlapping Alert Email. Click to disable.

How to summarize Spoke VPC CIDR ranges?
-----------------------------------------

If you have a large number of Spoke gateways attached to a Transit GW that
you are concerned about exceeding the route limit a VGW can carry (100),
you can summarize the Spoke VPC CIDRs.

Before you configure summarization, make sure your Transit network meets the `prerequisite <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#what-is-the-prerequisite-to-summarize-spoke-vpc-cidrs>`_

Go to Transit Network -> Advanced Config -> Edit Transit, select the Transit GW. (This Transit GW is created when you complete `Step 1 at the Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-a-transit-gateway>`_.)

After you select Transit GW, scroll down to "Manual BGP Advertised Network List", as shown below. Enter the summarized CIDR ranges and click Change BGP Manual Spoke Advertisement. You can enter a list of CIDRs separated by commas.

|bgp_summarize|

To disable this feature, simply remove the list to make the entry empty and then click Change BGP Manual Spoke Advertisement.


How to move a Spoke gateway to a different AZ?
----------------------------------------------

Follow the steps below:

 1. `Detach the Spoke gateway <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#remove-a-spoke-gw-from-a-transit-gw-group>`_ from the Transit Network group.
 #. Delete the Spoke gateway.
 #. Launch a new Spoke gateway in the desired AZ following the Transit Network solution workflow.
 #. `Attach <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#join-a-spoke-gw-to-transit-gw-group>`_ the Spoke gateway.

What is the prerequisite to summarize Spoke VPC CIDRs?
-------------------------------------------------------

If you see the error below when configuring `Spoke VPC CIDR manual summarization <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#how-to-summarize-spoke-vpc-cidr-ranges>`_, your
Transit network is not ready for summarization.

|bgp_summarize_error|

The prerequisite for manual advertising is that all traffic from Spoke to Transit must be either on primary gateway path or backup gateway path.

Before fixing the error, click the Peering page at the main navigation bar. In the example shown below,
spoke1 primary gateway is in Active state, however spoke2-hagw is in Active state.

|spoke_to_transit_inconsistent|

This inconsistency can be fixed by force switching spoke2 VPC to use the primary gateway, as shown below.

|force_switchover_spoke2|

Before you can summarize Spoke VPC CIDRs, you must make sure Spoke gateways all use either the primary gateway or all use the backup gateway if backup is enabled. 

How to build Spoke to Spoke connectivity via Transit?
------------------------------------------------------

Starting from release 3.5, Transit network supports `Connected mode. <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_ where Spoke to Spoke connectivity is built automatically.

How do a Spoke gateway and VPC private DNS work together?
----------------------------------------------------------

All Aviatrix gateways use a well known public DNS server for their hostname resolutions. This is necessary as the gateway must
access services such as AWS SQS to retrieve messages from the Controller and the accessibility cannot depend on underline connectivity.
This is true even when a VPC has private DNS configured via its DHCP options, that is, while all EC2 instances use the private DNS
to resolve hostnames, Aviatrix gateways use a well known public DNS for its own hostname resolution needs.

On the other hand, Aviatrix also provides a feature `"Use VPC/VNet DNS Server" <https://docs.aviatrix.com/HowTos/gateway.html#use-vpc-vnet-dns-server>`_ which allows you to force the Aviatrix gateways to use a private DNS server. This is useful in certain usecases, for example, the organizations' Splunk server is hosted on prem with a private IP address. Another usecase is when Aviatrix Egress FQDN is enabled for non HTTP/HTTPS ports, the Aviatrix gateway must use the VPC's DHCP option in order to accurately obtain the IP address
of a given hostname.

There is a caveat when the "Use VPC/VNet DNS Server" is applied to a Spoke gateway where the custom DNS server is on-prem or is only reachable through the IPSEC tunnels.

If the Spoke gateway has HA enabled, it will have an issue when the "Use VPC/VNet DNS Server" feature is applied to the primary Spoke gateway. After the initial
configuration, the system should work as intended. However, if a primary Spoke gateway fail over to backup gateway, and
the system attempts to fail back again, it will have a problem.

The reason is that
the Aviatrix primary gateway, after the first failover, has lost connectivity to the private DNS since the tunnel is down. However,
the primary gateway must first obtain messages from the AWS SQS sent by the Controller to execute and reestablish the tunnel.
Therefore the Spoke gateway will be stuck and the tunnel will remain down. The situation can be resolved by disabling the "Use VPC/VNet DNS Server" on the Spoke gateway.

As a rule of thumb, in a Transit Network, if you would like to have the Aviatrix gateways use a private DNS server, this DNS server must be
reachable regardless of the network tunnel status.

How does the Aviatrix Transit Network solution differ from Cisco's CSR-based solution?
----------------------------------------------------------------------------------------
They differ in the following areas:

 - **Central Control** - With the Aviatrix solution, the Aviatrix Controller is the single pane of glass for all networking in the cloud.

 - **AWS Transit Gateway Integration** If you have AWS deployment, Aviatrix Next Gen Transit integrates with an AWS TGW seamlessly for high bandwidth Spoke VPC connection. Customers who do not require end to end encryption can now use the TGW native service to connect the Spoke VPCs.

 - **Network Segmentation** - In the CSR-based solution, all Spoke VPCs have connectivity to each other through the Transit GW, even though these Spoke VPCs belong to different AWS accounts or business teams. In contrast, in the Aviatrix solution the Spoke VPCs have no connectivity to each other, by default. Connectivity is built by design. With the TGW integration, you can customize the `Security Domains <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-security-domain>`_ to meet your segmentation requirements.

 - **Connectivity Efficiency** - In the Aviatrix solution, traffic between any two Spoke VPCs can be routed via TGW or directly, as opposed to going through the instance based Transit GW as required by the CSR-based solution. Decoupling the different traffic streams reduces performance bottlenecks and removes single failure points.

 - **No unwanted route propagation** - Since Spoke VPCs run BGP in CSR solution, if a Spoke VPC also connects to a partner network via VGW, the partner network routes could be propagated to your own on-prem network.

 - **Simplicity** - In Aviatrix's solution, BGP is only deployed between Transit GW and VGW. No Spoke VPCs run BGP. Simplicity leads to stability. Workflow-based, step-by-step instructions help you build out a Transit VPC solution in minutes.

 - **Monitoring** - The Aviatrix solution integrates with Splunk, Sumo, remote syslog, ELK and DataDog to forward events from gateways to your favorite central logging service.

 - **Scalable** - AWS has various limits in its infrastructure, such as a route entry limit of 100. This limits how many on-prem CIDRs and VPC CIDRs can be carried on a Transit GW. The Aviatrix solution overcomes that limitation.

For a fun read, here is a `blog on the differences <https://www.aviatrix.com/blog/aviatrix-global-transit-solution-differ-csr-solution/>`_



.. |bgp_summarize| image:: transitvpc_faq_media/bgp_summarize_transit_adv_page.png
   :scale: 60%
   
.. |bgp_summarize_error| image:: transitvpc_faq_media/bgp_summarize_error_adv_page.png
   :scale: 60%
   
.. |force_switchover_spoke2| image:: transitvpc_faq_media/force_switchover_spoke2.png
   :scale: 30%

.. |spoke_to_transit_inconsistent| image:: transitvpc_faq_media/spoke_to_transit_inconsistent.png
   :scale: 30%

.. disqus::
