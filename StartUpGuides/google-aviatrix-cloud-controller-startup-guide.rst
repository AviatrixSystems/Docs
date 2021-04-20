


===========================================
Google Startup Guide
===========================================



The Aviatrix cloud network solution consists of two components, the controller and
gateway, both of which are GCloud instances. The gateway is launched from the controller browser console.
This guide helps you to launch the controller instance in GCloud.

Note that a GCloud project corresponds to an Aviatrix cloud account
or an AWS (IAM) account with its own credentials. A network in a GCloud
project is logically equivalent to a VPC in AWS, but with a few
significant differences. For example, a network in GCloud project can
have disparate subnets and a subnet can connect across regions.

.. Important::

  We advise you not to deploy a Controller in GCP. The preferred approach is to launch the Controller from AWS Marketplace as a metered AMI by following the `AWS Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. The Aviatrix Controller is multi cloud, multi account and multi region capable. Launching a controller in AWS is preferred even if you only deploy gateways in GCP. This is because AWS provides a metered charging mechanism, a true pay-as-you-go (without up front commitment nor contract negotiation) payment system that has the least friction. 


Prerequisite
============

Get a Customer ID from Aviatrix
-------------------------------

Currently, the Aviatrix Controller for GCloud is only available via community
image for BYOL license. Send an email to info@aviatrix.com or
support@aviatrix.com with your organization name to request a customer
ID. We offer a 30 day free trial license.

Create a Google Cloud Platform (GCloud) account
------------------------------------------------

Aviatrix Cloud Connect is a software product that is launched in your
own GCloud account. The controller and the gateways created from the
controller console are all in your own network perimeter and completely
under your control.

Create a GCloud account (https://cloud.google.com/). Go on to the next
step if you have already done so.

Note that the controller supports multiple accounts with each one
associated with a different GCloud projects, but there needs to be at
least one to start with.

Create a GCloud Project
-----------------------

Log in to your GCloud account and go to the project page:
https://console.cloud.google.com/project

Create a project. Go on to the next step if you have already created
one. Note that the project ID will be used in referencing to this project by
Aviatrix controller.

(As an example, we created a project called Aviatrix-UCC, the project ID is
aviatrix-ucc-1214)

(Optional) Create Networks
--------------------------

This step creates a network in the project created in the previous step.

When a new project is created, a default network is created. You may
skip this step if you do not need to customize the network address range by
creating a new network, or go on to the next step if you have done so.

Note that the Aviatrix Controller handles a GCloud network like a VPC in AWS.
Whenever a network configuration is mentioned for GCloud, the term VPC
is used. (The VNet is used for Azure.)

At GCloud console, select the project that you have copied the Aviatrix
controller image to. Click the 3 bars. At the drop down menu, select
Networking. Click “[+] Create Network”.

Note: if you plan to have multiple projects, we suggest you plan your
subnets so that the network addresses do not overlap. Select Custom to
create subnets.

Option #1: Copy Aviatrix Controller Image to Your Project
=========================================================

At your GCloud console (https://console.cloud.google.com), select the
project where you want to launch your controller. Click the 3 bars at
the top left corner. At the drop down menu, select Compute Engine, then
select Images.

At the top screen, click “[+] CREATE IMAGE”, make sure to:

-  Select the project where you want to launch your Aviatrix Controller.

-  Fill in the image name, for example, aviatrix-ucc-083016

-  Fill in the description.

-  At Source, select Cloud Storage File.

-  At Cloud Storage file, paste in the following text string:

   **aviatrix300/aviatrix-cloud-services-gateway-032020-byol.tar.gz**

-  Click create, as shown below.

   |image1|

Launch the Aviatrix Controller from the copied Image
----------------------------------------------------

At the GCloud console,

-  Select the project that you just copied the Aviatrix controller image
   to. Click the 3 bars.

-  At the drop down menu, select the Aviatrix controller image, click
   “[+] Create Instance”.

-  Fill in Name for the instance, Zone and Machine type for the
   instance.

   -  Make sure the Machine type is **n1-standard-2** or larger.

-  For Identity and API access, select “Allow full access to all Cloud
   APIs”. Alternatively,

   -  At Access scopes, select “Set access for each API”, and then

      -  Select “Enabled” for Cloud Pub/Sub.

      -  Select “Read Write” for Compute.

-  At Firewall, click “Allow HTTPS Traffic”, as shown below.

-  Click Create.

   |image2|
   
   
Option #2: Deploy Aviatrix Controller in GCP Marketplace (Preview mode)
=======================================================================

- Go to GCP marketplace

- Find the product "Aviatrix Secured Networking Platform - BYOL"

- Click the button "LAUNCH"

  |gcp_controller_gcp_marketplace_01|
  
- Make sure the selected Machine type has at least 2 vCPUs with 8 GB memory

- Boot Disk is SSD Persistnent Disk with 32 GB

  |gcp_controller_gcp_marketplace_02|
  
- HTTPS with port 443 from anywhere user access (User Interface)

  |gcp_controller_gcp_marketplace_03|
  
- Click the button "DEPLOY"

Access the Aviatrix Controller
==============================

After the instance is created, click the controller instance name, and
note its External IP address and Internal IP address. Go to
https://External_IP_of_the_controller

At the login prompt, type admin for username and type the internal IP
address for the password, as shown below:

|image3|

Follow the initial setup process to set up an admin email address and password
and install the latest software. Log in again with your new admin password

.. Warning:: Any resources created by the controller, such as Aviatrix gateways, GCP routing tables, subnets, LB, etc, must be deleted from the controller console. If you delete them directly on AWS console, controllers view of resources will be incorrect which will lead to features not working properly.

.. Note:: Upgrade from 5.3 to 5.4 is not supported Controller needs to be migrated. Look at the GCP controller migration secion in the below link.
https://docs.aviatrix.com/HowTos/controller_migration.html

Onboarding
==========

If no GCloud account has been setup, you will be guided through the
onboarding process. It takes only a few steps. Once that is done, follow
the quick tour guide to start launching gateways.

For onboarding instructions on GCloud, click `this link. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

