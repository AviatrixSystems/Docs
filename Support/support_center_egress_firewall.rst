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

White lists should specifically be used for access to applications or access to servers. If you are browsing the WEB/internet, then you should be using black lists since a lot of webpages refer or load content from other websites, or use Discovery feature to discover the websites you are surfing and use that to configure your white lists https://docs.aviatrix.com/HowTos/fqdn_discovery.html


Which policies are executed first - egress or firewall?
----------------------------------------------------------------------------

The policies for 80/443 are executed first followed by the other policies



How can I overcome the character limit in REST API and Terraform while adding a lot of FQDN Rules for a FQDN Egress Control Tag?
--------------------------------------------------------------------------------------------------------------------------------------------------------

There is a character limit while using `FQDN Egress Control REST API <https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_set_fqdn_filter_tag_domain_names>`_, which might limit you to about 100 FQDN rules. You can use the following workaround to load a file with FQDN Rules. The size of the file can be upto 65280 bytes. We recommend that you keep your FQDN rules to less than 500-750 per Tag.
 

::

  First: Prepare your data file("test_file" in this example) for your Egress Control Rules. Format is "FQDN,protocol,port". Here's an example:
    *.yahoo.com,tcp,443
    google.com,tcp,443

  Next: Make sure that you have an Egress Filter Tag created on the controller. "Controller UI > Security > Egress Control > New Tag". "newtag2" for this example

  Next: Using REST API, login to you controller and generate a CID. This works on a Mac - replace the username, password and controller's IP/FQDN. https://s3-us-west-2.amazonaws.com/avx-apidoc/API.htm#_login
    curl -k -s --data "action=login" --data "username=admin" --data "password=My-Pass-3484" "https://1.1.2.55/v1/api"

  Next: Copy the following python code into a file, lets say, egress-rules.py. Update the CID value from the above command, the url and run it:

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
