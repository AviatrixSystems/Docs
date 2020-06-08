.. meta::
  :description: Firewall Network
  :keywords: Azure Transit Gateway, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Example Config for Check Point VM in Azure
=========================================================

In this document, we provide an example to set up the Check Point Security Gateway instance for you to validate that packets are indeed sent to the Check Point Security Gateway for VPC to VPC and from VPC to internet traffic inspection.

.. note::
    Firewall and Security Gateway word will be used interchangeably in this document. Both refers to Check Point Security Gateway product.

Prerequisites
----------------

Before you start, make sure you have understanding on 

    - Basic Check Point Architecture
    - Check Point Security Management 

The following Check Point AMIs and software versions are supported in Azure by Aviatrix.

==================================================================================             ====================
**Supported AMI Name**                                                                         **Software Version**
==================================================================================             ====================
CloudGuard IaaS Single Gateway - BYOL                                                           R80.40, R80.30
CloudGuard IaaS Single Gateway Threat Prevention & SandBlast (NGTX) - PAYG                      R80.40, R80.30
CloudGuard IaaS Single Gateway with Thread Prevention (NGTP) - PAYG                             R80.40, R80.30
CloudGuard IaaS Standalone (Gateway + Management) - BYOL                                        R80.40
==================================================================================             ====================

.. important::

  - Check Point Standalone does not require Security Management to manage polices.
  - Gateway NGTP and NGTX both requires Security Management to configure Security Gateway Polices

Check Point Reference Architecture
----------------------------------------
It is absolutely paramount at this stage to understand the basic Check Point architecture to configure Check Point Security Gateway properly. Please see a reference architure:

|cp_arch_reference|

As per the reference shown above the following steps will be required to configure security polices successfully:

    1. Launch Check Point Security Gateway - Configure Interfaces and Static Routes and other specific Security Gateway configuration.
    #. Download, install and configure Check Point Security Management (Optional)
    #. Download, install and configure Check Point Smart Console - Launch Smart Console using Security Manager IP, add/authenticate one or more security gateways, configure security rules/polices, and push it to security gateways.

Please follow the below steps to launch and configure Check Point Security Gateway in Azure.

If you are looking to deploy Check Point in AWS environment, your starting point is `here <https://docs.aviatrix.com/HowTos/config_CheckPointVM.html>`_.

1. Launch Check Point Firewall from Aviatrix Controller
----------------------------------------------------------

The Aviatrix Firewall Network (FireNet) workflow launches a Check Point Security Gateway instance at `Step 7a <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_.

Here is the Security Gateway information in this example for your reference. Please adjust it depending on your requirements.

==========================================      ==========
**Example setting**                             **Example value**
==========================================      ==========
Firewall Image                                  Check Point CloudGuard IaaS Single Gateway R80.40 - PAYG (NGTP)
Firewall Image Version                          8040.900294.0593
Firewall Instance Size                          Standard_D3_v2
Egress Interface Subnet                         Select the subnet whose name contains "Public-FW-ingress-egress".
Username 			                            admin (no alternatives)
Password                                        Input a good password of your choice
Attach                                          Check
==========================================      ==========

.. note::

  Check Point Security Gateway instance has only 2 interfaces as described below. Additionally, firewall instance eth1 is on the same subnet as FireNet gateway eth2 interface.

========================================================         ===============================          ================================
**Check Point VM instance interfaces**                             **Description**                          **Inbound Security Group Rule**
========================================================         ===============================          ================================
eth0 (on subnet -Public-FW-ingress-egress)                       Egress or Untrusted interface            Allow ALL
eth1 (on subnet -dmz-firewall-lan)                               LAN or Trusted interface                 Allow ALL (Do not change)
========================================================         ===============================          ================================

After the launch is complete, the console displays the Check Point Security Gateway instance with its public IP address of management/egress interface for you to login to the console.


2. Login to Check Point Firewall Gaia Portal
----------------------------------------------

After launch is complete, wait for 5 minutes and then go back to the Controller, Firewall Network -> Setup -> Step 7a and  Click on the `Management UI` as shown below.

The URL takes you to the Check Point Security Gateway Gaia Portal you just launched.

|avx-firewall-step7a_UI|

.. note::

  Please try to use different browser (e.g. Firefox) if the Management UI link is not opening on your default browser.

Login Gaia Portal with admin and password specified at launch time. 

Go to the page “Network Management -> Network Interfaces” to review eth0 (WAN) and eth1 (LAN) configuration as shown below.

|cp_firewall_interfaces|

Review static routes RFC 1918 which is configured on LAN port, the purpose of those static route is to send the packets back to the Gateway (GW).

Those static routes could be reviewed on the page “Network Management -> IPv4 Static Routes”

|cp_firewall_static_routes|

Routes can also be reviewed by clicking the button “Monitoring” on the page “Network Management -> IPv4 Static Routes”

|cp_firewall_routes_monitoring|

3. Firewall Vendor Integration
-------------------------------------------------
Go to Aviatrix Controller --> Firewall Network --> Vendor Integration and complete the step as shown below:

|cp_firewall_vendor_integration|

Click **Save**, **Show** and **Sync** respectively.

This automatically set up the routes between Aviatrix Gateway and Vendor’s firewall instance in this case Check Point. This can also be done manually through Cloud Portal and/or Vendor’s Management tool.

4. Download and install the SmartConsole
-------------------------------------------------

4.1 Download and Install Check Point Security Management
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Check Point instance launched in the previous step requires a management console for managing policies. 

Download and install the **Check Point Security Management** from Azure Marketplace. 

.. important::

    Check Point Security Management CloudGuard version should be R80.40

Login to Check Point Security Manager and download the SmartConsole on Windows-based computer.

  Option 1: click on the button "Download Now!" with message "Manage Software Blades using SmartConsole" on the Overview page as below.

|cp_security_manager|

  Option 2: download it by using this link `R80.40 <https://supportcenter.Check Point.com/supportcenter/portal?action=portlets.DCFileAction&eventSubmit_doGetdcdetails=&fileid=101086>`_

