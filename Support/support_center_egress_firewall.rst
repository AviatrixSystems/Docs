.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
Security: Egress FQDN Control and Firewall
===========================================================================

Why should base policies be same?
--------------------------------------

When you are using multiple Egress Filters and/or Security Policies on the same gateway, we program the rules into the gateway with a default setting for packets which don't meet your specific rules. When there are different base policies being configured, the interpretation from the admin and what has been programmed into the system might vary. To avoid this misinterpretation, we do request the users to not mix the base rules and stick with all "white lists/deny all" or all "black lists/allow all" policies/base rules


Should I use Black lists or White lists for Egress FQDN Control?
----------------------------------------------------------------------------

White lists should specifically be used for access to applications or access to servers. If you are browsing the WEB/internet, then you should be using black lists since a lot of webpages refer or load content from other websites, or use the Discovery feature to discover the websites you are surfing and use that to configure your white lists https://docs.aviatrix.com/HowTos/fqdn_discovery.html


Which policies are executed first - egress or firewall?
----------------------------------------------------------------------------

The policies for 80/443 are executed first followed by the other policies.
FQDN takes precedence over Stateful Firewall.



How can I overcome the character limit in API and Terraform while adding a lot of FQDN Rules for a FQDN Egress Control Tag?
--------------------------------------------------------------------------------------------------------------------------------------------------------

There is a character limit while using `FQDN Egress Control API <https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_set_fqdn_filter_tag_domain_names>`_, which might limit you to about 100 FQDN rules. You can use the following workaround to load a file with FQDN Rules. The size of the file can be upto 65280 bytes. We recommend that you keep your FQDN rules to less than 500-750 per Tag. You might see a "CID required" error, if you run into this issue.
 

::

  First: Prepare your data file("test_file" in this example) for your Egress Control Rules. Format is "FQDN,protocol,port". Here's an example:
    *.yahoo.com,tcp,443
    google.com,tcp,443

  Next: Make sure that you have an Egress Filter Tag created on the controller. "Controller UI > Security > Egress Control > New Tag". "newtag2" for this example

  Next: Using API, login to your controller and generate a CID. This works on a Mac - replace the username, password and controller's IP/FQDN. https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_login
    curl -k -s --data "action=login" --data "username=admin" --data "password=My-Pass-3484" "https://1.1.2.55/v1/api"

  Next: Copy the following python code into a file, let's say, egress-rules.py. Update the CID value from the above command, input the url and run it:

  ----------
  #!/usr/local/bin/python3
  import requests
  import os
  
  CID = "aL4H34aPWnS738TmHsGV"
  fqdn_file = "test_file"
  tag_name = "newtag2"
  url="https://1.1.2.55/v1/api"
  
  print("import FQDN config file")
  myfile = {
              "import_file":open(fqdn_file, "rb")
           }
  
  payload = {
      "action": "import_fqdn_filter_tag_domain_names_from_file",
      "CID": CID,
      "tag_name": tag_name
  }
  
  response = requests.post(url=url, files=myfile ,data=payload, verify=False)
  print(response.json())
  ----------
  
  Next: Check on your controller to verify that the Egress FQDN Filter tag has been updated.


What is the DNS dependency for Egress Control?
---------------------------------------------------

By default, the DNS server on the Gateways are set to 8.8.8.8, except when you have manually edited the Gateway (Controller UI > Gateway > Edit) to "Enable VPC DNS" to pick up VPC'S DNS settings (ether through DHCP Option or the default AWS VPC DNS Server)
 
When the egress control is enabled:

  * If you set rules only for 80/443 ports: when you enable the egress fqdn list, the gateway will check if it has access to the DNS before it will turn on the FQDN filter. If it cannot access the DNS server, it will fail this enable operation.
  * If you set rules for non-80/443: the controller will replace the gateway default DNS (8.8.8.8) - with the Server from DHCP Options or DNS VPC Server. If the gateway cannot reach this new DNS, the enable operation on the FQDN Egress Control will fail.
 
