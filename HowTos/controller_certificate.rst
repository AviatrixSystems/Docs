.. meta::
   :description: Certificate Management
   :keywords: Controller Certificate Management, Gateway Certificate Management

###################################
Certificate Management Overview
###################################

Customer can choose to use Aviatrix certificate created at the time of installation for the Controller and Gateway or customize the Controller and Gateway certificate to use an organization specific certificate. Both type are certificate issued locally through the Aviatrix Controller's automated processes. To customize the Controller or Gateway certificate, refer to the below steps. 

###################################
Controller Certificate Management
###################################

Aviatrix Controller uses a self-signed certificate by default. That is why you see "Not Secure" 
at the browser. You can make it secure by importing a signed certificate. 

There are two methods to accomplish this: 

 - Import a Certificate with Key  
 - Generate CSR and Import a Certificate

Import Certificate with Key
-----------------------------

This is the **preferred approach** compared to the next approach detailed below. Simply import ca.crt, server.crt and server.key to the Controller and 
you are done. In this method, the private key file server.key must match the server.crt. Please refer to the configuration example `here <https://docs.aviatrix.com/HowTos/import_cert_with_key.html>`_ .

Generate CSR and Import Certificate
-------------------------------------

In this approach, you generate a .csr file, get it signed, and then import to the controller. 

Step 1. Generate the CSR file
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

|gen_csr|

After this step is executed, the csr is downloaded to your local host. A new popup window should
appear to ask for CA cert. You should take this csr to a sign 
authority to get it signed and in return, you will get two files: ca cert and server cert. 

Step 2. Import CA cert
^^^^^^^^^^^^^^^^^^^^^^^^^

When you obtain the CA cert, import/upload to the new pop up window, as shown below. 

|ca.crt|

Step 3. Import Server cert
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After CA cert is imported, a new pop up window appears for you to upload the server certificate, 
as shown below. 

|server_crt|

If everything works, you now have a signed certificate on the Controller!


###################################
Gateway Certificate Management
###################################

The Gateway Certificate is created when each Gateway is launched thru the Controller console. At the time of Gateway launch, an Aviatrix self-signed certificate is issued to the Gateway to make sure all data transmission to and from the Gateway is authenticated. If you don't customize the certificate, your Gateway will continue to operate with the default certificate. If you choose to customize the certificate with your organization credentails, then you must apply the below steps to customize all existing and new Gateway. 

In addition, you can confirm and monitor each Gateway certificate type in the Aviatrix Controller Console > Gateway > reference column Cert Type. Please note, when customizing Gateway Certificates, all existing Gateways will get the custom certificate if the Gateway is on software version 6.0 or higher. All earlier version will failed the custom cert deployment.


Setup Custom Gateway Certificate
-------------------------------------

Step 1. Navigate to the Setting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Go to Settings > Advanced > Security subtab. Scroll down to the section Gateway Certificate Import Method. 

Step 2. Upload file and key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In the input field, upload the CA Certificate and CA Private Key. Click Ok.


Once you click ok, you will get a confirmation box to show that only R6.0 or higher will apply. Earlier version will failed the deployment for custom cert. If this happens, you will need to update the Gateway to the latest version before applying custom certificate. 

Step 3. Check the Gateway Cert Type to Confirm Deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
When the deployment completes, go to your Gateway list and display the column name Cert Type. Check to make sure each of the Cert Type is Custom. 





.. |gen_csr| image::  controller_certificate_media/gen_csr.png
    :scale: 30%

.. |ca.crt| image::  controller_certificate_media/ca.crt.png
    :scale: 30%

.. |server_crt| image::  controller_certificate_media/server_crt.png
    :scale: 30%

.. |imageRestoreAWS| image::  controller_backup_media/backup_restore_restore_aws.png

.. |S3Create| image:: controller_backup_media/S3Create.png
.. |S3Properties| image:: controller_backup_media/S3Properties.png
    :scale: 30%
.. |S3SelectDefaultEncryption| image:: controller_backup_media/S3SelectDefaultEncryption.png
      :scale: 25%
.. |S3SelectEncryption| image:: controller_backup_media/S3SelectEncryption.png
      :scale: 25%
.. |KMSKeyCreate| image:: controller_backup_media/KMSKeyCreate.png
      :scale: 30%
      :align: middle
.. |KMSKeyAddUser| image:: controller_backup_media/KMSKeyAddUser.png
      :scale: 30%
      :align: middle

.. disqus::
	  
