.. meta::
   :description: Aviatrix Virtual Appliance CloudN Startup guide
   :keywords: Aviatrix Cloud Interconnect, DCCX, CloudN, datacenter extension

=======================================
 Virtual Appliance CloudN
=======================================



The Aviatrix CloudN virtual appliance is deployed in an on-premise datacenter or co-location facility.

CloudN supports API that allows for further automation and third party software integration.
API documentation can be found at `this link. <http://docs.aviatrix.com/HowTos/Aviatrix_Controller_API.html>`_ For an example of how to use API, check out `this link. <http://docs.aviatrix.com/HowTos/aviatrix_apis_datacenter_extension.html>`__

CloudN performs three major functions: 

- **Datacenter Extension** Extend your datacenter to multi cloud (Datacenter Extension or DCCX). Read `How to build agile DevOps documentation  <http://docs.aviatrix.com/Solutions/aviatrix_aws_meshVPC.html>`_ for instructions.

- **Site2Cloud** Build an encrypted tunnel to existing VPC/VNets (on-prem gateway for Site2Cloud). Read `How to build Site2Cloud  <http://docs.aviatrix.com/HowTos/cloudn-site2cloud.html>`_ for instructions.

- **IPmotion** Build connectivity that makes it possible to migrate on-prem VMs to the cloud while preserving their IP addresses. Read `How to setup IPmotion  <http://docs.aviatrix.com/HowTos/ipmotion.html>`_ for instructions.

The following guide provides step by step instructions for deploying the virtual appliance. Read carefully as there are specific instructions for each of the above three use cases.


1. Download the Image
=======================

Please contact info@aviatrix.com to get access to CloudN virtual appliance.

2. Pre-Installation Check List
===============================

2.1. AWS EC2 Account for Datacenter Extension and IPmotion
-----------------------------------------------------------

.. Note:: If CloudN is deployed for Site2Cloud function, you do not need to setup an EC2 account. Skip section 2.1. 

..

  If you intend to launch a VPC in AWS, you need to have an AWS account.

  You need to have an AWS account in order to use most of the commands on
  CloudN. Note that CloudN supports multiple CloudN cloud accounts with
  each one associated with a different AWS account or IAM account, but
  there needs to be at least one to start with.

  The AWS account can be a root account, an IAM user in an Administrator
  Group or an IAM user with full access permission to EC2, VPC, S3, SQS,
  SNS, CloudTrail and Route 53. For security reasons, we strongly
  recommend you use an IAM user account. During onboarding, you will have the
  opportunity to copy and paste a custom policy required by Aviatrix to
  your AWS IAM account.

2.1.1. IAM Administrator
*****************************

      The following steps show you how to add a user to Administrator Group in
      AWS.

      Step 1. Login to https://console.aws.amazon.com/iam

      Step 2. Click Users, select the user that needs to be added to
      Administrative privilege and click Add User to Groups

      |image4|

      Step 3. Add joe\_smith to admin group which was created previously via
      Groups tab on the console.

      |image5|

2.1.2. IAM User
*******************

      If you are an IAM user, make sure you have full access to EC2, VPC, S3,
      SQS, SNS and CloudTrail service. Refer to this link on how to setup an
      IAM access policy required by CloudN. During the onboarding process, we
      will guide you through on setting up this IAM customer policy.

2.2. Microsoft Azure Account for Datacenter Extension
-------------------------------------------------------

.. Note:: If CloudN is deployed for Site2Cloud function, you do not need to set up an Azure account. Skip this section.

