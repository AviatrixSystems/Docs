.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
GCP Infrastructure
===========================================================================


What are the restrictions on resource name length in GCP?
--------------------------------------------------------------

`GCP restricts the names of instances/route/firewallrules to a max of 63 characters <https://cloud.google.com/compute/docs/labeling-resources>`_. GCP adds the VPC Name in front of each route and firewall name created by default (in the default VPC). We are following the same convention for gateway naming. You might run into limitations if you use a long name. Please look into using a shorter name.


How is DNS implemented in GCP?
--------------------------------

DNS in GCP is documented at https://cloud.google.com/compute/docs/internal-dns. The default DNS nameserver for gateway instances is 169.254.169.254.
