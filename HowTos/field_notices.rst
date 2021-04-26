=======================================
Field Notices
=======================================

.. Note::

 These field notices are provided as a service to our customers to proactively update them on major issues. This service is provided without any changes in our SLA. The information in this field notice will be updated as we learn more.
 


Field Notice 0024 (2021/04/25)
--------------------------------
**Controller HA Code Improvements for release R6.3 and R6.4**
 
Problem:
Improved Controller HA process to avoid corner cases related to Controller HA restore failures.
 
What is Impacted?
Controllers deployed in AWS with the "Controller HA" process enabled.
 
Recommendation
For Controllers running in AWS with the Controller HA process enabled, Aviatrix strongly recommends that you `disable <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-disable-controller-ha>`_ and `reenable <https://docs.aviatrix.com/HowTos/controller_ha.html#steps-to-enable-controller-ha>`_ the "Controller HA" process as soon as possible to pick up the latest version of the software. This operation should not impact the Controller that is in operation but we do recommend that you follow our `pre-operation recommendations <https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures>`_. Please see https://docs.aviatrix.com/HowTos/controller_ha.html for more information on Controller HA. Please verify that your `Controller HA <https://docs.aviatrix.com/HowTos/controller_ha.html?#faq>`_ version is 1.6 or higher.
 
 
Please note that enabling and disabling the Controller HA process is a prerequisite for upgrading to release R6.4, which is scheduled to be released soon.

* https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html
* https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures
* https://docs.aviatrix.com/HowTos/inline_upgrade.html



Field Notice 0023 (2021/04/24)
-------------------------------- 
**Default SMTP Service Down on releases < 6.2.1955**


**Problem:**

The default SMTP service used by Aviatrix has been impacted in releases older than 6.2.1955. Alerts generated from the Controller will fail to reach the admin by email. Gateways are not impacted. Password recovery by email and sending OpenVPN profiles via email will also be impacted.


**Who is impacted?**

Any Controller running versions older than R6.2.1955 that also does not have an SMTP server configured to override the default service.


**Recommended Solution:**

To resolve this issue, please upgrade your Controller to the latest R6.2(>=6.2.1955) or R6.3 software version following the instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html, or configure your own SMTP service to override the default SMTP service using the instructions at https://docs.aviatrix.com/HowTos/alert_and_email.html.
 
This issue will not be addressed in 5.4, 6.0 and 6.1 releases so if your Controller is running one of these releases, Aviatrix strongly encourages you to upgrade to the 6.3 release.


Field Notice 0022 (2021/04/19)
--------------------------------
 
**Deprecated build 6.3.2405**
 
Last week, Aviatrix published R6.3.2405 and due to the incorrect handling of a corner case issue we decided to deprecate R6.3.2405. If you upgraded to R6.3.2405 your controller might incorrectly notify you that there is a newer release, since you are not running the current R6.3.2364 release. We request that you ignore this upgrade notification. We will be releasing a new build > R6.3.2405 later today. You can safely upgrade to the new release.
 
**Recommendation:**
Please use the following processes to upgrade your Aviatrix network:

* https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html
* https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures
* https://docs.aviatrix.com/HowTos/inline_upgrade.html
 
If you have any questions about your Aviatrix network, please open a `support ticket <https://aviatrix.zendesk.com/>`_.



Field Notice 0020 (2021/04/19)
-------------------------------- 
**End of Life (EOL) announcement for Aviatrix VPN Clients for Ubuntu 14.04 and Ubuntu 16.04**

VPN Clients running on Ubuntu 14.04 are designated EOL effective immediately. VPN Clients running on Ubuntu 16.04 are designated EOL effective 6/1/2021. Aviatrix is discontinuing support because these operating systems have reached their end of standard support from the provider. Please see the Ubuntu release information at https://wiki.ubuntu.com/Releases and https://ubuntu.com/about/release-cycle.
 
What is the impact if you remain on a deprecated release that is designated EOL?
The Aviatrix Support team does not provide assistance on EOL releases.
Patches for known issues and vulnerabilities are not provided.
 
Recommendation
Please upgrade to one of the supported `Aviatrix VPN Clients <https://docs.aviatrix.com/Downloads/samlclient.html>`_.
 
