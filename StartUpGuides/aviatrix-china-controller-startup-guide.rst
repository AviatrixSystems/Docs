.. meta::
    :description: Install the Aviatrix Controller, 2 Gateways, and setup peering in AWS
    :keywords: Aviatrix, AWS, Global Transit Network, AWS VPC Peering, VPC Peering, Egress Control, Egress firewall, OpenVPN, SSL VPN


==================================================================
AWS China Startup Guide
==================================================================


Welcome. Your Aviatrix product experience starts here. 

Click a link below to learn your use case or read an `Aviatrix Overview. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_  
  
`Remote User VPN <http://docs.aviatrix.com/HowTos/openvpn_features.html>`_

`VPC Egress Security <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_

`Site to Cloud VPN <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_

`Encrypted Peering <http://docs.aviatrix.com/HowTos/peering_faq.html>`_

`Multicloud Peering <http://docs.aviatrix.com/HowTos/peering_faq.html>`_

The Aviatrix Controller provides a single pane of glass for all your secure networking tasks. You can run the Controller in your own VPC or let Aviatrix manage it in `our hosted service <https://www.aviatrix.com/trial/>`_.

The following guide applies to running the Controller in your own environment in China. 

The first thing you need to do is to launch the Controller instance. 

We'll walk you through the following steps. By the end, you'll be 
ready for your first use case. 


Before you start, you need to have an `AWS account <https://aws.amazon.com/>`__.   Create a new account or login to an existing IAM account.

.. Important::

    - We require this AWS IAM account to have permissions to create AWS access key, secret access key, IAM policies and launch EC2 instances. 
    - The Controller instance must be launched on a public subnet in a VPC. 
..


Step 1. Locate the Controller AMI from AWS Community
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Login to AWS China, select the Beijing region, click launch EC2 instance from AWS Community AMIs and search for "aviatrix", as shown below. The Aviatrix Controller AMI name is Aviatrix_china_controller_051518_BYOL. 

|controller-ami-china|


Step 2. Select Controller instance size
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select t2.large for the Controller instance, as shown below.

|instance-size|

Step 3. Select VPC and subnet to launch
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Make sure you select a public subnet. We recommend you to enable termination protection.  

|select-subnet|


Step 4. Add storage
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Make sure you specify 20GB as the storage size, as shown below. 

|add-storage|

Step 5. Setup security group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Open security group 443 to all, as shown below. (You can reduce the scope later)

|security-group|

Step 6. Launch the instance
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Review the instance and create a new key pair or use an existing key pair to launch the instance. 

Step 7. Add EIP
^^^^^^^^^^^^^^^^

Once the Controller instance is launched, you need to associate it with an EIP. Make sure this EIP has been granted legitimacy by the government. 

Associate the EIP with the Controller instance. 


Step 8. Connect to the Controller 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Now that the Aviatrix Controller instance has been launched, let's log in and go through a few init steps.

Open a browser window to https://AviatrixControllerEIP 

.. tip::
   You may receive a warning that the connection may not be secure.  This is because the certificate is self-signed by the Controller.  It is safe to continue to the page.

..

   |imageControllerBrowserWarning|

Step 9. Initial Login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 9.1 Login with the username `admin`.

 9.2 For the password field, you can find the Controller instance's private IP address by going to the AWS EC2 console, clicking the Controller instance and locating its private IP address. 
   

 9.3 Enter your email address.  This email will be used for alerts as well as password recovery (if needed).

   |imageControllerEnterEmail|

 9.4. Next, you will be prompted to change the admin password.

   |imageControllerChangePassword|

 9.5. Click `Skip` in the next page, unless the Controller instance VPC has an HTTP or HTTPS proxy configured for Internet access. 

   |imageproxy-config|

 9.6. Finally, the Controller will upgrade itself to the latest software version. Enter 3.3 and click run, as shown below. The process can take up minutes to hours. Read the tip below before you proceed. 

   |imageControllerUpgrade-china|

.. tip::

   Since the Aviatrix software is hosted in AWS us-west-2, loading software to the Controller from AWS China could take a significantly longer time, from tens of minutes to up to an hour. Our experiences have been that if you upgrade software during the early morning hours in China (2am to 7am China time) the download is faster. Once complete, the login prompt will appear.  Use the user `admin` and your new password to login.

