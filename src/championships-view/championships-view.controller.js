footballApp.controller('ChampionshipViewCtrl', ['$scope', 'dataService', function ($scope, dataService) {
    dataService.getChampionships().then(function(championshipList){
        $scope.championshipList = championshipList;
        console.log(championshipList);
		});
}]);