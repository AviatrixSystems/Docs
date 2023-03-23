

=========================================================
Setup API Access to Palo Alto Networks VM-Series 
=========================================================

Follow the following steps to enable Palo Alto Networks API programming.

Enabling Ping
~~~~~~~~~~~~~~~~~~

Make sure the Palo Alto Networks management interface has ping enabled and the instance's security group has ICMP policy open to the Aviatrix Controller's public IP address.

At the Palo Alto VM-Series console, 

1. Click **Device**.
2. Click **Interfaces**.
3. Click **Management**.
4. Make sure the setup is as following screenshot. 

|pan_ping|

Creating API Administrator Role Profile
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 a. Create a new role profile and name it Aviatrix-API-Role: Go to Device > Admin Roles > **+Add**.
 #. Click **XML/API**.
 #. Click **Report**, **Configuration**, **Operation Requests** and **Commit**.
 #. Click **Commit**.

|pan_role_profile|


Adding an Administrator for API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the VM-Series Console, go to Device > Administrators > **+Add**, to add an administrator for Role-Based access as
shown below. Use the profile created in previous step. Remember to click **Commit**.

|pan_admin|


Configuring on the Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Managing VM-Series Directly
----------------------------------

Login to the Aviatrix Controller, go to Firewall Network > Vendor Integration > Firewall. Configure the following parameters and click **Save**.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
FireNet VPC/VNet ID                                  The FireNet VPC/VNet ID for the Firewall Network deployment.
Firewall instance ID                            The firewall virtual machine (EC2/GCE) instance ID. Aviatrix Controller monitors the health of this instance and determines fail over when it becomes unreachable.
Firewall Name (Optional)                        A name to remember.
Firewall Vendor Type                            Select PAN
Firewall Login User Name                        firewall login name for API calls from the Controller. For example, admin-api, as shown in the screen shot.
Firewall Login Password                         firewall login password for API calls.
Firewall Management IP Address                  The public IP address of the firewall management interface for API calls from the Aviatrix Controller
Firewall Virtual Router name (Optional)         Specify the firewall virtual Router name you wish the Controller to program. If left unspecified, the Controller programs the firewall's default router.
==========================================      ==========

.. Note::
    - The controller only supports one virtual router.  If Firewall Virtual Router name is not specified, the controller takes the first virtual router in the list.

Managing VM-Series by Panorama
------------------------------------

If Panorama is used to manage the VM-Series, any dynamic route updates initiated by Aviatrix Controller are sent to Panorama.

Before you integrate Panorama with the Aviatrix Controller, you need to first launch and configure Panorama. The steps are as follows:

Launching Panorama
^^^^^^^^^^^^^^^^^^^^^^

Launch Panorama from the AWS portal and SSH in to set the UI password, which is the same as the PAN firewall.

Change the Panorama management interface security group to allow port 3978. This is the port used by Panorama and the firewall to exchange information.

Install a license in Panorama. Without the correct license, it won't work.

Upgrading Panorama 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Panorama MUST be on the same or higher software version as its managed firewalls.

Currently (May, 2020) a newly launched firewall instance is on version 9.0.6 or 9.1.2.  If the Panorama instance version is on 8.1.x, upgrade it to version 9.0.6 or higher version by following the instructions below.

Go to Panorama > Dynamic Updates, click **Check Now**, select the latest version in Applications and Threats, download and install.

Go to Panorama > Software, select the desired version, download and install. After installation, Panorama will reboot. This will take a few minutes.

Creating Templates and Template Stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Template and template stack are used to configure Network properties, such as interfaces, zones, and route tables. This is the one that we need to monitor and update through API.

 1. **Create Template**
      You should create a template for each firewall group: One for the FireNet primary Gateway and one for FireNet backup Gateway.

 #. **Configure Template**
      Add interfaces (ethernet1/1, ethernet1/2), zones (LAN, WAN), and Virtual Routers (route tables). Do not name the route table as "default" since this may conflict with the firewall's default route table. Please refer to the step 7 and 10 of  https://docs.aviatrix.com/HowTos/config_paloaltoVM.html

 #. **Create Template Stack**
      A Template stack is a bundle to bound templates with managed devices. When creating, select template(s) and devices. Create one template stack for the primary FireNet Gateway, another for backup FireNet Gateway. Remember the template stack name. Commit and push.

Creating Device Group
^^^^^^^^^^^^^^^^^^^^^^^^

