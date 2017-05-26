
|image0|

=======================================
Azure Cloud Controller Startup Guide
=======================================

Version 09-03-2016

Copyright © 2014-2016 Aviatrix Systems, Inc. All rights reserved.



Welcome
=======

This is a startup guide for the initial VHD image launch of Aviatrix
Gateway in Azure. If you are a first time user, this document is for
you.

Aviatrix Cloud Gateway provides end to end cloud secure networking for
you, from accessing to VPCs to inter-VPC routing, all done seamlessly
and securely, so that you can have the same experience you enjoy for
your on-prem network (where you never have to login to a bastion station
or use a jump house to hop from environment to environment.)

Highlights of the Aviatrix Cloud Gateway:

-  Scalable and highly available user VPN solution.

   -  Supports multi factor authentication: Google 2-step, DUO, LDAP and
      Okta.

   -  User profile defined dynamic security access rules that allow
      administrator to determine access privilege to any resources in
      AWS at the network perimeter.

   -  Supports wide range of clients: Windows, OSX, Linux, Chromebook,
      Android and iOS.

   -  Supports log forwarders Logstash, SumoLogic, Splunk and remote
      syslog for complete user and network visibility.

   -  Support Elasticsearch and Kibana on the controller for easy
      viewing of syslog events.

   -  Supports Split tunnel and full tunnel mode.

   -  No extra hop to access instances in different VPCs.

-  Encrypted peering.

   -  Multi-region and multi-cloud for AWS, Azure, Google GCloud, Azure
      China and Azure ARM.

   -  Transitive encrypted peering

-  Supports multi cloud accounts on a single platform.

The Aviatrix Cloud Gateway consists of two components, controller and
gateway which is launched from the controller browser console. This
guide helps you to launch the controller image in Azure. The controller
image is also available in AWS and GCloud.

For the rest of the document, controller is used to refer the controller
component of the solution.

Steps to Launch the Controller
==============================

Create an Azure Account
-----------------------

Create an Azure account if you do not already have one.

Launch Controller VM from Azure marketplace portal
--------------------------------------------------

1.  Launch from marketplace, select the license type and click Create
    Virtual Machine, as shown below. If you select a “BYOL” image, you
    need a Customer ID. Send email to support@aviatrix.com or
    info@aviatrix.com to request a Customer ID.

    |image1|

2.  Select Create at the next screen.

3.  At Basics column, fill in the VM name, user name, password and
    Resource group, click OK.

4.  At Choose a size, select the VM size, click Select.

5.  At Settings, Click Network security group (This is a critical
    configuration step)

    |image2|

6.  Create a new security group, add an Inbound Rule for HTTPS port 443
    for Inbound Traffic, Allow, as shown below. Make sure Source is Any,
    Source Protocol is Any and Source Port range is \*. Destination Port
    range is 443.

    |image3|

7.  After the new security rule is added, click OK.

8.  Finish launching the VM.

9.  Find the VM’s public IP address, as shown below:

    |image4|

10. Use a browser to access the controller VM. In this example, it is
    https://40.114.43.20

11. At the login page, enter admin as username. Initial password is the
    internal IP address of the VM, as shown below.

    |image5|

12. Go through the login process.

13. Start with onboarding tab at the console.

Onboarding
==========

After login to the browser console, click Onboarding to go through a few
steps of initial setup.

Once login, click on Help for Frequently Asked Questions (FAQs). All
features have descriptions and should be self-explanatory.

For support, send email to support@aviatrix.com

There will be an alert message on the Dashboard menu when a new release
becomes available.

Enjoy!

.. |image0| image:: AzureAviatrixCloudControllerStartupGuide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |image1| image:: AzureAviatrixCloudControllerStartupGuide_media/image002.png
   :width: 5.49426in
   :height: 2.99954in
.. |image2| image:: AzureAviatrixCloudControllerStartupGuide_media/image003.png
   :width: 5.05625in
   :height: 2.77932in
.. |image3| image:: AzureAviatrixCloudControllerStartupGuide_media/image004.png
   :width: 5.40347in
   :height: 2.95863in
.. |image4| image:: AzureAviatrixCloudControllerStartupGuide_media/image005.png
   :width: 5.17776in
   :height: 2.97500in
.. |image5| image:: AzureAviatrixCloudControllerStartupGuide_media/image006.png
   :width: 5.15347in
   :height: 2.94563in
