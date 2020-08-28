.. meta::
   :description: Using AVX S2C to use VPC endpoints in different regions
   :keywords: site2cloud, endpoints, AWS Global Transit Network, Aviatrix Transit Network, RFC1918


===========================================================================================
Using Aviatrix Site2Cloud tunnels to access VPC Endpoints in different regions 
===========================================================================================

`VPC Endpoints <https://docs.aws.amazon.com/vpc/latest/userguide/vpce-interface.html>`_ in AWS allow you to expose services to customers and partners over AWS PrivateLink.
In situations where allowing resources to be accessed directly from the Internet is undesirable, VPC Endpoints can enable internal VPC connectivity to resources in other accounts.

One limitation of Endpoints is that it is a regional construct, meaning you can't use it to provide connectivity to resources across regions.  In some cases it's not possible to move these workloads.

This is where Aviatrix can help overcome that limitation.

The end design will look similar to the diagram below.

|image1|

|

Environment Requirements
---------------------------------------------------------

Three VPCs.

In this example there are 2 VPCs in US-East-1.  One customer/partner VPC(10.10.10.0/24) with an Endpoint, and our VPC(10.10.11.0/24) with an Endpoint Service tied to an internal Load Balancer.
There is 1 VPC(10.10.12.0/24) in US-East-2 that hosts our workload.

A set of Aviatrix Gateways, 2 in our VPC in US-East-1, and 2 in the workload VPC in US-East-2.
Deploying a set of HA Gateways is documented `here <https://docs.aviatrix.com/Solutions/gateway_ha.html>`_

Once deployed, a set of Site2Cloud tunnels will be built.  Documentation for building a tunnel between Aviatrix Gateways is `here <https://docs.aviatrix.com/HowTos/site2cloud_aviatrix.html>`_

They should be built in an active-passive manner to avoid asymmetric routing in AWS.




Step 1: Deploy an internal Load Balancer in AWS
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the EC2 section in the console, choose Load Balancers.

|image2|

Choose Network Load Balancer

|image3|

Give the LB a name, choose internal, program a listening port for your workload(80 for this test), and choose all availability zones in our US-East-1 VPC.  

|image4|

On the Routing section, create a new target group using our workload, port 80.  Target type will be instance.  Health Checks will be TCP based.

|image5|

In the Targets section, choose the Aviatrix Gateways in our US-East-1 VPC and move them to Registered Targets.  Click Next to review, then Create.




Step 2: Attach an Endpoint Service to our new Load Balancer
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the VPC section of the AWS console, choose Endpoint Services, then Create Endpoint Service.

The new Load Balancer will be in the list as an available NLB.

|image6|

Update these options as needed.  Create Service.


|image8|

That Service ARN will be what our customer uses to register a service in their VPC.

|image9|

Step 3: Create Endpoint in Customer VPC
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the Customer VPC console, build a new Endpoint.

Enter the ARN from the last step, and choose the Customer VPC to expose an endpoint in.  Once built, the Endpoint DNS names can be used to route traffic.

|image10|


Step 4: Configure Destination NAT rules on Aviatrix Gateway
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A Destination NAT(DNAT) rule sends traffic from our VPC in US-East-1 to the workload VPC in US-East-2.

On the controller, highlight the primary gateway deployed in our US-East-1 VPC.  Click the Edit link.

|image11|

Scroll to the Destination NAT section and choose ADD NEW.

Ensure Sync to HA Gateway is selected.

Source CIDR will be the source of our US-East-1 VPC, 10.10.11.0/24.  Destination CIDR will be the private IP of our Primary Gateway.  In our example 10.10.11.5/24.  Destination port in our example is 80.  Protocol TCP.  Connection is None.  DNAT IPS in our example will be in the workload VPC available across our Site2Cloud tunnel.  The server is 10.10.12.69.  DNAT PORT is 80.  

Once filled out, hit SAVE, then UPDATE.

Repeat this step in a second rule, updating the Destination CIDR to point to the private IP of the HA Gateway.


|image12|
|image13|



Step 5: Test connections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Ensure health checks on your Internal Load Balancer are healthy.  Network Security Groups on your workload VPC(10.10.12.0/24) allow traffic from our VPC in US-East-1(10.10.11.0/24)

Only 1 tunnel will be active in our scenario, and Aviatrix will update the route tables to point to the active tunnel.

A simple way to test connectivity is to edit the /etc/hosts file on a linux instance to point to one of the DNS entries from the Endpoint in the Customer VPC.


.. |image1| image:: VPCEndpoints/VPCEndpointsDiagram.png
   :scale: 100%

.. |image2| image:: VPCEndpoints/image2.png
   :scale: 100%
   
.. |image3| image:: VPCEndpoints/image3.png
   :scale: 100%
   
.. |image4| image:: VPCEndpoints/image4.png
   :scale: 100%
   
.. |image5| image:: VPCEndpoints/image5.png
   :scale: 100%
   
.. |image6| image:: VPCEndpoints/image6.png
   :scale: 100%
   
.. |image7| image:: VPCEndpoints/image7.png
   :scale: 100%
   
.. |image8| image:: VPCEndpoints/image8.png
   :scale: 100%
   
.. |image9| image:: VPCEndpoints/image9.png
   :scale: 100%
   
.. |image10| image:: VPCEndpoints/image10.png
   :scale: 100%
   
.. |image11| image:: VPCEndpoints/image11.png
   :scale: 100%
   
.. |image12| image:: VPCEndpoints/image12.png
   :scale: 100%
   
.. |image13| image:: VPCEndpoints/image13.png
   :scale: 100%

.. disqus::
