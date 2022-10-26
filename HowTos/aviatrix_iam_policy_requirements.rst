
.. meta::
   :description: Aviatrix IAM Policy Requirements
   :keywords: AWS, IAM, Policy, Aviatrix, Requirement


================================================
Aviatrix IAM Policy Requirements
================================================


Introduction
============

This documentation explains how and why AWS IAM permissions are needed by Aviatrix.

.. note:: 

  * Since Aviatrix IAM Policy, **aviatrix-app-policy** has reached the max-character-limitation. In order to provide simplicity, we have combined some of IAM permissions. This document provides exact AWS APIs being invoked by Aviatrix features.
  * Wildcard/all (*) is the default resource for all Aviatrix IAM permissions except for #13, "IAM Policy Scanning Requirement." This is to keep our IAM policy as concise as possible. This configuration is not the most secure configuration, so work with your Aviatrix account team to further secure and reduce what resources are in scope for our IAM policy.

1. SQS Requirement
--------------------------------

SQS permission is required as the Aviatrix Controller uses an SQS messages queue to communicate with the gateways. This 
permission applies to all use cases where there is an Aviatrix Gateway. 

::

        {
                "Action": [
                "sqs:Get*",
                "sqs:List*",
                "sqs:AddPermission",
                "sqs:ChangeMessageVisibility",
                "sqs:CreateQueue",
                "sqs:DeleteMessage",
                "sqs:DeleteQueue",
                "sqs:PurgeQueue",
                "sqs:ReceiveMessage",
                "sqs:RemovePermission",
                "sqs:SendMessage",
                "sqs:SetQueueAttributes",
                "sqs:TagQueue"
            ],
                "Resource":"*",
                "Effect": "Allow"
        }


|


2. Aviatrix Gateway Deployment Requirement
-------------------------------------------------------------

The Aviatrix Gateway deployment requirement applies to all use cases where an Aviatrix Gateway needs to be launched. 

Aviatrix gateway deployment requires permissions from the following categories:
    + Security Group
    + Keypair
    + NetworkInterface
    + EIP
    + IAM

- Security Group: Aviatrix creates a Security Group to associate Aviatrix gateways and provide security at the protocol and port access level.

-  IAM: Aviatrix will check if the user's IAM role has the correct configuration or not. If not, Aviatrix will help and fix the issue during gateway creation.

-  For the permission, "ec2:ModifyInstanceCreditSpecification": If your gateway type/size is under AWS T2-series category (t2.medium, t2.large, etc.) Aviatrix software will try to enable the AWS feature, T2-Unlimited for you. Here are more details from AWS Doc if you’re interested. This is an optional feature which is not required and won’t impact your gateway operations. You can still manually enable this feature manually later from AWS console.

