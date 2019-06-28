(function($app) {
    var labelMapping = {
        'balanceMismatch': 'End Balance Mismatch',
        'duplicateRecord': 'Duplicate Transactions'
    };
    /**
     * filter which return label for key to display in view.
     */
    $app.filter('labelMap', function() {
        return function(input) {
            if (input) {
                return labelMapping[input];
            }
            return undefined;
        };
    });
})(angular.module('myApp.upload'));
