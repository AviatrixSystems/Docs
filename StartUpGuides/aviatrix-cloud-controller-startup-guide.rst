.. meta::
    :description: Install the Aviatrix Controller, 2 Gateways, and setup peering in AWS
    :keywords: Aviatrix, AWS, Global Transit Network, AWS VPC Peering, VPC Peering, Egress Control, Egress firewall, OpenVPN, SSL VPN


==================================================================
AWS Startup Guide
==================================================================


Welcome. Your Aviatrix product experience starts here. 

The Aviatrix Controller provides a single pane of glass for all your network connectivity tasks. Once you have a Controller instance launched in a VPC, you can start building a Transit Network, remote user VPN, or multi-cloud peering, etc. 

To learn about all the Aviatrix use cases, read the `Aviatrix overview. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_

In this guide, we'll walk you through the first 4 steps. By the end, you'll be 
ready for your first use case. 

  |4-steps|

You can also `watch a video <https://youtu.be/ltL_dWjjV0w>`_ for this startup guide. 

Before you start, you need to have an `AWS account <https://aws.amazon.com/>`__.   Create a new account or login to an existing IAM account.

.. Important::

    - We require this AWS IAM account to have permissions to create AWS IAM roles, IAM policies and launch EC2 instances. 
    - The Controller instance must be launched on a public subnet in a VPC. 
    - All AMIs should be launched by CloudFormation template provided by Aviatrix, as described in the next section.
..


Step 1. Subscribe to an Aviatrix AMI 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1.1 Select an AMI  
----------------------------------------------------------------

Select the right AMI that meets your use case and subscription preference. Click an AMI link will take you to the AWS Marketplace to complete step 1.2 only. 
(Open a new tab on the selected AMI so you can follow along with this guide.)

- **Metered AMI** `Aviatrix Secure Networking Platform PAYG - Metered AMI <https://aws.amazon.com/marketplace/pp/B079T2HGWG?ref=_ptnr_docs_link_startup_metered>`_ is a pay as you go cloud consumption model for all use cases: 
   - Next-Generation Transit VPC Network  
   - VPC Egress Security  
   - Remote User VPN (OpenVPN®)  
   - Multicloud Peering 
   - Encrypted Peering 
   - Site to Cloud IPSEC VPN 
   - FREE - EC2 FlightPath Troubleshooting Tool
   - FREE – Two Tunnels (Free Forever)
   
- **Private Offer AMI** `Aviatrix Secure Networking Platform - Custom AMI <https://aws.amazon.com/marketplace/pp/B0155GB0MA?qid=1523554442785&sr=0-1&ref_=srh_res_product_title>`_ includes a 14-day free trial and is a utility model for use cases that build IPSEC and SSL VPN: 
   - Next-Generation Transit VPC Network  
   - Remote User VPN (OpenVPN®)  
   - Multicloud Peering 
   - Encrypted Peering 
   - Site to Cloud IPSEC VPN 

- **Utility User VPN AMI** We offer a range of `OpenVPN® User Access <http://docs.aviatrix.com/HowTos/uservpn.html>`_ AMIs. You can choose `10 User VPN Server <https://aws.amazon.com/marketplace/pp/B076HZP38D?ref=_ptnr_docs_link_startup_user010>`_, `25 User VPN Server <https://aws.amazon.com/marketplace/pp/B076JR3PL6?ref=_ptnr_docs_link_startup_user025>`_, `50 User VPN Server <https://aws.amazon.com/marketplace/pp/B0775F2NS5?ref=_ptnr_docs_link_startup_user050>`_, `100 User VPN Server <https://aws.amazon.com/marketplace/pp/B0773DJZ9R?ref=_ptnr_docs_link_startup_user100>`_.

- **BYOL AMI** `Aviatrix for Cloud Interconnect, Cloud Peering and VPN (BYOL) <https://aws.amazon.com/marketplace/pp/B0155GAZ1C?ref=_ptnr_docs_link_startup_byol>`_ offers BYOL license for all use cases. Contact support@aviatrix.com for a 30 day free trial license. 

1.2 Subscribe to the selected AMI
----------------------------------------

1.2.1 Continue to Subscribe
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For example, if you select Inter-Region VPC Peering 5 Tunnel AMI, click `Continue to Subscribe`. Subscribing means that you can begin deploying the software in later steps via the CloudFormation template. 
 
   |imageAwsMarketplaceContinuetoSubscribe5tunnel|

1.2.2 Accept Software Terms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Click `Manual Launch` and `Accept Software Terms`. Return to this guide and continue. (Do not proceed with install of the Controller instance from the marketplace.) 

    |imageAwsMarketplaceAcceptTerms|