::

        {
                "Action": [
                "ec2:Describe*",
                "ec2:Get*",
                "ec2:Search*",
                "ec2:RunInstances",
                "ec2:TerminateInstances",
                "ec2:ModifyInstanceAttribute",
                "ec2:ResetInstanceAttribute",
                "ec2:MonitorInstances",
                "ec2:ReportInstanceStatus",
                "ec2:UnmonitorInstances",
                "ec2:CreateTags",
                "ec2:DeleteTags",
                "ec2:CreateKeyPair",
                "ec2:DeleteKeyPair",
                "ec2:AttachNetworkInterface",
                "ec2:CreateNetworkInterface",
                "ec2:DeleteNetworkInterface",
                "ec2:DetachNetworkInterface",
                "ec2:ModifyNetworkInterfaceAttribute",
                "ec2:ResetNetworkInterfaceAttribute",
                "ec2:AllocateAddress",
                "ec2:AssociateAddress",
                "ec2:DisassociateAddress",
                "ec2:ReleaseAddress",
                "ec2:AssignPrivateIpAddresses",
                "ec2:UnassignPrivateIpAddresses",
                "ec2:DeleteSecurityGroup",
                "ec2:RevokeSecurityGroupEgress",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:AuthorizeSecurityGroup*",
                "ec2:CreateSecurityGroup",
                "ec2:ModifyInstanceCreditSpecification",
                "iam:List*",
                "iam:Get*",
                "iam:PassRole",
                "iam:AddRoleToInstanceProfile",
                "iam:CreateInstanceProfile",
                "iam:DeleteInstanceProfile",
                "iam:RemoveRoleFromInstanceProfile"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


3. Aviatrix Transit Network & TGW-Orchestrator requirement
-------------------------------------------------------------------------------

The Aviatrix Transit Network feature requires the following additional permissions to create an AWS Customer Gateway before creating an AWS VPN connection to connect an Aviatrix Transit Gateway to an AWS VGW.

::

        {
                "Action": [
                "ec2:CreateCustomerGateway",                                     
                "ec2:DeleteCustomerGateway",                                     
                "ec2:CreateVpnConnection",                                       
                "ec2:DeleteVpnConnection",                                       
                "ec2:CreateVpcPeeringConnection",                                
                "ec2:AcceptVpcPeeringConnection",                                
                "ec2:DeleteVpcPeeringConnection",                                
                "ec2:EnableVgwRoutePropagation",                                 
                "ec2:DisableVgwRoutePropagation"                                 
            ],
                "Resource": "*",
                "Effect": "Allow"
        },
        {
               "Action": [
                "ec2:AssociateTransitGatewayRouteTable",
                "ec2:AcceptTransitGatewayVpcAttachment",
                "ec2:CreateTransitGateway",
                "ec2:CreateTransitGatewayRoute",
                "ec2:CreateTransitGatewayRouteTable",
                "ec2:CreateTransitGatewayVpcAttachment",
                "ec2:DeleteTransitGateway",
                "ec2:DeleteTransitGatewayRoute",
                "ec2:DeleteTransitGatewayRouteTable",
                "ec2:DeleteTransitGatewayVpcAttachment",
                "ec2:DisableTransitGatewayRouteTablePropagation",
                "ec2:DisassociateTransitGatewayRouteTable",
                "ec2:EnableTransitGatewayRouteTablePropagation",
                "ec2:ExportTransitGatewayRoutes",
                "ec2:ModifyTransitGatewayVpcAttachment",
                "ec2:RejectTransitGatewayVpcAttachment",
                "ec2:ReplaceTransitGatewayRoute",
                "ec2:EnableRoutePropagation",
                "ec2:*TransitGatewayPeeringAttachment"
            ],
                "Resource": "*",
                "Effect": "Allow"
        },
        {
                "Action": [
                "ram:CreateResourceShare",
                "ram:DeleteResourceShare",
                "ram:UpdateResourceShare",
                "ram:AssociateResourceShare",
                "ram:DisassociateResourceShare",
                "ram:TagResource",
                "ram:UntagResource",
                "ram:AcceptResourceShareInvitation",
                "ram:EnableSharingWithAwsOrganization"
            ],
                "Resource": "*",
                "Effect": "Allow"
        },
        {                                                                                    
                "Action": [
                "directconnect:CreateDirectConnectGateway",
                "directconnect:CreateDirectConnectGatewayAssociation",
                "directconnect:CreateDirectConnectGatewayAssociationProposal",
                "directconnect:DeleteDirectConnectGateway",
                "directconnect:DeleteDirectConnectGatewayAssociation",
                "directconnect:DeleteDirectConnectGatewayAssociationProposal",
                "directconnect:AcceptDirectGatewayAssociationProposal"
             ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


4. Peering Requirement
---------------------------------

Aviatrix features such as Transit Network, Encrypted Peering, Transitive Peering, etc. require the following permissions.

::

        {
               "Action": [
                "ec2:CreateRoute",
                "ec2:DeleteRoute",
                "ec2:ReplaceRoute"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


5. Gateway Resizing requirement
-------------------------------------------

An Aviatrix gateway needs to be in the STOP state before the instance type/size is modified.

::

        {
                "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


6. VPN Gateway & Load Balancer Requirement
------------------------------------------------------------

* Aviatrix VPN feature requires the following (and gateway creation) permissions if the user chooses to create an NLB/ELB along with the VPN gateway creation.
* For "iam:CreateServiceLinkedRole": A service-linked role is a unique type of IAM role that is linked directly to an AWS service. Service-linked roles are predefined by the service and include all the permissions that the service requires to call other AWS services on your behalf. Hence, the service linked role is required to confirm that you allow Elastic Load Balancing to make calls to other services. See the following AWS documentations for more information.
    + `AWS Doc 1 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-service-linked-roles.html#service-linked-role-permissions>`__    
    + `AWS Doc 2 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-service-linked-roles.html#create-service-linked-role>`__    
    + `AWS Doc 3 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-api-permissions.html#required-permissions-v2>`__    
* These permissions also apply to Private Mode and GWLB-based FireNet.

::

        {
                "Action": [
                "elasticloadbalancing:Describe*",
                "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
                "elasticloadbalancing:AttachLoadBalancerToSubnets",
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:CreateLoadBalancer*",
                "elasticloadbalancing:DeleteLoadBalancer*",
                "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                "elasticloadbalancing:ModifyLoadBalancerAttributes",
                "elasticloadbalancing:SetLoadBalancerPoliciesForBackendServer",
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
                "elasticloadbalancing:CreateTargetGroup",
                "elasticloadbalancing:DescribeTargetGroups",
                "elasticloadbalancing:DeleteTargetGroup",
                "elasticloadbalancing:CreateListener",
                "elasticloadbalancing:DescribeListeners",
                "elasticloadbalancing:DeleteListener",
                "elasticloadbalancing:RegisterTargets",
                "elasticloadbalancing:DeregisterTargets",
                "iam:CreateServiceLinkedRole"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


7. VPN with AWS-Global-Accelerator
-----------------------------------------------

In order to enable a VPN with the AWS-Global-Accelerator feature, the following permissions are needed.

::

        {                                                                                 
                "Action": [
                "globalaccelerator:*"                                                     
                "globalaccelerator:CreateAccelerator",
                "globalaccelerator:CreateEndpointGroup",
                "globalaccelerator:CreateListener",
                "globalaccelerator:DeleteAccelerator",
                "globalaccelerator:DeleteEndpointGroup",
                "globalaccelerator:DeleteListener",
                "globalaccelerator:DescribeAccelerator",
                "globalaccelerator:DescribeAcceleratorAttributes",
                "globalaccelerator:DescribeEndpointGroup",
                "globalaccelerator:DescribeListener",
                "globalaccelerator:GetWaiter",
                "globalaccelerator:ListAccelerators",
                "globalaccelerator:ListEndpointGroups",
                "globalaccelerator:ListListeners",
                "globalaccelerator:UpdateAccelerator",
                "globalaccelerator:UpdateAcceleratorAttributes",
                "globalaccelerator:UpdateEndpointGroup",
                "globalaccelerator:UpdateListener"
             ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


8. GuardDuty Requirement
-------------------------------------

In order to enable the GuardDuty feature, the following permissions are needed.

::

        {
                "Action": [
                "guardduty:Get*",
                "guardduty:List*",
                "guardduty:CreateDetector",
                "guardduty:DeleteDetector",
                "guardduty:UpdateDetector",
                "ec2:CreateNetworkAclEntry",
                "ec2:ReplaceNetworkAclEntry",
                "ec2:DeleteNetworkAclEntry"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|


9. Aviatrix Gateway Single AZ HA Requirement
-------------------------------------------------------------

In order to enable the Aviatrix Gateway Single AZ HA feature, the following permission is needed.

::

        {
                "Action": [
                "ec2:RebootInstances"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|



10. Controller Backup & Restore Requirement
-----------------------------------------------------------------

In order to enable the Controller Backup & Restore feature, the following permissions are needed.

::

        {
                "Action": [
                "s3:List*",
                "s3:Get*",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|
  
  
11. EBS Volume Encryption Requirement
--------------------------------------------------------

In order to enable the EBS Volume Encryption feature, the following permissions are needed.

::

        {                                                     
                "Action": [
                "ec2:DescribeInstances",                      
                "ec2:StopInstances",                          
                "ec2:StartInstances",                                                  
                "ec2:DescribeVolumes",
                "ec2:CreateVolume",
                "ec2:DeleteVolume",
                "ec2:AttachVolume",
                "ec2:DetachVolume",
                "ec2:DescribeSnapshots",
                "ec2:CopySnapshot",
                "ec2:CreateSnapshot",
                "ec2:DeleteSnapshot"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|
  

12. AWS Peering Requirement
--------------------------------------------

In order to create an AWS Peering, the following permissions are needed.

::

        {
               "Action": [
                "ec2:CreateVpcPeeringConnection",
                "ec2:AcceptVpcPeeringConnection",
                "ec2:DeleteVpcPeeringConnection"
            ],
                "Resource": "*",
                "Effect": "Allow"
        }


|
  
  
13. IAM Policy Scanning Requirement
------------------------------------------------------

In order to enable the IAM Policy Scanning feature, the following permissions are needed.

::

        {                              
                "Action": [
                "iam:List*",
                "iam:Get*",
                "iam:DeletePolicyVersion",
                "iam:CreatePolicyVersion"
            ]

            "Resource": "arn:aws:iam::*:policy/aviatrix-*"
        }


|
  
  
14. UDP Load-Balancer Requirement
-------------------------------------------------------

In order to enable the UDP Load-Balancer feature, the following permissions are needed.

::

        {
            "Effect": "Allow",
            "Action": [
                "route53:ChangeResourceRecordSets"                  
            ]
        }


|


15. Private Mode and GWLB-Based FireNet Requirement
----------------------------------------------------------------------------

In order to enable Private Mode usage and GWLB-based FireNet, the following permissions are needed:

::


        {
            "Effect": "Allow",
            "Action": [
                "elasticloadbalancing:DescribeTargetHealth",
	        "ec2:CreateVpcEndpointServiceConfiguration",
                "ec2:DeleteVpcEndpointServiceConfigurations",
                "ec2:CreateVpcEndpoint",
	        "ec2:DeleteVpcEndpoints",
	        "ec2:ModifyVpcEndpointServicePermissions",
	        "ec2:DescribeVpcEndpointServicePermissions",
	        "ec2:DescribeVpcEndpoints"
            ]
        }


|
  

.. disqus::