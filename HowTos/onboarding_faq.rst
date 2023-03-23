
============================
Onboarding and Account FAQs
============================


Where do I start?
-------------------------


The first time you log in to Aviatrix Controller, complete the onboarding process. The onboarding process involves entering the information about your cloud provider account(s) that the Controller requires for launching gateways and building connectivity in the VPCs/VNets/VCNs of your account(s). The account information required can vary depending on the cloud provider. To complete the onboarding process, click on **Onboarding** from the Aviatrix Controller left sidebar, click on the icon of the cloud provider in which your Controller is to launch gateways, and then follow the steps to enter your cloud provider account information.

What is an Aviatrix Customer ID?
------------------------------------

If you have a BYOL license, metered license, or use a community image, you need to have a
customer ID provided by Aviatrix to be able to use the product. Please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ if you do not have a customer ID.

What is an Aviatrix Access Account on the Controller?
-------------------------------------------------------------

An Aviatrix access account (or account for short) represents the following information:

  - The cloud provider account (for example, AWS) credential that the Controller uses to launch Aviatrix Gateway in that cloud account.

What is the Controller ID?
-----------------------------------

Controller ID is a 32-digit Universal Unique Identifier (UUID). This ID is unique per customer and used for tracking purposes.

This 32-digit UUID is available under Settings > Controller > License.

What are the different types of licenses available?
---------------------------------------------------------------

There are three different types of licenses option available in Aviatrix Controller.

#. Bring Your Own License (BYOL) License  - This license supports public cloud AWS, Azure, GCP and OCI. Please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_ to get BYOL license.
#. Metered or Platinum Metered License  - This is only applicable to AWS public cloud.
#. Utility  - The utility machine image (AMI/VM Image) is available in AWS and Azure both and supports maximum 100 tunnels and limited number of VPN users.

To check your license type, navigate to the Aviatrix Controller's console > Settings > Controller > License.

Why do I need an AWS account credential?
--------------------------------------------------------

To build connectivity between two VPCs in AWS, the Aviatrix Controller launches Aviatrix Gateway instances
in the respective VPCs, instructs the gateways to build an IPsec tunnel and modifies AWS route tables
in each VPC.

To accomplish this task, the Controller needs your AWS credentials to issue AWS APIs, for example,
to launch the Gateway instances and modify route tables, on your behalf. An AWS credential consists of:

 - `The 12-digit AWS account number <https://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html>`_
 - `IAM roles and IAM policies <http://docs.aviatrix.com/HowTos/HowTo_IAM_role.html>`_

If you need to connect two VPCs that are owned by one AWS account, you just need one AWS credential, that is, one Aviatrix access account.

If you need to connect two VPCs that are owned by two different AWS accounts, you then need two AWS credentials, and therefore two access accounts.

The access account is also used to access the Controller web console. Therefore, it is associated with an email address and login password in case you want to log in to only manage that one account.

What is the Aviatrix Primary Access Account?
----------------------------------------------------------

There is only one primary access account on the Controller. The primary access account's AWS account credential is the one that the Controller is launched on and it is already set up during the Controller instance launch time with a CloudFormation template.   

To set up the primary access account during onboarding time, you just need to enter the 12-digit AWS account that Controller is launched on. 

(For release 3.1 and earlier you also need to enter the Controller access credentials: email and password).

Once you set up the primary access account, you can launch Aviatrix Gateways in the VPCs that belong to this account. 


Why should I use an IAM role instead of access key and secret key?
-------------------------------------------------------------------------------------

With the support of AWS IAM role, there is no need to enter an AWS access
key and secret key when creating an access account on an Aviatrix Controller.
Instead, two IAM roles are created. The Aviatrix Controller uses the
dynamically obtained security credentials to request access to AWS
resources. A role-based IAM cloud account helps to reduce the risk of AWS
credentials being compromised.


Can an Aviatrix Access Account be multi-cloud?
----------------------------------------------------------------

No. An Aviatrix Cloud Account corresponds to one cloud account of one cloud type. 
You can create multiple Cloud Accounts to support multi cloud and multi account deployment environment.

How Do We Apply Azure Role-Based Access Control (RBAC) to an Aviatrix Azure Account?
-------------------------------------------------------------------------------------------------------------

The Aviatrix Controller is viewed as an application running on Azure. Since this application needs to create or 
program Azure resources, such as launching a gateway, modifying route entries in a route table, etc., 
the application requires a role with certain permissions. By default, this role is a pre-defined Azure built-in
role called "Contributor." 

If you wish not to use the Contributor role and instead creating a custom 
role with Aviatrix-provided permission, you can do so via Azure portal or with via PowerShell. 
Below is guide on how to accomplish that via PowerShell. 

**Note:** For security purposes, Aviatrix recommends you use a custom role rather than the default role Aviatrix created. When you use a custom role name it is important to make sure the AssumeRole policy and Trust policy are correct. The AssumeRole policy is attached to the Azure Virtual Machine role and the Trust policy is accessed on the APP role Trust Relationship tab.

