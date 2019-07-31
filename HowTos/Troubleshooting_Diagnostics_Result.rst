.. meta::
   :description: The Service Description of Troubleshoot Diagnostic result
   :keywords: Aviatrix troubleshooting, Diagnostic, Diagnostic Result, gateway, reachable

###################################
Troubleshoot - Diagnostic Result
###################################

This page explains the major items to examine while doing a Run diagnostics on a gateway.

.. tip::
 
   You can run a Diagnostics by go to Troubleshoot->Diagnostics->Gateway->Diagnostics, select a gateway to run diagnostics. Click run. When it finishes, click Show to display on the console. Click Submit to send the diagnostics result to Aviatrix support team.
The diagnostics test if the gateway is reachable and its services are up and running.


Diagnostic Result
---------------

+-----------------------------+----------------------------------------------------------------+
|**Controller Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "controller": {                                                                              |
|     "SumoLogic Collector": "Not running",                                                    |
|     "Database": "Up",                                                                        |
|     "logstash-forwarder": "Not running",                                                     |
|     "Rsyslog Status": "Not running",                                                         |
|     "CloudWatch Service": "Not running",                                                     |
|     "splunkd": "Not running",                                                                |
|     "Connectivity": "Up",                                                                    |
|     "SSH": {                                                                                 |
|         "port": {                                                                            |
|             "22": "Down"                                                                     |
|         },                                                                                   |
|         "service": "Up"                                                                      |
|     },                                                                                       |
|     "datadog-agent": "Not running",                                                          |
|     "Public IP": "Pass",                                                                     |
|     "PKI": "Pass",                                                                           |
|     "rsyslogd": "Running"                                                                    |
| }                                                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Controller status.                                                                  |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Netflow Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Netflow Service": "Not running",                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Netflow service status.                                                             |
|  > Default: Not running                                                                      |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Utility Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "Files not found": [                                                                         |
|     "/etc/openvpn/utils.py",                                                                 |
|     ... (the rest is omitted.)                                                               |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**LogStash Output**          |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "logstash-forwarder": "Not running",                                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Logstash logging service status.                                                    |
| > Default: Not running                                                                       |
|                                                                                              |
| > Related Link `LogStash Integration`_.                                                      |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**DNS Resolution Output**    |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "DNS resolution": "Pass",                                                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates if the gateway can resolve public domain names.                                     |
| > Expected value: Pass                                                                       |
|                                                                                              |
| > If the result is Fail, check whether the DNS resolution is enabled for the VPC where this  |
|                                                                                              |
| for the VPC where this gateway resides, gateway's security group and                         |
|                                                                                              |
| VPC inbound and outbound ACL.                                                                |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Hostname-filter Output**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Hostname-filter Report": [                                                                  |
|     "{\n",                                                                                   |
|     "  \"smtp.gmail.com\": {\n",                                                             |
|     "    \"ip_list\": [\n",                                                                  |
|     "      \"74.125.126.109\", \n",                                                          |
|     "      \"74.125.126.108\", \n",                                                          |
|     "      \"173.194.194.109\", \n",                                                         |    
|     "      \"173.194.205.109\"\n",                                                           |
|     "    ], \n",                                                                             |
|     "    \"thread_state\": \"ALIVE\"\n",                                                     |
|     "  }\n",                                                                                 |
|     "}"                                                                                      |    
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the Hostname filter configuration.                                                  |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Rsyslog Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "Rsyslog Status": "Disabled",                                                                |    
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates the Remote Syslog feature is enabled.                                               |
| > Related Link `Remote Syslog Integration`_.                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+ 
|**ipset Output**             |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "ipset rules": [                                                                             |
|     "Name: avx_hnf_ipset_d_accept\n",                                                        |
|     "Type: hash:ip,port\n",                                                                  |
|     "Revision: 5\n",                                                                         |
|     "Header: family inet hashsize ... (the rest is omitted.)                                 |
|     "Size in memory: 4564\n",                                                                |
|     "References: 1\n",                                                                       |    
|     "Number of entries: 36\n",                                                               |
|     "Members:\n",                                                                            |
|     "64.233.181.108,tcp:25 comment \"smtp.gmail.com\"\n",                                    |
|     "108.177.111.109,tcp:25 comment \"smtp.gmail.com\"\n",                                   |
|     "108.177.121.108,tcp:25 comment \"smtp.gmail.com\"\n",                                   |    
|     "173.194.198.109,tcp:25 comment \"smtp.gmail.com\"\n",                                   |
|     "209.85.144.109,tcp:25 comment \"smtp.gmail.com\"\n"                                     |
| ],                                                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**SpanPort Output**          |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "SpanPort Service": {                                                                        |
|     "port": "unknown",                                                                       |
|     "service": "Down"                                                                        |
| },                                                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Currently not used.                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**iptables nat Output**      |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "iptables nat rules": [                                                                      |
|     "-P PREROUTING ACCEPT\n",                                                                |
|     "-P INPUT ACCEPT\n",                                                                     |
|     "-P OUTPUT ACCEPT\n",                                                                    |
|     "-P POSTROUTING ACCEPT\n",                                                               |
|     "-N CLOUDN-LOG-natVPN\n",                                                                |
|     "-N CLOUDX-SNAT\n",                                                                      |    
|     "-A POSTROUTING -s 192.168.43.0/24 -j CLOUDN-LOG-natVPN\n",                              |
|     "-A POSTROUTING -m addrtype --src-type LOCAL -j ACCEPT\n",                               |
|     "-A POSTROUTING -m policy --dir out --pol ipsec -j ACCEPT\n",                            |
|     "-A POSTROUTING -j CLOUDX-SNAT\n",                                                       |
|     "-A CLOUDN-LOG-natVPN -j LOG --log-prefix \"AviatrixUser: \"\n",                         |    
|     "-A CLOUDN-LOG-natVPN -j MASQUERADE\n",                                                  |
|     "-A CLOUDX-SNAT -o eth0 -j MASQUERADE\n"                                                 |
| ],                                                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates NAT configuration.                                                                  |
|  > mainly used for debugging                                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Hostname-filter Status**   |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "Hostname-filter Status": [                                                                  |
|     " avx-hostname-filter.service - Aviatrix Hostname Filter\n",                             |
|     "   Loaded: loaded (/lib/systemd/system/a ... (the rest is omitted.)                     |
|     "   Active: inactive (dead)\n"                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates Hostname-filter service status                                                      |
|  > Default: inactive                                                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**iptables  Output**         |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "iptables rules": [                                                                          |
|     "-P INPUT ACCEPT\n",                                                                     |
|     "-P FORWARD ACCEPT\n",                                                                   |
|     "-P OUTPUT ACCEPT\n",                                                                    |
|     "-N AVX-FILTER-BASE-LOG-ACCEPT\n",                                                       |
|     "-N AVX-FILTER-BASE-LOG-DROP\n",                                                         |
|     "-N AVX-FILTER-CHAIN\n",                                                                 |    
|     "-N AVX-FILTER-MATCH-LOG-ACCEPT\n",                                                      |
|     "-N AVX-FILTER-MATCH-LOG-DROP\n",                                                        |
|     "-N CLOUDN-AVX-NFQ\n",                                                                   |
|     "-N RULE-LOG-ACCEPT\n",                                                                  |
|     "-N RULE-LOG-DROP\n",                                                                    |    
|     ... (the rest is omitted.)                                                               |
| ],                                                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates Stateful firewall configuration                                                     |
|  > mainly used for debugging                                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**ifconfig Output**          |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
|  "ifconfig display": [                                                                       |
|      "eth0: flags=4163<UP,BROADCAST,... (the rest is omitted.)                               |
|                                                                                              |
|      "        inet 10.10.10.72  netm... (the rest is omitted.)                               |
|      "        inet6 fe80::8a4:d3ff:f... (the rest is omitted.)                               |
|      "        ether 0a:a4:d3:1b:df:0... (the rest is omitted.)                               |
|      "        RX packets 326021  byt... (the rest is omitted.)                               |
|      "        RX errors 0  dropped 0... (the rest is omitted.)                               |    
|      "        TX packets 185361  byt... (the rest is omitted.)                               |
|      "        TX errors 0  dropped 0... (the rest is omitted.)                               |
|      "\n",                          ... (the rest is omitted.)                               |
|      "lo: flags=4169<UP,LOOPBACK,RUN... (the rest is omitted.)                               |
|      "        inet 127.0.0.1  netmas... (the rest is omitted.)                               |    
|      "        inet6 ::1  prefixlen 1... (the rest is omitted.)                               |
|      "        loop  txqueuelen 1000 ... (the rest is omitted.)                               |
|      "        RX packets 396  bytes ... (the rest is omitted.)                               |
|      "        RX errors 0  dropped 0... (the rest is omitted.)                               |
|      "        TX packets 396  bytes ... (the rest is omitted.)                               |
|      "        TX errors 0  dropped 0... (the rest is omitted.)                               |
|      "\n",                          ... (the rest is omitted.)                               |
|      "tun0: flags=4305<UP,POINTOPOIN... (the rest is omitted.)                               |    
|      "        inet 192.168.43.1  net... (the rest is omitted.)                               |
|      "        inet6 fe80::30ff:994a:... (the rest is omitted.)                               |
|      "        unspec 00-00-00-00-00-... (the rest is omitted.)                               |
|      "        RX packets 0  bytes 0 ... (the rest is omitted.)                               |
|      "        RX errors 0  dropped 0... (the rest is omitted.)                               |
|      "        TX packets 4  bytes 30... (the rest is omitted.)                               |
|      "        TX errors 0  dropped 0... (the rest is omitted.)                               |
|      "\n"                                                                                    |    
|  ],                                                                                          |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates gateway's interfaces.                                                               |
|  > There should be very limit number of TX and RX errors/dropped.                            |
|                                                                                              |    
|  > If there are a lot of TX errors or dropped in tun0, it may be due to authentication       |
|                                                                                              |    
|  mismatch on the tunnel.                                                                     |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Disk Usage Output**       |                                                                 |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "top disk usage": [                                                                          |
|     "4.7G\t/usr\n",                                                                          |
|     "2.3G\t/usr/share\n",                                                                    |
|     "1.3G\t/var\n",                                                                          |
|     "1.2G\t/usr/share/doc\n",                                                                |
|     "1.1G\t/usr/src\n",                                                                      |
|     "1.1G\t/usr/lib\n",                                                                      |    
|                                                                                              |
|     ... (the rest is omitted.)                                                               |
| ],                                                                                           |
|                                                                                              |    
+-----------------------------+----------------------------------------------------------------+
|Indicates disk usage on the gateway.                                                          |
|  > The maximum size of /usr should be lower than 6G, please contact                          |
|                                                                                              |
|  support@aviatrix.com if you see abnormal usage in a folder.                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**MsgQueue Output**          |                                                                |
+-----------------------------+----------------------------------------------------------------+    
|::                                                                                            |
|                                                                                              |
| "MsgQueue": {                                                                                |
|     "ApproximateNumberOfMessagesNotVisible": "0",                                            |
|                                                                                              |
|     "ContentBasedDeduplication": "false",                                                    |
|     "MessageRetentionPeriod": "345600",                                                      |
|     "ApproximateNumberOfMessagesDelayed": "0",                                               |
|     "MaximumMessageSize": "262144",                                                          |    
|     "CreatedTimestamp": "1545101799",                                                        |
|     "ApproximateNumberOfMessages": "0",                                                      |
|     "ReceiveMessageWaitTimeSeconds": "0",                                                    |
|     "DelaySeconds": "0",                                                                     |
|     "FifoQueue": "true",                                                                     |    
|     "VisibilityTimeout": "30",                                                               |
|     "LastModifiedTimestamp": "1545101878",                                                   |
|     "QueueArn": "arn:aws:sqs:us-west-2:xxxxxx:aviatrix-34-xxx-xxx-16.fifo"                   |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates AWS SQS message queue status.                                                       |
|  > ApproximateNumberOfMessages indicates the number of pending messages                      |
|                                                                                              |
|  in the queue.                                                                               |
|                                                                                              |    
|  > Expected value is 0.                                                                      |
|                                                                                              |
|  > If this value is not 0, it means there's issue on the AWS SQS Service, please update      |
|                                                                                              |    
|  your IAM policy (refer to `IAM Policy`_. and check if the DNS resolution                    |
|                                                                                              |    
|  passed on the gateway.) You may also check if this SQS queue is still in your AWS           |
|                                                                                              |    
|  SQS Service or the IAM policy is correctly attached on the Gateway.                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Supervisorctl Output**     |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "supervisorctl status": [                                                                    |
|     "gwmon                            RUNNING   pid 2857, uptime 5:25:55\n",                 |
|     "local_launch                     EXITED    Dec 18 02:58 AM\n",                          |
|     "openvpn                          RUNNING   pid 5430, uptime 5:20:42\n",                 |
|     "perfmon                          RUNNING   pid 2876, uptime 5:25:53\n",                 |
|     "sw-wdt4perfmon                   RUNNING   pid 2894, uptime 5:25:51\n",                 |
|     "time_action                      RUNNING   pid 2816, uptime 5:25:56\n"                  |    
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the supervisor status.                                                              |
|  > All services should be in RUNNING state except local_launch.                              |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**IKE daemon Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "IKE daemon": {                                                                              |
|     "port": {                                                                                |
|         "500": "Up",                                                                         |
|         "4500": "Up"                                                                         |
|     },                                                                                       |
|     "service": "Up"                                                                          |
| },                                                                                           |    
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates IKE daemon service and port status                                                  |
|  > Default: Up for all                                                                       |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**SumoLogic Output**         |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "SumoLogic Collector": "Not running",                                                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates SumoLogic logging service status.                                                   |
|  > Default: Not running                                                                      |
|                                                                                              |
|  > Related Link `Sumologic Integration`_.                                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Upload Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Upload": "Pass",                                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates that Aviatrix controller is able to upload files to the gateway.                    |
|  > Expected value: Pass                                                                      |
|                                                                                              |    
|  > If fail, please check the port 443 is open in both security group and VPC ACL between     |
|                                                                                              |    
|  controller and the gateway instance in AWS console.                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Datadog Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Datadog Service": "Not running",                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
| Indicates Datadog logging service status.                                                    |
|  > Default: Not running                                                                      |
|                                                                                              |
|  > Related Link `Datadog Integration`_.                                                      |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**iptables mangle Output**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "iptables mangle rules": [                                                                   |
|     "-P PREROUTING ACCEPT\n",                                                                |
|     "-P INPUT ACCEPT\n",                                                                     |
|     "-P FORWARD ACCEPT\n",                                                                   |
|     "-P OUTPUT ACCEPT\n",                                                                    |    
|     "-P POSTROUTING ACCEPT\n",                                                               |
|     "-N MSSCLAMPING\n",                                                                      |
|     "-A FORWARD -j MSSCLAMPING\n",                                                           |
|     "-A MSSCLAMPING -p  ... (the rest is omitted.)                                           |    
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates iptables mangle configuration.                                                      |
|  > For debugging purpose                                                                     |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**HTTPS Output**             |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "HTTPS": {                                                                                   |
|     "port": {                                                                                |
|                                                                                              |
|         "443": [                                                                             |
|             "up",                                                                            |    
|             "reachable"                                                                      |
|         ]                                                                                    |
|     },                                                                                       |
|     "service": "Up"                                                                          |    
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the HTTPS status and reachability on the gateway.                                   | 
|   > Expected value: Up and reachable                                                         |
|                                                                                              |
|   > If Fail, please make sure the gateway has its security group port 443 open to the        |
|                                                                                              |
|   controller's EIP in AWS console.                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**HTTPS Get Output**         |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "HTTPS GET": "Pass",                                                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates connectivity for HTTPS request from gateway to the controller.                      |
|  > Expected value: Pass if GW can communicate with Controller without issue.                 |
|                                                                                              |
|  When It shows "Fail" please check both Controller and Gateway security group                |
|                                                                                              |
|  > If Fail, please make sure the controller has its security group port 443 open to the      |
|                                                                                              |
|  gateway's EIP in AWS console.                                                               |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**CloudWatch Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "CloudWatch Service": "Not running",                                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the AWS CloudWatch service status.                                                  |
|  > Default: Not running                                                                      |
|                                                                                              |
|  > Related Link `Cloudwatch How To`_.                                                        | 
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Top Memory Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "top mem processes": [                                                                       |
|     "20.2  0.1 398548   432 /lib/systemd/systemd-journald\n",                                |
|                                                                                              |
|     " 4.6  0.0 454976  1761 /usr/sbin/apache2 -k start\n",                                   |
|     " 4.3  0.1 807656  2857 python -W ... (the rest is omitted.)                             |
|     " 2.8  0.0  90920  2876 python -W ... (the rest is omitted.)                             |    
|     " 2.6  0.0  84700  2816 python -W ... (the rest is omitted.)                             |
|     " 2.2  0.0 457688  5299 /usr/sbin/apache2 -k start\n",                                   |
|     " 2.1  0.0  65268  1992 /usr/bin/p ... (the rest is omitted.)                            |
|     " 2.1  0.0 457688  5297 /usr/sbin/apache2 -k start\n",                                   |    
|     " 1.9  0.0 548016  1183 /usr/lib/snapd/snapd\n",                                         |
|     " 1.8  0.0 457452  5300 /usr/sbin/apache2 -k start\n"                                    |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the memory and CPU usage of the gateway.                                            |
|  > The memory usage of processes (first column) is changing dynamiclly and the overall       |
|                                                                                              |
|  usage should be lower than 50%                                                              |
|                                                                                              |
|  > Mainly used for debugging                                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Splunk  Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "splunkd": "Not running",                                                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Splunk logging service status.                                                      |
|  > Default: Not running                                                                      |
|                                                                                              |
|  > Related Link `splunk Integration`_.                                                       |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**VPN Service Output**       |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "VPN Service": {                                                                             |
|     "port": {                                                                                |
|                                                                                              |
|         "943": [                                                                             |
|                                                                                              |
|             "up",                                                                            |    
|             "reachable"                                                                      |
|         ]                                                                                    |
|     },                                                                                       |
|     "service": "Down"                                                                        |    
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates OpenVPN service status.                                                             |
|  > Status is down if the gateway is non SSLVPN gateway                                       |
|                                                                                              |
|  > For SSLVPN gateway with ELB enabled, port 943 should be UP and the gateway's security     |
|                                                                                              |
|  group has default port 943 open to 0.0.0.0/0 to accept remote user connection.              |
|                                                                                              |
|  > For SSLVPN gateway with ELB disabled, port 1194 should be UP and the gateway's security   |
|                                                                                              |
|  group has default port 1194 open to 0.0.0.0/0 to accept remote user connection.             |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**IP Link Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "ip link display": [                                                                         |
|     "1: lo: <LOOPBACK,MULTICAST,UP,LOWER_UP... (the rest is omitted.)                        |
|     "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n",                           |
|     "2: eth0: <BROADCAST,MULTICAST,UP,LOW ER... (the rest is omitted.)                       |
|     "    link/ether 0a:a4:d3:1b:df:0e brd ff:ff:ff:ff:ff:ff\n",                              |
|     "3: cxm0: <BROADCAST,MULTICAST> mtu 150... (the rest is omitted.)                        |    
|     "    link/ether b2:61:0b:3f:69:a3 brd ff:ff:ff:ff:ff:ff\n",                              |
|     "13: tun0: <POINTOPOINT,MULTICAST,NOARP... (the rest is omitted.)                        |
|     "    link/none \n"                                                                       |
| ],                                                                                           |    
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the ip link status of the gateway.                                                  |
|  > Status should be UP.                                                                      |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Route Output**             |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "route": [                                                                                   |
|     "Kernel IP routing table\n",                                                             |
|     "Destination     Gateway         Genmask         Flags Metric Ref    Use Iface\n"        |
|     "0.0.0.0         10.10.10.1      0.0.0.0         UG    0      0        0 eth0\n",        |
|     "10.10.10.0      0.0.0.0         255.255.255.0   U     0      0        0 eth0\n",        |
|     "192.168.43.0    192.168.43.2    255.255.255.0   UG    0      0        0 tun0\n",        |    
|     "192.168.43.2    0.0.0.0         255.255.255.255 UH    0      0        0 tun0\n"         |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the route table on the gateway.                                                     |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**FQDN Output**              |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "FQDN service": [                                                                            |
|     " avx-nfq.service - Aviatrix NFQ\n",                                                     |
|                                                                                              |
|     "   Loaded: loaded (/lib/systemd/system/avx-nf... (the rest is omitted.)                 |
|     "   Active: active (running) since Wed 2018-12... (the rest is omitted.)                 |
|     " Main PID: 8495 (avx-nfq)\n",                                                           |    
|     "    Tasks: 1 (limit: 1149)\n",                                                          |
|     "   CGroup: /system.slice/avx-nfq.service\n",                                            |
|     "           └─8495 /home/ubuntu/cloudx-aws/nfq-module/avx-nfq\n",                        |
|     "\n",                                                                                    |
|     "Dec 19 13:23:30 ip-10-10-0-182 avx-nfq[8495]:... (the rest is omitted.)                 |
|    ... (the rest is omitted.)                                                                |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the FQDN Egress Control status                                                      |
|  > Status is active when FQDN egress control is enabled.                                     |
|                                                                                              |
|  > Status is inactive when FQDN egress control is disabled or failed.                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**SSH Output**               |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "SSH": {                                                                                     |
|     "port": {                                                                                |
|                                                                                              |
|         "22": [                                                                              |
|             "up",                                                                            |
|             "reachable"                                                                      |    
|         ]                                                                                    |
|     },                                                                                       |
|     "service": "Up"                                                                          |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the SSH port status on the gateway.                                                 |
|  > Required for gateway diagnostics to function properly.                                    |
|                                                                                              |
|  > Default: Up and reachable.                                                                |
|                                                                                              |
|  > If Fail or unreachable, the gateway diagnostics will not produce useful results           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Auth Output**              |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Auth Config": [                                                                             |
|     {                                                                                        |
|         "cfg": "Pass",                                                                       |
|         "method": "LDAP auth"                                                                |
|     }                                                                                        |
| ],                                                                                           |    
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the authentication method configured on the VPN gateway.                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**VPN Status Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "VPN config": "Pass",                                                                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the VPN confguration status. Expected value: Pass                                   |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**DNS Output**               |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "DNS Service": {                                                                             |
|     "/etc/resolvconf/resolv.conf.d/head": [                                                  |
|         "nameserver 8.8.8.8\n"                                                               |
|     ],                                                                                       |
|     "/etc/hosts": [                                                                          |
|         "127.0.0.1 localhost\n",                                                             |
|         "\n",                                                                                |
|         "::1 ip6-localhost ip6-loopback\n",                                                  |
|         "fe00::0 ip6-localnet\n",                                                            |
|         "ff00::0 ip6-mcastprefix\n",                                                         |
|         "ff02::1 ip6-allnodes\n",                                                            |
|         "ff02::2 ip6-allrouters\n",                                                          |
|         "ff02::3 ip6-allhosts\n",                                                            |
|         "ip-10-10-10-72\n",                                                                  |
|         "ip-10-10-10-72\n",                                                                  |
|         "10.10.10.72 ip-10-10-10-72\n"                                                       |
|     ],                                                                                       |
|     "/etc/hostname": [                                                                       |
|         "ip-10-10-10-72\n"                                                                   |
|     ],                                                                                       |
|     "/etc/systemd/resolved.conf": [                                                          |
|         "\n",                                                                                |
|         "[Resolve]\n",                                                                       |
|         "DNS=8.8.8.8\n"                                                                      |
|     ],                                                                                       |
|     "/etc/resolv.conf": [                                                                    |
|         "\n",                                                                                |
|         "nameserver 8.8.8.8\n",                                                              |
|         "nameserver 10.10.0.2\n",                                                            |
|         "search us-west-2.compute.internal\n"                                                |
|     ]                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates DNS service status and related configuration on the gateway.                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Server Cert Output**       |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Server Cert": "good"                                                                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+



.. _LogStash Integration: https://docs.aviatrix.com/HowTos/AviatrixLogging.html#logstash-forwarder
.. _Remote Syslog Integration: https://docs.aviatrix.com/HowTos/AviatrixLogging.html#remote-syslog
.. _IAM Policy: https://docs.aviatrix.com/HowTos/iam_policies.html
.. _Sumologic Integration: https://docs.aviatrix.com/HowTos/AviatrixLogging.html#sumo-logic-app-for-aviatrix
.. _Datadog Integration: https://docs.aviatrix.com/HowTos/DatadogIntegration.html
.. _Cloudwatch How To: https://docs.aviatrix.com/HowTos/cloudwatch.html
.. _Splunk Integration: https://docs.aviatrix.com/HowTos/AviatrixLogging.html#splunk-logging

.. disqus::
