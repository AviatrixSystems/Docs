.. meta::
   :description: Google Cloud inter region latency measured in ms
   :keywords: Peering, Google Peering, Encrypted Peering, Google latency, inter region latency, GCP


===========================================================================================
Google Cloud Inter Region Latency
===========================================================================================

Google Cloud supports 18 regions for its cloud services. Understanding latency between 
the regions is important as performance starts to have noticeable degradation when the latency is
more than 150 - 200ms between a client and server or between two servers in two different regions. 

Below is our measurement of Google Cloud inter region latencies measured in milliseconds. 
The measurement is done by taking an average to multiple pings. The accuracy is +/- 1ms.


|gcp_inter_region_latency|


.. |gcp_inter_region_latency| image:: gcp_inter_region_latency_media/gcp_inter_region_latency.png
   :scale: 30%
   

.. disqus::    
