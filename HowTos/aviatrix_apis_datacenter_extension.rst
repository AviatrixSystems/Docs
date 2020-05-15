.. meta::
   :description: Datacenter extension API reference design
   :keywords: datacenter extension, Aviatrix API, Aviatrix, VLAN stretching

=================================================
    API Example
=================================================



Introduction
============

The APIs for Aviatrix can be used for the tasks
that are done through the Web UI. 

The following is an example of utilizing the APIs to create a VPC/VNet
under Datacenter Extension. For the complete API documentation, check out `this link. <https://api.aviatrix.com/?version=latest>`_

Datacenter Extension capability manages your cloud address range. It
creates VPC/VNet, subnets, routing tables and creates an IPSec tunnel to
the virtual appliance (ACX), so that on-premise VMs and
servers can communicate with instances in the created VPC with packet
encryption and private IP addresses.

Workflow for Datacenter Extension
=================================

Make sure the latest version of Aviatrix software is installed or
upgraded before you start. You should see the alert for software upgrade
on the menu bar of the controller if a newer version is available. Click
**Upgrade** and wait for the upgrade to complete.

Here are the steps to successfully use the APIs to achieve the same
result without the Web UI.

1. Log in to get the session ID

2. Enter the license (customer ID)

3. Set up the maximum number of VPC/VNet

4. Create a user account

5. Create a VPC/VNet for Datacenter Extension

Use the APIs to Create a VPC/VNet
=================================

The APIs in this section are to demonstrate how to use them to accomplish the steps described above.
The data used here is for demonstration purposes only. Replace the values in your case.

For more information, refer to “Cloud Services Gateway Controller API
reference” for details. You can retain a copy of this document under
**?Help > API Reference** on the menu bar after you log on the Web
console.

1. Log in to get the session ID

     ::

      https://IP_Address_of_ACX/v1/api?action=login&username=admin&password=password

   Replace IP_Address_of_ACX with your own IP address of ACX.
   Replace the values of username and password with the credentials you use to log in the Web console.

   It should return a CID upon successful login.
      ::

        {
        "return": true,
        "results": "User login:admin in account:admin has been authorized
        successfully - Please check email confirmation.",
        "CID": "584b4b57a42f2"
        }

Note the value of the CID for the API calls hereafter.

2. Enter the license

   Obtain a valid license (customer ID) from Aviatrix in advance then enter the value in the API

   ::

    https://IP_Address_of_ACX/v1/api?
    CID=584b4b57a42f2&action=setup_customer_id&customer_id=carmelodev-1234567898.64

Replace the value of CID with the one in step 1.
Replace the value of customer_id with your license.
Make sure the license is successfully entered and it returns the license information correctly.

    ::

      {
      "return": true,
      "results": {
      "license_list": [
          {
            "Lic-1436678987.59": {
                "Verified": 0,
                "Type": "c4.4xlarge",
                "Expiration": "2017-12-09",
                "Allocated": 0,
                "IssueDate": "2016-12-09",
                "Quantity": 20
             }
           }
          ],
          "CustomerID": "carmelodev-1234567898.64"
        }
      }

3. Set up the maximum number of VPC/VNet ::

      https://IP_Address_of_ACX/v1/api?CID=584b4b57a42f2&action=setup_max_vpc_containers&vpc_num=4

|   Replace the value of CID with the one in step 1.
|   Replace the value of vpc_num with the number you desire to set up.

    ::

        {
          "return": true,
          "result": {
            "cidr_list": [
            "10.16.32.0\/19",
            "10.16.64.0\/19",
            "10.16.96.0\/19",
            "10.16.128.0\/19"
            ]
          }
        }

4. Create a User Account

   Before calling the API to set up an account that enables ACX to access the cloud, gather the account information from the cloud
   provider.

   |   AWS ( cloud_type = 1 ): Account Number, Access key and Secret Key
   |   Azure ( cloud_type = 2 ): Azure Subscription ID
   |   Azure RM ( cloud_type = 8 ): Azure Subscription ID, Application Endpoint, Application Client ID and Application Client Secret

   This API needs to use POST method of HTTP to send the account information. Use any tool of your preference to send the POST HTTP
   request

   ::

    POST https://192.168.0.251/v1/api

    Body

    {
      "CID": "584b4b57a42f2",
      "action": "setup_account_profile",
      "account_name": "user2",
      "account_password": "12345",
      "account_email": "user2@123abc.com",
      "cloud_type": "1",
      "aws_account_number": "982805288348",
      "aws_access_key": "AKIAIQDAABCPKKKWQA",
      "aws_secret_key": "9ttSESnQvb\/OlWZKCjyPsbcdYgamthksK2+1G"
    }

  | The above example is to set up an AWS account (cloud_type is 1 ).
  | The others are the account information from AWS.

::

    {
      "return": true,
      "results": "An email with instructions has been sent to
      user2@123abc.com"
    }

5. Create a VPC/VNet for Datacenter Extension

  |  Currently, two cloud types are available for Datacenter Extension.
  |  They are AWS and Azure ARM. Hence, it either to create a VPC or VNet.

  |  The CIDR of this VPC/VNet can only be one of the available CIDRs you set up in step 3.

  Enter the CIDR as the value of vpc_net in this API. ::

    POST https://172.16.150.15/v1/api

    Body

    {
        "CID": "584b4b57a42f2",
        "action": "create_container",
        "cloud_type": "1",
        "account_name": "user2",
        "vpc_name": "dc-us-west-1",
        "vpc_reg": "us-west-2",
        "vpc_size": "t2.micro",
        "vpc_net": "10.16.96.0\/19"
    }

| The result is expected to return after a while.

| There are other options you can specify when you use this API to create a VPC/VNet.
| Refer to the reference document for more details about the options.


.. add in the disqus tag

.. disqus::
