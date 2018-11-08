.. meta::
  :description: TGW Plan
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator Plan
=========================================================

TGW Orchestrator Plan workflow provides a step by step instruction to create a AWS TGW and Route Domains.

1. Attach VPC to TGW
-------------------------------------------


==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS. 
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
AWS Side AS Numbert                             Default AS number is 64512. This field currently is not used.
==========================================      ==========

.. important:: At Aviatrix TGW Orchestrator Beta release time, the access account that launches the TGW must use access key and secret key for API credentials. IAM role does not work at this time. 


2. Detach VPC from TGW
--------------------------------------------------


.. |image0| image:: transitvpc_workflow_media/aviatrix-transit-service.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: transitvpc_workflow_media/transitGw-launch.png
   :width: 2.55625in
   :height: 1.0in

.. |image2| image:: transitvpc_workflow_media/TransitGW-HA.png
   :width: 2.55625in
   :height: 1.0in

.. |image3| image:: transitvpc_workflow_media/connectVGW.png
   :scale: 50%

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :scale: 50%

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :scale: 50%

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :scale: 50%

.. disqus::
