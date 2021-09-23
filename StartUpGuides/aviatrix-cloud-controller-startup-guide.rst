.. meta::
    :description: Install the Aviatrix Controller in AWS
    :keywords: Aviatrix, AWS, Global Transit Network, AWS VPC Peering, VPC Peering, Egress Control, Egress firewall, OpenVPN, SSL VPN


==================================================================
AWS Startup Guide
==================================================================

.. raw:: html

    <script>
    /**
    * Function that captures a click on an outbound link in Analytics.
    * This function takes a valid URL string as an argument, and uses that URL string
    * as the event label. Setting the transport method to 'beacon' lets the hit be sent
    * using 'navigator.sendBeacon' in browser that support it.
    */
    var captureOutboundLink = function(url) {
       ga('send', 'event', 'outbound', 'click', url, {
         'transport': 'beacon',
         'hitCallback': function(){document.location = url;}
       });
    }
    </script>

.. raw:: html

    <script>
    /**
    * Function that registers a click on an outbound link in Analytics.
    * This function takes a valid URL string as an argument, and uses that URL string
    * as the event label. Setting the transport method to 'beacon' lets the hit be sent
    * using 'navigator.sendBeacon' in browser that support it.
    */
    var getOutboundLink = function(url) {
      gtag('event', 'click', {
    	'event_category': 'outbound',
        'event_label': url,
        'transport_type': 'beacon',
        'event_callback': function() {window.open(url, '_blank');}
      });
    }
    </script>

.. raw:: html

    <script>
    /**
    * Function that registers a click on an outbound link in Analytics.
    * This function takes a valid URL string as an argument, and uses that URL string
    * as the event label. Setting the transport method to 'beacon' lets the hit be sent
    * using 'navigator.sendBeacon' in browser that support it.
    */
    var getOutboundLinkAndOpen = function(url) {
      gtag('event', 'click', {
        'event_category': 'outbound',
        'event_label': url,
        'transport_type': 'beacon',
        'event_callback': function() {}
      });
    }
    </script>
    

Welcome to getting started on AWS! This guide takes you through the 3 steps to launch the Controller instance. 
When complete, you'll be ready to deploy use cases. 

  |3-step|

..
    You can also `watch a video <https://youtu.be/ltL_dWjjV0w>`_ for this startup guide. 


.. important::

 The Aviatrix Controller must be launched by a cloudformation script provided by Aviatrix. Follow the instructions in this document to launch the Controller. Do not launch the Controller instance from AWS Console. 


Step 1. Subscribe to an Aviatrix AMI 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you have already subscribed the Metered AMI on AWS Marketplace, skip this step and proceed to Step 2.

1.1 Subscribe to the AMI  
----------------------------------------------------------------

Click the AMI link below to take you to the AWS Marketplace to complete step 1.1 and 1.2. 

.. |marketplace_metered_link2| raw:: html

    <a href="https://aws.amazon.com/marketplace/pp/B08NTSDHKG?qid=1616801289672&sr=0-2" target="_blank" onclick="getOutboundLinkAndOpen('https://aws.amazon.com/marketplace/pp/B08NTSDHKG?qid=1616801289672&sr=0-2');">Aviatrix Secure Networking Platform Metered with Copilot</a>

|marketplace_metered_link2|

..
    `Aviatrix Secure Networking Platform Metered - Copilot & 24x7 Support <https://aws.amazon.com/marketplace/pp/B08NTSDHKG?qid=1616801289672&sr=0-2&ref=_ptnr_docs_startup_metered_copilot24x7>`_


1.2 Continue to Subscribe 
----------------------------------------

Click `Continue to Subscribe`. Subscribing means that you can begin deploying the software in later steps via the CloudFormation template. 
 
   |AMI_24x7_copilot|

1.3 Accept Terms
-----------------------------

Click `Accept Terms`. **Return to this guide and continue**. (Do not proceed to Continue to Configuration)) 

    |imageAwsMarketplaceAcceptTerms|


Step 2. Launch the Controller with CloudFormation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

2.1 Click CloudFormation Link
--------------------------------

Click the link below to take you to the CloudFormation page on the AWS Console with the pre-loaded template. Follow the instructions in the next steps 
to run the Cloudformation script.   

.. |CFT_link| raw:: html

    <a href="https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=AviatrixController&templateURL=https://aviatrix-cloudformation-templates.s3-us-west-2.amazonaws.com/aws-cloudformation-aviatrix-metered-controller-copilot-24x7-support.template" target="_blank" onclick="getOutboundLinkAndOpen('CFT_launch');">CloudFormation for Aviatrix Secure Networking Platform Metered with Copilot</a> 


|CFT_link|

..
    `CloudFormation for Aviatrix Secure Networking Platform Metered - Copilot & 24x7 Support <https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=AviatrixController&templateURL=https://aviatrix-cloudformation-templates.s3-us-west-2.amazonaws.com/aws-cloudformation-aviatrix-metered-controller-copilot-24x7-support.template>`_


