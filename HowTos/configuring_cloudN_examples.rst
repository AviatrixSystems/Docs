.. meta::
   :description: Configuring CloudN using ESXi 5.0 or later
   :keywords: configure cloudN, cloudN, configure cloudN ESXi, aviatrix


======================================================
Configuring CloudN using ESXi 5.0 or later (EST mode)
======================================================

This document describes the step-by-step procedures to configure CloudN
and Ubuntu server that will connect to external devices in access mode.
CloudN will use one physical NIC and Ubuntu will use another physical
NIC on the host. Both physical may connect to the same or different
router/firewall/switch in access mode. In this example, all ESXi host
does not see any VLAN tags nor handle any VLAN tagging. All VLAN tagging
is done by the external physical switch and ESXi virtual switch is not
aware about it.

|Drawing1|

First, we will download Aviatrix CloudN zip file and extract it to a
local folder on your computer. The folder will include a CloudN OVF
image that will be used to instantiate Aviatrix CloudN.

**Step 1: Creating the Networks**

1.1 From the vSphere Client, select the host and click on Configuration
   tab. In the Hardware section, select Networking > Add Networking tab
   to create a vSwitch with a single vmnic port assigned to it.

|image16|

|image18|

1.2 Select the vmnic that you plan to use to connect the CloudN from the
ESXi host to external network devices. In our example here, we use
vmnic1 to reach our firewall device that has an integrated switch
ports. Click Next.

|image20|

1.3 Provide a Network Label “Net-10.152.0.0”. Note that we are using the
default None (0) in the VLAN ID field. This implies that ESXi will not
handle any VLAN tagging. Click Next and Finish. You may use a different
Network Label of your choice based on your network design.

|image22|
|image24|

1.4 Aviatrix CloudN has
two network interfaces which are required to be in the same network. We
will need to enable the promiscuous mode on the network adapter used by
CloudN. Select the vSwitch created in the previous step and select the
Properties.

|image26|

1.5 Select the port “Net-10.152.0.0” and click Edit.

|image28|

1.6 Click on Security tab. Check the box and select Accept for both
Promiscuous Mode and Forged Transmits. Click OK to apply the changes.

|image30|

1.7 Repeat Step 1.1 through 1.5 to create another vSwitch for Ubuntu but
use a different physical adapter. In our example here, we will use
vmnic3 for this Ubuntu server.

|image32|
|image34|

Now we have created two Virtual Machine Port Group that will utilize two
physical adapters (vmnic2 and vmnic3 in our example here).

**Step 2: Creating Aviatrix CloudN Virtual Machine**

2.1 At the vSphere Client, click on Flie > Deploy OVF Template.

|image36|

2.2 Browse to the CloudN OVF image that is previously extracted. CloudN
OVF image usually has a naming convention of “CloudN-ovf-\ *date*\ ”
where *date* is the time when the image was built. Click Next to
continue through the rest of the installation.

|image38|

|image40|

2.3 Provide the Name of your CloudN, select the Disk Format.

|image42|

|image44|

2.4 At the Network Mapping section, choose Net-10.152.0.0 and click Next
and Finish.

|image46|

|image48|

2.5 vSphere Client will start creating the CloudN VM. Once it complete,
power it on to start the deploy the CloudN.

|image50|

**Step 3: Initializing CloudN**

3.1 Click on CloudN VM “Sandbox3-CloudN” and select the Console tab.
Once the boot up process completes, login to CloudN with the “admin” and
password “Aviatrix123#”.

|image52|

3.2 Assign ip address to CloudN interface. CloudN supports manually
assigned static ip address and auto generated ip address. For more
details about CloudN initial configuration, please refer to `Aviatrix
Hybrid Controller 2.0 Getting Started
Guide <https://s3-us-west-2.amazonaws.com/aviatrix-download/CloudN+Startup+Guide.pdf>`__.
In this example, we will manually configure the CloudN interface ip
address to 10.152.0.2/16.

Command:

setup\_interface\_static\_address 10.152.0.2 255.255.0.0 10.152.0.1
8.8.8.8 8.8.4.4

Syntax:

setup\_interface\_static\_address [static\_ip\_address] [net\_mask]
[default\_gateway\_ip\_address] [primary\_dns\_server\_ip\_address]
[secondary\_dns\_server\_ip\_address]

