.. meta::
  :description: Aviatrix Getting Started
  :keywords: CoPilot,visibility


============================================================
Aviatrix CoPilot Deployment Guide
============================================================


Launch CoPilot
==================

Aviatrix CoPilot is available as an all-in-one virtual appliance that is hosted in a user's own IaaS cloud environment. 
It can be launched as an EC2 instance in AWS, a virtual machine in Azure, or a VM instance in GCP and OCI. Please make sure default configurations for resources settings that are recommended by marketplaces are applied during launch.
After successfully launching the instance, follow these steps to configure CoPilot instance parameters and launch. 
Please note that you will need an Aviatrix Controller to use CoPilot. CoPilot works in tandem with Aviatrix Controller. Aviatrix Controller and CoPilot are not required to be collocated. It is possible to run them in separate VPCs/VNETs or separate cloud providers (in multi-cloud environments).


Instance Configuration Details
------------------------------

- Configure your CoPilot security group as shown below to allow the following: 

  - 443 from anywhere user access (User Interface)

  - UDP port 5000 from 0.0.0.0/0 or specific gateway IPs

  - UDP port 31283 from 0.0.0.0/0 or specific gateway IPs 

.. tip::
  If a security requirement dictates that security groups not be open to 0.0.0.0/0, you can program the security group to open this UDP port to Aviatrix gateway EIPs. You can leverage Controller's security group management to copy the IP addresses of the gateways. 


Subscribe to a CoPilot Offer
============================

Subscribe to an Aviatrix CoPilot offer in a cloud provider marketplace.

For licensing and trials, CoPilot is offered with a BYOL model. Before subscribing to CoPilot in a cloud marketplace, obtain a license key for CoPilot by contacting your Aviatrix Sales representative. Since CoPilot works in tandem with Aviatrix Controller to provide visibility into your cloud resources managed by the controller, it is assumed that you already have a controller.

To subscribe to a CoPilot offer:

1.  Log in to the marketplace of your chosen cloud provider using your provider user account credentials. CoPilot is available in the marketplaces for:

    -   Amazon Web Services (AWS)
    -   Google Cloud Platform
    -   Microsoft Azure Marketplace
    -   Oracle Cloud Infrastructure (OCI)

2.  Locate the Aviatrix CoPilot software offer you want to subscribe to and click **Subscribe**.

3.  When prompted, review the subscription pricing information and accept the terms and conditions. You may be prompted to confirm your subscription before moving on to configuration.

4.  Each marketplace will prompt you to configure and launch the CoPilot software. Apply the default configurations for resource settings that are recommmended by your chosen marketplace. For CoPilot instance configurations, you can accept the defaults or change them to suit your business needs. Note the following required CoPilot instance specifications:

    -   For machine/instance/VM type, CoPilot requires a minimum of 8 vCPUs and 32 GB Memory.
    -   CoPilot requires 2 TB of storage (SSD recommended)
    -   CoPilot requires a static public IP address (for example, an Elastic IP address in AWS)
    -   Copilot requires the following service ports:

        -   TCP port 443 for Web UI (to reach CoPilot public IP via HTTPS using your web browser)
        -   UDP port 31283 for FlowIQ (port is configurable)
        -   UDP port 5000 for Remote Syslog Service

        For the ports, you can accept the default inbound rule of 0.0.0.0/0. If a security requirement dictates that resources not be open to 0.0.0.0/0, you can allow only the IP addresses of your Aviatrix gateways for the UDP ports. You can allow only your and other trusted user's IP addresses for port 443.

5.  After specifying all values for the marketplace configuration prompts, deploy/launch the CoPilot instance/virtual machine.

    For example, in AWS, you select the region and click **Continue to Launch**.

    You should receive a message from the cloud provider stating that the instance of CoPilot software is launched/deployed.

6.  Assign a static public IP address to the CoPilot software instance/virtual machine. For example, in the AWS EC2 console, you would go to the Elastic IP section and assign an EIP to the CoPilot instance.

    Take note of the IP address to use later during initial setup of CoPilot.

