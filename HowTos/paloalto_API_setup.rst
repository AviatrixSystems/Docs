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

|pan_ping|

2. Create API Administrator Role Profile
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a new role profile and name it Aviatrix-API-Role. Edit the profile to enable Report, Configuration, Operation Requests and Commit for the tab XML API. This allows the Aviatrix Controller to update the relevant route entries
the Palo Alto Network interfaces.

Go to Device -> Setup -> Management Interface Settings, as shown below.

|pan_role_profile|


3. Add an Administrator for API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

At the Palo Alto Networks Console, go to Device -> Administrators -> +Add, to add an administrator for Role Based access as
shown below. Use the profile created in previous step.

|pan_admin|


5. Configure on the Aviatrix Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Login to the Aviatrix Controller, go to Firewall Network -> Vendor Integration. Configure the following parameters.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Transit VPC ID                                  The Transit VPC ID for the Transit DMZ deployment. .
Firewall instance ID                            The firewall EC2 instance ID. Aviatrix Controller monitors the health of this instance and determines fail over when it becomes unreachable.
Firewall Name (Optional)                        A name to remember.
Firewall Vendor Type                            Select PAN
Firewall Login User Name                        firewall login name for API calls from the Controller.
Firewall Login Password                         firewall login password for API calls.
Firewall Management IP Address                  The public IP address of the firewall management interface for API calls from the Aviatrix Controller
Firewall Virtual Router name (Optional)         Specify the firewall virtual Router name you wish the Controller to program. If left unspecified, the Controller programs the firewall's default router.
==========================================      ==========

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
