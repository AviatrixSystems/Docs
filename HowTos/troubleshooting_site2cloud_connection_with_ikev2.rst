.. meta::
  :description: Troubleshooting Site2Cloud connection with IKEv2
  :keywords: Transit Gateway Peering, Aviatrix Transit network, Private Network, Transit Gateway Peering with Private Network, Azure ExpressRoute, AWS Direct Connect

================================================
Troubleshooting Site2Cloud connection with IKEv2
================================================

Workflow
=========

Check Site2Cloud Connection Status
----------------------------------

Perform the Diagnostics Action "Run analysis"
---------------------------------------------

Troubleshoot the keyword in the Diagnostics Action "Show logs"
--------------------------------------------------------------

Keyword: "Error: Failed to deliver message to gateway"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- Aviatrix Controller cannot reach to gateway

Suggestions:
- Refer to Aviatrix Gateway Troubleshooting Playbook (https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_gateway.html)

Keyword: "establishing IKE_SA failed, peer not responding"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- IP mismatch
- either UDP Port 500 or 4500 is not accessable

Suggestions:

Keyword: "NO_PROPOSAL_CHOSEN"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- IP mismatch
- IKE version mismatch
- IKEv2 algorithm mismatch
- IPSec alogorithm mismatch 

Suggestions:

Keyword: "AUTHENTICATION_FAILED"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- IKE version mismatch
- pre-shared key mismatch
- Identifier mismatch

Suggestions:

Probable Causes: 
- IKE version mismatch
- Identifier mismatch

Suggestions:

Keyword: "no shared key found"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- IKE version mismatch
- Identifier mismatch


Suggestions:


Keyword: "failed to establish CHILD_SA, keeping IKE_SA"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 
- IPSec alogorithm mismatch

Suggestions:

Other troubleshooting documents
===============================
- Support Center Site2Cloud (https://docs.aviatrix.com/Support/support_center_site2cloud.html)
- Aviatrix Site2Cloud connection with IKEv1 End to End traffic Troubleshooting Playbook (https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.html)

.. disqus::
