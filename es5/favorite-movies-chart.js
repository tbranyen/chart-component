'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FavoriteMoviesChart = (function (_Element) {
  _inherits(FavoriteMoviesChart, _Element);

  function FavoriteMoviesChart() {
    _classCallCheck(this, FavoriteMoviesChart);

    _get(Object.getPrototypeOf(FavoriteMoviesChart.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(FavoriteMoviesChart, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this = this;

      this.barWidth = 480;
      this.barHeight = 40;
      this.barMargin = 30;

      this.margin = {
        top: 20,
        left: 20,
        right: 20,
        bottom: 20
      };

      var render = function render() {
        _this.width = parseFloat(window.getComputedStyle(_this).width);
        _this.barWidth = _this.width - (_this.margin.left + 280) - _this.margin.right;

        _this.height = _this.margin.top + _this.data.length * (_this.barHeight + _this.barMargin);

        _this.render();

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.diffInnerHTML = '\n      <svg\n        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"\n        width=' + this.width + '\n        height=' + this.height + '\n      >\n        <!-- Outlines -->\n        <g class="outlines">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + _this2.margin.left + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top) + '\n              rx=10\n              ry=10\n              width=' + (280 + _this2.barWidth) + '\n              height=' + _this2.barHeight + '\n              style="fill: rgba(64, 64, 64, 0.25);"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Actual bars -->\n        <g class="bars">\n          ' + this.data.map(function (film, i) {
        return '\n            <rect\n              x=' + (_this2.margin.left + 280) + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.margin.top) + '\n              rx=10\n              ry=10\n              width=' + film.rating / 5 * _this2.barWidth + '\n              height=' + _this2.barHeight + '\n              style="fill: hsl(' + film.rating / 5 * 105 + ', 100%, 50%);"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n\n        <!-- Labels -->\n        <g class="labels">\n          ' + this.data.map(function (film, i) {
        return '\n            <text\n              x=' + (_this2.margin.left + 20) + '\n              y=' + (i * (_this2.barHeight + _this2.barMargin) + _this2.barHeight / 2 + 5 + _this2.margin.top) + '\n              width=' + _this2.barWidth + '\n              style="fill: #FFF; text-shadow: 3px 4px 1px #000; font-weight: bold;"\n            >' + film.name + '</text>\n          ';
      }).join('\n') + '\n        </g>\n      </svg>\n    ';
    }
  }, {
    key: 'data',
    get: function get() {
      return [{ name: 'Rocky', rating: 5.0 }, { name: 'The Good, The Bad, & The Ugly', rating: 4.9 }, { name: 'Pulp Fiction', rating: 4.5 }, { name: 'Dazed and Confused', rating: 4.0 }, { name: 'Transformers 2', rating: 3.0 }, { name: 'Twilight', rating: 2.0 }, { name: 'Shrek 8', rating: 0.3 }];
    }
  }]);

  return FavoriteMoviesChart;
})(Element);

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
