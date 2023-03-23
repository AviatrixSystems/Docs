
###################################
Tag Based Security Policy
###################################

Aviatrix Gateway security policies are implemented at each gateway. Key features are:

 * It is a L4 stateful firewall that filters on CIDR, protocol and port. 
 * Each policy is associated with an Allow or Deny action.
 * A Base policy for "Allow" or "Deny" for the gateway can be used as a catch-all rule.  
 * All security policy events as well as packets can be logged to Splunk, SumoLogic, Syslog, ELK, and Datadog. 

Starting with release 3.0, a tag mechanism has been introduced to make the security policy specification more user-friendly. You can associate an IP address or a subnet with a name tag and use it as a shorthand to specify the source and destination for your security rules.

Defining a Tag
--------------------

You give a tag a name and a list of one or more network addresses. The network address can be a subnet or a host IP address. Navigate to Security > Stateful Firewall > Tag Management > Add New.

A tag is a global resource to the Aviatrix Controller and can be applied to any gateway.

Editing a Tag
------------------

Once a tag is created, you can edit the tag. 

Editing is about adding a name to a CIDR address (network address or host address). 
Multiple Name<->CIDR pair can be added. When you are done editing, click **Update** to implement your changes. 

Applying Policy
---------------------

Navigate to Security > Stateful Firewall > Policy. 

You should see a list of gateways that the Controller manages. Highlight a gateway and click **Edit**.

To configure security policies, select a Base Policy. A Base Policy is always attached as the 
last rule as a catch-all policy. 

Select **Enable Packet Logging** if you want to forward logs to well known log management systems, such as Splunk, Sumo Logic, Elastic Search, and remote syslog.

If you click **Add New**, you can specify Source by manually entering a specific CIDR. You can also click the table icon to select one of the tags you created earlier.

Both Source and Destination can be configured either manually or by using tags. Once a rule is saved, you must remember to click **Update** for the policy to take effect. 

Note: For the Destination field, if a host name is specified either manually or with a tag, the IP address of the host name will be resolved when programming the security policy. A host name is not suitable if it is a public web site, such as www.google.com. To filter on public host names, refer to `FQDN Whitelists. <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`__

Viewing Policy and Tags
------------------------------

To view the names in a tag, select **Tag Management**, highlight a tag and click **Edit**. 

To view the policies of gateway, select **Policy**, highlight a gateway, and click **Edit**.


Example Use Case
--------------------------

Say you have a group of virtual machine (EC2/GCE) instances or a group of AWS Workspace instances. You would like to set up policies to allow them to access a database which itself consists of a group of nodes. 

You can create a tag, name it my-app, and configure the list of IP addresses associated with each instance with a name. You can then create a second tag, name it my-database, and configure the list of IP addresses associated with each instance with a name. 

You then can simply apply one policy at the gateway that says my-app to my-database is allowed. The Controller will automatically push the policies to the gateway. 



.. disqus::
