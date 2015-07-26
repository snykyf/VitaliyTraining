footballApp.directive('team', function() {
	return {
		restrict: 'E',
		templateUrl: '../dist/team/team.html',
		replace: true,
		scope: {
			data: '='
		}
	}
})
