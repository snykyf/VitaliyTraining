footballApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '../dist/teams-view/teams-view.html'
		})
		.state('about', {
			url: '/about',
			templateUrl: '../dist/teams-view/teams-view.html'
		});
}]);