.. meta::
    :description: Install the Aviatrix Controller, 2 Gateways, and setup peering in AWS
    :keywords: Aviatrix, AWS, Global Transit Network, AWS VPC Peering, VPC Peering, Egress Control, Egress firewall, OpenVPN, SSL VPN


==================================================================
AWS
==================================================================


This guide helps you get started with Aviatrix in AWS. If you have not installed an Aviatrix Controller in your environment and you'd like to get it set up in AWS this is the right guide for you.

The Aviatrix Controller provides a single pane of glass for all your cloud connectivity tasks. Once you have a Controller installed in a VPC, you can launch Aviatrix gateways and build your network. 

To learn all Aviatrix solutions, read the `Aviatrix overview. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_

Before you start, you need to have an `AWS account <https://aws.amazon.com/>`__.   Create a new account or login to an existing IAM account.

.. Important::

   We require this AWS IAM account has permissions to create AWS IAM roles, IAM policies and attach policies to the IAM roles. 

Follow the steps below to install Aviatrix Software. 

1. Subscribe to an Aviatrix AMI from AWS Marketplace
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to `AWS Marketplace <https://aws.amazon.com/marketplace>`_, search "aviatrix", you should see a list of Aviatrix marketplace offerings.

For example, if you select Aviatrix Private Offer or Inter-Region VPC Peering 5 Tunnel AMI, select `AWS Marketplace Aviatrix Private Offer <https://aws.amazon.com/marketplace/pp/B0155GB0MA>`_, click `Continue to Subscribe`.
 
   |imageAwsMarketplaceContinuetoSubscribe5tunnel|

Click `Manual Launch` and then `Accept Software Terms`. Once accepted, continue to the next step in this guide. 

    |imageAwsMarketplaceAcceptTerms|


.. Important::

  We recommend you to launch all AMIs by CloudFormation template provided by Aviatrix, as shown in the following table. 

..

.. tip::

  If the VPC where the Controller is deployed in has a custom DNS server (via DHCP option), make sure the Controller instance can reach this DNS server. 

..

2. Launch the Controller with CloudFormation Template
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Each Aviatrix AMI in AWS marketplace has a corresponding cloudformation tempalte URL stored in S3. Copy the URL link address for the AMI you intend to launch. This URL link address is needed when you create the cloudformation stack in the next few steps. 

============================================                  ================================
**Controller AMI Name**                                       **CloudFormation Template URL**
============================================                  ================================
Inter-Region VPC Peering 5 Tunnel License                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/avx-awsmp-5tunnel.template
Inter-Region VPC Peering 2 Free Tunnel                        https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-2-free-tunnels.json
SSL VPN Server - 10 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aviatrix-sslvpn-10-users.template 
SSL VPN Server - 25 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-sslvpn-25-users.json
SSL VPN Server - 50 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aviatrix-ssl-vpn-server-50-user.template
SSL VPN Server - 100 users                                    https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-sslvpn-100-users.json
SSL VPN Server Bundle (10 users + 1 peering)                  https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-sslvpnbundle.json
Cloud Interconnect BYOL                                       https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/avx-awsmp-BYOL.template 
EC2 FlightPath Tool                                           https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-ec2-flightpath-tool.json 
============================================                  ================================

 2.1. In the AWS console, change to the region where you would like to install the Aviatrix Controller.

 2.2. Once in the correct region, go to the `CloudFormation <https://console.aws.amazon.com/cloudformation/home>`_ service.

 2.3. Click `Create new stack` or `Create Stack`

   |imageCFCreate|

 2.4. Select `Specify an Amazon S3 template` and copy and paste the URL based on the AMI you selected in the above table.  

   |imageCFSelectTemplate-S3|

 2.5. Click `Next`

 2.6. Populate the Stack name and select a VPC, subnet, and a keypair.

   |imageCFSpecifyDetails|

.. note::

   The Aviatrix Controller must be launched on a public subnet. If this is the first time you launch Aviatrix Controller, select the default setting **New** for IAM Role Creation. If Aviatrix IAM role has been created before, select **aviatrix-role-ec2** for IAM Role Creation.  The Aviatrix Controller instance is termination protected. 
..

 2.7. Leave the `Controller Size` at `t2.large` and keep the `IAM role creation` at "New" unless you have already created the Aviatrix IAM roles.

 2.8. Click `Next`

 2.9. Optionally, add any key/value tags as required

 2.10. Optionally, select an IAM Role if your currently logged in user does not have permission to create instances.

 2.11. We recommed you to enable stack termination protection during stack creation time to prevent accidental deletion, as shown below, then click `Next`

  |imageCFEnableTermProtection|
     
