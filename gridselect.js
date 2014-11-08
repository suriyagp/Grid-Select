'use strict';

var gridSelect = angular.module('grid-select',[]);

gridSelect.constant('grsConstants', {
  'instances': [],
  'currentInstance': null,
  'disabledIds': [],
  'attrs': {},
  'isLoadingMore': false,
  'isSearching': false,
  'blockShowingOptions': false
});

gridSelect.service('grs', ['grsConstants', '$rootScope', '$timeout',
  function (grsConstants, $rootScope, $timeout) {
    var _isAGrsInstance = function (id) {
      return grsConstants.instances.indexOf(id) > -1;
    };
    var _isGrsInstanceDisabled = function (id) {
      return grsConstants.disabledIds.indexOf(id) > -1;
    };
    var grsApi = {
      closeAndOpen: function (closeId, openId) {
        if (!closeId || !openId) {
          console.log('Cannot close and open a grs instance without closeId and openId...');
          return;
        }
        if (!_isAGrsInstance(closeId)) {
          console.log('A valid grs-element not found ( closeId: ' + closeId + ' )  :::  grs-method: closeAndOpen');
          return;
        }
        if (!_isAGrsInstance(openId)) {
          console.log('A valid grs-element not found ( openId: ' + openId + ' )  :::  grs-method: closeAndOpen');
          return;
        }
        grsApi.close(closeId);
        $timeout(function () { grsApi.open(openId); }, 13);
      },
      open: function (id, searchTerm) {
        if (!id) {
          console.log('Cannot open a grs instance without id...');
          return;
        }
        if (grsConstants.currentInstance !== null) {
          /*console.log('Already a grs instance is opened ( id: ' + grsConstants.currentInstance + ' ) and hence closing it and not opening the instance of ( id: ' + id + ' )');*/
          /*angular.element('#ISGRS-grid-select-search-input' + grsConstants.currentInstance).focus();*/
          grsApi.close(grsConstants.currentInstance);
          return;
        }
        $timeout(function () {
          if (_isAGrsInstance(id)) {
            if (!_isGrsInstanceDisabled(id)) {
              $rootScope.open(id, searchTerm);
            } else {
              console.log('The grs instance is disabled and hence not opening ( id: ' + id + ' )');
            }
          } else {
            console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: open');
          }
        }, 10);
      },
      close: function (id) {
        if (!id) {
          console.log('Cannot close a grs instance without id...');
          return;
        }
        $timeout(function () {
          if (_isAGrsInstance(id)) {
            $rootScope.close(id);
          } else {
            console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: close');
          }
        }, 11);
      },
      focus: function (id) {
        if (!id) {
          console.log('Cannot focus a grs instance without id...');
          return;
        }
        $timeout(function () {
          if (grsConstants.currentInstance !== null) {
            console.log('Already a grs instance is opened ( id: ' + grsConstants.currentInstance + ' ) and hence not focusing the instance of ( id: ' + id + ' )');
            return;
          }
          if (_isAGrsInstance(id)) {
            $rootScope.focus(id);
          } else {
            console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: focus');
          }
        }, 12);
      },
      isOpen: function (id) {
        return grsConstants.currentInstance === id;
      },
      isAGrsInstance: function (id) {
        return _isAGrsInstance(id);
      },
      setSelection: function (id, value) {
        if (_isAGrsInstance(id)) {
          angular.element('#ISGRS-grid-select-input' + id).val(value);
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: setSelection');
        }
      },
      getSelection: function (id) {
        if (_isAGrsInstance(id)) {
          return angular.element('#ISGRS-grid-select-input' + id).val();
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: getSelection');
        }
      },
      clearSelection: function (id) {
        grsApi.setSelection(id, '');
      },
      setSearchValue: function (id, value) {
        if (_isAGrsInstance(id)) {
          angular.element('#ISGRS-grid-select-search-input' + id).val(value);
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: setSearchValue');
        }
      },
      getSearchValue: function (id) {
        if (_isAGrsInstance(id)) {
          return angular.element('#ISGRS-grid-select-search-input' + id).val();
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: getSearchValue');
        }
      },
      disable: function (id) {
        if (_isAGrsInstance(id)) {
          grsApi.close(id);
          grsConstants.disabledIds.push(id);
          angular.element('#ISGRS-grid-select-input' + id).addClass('grs-disabled');
          angular.element('#ISGRS-grid-select-input' + id).attr('disabled','disabled');
          angular.element('#ISGRS-grid-select-input' + id).blur();
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: disable');
        }
      },
      enable: function (id) {
        if (_isAGrsInstance(id)) {
          if (_isGrsInstanceDisabled(id)) {
            grsConstants.disabledIds.splice(grsConstants.disabledIds.indexOf(id), 1);
            angular.element('#ISGRS-grid-select-input' + id).removeClass('grs-disabled');
            angular.element('#ISGRS-grid-select-input' + id).removeAttr('disabled');
          } else {
            console.log('The grs instance is already enabled ( id: ' + id + ' )');
          }
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: enable');
        }
      },
      isDisabled: function (id) {
        if (_isAGrsInstance(id)) {
          return _isGrsInstanceDisabled(id);
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: isDisabled');
        }
      },
      setAttrs: function (id, attr) {
        if (_isAGrsInstance(id)) {
          grsConstants.attrs[id] = attr;
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: setAttrs');
        }
      },
      getAttrs: function (id) {
        if (_isAGrsInstance(id)) {
          if (angular.isDefined(grsConstants.attrs[id])) {
            return grsConstants.attrs[id];
          } else {
            console.log('The attrs is not set for the grsInstance ( id: ' + id + ' )');
          }
        } else {
          console.log('A valid grs-element not found ( id: ' + id + ' )  :::  grs-method: getAttrs');
        }
      },
      showMinChars: function (id) {
        grsApi.hideLoadMore(id);
        grsConstants.isSearching = false;
        angular.element('#ISGRS-grid-select-options-list' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-searchingText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-minCharsText' + id).css('display', 'block');
        angular.element('#ISGRS-grid-select-noMatchText' + id).css('display', 'none');
      },
      showNoMatch: function (id) {
        grsApi.hideLoadMore(id);
        grsConstants.isSearching = false;
        angular.element('#ISGRS-grid-select-options-list' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-searchingText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-minCharsText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-noMatchText' + id).css('display', 'block');
      },
      showSearching: function (id) {
        grsApi.hideLoadMore(id);
        grsConstants.isSearching = true;
        angular.element('#ISGRS-grid-select-options-list' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-searchingText' + id).css('display', 'block');
        angular.element('#ISGRS-grid-select-minCharsText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-noMatchText' + id).css('display', 'none');
      },
      showOptions: function (id) {
        grsApi.hideLoadMore(id);
        grsConstants.isSearching = false;
        angular.element('#ISGRS-grid-select-options-list' + id).css('display', 'block');
        angular.element('#ISGRS-grid-select-searchingText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-minCharsText' + id).css('display', 'none');
        angular.element('#ISGRS-grid-select-noMatchText' + id).css('display', 'none');
      },
      showLoadMore: function (id) {
        angular.element('#ISGRS-grid-select-loadMore' + id).css('display', 'block');
      },
      hideLoadMore: function (id) {
        angular.element('#ISGRS-grid-select-loadMore' + id).css('display', 'none');
      },
      isShowingOptions: function (id) {
        return angular.element('#ISGRS-grid-select-options-list' + id).css('display') === 'block';
      },
      getSelectedSearchValue: function (id) {
        var e = angular.element('#ISGRS-grid-select-search-input' + id);
        return e.val().substring(e.prop('selectionStart'), e.prop('selectionEnd'));
      },
      isCursorAtEndOfSearchInput: function (id) {
        var e = angular.element('#ISGRS-grid-select-search-input' + id);
        return ((e.prop('selectionStart') === e.prop('selectionEnd')) && (e.prop('selectionEnd') === e.val().length));
      },
      isCursorAtStartOfSearchInput: function (id) {
        var e = angular.element('#ISGRS-grid-select-search-input' + id);
        return ((e.prop('selectionStart') === e.prop('selectionEnd')) && (e.prop('selectionEnd') === 0));
      },
      focusSearchInput: function (id) {
        angular.element('#ISGRS-grid-select-search-input' + id).focus();
      }
    };
    return grsApi;
  }
]);

gridSelect.directive('gridSelect', ['$rootScope', 'grsConstants', '$timeout', 'grs', '$http', '$q',
  function ($rootScope, grsConstants, $timeout, grs, $http, $q) {
    return {
      restrict: 'AE',
      transclude: true,
      scope: true,
      template: '<div>' +
                    '<span class="grid-select">' +
                        '<div class="selection-area" id="ISGRS-selection-area{{id}}">' +
                            '<input class="grid-select-input" id="ISGRS-grid-select-input{{id}}" ng-click="openOrCloseList(id)" ng-keypress="keyPressHandler($event, id)" ng-keydown="keyDownHandler($event, id)"/>' +
                        '</div>' +
                        '<div class="list-area" id="ISGRS-list-area{{id}}" ng-click="focusSearchInput(id)">' +
                        '' +
                            '<input id="ISGRS-grid-select-search-input{{id}}" class="form-control grs-search-input" type="text" placeholder="{{placeholder}}" ng-keypress="keyPressHandlerForSearchInput($event, id)" ng-keydown="keyDownHandlerForSearchInput($event, id)" ng-keyUp="keyUpHandlerForSearchInput($event)"/>' +
                            '' +
                            '<div id="ISGRS-grid-select-options-list{{id}}" class="grs-options">' +
                                '<div class="grs-header {{grsClasses.grsHeader}}" id="ISGRS1">' +
                                    '<div id="ISGRS2" ng-repeat="header in headers" ng-style="{ \'width\' : getWidth($index)}" class="grs-header-cell">{{header.col}}</div>' +
                                '</div>' +
                                '<div class="grs-rows" id="ISGRS-grs-rows{{id}}" load-on-last>' +
                                    '<div ng-repeat="option in grsOptions track by $index" ng-style="{\'display\': \'block\'}" ng-class="{\'grs-highlighted\': $index === selectedIndex}" ng-mouseover="setSelectedIndex($index)" ng-click="doSelect()"  id="ISGRS4">' +
                                        '<div id="ISGRS-one-option{{id}}{{$index}}" class="grid-option-list">' +
                                            '<div ng-repeat="o in option track by $index" class="grs-cell" ng-style="{ \'width\' : getWidth($index), \'display\': \'inline-block\'}" id="ISGRS5">{{o}}</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                            '' +
                            '<div id="ISGRS-grid-select-searchingText{{id}}" class="grs-searching">' +
                                'Searching' +
                            '</div>' +
                            '' +
                            '<div id="ISGRS-grid-select-minCharsText{{id}}" class="grs-min-chars {{grsClasses.grsMinChars}}">' +
                                'Enter {{remainingMinChars}} more characters.' +
                            '</div>' +
                            '' +
                            '<div id="ISGRS-grid-select-noMatchText{{id}}" class="grs-no-match">' +
                                'No matching results found.' +
                            '</div>' +
                            '' +
                            '<div id="ISGRS-grid-select-loadMore{{id}}" class="grs-loading-more">' +
                                'Loading More data...' +
                            '</div>' +
                            '' +
                        '</div>' +
                    '</span>' +
                '</div>',
      link: function (scope, ele, attrs) {
        scope.id = attrs.id;
        grsConstants.instances.push(attrs.id);
        grs.setAttrs(attrs.id, attrs);
        scope.grsClasses = scope.$eval(grs.getAttrs(attrs.id).grsClasses);

        var cancellerObj = {};
        var getACanceller = function (id) {
          if (!cancellerObj[id]) {
            cancellerObj[id] = $q.defer();
          }
          return cancellerObj[id];
        };
        var removeACanceller = function (id) {
          var returnValue = cancellerObj[id];
          delete cancellerObj[id];
          return returnValue;
        };

        var isDoingHttpCall = false;

        var getSearchUrl = function (searchTerm) {
          return eval(scope.$eval($rootScope.thisAttr.getSearchUrl))(searchTerm, $rootScope.page);
        };

        var doSearch = function (isDefaultTermSearch, clearOptions, checkScrollHeight) {
          if (clearOptions) {
            angular.element('#ISGRS-grs-rows' + $rootScope.thisAttr.id).scrollTop(0);
            grs.showSearching($rootScope.thisAttr.id);
          } else {
            grs.showLoadMore($rootScope.thisAttr.id);
          }
          var searchTerm = (isDefaultTermSearch) ? ($rootScope.defaultTerm) : (grs.getSearchValue($rootScope.thisAttr.id));
          var url = getSearchUrl(searchTerm);
          $rootScope.lastUrl = url;

          $timeout(function () {
            if ($rootScope.lastUrl === url && grs.isOpen($rootScope.thisAttr.id) && !grsConstants.blockShowingOptions) {
              isDoingHttpCall = true;
              console.log('cache enabled in grs: ' + JSON.stringify($rootScope.searchHttpHeaders));
              $http.get($rootScope.lastUrl, {timeout: getACanceller($rootScope.lastUrl).promise, cache: $rootScope.cacheEnabled, headers: $rootScope.searchHttpHeaders}).success(function (respData, respStatus, respHeaders, respConfigs) {
                isDoingHttpCall = false;
                grsConstants.isLoadingMore = false;
                removeACanceller($rootScope.lastUrl);
                $rootScope.isMore = eval(scope.$eval($rootScope.thisAttr.isMoreDecider))(respData, respStatus, respHeaders, respConfigs);
                var grsData = eval(scope.$eval($rootScope.thisAttr.grsDataGetter))(respData, respStatus, respHeaders, respConfigs);
                if (!grsData.data || grsData.data.length === 0) {
                  grs.showNoMatch($rootScope.thisAttr.id);
                  return;
                } else {
                  if (clearOptions) {
                    $rootScope.selectedIndex = 0;
                    $rootScope.grsOptions = grsData.data;
                  } else {
                    grs.hideLoadMore($rootScope.thisAttr.id);
                    angular.forEach(grsData.data, function (value) {
                      $rootScope.grsOptions.push(value);
                    });
                  }
                }
                setActualData(grsData.actualData, clearOptions);
                grs.showOptions($rootScope.thisAttr.id);
                $timeout(function () {
                  var rowElement = angular.element('#ISGRS-grs-rows' + $rootScope.thisAttr.id);
                  if ((rowElement.scrollTop() === 0 && $rootScope.grsOptions.length <= 20) || (!checkScrollHeight || (checkScrollHeight && $rootScope.getLoadOnScrollValue()))) {
                    checkAndDoLoadMore(false, true);
                  }
                  /*angular.element('#ISGRS-grid-select-options-list' + $rootScope.thisAttr.id).animate({scrollTop: 500}, 2000);*/
                }, 5);
              }).error(function (data) {
                isDoingHttpCall = false;
                removeACanceller($rootScope.lastUrl);
                grs.showNoMatch($rootScope.thisAttr.id);
                grsConstants.isLoadingMore = false;
                if ($rootScope.thisAttr.errorHandler && angular.isFunction(eval(scope.$eval($rootScope.thisAttr.errorHandler)))) {
                  eval(scope.$eval($rootScope.thisAttr.errorHandler))();
                }
                console.log('Error in grs response: ' + JSON.stringify(data));
              });
            }
          }, $rootScope.thisAttr.debounce);
        };

        var doDefaultTermSearch = function () {
          doSearch(true, true);
        };

        var clearAndDoSearch = function () {
          angular.element('#ISGRS-grs-rows' + $rootScope.thisAttr.id).scrollTop(0);
          $rootScope.page = 1;
          doSearch(false, true);
        };

        var scrollGrsOptionIntoView = function (index) {
          index = index || $rootScope.selectedIndex;
          document.getElementById('ISGRS-one-option' + $rootScope.thisAttr.id + index).scrollIntoView();
        };

        var checkAndDoLoadMore = function (checkSelectedIndex, checkScrollHeight) {
          if ($rootScope.isMore && !grsConstants.isLoadingMore) {
            if ((checkSelectedIndex && $rootScope.selectedIndex >= $rootScope.grsOptions.length - 5) || !checkSelectedIndex) {
              grsConstants.isLoadingMore = true;
              $rootScope.page += 1;
              doSearch(false, false, checkScrollHeight);
            }
          }
        };

        var isProcessingKeyDown = false;

        var checkAndOpen = function (id, searchTermOnOpen, source) {
          if (grs.getAttrs(id).beforeOpen) {
            if (angular.isFunction(eval(scope.$eval(grs.getAttrs(id).beforeOpen))) && eval(scope.$eval(grs.getAttrs(id).beforeOpen))(source)) {
              grs.open(id, searchTermOnOpen);
            }
          } else {
            grs.open(id, searchTermOnOpen);
          }
        };

        var setActualData = function (actualData, doClear) {
          if (doClear) {
            $rootScope.actualData = actualData;
          } else {
            if (!$rootScope.actualData) {
              $rootScope.actualData = [];
            }
            $rootScope.actualData = $rootScope.actualData.concat(actualData);
          }
        };

        var checkMinCharsAndClearAndDoSearch = function (id, isBackspaceOrDelete) {
          angular.element('#ISGRS-grs-rows' + id).scrollTop(0);
          var valueToCheck = (isBackspaceOrDelete) ? (grs.getSearchValue(id).length - (grs.getSelectedSearchValue(id).length || 1)) : (grs.getSearchValue(id).length + 1);
          valueToCheck = (valueToCheck < 0) ? (0) : (valueToCheck);
          if (valueToCheck < $rootScope.minChars) {
            $rootScope.remainingMinChars = $rootScope.minChars - valueToCheck;
            removeACanceller($rootScope.lastUrl);
            grsConstants.blockShowingOptions = true;
            grs.showMinChars(id);
          } else {
            $timeout(function () {
              grsConstants.blockShowingOptions = false;
              clearAndDoSearch();
            }, 2);
          }
        };

        $rootScope.onScrollToLast = function () {
          checkAndDoLoadMore(false, true);
        };

        $rootScope.setSelectedIndex = function (index) {
          $rootScope.selectedIndex = index;
          checkAndDoLoadMore(true);
        };

        $rootScope.open = function (id, searchTerm) {
          grs.hideLoadMore(id);
          cancellerObj = {};
          $rootScope.thisAttr = grs.getAttrs(id);
          angular.element('#ISGRS-grs-rows' + $rootScope.thisAttr.id).scrollTop(0);
          angular.element('#ISGRS-grid-select-input' + id).addClass('up-arrow');
          $rootScope.selectedIndex = 0;
          $rootScope.page = 1;
          $rootScope.defaultTerm = eval(scope.$eval($rootScope.thisAttr.defaultTerm))();
          $rootScope.placeholder = eval(scope.$eval($rootScope.thisAttr.placeholder))();
          $rootScope.headers = eval(scope.$eval($rootScope.thisAttr.headers))();
          $rootScope.cacheEnabled = scope.$eval($rootScope.thisAttr.cacheEnabled);
          $rootScope.searchHttpHeaders = {};
          if ($rootScope.thisAttr.searchHttpHeaders) {
            $rootScope.searchHttpHeaders = scope.$eval($rootScope.thisAttr.searchHttpHeaders)();
          }
          $rootScope.grsOptions = [];

          $timeout(function () {
            angular.element('#ISGRS-list-area' + id).css('visibility', 'visible');
/*console.log(angular.element('#ISGRS-selection-area' + id).prop('width') + ' ---------' + '#ISGRS-selection-area' + id);
            angular.element('#ISGRS-list-area' + id).css('width', '70px');*/
            angular.element('#ISGRS-grid-select-input' + id).addClass('isListOpened');
            angular.element('#ISGRS-grid-select-search-input' + id).focus();
            grsConstants.currentInstance = id;
            $rootScope.minChars = parseInt(scope.$eval($rootScope.thisAttr.minChars), 10);
            if (($rootScope.minChars < 0) || ($rootScope.minChars === 0 && (!$rootScope.defaultTerm || ($rootScope.defaultTerm === '')))) {
              console.log('Either minChars is less than 0 (or) defaultTerm is not valid. Hence defaulting minChars to 1.');
              $rootScope.minChars = 1;
            }
            $rootScope.remainingMinChars = $rootScope.minChars;
            if (searchTerm && searchTerm.length > 0) {
              $timeout(function () {
                grs.setSearchValue(id, searchTerm);
                if (searchTerm.length < $rootScope.minChars) {
                  $rootScope.remainingMinChars = $rootScope.minChars - searchTerm.length;
                  grs.showMinChars(id);
                } else {
                  $timeout(function () { clearAndDoSearch(); }, 2);
                }
              }, 3);
            } else {
              if ($rootScope.minChars === 0) {
                doDefaultTermSearch();
              } else {
                grs.showMinChars(id);
              }
            }
          });
        };
        $rootScope.focus = function (id) {
          angular.element('#ISGRS-grid-select-input' + id).focus();
        };
        $rootScope.close = function (id) {
          grsConstants.currentInstance = null;
          grsConstants.blockShowingOptions = false;
          grs.setSearchValue(id, '');
          angular.element('#ISGRS-grid-select-input' + id).removeClass('isListOpened');
          angular.element('#ISGRS-grs-rows' + id).scrollTop(0);
          angular.element('.list-area').css('visibility', 'hidden');
          angular.element('#ISGRS-grid-select-input' + id).removeClass('up-arrow');
          if (isDoingHttpCall) {
            removeACanceller($rootScope.lastUrl).resolve();
          }
        };

        scope.getWidth = function (index) {
          return $rootScope.headers[index].width;
        };

        scope.doSelect = function () {
          if (grs.isShowingOptions($rootScope.thisAttr.id)) {
            grs.setSelection($rootScope.thisAttr.id, eval(scope.$eval($rootScope.thisAttr.formatSelection))($rootScope.grsOptions[$rootScope.selectedIndex], $rootScope.actualData[$rootScope.selectedIndex]));
            angular.element('#ISGRS-grid-select-input' + $rootScope.thisAttr.id).prop('selectionEnd', 0); // To force the cursor at start of the selection input after selection.
            grs.close($rootScope.thisAttr.id);
            grs.focus($rootScope.thisAttr.id);
            if ($rootScope.thisAttr.onSelect && angular.isFunction(eval(scope.$eval($rootScope.thisAttr.onSelect)))) {
              eval(scope.$eval($rootScope.thisAttr.onSelect))();
            }
          }
        };

        scope.openOrCloseList = function (id) {
          if (!grs.isDisabled(id)) {
            if (grs.isOpen(id)) {
              grs.close(id);
            } else {
              checkAndOpen(id, null, 'click');
            }
          }
        };

        scope.focusSearchInput = function (id) {
          grs.focusSearchInput(id);
        };

        scope.keyDownHandler = function (e, id) {
          console.log(e.which + ' == which in keyDownHandler');
          if (e.which === 46 || e.which === 8) { //Delete key || Backspace key
            e.preventDefault();
          } else if ((e.which === 37 || e.which === 39) && !isProcessingKeyDown) { //Left arrow key || Right arrow key
            isProcessingKeyDown = true;
            e.preventDefault();
            /*To force the cursor at the end of the text*/
            var temp = grs.getSelection(id);
            grs.clearSelection(id);
            $timeout(function () {
              grs.setSelection(id, temp);
              isProcessingKeyDown = false;
            });
          } else if (e.which === 38 || e.which === 40) { //Up arrow key || Down arrow key
            e.preventDefault();
            checkAndOpen(id, null, (e.which === 38) ? ('upkey') : ('downkey'));
          }
        };
        scope.keyPressHandler = function (e, id) {
          if (e.which === 13) { //Enter key
            e.preventDefault();
            checkAndOpen(id, null, 'enterkey');
          } else if (e.which >= 32 && e.which <= 126) { //ASCII codes for special characters, numbers, alphabets lies in this range.
            e.preventDefault();
            checkAndOpen(id, String.fromCharCode(e.which), String.fromCharCode(e.which));
          }
        };

        scope.keyDownHandlerForSearchInput = function (e, id) {
          if (e.which === 9) { //Tab key
            e.preventDefault();
          } else if (e.which === 27) { //Esc key
            e.preventDefault();
            grs.focus(id);
            grs.close(id);
          } else if (e.which === 46 || e.which === 8) { //Delete key || Backspace key
            grsConstants.isLoadingMore = false;
            if (!((e.which === 46 && grs.isCursorAtEndOfSearchInput(id)) || (e.which === 8 && grs.isCursorAtStartOfSearchInput(id)))) {
              checkMinCharsAndClearAndDoSearch(id, true);
            }
          } else if (e.which === 38) { //Up arrow key
            e.preventDefault();
            if ($rootScope.selectedIndex > 0) {
              $rootScope.selectedIndex--;
              scrollGrsOptionIntoView();
            }
          } else if (e.which === 40) { //Down arrow key
            e.preventDefault();
            if ($rootScope.selectedIndex < $rootScope.grsOptions.length - 1) {
              $rootScope.selectedIndex++;
              scrollGrsOptionIntoView();
            }
          }
        };
        scope.keyPressHandlerForSearchInput = function (e, id) {
          if ((e.which >= 32 && e.which <= 126)) { //ASCII codes for special characters, numbers, alphabets lies in this range.
            checkMinCharsAndClearAndDoSearch(id, false);
          } else if (e.which === 13) { //Enter key
            e.preventDefault();
            scope.doSelect();
          }
        };

        if (grs.getAttrs(scope.id).onRender && angular.isFunction(eval(scope.$eval(grs.getAttrs(scope.id).onRender)))) {
          eval(scope.$eval(grs.getAttrs(scope.id).onRender))(scope.id);
        }

      }
    };
  }
]);

gridSelect.directive('grsHider', ['grs', 'grsConstants',
  function(grs, grsConstants) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      link: function postLink() {
        jQuery(document).on('click', function(e) {
          e = e || window.event;
          var elem = e.srcElement || e.target;
          if (angular.uppercase(elem.id).indexOf('ISGRS') === -1 && grsConstants.currentInstance) {
            e.preventDefault();
            e.stopImmediatePropagation();
            e.stopPropagation();
            grs.close(grsConstants.currentInstance);
            return false;
          }
        });
      }
    };
  }
]);

gridSelect.directive('loadOnLast', ['$rootScope', 'grsConstants',
  function($rootScope, grsConstants) {
    return {
      restrict: 'A',
      link: function (scope, element) {
        $rootScope.getLoadOnScrollValue = function () {
          var e = angular.element('#ISGRS-grs-rows' + grsConstants.currentInstance);
          return e.scrollTop() + e.prop('offsetHeight') >= e.prop('scrollHeight') - 300; //If -300 is removed, scroll on last will be triggered only if scroll bar reaches last.
        };
        element.bind('scroll', function () {
          var doScrollOnLast = function () {
            if ($rootScope.getLoadOnScrollValue()) { //This will trigger when scrolled to some height (300px) above last
              $rootScope.onScrollToLast();
            }
          };
          doScrollOnLast();
        });
      }
    };
  }
]);
