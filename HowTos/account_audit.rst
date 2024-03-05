

=================================
Account Audit 
=================================

The Aviatrix Controller periodically checks the accounts it manages to make sure they are intact. 

For AWS Account Audit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 1. The Controller instance's IAM role aviatrix-role-ec2 is attached to the instance. 
 #. The Controller instance's IAM role aviatrix-role-app exists.
 #. An access account IAM role aviatrix-role-ec2 exists.
 #. An access account IAM role aviatrix-role-app exists.
 #. An access account IAM role aviatrix-role-ec2 has associated policies.
 #. An access account IAM role aviatrix-role-app has associated policies.
 #. An access account has trust relationship to the primary account (the Controller's AWS account).
 #. An access account has an expired, deleted, or invalid credential.

If any of the above condition fails, the Controller sends out alert email and logs the event. In addition, the controller will also send alert email on behalf of any of the above condition failures reported by a gateway upon the first detection and subsequently every 24 hours until the problem is rectified.

Note the event requires immediate attention; otherwise, it can lead to catastrophic operation outage. Go through the above
conditions to repair the configuration.

If you need help, please open a support ticket at the `Aviatrix Support Portal <https://support.aviatrix.com>`_.


.. Note::

  - Account auditing does not work with the new enhancement "customized IAM role name" in 6.4. In the current design, the account auditing feature looks for the Aviatrix standard IAM role names, which are aviatrix-role-app and aviatrix-role-ec2 and the Aviatrix standard policy name, which is aviatrix-app-policy.

  - The account auditing feature also does not work if the IAM app role has more than one policy attached because only the first policy is used.

..



.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::

For Azure Account Audit
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


For the Azure account audit, the process audits the authentication details against the established Azure account credential setups. If the account audit fails, check the account authentication setups. See details in `Azure Account Credential Setup <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_.
