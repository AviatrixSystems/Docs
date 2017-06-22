


=======================================
Test Drive CloudN on Your Laptop 
=======================================


Download CloudN Images
----------------------

CloudN comes with two types of images, OVF and VHD, to support VMware
hypervisor and Microsoft Hyper-V.

CloudN OVF image can be imported and installed on a VMware ESXi 5.0/5.1
host, VMware Workstation, Fusion and VMware Player. Once you have signed
up as a Aviatrix customer, follow the instructions to download the zip
file on your PC. CloudN OVF image usually takes the name
“cloudN-ovf-date” where date is the time when the image was built.

CloudN is recommended to run on ESXi 5.0 or later version. However you
can install the software on VMware Player, VMware Workstation and Fusion
for testing and evaluation purposes.

Installation on ESXi 5.0 or later
---------------------------------

After downloading and extracting the zip file, copy the folder to a
location where you can import the virtual machine. For installation,
follow the steps below.

Step 1: In the vSphere Client, select File > Deploy OVF Template

|image9|

Step 2: Locate the folder where “.ovf” file is located

|image10|

Step 3: Click Next to proceed through the rest of the installation.
Please refer to the page
`ESXi Admin <https://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.vsphere.vm\_admin.doc%2FGUID-6C847F77-8CB2-4187-BD7F-E7D3D5BD897B.html>`_
for more detailed instructions.

Configure Network Adapter Properties
-------------------------------------

CloudN has two network interfaces, both of them need to be on the same
VLAN.

After the installation is finished, follow these steps to enable
promiscuous mode on the network adapter (below is an example):

Step 1. Select (Highlight) ESXi host tab where CloudN is hosted (for
example, 192.168.1.34) and click on the Configuration tab

|image11|

Step 2. In the Hardware section, click Networking and then properties

|image12|

Step 3. Select VM Network adapter for CloudN and click edit

|image13|

Step 4. Click the Security tab, from the Promiscuous Mode dropdown menu,
click the box and select accept and click OK. If you are running ESXi
5.1 or later, you also need to set Forged Transmit Mode for the port
group to “Accepted”.

|image14|

For more information on configuring security policies on the network
switch, please refer to the instructions in `this link <http://pubs.vmware.com/vsphere-51/index.jsp?topic=%2Fcom.vmware.vsphere.networking.doc%2FGUID-74E2059A-CC5E-4B06-81B5-3881C80E46CE.html>`_.

For additional CloudN on ESXi configuration illustrations, check out
`this note <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Configuring_CloudN_Examples.pdf>`_

Special Notes
----------------

CloudN does not support NICteaming in active-active mode. When
NICteaming is configured, only active-standby mode is supported, as
shown below where the ESXi host has 4 Ethernet ports and VLAN220 is the
port group CloudN Ethernet ports belong to.

|image15|

Note that CloudN currently does not support vMotion.

Installation on Windows 8.1 Enterprise Edition
----------------------------------------------

CloudN VHD image can be deployed on Windows 8.1 Enterprise Edition, or
Windows 2012 Server R2 Hyper-V.

After downloading the zip file and decompressing it, copy the folder to
a location where you can import the virtual machine. For installation,
follow guide below.

Step 1: Import the VHD Image

|image16|

Step 2: Locate Folder

|image17|

Step 3: Copy the Virtual Machine

|image18|

Step 4: Connect to the Virtual Machine

|image19|

Step 5: Start the Virtual Machine

|image20|

Step 6: Login into Virtual Machine

::

  User Name: admin

  Password: Aviatrix123#

Enable MAC Address Spoofing
----------------------------

Both Network Adapters associated with CloudN VM should have “Enable MAC
Address Spoofing” turn on. This is accomplished by expand Network
Adapter, select Advanced Feature and check the box “Check MAC Address
Spoofing”, for each Network Adapter.

As part of VHD image, this setting should already be configured and
should not be changed.

|image21|

NIC Teaming Support
-------------------

NIC teaming is only supported for active standby mode.

Running CloudN on Wireless Host
---------------------------------

CloudN VHD image is packaged with its virtual switch configured with
External Network Wire. If your host machine has wireless network
adapter, you need to change the binding of virtual switch to External
Network Wireless. Highlight the VM, choose settings, choose Network
Adapters and configure as shown in the picture below.

|image22|

Test Drive on Your Laptop
-------------------------

