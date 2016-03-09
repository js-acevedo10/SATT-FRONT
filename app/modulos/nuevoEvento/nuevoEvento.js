'use strict';

angular.module('myApp.nuevoEvento', ['ngRoute'])

.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider.when('/nuevoEvento', {
        templateUrl: 'modulos/nuevoEvento/nuevoEvento.html',
        controller: 'NuevoEventoCtrl'
    });
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.controller('NuevoEventoCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.error = false;
    $scope.sent = false;
    $scope.formData = {};
    $scope.postForm = function () {
        $scope.processingForm = true;
        $http({
            method: 'POST',
            url: 'http://uniandes-satt.herokuapp.com/eventos',
            data: JSON.stringify($scope.form),
        }).then(function successCallback(response) {
            $scope.mensaje = response.data;
            if ($scope.mensaje.perfil === "Informativo") {
                $scope.classPerfil = "table-warning";
            }
        }, function errorCallback(response) {
            $scope.error = true;
            $scope.defError = response.data;
        }).finally(function () {
            $scope.processingForm = false;
            $scope.sent = true;
        });
    }
}]);