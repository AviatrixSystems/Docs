.. meta::
  :description: Aviatrix CoPilot FAQs
  :keywords: CoPilot,visibility,faq


============================================================
Aviatrix CoPilot FAQs
============================================================

FAQs about CoPilot and Controller Reachability
======================================================

Frequently asked questions about CoPilot not reaching or communicating with the Controller.

Why can't my CoPilot reach my Controller?
---------------------------------------------------

Verify that Controller's access for CoPilot has been configured. After CoPilot’s VM is launched and assigned a static public IP address, the Controller’s SG on 443 must be open to CoPilot’s public IP. If you launched CoPilot from the Controller user interface, the SG configuration is done as part of the auto-deploy process. If you launched CoPilot from the CSP marketplace, you will need to add the rule to the Controller SG. 


FAQs about CoPilot instance size
====================================================

Frequently asked questions about initial deployment size for CoPilot.

What is the minimum instance/VM size for CoPilot?
---------------------------------------------------

The configuration of the virtual machine that you provision for your CoPilot deployment depends on the scale and the kind of networking infrastructure you have planned according to your business requirements. Work with your Aviatrix Sales representative to determine your sizing requirements. While this section provides minimum requirements and guidelines for minimum sizing based on a number of gateways, it is recommended to reach out to your Aviatrix Sales representative to discuss your specific sizing needs. 

- For the instance/VM size, CoPilot requires a minimum of:

  - 32 GB of RAM (or more)

  - 1 attached disk/volume for storage — See `CoPilot Disk (Volume) Management <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-disk-volume-management>`_.

  - 8 vCPUs (or more)

Examples: 

Amazon EC2 instance type: m5n.2xlarge

Googld Cloud: n2-standard-8

Oracle Cloud Infrastructure: VM.Standard3.Flex (8core x 32G mem)


If you are deploying CoPilot for the first time (new launch) and have existing gateways, below are general guidelines for a minimum VM size *based on the number of existing gateways* in an infrastructure. 

The information is intended as a general guide only. After you deploy CoPilot, you will be able to monitor the indexing of data for traffic in your specific environment and tune configuration settings, such as index retention periods, that will help determine the best instance size for your business needs.

For infrastructures with **< 500 GWs**, the minimum instance/VM size guideline:

  - 32 GB of RAM (or more)

  - 8 vCPUs (or more)

Examples:

Amazon EC2 instance type: 			m5n.2xlarge

Googld Cloud: 			                n2-standard-8

Oracle Cloud Infrastructure: 			VM.Standard3.Flex (8core x 32G mem)

Microsoft Azure virtual machine:                Standard_D8_v4


For infrastructures with **> 500 but < 1000 GWs**, the minimum instance/VM size guideline:

  - 64 GB of RAM (or more)

  - 16 vCPUs (or more)

Example:

Amazon EC2 instance type: 			m5n.4xlarge


For infrastructures with **>=1000 GWs**, the minimum instance/VM size guideline:

  - 128 GB of RAM (or more)

  - 32 vCPUs (or more)

Example:

Amazon EC2 instance type: 			m5n.8xlarge


**Note the following points**:

- (AWS) For CoPilot ARM-based images, Amazon EC2 A1 instances are currently not supported.

- For a simple deployment, the single instance (VM) must meet the minimum requirements. 

- For a fault tolerant (clustered) deployment, each instance (VM) in the cluster must meet the minimum requirements. In addition, each cluster instance must use the same instance sizing. In a cluster, the data instances will have a disk/volume attached for storage in the size you specify during your launch process. Data volume sizes must be the same across all data instances. 

- If you already have a CoPilot simple deployment (single instance) and you plan to migrate your data from the simple deployment to a new clustered deployment, the size of the disk volume you specify for each data instance should be the same size or larger than the storage used in your old single copilot. See `CoPilot Disk (Volume) Management <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-disk-volume-management>`_ in *Aviatrix CoPilot Deployment Guide* for more information about CoPilot storage.


CoPilot supports automatic memory sizing for the ETL and datastore based on the physical memory of the instance at boot. Base images default to the automatic settings. This auto-scaling memory support became available with the release of Aviatrix CoPilot image version 1.5.1. 


FAQs about CoPilot licenses and licensing
====================================================

Frequently asked questions about CoPilot licenses and licensing.

What is a CoPilot Customer ID? 
-------------------------------------------------

This is the customer ID or license obtained from your Aviatrix Sales representative. Note that the CoPilot customer ID is separate from the Aviatrix Controller customer ID. When you perform the initial setup of CoPilot, you will be prompted to enter your customer ID and CoPilot will allocate a license to you based on your customer ID. For more information about CoPilot licensing, see `CoPilot Customer IDs and Licensing <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-customer-ids-and-licensing>`_.

