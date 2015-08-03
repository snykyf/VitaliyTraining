angular
	.module("footballApp")
	.controller('MatchesViewCtrl', ['$scope', 'DataService', '$stateParams', function ($scope, DataService, $stateParams) {
		//show specific match
		if ($stateParams.championshipsId) {
			;
		}//or list of all available matches
		else {
			DataService.getMatches().then(function(matchesListObj){
				$scope.matchesListObj = matchesListObj;
			});
		}
}]);
