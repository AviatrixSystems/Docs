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

   * Upload `Aviatrix Diagnostic report <https://docs.aviatrix.com/HowTos/Troubleshooting_Diagnostics_Result.html>`_
   
   * `Upload tracelog <https://docs.aviatrix.com/HowTos/troubleshooting.html#upload-tracelog>`_

Explanation of Aviatrix troubleshooting playbook outline
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Playbook template

   1. Check cloud permission

   2. Troubleshoot cloud deployment configuration

      * methods:

         * Aviatrix software

         * Cloud platform portal

      * workflow:

         1. Instance level such as AWS security group

         2. Network level such as AWS subnet, Network ACL, and routing table
         
         3. Other services

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

      * workflow:

         1. Instance level such as AWS security group

         2. Network level such as AWS subnet, Network ACL, and routing table

         3. Other services

   5. Troubleshoot data plan/traffic

      * methods:

         * Aviatrix software

         * User environment

      * workflow:

         1. IP layer -> Transport layer -> Application layer 

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

* `AWS IAM Service Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aws_iam_service.html>`_

Aviatrix Controller

* `Aviatrix Controller Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_controller.html>`_

Aviatrix Gateway

* `Aviatrix Gateway Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_gateway.html>`_

Aviatrix Features

* `Aviatrix OpenVPN End to End traffic Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_openvpn_end_to_end_traffic.html>`_

* `Aviatrix Site2Cloud End to End traffic Troubleshooting Playbook <https://docs.aviatrix.com/TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.html>`_
