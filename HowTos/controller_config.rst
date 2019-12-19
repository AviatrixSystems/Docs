.. meta::
   :description: Advanced Config
   :keywords: BGP, Advanced Config, BGP diagnostics


Controller Configuration
===========================

DNS Server
------------

When "Use VPC/VNET DNS Server" is enabled, the Controller's DNS server is provided by the DHCP option of the VPC 
where it is launched. The DHCP option contains DNS server which could be on-prem, thus if there is DNS reachability issue, there is network outage issue. 

When "Use VPC/VNET DNS Server" is disabled, the controller uses Google public DNS server, therefore making the controller's DNS reachability independent of customer's configuration. This is recommended configuration. 


.. |imageGrid| image:: advanced_config_media/grid.png

.. disqus::
