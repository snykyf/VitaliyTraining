footballApp.directive('championship', function() {
	return {
		restrict: 'E',
		templateUrl: '../dist/championship/championship.html',
		replace: true,
		scope: {
			data: '='
		}
	}
})