..
 
    To create credentials for Azure, follow `these instructions. <http://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_

2.3. Deploy CloudN as a virtual router (Site2Cloud function)
------------------------------------------------------------

    You can deploy CloudN as a virtual router and in a remote site for 
    Site2Cloud function.

|image8|

    In this deployment, CloudN functions as a router deployed anywhere inside a datacenter and does not require a public IP address.
    What is required is that
    the default gateway of the subnet where CloudN is deployed has a static
    route configured that routes traffic destined to the VPC CIDR where this
    remote site wishes to connect to the CloudN.

2.4. Deploy CloudN for Aviatrix Datacenter Extension 
----------------------------------------------------------

If you plan to use CloudN for IPmotion, skip section 2.4

2.4.1. Cloud address planning and allocation
***********************************************

    When used for datacenter extension (DCCX) function, CloudN manages your entire cloud address space.

    You need to identify or create a subnet where CloudN is deployed. CloudN
    is deployed on a private subnet anywhere on your network. The CloudN does
    not take a public IP address. Make sure this subnet is reachable by
    other subnets where traffic is originated from.

    CloudN should be deployed on a subnet (or VLAN) where CloudN is the only
    virtual machine on the VLAN. The CloudN VM’s IP address is determined by
    CloudN software during installation time.

    The default gateway for the VLAN should either have the lowest address
    or highest address for the VLAN. For example, if the VLAN where CloudN
    is deployed is 10.10.0.0/16, the default gateway IP address for this
    VLAN should be either 10.10.0.1 or 10.10.255.254.

    The size of this subnet or VLAN should be large enough to allow the
    creation of the desired number of VPCs. For example, a network with a /16
    prefix can support 15 VPC/VNets with each VPC/VNet containing a /24 subnet
    in AWS or Azure.

    CloudN allocates 4 bits or 16 subnets in each VPC. By default, two
    subnets, one private and one public subnet, are created in each
    available zone. A user can customize and create additional subnets.

2.4.2. Deploy on Subnets larger than /24
******************************************

      If you deploy a CloudN in a /23 subnet, only two VPC/VNet can be
      created. This VPC/VNet can support 8 subnets.

      It is recommended that you deploy CloudN in a subnet size between /16
      and /22. Below is a table describing the relationship between subnet size and the
      maximum number of VPCs.

      |image6|

2.4.3. Deploy on a Class C Subnet
**************************************

      Deploying CloudN in a /24 subnet is a special case. It is handled
      differently than any other size of subnet.

      In this case, there is only one public subnet and 2 private subnets with
      each in a different availability zone created for a VPC Container. Up to
      2 VPCs can be launched. Since not every AZ (Availability Zone) is
      covered in subnet creation, applications that require subnets in each AZ
      would not work. Deploying on a /24 subnet is best used for POC projects.

      If you have local machines on the subnet where CloudN is deployed, you
      need to make sure all local machines including the default gateway and
      CloudN are in one sub segmented area, as illustrated below:

      |image7|

      Leaving local machines outside the address range of 192.168.1.0/26 can
      result in duplicate IP addresses.

      Each VPC has 1 public subnet and 2 private subnets.

2.5. Network Interfaces
--------------------------------

  The CloudN local gateway is installed as a VM host with two network
  interfaces. Make sure the two interfaces are on the same VLAN or subnet.

  If CloudN runs on the VMware ESXi host, follow the instructions in the next
  chapter to enable promiscuous mode and forged transmit mode for both
  interfaces.

  If CloudN runs on Microsoft Hyper-V, you do not need to configure the
  network interfaces as they are pre-configured as part of the VHD image. 

2.6. Internet Connectivity
--------------------------

  CloudN needs to have Internet connectivity to perform most of its
  functions.

2.7. Proxy Settings
-------------------

  If there is a proxy server on-prem for Internet access, contact an IT
  administrator to obtain a proxy server IP address, proxy port, and if
  there needs to be a username and password for authenticating by the
  proxy.

2.8. Binding to CloudN Private IP address to a Single NAT Public IP Address
---------------------------------------------------------------------------
  .. Note:: If you select TCP as the tunnel type for either datacenter extension or site2cloud function, the constraints in this section do not apply. 
  
  ..

  If your organization has more than one public IP addresses as the NAT
  address, you must bind CloudN’s private IP address to one of the public
  IP addresses. That is, CloudN will always be translated to one static
  public IP address for its outbound traffic.

  For example, on Cisco ASA, you can configure the following to bind a
  private IP address to one public IP:

  Step 1  Create a network object for the internal servers.

  ::

     hostname(config)# object network myWebServ

     hostname(config-network-object)# range 10.1.1.1 10.1.1.70

  Step 2  Configure NAT to map servers from 10.1.1.1 to 10.1.1.70 to a
  static public IP (209.165.201.10)

  ::

    hostname(config-network-object)# nat (inside,outside) static 209.165.201.10

2.9. Outbound TCP/UDP Ports
----------------------------------

  CloudN requires the following TCP/UDP outbound ports open.

  -  TCP port 443.

  -  (optional) UDP ports 4500 and 500.

.. Note:: Aviatrix CloudN supports encrypted tunnels over TCP port 443. If you select TCP as the tunnel type for datacenter extension or site2cloud function, no UDP ports 500/4500 are required to be open. The advantage of selecting TCP as the tunnel type is the reduction of deployment friction when building hybrid connectivity. In the current release for IPmotion, only UDP mode is supported. 

..

  If you choose to reduce the scope of the above ports, you can limit them
  to only AWS owned public IP address blocks. All AWS public IP addresses can be found in `this link. <https://ip-ranges.amazonaws.com/ip-ranges.json>`__

  Since CloudN operates in a client-server mode where the CloudN local
  gateway is the client, there is no restriction or requirement to open
  any known TCP/UDP port for inbound traffic.