If you have any difficulties in upgrading your Aviatrix VPN Client, please contact your Aviatrix Network Admin and have them open a `support ticket <https://aviatrix.zendesk.com/>`_.




Field Notice 0019 (2021/04/19)
-------------------------------- 
**End of Life (EOL) announcement for 5.4 and 6.0 releases**
 
Following up on Field Notice `0012 <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0012-2020-08-07>`_ and `0016 <https://docs.aviatrix.com/HowTos/field_notices.html#field-notice-0016-2020-12-22>`_, we are announcing EOL and Support for releases 5.4 and 6.0. The R5.4 EOL date is 6/1/2021, the R6.0 EOL date is 6/19/2021.
 
What is the impact if you remain on a deprecated release that is designated EOL?
The Aviatrix Support team does not provide assistance on EOL releases.
Patches for known issues and vulnerabilities are not provided.
Enabling the remote SSH support option as well as sending logs and diagnostics to Aviatrix Support may not work.
The default SMTP on the Controller cannot send Alerts.
 
**Recommendation:**
Please use the following processes to upgrade your Aviatrix network:

* https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html
* https://docs.aviatrix.com/Support/support_center_operations.html#pre-op-procedures
* https://docs.aviatrix.com/HowTos/inline_upgrade.html
 
If you have any difficulties upgrading your Aviatrix network, please open a `support ticket <https://aviatrix.zendesk.com/>`_.



Field Notice 0017 (2021/01/10)
--------------------------------
**Namespace limit is 120 Bytes**


**Problem**

Version 6.2 and prior, customer may create a spoke or transit gateway name exceeding 50 Bytes. During peer creation a failure may occur if the peering name (concatenation of spoke-to-transit, spoke-to-spoke, etc) exceeds 120 Bytes and throws an error.

(example)
Error: command create_peer_xx_gw failed due to exception errors fully qualified namespace peering_info.xxxxxxxx is too long (max is 120 bytes)


**Recommended Solution**

Version 6.2 and prior: If spoke or transit name exceeds 50 Bytes, manually delete and re-create gateway with name limited to 50 Bytes or less.

Version 6.3 and higher: Fix, newly created spoke and transit gateway names are checked and limited to 50 Bytes or less. However, if there are any residual gateways (6.2 and prior) with name exceeding 50 Bytes they must be deleted and re-created.

 
Field Notice 0016 (2020/12/22)
----------------------------------
**EOL update for release 5.3 and older**

This Field Notice is a follow up to an earlier Field Notice 0012 we published in August 2020 on Security vulnerabilities in R5.3 and older and our recommendation to upgrade.

**Support for R5.3 or earlier will end on January 31st , 2021**

Aviatrix has decided to extend the date to January 31st, 2021 to aid any customers who are unable to upgrade to release 5.4 or newer due to the upcoming holiday / freeze period.

Please refer back to Field Notice 0012 for detailed instructions on how to upgrade.

On January 31st, 2021, as a security measure, Aviatrix will change credentials on our auth server. This applies to ALL customers and will have no impact to customers who are on release 5.4 and newer. 

**What is the impact if customer remains on R5.3 or older code on/after Jan 31st  2021:**

a. Customer will be unable to send logs to support

b. Customer cannot enable Remote SSH support option and send diagnostics to support

c. Customer will be unable to get the latest default SMTP credential for Controller to send Alerts

d. Customer will not be able to get assistance from Aviatrix Support on EOL code

**Recommendation:** Please follow guidance specified in Field Notice 0012 and upgrade immediately.

 
Field Notice 0015 (2020/12/07)
----------------------------------
**Default SMTP Service Down**
 
Aviatrix is performing maintenance on our default SMTP service. Email alerts are down for older Controller versions. Gateways are not impacted. 
 
**Who is impacted?**

Controller with older version before R5.4.1201

All GCP Controllers
 
**Resolution**

To resolve this issue, upgrade your Controller to the latest software version or configure your own SMTP service. Please see instructions: https://docs.aviatrix.com/HowTos/alert_and_email.html?highlight=smtp 
 
For GCP Controllers, please monitor the latest release notes for the patch.


Field Notice 0014 (2020/10/06)
----------------------------------
**Recommended Controller version for enabling Copilot**

