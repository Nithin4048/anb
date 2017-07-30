'use strict';

app.controller('PropertyEditorController', ['$scope', 'appConst', 'MetadataService', function($scope, appConst, MetadataService) {

    /*
        Initialize method
    */
    var init = function init() {
        $scope.companyName = 'Welcome to ANB Systems!';
        $scope.heading = 'Property Editor Control';
        $scope.appConst = appConst;
        getMetadata();
    };

    /*
        Fetching metadata from a mock json file
    */
    var getMetadata = function getMetadata() {
        MetadataService.getMetadata().then(function(response) {
            console.log(response.data);
            $scope.metaData = response.data;
        }, function(error) {
            console.log('Error in accessing mock API');
        });
    };

    init();
}]);
