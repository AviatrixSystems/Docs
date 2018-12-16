.. meta::
  :description: TGW Build
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, TGW Build


=========================================================
TGW Orchestrator Build
=========================================================

At Build stage, you attach VPCs to a TGW and security domain. Each VPC can only be attached to one security domain. 

TGW Orchestrator Build workflow is a one step instruction to attach  VPC to  AWS TGW and security domain.

For background information, refer to `TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

1. Attach VPC to TGW
-------------------------------------------


==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Region                                          Select a region where TGW resides.
VPC Account                                     An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS. 
VPC Name                                        Select a VPC in the VPC Account.
TGW Account                                     Select an access account where TGW resides. 
TGW Name                                        The name of the TGW in the TGW Account. 
Security Domain Name                            Select from a drop down menu domain. 
==========================================      ==========



2. Detach VPC from TGW
--------------------------------------------------

This step detaches a VPC from a TGW and Domain. 


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
