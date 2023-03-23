
###################################
VPC Tracker
###################################

The VPC Tracker collects and helps you manage your network CIDR ranges at a central place. This feature eliminates the need to keep an Excel sheet on 
all your AWS VPC/Azure VNet network address allocations. 

No gateway launches are required. 

1. First, add all your other accounts for `AWS <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_ and `Azure <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html>`_ to the Controller. The VPC Tracker will retrieve the information. 
2. To see what the VPC Tracker has recorded, select Useful Tools > VPC Tracker on the left sidebar. 

If you are not seeing all of your VPC/VNets, click refresh to have the VPC tracker search for unfound VPCs. Click **OK**. Refreshing may take some time depending on the number of VPCs and Accounts on your Controller. 

Currently, the VPC Tracker can record network CIDRs in AWS, Azure, Site2Cloud remote network CIDRs, and Transit Network on-prem CIDRs. All VPCs and VNets with at least one instance will be displayed.

The VPC Tracker auto-updates once a day and will only list VPC/VNets which have at least one instance deployed in them. You can conduct an on-demand update by clicking the refresh button. 

If you are planning to `create a new VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_, you can first check CIDR overlap by entering the CIDR block and click **Test**. The result displays the overlapping CIDRs for your reference. 

.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
