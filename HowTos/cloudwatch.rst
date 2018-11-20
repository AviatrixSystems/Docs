.. meta::
   :description: AWS CloudWatch integration
   :keywords: Logging, CloudWatch


=================================
 AWS CloudWatch Integration 
=================================

Starting in release 4.0, Aviatrix Controller and gateway syslog can be exported to AWS `CloudWatch <https://aws.amazon.com/cloudwatch/features/>`_ Logs.

Prerequisites on CloudWatch IAM role:
--------------------------------------

Aviatrix CloudWatch integration assumes 

1. The AWS account where the logs will be stored must have the following IAM policy configured. 
enabled, and it must have built a IAM trust relationship with all the AWS accounts of the Aviatrix Controller 
and gateways. 

In addition all AWS accounts of the Aviatrix Controller and gateways 

1. Add CloudWatchAgentServer policy:

         {
            "Effect": "Allow",
            "Action": [
                "cloudwatch:PutMetricData",
                "ec2:DescribeTags",
                "logs:PutLogEvents",
                "logs:DescribeLogStreams",
                "logs:DescribeLogGroups",
                "logs:CreateLogStream",
                "logs:CreateLogGroup"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "ssm:GetParameter"
            ],
            "Resource": "arn:aws:ssm:*:*:parameter/AmazonCloudWatch-*"
        }

2. Edit Trust Relationship to monitoring Aviatrix Controller and gateway accounts:
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "AWS": [
                  "arn:aws:iam::xxxxxxxxxxxx:root",
                   or "arn:aws:iam::xxxxxxxxxxxx:role/aviatrix-role-ec2",
                  "arn:aws:iam::yyyyyyyyyyyy:root"
                ]
              },
              "Action": "sts:AssumeRole"
            }
          ]
        }

To enable, click Settings on the main navigation bar, click Logging, scroll down to CloudWatch AGENT.

Input the CloudWatch role ARN and the AWS region of the CloudWatch Logs service and click Enable. All AWS controller and gateways will have CloudWatch enabled. 

|image-cloudwatch|


.. |image-cloudwatch| image:: cloudwatch_media/cloudwatch.png


.. add in the disqus tag

.. disqus::
