angular.module("footballApp",["ui.router","ui.bootstrap"]);
angular.module("footballApp").config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/dashboard"),e.state("dashboard",{url:"/dashboard",templateUrl:"dashboard-view/dashboard-view.html"}).state("matches",{url:"/matches",templateUrl:"matches-view/matches-view.html",controller:"MatchesViewCtrl"}).state("teams",{url:"/teams",templateUrl:"teams-view/teams-view.html",controller:"TeamsViewCtrl"}).state("team",{url:"/teams/:teamId",templateUrl:"teams-view/team-view.html",controller:"TeamsViewCtrl"}).state("championships",{url:"/championships",templateUrl:"championships-view/championships-view.html",controller:"ChampionshipsViewCtrl"}).state("championship",{url:"/championships/:championshipsId",templateUrl:"championships-view/championship-view.html",controller:"ChampionshipsViewCtrl"})}]);
angular.module("footballApp").constant("RouteConstants",{championshipsUrl:"http://footballbet.com.ua/api/championships/",teamsUrl:"http://footballbet.com.ua/api/teams/",matchesUrl:"http://footballbet.com.ua/api/matches/",teamLogoUrl:"http://footballbet.com.ua/teams/embl/",championshipLogoUrl:"http://footballbet.com.ua/table/embl/"});
angular.module("footballApp").factory("DataService",["$http","$q","$filter","$cacheFactory","RouteConstants",function(e,t,r,n,a){var o,i={},s="teamsByCountry",h="teamKey",p="championshipsKey",l="matchesKey";return o=n("myCache"),i.getChampionships=function(){var r,n=t.defer();return r=o.get(p),r?n.resolve(r):e.get(a.championshipsUrl).then(function(e){var t=e.data.result;i.getTeams().then(function(e){for(var r=0;r<t.length;r++){for(var i=[],s=0;s<e.length;s++)e[s].id_championship===t[r].id_championship&&i.push(e[s]);t[r].teamList=i.slice(0),t[r].logoImage=a.championshipLogoUrl+t[r].image}o.put(p,t),n.resolve(t)})}),n.promise},i.getChampionshipById=function(e){var r=t.defer();return i.getChampionships().then(function(t){for(var n=0;n<t.length;n++)if(t[n].id_championship===e){r.resolve(t[n]);break}}),r.promise},i.getTeamById=function(e){var r=t.defer();return i.getTeams().then(function(t){for(var n=0;n<t.length;n++)if(t[n].id_teams===e){r.resolve(t[n]);break}}),r.promise},i.getTeams=function(){var r,n=t.defer();return r=o.get(h),r?n.resolve(r):e.get(a.teamsUrl).then(function(e){for(var t=e.data.result,r=0;r<t.length;r++)t[r].logoImage=a.teamLogoUrl+t[r].emblema;o.put(h,t),n.resolve(t)}),n.promise},i.getTeamsByCountry=function(){var e=t.defer(),r={};return i.getChampionships().then(function(t){for(var n=0;n<t.length;n++)r[t[n].name]=t[n].teamList;o.put(s,r),e.resolve(r)}),e.promise},i.findTeamsByQuery=function(e,t){var r,n={};if(r=o.get(s),r&&(e=r),!t)return e;t=t.toUpperCase();for(var a in e){for(var i=e[a],h=[],p=0;p<i.length;p++){var l,m;l=i[p].name.toUpperCase(),m=i[p].city.toUpperCase(),(m.indexOf(t)>=0||l.indexOf(t)>=0)&&h.push(i[p])}h.length&&(n[a]=h.slice(0))}return n},i.getMatches=function(){var r=t.defer(),n={};return n=o.get(l),n?r.resolve(n):e.get(a.matchesUrl).then(function(e){for(var t,n=e.data.result,a={},i=0;i<n.length;i++)t=n[i],a[t.title]=a[t.title]?a[t.title]:[],a[t.title].push(t);o.put(l,a),r.resolve(a)}),r.promise},i}]);
angular.module("footballApp").filter("html",["$sce",function(t){return function(l){return t.trustAsHtml(l)}}]);
angular.module("footballApp").directive("championship",function(){return{restrict:"E",templateUrl:"championship/championship.html",replace:!0,scope:{championshipModel:"="}}});
angular.module("footballApp").controller("ChampionshipsViewCtrl",["$scope","DataService","$stateParams",function(i,n,p){p.championshipsId?n.getChampionshipById(p.championshipsId).then(function(n){i.championship=n}):(i.selectedChampionship=null,n.getChampionships().then(function(n){i.championshipList=n}),i.selectChampionship=function(n){i.selectedChampionship=n})}]);
angular.module("footballApp").controller("MatchesViewCtrl",["$scope","DataService","$stateParams",function(t,a,e){e.championshipsId||a.getMatches().then(function(a){t.matchesListObj=a})}]);
angular.module("footballApp").directive("match",function(){return{restrict:"E",templateUrl:"match/match.html",replace:!0,scope:{matchModel:"="}}});
angular.module("footballApp").directive("team",function(){return{restrict:"E",templateUrl:"team/team.html",replace:!0,scope:{teamModel:"="}}});
angular.module("footballApp").controller("TeamsViewCtrl",["$scope","DataService","$stateParams",function(t,e,a){a.teamId?e.getTeamById(a.teamId).then(function(e){t.team=e}):(e.getTeamsByCountry().then(function(e){t.teamListObj=e}),t.$watch("query",function(a,n){t.teamListObj=e.findTeamsByQuery(t.teamListObj,a)}))}]);