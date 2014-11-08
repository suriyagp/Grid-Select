'use strict';

var exampleApp = angular.module('exampleApp', ['ngRoute', 'grid-select']);

exampleApp.controller('mainCtrl', ['$scope', '$http', 'grs', function($scope,$http,grs){
     /*$http.get('').success(function(data,status,config,headers){
          console.log('success data: ' + JSON.stringify(data));
          console.log('success status: ' + JSON.stringify(status));
          console.log('success config: ' + JSON.stringify(config));
          console.log('success headers: ' + JSON.stringify(headers));
     }).error(function(data,status,config,headers){
          console.log('error data: ' + JSON.stringify(data));
          console.log('error status: ' + JSON.stringify(status));
          console.log('error config: ' + JSON.stringify(config));
          console.log('error headers: ' + JSON.stringify(headers));
     });*/
    
    $scope.dummy = 'dummy';

    $scope.myGrs = {
      cacheEnabled: true, //This is the cacheEnabled value for a http call.
      formatSelection: function (option, data) {
        /*
        This function will be called while an option is selected.
        This should return a string which will be displayed as grs selection.
        option is the grs-formatted-array of the selected option which will be as returned grsDataGetter.
        data is the actual json object of the data selected.
        */
        $scope.grsNgModel = data;
        return option[0] + ' - ' + option[1];
      },
      placeholder: function () {
        /*
        This function will be evaluated each time when the grs instance opens.
        This should return a string which will be used as place holder for search input box.
        */
        return ($scope.dummy === 'dummy') ? ('Type to search') : ('Type to search');
      },
      headers: function () {
        /*
        This function will be evaluated each time when the grs instance opens.
        This should return an array of objects. Each object in array is each header. Each object must contain two attributes - col and width (Obviously if width is given in % , sum of all the widths must be 100% ; or else, the data will be mis-aligned in the element.)
        */
        return ($scope.dummy === 'dummy')?([{col: 'Day', width: '75%'},{col: 'Condition', width: '25%'}]):([{col: 'Day', width: '50%'},{col: 'Condition', width: '50%'}]);
      },
      minChars: '1',//This is the minChars that should be entered before search should start.
      defaultTerm: function () {
        /*
        This function will be called on grs-open event , if minChars is 0.
        This is the default search term.
        If minChars is 0 and this function is undefined, minChars will automatically be taken as 1.
        */
        return ($scope.dummy === 'dummy') ? ('A') : ('1');
      },
      urlFormer: function (searchTerm, page) {
        /*
        Whenever a search is to be done (Either while typing in search input box or while scrolling the options), this function will be called.
        This should return a string which will be used as URL in http call.
        searchTerm is the term typed in search input box.
        page is the page value. This will be helpful to load data on scroll.
        */
        return 'https://george-vustrey-weather.p.mashape.com/api.php?location=' + searchTerm;
      },
      searchHttpHeaders: function () {
        /*
        This function will be called when a grs instance is opened.
        This should return an object which will be set as headers while doing a http call to search.
        */
        return {'X-Mashape-Key': '4tPdXSKejGmsht2ucNPOLsoMJZHzp1CQfWujsn6aOEk9sXqC0O'};
      },
      moreDecider: function (httpData, httpStatus, httpHeaders) {
        /*
        This funciton will be called on succesfful response of any http call that has been done to search.
        This function will be called with four arguments httpData, httpStatus, httpHeaders, httpConfigs which ara similar to the data, status, headers, configs in angular $http success response.
        This should return either true or false.
        If true is returned, the element will try to load more data on scroll.
        */
        return false;
      },
      dataGetter: function (httpData) {
        /*
        This function will be called on successfull http response during a search.
        This should return an object in following format:
              {
                actualData: [{},{},{}.....],
                data: [[],[],[],[],.........]
              }
              
              where , data - a two dimensional array 
                                where, each array in the array is a row (is an option) and it should contain the values for the corresponding headers
                      actualData - an array of objects. When formatSelection function is called, this object of the selected option will be used as an argument.
        */
        var data = httpData || false;
        var grsData = {'data': [], 'actualData': []};
        if (!data) {
          return grsData;
        } else {
          var oneRecord = [];
          angular.forEach(data, function (value) {
            oneRecord = [];
            oneRecord.push(value.day_of_week);
            oneRecord.push(value.condition);
            grsData.data.push(oneRecord);
          });
          grsData.actualData = httpData;
          return grsData;
        }
      },
      onRender: function () {
        /*
        This function will be called immediately after the grid select element has been rendered in screen.
        */
        console.log('The element has finished rendering... Enjoy the great...');
	grs.open('myGrs');
      }
    };

}]);
