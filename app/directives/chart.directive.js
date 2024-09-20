(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .directive('linechart', chartJS('Line'))
        .directive('barchart', chartJS('Bar'))
        .directive('radarchart', chartJS('Radar'))
        .directive('polarchart', chartJS('PolarArea'))
        .directive('piechart', chartJS('Pie'))
        .directive('doughnutchart', chartJS('Doughnut'))
        .directive('donutchart', chartJS('Doughnut'));

    function chartJS(type) {
        return function() {
            return {
                restrict: 'A',
                scope: {
                    data: '=',
                    options: '=',
                    id: '@',
                    width: '=',
                    height: '=',
                    resize: '=',
                    chart: '@',
                    segments: '@',
                    responsive: '=',
                    tooltip: '=',
                    legend: '='
                },
                link: function ($scope, $elem) {
                    var ctx = $elem[0].getContext('2d');
                    var autosize = false;
                    var chartCreated;

                    $scope.size = function () {
                        if ($scope.width <= 0) {
                            $elem.width($elem.parent().width());
                            ctx.canvas.width = $elem.width();
                        } else {
                            ctx.canvas.width = $scope.width || ctx.canvas.width;
                            autosize = true;
                        }

                        if ($scope.height <= 0) {
                            $elem.height($elem.parent().height());
                            ctx.canvas.height = ctx.canvas.width / 2;
                        } else {
                            ctx.canvas.height = $scope.height || ctx.canvas.height;
                            autosize = true;
                        }
                    };

                    $scope.$watch('data', function (newVal) {
                        if (chartCreated) chartCreated.destroy();

                        if (!newVal) return;
                        if ($scope.chart) type = $scope.chart;
                        
                        if (autosize) {
                            $scope.size();
                            chart = new Chart(ctx);
                        }

                        if ($scope.responsive || $scope.resize)
                            $scope.options.responsive = true;

                        if ($scope.responsive !== undefined)
                            $scope.options.responsive = $scope.responsive;

                        chartCreated = chart[type]($scope.data, $scope.options);
                        chartCreated.update();

                        if ($scope.legend)
                            angular.element($elem[0]).parent().after(chartCreated.generateLegend());
                    }, true);

                    $scope.$watch('tooltip', function (newVal) {
                        if (chartCreated) chartCreated.draw();
                        if (!chartCreated.segments || isNaN(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
                            return;
                        var activeSegment = chartCreated.segments[newVal];
                        activeSegment.save();
                        activeSegment.fillColor = activeSegment.highlightColor;
                        chartCreated.showTooltip([activeSegment]);
                        activeSegment.restore();
                    }, true);

                    $scope.size();
                    var chart = new Chart(ctx);

                    $scope.$on('$destroy', function() {
                        if (chartCreated) chartCreated.destroy();
                    });
                }
            };
        };
    }
})();
