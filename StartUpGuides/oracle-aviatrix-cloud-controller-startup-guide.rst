


===============================================
Oracle Cloud Infrastructure (OCI) Startup Guide
===============================================


The Aviatrix cloud network solution consists of two components, the controller and 
gateways, both of which are cloud VMs. Gateways are launched from the controller console to specific VCNs. This
guide helps you to launch the gateway in OCI. Make sure you follow the instructions to also subscribe to the Aviatrix Companion Gateway described in this guide.

.. Note::

  Currently we only support deploying the Controller in AWS. The preferred approach is to launch the Controller from the AWS Marketplace as a metered AMI
   by following the `AWS Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_.
   The Aviatrix Controller is multi cloud, multi subscription and multi region capable. Launching the Controller in AWS can also enable you to deploy gateways in OCI,


1. Prepare your account in OCI
==============================

Create an OCI account
-----------------------

Create an OCI account if you do not already have one.


Set up your account
--------------------

Although you can use default account and root compartment, it is recommended that you follow this doc to create your own user, group, and compartment with the right policy.

`Setting Up Your Tenancy <https://docs.cloud.oracle.com/iaas/Content/GSG/Concepts/settinguptenancy.htm>`_


2. Access the Controller
=========================

After the Controller instance is in a running state in AWS, you can access the Controller
via a browser by `https://Controller_public_IP`, where Controller_public_IP is the static public IP address of the Controller.

The initial password is the private IP address of the instance.

Follow the steps to go through an initial setup phase to download the latest software.
After the latest software is downloaded, re-login again to go through the onboarding process.

3. Onboarding
==============
The purpose of onboarding is to help you setup an account on the Aviatrix Controller that
corresponds to an OCI account with compartment policies so that the Controller can launch gateways using OCI APIs.
For on-boarding the OCI account in the Aviatrix controller, we need following four pieces of information: User OCID, Tenancy OCID, Compartment OCID, API Private Key File.

User OCID
---------
* Login to your OCI console and go to the Navigation Menu (3 bars on top left)->Identity->Users
* Identify the IAM User who will be making the API calls and copy the User OCID

 |oci_user|

Tenancy OCID
------------
* Login to your OCI console and go to the Navigation Menu (3 bars on top left) Administration->Tenancy Details
* Copy the Tenancy OCID

 |oci_tenancy|

Compartment OCID
----------------
* Login to your OCI console and go to the Navigation Menu (3 bars on top left) Identity->Compartments
* Choose the compartment and copy the Compartment OCID

 |oci_compartment|

Please note that if you have multiple compartments, choose one that has right set of policies which are required for Aviatrix to work. The best practice is to create a separate compartment for your operations and assign right policies to it.

API Key
-------

If you already have an existing RSA key pair in .pem format, you can use that as well. However, please note that this key pair is not the SSH key that is used to access compute instances. Both the private key and public key must be in PEM format (not SSH-RSA format). If you do not have an existing RSA key pair, you can follow the aforementioned steps from the terminal in your laptop to generate the API key

1. Generate an API Signing Key: If you're using Windows, you'll need to install “Git Bash for Windows” and run the following commands with that tool. Mac and Linux users can run the following commands on their terminal
    a.	Create a. oci directory to store the credentials: mkdir ~/ .oci
    b.	Generate the private key without passphrase: openssl genrsa -out ~/.oci/oci_api_key.pem 2048
    c.	Change the key settings, so that only you can read the file: chmod go-rwx ~/.oci/oci_api_key.pem
    d.	Generate the Public Key: openssl rsa -pubout -in ~/.oci/oci_api_key.pem -out ~/.oci/oci_api_key_public.pem
    e.	Copy the contents of the public key in clipboard locally in your computer: cat ~/.oci/oci_api_key_public.pem | pbcopy. Note: You may have to install pbcopy, if it is not already installed on your system. Alternatively, you can also open the public key file on the terminal and copy the file from there

2. Upload the Public Key in the console:
    a.	Sign in to the OCI console
    b.	Login to your OCI console and go to the Navigation Menu (3 bars on top left)Identity->Users
    c.	Choose the right User who will be making the API call
    d.	Click Add Public Key
    e.	Paste the contents of the PEM public key and click Add. Once you complete this, you will see the Key’s fingerprint

 |oci_api_key|

For more details, please refer to
`Required Keys and OCIDs <https://docs.cloud.oracle.com/iaas/Content/API/Concepts/apisigningkey.htm>`_


Once you have the above info, please go to Aviatrix Controller->Accounts->Access Accounts->New Account and fill the required information. Please note that you should upload the Private Key file in the Aviatrix controller (which is different than the one you put in the OCI console). You can find that key in the folder where you generated the key in the above steps (.oci folder in above example)


Congratulations on finishing your onboarding.
Please go ahead to the "Useful Tools" menu at the main navigation on the left panel, and select Create a VPC -> +Create to create a VCN in OCI.
Enjoy!


.. |oci_user| image:: OCIAviatrixCloudControllerStartupGuide_media/oci_user.png
   :width: 2.90683in
   :height: 0.35000in
.. |oci_tenancy| image:: OCIAviatrixCloudControllerStartupGuide_media/oci_tenancy.PNG
   :width: 5.49426in
   :height: 2.99954in
.. |oci_compartment| image:: OCIAviatrixCloudControllerStartupGuide_media/oci_compartment.PNG
   :width: 5.05625in
   :height: 2.77932in
.. |oci_api_key| image:: OCIAviatrixCloudControllerStartupGuide_media/oci_api_key.png
   :width: 2.90683in
   :height: 0.35000in
.. |oci_account| image:: OCIAviatrixCloudControllerStartupGuide_media/oci_account.PNG
   :width: 5.40347in
   :height: 2.95863in


.. add in the disqus tag

.. disqus::
