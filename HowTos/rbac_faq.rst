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

In this example, the Controller admin creates a user Bob who has full responsibility to access account account-A and account-B. The Controller
admin also creates a user Alice who has full responsibility to access account-B and account-C.

|rbac_example_1|

Tasks carried out by admin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Step 1** Create an account admin group.  Admin Login. Go to Accounts -> Permission Groups -> +Add New. Give the group a name, for example, account-admins. 

**Step 2** Give this group the privilege to create Access Accounts. Go to Accounts -> Permission Groups. Click the 3 skewer dots, click Manage Permission. Click +Add New. Select Accounts in the list of functions. Click OK to confirm. 

**Step 3** Create user Bob to the account_admins group. Go to Account Users -> +New User. Fill the name, Bob, and other fields. For the field RBAC Groups, select account-admins created in Step 1. 

Tasks carried out by Bob
~~~~~~~~~~~~~~~~~~~~~~~~~

**Step 4** Bob should receive an email to invite him to access the Controller. Bob login. Bob creates a new permission group with full access. Go to Accounts -> Permission Groups -> +Add New. Fill permission group name, for example, group-bob. 

**Step 5** Bob associates himself with the group_bob. Go to Accounts -> Permission Groups. Select bob-group, click Manage users. Select Bob to associate with the group. 

**Step 6** Bob grants group-bob functional functional privilege. Go to Accounts -> Permission Groups. Select group-bob. Click Manage permissions. Click ALLWrite to grant group-bob  

**Step 7** Bob creates a new Access Account account-A. Bob login. Go to Accounts -> Access Accounts -> +Add New. For the field "Attach to RBAC Groups", select group-bob. This creates an access account that associates a cloud account that Bob manages. For the Account Name field, Bob enters account-A. 


Bob can repeat **Step 7** to create account-B. Now Bob has full functional access to both account-A and account-B.

Apply **Step 3** to **Step 7** for Alice to manage account-C and account-D.

Can Bob assign a teammate with subset of functional privileges?
-----------------------------------------------------------------

Yes. The deployment is shown in the diagram below.

|rbac_example_2|

Bob should perform the following tasks to have it setup. 

 1. Bob creates a new permission group, say Site2Cloud-ops.
 #. Bob assigns himself to Site2Cloud-ops group.
 #. Bob clicks "Manage permission" for Site2Cloud-ops group to select Site2Cloud permission for the group.
 #. Bob clicks "Manage access accounts" for Site2Cloud-ops group to select account_A. 
 #. Bob creates a new user, say Adam and associate Adam to Site2Cloud-ops group. 

After the above tasks, Adam will be able to login and perform Site2Cloud tasks for account-A. But Adam cannot perform Site2Cloud 
tasks for Alice's account. 




.. |rbac_example_1| image:: rbac_faq_media/rbac_example_1.png
   :scale: 50%

.. |rbac_example_2| image:: rbac_faq_media/rbac_example_2.png
   :scale: 50%

.. |account_structure| image:: adminusers_media/account_structure.png
   :scale: 50%

.. |access_account_35| image:: adminusers_media/access_account_35.png
   :scale: 50%

.. disqus::