4.2 Install SmartConsole and Login
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the SmartConsole and login into it with the Gaia Portal username, password and IP Address of Security Manager.

|smart_console_login|


5. Configure and Add Check Point Gateway in SmartConsole
--------------------------------------------------------

Check Point Gateway needs to be configured with one-time secure password in order to establish the secure communication with Check Point Security Management Portal.

SSH to Check Point Gateway in order to configure One-time Secure Password.

::

    %ssh admin@ip-address
    The authenticity of host 'ip-address' can't be established.
    ECDSA key fingerprint is SHA256:1S6wQF4xI6YtieM1te0lnI2wXoRDiDfa85ctsDHd1N4.
    Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
    Failed to add the host to the list of known hosts (/Users/ahmednaail/.ssh/known_hosts).
    This system is for authorized use only.
    Password:
    You have logged into the system.
    By using this product you agree to the terms and conditions
    as specified in https://www.Check Point.com/download_agreement.html
    CLINFR0771  Config lock is owned by admin. Use the command 'lock database override' to acquire the lock.

    cp-firewall-sc-azure> lock database override
    cp-firewall-sc-azure> set expert-password
    Enter new expert password:
    Enter new expert password (again):
    cp-firewall-sc-azure> expert
    Enter expert password:


    Warning! All configurations should be done through clish
    You are in expert mode now.

    [Expert@cp-firewall-sc-azure:0]# cpconfig
    This program will let you re-configure
    your Check Point products configuration.


    Configuration Options:
    ----------------------
    (1)  Licenses and contracts
    (2)  SNMP Extension
    (3)  PKCS#11 Token
    (4)  Random Pool
    (5)  Secure Internal Communication
    (6)  Enable cluster membership for this gateway
    (7)  Check Point CoreXL
    (8)  Automatic start of Check Point Products

    (9) Exit

    Enter your choice (1-9) :5

    Configuring Secure Internal Communication...
    ============================================
    The Secure Internal Communication is used for authentication between
    Check Point components

    Trust State: Initialized but Trust was not established

     Would you like to change the Activation Key? (y/n) [n] ? y


    Note: This operation will stop all Check Point Services (cpstop).
    Are you sure you want to continue? (y/n) [n] ? y
    Enter Activation Key:
    Retype Activation Key:
    initial_module:
    Compiled OK.
    initial_module:
    Compiled OK.

    Hardening OS Security: Initial policy will be applied
    until the first policy is installed


    The Secure Internal Communication was successfully initialized


    Configuration Options:
    ----------------------
    (1)  Licenses and contracts
    (2)  SNMP Extension
    (3)  PKCS#11 Token
    (4)  Random Pool
    (5)  Secure Internal Communication
    (6)  Enable cluster membership for this gateway
    (7)  Check Point CoreXL
    (8)  Automatic start of Check Point Products

    (9) Exit

    Enter your choice (1-9) :9

    Thank You...

Terminate SSH session.


At this point, we have created a One-time secure password.

Now go back to SmartConsole and Add a Gateway as shown below:

|smartconsole_add_gateway|

Click on Wizard Mode

|cp_gw_creation_wizard|

Next provide the GW information as shown in the table:

=======================   ===============================================
**Field**                 **Value**
=======================   ===============================================
Gateway Name              Configure any name
Gateway Platform          Select CloudGuard IaaS
Gateway IP
 * Static IP Address      Provide Check Point Gateway IP address
=======================   ===============================================

|gw_general_properties|


Next step is to establish a secure communication with a Gateway.

=======================   ===============================================
**Field**                 **Value**
=======================   ===============================================
Gateway' Name              Provide you Gateway Name (Case-Sensitive)
One-time Password          Use same Password which you set during SSH session with Gateway
Trust State                Default Values
=======================   ===============================================

.. important::
    If you see an error during communication establishment process that says, "Failed to connect to Security Gateway. SIC has not been established ...". Please SSH to your Gateway again and follow the same process mentioned in step 4, and try again to establish a communication with Security Gateway.

|trusted_communication|

Click "OK" and "Finish".

|get_topology|

|cp_wizard_summary|

Review the Gateway Summary and Click "OK"

|cp_gw_summary|

At this point if all the steps are followed properly then you should see a Gateway under GATEWAYS & SERVERs tab.

|cp_gw_added|

6. Configure basic traffic policy to allow traffic VPC to VPC
------------------------------------------------------------------

In this step, we will configure a basic traffic security policy that allows traffic to pass through the Security Gateway.

Go to the page "SECURITY POLICIES -> Access Control -> Policy" and configure a policy by either modifying the default "Cleanup rule" or Add a new rule above the default rule.

=======================   ===============================================
**Field**                 **Value**
=======================   ===============================================
Name                      Configure any name for this policy (i.e. allow-all)
Source                    Any
Destination               Any
VPN                       Any
Service & Applications    Any
Action                    Accept
Track                     Log
=======================   ===============================================

|basic_allowall_policy|

Click on the button "Install Policy" and then "Install" to commit the settings.

|install_allowall_policy|

|policy_installed|

After validating that your traffic is being routed through your Security Gateway instances, you can customize the security policy to tailor to your requirements.

7. [Optional] Configure basic traffic policy to allow traffic VPC to Internet
----------------------------------------------------------------------------------

In this step, we will configure a basic traffic security policy that allows internet traffic to pass through the firewall. Given that Aviatrix gateways will only forward traffic from the TGW to the LAN port of the Firewall, we can simply set our policy condition to match any packet that is going in of LAN interface and going out of WAN interface.

.. important::
  Enable `Egress inspection <https://docs.aviatrix.com/HowTos/firewall_network_faq.html#how-do-i-enable-egress-inspection-on-firenet>`_ feature on FireNet

First of all, go back to the Aviatrix Controller Console. Navigate to the page "Firewall Network -> Advanced". Click the skewer/three dot button. Scroll down to “Egress through Firewall” and click Enable. Verify the Egress status on the page "Firewall Network -> Advanced".

|cp_egress_inspection|

Secondly, go back to the Check Point SmartConsole. Navigate to the page "GATEWAYS&SERVERS" and then double-click on the gateway itself to enable NAT function as the following screenshot.

- Click on the button "NAT"
- Enable the checkbox "Hide internal networks behind the Gateway's external IP"
- Click the button "OK"
- Click the button "Install Policy"

|cp_policy_vpc_to_internet_nat_enabled|

.. important::

  NAT function needs to be enabled on the Check Point FW interface eth0 for this VPC to Internet policy. Please refer to `Check Point's NAT instruction <https://sc1.Check Point.com/documents/R76/CP_R76_Firewall_WebAdmin/6724.htm>`_ for detail.

**[Optional]** If you have default "Cleanup rule", then navigate to the page "SECURITY POLICIES -> Access Control -> Policy" and inject a new rule for Internet Policy on top of the default "Cleanup rule".

=======================   ===============================================
**Field**                 **Value**
=======================   ===============================================
Name                      Configure any name for this policy (i.e. Internet-Policy)
Source                    Any
Destination               Select the object with All_internet
VPN                       Any
Service & Applications    Any
Action                    Accept
Track                     Log
=======================   ===============================================

Click on the button "Install Policy" and then "Install" to commit the settings.

|cp_policy_vpc_to_internet|

After validating that your traffic is being routed through your Security Gateway instances, you can customize the security policy to tailor to your requirements.

8. Ready to go!
----------------

Now your Security Gateway instance is configured and ready to receive packets!