.. Warning::

  The Controller instance has Termination Protection enabled. If you need to delete the stack, make sure you first disable the Controller instance Termination Protection at the AWS EC2 console.

..

 2.12. Click the checkbox next to "I acknowledge that AWS CloudFormation ..." and then click `Create`.

   |imageCFCreateFinal|

 2.13. Once complete, click on the `Outputs` tab.  The values displayed will be needed when configuring AWS account in Aviatrix.
   
   |imageCFComplete|


3. Connect to the Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Now that Aviatrix Controller instance has been launched, let's connect to it and go through a few init steps.

 3.1. Open a browser window to https://AviatrixControllerEIP found in the Outputs

.. tip::
   You may receive a warning that the connection may not be secure.  This is because the certificate is self-signed by the Controller.  It is safe to continue to the page.

..

   |imageControllerBrowserWarning|

 3.2. Login with the username `admin`.

.. note::
   Use the `AviatrixControllerPrivateIP` as the password.  The `AviatrixControllerPrivateIP` is found in the Outputs section of the CloudFormation stack.
..
   
   |imageCFOutputsWithPassword|

 3.3. Enter your email address.  This email will be used for alerts as well as password recovery (if needed).

   |imageControllerEnterEmail|

 3.4. Next, you will be prompted to change the admin password.

   |imageControllerChangePassword|

 3.5. If you have an HTTP or HTTPS proxy, enter it on the next page.  Otherwise, click `Skip`.

 3.6. Finally, the Controller will upgrade itself to the latest version after you click on `Run`. Wait for a few minutes for the process to finish. 

   |imageControllerUpgrade|

.. tip::
   The Controller upgrade takes about 3-5 minutes.  Once complete, the login prompt will appear.  Use the user `admin` and your new password to login.

..

4. Onboarding
^^^^^^^^^^^^^

4.1 Select AWS 
--------------
Once logged back in to the Controller, you should be on the `Onboarding` page or click "Onboarding` on the navigation item. Then click AWS icon. 

   |imageOnboardAws|


4.2  (Only apply to BYOL AMI) Enter Your Customer ID 
-----------------------------------------------------

.. Note::

   This step only applies if you select BYOL AMI. Contact support@aviatrix.com to get a trial license if you do not have one.
..
   
Enter the `Customer ID` in the field and click `Save`.

   |imageEnterCustomerID|
   
4.3  Setup a Management Account  
------------------------------------------------

Why do you need a management account on the Controller?

This maybe the most complex concept in the entire product, so apologize for any confusion, 
and please let us explain. 

The complexity comes from how AWS API works and how AWS manages IAM roles. 

To build connectivity between two VPCs, the Aviatrix Controller launches Aviatrix gateway instances 
in the respective VPCs, instructs the gateways to build an IPSEC tunnel and modifies AWS route tables 
in each VPC. 

To accomplish this task, the Controller needs your AWS credentials to issue AWS APIs, for example,  
to launch the gateway instances and modify route tables, on your behalf. An AWS credential consists of 

 - `The 12 digit AWS account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_
 - `IAM roles and IAM policies <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_

Each AWS credential is recorded on Aviatrix Controller in a managment account (or account for short). 

If you need to connect two VPCs that are owned by one AWS account, you just need one AWS credential, i.e, one Aviatrix management account. 

If you need to connect two VPCs that are owned by two different AWS accounts, you then need two AWS credentials, therfore two managment accounts.  

.. Tip::

 The managment account is also associated an email address and login password in case you want to login to only manage that one account. 

..

This step creates one managment account that corresponds to one AWS credential. 

