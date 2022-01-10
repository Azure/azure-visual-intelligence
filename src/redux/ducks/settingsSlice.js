import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diagram: {
    DisplayInstanceName: false,
    DisplayInstanceType: false,
    AlwaysAskDragnDropSubGovernanceResources: false,
    DragnDropSubGovernanceResources: false,
    AlwaysAskDragnDropSubARMResources: false,
    DragnDropSubARMResources: false,
    DefaultLayout: "ARM",
    CurrentLayout: "ARM",
  },
  resources: {
    azure: [
      {
        type: "ManagementGroup",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups.svg",
      },
      {
        type: "microsoft.resources/subscriptions",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups/subscriptions.svg",
      },
      {
        type: "microsoft.resources/subscriptions/resourcegroups",
        icon: "/assets/img/azure/original/microsoft.resources/resourcegroups.svg",
      },
      {
        type: "microsoft.apimanagement/default",
        icon: "/assets/img/azure/original/microsoft.apimanagement/default.svg",
      },
      {
        type: "microsoft.apimanagement/service",
        icon: "/assets/img/azure/original/microsoft.apimanagement/service.svg",
      },
      {
        type: "microsoft.apimanagement/service/apis",
        icon: "/assets/img/azure/original/microsoft.apimanagement/service/apis.svg",
      },
      {
        type: "microsoft.apimanagement/service/products",
        icon: "/assets/img/azure/original/microsoft.apimanagement/service/products.svg",
      },
      {
        type: "microsoft.apimanagement/service/users",
        icon: "/assets/img/azure/original/microsoft.apimanagement/service/users.svg",
      },
      {
        type: "microsoft.apimanagement/service/apis/operations",
        icon: "/assets/img/azure/original/microsoft.apimanagement/service/apis/operations.svg",
      },
      {
        type: "microsoft.authorization/locks",
        icon: "/assets/img/azure/original/microsoft.authorization/locks.svg",
      },
      {
        type: "microsoft.authorization/policyassignments",
        icon: "/assets/img/azure/original/microsoft.authorization/policyassignments.svg",
      },
      {
        type: "microsoft.authorization/policydefinitions",
        icon: "/assets/img/azure/original/microsoft.authorization/policydefinitions.svg",
      },
      {
        type: "microsoft.authorization/policysetdefinitions",
        icon: "/assets/img/azure/original/microsoft.authorization/policysetdefinitions.svg",
      },
      {
        type: "microsoft.authorization/roleassignments",
        icon: "/assets/img/azure/original/microsoft.authorization/roleassignments.svg",
      },
      {
        type: "microsoft.authorization/roledefinitions",
        icon: "/assets/img/azure/original/microsoft.authorization/roledefinitions.svg",
      },
      {
        type: "microsoft.automation/automationaccounts",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/certificates",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/certificates.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/compilationjobs",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/compilationjobs.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/configurations",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/configurations.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/connections",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/connections.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/connectiontypes",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/connectiontypes.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/credentials",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/credentials.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/jobs",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/jobs.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/jobschedules",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/jobschedules.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/modules",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/modules.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/runbooks",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/runbooks.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/schedules",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/schedules.svg",
      },
      {
        type: "microsoft.automation/automationaccounts/variables",
        icon: "/assets/img/azure/original/microsoft.automation/automationaccounts/variables.svg",
      },
      {
        type: "microsoft.batch/batchaccounts",
        icon: "/assets/img/azure/original/microsoft.batch/batchaccounts.svg",
      },
      {
        type: "microsoft.botservice/botservices",
        icon: "/assets/img/azure/original/microsoft.botservice/botservices.svg",
      },
      {
        type: "microsoft.botservice/botservices/channels",
        icon: "/assets/img/azure/original/microsoft.botservice/botservices/channels.svg",
      },
      {
        type: "microsoft.botservice/botservices/connections",
        icon: "/assets/img/azure/original/microsoft.botservice/botservices/connections.svg",
      },
      {
        type: "microsoft.cache/redis",
        icon: "/assets/img/azure/original/microsoft.cache/redis.svg",
      },
      {
        type: "microsoft.cdn/profiles",
        icon: "/assets/img/azure/original/microsoft.cdn/profiles.svg",
      },
      {
        type: "microsoft.cdn/profiles/endpoints",
        icon: "/assets/img/azure/original/microsoft.cdn/profiles/endpoints.svg",
      },
      {
        type: "microsoft.cognitiveservices/accounts",
        icon: "/assets/img/azure/original/microsoft.cognitiveservices/accounts.svg",
      },
      {
        type: "microsoft.compute/availabilitysets",
        icon: "/assets/img/azure/original/microsoft.compute/availabilitysets.svg",
      },
      {
        type: "microsoft.compute/disks",
        icon: "/assets/img/azure/original/microsoft.compute/disks.svg",
      },
      {
        type: "microsoft.compute/virtualmachines-linux",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines-linux.svg",
      },
      {
        type: "microsoft.compute/virtualmachines",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines.svg",
      },
      {
        type: "microsoft.compute/virtualmachinescalesets",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachinescalesets.svg",
      },
      {
        type: "microsoft.compute/virtualmachines/extensions",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines/extensions.svg",
      },
      {
        type: "microsoft.compute/virtualmachines/microsoft.compute/virtualmachines/extensions",
        icon: "/assets/img/azure/original/microsoft.compute/virtualmachines/microsoft.compute/virtualmachines/extensions.svg",
      },
      {
        type: "microsoft.containerinstance/containergroups",
        icon: "/assets/img/azure/original/microsoft.containerinstance/containergroups.svg",
      },
      {
        type: "microsoft.containerregistry/registries",
        icon: "/assets/img/azure/original/microsoft.containerregistry/registries.svg",
      },
      {
        type: "microsoft.containerservice/containerservices",
        icon: "/assets/img/azure/original/microsoft.containerservice/containerservices.svg",
      },
      {
        type: "microsoft.containerservice/managedclusters",
        icon: "/assets/img/azure/original/microsoft.containerservice/managedclusters.svg",
      },
      {
        type: "microsoft.databricks/workspaces",
        icon: "/assets/img/azure/original/microsoft.databricks/workspaces.svg",
      },
      {
        type: "microsoft.datafactory/factories",
        icon: "/assets/img/azure/original/microsoft.datafactory/factories.svg",
      },
      {
        type: "microsoft.datalakestore/accounts",
        icon: "/assets/img/azure/original/microsoft.datalakestore/accounts.svg",
      },
      {
        type: "microsoft.dbformysql/servers",
        icon: "/assets/img/azure/original/microsoft.dbformysql/servers.svg",
      },
      {
        type: "microsoft.dbformysql/servers/configurations",
        icon: "/assets/img/azure/original/microsoft.dbformysql/servers/configurations.svg",
      },
      {
        type: "microsoft.dbformysql/servers/databases",
        icon: "/assets/img/azure/original/microsoft.dbformysql/servers/databases.svg",
      },
      {
        type: "microsoft.dbformysql/servers/firewallrules",
        icon: "/assets/img/azure/original/microsoft.dbformysql/servers/firewallrules.svg",
      },
      {
        type: "microsoft.dbforpostgresql/servers",
        icon: "/assets/img/azure/original/microsoft.dbforpostgresql/servers.svg",
      },
      {
        type: "microsoft.dbforpostgresql/servers/configurations",
        icon: "/assets/img/azure/original/microsoft.dbforpostgresql/servers/configurations.svg",
      },
      {
        type: "microsoft.dbforpostgresql/servers/databases",
        icon: "/assets/img/azure/original/microsoft.dbforpostgresql/servers/databases.svg",
      },
      {
        type: "microsoft.dbforpostgresql/servers/firewallrules",
        icon: "/assets/img/azure/original/microsoft.dbforpostgresql/servers/firewallrules.svg",
      },
      {
        type: "microsoft.devices/iothubs",
        icon: "/assets/img/azure/original/microsoft.devices/iothubs.svg",
      },
      {
        type: "microsoft.devices/iothubs/eventhubendpoints/consumergroups",
        icon: "/assets/img/azure/original/microsoft.devices/iothubs/eventhubendpoints/consumergroups.svg",
      },
      {
        type: "microsoft.devtestlab/labs",
        icon: "/assets/img/azure/original/microsoft.devtestlab/labs.svg",
      },
      {
        type: "microsoft.documentdb/databaseaccounts",
        icon: "/assets/img/azure/original/microsoft.documentdb/databaseaccounts.svg",
      },
      {
        type: "microsoft.documentdb/databaseaccounts/apis/databases",
        icon: "/assets/img/azure/original/microsoft.documentdb/databaseaccounts/apis/databases.svg",
      },
      {
        type: "microsoft.documentdb/databaseaccounts/apis/tables",
        icon: "/assets/img/azure/original/microsoft.documentdb/databaseaccounts/apis/tables.svg",
      },
      {
        type: "microsoft.documentdb/databaseaccounts/apis/databases/collections",
        icon: "/assets/img/azure/original/microsoft.documentdb/databaseaccounts/apis/databases/collections.svg",
      },
      {
        type: "microsoft.documentdb/databaseaccounts/apis/databases/containers",
        icon: "/assets/img/azure/original/microsoft.documentdb/databaseaccounts/apis/databases/containers.svg",
      },
      {
        type: "microsoft.eventgrid/eventsubscriptions",
        icon: "/assets/img/azure/original/microsoft.eventgrid/eventsubscriptions.svg",
      },
      {
        type: "microsoft.eventgrid/topics",
        icon: "/assets/img/azure/original/microsoft.eventgrid/topics.svg",
      },
      {
        type: "microsoft.eventgrid/topics/providers/eventsubscriptions",
        icon: "/assets/img/azure/original/microsoft.eventgrid/topics/providers/eventsubscriptions.svg",
      },
      {
        type: "microsoft.eventhub/namespaces",
        icon: "/assets/img/azure/original/microsoft.eventhub/namespaces.svg",
      },
      {
        type: "microsoft.eventhub/namespaces/eventhubs",
        icon: "/assets/img/azure/original/microsoft.eventhub/namespaces/eventhubs.svg",
      },
      {
        type: "microsoft.eventhub/namespaces/eventhubs/authorizationrules",
        icon: "/assets/img/azure/original/microsoft.eventhub/namespaces/eventhubs/authorizationrules.svg",
      },
      {
        type: "microsoft.eventhub/namespaces/eventhubs/consumergroups",
        icon: "/assets/img/azure/original/microsoft.eventhub/namespaces/eventhubs/consumergroups.svg",
      },
      {
        type: "microsoft.hdinsight/clusters",
        icon: "/assets/img/azure/original/microsoft.hdinsight/clusters.svg",
      },
      {
        type: "microsoft.insights/alertrules",
        icon: "/assets/img/azure/original/microsoft.insights/alertrules.svg",
      },
      {
        type: "microsoft.insights/autoscalesettings",
        icon: "/assets/img/azure/original/microsoft.insights/autoscalesettings.svg",
      },
      {
        type: "microsoft.insights/components",
        icon: "/assets/img/azure/original/microsoft.insights/components.svg",
      },
      {
        type: "microsoft.insights/metricalerts",
        icon: "/assets/img/azure/original/microsoft.insights/metricalerts.svg",
      },
      {
        type: "microsoft.insights/webtests",
        icon: "/assets/img/azure/original/microsoft.insights/webtests.svg",
      },
      {
        type: "microsoft.keyvault/vaults",
        icon: "/assets/img/azure/original/microsoft.keyvault/vaults.svg",
      },
      {
        type: "microsoft.keyvault/vaults/secrets",
        icon: "/assets/img/azure/original/microsoft.keyvault/vaults/secrets.svg",
      },
      {
        type: "microsoft.kusto/clusters",
        icon: "/assets/img/azure/original/microsoft.kusto/clusters.svg",
      },
      {
        type: "microsoft.kusto/clusters/databases",
        icon: "/assets/img/azure/original/microsoft.kusto/clusters/databases.svg",
      },
      {
        type: "microsoft.logic/integrationaccounts",
        icon: "/assets/img/azure/original/microsoft.logic/integrationaccounts.svg",
      },
      {
        type: "microsoft.logic/workflows",
        icon: "/assets/img/azure/original/microsoft.logic/workflows.svg",
      },
      {
        type: "microsoft.machinelearningservices/workspaces",
        icon: "/assets/img/azure/original/microsoft.machinelearningservices/workspaces.svg",
      },
      {
        type: "microsoft.management/managementgroups",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups.svg",
      },
      {
        type: "microsoft.management/managementgroups/subscriptions",
        icon: "/assets/img/azure/original/microsoft.management/managementgroups/subscriptions.svg",
      },
      {
        type: "microsoft.migrate/projects",
        icon: "/assets/img/azure/original/microsoft.migrate/projects.svg",
      },
      {
        type: "microsoft.network/applicationgateways",
        icon: "/assets/img/azure/original/microsoft.network/applicationgateways.svg",
      },
      {
        type: "microsoft.network/azurefirewalls",
        icon: "/assets/img/azure/original/microsoft.network/azurefirewalls.svg",
      },
      {
        type: "microsoft.network/bastionhosts",
        icon: "/assets/img/azure/original/microsoft.network/bastionhosts.svg",
      },
      {
        type: "microsoft.network/connections",
        icon: "/assets/img/azure/original/microsoft.network/connections.svg",
      },
      {
        type: "microsoft.network/dnszones",
        icon: "/assets/img/azure/original/microsoft.network/dnszones.svg",
      },
      {
        type: "microsoft.network/frontdoors",
        icon: "/assets/img/azure/original/microsoft.network/frontdoors.svg",
      },
      {
        type: "microsoft.network/frontdoorwebapplicationfirewallpolicies",
        icon: "/assets/img/azure/original/microsoft.network/frontdoorwebapplicationfirewallpolicies.svg",
      },
      {
        type: "microsoft.network/loadbalancers",
        icon: "/assets/img/azure/original/microsoft.network/loadbalancers.svg",
      },
      {
        type: "microsoft.network/localnetworkgateways",
        icon: "/assets/img/azure/original/microsoft.network/localnetworkgateways.svg",
      },
      {
        type: "microsoft.network/networkinterfaces",
        icon: "/assets/img/azure/original/microsoft.network/networkinterfaces.svg",
      },
      {
        type: "microsoft.network/networksecuritygroups",
        icon: "/assets/img/azure/original/microsoft.network/networksecuritygroups.svg",
      },
      {
        type: "microsoft.network/privatednszones",
        icon: "/assets/img/azure/original/microsoft.network/privatednszones.svg",
      },
      {
        type: "microsoft.network/publicipaddresses",
        icon: "/assets/img/azure/original/microsoft.network/publicipaddresses.svg",
      },
      {
        type: "microsoft.network/routetables",
        icon: "/assets/img/azure/original/microsoft.network/routetables.svg",
      },
      {
        type: "microsoft.network/trafficmanagerprofiles",
        icon: "/assets/img/azure/original/microsoft.network/trafficmanagerprofiles.svg",
      },
      {
        type: "microsoft.network/virtualhubs",
        icon: "/assets/img/azure/original/microsoft.network/virtualhubs.svg",
      },
      {
        type: "microsoft.network/virtualnetworkgateways",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworkgateways.svg",
      },
      {
        type: "microsoft.network/virtualnetworks",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworks.svg",
      },
      {
        type: "microsoft.network/virtualwans",
        icon: "/assets/img/azure/original/microsoft.network/virtualwans.svg",
      },
      {
        type: "microsoft.network/vpngateways",
        icon: "/assets/img/azure/original/microsoft.network/vpngateways.svg",
      },
      {
        type: "microsoft.network/dnszones/a",
        icon: "/assets/img/azure/original/microsoft.network/dnszones/a.svg",
      },
      {
        type: "microsoft.network/dnszones/c",
        icon: "/assets/img/azure/original/microsoft.network/dnszones/c.svg",
      },
      {
        type: "microsoft.network/dnszones/txt",
        icon: "/assets/img/azure/original/microsoft.network/dnszones/txt.svg",
      },
      {
        type: "microsoft.network/loadbalancers/inboundnatrules",
        icon: "/assets/img/azure/original/microsoft.network/loadbalancers/inboundnatrules.svg",
      },
      {
        type: "microsoft.network/networksecuritygroups/securityrules",
        icon: "/assets/img/azure/original/microsoft.network/networksecuritygroups/securityrules.svg",
      },
      {
        type: "microsoft.network/virtualnetworks/subnets",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworks/subnets.svg",
      },
      {
        type: "microsoft.network/virtualnetworks/virtualnetworkpeerings",
        icon: "/assets/img/azure/original/microsoft.network/virtualnetworks/virtualnetworkpeerings.svg",
      },
      {
        type: "microsoft.notificationhubs/namespaces",
        icon: "/assets/img/azure/original/microsoft.notificationhubs/namespaces.svg",
      },
      {
        type: "microsoft.notificationhubs/namespaces/notificationhubs",
        icon: "/assets/img/azure/original/microsoft.notificationhubs/namespaces/notificationhubs.svg",
      },
      {
        type: "microsoft.operationalinsights/solutions",
        icon: "/assets/img/azure/original/microsoft.operationalinsights/solutions.svg",
      },
      {
        type: "microsoft.operationalinsights/workspaces",
        icon: "/assets/img/azure/original/microsoft.operationalinsights/workspaces.svg",
      },
      {
        type: "microsoft.operationalinsights/workspaces/datasources",
        icon: "/assets/img/azure/original/microsoft.operationalinsights/workspaces/datasources.svg",
      },
      {
        type: "microsoft.operationalinsights/workspaces/savedsearches",
        icon: "/assets/img/azure/original/microsoft.operationalinsights/workspaces/savedsearches.svg",
      },
      {
        type: "microsoft.operationsmanagement/solutions",
        icon: "/assets/img/azure/original/microsoft.operationsmanagement/solutions.svg",
      },
      {
        type: "microsoft.resources/deployments",
        icon: "/assets/img/azure/original/microsoft.resources/deployments.svg",
      },
      {
        type: "microsoft.resources/resourcegroups",
        icon: "/assets/img/azure/original/microsoft.resources/resourcegroups.svg",
      },
      {
        type: "microsoft.servicebus/namespaces",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/authorizationrules",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/authorizationrules.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/queues",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/queues.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/topics",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/topics.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/queues/authorizationrules",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/queues/authorizationrules.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/queues/subscriptions",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/queues/subscriptions.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/topics/authorizationrules",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/topics/authorizationrules.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/topics/subscriptions",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/topics/subscriptions.svg",
      },
      {
        type: "microsoft.servicebus/namespaces/topics/subscriptions/rules",
        icon: "/assets/img/azure/original/microsoft.servicebus/namespaces/topics/subscriptions/rules.svg",
      },
      {
        type: "microsoft.servicefabric/clusters",
        icon: "/assets/img/azure/original/microsoft.servicefabric/clusters.svg",
      },
      {
        type: "microsoft.sql/managedinstances",
        icon: "/assets/img/azure/original/microsoft.sql/managedinstances.svg",
      },
      {
        type: "microsoft.sql/servers",
        icon: "/assets/img/azure/original/microsoft.sql/servers.svg",
      },
      {
        type: "microsoft.sql/managedinstances/databases",
        icon: "/assets/img/azure/original/microsoft.sql/managedinstances/databases.svg",
      },
      {
        type: "microsoft.sql/servers/advisors",
        icon: "/assets/img/azure/original/microsoft.sql/servers/advisors.svg",
      },
      {
        type: "microsoft.sql/servers/auditingpolicies",
        icon: "/assets/img/azure/original/microsoft.sql/servers/auditingpolicies.svg",
      },
      {
        type: "microsoft.sql/servers/auditingsettings",
        icon: "/assets/img/azure/original/microsoft.sql/servers/auditingsettings.svg",
      },
      {
        type: "microsoft.sql/servers/databases",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases.svg",
      },
      {
        type: "microsoft.sql/servers/firewallrules",
        icon: "/assets/img/azure/original/microsoft.sql/servers/firewallrules.svg",
      },
      {
        type: "microsoft.sql/servers/vulnerabilityassessments",
        icon: "/assets/img/azure/original/microsoft.sql/servers/vulnerabilityassessments.svg",
      },
      {
        type: "microsoft.sql/servers/databases/advisors",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases/advisors.svg",
      },
      {
        type: "microsoft.sql/servers/databases/auditingpolicies",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases/auditingpolicies.svg",
      },
      {
        type: "microsoft.sql/servers/databases/auditingsettings",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases/auditingsettings.svg",
      },
      {
        type: "microsoft.sql/servers/databases/transparentdataencryption",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases/transparentdataencryption.svg",
      },
      {
        type: "microsoft.sql/servers/databases/vulnerabilityassessments",
        icon: "/assets/img/azure/original/microsoft.sql/servers/databases/vulnerabilityassessments.svg",
      },
      {
        type: "microsoft.storage/storageaccounts",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts.svg",
      },
      {
        type: "microsoft.storage/storageaccounts/blobservices",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts/blobservices.svg",
      },
      {
        type: "microsoft.storage/storageaccounts/blobservices/containers",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts/blobservices/containers.svg",
      },
      {
        type: "microsoft.storage/storageaccounts/fileservices/shares",
        icon: "/assets/img/azure/original/microsoft.storage/storageaccounts/fileservices/shares.svg",
      },
      {
        type: "microsoft.web/apiapp",
        icon: "/assets/img/azure/original/microsoft.web/apiapp.svg",
      },
      {
        type: "microsoft.web/certificates",
        icon: "/assets/img/azure/original/microsoft.web/certificates.svg",
      },
      {
        type: "microsoft.web/connections",
        icon: "/assets/img/azure/original/microsoft.web/connections.svg",
      },
      {
        type: "microsoft.web/functionapp",
        icon: "/assets/img/azure/original/microsoft.web/functionapp.svg",
      },
      {
        type: "microsoft.web/hostingenvironments",
        icon: "/assets/img/azure/original/microsoft.web/hostingenvironments.svg",
      },
      {
        type: "microsoft.web/mobileapp",
        icon: "/assets/img/azure/original/microsoft.web/mobileapp.svg",
      },
      {
        type: "microsoft.web/serverfarms",
        icon: "/assets/img/azure/original/microsoft.web/serverfarms.svg",
      },
      {
        type: "microsoft.web/serverfarmslinux",
        icon: "/assets/img/azure/original/microsoft.web/serverfarmslinux.svg",
      },
      {
        type: "microsoft.web/sites",
        icon: "/assets/img/azure/original/microsoft.web/sites.svg",
      },
      {
        type: "microsoft.web/sites/config",
        icon: "/assets/img/azure/original/microsoft.web/sites/config.svg",
      },
      {
        type: "microsoft.web/sites/deployments",
        icon: "/assets/img/azure/original/microsoft.web/sites/deployments.svg",
      },
      {
        type: "microsoft.web/sites/extensions",
        icon: "/assets/img/azure/original/microsoft.web/sites/extensions.svg",
      },
      {
        type: "microsoft.web/sites/hostnamebindings",
        icon: "/assets/img/azure/original/microsoft.web/sites/hostnamebindings.svg",
      },
      {
        type: "microsoft.web/sites/siteextensions",
        icon: "/assets/img/azure/original/microsoft.web/sites/siteextensions.svg",
      },
      {
        type: "microsoft.web/sites/slots",
        icon: "/assets/img/azure/original/microsoft.web/sites/slots.svg",
      },
      {
        type: "microsoft.web/sites/sourcecontrols",
        icon: "/assets/img/azure/original/microsoft.web/sites/sourcecontrols.svg",
      },
      {
        type: "microsoft.web/sites/slots/deployments",
        icon: "/assets/img/azure/original/microsoft.web/sites/slots/deployments.svg",
      },
    ],
  },
  layout: [
    {
      name: "ARM",
      items: [
        {
          type: "default",
          diagramprimitive: "item",
        },
        {
          type: "microsoft.compute/virtualmachines/extensions",
          diagramprimitive: "hidden",
        },
        {
          type: "microsoft.compute/disks",
          diagramprimitive: "hidden",
        },
      ],
    },
    {
      name: "Governance",
      items: [
        {
          type: "ManagementGroup",
          diagramprimitive: "box",
          parent: {
            queryType: "field",
            query: "TreeParentID",
          },
        },
        {
          type: "microsoft.resources/subscriptions",
          diagramprimitive: "box",
          parent: {
            queryType: "field",
            query: "TreeParentID",
          },
        },
        {
          type: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "box",
          parent: {
            queryType: "field",
            query: "TreeParentID",
          },
        },
        {
          type: "default",
          diagramprimitive: "item",
          parent: {
            queryType: "field",
            query: "TreeParentID",
          },
        },
        {
          type: "microsoft.operationalinsights/workspaces/savedsearches",
          diagramprimitive: "hidden",
        },
        {
          type: "microsoft.storage/storageaccounts/queueservices",
          diagramprimitive: "hidden",
        },
        {
          type: "microsoft.storage/storageaccounts/tableservices",
          diagramprimitive: "hidden",
        },
        {
          type: "microsoft.storage/storageaccounts/blobservices",
          diagramprimitive: "hidden",
        },
        {
          type: "microsoft.storage/storageaccounts/fileservices",
          diagramprimitive: "hidden",
        },
      ],
    },
    {
      name: "Network",
      items: [
        {
          type: "microsoft.resources/subscriptions",
          diagramprimitive: "box",
        },
        {
          type: "microsoft.resources/subscriptions/resourcegroups",
          diagramprimitive: "subitem",
        },
        {
          type: "default",
          diagramprimitive: "item",
        },
      ],
    },
  ],
  overlay: [
    { name: "Security" },
    { name: "Reliability" },
    { name: "Cost" },
    { name: "Performance" },
    { name: "Latency" },
  ],
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    getSettings() {},
    setSettings(state, action) {
      const settingsData = action.payload;
      return [...state, ...settingsData];
    },
    setCurrentLayout(state, action) {
      return {
        ...state,
        diagram: {
          ...state.diagram,
          CurrentLayout: action.payload,
        },
      };
    },
  },
});

export const { getSettings, setSettings, setCurrentLayout } =
  settingsSlice.actions;

export default settingsSlice.reducer;