2.10. Time Service
---------------------

  CloudN extensively uses Amazon Web Service (AWS) APIs and Azure APIs. These APIs checks timestamp for each API call. CloudN is
  pre-configured to synchronize its time with the host (please double check on
  the VM advanced option to make sure this is the case.) To ensure correct
  operation of CloudN, it is important that the Host where CloudN is
  installed has the correct time.

  Most likely enterprise data center syncs VM time to host. However if
  your environment requires you to sync time to an NTP server, CloudN
  allows you to accomplish that. You can configure this at Settings ->
  Time Service.

2.11. Performance Consideration
-------------------------------------

  CloudN is a virtual appliance that runs on a hypervisor. The supported
  hypervisors are VMware hypervisor products, Microsoft Enterprise 8.1
  Hyper-V and Oracle VirtualBox.

  By default CloudN is packaged with 2 vCPU, 4GB of memory and 20GB of hard disk (SCSI storage or hard drive) as part of
  its image make up. You can always reconfigure the VM to take more CPU
  and memory.

  For maximum performance, it is recommended that the host CPU has support
  for Intel AES-NI and instructions set for hardware encryption. Intel
  processors Westmere, Sandy Bridge, Ivy Bridge and Haswell all have AES-NI
  enabled.

  In test environments, TCP throughput (using iperf tool) in the vicinity
  of 880Mbps has been observed with CloudN running on a VMware ESXi host
  with an Intel Xeon CPU (E3-1220L V2 @ 2.30GHz).

----

3. Installation
=================

The CloudN OVF image can be imported and installed on a VMware ESXi 5.0/5.1
host, VMware Workstation, Fusion and VMware Player. Once you have signed
up as an Aviatrix customer, follow the instructions to download the zip
file on your PC. CloudN OVF image usually takes the name
“cloudN-ovf-date” where date is the time when the image was built.

It is recommended that you run CloudN on ESXi 5.0 or later versions. However, you
can install the software on a VMware Player, VMware Workstation and Fusion
for testing and evaluation purposes.

3.1. Installation on ESXi 5.0 or later
-------------------------------------------

    After downloading and extracting the zip file, copy the folder to a
    location where you can import the virtual machine. For installation,
    follow the steps below.

    Step 1: In the vSphere Client, select File > Deploy OVF Template

    |image9|

    Step 2: Locate the folder where the “.ovf” file is located

    |image10|

    Step 3: Click Next to proceed through the rest of the installation.
    Please refer to the page
    `ESXi Admin <https://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.vsphere.vm\_admin.doc%2FGUID-6C847F77-8CB2-4187-BD7F-E7D3D5BD897B.html>`_
    for more detailed instructions.

3.1.1.  Configure Network Adapter Properties for 
*************************************************************

.. Note:: If you deploy CloudN for Site2Cloud connectivity, CloudN network interfaces are not in promiscuous mode. Skip this section.

..

    CloudN has two network interfaces, both of which need to be on the same
    VLAN.

    After the installation is finished, follow these steps to enable
    promiscuous mode on the network adapter (below is an example):

    **Step 1**. Select (Highlight) the ESXi host tab where CloudN is hosted (for
    example, 192.168.1.34) and click on the Configuration tab.

    |image11|

    **Step 2**. In the Hardware section, click Networking and then properties.

    |image12|

    **Step 3**. Select VM Network adapter for CloudN and click edit.

    |image13|

    **Step 4**. Click the Security tab. From the Promiscuous Mode dropdown menu,
    click the box and select accept and click OK. If you are running ESXi
    5.1 or later, you also need to set Forged Transmit Mode for the port
    group to “Accepted”.

    |image14|

    For more information on configuring security policies on the network
    switch, please refer to the instructions in `this link <http://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.vsphere.networking.doc%2FGUID-74E2059A-CC5E-4B06-81B5-3881C80E46CE.html>`_.

    For additional CloudN on ESXi configuration illustrations, check out
    `this note <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Configuring_CloudN_Examples.pdf>`_

