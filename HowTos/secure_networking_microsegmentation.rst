.. meta::
  :description: Aviatrix Micro-Segmentation
  :keywords: security,micro-segmentation


=========================================
Secure Networking with Micro-Segmentation
========================================= 

This topic will provide an overview of micro-segmentation and how to enable micro-segmentation in your infrastructure.

Micro-segmentation provides granular network security policy for distributed applications in the Cloud. Micro-segmentation enables network policy enforcement between application domains you define in a single cloud or across multiple clouds. Users can then configure policies between these application domains to filter traffic between the applications residing in these domains.

|microseg_topology|

Use cases where you might implement micro-segmentation are:

- Workload isolation: in a typical tiered application, you may want to isolate tiers that do not require access to each other. For example, in a shopping portal application, there could be workloads for product inventory, billing, and logging servers. Since the shopping cart application does not need to communicate with the logging servers, this traffic should be blocked.
- Quarantine compromised machines: You can isolate a compromised machine by placing it in its own application domain and blocking communication to that domain.
- On-prem access: If a Cloud resource should only be accessed by specific CIDRs from on-prem, you can create an app domain consisting of the on-prem network CIDR and then apply the appropriate policies.


Micro-Segmentation Components
=============================== 

Micro-segmentation introduces two important configuration components—-app domains and policies. 

App Domains
-------------------------------------
An app domain is a grouping of workloads, subnets, or VPC/VNets that require a uniform policy enforcement. For example, all servers running the inventory database (as per the above workload isolation use case) can form an app domain. A Cloud resource can be part of multiple app domains. 

When you create your app domains, you can classify them based on:

- CSP resource tags: these tags identify resources you can group. This is the preferred classification method, as this automatically includes new resources created in the Cloud with the same set of tags.
- Resource attributes: classify by account or region.
- IP addresses or CIDRs: you can directly specify IP addresses or CIDRs.

  .. note::
	Aviatrix Gateway IP addresses will not be included in any app domain, even if an app domain filter matches an Aviatrix Gateway IP address. If a subnet or VPC/VNet is added to an app domain, the Aviatrix Gateway IP addresses are removed from the corresponding CIDRs.


Policies
-------------------------------------
After creating app domains, you then define policies to define the access control to apply on the traffic between those app domains. In the above workload isolation use case, all traffic (i.e., ports and protocols) between the billing servers and the inventory databases must be blocked (Denied). You can decide which policies to enforce, and if you want to log the actions related a policy so that the information is available in FlowIQ. These policies are enforced (if enabled) on your Spoke gateways, and are executed against the Spoke gateways in the order that they are shown in the policy list. You can create up to 64 micro-segmentation policies.

Prerequisites
-----------------
Before applying micro-segmentation:

- Your version of Aviatrix Controller must be 6.7 or greater.
- Gateways must have their image updated to version 6.7 or greater.
- Network reachability should be configured between the VPCs that contain applications that require connectivity. You configure network reachability using Connected Transit/MCNS. See `here <https://docs.aviatrix.com/HowTos/transit_advanced.html#connected-transit>`_ for more information.
- If you plan to use CSP tags in your app domains, Cloud resources must be tagged appropriately.

Limitations
-----------

-Supported on AWS and Azure.
-You can configure up to 500 app domains.
-You can have up to 3000 CIDRs per app domain.
-You can create up to 64 policies.
-Up to 10,000 CIDRs can be supported by the Aviatrix Controller.


Configuring the Polling Interval
---------------------------------
The Aviatrix Controller periodically polls your CSPs to gather and inventory its resources. Since it may be desirable for you to poll data more frequently, you are able to configure how often the Controller fetches resources and updates. 

In CoPilot navigate to Settings> Advanced Settings> Micro-Segmentation Settings and enter the desired polling interval in minutes (default is 60). This can be a value between 1-180.


Configuring Micro-Segmentation in Your Infrastructure
===================================================== 

You configure micro-segmentation in Aviatrix CoPilot. See the `Aviatrix CoPilot User Reference Guide <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html>`_ for instructions. 


Working with Micro-Segmentation
=============================== 

This section describes the micro-segmentation functional area of Aviatrix CoPilot.

