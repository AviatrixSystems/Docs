.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Logging
===========================================================================

How does logging service work?
-------------------------------------

When a logging service is enabled on the controller, the controller pushes the logging configuration and modules(if needed) to the controller and to all the gateways. Once this is done, the logs flow from each of the Aviatrix Network Components directly to the logging server/service. Please make sure that you have a path from each of these components to the logging server/service.

When a new gateway is created later or if a gateway goes through forced-upgrade or through replace-gateway, they go through the same process as described above.

Is AWS's Cloudwatch supported?
-------------------------------------

We are happy to report that starting with release 4.0  we support `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!

Are syslogs viewable on Controller?
-------------------------------------

Syslogs are not viewable on the Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, or rsyslog. Also, syslogs from gateways are not collected at the Controller and are sent directly from the gateways to the Controller.

Is Splunk Cloud supported?
-------------------------------------

We currently only support logging into Splunk Enterprise and do not support logging into Splunk Cloud directly. As a workaround, you can deploy a Splunk Heavy Forwarder and set it as the destination on Aviatrix for all the logs. You can then have the Splunk Heavy Forwarder send the logs into Splunk Cloud.


How do I use a Sumologic collector which is deployed behind an Aviatrix Egress Control Gateway?
---------------------------------------------------------------------------------------------------------------

If you are deploying a SumoLogic Collector behind an Aviatrix Egress Control Gateway, you might want to look at this `Link <https://help.sumologic.com/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/Enabling-SNI-in-a-Collector-to-Support-Transparent-Proxy>`_ to enable SNI and then you can set up a filter to let traffic from *.sumologic.com to pass through.

How do I know if the rsyslog is running well? Will I get an email?
--------------------------------------------------------------------------

Starting release 4.0, there is a daily connectivity check from all Aviatrix Gateways and the Controller to the syslog server, when rsyslog is enabled. If any of the devices cannot reach the server successfully, an email is sent out to the admin with the Subject:"Failed to connect to Remote Syslog Server"

How can I get Gateway or Tunnel Down Alerts?
--------------------------------------------------------------------------

The Aviatrix Controller will send an email alert to the admin when a tunnel or gateway status changes. You can also setup receiving alerts related to a particular/all gateways or tunnel going up or down, by having your logging services alert you.

* Links to `Splunk Alerts <https://docs.splunk.com/Documentation/Splunk/7.2.4/Alert/DefineRealTimeAlerts>`_
* `SumoLogic Alerts <https://help.sumologic.com/Dashboards-and-Alerts/Alerts/03-Create-a-Real-Time-Alert>`_
* `Datadog Alerts <https://docs.datadoghq.com/monitors/>`_
* `Cloudwatch Alarms <https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html>`_.


How can I get my logs into AWS S3 Bucket?
--------------------------------------------------------------------------

There are a few ways to get your logs into an S3 bucket. Here are a couple:

  * Send `logs to rsyslog and then onto S3 <https://docs.aviatrix.com/HowTos/ForwardingLogs.html>`_
  * Send `logs to Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_ and then `onto S3 <https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html>`_ 


 
How can I upgrade/downgrade to a specific Sumo agent version in Aviatrix Controller/Gateways?
-----------------------------------------------------------------------------------------------------

When SumoLogic is first enabled, the Controller installs the latest Sumo agent on all the Aviatrix Gateways and the Controller. Any new gateway created later will get the latest SumoLogic Agent available at that time. A second disable/enable of Sumo Logging will not upgrade the agents that are already installed.
 
From release 4.2 onwards, we allow you to upgrade/downgrade the Sumo Collector Agent that has been installed in the Aviatrix Controller and Gateways, from the SumoLogic Web UI(Collection>SelectCollector>Edit>ChangeVersion>PickVersion). Please allow enough time for this upgrade to be completed - SumoLogic's Web UI will confirm once the upgrade is completed. If you create any new gateways after this process, you will have to adjust its agent through SumoLogic's Web UI


How can I turn on ephemeral mode on SumoLogic for Aviatrix Gateways?
-----------------------------------------------------------------------

SumoLogic's ephemeral feature allows the collectors to be expired and removed if they don’t send any data for 12 hours - more information `here <https://help.sumologic.com/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/11Set-a-Collector-as-Ephemeral>`_.
 
In Aviatrix release 4.3, we have introduced an option for you to configure Sumo attributes ("Additional Configurations(Optional) key=value pairs"). You can add "Vephemeral=true" in this field to turn on this feature while you enable SumoLogic Logging.
 
If you already have SumoLogic enabled, you would have to disable/add "Vephemeral=true"/enable to have Aviatrix Gateway Collectors be created with the ephemeral flag. Please note that any existing gateways/collectors in Sumo are still registered as non-ephemeral. If you want all gateways to be registered as ephemeral collectors - you would have to disable sumo on the Aviatrix Controller, delete all the Aviatrix Gateway Collectors on your SumoLogic Web UI and then enable SumoLogging with the flag on the Controller.
 

How can I send my logs to AlertLogic?
------------------------------------------
 
We do not support sending logs to AlertLogic directly. AlertLogic supports rsyslog if you deploy their remote collector in your network as mentioned at this `link <https://docs.alertlogic.com/prepare/collect-syslog-no-agent.htm>`_. Please configure "Aviatrix Console > Settings > Logging > Remote Syslog" and send logs to AlertLogic's local collector on port 514. This collector should be forwarding these logs to AlertLogic's web logging service.


Can I upgrade the Sumo agent in my Controller and Gateways?
------------------------------------------------------------

We include a Sumo agent in our software but it might not be the latest. Aviatrix release 4.3 and later will let you update this agent from your Sumo Web Interface.
Go to - Manage Data > Collection > Collection ==>Upgrade Collectors link in the page > Update All/individual collectors from the "Upgrade Collectors" collectors
or, by clicking an individual collector and doing an upgrade/downgrade


What are the instance size requirements if I use Sumo or other loggings?
---------------------------------------------------------- 

Sumo Logic's agent is memory intensive and we recommend that you use at least a t3.small instance. If you use any smaller instance, it could cause unexpected failures in your controller and gateways. We recommend our customer to use at least t2.small or t3.small which has 2GB memory if logging feature is enabled.

As a workaround, you can use rsyslog instead of Sumo agent to send your logs to yoru Sumo logging system. Please check out these links

  * `Aviatrix Logging Introduction <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#introduction>`_
  * `Aviatrix Logging using rsyslog <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#remote-syslog>`_
  * `Using rsyslog to send logs to Sumo <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#a-using-rsyslog-to-send-logs-to-sumo>`_


How can I use rsyslog to send logs into different logging services?
---------------------------------------------------------------------

Almost all of the logging services support rsyslog inputs - please check out these links for your favourite logging service. `Splunk <https://docs.splunk.com/Documentation/Splunk/latest/Data/HowSplunkEnterprisehandlessyslogdata>`_, `logstash/filebeat <https://www.elastic.co/guide/en/beats/filebeat/master/filebeat-input-syslog.html>`_, `Sumo <https://help.sumologic.com/03Send-Data/Sources/02Sources-for-Hosted-Collectors/Cloud-Syslog-Source>`_, `DataDog <https://docs.datadoghq.com/integrations/rsyslog/?tab=datadogussite>`_


What should I do if my logging has stopped?
---------------------------------------------------------------------

Please check the following

  * Please check that your logging server is properly provisioned with enough computing power and storage space
  * If your logging was working well in the past and stopped suddenly, please open a ticket with the support team by sending an email to support@aviatrix.com. 
