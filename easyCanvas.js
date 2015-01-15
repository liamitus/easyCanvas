/**
 * Easy Canvas: The Angular-ready <canvas> element.
 *
 * Basically a wrapper for the HTML5 <canvas> tag to allow for easier access
 * within an Angular application.
 *
 * Author:      Liam Howell <liammm@gmail.com>
 * Version:     0.1
 * Since:       01-15-2015
 */

var app = angular.module('easyCanvas', []);

app.directive('easyCanvas', function () {
    return {
        restrict: 'E',
        template: '<canvas></canvas>',
        link: function (scope, element, attrs) {
            var type = '2d';
            var context = element[0].firstChild.getContext('2d');

        }
    };
});

app.directive('fullscreen', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.css('position', 'absolute');

            scope.onResize = function () {
                element.css('height', $window.innerHeight + 'px');
                element.css('width', $window.innerWidth + 'px');
            };
            scope.onResize();

            angular.element($window).bind('resize', function () {
                scope.onResize();
                scope.$apply();
            });
        }
    };
}]);
