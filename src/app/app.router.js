

export default /*@ngInject*/function ($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('app', {
        abstract: true,
        /*@ngInject*/
        templateProvider: ($q) => {

            let promise = $q((resolve) => {
                require.ensure([], () => {
                    resolve(require('./index.html'));
                });
            });

            return promise;
        },
        //template: require('./index.html'),
        controller: 'AppController',
        controllerAs: 'app',
        resolve: {
            /*@ngInject*/
            load: ($q, $ocLazyLoad) => {
                let promise = $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./app.controller');
                        $ocLazyLoad.load({ name: module.name }).then(()=>{
                            resolve();
                        });
                    });
                });

                return promise;
            }
        }
    });

}