Fill out the fields as follows:

  +-------------------------------+--------------------------------------------+
  | Field                         | Expected Value                             |
  +===============================+============================================+
  | Account Name                  | One account corresponds to one AWS account |
  |                               | credential and the account name is unique  |
  |                               | on the Controller.                         |
  |                               | Example name: `AWSOpsTeam`.                |
  +-------------------------------+--------------------------------------------+
  | E-mail                        | The e-mail address for this team.          |
  +-------------------------------+--------------------------------------------+
  | Password                      | Password for login to the Controller.      |
  +-------------------------------+--------------------------------------------+
  | Confirm Password              |                                            |
  +-------------------------------+--------------------------------------------+
  | AWS Account Number            | The 12 digits AWS account number.          |
  +-------------------------------+--------------------------------------------+
  | IAM role-based                | Check this box.                            |
  +-------------------------------+--------------------------------------------+
  | aviatrix-role-app ARN         | This field is auto filled.                 |
  |                               | If not, enter the value from the           |
  |                               | CloudFormation output outputs              |
  |                               | `AviatrixRoleAppARN`                       |
  +-------------------------------+--------------------------------------------+
  | aviatrix-role-ec2 ARN         | This filed is auto filled.                 |
  |                               | If not, enter the value from the           |
  |                               | CloudFormation outputs `AviatrixRoleEC2ARN`|
  +-------------------------------+--------------------------------------------+

.. Note::

   Each managment account can corresponds to an AWS root account, IAM role, IAM administrator account or IAM user account with access privileges required by the Aviatrix solution. We strongly recommend you to use IAM role for security reasons.
  
Once complete, click the `Create` button at the bottom of the form.

|imageCreateAccount|


What's Next 
^^^^^^^^^^^^

Congratulations!  
You are now ready to establish connectivities to/from the cloud. Here are some of the things you can do:

- `Build User SSL VPN <../HowTos/uservpn.html>`__
- `Build Global Transit Network <../HowTos/transitvpc_workflow.html>`__
- `Build Egress Security Filter <../HowTos/FQDN_Whitelists_Ref_Design.html>`__
- `Build your own site to cloud IPSEC connectivity <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.  

For technical support, email us at support@aviatrix.com

Enjoy!

.. add in the disqus tag

.. disqus::

.. |imageAwsMarketplacePage1| image:: ZeroToConnectivityInAWS_media/aws_marketplace_page1.png
.. |imageAwsMarketplaceContinuetoSubscribe| image:: ZeroToConnectivityInAWS_media/aws_marketplace_step1.png
.. |imageAwsMarketplaceContinuetoSubscribe5tunnel| image:: ZeroToConnectivityInAWS_media/aws_marketplace_step1_5tunnel.png
.. |imageAwsMarketplaceAccept| image:: ZeroToConnectivityInAWS_media/aws_marketplace_step2.png
.. |imageAwsMarketplaceAcceptTerms| image:: ZeroToConnectivityInAWS_media/aws_marketplace_select_region_and_accept.png
.. |imageCFCreate| image:: ZeroToConnectivityInAWS_media/cf_create.png
.. |imageCFOptions| image:: ZeroToConnectivityInAWS_media/cf_options.png
.. |imageCFCreateFinal| image:: ZeroToConnectivityInAWS_media/cf_create_final.png
.. |imageCFComplete| image:: ZeroToConnectivityInAWS_media/cf_complete_outputs.png
.. |imageCFOutputsWithPassword| image:: ZeroToConnectivityInAWS_media/cf_complete_outputs_private_ip_highlight.png
.. |imageControllerBrowserWarning| image:: ZeroToConnectivityInAWS_media/controller_browser_warning.png
   :scale: 50%

.. |imageControllerEnterEmail| image:: ZeroToConnectivityInAWS_media/controller_enter_email.png
   :scale: 50%

.. |imageControllerChangePassword| image:: ZeroToConnectivityInAWS_media/controller_change_password.png
   :scale: 50%

.. |imageControllerUpgrade| image:: ZeroToConnectivityInAWS_media/controller_upgrade.png
   :scale: 50%

.. |imageCFSelectTemplate| image:: ZeroToConnectivityInAWS_media/cf_select_template.png
.. |imageCFSelectTemplate-S3| image:: ZeroToConnectivityInAWS_media/imageCFSelectTemplate-S3.png
.. |imageCFSpecifyDetails| image:: ZeroToConnectivityInAWS_media/cf_specify_details_new.png
.. |imageCFEnableTermProtection| image:: ZeroToConnectivityInAWS_media/cf_termination_protection.png

.. |imageAviatrixOnboardNav| image:: ZeroToConnectivityInAWS_media/aviatrix_onboard_nav.png
   :scale: 50%

.. |imageOnboardAws| image:: ZeroToConnectivityInAWS_media/onboard_aws.png
   :scale: 50%

.. |imageEnterCustomerID| image:: ZeroToConnectivityInAWS_media/customerid_enter.png
   :scale: 25%

.. |imageCreateAccount| image:: ZeroToConnectivityInAWS_media/create_account.png
