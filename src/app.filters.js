angular
	.module("footballApp")
	.filter('html', ['$sce', function($sce) {
		return function(val) {
			return $sce.trustAsHtml(val);
		};
}]);
