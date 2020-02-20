.. meta::
   :description: VPC Network CIDR Management Tool
   :keywords: Aviatrix VPC Tracker, AWS VPC

###################################
VPC Tracker
###################################

VPC Tracker is a tool that collects and helps you manage your network CIDR ranges at a central place, eliminating the need to keep an Excel sheet on 
all your VPC network addresses allocations. 

No gateway launches are required. Start by logging into your controller and going into the dashboard. Once in the dashboard in the upper right corner of the map uncheck the option Only show AVX gateways then add all your `other AWS accounts <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_ on the Controller, and VPC Tracker will retrieve the information. To see what the VPC tracker has recorded please go to your menu and then select Usefull Tools >> VPC Tracker. If you are not seeing all of your VPC's please click on the refresh button and this will have the VPC tracker search for unfound VPCs. When you do this please select OK in the pop menu and understand this may take some time depending on the number of VPCs and Accounts on your controller. 

Currently, VPC Tracker can record network CIDRs in AWS, Azure, Site2Cloud remote network CIDRs and Transit Network on-prem CIDRs. All VPCs with at least 1 instance will be displayed

VPC Tracker auto updates once a day and will only list VPC's which have at least one instance deployed in them. You can conduct an on-demand update by clicking the refresh button. 

If you are planning to `create a new VPC <https://docs.aviatrix.com/HowTos/create_vpc.html>`_, you can first check CIDR overlap by entering the CIDR block and click Test. The result displays the overlapping CIDRs for your reference. 




.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