CloudN can be installed on your laptop or desktop running on VMware
Workstation, Fusion and Windows Enterprise 8.1 in NAT mode. You can use
this deployment for testing and evaluation purpose.

Installation on VMware Workstation is straight forward. Use “Open”
option to import the OVF file.

Test Drive CloudN in NAT Mode or Hyper-V Internal Network Wire Mode
---------------------------------------------------------------------

One good configuration to test drive cloudN is to deploy it on your
laptop on a private subnet in NAT mode (In Hyper-V, the network adapters
are configured as Internal Network Wire). However, since VMware
Workstation and Fusion allows only one NAT mode subnet, special
attention must be given if you have other VMs that shares the subnet.
Sharing subnet or VLAN with other VMs is not a recommended model in real
production deployment.

As an example, if your NAT mode subnet is 192.168.10.0/24, you can
create a maximum 2 VPCs from CloudN deployed on this subnet. Suppose the
default gateway IP address is 192.168.10.2. CloudN will automatically
take 192.168.10.3 as its IP address. In addition CloudN reserves IP
address ranges from 192.168.10.4 to 192.168.10.7. If you have other VMs
running on this subnet, make sure their IP address fall in the same sub
segment as CloudN but not overlap with CloudN and its reserved address
range. Once you launch VPCs from this CloudN, the other VMs on the
subnet should be able to run SSH, RDP, and SCP (file copy) to any
instances in VPCs using the instance private IP address seamlessly,
without any bastion station or landing VPC. Refer to How It Works
section for more explanations.

If you install CloudN on a NAT subnet, make sure both Ethernet
interfaces are changed to NAT mode (By default, CloudN is pre-configured
and shipped with both Network Adapters in Bridged mode). Right click on
the CloudN VM, click Settings. Change both Network Adapters to NAT mode,
as shown below for VMware Workstation:

|image23|

Test Drive on MAC with vmware Fusion
------------------------------------

After downloading the zip file and decompressing it, copy the folder to
a location, where your Mac can access it. Perform the following steps to
install CloudN.

Step 1: From the VMware Fusion menu bar, select File > Import.

|image24|

Step 2: The Import Library window appears, along with a dialog box for
browsing to the location of OVF file.

|image25|

Step 3: Browse to the .ovf file and click open

|image26|

Step 4: Type the name for the imported virtual machine in the Save
As text box and indicate where to save it.

|image27|

Step 5: After the import is complete, the virtual machine appears in the
virtual machine library. Click on “Start Up” to start the CloudN virtual
machine.

|image28|

Step 6: Change Network Adapters to NAT mode

Select the VM, click Settings, click Network Adapter, select “\ **Share
with my Mac**\ ”, as shown below

|image29|

Test Drive on PC with VMware Workstation
-----------------------------------------

Click on File -> Open, as shown below.

|image30|

Then open the desired VM.

|image31|

Highlight the VM, right click, select Settings, click on Network
Adapter, change both Network Adapter to NAT mode as shown below.

|image32|

Test Drive on VirtualBox
------------------------

CloudN works on VirtualBox only in a bridged mode.

After downloading and extracting the zip file, copy the folder to a
location where you can import the virtual machine. For installation,
follow the steps below.

Step 1: From the VirtualBox menu bar, select File > Import Appliance

|image33|

Step 2: Navigate to the CloudN ovf file and click “Next”

|image34|

Step 3: In the next screen, click on “Import” to start the import
process and wait for it to finish

|image35|

Step 4: CloudN virtual machine installation is finished and it can be
launched by selecting it and clicking on the “Start” button.

|image36|

Configure Network Interfaces
----------------------------

CloudN network interfaces should be configured in bridge mode as the NAT
mode makes it impossible for guests to communicate with each other. In
addition to this, both interfaces should be allowed to be in promiscuous
mode. Execute the steps below to satisfy these requirements.

Step 1: Select the CloudN VM and click on “Settings”

|image37|

Step 2: In the settings window, select “Network” and select "Bridged
Adapter" in the drop down list for the "Attached to" field.

|image38|

Step 3: Click on “Advanced” to reveal advanced configuration options and
select “Allow All” in the drop down list for “Promiscuous Mode” field.
Repeat this procedure for “Adapter 2” as well.

|image39|

Booting Up and Initial Configuration
====================================

CloudN supports browser based GUI Interface and REST APIs.

