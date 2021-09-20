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
|     "Database": "Up",                                                                        |
|     "Connectivity": "Up",                                                                    |
|     "SSH": {                                                                                 |
|         "port": {                                                                            |
|             "22": [                                                                          |
|                 "Down",                                                                      |
|             ]                                                                                |
|         },                                                                                   |
|         "service": "Up"                                                                      |
|     },                                                                                       |
|     "Public IP": "Pass",                                                                     |
|     "PKI": "Pass",                                                                           |
|     "Rsyslog Service": "Not running",                                                        |
|     "CloudWatch Service": "Not running",                                                     |
|     "splunkd": "Not running",                                                                |
|     "filebeat": "Not running",                                                               |
|     "SumoLogic Collector": "Not running",                                                    |
|     "rsyslogd": "Running",                                                                   |
|     "datadog-agent": "Not running",                                                          |
|     "HTTPS": {                                                                               |
|         "port": {                                                                            |
|             "443": [                                                                         |
|                 "up",                                                                        |
|                 "reachable"                                                                  |
|             ]                                                                                |
|         },                                                                                   |
|         "service": "Up"                                                                      |
|     },                                                                                       |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Controller status.                                                                  |
|                                                                                              |
| >The SSH service port 22 status "Down" is expected as Aviatrix doesn't allow user to connect |
|                                                                                              |
| ssh port to Controller or Gateway                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Gateway Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "SSH": {                                                                                     |
|     "port": {                                                                                |
|         "22": [                                                                              |
|             "up",                                                                            |
|             "reachable"                                                                      |
|         ]                                                                                    |
|     },                                                                                       |
|     "service": "Up"                                                                          |
| },                                                                                           |
| "GatewayIamRole": "Passed",                                                                  |
| "HTTPS": {                                                                                   |
|     "port": {                                                                                |
|         "443": [                                                                             |
|             "up",                                                                            |
|             "reachable"                                                                      |
|         ]                                                                                    |
|     },                                                                                       |
|     "service": "Up"                                                                          |
| },                                                                                           |
| "Upload": "Pass",                                                                            |
+-----------------------------+----------------------------------------------------------------+
|Indicates Gateway port 22 and 443 status.                                                     |
|                                                                                              |
|  > Expected value: Up and reachable                                                          |
|                                                                                              |
|  > If Fail, please make sure the gateway has its security group port 22 & 443 open to the    |
|                                                                                              |
|  controller's EIP in AWS console.                                                            |
|                                                                                              |
|  > It's expected that SSH port 22 is reachable as controller will use the port to do         |
|                                                                                              |
|  diagnostic on the Gateway. Please make sure HTTPS port 443 is reachable in this section     |
|                                                                                              |
|  since it indicates that controller is able to reach to Gateway for the configuration and    |
|                                                                                              |
|  software package delivery.                                                                  |
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
|                                                                                              |
|  > Expected value: Pass                                                                      |
|                                                                                              |
|  > If fail, please check the port 443 is open in both security group and VPC ACL between     |
|                                                                                              |
|  controller and the gateway instance in AWS console.                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**DNS Service**              |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "DNS Service": {                                                                             |
|     "/etc/resolvconf/resolv.conf.d/head": [                                                  |
|         "nameserver 8.8.8.8",                                                                |
|     ],                                                                                       |
|     "/etc/hosts": [                                                                          |
|         "127.0.0.1\tlocalhost",                                                              |
|         "::1 ip6-localhost ip6-loopback",                                                    |
|         "fe00::0 ip6-localnet",                                                              |
|         "ff00::0 ip6-mcastprefix",                                                           |
|         "ff02::1 ip6-allnodes",                                                              |
|         "ff02::2 ip6-allrouters",                                                            |
|         "ff02::3 ip6-allhostsip-172-31-45-222",                                              |
|         "10.17.1.204 ip-10-17-1-204",                                                        |
|         ""                                                                                   |
|         ],                                                                                   |
|     "/etc/hostname": [                                                                       |
|         "ip-10-17-1-204",                                                                    |
|         ""                                                                                   |
|     ],                                                                                       |
|     "/etc/systemd/resolved.conf": [                                                          |
|         "[Resolve]",                                                                         |
|         ""                                                                                   |
|     ],                                                                                       |
|     "/etc/resolv.conf": [                                                                    |
|         "nameserver 8.8.8.8",                                                                |
|         "nameserver 127.0.0.53",                                                             |
|         "search ca-central-1.compute.internal",                                              |
|         "options edns0",                                                                     |
|         ""                                                                                   |
|     ]                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates DNS service status and related configuration on the gateway.                        |
|                                                                                              |
| > Default nameserver: 8.8.8.8                                                                |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**NTP Config**               |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "NTP config": {                                                                              |
|     "/etc/ntp.conf": [                                                                       |
|         "driftfile /var/lib/ntp/ntp.drift\n",                                                |
|         "leapfile /usr/share/zoneinfo/leap-seconds.list\n",                                  |
|         "statistics loopstats peerstats clockstats\n",                                       |
|         "filegen loopstats file loopstats type day enable\n",                                |
|         "filegen peerstats file peerstats type day enable\n",                                |
|         "filegen clockstats file clockstats type day enable\n",                              |
|         "restrict -4 default kod notrap nomodify nopeer noquery limited\n",                  |
|         "restrict -6 default kod notrap nomodify nopeer noquery limited\n",                  |
|         "restrict 127.0.0.1\n",                                                              |
|         "restrict ::1\n",                                                                    |
|         "restrict source notrap nomodify noquery\n",                                         |
|         "server 169.254.169.123 prefer iburst\n"                                             |
|     ]                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates NTP config.                                                                         |
|                                                                                              |
| > Default server: 169.254.169.123                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**DNS Resolution**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "DNS resolution": "Pass",                                                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates if the gateway can resolve public domain names.                                     |
|                                                                                              |
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
|**HTTPS GET**                |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "HTTPS GET": "Pass",                                                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates connectivity for HTTPS request from gateway to the controller.                      |
|                                                                                              |
| > Expected value: Pass if GW can communicate with Controller without issue.                  |
|                                                                                              |
| When It shows “Fail” please check both Controller and Gateway security group                 |
|                                                                                              |
| > If Fail, please make sure the controller has its security group port 443 open to the       |
|                                                                                              |
| gateway’s EIP in AWS console                                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Supervisorctl Status**     |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "supervisorctl status": [                                                                    |
|     "fqdn_stats                       RUNNING   pid 2121, uptime 16:39:29\n",                |
|     "gwmon                            RUNNING   pid 2117, uptime 16:39:29\n",                |
|     "local_launch                     EXITED    Mar 25 08:47 AM\n",                          |
|     "openvpn                          RUNNING   pid 2123, uptime 16:39:29\n",                |
|     "perfmon                          RUNNING   pid 2119, uptime 16:39:29\n",                |
|     "rtmon                            FATAL     Exited too quickly (process log may have     |
|                                                 details)\n",                                 |
|     "sw-wdt4perfmon                   RUNNING   pid 2124, uptime 16:39:29\n",                |
|     "time_action                      RUNNING   pid 2118, uptime 16:39:29\n"                 |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the supervisor status.                                                              |
|                                                                                              |
| > All services should be in RUNNING state except local_launch.                               |
|                                                                                              |
| > rtmon is the monitor process for Transit and Spoke Gateway, the status should be running   |
|                                                                                              |
| when in transit or spoke gateway. The state can be FATAL in other type of gateway.           |
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
|     "KmsDataKeyReusePeriodSeconds": "300",                                                   |
|     "KmsMasterKeyId": "alias/aws/sqs",                                                       |
|     "ContentBasedDeduplication": "false",                                                    |
|     "PubSubErrorCount": 0,                                                                   |
|     "ConnectionSuccessCount": 17,                                                            |
|     "ApproximateNumberOfMessagesDelayed": "0",                                               |
|     "ApproximateNumberOfMessages": "0",                                                      |
|     "ExpiredTokenErrorCount": 16,                                                            |
|     "ConnectionStatus": "Connected",                                                         |
|     "ReceiveMessageWaitTimeSeconds": "0",                                                    |
|     "DelaySeconds": "0",                                                                     |
|     "FifoQueue": "true",                                                                     |
|     "VisibilityTimeout": "30",                                                               |
|     "PollFailureCount": 16,                                                                  |
|     "PollingStatus": "Active",                                                               |
|     "ConnectionFailureCount": 0,                                                             |
|     "MaximumMessageSize": "262144",                                                          |
|     "CreatedTimestamp": "1584614502",                                                        |
|     "NumMessagesReceived": 0,                                                                |
|     "MessageRetentionPeriod": "1209600",                                                     |
|     "LastModifiedTimestamp": "1584614609",                                                   |
|     "QueueArn": "arn:aws:sqs:ca-central-1:2767xxxxxxxx:aviatrix-1x-2xx-1xx-2xx.fifo"         |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates AWS SQS message queue status.                                                       |
|                                                                                              |
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
|**Route Output**             |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "route": [                                                                                   |
|     "Kernel IP routing table\n",                                                             |
|     "Destination     Gateway         Genmask         Flags Metric Ref    Use Iface\n",       |
|     "0.0.0.0         10.187.64.1     0.0.0.0         UG    0      0        0 eth0\n",        |
|     "10.187.64.0     0.0.0.0         255.255.240.0   U     0      0        0 eth0\n",        |
|     "192.168.43.0    192.168.43.2    255.255.255.0   UG    0      0        0 tun0\n",        |
|     "192.168.43.2    0.0.0.0         255.255.255.255 UH    0      0        0 tun0\n",        |
|     "10.20.0.0       0.0.0.0         255.255.0.0     U     100    0        0 tun-xxx\n"      |
|     "10.20.51.91     0.0.0.0         255.255.255.255 U     100    0        0 tun-xxx\n"      |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the route table on the gateway.                                                     |
|                                                                                              |
|  > tun0 is the interface for OpenVPN                                                         |
|                                                                                              |
|  > tun-xxx is the interface Transit-Spoke connection                                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**IP Rule Output**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "ip rule":  [                                                                                |
|     "0:\tfrom all lookup local \n",                                                          |
|     "32766:\tfrom all lookup main \n",                                                       |
|     "32767:\tfrom all lookup default \n"                                                     |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**IP Route Main Output**     |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "ip route main": [                                                                           |
|     "default via 10.187.64.1 dev eth0 \n",                                                   |
|     "10.187.64.0/20 dev eth0 proto kernel scope link src 10.187.77.1xx \n",                  |
|     "192.168.43.0/24 via 192.168.43.2 dev tun0 \n",                                          |
|     "192.168.43.2 dev tun0 proto kernel scope link src 192.168.43.1 \n"                      |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
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
|     "-N RULE-LOG-ACCEPT\n",                                                                  |
|     "-N RULE-LOG-DROP\n",                                                                    |
|     "-A FORWARD -m state --state ESTABLISHED -j ACCEPT\n",                                   |
|     "-A FORWARD -s 192.168.43.6/32 -i tun0 -j ACCEPT\n",                                     |
|     "-A RULE-LOG-ACCEPT -m limit --limit 2/sec -j LOG --log-prefix \"AvxRl gw1               |
|                                                     A:\" --log-level 7\n",                   |
|     "-A RULE-LOG-ACCEPT -j ACCEPT\n",                                                        |
|     "-A RULE-LOG-DROP -m limit --limit 2/sec -j LOG --log-prefix \"AvxRl gw1                 |
|                                                     D:\" --log-level 7\n",                   |
|     "-A RULE-LOG-DROP -j DROP\n"                                                             |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Stateful firewall configuration                                                     |
|                                                                                              |
|  > mainly used for debugging                                                                 |
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
|     "-A POSTROUTING -s 192.168.43.0/24 -j CLOUDN-LOG-natVPN\n",                              |
|     "-A CLOUDN-LOG-natVPN -j LOG --log-prefix \"AviatrixUser: \"\n",                         |
|     "-A CLOUDN-LOG-natVPN -j MASQUERADE\n"                                                   |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates NAT configuration.                                                                  |
|                                                                                              |
|  > mainly used for debugging                                                                 |
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
|     "-A MSSCLAMPING -p tcp -m tcp --tcp-flags SYN,RST SYN -j TCPMSS --set-mss 1370\n"        |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates iptables mangle configuration.                                                      |
|                                                                                              |
|  > For debugging purpose                                                                     |
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
|**IPlink Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "ip link display": [                                                                         |
|     "1: lo: <LOOPBACK,MULTICAST,UP,LOWER_UP> mtu 65536 qdisc noqueue state                   |
|                                UNKNOWN mode DEFAULT group default qlen 1000\n",              |
|     "    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00\n",                           |
|     "2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 9001 qdisc mq state UP                   |
|                                mode DEFAULT group default qlen 1000\n",                      |
|     "    link/ether 06:b3:ec:15:fe:bc brd ff:ff:ff:ff:ff:ff\n",                              |
|     "3: tun0: <POINTOPOINT,MULTICAST,NOARP,UP,LOWER_UP> mtu 1500 qdisc fq_codel              |
|                                ztate UNKNOWN mode DEFAULT group default qlen 100\n",         |
|     "    link/none \n",                                                                      |
|     "4: cxm0: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode                      |
|                                DEFAULT group default qlen 1000\n",                           |
|     "    link/ether b2:9a:79:d7:68:a8 brd ff:ff:ff:ff:ff:ff\n"                               |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the ip link status of the gateway.                                                  |
|                                                                                              |
|  > Status should be UP.                                                                      |
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
|                                                                                              |
|  > There should be very limit number of TX and RX errors/dropped.                            |
|                                                                                              |
|  > If there are a lot of TX errors or dropped in tun0, it may be due to authentication       |
|                                                                                              |
|  mismatch on the tunnel.                                                                     |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Processes**                |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Processes": [                                                                               |
|     "top - 01:27:05 up 16:39,  0 users,  load average: 0.15, 0.03, 0.01\n",                  |
|     "Tasks: 114 total,   1 running,  74 sleeping,   0 stopped,   0 zombie\n",                |
|     "%Cpu(s):  0.3 us,  0.1 sy,  0.0 ni, 99.6 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\n",     |
|     "KiB Mem :  3907116 total,  2590900 free,   325604 used,   990612 buff/cache\n",         |
|     "KiB Swap:        0 total,        0 free,        0 used.  3295864 avail Mem \n",         |
|     "\n",                                                                                    |
|     "  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND\n",         |
|     "    1 root      20   0  159868   9120   6680 S   0.0  0.2   0:03.61 /sbin/init\n",      |
|     "    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 [kthreadd]\n",      | 
|     ... (the rest is omitted.)                                                               |
| ]                                                                                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
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
|                                                                                              |
|  > Default: Up for all                                                                       |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Top mem processes**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "top mem processes": [                                                                       |
|     " 2.2  0.2 1320032 2117 python -W ignore /home/ubuntu/cloudx-aws/gwmon.py info\n",       |
|     " 1.4  0.0 141076   431 /lib/systemd/systemd-journald\n",                                |
|     " 1.3  0.2 267644  2118 python -W ignore /home/ubuntu/cloudx-aws/timer_action.py\n",     |
|     " 1.0  0.0 387132  2011 /usr/sbin/apache2 -k start\n",                                   |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the memory and CPU usage of the gateway.                                            |
|                                                                                              |
|  > The memory usage of processes (first column) is changing dynamically and the overall      |
|                                                                                              |
|  usage should be lower than 50%                                                              |
|                                                                                              |
|  > Mainly used for debugging                                                                 |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Sysinfo CPU Output**       |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "SysInfo": [                                                                                 |
|     "***CPU***\n",                                                                           |
|     "Architecture:        x86_64\n",                                                         |
|     "CPU op-mode(s):      32-bit, 64-bit\n",                                                 |
|     "Byte Order:          Little Endian\n",                                                  |
|     "CPU(s):              2\n",                                                              |
|     "On-line CPU(s) list: 0,1\n",                                                            |
|     "Thread(s) per core:  1\n",                                                              |
|     "Core(s) per socket:  2\n",                                                              |
|     ... (the rest is omitted.)                                                               |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Kernel Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Kernel***\n",                                                                            |
| "Linux ip-10-187-77-159 4.15.0-1044-aws #46 SMP Sun Dec 8 00:42:58 UTC 2019 x86_64           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Uptime Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Uptime***\n",                                                                            |
| " 01:27:05 up 16:39,  0 users,  load average: 0.14, 0.03, 0.01\n",                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Uptime of the gateway.                                                              |
|                                                                                              |
|  > It indicates the time that the system has been working and available                      | 
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Reboot History**           |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Reboot History***\n",                                                                    |
| "reboot   system boot  4.15.0-1044-aws  Wed Mar 25 08:47   still running\n",                 |
| "shutdown system down  4.15.0-1044-aws  Wed Mar 25 08:45 - 08:47  (00:01)\n",                |
| "reboot   system boot  4.15.0-1044-aws  Tue Mar 24 01:30 - 08:45 (1+07:14)\n",               |
| "shutdown system down  4.15.0-1044-aws  Mon Mar 23 10:06 - 01:30  (15:24)\n",                |
| "reboot   system boot  4.15.0-1044-aws  Thu Mar 19 10:41 - 10:06 (3+23:24)\n",               |
| "\n",                                                                                        |
| "wtmp begins Thu Mar 19 10:41:57 2020\n",                                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Reboot History of the gateway.                                                      |
|                                                                                              |
|  > It shows the date/time of gateway reboot history                                          |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Memory Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "              total        used        free      shared  buff/cache   available\n"          |
| "Mem:           3.7G        318M        2.5G         25M        967M        3.1G\n"          |
| "Swap:            0B          0B          0B\n",                                             |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Shows current memory usage                                                                    |
|                                                                                              |
|  > If memory is lower than 95%, you will receive an warning email to indicate the memory     |
|                                                                                              |
|  threshold is passed. Please consider to increase the instance size to have better available |
|                                                                                              |
|  memory size.                                                                                |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Disk Usage**               |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Disk Usage***\n",                                                                        |
| "5.4G\t/\n",                                                                                 |
| "2.9G\t/usr\n",                                                                              |
| "1.9G\t/var\n",                                                                              |
| "1.6G\t/var/log\n",                                                                          |
| "1.3G\t/usr/src\n",                                                                          |
| "863M\t/usr/lib\n",                                                                          |
|                                                                                              |
| ... (the rest is omitted.)                                                                   |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates disk usage on the gateway.                                                          |
|                                                                                              |
|  > The maximum size of /usr should be lower than 6G, please open  a support ticket at        |
|                                                                                              |
|  https://support.aviatrix.com if you see abnormal usage in a folder.                         |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+

+-----------------------------+----------------------------------------------------------------+
|**File System**              |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***File System***\n",                                                                       |
| "Filesystem      Size  Used Avail Use% Mounted on\n",                                        |
| "udev            1.9G     0  1.9G   0% /dev\n",                                              |
| "tmpfs           382M  7.1M  375M   2% /run\n",                                              |
| "/dev/xvda1       16G  5.7G  9.8G  37% /\n",                                                 |
| "tmpfs           1.9G     0  1.9G   0% /dev/shm\n",                                          |
| "tmpfs           5.0M     0  5.0M   0% /run/lock\n",                                         |
| "tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup\n",                                    |
| "tmpfs           382M     0  382M   0% /run/user/1000\n",                                    |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Virtual Mem statistics**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Virtual Memory statistics***\n",                                                         |
| "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----\n",        |
| " r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st\n",        |
| " 0  0      0 2220768 181288 1178804    0    0     6    23   85  128  0  0 100  0  0\n",     |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Software Version**         |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***Software Version***\n",                                                                  |
| "================================================================================\n",        |
| "Branch: UserConnect-5.3\n",                                                                 |
| "Commit: commit d02bf8434\n",                                                                |
| "Commit Date:   Tue Mar 10 11:15:11 2020 -0700\n",                                           |
| "Build Date: Tue Mar 10 11:31:16 PDT 2020\n",                                                |
| "Built By: Reyweng\n",                                                                       |
| "================================================================================\n",        |
| "\n",                                                                                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**EC2 Instance Metadata**    |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "***EC2 Instance Metadata***\n",                                                             |
| "{\n",                                                                                       |
| "  \"architecture\" : \"x86_64\",\n",                                                        |
| "  \"availabilityZone\" : \"ca-central-1b\",\n",                                             |
| "  \"billingProducts\" : null,\n",                                                           |
| "  \"devpayProductCodes\" : null,\n",                                                        |
| "  \"imageId\" : \"ami-01axxxxxxxxxxxxxx\",\n",                                              |
| "  \"instanceId\" : \"i-046xxxxxxxxxxxxxx\",\n",                                             |
| "  \"instanceType\" : \"t2.medium\",\n",                                                     |
| "  \"kernelId\" : null,\n",                                                                  |
| "  \"pendingTime\" : \"2020-03-25T08:47:05Z\",\n",                                           |
| "  \"privateIp\" : \"10.187.77.159\",\n",                                                    |
| "  \"ramdiskId\" : null,\n",                                                                 |
| "  \"region\" : \"ca-central-1\",\n",                                                        |
| "  \"version\" : \"2017-09-30\"\n",                                                          |
| "}{\n",                                                                                      |
| "  \"Code\" : \"Success\",\n",                                                               |
| "  \"LastUpdated\" : \"2020-03-26T00:47:40Z\",\n",                                           |
| "  \"InstanceProfileArn\" : \"arn:aws:iam::xxxxxxxxxxxx:instance-profile/                    |
|                                                           aviatrix-role-ec2\",               |
| "  \"InstanceProfileId\" : \"XXXXXXXXXXXXXXXXXXXXX\"\n",                                     |
| "}{\n",                                                                                      |
| "  \"Code\" : \"Success\",\n",                                                               |
| "  \"LastUpdated\" : \"2020-03-26T00:53:47Z\",\n",                                           |
| "}"                                                                                          |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates EC2 Instance Metadata status.                                                       |
|                                                                                              |
|  > Aviatrix support will need AMI ID and instance type and other EC2 metadata for debugging  |
|                                                                                              |
|    purpose.                                                                                  |
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
|                                                                                              |
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
|**VPN Status Output**        |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "VPN config": "Pass",                                                                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the VPN configuration status. Expected value: Pass                                  |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Auth Config**              |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Auth Config": [                                                                             |
|     {                                                                                        |
|         "cfg": "Pass",                                                                       |
|         "method": "SAML auth"                                                                |
|     }                                                                                        |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates the authentication method configured on the VPN gateway.                            |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Server Cert Output**       |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Server Cert": "good",                                                                       |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Files Not Found**          |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Files not found": [                                                                         |
|     "/etc/openvpn/utils.py",                                                                 |
|     "/home/ubuntu/cloudx-aws/boto-2.42.tar.gz"                                               |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
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
|                                                                                              |
|  > Status is active when FQDN egress control is enabled.                                     |
|                                                                                              |
|  > Status is inactive when FQDN egress control is disabled or failed.                        |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Hostname-filter Report**   |                                                                |
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
|**Hostname-filter Status**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Hostname-filter Status": [                                                                  |
|     "● avx-hostname-filter.service - Aviatrix Hostname Filter\n",                            |
|     "   Loaded: loaded (/lib/systemd/system/avx-hostname-filter.service;                     |
|                                    disabled; vendor preset: enabled)\n",                     |
|     "   Active: inactive (dead)\n"                                                           |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Hostname-filter service status                                                      |
|                                                                                              |
|  > Default: inactive                                                                         |
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
|**Ulimit Output**            |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Ulimit": [                                                                                  |
|     "65536\n"                                                                                |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Services Status Output**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Rsyslog Service": "Service: Disabled, Process: Running",                                    |
| "Splunk Service": "Service: Disabled, Process: Not Running",                                 |
| "Filebeat Service": "Service: Disabled, Process: Not Running",                               |
| "Sumologic Service": "Service: Disabled, Process: Not Running",                              |
| "Datadog Service": "Service: Disabled, Process: Not Running",                                |
| "Netflow Service": "Service: Disabled, Process: Not Running",                                |
| "CloudWatch Service": "Service: Disabled, Process: Not Running",                             |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates logging service status.                                                             |
|                                                                                              |
| > Default: Not running                                                                       |
|                                                                                              |
| > Related Link `Remote Syslog Integration`_.                                                 |
|                                                                                              |
| > Related Link `Splunk Integration`_.                                                        |
|                                                                                              |
| > Related Link `Filebeat Integration`_.                                                      |
|                                                                                              |
| > Related Link `Sumologic Integration`_.                                                     |
|                                                                                              |
| > Related Link `Datadog Integration`_.                                                       |
|                                                                                              |
| > Related Link `Cloudwatch How To`_.                                                         | 
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**mpm_prefork Output**       |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "mpm_prefork config": {                                                                      |
|     "/etc/apache2/mods-enabled/mpm_prefork.conf": [                                          |
|         "<IfModule mpm_prefork_module>",                                                     |
|         "\tStartServers\t\t   5",                                                            |
|         "\tMinSpareServers\t\t   5",                                                         |
|         "\tMaxSpareServers\t\t  10",                                                         |
|         "\tMaxRequestWorkers\t3000",                                                         |
|         "\tServerLimit             3000",                                                    |
|         "\tMaxConnectionsPerChild     0",                                                    |
|         "</IfModule>",                                                                       |
|         ""                                                                                   |
|     ]                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Apache MaxRequest Workers.                                                          |
|                                                                                              |
|  >The MaxRequestWorkers directive sets the limit on the number of simultaneous requests      |
|                                                                                              |
|  that will be served. The value of MaxRequestWorkers should be 3000, if not, you'll just     |
|                                                                                              |
|  need to restart the Cloudxd service on the Controller. this can be done by the following    |
|                                                                                              |
|  steps: Controller UI > Troubleshoot > Diagnostics > Services > Restart cloudxd              |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**CIS Patch Output**         |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "CIS Patch status": {                                                                        |
|     "Not patched": [                                                                         |
|         "Enable support for FIPS 140-2",                                                     |
|         "X-XSS-Protection and X-Content-Type-Options Headers",                               |
|         "Increase File Descriptor limit"                                                     |
|     ],                                                                                       |
|     "Patched": []                                                                            |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**SW Patch status**          |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "SW Patch status": {                                                                         |
|     "Not patched": [                                                                         |
|         "Apply xml file patch for Splunk year 2020 bug"                                      |
|     ],                                                                                       |
|     "Patched": [                                                                             |
|         "Mitigation for Datadog Agent installation issue on Ubuntu 14.04"                    |
|     ]                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|Indicates Software status                                                                     |
|                                                                                              |
|  > The patches are good to apply - we usually try to address the vulnerabilities through our |
|                                                                                              |
|  software upgrades, but for ones which need to be done outside of an upgrade, we use the     |
|                                                                                              |
|  patch process.                                                                              |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**Ingress Control Output**   |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "Ingress Control": {                                                                         |
|     "Routing": "disabled",                                                                   |
|     "GuardDuty Service": {                                                                   |
|         "Account": "robin-aws",                                                              |
|         "Region": "ca-central-1",                                                            |
|         "Account status": "disabled",                                                        |
|         "AWS status": "disabled"                                                             |
|     }                                                                                        |
| },                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**rp_filter Output**         |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "rp_filter": [                                                                               |
|     "net.ipv4.conf.all.rp_filter = 0\n",                                                     |
|     "net.ipv4.conf.eth0.rp_filter = 0\n"                                                     |
| ],                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|N/A                                                                                           |
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|                                                                                              |
+-----------------------------+----------------------------------------------------------------+
|**FQDN service status**      |                                                                |
+-----------------------------+----------------------------------------------------------------+
|::                                                                                            |
|                                                                                              |
| "FQDN stats service": [                                                                      |
|     "fqdn_stats                       RUNNING   pid 2121, uptime 16:39:45\n"                 |
| ]                                                                                            |
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
.. _Filebeat Integration: https://docs.aviatrix.com/HowTos/AviatrixLogging.html#filebeat-forwarder

.. disqus::
