.. meta::
  :description: TGW Plan
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network


=========================================================
TGW Orchestrator Plan
=========================================================

TGW Orchestrator Plan is the first stage in deploying a Transit Network using TGW. 

For background information, refer to `TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

In the planning stage, think about what network segmentation you need to achieve. For example, do you need to segment Dev/QA VPCs 
from your Prod VPCs, i.e., no connectivity is allowed between these VPCs in each group?

If you have not decided, no worries, proceed to build a full mesh network. You can modify your plan later.   


TGW Orchestrator Plan workflow provides a step by step instruction to define and setup your policies.


1. Create AWS TGW
-------------------------------------------

In order to use TGW service, you must first create a TGW. 

This step creates a TGW in a specified region with a specified AWS account, the Aviatrix Controller also automatically creates 
the `Default_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_, the `Shared_Service_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_ and the `Aviatrix_Edge_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-aviatrix-edge-domain>`_. 


==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS. 
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
AWS Side AS Numbert                             Default AS number is 64512. This field currently is not used.
==========================================      ==========

.. important:: 

  At Aviatrix TGW Orchestrator Beta release time, the access account that launches the TGW must use access key and secret key for API credentials. IAM role does not work at this time. 


2. Plan Your Deployment
--------------------------------------------------

The default selection is to build a `full mesh network. <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html#Full-mesh-network-design>`_ If this is your choice, no action is required, move to the next step. 

If you plan to build a segmented network, select the "Build a Segmented Network". More fields will be popped up to fill. 

When planning for a segmented network, you need to create Security Domains where Spoke VPCs in a Security Domain can communicate with each other. Spoke VPCs in different Security Domains cannot communicate with each other unless you specify a policy to connect the two domains. 

This step defines and creates a new custom `Security Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#What-is-a-Security-Domain>`_, it also specifies connection policy to other domains. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
Security Domain Name                            Specify a unique domain name. For example, Dev_Domain.
Connect to Security Domains                     This is a multi select field. Highlight one or a few from the drop down menu. If this domain requires hybrid connection, select Aviatrix_Edge_Domain. If this domain requires Shared_Service_Domain, select Shared_Service_Domain. If there are custom defined Security Domains this new domain needs to connect to, select those Security Domains too.
==========================================      ==========


.. tip::

   The field "Connect to Security Domains" specifies a policy of this newly created Security Domain to all other Security Domains. Select multiple fields if applicable.  

3. (Optional) Enable Aviatrix Transit GW for Hybrid Connection  
---------------------------------------------------------------

This step designates an Aviatrix Transit GW to be used in conjunction with TGW. This is required when you like to connect any Spoke VPC to on-prem over Direct Connect or Internet. 

.. tip::

  Before you configure this step, make sure you have launched an Aviatrix Transit GW by following `the Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, Step 1, 2 and 3. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Gateway Namen                                   Select a Transit GW from the drop down menu. 
==========================================      ==========


4. (Optional) Disable Aviatrix Transit GW for Hybrid Connection
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
