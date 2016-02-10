'use strict';

class FavoriteMoviesChart extends HTMLElement {
  createdCallback() {
    this.barHeight = 40;
    this.barMargin = 30;
    this.count = Number(this.getAttribute('count')) || 0;

    this.originalOutlineColor = 'rgba(64, 64, 64, 0.75)';

    this.margin = { top: 20, left: 20, right: 20, bottom: 20 };

    this.items = [
      { name: 'Rocky', rating: 5.0 },
      { name: 'Star Wars', rating: 4.9 },
      { name: 'Pulp Fiction', rating: 4.5 },
      { name: 'Dazed and Confused', rating: 4.0 },
      { name: 'Transformers 2', rating: 3.0 },
      { name: 'Twilight', rating: 2.0 },
      { name: 'Shrek 8', rating: 0.3 },
    ];

    // Adds a transition state for whenever an attribute changes.
    document.addTransitionState('attributeChanged', (elem, name, ...rest) => {
      if (elem.matches('rect') && name === 'width') {
        return this.animate.apply({ duration: 250 }, [elem, name].concat(rest));
      }
    });

    this.data = this.makeData(this.count);
    this.render();
  }

  randomize() {
    this.data = this.makeData(this.count);
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
    // Ensure the animation always ends with the correct newValue set on the
    // attributeName.
    }).then(function() {
      element.setAttribute(attributeName, newValue);
    });
  }

  // Diff inside the component for changes.
  render() {
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
    }
    else if (labels) {
      labels.removeAttribute('class');
      this.outlineColor = this.originalOutlineColor;
    }
    else {
      this.outlineColor = this.originalOutlineColor;
    }

    this.outlineWidth = this.width - this.margin.left - this.margin.right;
    this.barWidth = this.outlineWidth - this.offset;

    this.height = this.margin.top + (this.data.length * (this.barHeight +
      this.barMargin)) - (this.margin.bottom / 2);

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
              width=${this.outlineWidth}
              height=${this.barHeight + (this.barMargin / 2)}
              style="fill: ${this.outlineColor};"
            ></rect>
          `).join('\n')}
        </g>

        <!-- Actual bars -->
        <g class="bars">
          ${this.data.map((film, i) => `
            <rect
              x=${this.offset}
              y=${i * (this.barHeight + this.barMargin) + this.margin.top}
              rx=10
              ry=10
              rating="${film.rating}"
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
                + 7 + this.margin.top}
              width=${this.barWidth}
              style="
                fill: #FFF;
                text-shadow: 3px 4px 1px ${this.labelShadow};
                font-weight: bold;
              "
            >${film.name}</text>
          `).join('\n')}
        </g>
      </svg>
    `;
  }
}

document.registerElement('favorite-movies-chart', FavoriteMoviesChart);
