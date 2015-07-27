footballApp.factory('dataService',['$http', '$q', '$filter', function($http, $q, $filter){
	var dataObj = {},
		championshipsUrl = "http://footballbet.com.ua/api/championships/",
		teamsUrl = "http://footballbet.com.ua/api/teams/",
		matchesUrl = "http://footballbet.com.ua/api/matches/";

	dataObj.getChampionships = function () {
	    var deferred = $q.defer();

	    $http.get(championshipsUrl).then(function (response1) {
	        $http.get(teamsUrl).then(function (response2) {
	            var championshipList = response1.data.result,
	                teamList = response2.data.result;

                for (var j = 0; j < championshipList.length; j++) {
	                championshipList[j].teamList = $filter('filter')(teamList, { "id_championship": championshipList[j].id_championship });
	            }

	            deferred.resolve(championshipList);
	        });
	    });

	    return deferred.promise;
	}

	dataObj.getTeams = function() {
		var deferred = $q.defer();
		
	    $http.get(teamsUrl).then(function(response){
			var teamList = response.data.result,
				teamListObj = {};
			
			 for (var j = 0; j < teamList.length; j++) {
				//if (teamList[j].
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

