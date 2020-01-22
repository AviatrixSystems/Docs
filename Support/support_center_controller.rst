﻿.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center, controller, bacakup, iam, upgrade, rest api, ssl certificate, controller HA, alerts, blackhole, interfaces, keepalive, certificate, dns, idle timeout, migrate controller, ca signed cert, saml auth, lost password

===========================================================================
Controller
===========================================================================

What are the minimum requirements for an instance to run the Aviatrix Controller Software?
---------------------------------------------------------------------------------------------------

We strongly recommend that the instance be at least t2.large and have at least 32GB of storage to act as a Controller in AWS. Please check out https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#select-instance-size for more information.

The controller needs to be able to resolve all DNS queries, download software, communicate with the gateways over port 443, redirect inbound SAML VPN connection (if used). The same goes with the gateways in regards to DNS queries and sending keepalive back to the controller. The Aviatrix controller must have an EIP even if it is behind an ELB for all necessary communication to work. However, you may access the UI using its private IP for operation.

If you have enabled `Controller HA functionality <https://docs.aviatrix.com/HowTos/controller_ha.html>`_, please disable before initiating the following process. And do not forget to enable Controller HA after you finish with the disk size upgrade process.
 
If you have less than 32GB of Storage on your controller, please follow these steps to increase your disk space:

