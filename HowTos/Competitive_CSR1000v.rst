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
-------------------

This video shows the Transit VPC resulting of running the `AWS Cisco-Based Transit network VPC <http://docs.aws.amazon.com/solutions/latest/cisco-based-transit-vpc/welcome.html>`_.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/FUbiV2p2c4U" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Oregon Spoke VPC
----------------

This video shows how the Oregon `spoke has been configured to work with CSR1000v Transit VPC. <http://docs.aws.amazon.com/solutions/latest/cisco-based-transit-vpc/step3.html>`_.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/szOwOEayuEA" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Virginia Spoke VPC
------------------

This video shows how the Virginia `spoke has been configured to work with CSR1000v Transit VPC.  <http://docs.aws.amazon.com/solutions/latest/cisco-based-transit-vpc/step3.html>`_.
Feel free to skip as it mirrors Oregon's setup, main difference are the subnets.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/3I7rl8h7WJI" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Troubleshoot #1 - Troubleshooting route propagation
============================================================

This video shows how to enable route propagation. Route propagation is a step that is not documented but it is essential to make the Transit Architecture work.
This video will save you a few hours of googling around to figure out why your transit VPC deployment is not working right off the box.
In contrast the Aviatrix solution does not require any manual intervention, we will show how to create connectivity using Aviatrix in the next video.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/QotlEPMz1Rk" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Troubleshoot #1 - Troubleshooting route propagation using Aviatrix
========================================================================
(Or lack of thereof)

This video shows how to deploy gateways and create peering tunnels using Aviatrix Controller.
Notice that Aviatrix install the necessary routes on the AWS Routing tables, without any need for manual interaction.


.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/xyeE9Ge8xgc" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Ohio Spoke VPC
------------------

This video shows the introduction of a third VPC, which by "mistake" utilizes the same ip range as the Virginia VPC.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/hJBsKa4HMzI" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Troubleshooting #2 - "Making sense of the routing"
============================================================

Now that the Ohio VPC has been created and it's not working due that it is using the same ip range as Virginia VPC.
In this video we try to troubleshoot by trying to make sense of the routing tables both in the CSR1000v and the AWS side.
Quickly we find that this is not an easy task nor it's scalable.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/T4dL8ot_oTA" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>

Troubleshooting #3 - IP overlap
================================================

This video shows the worst case scenario: a wrongfully configured Spoke VPC taking over the ip range of a shared services VPC, bringing the whole network and it's services offline.

.. raw:: html

    <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; height: auto;">
        <iframe src="https://www.youtube.com/embed/Sa-cYlf5Ups" frameborder="0" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
    </div>
