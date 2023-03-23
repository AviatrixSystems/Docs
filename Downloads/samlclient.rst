
   
.. |win| image:: AVPNC_img/Win.png
   
.. |mac| image:: AVPNC_img/Mac.png
   
.. |lux| image:: AVPNC_img/Linux.png

.. |bsd| image:: AVPNC_img/BSD.png
 
.. |Client| image:: AVPNC_img/Client.png
   :width: 500

===================
Aviatrix VPN Client 
===================

.. important::

  To download the latest VPN client, click `here <https://docs.aviatrix.com/documentation/latest/aviatrix-openvpn/download-vpn-client.html>`_. 

|Client|

The Aviatrix VPN solution is the only VPN solution that provides SAML authentication from the client itself. The solution is built on OpenVPN®. The Aviatrix VPN Client
provides a seamless user experience when authenticating a VPN user through a SAML IDP. The client also supports password based authentication methods as well.

The VPN Client can be installed on desktop platforms and is supported on various operating systems like Windows, Mac and Linux.

To set up the VPN Client, see the `User Guide <http://docs.aviatrix.com/Downloads/vpnclientguide.html>`_.

Please see the `Release Notes <https://docs.aviatrix.com/documentation/latest/release-notes/vpn-client/vpn-release-notes.html>`_ to find the latest VPN client version.

*************
Windows |win|
*************
The Windows client can be downloaded from `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_win_x64.exe>`__

The Windows client checksum can be downloaded from `this link <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_win_x64.exe.checksum.txt>`__

At the end of the installation, please install the TUN TAP driver if you haven't done so earlier.

Please note that the client uses the default browser, and Microsoft Edge/IE is not supported

*********
Mac |mac|
*********

The Mac client can be downloaded from `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_mac.pkg>`__. Please make sure that you are running macOS 10.12(Sierra) or higher.

The Mac client checksum can be downloaded from `this link <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_mac.pkg.checksum.txt>`__.

If you have installed version 1.4.26 or lower, please uninstall before you install the newer version. Please note that the client uses the default browser, and Safari is not supported (will show certificate warnings)

***********
Linux |lux|
***********
For the .deb files, if opening them using software center does not work, use sudo dpkg -i file.deb; sudo apt-get install -f (Dependencies) to install

For the .tar files use tar -xvzf file.tar.gz; cd AVPNC_setup; sudo ./install.sh to install

If the icon is missing from the launcher, type AVPNC in the terminal to launch the app

Debian/Ubuntu
=============

Ubuntu22 LTS - `Debian file <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_JammyJellyfish.deb>`_,
`Debian file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_JammyJellyfish.deb.checksum.txt>`_,
`Tar file <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_JammyJellyfish.tar.gz>`_,
`Tar file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_JammyJellyfish.tar.gz.checksum.txt>`_.

Ubuntu20.04 LTS - `Debian file <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_FocalFossa.deb>`__,
`Tar file <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_FocalFossa.tar.gz>`__,
`Debian file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_FocalFossa.deb.checksum.txt>`__,
`Tar file checksum. <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_FocalFossa.tar.gz.checksum.txt>`__

Ubuntu18.04.1 LTS/Generic - `Debian file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_debian.deb>`__,
`Tar file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_linux.tar.gz>`__,
`Debian file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_debian.deb.checksum.txt>`__,
`Tar file checksum. <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux.tar.gz.checksum.txt>`__

Ubuntu18.04.3 LTS - `Debian file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_debian_latest.deb>`__,
`Tar file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_linux_latest.tar.gz>`__,
`Debian file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_debian_latest.deb.checksum.txt>`__,
`Tar file checksum. <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_latest.tar.gz.checksum.txt>`__

Note: Currently we do not support Fedora/Arch-Linux. VPN Clients running on Ubuntu 16.04 and older are designated EOL.


*************
FreeBSD |bsd|
*************
FreeBSD 11 client can be downloaded from- `this link <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_FreeBSD.tar.gz>`__

