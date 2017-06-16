.. meta::
   :description: How to troubleshoot for Aviatrix
   :keywords: Avaitrix troubleshooting, upload log, packet capture, encrypted peering, AWS VPC

###################################
Troubleshoot
###################################

There are several ways to troubleshoot and debug errors with Aviatrix.

Upload tracelog
--------------------

On the controller console left side menu, click Troubleshoot, click Logs, select a gateway at Upload Tracelog. The controller and gateway tracelog will be uploaded to Aviatrix. The Aviatrix support team will be alerted. If no gateway is selected, only controller log is uploaded.

Run diagnostics on a gateway
----------------------------

Troubleshoot->Diagnostics->Diagnostics, select a gateway to run diagnostics. Click run. When it finishes, click Show to display on the console. Click Submit to send the diagnostics result to Aviatrix support team.

The diagnostics test if the gateway is reachable and its services are up and running.

Debug peering tunnel status
--------------------

Click Peering on the console. click Diag on each peer pair and run various tests.

Debug Site2Cloud tunnel status
-----------------------

Click Site2Cloud on the console. Click Diagnostics.

Debug gateway connectivity
--------------------------

To test if a gateway can reach certain IP or host,
click Troubleshoot->Diagnostics. At Network Connectivity Utility panel, select a gateway. Specify remote host name, port number. The TCP protocol test is reliable. Currently UDP test is not reliable.

Packet capture
---------------

Click Troubleshoot->Diagnostics. At Packet Capture panel, select a gateway where you wish to do packet capture. You can further filter on Host and Port number. Click Start to start the capture, click Stop to stop the capture, then click Download to download the pcap file. You can also specifiy capture time. The pcap file can be viewed by Wireshark.

DNS Error
----------
If you see DNS related error on the controller console, check your VPC/VNet DNS setting. It is possible that the controller or gateway does not have connectivity to the DNS server.

If your DNS server is located on-prem, make sure the VPC/VNet where controller is launched has connection to reach the private DNS server.

Error Messages
---------------

If you see error message like below when you launch an Azure ARM gateway:

::

**Error message:** 'Legal terms have not been accepted for this item on this subscription. To accept legal terms, please go to the Azure portal ..... and configure programmatic deployment for the Marketplace item or create it there for the first time'

Chances are you have not subscribed to Aviatrix gateway during Azure onboarding process. Either go back to onboarding page and follow the instructions there, or click `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/How+to+subscribe+to+Aviatrix+companion+gateway.pdf>`__ for guidance.  


.. add in the disqus tag

.. disqus::
