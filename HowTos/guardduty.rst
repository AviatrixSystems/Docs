.. meta::
   :description: Amazon GuardDuty Integration
   :keywords: AWS Guard Duty, FQDN, Egress Control, IDS/IPS 


=================================
 Amazon GuardDuty Integration 
=================================

Coming soon in release 3.5, Aviatrix Controller integrates with `AWS GuardDuty <https://aws.amazon.com/guardduty/>`_ to provide you the IDS protection on a per account and region bases. 

Amazon GuardDuty continuesly monitors an account's AWS environment and reports findings. 
GuardDuty sifts through CloudTrail logs, VPC Flow logs and DNS logs to assess risk and generate findings. 

Configuration
--------------

To enable GuardDuty Integration, login to Aviatrix Controller, on the left side of
the navigation bar, go to Security -> GuardDuty, as shown below. 

|guardduty_config|

Integration 
------------

Following is the integration functions. 

 - Aviatrix Controller polls periodically Amazon GuardDuty findings. 
 - Findings from Amazon GuardDuty are `logged <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id13>`_ to the Controller syslog. (Syslog can be exported to `Aviatrix supported Logging services <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_.)
 - Findings from Amazon GuardDuty are displayed in Alert Bell on the Controller console.  
 - If a finding is about an Aviatrix gateway being attacked by an IP address, this IP address is blocked by the gateway through an automatically programmed Stateful firewall rule. 


.. |guardduty_config| image::  guardduty_media/guardduty_config.png
   :scale: 50%



.. add in the disqus tag

.. disqus::
