.. meta::
  :description: Transit DMZn
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Vendor Integration
=========================================================

Aviatrix Transit DMZ works with any firewall instances. However API level integration allows the DMZ solution to provide significantly improved automation. . 

Palo Alto Firewall 
-------------------

In the release 4.1, the supported firewall vendor is Palo Alto VM-Series Firewall in AWS. For how to configure
PAN, refer to `this guide. <https://docs.paloaltonetworks.com/vm-series/8-1/vm-series-deployment/set-up-the-vm-series-firewall-on-aws/deploy-the-vm-series-firewall-on-aws/launch-the-vm-series-firewall-on-aws.html#ide07b93a2-ccb3-4c69-95fe-96e3328b8514>`_

The integrated functions by the Controller are the followings:

 - The Controller monitors the health of PAN software by using PAN API and performs switch over based on the API return status. 
 - The Controller dynamically programs PAN route tables for any new propagated new routes discovered both from new Spoke VPCs and new on-prem routes. 


.. |main_companion_gw| image:: transit_dmz_workflow_media/main_companion_gw.png
   :scale: 30%

.. |main_companion_subnets| image:: transit_dmz_media/main_companion_subnets.png
   :scale: 30%

.. disqus::
