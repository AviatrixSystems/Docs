.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Security: Egress FQDN Control and Firewall
===========================================================================

Why should base policies be same?
--------------------------------------

When you are using multiple Egress Filters and/or Security Policies on the same gateway, we program the rules into the gateway with a default setting for packets which don't meet your specific rules. When there are different base policies being configured, the interpretation from the admin and what has been programmed into the system might vary. To avoid this misinterpretation, we do request the users to not mix the base rules and stick with all "white lists/deny all" or all "black lists/allow all" policies/base rules


Should I use Black lists or White lists for Egress FQDN Control?
----------------------------------------------------------------------------

White lists should specifically be used for access to applications or access to servers. If you are browsing the WEB/internet, then you should be using black lists since a lot of webpages refer or load content from other websites, or use Discovery feature to discover the websites you are surfing and use that to configure your white lists https://docs.aviatrix.com/HowTos/fqdn_discovery.html


Which policies are executed first - egress or firewall?
----------------------------------------------------------------------------

The policies for 80/443 are executed first followed by the other policies
