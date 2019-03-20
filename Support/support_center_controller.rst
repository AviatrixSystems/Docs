.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Controller
===========================================================================

IAM
^^^

* Changing IAM policies could cause issues. Please check out these links first - `IAM Policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_, `Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_, `Customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_
* IAM Policies: Keep them updated!! All gateways and controller need them, and in all accounts (if you have more than one)

Upgrade
^^^^^^^

* `Controller upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ does not affect your tunnels. Please keep them at > t2.large and please don't encrypt the root devices!!

Miscellaneous
^^^^^^^^^^^^^

* Aviatrix Controller supports a `comprehensive set of API <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_ to enable automation
* You can place your `controller behind an ELB in AWS <https://docs.aviatrix.com/HowTos/controller_ssl_using_elb.html>`_. Remember to increase the `default ELB idle connection timeout <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#connection-idle-timeout>`_ from 60 seconds to at least 300 seconds.
* Please don't forget to turn on `backup functionality <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ on your Aviatrix controller. (If you have a "."/period character in the S3 bucket name, please ensure you are running software version 4.0.685 or later.)
* We strongly recommend the "Multiple Backup" setting to be turned Controller/Settings/Maintenance/Backup&Restore. After turning this option - click on Disable and then Enable and then click on "Backup Now" and check in your S3 bucket to make sur e that the backup function is successful.
* On the Gateway page, you can customize columns and add more information. You can also sort and filter on any column by clicking on header.
* Connectivity Issues? `Aviatrix Flightpath <https://docs.aviatrix.com/HowTos/flightpath_deployment_guide.html>`_ to the rescue!!
* Gateways created before 3.5 release do not have "T2/T3 Unlimited" setting turned on by default. Try turning it on through AWS Console for improved burst rates.


Does Aviatrix support High Availability?
------------------------------------------

We have HA built into our system through `Gateway HA <https://docs.aviatrix.com/Solutions/gateway_ha.html>`_ and `Transit HA <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_

`Aviatrix Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ does not support HA in multiple regions, but works across multiple AZ's. More information `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/README.md>`_


Does Controller send alerts when Gateway status changes?
--------------------------------------------------------------------

Aviatrix Controller monitors the gateways and tunnels and whenever there is a state change, it will send an email to the admin of the system. You can always override the admin email by updating "ControllerUi/Settings/Controller/Email/StatusChangeEventEmail". If you do not want to see these emails, you can set it to an invalid email address.

As an alternative, you can also set Cloudwatch Event Alerts in AWS to be alerted when Gateway/Controller Instances are Started or Stopped.

