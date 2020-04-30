.. meta::
   :description: Periodic Ping
   :keywords: site2cloud troubleshooting tunnel drop stability IPSec


============================================
Periodic Ping
============================================

In very rare cases Site2cloud tunnels may fail to pass traffic if the tunnel is dormant for a long period of time. This is not an issue with the Aviatrix Gateways and can usually be traced to misconfigurations on the remote device. To compensate for this Periodic Ping was developed to maintain a steady flow of traffic across the tunnel. 

For more information on troubleshooting Site2Cloud issues please refer to these links:

- `Troubleshooting Site2Cloud Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.html>`_ 
- `Site2Cloud Workflow <https://docs.aviatrix.com/HowTos/site2cloud.html>`_ 

Controller Path
--------------

Controller > Gateway > select gateway > Periodic Ping

Configuration
--------------
===============================     =================================================================
  **Option**                        **Description**
===============================     =================================================================
Interval    	 					          The interval the ping is sent in seconds
IP Address              			      The destination IP of a device on the remote end of the tunnel
===============================     =================================================================

Set the desired values (ie, Interval 3 & IP Address 10.200.1.8) and then click "Enable." The Gateway will now ping the remote device in intervals of seconds. The ping will originate from the Gateway's local IP.

Additional Notes
--------------

- If Periodic Ping is enabled on a Transit Gateway with BGP, "Advertise Transit VPC Network CIDR(s)" must be enabled for the ping to traverse the site2cloud tunnel
  - - Controller > Transit Network > Advance Config > Edit Transit > select gateway > Advertise Transit VPC Network CIDR(s) > Enable 
- This feature is available in software version 5.3 and above
