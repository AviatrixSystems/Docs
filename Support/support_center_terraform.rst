.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Terraform
===========================================================================

Miscellaneous
^^^^^^^^^^^^^

* Our `Github repository <https://github.com/AviatrixSystems/terraform-provider-aviatrix>`_ has multiple branches. Please make sure that you pick the branch which matches with the version of your the software release on your Aviatrix Controller. The latest release is supported with the mainline. For example: UserConnect-3.5 branch if you are using Version 3.5 on Controller.
* If you run into timeout issues, please use the IP address of the controller instead of the hostname of the controller and let us know if that helps
* If you run into issues with terraform please turn on debug logs by doing 'export TF_LOG=TRACE' in your terminal and share the output with our support team at support@aviatrix.com
* Terraform sends all the operations to the controller at the same time and if you see any issues during large operations - try serializing the operations by setting the value for parallelism to 1. More information at  https://www.terraform.io/docs/commands/apply.html#parallelism-n
