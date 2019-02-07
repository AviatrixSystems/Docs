.. meta::
   :description: Aviatrix IAM Policy - Release Notes
   :keywords: IAM, IAM policy, IAM role, Release Notes, aviatrix-role-app, aviatrix-role-ec2, aviatrix-app-policy, aviatrix-assume-role-policy


======================================
Aviatrix IAM Policy - Release Notes
======================================


`Latest Version of "aviatrix-app-policy" <https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt>`__


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/IAM_access_policy_for_CloudN.txt" height="150px" width="100%"></iframe>


|


`Latest Version of "aviatrix-assume-role-policy" <https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt>`__


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/iam_assume_role_policy.txt" height="150px" width="100%"></iframe>


|


R4.1 (2/9/2019)
=================

aviatrix-app-policy
---------------------

New IAM Permissions for Transit Network: 
""""""""""""""""""""""""""""""""""""""""""

::

    "ec2:CreateRouteTable"
    "ec2:DeleteRouteTable"
    "ec2:AssociateRouteTable"
    "ec2:DisassociateRouteTable
    "ec2:ReplaceRouteTableAssociation"
    "ec2:EnableVgwRoutePropagation"
    "ec2:DisableVgwRoutePropagation"


New IAM Permissions for Controller & Gateway Volumes Encryption:
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

::

        "ec2:DescribeInstances"
        "ec2:DescribeVolumes"
        "ec2:DescribeSnapshots"
        "ec2:StopInstances"
        "ec2:StartInstances"
        "ec2:CopySnapshot"
        "ec2:CreateSnapshot"
        "ec2:CreateVolume"
        "ec2:DeleteVolume"
        "ec2:DeleteSnapshot"
        "ec2:AttachVolume"
        "ec2:DetachVolume"


4.1 aviatrix-app-policy:


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix-iam-policies/aviatrix-app-policy/2019-02-09-controller-version-4.1/IAM_access_policy_for_CloudN.txt" height="150px" width="100%"></iframe>


aviatrix-assume-role-policy
-----------------------------

New IAM Permissions for Secure File Transfer: 
"""""""""""""""""""""""""""""""""""""""""""""""

::

"s3:GetBucketLocation"



4.1 aviatrix-assume-role-policy:


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix-iam-policies/aviatrix-assume-role-policy/2019-02-09-controller-version-4.1/iam_assume_role_policy.txt" height="150px" width="100%"></iframe>


|
|


R4.0 (11/26/2018)
===================

aviatrix-app-policy
---------------------

New IAM Permissions for AWS TGW: 
"""""""""""""""""""""""""""""""""

::

    "ram:Get*"
    "ram:List*"
    "ec2:AssociateTransitGatewayRouteTable"
    "ec2:AcceptTransitGatewayVpcAttachment"
    "ec2:CreateTransitGateway"
    "ec2:CreateTransitGatewayRoute"
    "ec2:CreateTransitGatewayRouteTable"
    "ec2:CreateTransitGatewayVpcAttachment"
    "ec2:DeleteTransitGateway"
    "ec2:DeleteTransitGatewayRoute"
    "ec2:DeleteTransitGatewayRouteTable"
    "ec2:DeleteTransitGatewayVpcAttachment"
    "ec2:DisableTransitGatewayRouteTablePropagation"
    "ec2:DisassociateTransitGatewayRouteTable"
    "ec2:EnableTransitGatewayRouteTablePropagation"
    "ec2:EnableRoutePropagation"
    "ec2:ExportTransitGatewayRoutes"
    "ec2:ModifyTransitGatewayVpcAttachment"
    "ec2:RejectTransitGatewayVpcAttachment"
    "ec2:ReplaceTransitGatewayRoute"
    "ram:CreateResourceShare"
    "ram:DeleteResourceShare"
    "ram:UpdateResourceShare"
    "ram:AssociateResourceShare"
    "ram:DisassociateResourceShare"
    "ram:TagResource"
    "ram:UntagResource"
    "ram:AcceptResourceShareInvitation"
    "ram:EnableSharingWithAwsOrganization"


4.0 aviatrix-app-policy:


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix-iam-policies/aviatrix-app-policy/2018-11-26-controller-version-4.0/IAM_access_policy_for_CloudN.txt" height="150px" width="100%"></iframe>


|
|


R3.5 (10/7/2018)
==================

aviatrix-app-policy
---------------------

New IAM Permissions for S2C & Directconnect: 
""""""""""""""""""""""""""""""""""""""""""""""

::

    "directconnect:Describe*


New IAM Permissions for New IAM Permissions for GuardDuty:
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

::

    "guardduty:Get*"
    "guardduty:List*"
    "ec2:CreateNetworkAclEntry"
    "ec2:ReplaceNetworkAclEntry"
    "ec2:DeleteNetworkAclEntry"
    "guardduty:CreateDetector"
    "guardduty:DeleteDetector"
    "guardduty:UpdateDetector"


3.5 aviatrix-app-policy:


.. raw:: html

    <iframe src="https://s3-us-west-2.amazonaws.com/aviatrix-download/aviatrix-iam-policies/aviatrix-app-policy/2018-10-07-controller-version-3.5/IAM_access_policy_for_CloudN.txt" height="150px" width="100%"></iframe>


|
|

