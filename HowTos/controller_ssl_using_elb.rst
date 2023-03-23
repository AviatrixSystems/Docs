

==========================================================================
Configuring an AWS Load Balancer with SSL in front of Aviatrix Controller
==========================================================================

Overview
--------

The Aviatrix Controller supports adding an SSL certificate. However, sometimes you may prefer to put an ALB in front of the Controller.  This gives you the ability to associate it with a WAF, for example.

|imageArchitecture|

Step-by-Step Deployment Guide
-----------------------------

Follow the steps below to put the Aviatrix Controller behind an AWS ALB:

#. Login to the `AWS console <https://console.aws.amazon.com/>`__
#. Go to `Load Balancers` for EC2 service in the region where your Aviatrix Controller is running
#. Create a new load balancer

   .. note::
      See `this guide <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/load-balancer-getting-started.html>`__ for more information on AWS load balancing.

#. Select `Application Load Balancer` and click `Create`
#. Configure the load balancer.  Be sure to select `internet-facing` Scheme and `HTTPS` for the `Load Balancer Protocol` of the only listener.

   |imageConfigureStep1|

#. Configure the `Security Settings` by selecting your SSL certificate and security policy.

   |imageConfigureStep2|

#. Select the appropriate security group.  This security group should allow traffic on port 443 from your desired source network(s).

#. Configure the routing with a new target group.  The `Target group` should be configured with `HTTPS` protocol on port `443` and a `Target type` of `instance`.  The Health check should use `HTTPS` Protocol and `/` Path.

   |imageConfigureRouting|

   .. note::
      You may adjust the `Interval` to be larger than 30 seconds to lower the burden on your Controller.

#. Find the Aviatrix Controller instance to register in the target group.

   |imageConfigureRegisterTarget1|

   After `Add to registered` is clicked you will see this:

   |imageConfigureRegisterTarget2|

#. Review and Create the load balancer

   |imageConfigureReview|

#. Collect the `DNS name` from the load balancer

   |imageLBDNSName|

#. Create a DNS CNAME record pointing your desired name to the load balancer's `DNS name`

   .. note::

      The DNS CNAME record must match the name used in the SSL cert or you will receive a warning in the browser.

   .. tip::

      Here is an example setting up the entry in Route53:

      |imageRoute53Example|


#. The Controller's security groups should have inbound allow policy for port 443 for the VPC CIDR, so that the ELB can talk to the Controller

   
.. |imageConfigureStep1| image:: controller_ssl_elb_media/configure_lb_step1.png
   :scale: 75%

.. |imageConfigureStep2| image:: controller_ssl_elb_media/configure_lb_security.png
   :scale: 75%

.. |imageConfigureRouting| image:: controller_ssl_elb_media/configure_lb_routing.png
   :scale: 75%

.. |imageConfigureRegisterTarget1| image:: controller_ssl_elb_media/configure_lb_add_controller_to_target.png
   :scale: 75%

.. |imageConfigureRegisterTarget2| image:: controller_ssl_elb_media/configure_lb_controller_register.png
   :scale: 75%

.. |imageConfigureReview| image:: controller_ssl_elb_media/configure_lb_review.png
   :scale: 50%

.. |imageLBDNSName| image:: controller_ssl_elb_media/lb_get_dns.png
   :scale: 75%

.. |imageBrowser| image:: controller_ssl_elb_media/browser.png
   :scale: 50%

.. |imageRoute53Example| image:: controller_ssl_elb_media/route53entry.png
   :scale: 75%

.. |imageArchitecture| image:: controller_ssl_elb_media/highlevel.png
   :scale: 50%


.. note::
  If you have enabled controller HA, you can point your Auto Scaling Group to Target Group of your ELB for auto registration in the event of a failover. 
  However, please note that Max value should be always 1. Having more than 1 active controller for any given set of services is not supported as documented `here <https://docs.aviatrix.com/HowTos/controller_ha.html>`_, if it is deployed behind an ELB
