footballApp.controller('TeamsViewCtrl', ['$scope', 'DataService', function ($scope, DataService) {
    DataService.getTeams().then(function(teamList){
        $scope.teamList = teamList;
	});
}]);