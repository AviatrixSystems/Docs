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
the `Default_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_, the `Shared_Service_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-default-domain>`_ and the `Aviatrix_Edge_Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#what-is-the-aviatrix-edge-domain>`_ and the corresponding TGW route tables. . 


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


2. (Optional) Create a New Security Domain
--------------------------------------------------

This section include step 2 & 3 to plan a segmented network. 

If you plan to build a `full mesh network <https://docs.aviatrix.com/HowTos/tgw_design_patterns.html#Full-mesh-network-design>`_, skip this section. 

If you plan to build a segmented network, this step creates a new `Security Domain <https://docs.aviatrix.com/HowTos/tgw_faq.html#What-is-a-Security-Domain>`_ . 

(When planning for a segmented network, you need to create Security Domains where Spoke VPCs in a Security Domain can communicate with each other. Spoke VPCs in different Security Domains cannot communicate with each other unless you specify a policy to connect the two domains.) 


==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Region                                          One of the AWS regions
TGW Name                                        The name of the TGW
Security Domain Name                            Specify a unique domain name. For example, Dev_Domain.
==========================================      ==========

3. (Optional) Build Your Domain Connection Policies
----------------------------------------------------

This step specifies the connection relationship of one domain to others. Two connected domains imply that VPCs in 
each domain can communicate with each other despite the fact that they are in different domains.

Highlight a domain on the left panel and click Add, the domain will appears to the right, as shown below. 


|connect_domain|


4. (Optional) Setup Aviatrix Transit GW  
------------------------------------------------------------------

This section includes Step 4, 5 & 6. It sets up connection to on-prem datacenter over 
Direct Connect or Internet. 

If your deployment does not require on-prem connection, skip this section. 

Step 4 is to take a detour to setup Aviatrix Transit GW if you have not done so. Follow the `the Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_ and complete Step 1, 2 and 3. When complete, 
return to this section and continue to the next step. 

5. (Optional) Enable Aviatrix Transit GW for Hybrid Connection
---------------------------------------------------------------

This step designates an Aviatrix Transit GW to be used in conjunction with TGW. 

.. tip::

  Before you configure this step, make sure you have launched an Aviatrix Transit GW by following `the Transit Network workflow <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_, Step 1, 2 and 3. 

==========================================      ==========
**Setting**                                     **Value**
==========================================      ==========
Account Name                                    An `Aviatrix account <http://docs.aviatrix.com/HowTos/aviatrix_account.html#account>`_ that corresponds to an IAM role or account in AWS.
Gateway Namen                                   Select a Transit GW from the drop down menu. 
==========================================      ==========

6. (Optional) Attach Aviatrix Transit GW to TGW
------------------------------------------------------------------

This step attaches Aviatrix Transit VPC to TGW


7. (Optional) Disable Aviatrix Transit GW for Hybrid Connection
------------------------------------------------------------------

This step removes the designation of an Aviatrix Transit GW from TGW Orchestrator. 

5. Delete Security Domain
---------------------------

This step delete a security domain created in Step 2. 

6. Delete AWS TGW
------------------

This step delete the TGW created in Step 1. 


.. |connect_domain| image:: tgw_plan_media/connect_domain.png
   :scale: 30%

.. |image4| image:: transitvpc_workflow_media/launchSpokeGW.png
   :scale: 50%

.. |image5| image:: transitvpc_workflow_media/AttachSpokeGW.png
   :scale: 50%

.. |image6| image:: transitvpc_workflow_media/AttachMoreSpoke.png
   :scale: 50%

.. disqus::
