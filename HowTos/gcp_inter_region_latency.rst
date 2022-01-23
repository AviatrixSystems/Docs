.. meta::
   :description: Google Cloud inter region latency measured in ms
   :keywords: Peering, Google Peering, Encrypted Peering, Google latency, inter region latency, GCP


===========================================================================================
Google Cloud Inter Region Latency
===========================================================================================

Google Cloud supports 18 regions for its cloud services. Understanding latency between 
the regions is important as performance starts to have noticeable degradation when the latency is
more than 150 - 200ms between a client and server or between two servers in two different regions. 

Below is our measurement of Google Cloud inter region latencies measured in milliseconds as of **December 2018**. 
The measurement is done by taking an average to multiple pings. The accuracy is +/- 1ms.


|gcp_inter_region_latency|


.. |gcp_inter_region_latency| image:: gcp_inter_region_latency_media/gcp_inter_region_latency.png
   :scale: 30%
   

Please note that **the most up to date information** for the above is now available as a part of the `Network Intelligence, Performance Dashboard feature <https://cloud.google.com/network-intelligence-center/docs/performance-dashboard/concepts/overview#latency>`_.

.. disqus::    