..


Step 10. Create A Primary Access Account 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

10.1 Select AWS China
--------------------

Once logged back into the Controller, you should be on the `Onboarding` page. If not, click "Onboarding` on the navigation item. Then click on the AWS icon. 

   |aws-china|


10.2  Enter Your Customer ID 
-----------------------------------------------------

.. Note::

   Contact support@aviatrix.com to get a trial license if you do not have one.
..
   
Enter the `Customer ID` in the field and click `Save`.

   |imageEnterCustomerID|
   
10.3  Setup an Access Account  
------------------------------------

Follow the instructions in `how to create IAM user and policy <http://docs.aviatrix.com/HowTos/accesskey.html>`_ to fill in the fields below.

  +-------------------------------+--------------------------------------------+
  | Field                         | Expected Value                             |
  +===============================+============================================+
  | Account Name                  | Enter a name that is unique on the         |
  |                               | Controller.                                |
  |                               | Example name: `AWSOpsTeam`.                |
  +-------------------------------+--------------------------------------------+
  | AWS China Account Number      | The IAM user account's 12 digit            |
  |                               | AWS account number.                        |
  +-------------------------------+--------------------------------------------+
  | AWS China Access Key ID       | The IAM user account's access key id.      |
  +-------------------------------+--------------------------------------------+
  | AWS China Secret Key          | The IAM user account's secret key.         |
  +-------------------------------+--------------------------------------------+

Once complete, click the `Create` button at the bottom of the form, as shown below.

|create-account|


Next: Start a Use Case 
^^^^^^^^^^^^^^^^^^^^^^^^^

Congratulations!  

You are now ready to establish connectivities to/from the cloud. Here are some of the things you can do:

- `Build User SSL VPN <../HowTos/uservpn.html>`__
- `Build Egress Security <../HowTos/FQDN_Whitelists_Ref_Design.html>`__
- `Build Site to Cloud VPN <http://docs.aviatrix.com/HowTos/site2cloud_faq.html>`_
- `Build Multicloud Peering <http://docs.aviatrix.com/HowTos/GettingStartedAzureToAWSAndGCP.html>`_
- `Build Encrypted Peering <http://docs.aviatrix.com/HowTos/peering.html>`_

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, route entries, ELB, SQS queues, etc, must be deleted from the Controller console. If you delete them directly on AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.  

For technical support, email us at support@aviatrix.com

Enjoy!


Limitations
^^^^^^^^^^^^^^^

    - IAM role is not supported in the current release 3.3 in AWS China. 
    - Next-Gen Transit Network is not supported in the current release 3.3 in AWS China.
    - AWS Ningxia region is not supported in the current release 3.3 in AWS China. 
    - Native AWS Peering is not supported in the current release 3.3 in AWS China. 


.. add in the disqus tag

.. disqus::

.. |controller-ami-china| image:: china-controller_media/controller-ami-china.png
   :scale: 100%

.. |instance-size| image:: china-controller_media/instance-size.png
   :scale: 40%

.. |select-subnet| image:: china-controller_media/select-subnet.png
   :scale: 40%

.. |security-group| image:: china-controller_media/security-group.png
   :scale: 40%

.. |add-storage| image:: china-controller_media/add-storage.png
   :scale: 40%

.. |create-account| image:: china-controller_media/create-account.png
   :scale: 40%

.. |imageControllerUpgrade-china| image:: china-controller_media/imageControllerUpgrade-china.png
   :scale: 50%

.. |imageControllerBrowserWarning| image:: china-controller_media/controller_browser_warning.png
   :scale: 50%

.. |imageAviatrixOnboardNav| image:: china-controller_media/aviatrix_onboard_nav.png
   :scale: 50%

.. |aws-china| image:: china-controller_media/aws-china.png
   :scale: 50%

.. |imageEnterCustomerID| image:: china-controller_media/customerid_enter.png
   :scale: 25%


.. |imageCreateAccount| image:: china-controller_media/create_account.png

.. |imageControllerEnterEmail| image:: china-controller_media/controller_enter_email.png
   :scale: 50%

.. |imageControllerChangePassword| image:: china-controller_media/controller_change_password.png
   :scale: 50%

.. |imageproxy-config| image:: china-controller_media/proxy_config.png
   :scale: 25%