How can I extend or renew my CoPilot license?
---------------------------------------------------

If your CoPilot customer ID is set to expire, ask for a license extension from your Sales representative. In this case, you must reset your customer ID for the extension. For details, see `CoPilot Customer IDs and Licensing <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-customer-ids-and-licensing>`_.

If my CoPilot license expires, will I lose data?
---------------------------------------------------

No. If your CoPilot license expires, you will be unable to log in to CoPilot but your data will remain intact. Contact your Sales representative to request a license extension and obtain instructions for logging back in to your instance. For more information about CoPilot licensing, see `CoPilot Customer IDs and Licensing <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-customer-ids-and-licensing>`_.

Can my CoPilot customer ID be associated with more than one license?
---------------------------------------------------------------------

Yes. The license key has the quantity or allocation count for the number of CoPilot instances that can use the license at a given time (the default count is 2). If the license key is greater than one, the key can be used by more than one instance. You can see when the license will expire and see the used and total allocation count of your license in CoPilot Settings > Licensing. For more information about CoPilot licensing, see `CoPilot Customer IDs and Licensing <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-customer-ids-and-licensing>`_.

FAQs about CoPilot login 
====================================================

Frequently asked questions about logging in to CoPilot.

What is the default login for CoPilot?
---------------------------------------

CoPilot authenticates against the Aviatrix Controller list of local users.

If Controller IP changes and if copilot is associated with an old controller IP, how to login into Copilot?
------------------------------------------------------------------------------------------------------------

If you are logged in to copilot go to Copilot UI -> Settings and click on the 'Reset controller IP' button. It will prompt you to enter the new Controller IP address and service account credentials.

If you are logged out of Copilot, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ for a solution.


FAQs about CoPilot notifications/alerts
====================================================

Frequently asked questions about notifications and alerts in CoPilot.


Can I pause alerts in CoPilot?
---------------------------------

Yes. To pause a user-defined alert, click the bell icon in the alerts list. 


What kind of alerts/notifications does CoPilot offer?
---------------------------------------------------------

For general information about how Aviatrix Controller and CoPilot provide alerting, monitoring, and logging capabilities across all clouds in your multi-cloud network that are managed by Aviatrix Controller, see `Monitoring Your Network <https://docs.aviatrix.com/HowTos/Monitoring_Your_Network.html>`_.

CoPilot regularly polls Aviatrix Controller for alerts associated with events that occur in your network. The events could be detected changes in the resource utilization (telemetry) data for managed resources (gateway hosts). The events could also be conditions associated with enhanced security services like network behavior analytics (detected anomalies in your network traffic fingerprint) and ThreatIQ with ThreatGuard (detected threat IPs). For a list of all alert condition display names, see `CoPilot Alert Condition Display Names <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#copilot-alert-condition-display-names>`_. 
 
FAQs about webhooks
====================================================

Frequently asked questions about webhooks generated by CoPilot.

Can I use webhooks to send notifications to external systems like PagerDuty?
-----------------------------------------------------------------------------

Yes. You can customize the webhooks Aviatrix CoPilot generates for sending to external systems (such as Slack and PagerDuty). See `CoPilot Webhooks <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#id9>`_.

FAQs about ThreatGuard
====================================================

Frequently asked questions about ThreatIQ with ThreatGuard.

Are ThreatGuard firewall rules applied to non-Aviatrix constructs?
---------------------------------------------------------------------

No. ThreatGuard firewall rules are not added to non-Aviatrix constructs. ThreatGuard firewall rules are added to Aviatrix gateways. ThreatGuard firewall rules block traffic to and from the host (Aviatrix gateway) by adding stateful firewalls to the host that reported the threat-IP associated traffic. See `Working with ThreatIQ <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-threatiq>`_. 

How do ThreatGuard firewall policies interact with existing/new firewall policies applied to the same gateways? 
------------------------------------------------------------------------------------------------------------------

The ThreatGuard drop policies are in addition to the existing firewall policies applied to the same gateways.  See `About ThreatGuard Firewall Rules <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#about-threatguard-firewall-rules>`_. 

FAQs about data disks/volumes
====================================================

Frequently asked questions about attached disks (volumes) used for CoPilot data.

Can I use the disk (volume) management feature for expandable storage?
------------------------------------------------------------------------------

