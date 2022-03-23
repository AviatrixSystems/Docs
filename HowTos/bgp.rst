==================================
BGP
==================================
=======
  :description: Description of fields and settings on the BGP page
  :keywords: bgp, Border Gateway patrol, BGP Diagnostics, BGP Connections, maximum AS limits, AS, transit network, multi-cloud transit

============
BGP Page
============

Use the BGP page to review your BGP connections and settings. To open this page, in your Aviatrix Controller, go to MULTI-CLOUD TRANSIT > BGP on the left sidebar.

BGP Page: Connections Tab
^^^^^^^^^^^^^^^^^^^^^^^^

If you set up a `Transit Network <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, Transit GWs will be listed on the BGP page in the Connections tab. 

Select one Transit GW to view its details. 

- Advertised Networks represents the list of Spoke GW CIDR list. 
- Learned routes represents the list of on-prem network propagated by VGW.  
- Local AS Num is the Transit GW AS number you specified at the time of `Step 3 <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_ when connecting to VGW.

BGP Page: Diagnostics Tab
^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Diagnostics tab on the BGP page to troubleshoot BGP problems. Aviatrix BGP is implemented by using `Quagga <https://www.quagga.net/>`__.

You can either type in `Quagga commands <https://www.nongnu.org/quagga/docs/docs-multi/BGP.html#BGP>`__ or use the |imageGrid| to select one of the pre-defined commands. 

BGP Page: Configuration Tab
^^^^^^^^^^^^^^^^^^^^^^^^^^

Use the Configuration tab on the BGP page to edit your BGP settings if necessary.

BGP Overlapping Alert Email
########################

When Aviatrix Controller detects overlapping network CIDRs in the network, it sends out alert emails to the admins.

BGP Route Limit Alert Email
############################

AWS VGW BGP supports up to 100 routes. When this limit is reached, VGW BGP goes down and causes outage. This email alert notifies admin when routes approach 90.

BGP Maximum AS Limits
#######################

The BGP Maximum AS Limit sets the maxium number of BGP hops the Controller allows the route to propagate. This limit determines the scope of a BGP network by setting the maxium BGP AS path length.

This setting is disabled by default, meaning that the network size is unlimited. 

If you wish to limit the size of your network (for example, if you have a complex topology between your on-prem and cloud networks), you can enable this option by entering 1-254 in the field provided. Then, use the up and down arrows to increase or decrease the number.

.. disqus::

