.. meta::
   :description: onboarding Frequently Asked Questions
   :keywords: Aviatrix Getting Started, Aviatrix, AWS

============================
Onboarding and Account FAQs
============================


Where do I start?
-------------------


The first time when you login, complete Onboarding process. It takes a
few steps.

If you have a BYOL license or use a community image, you need to have a
customer ID provided by Aviatrix to be able to use the product. Contact
support@aviatrix.com if you do not have a customer ID.

What is an Aviatrix access account on the Controller?
-------------------------------------------------------------

An Aviatrix access account (or account for short) represents two sets of information:

  1. The AWS account credential that the Controller uses to launch Aviatrix gateway in that AWS account.
  #. Login access credential to the Controller.

Why do I need AWS account credential?

To build connectivity between two VPCs, the Aviatrix Controller launches Aviatrix gateway instances
in the respective VPCs, instructs the gateways to build an IPSEC tunnel and modifies AWS route tables
in each VPC.

To accomplish this task, the Controller needs your AWS credentials to issue AWS APIs, for example,
to launch the gateway instances and modify route tables, on your behalf. An AWS credential consists of

 - `The 12 digit AWS account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_
 - `IAM roles and IAM policies <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_

If you need to connect two VPCs that are owned by one AWS account, you just need one AWS credential, i.e, one Aviatrix access account.

If you need to connect two VPCs that are owned by two different AWS accounts, you then need two AWS credentials, therfore two access accounts.

The access account is also used to access the Controller web console, therefore it is associated an email address and login password in case you want to login to only manage that one account.

What is the Aviatrix Primary Access Account?
---------------------------------------------

There is only one primary access account on the Controller. The primary access account's AWS account credential is the one that the Controller is launched and it is already setup during the Controller instance launch time with CloudFormation template.   

To setup the primary access account during onboarding time, you just need to enter Controller access credentials (email, password) and the 12 digit AWS account that Controller is launched on.

Once you setup the primary access account, you can launch Aviatrix gateways in the VPCs that belong to this account. 


Why should I use IAM role instead of access key and secret key?
----------------------------------------------------------------

With the support of AWS IAM role, there is no need to enter AWS access
key and secret key when creating an access account on an Aviatrix controller.
Instead, two IAM roles will be created. Aviatrix controller will use the
dynamically obtained security credentials to request access to AWS
resources. Role-based IAM cloud account helps to reduce the risk of AWS
credentials being compromised.


Can an Aviatrix Access Account be multi-cloud?
-----------------------------------------------

An Aviatrix Cloud Account can correspond to multiple cloud account. For
example, it can contain credentials for an AWS IAM account, Azure
account and GCloud account.

How do I upgrade software?
---------------------------

Click Settings -> Upgrade, select latest. This upgrades to the latest release of the
controller software.

When a new release becomes available, an alert message appears on
Dashboard. An email will also be sent to the admin of the controller.

Are there reference design examples?
-------------------------------------

Check out docs.aviatrix.com.

What is the support model?
----------------------------

For support, send email to
`support@aviatrix.com <mailto:support@aviatrix.com>`__. We also offer premium customers with 24x7 support.
To request a
feature, click Make a wish button at the bottom of each page.


.. |image1| image:: FAQ_media/image1.png

.. disqus::