1. Make a backup of your controller. (https://docs.aviatrix.com/HowTos/controller_backup.html)
2. Login to the AWS console and locate the Aviatrix controller instance.
3. Click on Root device: /dev/sda1 and then click on EBS ID vol-xxxxxxxxxx.
4. With the volume selected, click Action > Modify Volume to change the size to 32.
5. Click OK to start the resize process. Please make sure you wait until the state of the volume is "in-use - completed (100%)".
6. Select the Aviatrix controller instance in EC2 page. Click Reboot for the disk space to take effect.
7. Confirm that the controller is in running state in AWS console.
8. Login to your controller to sanity test.
9. Take a backup again, by following instructions at https://docs.aviatrix.com/HowTos/controller_backup.html

Note that rebooting the controller will not impact your IPsec tunnels as it's not in the data path. Please send an email to support@aviatrix.com, if you have any questions.



Why are IAM policies important?
---------------------------------

During the launch of your Aviatrix Controller, two IAM roles(aviatrix-role-ec2 & aviatrix-role-app) are created and two associated IAM policies(aviatrix-assume-role-policy & aviatrix-app-policy) are also created. These roles and policies allow the Controller to use AWS APIs to launch gateway instances, create new route entries and build networks and are hence very important to keeping your network operational. Please check out `IAM Policies <https://docs.aviatrix.com/HowTos/iam_policies.html>`_, `Requirements <https://docs.aviatrix.com/HowTos/aviatrix_iam_policy_requirements.html>`_, `Customization <https://docs.aviatrix.com/HowTos/customize_aws_iam_policy.html>`_ and `IAM for Secondary Access Accounts <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_. After a software upgrade, please update your IAM policies using the instructions in the above links - these updates have to be done for all accounts that have the Controller and the gateway. 

We expect the following:

  * All of your Aviatrix Controllers and Gateways to have "aviatrix-role-ec2" attached
  * Your account to have an IAM role named "aviatrix-role-ec2", with an IAM policy named "aviatrix-assume-role-policy" attached to it. The policy should be identical to the `specified policy requirements <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`_, unless it is customized carefully
  * Your account to have another IAM role named "aviatrix-role-app", with an IAM policy named "aviatrix-app-policy" attached to it. The policy should be identical to the `specified policy requirements <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`_, unless it is customized carefully
  * If you have secondary accounts, the above roles in all of the secondary  accounts should be trusting the Controller's AWS account number via the "Trust Relationship" tab on the role.



Why should I upgrade my Controller Software?
----------------------------------------------

Our engineering team works very hard to fix issues on a continuous basis. We also continue to add new features and try to enhance the systems to keep your network working effectively and securely. Please take advantage of this and stay on the latest releases.  `Controller upgrade <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_ does not affect your tunnels. Please keep your controller's size at > t2.large!


Does Aviatrix Controller support automation?
-------------------------------------------------

The Aviatrix Controller supports a `comprehensive set of REST API <https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm>`_ to enable automation

We also support Terraform. Please check out `Aviatrix Terraform Tutorial <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_, `Aviatrix Terraform Provider <https://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_, `Transit Network using Terraform <https://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_ and our `Github Repository <https://github.com/terraform-providers/terraform-provider-aviatrix>`_.


Can I use an SSL Certificate from AWS ACM?
-------------------------------------------

You can place your `controller behind an ELB in AWS <https://docs.aviatrix.com/HowTos/controller_ssl_using_elb.html>`_ and use your certificate from AWS ACM. Remember to increase the `default ELB idle connection timeout <https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#connection-idle-timeout>`_ from 60 seconds to at least 300 seconds.


How do I backup my Aviatrix configuration?
------------------------------------------

Please checkout `backup functionality <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ on your Aviatrix controller. 

* If you have a "."/period character in the S3 bucket name, please ensure you are running software version 4.0.685 or later.)
* We strongly recommend the "Multiple Backup" setting to be turned on at Controller/Settings/Maintenance/Backup&Restore. After turning this option on - click on Disable and then Enable and then click on "Backup Now." Check in your S3 bucket to make sure that the backup function is successful.
* We support `backup using AWS encrypted storage <https://docs.aviatrix.com/HowTos/controller_backup.html#how-to-backup-configuration-with-aws-encrypted-storage>`_
* Please do not use the AWS's AMI to take snapshots - this is not a valid backup mechanism and will not work


How can I customize the Controller GUI?
--------------------------------------

* On the Gateway page, you can customize the columns and add more information(click on the "Name, State, ..." drop down list box and select the fields you are interested in). You can also sort and filter on any column by clicking on header.
* On the gateway page, you can adjust the number of gateways you can see at a time - the default is 5 gateways

How can I troubleshoot connectivity issues?
--------------------------------------------
Please refer to `How to use Aviatrix FlightPath <https://docs.aviatrix.com/HowTos/flightpath_deployment_guide.html>`_!!


Does Aviatrix support High Availability?
------------------------------------------

We have HA built into our system through `Transit HA <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ and `Single AZ HA <https://docs.aviatrix.com/HowTos/gateway.html#gateway-single-az-ha>`_. The `Gateway HA <https://docs.aviatrix.com/Solutions/gateway_ha.html>`_ is now deprecated. 

`Aviatrix Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ does not support HA in multiple regions, but works across multiple AZ's. More information `here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/README.md>`_


Does Controller send alerts when Gateway status changes?
--------------------------------------------------------------------

The Aviatrix Controller monitors the gateways and tunnels and whenever there is a tunnel or gateway state change, it will send an email to the admin of the system. You can always override the admin email by updating "ControllerUi/Settings/Controller/Email/StatusChangeEventEmail". If you do not want to see these emails, you can set it to an email address that you don't monitor.

As an alternative, you can also set Cloudwatch Event Alerts in AWS to be alerted when Gateway/Controller Instances are Started or Stopped.

What are blackholes on Alert Bell?
--------------------------------------------------------------------

Blackhole route(s) usually means that the route in your AWS route table points to a non-existant AWS resource.
Besides, a route pointing to an EC2 with the stopped state will have this blackhole state.

The blackhole definition on the AWS website: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeRouteTables.html
route.state - The state of a route in the route table (active | blackhole). The blackhole state indicates that the route's target isn't available (for example, the specified gateway isn't attached to the VPC, the specified NAT instance has been terminated, and so on).

Here is more info for the Aviatrix Alert Bell function: https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html
Alert Bell is a new multi purpose alerting function displayed on the Aviatrix Controller Console. For example, Aviatrix Controller periodically scans your AWS route tables and alerts you if there is any blackhole entry in your AWS route table that needs to be cleaned up as best practice. GuardDuty findings are also recorded by Alert Bell.

You can decide to remove the blackholes in AWS portal if they are not needed.


How can I check and track configuration changes and run audit on my Aviatrix System?
--------------------------------------------------------------------------------------

You have a couple ways to run audits on the Aviatrix System:

 * You can view and download audit logs from "Controller GUI > Troubleshoot > Logs > Display Logs > Display Audit Logs" and "Download Audit Logs". More information `here <https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#operations>`_
 * If you have `external logging <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_ enabled, you can search for "AviatrixCMD" on your logging system. More information `here <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id11>`_


Which Aviatrix gateway interface to perform packet capture on?
--------------------------------------------------------------

An Aviatrix gateway may have a single or multiple interfaces depending on the type of gateway used for a network deployment. Therefore, it will be helpful if a user knows which interface to perform the packet capture when troubleshooting a network connectivity or packet flow issue. Please note that all interfaces on the Aviatrix gateway are automatically created based on the features enabled.

+-----------------------+--------------------------------+--------------------------------------------------------+
| Gateway Type          | Interface                      | Description                                            |
+=======================+================================+========================================================+
| SSLVPN                | eth0                           | Main interface                                         | 
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun0                           | Interface created for OpenVPN connection               |
+-----------------------+--------------------------------+--------------------------------------------------------+
| Regular               | eth0                           | Main interface                                         | 
| (created in GW page)  |                                |                                                        |
+-----------------------+--------------------------------+--------------------------------------------------------+
| Spoke                 | eth0                           | Main interface                                         |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-XXXXXXXX                   | (Optional) VTI to the Aviatrix Transit gateway         |
+-----------------------+--------------------------------+--------------------------------------------------------+
| Transit               | eth0                           | Main interface                                         |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-XXXXXXXX                   | VTI to the VGW, external device or CloudN              |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-YYYYYYYY (to Gateway_Name) | VTI to each Spoke gateway                              |
+-----------------------+--------------------------------+--------------------------------------------------------+
| Transit for TGW only  | eth0                           | Main interface                                         |
|                       +--------------------------------+--------------------------------------------------------+
|                       | eth1                           | Interface connecting to AWS Transit GW                 |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-XXXXXXXX                   | VTI to the VGW, external device or CloudN              |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-YYYYYYYY (to Gateway_Name) | (Optional) VTI to each Transit peering gateway         |
+-----------------------+--------------------------------+--------------------------------------------------------+
| Transit DMZ           | eth0                           | Main interface                                         |
| (Main)                +--------------------------------+--------------------------------------------------------+
|                       | eth1                           | (Optional) Interface connecting to AWS Transit Gateway |
|                       +--------------------------------+--------------------------------------------------------+
|                       | eth2                           | Interface connecting to Firewall instance              |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-YYYYYYYY (to Gateway_Name) | (Optional) VTI to each Spoke or Transit peering gateway|
+-----------------------+--------------------------------+--------------------------------------------------------+
| Transit DMZ           | eth0                           | Main interface                                         |
| (Companion)           +--------------------------------+--------------------------------------------------------+
|                       | eth2                           | Interface connecting to Firewall instance              |
|                       +--------------------------------+--------------------------------------------------------+
|                       | tun-XXXXXXXX                   | (Optional) VTI to the VGW, external device or CloudN   |
+-----------------------+--------------------------------+--------------------------------------------------------+

In order to perform a packet capture, go to Troubleshoot > Diagnostics > Network page and scroll down to Packet Capture section. Select the target gateway and the interface you want to capture the packet and all other relevant fields. By default, the packet capture will run for 60 seconds when no duration is configured. The maximum packet capture duration is 240 seconds and you may manually stop the process at any time.




 
Why are my Gateways reported as down?
--------------------------------------------------------------

The Aviatrix Controller depends on `Gateway keepalive messages <https://docs.aviatrix.com/HowTos/gateway.html#gateway-keepalives>`_ from the Gateways to determine the `Gateway status <https://docs.aviatrix.com/HowTos/gateway.html#gateway-status>`_. The default configuration for Gateway keepalives is set to "medium" - which means that the Gateway will be sending a keepalive to the Controller every 12 seconds and the Controller runs a health check on the Gateway every 60 seconds. The Gateway is considered to be "UP" if the Controller receives 2 or more message between two consecutive health checks.
 
Sometimes due to Cloud Infrastructure and/or Network issues, there is a temporary glitch in network connectivity which could lead to the Gateway being marked as "Down" and the Controller sending an alert email. If you do receive such a message, please check the status of the tunnels on the Gateway and run `Diagnostics on the Gateway <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_.

The Gateway could also be reported as "Down" due to the Controller's Security Group not being open to the Gateway’s EIP. To restrict the Security Groups on the Controller to allow traffic from all Gateways automatically, you can turn on the `Controller Security Group Management <https://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_ feature at "Controller UI > Settings > Controller > Security Group Management"

Please also note that a Gateway "Down" state does not necessarily mean IPsec or OpenVPN service is down - it only means that the Controller has not received the keepalive messages from the Gateway and that could be due to a few reasons as mentioned above.


What is the preferred way for generating a CSR and uploading a Signed CA Certificate to the Aviatrix Controller?
------------------------------------------------------------------------------------------------------------------------

The recommended way is to generate a CSR and have it signed by your CA and then upload the signed cert, ca cert and the key at "Controller Web Interface > Settings > Advanced > Security > Import Method > Import Certificate with the Key". `Instructions to generate CSR <https://support.comodoca.com/Com_KnowledgeDetailPage?Id=kA01N000000zFU6>`_



Why is having a reachable DNS server important for the Aviatrix Controller?
----------------------------------------------------------------------------------------------------
 
When an Aviatrix Controller is launched, by default it will pick up the DNS used in the VPC DHCP Options and the default AWS DHCP is using AmazonProvidedDNS. If VPC DHCP Options are not set, it will use the AWS's Default DNS server (ex: 10.1.0.2 if VPC CIDR is 10.1.0.0/16).

If you have a DNS server configured in DHCP options, please make sure that it can resolve public FQDNs. The Aviatrix Controller depends on this service to run as designed and will run into unexpected problems if it cannot resolve public FQDNs
 
If you are using AWS's VPC DNS Service, please do make sure that "enableDnsSupport" is turned on - else, AWS will not provide DNS services in the VPC (https://docs.aws.amazon.com/vpc/latest/userguide/vpc-dns.html, https://docs.aws.amazon.com/glue/latest/dg/set-up-vpc-dns.html)


How can I increase the idle timeout when my Aviatrix Controller is deployed behind an ELB, to avoid frequent logins?
----------------------------------------------------------------------------------------------------------------------

If the Aviatrix controller is behind an ELB, you can go to the AWS portal's Load Balancers page. Select the ELB that you use for the controller and Edit the attributes to increase the Idle timeout. We recommend at least 360 seconds. The default is 60 seconds. Please check out https://docs.aws.amazon.com/elasticloadbalancing/latest/application/application-load-balancers.html#connection-idle-timeout for more information.


How can I move my controller from one AWS account to another AWS account?
--------------------------------------------------------------------------

1. Backup the old controller configuration to an S3 bucket using these `instructions  <https://docs.aviatrix.com/HowTos/controller_backup.html>`_. FileName created should look like: CloudN_xxx_config.enc
2. In the target account, create a new controller, running the same Aviatrix Software Version as the old controller using `these directions <https://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html#how-to-launch-aviatrix>`_
3. Build the "Trust-Relationship" between all gateway (AWS) accounts and the new controller's AWS account using these `directions <https://docs.aviatrix.com/HowTos/HowTo_IAM_role.html#establish-trust-relationship-with-primary-account>`_. NOTE: Make sure that you repeat this step for every gateway's (AWS) account
4. Login to the new controller and run "Aviatrix Console/Settings/Maintenance/Backup&Restore/Restore" . Enter the AccessKey & SecretKey (which have the permissions to access the S3 bucket located in the same AWS account of your old controller), BucketName, FileName
5. After restore process is finished, check that the new controller can access/configure all the gateways from old controller.


How can I import a CA signed cert into my controller through REST API?
--------------------------------------------------------------------------

Here is a sample script to import a CA signed cert:

::

  # Description:
  #    This script demonstrates using Aviatrix REST API, "import_new_https_certs"

  # Instruction(s):
  #    + Please  replace  the content from line 11 to 23 with your own data

  import requests

  controller_hostname = '1.2.3.4'  # This can be the public IP or domain name of the Aviatrix controller
  api_endpoint_url = 'https://' + controller_hostname + '/v1/api'

  # File paths in local machine
  path_to_input_file_01 = './my-ca-cert.csr'       # assuming this file is in the same folder as this python script is
  path_to_input_file_02 = './my-server-cert.crt'
  path_to_input_file_03 = './my-private-key.key'


  body_payload = {
      'action': 'import_new_https_certs',
      'CID': 'Rzz61dB94uaYwpJX6dWn',  # Please provide your valid CID here
      'gateway_name': 'abg-us-east-1-spoke-s-rateshop-aviatrix-ubuntu'  # Comment out this parameter if this API is invoked against the Aviatrix controller
  }

  # Notes:
  #    + 'ca_cert', 'server_cert' and 'private_key' are actually the body-param names

  file_list = {
      'ca_cert': ('file_name_to_be_saved_in_server_01.cert', open(file=path_to_input_file_01, mode='rb'), 'application/vnd.ms-excel', {'Expires': '0'}),
      'server_cert': ('file_name_to_be_saved_in_server_02.cert', open(file=path_to_input_file_02, mode='rb'), 'application/vnd.ms-excel', {'Expires': '0'}),
      'private_key': ('file_name_to_be_saved_in_server_03.pem', open(file=path_to_input_file_03, mode='rb'), 'application/vnd.ms-excel', {'Expires': '0'})
  }

  response = requests.post(url=api_endpoint_url, data=body_payload, files=file_list, verify=False)
  print(response.text)


How can I use SAML for controller auth when I'm also using SAML for VPN authentication?
------------------------------------------------------------------------------------------

By default, we use "Hostname" for "Entity Id" when creating the SAML Endpoint in the Controller Console. When you create a second endpoint for controller login, you would have to pick "Custom" for "Entity Id" and use a custom string. You would have to use the same custom string for EntityId when you provision the SAML App at your IdP(Okta, Onelogin, Azure, etc)

How to reset Controller login password if it's lost or forgotten?
--------------------------------------------------------------

In case if you've lost or forgetten the password to AVX console, please use next steps to repair it:

1. Input the username to Username field, and press “Forgot password” from the login page

|login_page|

2. Check email and find the one time token inside. Message format is :

<<ONE TIME TOKEN>> is the one time Aviatrix token from controller <<IP ADDR AVX CONTROLLER>> and is valid for 15 minutes.

Please pay attention that the token expires in 15 minutes. If you repeatedly get this and think that this is being done by someone with malicious intent, you can restrict the IP's allowed to access your controller through AWS's Security Groups

3. Enter Access Token in Account Verification window:

|verification_window|

4. Type new password for the admin user:

|admin_user|

5. Press Save button and try to login with a new password

.. |login_page| image:: password-recovery-img/Pic1.png
   :scale: 70%
   
.. |verification_window| image:: password-recovery-img/Pic2.png
   :scale: 70%
   
.. |admin_user| image:: password-recovery-img/Pic3.png
   :scale: 70%  
   

How can I secure my controller?
-----------------------------------

Please follow the instructions `here <https://docs.aviatrix.com/HowTos/FAQ.html#how-do-i-secure-the-controller-access>`_ to secure your controller.