A Device Group is used to manage all the firewall policies.

 1. **Add Device Group**
      Go to Panorama > Device Groups, click **Add** to create a new device group for both FireNet GWs. Add managed VMs to the device group. Remember the device group name, for example "west2-firenet-primary". You may create two device groups as well if you want to separately edit for each FireNet GW.

The following 3 # steps, please refer to the step 8 and 9 of https://docs.aviatrix.com/HowTos/config_paloaltoVM.html.
 #. **Add Example Policy** (Optional if internet traffic is needed) 
      Add "Outbound" policy to the just created device group.

 #. **Add Egress Policy** (Optional)
      If you plan to deploy Egress inspection, add source-nat and security outbound rule policies

 #. **Commit The Change**
       Commit and push.
  
After the above steps, once VM-Series instances are added to Panorama, all configuration should be done through the Panorama console.

Creating Admin role and User
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is the same as for individually managed VM-Series. Create an admin role with XML API permission and create an admin user with the admin role.

After you have set up and configured your Panorama, go to the Aviatrix Controller > Firewall Network > Vendor Integration > Firewall Manager (Panorama) and configure the following.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
FireNet VPC/VNet ID                                  The FireNet VPC/VNet ID for the Firewall Network deployment.
FireNet Gateway                                 The FireNet Gateway name.
Vendor Type                                     Select Palo Alto Panorama.
Management IP Address                           The public IP address of the Panorama instance.
Login User Name                                 Panorama login name for API calls from the Controller. For example, admin-api, as shown in the screen shot.
Login Password                                  Panorama login password for API calls.
Template Name                                   Panorama template for each FireNet Gateway. (If FireNet Gateway HA is configured, there should be two templates)
Template Stack Name                             Panorama template stack for each FireNet Gateway.((If FireNet Gateway HA is configured, there should be two template stacks)
Router name (Optional)                          Specify the firewall virtual Router name you wish the Controller to program. If left unspecified, the Controller programs the Panorama template's first router.
==========================================      ==========

.. Note::

    - The Panorama needs to be configured separately for the primary and backup FireNet Gateways.  

    - Panorama can be configured even when there is no VM-Series associated with a FireNet Gateway. However in such case, the egress subnet is not decided, therefore the egress route cannot be added. Once the first VM-Series instance is launched and is in sync with Panorama, the egress route will be automatically added.

    - If any VM-Series for a FireNet Gateway is already managed by the Controller, you need to remove that configuration before configuring Panorama. See the migration instructions in the next section. 

    - After Panorama is setup, any additional VM-Series associated with same gateway will be controlled by Panorama and no further configuration on the VM-Series is needed.

    - When Panorama is configured, the associated  will show the vendor as "Palo Alto Panorama." Clicking **Show** will use the same access account and password to access firewall and retrieve route information. To enable this, you need to configure admin role and user (same name and password as configured for Panorama itself) in the template in Panorama.

    - The controller only supports one virtual router.  If Router name is not specified, the controller takes the first virtual router in the list.

Migrating from Individually VM to Panorama
#################################################################

Assuming you have existing individually managed VM-Series by the Aviatrix Controller and have prepared your Panorama, follow the instructions below to migrate individually VM to Panorama.

Removing the Firewall Integration as PAN 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If any firewall for a FireNet Gateway is already integrated with the Controller with PAN as the Vendor type, you need to remove that configuration. 

To do so, go to Controller > Firewall Network > Vendor Integration > Firewall, select the Transit VPC/VNet ID, Firewall Instance ID. For the Firewall Vendor Type, select **Generic**. This effectively removes the Controller integration. 

Removing Firewall Configuration (if this is a new VM, skip this step)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

From your firewall console, remove the interfaces, zone, virtual router, policies, api admin role and api administrator.

Adding Firewall to Panorama
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Refer to `How to Add a Locally Managed Firewall to Panorama Management <https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000CloRCAS>`_.

  1. Add the firewall to the Panorama-managed devices list. Log into Panorama, select Panorama > Managed Devices and click **Add**. Enter the serial number of the firewall and click **OK**. Commit. For the Commit Type, select Panorama and click **Commit** again.
  2. Set up a connection from the firewall to Panorama. Log in to the firewall, select Device > Setup, and edit the Panorama Settings. In the Panorama Servers fields, enter the IP addresses of the Panorama management server. Click **OK** and **Commit**.
  3.  Make any necessary configuration changes and commit your changes to the VMs. Click **Commit** and for the Commit Type select **Device Group**. Select **Merge with Device Candidate Config**, mark the **Include Device and Network Templates** checkbox, and click **Commit**. 

  4.  Go back to Panorama > Managed Devices > Summary and mark the checkbox for the device which should show "Connected."
  
 
Port 3978 also needs to be allowed on the firewall side. After 4.7, newly launched firewalls through the AVX Controller will handle this, but for existing firewalls, the user need to do it manually.


Adding the Device into the Desired Template Stack and Device Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Panorama > Template, select the desired template stack, and check the firewall from the device list.

Go to Panorama > Device Group, select the desired group and check the firewall from the device list.

Commit and push.

Integrating Panorama with the Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to the Aviatrix Controller > Firewall Network >Vendor Integration > Firewall Manager (Panorama), fill out all the required information and save. After this step, the Panorama and PAN firewalls are attached to the Controller.


API calls
~~~~~~~~~~~~~~~~

The integrated functions by the Controller are the following:

 - The Controller monitors the health of Palo Alto Network software by using the VM-series API and performs switch over based on the API return status.
 - The Controller dynamically programs Palo Alto Network route tables for any new propagated new routes discovered both from new Spoke VPC/VNets and new on-premise routes.

Examples of Palo Alto Networks API used:

1. get key:

::

    https://54.149.55.193/api/?password=password&type=keygen&user=apiadmin

2. get route tables:

::

    https://54.149.55.193/api/?type=config&xpath=/config/devices/entry[@name='localhost.localdomain']/network/virtual-router/entry[@name='default']&key=LUFRPT1YQk1SUlpYT2xIT3dqMUFmMlBEaVgxbUxwTmc9RFRlWncrbURXZVpXZUUyMFE3V3ZWVXlaSlFvdkluT2F4dzMzWUZpMGtZaz0=&action=get

3. show interfaces:

::

    https://54.149.55.193/api/?key=LUFRPT1BbkNIbXJZNlVBOVdRMXNMSUNVRis1VWRHaTA9RFRlWncrbURXZVpXZUUyMFE3V3ZWU2ZEZzdCNW8yUEpwU3Q1NXEzeDBnST0=&type=op&cmd=<show><interface>ethernet1/2</interface></show>

4. add route:

::

    https://13.58.10.51/api/?type=config&xpath=/config/devices/entry[@name='localhost.localdomain']/network/virtual-router/entry[@name='default']/routing-table/ip/static-route/entry[@name='test2']&key=LUFRPT1BbkNIbXJZNlVBOVdRMXNMSUNVRis1VWRHaTA9RFRlWncrbURXZVpXZUUyMFE3V3ZWU2ZEZzdCNW8yUEpwU3Q1NXEzeDBnST0=&action=set&element=<nexthop><ip-address>10.201.1.1</ip-address></nexthop><bfd><profile>None</profile></bfd><path-monitor><enable>no</enable><failure-condition>any</failure-condition><hold-time>2</hold-time></path-monitor><metric>10</metric><destination>10.40.0.0/24</destination><route-table><unicast/></route-table>

5. delete route:

::

    https://13.58.10.51/api/?type=config&xpath=/config/devices/entry[@name='localhost.localdomain']/network/virtual-router/entry[@name='default']/routing-table/ip/static-route/entry[@name='test2']&key=LUFRPT1BbkNIbXJZNlVBOVdRMXNMSUNVRis1VWRHaTA9RFRlWncrbURXZVpXZUUyMFE3V3ZWU2ZEZzdCNW8yUEpwU3Q1NXEzeDBnST0=&action=delete

6. commit

::

    https://13.58.10.51/api/?type=commit&key=LUFRPT1BbkNIbXJZNlVBOVdRMXNMSUNVRis1VWRHaTA9RFRlWncrbURXZVpXZUUyMFE3V3ZWU2ZEZzdCNW8yUEpwU3Q1NXEzeDBnST0=&cmd=<commit></commit>

.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |pan_admin| image:: transit_dmz_vendors_media/pan_admin.png
   :scale: 30%

.. |download_pem_file| image:: transit_dmz_vendors_media/download_pem_file.png
   :scale: 30%

.. |pan_role_profile| image:: transit_dmz_vendors_media/pan_role_profile.png
   :scale: 30%

.. |pan_ping| image:: transit_dmz_vendors_media/pan_ping.png
   :scale: 30%

.. disqus::