•	Customers running or planning to deploy Copilot should upgrade their controller to latest 6.1 patch (R6.1.1401, released on 10/4/2020) or newer.  R6.1.1401 enables multi-core processing capability on the controller to handle Copilot queries.

https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#r6-1-1401-10-4-2020

•	Please reach out to your AE/SE to identify the appropriate sizing requirements for your controller based on your network.

•	If you are unable to upgrade to the latest 6.1 patch (R6.1.1401) and are experiencing  slowness or long response times from the controller with Copilot enabled in your environment then we recommend either of the following remediation:

      o Shutdown Copilot
    
      o	Update Security Group to block (443) Copilot from talking to controller
    
•	Once you upgrade controller to R6.1.1401 or newer,  we recommend the following default interval settings on the Copilot: 

|imagefn14|


Field Notice 0013 (2020/09/04)
----------------------------------
**Products Affected**

•	Aviatrix CoPilot

**Problem Description:**

Aviatrix Software Release 6.1 introduced a feature to support gateway name change from the Controller Dashboard which breaks Topology Map and tagging feature available in CoPilot.

**Recommended Solution:**

•	If you have deployed Aviatrix software release 6.1 on the controller and have not made any changes to gateway names, please refrain from making any changes. The gateway name change feature has been removed from the software in the latest 6.1 patch release and thereafter. Please upgrade your software to the latest 6.1 release 6.1.1309
https://docs.aviatrix.com/HowTos/UCC_Release_Notes.html#r6-1-1309-9-7-2020

•	If you are running both Aviatrix 6.1 release (older than patch 1309) and CoPilot in your environment, and if you have made changes to a gateway name already, please change it back to its original name to restore the topology and tagging functions in CoPilot. 
Then, upgrade the software to release 6.1.1309

•	If you haven’t upgraded Aviatrix Software release to 6.1, please upgrade to the latest 6.1 release 6.1.1309

Field Notice 0012 (2020/08/07)
----------------------------------
**Security Vulnerabilities in R5.3 and Earlier**

**Problem**
In May 2020, Aviatrix worked with Critical Start, a Security Researcher firm, on some security vulnerabilities on Aviatrix Controller R5.3. The vulnerabilities were identified in the lab. The discoveries had some critical severity issues. These issues were considered critical under the assumption that there were no other safeguards in place.  

Aviatrix addressed all the issues that were identified. All the resolutions have also been validated by the reporter. Details about these issues are published in our PSIRT Advisory at https://docs.aviatrix.com/HowTos/security_bulletin_article.html 

**Recommended Solution**
We request our customers to upgrade their Controller to 5.4.1290 or higher, following the instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html to get the above fixes. We strongly recommend that the Controller be upgraded to 6.0.2483 or higher. 

Please note that if the Controller is running an older AMI, it needs to be migrated to run on the latest AMI before upgrading to 5.4. If the Controller is already running 5.4 or above, a Controller AMI migration is not needed. More information about the Controller AMI migration is at https://docs.aviatrix.com/HowTos/controller_migration.html 

**Procedure**

Check if the controller is running an older AMI or a newer AMI 

* Go to "ControllerUI/Troubleshoot/Diagnostics/Gateway/Diagnostics", select "none" under "Gateway" and check the box next to controller and click on "Run" 

* After the operation is complete, click on "Show" 

* Do a browser search for "Ubuntu SMP" to find out if the controller is running a 14.0.4 AMI or an 18.0.4 AMI as show below. 


If the controller is running a 14.0.4 AMI 

* Please follow the upgrade instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html carefully to upgrade to 5.3 

* Once you reach 5.3, please upgrade the Controller AMI following the instructions at https://docs.aviatrix.com/HowTos/controller_migration.html 

* Please continue upgrading to at least 5.4.1290 following the above instructions 

* It is highly recommended that you upgrade your controller to 6.0.2483 or higher


If the controller is running an 18.0.4 AMI 

* Please follow the upgrade instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html carefully to upgrade to 5.4.1290 

* It is highly recommended that you upgrade your controller to 6.0.2483 or higher

Please consider upgrading your controller instance size if your workload has increased since you have deployed your Controller. We recommend an instance with at least 8GB of memory (t2/t3 large, c5.xlarge or larger) 

