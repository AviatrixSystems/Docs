.. meta::
   :description: Aviatrix Terraform provider tutorial
   :keywords: AWS, Aviatrix Terraform provider, VPC, Transit network


===========================================================================================
Aviatrix Terraform Tutorial
===========================================================================================

This document will walk you through the steps to make use of the Aviatrix Terraform provider. As an example, an Aviatrix gateway will be launched.
It is assumed that Terraform is already set up. If so, skip steps 1 and 2.

1. Download Terraform Package
-------------------------------------

Terraform is delivered as a zip file in binary. Click `here <https://www.terraform.io/downloads.html>`_, select your respective OS and simply download the package as you would for any software.

For Mac, Terraform is also present in `Homebrew <https://brew.sh/>`_. Perform ``brew install terraform`` to install Terraform (Skip step 2 if done this way).

Once it is downloaded, double click to unzip the file. The executable file terraform should be
in your Downloads folder. (This will be used as an example in this document)

For Unix systems, open a terminal, type the command ``./Downloads/terraform --version`` , and you should see output similar to the following image:

|setup_tf|

For Windows, the command is ``terraform.exe --version``


1.1. Setup Execution Path (only when not using package manager)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If you are running the Terraform binary file after simply downloading it, you will need to execute it using the full path.

Assuming it's downloaded into your ``$HOME/Downloads`` directory, run:

::

  $ ~/Downloads/terraform

1.2 Verify Terraform Install
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In your Terminal, run ``terraform`` to verify Terraform has been successfully been installed.

Please run ``terraform -version`` to verify you have the latest version of Terraform. `As of 22 May 2019 <https://www.hashicorp.com/blog/announcing-terraform-0-12>`_ , the latest version of Terraform is **0.12.x**.


2. Prepare Aviatrix Controller
--------------------------------

Follow the `Aviatrix Controller Startup Guide <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_ to launch a Controller and go through the Onboarding process.

Once Onboarding is completed, a `primary account <https://docs.aviatrix.com/HowTos/onboarding_faq.html#what-is-the-aviatrix-primary-access-account>`_ should be created. This primary account will be used to launch a gateway.


3. Prepare a Terraform Environment (workspace)
----------------------------------------------

While you can run Terraform within any directory, we highly recommend using Terraform/ managing your infrastructure in an isolated environment. That can be achieved as simply as creating a separate directory to use and running ``terraform init`` within the directory.

Example for Unix/Linux:

::
  
  $ mkdir terraform-test-environment
  $ cd terraform-test-environment
  $ terraform init


``terraform init`` will initialise the current directory into a working directory for Terraform. In the future, whenever a new Terraform configuration is written, or if a provider is updated, this command must be run again.

Next, create a Terraform configuration file. For each Terraform environment, a provider must be specified; in this case, we will use Aviatrix.

.. note::
  While it is possible to manage an entire infrastructure within one Terraform file, we recommend decoupling based on infrastructure. For example, a VPN setup can be in one Terraform file, under one directory, a transit-network can be in another.

For this below example, we can create a test gateway. In this file "aviatrix_gateway_test.tf", copy and paste
the below text. Be sure to modify the parameters to suit your environment accordingly.

::

  # Specify Aviatrix as the provider with these parameters:
  # controller_ip - public IP address of the controller
  # username - login user name, default is admin
  # password - password
  # version - release version # of Aviatrix Terraform provider

  provider "aviatrix" {
      controller_ip = "35.5.26.157"
      username = "admin"
      password = "ControllerPSWD#"
      version = "2.2"
  }

  # Launch a gateway with these parameters:
  # cloud_type - Enter 1 for AWS
  # account_name - Aviatrix account name to launch GW with
  # gw_name - Name of gateway
  # vpc_id - AWS VPC ID
  # vpc_reg - AWS VPC region
  # gw_size - Gateway instance size
  # subnet - VPC subnet CIDR where you want to launch GW instance

  resource "aviatrix_gateway" "testGW" {
      account_name = "for-create2"
      cloud_type = 1
      gw_name = "testGW1"
      vpc_id = "vpc-01dd5643eca66486c"
      vpc_reg = "us-west-2"
      gw_size = "t2.micro"
      subnet = "172.34.0.0/24"
  }


4. Run the Terraform Configuration
-----------------------------------

In the directory where the Terraform configuration file resides, run the ``terraform init`` command to prepare the new configuration file.

::

  $ terraform init

Then run the ``terraform plan`` command to see what will be executed.

::

  $ terraform plan

Finally, run the ``terraform apply`` command to launch the gateway.

::

  $ terraform apply

When the above command finishes, you can login to your Aviatrix Controller console, navigate to the Gateway page and see that the new gateway with the name "testGW1" has been successfully launched.


5. Simple Troubleshooting
--------------------------

A simple Terraform debug method is to set TF_LOG level in ~/.bash_profile, as shown in the below example (Remember to run command ``source ~/.bash_profile`` after editing .bash_profile):

::

  export TF_LOG=TRACE

With this log set to TRACE, you should see TRACE and ERROR when running Terraform commands. Pay attention to ERRORs if a Terraform command is not successful.


6. More Examples
-----------------

To see what resources are provided, check out `Aviatrix Terraform Provider <https://docs.aviatrix.com/HowTos/aviatrix_terraform.html>`_.

To see more examples, read on `Setup Aviatrix Transit Network with Terraform <https://docs.aviatrix.com/HowTos/Setup_Transit_Network_Terraform.html>`_.


7. Contribute to the Community
--------------------------------

The Aviatrix Terraform Provider is an `open source project <https://github.com/terraform-providers/terraform-provider-aviatrix>`_ and has recently become an official Terraform provider. All reviews, comments and contributions are welcome.


Enjoy!

.. |setup_tf| image:: tf_aviatrix_howto_media/setup_tf.png
   :width: 100%

.. |go_install| image:: tf_aviatrix_howto_media/go_install.png
   :width: 100%

.. disqus::
