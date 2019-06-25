.. meta::
   :description: Aviatrix Support Center
   :keywords: Aviatrix, Support, Support Center

===========================================================================
IPSec
===========================================================================


What is the MTU setting on the IPSec Tunnels between the Aviatrix Gateways?
--------------------------------------------------------------------------------------------

All the IPSec tunnels have the MTU set to 1370bytes. If you are running any applications which do not support fragmentation, you might have issues - please adjust the MTU on your end devices. Here are a couple examples of ssh failing due to MTU - `ssh hangs due to MTU <https://www.reddit.com/r/sysadmin/comments/737c1z/friendly_reminder_if_ssh_sometimes_hangs/>`_, 
`music fails due to MTU <https://news.ycombinator.com/item?id=4709952>`_
 
You can adjust the MTU at "Aviatrix Console > Settings > Advanced > Tunnel > TCP MAXIMUM SEGMENT SIZE(MSS)"
 
Please note that we **strongly** recommend that you do not set the MTU to a value higher than 1370 bytes.
