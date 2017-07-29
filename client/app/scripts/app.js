var app = angular.module('ContactApp', []);

app.controller('ContactCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.baseUrl = 'http://localhost:3000/api'; 
    
    $scope.compName = 'Welcome to Caratlane!';
    $scope.techName = 'MEAN stack (Mongo, Express, Angular & Node) Application';

    $scope.saveUser = function submitUser() {
        console.log($scope.user);
        $http({
            method: 'POST',
            url: $scope.baseUrl +'/user',
            data: $scope.user,
            headers: {'Content-Type': 'application/json'}
        }).then(function(response) {
            console.log(response.data);
            $scope.users.push(response.data);initUser();
        }, function(error) {
            initUser(); 
        });
    };

    $scope.deleteUser = function deleteUser(id) {
        $http({
            method: 'DELETE',
            url: $scope.baseUrl +'/user/'+id
        }).then(function(response) {
            var toDeleteIndex = $scope.users.map(function(user) {
                return user._id
            }).indexOf(id);

            $scope.users.splice(toDeleteIndex, 1);
        });
    };

    var initUser  = function initUser() {
        $scope.user = {
            name: '',
            email: '',
            message: ''
        };
    };

    var init = function init() {

        initUser();
        $scope.users = [];
        $http({
            method: 'GET',
            url: $scope.baseUrl +'/users'
        }).then(function(response) {
            $scope.users = response.data;
        });
    };

    init();
}]);
