.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix Gateway Troubleshooting Playbook
=========================================================================================

This technical note provides a step-by-step tips to troubleshoot Aviatrix Gateway

Workflow:
---------

1. Check Cloud Permission

  * 221_AWS_IAM_Policy_Troubleshooting_Playbook

2. Troubleshoot Deployment

  * Aviatrix

    Check whether Aviatrix Gateway displays status properly from Aviatrix Controller

    Check whether basic deployment functions properly by running Aviatrix Diagnostic report for Aviatrix Gateways from Aviatrix Controller

    Check basic network configuration of AWS where Aviatrix Gateway locates from Aviatrix Controller

  * Cloud Platform

    Check basic network configuration of AWS where Aviatrix Gateway locates from AWS portal

3. Troubleshoot Basic Network function for Aviatrix Gateway from Aviatrix Controller
    
    * T_01. Verify Internet layer by sending ICMP traffic to a public server with IP
    
    * T_02. Verify Transport layer by sending traffic to a public server with IP/Protocol/Port
    
    * T_03. Verify Application layer by sending ICMP traffic to a public server with domain name
    
    * T_04. Verify connectivity between Controller and Gateway

4. Troubleshoot Application traffic
    
    * T_05. Verify whether Aviatrix Gateway can issue AWS EC2 API properly
    
Detail:
-------
