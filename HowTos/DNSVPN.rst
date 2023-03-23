.. meta::



==============================
UDP LoadBalanced VPN using DNS
==============================

This feature is available from `Aviatrix software version 2.7 <http://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#r2-7>`_  and later. AWS Elastic Load Balancing (ELB) does not support  
UDP traffic. To overcome this, the AWS Route53 service is leveraged to direct user VPN traffic to UDP VPN gateways in a round robin algorithm. 

.. Note:: 

 UDP based OpenVPN® provides a higher packet throughput than a TCP-based VPN solution. A UDP-based VPN solution runs on UDP 1194. If you plan to deploy this solution for on-prem users, make sure your corporate firewall is open on UDP 1194 for outbound traffic.  


Configuration Workflow
======================

.. Tip ::

  Upgrade to the latest version. Make sure you are running 2.7+.

1. Create VPN Gateways from Gateways Page. Make sure you have the **VPN Access** option **Enabled** and 
   **Enabled ELB** option is **No** .

2. Create DNS Loadbalancers.
   a. Go to OpenVPN® > Advanced > UDP Loadbalancer.
   b. Click **+New**.
   
        i.   Select the cloud type and account (Currently only supported on AWS).
        ii.  Enter the hosted zone name ( This must exist prior in your AWS Route53).
        iii. VPN Service name is a unique identifier for the Loadbalancer. For example
             a service name "vpn1" and hosted zone "aviatrix.com" will create a DNS entry
             "vpn1.aviatrix.com."
        iv.  Select the Gateways that need to be added to the Loadbalancer. If you don't see
             any gateways, you probably have created VPN Gateways with ELB enabled (which will
             load balance TCP-based VPN gateway or you have created a non-VPN gateway. (You did not
             enable **VPN Access** during gateway creation time.) If your gateway type is incorrect, 
             delete the gateway and create it again. 
        v.   Click **OK** and this creates the UDP Loadbalancer.

3. Add VPN Users.
   a. Add VPN Users directly to the Loadbalancer by going to OpenVPN® > VPN Users.
   b. In the VPC ID/LB /DNS select the Loadbalancer created in Step 2. (For example: vpn.aviatrix.com.)
   c. Enter a username and email in the fields provided to create the VPN user.

4. (Optional) Edit the DNS Loadbalancer.
   a. You can add or delete gateways to the Loadbalancer after it has been created.


OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::
