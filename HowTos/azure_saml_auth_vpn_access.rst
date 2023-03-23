
======================================================================
Azure Controller Security for SAML Based Authentication VPN Deployment
======================================================================

The best security practice for the Aviatrix Controller is to prevent the Controller from being widely accessible from the internet. Access on TCP port 443 should be limited to:

- The range of management IPs coming from the enterprise or the data center.
- Ingress and egress access for basic communications and keep-alive signals from each gateway.

The exception to this best practice is when the Aviatrix Controller is used for Security Assertion Markup Language (SAML) based authentication user VPN access. In this case, the VPN user first contacts the Aviatrix Controller, which then redirects user browser traffic to an Identity Provider (IdP) system, Okta for example. The initial VPN authentication traffic runs on Aviatrix Controller TCP port 443 for VPN users located off-site, so Controller TCP port 443 needs to be open to all which may cause security concerns. 

You must configure Aviatrix SAML authentication for your user VPN access. The SAML authentication should be configured through the Azure Application Gateway (AppGW) so the URLs generated for use in the IdP and domain information in the ovpn file point to the domain of the AppGW. The URLs generated use the AppGW domain instead of Controller domain. VPN users should not access the Controller directly; they should access the Controller through the AppGW where access rules are enforced.

In order prevent the Controller from being widely accessible and allow SAML authentication user VPN access, please follow the instructions in this section to secure your Controller when Security Assertion Markup Language (SAML) based authentication is being used.

Azure Application Gateways and the Aviatrix Controller
======================================================

The Azure Application Gateway is a generic, workload agnostic reverse proxy and load balancer that includes a web application firewall (WAF).

- The service consists of Azure-managed VMs running Nginx in a VNET. Unless restricted, these VMs have access to the public internet, the VNet address space, and anything else a VM in that VNet can talk to.
- In addition to VMs, backends can be IP addresses.
- The Application Gateway is also an Ingress Controller option for the Azure Kubernetes Service.

From an Application Gateway perspective, the Aviatrix Controller is just another workload. The configurations in this section can be applied to any other HTTP or HTTPS workload. For example, you can use the Azure Application Gateway to:

- Protect an application running in an on-prem data center.
- Protect a hosted PaaS web application injected into the VM.
- Add HTTPS support to an older application that can only run HTTP.
- Restrict or redirect URL patterns within an application.

Prerequisites
=============

You need to understand how to configure OpenVPN SAML authentication. For more information, see `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_.  

Securing the Aviatrix Controller for SAML Based Authentication Behind an Azure Application Gateway
==================================================================================================

To secure your Controller when Security Assertion Markup Language (SAML) based authentication is being used:

1. Create valid SSL certificates for the Aviatrix Controller and Azure Application Gateway virtual machine. Use any valid SSL certificate generation application.
2. On the Azure portal, create a subnet for the Azure Application Gateway. Create the subnet in your Aviatrix Controller’s VNet for the Azure Application Gateway. The Azure Application Gateway requires its own subnet.
3. Apply the certificates to the Controller. 

  A. On the Aviatrix Controller, go to the Controller Settings > Security > Advanced > Controller Certificate Import Methods. The preferred method is to select **Import Certificate with Key**, but you can also select **Generate CSR and Import Certificate**.
  B. Import the certificate files. 
  C. After you click **OK**,  the Aviatrix Controller browser refreshes using the new certificate. Verify the correct certificates are in use with your favorite SSL validation site.

For more information, see `Controller Certificate Management <https://docs.aviatrix.com/HowTos/import_cert_with_key.html>`_.  

4. On the Aviatrix Controller, go to Settings > Controller > Access Security > Security. Enable the Controller Primary Access Account on the Controller Security Group Management card to only allow access to the Controller Public IP from Aviatrix Gateways. In the Azure Portal, the Network Security Group (NSG) assigned to the Controller is usually <controllername>-nsg.
5. On the Azure portal, create a new Azure Application Gateway:

* Specify the Basic details.
* Configure Frontends and create a Public IP.
* Create 2 backend pools. Create one pool to allow VPN user requests on the flask endpoint and the other pool to block access to any other endpoints on the Aviatrix Controller. 

    - Specify the NIC of the Controller virtual machine as the target.
    - Chose HTTP Settings: <controller-settings>.

      - **<controller>** - Select the Controller instance as target.
      - **<dont-allow>** - This backend pool is used to block endpoints on the Controller except for ‘flask’.

    - Create a path-based rule in listener rules.

      - Choose Backend target as <dont-allow>, so that the App GW returns “502 Bad Gateway” response to any paths other than ‘/flask*’.
      - Create a path-based rule for the path “/flask*“, with the backend target set to <controller>.

* Add a Routing Rule. Create a rule Name and enter the required values on the Listener tab. 
* Enter the required values on the Backend targets tab. The Backend Target is the backend pool created earlier. 
* Click **Add new** and configure the HTTP Settings.
* Set the Request timeout value to 3600. Otherwise, timeouts on legitimate requests may occur.
* Set the Override with new hostname setting to **No**.

