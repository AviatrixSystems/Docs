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

* Got questions for Support Team? Send an email to support@aviatrix.com
* Want 24x7x365 support? Reach out to sales@aviatrix.com and ask for Platinum Support!!

**Controller:**

* `Aviatrix Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ does not support HA in multiple regions, but works across multiple AZ's. More information `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/README.md>`_
* `Controller upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ does not affect your tunnels. Please keep them at > t2.large and please don't encrypt the root devices!!
* Changing IAM policies could cause issues. Please check out these links first - `IAM Policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_, `Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_, `Customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_
* IAM Policies: Keep them updated!! All gateways and controller need them, and in all accounts (if you have more than one)
* Aviatrix Controller supports a `comprehensive set of API <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_ to enable automation
* Please don't forget to turn on `backup functionality <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ on your Aviatrix controller. (Please avoid "."/period character in the S3 bucket name)
* We strongly recommend the "Multiple Backup" setting to be turned Controller/Settings/Maintenance/Backup&Restore. After turning this option - click on Disable and then Enable and then click on "Backup Now" and check in your S3 bucket to make sur e that the backup function is successful.
* On the Gateway page, you can customize columns and add more information. You can also sort and filter on any column by clicking on header.
* Connectivity Issues? `Aviatrix Flightpath <https://docs.aviatrix.com/HowTos/flightpath_deployment_guide.html>`_ to the rescue!!
* Gateways created before 3.5 release do not have "T2/T3 Unlimited" setting turned on by default. Try turning it on through AWS Console for improved burst rates.


**OpenVPN Gateway:**

* Tunneblick VPN Client might show a warning about "comp-lzo" being deprecated when connecting to Aviatrix OpenVPN Gateway. You can safely ignore this message. We have kept this option in for backward compatibility
* Aviatrix VPN Client needs to be able to resolve localhost.aviatrix.com to 127.0.0.1. DD-WRT router is known to have an issue resolving this, so your VPN connection might fail. Please take a look at this `link <https://forum.dd-wrt.com/phpBB2/viewtopic.php?p=1064711>`_ for a workaround.
* Looking for an easy LDAP solution? Check out `AWS's LDAP <https://aws.amazon.com/directoryservice/faqs/>`_. 
* Deploy your Aviatrix OpenVPN Gateway's behind an ELB so you can scale up when needed and don't have to worry about losing IP address and having to reissue certificates.
* Make sure that there is no overlap between the local subnet of the computer running the VPN Client and the VPN CIDR Block. `Link <https://docs.aviatrix.com/HowTos/gateway.html#vpn-cidr-block>`_
* Be default, split VPN clients can only reach the VPC that the OpenVPN gateway is deployed. If you want them to reach other VPC's, please add them to "VPN CIDR" - `instructions <https://docs.aviatrix.com/HowTos/Cloud_Networking_Ref_Des.html#multiple-vpcs-in-multi-regions-split-tunnel>`_
* In a Transit solution, note that traffic between spokes is not allowed and hence your clients will not be able to reach other spoke VPC's - checkout "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_". Also traffic from `Transit VPC <https://docs.aviatrix.com/HowTos/site2cloud.html#advertise-transit-vpc-network-cidr-s>`_ is also not advertised by default. 
* Using profiles to manage access? If you are assigning multiple profiles to same users - make sure they have the same base policies (allow all or deny all).
* Sometimes the clients might take some time to connect due to ELB's load - check the logs on the client.

**Transit Solution:**

* Explore "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_" if you want all spoke VPC's to talk to each other. Preqrequisites: all spokes need to be similar (either have/not have HA), all of them must be on HA or non-HA connections when connected mode is being turned on.
* Please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution
* For Aviatrix Transit GW to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_ Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.
* Unable to reach from Spoke to On-Prem? `Troubleshoot guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 

**Logging:**

* 4.0 Release supports `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!!
* Syslogs are on not viewable on Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, rsyslog.
* Splunk Cloud is not supported yet. Only Splunk Enterprise is supported at this time.
* Starting release 4.0, there is a daily connectivity check from all Aviatrix Gateways and Controller to the syslog server, when rsyslog is enabled. If any of the devices cannot reach the server successfully, an email is sent out to the admin with the Subject:"Failed to connect to Remote Syslog Server"
