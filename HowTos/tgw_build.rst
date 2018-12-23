.. meta::
  :description: TGW Build
  :keywords: AWS TGW, TGW orchestrator, Aviatrix Transit network, TGW Build


=========================================================
TGW Orchestrator Build
=========================================================

At Build stage, you attach VPCs to a TGW and security domain. Each VPC can only be attached to one security domain. 

TGW Orchestrator Build workflow is a one step instruction to attach  VPC to  AWS TGW and security domain.

For background information, refer to `TGW Orchestrator FAQ <https://docs.aviatrix.com/HowTos/tgw_faq.html>`_.

Before you can attach VPCs, you must have at least completed `Step 1 <https://docs.aviatrix.com/HowTos/tgw_plan.html#create-aws-tgw>`_ in Plan page. 

For example, you can attach a VPC to prod_domain created at the Plan page, as shown below. 

|prod_vpc_attach|

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


.. |prod_vpc_attach| image:: tgw_build_media/prod_vpc_attach.png
   :scale: 30%

.. disqus::
