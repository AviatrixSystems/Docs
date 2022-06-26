.. meta::
   :description: Documentation for associating CoPilot with controller
   :keywords: CoPilot, association

###################################
CoPilot
###################################
This document describes the **CoPilot** configurations under Settings in Aviatrix Controller.

CoPilot Association
===========================
When “Status” is enabled, the CoPilot with the "IP Address/Hostname" you specify is associated with the Controller. 


**IP Address/Hostname**

Enter the public or private IP address of your CoPilot instance.

The IP address specified here is used for connectivity between the controller and CoPilot for intra-platform communication (such as API message exchanges). 

If Copilot is located in the same VPC/VNet as your controller, specifying a private IP can increase bandwidth and potentially save on cost. 

 
**Public IP (Optional)**

If you specified the private IP address of your CoPilot instance in "IP Address/Hostname", you can optionally enter the public IP address of your CoPilot instance here. The public IP address is used for external administration access to CoPilot, used for switching between Controller and CoPilot (for your browser to open a new tab when opening CoPilot from the Controller app icon). If this field is blank, the IP address specified in “IP Address/Hostname” is used for administration access to CoPilot.


    |image0|

.. |image0| image:: CoPilot_media/image0.png
   :scale: 30%

.. disqus::
