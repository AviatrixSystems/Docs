


===========================================
Google Cloud Controller Startup Guide
===========================================




Welcome
=======

This is a startup guide for launching an Aviatrix Cloud Connect in
Google GCloud. If you are a first time user, this document is for you.

Aviatrix Cloud Connect (ACC) provides an end-to-end and seamless secure
cloud connectivity for you. The end-to-end consists of access to the
GCloud project, inter-project and inter-cloud routing, so that you have
the same experience you enjoy when you work on-prem (where you do not
need to be aware of the network infrastructure, things just work!)

Highlights of the Aviatrix Cloud Connect:

-  Scalable and highly available Cloud VPN solution:

   -  Remote access for users to connect to cloud directly.

   -  Integrated with google native load balancer, the solution scales
      to unlimited number of VPN gateways to serve any number of users
      and bandwidth.

   -  Supports multi factor authentication: DUO, LDAP and Okta.

   -  User profile based access rules that allow administrator to define
      and enforce access privilege to any resources (network, protocols
      and ports) in GCloud at the perimeter of your cloud network.

   -  Supports wide range of clients: Windows, OSX, Linux, Chromebook,
      Android and iOS.

   -  Supports log forwarders Logstash, Splunk, SUMO Logic, rsyslog for
      remote logging.

   -  Supports Split tunnel and full tunnel mode. Split tunnel mode
      allows additional CIDRs be pushed to client.

   -  Modular configuration support incremental configuration as your
      environment scales.

   -  Supports active user dashboard and user browsing activity.

   -  No extra hop to access instances in different VPCs.

-  Policy based multi region and multi cloud (AWS, Azure and GCloud)
   encrypted peering.

-  Multi accounts support for different business groups and projects.

The Aviatrix Cloud Connect consists of two components, controller and
gateway. The gateway is launched from the controller browser console.
This guide helps you to launch the controller image in GCloud.

For the rest of the document, controller or Aviatrix controller is used
to refer the controller component of the solution.

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

   **aviatrix100/aviatrix-cloud-services-gateway-092716-byol.tar.gz**

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

Onboarding
==========

If no GCloud account has been setup, you will be guided through the
onboarding process. It takes only a few steps. Once that is done, follow
the quick tour guide to start launching gateways.

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
