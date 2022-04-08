.. meta::
  :description: TGW Plan
  :keywords: Transit Gateway, AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Plan
=========================================================


The AWS Transit Gateway (TGW) Orchestrator Plan is the first stage in deploying a AVX Transit Network using AWS Transit Gateway. 
After you go through the Plan stage configuration, you can proceed to the `Build stage <https://docs.aviatrix.com/HowTos/tgw_build.html>`_ 
to attach VPCs. 

For background information, see the `AWS Transit Gateway Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

The plan stage consists of 4 sections:

 1.  **Create AWS Transit Gateway**. This is the only must-do section in Plan before you start to Build (attach VPCs). See the Creating an AWS TGW section below. In this section, an AWS Transit Gateway and three connected network domains are created.  

 #.  **Create Segmented Network** (optional). It consists of the Creating a new Network Domain and Building Your Domain Connection Policies sections below. This section creates your own additional network domains and connection policies. This section is entirely modular and you can modify at any time. 

 #.  **Create hybrid, multi-region or multi-cloud Connection** (optional). It consists of the Setting up an Aviatrix Transit GW, Preparing an Aviatrix Transit GW for TGW Attachment, and Attaching an Aviatrix Transit GW to TGW sections below. This section launches an Aviatrix Transit Gateway at the edge VPC, builds a hybrid connection to on-prem or another Aviatrix Transit gateway cluster, or deploys Transit DMZ . If you need hybrid connectivity, setting up an Aviatrix Transit GW, preparing an Aviatrix Transit GW for TGW Attachment, and attaching an Aviatrix ransit GW to TGW must all be executed and in sequence to complete this section. This section is entirely modular and you can modify at any time.
 
 #. **TGW Native Edge Connections** (optional). This creates TGW VPN, TGW DXGW and TGW Inter Region Peering. It consists of the steps described in the Setting up an AWS Transit Gateway VPN Connection and Downloading the VPN Configuration sections below. 
 
In the planning stage, think about what network segmentation you need to achieve. For example, do you need to segment Dev/QA VPCs 
from your Prod VPCs, i.e., no connectivity is allowed between these VPCs in each group? The plan stage creates Transit Gateway and Transit Gateway route tables in AWS. There is no charge either by AWS or Aviatrix.


If you have not decided on network segmentation, you can proceed to build a full mesh network by using the `Default_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_. 

.. tip::

 You can modify your plan at any time by returning to the Plan page to create network domains and change connection policies.  


The Transit Gateway Orchestrator Plan workflow provides step-by-step instructions to define and set up your policies.


Creating an AWS TGW
-------------------------------------------

In order to use AWS Transit Gateway service, you must first create a AWS Transit Gateway. 

This step creates a AWS Transit Gateway in a specified region with a specified AWS account, the Aviatrix Controller also automatically creates 
the `Default_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_, the `Shared_Service_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_ and the `Aviatrix_Edge_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-aviatrix-edge-domain>`_ and the corresponding AWS Transit Gateway route tables. 

|create_tgw|

Note that the three domains are connected, implying that if you attach a VPC to the Default Domain or Shared Service Domain, the VPCs can communicate with each other and can access on-prem through the Aviatrix Edge Domain.  


==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS. 
Region                                          One of the AWS regions
TGW Name                                        The name of the AWS Transit Gateway
AWS Side AS Number                              TGW ASN number. Default AS number is 64512.
==========================================      ==========

After AWS Transit Gateway is created, you can validate by going to `View page <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-can-be-displayed-at-the-view-page>`_ and seeing what has been created. 

--------------------------------------------------------------------------------------------------------------------

This section includes creating a new network domain and building your domain connection policies to plan a segmented network. 

Creating a New Network Domain
--------------------------------------------------

If you plan to build a `default network (full mesh) <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html#Full-mesh-network-design>`_, skip this section. 

You can make changes to your network segmentation at any time. 

If you plan to build a segmented network, use this section to create a new `network domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#What-is-a-Security-Domain>`_ and setup `connection policies <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-a-connection-policy>`_. 


In the example below, a new domain called prod_domain is created. 

|new_domain|

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
TGW Name                                        The name of the AWS Transit Gateway
Network Domain Name                             Specify a unique domain name: for example, Dev_Domain.
Aviatrix Firewall Domain                        Check this box if this domain is for Aviatrix FireNet.
Native Egress Domain                            Check this box if this domain is for non-Aviatrix FireNet based central Internet bound traffic. Native Egress Domain is not recommended as it only supports an active-standby firewall deployment. 
Native Firewall Domain                          Check this box if this domain is for non-Aviatrix FireNet  based firewall traffic inspection. Native Firewall Domain is not recommended as it only supports an active-standby firewall deployment.
==========================================      ==========

