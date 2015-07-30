footballApp.controller('TeamsViewCtrl', ['$scope', 'DataService', '$stateParams', function ($scope, DataService, $stateParams) {
    //show specific team
	if ($stateParams.teamId) {
		DataService.getTeamById($stateParams.teamId).then(function(team){	
			$scope.team = team;
		});		
	}//or list of all available teams
	else {
		DataService.getTeamsByCountry().then(function(teamListObj){
			$scope.teamListObj = teamListObj;
		});
		
		$scope.$watch('query', function(newVal, oldVal) {
			$scope.teamListObj = DataService.getTeamsByNameOrCountry(newVal);
		});
	}
	
}]);