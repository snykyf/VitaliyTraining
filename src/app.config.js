footballApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
		.state('dashboard', {
			url: '/dashboard',
			templateUrl: 'dashboard-view/dashboard-view.html'
		})
		.state('matches', {
			url: '/matches',
			templateUrl: 'matches-view/matches-view.html'
		})
		.state('teams', {
			url: '/teams',
			templateUrl: 'teams-view/teams-view.html',
			controller: 'TeamsViewCtrl'
		})
		.state('championships', {
			url: '/championships',
			templateUrl: 'championships-view/championships-view.html',
			controller: 'ChampionshipsViewCtrl'
		});
}]);