1.2.3 Product Support Connection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Enter your contact information to connect this subscription to Aviatrix's technical support system and obtain a free upgrade to 24x7x365 support. You can choose to sign up later, or edit/remove your details at any time. Click `Register Product Support`


.. tip::

  If the VPC where the Controller is deployed in has a custom DNS server (via DHCP option), make sure the Controller instance can reach this DNS server.  

..

Step 2. Launch the Controller with CloudFormation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Now that you have subscribed to an AMI, you are ready to install the Controller instance.

Each Aviatrix AMI in AWS marketplace has a companion CloudFormation template. The template is used to launch the Controller instance. Highlight and copy the `CloudFormation Template URL Link Address` for the AMI you intend to launch.  

============================================                  ============================================
**Subscribed Controller AMI**                                 **CloudFormation Template URL Link Address**
============================================                  ============================================
Secure Networking Platform PAYG - Metered                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-metering-controller.json
Secure Networking Platform - Custom                           https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/avx-awsmp-5tunnel.template
SSL VPN Server - 10 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aviatrix-sslvpn-10-users.template 
SSL VPN Server - 25 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-sslvpn-25-users.json
SSL VPN Server - 50 users                                     https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aviatrix-ssl-vpn-server-50-user.template
SSL VPN Server - 100 users                                    https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-aviatrix-sslvpn-100-users.json
SSL VPN Server Bundle (10 users + 1 peering)                  https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/aws-cloudformation-sslvpnbundle.json
Cloud Interconnect BYOL                                       https://s3-us-west-2.amazonaws.com/aviatrix-cloudformation-templates/avx-awsmp-BYOL.template 
============================================                  ============================================

 2.1. In the AWS console, change to the region where you would like to install the Aviatrix Controller.

 2.2. Once in the correct region, go to the `CloudFormation <https://console.aws.amazon.com/cloudformation/home>`_ service.

 2.3. Click `Create new stack` or `Create Stack`

   |imageCFCreate|

 2.4. Select `Specify an Amazon S3 template` and paste the `CloudFormation Template URL Link Address` for the AMI you selected in the above table.  

   |imageCFSelectTemplate-S3|

 2.5. Click `Next`

 2.6. Fill in the following fields, 
  - the Stack name,
  - select a VPC in the drop down menu, 
  - select a public subnet in that VPC (Go to AWS VPC console to make sure the public subnet is indeed in your selected VPC. Read `this link  <https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html>`_ if you do not know what public subnet is.)  
  - and a keypair (Read `how to create a keypair <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html>`_ to create a keypair in AWS EC2 console if this field is blank.)

   |imageCFSpecifyDetails|

.. note::

   The Aviatrix Controller must be launched on a public subnet. If this is the first time you launch Aviatrix Controller, select the default setting **New** for IAM Role Creation. If Aviatrix IAM role has been created before, select **aviatrix-role-ec2** for IAM Role Creation.  The Aviatrix Controller instance is termination protected. 
..

 2.7. Leave the `Controller Size` at `t2.large` and keep the `IAM role creation` at "New" unless you have already created the Aviatrix IAM roles.

 2.8. Click `Next`

 2.9. Optionally, add any key/value tags as required

 2.10. Optionally, select an IAM Role if your currently logged in user does not have permission to create instances.

 2.11. We recommend you to enable stack termination protection during stack creation time to prevent accidental deletion, as shown below, then click `Next`

  |imageCFEnableTermProtection|
     
.. Warning::

  The Controller instance has Termination Protection enabled. If you need to delete the stack, make sure you first disable the Controller instance Termination Protection at the AWS EC2 console.

..

 2.12. Click the checkbox next to "I acknowledge that AWS CloudFormation ..." and then click `Create`.

   |imageCFCreateFinal|

 2.13. Once the stack creation completes (Status change to `CREATE_COMPLETE`), click on the `Outputs` tab.  The values displayed will be needed when configuring primary access account in Aviatrix.
   
   |imageCFComplete|


Step 3. Connect to the Controller 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Now that Aviatrix Controller instance has been launched, let's login and go through a few init steps.

 3.1. Open a browser window to https://AviatrixControllerEIP, where AviatrixControllerEIP can be found in the Stack Outputs. You can also find the Controller instance EIP by going to AWS EC2 console, click the Controller instance and locate its public IP address. 

.. tip::
   You may receive a warning that the connection may not be secure.  This is because the certificate is self-signed by the Controller.  It is safe to continue to the page.

