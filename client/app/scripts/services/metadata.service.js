'use strict';

app.service('MetadataService', ['$http',
    function($http) {
        this.getMetadata = function getMetadata() {
            return $http.get('data/metadata.json');
        };
    }
]);
