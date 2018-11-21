.. meta::
   :description: AWS CloudWatch integration
   :keywords: Logging, CloudWatch


=================================
 AWS CloudWatch Integration 
=================================

Starting in release 4.0, Aviatrix Controller and gateway syslog can be exported to AWS `CloudWatch <https://aws.amazon.com/cloudwatch/features/>`_ Logs.

Step 1: Prepare on the Collector account for Aviatrix logs
---------------------------------------------------------------------------------------

In order for Aviatrix controllers and gateways in different AWS accounts to send/update logs to the collector's AWS account, follow the instructions below to setup IAM role and policies on the collector's AWS account.

        1. Go to AWS console, create an  IAM role with a name aviatrix-role-cloudwatch. 
   
        2. Adding Trust-Relationships for Aviatrix Controllers' and all gateways' AWS accounts. 
        
        3. Attaching AWS IAM Cloudwatch policy to the role aviatrix-role-cloudwatch.

    **a: Create an IAM role aviatrix-role-cloudwatch**, make sure the role name is "aviatrix-role-cloudwatch".
               
    
        |image1|


    **b: Add Trust-Relationships for controllers and gateways**

        |image2|

        |image3|

    **c: Attach AWS IAM policy for "CloudWatchAgentServerPolicy" to the role**

        |image4|

|

    **d: Retrieve the ARN of the IAM Role**

        |image9|

|

Step 2 Enable CloudWatch log on the Controller
----------------------------------------------------

        |image5|

.. Note:: 
    * ARN of IAM role: Specify the ARN of the IAM role in the collector's AWS account.
    * Region: Specify which region you wish to store your logs.
..    


|


Result & Output:
--------------------------

    In AWS CloudWatch:

        |image6|

        |image7|


    AWS CloudWatch Agent status:

        |image8|


.. |image1| image:: ./cloudwatch_media/img_01_aviatrix_cloudwatch_iam_role_V2.PNG
    :width: 7.00000 in
    :height: 5.00000 in

.. |image2| image:: ./cloudwatch_media/img_02_start_adding_trust_relationships_to_role_V2.PNG
    :width: 7.00000 in
    :height: 5.50000 in

.. |image3| image:: ./cloudwatch_media/img_03_trust_relationships_syntax_example_V2.PNG
    :width: 7.00000 in
    :height: 5.50000 in

.. |image4| image:: ./cloudwatch_media/img_04_attach_aws_iam_policy_to_the_iam_role_V2.png
    :width: 7.00000 in
    :height: 5.50000 in

.. |image5| image:: ./cloudwatch_media/img_05_enable_aviatrix_cloudwatch_V2.PNG
    :width: 7.00000 in
    :height: 5.50000 in

.. |image6| image:: ./cloudwatch_media/img_06_aws_cloudwatch_result_01.png
    :width: 7.00000 in
    :height: 5.50000 in

.. |image7| image:: ./cloudwatch_media/img_07_aws_cloudwatch_result_02_V2.PNG
    :width: 7.00000 in
    :height: 5.50000 in
    
.. |image8| image:: ./cloudwatch_media/img_08_troubleshoot.png
    :width: 7.00000 in
    :height: 6.00000 in
    
.. |image9| image:: ./cloudwatch_media/img_09_copy_role_ARN.png
    :width: 7.00000 in
    :height: 6.00000 in




.. add in the disqus tag

.. disqus::


