'use strict';

import 'es6-promise';

class FavoriteMoviesChart extends HTMLElement {
  createdCallback() {
    this.barWidth = 480;
    this.barHeight = 40;
    this.barMargin = 30;
    var originalOutlineColor = this.outlineColor = 'rgba(64, 64, 64, 0.75)';

    this.margin = { top: 20, left: 20, right: 20, bottom: 20 };

    var render = () => {
      this.width = parseFloat(window.getComputedStyle(this).width);
      this.barWidth = this.width - (this.margin.left + 280) -
        this.margin.right;

      this.height = this.margin.top + (this.data.length * (this.barHeight +
        this.barMargin)) - (this.margin.bottom / 2);

      this.offset = 280;
      this.data = this.makeData(this.dataLength || 10);

      var labels = this.querySelector('.labels');

      // For smaller displays.
      if (this.width < 360) {
        this.offset = 0;
        this.barWidth = this.width - this.margin.left - this.margin.right;
        this.outlineColor = 'rgba(127, 197, 204, .4)';

        if (labels) {
          labels.setAttribute('class', 'flatten');
          labels.classList.add('flatten');
        }
      }
      else if (labels) {
        labels.removeAttribute('class');
        this.outlineColor = originalOutlineColor;
      }

      this.render();

      requestAnimationFrame(render);
    };

    this.items = [
      { name: 'Rocky', rating: 5.0 },
      { name: 'The Good, The Bad, & The Ugly', rating: 4.9 },
      { name: 'Pulp Fiction', rating: 4.5 },
      { name: 'Dazed and Confused', rating: 4.0 },
      { name: 'Transformers 2', rating: 3.0 },
      { name: 'Twilight', rating: 2.0 },
      { name: 'Shrek 8', rating: 0.3 },
    ];

    this.data = this.makeData(10);

    // Change the data every half second or so.
    setInterval(data => {
      this.data = this.data
        .map(item => { item.rating = Math.random() * 5; return item; })
        .sort(function(a, b) {
          return b.rating - a.rating;
        });
    }, 50);

    document.addTransitionState('attached', (elem) => {
      var parent = elem.parentNode;

      if (parent.getAttribute('class') === 'bars' && elem.nodeName === 'rect') {
        var oldValue = elem.getAttribute('width');
        elem.setAttribute('width', '0');

        return new Promise(resolve => { setTimeout(resolve, 10); })
          .then(() => {
            return this.animate.apply({ duration: 250 }, [elem, 'width', '0',
              oldValue]);
          });
      }
    });

    // Adds a transition state for whenever an attribute changes.
    document.addTransitionState('attributeChanged', (elem, name, ...rest) => {
      if (elem.nodeName === 'rect' && name === 'width') {
        return this.animate.apply({ duration: 250 }, [elem, name].concat(rest));
      }
    });

    // Render the chart for the first time.
    render();
  }

  makeData(length) {
    var data = [];

    for (let i = 0; i < length; i++) {
      data.push(this.items[Math.floor(Math.random() * this.items.length)]);
    }

    return data;
  }

  // Animate an element based on a passed property.
  animate(element, attributeName, oldValue, newValue) {
    oldValue = parseInt(element.getAttribute(attributeName));
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
    return new Promise(resolve => {
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
        }
        else {
          resolve();
        }
      });
    });
  }

  // Diff inside the component for changes.
  render() {
    this.diffInnerHTML = `
      <svg
        style="border-radius: 10px; background-color: rgba(0, 0, 0, 0.2);"
        width=${this.width}
        height=${this.height}
      >
        <!-- Outlines -->
        <g class="outlines">
          ${this.data.map((film, i) => `
            <rect
              x=${this.margin.left}
              y=${i * (this.barHeight + this.barMargin) + this.margin.top - 7}
              rx=10
              ry=10
              width=${this.offset + this.barWidth}
              height=${this.barHeight + (this.barMargin / 2)}
              style="fill: ${this.outlineColor};"
            ></rect>
          `).join('\n')}
        </g>

        <!-- Actual bars -->
        <g class="bars">
          ${this.data.map((film, i) => `
            <rect
              x=${this.margin.left + this.offset}
              y=${i * (this.barHeight + this.barMargin) + this.margin.top}
              rx=10
              ry=10
              width=${(film.rating / 5) * this.barWidth}
              height=${this.barHeight}
              style="fill: hsl(${(film.rating / 5) * 105}, 100%, 50%);"
            ></rect>
          `).join('\n')}
        </g>

        <!-- Labels -->
        <g class="labels">
          ${this.data.map((film, i) => `
            <text
              x=${this.margin.left + 20}
              y=${i * (this.barHeight + this.barMargin) + (this.barHeight / 2)
                + 5 + this.margin.top}
              width=${this.barWidth}
              style="fill: #FFF; text-shadow: 3px 4px 1px #000; font-weight: bold;"
            >${film.name}</text>
          `).join('\n')}
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
