angular
	.module("footballApp")
	.controller('MatchesViewCtrl', ['$scope', 'DataService', function ($scope, DataService) {
		DataService.getMatches().then(function(matchesListObj){
			$scope.matchesListObj = matchesListObj;
		});
}]);
