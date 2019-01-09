.. meta::
  :description: Transit DMZn
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Vendor Integration
=========================================================

Aviatrix Transit DMZ works with any firewall instances. However API level integration allows the DMZ solution to provide significantly improved automation. . 

In the release 4.1, the supported firewall vendor is Palo Alto PAN. The integrated functions by 
the Controller are the followings:

 - The Controller monitors the health of PAN software by using PAN API and performs switch over based on the API return status. 
 - The Controller dynamically programs PAN route tables for any new propagated new routes discovered both from new Spoke VPCs and new on-prem routes. 


.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
