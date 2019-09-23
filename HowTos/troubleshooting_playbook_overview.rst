.. meta::
   :description: 
   :keywords: 

=========================================================================================
Aviatrix Troubleshooting Playbook Overview
=========================================================================================

This technical note provides an overview and guideline of Aviatrix Troubleshooting Playbook. The purpose of Aviatrix troubleshooting playbook is trying to assist users self-troubleshooting Aviatrix product, the related Cloud platform configuration, and data plan step-by-step.

Overview:
---------

#. `How to high-level troubleshoot Aviatrix product`_

#. `Explanation of Aviatrix troubleshooting playbook outline`_

How to high-level troubleshoot Aviatrix product
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Draw a network topology including end device, Aviatrix product, network components and CIDR

2. List out Aviatrix features which has been deployed in your environment

3. Understand the deployment configuration and traffic flow

4. Identify the problem by refering to Aviatrix troubleshooting playbook and other Aviatrix docs

5. Attempt to address the problem by refering to suggestions in Aviatrix troubleshooting playbook and other Aviatrix docs

6. Submit or update a support ticket

Explanation of Aviatrix troubleshooting playbook outline
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Playbook template

   1. Check cloud permission

   2. Troubleshoot cloud deployment configuration

      * methods:

         * Aviatrix software

         * Cloud platform portal

      * workflow: Top Down approach

         1. Instance level such as AWS security group

         2. Network level such as AWS subnet, Network ACL, and routing table

   3. Troubleshoot Aviatrix configuration

      * methods:

         * Aviatrix software

      * workflow:

         1. Basic Linux network configuration

         2. Basic Linux operating system configuration

   4. Troubleshoot Aviatrix feature configuration

      * methods:

         * Aviatrix software

         * Cloud platform portal

      * workflow: Top Down approach

         1. Instance level such as AWS security group

         2. Network level such as AWS subnet, Network ACL, and routing table

         3. Other services

   5. Troubleshoot data plan/traffic

      * methods:

         * Aviatrix software

         * User environment

      * workflow: Bottom Up Approach

         1. IP -> Transport -> Application

         2. Packet capture
  
Troubleshooting process

   1. Identify the problem by 

      1. Set checkpoints

      2. Define expectation

      3. List failure/error message

   2. Establish or educated guess a theory of probable causes

   3. Establish an action plan/suggestion and execute the plan
   
Category:
---------

Cloud Permission

* `AWS IAM Service Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aws_iam_service.rst>`_

Aviatrix Controller

* `Aviatrix Controller Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_controller.rst>`_

Aviatrix Gateway

* `Aviatrix Gateway Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_gateway.rst>`_

Aviatrix Features

* `Aviatrix OpenVPN End to End traffic Troubleshooting Playbook <https://github.com/brycewang03/Docs/blob/troubleshooting_playbook/HowTos/troubleshooting_playbook_aviatrix_openvpn_end_to_end_traffic.rst>`_
