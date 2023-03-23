
###################################
Troubleshoot
###################################

There are several ways to troubleshoot and debug errors within Aviatrix.

Upload tracelog
--------------------

On the controller console left side menu, click Troubleshoot, click Logs and select a gateway at Upload Tracelog. The controller and gateway tracelog will be uploaded to Aviatrix. The Aviatrix support team will be alerted. If no gateway is selected, only the controller log is uploaded.

Run diagnostics on a gateway
----------------------------

Troubleshoot->Diagnostics->Gateway->Diagnostics, select a gateway to run diagnostics. Click run. When it finishes, click Show to display on the console. The diagnostics test if the gateway is reachable and its services are up and running. 
Please refer to the `Service Description of Diagnostic Result <http://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`__.

If you could not determine the root cause based on the diagnostics, click Submit to send the diagnostics result to Aviatrix support team.

Debug peering tunnel status
-----------------------------

Click Peering on the console. click Diag on each peer pair and run various tests.

Debug Site2Cloud tunnel status
---------------------------------

Click Site2Cloud on the console. Click Diagnostics.

Debug gateway connectivity
--------------------------

To test if a gateway can reach a certain IP or host,
click Troubleshoot->Diagnostics->Network. At Network Connectivity Utility panel, select a gateway. Specify the remote host name, port number. The TCP protocol test is reliable. Currently UDP test is not reliable.

Network Traceroute
-------------------

You can run a traceroute function from a selected Aviatrix gateway to test reachability 
from this gateway to any destination. Go to Troubleshooting -> Network. Scroll down to TRACEROUTE UTILITY. Enter a destination IP or host name and select a gateway and, click Trace Route. The Trace Route
results should be displayed when the execution finishes. 

.. tip::
 
   You can launch an Aviatrix gateway in a specific VPC and public subnet and use it as an EC2 instance to test connectivity to a destination host or IP address. For example, launch an Aviatrix gateway in a Spoke VPC (where the Spoke VPC gateway is launched from the `Transit Network Workflow <http://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`_). When you select this test gateway for Trace Route testing, you are effectively testing connectivity going from an EC2 -> Spoke VPC GW -> Transit GW -> VGW -> on-prem network.


Packet capture
---------------

Click Troubleshoot->Diagnostics->Network. At the Packet Capture panel, select a gateway where you wish to do packet capture. You can further filter on Host and Port number. Click Start to start the capture, click Stop to stop the capture, then click Download to download the pcap file. You can also specify capture time. The pcap file can be viewed by Wireshark.

DNS Error
----------
If you see a DNS related error on the controller console, check your VPC/VNet DNS setting. It is possible that the controller or gateway does not have connectivity to the DNS server.

If your DNS server is located on-prem, make sure the VPC/VNet where controller is launched has connection to reach the private DNS server.

.. disqus::
