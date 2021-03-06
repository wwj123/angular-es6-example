import angular from 'angular';
import 'angular-route';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'oclazyload';

import HomeModule from './components/home/home.module';
import AboutModule from './components/about/about.module';

import SharedModule from './shared/shared.module';

import AppConfig from './app.config';

import router from './app.router';

export default angular.module('app', [
    'ngRoute', 'ui.router', 'oc.lazyLoad', 'ui.bootstrap',
    HomeModule.name, AboutModule.name,
    SharedModule.name
])
.constant('appConfig', AppConfig)
.config(router)
.run(/*@ngInject*/($rootScope, appConfig)=>{
    
    $rootScope.appConfig = appConfig;
    
});