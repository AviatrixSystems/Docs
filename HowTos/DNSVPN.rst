.. meta::
   :description: DNS UDP LoadBalancer Reference Design
   :keywords: DNS VPN, Route 53, VPN, aviatrix, remote user vpn, openvpn, user vpn



==============================
UDP LoadBalanced VPN using DNS
==============================

This feature is available from version 2.7. AWS does not allow you to create
loadbalancers for TCP VPN gateways. To circumvent this issue, we utilize
Route53 services of AWS to create a round robin based UDP LoadBalanced
VPN Gateways.

.. Note:: UDP based OpenVPN® provides higher packet throughput than TCP based VPN solution. UDP based VPN solution runs on UDP 1194. If you plan to deploy this solution for on-prem users, make sure your corporate firewall is open on UDP 1194 for outbound traffic.  


Configuration Workflow
======================

Tips: Upgrade to the latest version. Make sure you are running 2.7+

1. Create VPN Gateways from Gateways Page. Make sure you have VPN Enabled and ELB disabled.

2. Create DNS Loadbalancers
   a. Go to OpenVPN®->Advanced->UDP Loadbalancer
   b. Click "+New" button
   
        i. Select cloud type and account (Currently only supported on AWS)
        ii. Enter the hosted zone name ( This must exist in your AWS Route53)
        iii. VPN Service name is a unique identifier fot the Loadbalancer. For example
             a service name "vpn1" and hosted zone "aviatrix.com" will create a DNS entry
             "vpn.aviatrix.com"
        iv. Select the Gateways that need to be added to the Loadbalancer. If you dont see
             any gateways, you may not have created non ELB VPN Gateways.
	      v. Hit "OK" and this creates the UDP LoadBalancer
3. Add VPN Users.
   a. Add VPN Users directly to the LoadBalancer by going to OpenVPN®->VPN Users page
   b. In the VPC ID/LB /DNS select the loadbalancer created in Step 2. ("Example:vpn.aviatrix.com")
   c. Populate the username and email fields and the VPN user is created
4. (Optional) Edit DNS LoadBalancer
   a. You can add or delete gateways to the load balancer after it has been created

.. disqus::
