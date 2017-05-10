Aviatrix REST API
=============================================

Login
------

.. http:get:: /v1/api?action=login

Login to the controller with valid username and password

Request Parameters

+-------------------------+--------------------------------------------------------+
| action                  |  Indicating type of API to call                        |
|                         |  Type: String                                          |
|                         |  Valid value: "login"                                  |
|                         |  Default: None                                         |
|                         |  Required: Yes                                         |
+-------------------------+--------------------------------------------------------+
| username                |  The user name of the account                          |
|                         |  Type: String                                          |
|                         |  Valid value: "admin" or an existing user account name |
|                         |  Default: None                                         |
|                         |  Required: Yes                                         |
+-------------------------+--------------------------------------------------------+
| password                |  The password for the account                          |
|                         |  Type: String                                          |
|                         |  Default: None                                         |
|                         |  Required: Yes                                         |
+-------------------------+--------------------------------------------------------+