For other products, check out `Other Aviatrix Products CloudFormation launch scripts  <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html#other-aviatrix-products>`_.

2.2 Login to AWS Console
---------------------------

If you have not logged in, you will be prompted to login to AWS console. 

2.3 Change to the region
---------------------------

Change to the region  where you would like to install the Aviatrix Controller on the CloudFormation page. Note the CloudFormation is already loaded.

2.4 Click `Next` 
----------------------

 |cft-next|

2.5 Fill in the following fields 
-----------------------------------

  - the Stack name,
  - select a VPC in the drop down menu, 
  - select a **public subnet in that VPC** (Go to AWS VPC console to make sure the public subnet is indeed in your selected VPC. A public subnet must have a default route point to IGW in its associated VPC route table. Read `this link  <https://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/VPC_Subnets.html>`__ if you do not know what public subnet is.)
  - and a keypair (Read `how to create a keypair <https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html>`_ to create a keypair in AWS EC2 console if this field is blank.)

   |imageCFSpecifyDetails|

.. note::

   The Aviatrix Controller must be launched on a public subnet. If this is the first time you launch an Aviatrix Controller, select the default setting **New** for IAM Role Creation. If an Aviatrix IAM role has been created before, select **aviatrix-role-ec2** for IAM Role Creation.  The Aviatrix Controller instance is termination protected. 
..

2.6 Select instance size
--------------------------

Leave the `Controller Size` at `t2.large` and keep the `IAM role creation` at "New" unless you have already created the Aviatrix IAM roles.

For more information on Controller instance size selection, refer to `Controller sizing recommendations. <https://docs.aviatrix.com/Support/support_center_controller.html#what-are-the-minimum-requirements-for-an-instance-to-run-the-aviatrix-controller-software>`_.

2.7 Click `Next`
------------------

Click Next.

2.8 Click acknowledge
-------------------------

Click the checkbox next to "I acknowledge that AWS CloudFormation ..." and then click `Create`.

   |imageCFCreateFinal|

2.9 Check stack output
-------------------------

Once the stack creation completes (Status change to `CREATE_COMPLETE`), click on the `Outputs` tab.  The values displayed will be needed when configuring primary access account in Aviatrix. (You might have to refresh your browser window and/or AWS console to see your Stack show up and the Status to be updated).
   
   |imageCFComplete|
   


Step 3. Onboarding 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Now that Aviatrix Controller instance has been launched, let's login and go through the onboarding process. 

3.1 Access the Controller
---------------------------

Open a browser window to https://AviatrixControllerEIP, where AviatrixControllerEIP can be found in the Stack Outputs. You can also find the Controller instance EIP by going to AWS EC2 console, click the Controller instance and locate its public IP address. 

.. tip::
   You may receive a warning that the connection may not be secure.  This is because the certificate is self-signed by the Controller.  It is safe to continue to the page.

..

   |imageControllerBrowserWarning|

3.2 Login with the username `admin`
-------------------------------------

   For the password field, use the `AviatrixControllerPrivateIP`.  The `AviatrixControllerPrivateIP` can be found in the Outputs section of the CloudFormation stack. You can also find the Controller instance's private IP address by going to AWS EC2 console, clicking the Controller instance and locating its private IP address. 
   
   |imageCFOutputsWithPassword|

3.3 Enter your email address 
-------------------------------------

This email will be used for alerts as well as password recovery (if needed).

   |imageControllerEnterEmail|

3.4 Change password
-----------------------

Next, you will be prompted to change the admin password.

   |imageControllerChangePassword|

3.5 Click Run
----------------

Finally, the Controller will upgrade itself to the latest software version after you click on `Run`. Wait for a few minutes for the process to finish. 

   |imageControllerUpgrade|

.. tip::
   The Controller upgrade takes about 3-5 minutes.  Once complete, the login prompt will appear.  Use the username `admin` and your new password to login.

..

If you wish to run a custom version, consult the Aviatrix support team before attempting it. 

3.6  Select AWS
-------------------

Once logged back into the Controller, you should be on the `Onboarding` page. You can also do this by clicking "Onboarding` on the navigation item. Then click the AWS icon. 

   |imageOnboardAws|

3.7  Setup a primary access account  
--------------------------------------

The Aviatrix primary access account contains the following information:

  - The Controller instance's AWS 12 digit account ID.

Check out `this link <http://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-an-aviatrix-access-account-on-the-controller>`__ if you have questions regarding Aviatrix access account.

Fill out the fields as follows: (The AWS Account Number can be found at the Stack Outputs section or get from `this link. <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`__)

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

You are now ready to deploy use cases. Here are some of the things you can do:

