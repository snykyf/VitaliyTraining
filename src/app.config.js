footballApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: '../dist/dashboard-view/dashboard-view.html'
		})
		.state('matches', {
			url: '/matches',
			templateUrl: '../dist/matches-view/matches-view.html'
		})
		.state('teams', {
			url: '/teams',
			templateUrl: '../dist/teams-view/teams-view.html',
			controller: 'TeamsViewCtrl'
		})
		.state('championships', {
			url: '/championships',
			templateUrl: '../dist/championships-view/championships-view.html',
			controller: 'ChampionshipsViewCtrl'
		});
}]);