Grid-Select
===========

Basic functionality of select box with the set of divs

## Features

 * Implement the grid type structure into the select box
 * Fixed header for the result list (Data wise Dynamic)
 * Can able to add more number of columns into the search result list


## Usage

```html
<link media="all" rel="stylesheet" type="text/css"  href="gridselect.css" />
<script src="gridselect.js"></script>
```


## Examples

### Grid Select

```html
<body ng-app="exampleApp">

<div class="container">

    <div ng-controller="mainCtrl">
        <grs-hider></grs-hider>
        <grid-select id="myGrs"
                         placeholder="myGrs.placeholder" headers="myGrs.headers"
                         min-chars="myGrs.minChars" default-term="myGrs.defaultTerm"
                         format-selection="myGrs.formatSelection" get-search-url="myGrs.urlFormer"
                         search-http-headers="myGrs.searchHttpHeaders" debounce="500" is-more-decider="myGrs.moreDecider"
                         grs-data-getter="myGrs.dataGetter" on-select="focusQuantity"
                         on-render="myGrs.onRender" cache-enabled="myGrs.cacheEnabled">
                    </grid-select>
    </div>
</div>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-route.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.2.0/angular-sanitize.min.js"></script>

    <script src="gridselect.js"></script>

    <script src="app.js"></script>
</body>
```

## Conceptions

- [ ] Make the Grid Dynamically resizable
- [ ] Make more convenient

## Contributors

* Sankaranandh.T.N
* Suriya Prakash.G

## Dependencies

* Angular JS
* Jquery
