.. meta::
   :description: controller HA
   :keywords: controller high availability, controller HA, AWS VPC peering, auto scaling

###################################
Controller HA in AWS
###################################

Enable Controller HA
---------------------

Aviatrix Controller HA in AWS leverages auto scaling group and Lambda function to perform monitoring, launching a new controller and restoring configuration when the active controller instance become unreachable. 
When a new controller is launched, the existing controller is terminated by auto scaling group and its EIP is associated to the controller. Existing configuration files are restored which gives you a seamless experience when failover happens.

You need to launch a controller before enabling HA. To do so, follow the instructions `here <https://docs.aviatrix.com/StartUpGuides/aviatrix-cloud-controller-startup-guide.html>`_

Follow the `instructions here <https://github.com/AviatrixSystems/Controller-HA-for-AWS/blob/master/README.md>`_ to enable HA on your controller.

Disable Controller HA
-----------------------

You can disable Controller HA by deleting the Controller HA CloudFormation stack. 

Login to AWS Console, go to CloudFormation Service, identify the CloudFormation stack you used to enable Controller HA and delete the stack. 

.. disqus::
