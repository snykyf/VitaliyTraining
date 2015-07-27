footballApp.controller('TeamsViewCtrl', ['$scope', 'dataService', function ($scope, dataService) {
    dataService.getTeams().then(function(teamList){
        $scope.teamList = teamList;
	});
}]);