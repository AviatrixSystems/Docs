.. meta::
   :description: UCC Frequently Asked Questions
   :keywords: ucc, faq, frequently asked questions, ucc faq, aviatrix faq

===========================
Frequently Asked Questions
===========================

Aviatrix product consists of a controller and gateways. When the product is deployed in the
public cloud marketplace, what you launch is the controller instance and from controller console you launch gateways by using cloud provider APIs.

When the product is deployed as a virtual appliance in a virtualized datacenter environment, the controller and gateway is bundled into one virtual image, such as OVF and VHD.

The following FAQ discusses only the cloud deployment scenario.

Aviatrix Cloud Gateway
======================


**Q1: What can it do for me?**


Aviatrix Cloud Gateway provides an end to end secure network solution
for AWS, Azure and Google GCloud. The solution includes `AWS Global Transit Network <http://docs.aviatrix.com/HowTos/transitvpc_faq.html>`_, an enterprise
`OpenVPN® <http://docs.aviatrix.com/HowTos/openvpn_faq.html>`_ access to VPC/VNet, `encrypted routing <http://docs.aviatrix.com/HowTos/peering.html>`_ for VPC/VNet to VPC/VNet traffic, `Stateful Firewall and Egress FQDN <http://docs.aviatrix.com/HowTos/FQDN_Whitelists_Ref_Design.html>`_ and
`monitoring and logging <http://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_ of link status and latency. The solution enables
you to build a secure private network spanning one or more public clouds
where a user access any instance/VM with a private IP address directly.
No more bastion stations and jump hosts, the solution gives user the
seamless experience that they enjoy when using the on-prem network.

For an Aviatrix overview, check out `this document. <http://docs.aviatrix.com/StartUpGuides/aviatrix_overview.html>`_ 

In additioin, the product interoperates with any third party IPSEC capable devices, including AWS VGW and Aviatrix's own on-prem virtual appliance CloudN.

Architecturally, Aviatrix solution is a centrally managed, loosely
coupled and globally deployed platform built for the cloud from the
ground up.

**Q2: How do I launch the product?**


The product consists of two components, the controller and one or more
gateways. The gateway is launched from the controller.

The controller provides a central console for all provisioning,
monitoring and upgrades of the services.

The controller is available in AWS and Azure marketplace. It is also
available as a GCloud community image. For marketplace launch, search
for “Aviatrix” in marketplace.

Follow `Getting Started <http://docs.aviatrix.com/>`_ instructions to launch controller.

**Q3: How do I access the controller?**


Once you have launched the instance, you access the Controller instance
via a web browser.

https://public\_IP\_address\_of\_the\_controller\_instance

Login with username “admin”. The first time password is the private IP
address of the controller instance. You are required to change the
password at your first login.

**Q4: How do I secure the controller?**


Only TCP port 443 needs to be opened for inbound traffic to the
controller. If you wish to reduce the scope of source addresses by
specifying custom IP address, you must include all gateway public IP
addresses, in addition to your own public IP address. This is because
gateways launched from the controller use its public IP address to
communicate back to controller.

**Q5: Is Aviatrix Cloud Gateway a SaaS offer?**


No. Aviatrix Cloud Gateway is a software product that is deployed in
your own network perimeter.



Onboarding
==========



**Q1: Where do I start?**


The first time when you login, complete Onboarding process. It takes a
few steps.

If you have a BYOL license or use a community image, you need to have a
customer ID provided by Aviatrix to be able to use the product. Contact
support@aviatrix.com if you do not have a customer ID.

**Q2: What is an Aviatrix Cloud Account?**


An Aviatrix Cloud Account is specific and unique on the controller. It
contains cloud credentials, for example, your AWS IAM Access Key ID and
Secret Key. The controller uses these credential to launch Aviatrix
gateways by using cloud APIs.

An Aviatrix Cloud Account can correspond to multiple cloud account. For
example, it can contain credentials for an AWS IAM account, Azure
account and GCloud account.

**Q3: How do I upgrade software?**


Click Settings -> Upgrade. This upgrades to the latest release of the
controller software.

When a new release becomes available, an alert message appears on
Dashboard. An email will also be sent to the admin of the controller.

**Q4: Is there a reference design example?**


Check out docs.aviatrix.com.

**Q5: What is the support model?**


For support, send email to
`support@aviatrix.com <mailto:support@aviatrix.com>`__. We also offer premium customers with 24x7 support.
To request a
feature, click Make a wish button at the bottom of each page.



Logging and Monitoring
======================




**Q1: How do I forward syslog events to my Logstash server?**


Click on Settings-> Logging ->LogStash logging and input the required
parameters to enable forwarding of controller syslog events and all
gateways syslog and auth log to a Logstash server.

SUMO Logic, Splunk, DataDog and rSyslog are also supported.

**Q2: What are the monitoring capabilities?**

Encrypted tunnel (peering and site2cloud) status is monitored. When a tunnel status changes, an alert email is sent to the controller admin.

Active VPN users are displayed on the Dashboard. Click on any username,
the user VPN connectivity history is displayed.

You can also disconnect a user from the dashboard.

**Q3: Can alert email be sent to a different email address?**

Yes, you can choose an alternative email address to send alert messages.
This is useful if the controller admin is different from the operation team.


Administration
==============


**Q1: Can there be multiple admins?**


Yes. Username “admin” is the default admin user. But you can create
multiple users with admin privilege.
Follow `the instructions <http://docs.aviatrix.com/HowTos/AdminUsers_DuoAuth.html>`_ to learn more about setting up multiple admin users.

**Q2: Is there 2FA support to log in to the console?**


Yes. In addition to password login, DUO authentication and LDAP are supported.

**Q3: Can there be read only account for operation team?**

Yes. Accounts -> Account Users -> Add A NEW USER, at Account Name field, select "read_only" from the drop down menu. This user account will have views to all pages but cannot make changes to any configurations.


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image1| image:: FAQ_media/image1.png

.. disqus::
