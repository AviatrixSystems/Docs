.. meta::
   :description: controller Certificate Management
   :keywords: Controller Certificate Management 

###################################
Controller Certificate Management
###################################

The Aviatrix Controller uses a self-signed certificate by default. That is why you see "Not Secure" 
at the browser. You can make it secure by importing a signed certificate. This documentation outlines the **Import a Certificate with Key** method. 

Import a Certificate with Key
-------------------------------------

Step 1. Create Private Key and Certificate Signing Request 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A. Log into SSH on a Linux or macOS device and run the following command to create the private key
 
mymac$ **openssl genrsa -out my_prv.key 4096** 

B.	Create CSR 
 - Run the follow command and fill out the needed information as it relates to your company information.   
 - Leave the password blank 
 
mymac$ **openssl req -new -sha256 -key my_prv.key -out controller.csr** 

Step 2. Upload the CSR to Go Daddy and Retrieve the Certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

A. Upload the CSR

Site Path: GoDaddy.com > SSL > Certificates > Your Desired Domain Name > Rekey & Manage > Re-Key Certificate 
 
Paste certificate signing request (CSR) into entry field 

|godaddy_1|

B. Retrieve the Certificate

Site Path: GoDaddy.com > SSL > Certificates > Your Desired Domain Name > Download 

 - Wait for GoDaddy to respond with Certs 
 - Usually takes 10 minutes (an email will be sent)
 - Download the Certificates 

|godaddy_2|

Step 3. Uploading the Certificates to the Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Path: Controller > Settings > Advanced > Security > Import Certificate Key

 - Select “Import Certificate with Key”
 - If there is an existing CA certificate on the Controller you must disable “Method standard”
 - The CA certificate – the file named gd_bundle
 - The Server certificate - the other file ending in .crt
 - The Private Key – the file produced in step 1 of this documentation

|controller_cert_1|

|controller_cert_2|

If everything works, you now have a signed certificate on the Controller!


Additional Notes
^^^^^^^^^^^^^^^^
 - If a certificate is already present on the Controller then you will need to disable “Import Certificate” before uploading the new certificates. Otherwise the Controller will present an error.

|controller_cert_3| 

 - The Controller will perform a validity check between the Server Certificate and the Private Key





.. |godaddy_1| image::  controller_certificate_media/godaddy_1.png
    :scale: 100%

.. |godaddy_2| image::  controller_certificate_media/godaddy_2.png
    :scale: 100%

.. |controller_cert_1| image::  controller_certificate_media/controller_cert_1.png
    :scale: 100%

.. |controller_cert_2| image::  controller_backup_media/controller_cert_2.png
    :scale: 100%

.. |controller_cert_3| image:: controller_backup_media/controller_cert_3.png
    :scale: 100%

.. disqus::
	  
