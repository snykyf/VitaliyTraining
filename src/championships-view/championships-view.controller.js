footballApp.controller('ChampionshipsViewCtrl', ['$scope', 'DataService', function ($scope, DataService) {
	$scope.selectedChampionship = null;
	
    DataService.getChampionships().then(function(championshipList){
        $scope.championshipList = championshipList;
	});
	
	$scope.selectChampionship = function(championship) {
		$scope.selectedChampionship = championship;
	}
}]);