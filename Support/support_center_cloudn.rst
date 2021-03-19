.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
CloudN
===========================================================================

Which sites does the CloudN device require to have connectivity to?
---------------------------------------------------------------------------------------------------

CloudN requires access to some ports/hosts. Please take a look `here <https://docs.aviatrix.com/HowTos/CloudN_workflow.html#step-2-4-cloudn-egress-ports-on-management-port>`_


Please take a look at https://docs.aviatrix.com/HowTos/CloudN_insane_mode.html#internet-access for more information


Site2Cloud not coming up?
---------------------------

Pleae make sure that if there are any firewalls or routers in between the CloudN and Transit Gateways - they should allow port 500 and port 4500 traffic between CloudN's wan/etho0 interface and Transit Gateway.
