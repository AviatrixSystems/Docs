.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Logging
===========================================================================

Miscellaneous
^^^^^^^^^^^^^

* 4.0 Release supports `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!!
* Syslogs are on not viewable on Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, rsyslog.
* Splunk Cloud is not supported yet. Only Splunk Enterprise is supported at this time.
* If you are deploying SumoLogic Collector behind an Aviatrix Egress Control Gateway, you might want to look at this `Link <https://help.sumologic.com/03Send-Data/Installed-Collectors/05Reference-Information-for-Collector-Installation/Enabling-SNI-in-a-Collector-to-Support-Transparent-Proxy>`_ to enable SNI and then you can setup a filter to let traffic from *.sumologic.com to pass through.
* Starting release 4.0, there is a daily connectivity check from all Aviatrix Gateways and Controller to the syslog server, when rsyslog is enabled. If any of the devices cannot reach the server successfully, an email is sent out to the admin with the Subject:"Failed to connect to Remote Syslog Server"
