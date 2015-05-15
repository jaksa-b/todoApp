angular.module('todoApp', [

])
.controller('MainCtrl', function ($scope, $http) {
        $scope.formData = {};

        // get all todos and show them
        $http.get('/api/todos')
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
        // send the text to the node API
        $scope.createTodo = function () {
            $http.post('/api/todos', $scope.formData)
                .success(function (data) {
                    $scope.formData = {};
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        };
        // delete a to do 
        $scope.deleteTodo = function (id) {
            $http.delete('/api/todos/' + id)
                .success(function (data) {
                    $scope.todos = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error:' + data);
                });
        }

    });