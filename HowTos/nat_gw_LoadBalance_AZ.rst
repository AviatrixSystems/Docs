
====================================
NAT GW Load-balance with AZ affinity
====================================

Pre-4.2 Behavior
----------------

In VPC with multiple private route tables (ex: rtb1, rtb2, rtb3), and multiple NAT gateways (ex: gw1, gw2), the default route in the route tables points to the NAT gateway round-robbinly.

* *rtb1 --> gw1*
* *rtb2 --> gw2*
* *rtb3 --> gw1*

4.2 Behavior
------------

In 4.2, AZ is considered when assign route tables to gateways. Route table is assigned to same AZ gateway first, if no same AZ gateway, it will assign to other AZ gateway.

Before program the default route, all route tables are grouped according to AZ.

.. note::

  1. AWS route table has no AZ attribute, we use the first associated subnet to decide the route table AZ. It is user's responsibility to make sure route table associated subnets belong to the same AZ.
  2. If route table doesn't have any associated subnets, it is considered to be first AZ (i.e, us-east-1a for example).

Case study
-----------
We use the an example to show how it works. Suppose we have the following setting:

* AZ1: *rtb1, rtb2, rtb3, gw1, gw2*
* AZ2: *rtb4, no gateway*
* AZ3: *no rtb, gw3*

Round 1: Within Single AZ

* AZ1: 3 rtbs are programed with 2 gateway round-robbinly.
  * *rtb1 --> gw1*
  * *rtb2 --> gw2*
  * *rtb3 --> gw1*

* AZ2: no gateway, rtb4 is added to a pending list
* AZ3: no rtb, nothing to do

After 1st round, gw1 has 2 rtbs, gw2 has 1 rtbs, gw3 has 0 rtbs.
There is 1 rtb in pending list. If the pending list is empty, meaning all route tables are programed to its same AZ gateway. Round 2 is skipped.

Round 2: Cross AZ

In this example, pending list has rtb4.
We sort the gateways according to number of route tables it's already assigned to, get a list of all available gateways:

*[gw3 (0), gw2 (1), gw1 (2)]*

In this round, we work on route table in the pending list with the sorted list of gateways round-robbinly.

* *rtb4 --> gw3*

Finally, all route table has default route configured to one of the NAT gateways.

* *rtb1 --> gw1, same AZ*
* *rtb2 --> gw2, same AZ*
* *rtb3 --> gw1, same AZ*
* *rtb4 --> gw3, cross AZ*

.. disqus::