..

   |imageControllerBrowserWarning|

 3.2. Login with the username `admin`.

   For the password field, use the `AviatrixControllerPrivateIP`.  The `AviatrixControllerPrivateIP` can be found in the Outputs section of the CloudFormation stack. You can also find the Controller instance's private IP address by going to AWS EC2 console, click the Controller instance and locate its private IP address. 
   
   |imageCFOutputsWithPassword|

 3.3. Enter your email address.  This email will be used for alerts as well as password recovery (if needed).

   |imageControllerEnterEmail|

 3.4. Next, you will be prompted to change the admin password.

   |imageControllerChangePassword|

 3.5. Click `Skip` in the next page, unless the Controller instance VPC has an HTTP or HTTPS proxy configured for Internet access. 

   |imageproxy-config|

 3.6. Finally, the Controller will upgrade itself to the latest software version after you click on `Run`. Wait for a few minutes for the process to finish. 

   |imageControllerUpgrade|

.. tip::
   The Controller upgrade takes about 3-5 minutes.  Once complete, the login prompt will appear.  Use the user `admin` and your new password to login.

..

Step 4. Create A Primary Access Account 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

4.1 Select AWS 
---------------

Once logged back in to the Controller, you should be on the `Onboarding` page or click "Onboarding` on the navigation item. Then click AWS icon. 

   |imageOnboardAws|


4.2  (Only apply to BYOL AMI) Enter Your Customer ID 
-----------------------------------------------------

.. Note::

   This step only applies if you select BYOL AMI. Contact support@aviatrix.com to get a trial license if you do not have one.
..
   
Enter the `Customer ID` in the field and click `Save`.

   |imageEnterCustomerID|
   
4.3  Setup a Primary Access Account  
------------------------------------

The Aviatrix primary access account contains the following information:

  - The Controller instance's AWS 12 digit account ID.

Check out `this link <http://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-an-aviatrix-access-account-on-the-controller>`_ if you have questions regarding Aviatrix access account. 

Fill out the fields as follows: (The AWS Account Number can be found at the Stack Outputs section or get from `this link. <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_)

  +-------------------------------+--------------------------------------------+
  | Field                         | Expected Value                             |
  +===============================+============================================+
  | Account Name                  | Enter a name that is unique on the         |
  |                               | Controller.                                |
  |                               | Example name: `AWSOpsTeam`.                |
  +-------------------------------+--------------------------------------------+
  | AWS Account Number            | The Controller instance's 12 digit         |
  |                               | AWS account number. It can be found in the |
  |                               | Stack Outputs section `AccoundId`.         |
  +-------------------------------+--------------------------------------------+
  | IAM role-based                | Check this box.                            |
  +-------------------------------+--------------------------------------------+

Once complete, click the `Create` button at the bottom of the form.

|imageCreateAccount|


Next: Start a Use Case 
^^^^^^^^^^^^^^^^^^^^^^^^^

Congratulations!  

You are now ready to establish connectivities to/from the cloud. Here are some of the things you can do:

- `Build Net-Gen Transit Network <../HowTos/transitvpc_workflow.html>`__
- `Build User SSL VPN <../HowTos/uservpn.html>`__
- `Build Egress Security <../HowTos/FQDN_Whitelists_Ref_Design.html>`__
- `Build Site to Cloud VPN <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_
- `Build Multicloud Peering <http://docs.aviatrix.com/HowTos/GettingStartedAzureToAWSAndGCP.html>`_
- `Build Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html>`_

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.  

For technical support, email us at support@aviatrix.com

Enjoy!

.. add in the disqus tag

.. disqus::

.. |4-steps| image:: ZeroToConnectivityInAWS_media/4-steps.png
   :scale: 40%

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

.. |imageproxy-config| image:: ZeroToConnectivityInAWS_media/proxy_config.png
   :scale: 25%

.. |imageControllerUpgrade| image:: ZeroToConnectivityInAWS_media/controller_upgrade.png
   :scale: 50%

.. |imageCFSelectTemplate| image:: ZeroToConnectivityInAWS_media/cf_select_template.png
.. |imageCFSelectTemplate-S3| image:: ZeroToConnectivityInAWS_media/imageCFSelectTemplate-S3.png
.. |imageCFSpecifyDetails| image:: ZeroToConnectivityInAWS_media/cf_specify_details_new.png

.. |imageCFEnableTermProtection| image:: ZeroToConnectivityInAWS_media/cf_termination_protection.png
   :scale: 50%

.. |imageAviatrixOnboardNav| image:: ZeroToConnectivityInAWS_media/aviatrix_onboard_nav.png
   :scale: 50%

.. |imageOnboardAws| image:: ZeroToConnectivityInAWS_media/onboard_aws.png
   :scale: 50%

.. |imageEnterCustomerID| image:: ZeroToConnectivityInAWS_media/customerid_enter.png
   :scale: 25%

.. |imageCreateAccount| image:: ZeroToConnectivityInAWS_media/create_account.png
