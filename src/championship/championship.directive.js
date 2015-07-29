footballApp.directive('championship', function() {
	return {
		restrict: 'E',
		templateUrl: 'championship/championship.html',
		replace: true,
		scope: {
			championship: '='
		}
	}
})