- `Build Net-Gen Transit Network for AWS <https://docs.aviatrix.com/HowTos/tgw_plan.html>`__
- `Build Egress Security <../HowTos/FQDN_Whitelists_Ref_Design.html>`__
- `Build User SSL VPN <../HowTos/uservpn.html>`__
- `Build Site to Cloud VPN <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_
- `Build Multicloud Peering <http://docs.aviatrix.com/HowTos/GettingStartedAzureToAWSAndGCP.html>`_
- `Build Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html>`_
- `Build Firewall Network <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_
- `Build PrivateS3 <https://docs.aviatrix.com/HowTos/privateS3_workflow.html>`_

-  `Aviatrix Overview. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_

.. Important:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on an AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.  

For technical support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_.

Enjoy!

Other Aviatrix Products
^^^^^^^^^^^^^^^^^^^^^^^^^^

In addition to Metered AMI, we offer a few others, as shown below. Subscribe to them on AWS Marketplace and then proceed to select the CloudFormation launch method to launch the Controller stack directly from AWS console. 

 - `Aviatrix Secure Networking Platform Metered - 24x7 Support <https://aws.amazon.com/marketplace/pp/B086T2RVTF?qid=1590260881838&sr=0-6&ref=_ptnr_docs_startup_metered_24x7>`_

 - `Aviatrix Secure Networking Platform - Enterprise Subscription <https://aws.amazon.com/marketplace/pp/prodview-35vvm63xuwsrw?ref=_ptnr_docs_startup_private_offer>`_

 - `Aviatrix Secure Networking Platform - BYOL <https://aws.amazon.com/marketplace/pp/prodview-nsys2ingy6m3w?ref=_ptnr_docs_startup_byol>`_

 - `Aviatrix Secure Networking Platform - BYOL in AWS China <https://awsmarketplace.amazonaws.cn/marketplace/pp/prodview-tr55yz2zpuzlo>`_

 - `Community BYOL (Available only in us-west-2 region) <https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/new?stackName=AviatrixController&templateURL=https://aviatrix-cloudformation-templates.s3-us-west-2.amazonaws.com/aws-cloudformation-community-byol.template>`_


Additional Information for Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 - **Controller sizing** `Controller instance sizing and EBS volume selection info  <https://docs.aviatrix.com/Support/support_center_controller.html#what-are-the-minimum-requirements-for-an-instance-to-run-the-aviatrix-controller-software>`_.

 - **Controller backup and restore**  `Controller backup instructions info <https://docs.aviatrix.com/HowTos/controller_backup.html>`_.

 - **Controller high availability**  Controller HA instructions can be found `here <https://docs.aviatrix.com/HowTos/controller_ha.html>`_.

 - **Software upgrade**  `Software upgrade procedure info <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_.



 
 
.. add in the disqus tag

.. disqus::

.. |subscribe| image:: ZeroToConnectivityInAWS_media/subscribe.png
   :scale: 30%

.. |subscribe_24x7| image:: ZeroToConnectivityInAWS_media/subscribe_24x7.png
   :scale: 30%

.. |AMI_24x7_copilot| image:: ZeroToConnectivityInAWS_media/AMI_24x7_copilot.png
   :scale: 40%

.. |3-step| image:: ZeroToConnectivityInAWS_media/3-step.png
   :scale: 30%

.. |4-steps| image:: ZeroToConnectivityInAWS_media/4-steps.png
   :scale: 30%

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
   :scale: 30%

.. |imageControllerEnterEmail| image:: ZeroToConnectivityInAWS_media/controller_enter_email.png
   :scale: 50%

.. |imageControllerChangePassword| image:: ZeroToConnectivityInAWS_media/controller_change_password.png
   :scale: 50%

.. |imageproxy-config| image:: ZeroToConnectivityInAWS_media/proxy_config.png
   :scale: 50%

.. |imageControllerUpgrade| image:: ZeroToConnectivityInAWS_media/controller_upgrade.png
   :scale: 50%

.. |imageCFSelectTemplate| image:: ZeroToConnectivityInAWS_media/cf_select_template.png
.. |imageCFSelectTemplate-S3| image:: ZeroToConnectivityInAWS_media/imageCFSelectTemplate-S3.png
.. |imageCFSpecifyDetails| image:: ZeroToConnectivityInAWS_media/cf_specify_details_new.png

.. |imageCFEnableTermProtection| image:: ZeroToConnectivityInAWS_media/cf_termination_protection.png
   :scale: 30%

.. |imageAviatrixOnboardNav| image:: ZeroToConnectivityInAWS_media/aviatrix_onboard_nav.png
   :scale: 50%

.. |imageOnboardAws| image:: ZeroToConnectivityInAWS_media/onboard_aws.png
   :scale: 50%

.. |imageEnterCustomerID| image:: ZeroToConnectivityInAWS_media/customerid_enter.png
   :scale: 50%

.. |cft-next| image:: ZeroToConnectivityInAWS_media/cft-next.png
   :scale: 25%

.. |imageCreateAccount| image:: ZeroToConnectivityInAWS_media/create_account.png
