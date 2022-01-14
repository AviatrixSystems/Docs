======================================================================
Azure Controller Security for SAML Based Authentication VPN Deployment
======================================================================

The best security practice for the Aviatrix Controller is to prevent the controller from being widely accessible from the internet. Access on TCP port 443 should be limited to:

- The range of management IPs coming from the enterprise or the datacenter.
- Ingress and egress access for basic communications and keep-alive signals from each gateway.

The exception to this best practice is when the Aviatrix Controller is used for Security Assertion Markup Language (SAML) based authentication user VPN access. In this case, the VPN user first contacts the Aviatrix Controller which then redirects user browser traffic to an Identity Provider (IdP) system, Okta for example. The initial VPN authentication traffic runs on Aviatrix Controller TCP port 443 for VPN users located off-site, so controller TCP port 443 needs to be open to all which may cause security concerns. 

You must configure Aviatrix SAML authentication for your user VPN access. The SAML authentication should be configured through the Azure Application Gateway (AppGW) so the gateway access to the Aviatrix Controller is authenticated through the AppGW. The URLs generated use the AppGW domain instead of controller domain. VPN users should not access the controller directly,  they should access the controller through the AppGW where access rules are enforced.

In order prevent the controller from being widely accessible and allow SAML authentication user VPN access, please follow the instructions in this section to secure your controller when Security Assertion Markup Language (SAML) based authentication is being used.

Alternative Use Cases for SAML Based User Authentication
========================================================

The Azure Application Gateway is a generic, workload agnostic reverse proxy and load balancer that includes a web application firewall (WAF).

- The service consists of Azure-managed VMs running Nginx in a VNET. Unless restricted, these VMs have access to the public internet, the VNET address space, and anything else a VM in that VNET can talk to.
- In addition to VMs, backends can be IP addresses.
- The Application Gateway is also an Ingress Controller option for the Azure Kubernetes Service.

From an Application Gateway perspective, the Aviatrix Controller is just another workload. The configurations in this section can be applied to any other HTTP or HTTPS workload. For example, you can use the Azure Application Gateway to:

- Protect an application running in an on-prem datacenter.
- Protect a hosted PaaS web application injected into the VM.
- Add HTTPS support to an older application that can only run HTTP.
- Restrict or redirect URL patterns within an application.

Prerequisites
=============

You need to understand how to configure OpenVPN SAML authentication. For more information, see `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_.  

Securing the Aviatrix Controller for SAML Based Authentication Behind an Azure Application Gateway
==================================================================================================

To secure your controller when Security Assertion Markup Language (SAML) based authentication is being used:

1. Create valid SSL certificates for the Aviatrix Controller and Azure Application Gateway virtual machine. Use any valid SSL certificate generation application.
2. On the Azure portal, create a subnet for the Azure Application Gateway. Create the subnet in your Aviatrix Controller’s VNET for the Azure Application Gateway. The Azure Application Gateway requires its own subnet.
3. Apply the certificates to the Controller. 

- On the Aviatrix Controller, go to the Controller Settings > Security > Advanced > Controller Certificate Import Methods.  The preferred method is to select “Import Certificate with Key”, you can also select “Generate CSR and Import Certificate”.
- Import the certificate files. 
- After you click OK,  the Aviatrix Controller browser refreshes using the new certificate. Verify the correct certificates are in use with your favorite SSL validation site.

For more information, see `Controller Certificate Management <https://docs.aviatrix.com/HowTos/import_cert_with_key.html>`_.  

4. On the Aviatrix Controller, go to Settings > Controller > Access Security > Security. Enable the Controller Primary Access Account on the Controller Security Group Management card to only allow access to the Controller Public IP from Aviatrix Gateways. In the Azure Portal, the Network Security Group (NSG) assigned to the Controller is usually <controllername>-nsg.
5. On the Azure portal, create a new Azure Application Gateway:

- Specify the Basic details.
- Configure Frontends and create a Public IP.
- Create a Backend pool. Specify the NIC of the controller virtual machine as the target.
- Add a Routing Rule. Create a rule Name and enter the required values on the Listener tab. 
- Enter the required values on the Backend targets tab. The Backend Target is the backend pool created earlier. 
- Click Add new  and configure the HTTP Settings.

A. Set the Request timeout value to 3600. Otherwise, timeouts on legitimate requests may occur.
B. Override the hostname with the FQDN chosen for the backend certificate.

6. On the Azure portal, modify the associated Azure Network Security Group to allow the Azure Application Gateway subnet.
7. On the Azure portal, enable monitoring of the Application Gateway. Add a diagnostic setting and configure the desired logging settings.
8. On the Azure portal, disable rules for the Application Gateway to prevent errors with onboarding accounts. 

- Enable advanced rule configuration. 
- Disable rules 200004, 931130, and 942430.

9. On the Azure portal, enable URL Rewrite to avoid Cross-Origin Resource Sharing (CORS) errors.

- Create a Rewrite set.
- Name the Rewrite set and assign it to the Aviatrix Controller routing rule.
- Rename the rule to something descriptive.
- On the Azure portal, enable URL Rewrite to avoid Cross-Origin Resource Sharing (CORS) errors.

10. On the Azure portal, put the Aviatrix Controller behind the Application which includes a web application firewall (WAF). The WAF will block requests with special entity names. Do not create entity name with special strings because the API will be blocked with a 403 error. 
11. Create SAML endpoint. For more information  see  OpenVPN with SAML Authentication https://docs.aviatrix.com/HowTos/VPN_SAML.html.
12. Create the Azure Application Gateway.
13. onfigure the Azure Application Gateway. 

.. Note:: For the HTTP Settings, when using the "Use well known CA certificate" option you may see a message about the root certificate of the server certificate used by the backend not matching the trusted root certificate added to the application gateway. To resolve this issue, use the fullchain certificate when importing the server certificate into the controller.
..

.. Note:: While authenticating the VPN user with an IdP and when sending the SAML response to the controller, you may see an error message about an invalid SAML response and the subject or username 'NoneType'. To resolve this issue, disable "override hostname" in the application gateway's controller-settings because the controller code checks the metadata and controller URL.
..


