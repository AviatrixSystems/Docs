.. meta::
  :description: Firewall Network
  :keywords: Transit Gateway, Aviatrix Transit network, GCP, Transit DMZ, Egress, Firewall


==============================================================
Bootstrap Configuration Example for Palo Alto VM-Series in GCP
==============================================================

Using the bootstrap option simplifies the Palo Alto VM-Series initial configuration setup. 

In this document, we provide a bootstrap example to set up an "Allow All" and Egress NAT policy for the VM-Series to validate that traffic is indeed sent to the VM-Series for VPC to VPC traffic inspection. This example does not use Panorama. 

Please use 9.0.3.xfr and above .xfr version for better results. For more information refer to `PAN-OS 9.1 Release Notes <https://docs.paloaltonetworks.com/pan-os/9-1/pan-os-release-notes/pan-os-9-1-release-information>`_.

Note that if you are using Panorama, the PAN-OS version should be the same or higher than the firewall VMs when they are added to Panorama, such as 9.0.3.xfr for both Panorama and VMs. 

For a manual setup, follow `this manual setup example. <https://docs.aviatrix.com/HowTos/config_paloaltoGCP.html>`_ 


1. Creating the IAM Role and Policy
-----------------------------------

Log in to the GCP console and create an IAM role with the name (for example) "bootstrap-VM-gcp-role". 
Attach an IAM policy with a descriptive name, such as "bootstrap-VM-S3-policy". The policy has the following statements. 

::

    {
        "Version": "2021-10-17", 
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "s3:ListBucket"
                ],
                "Resource": [
                    "arn:aws:s3:::*"
                ]
            },
            {
                "Effect": "Allow",
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::*"
                ]
            }
        ]
    }


2. Creating the Bootstrap Bucket Structure
------------------------------------------

The top level directory structure (named, for example, "bootstrap-bucket") must contain the following directories. You can also create a plugins directory, but it is not mandatory:

::

    bootstrap-bucket/
      config/
        init-cfg.txt
        bootstrap.xml
      content/
      license/
      software/
      plugins/ 	

|GCP_bootstrap_bucket|

The config directory contains the configuration files, init-config.txt and bootstrap.xml. 

The content directory contains the application and threat updates; WildFire updates; and the BrightCloud URL filtering database for the valid subscriptions on the VM-Series firewall.

The software directory contains the software images required to upgrade a newly provisioned VM-Series firewall to the desired PAN-OS version for your network. You must include all intermediate software versions (between the current version and the final PAN-OS software version) to which you want to upgrade the VM-Series firewall.

The license directory contains the license keys or authorization codes for the licenses and subscriptions that you intend to activate on the firewalls.

The GCP Service Account needs permission to access the storage buckets: storage.buckets.get 
This is configured under IAM & Admin in GCP.

3. Uploading Config Files
------------------------

**3.1** The example bootstrap.xml file provided here contains the "Allow All", Egress and API admin setup. To download the file, click :download:`bootstrap.xml <bootstrap_example_paloalto_gcp_media/bootstrap.xml>`. 

**3.2** To download the example init-cfg.txt file, click :download:`init-cfg.txt <bootstrap_example_paloalto_gcp_media/init-cfg.txt>`. 

.. Note::
	In the example bootstrap.xml, you must specify custom usernames and passwords for the <https_interface_admin_username> and <api_admin_username>, and generate hash strings for the passwords.


**3.3** Upload these two files to your GCP config folder in the bootstrap-bucket.

|GCP_bootstrap_bucket|

4. Launching the VM-Series Instance
-----------------------------------

Follow the Aviatrix Firewall Network (FireNet) workflow up to and including `Step 7a. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_.

#. Fill in the required fields for the firewall instance as per the FireNet workflow.
#. Click the Advanced checkbox. This displays the Bootstrap Bucket Name field.
#. Enter the bootstrap bucket name (for example, 'bootstrap-bucket-gcp'). It must be unique.
#. Launch the VM-Series instance. Wait at least 15 minutes for it to boot up and initialize. 
#. Login to the HTTPS interface of the VM-Series management public IP with the username and password specified in the bootstrap.xml file.


5. Configuring API Vendor Integration
--------------------------------------

For the Aviatrix Controller to automatically update firewall instance route tables and monitor the firewall instance health and manage instance failover, you need to set up API access permissions. 

Go to **Controller > Firewall Network > Vendor Integration > Firewall**. Note the following fields.  

 -  Firewall Login User Name field: use the username specified in the bootstrap.xml file.
 -  Firewall Login Password field: use the password specified in the bootstrap.xml file.

If you are manually configuring the firewall from scratch, follow `the instructions here <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html>`_ to enable API access. 


6. DNAT Policy for Health Check
--------------------------------
For information on configuring the mandatory DNAT rule in GCP, see `here. <https://docs.aviatrix.com/HowTos/config_paloaltoGCP.html#gcp-vm-series-health-check>`_.


7. Specifying Network Domain for Packet Inspection
--------------------------------------------------

Now your firewall instance is ready to receive packets.

The next step is to specify which network domain needs packet inspection by defining a connection policy that connects to
the firewall domain. This is done by `Step 8 <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#specify-network-domain-for-firewall-inspection>`_ in the Firewall Network workflow. 

For example, deploy Spoke-1 VPC in Network_Domain_1 and Spoke-2 VPC in Network_Domain_2. Build a connection policy between the two domains. Build a connection between Network_Domain_2 to Firewall Domain. 

Launch one instance in Spoke-1 VPC and Spoke-2 VPC. From one instance, ping the other instance. The ping should go through.  

7. Viewing Traffic Log
----------------------

You can view if traffic is forwarded to the firewall instance by logging in to the VM-Series console. Click Monitor. Start pinging packets from one Spoke VPC to another Spoke VPC where one or both of network domains are connected to the Firewall Network Domain.

8. Additional References
--------------------------

The following links from Palo Alto Networks for PAN-OS 8.1 and 9.0 provide additional information.

`Create the init-cfg.txt File <https://docs.paloaltonetworks.com/vm-series/9-0/vm-series-deployment/bootstrap-the-vm-series-firewall/create-the-init-cfgtxt-file.html#id8770fd72-81ea-48b6-b747-d0274f37860b>`_

`Bootstrap the VM-Series Firewall on AWS 9.0 <https://docs.paloaltonetworks.com/vm-series/9-0/vm-series-deployment/bootstrap-the-vm-series-firewall/bootstrap-the-vm-series-firewall-in-aws.html>`_

`Bootstrap the VM-Series Firewall on AWS 8.1 <https://docs.paloaltonetworks.com/vm-series/8-1/vm-series-deployment/bootstrap-the-vm-series-firewall/bootstrap-the-vm-series-firewall-in-aws.html>`_

.. |bootstrap_bucket| image:: bootstrap_example_paloalto_gcp_media/bootstrap_bucket.png
   :scale: 30%


.. disqus::
