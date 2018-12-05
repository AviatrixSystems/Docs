


===========================================
Google Startup Guide
===========================================




The Aviatrix cloud network solution consists of two components, controller and
gateway, both are GCloud instances. The gateway is launched from the controller browser console.
This guide helps you to launch the controller instance in GCloud.

Important note: a GCloud project corresponds to an Aviatrix cloud account
or an AWS (IAM) account with its own credentials. A network in a GCloud
project is logically equivalent to a VPC in AWS, but with a few
significant differences, for example, a network in GCloud project can
have disparate subnets and a subnet can connect across regions.

Prerequisite
============

Get a Customer ID from Aviatrix
-------------------------------

Currently Aviatrix Controller for GCloud is only available via community
image for BYOL license. Send email to info@aviatrix.com or
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

log in to your GCloud account and go to project page:
https://console.cloud.google.com/project

Create a project. Go on to the next step if you have already created
one. Note the project ID will be used in referencing to this project by
Aviatrix controller.

(As an example, we created a project Aviatrix-UCC, the project ID is
aviatrix-ucc-1214)

Copy Aviatrix Controller Image to Your Project
----------------------------------------------

At your GCloud console (https://console.cloud.google.com), select the
project where you want to launch your controller. Click the 3 bars at
the top left corner. At the drop down menu, select Compute Engine, then
select Images.

At the top screen, click “[+] CREATE IMAGE”, make sure:

-  Select the project where you want to launch your Aviatrix Controller.

-  Fill in the image name, for example, aviatrix-ucc-083016

-  Fill in the description.

-  At Source, select Cloud Storage File.

-  At Cloud Storage file, paste in the following text string:

   **aviatrix200/aviatrix-cloud-services-gateway-111517-byol.tar.gz**

-  Click create, as shown below.

   |image1|

(Optional) Create Networks
--------------------------

This step creates a network in the project created in the previous step.

When a new project is created, a default network is created. You may
skip this step if do not need to customize the network address range by
creating a new network, or go on to the next step if you have done so.

Note Aviatrix Controller handles a GCloud network like a VPC in AWS.
Whenever a network configuration is mentioned for GCloud, the term VPC
is used. (The VNet is used for Azure.)

At GCloud console, select the project that you have copied the Aviatrix
controller image to. Click the 3 bars. At the drop down menu, select
Networking. Click “[+] Create Network”.

Note: if you plan to have multiple projects, we suggest you plan your
subnets so that the network addresses do not overlap. Select Custom to
create subnets.

Launch the Aviatrix Controller
==============================

At GCloud console,

-  select the project that you just copied the Aviatrix controller image
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

Access the Aviatrix Controller
==============================

After the instance is created, click the controller instance name, and
note its External IP address and Internal IP address. Go to
https://External_IP_of_the_controller

At the login prompt, type admin for username, type the internal IP
address for password, as shown below:

|image3|

Follow the initial setup process to setup admin email address, password
and install the latest software. Log in again with your new admin password

.. Warning:: Any resources created by the controller, such as Aviatrix gateways, GCP routing tables, subnets, LB, etc, must be deleted from the controller console. If you delete them directly on AWS console, controllers view of resources will be incorrect which will lead to features not working properly.

..

Onboarding
==========

If no GCloud account has been setup, you will be guided through the
onboarding process. It takes only a few steps. Once that is done, follow
the quick tour guide to start launching gateways.

For onboarding instructions on GCloud, click `this link. <http://docs.aviatrix.com/HowTos/CreateGCloudAccount.html>`_

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


.. add in the disqus tag

.. disqus::
