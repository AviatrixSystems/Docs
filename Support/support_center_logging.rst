.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Logging
===========================================================================

How does logging service work?
-------------------------------------

When a logging service is enabled on the controller, the controller pushes the logging configuration and modules(if needed) to the controller and to all the gateways. Once this done, the logs flow from each of the Aviatrix Network Components directly to the logging server/service. Please make sure that you have a path from each of these components to the logging server/service.

When a new gateway is created later or if a gateway goes through forced-upgrade or through replace-gateway, they go through the same process as described above.

Is AWS's Cloudwatch supported?
-------------------------------------

We are happy to report that starting release 4.0  we support `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!!

Are syslogs viewable on Controller?
-------------------------------------

Syslogs are not viewable on Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, rsyslog. Also, syslogs from gateways are not collected at the controller and are sent directly from the gateways to the controller

Is Splunk Cloud supported?
-------------------------------------

At this time, we support Splunk Enterprise but not Splunk Cloud

How do I use a Sumologic collector which is deployed behind an Aviatrix Egress Control Gateway?
---------------------------------------------------------------------------------------------------------------

If you are deploying SumoLogic Collector behind an Aviatrix Egress Control Gateway, you might want to look at this `Link <https://help.sumologic.com/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/Enabling-SNI-in-a-Collector-to-Support-Transparent-Proxy>`_ to enable SNI and then you can setup a filter to let traffic from *.sumologic.com to pass through.

How do I know if the rsyslog is running well? Will I get an emails?
--------------------------------------------------------------------------

Starting release 4.0, there is a daily connectivity check from all Aviatrix Gateways and Controller to the syslog server, when rsyslog is enabled. If any of the devices cannot reach the server successfully, an email is sent out to the admin with the Subject:"Failed to connect to Remote Syslog Server"

How can I get Gateway or Tunnel Down Alerts?
--------------------------------------------------------------------------

Aviatrix controller will send an email alert to the admin when a tunnel or gateway status changes. You can also setup receiving alerts related to a particular/all gateways or tunnel going up or down, by having your logging services alert you.

* Links to `Splunk Alerts <https://docs.splunk.com/Documentation/Splunk/7.2.4/Alert/DefineRealTimeAlerts>`_
* `SumoLogic Alerts <https://help.sumologic.com/Dashboards-and-Alerts/Alerts/03-Create-a-Real-Time-Alert>`_
* `Datadog Alerts <https://docs.datadoghq.com/monitors/>`_
* `Cloudwatch Alarms <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html>`_.


How can I get my logs into AWS S3 Bucket?
--------------------------------------------------------------------------

There are a few ways to get your logs into S3 bucket. Here are a couple

  * Send `logs to rsyslog and then onto S3 <https://docs.aviatrix.com/HowTos/ForwardingLogs.html>`_
  * Send `logs to Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_ and then `onto S3 <https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html>`_ 


 
How can I upgrade/downgrade to a specific Sumo agent version in Aviatrix Controller/Gateways?
-----------------------------------------------------------------------------------------------------

When SumoLogic is first enabled, the Controller installs the latest Sumo agent on all the Aviatrix Gateways and the Controller. Any new gateway created later, will get the latest SumoLogic Agent available at that time. A second disable/enable of Sumo Logging will not upgrade the agents that are already installed.
 
From release 4.2 onwards, we allow you to upgrade/downgrade the Sumo Collector Agent that has been installed in the Aviatrix Controller and Gateways, from the SumoLogic Web UI. Please allow enough time for this upgrade to be completed - SumoLogic's Web UI will confirm once the upgrade is completed. If you create any new gateways after this process, you would have to adjust it's agent through SumoLogic's Web UI