CloudN will automatically download the latest official CloudN software
from Aviatrix. When the console prompt shows “Interface and network have
been successfully configured, software is ready”, you may access the
Aviatrix Cloud Controller Web GUI to complete the initialization.

|image54|

|image56|

3.3 Connect a PC that has the connectivity to 10.152.0.2. Launch a
browser and enter https://10.152.0.2. There maybe a warning message that
says “Your connection is not private”. Click Advanced and Proceed to
10.152.0.2. Login to Aviatrix CloudN Web GUI with Username “admin” and
password “10.152.0.2”. Note that the initial password upon CloudN
installation is the private IP address of the instance.

|image58|

3.4 Enter the email address to be used for admin and change the default
password for security reasons. When you see the Onboarding page, your
CloudN installation and initialization has complete and ready for use.

|image60|

|image62|

**Step 4: Creating Ubuntu VM**

4.1 The following screen shots are steps to create a Ubuntu VM on a
separate Net-10.162.0.0 with its interface ip address as 10.162.0.2/16.
In this example, we assume that you have already uploaded an Ubuntu ISO
image to the datastore of the ESXi host.

|image64|

|image66|

|image68|

|image70|

|image72|

|image74|

|image76|

|image78|

|image80|

4.2 After the Ubuntu VM is created, power it on and click on the Console
tab to proceed with the typical Ubuntu installation process. In this
example, we will configure Ubuntu interface to 10.162.0.2/16 with a
default gateway of 10.162.0.1.

|image82|

Once the Ubuntu installation completes, you may to ping to your gateway
and Aviatrix CloudN ip address 10.152.0.2 with the assumption that you
have preconfigure your network routing between the two ports from the
ESXi host to your network device.

**Step 5: Validating the connectivity between CloudN and Ubuntu**

5.1 Ssh login to Ubuntu that you created in Step 4 with the password.

.. code:: 

	cksoon:~ cksoon$ ssh ubuntu@10.162.0.2

	The authenticity of host '10.162.0.2 (10.162.0.2)' can't be established.

	ECDSA key fingerprint is
	SHA256:jnphHrRH6wHfcJh1WGGHTvOWKwa7S1bE3I0PBt+yK3I.

	Are you sure you want to continue connecting (yes/no)? yes

	Warning: Permanently added '10.162.0.2' (ECDSA) to the list of known
	hosts.

	ubuntu@10.162.0.2's password:

	Welcome to Ubuntu 14.04.2 LTS (GNU/Linux 3.16.0-30-generic x86\_64)

	\* Documentation: https://help.ubuntu.com/

	System information as of Thu Oct 27 10:50:35 PDT 2016

	System load: 0.01 Processes: 79

	Usage of /: 8.5% of 14.38GB Users logged in: 0

	Memory usage: 6% IP address for eth0: 10.162.0.2

	Swap usage: 0%

	Graph this data and manage this system at:

	https://landscape.canonical.com/

	174 packages can be updated.

	95 updates are security updates.

	Last login: Thu Oct 27 10:50:35 2016

	ubuntu@ubuntu:~$ ping 10.152.0.2

	PING 10.152.0.2 (10.152.0.2) 56(84) bytes of data.

	64 bytes from 10.152.0.2: icmp\_seq=1 ttl=64 time=1.76 ms

	64 bytes from 10.152.0.2: icmp\_seq=2 ttl=64 time=1.73 ms

	64 bytes from 10.152.0.2: icmp\_seq=3 ttl=64 time=1.72 ms

	^C

	--- 10.152.0.2 ping statistics ---

	3 packets transmitted, 3 received, 0% packet loss, time 2003ms

	rtt min/avg/max/mdev = 1.727/1.742/1.762/0.037 ms

	ubuntu@ubuntu:~$


.. |Drawing1| image:: Configuring_CloudN_Examples_media/Drawing1.png
   :width: 6.50000in
   :height: 4.0in
.. |image16| image:: Configuring_CloudN_Examples_media/image016.png
   :width: 6.50000in
   :height: 4.0000in
   :scale: 125%
.. |image18| image:: Configuring_CloudN_Examples_media/image018.png
   :width: 6.50000in
   :height: 4.25278in
