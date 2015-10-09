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

      this.width = 720;
      this.height = 700;
      this.barWidth = 200;

      this.colors = ['red', 'blue', 'green', 'yellow'];

      var render = function render() {
        _this.render();

        requestAnimationFrame(render);
      };

      render();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.diffInnerHTML = '\n      <svg width=' + this.width + ' height=' + this.height + '>\n        <g class="axes"></g>\n\n        <g class="bars">\n          ' + this.data.favoriteMovies.map(function (film, i) {
        return '\n            <rect\n              x=0\n              y=' + i * 140 + '\n              width=' + 5 / film.rating * _this2.barWidth + '\n              height=100\n              style="fill: ' + _this2.colors[i] + ';"\n            ></rect>\n          ';
      }).join('\n') + '\n        </g>\n      </svg>\n    ';
    }
  }, {
    key: 'data',
    get: function get() {
      return {
        favoriteMovies: [{ name: 'The Good, The Bad, & The Ugly', rating: 4.9 }, { name: 'Pulp Fiction', rating: 4.5 }, { name: 'Dazed and Confused', rating: 4.8 }, { name: 'Rocky', rating: 5.0 }]
      };
    }
  }]);

  return FavoriteMoviesChart;
})(Element);

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
