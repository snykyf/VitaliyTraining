angular
	.module("footballApp")
	.factory('DataService', ['$http', '$q', '$filter', '$cacheFactory', 'RouteConstants', function($http, $q, $filter, $cacheFactory, RouteConstants){
	var dataObj = {},
		teamsByCountryKey = 'teamsByCountry',
		teamsKey = "teamKey",
		championshipsKey = "championshipsKey",
		matchesKey = "matchesKey",
		cache;

	cache = $cacheFactory('myCache');

	dataObj.getChampionships = function () {
	    var deferred = $q.defer(), data;

		data = cache.get(championshipsKey);
		if (data) {
			deferred.resolve(data);
		}
		else {
			$http.get(RouteConstants.championshipsUrl).then(function(response) {
				var championshipList = response.data.result;

				dataObj.getTeams().then(function(teamList) {
					for (var j = 0; j < championshipList.length; j++) {
						var arr = [];
						for (var i = 0; i < teamList.length; i++) {
							if (teamList[i].id_championship === championshipList[j].id_championship) {
								arr.push(teamList[i]);
							}
						}
						championshipList[j].teamList = arr.slice(0);
						championshipList[j].logoImage = RouteConstants.championshipLogoUrl + championshipList[j].image;
					}
					cache.put(championshipsKey, championshipList);
					deferred.resolve(championshipList);
				});
			});
		};

	    return deferred.promise;
	}

	dataObj.getChampionshipById = function (championshipId) {
	    var deferred = $q.defer();

	    dataObj.getChampionships().then(function(championshipList){
			for(var i = 0; i < championshipList.length; i++) {
				if (championshipList[i].id_championship === championshipId) {
					deferred.resolve(championshipList[i]);
					break;
				}
			}
		})

	    return deferred.promise;
	}

	dataObj.getTeamById = function (teamId) {
	    var deferred = $q.defer();

	    dataObj.getTeams().then(function(teamList){
			for(var i = 0; i < teamList.length; i++) {
				if (teamList[i].id_teams === teamId) {
					deferred.resolve(teamList[i]);
					break;
				}
			}
		})

	    return deferred.promise;
	}

	dataObj.getTeams = function() {
		var deferred = $q.defer(), data;

		data = cache.get(teamsKey);
			if (data) {
				deferred.resolve(data);
			}
			else {
				$http.get(RouteConstants.teamsUrl).then(function(response) {
					var teamList = response.data.result;

					for (var j = 0; j < teamList.length; j++) {
						teamList[j].logoImage = RouteConstants.teamLogoUrl + teamList[j].emblema;
					}
					cache.put(teamsKey, teamList);
					deferred.resolve(teamList);
				});
			}

			 return deferred.promise;
		}

		dataObj.getTeamsByCountry = function() {
			var deferred = $q.defer(), obj = {};

			dataObj.getChampionships().then(function(championshipList){

				for (var i = 0; i <  championshipList.length; i++) {
					obj[championshipList[i].name] = championshipList[i].teamList;
				}

				cache.put(teamsByCountryKey, obj);
				deferred.resolve(obj);
			});

			return deferred.promise;
		}

		dataObj.findTeamsByQuery = function(teamListObj, query) {
			var newObj = {}, data;

			data = cache.get(teamsByCountryKey);

			if (data) {
				teamListObj = data;
			}

			if (!query) return teamListObj;

			query = query.toUpperCase();

			for(var country in teamListObj) {
				var teamList = teamListObj[country],
					output = [];

				for(var j = 0; j < teamList.length; j++){
					var name, city;

					name = teamList[j].name.toUpperCase(),
					city = teamList[j].city.toUpperCase();

					if (city.indexOf(query) >= 0 || name.indexOf(query) >= 0) {
						output.push(teamList[j]);
					}
				}

				if (output.length) {
					newObj[country] = output.slice(0);
				}
			}

			return newObj;
		}

		dataObj.getMatches = function() {
			var deferred = $q.defer(), data = {};

			data = cache.get(matchesKey);
			if (data) {
				deferred.resolve(data);
			}
			else {
				$http.get(RouteConstants.matchesUrl).then(function(response) {
					var matchList = response.data.result,
						matchListObj = {}, match;

					for(var j = 0; j < matchList.length; j++) {
						match = matchList[j];

						matchListObj[match.title] = matchListObj[match.title] ? matchListObj[match.title] : [];
						matchListObj[match.title].push(match);
					}

					cache.put(matchesKey, matchListObj);
					deferred.resolve(matchListObj);
				});
			}

			return deferred.promise;
		}


		return dataObj;
}]);

