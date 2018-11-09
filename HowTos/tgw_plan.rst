.. meta::
  :description: TGW Plan
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator Plan
=========================================================

TGW Orchestrator Plan workflow provides a step by step instruction to create a AWS TGW and Route Domains.

1. Create AWS TGW
-------------------------------------------

This step creates a TGW in a specified region with a specified AWS account, it also creates a Shared_Service_Domain and Aviatrix_Edge_Domain. 

The Default_Domain is automatically created when a TGW is created. 

The Shared_Service_Domain is meant for VPCs that deploy common tools, such as DevOps tools, logging tools and monitoring tools. 

The Aviatrix_Edge_Domain is meant for a Transit VPC where Aviatrix gateways are deployed to connect on-prem over Direct Connect/Internet or other region TGW clusters. 

The Default_Domain is automatically connected to both Shared_Service_Domain and Aviatrix_Edge_Domain.

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS. 
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
AWS Side AS Numbert                             Default AS number is 64512. This field currently is not used.
==========================================      ==========

.. important:: At Aviatrix TGW Orchestrator Beta release time, the access account that launches the TGW must use access key and secret key for API credentials. IAM role does not work at this time. 


2. Create Security Domain
--------------------------------------------------

This step allows you to create a custom Route Domain, or a Security Domain, where instances in VPCs attached to this domain can 
communicate with either through associated TGW. In addition, at domain creation time you can also specify the other domains this
domain can connect with. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
Security Domain Name                            Specify a unique domain name. For example, Dev_Domain..
Connect to Security Domains                     This is a multi select field. Highlight one or a few from the drop down menu. 
==========================================      ==========


3. (Optional) Enable Aviatrix Transit Gateway Interface to TGW 
---------------------------------------------------------------

This step designates an Aviatrix Transit GW to TGW. This is required when you like to connect any Spoke VPC to on-prem over Direct Connect or Internet. 

Before you configure this step, make sure you have launched an Aviatrix Transit GW by following `the Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, Step 1, 2 and 3. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Gateway Namen                                   Select a Transit GW from the drop down menu. 
==========================================      ==========


4. (Optional) Disable Aviatrix Transit Gateway Interface to TGW
------------------------------------------------------------------

This step removes the designation of an Aviatrix Transit GW from TGW Orchestrator. 

5. Delete Security Domain
---------------------------

This step delete a security domain created in Step 2. 

6. Delete AWS TGW
------------------

This step delete the TGW created in Step 1. 


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
