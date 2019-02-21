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

+--------------------------+-------------------------------------+--------------------------------------------+
| **AWS Region**           | **Azure Affinity Region Latency**   | **GCP Affinity Regions**                   |
+--------------------------+-------------------------------------+--------------------------------------------+
| us-east-1 (Virginia)     | East US 1 (Virginia), 1.868ms       | us-east4 (Northern Virginia), 1.912ms      |
+--------------------------+-------------------------------------+--------------------------------------------+
|                          | East US 2 (Virginia), 6.011ms       | us-east1 (South Carolina), 14.140ms        |
+--------------------------+-------------------------------------+--------------------------------------------+
| us-east-2 (Ohio)         | East US 1 (Virginia), 11.836ms      | us-east4 (Northern Virginia), 11.512ms     |
+--------------------------+-------------------------------------+--------------------------------------------+
|                          | East US 2 (Virginia), 16.517ms      | us-east1 (South Carolina), 22.980ms        |
+--------------------------+-------------------------------------+--------------------------------------------+
| us-west-1 (California)   | West US 1 (California), 2.166ms     | us-west2 (California), 8.788ms             |
+--------------------------+-------------------------------------+--------------------------------------------+
|                          | West US 2 (Washington), 24.259ms    | us-west1 (Oregon), 24.059ms                |
+--------------------------+-------------------------------------+--------------------------------------------+
| us-west-2 (Oregon)       | West US 1 (California), 22.932ms    | us-west1 (Oregon), 13.223ms                |
+--------------------------+-------------------------------------+--------------------------------------------+
|                          | West US 2 (Washington), 10.781ms    | us-west2 (California), 27.705ms            |
+--------------------------+-------------------------------------+--------------------------------------------+
| eu-central-1 (Frankfurt) | West Europe (Netherlands), 10.665ms | europe-west3 (Frankfurt, Germany), 1.192ms |
+--------------------------+-------------------------------------+--------------------------------------------+


References:
-------------

    * `AWS Region and Location Mapping <https://docs.aws.amazon.com/general/latest/gr/rande.html>`__
    * `ARM Region and Location Mapping <https://azure.microsoft.com/en-us/global-infrastructure/locations/>`__
    * `GCP Region and Location Mapping <https://cloud.google.com/compute/docs/regions-zones/>`__



.. |gcp_inter_region_latency| image:: gcp_inter_region_latency_media/gcp_inter_region_latency.png
   :scale: 30%
   

.. disqus::    
