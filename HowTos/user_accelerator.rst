.. meta::
   :description: User Accelerator VPN Reference Design
   :keywords: AWS Global Accelerator, Geo VPN, VPN, aviatrix, remote user vpn, openvpn, user vpn



===================================================
VPN User Accelerator 
===================================================

VPN User Accelerator leverages `AWS Global Accelerator <https://aws.amazon.com/global-accelerator/>`_ to connect
VPN users to the nearest AWS CloudFront access point and traverse the AWS backbone to the VPN gateway. 

Note when this feature is enabled, VPN user source address is masked out by AWS. 


OpenVPN is a registered trademark of OpenVPN Inc.


.. |image0| image:: GeoVPN_media/image1.png

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
