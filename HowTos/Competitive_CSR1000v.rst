.. meta::
   :description: Competitive information about CSR1000v in Transit VPC architecture
   :keywords: competitive, csr1000v, transit architecture, transit VPC architecture, transit VPC, aviatrix


====================================
Transit VPC architecture - CSR1000v
====================================

Introduction
============

This document depicts a typical deployment of CSR1000v on AWS in a Transit VPC architecture.
The limitations encountered on this architecture are explained in a series of videos.
I hope this document helps you understand the advantages of Aviatrix over the CSR1000v Solution.

The setup
============

To setup this demonstration we have followed the
`AWS Cisco-Based Transit network VPC <http://docs.aws.amazon.com/solutions/latest/cisco-based-transit-vpc/welcome.html>`_. document.
The AWS document runs a cloudformation script that deploys all the necessary CSR1000v Instances and Lambdas function to aid with the
provisioning of new Spoke VPCs and route configurations.

Transit network VPC
------------------------

This video shows the result of running the cloud formation script and it's result on the transit VPC.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="//youtu.be/FUbiV2p2c4U" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Oregon Spoke VPC
------------------------

This video shows the configuration of the Oregon Spoke VPC.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="//youtu.be/szOwOEayuEA" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Virginia Spoke VPC
------------------------

This video shows the configuration of the Virginia Spoke VPC. Feel free to skip as it

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="//youtu.be/3I7rl8h7WJI" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>
