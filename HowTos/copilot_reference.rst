.. meta::
  :description: Aviatrix CoPilot Reference Documentation
  :keywords: CoPilot,reference


==========================================
Aviatrix CoPilot Reference Documentation
==========================================

This section provides reference information about properties, metrics, filter conditions, and other constructs you may need to specify when working in Aviatrix CoPilot.  

Topology Feature Reference
===========================

Options you can set for the topology map.

Topology Physics Options
-------------------------

This section describes the physics options that control how objects move in the network topology map.

+-------------------------+------------------------------------------------------------------------------------+
|Topology Physics Option  |   Description                                                                      |
+=========================+====================================================================================+
|Physics Enabled          |   Enable or disable physics effects in the topology map.                           |
|                         |   Deselect this option if you do not want objects to move on their own and have    |
|                         |   them stay in the location you place them (when you click and drag them there).   |
+-------------------------+------------------------------------------------------------------------------------+
|Smooth Edges             |   Enable or disable smooth edges for objects in the topology map.                  |
|                         |   Deselect this option if you do not want the lines between the nodes to be        |
|                         |   smoothed.                                                                        |
|                         |   Smooth edges are more computationally expensive but they produce better layouts. |
+-------------------------+------------------------------------------------------------------------------------+
|Node Repulsion           |   Controls how strongly the objects in the map repulse other objects that come     |
|                         |   near them. The higher the value, the more force applies to the repulsion field   |
|                         |   around each object.                                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Central Gravity          |   Controls the force by which all objects in the network are pulled to a center of |
|                         |   gravity in the topology map.                                                     |
+-------------------------+------------------------------------------------------------------------------------+
|Spring Length            |   Controls how far apart objects appear from each other when they are moving or at |
|                         |   rest. The edges are modelled as springs.                                         |
+-------------------------+------------------------------------------------------------------------------------+
|Spring Constant          |   Controls how quickly objects go back (spring back) to their original position    |
|                         |   after they are dragged and released. The higher the value, the more quickly      |
|                         |   the objects spring back into place.                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Dampening                |   Controls how much the moving of objects (in one physics simulation iteration)    |
|                         |   carries over into moving objects again (next physics simulation iteration). The  |
|                         |   higher the value, the more velocity of movement carries over into moving         |
|                         |   subsequent objects.                                                              |
+-------------------------+------------------------------------------------------------------------------------+
|Max Velocity             |   Controls how long it takes for objects to stop moving after they are dragged     |
|                         |   and released. The higher the value, the more time it takes for objects to        |
|                         |   stabilize (stop moving) after having been dragged.                               |
+-------------------------+------------------------------------------------------------------------------------+
|Min Velocity             |   Controls how long it takes for objects to stop moving after they are dragged     |
|                         |   and released. The higher the value, the less time it takes for objects to stop   |
|                         |   moving after having been dragged.                                                |
+-------------------------+------------------------------------------------------------------------------------+


Performance Feature Reference
=================================

Telemetry data from the CSP that CoPilot displays in the Performance page for Aviatrix hosts. 

Telemetry Data for Hosts in Performance Page
----------------------------------------------

For descriptions of the metrics on which CoPilot reports telemetry data in the Performance page, see `System and Network Metrics for Hosts`_.


Notifications Feature Reference
=================================

Telemetry data from the CSP that CoPilot displays in the Notifications page. 

Telemetry Data for Hosts in Notifications Page
------------------------------------------------

For descriptions of the metrics on which CoPilot reports telemetry data in the Notifications page, see `System and Network Metrics for Hosts`_.


System and Network Metrics for Hosts
=====================================

System and network metrics (telemetry data) from the CSP that are displayed in CoPilot for Aviatrix hosts. 

**System metrics**

For Aviatrix Controller and Aviatrix gateways, you can configure alerts based on the following system metrics. Aviatrix gateways report live Linux system statistics (such as memory, CPU, I/O, processes, and swap) for the instances/virtual machines on which they run.

cpu_idle
    CPU Idle — Of the total CPU time, the percentage of time the CPU(s) spent idle.

cpu_ks
    CPU Kernel Space — Of the total kernel space memory on the host (VM/instance), the percentage of memory that is free.

cpu_steal
    CPU Steal — Of the average CPU wait time on the host (VM/instance), the percentage of time a virtual CPU waits for a real CPU while the hypervisor services another virtual processor. 

cpu_us
    CPU User Space — Of the total CPU time, the percentage of time spent running non-kernel code.

cpu_wait
    CPU Wait — Of the total CPU time, the percentage of time spent waiting for IO.

hdisk_free
    Disk Free — The storage space on the disk (volume) that is free/unused.

io_blk_in
    IO Blocks IN — The number of blocks received per second from a block device.

