.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=========================================================
Bootstrap Configuration Example for VM-Series in AWS
=========================================================

Using bootstrap option significantly simplifies VM-Series initial configuration setup. 

In this document, we provide a bootstrap example to set up an "Allow All" and Egress NAT policy for the VM-Series to validate 
that traffic is indeed sent to the VM-Series for VPC to VPC traffic inspection. This example does not use Panorama. 

Please use 9.0.3.xfr and above .xfr version for better results. Please refer to `PAN-OS 9.0.3 XFR for VM-Series <https://live.paloaltonetworks.com/t5/Blogs/PAN-OS-9-0-3-XFR-for-VM-Series-Now-Available/ba-p/290908>`_ .

Note that Panorama PAN-OS version should be the same or higher than the firewall VMs when they are added to the Panorama, like, 9.0.3.xfr for both Panorama and VMs.

For a manual setup, follow `manual setup example. <https://docs.aviatrix.com/HowTos/config_paloaltoVM.html>`_


1. Create IAM Role and Policy
--------------------------------

Login to AWS console, create an IAM role with the name, for example, "bootstrap-VM-S3-role". 
Attach an IAM policy with the name, for example, "bootstrap-VM-S3-policy". The policy has the following statements. 

::

    {
        "Version": "2012-10-17",
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


2. Create bootstrap bucket structure
-------------------------------------

In AWS S3, at the top level create a bucket for bootstrap with a **unique** name, for example "bootstrap-bucket", with the following structure:

::

    bootstrap-bucket/
      config/
        init-cfg.txt
        bootstrap.xml
      content/
      license/
      software/

|bootstrap_bucket|

3. Upload config files
------------------------

**3.1** The example bootstrap.xml file contains the "Allow All", Egress and API admin setup. To downloady the file, click :download:`bootstrap.xml <bootstrap_example_media/bootstrap.xml>`. 

**3.2** For the example init-cfg.txt file, click :download:`init-cfg.txt <bootstrap_example_media/init-cfg.txt>`. 

.. Note::

  In the example bootstrap.xml, the API admin user name is avxadmin and the password is Aviatrix123#. You can customize it.  

**3.3** upload these two files to your config folder in the bootstrap-bucket. 

4. Launch the VM-Series instance
-----------------------------------

Follow the Aviatrix Firewall Network (FireNet) workflow 
to `Step 7a. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_.

Fill in the required fields. Click Advanced. Fill in the following parameters.

================================  ======================
**Advanced Field**                **Example Value**
================================  ======================
IAM Role                          bootstrap-VM-s3-role
Bootstrap Bucket Name             bootstrap-bucket (must be a unique name in S3)
================================  ======================

Launch the VM-Series instance. Wait for 15 minutes for it to boot up and initialize. 

Login to the HTTPS interface of VM-Series management public IP with username "admin", password "Aviatrix123#"


5. Configure API Vendor Integration
--------------------------------------

In order for the Aviatrix Controller to automatically update firewall instance route tables, monitor the firewall instance health and manage instance failover, you need to setup API access permissions. 

Go to Controller -> Firewall Network -> Vendor Integration -> Firewall. Note the following fields.  

 -  Firewall Login User Name field, use "avxadmin" without the double quotes.
 -  Firewall Login Password field, use "Aviatrix123#" without the double quotes.

If you are manually configuring the firewall from scratch, follow `the instructions here <https://docs.aviatrix.com/HowTos/paloalto_API_setup.html>`_ to enable API access. 


6. Ready to go!
---------------

Now your firewall instance is ready to receive packets! 

The next step is to specify which Security Domain needs packet inspection by defining a connection policy that connects to
the firewall domain. This is done by `Step 8 <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#specify-security-domain-for-firewall-inspection>`_ in the Firewall Network workflow. 

For example, deploy Spoke-1 VPC in Security_Domain_1 and Spoke-2 VPC in Security_Domain_2. Build a connection policy between the two domains. Build a connection between Security_Domain_2 to Firewall Domain. 

Launch one instance in Spoke-1 VPC and Spoke-2 VPC. From one instance, ping the other instance. The ping should go through.  

7. View Traffic Log
----------------------

You can view if traffic is forwarded to the firewall instance by logging in to the VM-Series console. Click Monitor. Start ping packets from one Spoke VPC to another Spoke VPC where one or both of Security Domains are connected to Firewall Network Security Domain

8. Additional References
--------------------------

Following links from Palo Alto Networks for PAN-OS 8.1 and 9.0 provides additional information.

`Create the init-cfg.txt File <https://docs.paloaltonetworks.com/vm-series/9-0/vm-series-deployment/bootstrap-the-vm-series-firewall/create-the-init-cfgtxt-file.html#id8770fd72-81ea-48b6-b747-d0274f37860b>`_

`Bootstrap the VM-Series Firewall on AWS 9.0 <https://docs.paloaltonetworks.com/vm-series/9-0/vm-series-deployment/bootstrap-the-vm-series-firewall/bootstrap-the-vm-series-firewall-in-aws.html>`_

`Bootstrap the VM-Series Firewall on AWS 8.1 <https://docs.paloaltonetworks.com/vm-series/8-1/vm-series-deployment/bootstrap-the-vm-series-firewall/bootstrap-the-vm-series-firewall-in-aws.html>`_

.. |bootstrap_bucket| image:: bootstrap_example_media/bootstrap_bucket.png
   :scale: 30%


.. disqus::
