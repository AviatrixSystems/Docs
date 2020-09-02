.. meta::
   :description: Discover unencrypted flows in a VPC
   :keywords: AWS VPC, VPC flow log, unencrypted traffic

###################################
Discover Unencrypted Traffic
###################################

This useful tool applies to an AWS VPC. It typically takes 5 - 6 minutes to complete. 

The tool leverages AWS VPC flow log to discover all traffic sent and received by instances int the VPC, it then download the VPC flow log files
and display them. When you run the tool, it enables VPC flow log in the specified VPC, region and account, it also creates a S3 bucket to 
store the flow log files. Once the tool receives the first batch of flog log files, it disable vpc flow log, removes the S3 bucket created
return the findings. 

Traffic sessions that destined to TCP port 443 (HTTPS) and TCP port 22 (SSH) are excluded from the display. 

Not traffic that runs on UDP port 500/4500 are known as IPSEC protocol and as such is indeed encrypted, but the tool displays them. 


.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
