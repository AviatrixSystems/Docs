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
* :ref:`Transit Gateway Orchestrator`
* :ref:`Transit Network`
* :ref:`Firewall Network`
* :ref:`Cloud WAN`
* :ref:`Peering`
* :ref:`Site2Cloud`
* :ref:`OpenVPN® <OpenVPN>`
* :ref:`Security`
* :ref:`UsefulTools`
* :ref:`Settings`
* :ref:`Troubleshoot`
* :ref:`API`
* :ref:`Downloads`
* :ref:`Release Notes`
* :ref:`Security Bulletin`
* :ref:`CoPilot`
* :ref:`Tech Notes`
* :ref:`Good To Know`
* :ref:`Support Center`
* :ref:`IPmotion`
* :ref:`Troubleshooting Playbook`


.. _Getting Started:

.. toctree::
   :maxdepth: 1
   :caption: Getting Started

   StartUpGuides/aviatrix_overview
   StartUpGuides/aviatrix-cloud-controller-startup-guide
   StartUpGuides/azure-aviatrix-cloud-controller-startup-guide
   StartUpGuides/oracle-aviatrix-cloud-controller-startup-guide
   StartUpGuides/google-aviatrix-cloud-controller-startup-guide
   StartUpGuides/aviatrix_operations
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
   HowTos/howto_customize_aviatrix_iam_role_names_for_2ndary_accounts/howto_customize_aviatrix_iam_role_names_for_2ndary_accounts.rst
   HowTos/iam_policies
   HowTos/aviatrix_iam_policy_requirements
   HowTos/customize_aws_iam_policy
   HowTos/Aviatrix_Account_Azure
   HowTos/CreateGCloudAccount
   HowTos/oracle-aviatrix-cloud-controller-onboard
   HowTos/AdminUsers_DuoAuth
   HowTos/CompanionGateway
   HowTos/Quick_Tour
   HowTos/accesskey
   HowTos/account_audit
   HowTos/rbac_faq

.. _Gateway:

.. toctree::
   :maxdepth: 1
   :caption: Gateway

   HowTos/gateway
   Solutions/gateway_ha
   HowTos/gateway_audit

.. _Transit Gateway Orchestrator:

.. toctree::
   :maxdepth: 1
   :caption: AWS Transit Gateway Orchestrator

   HowTos/tgw_faq
   HowTos/tgw_plan
   HowTos/tgw_build
   HowTos/tgw_list
   HowTos/tgw_approval
   HowTos/tgw_design_patterns
   HowTos/transit_gateway_peering
   HowTos/tgw_csr_migrate
   HowTos/diy_tgw_migrate_to_aviatrix_tgw
   HowTos/transitgw_external
   HowTos/transitvpc_workflow
   HowTos/transitvpc_design

.. _Transit Network:

.. toctree::
   :maxdepth: 1
   :caption: Multi-Cloud Transit Network

   HowTos/transitvpc_faq
   HowTos/transitvpc_workflow
   HowTos/transitgw_external
   HowTos/transit_approval
   HowTos/transit_advanced
   HowTos/transitvpc_designs
   HowTos/azure_transit_designs
   HowTos/transit_segmentation_faq
   HowTos/transit_segmentation_workflow
   HowTos/activemesh_faq
   HowTos/activemesh_design_notes
   HowTos/activemesh_beta
   HowTos/insane_mode
   HowTos/insane_mode_perf
   HowTos/CloudN_insane_mode
   HowTos/Setup_Transit_Network_Terraform

.. _Firewall Network:

.. toctree::
   :maxdepth: 1
   :caption: Firewall Network (FireNet)

   HowTos/firewall_network_faq
   HowTos/firewall_network_workflow
   HowTos/firewall_network_design_patterns
   HowTos/transit_firenet_faq
   HowTos/transit_firenet_workflow
   HowTos/transit_firenet_workflow_aws
   HowTos/firewall_advanced
   HowTos/paloalto_API_setup
   HowTos/ingress_firewall_example
   HowTos/Azure_ingress_firewall_example
   HowTos/config_paloaltoVM
   HowTos/bootstrap_example
   HowTos/config_FortiGateVM.rst
   HowTos/fortigate_bootstrap_example
   HowTos/config_CheckPointVM.rst
   HowTos/config_CheckPointAzure.rst
   HowTos/config_PFsense
   HowTos/config_Barracuda.rst

