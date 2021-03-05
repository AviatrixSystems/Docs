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


How can I set the IPSec Phase1/2 lifetime values for Site2Cloud Tunnels?
------------------------------------------------------------------------------------

As of version 5.0.2773, we do not support setting the lifetime values for IPSec Phase1 and Phase2

While you are creating a new Site2Cloud connection

  * If you pick the remote gateway as "generic", we always use the settings from the peer device that this gateway is connecting to - so you can set these values on your remote IPSec device as you need
  
    * After you create the site2cloud tunnel, when you download the configuration file, for both vendors(generic and cisco), we incorrectly show lifetime values for phase1 and phase2 - please ignore them. 
  * If you pick "AWS VGW" as the remote gateway, the lifetimes are set to 28800/3600 for phase1/2.
  
    * While you are downloading the configuration after creating this site2cloud tunnel, the configuration file for generic vendor will incorrectly show these values as 28800/28800 instead of 28800/3600 - we have an outstanding defect to address this issue 28800/3600, as of version 5.0.2773.
    * If you pick Cisco as the vendor, we correctly show these values as 28800/3600. Please make a note of this and configure your remote end correctly

If I already have a Site2Cloud connection using IKEv1, could I create another one using IKEv2 ?
-----------------------------------------------------------------------------------------------------
The prerequisite for IKEv2 is that you need to create the first Site2Cloud connection with IKEv2 enabled.
If your current gateway already have a Site2Cloud connection using IKEv1 which was created prior to 5.0 release, you will need to delete it first before creating the IKEv2 Site2Cloud connection. 
Alternatively, you can create a new Aviatrix gateway in the same VPC and make the first Site2Cloud connection with IKEv2 enabled.


How can I use a S2C with a simple NAT to public IP?
-----------------------------------------------------------------------------------------------------

If you are planning to NAT your local CIDR behind the Aviatrix Gateway, make sure that you enable SNAT on the gateway (Controller/Gateway/Edit/SourceNAT) and on your S2C configuration set your local subnet to the EIP of the Aviatrix Gateway(/32), so that you do not advertise the real local CIDR to the remote gateway.


What are the DPD settings for Aviatrix Site2Cloud Settings?
-----------------------------------------------------------------------------------------------------

The default DPD settings for site2cloud connections on Aviatrix Gateways is 3 retries at 10 second intervals. If the Aviatrix gateway does not receive 3 consecutive DPD's, the IPSec connection will be terminated and a new Phase1 negotiation is attempted. This is to make sure that the tunnel is always up and active.

If you want to keep sending periodic ping packets to keep the tunnel up due to differences in dpd's with the remote edge device, please look to the `periodic ping feature <https://docs.aviatrix.com/HowTos/periodic_ping.html>`_.

You can also disable dpd's on the Gateway for a site2cloud tunnel - please do remember that this will report the tunnel to be up always and you might not see a `tunnel down notification <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id10>`_  anymore if you turn off DPD's. `Instructions to turn off DPD's <https://docs.aviatrix.com/HowTos/site2cloud.html#dead-peer-detection>`_.


What are the default DPD interval settings?
-------------------------------------------

The defaults are dpd_delay 10, dpd_retry 3 and dpd_maxfail 3.


Why is my Cisco Router rekeying the IPSec session sooner than usual?
---------------------------------------------------------------------------

It is possible that your `Cisco router <https://www.cisco.com/c/en/us/td/docs/ios/sec_secure_connectivity/configuration/guide/convert/sec_ike_for_ipsec_vpns_15_1_book/sec_key_exch_ipsec.html>`_ is using data transferred as a lifetime metric. If so, you can use this command "set security-association lifetime kilobytes disable" to disable using the data transferred as a lifetime metric. When in doubt, please refer to our `Site2Cloud configuration instructions for Cisco IOS <https://docs.aviatrix.com/HowTos/S2C_GW_IOS.html>`_.


Here is a relevant `excerpt from Cisco Docs <https://www.cisco.com/c/en/us/td/docs/ios/12_2/security/command/reference/srfipsec.html#wp1017619>`_:

    Assuming that the particular crypto map entry does not have lifetime values configured, when the router requests new security associations during security association negotiation, it will specify its global lifetime value in the request to the peer; it will use this value as the lifetime of the new security associations. When the router receives a negotiation request from the peer, it will use the smaller of the lifetime value proposed by the peer or the locally configured lifetime value as the lifetime of the new security associations.  

    There are two lifetimes: a "timed" lifetime and a "traffic-volume" lifetime. The security association expires after the first of these lifetimes is reached.  

    If you change a global lifetime, the change is only applied when the crypto map entry does not have a lifetime value specified. To change the global timed lifetime, use the "*crypto ipsec security-association lifetime seconds*" form of the command. The timed lifetime causes the security association to time out after the specified number of seconds have passed.

    To change the global traffic-volume lifetime, use the "*crypto ipsec security-association lifetime kilobytes*" form of the command. The traffic-volume lifetime causes the security association to time out after the specified amount of traffic (in kilobytes) has been protected by the security associations' key.  

Please note that the Cisco IOS default lifetimes are *3600 seconds (one hour) and 4,608,000 kilobytes (10 megabits per second for one hour)*. Here are some useful commands:

  * `show crypto map <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s3.html#wp3995346140>`_    ##view the crypto map configuration, will show the sa lifetimes
  * `show crypto isakmp policy <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s3.html#wp1951563782>`_    ##display the parameters for each IKE policy, shows time/volume lifetime limits
  * `show crypto ipsec sa <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s3.html#wp3458936948>`_    ##view the settings used by current security associations, will display lifetime information
  * `show crypto ipsec security-association idle-time <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s3.html#wp1306510365>`_    ##display the SA idle-time value configured for crypto map entry
  * `show crypto ipsec security-association lifetime <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s3.html#wp2015308296>`_    ##display the SA lifetime value configured for a particular crypto map entry
  * `crypto isakmp policy lifetime <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/a1/sec-a1-cr-book/sec-cr-c4.html#wp4832891500>`_    ##define IKE policies and lifetimes
  * `crypto ipsec security-association idle-time seconds <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/a1/sec-a1-cr-book/sec-cr-c3.html#wp1305920947>`_    ##configure idle-timers globally
  * `crypto ipsec security-association lifetime <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/a1/sec-a1-cr-book/sec-cr-c3.html#wp2944599527>`_    ##global lifetime values for SA associations
  * `set security-association idle-time <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s2.html#wp3209803263>`_    ##specify the maximum amount of time for which the current peer can be idle before the default peer is used
  * `set security-association lifetimew <https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/security/s1/sec-s1-cr-book/sec-cr-s2.html#wp1549482593>`_    ##specify lifetime for a specific crypto map entry or IPsec profile that is used when negotiating IPsec security associations (SAs)
  

Please refer to `Cisco's IPSec Troubleshooting guide <https://www.cisco.com/c/en/us/support/docs/security-vpn/ipsec-negotiation-ike-protocols/5409-ipsec-debug-00.html>`_ for more information.


How can I restart the tunnel?
--------------------------------

Please head to Site2Cloud/Diagnostics and pick the correct values for "VPC, Gateway, Connection" and under "Action" select "Restart Service" - this will restart the tunnel services. PLEASE NOTE that this will restart all of the tunnels on this gateway and could impact your service till the tunnels come up.
