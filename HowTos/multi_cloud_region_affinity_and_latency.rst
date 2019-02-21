.. meta::
   :description: Multi cloud region affinity and latency measured in ms
   :keywords: AWS, Azure, Google, Multi Cloud, Latency 


===========================================================================================
Multi Cloud Region Affinity and Latency
===========================================================================================

AWS, Azure and GCP all are available in many regions. If you need to expand your cloud deployment to a different cloud, you
should consider region affinity, that is, select a region of the second cloud that is closest to your current region deployment. 

This is a good idea even if you do not need inter cloud connectivity at the moment, because you may need it later and nothing
beats minimum latency when it comes to networking and application performance. 

For example, if your AWS deployment is in us-east-2 (Ohio), you may think Azure Central US (Illinois) is a good region to deploy.
It turns out Azure East US 1 has better latency, at 12ms. The next best region is Azure East US 2, with 16ms latency. 

Below is a table that suggests the two best regions in Azure or GCP for a few given AWS regions. 

==========================================      ===================================     =============================
**AWS Region**                                  **Azure Affinity Region Latency**       **GCP Affinity Regions**
==========================================      ===================================     =============================
us-east-1 (Virginia)                            East US 1 (Virginia), 1.868ms           us-east4 (Virginia), 1.9ms
                                                -----------------------------------     -----------------------------
                                                East US 2 (Virginia), 6.01ms            us-east1 (Carolina), 14.14ms
==========================================      ===================================     =============================



+------------------------+-------------------------------------------------------------------------+
| **AWS Region**         | **Azure Affinity Region Latency**    | **GCP Affinity Regions**         |
+========================+======================================+==================================+
| us-east-1 (Virginia)   | East US 1 (Virginia), 1.868ms        | us-east4 (Virginia), 1.9ms       |
+------------------------+-------------------------------------------------------------------------+
|                        | East US 2 (Virginia), 6.01ms         | us-east1 (Carolina), 14.14ms     |
+------------------------+-------------------------------------------------------------------------+
| us-east-2 (Ohio)       | 1111111111                           |     2222222222                   |
+------------------------+-------------------------------------------------------------------------+
|                        | 3333333333                           |     4444444444                   |
+------------------------+-------------------------------------------------------------------------+
| us-west-1 (California) | 5555555555                           |     6666666666                   |
+------------------------+-------------------------------------------------------------------------+
|                        | 7777777777                           |     8888888888                   |
+------------------------+-------------------------------------------------------------------------+
| us-west-2 (Oregon)     | 0000000000                           |     9999999999                   |
+------------------------+-------------------------------------------------------------------------+
|                        | 2222222222                           |     3333333333                   |
+------------------------+-------------------------------------------------------------------------+





.. |gcp_inter_region_latency| image:: gcp_inter_region_latency_media/gcp_inter_region_latency.png
   :scale: 30%
   

.. disqus::    