.. _Cloud WAN:

.. toctree::
   :maxdepth: 1
   :caption: CloudWAN

   HowTos/cloud_wan_faq
   HowTos/cloud_wan_workflow

.. _Security:

.. toctree::
   :maxdepth: 2
   :caption: Security


   HowTos/stateful_firewall_faq
   HowTos/tag_firewall
   HowTos/fqdn_faq
   HowTos/FQDN_Whitelists_Ref_Design
   HowTos/fqdn_discovery
   HowTos/fqdn_viewlog
   HowTos/guardduty
   HowTos/public_subnet_filtering_faq
   HowTos/sfc_faq
   HowTos/privateS3_workflow

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
   HowTos/avxgw_azurevpngw_site2cloud
   HowTos/site2cloud_aviatrix
   HowTos/site2cloud_awsvgw
   HowTos/site2cloud_oracledrg
   HowTos/S2C_GW_PAN
   HowTos/S2C_GW_CP
   HowTos/S2C_GW_CP_88
   HowTos/S2C_GW_ASA
   HowTos/S2C_GW_IOS
   HowTos/site2cloud_sonicwall
   HowTos/CloudToPfSense
   HowTos/site2cloud_fortigate
   HowTos/site2cloud_meraki
   HowTos/site2cloud_meraki_vmx100
   HowTos/S2C_GW_JuniperSRX
   HowTos/cloudn-site2cloud
   HowTos/site2cloud_case_study
   HowTos/EncrOverExpRoute
   HowTos/connect_overlap_cidrs
   HowTos/connect_overlap_vpc_via_VGW
   HowTos/periodic_ping
   

.. _OpenVPN:

.. toctree::
   :maxdepth: 2
   :caption: OpenVPN®

   HowTos/uservpn
   HowTos/openvpn_faq
   HowTos/openvpn_features
   HowTos/openvpn_design_considerations
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
   HowTos/UserSSL_VPN_AWS_SSO_SAML_Config
   HowTos/UserSSL_VPN_Azure_AD_SAML_Config
   HowTos/UserSSL_VPN_Centrify_SAML
   HowTos/Anonymous_Browsing
   HowTos/DevSandbox
   HowTos/External_PKI_for_OpenVPN_Certificates
   HowTos/user_accelerator
   HowTos/ipv6_multivpc_vpn
   HowTos/uservpn-TGW
   HowTos/Setup_Okta_SAML_Profile_Attribute
   HowTos/Setup_PingOne_SAML_Profile_Attribute


.. _UsefulTools:

.. toctree::
   :maxdepth: 1
   :caption: Useful Tools

   HowTos/vpc_tracker
   HowTos/create_vpc

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
   HowTos/netflow
   HowTos/cloudwatch
   HowTos/Controller_Login_SAML_Config
   HowTos/controller_certificate
   HowTos/fips140-2
   HowTos/controller_config
   HowTos/Migration_From_Marketplace
   HowTos/controller_migration


.. _Troubleshoot:

.. toctree::
   :maxdepth: 1
   :caption: Troubleshoot

   HowTos/Troubleshoot_Logs
   HowTos/Troubleshoot_Diagnostics
   HowTos/error-msgs
   HowTos/azuregwlaunch
   HowTos/flightpath

.. _API:

.. toctree::
   :maxdepth: 1
   :caption: API

   HowTos/Aviatrix_Controller_API
   HowTos/AviatrixAPI/multiple_approaches_to_use_aviatrix_api/multiple_approaches_to_use_aviatrix_api
   HowTos/aviatrix_apis_datacenter_extension

.. _Terraform:

.. toctree::
   :maxdepth: 1
   :caption: Terraform

   HowTos/tf_aviatrix_howto
   HowTos/aviatrix_terraform
   HowTos/tf_export

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
   HowTos/field_notices

.. _Security Bulletin:

