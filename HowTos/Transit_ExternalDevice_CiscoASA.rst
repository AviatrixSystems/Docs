=========================================================
Transit Connection to Cisco ASA over the internet.
=========================================================

1. From the Controller go to Transit Network -> Setup -> Launch a Transit VPC GW.

   |image1|

2. Connect the transit VPC GW to the CicsoASA. Go to Transit Network -> Setup -> Connect to VGW/External Device.
   select External Device and input the following parameters.
      a. BGP Local AS number: ASN of the transit VPC GW
      b. BGP Remote AS number: ASN of the CiscoASA
      c. Remote Gateway IP Address: CiscoASA WAN Public ip.

   |image2|
3. Download the configuration by going to Site2Cloud -> Click on the Connection.
   select generic and Download Configuration and configure on CiscoASA accordingly.

   |image3|
   The following is a sample configuration based on the site2cloud configuration above.
   |image4|
4. Apply the following configuration to your CiscoASA:

   |image5|
    Note: The tunnel IP addresses are configured accordingly with the configuration file downloaded from above.
5. After configuring the router the tunnel should change the status from down to up.
   |image6|
6. Go to Transit Network -> Advanced Config on the Controller and Click on Diagnostics and select the GW name from the
   dropdown list and select Show Ip bgp Command from the predefined Show list to verify the BGP Routes.
   |image7|
   |image8|

.. |image1| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA1.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image2| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA2.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image3| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA3.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image4| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA4.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image5| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA5.png
    :width: 100%
.. |image6| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA6.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image7| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA7.png
    :width: 7.00000 in
    :height: 5.00000 in
.. |image8| image:: ./Transit_ExternalDevice_CiscoASA_media/ciscoASA8.png
    :width: 7.00000 in
    :height: 5.00000 in


.. disqus::
