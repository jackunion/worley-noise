(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["WorleyNoise"] = factory();
	else
		root["WorleyNoise"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	function WorleyNoise(numPoints, seed) {
	    this._numPoints = numPoints || 0;
	    this._seed = seed || 10000;
	    this._init();
	}

	WorleyNoise.prototype.addPoint = function (x, y) {
	    this._points[this._numPoints++] = {
	        x: x,
	        y: y
	    };
	};

	WorleyNoise.prototype.getEuclidean = function (x, y, k) {
	    return Math.sqrt(this._calculateValue(x, y, k, euclidean));
	};

	WorleyNoise.prototype.getManhattan = function (x, y, k) {
	    return this._calculateValue(x, y, k, manhattan);
	};

	WorleyNoise.prototype.getMap = function (resolution, callback) {
	    var step = 1 / (resolution - 1),
	        map = [],
	        that = this,
	        x,
	        y;

	    callback = callback || function (e, m) {
	        return e(1);
	    };

	    function e(k) {
	        return Math.sqrt(that._calculateValue(x * step, y * step, k, euclidean));
	    }

	    function m(k) {
	        return that._calculateValue(x * step, y * step, k, manhattan);
	    }

	    for (y = 0; y < resolution; ++y) {
	        for (x = 0; x < resolution; ++x) {
	            map[y * resolution + x] = callback(e, m);
	        }
	    }

	    return map;
	};

	WorleyNoise.prototype.getNormalizedMap = function (resolution, callback) {
	    var map = this.getMap(resolution, callback),
	        min = Number.POSITIVE_INFINITY,
	        max = Number.NEGATIVE_INFINITY,
	        scale,
	        i;

	    for (i = 0; i < map.length; ++i) {
	        min = Math.min(min, map[i]);
	        max = Math.max(max, map[i]);
	    }

	    scale = 1 / (max - min);

	    for (i = 0; i < map.length; ++i) {
	        map[i] = (map[i] - min) * scale;
	    }

	    return map;
	};

	WorleyNoise.prototype._init = function () {
	    var i;

	    this._points = [];

	    for (i = 0; i < this._numPoints; ++i) {
	        var x = Math.sin(i + 1) * this._seed,
	            y = Math.cos(i + 1) * this._seed;
	        this._points.push({
	            x: x - Math.floor(x),
	            y: y - Math.floor(y)
	        });
	    }
	};

	WorleyNoise.prototype._calculateValue = function (x, y, k, distFn) {
	    var minDist,
	        dist,
	        minIdx,
	        i,
	        j;

	    for (i = 0; i < this._numPoints; ++i) {
	        this._points[i].selected = false;
	    }

	    for (j = 0; j < k; ++j) {
	        minDist = Number.POSITIVE_INFINITY

	        for (i = 0; i < this._numPoints; ++i) {
	            dist = distFn(x - this._points[i].x, y - this._points[i].y);

	            if (dist < minDist && !this._points[i].selected) {
	                minDist = dist;
	                minIdx = i;
	            }
	        }

	        this._points[minIdx].selected = true;
	    }

	    return minDist;
	};

	function euclidean(dx, dy) {
	    return dx * dx + dy * dy;
	}

	function manhattan(dx, dy) {
	    return Math.abs(dx) + Math.abs(dy);
	}

	module.exports = WorleyNoise;


/***/ }
/******/ ])
});
;