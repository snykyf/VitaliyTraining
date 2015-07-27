footballApp.controller('ChampionshipsViewCtrl', ['$scope', 'dataService', function ($scope, dataService) {
	$scope.selectedChampionship = null;
	
    dataService.getChampionships().then(function(championshipList){
        $scope.championshipList = championshipList;
	});
	
	$scope.selectChampionship = function(c, e) {
		$scope.selectedChampionship = c;		
	}
}]);