.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Aviatrix Support Center
===========================================================================

Overview
--------

The Aviatrix Support Center goal is to be a central repository for known issues, solutions, workarounds and common design principles for our customers. Please look at our `Official Support Page <http://www.aviatrix.com/support>`_ for more information.



Tips & Tricks
-------------

* 4.0 Release supports `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!!
* Looking for an easy LDAP solution? Check out `AWS's LDAP <https://aws.amazon.com/directoryservice/faqs/>`_. 
* Please don't forget to turn on `backup functionality <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ on your Aviatrix controller. (Please avoid "."/period character in the S3 bucket name)
* Deploy your Aviatrix OpenVPN Gateway's behind an ELB so you can scale up when needed and don't have to worry about losing IP address and having to reissue certificates.
* On the Gateway page, you can customize columns and add more information. You can also sort and filter on any column by clicking on header.
* Connectivity Issues? `Aviatrix Flightpath <https://docs.aviatrix.com/HowTos/flightpath_deployment_guide.html>`_ to the rescue!!
* Aviatrix Controller supports a `comprehensive set of API <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_ to enable automation
* Got questions for Support Team? Send an email to support@aviatrix.com
* Want premium support? Reach out to sales@aviatrix.com and ask for Platinum Support!!
* Changing IAM policies could cause issues. Please check out these links - `IAM Policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_, `Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_, `Customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_
* IAM Policies: Keep them updated!! All gateways and controller need them, and in all accounts (if you have more than one)
* Gateways created before 3.5 release do not have "T2/T3 Unlimited" setting turned on by default. Try turning it on through AWS Console for improved burst rates.
* Syslogs are on not viewable on Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, rsyslog.
* `Aviatrix Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ does not support HA in multiple regions, but works across multiple AZ's
* `Controller upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ does not affect your tunnels. Please keep them at > t2.large and please don't encrypt the root devices!!