Building Your Domain Connection Policies
----------------------------------------------------

This step specifies the connection relationship of one domain to others. Two connected domains imply that VPCs in 
each domain can communicate with each other despite the fact that they are in different domains. The Aviatrix Controller takes
care of both the VPC route table and AWS Transit Gateway route table programming and updates. 

On the **TGW Orchestrator > Plan** tab, under Add/Modify Connection Policies, highlight a domain on the left panel and click **Add**. The domain now shows as being Connected. 

In the example shown below, the intention is to connect the newly created prod_domain in the Create a Network Domain section above to the Aviatrix_Edge_Domain so that VPCs in the prod_domain can communicate with on-prem servers and hosts. 

|connect_domain_1|

Continuing from the above example, you can connect prod_domain to Shared_Service_Domain, as shown below. 

|connect_domain_2|

Click the View page under AWS Transit Gateway Orchestrator and click each expandable circle to see what has been created, 
as shown below.  

|plan_view|

-----------------------------------------------------------------------------------------------------------------------

This section is for hybrid, multi-region or multi-cloud connections. It sets up connection to an on-prem data center over 
Direct Connect or the Internet. 

Setting up an Aviatrix Transit GW  
------------------------------------------------------------------

This section describes deploying Aviatrix Transit Gateways in a VPC and attaching the VPC to the TGW. From the TGW point of view, this VPC is a Spoke VPC attached to TGW, however from the Aviatrix Controller point of view, the Aviatrix Transit Gateway is the packet forwarding engine to on-prem or to another Aviatrix Transit Gateway. The direct attachment architecture allows the Aviatrix Transit Gateways to forward packets to TGW and Spoke VPCs 
at the rate of 50Mbps as specified by TGW. 

The use case for this deployment is to use Aviatrix Transit Gateway to connect to on-prem or to peer with another Aviatrix Transit Gateway. 

If you intend to use `TGW DXGW to connect to on-prem <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-direct-connect>`_ , `TGW VPN to connect to on-prem <https://docs.aviatrix.com/HowTos/tgw_plan.html#setup-aws-transit-gateway-vpn-connection>`_ or use `native TGW Peering to 
connect to regions <https://docs.aviatrix.com/HowTos/tgw_plan.html#tgw-inter-region-peering>`_ , skip this section. 

Return to this section anytime if your requirements change. 

