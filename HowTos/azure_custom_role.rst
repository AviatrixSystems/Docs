

=================================
Use Azure IAM Custom Role 
=================================

When Aviatrix Controller uses Azure API to manage networking and gateway resources, an application must be first created in 
Azure AD with an identity of Service Principal. This service principal requires an Azure IAM role assignment together with a set of 
permissions required by the Aviatrix Controller to provide service. By default, we use the Azure built-in "Contributor" role. The Contributor 
role has access to all resources of the subscription. 

If you wish to limit the Controller access permissions, you can do so by creating a custom role with a set of permissions required 
by the Controller as shown below. This document describes how to accomplish this task through the Azure portal. 

Aviatrix Required Custom Role Permissions
---------------------------------------------------------

::

    {
        "properties": {
            "roleName": "Aviatrix Controller Custom Role",
            "description": "Custom role for Aviatrix Controller",
            "assignableScopes": [],
            "permissions": [
                {
                    "actions": [
                        "Microsoft.MarketplaceOrdering/offerTypes/publishers/offers/plans/agreements/*",
                        "Microsoft.Compute/*/read",
                        "Microsoft.Compute/availabilitySets/*",
                        "Microsoft.Compute/virtualMachines/*",
                        "Microsoft.Compute/disks/*",
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
                        "Microsoft.Resources/marketplace/purchase/*",
                        "Microsoft.Resources/subscriptions/resourceGroups/*"
                    ],
                    "notActions": [],
                    "dataActions":[],
                    "notDataActions":[]
                }
            ]
        }
    }  
* For Azure China, please remove "Microsoft.MarketplaceOrdering/offerTypes/publishers/offers/plans/agreements/*" and "Microsoft.Resources/marketplace/purchase/*" from "actions".
 
Creating a Custom Role
----------------------------------------------------

1. Log in to the Azure portal. Go to Subscriptions. Select the subscription whose network already managed by Aviatrix Controller. 
2. Click **Access control (IAM)**.
3. Click **Roles**, as shown below.

 |iam_role|

 4. Click **+Add Role** and select **Add custom role**.
 5. Select **Start from scratch** and click **Next**, as shown below. 

 |start_from_scratch|  

 6. Click **JSON**, and then click **Edit**. 

 |click_json|

 7. Remove the existing JSON template and copy and paste the above Aviatrix required permissions JSON into the Editor box, as shown below. Click **Save**.
 
 |aviatrix_custom_role|
 
 8. Click **Permissions**. You should see the permissions have been populated, as shown below. 

  |show_permission|

 9. Click **Assignable scopes** and then **Add assignable scopes**. Select the subscription. 

 10. Click **JSON**. You should say the subscription has been added to the assignable Scopes, as shown below. 

 |subscription_scope|

 11. Click **Review + create**, and then click **Create**.

Replacing the Contributor Role
---------------------------------------

This step is optional. It is only applicable if you have already assigned the "Contributor" role to the Aviatrix Controller service principal. If not, skip this step and proceed to the next step.

1. Now that you have created a custom role called Aviatrix Controller Custom Role, go ahead replace the Contributor role, as shown below.

 |remove_contributor|

 2. Click **+Add**, select **Add role assignment**. Fill in the fields as shown below.
 
 |replace_role|

Multiple Custom Roles Approach
------------------------------------------------------

The Aviatrix role permissions can be split into multiple custom roles each with a subset of permissions. Subscription permission must 
be at the subscription scope. The additional permission may have the scope of one or more Resource Groups. 

Below is an example where the "Aviatrix Custom Role for subscription" has the scope of subscription and the remaining permissions has the scope of
Resource Group. 

Subscription Scope IAM Custom Role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

::

    {
        "properties": {
            "roleName": "Aviatrix Custom Role for subscription",
            "description": "Aviatrix Custom role for gateway subscription permission",
            "assignableScopes": [],
            "permissions": [
                {
                    "actions": [
                        "Microsoft.MarketplaceOrdering/offerTypes/publishers/offers/plans/agreements/*"
                    ],
                    "notActions": [],
                    "dataActions":[],
                    "notDataActions":[]
                }
            ]
        }
    }


Resource Group Scope IAM Custom role 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Note when creating a custom role for a resource group on Azure portal, start at Subscription > Resource groups, select one resource group, and click **Access Control (IAM)**. Then, follow the role creation process with the permission described in the file below 
to create the role. When configuring Assignable scopes, select one or more resource groups (it is multi-selectable) for this role. After the role is created, assign the role to the Service principal of the Aviatrix Controller application.

.. note::

  It takes a few minutes for the display to appear for the custom role just created. Once it can be displayed, you can find it by going to
  Subscription > Resource groups > select one resource group assigned to the role, then click **Access Control (IAM)**, then click **Roles**. 
  Then search for the role you just created. 

::

    {
        "properties": {
            "roleName": "Aviatrix Custom Role for services",
            "description": "Aviatrix Custom role for the network and gateway services",
            "assignableScopes": [],
            "permissions": [
                {
                    "actions": [
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
                        "Microsoft.Resources/marketplace/purchase/*",
                        "Microsoft.Resources/subscriptions/resourceGroups/*"
                    ],
                    "notActions": [],
                    "dataActions":[],
                    "notDataActions":[]
                }
            ]
        }
    }

.. tip ::

   If you wish to use Contributor role for the above part of the permission, ignore the JSON file listed above. Simply navigate to the
   Azure portal > Resource groups > select the resource group. Click **Access Control (IAM)** > **+Add** > **Add Role assignment**. Then,
   select **Contributor** as the Role and assign the Contributor role to the Aviatrix Controller service principal.

Additional References
--------------------------

To learn more on Azure custom role and how to configure it, see `Azure Custom Roles. <https://docs.microsoft.com/en-us/azure/role-based-access-control/custom-roles>`_

To view the complete Azure role permissions, refer to `Azure resource provider operations. <https://docs.microsoft.com/en-us/azure/role-based-access-control/resource-provider-operations>`_. 

.. |aviatrix_custom_role| image:: azure_custom_role_media/aviatrix_custom_role.png
   :scale: 30%

.. |iam_role| image:: azure_custom_role_media/iam_role.png
   :scale: 30%

.. |remove_contributor| image:: azure_custom_role_media/remove_contributor.png
   :scale: 30%

.. |start_from_scratch| image:: azure_custom_role_media/start_from_scratch.png
   :scale: 30%
.. |click_json| image:: azure_custom_role_media/click_json.png
   :scale: 30%
.. |replace_role| image:: azure_custom_role_media/replace_role.png
   :scale: 30%
.. |subscription_scope| image:: azure_custom_role_media/subscription_scope.png
   :scale: 30%

.. |show_permission| image:: azure_custom_role_media/show_permission.png
   :scale: 30%

.. disqus::
