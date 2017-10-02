# Multiple Approaches to Use Aviatrix API


## Introduction
Aviatrix provides REST/RESTful (Representational State Transfer) API to help customers to integrate Aviatrix products or to automate some routine tasks, such as backup-operation for Aviatrix controller, checking active/live VPN users at the current moment for management purpose, etc...


## Tools
In this document, we demonstrate Aviatrix REST API invocation with the following tools.
  01. **Postman**
  02. Linux **curl** command
  03. Python **requests** module/library/package


## Value Format (URL Encoding)

### Brief Talk:
Sometimes, if the input value contains some special characters, such as '#' or '/' etc...We might need to use some tools to convert the value to a valid format.


### Tips:
The valid value for '#' is '%23'
And the valid value for '/' is '%2F'


### For example:
If my Azure ARM Subscription ID is "abc#efg", instead of using...

    "arm_subscription_id=abc#efg"

you need to use the following format instead...

    "arm_subscription_id=abc%23efg"


### Tools to convert the value format
    There are many tools online that can do the job. Just simply google "URL Encoder", and you can encode/convert the special character to the correct format.


## How Does Aviatrix REST API Work
In order to invoke the most of Aviatrix API(s), the user must have a valid "CID" (session ID) for security purpose. Moreover, a valid CID can be acquired through Aviatrix "login" API. The examples are provided below.
Please reference ![Aviatrix-REST-API Documentation](https://s3-us-west-2.amazonaws.com/avx-apidoc/index.htm) for the completed Aviatrix REST API list.


## Examples:

### Invoke Aviatrix "login" API to get a valid CID
**Postman**
    |img_01|


**Linux "curl" command**
Syntax:

    curl  -k  "https://AVIATRIX_CONTROLLER_IP/v1/api?action=login&username=admin&password=MY_PASSWORD"

Example:
    |img_02|


**Python "requests" module**

Example Code:

```
import requests

# Controller configuration
base_url = "https://10.67.0.2/v1/api"
username = "admin"
password = "MyPassword"
action = "login"
CID = ""

# Configuration for "login" API
payload = {
    "action": action,
    "username": username,
    "password": password
}

# Use "requests" module to invoke REST API
response = requests.get(url=base_url, params=payload, verify=False)

# If login successfully
if True == response.json()["return"]:
    CID = response.json()["CID"]
    print("Successfully login to Aviatrix Controller. The valid CID is: " + CID)

```

Execution Result:

    |img_03|


### Examples: Invoke Aviatrix API with a valid CID

**NOTES: **
The following examples are to demonstrate using Aviatrix API __"setup_account_profile"__ to create __Aviatrix "cloud-account"__.

**Postman**

    |img_04|


**Linux "curl" command**

    |img_05|


**Python**

Example Code:

```
import requests

# Configuration for "setup_account_profile" API to create AWS IAM Role based account
payload = {
    "action": "setup_account_profile",
    "CID": "B4XvxZYJUTHNaMcK2Nf2",
    "account_name": "my-AWS-operation-account",
    "account_password": "!MyPassword",
    "account_email": "test@aviatrix.com",
    "cloud_type": "1",
    "aws_account_number": "123456789999",
    "aws_iam": "true",
    "aws_access_key": "XXXXXXXXXXXXXXXXXXXXXX",
    "aws_secret_key": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

# Use "requests" module to invoke REST API
response = requests.post(url="https://10.67.0.2/v1/api", data=payload, verify=False)

# Display return message
print(response.json())

```

Execution Result:

    |img_06|


## Conclusion:
Aviatrix strives to provide the best Hybrid Cloud solution/technology for the world. Please do not hesitate to contact us if you have any valuable advices in mind. We sincerely appreciate your support and being our loyal customer!


__Copyright © 2017 Aviatrix Systems, Inc. All rights reserved.__


-----------------------------------------------------------------


.. |img_01| img:: dir/img_01_postman_login.jpg
    :width: 2.00000 in
    :height: 2.00000 in
.. |img_02| img:: dir/img_02_curl_login.jpg
    :width: 2.00000 in
    :height: 2.00000 in
.. |img_03| img:: dir/img_03_python_login_execution_result.jpg
    :width: 2.00000 in
    :height: 2.00000 in
.. |img_04| img:: dir/img_04_postman_create_account.jpg
    :width: 2.00000 in
    :height: 2.00000 in
.. |img_05| img:: dir/img_05_curl_create_account.jpg
    :width: 2.00000 in
    :height: 2.00000 in
.. |img_06|: img:: dir/img_06_python_create_account_execution_result.jpg
    :width: 2.00000 in
    :height: 2.00000 in
