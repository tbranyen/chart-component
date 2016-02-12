(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

class FavoriteMoviesChart extends HTMLElement {
  createdCallback() {
    this.barHeight = 40;
    this.barMargin = 30;
    this.count = Number(this.getAttribute('count')) || 0;

    this.originalOutlineColor = 'rgba(64, 64, 64, 0.75)';

    this.margin = { top: 20, left: 20, right: 20, bottom: 20 };

    this.items = [{ name: 'Rocky', rating: 5.0 }, { name: 'Star Wars', rating: 4.9 }, { name: 'Pulp Fiction', rating: 4.5 }, { name: 'Dazed and Confused', rating: 4.0 }, { name: 'Transformers 2', rating: 3.0 }, { name: 'Twilight', rating: 2.0 }, { name: 'Shrek 8', rating: 0.3 }];

    this.makeData();

    this.animateAttribute = (el, name, oldValue, newValue) => {
      if (el.matches('rect') && name === 'width') {
        return new Promise(resolve => {
          el.animate([{ [name]: oldValue + 'px' }, { [name]: newValue + 'px' }], 250).onfinish = resolve;
        });
      }
    };

    document.addTransitionState('attributeChanged', this.animateAttribute);
  }

  attachedCallback() {
    this.render();
  }

  detachedCallback() {
    document.removeTransitionState('attributeChanged', this.animateAttribute);
  }

  makeData(length) {
    var data = [];

    for (let i = 0; i < this.count; i++) {
      data.push(this.items[Math.floor(Math.random() * this.items.length)]);
    }

    this.data = data;
  }

  render() {
    var rect = this.getBoundingClientRect();

    this.offset = 240;

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

    this.diffInnerHTML = `
      <svg
        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"
        width=${ this.width }
        height=${ this.height }
      >
        <!-- Outlines -->
        <g class="outlines">
          ${ this.data.map((film, i) => `
            <rect
              x=${ this.margin.left }
              y=${ i * (this.barHeight + this.barMargin) + this.margin.top - 7 }
              rx=10
              ry=10
              width=${ this.outlineWidth }
              height=${ this.barHeight + this.barMargin / 2 }
              style="fill: ${ this.outlineColor };"
            ></rect>
          `).join('\n') }
        </g>

        <!-- Actual bars -->
        <g class="bars">
          ${ this.data.map((film, i) => `
            <rect
              x=${ this.offset }
              y=${ i * (this.barHeight + this.barMargin) + this.margin.top }
              rx=10
              ry=10
              rating="${ film.rating }"
              width=${ film.rating / 5 * this.barWidth }
              height=${ this.barHeight }
              style="fill: hsl(${ film.rating / 5 * 105 }, 100%, 50%);"
            ></rect>
          `).join('\n') }
        </g>

        <!-- Labels -->
        <g class="labels">
          ${ this.data.map((film, i) => `
            <text
              x=${ this.margin.left + 20 }
              y=${ i * (this.barHeight + this.barMargin) + this.barHeight / 2 + 7 + this.margin.top }
              width=${ this.barWidth }
              style="
                fill: #FFF;
                text-shadow: 3px 4px 1px ${ this.labelShadow };
                font-weight: bold;
              "
            >${ film.name }</text>
          `).join('\n') }
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);

},{}]},{},[1]);
