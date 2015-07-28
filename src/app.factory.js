footballApp.factory('DataService', ['$http', '$q', '$filter', 'RouteConstants', function($http, $q, $filter, RouteConstants){
	var dataObj = {};

	dataObj.getChampionships = function () {
	    var deferred = $q.defer();

	    $http.get(RouteConstants.championshipsUrl).then(function (response) {
			var championshipList = response.data.result;

			$http.get(RouteConstants.teamsUrl).then(function (response) {
	            var teamList = response.data.result;

				for(var i = 0; i < teamList.length; i++) {
					teamList[i].logoImage = RouteConstants.teamLogoUrl + teamList[i].emblema;
				}

                for (var j = 0; j < championshipList.length; j++) {
	                championshipList[j].teamList = $filter('filter')(teamList, { "id_championship": championshipList[j].id_championship });
					championshipList[j].logoImage = RouteConstants.championshipLogoUrl + championshipList[j].image;
	            }
				console.log(championshipList)
	            deferred.resolve(championshipList);
	        });
	    });

	    return deferred.promise;
	}

	dataObj.getTeams = function() {
		var deferred = $q.defer();
		
	    $http.get(RouteConstants.teamsUrl).then(function(response){
			var teamList = response.data.result,
				teamListObj = {};
			
			 for (var j = 0; j < teamList.length; j++) {
				 teamList[j].logoImage = RouteConstants.teamLogoUrl + teamList[j].emblema;
			 }			
			 
			 deferred.resolve(teamList);
		});
		
		 return deferred.promise;
	}

	dataObj.getMatches = function() {
	    return $http.get(matchesUrl);
	}

	return dataObj;
}]);