For replacing the Contributor role via Azure portal, refer to `Azure IAM Custom Role <https://docs.aviatrix.com/HowTos/azure_custom_role.html>`_. 

Step 1. Add a Custom Role through Powershell
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The custom role must have permission that meets the requirement for Aviatrix Controller to function. 
The permission is represented by the json file below. 
 
Remember to replace the subscription "11111111-1111-1111-1111-111111111111" with your own valid subscription ID. 

::

  avx_rbac_role.json:

  {
    "Name": "Aviatrix Controller Custom Role",
    "IsCustom": true,
    "Description": "Custom role for Aviatrix Controller",
    "Actions": [
        "Microsoft.MarketplaceOrdering/offerTypes/publishers/offers/plans/agreements/*",
        "Microsoft.Compute/*/read",
        "Microsoft.Compute/availabilitySets/*",
        "Microsoft.Compute/virtualMachines/*",
        "Microsoft.Network/*/read",
        "Microsoft.Network/publicIPAddresses/*",
        "Microsoft.Network/networkInterfaces/*",
        "Microsoft.Network/networkSecurityGroups/*",
        "Microsoft.Network/loadBalancers/*",
        "Microsoft.Network/routeTables/*",
        "Microsoft.Network/virtualNetworks/*",
        "Microsoft.Storage/storageAccounts/*",
        "Microsoft.Resources/*/read",
        "Microsoft.Resourcehealth/healthevent/*",
        "Microsoft.Resources/deployments/*",
        "Microsoft.Resources/tags/*",
        "Microsoft.Resources/marketplace/purchase/action",
        "Microsoft.Resources/subscriptions/resourceGroups/*"
    ],
    "NotActions": [],
    "AssignableScopes": [
        "/subscriptions/11111111-1111-1111-1111-111111111111"
    ]
  }
 
In Powershell, perform the following:
 
1. Edit avx_rbac_role.json, copy and paste above Aviatrix RBAC role. Save the file.

2. New-AzRoleDefinition -InputFile avx_rbac_role.json
 
 
Step 2. Add a Role Assignment in the Azure Portal
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 
In Azure portal > Subscriptions > Access Control (IAM) > Add > Add role assignment. 

At Role assignment, fill the fields as shown below.

========================       =======================
Role                           Aviatrix Controller Custom Role (this is the role created from above)
Assign access to               User, group, or service principal
Select                         My-new-controller (this is the registered application name for the Controller)
========================       =======================

Once the above step is complete, you have assigned the My-new-controller (as a service principal) the custom role 
called "Aviatrix Controller Custom Role."  

For more information on how to PowerShell to create custom role on Azure, refer to `this link. <https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles-powershell>`_. 


How do I set up OCI account credentials?
------------------------------------------------------

Follow the instructions on `Oracle Cloud Infrastructure Documentation. <https://docs.cloud.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm>`_. 


How do I upgrade software?
---------------------------

Click Settings > Upgrade, select latest. This upgrades to the latest release of the
Controller software.

When a new release becomes available, an alert message appears on the
Dashboard. An email will also be sent to the admin of the Controller.

Are there reference design examples?
------------------------------------------------

Check out docs.aviatrix.com.

What is the support model?
-------------------------------------

For support, please open a support ticket at `Aviatrix Support Portal <https://support.aviatrix.com>`_. We also offer premium customers 24/7 support.
To request a feature, click **Make a wish** at the bottom of each page.

In my environment, Aviatrix will be within a PCI CDE environment. Do you have a SOC2 or PCI AOC you would be able to share?
-------------------------------------------------------------------------------------------------------------------------------------------------------------

Aviatrix does not need to be PCI compliant or provide a PCI AOC.
 
Companies that sell some types of **equipment or software** used in cardholder data processing, transmission, and storage environments, but have no access to, or do not impact, those environments, are also not required to be PCI compliant and therefore do not have AOCs. A few examples include routers, firewalls, application servers, database servers, telecommunications equipment, server operating systems, **application firewalls**, etc.

What is Certificate Domain?
--------------------------------

Entering Certificate Domain is required for Aviatrix China Solution. The domain is the one that you registered in China and applied for ICP license. For more information, see `What is a China ICP License <https://docs.aviatrix.com/HowTos/aviatrix_china_overview.html?highlight=What%20is%20a%20China%20ICP%20License#what-is-a-china-icp-license>`_.

   .. important:: Aviatrix recommends that you use the default Certificate Domain and that you do not change the default Certificate Domain. Changing the default Certificate Domain may cause network outages. If you must change the default Certificate Domain, please open a support ticket with `Aviatrix Support <https://support.aviatrix.com>`_ and get assistance before changing the default Certificate Domain.

How do I set up an Account Name Alias?
---------------------------------------------------

For configuration details, refer to `Setup Account Name Alias <https://docs.aviatrix.com/HowTos/aviatrix_account.html#setup-account-name-alias>`_. 

.. |image1| image:: FAQ_media/image1.png

.. disqus::
