.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Security: Egress FQDN and Firewall
===========================================================================

Why should base policies be same?
--------------------------------------

When you are using multiple Egress Filters and/or Security Policies on the same gateway, we program the rules into the gateway with a default setting for packets which don't meet your specific rules. When there are different base policies being configured, the interpretation from the admin and what has been programmed into the system might vary. To avoid this misinterpretation, we do request the users to not mix the base rules and stick with all "white lists/deny all" or all "black lists/allow all" policies/base rules


Egress FQDN Control
^^^^^^^^^^^^^^^^^^^



Firewall
^^^^^^^^