Please open a ticket with the Support Team by sending a new email to support@aviatrix.com or at https://aviatrix.zendesk.com if you need have any further questions or if you need us to review your upgrade plans or if you need any other assistance for these upgrades.  

**Support for R5.3 or earlier will end December 31, 2020** 
Although we try to minimize impact, security is Aviatrix’s top priority. The Aviatrix terms of use require customers to stay on the current release. Support for R5.3 or earlier will end December 31,2020. 

**Sample image for 14.04 Controller**

|image1404Controller|
   
**Sample image for 18.04 Controller**

|image1804Controller|

Field Notice 0011 (2020/08/02)
----------------------------------

**Unable to log into Controller with Chrome browser**

**Problem:**
After upgrading to 6.0 or above, users were not able to log into Controller with Chrome browser using SAML or admin user/password

**Recomended Solution:**
Upgrade to 6.0.2481 or 6.1.1162 release

**Work around:**
1.	Go to url chrome://flags/;
2.	Search for keyword “samesite” and Disabled all three; and Relaunch;
3.	Or try using Firefox or any browser other than Chrome


Field Notice 0010 (2020/05/12)
----------------------------------

**VPN Client Security Vulnerability**

**Problem**
We have found defects that was introduced in VPN Client 2.8.9. The Aviatrix VPN client on Linux, macOS, and Windows is vulnerable to elevated access. See details in our PCIRT Advisory links below.   

 - AVX-IR-20-005 OpenVPN Client 2.8.2 - Elevation of Privilege on macOS, Linux and Windows 

 - AVX-IR-20-004 OpenVPN Client 2.8.2 - Arbitrary File Write 

**Recommended Solution:**
VPN Client upgrade to 2.10.7 and Controller version should be at least 5.3 or higher.  

In addition, you must configure your Controller under OpenVPN > Edit Config > Minimum VPN Client Version setting to version 2.10.7 to enforce the client’s upgrade.  

Field Notice 0009 (2020/03/11)
--------------------------------

**New Gateway deployment failure can delete routes**
 
**Problem:**
We have found a defect that was introduced in release 5.3. When a gateway creation fails due to limited resource, the gateway rollback procedure incorrectly deletes existing routes ​in the VPC where the gateway is deployed. It has now been fixed in 5.3.1491. 5.2 and earlier releases are NOT impacted with this issue.
 
**Recommended Solution:**
Upgrading to the latest 5.3 release (5.3.1491 or above) will address this issue.
 
One of the common causes of a gateway deployment failure is not having enough EIP's available in your account. We strongly recommend that you upgrade to the latest 5.3 release (5.3.1491 or above) if you are running an earlier 5.3 release. Releases 5.2 and earlier are NOT impacted. You can safely upgrade to 5.3 latest.
 
Please follow the instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html to upgrade your Aviatrix software. You can create a new support ticket by sending a new email to support@aviatrix.com or by registering at https://aviatrix.zendesk.com, if you need assistance for this upgrade.




Field Notice 0008 (2020/01/07)
--------------------------------

**Splunk Logging Year 2020 defect**

**Problem:** 

Splunk has published a defect and a fix for their products which impacts the Splunk Forwarder that is integrated into Aviatrix Products. This will affect your deployment only if you have enabled logging via Splunk. Please follow the `published information from Splunk <https://docs.splunk.com/Documentation/Splunk/latest/ReleaseNotes/FixDatetimexml2020.>`_ for more information.

* Beginning on January 1, 2020, un-patched Splunk platform instances will be unable to recognize timestamps from events where the date contains a two-digit year. This means data that meets this criteria will be indexed with incorrect timestamps.
* Beginning on September 13, 2020 at 12:26:39 PM Coordinated Universal Time (UTC), un-patched Splunk platform instances will be unable to recognize timestamps from events with dates that are based on Unix time, due to incorrect parsing of timestamp data.

**Recommended Solution:**

We have a couple of solutions, ordered by our preference:

