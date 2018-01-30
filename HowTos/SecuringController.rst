.. meta::
   :description: Securing Aviatrix Controller for VPN access and Management access.
   :keywords: Security VPN Management access


=============================
Securing Aviatrix Controller
=============================

Best practices dictate that the Aviatrix Controller should not be widely
accessible from the internet. Access should be limited to (1) management
range of IPs coming from the Enterprise or the Datacenter, and (2) access
to/from each of the deployed gateways for general communication/keep-alives.

However, the exception to that rule is the VPN Access as users need to
authenticate to the controller from wherever they connect, whether at home
or the local Starbucks.

In order to accommodate for both functions in a secure manner, please follow the
instructions below to secure your controller.

Pre-requisites
======================

Before you start, make sure you have the latest software by checking the
Dashboard. If an alert message (!New) appears, click !New to download
the latest software.

We assume you already know how to deploy Aviatrix solution, if you need
help, check out this `reference
design <https://s3-us-west-2.amazonaws.com/aviatrix-download/Cloud-Controller/Cloud+Networking+Reference+Design.pdf>`__.

We also assume that you know how to create resources in the AWS console

Configuration Workflow
======================

#. Go to your AWS console and under EC2->Load Balancer, click on  "Create Load Balancer":

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

#. For certificate upload from ACM or use your self/CA signed certificates.
     Note: for self signed certificate select Security Policy: ELBSecurityPolicy-2015-05

#. Click next.

#. Configure security groups to make it accessible to the world

    Type: ALL TCP

    Protocol: TCP

    Port Range: 0-65535

    Source: 0.0.0.0/0

#. Click next.

#. On the Configure routing page Create a new target group for HTTPS:443	:

    Target group: New target group

    Name:  << Insert Target group name >>

    Protocol: HTTPS

    Port: 443

    Target type: instance

#. Heal checks:

    Protocol: HTTPS

    Path: /

#. Click next

#. On the Register target page select the Aviatrix Controller instance and click "add to register"

#. Click on next to go to review page

#. Review and then click on "Create"


#. Select the new loadbalancer, on the lower tabs select Listeners

#. Select the current listener on port 443 and click on "View/Edit Rules"

#. Add new rule:

    If:

      Path-pattern: /flask

    Then:

      Forward: << Select the recently created Target Group >>


On the Controller
#. Configure SAML by accessing controller through loadbalancer DNS name. This will generate everything, URLS and certs with respect to DNS name

:NOTE:
Controller's security group for 443 must allow from Loadbalancer's internal IP address which can be usually VPC CIDR


:Optional:
To Block general access:

1. Create dummy target group pointing to invalid port
   path rule / will be pointing to dummy target group
   path rule /flask will be pointing to valid target group at HTTPS 443 to controller



.. add in the disqus tag

.. disqus::
