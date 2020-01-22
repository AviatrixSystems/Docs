﻿


=======================================
Azure Startup Guide
=======================================


The Aviatrix cloud network solution consists of two components, the controller and 
gateways, both of which are Azure VMs. Gateways are launched from the controller console to specific VNets. This
guide helps you to launch the controller VM in Azure. Make sure you follow the instructions to also subscribe to the Aviatrix Companion Gateway described in this guide. 

.. Note::

  We suggest you consider deploying the Controller in AWS. The preferred approach is to launch the Controller from the AWS Marketplace as a metered AMI by following the `AWS Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_. The Aviatrix Controller is multi cloud, multi subscription and multi region capable. Launching the Controller in AWS may be a good idea even if you only deploy gateways in Azure, as AWS provides a pay-as-you-go (without up front commitment nor contract negotiation) metered payment system that has the least friction. However if Azure is your choice to deploy the Controller, no worries, proceed to the following sections.

1. Subscribe to the Aviatrix Controller
=============================================

Go to `Azure Marketplace <https://azuremarketplace.microsoft.com/en-us/marketplace/>`_ to subscribe to one Aviatrix image. 


2. Subscribe to an Aviatrix Companion Gateway
=================================================

The Aviatrix companion gateway needs to be subscribed as programmable. 

In order to launch an Aviatrix gateway from the controller, you must also subscribe to the Aviatrix Companion Gateway, which is free in the Azure marketplace. Follow the steps in `this doc <http://docs.aviatrix.com/HowTos/CompanionGateway.html>`__ to subscribe.


3. Launch the Controller
==============================

Create an Azure Account
---------------------------

Create an Azure account if you do not already have one.

Launch Controller VM from Azure marketplace portal
-----------------------------------------------------

a.  Launch from marketplace, select the license type and click Create
    Virtual Machine, as shown below. If you select a “BYOL” image, you
    need a Customer ID. Send email to support@aviatrix.com or
    info@aviatrix.com to request a Customer ID.

    |marketplace|

#.  From the dropdown menu select one option, for example the BYOL option.

    |dropdown|

#.  At Basics header, create new Resource Group titled "aviatrix" , virtual machine name can be "aviatrixController". 
    For instance size we recomend at least 8GB of RAM so B2ms should be sufficient. Next enter a username, password and 
    Resource group, click OK.

    |Azure_Basics|

#.  At the networking header, this will be preconfigured with a default subnet and security group. You should not need
    to change anything here. 

    |Networking|

#.  The management, advanced, and tag heders should not need any configuration.

#.  Finish launching the VM by hitting the create button.

#.  Find the VM’s public IP address, as shown below:

    |VM|

#.  Use a browser to access the controller VM. In this example, it is
    https://40.77.57.154

#.  At the login page, enter admin as the username. The Initial password is the
    internal IP address of the VM, as shown below.

    |login|

#. Go through the login process.

#. Start with the onboarding tab at the console.

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, Azure routing entries, subnets, etc, must be deleted from the Controller console. If you delete them directly on Azure console, The Controller's view of the resources will be incorrect, which will lead to features not working properly.



4. Access the Controller
============================

After the Controller instance is in a running state in AWS, you can access the Controller
via a browser by `https://Controller_public_IP`, where Controller_public_IP is the static public IP address of the Controller.

The initial password is the private IP address of the instance.

Follow the steps to go through an initial setup phase to download the latest software.
After the latest software is downloaded, re-login again to go through the onboarding process.

5. Onboarding
==============
The purpose of onboarding is to help you setup an account on the Aviatrix Controller that
corresponds to an Azure account with policies so that the Controller can launch gateways using Azure
APIs.

Follow the `instructions <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_ here to 
create an Aviatrix account that corresponds to your Azure account credential. 

Note: you can create a single Aviatrix account that corresponds to AWS, Azure and GCloud account credentials. This is a multi cloud platform.

6. Gateway Troubleshoot
========================

If the Controller fails to launch an Aviatrix gateway in Azure RM, check out `this troubleshooting guide. <http://docs.aviatrix.com/HowTos/azuregwlaunch.html>`_


Enjoy!

.. |image0| image:: AzureAviatrixCloudControllerStartupGuide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |marketplace| image:: AzureAviatrixCloudControllerStartupGuide_media/marketplace.png
   :width: 5.49426in
   :height: 2.99954in
.. |dropdown| image:: AzureAviatrixCloudControllerStartupGuide_media/dropdown.png
   :width: 10.0in
   :height: 2.0in
.. |Azure_Basics| image:: AzureAviatrixCloudControllerStartupGuide_media/Azure_Basics.png
   :width: 5.0in
   :height: 5.0in
.. |image3| image:: AzureAviatrixCloudControllerStartupGuide_media/image04___2017_08_14.PNG
   :width: 5.40347in
   :height: 2.95863in
.. |VM| image:: AzureAviatrixCloudControllerStartupGuide_media/VM.png
   :width: 5.17776in
   :height: 2.97500in
.. |login| image:: AzureAviatrixCloudControllerStartupGuide_media/login.png
   :width: 5.0in
   :height: 4.0in
.. |Networking| image:: AzureAviatrixCloudControllerStartupGuide_media/Networking.png
   :width: 5.0in
   :height: 5.0in
.. add in the disqus tag

.. disqus::