.. tip::

  We strongly recommend creating a new Transit VPC at `Useful Tools > Create a VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_. Select **Aviatrix Transit VPC**. 
  If you would like to use an existing VPC and its network CIDR is too small (not enough of /28 unused CIDR segments), use AWS Edit VPC CIDR feature to create a new /23 subnet to deploy the Aviatrix Transit Gateway in the TGW use case. 

To deploy the Aviatrix Transit Gateways, take a detour and complete Step 1 & 2 in the `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_. If you intend to use Aviatrix Transit Gateway to connect to on-prem. Also complete `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_.

When complete, return to this section and continue to the next step in this workflow to Enable Aviatrix Transit GW to TGW. 


Preparing the Aviatrix Transit GW for TGW Attachment
--------------------------------------------------------------------

The Aviatrix Transit GW created in the Setting up an Aviatrix Transit GW section above does not build an IPsec tunnel to an AWS Transit Gateway. The networking between AWS Transit Gateway and the Aviatrix Transit GW is via the AWS VPC infrastructure.

This step designates an Aviatrix Transit GW to be used in conjunction with the AWS Transit Gateway. 
It creates a second Ethernet interface eth1 on the Aviatrix Transit GW for sending and receiving packets from AWS Transit Gateway. 
It also creates two subnets, -tgw-ingress and -tgw-egress  and two respective route tables in the edge VPC to route packets to and from AWS Transit Gateway. 

|prepare_tgw_attach|



==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Cloud Type                                      AWS or AWS Gov Cloud
Aviatrix Transit Gateway Name                   Select a Transit GW from the dropdown menu. 
==========================================      ==========

Attaching an Aviatrix Transit GW to TGW
------------------------------------------------------------------

This step attaches the Aviatrix Edge VPC to the AWS Transit Gateway and the Aviatrix Edge Domain, thus allowing the Aviatrix Transit GW to send and receive packets from AWS Transit Gateway. 

In this step, route entries are added to the two created private subnet route tables as described in the table below.

==========================================      ===============     ==================    =================
**subnet**                                      **route table**     **route entry**       **description**
==========================================      ===============     ==================    =================
-tgw-egress (for eth1)                          -tgw-egress         0.0.0.0/0 -> TGW      for traffic from Aviatrix Transit GW to TGW
-tgw-ingress                                    -tgw-ingress        0.0.0.0/0 -> eth1     for traffic from TGW to Aviatrix Transit GW
==========================================      ===============     ==================    =================

.. Note::
 
 There is no IPsec tunnel between AWS Transit Gateway and the Aviatrix Transit GW. The Aviatrix Transit GW behaves as an EC2 instance in a Spoke VPC (The Aviatrix Edge VPC) attached to the AWS Transit Gateway, as shown in the diagram below. Such a setup allows Aviatrix Edge VPC to leverage the high performance provided by AWS Transit Gateway. 

|transit_complete|

After you finish these steps, your hybrid connection using Aviatrix Transit Gateway for TGW setup is complete. 
In the above example, 
if you have any Spoke VPCs attached to the prod_domain, EC2 instances should be able to communicate with 
on-prem. (Make sure instance security groups and any on-prem firewalls are configured properly.)

------------------------------------------

This section consists of TGW native VPN, Direct Connect, and TGW Inter Region Peering functions. 

Since TGW does not propagate learned routes from DXGW or VPN to Spoke VPCs, Aviatrix Controller solves 
this problem by periodically polling the TGW route table and programming the learned routes to attached Spoke VPCs.

Setup AWS Transit Gateway VPN Connection
--------------------------------------------------------


Setting up a VPN Connection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This function configures a native TGW VPN. You first configure, and then download the configuration. 

This step creates a VPN connection from TGW in a selected network domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
AWS Transit Gateway Name                        The name of a TGW created by `TGW Plan <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_ by Aviatrix Controller
Connection Name                                 A unique name for the VPN connection
Remote Public IP                                Remote site public IP address
Dynamic (BGP) or Static                         Use BGP to connect to remote site or static IP
Remote CIDRs                                    When Static is selected, enter a list of CIDRs separated by comma. 
Remote AS Number                                When Dynamic is selected, enter the AS number of the remote site. 
Network Domain Name                             Select a network domain to associate the VPN attachment with
Learned CIDR Approval                           Select the option to enable `Approval <https://docs.aviatrix.com/HowTos/tgw_approval.html>`_. This option applies to Dynamic (BGP) mode only.
Global Acceleration                             Select the option to enable AWS Accelerated VPN
==========================================      ==========

Downloading the VPN Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Refresh the screen to see the newly created VPN connection.

If Static VPN is configured, you must go to the AWS Console > VPC > Site-to-Site VPN Connections to download the
configuration file. 

If Dynamic VPN is configured, click **Download** to download the configuration.

Setting up AWS Transit Gateway Direct Connect
----------------------------------------------------------

This section configures a native Direct Connect from TGW. This step can take more than 10 minutes for the connection to 
be ready.

Setting up Direct Connect
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step assumes that you have created Direct Connect Gateway and Transit Virtual Interface from AWS Console.

.. Note ::

  You may need to `update the Controller IAM policies <https://docs.aviatrix.com/HowTos/iam_policies.html#updating-iam-policies>`_ for this function. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
AWS Transit Gateway Name                        The name of a TGW created by `TGW Plan <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_
Direct Connect Gateway Account Name             The Aviatrix Access Account name that created AWS Direct Connect Gateway
AWS Direct Connect Gateway                      The AWS Direct Connect Gateway you created from AWS Console
Allowed Prefix                                  A list of comma-separated CIDRs for DXGW to advertise to remote (on-prem)
Network Domain Name                             Select a network domain to associate the VPN attachment with
Learned CIDR Approval                           Select the option to enable `Approval <https://docs.aviatrix.com/HowTos/tgw_approval.html>`_. This option applies to Dynamic (BGP) mode only.
==========================================      ==========

Updating Direct Connect Network Prefix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use this step to update the Allowed Prefix to advertise to on-prem.

TGW Inter Region Peering
---------------------------------

TGW inter-region peering is a feature where Aviatrix Controller orchestrates AWS TGW peering. In addition, the 
Controller programs and propagates network CIDRs of Spoke VPCs and Edge Domains in a network domain to 
the remote TGW deployment, thus providing the end-to-end turnkey solution. 

