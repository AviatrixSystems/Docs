.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall, Firewall Network, FireNet


=========================================================
Setup API Access to Palo Alto Networks VM-Series 
=========================================================

Follow the following steps to enable Palo Alto Networks API programming.

1. Enable Ping
~~~~~~~~~~~~~~~~~~

Make sure Palo Alto Networks management interface has ping enabled and the instance's security group has ICMP policy open to the Aviatrix Controller's public IP address.

At the Palo Alto VM-Series console, 

 a. Click Device
 #. Click Interfaces
 #. Click Management
 #. Make sure the setup is as following screenshot. 

|pan_ping|

2. Create API Administrator Role Profile
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

 a. Create a new role profile and name it Aviatrix-API-Role: Go to Device -> Admin Roles -> +Add
 #. Click XML/REST API
 #. Click Report, Configuration, Operation Requests and Commit
 #. Click Commit.

|pan_role_profile|


3. Add an Administrator for API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the VM-Series Console, go to Device -> Administrators -> +Add, to add an administrator for Role Based access as
shown below. Use the profile created in previous step. Remember to click Commit.

|pan_admin|


5. Configure on the Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5.1 Managing VM-Series Directly
----------------------------------

Login to the Aviatrix Controller, go to Firewall Network -> Vendor Integration -> Firewall. Configure the following parameters and click Save.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
FireNet VPC ID                                  The FireNet VPC ID for the Firewall Network deployment.
Firewall instance ID                            The firewall EC2 instance ID. Aviatrix Controller monitors the health of this instance and determines fail over when it becomes unreachable.
Firewall Name (Optional)                        A name to remember.
Firewall Vendor Type                            Select PAN
Firewall Login User Name                        firewall login name for API calls from the Controller. For example, admin-api, as shown in the screen shot.
Firewall Login Password                         firewall login password for API calls.
Firewall Management IP Address                  The public IP address of the firewall management interface for API calls from the Aviatrix Controller
Firewall Virtual Router name (Optional)         Specify the firewall virtual Router name you wish the Controller to program. If left unspecified, the Controller programs the firewall's default router.
==========================================      ==========

5.2 Managing VM-Series by Panorama
------------------------------------

If Panorama is used to manage the VM-Series, any dynamic route updates initiated by Aviatrix Controller are sent to Panorama.

Before you integrate Panorama with Aviatrix Controller, you need to first launch and configure Panorama. The steps are as follows:

a. Launch Panorama
^^^^^^^^^^^^^^^^^^^^^^

Launch Panorama from AWS portal, ssh in to set UI password, same as PAN firewall.

Change Panorama management interface security group, to allow 3978 port. This is the port used by Panorama and firewall to exchange information.

Install license in Panorama, without correct license, it won't work.

b. Upgrade Panorama 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Panorama must be on the same software version as its managed firewalls.

Current a newly launched firewall instance is on version 9.0.1, but Panorama instance version is on 8.1.2. So once you have launched 
a Panorama instance, upgrade it to version 9.0.0+ by following the instructions below..

Go to Panorama --> Dynamic Updates, click "Check Now", select latest version in "Applications and Threats", downland and install.

Go to Panorama --> Software, select desired version, download and install. After install, Panorama will reboot. This will take a few minutes.

c. Create Templates and Template Stack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Template and template stack are used to configure Network properties, such as interfaces, zones, route tables. This is the one that we need to monitor and update through API.

 1. **Create Template**
      You should create template for each firewall group:  create one for FireNet primary gateway, one for FireNet backup gateway.

 #. **Configure Template**
      Add interfaces (ethernet1/1, ethernet1/2), zones (LAN, WAN), route table. Do not name route table as "default" since this may conflict with firewall its own default route table.

 #. **Create Template Stack**
      Template stack is a bundle to bound template with managed devices. When creating, select templates (can be multiple) and devices. For example,  create one template stack for each firewall group, one for primary FireNet gateway, one for backup FireNet gateway. Remember template stack name. Commit and push.

d. Create Device Group
^^^^^^^^^^^^^^^^^^^^^^^^

Device Group is used to manage all the firewall policies.

 1. **Add Device Group**
      Go to Panorama --> Device Groups, click "Add" to create a new device group. Add the template created from previous step. Remember the device group name, for example "west2-firenet-primary".

 #. **Add Example Policy**
      Add "allow-all" policy to the just created device group.

 #. **Add Egress Policy** (Optional)
      If you plan to deploy Egress inspection, add egress-nat policy.

 #. **Commit The Change**
       Commit and push.

