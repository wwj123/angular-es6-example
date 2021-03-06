
export default /*@ngInject*/ ($stateProvider) => {
    $stateProvider.state('app.home', {
        url: '/',
        /*@ngInject*/
        templateProvider: ($q) => {
            return $q((resolve) => {
                require.ensure([], () => {
                    resolve(require('./index.html'));
                });
            });
        },
        controller: 'HomeController',
        controllerAs: 'home',
        resolve: {
            /*@ngInject*/
            load: ($q, $ocLazyLoad) => {
                let promise = $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./home.controller');
                        $ocLazyLoad.load({ name: module.name }).then(() => {
                            resolve();
                        });
                    });
                });

                return promise;
            }
        }
    });

};