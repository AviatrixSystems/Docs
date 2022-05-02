.. meta::
   :description: Secure Edge
   :keywords: Edge, Edge Gateway, ESXi, EaaG, Edge ZTP


=================================
Aviatrix Secure Edge FAQ
=================================

What is Aviatrix Secure Edge?
-----------------------------

Aviatrix Secure Edge has a virtual form factor that lets you deploy an Edge Gateway as a standard virtual machine (VM). It is designed to enable enterprises migrating to the cloud to integrate their on-premises footprint as spokes into the enterprise Cloud backbone. The result is secure, seamless connectivity to locations at the Edge of your network such as data centers, remote sites, provider locations, branch offices, and retail stores.

By extending the Aviatrix data plane to the Edge of the network, you can use Aviatrix Controller and Aviatrix CoPilot to manage orchestration, visibility, and operational capabilities. You can deploy an Edge Gateway using Aviatrix Controller, the VMware ESXi host server, and the VMware vSphere management console. Benefits include:

- Virtual form factor that integrates with the existing Cloud orchestration platform
- Go-to platform for all branch, off-prem, and on-prem hybrid connectivity
- Centralized control plane across on-premises and multi-cloud networks that also reduces on-premises hardware and operating costs
- Single pane of glass for visibility, monitoring, and troubleshooting from Controller
- Parity with hardware-based Edge gateway solutions
- Encrypted connectivity and routing between clouds with a private path that uses standard architecture
- Zero-touch provisioning (ZTP) that supports automated provisioning 
- High Performance Encryption (HPE) supported over public and private networks for AWS and Azure

What are the use cases for the Aviatrix Edge Gateway?
-----------------------------------------------------
You can deploy the Edge Gateway in an on-premises location with connectivity over a private network or as a secure gateway supporting locations at the Edge of your network. 

This diagram illustrate Edge Gateway deployed in a private network.

|secure_edge_private_network|

This diagram illustrate Edge Gateway deployed in a public network.

|secure_edge_public_network|

What are the requirements to run the Edge Gateway?
--------------------------------------------------

Secure Edge 1.0 requires Aviatrix Controller 6.7. For additional requirements, refer to the Prerequisites section in `Deploying Aviatrix Secure Edge 1.0 for VMware ESXi <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html>`_.

How do I deploy Secure Edge?
----------------------------

If you are using VMware ESXi to deploy the virtual machine, follow the workflow in `Deploying Aviatrix Secure Edge 1.0 for VMware ESXi <http://docs.aviatrix.com/HowTos/secure_edge_workflow.html>`_.


.. |secure_edge_private_network| image:: CloudN_workflow_media/secure_edge_private_network.png
   :scale: 40%

.. |secure_edge_public_network| image:: CloudN_workflow_media/secure_edge_public_network.png
   :scale: 40%

.. disqus::
