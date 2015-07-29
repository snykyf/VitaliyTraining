footballApp.directive('team', function() {
	return {
		restrict: 'E',
		templateUrl: 'team/team.html',
		replace: true,
		scope: {
			team: '='
		}
	}
})
