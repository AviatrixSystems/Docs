

###################################
FlightPath
###################################

FlightPath is a troubleshooting tool. It retrieves and displays, in a side by side fashion, cloud provider's network related information such as Security Groups, 
Route table and route table entries and network ACL. This helps you to identify connectivity problems.

What you need
--------------

You do not need to launch Aviatrix gateways to use this tool, but you need to create Aviatrix accounts 
so that the Controller can use the account credentials to execute cloud provider's APIs to retrieve relevant information.

 

How to use it
-----------------

Click on the FlightPath icon on the onboarding page or Troubleshooting -> FlightPath.

Select the Source side cloud type, account, region, vpc name and click one instance. 
Optionally, Do the same for the Destination side. 

Run a FlightPath Test. A report will appear. The information is arranged in three sections: Security Groups, Route table entries and Network ACL. The Security Group is what is associated with the instance, and both the route table and the Network ACL are associated with the subnet that the instance is deployed. 



Example
--------

Here is one example to show how FlightPath works. Say a developer from BusinessOps account filed a ticket that says one instance called “DevOps Server” in the Oregon region cannot run “ssh” into the Prod instance in the California region.

From the Controller browser console, click FlightPath under Troubleshooting on the navigation menu. Specify the above info and you’ll see something like the screenshot below. The highlights on each panel are the instances in question. Note the DevOps Server has IP address 10.10.0.121.

|image0|

Now run a FlightPath Test and you’ll see the FlightPath Report.

First, check the routing table, which shows good connectivity:

|image1|

Scroll up and down the FlightPath Report to check other fields. Next check the Security Group. And of course, the California Prod instance does not have its “ssh” port open to the Oregon DevOps instance IP address 10.10.0.121.

|image2|

Problem solved in minutes!

Upon further inspection, you’ll notice that the complaining instance has a “ssh” open to the entire world. You may need to notify the ticket issuer to reduce the source address scope.



.. |image0| image:: flightpath_media/FlightPath1.png
   :width: 5.55625in
   :height: 3.26548in

.. |image1| image:: flightpath_media/routetablecheck.png
   :width: 5.55625in
   :height: 3.26548in

.. |image2| image:: flightpath_media/securitygorupcheck.png
   :width: 5.55625in
   :height: 3.26548in

.. disqus::
