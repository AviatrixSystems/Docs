


===============================================
Oracle Cloud Infrastructure (OCI) Startup Guide
===============================================


The Aviatrix cloud network solution consists of two components, the controller and 
gateways, both of which are cloud VMs. Gateways are launched from the controller console to specific VCNs. This
guide helps you to launch the controller in OCI.

.. Important::

  The Aviatrix Controller is a secure multi-cloud networking platform. Aviatrix recommends you deploy your controller in clouds that offer metered pricing, then deploy your gateways in any supported cloud. Metered pricing offers you a true pay-as-you-go option without any up-front commitments or contract negotiations. The AWS and Azure clouds offer metered pricing for running the Aviatrix Controller image. The GCP and OCI clouds do not offer metered pricing for running the Aviatrix Controller image.



1. Prepare your account in OCI
==============================

Create an OCI account
-----------------------

Create an OCI account if you do not already have one.

Set up your compartment
-----------------------

Although you can use default account and root compartment, it is recommended that you follow this doc to create your own user, group, and compartment with the right policy.
For more detail, refer to  `Setting Up Your Tenancy <https://docs.cloud.oracle.com/iaas/Content/GSG/Concepts/settinguptenancy.htm>`_

Create a VCN that has internet access
-------------------------------------

Create a VCN that has internet access by navigating to "Networking -> Virtual Cloud Networks" in the OCI console,
then click "Create Virtual CLoud Network" button and choose "create virtual cloud network plus related resources".

Alternatively if you want to create a VCN with your own CIDR, choose "create virtual cloud network only". Continue to create subnet, and internet gateway.
Then add default route in the VCN default routing table to point to the newly created internet gateway. This is to grant internet access to the controller inside of this VCN.



2. Subscribe to the Controller
==============================

Go to `Oracle Cloud Marketplace <https://cloudmarketplace.oracle.com/marketplace/en_US/homePage.jspx>`_ and search for Aviatrix to subscribe to the Aviatrix platform.

* Click "Get App >" at the top of the App page.
* Select OCI region and click "Launch Image"

 |inst_region|

* Choose the version, compartment and click "Launch Instance"

 |inst_launch|

In the "Create Compute Instance" Page
    a. choose name, availability domain and "virtual Machine" as instance type
    b. choose Instance Shape. The recommended shape is **Standard2.2**

       |inst_flavor|

    c. choose proper compartment for VCN and subnet
    d. you could optionally choose "Use network security groups to control traffic" if you have one, otherwise leave it as we will create one later

       |inst_network|

    e. choose ssh public key file
    f. click "Create" to launch the instance


3. Access the Controller
=========================

To be able to reach controller public ip via https using browser, you will need to open port 443 in either security list or security group.

Security List (easy to config)
------------------------------
From OCI portal, navigate to Networking -> Virtual Cloud Networks -> your vcn name -> Security Lists -> Default Security List,
Add an ingress rule to allow port 443. You could further limit the source cidr if you know all your VCN subnets where gateway will be launched.

 |inst_seclist|

Security Group (recommend to use)
---------------------------------
From OCI portal, navigate to Networking -> Virtual Cloud Networks -> your vcn name -> Network Security Groups
Create a new security group. Add an ingress rule to allow port 443. You could further limit the source cidr if you know all your VCN subnets where gateway will be launched.

 |inst_secgroup|

Then navigate to Compute -> Instances -> Controller VM detail page, click the "Edit" link besides the "Network Security Groups" under "Primary VNIC Information".
Associate the security group you created to the controller VNIC.

 |inst_vnic_secgroup|


Controller UI
-------------
After the Controller instance is in a running state, you can access the Controller
via a browser by `https://Controller_public_IP`, where Controller_public_IP is the static public IP address of the Controller.
The initial password is the private IP address of the instance.

 |startup_first_login|

Follow the steps in browser to go through an initial setup phase to download the latest software. Use "latest" as version if not asked to use other version number.

 |startup_version|

After the latest software is downloaded which takes around 5 mins, UI would redirect you to the login page.
You could also try to re-login if browser is closed to go through the account onboarding process.

 |startup_login|


4. Onboarding
==============
Follow the `onboarding instructions <https://docs.aviatrix.com/HowTos/oracle-aviatrix-cloud-controller-onboard.html>`_ to create an Aviatrix account that corresponds to your OCI account credential.

Note: you only need to create a single Aviatrix account that corresponds to many OCI, AWS, Azure and GCloud account credentials. This is a multi-cloud platform.


Congratulations on finishing launching your Aviatrix networking platform. Please take a look at our step by step doc site
`https://docs.aviatrix.com/ <https://docs.aviatrix.com/>`_
Enjoy!


.. |inst_launch| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_launch.png
.. |inst_region| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_region.png
.. |inst_flavor| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_flavor.png
.. |inst_network| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_network.png
.. |inst_seclist| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_seclist.png
.. |inst_secgroup| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_secgroup.png
.. |inst_vnic_secgroup| image:: OCIAviatrixCloudControllerStartupGuide_media/inst_vnic_secgroup.png
.. |startup_version| image:: OCIAviatrixCloudControllerStartupGuide_media/startup_version.png
.. |startup_first_login| image:: OCIAviatrixCloudControllerStartupGuide_media/startup_first_login.png
.. |startup_login| image:: OCIAviatrixCloudControllerStartupGuide_media/startup_login.png


