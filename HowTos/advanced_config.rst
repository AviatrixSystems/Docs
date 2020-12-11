.. meta::
   :description: Advanced Config
   :keywords: BGP, Advanced Config, BGP diagnostics


Advanced Config
=================

Tunnel
--------

Specify a IPSec tunnel down detection time. The minimum is 20 Seconds. If Controller is selected, all gateways share the same
tunnel down detection time. 

Aviatrix gateways samples the tunnel status every 10 seconds. 

Keepalive
------------

In normal state, Aviatrix gateways send keep alive messages to the Controller. Keep Alive Speed determines when Controller determines if a gateway is down. 

See `Gateway State <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_ for more information. 


Password Management
----------------------

By default, password management is disabled for controller's account users which means there is no restriction for password length and expiration validity check.

If company's requires strict regulation for passwords then password restriction can be managed and enabled in Controller's console.

Navigate to Settings -> Advanced -> Password Management to enable password management. Password Management allows to put the following restriction for account's user:

    #. Minimum Password Length
    #. Maximum Password Age(Days) and
    #. Enforce Password History which force users to use new strong password.


Credentials
---------------
In order to exercise 90 days security compliance requirement for key rotation policy, API key pair and other internal passwords for company IAM account needs to be refreshed frequently.
This function will allow customers update the access/secret keys if they are using version 5.4 and below.
After 5.4, this function will check the key rotation policy everyday automatically during the midnight, every power cycle (or daemon) restart.



BGP Config
------------

Go to Advanced Config -> BGP


BGP Transit GW List
####################

If you setup a `Transit Network <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, Transit GWs will be listed under Settings -> Advanced Config -> BGP. 

Select one Transit GW to view details. 

- Advertised Networks represents the list of Spoke GW CIDR list. 
- Learned routes represents the list of on-prem network propagated by VGW.  
- Local AS Num is the Transit GW AS number you specified at the time of `Step 3 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ when connecting to VGW. 

BGP Dampening
##############

The BGP dampening feature can be used to suppress flapping routes. It is disabled by default. Currently you cannot configure dampening parameters. 

BGP Diagnostics
################

Aviatrix BGP is implemented by using `Quagga <https://www.quagga.net/>`__. 

To troubleshoot BGP problems, go to

**Advanced Config** > **BGP** > **Diagnostics**

You can either type in `Quagga commands <https://www.nongnu.org/quagga/docs/docs-multi/BGP.html#BGP>`__ or use the |imageGrid| to select one of the pre-defined commands. 

Overlapping Alert Email
#######################

Aviatrix, by default, will alert you if you add a spoke that overlaps with your on-premise network (or, if you start advertising a network from on-premise that overlaps with a spoke).  However, there are some cases where you expect overlaps and the alert emails are not helpful.  For these cases, you can disable the overlap checking.  To do this go to

**Advanced Config** > **BGP Alert Email** > **BGP Overlapping Alert Email**

Toggle the switch to **Disabled** to disable overlap checking.

Proxy
--------

Proxy configuration is available for Release 6.3 and later. It is a global setting that applies to Controller and all gateways. 

.. |imageGrid| image:: advanced_config_media/grid.png

.. disqus::
