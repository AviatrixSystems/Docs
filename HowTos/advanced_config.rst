.. meta::
   :description: Advanced Config
   :keywords: BGP, Advanced Config, BGP diagnostics


Advanced Config
=================

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

BGP dampening feature can be used to suppress flapping routes. It is disabled by default. Currently you cannot configure dampening parameters. 

BGP Diagnostics
################

Aviatrix BGP is implemented by using `Quagga <https://www.quagga.net/>`__. 

To troubleshoot BGP problems, go to

**Advanced Config** > **BGP** > **Diagnostics**

You can either type in `Quagga commands <https://www.nongnu.org/quagga/docs/docs-multi/BGP.html#BGP>`__ or use the |imageGrid| to select one of the pre-defined commands. 

Overlapping Alert Email
#######################

Aviatrix, by default, will alert you if you add a spoke that overlaps with your on-premise network (or, if you start advertising a network from on-premise that overlaps with a spoke).  However, there are some cases where you expect overlaps and the alert emails are not helpful.  For these cases, you can disable the overlap checking.  To do this go to

**Advanced Config > **BGP** > **Overlapping Alert Email**

Toggle the switch to **Disabled** to disable overlap checking.

.. |imageGrid| image:: advanced_config_media/grid.png

.. disqus::
