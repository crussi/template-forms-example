var createServiceConfiguration;

createServiceConfiguration = function(service, clientId, secret) {
    var config;
    ServiceConfiguration.configurations.remove({
        service: service
    });
    config = {
        generic: {
            service: service,
            clientId: clientId,
            secret: secret
        },
        facebook: {
            service: service,
            appId: clientId,
            secret: secret
        },
        twitter: {
            service: service,
            consumerKey: clientId,
            secret: secret
        }
    };
    switch (service) {
        case 'facebook':
            return ServiceConfiguration.configurations.insert(config.facebook);
        case 'twitter':
            return ServiceConfiguration.configurations.insert(config.twitter);
        default:
            return ServiceConfiguration.configurations.insert(config.generic);
    }
};

createServiceConfiguration('google', '937484174984-udu5l6ovmq7c9t88mo2mchisvsrgpstu.apps.googleusercontent.com', 'DJWJ17_WPiPuR3vGyrd1AxIg')