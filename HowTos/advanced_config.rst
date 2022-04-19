.. meta::
   :description: Advanced Config
   :keywords: BGP, Advanced Config, BGP diagnostics


Advanced Config
=================

Configuration Updates with the Aviatrix GUI
--------------------------------------------

To update your Aviatrix gateway configuration, see the `Launching a Gateway <https://docs.aviatrix.com/HowTos/gateway.html>`_. 

To deploy Aviatrix CoPilot, see the `Aviatrix CoPilot Deployment Guide <https://docs.aviatrix.com/HowTos/copilot_getting_started.html>`_. 

To update your Aviatrix Firewall configuration, see the `Firewall Network (FireNet) Workflow <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html>`_.

Configuration Updates with Terraform
--------------------------------------

To update your Aviatrix configuration with Terraform, see the `Aviatrix Terraform Registry <https://registry.terraform.io/providers/AviatrixSystems/aviatrix/latest>`_. 

Tunnel
--------

Specify a IPSec tunnel down detection time. The minimum is 20 Seconds. If Controller is selected, all gateways share the same
tunnel down detection time. 

Aviatrix gateways samples the tunnel status every 10 seconds. 

Anti-replay Window
------------------

Specify the IPSec tunnel anti-replay window size.

- The size range is 0 to 4096. 
- The default value is 0.
- Set the size to 0 to disable anti-replay protection. 
- If “controller” of “Aviatrix Entity” is selected, all gateways share the same tunnel anti-replay window. 

Keepalive
---------

In normal state, Aviatrix gateways send keep alive messages to the Controller. Keep Alive Speed determines when Controller determines if a gateway is down. 

See `Gateway State <https://docs.aviatrix.com/HowTos/gateway.html#gateway-state>`_ for more information. 

Password Requirements
----------------------

Aviatrix uses a password meter to enforce password requirements. The default password requirements are:

- Minimum characters - 4.
- Maximum characters - 16,777,216 or 16MB.
- At least 1 upper and 1 lower case character.
- At least 1 numeral character.
- At least one special character.

Password Management
----------------------

By default, password management is disabled for controller's account users which means there is no restriction for password length and expiration validity check.

If company's requires strict regulation for passwords then password restriction can be managed and enabled in Controller's console.

Navigate to Settings -> Advanced -> Password Management to enable password management. Password Management allows to put the following restriction for account's user:

    #. Minimum Password Length
    #. Maximum Password Age(Days) and
    #. Enforce Password History which force users to use new strong password.

If you are using the Password Management option, the policy default values are:

- Minimum characters – 8.
- Age limit  - 180 days.
- Not repeatable times – 5.

If you are using the Password Management option, the policy ranges are:

- Minimum characters – 8.
- Maximum characters – 32.
- Age limit is 1 - 365 days.
- Not repeatable times is 1 – 12.

Credentials
---------------
In order to exercise 90 days security compliance requirement for key rotation policy, API key pair and other internal passwords for company IAM account needs to be refreshed frequently.

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

**Settings** > **Controller** > **Alert Bell** > **Overlapped CIDR Check**

Toggle the switch to **Disabled** to disable overlap checking.

Proxy
--------

Proxy configuration is available for Release 6.3 and later. It is a global setting that applies to Controller and all gateways. 

There are scenarios where a corporation requires all Internet bound web traffic be inspected by a proxy server before being allowed
to enter Internet. Such requirement may apply to cloud deployment, and when it happens, both Controller and gateways need to comply to 
the policy. This is accomplished by enabling and configuring proxy server on the Controller. 

When a proxy server is configured on the Aviatrix platform (Controller and gateways), all Internet bound HTTP and HTTPS traffic initiated by 
the Controller and gateways is forwarded to the proxy server first before entering Internet. Such traffic includes all cloud provider 
API calls made by the Controller and gateways. 

.. important::

  The domain name .aviatrix.com must be excluded by the proxy server from SSL or HTTPS termination. 
  
Configuration
################

=========================================      =========================
**Field**                                      **Value**
=========================================      =========================
HTTP Proxy                                     proxy server IP address for HTTP traffic
HTTPS Proxy                                    proxy server IP address for HTTPS traffic (usually the same as HTTP Proxy field)
(Optional) Proxy CA Certificate                This field is optional. When a CA Certificate is uploaded, the Controller and gateway expect that the proxy server will terminate a HTTPS request initiated by them and will initiate a new HTTPS request on behalf of them. When this option is not used, the proxy server simply forwards HTTP/HTTPS traffic.  
=========================================      =========================

Test
~~~~~~

The Test option runs a few HTTPS request to make sure your proxy configuration is correct. 

Once all fields are configured, click Test to validate if your configuration is correct. If not, results are displayed. Correct the 
configuration and try again. 

Apply
~~~~~~~

Apply is clickable only after Test is passed. When Apply is applied, the proxy configuration takes effect. 

Delete
~~~~~~~

To disable proxy, click Delete. 

                                      

  
.. |imageGrid| image:: advanced_config_media/grid.png

.. disqus::
