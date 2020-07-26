.. meta::
   :description: Advanced Config
   :keywords: BGP, Advanced Config, BGP diagnostics


Controller Configuration
===========================

This document describes the configurations on the Controller under Settings tab. 

DNS Server
------------

When "Use VPC/VNET DNS Server" is enabled, the Controller's DNS server is provided by the DHCP option of the VPC 
where it is launched. The DHCP option contains DNS server which could be on-prem, thus if there is DNS reachability issue, there is network outage issue. 

When "Use VPC/VNET DNS Server" is disabled, the controller uses Google public DNS server, therefore making the controller's DNS reachability independent of customer's configuration. This is recommended configuration. 

Login Customization
----------------------

Enable/Disable Admin Login
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The “admin” account login can be disabled to instead use account user.

To disable admin login to the Controller, go to Settings -> Controller -> Login Customization. Click Disable.

Note that you need a local user with admin privileges to be created first, before you can disable the “admin” account.

Login Banner
~~~~~~~~~~~~~~

Customize banner text for first time login for compliance. Any user who login for the first time must acknowledge the text before proceeding to Controller. 

To configure, go to Settings -> Controller -> Login Customization -> Login Banner. Enter the desired login banner text. Click Status to Enable and Click Save. The next time when a user login to the Controller, the user will be prompted with the banner text. Once the user clicks OK, the banner text does not show in the following logins.


.. |imageGrid| image:: advanced_config_media/grid.png

.. disqus::