To use the disk (volume) feature for expandable storage, you must deploy an instance of Aviatrix CoPilot that is based on the Aviatrix CoPilot image version 1.5.1 (that released on 01/14/2022). Instances based on the 1.5.1 image show “Appliance Version 2” in the version information (older images display “Appliance Version 1”). To use the expandable storage feature, you must launch a new CoPilot instance from the marketplace based on CoPilot image version 1.5.1. For more information about expandable storage, see `CoPilot Disk (Volume) Management <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#copilot-disk-volume-management>`_.

What disk type should I use for CoPilot expandable storage?
------------------------------------------------------------------------------

You can choose the disk type (volume type) you want. Most disk/volume types are supported (such as AWS gp2).

What are sizing guidelines for the data disk (volume) to attach for CoPilot expandable storage?
-------------------------------------------------------------------------------------------------

Your Aviatrix support/cloud service team can help you determine an initial size that is suitable for your business needs. The size of storage for CoPilot data depends on several factors. For example, an infrastructure that has 100 gateways with 1 G of traffic per day will require a different size than an infrastructure with 10 gateways with 10 TB of traffic per day. 

You can start with the initial size and monitor your system for a set time period to see how much CoPilot data is stored/indexed in your environment (Settings > Index Management) to help determine whether to allocate new storage to meet your needs. You can always add additional data disks (volumes) as needed. See `Add a Disk (Volume) for CoPilot Storage after Deployment <https://docs.aviatrix.com/HowTos/copilot_getting_started.html#id2>`_.

Can I encrypt volumes for CoPilot?
------------------------------------------------------------------------------

Yes, you can encrypt disks (volumes) that you allocate to your CoPilot deployment. You enable the encryption via your cloud service provider. Refer to your cloud service provider for information about enabling disk (volume) encryption.

FAQs about flow data
====================================================

Frequently asked questions about flow data in CoPilot.

How long does it take for data to start showing in FlowIQ? 
------------------------------------------------------------------------------

It may take about 5 minutes for flow data to appear in the CoPilot UI. 

Are the traffic flow records coming from Aviatrix Controller or the gateways?
------------------------------------------------------------------------------

The flows are sent from the Aviatrix gateways directly to CoPilot's instance.

Can I configure flows to be sent over private IPs?
------------------------------------------------------------------------------

CoPilot does not set up a private overlay between the gateways and itself. If a private communication path between the gateways and CoPilot is available, then you can use CoPilot’s private IP when you input the collector IP in the controller. 
For example, if you have an Aviatrix transit gateway, and you put CoPilot in one of the spokes, then you can use CoPilot’s private IP as the destination.

Is FlowIQ showing realtime traffic?
------------------------------------------------------------------------------

Flow records are generated by Aviatrix Gateways. The agent on the Gateways observes and keeps track of the flows and as soon as a particular flow ends, or if the flow expiry interval is reached, the flow record is sent to CoPilot.

FAQs about Topology
====================================================

Frequently asked questions about topology in CoPilot.

Why do I get an error Failed to fetch Topology when I open the Topology page?
-------------------------------------------------------------------------------

If you get the error **Failed to fetch Topology data**, CoPilot was unable to access the data it needs for topology. If the issue persists, Contact Aviatrix Support.

FAQs about how CoPilot works
====================================================

Frequently asked questions about how CoPilot works.

What protocol does CoPilot use to talk to its controller?
-------------------------------------------------------------------------------

CoPilot uses REST APIs and HTTPS to communicate with its controller.

How does CoPilot get its data?
-------------------------------------------------------------------------------

CoPilot uses REST APIs and HTTPS to communicate with its controller.

1.Controller APIs

  CoPilot makes API calls into the controller to retrieve information.

2.Flow records

  Aviatrix Gateways generate and export information about network traffic. Flows come directly from  Gateways to CoPilot.

How are updates handled? Can I configure the update process?
===============================================================================

Updates are downloaded and applied automatically. The update process runs every 60 minutes. To stop updates, you can stop the update service under Settings > Services.

Does CoPilot hold any user or sensitive data?  
===============================================================================

CoPilot does not hold user-identifiable or payment processing information. CoPilot does not hold credentials on the appliance’s storage. However, it is always recommended to follow security best practices for a secure CoPilot deployment. 

Can the data retention be adjusted? 
===============================================================================

Today you can set a threshold based on disk space available, so that you can remove the old records.

Can we provide bandwidth details of links?
===============================================================================

If you can specify source and destination for the two endpoints of the path (gateways), you can obtain this information from FlowIQ by using filters.

How can I get my additional questions answered?
===============================================================================

Visit Aviatrix.com and use the live chat icon to talk to a live expert.
