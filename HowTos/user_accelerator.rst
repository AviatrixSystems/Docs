
===================================================
VPN User Accelerator 
===================================================

The VPN User Accelerator leverages the `AWS Global Accelerator <https://aws.amazon.com/global-accelerator/>`_ to connect
VPN users to the nearest AWS Edge location access point and traverse the AWS backbone to the VPN Gateway. 

.. Note::
   When this feature is enabled, the VPN user source address is masked out by AWS.
..

To configure, 

 1. First `launch a VPN Gateway <https://docs.aviatrix.com/HowTos/uservpn.html>`_ by following the instructions.
 #. After the VPN is setup, an AWS NLB should be displayed on the left side panel, highlight it and click **Add**. Then click **OK**, as shown below.

|user_accelerator|

 3. From this point on, you can add VPN users which will use the new User Accelerator. 

.. Note::
    * The new User Accelerator will reflect on the ovpn file's remote field.
    * For pre-existing users, the ovpn file has to be re-downloaded in order for AWS Global Accelerator to be reflected as the new remote endpoint.
..

*OVPN File with User Accelerator OFF*

|ovpn_using_elb|

*OVPN File with User Accelerator ON*

|ovpn_using_user_accelerator|

OpenVPN is a registered trademark of OpenVPN Inc.


.. |user_accelerator| image:: user_accelerator_media/user_accelerator.png
   :scale: 30%

.. |ovpn_using_elb| image:: user_accelerator_media/ovpn_using_elb.png
   :scale: 30%

.. |ovpn_using_user_accelerator| image:: user_accelerator_media/ovpn_using_user_accelerator.png
   :scale: 30%

.. |imageArchitecture| image:: GeoVPN_media/architecture_overview.png

.. |imageWithoutGeoVPN| image:: GeoVPN_media/architecture_without_geovpn.png

.. |imageWithGeoVPN| image:: GeoVPN_media/architecture_with_geovpn.png

.. |imageEnable| image:: GeoVPN_media/enable_geovpn.png

.. |imageEnablePopulate| image:: GeoVPN_media/enable_geovpn_populate.png

.. |imageAddAdditionalELB| image:: GeoVPN_media/add_additional_elb.png

.. |imageAddAdditionalELBComplete| image:: GeoVPN_media/add_additional_elb_complete.png

.. |imageComplete| image:: GeoVPN_media/geovpn_complete.png

.. |imageAddVPNUser| image:: GeoVPN_media/add_vpn_user.png

.. disqus::
