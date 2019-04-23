.. meta::
   :description: Aviatrix Terraform Export Feature
   :keywords: AWS, Aviatrix Terraform provider, terraform, terraform provider, api


===========================================================================================
Aviatrix Terraform: Export
===========================================================================================

This document will walk you through how the Aviatrix's Terraform Export feature works.
It is assumed that the user has experience using Terraform, and has the Aviatrix Terraform
Provider set up.

To learn more about Terraform, click `here <https://www.terraform.io/intro/index.html>`_.

To learn how to set up the Terraform environment for Aviatrix, click `here <https://docs.aviatrix.com/HowTos/tf_aviatrix_howto.html>`_.

Aviatrix Terraform resource and data source documentation may be found `here <https://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_.

Further questions? Please visit our Support Center for Terraform `here <https://docs.aviatrix.com/Support/support_center_terraform.html>`_.

Use Case:
---------------------------

The Aviatrix Terraform Export feature allows users to export their current Controller
configurations (resources) into Terraform files (``.tf``) and import them into their
Terraform environment, facilitating an easy transition to using Terraform to manage
their infrastructure.

**DISCLAIMER :** Export functionality is only available on Controller v4.3+ and is
currently in beta and does not support every resource and its complete functionality.

Example:
---------------------------

In this example, we will use VPN profiles that were created through the Controller
and export them into ``.tf`` files for an easy import into our Terraform environment.

Step 1
  Assume we have the following VPN profiles already created (pictured below), prior to the transition
  to using Terraform for infrastructure management.

  |profile1_in_controller|

  |profile2_in_controller|

Step 2
  In order to bring in existing resources into the environment for Terraform management,
  we must use ``terraform import``.

  The current implementation of Terraform import
  can only import resources into the state, but does not generate a configuration file
  (see HashiCorp's documentation `here <https://www.terraform.io/docs/import/index.html>`_
  regarding this issue.)

  This is where Aviatrix's Terraform Export feature is used. We can use this
  feature to generate not only the necessary configuration files, but also a shell script
  with the necessary commands to automatically import those existing resources for you.

  Simply navigate with the sidebar: **Useful Tools** > **Export to Terraform**.
  Under the **Exporter** column, click the **Download TF** button for the corresponding
  resource(s) you want to export.

  In our case, we will select *vpn_profile* and download the zip file.

  |how_to_export|

Step 3
  Navigate to the directory where the zip was downloaded to and unzip the file.
  There should be a folder with 2 files:
    ``vpn_profile.tf`` and
    ``vpn_profile_import.sh``

  If we open ``vpn_profile.tf``, we can see that the exact configurations as seen
  on the Controller are properly exported into the ``.tf`` file.

  |profile1_tf|

  |profile2_tf|

Step 4
  For simplicity's sake, we will use this folder/ directory as the Terraform environment to manage
  our VPN profiles. If you prefer to set up your overall infrastructure differently,
  feel free to move those 2 files into your preferred directory before proceeding.

  If you have not already, create a ``provider.tf`` as seen below, providing your
  Aviatrix Controller credentials.

  (This can also be specified in the ``vpn_profile.tf``
  instead, but as best practice, it is better to decouple components, especially credentials,
  from your variable or configuration files):

  |provider_tf|

Step 5
  In your preferred directory, in order to initialise the directory as a Terraform
  environment, run: ``terraform init``.

  Then run the shell script with the command: ``sh vpn_profile_import.sh``

  |import_profile|

Step 6
  Congratulations! Your *vpn_profiles* have been successfully been imported into
  Terraform and can now be easily managed through code.

  You may verify that configured files are the same as our Controller configuration
  by running ``terraform plan`` to catch deltas between our local Terraform state
  and the Controller state. You may use ``terraform show`` to see your state.

  |verify_import1|
  |verify_import2|


.. Image Gallery References
.. |profile1_in_controller| image:: tf_export_media/profile1_in_controller.png
   :scale: 30%
.. |profile2_in_controller| image:: tf_export_media/profile2_in_controller.png
   :scale: 30%

.. |how_to_export| image:: tf_export_media/how_to_export.png
   :scale: 30%

.. |profile1_tf| image:: tf_export_media/profile1_tf.png
   :scale: 30%
.. |profile2_tf| image:: tf_export_media/profile2_tf.png
   :scale: 30%

.. |provider_tf| image:: tf_export_media/provider_tf.png
   :scale: 30%

.. |import_profile| image:: tf_export_media/import_profile.png
   :scale: 30%

.. |verify_import1| image:: tf_export_media/verify_import1.png
   :scale: 30%
.. |verify_import2| image:: tf_export_media/verify_import2.png
   :scale: 30%

.. disqus::
