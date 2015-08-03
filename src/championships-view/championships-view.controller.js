angular
	.module("footballApp")
	.controller('ChampionshipsViewCtrl', ['$scope', 'DataService', '$stateParams', function ($scope, DataService, $stateParams) {
		//show specific championship
		if ($stateParams.championshipsId) {
			DataService.getChampionshipById($stateParams.championshipsId).then(function(championship){
				$scope.championship = championship;
			});

		}//or list of all available championships
		else {
			$scope.selectedChampionship = null;

			DataService.getChampionships().then(function(championshipList){
				$scope.championshipList = championshipList;
			});

			$scope.selectChampionship = function(championship) {
				$scope.selectedChampionship = championship;
			}
		}
}]);