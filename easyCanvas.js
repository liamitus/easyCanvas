/**
 * Easy Canvas: The Angular-ready <canvas> element.
 *
 * Basically a wrapper for the HTML5 <canvas> tag to allow for easier access
 * within an Angular application.
 *
 * Author:      Liam Howell <liammm@gmail.com>
 * Version:     0.1
 * Since:       01-20-2015
 */

var app = angular.module('easyCanvas', []);

app.provider('easyCanvas', function EasyCanvasProvider() {

    var defaults = this.defaults = {
        context: '2d',
        appendTo: false
    };

    this.$get = ['$window', '$document', function($window, $document) {
        
        var $body = $document.find('body');
        var $canvas = null;
        var context = null;

        var privateMethods = {

            // Handles canvas creation and insertion into DOM.
            // Returns canvas selector.
            createCanvasElement: function (options) {
                $canvas = angular.element('<canvas></canvas>');
                context = $canvas[0].getContext(options.context);
                $canvasParent = options.appendTo || $body;
                $canvasParent.append($canvas);
                return $canvas;
            } 
        };

        var publicMethods = {

            // Creates a new canvas element and returns it.
            create: function (options) {
                var opts = angular.copy(defaults);
                options = options || {};
                angular.extend(opts, options);
                return privateMethods.createCanvasElement(opts);
            },

            // Calls the given draw function, passing in $context and $canvas.
            draw: function (drawFunction) {
                drawFunction(context, $canvas);
            },

            // Getter for the default values of easyCanvas.
            getDefaults: function () {
                return defaults;
            }

        };

        return publicMethods;
    }];

});

app.directive('easyCanvas', ['easyCanvas', function (easyCanvas) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            var defaults = easyCanvas.getDefaults();
            easyCanvas.create({
                context: attrs.context ? attrs.context : defaults.context,
                appendTo: element
            });
        }
    };
}]);

// TODO Move this to it's own module.
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