io_blk_out
    IO Blocks OUT — The number of blocks sent per second to a block device.

memory_buf
    Memory Buffer — The amount of memory used as buffers.

memory_cached
    Memory Cache — The amount of memory used as cache.

memory_free
    Memory Free — The amount of idle memory.

memory_swpd
    Memory Swapped — If swapped is enabled, the amount of virtual memory used.

nproc_non_int_sleep
    Processes Uninterruptable Sleep — The number of processes blocked waiting for I/O to complete.

nproc_running
    Processes Waiting To Be Run — The number of processes that are running or waiting for run time.

swap_from_disk
    Swaps From Disk — Memory that is swapped in every second from disk in kilobytes.

swap_to_disk
    Swaps To Disk — Memory that is swapped out every second to disk in kilobytes.

system_cs
    System Context Switches — The number of context switches per second.

system_int
    System Interrupts — The number of interrupts per second, including the clock.
   

**Network metrics for triggering notifications**

For Aviatrix Controller and Aviatrix gateways, you can configure alerts based on the following network metrics.

pkt_rate_total
    Total Rate (in packets) — The total (bidirectional) transmission in packet level per second. Instance size impacts how many packets per second the gateway can handle.

pkt_rx_rate
    Packets Received Rate — The total (received) transmission in packet level per second.

pkt_tx_rate
    Packets Transmitted Rate — The total (transmitted) transmission in packet level per second.

rate_bandwidth_egress_limit_exceeded
    (AWS Only) Bandwidth Egress Limit Exceeded Rate — The number of tx packets dropped because the bandwidth allowance limit was exceeded. This metric is supplied by the Elastic Network Adapter (ENA) driver only on AWS.

rate_bandwidth_ingress_limit_exceeded
    (AWS Only) Bandwidth Ingress Limit Exceeded Rate — The number of rx packets dropped because the bandwidth allowance limit was exceeded. This metric is supplied by the ENA driver only on AWS.

rate_conntrack_limit_exceeded
    (AWS Only) Conntrack Limit Exceeded Rate — The number of packets dropped because the connection count allowance limit was exceeded. This metric is supplied by the ENA driver only on AWS.

rate_peak_received
    Peak Received Rate — The highest bit rate that has been received by the interface on the Aviatrix gateway VM/instance.

rate_peak_sent
    Peak Transmitted Rate — The highest bit rate that has been transmitted by the interface on the Aviatrix gateway VM/instance.

rate_peak_total
    Peak Total Rate — The highest bit rate that has been received and transmitted or both by the interface on the Aviatrix gateway VM/instance.

rate_pps_limit_exceeded
    PPS Limit Exceeded Rate — The number of packets that exceed the maximum for the instance type that are processed (bidirectionally) by the Aviatrix gateway per second.

rate_received
    Received Rate — The rate of bits the Aviatrix gateway has received per second.

rate_rx_compressed
    Compressed Packets Received Rate — The number of compressed packets received per second.

rate_rx_drop
    Rate of Packets Dropped While Receiving — The number of packets dropped per second while receiving the packets.

rate_rx_errs
    Errored Packets Received Rate — The number of packets received per second that is flagged by the kernel as errored.

rate_rx_fifo
    Receiver FIFO Frames Rate — The number of overflow events per second when receiving packets.

rate_rx_frame
    Received Frames Rate — The number of frame alignment errors per second when receiving packets.

rate_rx_multicast
    Multicast Packets Received Rate — The number of multicast packets per second.

rate_sent
    Transmitted Rate — The rate of bits per second that has been transmitted by the interface on the Aviatrix gateway VM/instance.

rate_total
    Total Rate — The total (bidirectional) rate of bits processed per second by the interface on the Aviatrix VM/instance.  

rate_tx_carrier
    Transmitted Carrier Frames Rate — The number of frame transmission errors per second due to loss of carrier during transmission.

rate_tx_colls
    Collisions Rate during Transmission — The number of collisions per second during packet transmission.

rate_tx_compressed
    Compressed Packets Transmitted Rate — The number of correctly received compressed packets per second.

rate_tx_drop
    Rate of Packets Dropped during Transmission — The number of packets being dropped per second while sending.

rate_tx_errs
    Errored Packets Transmitted Rate — The total number of transmit problems per second.

rate_tx_fifo
    Transmission FIFO Frames Rate — The number of frame transmission errors per second due to device FIFO underrun/underflow.

GatewayStatus
    Gateway Status — Any gateway status change triggers an alert.

TunnelStatus
    Tunnel Status — Any link status change triggers an alert.

BGPpeeringStatus
    BGP Peering Status — Any BGP peering status change triggers an alert.

.. disqus::
  