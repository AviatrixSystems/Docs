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
* Ensure that the third party device has the matching IKE Phase 1, IPSec Phase 2 algorithm and also security policy (i.e. subnet to indicate interesting traffic for encryption). Please download the Site2Cloud connection configuration from the Aviatrix controller Site2Cloud page and send it to your third party device administrator for proper configuration.


Can Site2Cloud connection be terminated on an Aviatrix OpenVPN Gateway?
----------------------------------------------------------------------------------

Terminating a Site2Cloud connection on an Aviatrix OpenVPN gateway is not our best practice even though it’s possible. Please note that Aviatrix does not incur extra charge for having multiple gateways as we only charge based on the connected OpenVPN users and the number of IPSec tunnel built.  


How do I connect my onprem router to VGW for Site2Connection?
----------------------------------------------------------------------------------

Please follow the directions on AWS Console at https://docs.aws.amazon.com/vpc/latest/adminguide/Welcome.html for detailed instructions. You could also look at https://docs.aws.amazon.com/vpc/latest/adminguide/Introduction.html#DevicesTested for more information. 

How do I create a Site2Cloud connection with Customized SNAT and DNAT to virtual ip addresses?
----------------------------------------------------------------------------------------------

If you need to translate a source ip address and/or a destination ip address to different ip addresses due to your on-premise requirements, please follow the instructions at `Site2Cloud with Customized SNAT and DNAT to a virtual ip address <https://docs.aviatrix.com/HowTos/s2c_snat_dnat1.html>`_.

How do I connect my onsite router, which does not support BGP, to connect to my transit gateway via AWS's VGW?
---------------------------------------------------------------------------------------------------------------------

If your onsite router does not support BGP, please follow the following steps to connect to VGW on AWS Console;

 * Create a new "VPN Connection" on AWS console
 * For "Customer Gateway" pick "new" and use your onsite router's public ip address
 * Skip "BGP ASN"
 * Set the "routing options" to "static"
 * Enter all of your onsite CIDR's at "Static IP Prefixes"
 * Click on "Create VPN Connection"
 * At the Site-to-Site VPN connection page at AWS portal, select the vpn connection you created just now and click on "Download Configuration" to download the appropriate configuration. Follow the steps in this document to setup your tunnel on your onsite router.
 
You would have to manually set the "remote subnets" in your onsite router to the on cloud CIDR's that you want the router to access. Your onprem CIDR's that you configured above, will be propogated by the VGW to the transit gateway via BGP and they will make it to all of your Spoke Gateways.
