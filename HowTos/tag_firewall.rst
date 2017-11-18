.. meta::
   :description: Tag based security policy
   :keywords: Tag based security policy, stateful firewall, Aviatrix gateway, AWS

###################################
Tag Based Security Policy
###################################

Aviatrix gateway security policies is implemented at each gateway, key features are:

 * It is a L4 stateful firewall that filters on CIDR, protocol and port. 
 * Each policy is assoicated with "Allow" or "Deny" action.
 * A Base policy for "Allow" or "Deny" for the gateway can be used as a catch all rule.  
 * All security policy events as well as packets can be logged to Splunk, SumoLogic, rSyslog, ELK and Datadog. 

Starting Release 3.0, Tag mechansim is introduced to make the security policy specification more user friendly. You can assoicated an IP address or a subnet with a name tag and use the name tag to specify the source and destination for your security rules. 

1. Define a Tag
----------------

A tag has a name. It consists of one or a list of network addresses. The network address can be a 
subnet or a host IP address. Security -> Stateful Firewall -> Tag Management -> Add New

A tag is a global resourcec to the Aviatrix Controller. It can be applied to any gateway. 

2. Edit a Tag
--------------

Once a tag is created, you can Edit the tag. 

Editing is about adding a name to a CIDR address (network address or host address). 
Multiple Name<->CIDR pair can be added. When you are done Editing, click Update to take effect. 

3. Apply Policy
----------------

Click Security -> Stateful Firewall -> Policy

You should a list of gateways the Controller manages. Highlight a gateway and click Edit.

To configure security policies, select a Base Policy. Base Policy is the always attached as the 
last rule as a catch all policy. 

Select `Enable Packet Logging` if you want to forward logs to well known log management systems, such as Splunk, Sumo Logic, Elastic Search and remote syslog.

Click Add New, you can specify Source by manually enter a specific CIDR, you can also click the 
table icon to select one of the tags you created earlier. 

Both Source and Destination can be configured either manually or by using tags. Once a rule is "Saved", you must remember to click **Update** for the policy to take effect. 

Note for the Destination field, if a host name either by manual or through tag, the IP address of the host name will be resolved when programming the security policy. Host name is not suitable if it is a public web site, such as www.google.com. To filter on public host names, refer to `FQDN Whitelists. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`__

4. View Policy and Tags
-------------------------

To view the names in a tag, select Tag Management, highlight a tag and click Edit. 

To view the policies of gateway, select Policy, highlight a gateway and click Edit.


5. Example Use Case
---------------------

Say you have a group of EC2 instances or a group of AWS Workspace instance. You like to setup policies to allow them to access a database which itself consists of a group of nodes. 

You can create a tag, name it my-app, configure the list of IP addresses assoicated with each instance with a name. You can then create a second tag, name it my-database, configure the list of IP addresses assoicated with each instance with a name. 

You then can simply apply one policy at the gateway that says my-app to my-database is allowed. The Controller will automatically push the policies to the gateway. 



.. disqus::
