.. meta::
  :description: Firewall Network FAQ	
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Firewall, DMZ, Cloud DMZ, Firewall Network, FireNet


=========================================================
Transit FireNet FAQ
=========================================================

What is the Transit FireNet?
----------------------------------------------

Aviatrix Transit FireNet is the `Firewall Network <https://docs.aviatrix.com/HowTos/firewall_network_faq.html>`_ function applied to the Transit gateway. 
With Transit FireNet feature, the FireNet function is integrated into the Transit gateway.. 

The use case is to deploy firewalls in the `encrypted transit architecture <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ 
for AWS, as shown below. 


|transit_firenet|

When deployed in Azure (available in the future release), Transit FireNet also works when using Native Azure VNet Spokes, as shown below. 

|transit_firenet_vnet|


Can multiple firewalls be supported in Transit FireNet?
--------------------------------------------------------------------------------------

Yes. Multiple firewall instances can be attached to Each Transit Gateway. The Transit Gateway load balances and forwards packets to the firewalls. 

How does Transit FireNet work?
--------------------------------

Transit FireNet works the same way as the Firewall Network where traffic in and out of the specified Spoke is forwarded to the firewall instances for
inspection or policy application. 

What is the minimum gateway instance size for Transit FireNet deployment?
----------------------------------------------------------------------------

The minimum gateway instance size is C5.xlarge. This is because the FireNet gateway requires 4 network 
interfaces: 

 - eth0 is a management interface
 - eth1 is not used
 - eth2 is the interface to the firewall instances 
 - eth3 is the interface to the HA FireNet gateway

Which option should I choose for "Create a VPC" tool"?
----------------------------------------------------------

When using the Useful Tool to create the transit VPC for Transit FireNet deployment, select "Aviatrix FireNet VPC" option to create 4 public subnets. 

How do I configure FireNet?
---------------------------

Follow the `FireNet workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_ to deploy firewall in the cloud. 


How do I enable Egress inspection on Transit FireNet?
--------------------------------------------------------

By default, FireNet inspects traffic between North South (on-prem and VPC) and East West (VPC to VPC). To enable
Egress traffic (Internet bound) inspection: 

Go to Firewall Network -> Advanced. Click the skewer. Scroll down to "Egress through Firewall" and click Enable.

.. Important::

  When Egress through Firewall is enabled, it applies to all Spoke VPCs. You do not need to configure individual VPC inspection policy.

Is there an example guide to setup Palo Alto VM-Series policies?
------------------------------------------------------------------

Yes. Follow `Example Config for Palo Alto VM-Series <https://docs.aviatrix.com/HowTos/config_paloaltoVM.html>`_ to 
setup an "ALLOW ALL" policy for test validation.

How do I test FireNet connectivity without deploying firewall instance?
-------------------------------------------------------------------------

You can test connectivity without deploying any firewall instances. When the FireNet gateway has no firewall instance 
attached to it for the data path, the FireNet gateway loops the received packet and forwards it to its destination.


Can VM-Series be launched with Bootstrap integration?
-------------------------------------------------------

Yes. When you launch a VM-Series from Aviatrix Controller console, you can select the option to launch the VM-Series instance with `bootstrap information. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#example-configuration-for-bootstrap>`_

Can Firewall Network work with Panorama?
------------------------------------------

Yes. Follow the instructions for `Panorama integration. <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html#managing-vm-series-by-panorama>`_

What is the failover time?
----------------------------

Aviatrix FireNet gateway failure detection time is 8 - 10 seconds. The switch over to alternative gateway (primary or backup) is about the same time. 

The Aviatrix Controller monitors the health of the firewall instances. For Pal Alto VM-Series, the Controller
uses Palo Alto API to periodically check the firewall instance health. The polling time is 10 seconds. However depending 
on how the instance fails, it can take over a minutes for the failure condition to be detected. For example, 
if you stop the instance from AWS console, it can take a minute before the API access fails. On the other hand, if the firewall instance interface is shutdown, the failure detection is 10 seconds.  


.. |transit_firenet| image:: transit_firenet_media/transit_firenet.png
   :scale: 30%

.. |transit_firenet_vnet| image:: transit_firenet_media/transit_firenet_vnet.png
   :scale: 30%


.. disqus::
