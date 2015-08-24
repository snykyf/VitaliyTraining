angular
	.module("footballApp")
	.directive('match', function() {
		return {
			restrict: 'E',
			templateUrl: 'match/match.html',
			replace: true,
			scope: {
				matchModel: '='
			}
		}
})