tar -xvzf file.tar.gz; cd AVPNC_setup; sudo ./install.sh to install


*****************
FIPS140-2 version
*****************

`Windows <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_win_x64_FIPS.exe>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_win_x64_FIPS.exe.checksum.txt>`__

`Mac <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_mac_FIPS.pkg>`__ ,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_mac_FIPS.pkg.checksum.txt>`__

`Ubuntu 22 tar <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_JammyJellyfish_FIPS.tar.gz>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_JammyJellyfish_FIPS.tar.gz.checksum.txt>`__
`Ubuntu 22 deb <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_JammyJellyfish_FIPS.deb>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_JammyJellyfish_FIPS.deb.checksum.txt>`__

`Ubuntu 20 tar <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_FocalFossa_FIPS.tar.gz>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_FocalFossa_FIPS.tar.gz.checksum.txt>`__

`Ubuntu 20 deb <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_debian_FIPS.deb>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_FocalFossa_FIPS.deb.checksum.txt>`__

`Ubuntu 18 tar <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_FIPS.tar.gz>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_linux_FIPS.tar.gz.checksum.txt>`__

`Ubuntu 18 deb <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_debian_FIPS.deb>`__,
`Checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/fips/AVPNC_debian_FIPS.deb.checksum.txt>`__

*****************
Archived Clients
*****************

Ubuntu14.04 LTS - `Debian file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/AVPNC_debian_Q4.deb>`__,
`Tar file <https://s3-us-west-2.amazonaws.com/avi atrix-download/AviatrixVPNClient/AVPNC_linux_Q4.tar.gz>`__,
`Debian file checksum <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_debian_Q4.deb.checksum.txt>`__,
`Tar file checksum. <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/AVPNC_linux_Q4.tar.gz.checksum.txt>`__

*******************
Development version
*******************
These are preview images for the next release.

`Windows <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_win_x64.exe>`__,
`MacOS <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_mac.pkg>`__ ,
`Debian Jammy Jellyfish <https://aviatrix-download.s3.us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_linux_JammyJellyfish.deb>`__,
`Linux Jammy Jellyfish <https://aviatrix-download.s3.us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_linux_JammyJellyfish.tar.gz>`__,
`Debian Focal Fossa  <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_linux_FocalFossa.deb>`__,
`Linux tar Focal Fossa <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_linux_FocalFossa.tar.gz>`__,
`Linux tar <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_linux.tar.gz>`__,
`Debian file <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_debian.deb>`__,
`Linux tar bionic <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_linux_latest.tar.gz>`__,
`Debian bionic <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/AVPNC_debian_latest.deb>`__,
`Linux tar xenial <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_xenial.tar.gz>`__,
`Debian xenial <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_xenial.deb>`__,
`Linux tar trusty <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_linux_Q4.tar.gz>`__,
`Debian trusty <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_debian_Q4.deb>`__,
`FreeBSD <https://s3-us-west-2.amazonaws.com/aviatrix-download/AviatrixVPNClient/dev/AVPNC_FreeBSD.tar.gz>`__

FIPS140-2 Dev version

`Windows <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_win_x64_FIPS.exe>`__,
`Mac <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_mac_FIPS.pkg>`__ ,
`Ubuntu-22 tar <https://aviatrix-download.s3.us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_JammyJellyfish_FIPS.tar.gz>`__ ,
`Ubuntu-22 deb <https://aviatrix-download.s3.us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_JammyJellyfish_FIPS.deb>`__ ,
`Ubuntu-20 tar <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_FocalFossa_FIPS.tar.gz>`__ ,
`Ubuntu-20 deb <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_FocalFossa_FIPS.deb>`__ ,
`Ubuntu-18 tar <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_linux_FIPS.tar.gz>`__,
`Ubuntu 18 deb <https://aviatrix-download.s3-us-west-2.amazonaws.com/AviatrixVPNClient/dev/fips/AVPNC_debian_FIPS.deb>`__

OpenVPN is a registered trademark of OpenVPN Inc.


.. disqus::

