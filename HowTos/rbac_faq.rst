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

How does RBAC work?
----------------------

RBAC allows you to create a hierarchy of the Controller administrators. It has the flexibility of different permutations.

The best way to explain how RBAC works is through examples. Following are a few deployment examples. 

RBAC Deployment Example 1
---------------------------

In this example, the Controller admin creates a user Bob who has full responsibility to access account account_A and account_B. The Controller
admin also creates a user Alice who has full responsibility to access account_B and account_C..

|rbac_example_1|


**Step 1** Create an account admin group.  Admin Login. Go to Accounts -> Permission Groups -> +Add New. Give the group a name, for example, account_admins. 

**Step 2** Give this group the privilege to create Access Accounts. Go to Accounts -> Permission Groups. Click the 3 skewer dots, click Manage Permission. Click +Add New. Select Accounts in the list of functions. Click OK to confirm. 

**Step 3** Create user Bob to the account_admins group. Go to Account Users -> +New User. Fill the name, Bob, and other fields. For the field RBAC Groups, select account_admins created in Step 1. 

**Step 4** Bob should receive an email to invite him to access the Controller. Bob login. Bob creates a new permission group with full access. Go to Accounts -> Permission Groups -> +Add New. Fill permission group name, for example, group_bob. 

**Step 5** Bob associates himself with the group_bob. Go to Accounts -> Permission Groups. Select bob_group, click Manage users. Select Bob to associate with the group. 

**Step 6** Bob grants bob_group functional functional privilege. Go to Accounts -> Permission Groups. Select group_bob. Click Manage permissions. Click ALLWrite to grant group_bob  

**Step 7** Bob creates a new Access Account account_A. Bob login. Go to Accounts -> Access Accounts -> +Add New. For the field "Attach to RBAC Groups", select account_admins. This creates an access account that associates a cloud account that Bob manages. For the Account Name field, Bob enters account_A. 


Bob can repeat **Step 7** to create account_B. Now Bob has full functional access to both account_A and account_B.

Follow **Step 1** to **Step 7** for Alice to manage account_C and account_D.


.. |rbac_example_1| image:: rbac_faq_media/rbac_example_1.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
