.. meta::
   :description: AWS inter region latency measured in ms
   :keywords: Peering, AWS Peering, Encrypted Peering, AWS latency, inter region latency


===========================================================================================
AWS Inter Region Latency
===========================================================================================

AWS supports 15 regions (excluding China regions) for its services. Understanding `latency <https://www.aviatrix.com/learning/glossary/network-latency.php>`_ between 
the regions is important as performance starts to have noticeable degradation when the latency is
more than 150 - 200ms between a client and server or between two servers in two different regions. 

Below is our measurement of AWS inter region latencies measured in milliseconds. The measurement is 
done by taking an average to multiple pings. The accuracy is +/- 1ms. 


|inter_region_latency|


.. |inter_region_latency| image:: inter_region_latency_media/inter_region_latency.png
   :scale: 30%
   

.. disqus::    
