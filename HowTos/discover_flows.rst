.. meta::
   :description: Discover unencrypted flows in a VPC
   :keywords: AWS VPC, VPC flow log, unencrypted traffic

###################################
Discover Unencrypted Traffic
###################################

(AWS Only) Not all the application instances in an AWS VPC run on TLS protocol. The `DevOps Tools Survey <https://docs.aviatrix.com/HowTos/opstools_survey.html>`_ shows that the majority of the DevOps tools are not encrypted. 

The Discover Unencrypted Flows tool applies to an AWS VPC. 

The tool leverages the AWS VPC flow log to discover all traffic sent and received by instances in the VPC via VPC flow log. The tool then 
downloads the VPC flow log files
and displays them. When you run the tool, it enables VPC flow log in the specified VPC, region and account; it also creates an S3 bucket to 
store the flow log files. After the tool receives the first batch of flow log files, it returns the findings and also disables the VPC flow log and 
removes the S3 bucket created.

Traffic sessions that destined to TCP port 443 (HTTPS) and TCP port 22 (SSH) are excluded from the display. 

Note traffic that runs on UDP port 500/4500 are known as IPSEC protocol and as such is indeed encrypted, but the tool displays them. 

The tool typically takes 5 - 6 minutes to complete.


.. |edit-designated-gateway| image:: gateway_media/edit-designated-gateway.png
   :scale: 50%

.. disqus::