.. Note:: DCCX does not support NIC teaming in active-active mode. 
..

  When NICteaming is configured, only active-standby mode is supported, as
  shown below where the ESXi host has 4 Ethernet ports and VLAN220 is the
  port group CloudN Ethernet ports belong to.

  |image15|


3.2. Installation on Windows 8.1 Enterprise Edition
-----------------------------------------------------

  CloudN VHD image can be deployed on Windows 8.1 Enterprise Edition, or
  Windows 2012 Server R2 Hyper-V.

  After downloading the zip file and decompressing it, copy the folder to
  a location where you can import the virtual machine. For installation,
  follow the guide below.

  **Step 1**: Import the VHD Image

  |image16|

  **Step 2**: Locate Folder

  |image17|

  **Step 3**: Copy the Virtual Machine

  |image18|

  **Step 4**: Connect to the Virtual Machine

  |image19|

  **Step 5**: Start the Virtual Machine

  |image20|

  **Step 6**: Login to Virtual Machine

  ::

    User Name: admin

    Password: Aviatrix123#

3.2.1. Enable MAC Address Spoofing for DCCX and IPmotion
*********************************************************

.. Note:: If you deploy CloudN for Site2Cloud function, MAC Spoofing is not needed. Skip this section.
..

  Both Network Adapters associated with CloudN VM should have “Enable MAC
  Address Spoofing” turn on. This is accomplished by expanding the Network
  Adapter, selecting Advanced Feature and checking the box “Check MAC Address
  Spoofing” for each Network Adapter.

  As part of VHD image, this setting should already be configured and
  should not be changed.

  |image21|

3.3. NIC Teaming Support for DCCX and IPmotion
------------------------------------------------

.. Note:: If you deploy CloudN for Site2Cloud function, active and active NIC team is supported. 
..

  For DCCX, NIC teaming is only supported for active standby mode.


4. Booting Up and Initial Configuration
=========================================

This section and the following steps can be automated. Check out `this vmware PowerCli script. <https://github.com/AviatrixSystems/AutoLaunchCloudN>`_

The below description is how you can boot up in a manual way. 

After the virtual machine boots up, you must first login to the
machine while still in the hypervisor console.

**CloudN Login User Name: admin**

**CloudN Login Password: Aviatrix123#**

After this initial login, if you see the screen the screen below.

|image40|

Follow the instruction to type “help” at the prompt.

|image41|

Follow the steps to go through the boot up process. You can type “help”
at any time to review the steps. Type “?” to view all available
commands. For each command, type “?” to view syntax and parameters.

4.1. **Step 1**: Setup Interface Address
-----------------------------------------

  There are two ways to give CloudN its IP address: auto-generate by
  CloudN itself or statically assign one.

4.1.1. Statically assign CloudN IP address (Recommended method)
***************************************************************

    Command: setup\_interface\_static\_address

    Syntax: setup\_interface\_static\_address [static\_ip\_address]
    [net\_mask] [default\_gateway\_ip\_address]
    [primary\_dns\_server\_ip\_address]
    [secondary\_dns\_server\_ip\_address] [proxy {true\|false}]

    Below is an example where there is no proxy server. In such a case, CloudN
    will configure the network interfaces, test Internet connectivity and
    download the latest Aviatrix software.

    |image42|

.. Note:: For DCCX deployment, choose CloudN IP to be next to the default gateway IP address of the VLAN or subnet where CloudN is deployed. This does not apply to IPmotion deployment. 

4.1.1.1. Proxy Configuration
******************************

    If there is a proxy server for Internet access, you must set up proxy
    configuration on CloudN to pass traffic to the proxy correctly. The following is
    the necessary command.

    command: setup\_network\_proxy

    syntax: setup\_network\_proxy <action> <--http\_proxy> <--https\_proxy>

    where action is “test” or “save”.

    Example:

    ::

      setup\_network\_proxy test --http\_proxy http://10.30.0.3:3128
      --https\_proxy http://10.30.0.3:3128

      setup\_network\_proxy save --http\_proxy http://10.30.0.3:3128
      --https\_proxy http://10.30.0.3:3128

    Note that after the proxy configuration is saved, CloudN VM will reboot to have
    the proxy take effect.

