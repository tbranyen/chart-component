(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FavoriteMoviesChart = (function (_HTMLElement) {
  _inherits(FavoriteMoviesChart, _HTMLElement);

  function FavoriteMoviesChart() {
    _classCallCheck(this, FavoriteMoviesChart);

    _get(Object.getPrototypeOf(FavoriteMoviesChart.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FavoriteMoviesChart, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.barHeight = 40;
      this.barMargin = 30;
      this.count = Number(this.getAttribute('count')) || 0;

      this.originalOutlineColor = 'rgba(64, 64, 64, 0.75)';

      this.margin = { top: 20, left: 20, right: 20, bottom: 20 };

      this.items = [{ name: 'Rocky', rating: 5.0 }, { name: 'Star Wars', rating: 4.9 }, { name: 'Pulp Fiction', rating: 4.5 }, { name: 'Dazed and Confused', rating: 4.0 }, { name: 'Transformers 2', rating: 3.0 }, { name: 'Twilight', rating: 2.0 }, { name: 'Shrek 8', rating: 0.3 }];

      // Adds a transition state for whenever an attribute changes.
      document.addTransitionState('attributeChanged', function (elem, name) {
        for (var _len = arguments.length, rest = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          rest[_key - 2] = arguments[_key];
        }

        if (elem.matches('rect') && name === 'width') {
          return _this.animate.apply({ duration: 250 }, [elem, name].concat(rest));
        }
      });

      this.data = this.makeData(this.count);
      this.render();
    }
  }, {
    key: 'randomize',
    value: function randomize() {
      this.data = this.makeData(this.count);
    }
  }, {
    key: 'makeData',
    value: function makeData(length) {
      var data = [];

      for (var i = 0; i < length; i++) {
        data.push(this.items[Math.floor(Math.random() * this.items.length)]);
      }

      return data;
    }

    // Animate an element based on a passed property.
  }, {
    key: 'animate',
    value: function animate(element, attributeName, oldValue, newValue) {
      oldValue = parseInt(oldValue);
      newValue = parseInt(newValue);

      // Throttle to 30fps.
      var fps = 30;
      var duration = this.duration;
      var ticks = duration / fps;
      var interval = (newValue - oldValue) / ticks;
      var lastUpdate = new Date();

      // When to end this animation.
      var endsAt = new Date();
      endsAt.setMilliseconds(endsAt.getMilliseconds() + duration);

      // Resolve this promise once the animation is done.
      return new Promise(function (resolve) {
        requestAnimationFrame(function applyAnimation() {
          var now = new Date();

          if (now - lastUpdate < fps) {
            return requestAnimationFrame(applyAnimation);
          }

          oldValue += interval;

          element.setAttribute(attributeName, oldValue);

          if (now < endsAt && oldValue !== newValue) {
            lastUpdate = now;
            requestAnimationFrame(applyAnimation);
          } else {
            resolve();
          }
        });
        // Ensure the animation always ends with the correct newValue set on the
        // attributeName.
      }).then(function () {
        element.setAttribute(attributeName, newValue);
      });
    }

    // Diff inside the component for changes.
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var rect = this.getBoundingClientRect();

      this.offset = 280;

      // Defaults.
      this.labelShadow = '#000';
      this.width = rect.width;

      var labels = this.querySelector('.labels');

      // For smaller displays.
      if (this.width < 480) {
        this.offset = this.margin.left + 10;
        this.outlineColor = 'rgba(127, 197, 204, .4)';
        this.labelShadow = 'transparent';

        if (labels) {
          labels.setAttribute('class', 'flatten');
          labels.classList.add('flatten');
        }
      } else if (labels) {
        labels.removeAttribute('class');
        this.outlineColor = this.originalOutlineColor;
      } else {
        this.outlineColor = this.originalOutlineColor;
      }

      this.outlineWidth = this.width - this.margin.left - this.margin.right;
      this.barWidth = this.outlineWidth - this.offset;

      this.height = this.margin.top + this.data.length * (this.barHeight + this.barMargin) - this.margin.bottom / 2;

      this.diffInnerHTML = '\n      <svg\n        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"\n        width=' + this.width + '\n        height=' + this.height + '\n      >\n        <!-- Outlines -->\n        <g class="outlines">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + _this2.margin.left + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top - 7) + '\n              rx=10\n              ry=10\n              width=' + _this2.outlineWidth + '\n              height=' + (_this2.barHeight + _this2.barMargin / 2) + '\n              style="fill: ' + _this2.outlineColor + ';"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Actual bars -->\n        <g class="bars">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + _this2.offset + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top) + '\n              rx=10\n              ry=10\n              rating="' + film.rating + '"\n              width=' + film.rating / 5 * _this2.barWidth + '\n              height=' + _this2.barHeight + '\n              style="fill: hsl(' + film.rating / 5 * 105 + ', 100%, 50%);"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Labels -->\n        <g class="labels">\n          ' + this.data.map(function (film, i) {
        return '\n            <text\n              x=' + (_this2.margin.left + 20) + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.barHeight / 2 + 7 + _this2.margin.top) + '\n              width=' + _this2.barWidth + '\n              style="\n                fill: #FFF;\n                text-shadow: 3px 4px 1px ' + _this2.labelShadow + ';\n                font-weight: bold;\n              "\n            >' + film.name + '</text>\n          ';
      }).join('\n') + '\n        </g>\n      </svg>\n    ';
    }
  }]);

  return FavoriteMoviesChart;
})(HTMLElement);

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);

},{}]},{},[1]);
