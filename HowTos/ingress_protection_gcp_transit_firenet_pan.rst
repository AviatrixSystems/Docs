.. meta::
  :description: Ingress Protection via Aviatrix Transit FireNet with Fortigate
  :keywords: AVX Transit Architecture, Aviatrix Transit network, Transit DMZ, Ingress, Firewall, Palo Alto

==============================================================
Ingress Protection via Aviatrix Transit FireNet with Palo Alto in GCP
==============================================================

The solution described below shows how to implement NLB based ingress with Palo Alto firewalls in Google Cloud.

|gcp_ingress|

.. note::

  In this NLB based deployment in GCP the original source address is preserved. The firewall then has to NAT the traffic source to its LAN interface IP, so that’s where the original source IP is lost.

This document describes a step-by-step guide for application ingress protection via Aviatrix Transit FireNet using Palo Alto firewalls for controller version R6.6 and later. 

For more information about Transit FireNet, please check out the below documents:

  `Transit FireNet FAQ <https://docs.aviatrix.com/HowTos/transit_firenet_faq.html>`_
  
  `Firewall Network Design Patterns <https://docs.aviatrix.com/HowTos/firewall_network_design_patterns.html>`_


Design considerations
====================

This document describes NLB based ingress in Google Cloud, however there are other options available for other traffic types. For HTTP/HTTPS load balancing, HTTP(S) load balancer with Network Endpoint groups could be another option although that doesn’t preserve source IP address until the firewall. For a limited list of ports supported you can also use TCP proxy based load balancer with Network Endpoint Groups.
Unlike other clouds, today you cannot put a HTTP(S) or other form of load balancer into a spoke VPC as load balancers in GCP are not tied to a subnet and would deliver traffic directly to backend services instead of spoke gateways. A third party appliance, like F5 could be used to do this in a spoke network if needed.

Deployment Steps
====================

Step 1. Deploy a Transit FireNet in Google Cloud
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set up a Transit FireNet in Google Cloud and enable centralized egress. For details on setting up Transit FireNet see the below document:

  `Transit FireNet Workflow <https://docs.aviatrix.com/HowTos/transit_firenet_workflow.html>`_

Step 2. Set up firewall instances for egress
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Set up the firewall instances according to the documentation here:

  `Example Config for Palo Alto Network VM-Series in GCP <https://docs.aviatrix.com/HowTos/config_paloaltoGCP.html>`_

Enable vendor integration with the firewalls according to the documentation here:

  `Setup API Access to Palo Alto Networks VM-Series <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html>`_

Enable egress through the firewalls according to the documentation here: 

  `Egress through firewall <https://docs.aviatrix.com/HowTos/firewall_advanced.html#egress-through-firewall>`_

Screenshots on enabling egress:

|enable_egress1|

|enable_egress2|

Step 3. Verify health probe status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

On the Google Cloud console open the Load balancing menu and check the health of the load balancers used by the transit firenet. There will be one UDP and one TCP load balancer to check. Backends should show up as healthy.

|gcp_be_lb_health|

Step 4 Set up Palo Alto firewalls for ingress load balancing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Step 4.1. Update management profile
-----------------------------------------------------------------

Edit the management profile to restrict access to firewall management access over WAN and LAN interfaces to only health probes. 
Also, enable HTTP access, as the legacy health probes in GCP only support HTTP and not HTTPS. 

The IP address ranges to add are 169.254.169.254 (legacy health probe for External Load balancer), 35.191.0.0/16 and 130.211.0.0/22 (health probes for Internal Load Balancer)

|palo_alto_mfmt_profile_details|

Add the management profile you have updated to the WAN interface of the firewall as well.

|palo_alto_mgmt_profile|

Step 4.2. Update firewall policy
-----------------------------------------------------------------

Update the security policy on the firewall to enable access to the WAN interface of the firewall from the health probe address (169.254.169.254) using HTTP.

Step 5. Create ingress load balancer in Google Cloud
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a Load Balancer in GCP that point to the WAN interface of your firewalls. In this step we will create a Network Load Balancer as this type of load balancer can terminate any kind of application.

Click create Load balancer on the Google Console/Load balancing menu.

|gcp_create_lb_1|

Select TCP Load Balancing/Start Configuration.

|gcp_create_lb_2|

Select Internet facing, single region, target pool based load balancing.

|gcp_create_lb_3|

Set up name, region (must match Transit Firenet’s region), use select existing instances, and select the firewall instances.

