.. meta::
   :description: monitoring your network
   :keywords: aviatrix logs, logging, monitoring, emails, alerts



==========================
Monitoring Your Network
==========================

Aviatrix Controller and CoPilot provide alerting, monitoring, and logging capabilities that help you see what is happening across all clouds in your multi-cloud network that are managed by Aviatrix Controller. These capabilities assist you with finding issues, and addressing them as they occur.

Visit `this link on the Aviatrix website <https://aviatrix.com/resources/youtube-aviatrix-copilot-cloud-network-operational-visibility>`_ for cloud network operations, visibility and monitoring tutorials.


Setting up Alerts for Detected Threat IPs
=========================================

The ThreatIQ with ThreatGuard feature enables you to monitor for security threats in your Aviatrix cloud network; set alerts when threats are detected in the network traffic flows; and block traffic that is associated with threats. For more information on how to set up this feature see `Working with Threat IQ <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-threatiq>`_. 

Sending Notifications to External Systems
=========================================

You can configure web-hook alerts to send notifications to external (third-party) systems, such as PagerDuty. Click `here for more information <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-notifications>`_. 

Monitoring Status and Resources
===============================

The following monitoring capabilities provide visibility into the status and resources (Aviatrix and native cloud networking resources) on your multi-cloud network. This current and accurate snapshot of your data enables you to find and quickly resolve network issues. See below for details on these monitoring capabilities: 

- Operational status of cloud resources (`dashboard <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#copilot-dashboard>`_)
- Network traffic flows, top talkers/receivers, and geographic origin of traffic (`FlowIQ <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-flowiq>`_)
- Status of connections for Aviatrix gateways, Site2Cloud (data center connections into the cloud) and BGP (Border Gateway Patrol) connections from on-prem to the cloud (Cloud Routes)
- Notifications of changes in your Aviatrix Controller and Aviatrix Gateways based on system or network metrics (Notifications); see below for more details on the Notifications feature.

System Notifications Feature
============================

You can configure notifications to be alerted about events (such as performance bottlenecks) and detected anomalies that occur in your networks. If an event or anomaly meets the configured metric or condition, an alert is triggered and sent to the selected destination.

How you set a condition threshold to trigger an alert will depend on different factors. For example, for system metrics, the instance size can influence the condition threshold that makes sense. For metrics associated with cloud provider-maintained infrastructure, the desired condition threshold may vary between cloud service providers. Work with your network operations team to determine the metric conditions that will trigger alerts in your environment. The alerts you can set are configured in CoPilot. 

For more information about setting alerts based on system and network metrics, see `Working with Notifications <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-notifications>`_.

For more information about configuring anomalies, see `Working with Anomalies <https://docs.aviatrix.com/HowTos/copilot_reference_guide.html#working-with-anomalies>`_.

Aviatrix Controller Alert Notifications
=======================================

In the Aviatrix Controller, emails are sent when there is a change in gateway or tunnel status. You can configure the status change event email address and email notification interval on the Settings> Controller> Email tab.

You can also configure alert notifications (sent via email or web-hook) for the following features. These alerts display when you click the Controller alert bell in the Controller toolbar: 

- `Overlapping CIDR Check <https://docs.aviatrix.com/HowTos/bgp.html#bgp-overlapping-alert-email>`_: an email is sent when BGP routes overlap in Site2Cloud. 
- GuardDuty Check: when Amazon GuardDuty detects and blocks malicious IP addresses detected in NetFlow data.
- Log Service Check: when a remote syslog server is down.
- `Reach of Route Limit Check <https://docs.aviatrix.com/HowTos/bgp.html#bgp-route-limit-alert-email>`_: when VPC and BGP route limits reach a given threshold.
- Blackhole Route Entry Check: when a VPC route table has inactive routes.

Click `here <https://docs.aviatrix.com/HowTos/alert_and_email.html#how-to-manage-alert-bell-notification>`_ for more information on these alerting features in the Aviatrix Controller.

Monitoring Gateways
====================

When heartbeat information from any gateway fails, Aviatrix Controller restarts these gateways and sends an email to the administrator. 

You can also `monitor gateway subnets <https://docs.aviatrix.com/HowTos/gateway.html#monitor-gateway-subnet>`_ to ensure that no unauthorized virtual machines are being launched. When enabled, Controller periodically monitors the selected subnet where the gateway was launched. An alert mail is sent to admin, and the instance is immediately stopped. 


Account Audit
=============

Aviatrix Controller periodically audits its managed IAM roles and policies to ensure the roles are attached to accounts and that the policies are correct. If any of the audits fail, the Controller sends an email alert and logs the event. The Controller also sends an alert email if any gateways report these audit failures (upon first detection and every 24 hours until the problem is fixed). See `here <https://docs.aviatrix.com/HowTos/account_audit.html#account-audit>`_ for more information.

Logging
=======

In Aviatrix Controller you can select a logging management system to receive data from the Controller and its managed gateways. Logs sent to these systems can be parsed to display relevant analytics of collected data and to evaluate the trends that help monitor network connectivity and user VPN sessions. 

You can enable Remote Syslog logging and send the information to CoPilot by entering CoPilot’s IP address and UDP port 5000. If using Remote Syslog to send information to other applications, see `here <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#remote-syslog>`_. 

Click `here <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_ for more information on configuring logging options, and keywords that the logging management system can flag.

Background Tasks
================

During background tasks such as software upgrades and gateway deployments, a notification email is sent to the admin email address configured in the Aviatrix Controller under Settings > Controller > Email. 


.. disqus::