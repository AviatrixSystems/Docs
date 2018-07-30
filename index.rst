Welcome to Aviatrix Docs
========================

All Aviatrix product documentation can be found here.
If you cannot find what you need, email us at support@aviatrix.com. Hats off to all who helped fix typos and mistakes. You can do that too by clicking the "Edit on GitHub" button on the top right corner of any document. Please also visit our `main website`_ for more information regarding use cases and upcoming events.

.. _main website: http://aviatrix.com
.. _GitHub: https://github.com/AviatrixSystems/Docs

While all content is searchable, the site is organized into the following sections:


* :ref:`Getting Started`
* :ref:`Onboarding and Accounts`
* :ref:`Gateway`
* :ref:`Transit Network`
* :ref:`Peering`
* :ref:`Site2Cloud`
* :ref:`OpenVPN® <OpenVPN>`
* :ref:`Security`
* :ref:`UsefulTools`
* :ref:`Advanced Config`
* :ref:`Settings`
* :ref:`Troubleshoot`
* :ref:`REST APIs`
* :ref:`Downloads`
* :ref:`Release Notes`
* :ref:`Tech Notes`
* :ref:`Solutions`
* :ref:`Whitepapers`
* :ref:`IPmotion`


.. _Getting Started:

.. toctree::
   :maxdepth: 1
   :caption: Getting Started

   StartUpGuides/aviatrix_overview
   StartUpGuides/aviatrix-cloud-controller-startup-guide
   StartUpGuides/azure-aviatrix-cloud-controller-startup-guide
   StartUpGuides/google-aviatrix-cloud-controller-startup-guide
   StartUpGuides/start-a-free-trial
   StartUpGuides/CloudN-Startup-Guide
   StartUpGuides/appendix-CloudN-Startup-Guide
   StartUpGuides/aviatrix-china-controller-startup-guide

   HowTos/FAQ

.. _Onboarding and Accounts:

.. toctree::
   :maxdepth: 1
   :caption: Onboarding and Accounts

   HowTos/onboarding_faq
   HowTos/aviatrix_account
   HowTos/HowTo_IAM_role
   HowTos/Aviatrix_Account_Azure
   HowTos/CreateGCloudAccount
   HowTos/AdminUsers_DuoAuth
   HowTos/CompanionGateway
   HowTos/reserve_onprem
   HowTos/Quick_Tour
   HowTos/accesskey
  

.. _Gateway:

.. toctree::
   :maxdepth: 1
   :caption: Gateway

   HowTos/gateway
   Solutions/gateway_ha

.. _Transit Network:

.. toctree::
   :maxdepth: 1
   :caption: Transit Network

   HowTos/transitvpc_faq
   HowTos/transitvpc_workflow
   HowTos/transitvpc_designs
   HowTos/transitvpc_csr_migrate
   HowTos/Setup_Transit_Network_Terraform

.. _Peering:

.. toctree::
   :maxdepth: 1
   :caption: Peering

   HowTos/peering_faq
   HowTos/peering
   HowTos/TransPeering
   HowTos/Cluster_Peering_Ref_Design
   HowTos/GettingStartedAzureToAWSAndGCP
   HowTos/peering_over_routelimit

.. _Site2Cloud:

.. toctree::
   :maxdepth: 1
   :caption: Site2Cloud


   HowTos/site2cloud_faq
   HowTos/site2cloud
   HowTos/cloudn-site2cloud
   HowTos/site2cloud_case_study
   HowTos/EncrOverExpRoute
   HowTos/avxgw_azurevpngw_site2cloud
   HowTos/site2cloud_aviatrix
   HowTos/site2cloud_awsvgw
   HowTos/S2C_GW_PAN
   HowTos/S2C_GW_CP
   HowTos/S2C_GW_ASA
   HowTos/CloudToPfSense
   HowTos/site2cloud_fortigate
   HowTos/site2cloud_meraki

.. _OpenVPN:

