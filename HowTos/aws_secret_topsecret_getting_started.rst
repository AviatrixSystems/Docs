.. meta::
  :description: Aviatrix Controller and Gateway Deployment Guide in AWS Secret and Top Secret regions
  :keywords: Aviatrix, AWS, Secret, Top Secret


=====================================================================================
Aviatrix Controller and Gateway Deployment Guide in AWS Secret and Top Secret regions
=====================================================================================

The Aviatrix Secure Networking Platform consists of two components: Aviatrix Controller and Gateway. The Aviatrix Controller manages the Aviatrix Gateway and orchestrates all connectivities. 

Launch Aviatrix Controller
===========================

Welcome to getting started on AWS secret/top secret regions! This guide takes you through the 3 steps to launch the Controller instance. 

Step 1. Subscribe to Aviatrix Secure Networking Platform - BYOL on AWS ICMP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you have already subscribed the Aviatrix Secure Networking Platform - BYOL on AWS ICMP, skip this step and proceed to Step 2.

Step 2. Launch the Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Two options to search and deploy Aviatrix Controller:

- (Option 1) Search the product “Aviatrix Secure Networking Platform - BYOL” on ICMP website

- (Option 2) Login to AWS ICMP console and navigate to EC2 dashboard page

- (Option 2) Click the button “Launch Instances” and select the product “Aviatrix Secure Networking Platform - BYOL” on AWS ICMP

- Follow EC2 configuration workflow to deploy Aviatrix Controller

  - Select the instance size “t3.large” of 8GB of memory, which is the recommended instance type
  
  - Select the VPC where the controller will be launched
  
  - Make sure the subnet you select is a public subnet with IGW as its default gateway, otherwise the controller will not be accessible as it won’t have a public IP address.
  
  - Edit security groups to allow inbound TCP port 443 open to anywhere

- Assign an Elastic Public IP address to Aviatrix Controller

- After launching the instance, note down the instance’s Private IP and Public IP. You can find that info by going to AWS EC2 console, clicking the Controller instance, and locating its private IP and public IP address

Step 3. Onboarding
^^^^^^^^^^^^^^^^^^^

Now that Aviatrix Controller instance has been launched, let’s login and go through the onboarding process.

- Access the Controller console by going to https://[Controller_Public_IP] on a browser

- Login with the username "admin" and the default password "Controller_Private_IP"

- Enter your email address

- Change password

- Click the button Run to upgrade software version with latest

.. tip::
   The Controller upgrade takes about 3-5 minutes.  Once complete, the login prompt will appear.  Use the username `admin` and your new password to login.

Launch Aviatrix Gateway
===========================

To deploy Aviatrix Secure Companion Gateway from AWS ICMP successfully, make sure you follow the instructions as follows. When complete, you'll be ready to deploy use cases.

Step 1. Follow the step `Launch Aviatrix Controller <https://docs.aviatrix.com/HowTos/aws_secret_topsecret_getting_started.html#launch-aviatrix-controller>`_ above
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Step 2. Subscribe to Aviatrix Secure Companion Gateway on AWS ICMP
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Step 3. Start a Use Case
^^^^^^^^^^^^^^^^^^^^^^^^^

Congratulations! You are now ready to deploy use cases.

- `Build Aviatrix Transit Network Solution <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html>`__


.. disqus::
