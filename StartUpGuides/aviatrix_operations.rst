.. meta::
  :description: Aviatrix Product Operations Overview
  :keywords: cloud networking, aviatrix, OpenVPN®, SSL VPN, AWS Transit Gateway, Global Transit Network, site2cloud


=============================================
Aviatrix Operations Overview
=============================================

This document summarizes operations features that Aviatrix solution provides. 

|aviatrix_dashboard|

1. Visibility
----------------


 - **Geographic Map** Dashboard provides a geographical view of network topology under management. It also displays real time latency between any two nodes of deployed Aviatrix gateways. When a network connection is down, the connection turns to red color.
 - **Traffic Metrics** All Controller and gateway network traffic metrics are logged and displayed in time series.
 - **User Activities** Active VPN users and where they connect from is displayed. VPN user session history is logged and displayed.
 - **AWS Transit Gateway (TGW) Orchestrator View** A graphical view of displays what Security Domain and Connection Policies that have been configured. You can find for a given VPC, what other VPCs connect to it. 
 - **AWS Transit Gateway (TGW) Orchestrator List** Multi panel tables list, in real time, the Spoke VPC route table and TGW route table. 
 - **Egress FQDN Discovery** When this mode is enabled, Aviatrix gateway monitors every egress bound HTTP/HTTPS traffic, discovers the destination domain names and generates a report. This provides you the visibility of what APIs calls your EC2 applications are making. You can then use this visibility and turn it into FQDN filter policies.  


2. Monitoring
----------------

 - **Tunnel Status** Encrypted tunnels status are monitored. When a tunnel status is changed, the event is logged and alerted to the administrator. 
 - **Gateway Status** Gateway health is monitored. If a gateway is unreachable, the gateway is restarted for recovery.
 - **IAM Roles & Policies** Account IAM Roles and Policies are monitored to make sure they are attached to the accounts and the policies are correct. If anomaly is detected, the event is logged and alerted. 
 - **AWS Transit Gateway (TGW) Orchestrator Audit** Aviatrix Controller periodically checks the consistency between what you intend to configure on Security Domains and Connection Policies and what is reflected on AWS TGW route tables. If discrepancy is discovered, the event is logged and alerted.
 - **VPC Tracker** Instead of using an Excel sheet, use this tool to keep track all your network CIDRs and prevent duplicate network address ranges. 
 - **Alert Bell** Controller monitors the route table black hole, stopped instance, etc and displays a warning on the alert bell. 

3. Logging
-------------

Controller and gateways can export logged data to the following services:

 - **Splunk Enterprise**
 - **Sumo Logic**
 - **Elastic Search**
 - **Datadog**
 - **Remote syslog**
 - **AWS CloudWatch**
 - **Netflow**


4. Troubleshooting
---------------------
 - **Flightpath** Single pane of glass that displays information on Security Groups, VPC route entries, Network ACL, TGW Route table in a side by side presentation for both source and destination. In addition, expert diagnostics that identifies the faulty setup in these resources. 
 - **Trace Route & Trace Path** Use this tool to help identify route path. 
 - **Packet Capture** Capture packets on any gateway and download the resulting PCAP file for analysis on Wireshark.
 - **Network Validation** This tool can be used to test end to end connectivity. Instead of going to cloud provider console to launch instances, this tool automatically launches two instances and test connectivity for you.  
 - **Resource Lists** Lists are in use cases that retrieves in real time the cloud provider route entries. 

5. High Availability
----------------------

 - **Controller Backup/Restore** All configurations are backed up to S3 daily and can be restored to a new Controller in the event that the existing Controller becomes unavailable. 
 - **Controller HA** You can deploy a auto scaling group of 1 that let AWS CloudWatch to monitor the Controller health and in the event that the existing Controller becomes unavailable it triggers an AWS Lambda function to launch a new Controller and restores its configurations. 
 - **Active/Active Gateways** Aviatrix Gateways can be deployed Active/Active in multi-AZ and forwards traffic with ECMP. 


6. Compliance
--------------

 - FIPS 140-2 compliant with certificate `#3475 <https://csrc.nist.gov/Projects/cryptographic-module-validation-program/Certificate/3475>`_.
 - Supports SAML authentication to login to the Controller. 
 - Support LDAP authentication to login to the Controller. 
 


.. |aviatrix_dashboard| image:: aviatrix_operations_media/aviatrix_dashboard.png
   :scale: 30%


.. add in the disqus tag

.. disqus::
