angular
	.module("footballApp")
	.controller('TeamsViewCtrl', ['$scope', 'DataService', '$stateParams', function ($scope, DataService, $stateParams) {
		//show specific team
		if ($stateParams.teamId) {
			DataService.getTeamById($stateParams.teamId).then(function(team){
				$scope.team = team;
			});
		}//or list of all available teams
		else {
			$scope.reverse = true;

			DataService.getTeamsByCountry().then(function(teamListObj){
				$scope.teamListObj = teamListObj;
			});

			$scope.sortTeamList = function() {
				$scope.teamListObj = DataService.sortTeamList($scope.teamListObj, 'name', $scope.reverse);
				$scope.reverse = !$scope.reverse;
			}

			/* TODO: replace watch with html filter */
			$scope.$watch('query', function(newVal, oldVal) {
				$scope.teamListObj = DataService.findTeamsByQuery($scope.teamListObj, newVal);
			});
		}
}]);