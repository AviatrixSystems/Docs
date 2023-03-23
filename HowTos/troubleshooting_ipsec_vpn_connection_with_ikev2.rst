
================================================
Troubleshooting IPsec VPN connection with IKEv2
================================================

This article describes how to troubleshoot IPsec VPN connection with IKEv2 on Aviatrix gateway.

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

- Follow the next step to view logs if needed
  
Troubleshoot the keyword in the Diagnostics Action "Show logs"
--------------------------------------------------------------

- Go to SITE2CLOUD -> Diagnostics

- Select the related information for VPC ID/VNet Name, Connection, and Gateway

- Select the option "Show logs" under Action and click the button "OK"

- Review the logs on the prompt panel

- Compare your logs with the successful example logs as below

|IKEv2_show_log|

- Attempt to locate the keyword or failure message during IKEv2/IPsec negotiation. Here are some examples of negotiation failure and hint to fix or troubleshoot it further:

  - `Keyword: "Error: Failed to deliver message to gateway"`_
  
  - `Keyword: "establishing IKE_SA failed, peer not responding"`_
  
  - `Keyword: "NO_PROPOSAL_CHOSEN"`_

  - `Keyword: "AUTHENTICATION_FAILED"`_
  
  - `Keyword: "no shared key found"`_
  
  - `Keyword: "failed to establish CHILD_SA, keeping IKE_SA"`_

Keyword: "Error: Failed to deliver message to gateway"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Aviatrix Controller cannot reach to gateway

Suggestions:

- Refer to `Aviatrix Gateway Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_gateway.html>`_

Keyword: "establishing IKE_SA failed, peer not responding"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Peer IP address is mismatched, or peer IP address is not reachable

- UDP Port 500/4500 is not accessible

Suggestions:

- Troubleshoot connectivity between Aviatrix gateway and peer VPN router

Keyword: "NO_PROPOSAL_CHOSEN"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- Peer IP address is mismatched, or peer IP address is not reachable

- IKE version is mismatched (one VPN gateway uses IKEv1 and another one uses IKEv2)

- IKEv2 algorithm is mismatched

- IPsec algorithm  is mismatched

Suggestions:

- Troubleshoot connectivity between Aviatrix gateway and peer VPN router

- Verify that both VPN settings use the same IKEv2 version

- Verify that all IKEv2/IPsec algorithm parameters (i.e., Authentication/DH Groups/Encryption) match on both VPN configuration

Keyword: "AUTHENTICATION_FAILED"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- IKE version is mismatched (one VPN gateway uses IKEv1 and another one uses IKEv2)

- pre-shared key is mismatched

- Identifier configuration is mismatched

Suggestions:

- Verify that both VPN settings use the same IKEv2 version

- Verify that pre-shared key match on both VPN configuration

- Verify that Identifier match

  - By default, Aviatrix utilizes gateway's public IP as Local Identifier.
  
Keyword: "no shared key found"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes:

- IKE version is mismatched (one VPN gateway uses IKEv1 and another one uses IKEv2)

- Identifier configuration is mismatched

Suggestions:

- Verify that both VPN settings use the same IKEv2 version

- Verify that Identifier match

  - By default, Aviatrix utilizes gateway's public IP as Local Identifier.

Keyword: "failed to establish CHILD_SA, keeping IKE_SA"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Probable Causes: 

- IPsec algorithm is mismatched

Suggestions:

- Verify that all IPsec algorithm parameters (i.e., Authentication/DH Groups/Encryption) match on both VPN configuration

Other troubleshooting documents
===============================

- `Support Center Site2Cloud <https://docs.aviatrix.com/Support/support_center_site2cloud.html>`_

- `Aviatrix Site2Cloud connection with IKEv1 End to End traffic Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.html>`_

.. |IKEv2_show_log| image:: site2cloud_media/IKEv2_show_log.png
   :scale: 50%

.. disqus::