* Use rsyslog logging instead of Splunk logging by following the directions at https://docs.aviatrix.com/HowTos/AviatrixLogging.html#introduction. You can continue to use your current Splunk logging system - the difference is that they will receive the logs via rsyslog. This method will allow you to run logging with lower loads on the controllers and gateways and also keep them insulated from such defects in future as rsyslog is a very mature logging mechanism.
* For Aviatrix version 5.0 or greater: Please go to "Controller/Settings/Maintenance/SoftwarePatches" and click on "Update Available Patches" and patch the "Apply xml file patch for Splunk year 2020 bug". Please verify that the patch is applied by checking the "Patch Status"
* For Aviatrix version lower than 5.0: Please upgrade to the latest release to access our "Software Patches" feature. Please follow the upgrade instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html
* For Aviatrix Release>=5.3: If Splunk logging is disabled and then enabled - you don’t have to reapply any patch, as we would install the latest Splunk forwarder client

**Known Issues:**

* After applying the above patch, if a new Gateway is created, you would have to reapply the patch so that it takes effect on the new gateway
* If Splunk logging is disabled and then enabled - you would have to reapply the patch. This applies to only Aviatrix Release 5.2.

We would like to restate our recommendation to use rsyslog to send logs from your Aviatrix System to your Splunk logging system following these `directions <https://docs.aviatrix.com/HowTos/AviatrixLogging.html#introduction>`_. If you have any question, please open a new support ticket by sending a new email to support@aviatrix.com or by visiting https://aviatrix.zendesk.com.





Field Notice 0007 (2019/11/19)
--------------------------------

**Multiple local privilege escalation vulnerabilities reported on Aviatrix VPN Client**
 
**Problem:**
 
A couple of ways to raise local privilege escalation that could result in a vulnerability were discovered and reported by Alex Seymour of Immersive Labs, a security research lab, as part of their testing. We have addressed these vulnerabilities at a high priority as soon as they were reported to us. We value the contribution and cooperation of such friendly research labs, their management and staff in making products better and safer for users across the world. These issues, if exploited, could allow authenticated users of local machines to execute commands on the local machine that require higher permission levels, if they did not have full access to their local computers. These issues impact only the local machine running the Aviatrix VPN Client on all the operating systems we support. This vulnerability will not affect local machines running other OpenVPN Compatible VPN clients. This vulnerability does not impact local machines for which the users already have administrator privileges. This vulnerability does not affect the Aviatrix VPN Gateway.
 
**Recommended Solution:**
 
We have addressed all of these issues in release 2.4.10 which was officially released on Nov 2, 2019. We request all of our customers who have deployed previous releases of the Aviatrix VPN Client to immediately upgrade to the latest release(2.4.10 or later). The Dashboard on the Aviatrix Controller will display the version of the Aviatrix VPN Client that is used by the end users. The latest Aviatrix VPN Client can be found at https://docs.aviatrix.com/Downloads/samlclient.html and the release notes at https://docs.aviatrix.com/HowTos/changelog.html.



Field Notice 0006 (2019/09/30)
--------------------------------
 
**Controller Memory Leak Issue due to Account and Gateway Audit feature in 5.0 Release**


**Problem:**

We introduced a new feature in Release 5.0 to allow our customers to monitor Aviatrix Controller managed AWS Accounts and Gateways periodically as described at https://docs.aviatrix.com/HowTos/account_audit.html and https://docs.aviatrix.com/HowTos/gateway_audit.html. This audit feature ensures the Aviatrix System to function as designed. Unfortunately, the new software introduced a bug that causes a memory leak on the Controller. This software defect does not impact the Aviatrix gateway deployed in your network. Customers who are not running 5.0 at this time are not impacted - this issue only affects releases 5.0.2667 through 5.0.2773.
 
**Recommended Solution:**

We request that all customers running Aviatrix Software Releases 5.0.2667 through 5.0.2773 upgrade to 5.0.2782 or greater, as soon as possible, following the instructions at https://docs.aviatrix.com/HowTos/inline_upgrade.html. Our upgrades will not impact any tunnels or openvpn users and should be quite simple and fast for Aviatrix Controllers that are already on 5.0 release. If you need any support during this upgrade process, please open a new support ticket by sending a new email to support@aviatrix.com or by visiting https://aviatrix.zendesk.com. This upgrade will turn off the "AWS Account and Gateway Audit" feature.
 
**Alternate/Workaround Solution:**

