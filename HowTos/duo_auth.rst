.. meta::
   :description: Admin users and Duo Authentication Management
   :keywords: Admin users, Duo authentication, Duo, Aviatrix

=============================================
Duo Authentication
=============================================
  
Aviatrix OpenVPN solution provides DUO authentication integration. This document helps you to set up DUO API. For how to configure OpenVPN, check out `this link. <http://docs.aviatrix.com/HowTos/uservpn.html>`_

Getting DUO API credentials
---------------------------

    You need to first have a DUO account setup.

    If you company already has a DUO account and you have admin
    privilege, log in to the DUO Admin Panel, Click Applications. Click
    one of the applications, in the Details panel is the API credential
    you need to configure DUO on the controller.

    If this is your first time creating a DUO account, Log in to the Duo
    Admin Panel and navigate to Applications. Click Protect an
    Application and locate OpenVPN in the application list. Click
    Protect this application to view Integration key, secret key and API
    hostname. This information is needed to configure DUO on the
    controller. For more details, see
    *https://*\ `*www.duosecurity.com/product* <http://www.duosecurity.com/product>`__
    for more details.

|image5|

    At least one user has to be created in DUO account like below before
    the Duo authentication on the controller is setup so the user can
    log into the console.

    |image6|

    If you cannot login to the controller because of DUO account is not
    setup properly, you can always change DUO policy to Bypass mode to
    disable push approval authentication.


.. |image5| image:: Duo_media/image6.png

.. |image6| image:: Duo_media/image7.png

.. |image7| image:: Duo_media/image8.png

   
   
.. disqus::   