7.  Start the CoPilot instance/virtual machine.

    For example, in the AWS EC2 Dashboard, check the instance checkbox and from the Actions menu, choose Start Instance.

    You are now ready to launch CoPilot in a web browser or from the Aviatrix Controller homepage and perform your initial setup.


Initial Setup of CoPilot
========================

Perform an initial setup of Aviatrix CoPilot after you deploy/launch the CoPilot software in the cloud provider of your choice.

For initial setup of CoPilot, have the following information available:

-   The static public IP address of your recently deployed CoPilot software instance/virtual machine (obtained from the cloud provider portal).
-   The static IP address for your Aviatrix Controller.
-   The login credentials of your Aviatrix Controller user account.
-   The login credentials for the user account to be used as the CoPilot service account. If you plan to use the ThreatGuard feature, the CoPilot service account must have a minimum of `all_firewall_write` permissions.
-   The CoPilot licence key (obtained from your Aviatrix representative).

This procedure assumes your Aviatrix Controller is up and running and the controller instance's inbound rules have port 443 open to the public static IP address of the CoPilot instance (so that CoPilot can reach your controller). Your CoPilot software instance/virtual machine must also be up and running.

To perform an initial setup of CoPilot:

1.  Launch CoPilot in your web browser:

    `https://<copilot static ip address>/`

    where `<copilot static ip address>` is the static IP address of your newly deployed CoPilot software instance/virtual machine.

    Alternatively, you can launch CoPilot from Aviatrix Controller as described in the next step.

2.  (Optional) Launch CoPilot from Aviatrix Controller:

    a.  In Aviatrix Controller, under Settings, select CoPilot.

    b.  For the CoPilot Association, set the status to **Enabled** and enter the static IP address for your running CoPilot instance.

    c.  From the controller homepage, click the CoPilot button in the action bar.

3.  When prompted, enter the login and password of a valid Aviatrix Controller user account and the static IP address for your controller.

    |copilot_login_user_account|

4.  When prompted for a **CoPilot Service Account**, enter the login credentials for a valid user account in Aviatrix Controller to be used as the CoPilot service account.

    The CoPilot service account is used to run CoPilot services such as alerts, topology replay, and ThreatGuard (without any user logged in).

    |copilot_login_service_account|

5.  When prompted for **CoPilot Customer ID**, enter your CoPilot licence key.

    |copilot_login_customer_id|

    You are now successfully logged in to CoPilot.

    If you haven't already done so, you can enable the syslog service and Netflow logging for CoPilot in your controller as described below.

    **Note:** When CoPilot first launches, the version number is based on the version in the image, but within an hour the CoPilot version will be updated.

    **Note:** If you plan to terminate your current instance of CoPilot and deploy a new instance using the same license key, release the CoPilot licence of the current instance first. To release the license, in CoPilot under Settings->Licensing, click the **RESET** button.

6.  (Verify connectivity with your controller) To verify Copilot has connected successfully to your controller, from the CoPilot dashboard, confirm that you can see the inventory of all resources across all clouds in your multi-cloud network that are managed by Aviatrix Controller. Confirm that the inventory tiles show the number and status of each of your managed resources and the global location of your managed VPCs/VPNs/VNETs are represented on the geographic map.

7.  (For FlowIQ feature) To use the FlowIQ feature in CoPilot, ensure that the controller is configured to forward NetFlow logs to CoPilot.

    a.  Log in to Aviatrix Controller.

    b.  Go to Settings -> Loggings -> NetFlow Logging.

    c.  Use the static IP address of CoPilot as the server and UDP port 31283 (default, port is configurable).

    You should start seeing NetFlow in CoPilot after a few minutes.

8.  (For remote syslog service) To enable syslog for performance monitoring in CoPilot, ensure that the controller is configured to specify CoPilot as the loghost server.

    a.  Log in to Aviatrix Controller.

    b.  Go to Settings -> Loggings -> Remote Syslog.

    c.  Enable the Service, choose a Profile Index (ie. 0), and use the static IP address of CoPilot as the server and UDP port 5000 (default).


