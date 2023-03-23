

===============================================================
Aviatrix Controller Security for SAML auth based VPN Deployment
===============================================================

Best practices call for the Aviatrix Controller to be not widely
accessible from the internet. Access on TCP port 443 should be limited to 

  - the management range of IPs coming from the Enterprise or the Datacenter, and 
  - access to/from each of the deployed gateways for general communication/keep-alives.


However, the exception to that rule is when `Aviatrix SAML authentication <http://docs.aviatrix.com/HowTos/VPN_SAML.html>`_ is
used for user VPN access. In this case, the VPN user first contacts the Controller which then redirects user browser traffic to an IDP. This initial traffic runs on TCP port 443 and as vpn users are located in off site locations, the Controller TCP port 443 needs to open to all which may cause security concerns.


In order to accommodate for both functions in a secure manner, please follow the
instructions below to secure your controller when SAML authentication is being used.

Pre-requisites
======================

 - We assume you already know how to deploy the Aviatrix solution. If you need help, check out this `reference design <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Networking+Reference+Design.pdf>`__.

 - You have deployed Aviatrix SAML authentication for your user VPN access. 

Configuration Workflow when SAML is configured
===============================================

1. Go to your AWS console and under EC2->Load Balancer, click on  "Create Load Balancer":

   Type: Application Load Balancer

   Name: << Insert LB name >>

   Scheme: internet-facing

   IP address Type: ipv4

#. Add Listener HTTPS port 443

    Listeners:

      Protocol: HTTPS(443)

#. In the Availability Zones section, select the VPC and AZ where your Aviatrix Controller currently resides.

#. Availability zones: Select all sub regions

#. Click next.

#. For certificate upload from ACM, use your self/CA signed certificates. If you already have a Route53 domain name, an ACM certificate can be requested for your domain and can be easily validated through email. You will need to add a record in your DNS with CNAME pointing the load balancer to match the certificate used for the load balancer.
     Note: for self signed certificate select Security Policy: ELBSecurityPolicy-2015-05     

#. Click next.

#. Configure security groups to make it accessible to the world.

     Type: ALL TCP

     Protocol: TCP
 
     Port Range: 0-65535
 
     Source: 0.0.0.0/0

#. Click next.

#. On the Configure routing page, create a new target group for HTTPS:443	:

     Target group: New target group
 
     Name:  << Insert Target group name >>

     Protocol: HTTPS

     Port: 443

     Target type: instance

#. Health checks:


     Protocol: HTTPS

     Path: /

#. Click next

#. On the Register target page, select the Aviatrix Controller instance and click "add to register"

#. Click on next to go to the review page

#. Review and then click on "Create"


#. Select the new loadbalancer, on the lower tabs select Listeners

#. Select the current listener on port 443 and click on "View/Edit Rules"

#. Add new rule:

    If:

      Path-is: /flask/*

    Then:

      Forward: << Select the recently created Target Group >>


On the Controller
#. Configure SAML by accessing the controller through the loadbalancer's certificate domain name. This will generate everything (URLs for the IDP and VPN user certificates) with respect to the DNS name. If you had configured SAML already, you will need to update the Assertion consumer URLs at the IDP to the domain name of the signed certificate. After you download the VPN user certificate, ensure that the domain name in the #AviatrixController section is set correctly(If not, update it)

.. note::

   The Controller's security group for 443 must allow from Loadbalancer's internal IP address which can be usually VPC CIDR and also the Gateways public IP


To block general access:

1. After the SAML configuration is complete, you can block general access to your controller.
   Create a dummy target group pointing to an invalid port
   path rule / will be pointing to an dummy target group
   path rule /flask will be pointing to valid target group at HTTPS 443 to controller.
   By doing this only the SAML application is being forwarded by the ELB and is open to the world
   This ensures that the rest of the controller configuration is open to the admin alone.

  



.. add in the disqus tag

.. disqus::
