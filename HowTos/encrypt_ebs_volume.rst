.. meta::
   :description: Encrypt EBS Volume
   :keywords: encrypt, ebs, volume, gateway


############################
Encrypt EBS Volume 
############################


Description 
------------

This feature is used to encrypt your gateway EBS volume. 


Prerequisite
--------------

You need to add below rules into your IAM role policies ("aviatrix-app-policy"). 

::

        { 
            "Effect": "Allow", 
            "Action": [ 
                "ec2:DescribeInstances",
                "ec2:DescribeVolumes",
                "ec2:DescribeSnapshots",
                "ec2:StopInstances",
                "ec2:StartInstances",
                "ec2:CopySnapshot",
                "ec2:CreateSnapshot",
                "ec2:CreateVolume",
                "ec2:DeleteVolume",
                "ec2:DeleteSnapshot",
                "ec2:AttachVolume",
                "ec2:DetachVolume"
            ],
            "Resource": "*"
        }
 
|

How to add IAM rules? 
^^^^^^^^^^^^^^^^^^^^^^

**Step1: Go to your AWS account and select IAM service.** 

|image_1_IAMRolesClickAviatrixroleapp|

|

**Step2: Select "Roles", then double click the role name "aviatrix-role-app."** 

|image_2_selectAviatrixAppPolicyEnditPolicy|

|

**Step3:  Click "JSON", then put the rules into the JSON file.  Then click "Review policy".**

|image_3_selectJSONAddRulesClickReviewPolicy|

|

**Step4: Click "Save changes" to finish the prerequisite.**

|image_4_saveChanges|

|

**Step5: Then you already added the IAM rules.**

How to encrypt gateway EBS volume via Aviatrix controller?  
-----------------------------------------------------------

**Step1: Go to your Aviatrix controller page, and select "Gateway" page.**

|

**Step2: Select the gateway which you want to encrypt, then click "Edit" button.**

|image_11_selectGwEdit|

|

**Step3: Check the current status of Gateway EBS volume.**

|image_12_checkStatus|

|

**Step4: Scroll dowm to "Encrypt Volume" and Click "Encrypt" button to encrypt the EBS. Please wait for the encryption process complete.** 

|image_13_scrollDownToEncryptVolume|

.. note::
*The controller will use Default* **"AWS Managed Keys"** *to encrypt your EBS volume.*

*Otherwise, you can use your* **"Customer Managed Key ID"** *to encrypt the gateway EBS volume.* `How to create AWS Customer Managed Key ID?  <http://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html#create-keys-api>`_

|

**Step5: Check the Encrypted result. You can refresh the contoller page then check the status of Gateway EBS volume.**

|image_14_checkEncryptResult|

|

**Step6: You can check the result on your AWS console. It's on EC2 -> Volume page.**

|image_15_checkEncryptResultOnAws|

.. note::
*You can see that the gateway EBS volume was encrypted. Also, the previous unencrypted volume will be kept.*

|

.. |image_1_IAMRolesClickAviatrixroleapp| image:: Encrypt_Volume_media/image_1_IAMRolesClickAviatrixroleapp.PNG
.. |image_2_selectAviatrixAppPolicyEnditPolicy| image:: Encrypt_Volume_media/image_2_selectAviatrixAppPolicyEnditPolicy.PNG
.. |image_3_selectJSONAddRulesClickReviewPolicy| image:: Encrypt_Volume_media/image_3_selectJSONAddRulesClickReviewPolicy.PNG
.. |image_4_saveChanges| image:: Encrypt_Volume_media/image_4_saveChanges.PNG

.. |image_11_selectGwEdit| image:: Encrypt_Volume_media/image_11_selectGwEdit.PNG
.. |image_12_checkStatus| image:: Encrypt_Volume_media/image_12_checkStatus.PNG
.. |image_13_scrollDownToEncryptVolume| image:: Encrypt_Volume_media/image_13_scrollDownToEncryptVolume.PNG
.. |image_14_checkEncryptResult| image:: Encrypt_Volume_media/image_14_checkEncryptResult.PNG
.. |image_15_checkEncryptResultOnAws| image:: Encrypt_Volume_media/image_15_checkEncryptResultOnAws.PNG

.. disqus::