6. On the Azure portal, modify the associated Azure Network Security Group to allow the Azure Application Gateway subnet.
7. On the Azure portal, enable monitoring of the Application Gateway. Add a diagnostic setting and configure the desired logging settings.
8. On the Azure portal, disable rules for the Application Gateway to prevent errors with onboarding accounts. 

* Enable advanced rule configuration. 
* Disable rules 200004, 931130, and 942430.

9. On the Azure portal, enable URL Rewrite to avoid Cross-Origin Resource Sharing (CORS) errors.

* Create a Rewrite set.
* Name the Rewrite set and assign it to the Aviatrix Controller routing rule.
* Rename the rule to something descriptive.
* On the Azure portal, enable URL Rewrite to avoid Cross-Origin Resource Sharing (CORS) errors.

10. On the Azure portal, put the Aviatrix Controller behind the Application which includes a web application firewall (WAF). The WAF will block requests with special entity names. Do not create entity name with special strings because the API will be blocked with a 403 error. 
11. Create SAML endpoint. For more information  see `OpenVPN with SAML Authentication <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_.

After the Azure AppGW is configured and the Aviatrix Controller is placed behind the AppGW, you are ready to test your SAML based authentication for user VPN access. 


.. Note:: For the HTTP Settings, when using the "Use well known CA certificate" option you may see a message about the root certificate of the server certificate used by the backend not matching the trusted root certificate added to the application gateway. To resolve this issue, use the fullchain certificate when importing the server certificate into the Controller.
..

.. Note:: While authenticating the VPN user with an IdP and when sending the SAML response to the Controller, you may see an error message about an invalid SAML response and the subject or username 'NoneType'. To resolve this issue, disable "override hostname" in the application gateway's HTTP settings.
..

Example
-------------------------

The following example demonstrates securing the Aviatrix Controller for SAML based authentication behind an Azure application gateway with the Okta IdP.

The objective is to limit access to Aviatrix Controller port 443 to authorized IPs and at the same time allow a VPN client to contact the Controller for SAML authentication. In the following example, the Aviatrix Controller is placed and Azure application gateway with WAF enabled. All the steps used to create the Azure application gateway are not included, the example focuses on the special steps to implement the configuration.

1. Create domain names for Controller and App GW. For example:

    - Controller: azure-ctlr.customertest.com.
    - App GW: azure-ctlr-appgw.customertest.com.

2. Create certificates for Controller and App GW. For example:

    - Let’s encrypt to create certificates.
    - Validate using DNS validation.

3. Import certificates into Controller. For example:

    - Import certs at Controller > Settings > Advanced > Security > “Controller Imported Certificate Status”.
    - Use ‘fullchain’ cert for server cert as well as Controller seems to not send the full chain and App GW fails to validate the backend Controller certs.

4. Create the Application Gateway (App GW). Then access the Controller through App GW for the configuration.

5. When configuring SAML authentication and setting up App in Okta IdP: 

    - set the Default Backend target in App GW rules to ‘controller’,
    - set the WAF’s Firewall mode to ‘Detection.’
    - create HTTP Settings:

      - Name: controller-settings
      - Backend port: 443
      - Use well known CA cert: Yes
      - Cookie-based policy, Connection draining: Disable
      - Request time-out: 3600
      - Override with new host name: No. Otherwise, the Backend Health status is bad. 
      - Custom probe: Create a custom probe.

6. Create a custom health probe because the default probe checks that the Hostname matches what is seen in the certificate.

    - Name: <test-https-probe>
    - Set protocol as “HTTPS”
    - Set Host to the Controller Domain name
    - Pick host name from backend HTTP settings: No
    - Pick port from backend HTTP settings: Yes
    - Path: /
    - interval, timeout, unhealthy threshold: Can leave these as defaults.
    - Chose HTTP Settings: controller-settings

7. Create 2 Backend pools.

    - Choose Backend target as ‘dont-allow‘, so that the App GW returns “502 Bad Gateway” response to any paths other than ‘/flask*’.
    - Create a path-based rule for the path “/flask*“, with the backend target set to <controller>.

8. Create a path-based rule in listener rules.

    - Choose Backend target as ‘dont-allow’, so that the App GW returns “502 Bad Gateway” response to any paths other than ‘/flask*’.
    - Create a path-based rule for the path “/flask*“, with Backend target set to <controller>.

9. Set up SAML authentication by accessing the Controller through the App GW domain name.

    - In the Okta application: 

      - set the SSO, Destination, Recipient URLs to https://azure-ctlr.customertest.com/flask/saml/sso/aviatrix_saml_controller.
      - set Audience restriction and Default relay state to https://azure-ctlr-appgw.customertest.com/.

10. Verify the SAML configuration by verifying VPN client authentication is successful. 

    - In the App GW ‘rules’ section, set the Backend target to ‘dont-allow’ to not allow access endpoints that VPN users shouldn’t be able to access.
    - In WAF section, set the Firewall mode to ‘Prevention’. 

11. Verify that when accessing through App GW, the VPN user is not able to access paths other than ‘/flask*’.

.. disqus::


