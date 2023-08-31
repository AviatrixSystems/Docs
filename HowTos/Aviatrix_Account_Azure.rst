
===========================================================
Azure Account Credential Setup 
===========================================================

1. Overview
=============

Aviatrix Controller uses Azure APIs extensively to launch Aviatrix
gateways, configure encrypted peering and other features.

In order to use Azure API, you need to first create an Aviatrix `Access
Account <https://docs.aviatrix.com/HowTos/aviatrix_account.html>`_ on the Aviatrix Controller. This access account corresponds
to a valid Azure subscription with API credentials. You need to create an access account for each subscription. 

This document describes, for a given subscription, how to set up your Azure account credentials and onboard this Azure account to your Aviatrix Controller. Then, your Aviatrix Controller can execute APIs on that subscription.

.. note::

  These instructions apply generally to both Azure commercial and Azure Government clouds for onboarding Azure accounts to your Controller. Note that some screenshots may show regions that are only available for commercial Azure accounts. Commercial Azure offers multiple regions worldwide while Azure Government offers four US regions: (US) USGov Virginia, (US) UsGov Arizona, (US) UsGov Iowa, and (US) UsGov. For more information about Azure regions, click `here <https://azure.microsoft.com/en-us/global-infrastructure/geographies/#overview>`_. 

2. API and Permission Setup 
========================================

Setting up Azure permission for Aviatrix involves the following steps.

#. Registering Aviatrix Controller Application with Azure Active Directory
#. Assigning a role to the Aviatrix Controller Application
#. Creating a Secret Identifier
#. Setting API Permissions for the Aviatrix Controller Application
#. Onboarding Your Azure Access Account in the Aviatrix Controller

As you complete the first four steps, find and save these four values: your **Azure Subscription ID**, **Directory ID**, **Application ID**, and **Application Key value** (from your Client secret) to complete the last step, onboarding your Azure Access Account in the Aviatrix Controller.

**Important:** Complete the following steps in order.

Registering Your Aviatrix Controller Application
-------------------------------------------------------

1. Log into the `Azure portal <https://portal.azure.com>`_ and click **All services**. Search for “Azure Active Directory” and click on “Azure Active Directory.”
2. Click **App registrations** on the left (not App registrations (Legacy)). Click **+ New registration** near the top of the page.

|image03|

3. Enter a clear and memorable name for your Aviatrix Controller application, select **Accounts in this organizational directory only,** and then click **Register** at the bottom of the page. The page displays details of your Aviatrix Controller application registration.  
4. Copy the **Application ID** and **Directory ID** into a Notepad file and save the file. You will use the name of your Aviatrix Controller application and these ID values later to onboard your Azure access account in the Aviatrix Controller.

Assigning a Role to the Aviatrix Application
------------------------------------------------------------
After registering your Aviatrix Controller as an app, assign this app a role to set up the connection between your Azure account and your Aviatrix Controller.

1. Log in to the Azure portal, click **All services** in the top left, and search for "Subscriptions."
2. Copy the Subscription ID to the Notepad file where you saved the Application ID and Directory ID.

|image12|

3. Click the **Subscription Name** to open the subscription.
4. On the Subscriptions page, select **Access control (IAM)** on the left.
5. On the Access control (IAM) page, click **+ Add** > **Add role assignment**.
6. Under Add role assignment, select the **Contributor** role for this app. If the Contributor role is too broad, you can later replace it with a custom role with specific permissions. Refer to `Use Azure IAM Custom Role <https://docs.aviatrix.com/HowTos/azure_custom_role.html>`_ for instructions. 
7. Click **+ Select members**. On the right, under Select members, in the Select search field, enter "aviatrix" into the field provided to search for the Aviatrix Controller app that you registered in the `Registering Your Aviatrix Controller Application <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#registering-your-aviatrix-controller-application>`_ section. Your app should appear in the list below. Select your Aviatrix Controller app and click **Select** towards to the bottom.

|image13|

8. On the Add role assignment page, click **Review + assign** in the bottom left.

Your Aviatrix Controller app is now assigned a Contributor role for this Azure subscription.

As an alternative to steps 3-8 above, you can run the following PowerShell commands from your Azure AZ PowerShell module, or Azure Cloud Shell, to set up the Contributor role:


 .. code-block:: json

        az ad sp create-for-rbac --name "name you want to use here" --role="Contributor" --scopes=/subscriptions/xxxx-xx-xxxx-xxxx (replace Xs with subscription id)
	az ad sp list --show-mine  --output table


Creating a Secret Identifier
------------------------------------------------------------

After registering your Aviatrix Controller as an app and assigning it the Contributor role, create a Secret identifier. Azure Active Directory uses this Secret identifier to authenticate the Aviatrix Controller application.

1. Navigate back to All services > Azure Active Directory > App registrations and select the application you registered earlier.
2. Select **Certificates & secrets** on the left. Then, click **+New client secret**.
2. On the right, under Add a client secret, enter:

* **Description**  - Aviatrix
* **Expires**  - Select a time period that complies with your organization's security standards

3. Click **Add** towards the bottom. 