.. toctree::
   :maxdepth: 2
   :caption: OpenVPN®

   HowTos/uservpn
   HowTos/openvpn_faq
   HowTos/openvpn_features
   HowTos/Cloud_Networking_Ref_Des
   HowTos/GeoVPN
   HowTos/DNSVPN
   HowTos/VPNUsers_LDAP
   HowTos/HowTo_Setup_Okta_for_Aviatrix
   HowTos/duo_auth
   HowTos/VPN_SAML
   HowTos/UserSSL_VPN_Okta_SAML_Config
   HowTos/UserSSL_VPN_Google_SAML_Config
   HowTos/UserSSL_VPN_OneLogin_SAML_Config
   HowTos/Anonymous_Browsing
   HowTos/DevSandbox

.. _Security:

.. toctree::
   :maxdepth: 1
   :caption: Security

   HowTos/tag_firewall
   HowTos/FQDN_Whitelists_Ref_Design
   HowTos/fqdn_discovery
   HowTos/fqdn_viewlog

.. _UsefulTools:

.. toctree::
   :maxdepth: 1
   :caption: Useful Tools 

   HowTos/vpc_tracker
   HowTos/create_vpc

.. _Advanced Config:

.. toctree::
   :maxdepth: 1
   :caption: Advanced Config

   HowTos/Service_Chaining_Ref_Design
   HowTos/EnvironmentStamping
   HowTos/Docker_Swarm
   HowTos/ContainerAccess
   HowTos/Migration_From_Marketplace

.. _Settings:

.. toctree::
   :maxdepth: 1
   :caption: Settings

   HowTos/controller_backup
   HowTos/controller_ha
   HowTos/inline_upgrade
   HowTos/AviatrixLogging
   HowTos/alert_and_email
   HowTos/advanced_config
   HowTos/AdminUsers_LDAP

.. _Troubleshoot:

.. toctree::
   :maxdepth: 1
   :caption: Troubleshoot

   HowTos/Troubleshoot_Logs
   HowTos/Troubleshoot_Diagnostics
   HowTos/error-msgs
   HowTos/azuregwlaunch
   HowTos/flightpath
   HowTos/flightpath_deployment_guide

.. _REST APIs:

.. toctree::
   :maxdepth: 1
   :caption: REST APIs

   HowTos/Aviatrix_Controller_API
   HowTos/aviatrix_terraform
   HowTos/AviatrixAPI/multiple_approaches_to_use_aviatrix_api/multiple_approaches_to_use_aviatrix_api
   HowTos/aviatrix_apis_datacenter_extension

.. _Downloads:

.. toctree::
   :maxdepth: 1
   :caption: Downloads

   Downloads/cloudndownload
   Downloads/samlclient


.. _Release Notes:

.. toctree::
   :maxdepth: 1
   :caption: Release Notes

   HowTos/UCC_Release_Notes
   HowTos/changelog

.. _IPmotion:

.. toctree::
   :maxdepth: 1
   :caption: IPmotion

   HowTos/ipmotion
   HowTos/HowTo_Setup_IPMotion
   HowTos/design_pattern_ipmotion
   HowTos/ipmotion_dependency_discovery

.. _Tech Notes:

.. toctree::
   :maxdepth: 1
   :caption: Tech Notes

   HowTos/migrate_from_join_to_site2cloud
   HowTos/CloudN-config-drive-v1_4
   HowTos/customize_aws_iam_policy
   HowTos/AWS_NetworkLoadBalancer_Onsite_And_In_Cloud
   HowTos/DatadogIntegration
   StartUpGuides/aws_manual_startup_guide
   HowTos/site_to_site_vpn
   HowTos/controller_security_for_SAML
   HowTos/simpletransit
   HowTos/s2c_vgw_snat

.. _Solutions:

.. toctree::
   :maxdepth: 1
   :caption: Solutions Datasheets

   Solutions/aviatrix_aws_meshVPC
   Solutions/build_zerotrust_cloud_network
   Solutions/aviatrix_aws_transitvpc
   Solutions/egress_transit_gateway
   Solutions/netapp_sap_floating_ip
   Solutions/egress_nat_pool

.. _Whitepapers:

.. toctree::
   :maxdepth: 1
   :caption: Whitepapers

   Whitepapers/EnterpriseAppMigration
