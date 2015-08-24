angular
	.module("footballApp")
	.controller('DashboardViewCtrl', ['$scope', 'DataService', function ($scope, DataService) {
		DataService.getStatistics().then(function(statistics){
			$scope.totalNumberOfTeams = statistics.totalNumberOfTeams;
			$scope.totalNumberOfChampionships = statistics.totalNumberOfChampionships;
			$scope.totalNumberOfMatches = statistics.totalNumberOfMatches;
		});
}]);