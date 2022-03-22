.. meta::
  :description: ActiveMesh Workflow
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials 


===================================
Aviatrix ActiveMesh Workflow
===================================

Aviatrix ActiveMesh is officially available in Release 5.1. 

ActiveMesh leverages both primary gateway and backup gateway for packet forwarding. The architecture statistically doubles the network throughput. In addition, in ActiveMesh mode, multiple remotes sites can be connected to the Aviatrix Transit gateways. 

The workflow follows the `Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ with one additional step. 

 1. After `Step 1 Launch a Transit Gateway <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-an-aviatrix-transit-gateway>`_ is completed, go to the Gateway page, highlight the just-created Transit gateway, and click **Edit**. At the Gateway Edit page, click **Enable for ActiveMesh Mode**.
 #. If you like a Spoke Gateway to run in ActiveMesh mode, enable ActiveMesh after `Step 1 Launch a Spoke Gateway <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#launch-an-aviatrix-spoke-gateway>`_.


.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
