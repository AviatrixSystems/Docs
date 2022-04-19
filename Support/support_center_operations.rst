.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center, Operations

===========================================================================
Operations
===========================================================================

Pre-Op Procedures
---------------------

We recommend you always go through the following checklist before starting any operations on your Aviatrix Controller. This will help minimize any issues or collateral damage. All of the following procedures can be executed outside your maintenance window - and can help save valuable time during a maintenance window. If you have any comments or feedback, we welcome your input - please submit a new ticket at our `Aviatrix Support Portal <https://support.aviatrix.com>`_.

* Your Controller must have a reliable DNS resolution service available. We recommend using 8.8.8.8. If you are on AWS/Azure, go to "Controller/Settings/Controller/DNS Server/Use VPC.VNET DNS Server" and disable it. This will force the controller to use 8.8.8.8.
* The controller needs to have full access to the public internet
We recommend that you always go through the following checklist before you start any operations on your Aviatrix Controller. This will help minimize any issues or collateral damage. All of the following procedures can be executed outside your maintenance window and can help save valuable time during the maintenance window. If you have any comments or feedback, we welcome your input. Please submit a new ticket at our `Aviatrix Support Portal <https://support.aviatrix.com>`_.

* Your Controller has to have a reliable DNS resolution service available. We recommend using 8.8.8.8. If you are on AWS/Azure, you can go to "Controller/Settings/Controller/DNS Server/Use VPC.VNET DNS Server" and disable it. This will force the controller to use 8.8.8.8.
* The controller needs to have full access to the public internet.

  * Please check that you can ping google.com from "Controller/Troubleshoot/Diagnostics/Network/ControllerUtility"
  * Please check that you can reach carmelonetworks.com on port 443 from the controller using "Controller/Troubleshoot/Diagnostics/Network/NetworkConnectivityUtility"
  * Please check that you can ping github.com and also reach it on port 443
  * Please check ping and port 443 connectivity to bower.io
  
* Always take a `backup on your controller <https://docs.aviatrix.com/HowTos/controller_backup.html>`_ before you start any operation
* Please clean up your bucket where you store your controller backups so that only the last 3 relevant configuration files are seen. Any old configurations should be moved out to your archive bucket/folder.
* We recommend that your Controller be hosted on a separate VPC so that any network operations do not affect connectivity between you and the controller and also do not impact any DNS services to the controller. If the controller is hosted in a shared services VPC, we recommend that you plan your operations to avoid any connectivity or DNS issues.
* Please make sure that the Aviatrix controller has an EIP associated. A controller without EIP in AWS or static IP in Azure/GCP will result in the controller not being able to function properly upon reboot due to the change of its original IP address.
* If the controller has `ControllerHA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ enabled - please do know that if your controller is shutdown(accidentally, or intentionally) or goes down or is not available, the HA process will terminate it and create a new controller using the last configuration that was backed up. You can go to the AWS portal and select the region where the controller is running to check if there is any active Controller HA CloudFormation stack. Please terminate the Controller HA CloudFormation stack if you are performing a controller migration or Backup & Restore operation.
* Please be careful with the Security Groups on the controller. You need to allow yourself on port 443 and all gateways on 443 to come in. The controller needs to be able to reach out to all gateways on ports 443 and 22 - we recommend that you do not adjust the outbound rules. Please consider using the `security group management feature <https://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_
* Always do account audits to avoid any permission issues - Please run an account audit for all your AWS accounts from “Controller/Accounts/AccountAudit” - please make sure that all of them pass. The `IAM policies <https://docs.aviatrix.com/Support/support_center_controller.html#why-are-iam-policies-important>`_ should be set up as documented. If you have any issues, please look at our troubleshooting playbooks
* If you are migrating your controller from one AWS account to another AWS account, you will need to make sure that all AWS onboarded accounts have a trusting relationship with the new controller AWS account. This is required to make sure the new controller has the permission to update those onboard AWS accounts.
* If you are planning an upgrade - please go through https://docs.aviatrix.com/HowTos/inline_upgrade.html carefully and open a ticket if you have any questions - you can create a new ticket at Support Portal https://support.aviatrix.com
* Please make sure that the Aviatrix controller has an EIP associated with it (in AWS) or a static IP associated with it (in Azure/GCP). A controller without EIP in AWS or static IP in Azure/GCP will result in the controller not being able to function properly upon reboot due to the change of its original IP address.
* If the controller has `ControllerHA <https://docs.aviatrix.com/HowTos/controller_ha.html>`_ enabled - please do know that if your controller is shutdown(accidentally, or intentionally) or goes down or is not available, the HA process will terminate it and create a new controller using the last configuration that was backed up. You can go to the AWS portal and select the region where the controller is running to check if there is any active Controller HA CloudFormation stack. Please terminate the Controller HA CloudFormation stack if you are performing a controller migration or Backup & Restore operation.
* Please be careful with the Security Groups on the controller. You need to allow yourself on port 443 and all gateways on 443 to come in. The controller needs to be able to reach out to all gateways on ports 443 and 22 - we recommend that you do not adjust the outbound rules. Please consider using the `security group management feature <https://docs.aviatrix.com/HowTos/FAQ.html#enable-controller-security-group-management>`_.
* Always do account audits to avoid any permission issues - Please run an account audit for all your AWS accounts from “Controller/Accounts/AccountAudit” - please make sure that all of them pass. The `IAM policies <https://docs.aviatrix.com/Support/support_center_controller.html#why-are-iam-policies-important>`_ should be set up as documented. If you have any issues, please look at our troubleshooting playbooks
* If you are migrating your controller from one AWS account to another AWS account, you will need to make sure that all AWS onboarded accounts have a trust relationship with the new controller AWS account. This is required to make sure the new controller has the permission to update those onboard AWS accounts.
* If you are planning an upgrade, please go through https://docs.aviatrix.com/HowTos/inline_upgrade.html carefully and open a ticket if you have any questions. You can create a new ticket at Support Portal https://support.aviatrix.com
* Please go through the Field Notices that are published at https://docs.aviatrix.com/HowTos/field_notices.html and make sure that you act on the ones that could impact you.