After the above steps, VM-Series instances are managed by Panorama. All configuration should be done through the Panorama console.

e. Create admin role and user
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This is the same as for individually managed VM-Series. Create admin role with XML API permission, create admin user with the admin role.

After you have setup and configured your Panorama, go to Aviatrix Controller -> Firewall Network -> Vendor Integration -> Firewall Manager (Panorama) and configure the following.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
FireNet VPC ID                                  The FireNet VPC ID for the Firewall Network deployment.
FireNet Gateway                                 The FireNet gateway name.
Vendor Type                                     Select Palo Alto Panorama.
Management IP Address                           The public IP address of the Panorama instance.
Login User Name                                 Panorama login name for API calls from the Controller. For example, admin-api, as shown in the screen shot.
Login Password                                  Panorama login password for API calls.
Template Name                                   Panorama template for each FireNet gateway. (If FireNet gateway HA is configured, there should be two templates)
Template Stack Name                             Panorama template stack for each FireNet gateway.((If FireNet gateway HA is configured, there should be two template stacks)
Router name (Optional)                          Specify the firewall virtual Router name you wish the Controller to program. If left unspecified, the Controller programs the Panorama template's first router.
==========================================      ==========

.. Note::

    - Panorama manager need to be configured separately for primary and backup FireNet gateway, because each is associated with a different template name.  

    - Panorama can be configured even when there is no VM-Series associated with a FireNet gateway. However in such case, the egress subnet is not decided, therefore egress route cannot be added. Once the first VM-Series instance is launched and is in sync with Panorama, the egress route will be automatically added.

    - If any VM-Series for a FireNet gateway is already managed by the Controller, you need to remove that configuration, before configure Panorama. See the migration instruction in the next section. 

    - After Panorama is setup, any additional VM-Series associated with same gateway will be controlled by Panorama, no further configuration on the VM-Series is needed.

    - When all VM-Series are disassociated from a FireNet gateway, Panorama still maintains the configuration, unless user removes the configuration from Panorama.

    - When Panorama is configured, the associated  will show vendor as "Palo Alto Panorama". Click "Show" will use the same access account and password to access firewall and retrieve route information.  To enable this, you need to configure admin role and user (same name and password as configured for Panorama itself) in the template in Panorama.

Migrating from individually managed VM-Series to Panorama
#################################################################

Assuming you have existing individually managed VM-Series by the Aviatrix Controller and have prepared your Panorama, follow the instructions below to migrate individually managed firewall (or VM-Series) to be managed by Panorama.. 

a. Remove firewall integration as PAN
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If any firewall for a FireNet gateway is already integrated with Controller with PAN as the Vendor typpe, you need to remove that configuration
from Controller->Firewall Network->Vendor Integration->Firewall, before configure Panorama from Vendor Integration->Firewall Manager(Panorama).

b. Remove firewall configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
From your firewall console, remove interfaces, zone, virtual router, polices, api admin role and api administrator.

c. Add Firewall to Managed Devices
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to firewall, in dashboard, find the Serial #

Go to Panorama --> Managed Devices --> Summary, click "Add", paste the firewall's Serial # here, save and commit.

d. Configure Firewall
^^^^^^^^^^^^^^^^^^^^^^^^

Port 3978 also need to be allowed on firewall side. After 4.7, newly launched firewall through AVX controller will handle this, but for existing firewalls, user need to do it by himself.

Login to Firewall, go to Device --> Setup --> Management, edit "Panorama Settings", add public IP of Panorama, save and commit.

Go back to Panorama --> Managed Devices --> Summary, check the device should show "Connected".

e. Add device into desired template stack and Device Group
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Panorama --> Template, select desired template stack, check the firewall from device list.

Go to Panorama --> Device Group, select desired group, check the firewall from device list.

Commit and push.

f. Integrate Panorama with Aviatrix Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Go to Aviatrix Controller->Firewall Network->Vendor Integration->Firewall Manager (Panorama), fill out all the required information and save.

This step can also be done right after step a.


4. API calls
~~~~~~~~~~~~~~~~

The integrated functions by the Controller are the followings:

 - The Controller monitors the health of Palo Alto Network software by using the VM-series API and performs switch over based on the API return status.
 - The Controller dynamically programs Palo Alto Network route tables for any new propagated new routes discovered both from new Spoke VPCs and new on-premise routes.

Example of Palo Alto Networks API used:

1. get key:

::

    https://54.149.55.193/api/?password=Aviatrix123%23&type=keygen&user=apiadmin

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