Resource Names
===============
The maximum length of a gateway can not exceed 50 characters when configuring Aviatrix Google Cloud gateway.
Other resource names like subnet and VPC have a maximum character limit of 63, a requirement for Google Cloud. 


Launching Gateway
=================
The following gateway sizes are supported for GCloud

  'n1-standard-1','n1-highcpu-2',  'n1-standard-2',  'n1-highmem-2',
  'n1-highcpu-4', 'n1-standard-4', 'n1-highmem-4',   'n1-highcpu-8', 
  'n1-standard-8','n1-highmem-8',  'n1-highcpu-16',  'n1-standard-16',
  'n1-highmem-16','n1-highcpu-32', 'n1-standard-32', 'n1-highmem-32'
    
Support
=======

Check out Help menu for Frequently Asked Questions (FAQs), Reference
Design and Release Notes. All features have descriptions embedded and
should be self-explanatory.

An alert message will be displayed on the Dashboard menu when a new
release becomes available.



For support, send email to support@aviatrix.com

Enjoy!

.. |image0| image:: GoogleAviatrixCloudControllerStartupGuide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |image1| image:: GoogleAviatrixCloudControllerStartupGuide_media/image002.png
   :width: 5.65559in
   :height: 2.77402in
.. |image2| image:: GoogleAviatrixCloudControllerStartupGuide_media/image003.png
   :width: 5.50432in
   :height: 3.49607in
.. |image3| image:: GoogleAviatrixCloudControllerStartupGuide_media/image004.png
   :width: 4.93125in
   :height: 2.10210in

.. |gcp_controller_gcp_marketplace_01| image:: GoogleAviatrixCloudControllerStartupGuide_media/gcp_controller_gcp_marketplace_01.png
   :width: 4.93125in
   :height: 2.10210in

.. |gcp_controller_gcp_marketplace_02| image:: GoogleAviatrixCloudControllerStartupGuide_media/gcp_controller_gcp_marketplace_02.png
   :width: 4.93125in
   :height: 2.10210in
 
.. |gcp_controller_gcp_marketplace_03| image:: GoogleAviatrixCloudControllerStartupGuide_media/gcp_controller_gcp_marketplace_03.png
   :width: 4.93125in
   :height: 2.10210in

.. add in the disqus tag

.. disqus::