4. The page displays your new Client secret. Copy the secret **Value** to the Notepad file where you saved your **Account ID**, **Directory ID**, and **Subscription ID**. These four values are necessary to onboard this Azure account in the Aviatrix Controller.

Setting API Permissions for the Aviatrix Controller Application
------------------------------------------------------------

The API permission provides the Aviatrix Controller application permission to access Azure APIs. 

#. Navigate back to All services > Azure Active Directory > App registrations. 
#. Click on the Aviatrix Controller application link. 
#. From the left sidebar, select **API permissions**; then click **+ Add a permission**. 
#. Under Request API permissions, click **Azure Service Management**. 
#. On the Request API permissions for Azure Service Management page, under Permissions, select **user_impersonation.**

You can now use the four values you saved to onboard your Azure account in your Aviatrix Controller.

==========================================               ======================
Access Account Setup Input Field                         Value
==========================================               ======================
Subscription ID                                          From the `"Assigning a Role to the Aviatrix Application" <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#assigning-a-role-to-the-aviatrix-application>`_ section
Directory ID                                             From the `"Registering Your Aviatrix Controller Application" <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#registering-your-aviatrix-controller-application>`_ section
Application ID                                           From the `"Registering Your Aviatrix Controller Application" <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#registering-your-aviatrix-controller-application>`_ section
Client Secret Value                                      From the `"Creating a Secret Identifier" <https://docs.aviatrix.com/HowTos/Aviatrix_Account_Azure.html#creating-a-secret-identifier>`_ section
==========================================               ======================

Onboarding Your Azure Access Account in the Aviatrix Controller
-------------------------------------------------------------------------------

#. Open your Aviatrix Controller. From the left sidebar, select **ONBOARDING**. 
#. Select Microsoft Azure from the list of Cloud Service Providers (CSPs). Make sure to select **Microsoft Azure**, not Azure Government.
#. Enter an Account Name for this Azure subscription. This name labels the account in the Aviatrix Controller and does not need to be a specific value from your Azure account.
#. In the fields provided, enter the four values you saved in a Notepad file: the ARM Subscription ID, Directory ID, Application ID, and Application Key. Then, click **CREATE**.

Your Primary Access Account for Azure should be successfully onboarded. To troubleshoot onboarding issues, see the `Aviatrix support website <http://support.aviatrix.com>`_ or `contact Aviatrix Support <http://https://aviatrix.com/contact>`_.

Additional References
=======================

If you need additional information, refer to `How to: Use the portal to create an Azure AD application and service principal that can access resources <https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal>`_ on Azure documentation.

Azure China notes
==================

Deploying the Aviatrix Gateway in the Azure China Cloud
-----------------------------------------------------------

Prerequisites:

You must already have a Microsoft Azure China account and Aviatrix Controller in AWS China to deploy an Aviatrix Gateway in the Azure China Cloud.


1. Create the Aviatrix Controller in your AWS China Cloud. Go to Onboarding and select Azure China. 
2. Enter the Aviatrix Customer ID.
3. Enter the Certificate Domain.
4. Create the Primary Access Account.
6.  Deploy Aviatrix Gateway from the Gateway page in the Aviatrix Controller or the Multi-Cloud Transit Solution page.

For more information, see “What is a China ICP License?”

.. |image01| image:: AviatrixAccountForAzure_media/az-ad-01.PNG
   :width: 5.20313in
   :height: 1.50209in
.. |image02| image:: AviatrixAccountForAzure_media/az-ad-directory-id-02.PNG
   :width: 5.65600in
   :height: 2.39763in
.. |image03| image:: AviatrixAccountForAzure_media/Image03.png
   :width: 70%
.. |image04| image:: AviatrixAccountForAzure_media/Image04.png
   :width: 100%
.. |image05| image:: AviatrixAccountForAzure_media/az-ad-list-all-apps-05.PNG
   :width: 5.65600in
   :height: 2.39763in
.. |image06| image:: AviatrixAccountForAzure_media/Image06.png
   :width: 100%
.. |image07| image:: AviatrixAccountForAzure_media/Image07.png
   :width: 100%
.. |image08| image:: AviatrixAccountForAzure_media/Image08.png
   :width: 100%
.. |image09| image:: AviatrixAccountForAzure_media/Image09.png
   :width: 100%
.. |image10| image:: AviatrixAccountForAzure_media/Image10.png
   :width: 100%
.. |image11| image:: AviatrixAccountForAzure_media/az-ad-sub-role-11.PNG
   :width: 5.65600in
   :height: 2.39763in
.. |image12| image:: AviatrixAccountForAzure_media/az-ad-sub-list-12.PNG
   :width: 6.98958in
   :height: 3.02083in
.. |image13| image:: AviatrixAccountForAzure_media/az-ad-sub-contrib-13.PNG
   :width: 6.98958in
   :height: 3.02083in
   
.. |image14| image:: AviatrixAccountForAzure_media/Image14.png
   :width: 100%
.. |image15| image:: AviatrixAccountForAzure_media/Image15.png
   :width: 100%


.. add in the disqus tag

.. disqus::   
