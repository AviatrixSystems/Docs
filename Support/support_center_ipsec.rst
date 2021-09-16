.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
IPSec
===========================================================================


What are the MSS / MTU settings on the IPSec Tunnels between the Aviatrix Gateways?
--------------------------------------------------------------------------------------------

All the IPSec tunnels have the TCP MSS set to 1370 bytes, by default, on Aviatrix gateway created in AWS, Azure and OCI. In GCP, the default value is 1330 bytes (from R6.1) due to previous experience with some GCP applications. If you are running any applications which do not support fragmentation, you might have issues - please adjust the MSS value on your gateways. 

MSS is the maximum size that the payload can be, after subtracting space for the IP, TCP, and other headers. It's typically a minimum of a 40 byte offset (40 bytes less) than MTU. A good primer on the relationship between segment size and application traffic is available to review here: 

`How TCP segment size can affect application traffic flow <https://medium.com/walmartglobaltech/how-tcp-segment-size-can-affect-application-traffic-flow-7bbceed5816e>`_
 
You can adjust the TCP MSS at “Aviatrix Console > Settings > Advanced > Tunnel > TCP MAXIMUM SEGMENT SIZE(MSS)” on the Aviatrix gateway.

Please note that we **strongly** recommend that you do not set the MSS to a value higher than 1370 bytes.


Why did my IPSec tunnel go down?
--------------------------------------------------------------------------------------------

We configure our IPSec tunnels with Dead Peer Detection a.k.a. DPDs (sent every 10 seconds) and if do not see three consecutive DPDs, we declare that the tunnel is down and the gateway will try to renegotiate the IPSec tunnel.

For reasons beyond the control of the gateway, such as network failure along the path and or the remote site going down, we occasionally will see the tunnels go down. If you have `external logging <https://docs.aviatrix.com/HowTos/AviatrixLogging.html>`_ turned on, you would be able to see the logs such as the following which will tell you when the tunnels have gone down. 

::

  2020-01-29T07:19:37.064245+00:00 ip-10-66-243-108 racoon: [xx.xx.xx.xx] INFO: DPD: remote (ISAKMP-SA spi=8d6ba0f7a74593d0:71fa69ac6b4afef3) seems to be dead.
  2020-01-29T07:19:37.064354+00:00 ip-10-66-243-108 racoon: INFO: purging ISAKMP-SA spi=8d6ba0f7a74593d0:71fa69ac6b4afef3.
  .
  .
  2020-01-29T07:19:44.199040+00:00 ip-10-66-243-108 racoon: INFO: initiate new phase 1 negotiation: 10.66.243.108[500]<=>xx.xx.xx.xx[500]
  .
  .
  2020-01-29T07:20:49.311786+00:00 ip-10-66-243-108 racoon: INFO: IPsec-SA established: ESP/Tunnel 10.66.243.108[500]->xx.xx.xx.xx[500] spi=215564738(0xcd941c2)
  .
  .
  
Please check and see if there were any issues in your network and if the remote end had any service down events. Typically these explain the IPSec tunnel temporary down events.
