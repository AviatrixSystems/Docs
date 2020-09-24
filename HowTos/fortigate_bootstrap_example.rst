.. meta::
  :description: Firewall Network
  :keywords: AWS Transit Gateway, AWS TGW, TGW orchestrator, Aviatrix Transit network, Transit DMZ, Egress, Firewall


=================================================================
Bootstrap Configuration Example for FortiGate Firewall
=================================================================

Using bootstrap option significantly simplifies Fortinet FortiGate initial configuration setup. 

In this document, we provide a bootstrap example to set up an "Allow All" and Egress NAT policy for the FortiGate to validate 
that traffic is indeed sent to the FortiGate for VPC to VPC traffic inspection. This example does not use Panorama. 

For a manual setup, follow `manual setup example. <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html>`_


1. Create IAM Role and Policy
--------------------------------

Login to AWS console, create an IAM role with the name, for example, "bootstrap-FortiGate-S3-role". 
Attach an IAM policy with the name, for example, "bootstrap-FortiGate-S3-policy". The policy has the following statements. 

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

In AWS S3, at the top level create a bucket for bootstrap with a **unique** name, for example "bootstrap-fortigate-bucket", with the following structure:

::

    bootstrap-fortigate-bucket/
        init.conf
        license.lic


3. Upload config files
------------------------

**3.1** The example init.conf file contains the "Allow All" setup. To downloady the file, click :download:`init.conf <fortigate_bootstrap_example_media/init.conf>`. 

**3.2** For the example license.lic file, click :download:`license.lic <fortigate_bootstrap_example_media/license.lic>`. For Metered AMI, this file is not required. 

.. Note::

  In the example, the password is set to Aviatrix123#. You can customize it.  

**3.3** upload these two files to your config folder in the bootstrap-fortigate-bucket. 

4. Launch the Fortigate instance
-----------------------------------

Follow the Aviatrix Firewall Network (FireNet) workflow 
to `Step 7a. <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#a-launch-and-associate-firewall-instance>`_.

Fill in the required fields. Click Advanced. Fill in the following parameters.

================================  ======================
**Advanced Field**                **Example Value**
================================  ======================
IAM Role                          bootstrap-FortiGate-S3-role 
Bootstrap Bucket Name             fortigate-bootstrap-bucket (must be a unique name in S3)
================================  ======================

Launch the instance. Wait for 15 minutes for it to boot up and initialize. 

Login to the HTTPS interface of the public IP with username "admin", password "Aviatrix123#"


5. Configure Static Routes
--------------------------------------

Follow `the instructions here <https://docs.aviatrix.com/HowTos/config_FortiGateVM.html#create-static-routes-for-routing-of-traffic-vpc-to-vpc>`_ to configure the static
routes. 


6. Ready to go!
---------------

Now your firewall instance is ready to receive packets! 

The next step is to specify which Security Domain needs packet inspection by defining a connection policy that connects to
the firewall domain. This is done by `Step 8 <https://docs.aviatrix.com/HowTos/firewall_network_workflow.html#specify-security-domain-for-firewall-inspection>`_ in the Firewall Network workflow. 

For example, deploy Spoke-1 VPC in Security_Domain_1 and Spoke-2 VPC in Security_Domain_2. Build a connection policy between the two domains. Build a connection between Security_Domain_2 to Firewall Domain. 

Launch one instance in Spoke-1 VPC and Spoke-2 VPC. From one instance, ping the other instance. The ping should go through.  


.. |bootstrap_bucket| image:: bootstrap_example_media/bootstrap_bucket.png
   :scale: 30%


.. disqus::