.. |image20| image:: Configuring_CloudN_Examples_media/image020.png
   :width: 6.48611in
   :height: 4.50000in
.. |image22| image:: Configuring_CloudN_Examples_media/image022.png
   :width: 6.50000in
   :height: 4.51389in
.. |image24| image:: Configuring_CloudN_Examples_media/image024.png
   :width: 6.48611in
   :height: 4.29167in
.. |image26| image:: Configuring_CloudN_Examples_media/image026.png
   :width: 6.48611in
   :height: 4.88889in
.. |image28| image:: Configuring_CloudN_Examples_media/image028.png
   :width: 6.48611in
   :height: 4.12778in
.. |image30| image:: Configuring_CloudN_Examples_media/image030.png
   :width: 6.48611in
   :height: 4.00278in
.. |image32| image:: Configuring_CloudN_Examples_media/image032.png
   :width: 6.50000in
   :height: 4.56944in
.. |image34| image:: Configuring_CloudN_Examples_media/image034.png
   :width: 6.48611in
   :height: 4.25278in
.. |image36| image:: Configuring_CloudN_Examples_media/image036.png
   :width: 6.50000in
   :height: 4.37778in
.. |image38| image:: Configuring_CloudN_Examples_media/image038.png
   :width: 6.50000in
   :height: 4.37778in
.. |image40| image:: Configuring_CloudN_Examples_media/image040.png
   :width: 6.50000in
   :height: 4.32222in
.. |image42| image:: Configuring_CloudN_Examples_media/image042.png
   :width: 6.50000in
   :height: 4.25278in
.. |image44| image:: Configuring_CloudN_Examples_media/image044.png
   :width: 6.50000in
   :height: 4.37778in
.. |image46| image:: Configuring_CloudN_Examples_media/image046.png
   :width: 6.50000in
   :height: 4.25278in
.. |image48| image:: Configuring_CloudN_Examples_media/image048.png
   :width: 6.50000in
   :height: 4.0in
.. |image50| image:: Configuring_CloudN_Examples_media/image050.png
   :width: 6.50000in
   :height: 4.25278in
.. |image52| image:: Configuring_CloudN_Examples_media/image052.png
   :width: 6.50000in
   :height: 4.25278in
.. |image54| image:: Configuring_CloudN_Examples_media/image054.png
   :width: 6.50000in
   :height: 4.25278in
.. |image56| image:: Configuring_CloudN_Examples_media/image056.png
   :width: 6.50000in
   :height: 4.25278in
.. |image58| image:: Configuring_CloudN_Examples_media/image058.png
   :width: 6.50000in
   :height: 4.25278in
.. |image60| image:: Configuring_CloudN_Examples_media/image060.png
   :width: 6.50000in
   :height: 4.25278in
.. |image62| image:: Configuring_CloudN_Examples_media/image062.png
   :width: 6.50000in
   :height: 4.25278in
.. |image64| image:: Configuring_CloudN_Examples_media/image064.png
   :width: 6.50000in
   :height: 4.25278in
.. |image66| image:: Configuring_CloudN_Examples_media/image066.png
   :width: 6.50000in
   :height: 4.25278in
.. |image68| image:: Configuring_CloudN_Examples_media/image068.png
   :width: 6.50000in
   :height: 4.25278in
.. |image70| image:: Configuring_CloudN_Examples_media/image070.png
   :width: 6.50000in
   :height: 4.25278in
.. |image72| image:: Configuring_CloudN_Examples_media/image072.png
   :width: 6.50000in
   :height: 4.25278in
.. |image74| image:: Configuring_CloudN_Examples_media/image074.png
   :width: 6.50000in
   :height: 4.25278in
.. |image76| image:: Configuring_CloudN_Examples_media/image076.png
   :width: 6.50000in
   :height: 4.25278in
.. |image78| image:: Configuring_CloudN_Examples_media/image078.png
   :width: 6.50000in
   :height: 4.25278in
.. |image80| image:: Configuring_CloudN_Examples_media/image080.png
   :width: 6.50000in
   :height: 4.25278in
.. |image82| image:: Configuring_CloudN_Examples_media/image082.png
   :width: 6.50000in
   :height: 4.25278in

   
.. disqus::   