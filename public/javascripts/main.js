var myApp = angular.module('myApp',[]);

function FirstController($scope){
    $scope.emitText = function () {
        var socket = io.connect('http://kotobachat.herokuapp.com:3000');
        console.log("Emitiendo: "+$scope.data.message);
        socket.emit('emit',$scope.data.nickname+": "+$scope.data.message);
        $scope.chat.push("Yourself : "+$scope.data.message);
        $scope.data.message = "";
    };
    $scope.openConnect = function () {

        var socket = io.connect('http://kotobachat.herokuapp.com:3000');

        socket.on('received', function (data) {
            $scope.chat.push(data);
            $scope.$apply();
        });
    };
    $scope.chat = [];
}
myApp.directive('openC', function() {
    return {
        restrict: 'E',
        scope: {

            chat:"="
        },
        template: "",

        controller: 'FirstController',
        link: function (scope, element, attrs) {

            scope.openConnect();
        }
    };
});