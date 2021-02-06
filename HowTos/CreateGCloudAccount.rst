.. meta::
   :description: Create GCloud Account on Aviatrix Controller
   :keywords: GCloud, create GCloud, create GCloud account, Aviatrix, GCP credentials




===================================================================
GCP Credentials
===================================================================


Before creating a cloud account for GCloud/GCP on the Aviatrix controller, go through the
steps below to make sure you have the credentials set up for API calls.


Step 1: Create a GCloud Account
-------------------------------

Create a GCloud or GCP account (https://cloud.google.com/). Go on to the next
step if you have already done so.

Note that the controller supports multiple accounts with each one
associated with a different GCloud projects, but there needs to be at
least one to start with.

Step 2: Create a GCloud Project
---------------------------------

Login to your GCloud account and go to the project page:
https://console.cloud.google.com/project

Create a project. Go on to the next step if you have already created
one. Note the project ID will be used in referencing to the project by
Aviatrix controller.

(As an example, we created a project Aviatrix-UCC, the project ID is
aviatrix-ucc-1214)

Step 3: Enable Compute Engine API
----------------------------------

Enable Compute Engine API on the selected project,

1. Go to your Google Cloud Platform console, at the upper left corner
   left to Google Cloud Platform signage, click the 3 bars. A drop down
   menu will appear.

2. Select APIs and Services, at Dashboard, click on Enable APIs and Services

|image3|

3. On the Search box, input Compute Engine API and select it from search result

|image2|

4. click Enable.

Step 4: Enable GCloud Messaging Service
-------------------------------------------

The Aviatrix controller uses GCloud Pub/Sub messaging services to communicate
with the gateways.

To enable Pub/Sub on the selected project,

1. Go to your Google Cloud Platform console, at the upper left corner
   left to Google Cloud Platform signage, click the 3 bars. A drop down
   menu will appear.

2. Select APIs and Services, at Dashboard, click on Enable APIs and Services

3. On the Search box, input Cloud Pub/Sub API and select it from search result

4. Click Enable.

Step 5: Create Credential File
----------------------------------

When you create a cloud account Aviatrix Controller for GCloud, you will be asked to upload a
GCloud Project Credentials file. Below are the steps to download the
credential file from the Google Developer Console.

1. Open the `Credential
   page <http://console.developers.google.com/project/_/apiui/credential>`__

2. Select the project you are creating credentials for.

3. At Credentials, Click Create credentials, select Service account,
   as shown below

   |service_account|

4. At the Service Accounts, enter a Service account name and click Create. For Service account permissions, select Project, Editor, as shown below. 

 |iam_credential|

5. Select a service account. Click the 3 skewer bar and select Create Key. Select JSON, click Create.

6. Click Create. The credential file will be downloaded to your local
   computer.

7. Upload the Project Credential file to the Aviatrix controller at the GCloud
   account create page.

Note: Creating Service Account with Restricted Access
-----------------------------------------------------
It is recommended to create the service account with the Editor role as mentioned in Step 5.4 but in some cases an orginizations might want
to further restrict permission for the service account. In such a situation Aviatrix recommendation is to have at least following roles assigned
to service account so that Aviatrix can perform its functions properly. For instance managing the compute resources, route tables, firewall rules, shared service vpc network etc. 

    . Compute Admin
    . Service Account User
    . Organization Administrator (required for GCP Shared VPC)
    . Project IAM Admin (required for GCP Shared VPC)

   image:: https://netjoints.com/wp-content/uploads/2020/09/Screen-Shot-2020-09-28-at-2.28.46-PM.png

   If an orginization is currently using GCP Shared VPC or planning to use in future then it is a requirement to enable Organization Administrator 
   and Project IAM Admin as well.
   


Troubleshooting Tips
----------------------

If cloud account creation fails, check the error message at the Aviatrix
controller console and try again with the steps provided in this
document.

For additional support, send an email to support@aviatrix.com

.. |image0| image:: GCloud_media/image1.png

.. |image1| image:: GCloud_media/image2.png

.. |image2| image:: GCloud_media/gcloud-api-library-search.png

.. |image3| image:: GCloud_media/gcloud-enable-apis-and-services.png

.. |service_account| image:: GCloud_media/service_account.png
   :scale: 30%

.. |iam_credential| image:: GCloud_media/iam_credential.png
   :scale: 30%

.. disqus::