.. toctree::
   :maxdepth: 1
   :caption: Security Bulletin

   HowTos/security_bulletin_article
   HowTos/security_bulletin_faq

.. _CoPilot:

.. toctree::
   :maxdepth: 1
   :caption: CoPilot

   HowTos/copilot_overview
   HowTos/copilot_getting_started
   HowTos/copilot_reference_guide.rst
   HowTos/copilot_faq
   HowTos/copilot_release_notes

.. _Tech Notes:

.. toctree::
   :maxdepth: 1
   :caption: Tech Notes

   HowTos/CloudN-config-drive-v1_4
   HowTos/AWS_NetworkLoadBalancer_Onsite_And_In_Cloud
   HowTos/DatadogIntegration
   StartUpGuides/aws_manual_startup_guide
   HowTos/site_to_site_vpn
   HowTos/controller_security_for_SAML
   HowTos/simpletransit
   HowTos/s2c_vgw_snat
   HowTos/s2c_overlapping_subnets
   HowTos/s2c_for_publicIP
   HowTos/transit_for_publicIP
   HowTos/transit_solution_activemesh_spoke_snat_dnat_rfc1918
   HowTos/meraki_to_transit
   HowTos/reserve_onprem
   HowTos/spoke_skip_rfc1918
   HowTos/HowTo_Setup_AWS_Managed_Microsoft_AD_for_Aviatrix
   Solutions/aviatrix_aws_meshVPC
   Solutions/build_zerotrust_cloud_network
   Solutions/aviatrix_aws_transitvpc
   Solutions/netapp_sap_floating_ip
   Solutions/egress_nat_pool
   HowTos/tgw_route_limit
   HowTos/tgw_pan_ecmp
   HowTos/tgw_egress_vpc
   HowTos/aws_transit_gateway_orchestrator
   HowTos/aviatrix_insanemode
   HowTos/transit_snat_dnat
   HowTos/ipv6_peering
   HowTos/nextgentransit_for_azure
   HowTos/nat_only_outbound_traffic
   HowTos/activemesh_migration
   HowTos/openvpn_fqdn
   HowTos/HowTo_Setup_SAML_with_G_SUITE_ORG
   
.. _Good To Know:

.. toctree::
   :maxdepth: 1
   :caption: Good To Know

   HowTos/inter_region_latency
   HowTos/arm_inter_region_latency
   HowTos/gcp_inter_region_latency
   HowTos/cloudformation_condition_howto
   HowTos/aws_network_limits
   HowTos/tgw_limits
   HowTos/opstools_survey
   HowTos/multi_cloud_region_affinity_and_latency

.. _Support Center:

.. toctree::
   :maxdepth: 1
   :caption: Support Center

   Support/support_center
   Support/support_center_operations
   Support/support_center_controller
   Support/support_center_openvpn_gateway
   Support/support_center_transit_solution
   Support/support_center_egress_firewall
   Support/support_center_logging
   Support/support_center_site2cloud
   Support/support_center_ipsec
   Support/support_center_aws_infrastructure
   Support/support_center_gcp_infrastructure
   Support/support_center_terraform
   Support/support_ticket_priority
   Support/support_center_useful_tools
   Support/support_center_cloudn
   Support/support_center_aviatrix_vpn_client
   Support/support_center_firenet

.. _IPmotion:

.. toctree::
   :maxdepth: 1
   :caption: IPmotion

   HowTos/ipmotion
   HowTos/HowTo_Setup_IPMotion
   HowTos/design_pattern_ipmotion
   HowTos/ipmotion_dependency_discovery
   
.. _Troubleshooting Playbook:

.. toctree::
   :maxdepth: 1
   :caption: Troubleshooting Playbook

   TroubleshootingPlaybook/troubleshooting_playbook_overview.rst
   TroubleshootingPlaybook/troubleshooting_playbook_aws_iam_service.rst
   TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_controller.rst
   TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_gateway.rst
   TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_openvpn_end_to_end_traffic.rst
   TroubleshootingPlaybook/troubleshooting_playbook_aviatrix_s2c_end_to_end_traffic.rst
