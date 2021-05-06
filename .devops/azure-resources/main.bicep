param profiles_mdedit_cdn_name string = 'mdedit-cdn'
param storageAccounts_mdeditor_name string = 'mdeditor'

resource profiles_mdedit_cdn_name_resource 'Microsoft.Cdn/profiles@2020-09-01' = {
  name: profiles_mdedit_cdn_name
  location: 'Global'
  sku: {
    name: 'Standard_Microsoft'
  }
  properties: {}
}

resource storageAccounts_mdeditor_name_resource 'Microsoft.Storage/storageAccounts@2021-01-01' = {
  name: storageAccounts_mdeditor_name
  location: 'eastus'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  kind: 'StorageV2'
  properties: {
    azureFilesIdentityBasedAuthentication: {
      directoryServiceOptions: 'None'
    }
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: false
    encryption: {
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource profiles_mdedit_cdn_name_mdedit 'Microsoft.Cdn/profiles/endpoints@2020-09-01' = {
  name: '${profiles_mdedit_cdn_name_resource.name}/mdedit'
  location: 'Global'
  properties: {
    originHostHeader: 'mdeditor.z13.web.core.windows.net'
    contentTypesToCompress: [
      'application/eot'
      'application/font'
      'application/font-sfnt'
      'application/javascript'
      'application/json'
      'application/opentype'
      'application/otf'
      'application/pkcs7-mime'
      'application/truetype'
      'application/ttf'
      'application/vnd.ms-fontobject'
      'application/xhtml+xml'
      'application/xml'
      'application/xml+rss'
      'application/x-font-opentype'
      'application/x-font-truetype'
      'application/x-font-ttf'
      'application/x-httpd-cgi'
      'application/x-javascript'
      'application/x-mpegurl'
      'application/x-opentype'
      'application/x-otf'
      'application/x-perl'
      'application/x-ttf'
      'font/eot'
      'font/ttf'
      'font/otf'
      'font/opentype'
      'image/svg+xml'
      'text/css'
      'text/csv'
      'text/html'
      'text/javascript'
      'text/js'
      'text/plain'
      'text/richtext'
      'text/tab-separated-values'
      'text/xml'
      'text/x-script'
      'text/x-component'
      'text/x-java-source'
    ]
    isCompressionEnabled: true
    isHttpAllowed: true
    isHttpsAllowed: true
    queryStringCachingBehavior: 'IgnoreQueryString'
    origins: [
      {
        name: 'mdeditor-z13-web-core-windows-net'
        properties: {
          hostName: 'mdeditor.z13.web.core.windows.net'
          httpPort: 80
          httpsPort: 443
          originHostHeader: 'mdeditor.z13.web.core.windows.net'
          priority: 1
          weight: 1000
          enabled: true
        }
      }
    ]
    originGroups: []
    geoFilters: []
    urlSigningKeys: []
  }
}

resource storageAccounts_mdeditor_name_default 'Microsoft.Storage/storageAccounts/blobServices@2021-01-01' = {
  name: '${storageAccounts_mdeditor_name_resource.name}/default'
  properties: {
    cors: {
      corsRules: []
    }
    deleteRetentionPolicy: {
      enabled: true
      days: 7
    }
    isVersioningEnabled: false
    changeFeed: {
      enabled: false
    }
    restorePolicy: {
      enabled: false
    }
  }
}

resource Microsoft_Storage_storageAccounts_fileServices_storageAccounts_mdeditor_name_default 'Microsoft.Storage/storageAccounts/fileServices@2021-01-01' = {
  name: '${storageAccounts_mdeditor_name_resource.name}/default'
  sku: {
    name: 'Standard_LRS'
    tier: 'Standard'
  }
  properties: {
    protocolSettings: {
      smb: {}
    }
    cors: {
      corsRules: []
    }
    shareDeleteRetentionPolicy: {
      enabled: true
      days: 7
    }
  }
}

resource Microsoft_Storage_storageAccounts_queueServices_storageAccounts_mdeditor_name_default 'Microsoft.Storage/storageAccounts/queueServices@2021-01-01' = {
  name: '${storageAccounts_mdeditor_name_resource.name}/default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource Microsoft_Storage_storageAccounts_tableServices_storageAccounts_mdeditor_name_default 'Microsoft.Storage/storageAccounts/tableServices@2021-01-01' = {
  name: '${storageAccounts_mdeditor_name_resource.name}/default'
  properties: {
    cors: {
      corsRules: []
    }
  }
}

resource profiles_mdedit_cdn_name_mdedit_www_mdedit_io 'Microsoft.Cdn/profiles/endpoints/customdomains@2020-09-01' = {
  name: '${profiles_mdedit_cdn_name_mdedit.name}/www-mdedit-io'
  properties: {
    hostName: 'www.mdedit.io'
  }
  dependsOn: [
    profiles_mdedit_cdn_name_resource
  ]
}

resource profiles_mdedit_cdn_name_mdedit_mdeditor_z13_web_core_windows_net 'Microsoft.Cdn/profiles/endpoints/origins@2020-09-01' = {
  name: '${profiles_mdedit_cdn_name_mdedit.name}/mdeditor-z13-web-core-windows-net'
  properties: {
    hostName: 'mdeditor.z13.web.core.windows.net'
    httpPort: 80
    httpsPort: 443
    originHostHeader: 'mdeditor.z13.web.core.windows.net'
    priority: 1
    weight: 1000
    enabled: true
  }
  dependsOn: [
    profiles_mdedit_cdn_name_resource
  ]
}

resource storageAccounts_mdeditor_name_default_web 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-01-01' = {
  name: '${storageAccounts_mdeditor_name_default.name}/$web'
  properties: {
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'Blob'
  }
  dependsOn: [
    storageAccounts_mdeditor_name_resource
  ]
}
