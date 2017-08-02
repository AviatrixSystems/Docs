.. meta::
   :description: controller HA
   :keywords: controller high avalability, controller HA, AWS VPC peering

###################################
Controller HA
###################################

Aviatrix controller, when deployed in the cloud, such as AWS/Azure/Google marketplace, is not in the datapath. 
Packet processing and encryption is done by the Aviatrix gateways. 

When the controller is down or out of service, your network should continue to be operational: Encrypted tunnels and OpenVPN users stay connnected and not affected. 
Since most of the data logs are forwarded from the gateways directly,
the loss of logs information from the controller is minimal. 
The only impact is that you cannot build new tunnels or add new OpenVPN users. 

The loosely coupled design between the controller and gateways reduces the impact of the availability of the controller and simplifies its HA design.

Since controller carriers configuration data, controller HA function is achieved by periodically and proactively backup the configuration data to AWS/Azure/Google account. 

When a replace controller is launched, you can restore the configuration data from your cloud storage place. 

(We like to point out that designing a standby controller that both primary and standby controllers monitor  
each other's health of through a heart beat mechanism introduces complexity 
and high probability for false positive switch over, due to scenarios
such as an accidently blocked security group ports between the two 
controller instances.)


How to backup configuration 
---------------------------

  1. Settings -> Backup & Restore
  #. Select **Cloud Type**
  #. Select **Account Name**
  #. If AWS were selected as Cloud Type, specify an **S3 Bucket Name**

If this is the first time you enable backup, this action triggers an 
configuration backup to your specified S3 bucket. 

After the initial backup, configuration data is backup daily at 12am. 

Currently if you like to force a backup for every configuration change, you can accomplish this by **Disable** the backup and **Enable** backup again. 

Only the lastet configuration data is restored. Each time a new backup 
configuration over writes the previous one. 

How to restore configuration
--------------------------------

  1. Launch a new controller
  #. Select the **Cloud Type** and other credentials for programmically 
     retrieve the backup configuration data. For example, for AWS, you need to 
     specifiy the **Access Key**, **Secret Kay**, **Bucket Name** and **File Name**.
  #. Click Restore

The new controller will then inherit the configuration data and start to be operational. 

.. disqus::
