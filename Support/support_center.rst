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
  * In the case of a full tunnel deployment, if an OpenVPN Gateway is edited to toggle the "Use VPC/VNet DNS Server" setting, please follow it by clicking on  OpenVPN/EditConfig/ReloadDHCPConfiguration to let the changes take effect. Note that this will restart the OpenVPN processes on the gateway, affecting all the connected clients.
  * You can use `REST API <https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_get_vpn_ssl_ca_configuration>`_ to download vpn configuration for your users and save it on a shared folder, if you do not want to send them via email.
  * **SAML:**

    * **Our recommended design** is to let your VPN users connect into your cloud environment through one gateway and use the peering between VPC’s to provide access to your VPN Client’s into your other VPC’s. We recommend using VPN profiles to control/limit access to other VPC’s as you see fit.
    * **SAML and User on Controller:** Once you enable SAML auth for an OpenVPN gateway, you need to create a dummy user on the controller to create a .ovpn file – you can share this user’s .ovpn file with all of your users. As the second authentication is through SAML, this should provide good security. This is per VPC+ELB/GW setup. If you have more than one such deployed VPC+ELB/GW setups, you would need a .ovpn file for each of those setups.
    * **Multiple Simultaneous Sessions from Client:** Currently we do not support multiple VPN sessions from the same pc via the Aviatrix VPN Client. We only support SAML auth via our `Aviatrix VPN Client <https://docs.aviatrix.com/Downloads/samlclient.html>`_
    * **Profile from IdP:** If a custom attribute “Profile” is added in IdP and passed to Aviatrix during authentication, Aviatrix controller can attach the Profile provided by the IdP to the VPN user. Currently we only allow one profile value to be passed via SAML auth. This will override any local settings on the controller.
    * **Multiple Profiles for each User:** If you want to have more than one profile, you can create a user on the controller and attach one or more profiles to this user. Please make sure that all the base policies are the same if you do use multiple profiles per user. You can share this users .ovpn file with the set of users you would want to have these Profiles associated. Please note that, for these users if the controller receives a Profile value during the SAML auth from the IdP – that will override the settings on the Controller. For example, you can create four users – “general”, “dev”, “mktg”, “admin”.

      * You can associate no profiles with “general” user and share the .ovpn file for the “general” user with all your OpenVPN users who would have profiles set at the IdP
      * For “dev” user you can associate with, say, “developer” profile – which provides access to the developer vpc. You can share “dev” user’s .ovpn file with all developers
      * For “mktg” user you can associate with, “marketing” and “sales” profiles – which provides access to the marketing and sales VPC’s. You can share “marketing” user’s .ovpn file with all marketing employees
      * You can attach all profiles to “admin” user– which provides access to all VPCs. You can share “admins” user’s .ovpn file with all admins

    * Microsoft Edge does not behave well with SAML authentication process when it is set as the default browser. Please try setting your default browser to Firefox or Chrome.

**Transit Solution:**

  * Explore "`Connected Mode <https://docs.aviatrix.com/HowTos/site2cloud.html#connected-transit>`_" if you want all spoke VPC's to talk to each other. Preqrequisites: all spokes need to be similar (either have/not have HA), all of them must be on HA or non-HA connections when connected mode is being turned on.
  * Please make sure that you have at least four /28 subnets worth of address space in the VPC before you launch the transit solution
  * For TGW based transit solution to support Hybrid connection, the `transit VPC needs to have a spare /26 CIDR space. <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_ Aviatrix Transit GW uses the spare space to create 4 subnets in the next step.
  * Unable to reach from Spoke to On-Prem? `Troubleshoot guidelines <https://docs.aviatrix.com/HowTos/transitvpc_faq.html#an-instance-in-a-spoke-vpc-cannot-communicate-with-on-prem-network-how-do-i-troubleshoot>`_ 

**Logging:**

  * 4.0 Release supports `Logging to AWS Cloudwatch <https://docs.aviatrix.com/HowTos/cloudwatch.html>`_. Check it out!!
  * Syslogs are on not viewable on Controller. Please deploy an external service such as Cloudwatch, DataDog, Splunk, Logstash, SumoLogic, rsyslog.
  * Splunk Cloud is not supported yet. Only Splunk Enterprise is supported at this time.
  * Starting release 4.0, there is a daily connectivity check from all Aviatrix Gateways and Controller to the syslog server, when rsyslog is enabled. If any of the devices cannot reach the server successfully, an email is sent out to the admin with the Subject:"Failed to connect to Remote Syslog Server"


**Site2Cloud:**

  * If the tunnel is not coming up, make sure there is interesting traffic from either or both sides of the tunnels.
  * Ports 500 and 4500 have to be allowed, if you have a firewall, for IPSec tunnels to be established.

**AWS Infrastructure:**

* **Disk resize for Gateway:**

  * Login to AWS console and locate the Aviatrix gateway instance
  * Click on Root device: /dev/sda1 and then click on EBS ID vol-xxxxxxxxxx.
  * With the volume selected, click Action > Modify Volume to change the Disk Size
  * Click OK to start the resize process. Please make sure you wait until the State of the volume is "in-use - completed (100%)".
  * Select the Aviatrix gateway instance in EC2 page. Click Reboot for the disk space to take effect. This will cause down time (< 5 minutes) due to the reboot process.
  * Confirm the gateway is in running state in AWS console.
  * Login to your controller to run gateway diagnostics and submit to us. Please also upload the gateway `tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_ to us.
  
* **Saving an EIP on a Gateway:**

  * When creating a new Gateway the default option for “Allocate New EIP” is on – this would mean that the Aviatrix Controller would check out a new EIP from AWS Infrastructure. If this gateway is deleted, the Controller will release this EIP to the AWS Infrastructure. If you expect to keep the EIP in future, it is recommended that "Allocate New EIP" option is unchecked and an available EIP is picked during the Gateway creating process.
  * If you are having issues with the Gateway and would like a new Gateway to replace the existing one and with the same EIP, the best way to do this is to via “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Gateway Replace” 
  * If you want to transfer the EIP from one Aviatrix Gateway to another one, please follow the following steps (Example: GatewayA-EIPA, GatewayB-EIPB. Move EIPA to GatewayB) **Note: Only supported in releases 4.0 and up. Using this for release 3.5 and lower will result in loss of EIP:** 
 
      * From AWS Console, create a new EIP (Continuing the example: call this EIP-new)
      * From Aviatrix Controller, go to “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Migration” and pick the Gateway that you want to pick the EIP from and enter this new-EIP and click on OK. (Pick GatewayA and enter EIP-new. This will release EIPA)
      * On the Aviatrix Controller, on the same page, pick the Gateway that you want to receive the old EIP and enter the old-EIP. (Example: Pick Gateway B and enter EIPA. This will release EIPB)


**Terraform:**

* Our `Github repository <https://github.com/AviatrixSystems/terraform-provider-aviatrix>`_ has multiple branches. Please make sure that you pick the branch which matches with the version of your the software release on your Aviatrix Controller. The latest release is supported with the mainline. For example: UserConnect-3.5 branch if you are using Version 3.5 on Controller.
