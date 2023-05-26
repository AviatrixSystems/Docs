

==================
Aviatrix Secure Edge FAQ
==================

What is Aviatrix Secure Edge?
----------------------

The Aviatrix Secure Edge solution enables enterprises to extend the Cloud operational model to the edge network for consistent and repeatable architecture, management, visibility, security, and control. This cloud-out architecture enables enterprises to leverage the Aviatrix platform ubiquitous support for edge connectivity. The result is secure, seamless connectivity to edge locations such as data centers, co-locations, remote sites, provider locations, branch offices, and retail stores.

Benefits of the Aviatrix Secure Edge solution include:

- Go-to platform for all hybrid connectivity

- Centralized Control Plane across multi-cloud networks and edge locations resulting in reduced hardware and operating costs

- Single pane of glass for visibility, monitoring, and troubleshooting from Aviatrix Controller and Aviatrix CoPilot

- Encrypted connectivity and routing between multi-cloud networks with a private path that uses standard architecture

- High Performance Encryption (HPE) support over public and private networks 

- Zero-touch provisioning (ZTP) for automated Edge deployments

- Available in multiple form factors to support various edge requirements


Aviatrix Secure Edge solution is offered in VMware ESXi and KVM form factors that lets you deploy an Edge Gateway with spoke gateway capabilities at the edge network. 

Aviatrix Secure Edge features include:  

- High-availability active-active and active-standby mode for Edge Gateways at the same site location

- High Performance Encryption over private and public network for AWS, Azure, OCI and over private network for GCP

- Non-HPE over private and public network on Edge to Transit Gateway connection

- Custom SNAT and DNAT (A/S) on Edge to Transit Gateway connection

- Network Segmentation

- Transitive Routing

- FireNet traffic inspection


Aviatrix Secure Edge is supported on Aviatrix Controller version 6.8 onwards.

For more information about Aviatrix Secure Edge use case scenarios, see `What are the use cases for Aviatrix Secure Edge?`_.

For additional requirements and deployment workflow, see `Deploying Aviatrix Secure Edge <http://docs.aviatrix.com/HowTos/edge-2.0-workflow.html>`_.


What are the use cases for Aviatrix Secure Edge?
------------------------------------------------

The following are examples of Aviatrix Edge use cases.

-       `Extend Aviatrix Cloud Networking to Edge Locations`_

-	`Multi-Cloud Connectivity Using Aviatrix Secure Edge`_

-	`Aviatrix Secure Edge Connectivity over Private Network`_

-	`Aviatrix Secure Edge Connectivity over Public Network`_


Extend Aviatrix Cloud Networking to Edge Locations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This diagram illustrates Aviatrix Edge Gateways deployed at multiple edge locations.

|edge_usecase_edge_location|

Multi-Cloud Connectivity Using Aviatrix Secure Edge
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This diagram illustrates Aviatrix Edge Gateway deployed as the primary path for the multi-cloud connectivity and transit peering over the Internet for the backup path.

|edge_usecase_multi_cloud|


Aviatrix Secure Edge Connectivity over Private Network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This diagram illustrates Aviatrix Edge Gateway deployed in a private network.

|edge_private_network|

Aviatrix Secure Edge Connectivity over Public Network
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This diagram illustrates Aviatrix Edge Gateway deployed in a public network.

|edge_public_network|





.. |edge_usecase_edge_location| image:: CloudN_workflow_media/edge_usecase_edge_location.png
   :scale: 50%


.. |edge_usecase_multi_cloud| image:: CloudN_workflow_media/edge_usecase_multi_cloud.png
   :scale: 40%

.. |edge_private_network| image:: CloudN_workflow_media/edge_private_network.png
   :scale: 50%

.. |edge_public_network| image:: CloudN_workflow_media/edge_public_network.png
   :scale: 50%


.. disqus::
