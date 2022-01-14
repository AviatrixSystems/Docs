.. meta::
  :description: AWS TGW Connect over Direct Connect
  :keywords: AWS TGW Connect,DX


============================================================
AWS TGW Connect over Direct Connect
============================================================


Overview for AWS TGW Connect over Direct Connect
================================================

Amazon Web Services (AWS) enables AWS customers to integrate their Software Defined Wide Area Network (SD-WAN) devices with AWS Transit Gateway and AWS Direct Connect so they can use their existing SD-WAN devices to connect their on-premises networks to an AWS Transit Gateway. Refer to the following AWS articles for information about the attachments types involved (Transit Gateway Connect attachment and Transit Gateway Connect peer):

https://aws.amazon.com/blogs/networking-and-content-delivery/simplify-sd-wan-connectivity-with-aws-transit-gateway-connect/

https://aws.amazon.com/blogs/networking-and-content-delivery/integrate-sd-wan-devices-with-aws-transit-gateway-and-aws-direct-connect/

In support of this, Aviatrix enables you to create one or multiple Transit Gateway Connect attachments over Direct Connect. You can also create Transit Gateway Connect peer attachments. For instructions, see Enable AWS TGW connect over Direct Connect.

Enable AWS TGW Connect over Direct Connect  
===========================================

To enable AWS TGW Connect over Direct Connect:

1.  (On AWS) Set up Direct Connect Gateway and the Transit virtual interface.
2.  (In Aviatrix Controller) Edit the TGW CIDR blocks. Go to the TGW Orchestrator > List > TGW tab. Select the gateway and edit its CIDR in the Edit TGW CIDR dialog.
    -   Maximum number of CIDR blocks is 5.
    -   The CIDR block must be the same as Direct Connect allowed prefix (e.g., 20.0.0.0/24).
3.  (In Aviatrix Controller) Build TGW Direct Connect attachment with allowed prefix (e.g., 20.0.0.0/24).
4.  (In Aviatrix Controller) Build TGW Connect attachment over AWS Direct Connect. In the TGW Orchestrator, in the step for Setup TGW Connect, select either the VPC attachment or the AWS Direct Connect attachment. You can build multiple TGW Connect attachments with the same transport Direct Connect attachment.
5.  (In Aviatrix Controller) Build TGW Connect peer with GRE configuration. A connect peer is a GRE tunnel. The TGW Connect attachment supports up to four GRE tunnels (connect peers). Below is the information you specify (TGW Orchestrator > List > Attachments tab > Create Connect PeerWS) to create the TGW Connect peer. For the desciption of each parameter, refer to the AWS article: https://aws.amazon.com/blogs/networking-and-content-delivery/integrate-sd-wan-devices-with-aws-transit-gateway-and-aws-direct-connect/.

    Enter the information in Create Connect Peer:

    -   Maximum number of TGW Connect peer: 4
    -   AWS Transit Gateway GRE address:
    -   Peer GRE address:
    -   BGP Inside CIDR blocks:

        The BGP addresses must be unique across all tunnels in a TGW. IPv6 is not supported. The following CIDR blocks are reserved and cannot be used:

        169.254.0.0/29, 169.254.1.0/29, 169.254.2.0/29, 169.254.3.0/29, 169.254.4.0/29, 169.254.5.0/29, 169.254.169.252/29

    -   Peer ASN:
6.  (On your third-party branch appliances) Complete the Connect peer configuration (GRE tunnel and BGP peering configuration).

If you have the same prefix propagated into your TGW route table coming from VPN, Direct Connect, and Transit Gateway Connect attachments, AWS evaluates the best path in the following order:

Priority 1 – Direct Connect Gateway attachment

Priority 2 – Transit Gateway Connect attachment

Priority 3 – VPN attachment

TGW Connect attachment over AWS Direct Connect
