.. meta::
   :description: controller HA
   :keywords: controller high avalability, controller HA, AWS VPC peering, auto scaling

###################################
Controller HA in AWS
###################################

Aviatrix Controller HA in AWS leverages auto scaling group and Lambda function to perform monitoring, launching a new controller and restoring configuration when the active controller instance become unreachable. 
When a new controller is launched, the existing controller is terminated by auto scaling group and its EIP is associated to the controller. Existing configuration files are restored which gives you a seamless experience when failover happens.

1. **Existing Controller with HA** If you already have an existing controller running and would like to enable HA, follow `this instruction <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/Existing-Controller-README.md>`_.

2. **New Controller with HA** If you are launching a brand new controller and would like to have HA enabled, follow `instructions here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/README.md>`_


.. disqus::
