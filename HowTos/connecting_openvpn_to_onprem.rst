.. meta::
   :description: Connecting OpenVPN users to Onprem
   :keywords: site2cloud user vpn openvpn routing onprem on-prem client


============================================
Connecting OpenVPN Users to Onprem
============================================

In this tutorial we will cover the basic routing needed to allow users connected to Aviatrix's OpenVPN service to access On-prem. This documentation assumes that there is an existing OpenVPN Gateway and a configured Site2Cloud tunnel.

For more information on creating either, please refer to these links:

- `Creating an OpenVPN Gateway <https://docs.aviatrix.com/HowTos/uservpn.html>`_ 
- `Creating Site2Cloud Connection <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ 


Topology
--------------
===============================     =================================================================
  **Network**                       **CIDR**
===============================     =================================================================
Client Network	 					          192.168.43.0/24
OpenVPN Gateway Network 			      10.99.245.0/24
On-prem Network 					          10.200.0.0/16
===============================     =================================================================

Configuration
--------------

1. Add the On-prem Networks to the OpenVPN Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Controller > OpenVPN > Edit Config > MODIFY SPLIT TUNNEL 

- Add the Onprem CIDR block (ig, 10.200.0.0/16) to Additional CIDR
- If Split Tunnel is set to "No" then no changes need to be made

2. Establish Connectivity Between the OpenVPN Gateway and the Site2Cloud or Transit Gateway 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Depending on your network's use case, please refer to the links below:

- `TGW Orchestration <https://docs.aviatrix.com/HowTos/tgw_plan.html>`_ 
- `Aviatrix Transit Network <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ 


3. Add the OpenVPN Gateway CIDR to the Site2Cloud Configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A. The Site2Cloud Connection is built on a Spoke Gateway

Controller > Site2Cloud > select tunnel > Local Subnet(s)

- Add the OpenVPN Gateway Network to Local Subnets(s) (ig, 10.99.245.0/24)
- The remote Firewal/Router will need to add the OpenVPN Gateway's network (10.99.245.0/24) to it's IPSec policy
- The User VPN client network (ig, 192.168.43.0/24) will be SNAT'ed off of the OpenVPN Gateway's local IP (ig, 10.99.245.x) 

B. The Site2Cloud Connection is Built on a Transit Gateway with BGP

- Transit Gateways configured with BGP should advertise the OpenVPN network automatically

Conclusion
--------------

Users connected to the SSL VPN should now be able to route through the OpenVPN Gateway back to On-prem.

Troubleshooting
--------------

- Confirm the VPN User policy allows for connectivity to the On-prem network
- Log out of the Aviatrix VPN client and reconnect - this will refresh your device's local routes
- If this a TGW solution, confirm that the OpenVPN Gateway's Security Domain is connected to the S2C Security Domain
- If this is a BGP solution confirm that Transit Gateway is advertising the OpenVPN Gateway network (ig, 10.99.245.0/24)
- On the remote firewall or router check for any ACLs that would block the OpenVPN Gateway Network
- In AWS confirm there are no NACLs or Security Groups blocking the traffic
