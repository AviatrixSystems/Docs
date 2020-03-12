.. meta::
  :description: Role Based Access Control
  :keywords: account, aviatrix, AWS IAM role, Azure API credentials, Google credentials, RBAC


=================================
Role Based Access Control FAQ
=================================

What is the Aviatrix Role Based Access Control (RBAC)?
----------------------------------------------------------

Aviatrix Controller is a multi cloud and multi tenants platform. As the Controller manages multiple cloud accounts by multiple Controller
administrators, it is important to provide access controls to protect the security and integrity of the Controller. 

Aviatrix RBAC aims to achieve two objectives:

  - **Granular Access Control** A Controller administrator in a specific permission group can perform certain tasks for a subnet of Aviatrix `Access Account <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_. For example, a Controller administrator can be limited to perform on his own AWS account VPC attachment function. 
  - **Self Service** A Controller administrator in a specific permission group can onboard its own cloud accounts on the Controller and perform tasks. For example, a Controller administrator can be allowed to onboard his own AWS account on the Controller and create a group of users for different tasks on this access account. 

RBAC Workflow Example 
-----------------------

RBAC allows you to create a hierarchy of the Controller administrators. It has the flexibility of different permutations. The best way to learn how 
RBAC works is by follow the following simple example. 


In this example, the admin of the Controller creates a user Bob who has a full write access to an access account bu1-access-account.


**Step 1** Create an account admin group.  Login as admin, go to Accounts -> Permission Groups -> +Add New. Give the group a name, for example, account_admins. 

**Step 2** Give this group the privilege to create Access Accounts. Go to Accounts -> Permission Groups. Click the 3 skewer dots, click Manage Permission. Click +Add New. Click Accounts. Click OK to confirm. 

**Step 3** Create user Bob to the account_admins group. Go to Account Users -> +New User. Fill the name, Bob, and other fields. For the field RBAC Groups, select account_admins created in Step 1. 

**Step 4** Bob create a new Access Account. Bob should receive an email to invite him to access the Controller. Bob login. Go to Accounts -> Access Accounts -> +Add New. For the field "Attach to RBAC Groups", select account_admins. This creates an access account that associates a cloud account that Bob manages. For the Account Name field, Bob enters bu1-access-account.

**Step 5** Bob creates a new permission group for bu1-access-account. Go to Accounts -> Permission Groups -> +Add New. Fill permission group name, for example, bu1-admin-group.

**Step 6** Associate Bob with the bu1-admin-group. Go to Accounts -> Permission Groups. Select bu1-admin-group, click Manage users. Select Bob to associate with the group. 

**Step 7** Bob grants himself full functional access. Go to Accounts -> Permission Groups. Select bu1-admin-group. Click Manage permissions. Click ALLWrite to grant Bob full access of the account bu1-access-account. 



.. |secondary_account| image:: adminusers_media/secondary_account.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