4.1.2. Auto-generate CloudN interface IP address
***************************************************

    All you need to do here is provide information related to the subnet
    where CloudN is deployed. CloudN scans the subnet and finds an IP address
    that is close to the default gateway (for example, if the default
    gateway is 10.10.0.1, CloudN will try 10.10.0.2) and is available,
    CloudN will then assign itself this IP address and CloudN software will be
    downloaded if the configuration is successful.

    Command setup\_interface\_address:

    Syntax: setup\_interface\_address [net\_mask]
    [default\_gateway\_ip\_address] [dns\_server\_ip\_address\_1]
    [dns\_server\_ip\_address\_2] [proxy {true\|false}]

    |image43|

    CloudN will identify an unused IP address in an iterative fashion and
    assign it to itself. As seen in the above example, the IP address
    generated is 10.88.0.3.

    Once the IP address is generated, CloudN will start to download the
    latest CloudN software.

    …….. snippet…….

    |image44|

    If you see the above message, the download is completed.

4.2. Step 2: Display Interface Address
---------------------------------------

  |image45|

  Now you can use the cloudN IP address as a URL to access the CloudN Manager
  that manages CloudN.

  Note: The hypervisor console has only limited CLI for initial booting-up
  purposes. Once the Aviatrix software is downloaded, full commands are
  installed.

  The User should use the GUI to access CloudN Console.

4.3. Troubleshooting
--------------------

  If there is any error messages during installation, it is usually due to a
  lack of Internet connectivity, an incorrect DNS server IP address or
  unopened firewall ports. Type “?” to see all the commands that help you
  troubleshoot.

  Use the commands “\ ***ping***\ ” and “\ ***traceroute***\ ” to check out
  Internet connectivity. Check your DNS server setting and consult your
  network and server admin to determine the cause of routing failure.

  After connectivity issue is resolved, use command
  “download\_cloudn\_software” to continue installation and finish. Or you
  can type in setup\_interface\_address again.

4.4. Use a Browser to Access CloudN
---------------------------------------

  CloudN has a built in CloudN Console that let you run provisioning from
  a browser.

  Once IP addressed setup is complete, you can use any browser, type
  https://<IP address of CloudN> and see a Login page.

  |image46|

  Login with:

  User Name: **admin**

  Password: **private IP address of the VM**

  After logging in, go through the initial setup process.

  For the first time user and initial set up, follow Onboarding to go
  through the initial set up and launch your first VPC/VNet.

----

.. Warning:: Any resources created by the Controller, such as Aviatrix gateways, AWS/Azure routing tables, subnets, etc, must be deleted from the controller console. If you delete them directly on the AWS console, the Controller's view of resources will be incorrect which will lead to features not working properly.

..

5. Onboarding
===============

After you log in to the browser console, click Onboarding to go through a
few steps of initial setup and start using Aviatrix.

For all feature documentation, go to docs.aviatrix.com

For support issues, send email to support@aviatrix.com.

Enjoy!

.. |image0| image:: CloudN_Startup_Guide_media/image001.png
   :width: 2.90683in
   :height: 0.35000in
.. |image1| image:: CloudN_Startup_Guide_media/image002.png
   :width: 6.50000in
   :height: 3.65556in
.. |image2| image:: CloudN_Startup_Guide_media/image003.png
   :width: 6.66736in
   :height: 3.75069in
.. |image3| image:: CloudN_Startup_Guide_media/image004.png
   :width: 6.34375in
   :height: 2.49143in
.. |image4| image:: CloudN_Startup_Guide_media/image005.png
   :width: 5.08878in
   :height: 2.24352in
.. |image5| image:: CloudN_Startup_Guide_media/image006.png
   :width: 4.98377in
   :height: 2.19722in
.. |image6| image:: CloudN_Startup_Guide_media/image007.png
   :width: 6.78264in
   :height: 3.42942in
.. |image7| image:: CloudN_Startup_Guide_media/image008.png
   :width: 5.43403in
   :height: 3.40694in
.. |image8| image:: CloudN_Startup_Guide_media/image009.png
   :width: 5.08365in
   :height: 3.25278in
.. |image9| image:: CloudN_Startup_Guide_media/image010.png
   :width: 5.02847in
   :height: 2.76966in
.. |image10| image:: CloudN_Startup_Guide_media/image011.png
   :width: 4.65347in
   :height: 3.86107in
.. |image11| image:: CloudN_Startup_Guide_media/image010.png
   :width: 5.52847in
   :height: 3.04506in
.. |image12| image:: CloudN_Startup_Guide_media/image012.png
   :width: 5.90347in
   :height: 3.25161in
