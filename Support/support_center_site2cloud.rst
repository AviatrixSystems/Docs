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
* Ensure that the third party device has the matching IKE Phase 1, IPSec Phase 2 algorithm and also security policy (i.e. subnet to indicate interesting traffic for encryption). Please download the Site2Cloud connection configuration from Aviatrix controller Site2Cloud page and send it to your third party device administrator for proper configuration.


Can Site2Cloud connection be terminated on an Aviatrix OpenVPN Gateway?
----------------------------------------------------------------------------------

Terminating a Site2Cloud connection on an Aviatrix OpenVPN gateway is not our best practice even though it’s possible. Please note that Aviatrix does not incur extra charge for having multiple gateways as we only charge based on the connected OpenVPN users and the number of IPSec tunnel built.  


How do I connect my onprem router to VGW for Site2Connection?
----------------------------------------------------------------------------------

Please follow the directions on AWS Console at https://docs.aws.amazon.com/vpc/latest/adminguide/Welcome.html for detailed instructions. You could also look at https://docs.aws.amazon.com/vpc/latest/adminguide/Introduction.html#DevicesTested for more information. 