The CoPilot micro-segmentation functional area allows you to enable micro-segmentation in your infrastructure. 

For information about how micro-segmentation works in Aviatrix Secure Cloud Network Platform, see the discussion about secure networking with micro-segmentation in the Aviatrix product documentation.


Creating App Domains 
-------------------------------------
An app domain contains one or more filters. All resources in your CSPs that match these filters become part of the app domain. A filter specifies resource matching criteria, and matching criteria consists of one or more attributes/tags to be matched against key/value pairs. All match conditions within the filter must be satisfied to be matched. Each filter must be associated with a resource type (VPC/VNet, subnet, or VM). 

1. In CoPilot, navigate to Security > Micro-Segmentation> App Domain.
2. Click +ADD DOMAIN.
3. Enter a name for the app domain.
4. If you want to add a resource type (VPC/VNet, virtual machine, or subnet), follow the below steps. If you want to enter IP addresses or CIDR ranges for your app domain, go to step 5.
	a. Click +Resource Type and select VPC/VNet, Virtual Machines, or Subnet. 
	b. Enter the conditions that need to be present on that resource. The available conditions (properties?) are Account Name and Region. The values for the selected condition(s) are populated automatically.
	c. All key tags that you have defined for your Cloud resources are present in the list for you to select from. Some examples of key tags are: Backup, Controller, Aviatrix-Created-Resource, and Type.
	d. If needed, add another resource type. Typically you will only have resources of the same type in an app domain (for example, you can have more than one VM based filter).
	e. After entering your resource type, you can use the Preview Resources toggle switch to show how the selected resource type appears in your network. 
5. If you don’t want to use specific tags in your resources, or you have resources, enter the VPC/VNet IP addresses or CIDRs in the field provided. Traffic across CIDRs between two app domains in the same VPC/VNet is not subject to micro-segmentation policies.
6. Click Save. The new app domain is now in the App Domain list.

From here you can:

- Click the app domain name to view it in read-only format
- Click the pen icon to edit the app domain
- See how many rules reference each app domain


Creating App-Domain Policies 
-------------------------------------
After creating your app domains, you create policies to apply when traffic is sent between the selected source and destination app domains. The policies are executed in the order they appear in the list.  

An app domain traffic flow can belong to more than one policy. If this occurs, the priority of the policy determines the action that is taken first. 

1. On the Policies tab, click +POLICY.
2. Enter a name for the policy.
3. Select the Source App Domains (the app domains that originate traffic).
4. Select the Destination App Domain (the app domains that terminate traffic).
5. Select if the policy is allowed or denied. This determines the action to be taken on the traffic.
6. If the Enforcement slider is On (the default), the selected action is applied to the matching traffic. If the Enforcement slider is off, the packets are only watched. This allows you to observe if the traffic impacted by this policy causes any inadvertent issues (such as traffic being dropped). 
7. If the Logging slider is On, information (such as five-tuple, source/destination MAC address, etc.) related to the action is logged and made available in FlowIQ. Since logging uses a lot of disk space, be careful when enabling logging on your policies.
8. Select the protocol used: TCP, UDP, ICMP, or Any. If you select TCP or UDP you can enter a port number or port range.
	
As per the workload isolation use case above (blocking traffic between billing and inventory), the policy would look like this:
	- Source app domain: billing application
	- Destination app domain: inventory database application
	- Action: Deny
	- Protocol: Any
	- Ports: 0-65535 (Any)
	- Logging: Off
	- Enforcement: On

9. Determine the policy order by selecting to insert the new policy above, below, or at the top or bottom of the rule list. If the policy is not at the top or bottom of the list, you must select the existing policy that is affected by the position of the new policy.
10. Click Save in Drafts. You can then review, commit, or discard the policy. This view also indicates if the policies are working as expected.

Creating a Default Policy
-----------------------

As a best zero trust security practice, you should add a deny policy that blocks traffic from all app domains to the universal 0.0.0.0/0 app domain. For example, if app domains A and B are configured to talk to each other, you may not want app domain C to be able to talk to app domain A or B. Creating this default policy helps with locking down configured app domains. This should be the last policy in the list.



..  |name_image1| image:: microseg_media/microseg_topology.png
    :width: 200