After the virtual machine boots up, you must first login into the
machine while still in hypervisor console.

**CloudN Login User Name: admin**

**CloudN Login Password: Aviatrix123#**

After this initial login, if you see the screen the screen below.

|image40|

Follow the instruction to type “help” at the prompt.

|image41|

Follow the steps to go through the boot up process. You can type “help”
at any time to review the steps. Type “?” to view all available
commands. For each command, type “?” to view syntax and parameters.

Step 1: Setup Interface Address
-------------------------------

CloudN works by dividing the subnet where CloudN is deployed into
sub-segment where each sub-segment becomes the VPC/VNet CIDR in the
cloud. We recommend you deploy CloudN in its own subnet to maximize the
number of VPC/VNets you can create.

There are two ways to give CloudN its IP adddress: auto-generate by
CloudN itself or statically assign one.

Statically assign CloudN IP address
------------------------------------

You can statically assign an IP address to CloudN. Choose this approach
if you use CloudN to connect to an existing VPC. In the use case where
CloudN does not create a VPC and build encrypted tunnel, CloudN does not
need to be deployed on a separate subnet.

Command: setup\_interface\_static\_address

Syntax: setup\_interface\_static\_address [static\_ip\_address]
[net\_mask] [default\_gateway\_ip\_address]
[primary\_dns\_server\_ip\_address]
[secondary\_dns\_server\_ip\_address] [proxy {true\|false}]

Below is an example where there is no proxy server. In such case, CloudN
will configure the network interfaces, test Internet connectivity and
download the latest Aviatrix software.

|image42|

Proxy Configuration
--------------------

If there is proxy server for Internet access, you must setup proxy
configuration on CloudN to pass traffic to proxy correctly. Following is
the command

command: setup\_network\_proxy

syntax: setup\_network\_proxy <action> <--http\_proxy> <--https\_proxy>

where action is “test” or “save”.

Example:

::

  setup\_network\_proxy test --http\_proxy http://10.30.0.3:3128
  --https\_proxy http://10.30.0.3:3128

  setup\_network\_proxy save --http\_proxy http://10.30.0.3:3128
  --https\_proxy http://10.30.0.3:3128

Note after proxy configuration is saved, CloudN VM will reboot to have
the proxy take effect.

Auto-generate CloudN interface IP address
-----------------------------------------

All you need to do here is to provide information related to the subnet
where CloudN is deployed. CloudN scans the subnet and find an IP address
that is close to the default gateway (for example, if the default
gateway is 10.10.0.1, CloudN will try 10.10.0.2) and is available,
CloudN will then assin itself this IP addres and CloudN software will be
downloaded if configuration is successfully.

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

Step 2: Display Interface Address
---------------------------------

|image45|

Now you can use the cloudN IP address as URL to access CloudN Manager
that manages CloudN.

Note: The hypervisor console has only limited CLI for initial booting up
purposes. Once Aviatrix software is downloaded, full commands are
installed.

User should use the GUI to access CloudN Console.

Troubleshooting
---------------

If there is any error messages during installation, it is usually due to
lack of Internet connectivity, incorrect DNS server IP address or
unopened firewall ports. Type “?” to see all the commands that help you
troubleshoot.

Use command “\ ***ping***\ ” and “\ ***traceroute***\ ” to check out
Internet connectivity. Check your DNS server setting, consult your
network and server admin to determine the cause of routing failure.

After connectivity issue is resolved, use command
“download\_cloudn\_software” to continue installation and finish. Or you
can again type in command setup\_interface\_address.

Use a Browser to Access CloudN
------------------------------

CloudN has a built in CloudN Console that let you run provisioning from
a browser.

Once IP addressed setup is complete, you can use any browser, type
https://<IP address of CloudN> and see a Login page.

|image46|

Login with:

User Name: **admin**

Password: **private IP address of the VM**

After login, go through the initial setup process.

For the first time user and initial setup, follow Onboarding to go
through the initial set up and launch your first VPC/VNet.

Onboarding
==========

After you login to the browser console, click Onboarding to go through a
few steps of initial setup and start creating the first VPC/VNet.

Once you login, click on Help for Frequently Asked Questions (FAQs). All
features have descriptions and should be self-explanatory.

For support issues, send email to support@aviatrix.com.

For feedback and feature request, click Make a wish at the bottom of
each page.

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
