
export default /*@ngInject*/($stateProvider) => {
    $stateProvider.state('app.about', {
        url: '/about',
        /*@ngInject*/
        templateProvider: ($q) => {
            let promise = $q((resolve) => {
                require.ensure([], () => {
                    resolve(require('./index.html'));
                });
            });

            return promise;
        },
        controller: 'AboutController',
        controllerAs: 'about',
        resolve: {
            load: /*@ngInject*/($q, $ocLazyLoad) => {
                let aboutControllerPromise = $q((resolve) => {
                    require.ensure([], () => {
                        let module = require('./about.controller');
                        $ocLazyLoad.load({ name: module.name }).then(()=>{
                            resolve();
                        });
                    });
                });

                let reverseFilterPromise = $q((resolve) => {
                    require.ensure([], () => {

                        $ocLazyLoad.load({ name: require('../../shared/reverse/reverse.filter').name }).then(()=>{
                            resolve();
                        });
                    });
                });

                return $q.all([aboutControllerPromise, reverseFilterPromise]);
            }

        }
    });

};