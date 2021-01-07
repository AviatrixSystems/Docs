.. meta::
  :description: Troubleshooting Site2Cloud connection with IKEv2
  :keywords: Aviatrix Transit network, Private Network, Site2cloud, site to cloud, aviatrix, ipsec vpn, tunnel, Encrypted Peering

================================================
Troubleshooting Site2Cloud connection with IKEv2
================================================

Workflow
=========

Check Site2Cloud Connection Status
----------------------------------

	- Login Aviatrix Controller
	
	- Go to SITE2CLOUD -> Setup
  
  - Find the Site2Cloud Connection
  
  - Check the tunnel status
  
    - if the Status displays "Down", please follow the next step

Perform the Diagnostics Action "Run analysis"
---------------------------------------------

	- Go to SITE2CLOUD -> Diagnostics
  
  - Select the related information for VPC ID/VNet Name, Connection, and Gateway
  
  - Select the option "Run analysis" under Action and click the button "OK"
  
  - View the suggestion on the prompt panel to troubleshoot Site2Cloud tunnel down issue
  
  - Follw the next step to view logs if needed
  
Troubleshoot the keyword in the Diagnostics Action "Show logs"
--------------------------------------------------------------

  - Go to SITE2CLOUD -> Diagnostics
  
  - Select the related information for VPC ID/VNet Name, Connection, and Gateway
  
  - Select the option "Show logs" under Action and click the button "OK"
  
  - Review the logs on the prompt panel
  
  - Attempt to locate the keyword or failure message during IKEv2/IPsec negotiation. Here are some keyword example log entries of negotiation failure to troubleshoot further.

Keyword: "Error: Failed to deliver message to gateway"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Aviatrix Controller cannot reach to gateway

Suggestions:

- Refer to `Aviatrix Gateway Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_gateway.html>`_

Keyword: "establishing IKE_SA failed, peer not responding"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Peer IP address is mismatched or peer IP address is not reachable

- UDP Port 500/4500 is not accessable

Suggestions:

- Troubleshoot connectivity between Aviatrix gateway and peer VPN router

Keyword: "NO_PROPOSAL_CHOSEN"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Peer IP address is mismatched or peer IP address is not reachable

- IKE version is mismatched

- IKEv2 algorithm is mismatched

- IPSec alogorithm is mismatched

Suggestions:

- Troubleshoot connectivity between Aviatrix gateway and peer VPN router

- Verify that both VPN settings use the same IKEv2 version

- Verify that all IKEv2/IPSec algorithm parameters (i.e. Authentication/DH Groups/Encryption) match on both VPN configuration

Keyword: "AUTHENTICATION_FAILED"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- IKE version is mismatched

- pre-shared key is mismatched

- Identifier configuration is mismatched

Suggestions:

- Verify that both VPN settings use the same IKEv2 version

- Verify that pre-shared key match on both VPN configuration

- Verify that Identifier match

  - By default, Aviatrix uses gateway's public IP as Local Identifier. User can adjust this default value to private IP by navigating to the page "SITE2CLOUD -> Setup" then clicking the button "Edit" on the site2cloud connection entry and changing the "Local Identifier" configuration.

Keyword: "no shared key found"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes:

- IKE version is mismatched

- Identifier configuration is mismatched

Suggestions:

- Verify that both VPN settings use the same IKEv2 version

- Verify that Identifier match

  - By default, Aviatrix uses gateway's public IP as Local Identifier. User can adjust this default value to private IP by navigating to the page "SITE2CLOUD -> Setup" then clicking the button "Edit" on the site2cloud connection entry and changing the "Local Identifier" configuration.

Keyword: "failed to establish CHILD_SA, keeping IKE_SA"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- IPSec alogorithm is mismatched

Suggestions:

- Verify that all IPSec algorithm parameters (i.e. Authentication/DH Groups/Encryption) match on both VPN configuration

Other troubleshooting documents
===============================

- `Support Center Site2Cloud <https://docs.aviatrix.com/Support/support_center_site2cloud.html>`_

- `Aviatrix Site2Cloud connection with IKEv1 End to End traffic Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.html>`_

.. disqus::
