

######################################################
External PKI for OpenVPN Certificates
######################################################

**How to deploy a Certificate-based SSL VPN Server**

The Aviatrix OpenVPN solution provides certificate-based SSL VPN user
authentication in addition to other multi-factor authentication methods
such as DUO, Okta, SAML and LDAP. This document describes the process of
allowing users to connect to your Cloud instances via OpenVPN when the
external PKI mechanism is used.

Pre-requisites:

Obtain the CA certificate, server certificate (for the OpenVPN gateway)
and server key from your administrator. The CA certificate will be used
to sign the server certificate and user certificate. Your CA certificate
will need to contain the CRL Distribution Point URI or you can manually
enter it during the configuration steps.

Please note that once you enable the feature, it cannot be disabled.
Please test the feature on a separate controller before trying it on a
production environment.

**Note: Certificates, key, and CRL will need to be in PEM format.**

**Configuration steps:**

1. From the Aviatrix Controller, go to Settings > Advanced >
   Certificates page to make sure Certificates Checking is disabled.
2. Go to OpenVPN > Certificate. Choose the corresponding files for the CA
   Certificate, Server Certificate, and Server Key.
3. If your CA Certificate does not contain the CRL information, enter the
   CRL Distribution Point URI and the CRL Update Interval. By default,
   the CRL Update Interval is 60 minutes.
4. Click **Import** to complete the process.
5. Go to the Gateway page and click **+New Gateway** to create a new gateway. This
   new gateway will be created with those certificates and keys imported.
   Please refer to http://docs.aviatrix.com/HowTos/uservpn.html on how
   to create a gateway.
6. Upon successful gateway creation, go to the OpenVPN > Certificate page.
7. In the Download VPN Configuration box, select the VPC ID (where your
   gateway was created) and the LB Name. Click **Download** to obtain the OVPN
   file (for example None.ovpn). 

Please note: Uploading the certificate files (ca.crt, server.key,
server.crt crl uri) again will not update the certificates on gateways
that are already deployed.

**Client OVPN file**

For each OpenVPN client, you will need to generate a certificate signed
by the CA private key. Note that the CSR for the certificate must have
the key usage attribute set to “e0” and the directive must be set to
“TLS Web Client Authentication". X509v3 Key Usage e0 stands for Digital
Signature, Non Repudiation, Key Encipherment should be enabled (No
more, no less). With your client certificate and client key ready, edit
the None.ovpn with a text editor.

At the bottom of the None.ovpn, insert your client certificate and
client key and save the file.

-----END OpenVPN Static key V1-----

</tls-auth>

<cert>

CLIENT-CERT                        << Replace your client certificate
here

</cert>

<key>

CLIENT-KEY                          << Replace your client key here

</key>

 

Now your None.ovpn is ready for use. Download and install OpenVPN client
on your laptop.

Download links: 

1. For Windows users, download the OpenVPN client from this link: 

      http://openvpn.net/index.php/open-source/downloads.html

     
Instructions: \ https://openvpn.net/index.php/open-source/documentation/howto.html

2. For MAC users, download Tunnelblick from this link: 

   `https://tunnelblick.net <https://tunnelblick.net/>`__

      Instructions: https://openvpn.net/index.php/access-server/docs/admin-guides/183-how-to-connect-to-access-server-from-a-mac.html

Once your OpenVPN client is installed, you can use the None.ovpn to
connect to your SSL OpenVPN gateway.

The common name field in the certificate will be used by the Controller
to identify the user.



**Sample scripts**

The scripts provided here help you to generate client certificates with
the correct attributes set:

https://s3-us-west-2.amazonaws.com/aviatrix-download/PKI/scripts.zip

Instructions are present in the zip file.

Sample certificates for reference

https://s3-us-west-2.amazonaws.com/aviatrix-download/PKI/sample_certs.zip

To view the certificate information(Key usage bits) you can use:

openssl x509 -in client.crt -text -noout

You need to expose the crl.pem over HTTP/HTTPS to the Aviatrix
Controller and Gateway so that they can retrieve them via URL.

**Profiles**

If you wish to use the profiles feature, you need to add users in the
controller (OpenVPN > VPN Users). The username should match the common Name
field in the client certificate. Note that you cannot add email here
during user addition since certificates are generated externally. You
can now associate these users to profiles under OpenVPN > Profiles.

.. add in the disqus tag

.. disqus::
