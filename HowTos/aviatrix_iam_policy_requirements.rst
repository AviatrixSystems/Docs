
.. meta::
   :description: Aviatrix IAM Policy Requirements
   :keywords: AWS, IAM, Policy, Aviatrix, Requirement


================================================
Aviatrix IAM Policy Requirements
================================================


Introduction
============

This documentation explains how and why AWS IAM permissions are needed by Aviatrix.



1. SQS requirement
--------------------

SQS permission is required as Aviatrix Controller uses SQS messages queue to communicate with the gateways. This 
permission applies to all use cases where there is an Aviatrix gateway. 

::

        {
            "Effect": "Allow",
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
            "Resource": "*"
        }


|


2. Aviatrix Gateway deployment requirement
-------------------------------------------

The Aviatrix gateway deployment requirement applies to all use cases where an Aviatrix gateway needs to be launched. 

Aviatrix gateway deployment requires permissions from the following categories:
    + Security Group
    + Keypair
    + NetworkInterface
    + EIP
    + IAM

- Security Group: Aviatrix creates Security Group to associate Aviatrix gateways and provide security at the protocol and port access level.

-  IAM: Avaitrix will check if the user's IAM role has the correct configuration or not. If not, Aviatrix will help and fix the issue during gateway creation.

-  For the permission, "ec2:ModifyInstanceCreditSpecification": If your gateway type/size is under AWS T2-secries category (t2.medium, t2.large, etc..) Aviatrix software will try to enable the AWS feature, T2-Unlimited for you. Here is more detail from AWS Doc if you’re interested. This is an optional feature which is not required and won’t impact your gateway operations. You can still manually enable this feature manually later from AWS console.

::

        {
            "Effect": "Allow",
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
            "Resource": "*"
        }


|


3. VPN Gateway & LoadBalance requirement
------------------------------------------

* Aviatrix VPN feature requires the following (and gateway creation) permissions if the user chooses to create NLB/ELB along with the VPN gateway creation.
* For "iam:CreateServiceLinkedRole": A service-linked role is a unique type of IAM role that is linked directly to an AWS service. Service-linked roles are predefined by the service and include all the permissions that the service requires to call other AWS services on your behalf. Hence, the service linked role is required to confirm that you allow Elastic Load Balancing to make calls to other services. See the following AWS documentations for more information.
    + `AWS Doc 1 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-service-linked-roles.html#service-linked-role-permissions>`__    
    + `AWS Doc 2 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-service-linked-roles.html#create-service-linked-role>`__    
    + `AWS Doc 3 <https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/elb-api-permissions.html#required-permissions-v2>`__    

::

        {
            "Effect": "Allow",
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
            "Resource": "*"
        }


|


4. Peering requirement
------------------------

Aviatrix features such that Transit Network, Encrypted Peering, Transitive Peering, etc... will require the following permissions.

::

        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateRoute",
                "ec2:DeleteRoute",
                "ec2:ReplaceRoute"
            ],
            "Resource": "*"
        }


|


5. Gateway Resizing requirement
---------------------------------

An Aviatrix gateway needs to be in STOP state before modifying the instance type/size.

::

        {
            "Effect": "Allow",
            "Action": [
                "ec2:StartInstances",
                "ec2:StopInstances"
            ],
            "Resource": "*"
        }


|


6. Aviatrix Transit Gatewaty requirement
------------------------------------------

Aviatrix TransitNetwork feature requires the following additional permissions to create AWS Customer Gateway before creating an AWS VPN connection to connect Aviatrix Transit Gateway to AWS VGW.

::

        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateCustomerGateway",
                "ec2:DeleteCustomerGateway",
                "ec2:CreateVpnConnection",
                "ec2:DeleteVpnConnection"
            ],
            "Resource": "*"
        }


|


7. AWS Peering requirement
----------------------------

In order to create AWS Peering, the following permissions are needed.

::

        {
            "Effect": "Allow",
            "Action": [
                "ec2:CreateVpcPeeringConnection",
                "ec2:AcceptVpcPeeringConnection",
                "ec2:DeleteVpcPeeringConnection"
            ],
            "Resource": "*"
        }


|


8. Guardduty requirement
---------------------------

In order to enable Guardduty feature, the following permissions are needed.

::

        {
            "Effect": "Allow",
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
            "Resource": "*"
        }


|


9. Aviatrix Gateway Single AZ HA requirement
--------------------------------------------

In order to enable Aviatrix Gateway Single AZ HA feature, the following permission is needed.

::

        {
            "Effect": "Allow",
            "Action": [
                "ec2:RebootInstances"
            ],
            "Resource": "*"
        }


|



10. Controller Backup & Restore requirement
-------------------------------------------

In order to enable Controller Backup & Restore feature, the following permissions are needed.

::

        {
            "Effect": "Allow",
            "Action": [
                "s3:List*",
                "s3:Get*",
                "s3:PutObject",
                "s3:DeleteObject"
            ],
            "Resource": "*"
        }
