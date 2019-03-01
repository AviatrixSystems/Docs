.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
AWS Infrastructure
===========================================================================


Disk resize for Gateway
^^^^^^^^^^^^^^^^^^^^^^^

* Login to AWS console and locate the Aviatrix gateway instance
* Click on Root device: /dev/sda1 and then click on EBS ID vol-xxxxxxxxxx.
* With the volume selected, click Action > Modify Volume to change the Disk Size
* Click OK to start the resize process. Please make sure you wait until the State of the volume is "in-use - completed (100%)".
* Select the Aviatrix gateway instance in EC2 page. Click Reboot for the disk space to take effect. This will cause down time (< 5 minutes) due to the reboot process.
* Confirm the gateway is in running state in AWS console.
* Login to your controller to run gateway diagnostics and submit to us. Please also upload the gateway `tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_ to us.
  
Saving an EIP on a Gateway
^^^^^^^^^^^^^^^^^^^^^^^^^^

* When creating a new Gateway the default option for “Allocate New EIP” is on – this would mean that the Aviatrix Controller would check out a new EIP from AWS Infrastructure. If this gateway is deleted, the Controller will release this EIP to the AWS Infrastructure. If you expect to keep the EIP in future, it is recommended that "Allocate New EIP" option is unchecked and an available EIP is picked during the Gateway creating process.
* If you are having issues with the Gateway and would like a new Gateway to replace the existing one and with the same EIP, the best way to do this is to via “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Gateway Replace” 
* If you want to transfer the EIP from one Aviatrix Gateway to another one, please follow the following steps (Example: GatewayA-EIPA, GatewayB-EIPB. Move EIPA to GatewayB) **Note: Only supported in releases 4.0 and up. Using this for release 3.5 and lower will result in loss of EIP:** 
 
    * From AWS Console, create a new EIP (Continuing the example: call this EIP-new)
    * From Aviatrix Controller, go to “Controller GUI / Troubleshoot / Diagnostics / Gateway Tab / Migration” and pick the Gateway that you want to pick the EIP from and enter this new-EIP and click on OK. (Pick GatewayA and enter EIP-new. This will release EIPA)
    * On the Aviatrix Controller, on the same page, pick the Gateway that you want to receive the old EIP and enter the old-EIP. (Example: Pick Gateway B and enter EIPA. This will release EIPB)
      
Encrypting an EBS Volume on Controller/Gateway
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

* AWS does not allow EBS encryption during instance launch time. Follow instructions for `Controller <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-controller-ebs-volume>`_ and `Gateway <https://docs.aviatrix.com/HowTos/FAQ.html#encrypt-gateway-ebs-volume>`_