For customers who cannot upgrade right away, we suggest that they work around by disabling the "AWS Account Audit" and “Gateway Audit” features following the instructions below.

  * Aviatrix Console > Accounts > Account Audit > AWS Account Status > Background Audit, toggle the setting to Disabled.
  * Aviatrix Console > Settings > Advanced > Gateway Audit > Background Audit, toggle the setting to Disabled.




Field Notice 0005 (2019/07/22)
--------------------------------

**Aviatrix VPN Client Connection Issues with SAML authentication**

Problem: Due to unforeseen circumstances, one certificate that we use in our Aviatrix VPN Client software became invalid, breaking the Aviatrix VPN Client functionality with SAML authentication method. Customers who are not using SAML for user authentication are not impacted and continue to use Aviatrix VPN Client or any OpenVPN compatible VPN clients such as Tunnelblick.

Recommended Solution:

  * Upgrade Controller to the latest release (4.7.501 or higher) using these `instructions <https://docs.aviatrix.com/HowTos/inline_upgrade.html>`_
  * Inform your remote vpn users to upgrade their Aviatrix VPN Clients (2.0.3 or higher) from `here <https://docs.aviatrix.com/Downloads/samlclient.html>`_. Please note that Mac/Safari and Win/IE are not supported

Alternate Solution: Only if you cannot upgrade Aviatrix Controller to 4.7.501 or higher.

  * Please have your remote vpn users upgrade their Aviatrix VPN Client (2.0.3 or higher) from `here <https://docs.aviatrix.com/Downloads/samlclient.html>`_
  * When they start a remote VPN session, after the authentication is successful they should see a message that looks like “Could not contact the VPN Client …“. Please ask your users to trust the certificate using the following instructions:
  
      * Mac/Safari: Click on Connect in the Aviatrix VPN Client, Sign into SAML/IdP, OK, Show Details, Visit the Website, Visit Website, Password, Update Settings
      * Mac/Chrome: Click on Connect in the Aviatrix VPN Client, Sign into SAML/IdP, OK, Advanced, Proceed to localhost.aviatrix.com
      * Win/Chrome: Click on Connect in the Aviatrix VPN Client, Sign into SAML/IdP, OK, Advanced, Proceed to localhost.aviatrix.com
      * Win/Firefox: Click on Connect in the Aviatrix VPN Client, Sign into SAML/IdP, OK, Advanced, Accept the Risk and Continue
      
  * If they continue to have issues, please have them clear their browser cache and restart their browser (`clear cache in Google <https://support.google.com/chrome/answer/2392709>`_, `clear cache in Firefox <https://support.mozilla.org/en-US/kb/delete-browsing-search-download-history-firefox>`_)



Field Notice 0004 (2019/2/6)
--------------------------------

**New Site2Cloud connections will not pass traffic for Aviatrix Systems running software prior to 4.0.691**
 
Problem: AWS introduced changes in VGW IPSEC VPN recently which broke VPN traffic passing. Existing VPN connections will not be affected. Customers who establish a new `Transit VPC to VGW <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_  connections will not pass traffic, even though they may be reported as being “UP”. 
 
Description: Aviatrix Software uses SHA256 to setup IPSEC VPN connections with AWS VGW. Due to changes made by AWS recently, we discovered that during the week of Feb 4th, 2019, new VPN Connections to an VGW IPSEC tunnel were not passing traffic. We have submitted a support ticket with AWS technical support team. AWS has recommended that we use SHA1 instead of SHA256 for the Phase 2 part of IPSec configuration. They have acknowledged the issue and are looking to address the problem. Meanwhile, the Aviatrix engineering team made updates based on AWS recommendation and has released a new build, 4.0.691, to address this issue.
 
Solution: Customers running into this issue are requested to upgrade their Aviatrix system to 4.0.691 or later using the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__. After upgrading, follow these directions:

  * For a new connection to VGW in Transit Network scenario, customers should login to the Controller, go to Transit Network -> Setup and go to `Step 8 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#remove-transit-gw-to-vgw-connection>`_ to disconnect the VGW and reconnect again via `Step 3 <https://docs.aviatrix.com/HowTos/transitvpc_workflow.html#connect-the-transit-gw-to-aws-vgw>`_.
  * For a standalone Site2Cloud connection, rebuild the connection through Controller GUI/Site2Cloud and avoid using SHA256 for Phase 2.
 