Next step is to validate your configurations and polices using FlightPath and Diagnostic Tools (ping, traceroute etc.).


9. View Traffic Log
----------------------

You can view if traffic is forwarded to the firewall instance by logging in to the Check Point Firewall SmartConsole. Go to the page "LOGS & MONITOR".

For VPC to VPC traffic:
~~~~~~~~~~~~~~~~~~~~~~~~~`

Launch one instance in PROD Spoke VPC and DEV Spoke VPC. Start ping packets from a instance in DEV Spoke VPC to the private IP of another instance in PROD Spoke VPC. The ICMP traffic should go through the firewall and be inspected in firewall.

|cp_view_traffic_log_vpc_to_vpc|

[Optional] For VPC to Internet traffic:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

Launch a private instance in the Spoke VPC (i.e. PROD Spoke VPC) and start ping packets from the private instance towards Internet (e.g 8.8.8.8) to verify the egress function. The ICMP traffic should go through, and get inspected on firewall.

.. important::
    The Egress Inspection is only applicable to all VNets that deploys non public facing applications. If you have any Spoke VNet that has public facing web services, you should not enable Egress Inspection. This is because Egress Inspection inserts a default route (0.0.0.0/0) towards Transit GW to send the Internet traffic towards firewall to get inspected. Azure's System Default Route pointing towards Internet will be overwritten by User-defined default route inserted by the Controller. 

|cp_view_traffic_log_vpc_to_internet|


.. |cp_arch_reference| image:: config_CheckPoint_media/cp_arch_reference.png
   :scale: 20%
.. |avx-firewall-step7a_UI| image:: config_CheckPoint_media/avx-firewall-step7a_UI.png
   :scale: 20%
.. |cp_firewall_interfaces| image:: config_CheckPoint_media/cp_firewall_interfaces.png
   :scale: 20%
.. |cp_firewall_static_routes| image:: config_CheckPoint_media/cp_firewall_static_routes.png
   :scale: 20%
.. |cp_firewall_routes_monitoring| image:: config_CheckPoint_media/cp_firewall_routes_monitoring.png
   :scale: 20%
.. |cp_firewall_vendor_integration| image:: config_CheckPoint_media/cp_firewall_vendor_integration.png
   :scale: 20%
.. |cp_security_manager| image:: config_CheckPoint_media/cp_security_manager.png
   :scale: 20%
.. |smart_console_login| image:: config_CheckPoint_media/smart_console_login.png
   :scale: 20%
.. |smartconsole_add_gateway| image:: config_CheckPoint_media/smartconsole_add_gateway.png
   :scale: 20%
.. |cp_gw_creation_wizard| image:: config_CheckPoint_media/cp_gw_creation_wizard.png
   :scale: 20%
.. |gw_general_properties| image:: config_CheckPoint_media/gw_general_properties.png
   :scale: 20%
.. |trusted_communication| image:: config_CheckPoint_media/trusted_communication.png
   :scale: 20%
.. |get_topology| image:: config_CheckPoint_media/get_topology.png
   :scale: 20%
.. |cp_wizard_summary| image:: config_CheckPoint_media/cp_wizard_summary.png
   :scale: 20%
.. |cp_gw_summary| image:: config_CheckPoint_media/cp_gw_summary.png
   :scale: 20%
.. |cp_gw_added| image:: config_CheckPoint_media/cp_gw_added.png
   :scale: 20%
.. |basic_allowall_policy| image:: config_CheckPoint_media/basic_allowall_policy.png
   :scale: 20%
.. |install_allowall_policy| image:: config_CheckPoint_media/install_allowall_policy.png
   :scale: 20%
.. |policy_installed| image:: config_CheckPoint_media/policy_installed.png
   :scale: 20%
.. |cp_egress_inspection| image:: config_CheckPoint_media/cp_egress_inspection.png
   :scale: 20%
.. |cp_policy_vpc_to_internet_nat_enabled| image:: config_CheckPoint_media/cp_policy_vpc_to_internet_nat_enabled.png
   :scale: 20%
.. |cp_policy_vpc_to_internet| image:: config_CheckPoint_media/cp_policy_vpc_to_internet.png
   :scale: 20%
.. |cp_view_traffic_log_vpc_to_vpc| image:: config_CheckPoint_media/cp_view_traffic_log_vpc_to_vpc.png
   :scale: 20%
.. |cp_view_traffic_log_vpc_to_internet| image:: config_CheckPoint_media/cp_view_traffic_log_vpc_to_internet.png
   :scale: 20%
.. disqus::