|gcp_create_lb_4|

Create a health probe for the Load Balancer. Use port 80 and set up path to be /php/login.php. If you don’t set this path up, the health probe will fail.

|gcp_create_lb_5|

Click Frontend configuration on the Load Balancer Page and set up a frontend for the ingress public IP. Set up one frontend per application (or per public IP needed). Specify the port needed for the application. Note that you cannot modify this port later, so if you are unsure, set up 1-65535 as this allows all ports to be forwarded to the firewall for this IP address. Once done you can click create to create the load balancer.

|gcp_create_lb_6|


Step 6. Set up firewalls for ingress appliaction traffic
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The load balancer is now created, but health probes will fail as we need to set up a NAT rule for the firewall to answer those probes destined to the frontend IP address of the load balancer.
on the firewall create a DNAT rule for each frontend IP for the health check to work and create a DNAT/SNAT rule for each application to DNAT/SNAT traffic to the actual application IP in the Spoke. The following screenshot shows an example for these rules.

This example uses the following parameters:
  - Fronted IP: 35.187.7.41
  - Ingress application port: 80 (this must always be 80 for the health probe NAT rule)
  - Firewall’s WAN interface IP address: 10.0.1.19
  - Application IP in spoke: 10.0.2.18
  
  You need to SNAT traffic to the firewall’s LAN port to make sure returning traffic hits the same firewall. 
  Pay attention to add the health probe NAT rule always above the ingress app rule, as that is more specific in case the application and the health probe uses the same port.

|palo_alto_dnat_1|

Set up the firewall's security policy to enable the application ingress traffic.

Step 7. Set up Google Cloud firewall rules for ingress
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add an ingress firewall rule to the GCP firewall to allow ingress traffic to the firewall for the application. Use the tag  avx-<egress_vpc_name>-gbl for matching the firewall instances. Allow the application’s port from 0.0.0.0/0 in.
Use the name of your egress VPC as a parameter in the tag's <egress_vpc_name>. In the example below the egress VPC name is "gcp-fw-egress-vpc" reulting in the tag name of avx-gcp-fw-egress-vpc-gbl.

|gcp_fwrule_ingress|

|gcp_fwrule_ingress_2|

Step 8. Validate the setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Check that the load balancer in google console shows the backend as healthy for the firewalls. Note that when you reboot a firewall, port 80 might take up to 30 minutes to respond to health checks on port 80.

|gcp_health_check|

Initiate traffic from the internet towards you application hosted in the spoke VPC. To do so, use the frontend IP address of the load balancer you created and the defined frontend port. Your application should respond as expected.

.. |gcp_ingress| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_ingress.png
   :scale: 50% 

.. |enable_egress1| image:: ingress_protection_gcp_transit_firenet_pan_media/enable_egress1.png
   :scale: 50% 

.. |enable_egress2| image:: ingress_protection_gcp_transit_firenet_pan_media/enable_egress2.png
   :scale: 50% 

.. |gcp_be_lb_health| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_be_lb_health_status.png
   :scale: 50% 

.. |gcp_create_lb_1| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_1.png
   :scale: 50% 

.. |gcp_create_lb_2| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_2.png
   :scale: 50% 

.. |gcp_create_lb_3| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_3.png
   :scale: 50% 

.. |gcp_create_lb_4| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_4.png
   :scale: 50% 

.. |gcp_create_lb_5| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_5.png
   :scale: 50% 

.. |gcp_creae_lb_6| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_create_lb_6.png
   :scale: 50% 

.. |gcp_fwrule_ingress| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_fwrule_ingress.png
   :scale: 50% 

.. |gcp_fwrule_ingress_2| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_fwrule_ingress2.png
   :scale: 50% 

.. |gcp_health_check| image:: ingress_protection_gcp_transit_firenet_pan_media/gcp_health_check.png
   :scale: 50% 

.. |palo_alto_dnat_1| image:: ingress_protection_gcp_transit_firenet_pan_media/palo_alto_dnat_1.png
   :scale: 50% 

.. |palo_alto_mgmt_profile| image:: ingress_protection_gcp_transit_firenet_pan_media/palo_alto_mgmt_profile.png
   :scale: 50% 

.. |palo_alto_mfmt_profile_details| image:: ingress_protection_gcp_transit_firenet_pan_media/palo_alto_mgmt_profile_details.png
   :scale: 50% 

.. disqus::