Please test your network connections and if you continue to face further issues after going through the above steps, please open a ticket by sending an email to support@aviatrix.com 

========================================================================================

Field Notice 0003 (2018/12/1)
--------------------------------
**TGW Orchestrator customers: Incorrect route advertisements from Aviatrix gateway to on-premise networks affecting 4.0 releases prior to 4.0.590 for TGW Hybrid Connection**

Problem:
If you use the Aviatrix TGW Orchestrator and `build a hybrid connection using Step 4, 5 and 6 <https://docs.aviatrix.com/HowTos/tgw_plan.html#optional-setup-aviatrix-transit-gw>`_, the Aviatrix Transit gateway always advertises 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 to on-prem.  This could affect the on-premise networks if the on-prem routers also advertise any of the three routes. 

Description:
Aviatrix transit gateways use BGP to summarize and propagate the network routes. Due to an unexpected software change, software releases from 4.0.368 to 4.0.589 advertises 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 routes to on-prem which affects the on-prem network if the on-prem routers also advertise any of the three routes. This issue has been fixed in 4.0.590 and all customers who have deployed TGW are advised to upgrade to 4.0.590 or later, immediately.

Solution:
Customers deploying TGW are requested to upgrade to 4.0.590 or later. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade. After upgrading to 4.0.590 or later, please go to TGW Orchestrator > Plan > Step 7 to detach Aviatrix Transit GW from TGW and re-attach Aviatrix Transit GW to TGW in Step 6.

Note: this issue does not affect customers who are not deploying TGW Orchestrator. But if you have plans to deploy, we advise you to upgrade to the latest software. 

========================================================================================

Field Notice 0002 (2018/10/19)
----------------------------------
**Route update propagation inconsistency from on-premise networks affecting 3.5 releases prior to 3.5.362 for Transit Network**

Problem:
BGP Route propagation could fail intermittently from on-premise networks to cloud networks in Transit Network.

Description:
Aviatrix controllers and gateways use BGP to summarize and propagate the network routes. Due to an unexpected software change, 3.5 releases prior to 3.5.362 are affected and cannot forward routes in certain scenarios. This issue has been addressed in 3.5.362 and all customers who have deployed Transit Network and are running any 3.5 release prior to 3.5.362 are advised to upgrade to 3.5.362 or later, immediately. Customers who are running software versions prior to 3.5 are not impacted by this issue.

Solution:
Customers deploying Transit Network are requested to upgrade to 3.5.362 or later, if they are running any 3.5.(<362) release. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade.

Support:
For further information or to open a support ticket, please visit https://www.aviatrix.com/support/.

========================================================================================

Field Notice 0001 (2018/10/19)
-----------------------------------------------------------------------------
**SSL UserVPN with SAML function might fail with Chrome v70**
 
Problem
Remote users connecting via SSL UserVPN functionality authenticated through SAML cannot establish session.
 
Description
Aviatrix controllers and gateways provide SSL UserVPN service with authentication through SAML as described in `this doc <https://docs.aviatrix.com/HowTos/VPN_SAML.html>`_. Google Chrome v70 has altered the behavior of an element in HTML (they add an extra whitespace). This affects our product’s ability to interface with the SAML id providers and breaks the authentication process, resulting in remoteVPN users not being able to connect to your network. We have notified Google about this issue.
 
Solution
Customers deploying SSL UserVPN with SAML authentication are requested to upgrade to 3.5.362 or later, if they are running 3.3 or later release. Please follow the instructions `here <https://docs.aviatrix.com/HowTos/inline_upgrade.html#how-to-upgrade-software>`__ to perform the software upgrade. For software version prior to 3.3, please reach out to us at support@aviatrix.com. Another workaround to restore the service to your users is to use Firefox as their default browser.
  
Support:
For further information, or to open a support ticket, please visit https://www.aviatrix.com/support/.  
 
 
========================================================================================


OpenVPN is a registered trademark of OpenVPN Inc.

.. |image1404Controller| image:: field_notices_media/1404Controller.png 
   :width: 600
   
.. |image1804Controller| image:: field_notices_media/1804Controller.png 
   :width: 600
   
.. |imagefn14| image:: field_notices_media/fn14.png 
   :width: 600
   
.. disqus::
