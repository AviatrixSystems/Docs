|image0|

#################################################
    Setup Okta for Aviatrix VPN gateway
#################################################

Version 10-20-­2016

Copyright © 2014-­2016 Aviatrix Systems, Inc. All rights reserved.

Aviatrix VPN gateway supports Okta authentication as part of
multi-­factor authentication for OpenVPN access. Following are the
steps.

1.0  Log in into your Okta account as **Super Admin.** This allows the privilege to create a Token for API access by Aviatrix gateway.

    1.1 Go to “Security” -­‐> “API” -­‐> “Create Token”. Give the token a
    name, for example, Aviatrix, and copy the token string. You’ll need
    the token string for Aviatrix gateway API access to Okta.

    |image1|

2.0  If you have not created users for VPN access, go to “Directory” -­‐> “People” to create an account for VPN user. In this example, the
account name is `demoaviatrix@aviatrix.com <mailto:demoaviatrix@aviatrix.com>`__

    |image2|

3.0  At Aviatrix Controller, go to “Gateway” to create a gateway with “VPN Access”
enabled. Select “Okta” for “Two-­‐step Authentication” and enter Okta related fields as following:

   -  URL: Your Okta account login URL. (For example,
      https://aviatrixdt.okta.com)

   -  Token: Token string copied from Step 1.

   -  Username Suffix (Optional): In this example, “aviatrix.com” was
      entered. If Username Suffix is provided, users should enter their
      account ID without the domain name when loggin in from the VPN Client.
      For example, if your Okta account is
      `demoaviatrix@aviatrix.com <mailto:demoaviatrix@aviatrix.com>`__
      and “aviatrix.com” as Username Suffix, you should enter
      “demoaviatrix” as your VPN username when prompted for username by
      OpenVPN Client. If Username Suffix is not provided, you must enter
      `demoaviatrix@aviatrix.com, <mailto:demoaviatrix@aviatrix.com>`__
      as shown below.

        |image3|

.. |image0| image:: How_to_setup_Okta_for_Aviatrix_media/image0.png
   :width: 3.5in
   :height: 0.5in

.. |image1| image:: How_to_setup_Okta_for_Aviatrix_media/image1.jpg
   :width: 5.92708in
   :height: 3.34097in


.. |image2| image:: How_to_setup_Okta_for_Aviatrix_media/image2.jpg
   :width: 5.80069in
   :height: 3.27431in

.. |image3| image:: How_to_setup_Okta_for_Aviatrix_media/image3.jpg
   :width: 3.95417in
   :height: 4.14375in
