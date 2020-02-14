.. meta::
   :description: controller Migration
   :keywords: controller high availability, controller HA, AWS VPC peering, auto scaling

Controller Migration in AWS
================================

Controller Migration feature does the following in sequence. 

 1. Auto backup the current Controller.
 #. Launch a new and latest version Controller in the same account and go through the initialization.
 #. Restore the configuration to the new Controller.
 #. Disassociate the EIP and associate it to the new Controller. 

.. disqus::