If you run into these issues, please try:

  * Run `diagnostics on the gateway <https://docs.aviatrix.com/HowTos/troubleshooting.html#run-diagnostics-on-a-gateway>`_ and look for `"DNS Resolution" tag <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_.
  * Go to "Controller Web Interface > Troublshoot > Diagnostics > Network > Gateway Utility" and pick the gateway and try to ping to an FQDN and see if the name to IP resolution happens.
  
  
How can I create an Egress Control Aviatrix Gateway in Azure?
-------------------------------------------------------------------

Azure's subnets by default have an internet gateway associated. So the process is slightly different from AWS. Here are the steps:

1. Create a subnet for your VNET. Do NOT associate any route table to this subnet. This will be your public subnet. This subnet will be used when creating the Aviatrix gateway.
2. Create a second subnet for user instances. Create a route table and associate it with this second subnet. This will act as a private subnet like in AWS.
3. Launch an Aviatrix Gateway in the first public subnet created in Step 1. If you need an HA, you can create it in the same subnet.


Where can I find the traffic logs for my Egress FQDN Control on my Aviatrix Gateway?
-------------------------------------------------------------------

All traffic through your Aviatrix Egress Control Gateways will be logged. You can check out the logs from the Controller at "Controller/Security/EgressControl/EgressFQDNViewLog". We recommend that you `turn on external logging <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_ to send the syslogs from Aviatrix to your logging systems. Please look at the `right tag for FQDN relevant logs <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#id9>`_. 


What is the Egress FQDN Filter behavior on controller 6.0+?
-------------------------------------------------------------------

For Egress FQDN Filter on controller version 6.0, there is a mechanism that will sort all the FQDN rules on the same egress gateway in order by the following factors:

1. Edit/Action: For White-list/Black-list “Deny"/"Allow” rules comes first then “Allow"/"Deny” rules then the “Base-policy" rules
2. Edit/Domain: More specific domain and no wildcard(‘*’) comes first. ex: abc.sts.awsamazon.com -> sts.awsamazon.com -> *.awsamazon.com
3. Edit Source: No source IP comes first than rules with source.
4. Shorter Domain or smaller number of CIDR/Subnet.

In 6.0, every domain access will go through this list that be sorted by these factors to see if there is a domain-match.
Once the domain-match happens, it will stop checking the rest of the list, and comes out a result of “MATCH” or “NO-MATCH”.

This design certainly has some limitation when there are multiple specific rules with source filter enabled.
Here is an example: the first rule is allow sts.awsamazon.com from 10.10.10.0/24 and the second rule is *.awsamazon.com from 10.10.20.0/24.
Packet is from 10.10.20.200 the source is not matched with first rule and the packet dropped .

Here's improvement in latest 6.1 (R6.1.1280).
When doing above FQDN rule checking for domain-match with source, it will continue to check the rest of the rules to see if there is domain-match but with different sources.

Hence, the result will be different before and after 6.1.1280 version, for example:

* Source host 10.10.20.100 is making a connection to sts.awsamazon.com
* FQDN Filter Tag A: attach egress gw1 with rule A1: sts.awsamazon.com, Source 10.10.10.0/24, Base policy
* FQDN Filter Tag B: attach egress gw1 with rule B1: *.awsamazon.com, Source 10.10.20.0/24, Base policy

The order of FQDN filter list for gw1 will be A1 -> B1 (Refer to above factor 2. More specific domain comes first)

Version 6.0 ~ before 6.1.1280
Source host 10.10.20.100 CAN’T access sts.awsamazon.com. The domain “sts.awsamazon.com” first match rule A1 and Source 10.10.20.100 is not in rule A1. => NO-MATCH

Version after 6.1.1280
Source host 10.10.20.100 CAN access sts.awsamazon.com. The domain “sts.awsamazon.com” first match rule A1 and Source 10.10.20.100 is not in rule A1, instead of stopping checking, in 6.1 it will continue to check other rules and find the better match rule B1 with Source 10.10.20.0/24. => MATCH
