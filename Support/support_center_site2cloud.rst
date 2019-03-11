.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Site2Cloud
===========================================================================


How can I debug Site2Cloud connections?
-----------------------------------------

Site2Cloud connections depend on the third party onsite router/firewall providing the remote end of the IPSec tunnel. Here are some common items to check on

* If the tunnel is not coming up, make sure there is interesting traffic from either or both sides of the tunnels
* Ports 500 and 4500 have to be allowed, if you have a firewall, for IPSec tunnels to be established. Please check your firewall, security groups on the gateway and make sure that any NACLs are not blocking traffic.


Can Site2Cloud connection be terminated on an Aviatrix OpenVPN Gateway?
----------------------------------------------------------------------------------

Site2Cloud connections can surely be terminated on an Aviatrix OpenVPN Gateway, but it is our recommendation to not terminate on an OpenVPN Gateway as the OpenVPN Gateways tend to offer services to many of your user services which need a high uptime and are sensitive to changes in IP addresses - any changes in IP Addresses could require the .ovpn files to all of your end users. Running Site2Cloud on a different gateway, allows you to keep your network more stable.