.. |image13| image:: CloudN_Startup_Guide_media/image013.png
   :width: 5.55366in
   :height: 3.60000in
.. |image14| image:: CloudN_Startup_Guide_media/image014.png
   :width: 4.65196in
   :height: 5.04306in
.. |image15| image:: CloudN_Startup_Guide_media/image015.png
   :width: 4.31116in
   :height: 5.29931in
.. |image16| image:: CloudN_Startup_Guide_media/image016.png
   :width: 4.80625in
   :height: 2.45417in
.. |image17| image:: CloudN_Startup_Guide_media/image017.png
   :width: 4.65347in
   :height: 3.51297in
.. |image18| image:: CloudN_Startup_Guide_media/image018.png
   :width: 4.79795in
   :height: 3.60000in
.. |image19| image:: CloudN_Startup_Guide_media/image019.png
   :width: 5.01754in
   :height: 2.42407in
.. |image20| image:: CloudN_Startup_Guide_media/image020.png
   :width: 5.02847in
   :height: 3.94766in
.. |image21| image:: CloudN_Startup_Guide_media/image021.png
   :width: 5.02847in
   :height: 4.76850in
.. |image22| image:: CloudN_Startup_Guide_media/image022.png
   :width: 5.44632in
   :height: 4.97500in
.. |image23| image:: CloudN_Startup_Guide_media/image023.png
   :width: 5.49339in
   :height: 4.97500in
.. |image24| image:: CloudN_Startup_Guide_media/image024.png
   :width: 5.36000in
   :height: 3.35000in
.. |image25| image:: CloudN_Startup_Guide_media/image025.png
   :width: 5.87531in
   :height: 4.20185in
.. |image26| image:: CloudN_Startup_Guide_media/image026.png
   :width: 5.57477in
   :height: 3.97500in
.. |image27| image:: CloudN_Startup_Guide_media/image027.png
   :width: 5.15273in
   :height: 3.67407in
.. |image28| image:: CloudN_Startup_Guide_media/image028.png
   :width: 5.02847in
   :height: 3.60535in
.. |image29| image:: CloudN_Startup_Guide_media/image029.png
   :width: 5.27781in
   :height: 3.53518in
.. |image30| image:: CloudN_Startup_Guide_media/image030.png
   :width: 5.15347in
   :height: 2.87345in
.. |image31| image:: CloudN_Startup_Guide_media/image031.png
   :width: 5.15347in
   :height: 3.63154in
.. |image32| image:: CloudN_Startup_Guide_media/image032.png
   :width: 5.35637in
   :height: 5.10000in
.. |image33| image:: CloudN_Startup_Guide_media/image033.png
   :width: 5.27298in
   :height: 2.85000in
.. |image34| image:: CloudN_Startup_Guide_media/image034.png
   :width: 5.15347in
   :height: 4.24250in
.. |image35| image:: CloudN_Startup_Guide_media/image035.png
   :width: 5.15347in
   :height: 4.24250in
.. |image36| image:: CloudN_Startup_Guide_media/image036.png
   :width: 5.40347in
   :height: 2.92053in
.. |image37| image:: CloudN_Startup_Guide_media/image037.png
   :width: 5.74346in
   :height: 3.10000in
.. |image38| image:: CloudN_Startup_Guide_media/image038.png
   :width: 5.78376in
   :height: 4.03518in
.. |image39| image:: CloudN_Startup_Guide_media/image039.png
   :width: 5.83527in
   :height: 4.10000in
.. |image40| image:: CloudN_Startup_Guide_media/image040.png
   :width: 5.90347in
   :height: 3.76788in
.. |image41| image:: CloudN_Startup_Guide_media/image041.png
   :width: 6.50000in
   :height: 3.82639in
.. |image42| image:: CloudN_Startup_Guide_media/image042.png
   :width: 6.50000in
   :height: 3.54931in
.. |image43| image:: CloudN_Startup_Guide_media/image043.png
   :width: 5.65347in
   :height: 3.50335in
.. |image44| image:: CloudN_Startup_Guide_media/image044.png
   :width: 5.65347in
   :height: 3.53435in
.. |image45| image:: CloudN_Startup_Guide_media/image045.png
   :width: 5.65347in
   :height: 2.18844in
.. |image46| image:: CloudN_Startup_Guide_media/image046.png
   :width: 5.30625in
   :height: 2.97910in


.. add in the disqus tag

.. disqus::