About CoPilot User Accounts
=============================================

This section describes user accounts for CoPilot and permissions required for some features.

You can use any valid user account defined on the controller to log in to CoPilot.

During initial setup of CoPilot, you specify a user account defined on the controller to be used as the CoPilot service account. The CoPilot service account is used to run CoPilot services, such as alerts, topology replay, and ThreatGuard (without any user logged in). If you plan to use the ThreatGuard feature, the CoPilot service account must have a minimum of `all_firewall_write` permissions.

For a user to enable ThreatGuard alerts or ThreatGuard blocking in CoPilot, they must log in to CoPilot with a user account that has `all_write` or `all_security_write` or `admin` permissions.

Users who will not enable ThreatGuard alerts or blocking can log in to CoPilot with an account that has `read_only` permissions and use all of its other features.

Users should be granted only the permissions needed to perform their work. Review user privileges on a routine basis to confirm they are appropriate for current work tasks.


Configure Controller's access for CoPilot
=============================================

- Assign a static public IP address to CoPilot. For example, in EC2 console, you go to the Elastic IP section and assign an EIP to the CoPilot instance. 

- On Controller security groups, ensure 443 is open to the public IP of the CoPilot instance.

- Configure a dedicate user account on Aviatrix Controller for CoPilot. 

- You should now be able to log in to CoPilot with the credentials we configured above.

.. note::
  If you are using RBAC, as of 1.1.5 CoPilot requires read-only access + access to ping and traceroute functions for diagnostic capabilities.


Enable Syslog for Performance Monitoring
==============================================

- Log in to Aviatrix Controller. 

- Go to Settings -> Loggings -> Remote Syslog.

- Enable the Service, choose a Profile Index (ie. 0), and use the EIP of CoPilot as the server and UDP port 5000 (default). 


Enable FlowIQ
=================

- Log in to Aviatrix Controller. 

- Go to Settings -> Loggings -> NetFlow Logging.

- Use the EIP of CoPilot as the server and UDP port 31283 (default). 

 
Deployment is complete. At this point your CoPilot is set up and ready to use. You should start seeing NetFlow in less than 5 minutes. Note that when you launch CoPilot at first your version number will be based on the version in the image. Within an hour, the CoPilot version will be updated.

System Design Considerations 
==================================
- For production, it is best practice to inspect your gateways sizing and load prior to enabling flow logging. 
- You have the option of selecting which gateways generate flows should you want to enable visibility in subsections of the network.

Deploy Aviatrix CoPilot in GCP
==============================

- Go to GCP marketplace.

- Find the product "Aviatrix CoPilot - BYOL".

- Click the button "LAUNCH".

|gcp_copilot_1|

- Make sure the selected Machine type has at least 8 vCPUs with 32 GB memory.

- Boot Disk is SSD Persistent Disk with 2000 GB.

|gcp_copilot_2|

- 443 from anywhere user access (User Interface).

- UDP port 31283 from 0.0.0.0/0 or specific gateway IPs.

- UDP port 5000 from 0.0.0.0/0 or specific gateway IPs.

|gcp_copilot_3|

- Click the button "Deploy".

.. |gcp_copilot_1| image:: copilot_getting_started_media/gcp_copilot_1.png
   :scale: 50%
   
.. |gcp_copilot_2| image:: copilot_getting_started_media/gcp_copilot_2.png
   :scale: 50%
   
.. |gcp_copilot_3| image:: copilot_getting_started_media/gcp_copilot_3.png
   :scale: 50%

.. |copilot_login_customer_id| image:: copilot_getting_started_media/copilot_login_customer_id.png
   :scale: 100%

.. |copilot_login_service_account| image:: copilot_getting_started_media/copilot_login_service_account.png
   :scale: 100%

.. |copilot_login_user_account| image:: copilot_getting_started_media/copilot_login_user_account.png
   :scale: 100%

.. disqus::