It takes two steps to connect two network domains in two regions. 

.. tip::

  Your Controller may not have the latest IAM policies to execute TGW peering. Navigate to Accounts > Access Accounts and select the account where TGW is deployed. Click **Update Policy**. Do so for all TGW accounts if you wish to TGW build inter-region peering.



Creating a TGW Peering Attachment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This step connects two TGWs in different regions using AWS native TGW Peering. It automatically creates two network domains associated with each TGW and respective attachment ID. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Cloud Type 1                                    Select AWS or AWS GovCloud
Region 1                                        Select a region where the one TGW is deployed
AWS Transit Gateway Name 1                      Select an AWS TGW Created `here <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_
Cloud Type 2                                    Select AWS or AWS GovCloud
Region 2                                        Select a region where the peering TGW is deployed
AWS Transit Gateway Name 2                      Select an AWS TGW Created `here <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_
==========================================      ==========

Inspecting Inter Region Traffic 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Starting from Release 6.1, the network domain associated with each TGW Peering attachment is available for users. The network domain has the
name `peering_<TGW NAME>`. For example, for the TGW with name tgw-1, the peering network domain is `peering_tgw-1`. 

You can specify FireNet inspection policy on this network domain. When you do so, it implies that any cross-region traffic 
is inspected. Use **TGW Orchestrator > Plan > Add/Modify Connection Policies** to connect the peering domain with the FireNet Domain. 

.. note::

 To avoid double inspections by two FireNet gateways associated with each TGW, configure the connection policy between peering domain and FireNet domain on only one TGW. 

Building Connection Policies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

After step a is completed, go to `Add/Modify Connection Policies  <https://docs.aviatrix.com/HowTos/tgw_plan.html#build-your-domain-connection-policies>`_. Refresh the page. The peered TGW with its network domains should appear under
Not connected. Select one remote network domain and click **Add**. Repeat this step for all intended connections, 
as shown in the diagram below. 

|tgw_peer|

In the diagram above, Dev-1 Domain of TGW-1 has connection policy to Dev-2 Domain of TGW-2. Any VPCs in Dev-1 Domain 
can communicate with VPCs in Dev-2 Domain.  

Similarly, Prod-1 Domain of TGW-1 has connection policy to Prod-2 Domain of TGW-2. Any VPCs in Prod-1 Domain can
communicate with VPCs in Prod-2 Domain. However, Dev-1 cannot communicate with Prod-2 if there is no connection 
policy between them. 

--------------------------------------------------------------------------------------

This section consists of delete functions.

.. note::

 To delete an Aviatrix Transit GW attached to a AWS Transit Gateway, go through the Setting up a VPN Connection and Updating Direct Connect Network Prefix sections below. Then, go to Controller Gateway page to terminate the gateway instance.


Detaching Aviatrix Transit GW from TGW
----------------------------------------------------

This step removes the private subnet route entries created when you previously attached the Aviatrix Transit Gateway to TGW. 

Disabling Aviatrix Transit GW for TGW Function
------------------------------------------------------------------

This step deletes the eth1 interface and other resources associated with the Aviatrix Transit GW from AWS Transit Gateway Orchestrator. 

Deleting a Network Domain
-------------------------------------

This step deletes a network domain created in the Creating a New Network Domain section above. 

Deleting an AWS TGW
-----------------------------

This step deletes the AWS Transit Gateway. 

.. |create_tgw| image:: tgw_plan_media/create_tgw.png
   :scale: 30%

.. |connect_domain_1| image:: tgw_plan_media/connect_domain_1.png
   :scale: 30%

.. |connect_domain_2| image:: tgw_plan_media/connect_domain_2.png
   :scale: 30%

.. |new_domain| image:: tgw_plan_media/new_domain.png
   :scale: 30%

.. |plan_view| image:: tgw_plan_media/plan_view.png
   :scale: 30%

.. |transit_gw| image:: tgw_plan_media/transit_gw.png
   :scale: 30%

.. |transit_dmz| image:: tgw_plan_media/transit_dmz.png
   :scale: 30%

.. |transit_complete| image:: tgw_plan_media/transit_complete.png
   :scale: 30%

.. |prepare_tgw_attach| image:: tgw_plan_media/prepare_tgw_attach.png
   :scale: 30%

.. |tgw_peer| image:: tgw_plan_media/tgw_peer.png
   :scale: 30%

.. disqus::
