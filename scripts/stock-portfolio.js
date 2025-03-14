var app = angular.module('stockApp', []);

app.controller('StockController', function($scope, $http) {
    $scope.stocks = [];
    $scope.searchText = '';
    $scope.sortBy = 'name';
    $scope.reverseSort = false;

    $http.get('stock-portfolio.json').then(function(response) {
        $scope.stocks = response.data.stocks;
        $scope.$broadcast('dataLoaded', $scope.stocks);
    });

    // Watch for stock list changes
    $scope.$watch('stocks', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            console.log('Stock data updated:', newVal);
        }
    }, true);

    $scope.selectStock = function(stock) {
        $scope.selectedStock = stock;
        $scope.$emit('stockSelected', stock);
    };

    $scope.toggleSort = function(column) {
        $scope.sortBy = column;
        $scope.reverseSort = !$scope.reverseSort;
    };
});