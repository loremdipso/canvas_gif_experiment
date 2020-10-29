/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.drawRect = void 0;\nvar TEXT_HEIGHT = 20;\nvar Game = (function () {\n    function Game() {\n        var _this = this;\n        this.frames = [];\n        this.currentFrame = 0;\n        this.imageHeight = 5;\n        this.frameCount = 0;\n        this.totalDelay = 0;\n        this.average_ms_between_frames = 0;\n        this.canvas = document.getElementById('canvas');\n        this.context = this.canvas.getContext(\"2d\");\n        this.resizeCanvas();\n        this.canvas.parentElement.addEventListener(\"resize\", function () { _this.resizeCanvas(); });\n        window.addEventListener(\"resize\", function () { _this.resizeCanvas(); });\n        this.setup();\n    }\n    Game.prototype.resizeCanvas = function () {\n        this.canvas.width = this.canvas.parentElement.clientWidth;\n        this.canvas.height = this.canvas.parentElement.clientHeight;\n    };\n    Game.prototype.setup = function () {\n        var _this = this;\n        var count = 10;\n        var to_load = 0;\n        var _loop_1 = function (i) {\n            to_load++;\n            var image = document.createElement(\"img\");\n            image.src = \"images/smile-\" + i + \".png\";\n            image.onload = function () {\n                _this.frames[i - 1] = image;\n                to_load--;\n                if (to_load == 0) {\n                    _this.start();\n                }\n            };\n        };\n        for (var i = 1; i < count; i++) {\n            _loop_1(i);\n        }\n    };\n    Game.prototype.start = function () {\n        var _this = this;\n        var lastUpdate = Date.now();\n        var MIN_DELTA = 80;\n        var cb = function () {\n            var delta = Date.now() - lastUpdate;\n            if (delta > MIN_DELTA) {\n                var drawStart = Date.now();\n                lastUpdate = Date.now();\n                _this.update(delta);\n                _this.draw();\n                _this.frameCount++;\n                _this.totalDelay += Date.now() - drawStart;\n            }\n            window.requestAnimationFrame(cb);\n        };\n        window.requestAnimationFrame(cb);\n    };\n    Game.prototype.update = function (delta) {\n        this.currentFrame = (this.currentFrame + 1) % this.frames.length;\n    };\n    Game.prototype.draw = function () {\n        this.clear();\n        var canvasWidth = this.canvas.width;\n        var canvasHeight = this.canvas.height;\n        var image = this.frames[this.currentFrame];\n        var imageRatio = image.width / image.height;\n        var imageHeight = this.imageHeight;\n        var imageWidth = imageRatio * imageHeight;\n        var num_drawn = 0;\n        for (var x = 0; x < canvasWidth - imageWidth; x += imageWidth) {\n            for (var y = 0; y < canvasHeight - imageHeight; y += imageHeight) {\n                num_drawn++;\n                this.context.drawImage(this.frames[this.currentFrame], x, y, imageWidth, imageHeight);\n            }\n        }\n        this.drawText(\"Average MS/frame: \" + Math.round(this.totalDelay / this.frameCount), TEXT_HEIGHT);\n        this.drawText(\"Num Rendered: \" + num_drawn + \" \", 0);\n    };\n    Game.prototype.drawText = function (text, top) {\n        this.context.fillStyle = \"black\";\n        this.context.textBaseline = \"top\";\n        this.context.font = TEXT_HEIGHT + \"px Arial\";\n        var textWidth = this.context.measureText(text).width;\n        drawRect(this.context, {\n            x: 0,\n            y: top,\n            width: textWidth,\n            height: TEXT_HEIGHT,\n        }, \"white\");\n        this.context.fillText(text, 0, top);\n    };\n    Game.prototype.clear = function () {\n        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    };\n    return Game;\n}());\nfunction drawRect(context, rect, color, opacity) {\n    if (opacity === void 0) { opacity = 1.0; }\n    context.save();\n    context.beginPath();\n    context.globalAlpha = opacity;\n    context.fillStyle = color;\n    context.fillRect(rect.x, rect.y, rect.width, rect.height);\n    context.closePath();\n    context.fill();\n    context.restore();\n}\nexports.drawRect = drawRect;\nif (!window.did_load) {\n    window.did_load = true;\n    new Game();\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });